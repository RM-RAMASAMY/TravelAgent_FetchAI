# hotel_backend.py
# Minimal backend logic to fetch hotels via Bright Data (Google Hotels SERP)

import os, json, logging, re
from typing import Any, Dict, List, Optional
from urllib.parse import urlencode, quote_plus
from datetime import datetime
import httpx

BRIGHT_API_KEY = os.getenv("BRIGHTDATA_API_KEY")
BRIGHT_SERP_ZONE = os.getenv("BRIGHTDATA_SERP_ZONE")  # e.g. "serp_api1"
API_ENDPOINT = "https://api.brightdata.com/request"

CITY_MAP = {
    "NYC": "New York", "JFK": "New York", "LGA": "New York", "EWR": "New York",
    "MIA": "Miami", "FLL": "Fort Lauderdale", "MCO": "Orlando",
    "LAX": "Los Angeles", "SFO": "San Francisco", "SEA": "Seattle",
    "BOS": "Boston", "DFW": "Dallas", "ORD": "Chicago",
    "IAD": "Washington", "DCA": "Washington", "LAS": "Las Vegas", "PHX": "Phoenix",
}

class BrightDataError(RuntimeError): ...

def _require_creds():
    if not BRIGHT_API_KEY or not BRIGHT_SERP_ZONE:
        raise BrightDataError("Set BRIGHTDATA_API_KEY and BRIGHTDATA_SERP_ZONE env vars")

def _nights(checkin: str, checkout: str) -> int:
    try:
        d0 = datetime.strptime(checkin, "%Y-%m-%d").date()
        d1 = datetime.strptime(checkout, "%Y-%m-%d").date()
        return max(1, (d1 - d0).days)
    except Exception:
        return 1

def serp_direct(url: str, timeout: float = 60.0) -> httpx.Response:
    _require_creds()
    headers = {"Authorization": f"Bearer {BRIGHT_API_KEY}", "Content-Type": "application/json"}
    payload = {"zone": BRIGHT_SERP_ZONE, "url": url, "format": "raw"}  # url must include brd_json=1
    resp = httpx.post(API_ENDPOINT, headers=headers, json=payload, timeout=timeout)
    resp.raise_for_status()
    return resp

def _extract_hotels_from_serp_json(data: Any, limit: int = 12) -> List[Dict[str, Any]]:
    """
    Walk Bright Data's parsed JSON (Google Hotels) and extract rows:
    {name, rating, area, price_usd (per-night if parseable), url (if present)}
    """
    found = []
    URL_KEYS = {"url","link","g_url","maps_url","hotel_url","booking_url","result_url","place_link"}

    def _to_float(v) -> Optional[float]:
        try: return float(v)
        except Exception: return None

    def _to_price_usd(s: Optional[str]) -> Optional[float]:
        if not s: return None
        m = re.search(r"(\d[\d,]*)", s)
        return float(m.group(1).replace(",", "")) if m else None

    def _pick_url(d: dict) -> Optional[str]:
        for k in URL_KEYS:
            v = d.get(k)
            if isinstance(v, str) and v.startswith("http"):
                return v
        return None

    def walk(node: Any):
        if isinstance(node, dict):
            name = node.get("name") or node.get("title")
            rating = node.get("overall_rating") or node.get("rating") or node.get("stars") or node.get("star_rating")
            price_text = node.get("price_text") or node.get("price") or node.get("rate") or node.get("rate_per_night")
            address = node.get("address") or node.get("neighborhood") or node.get("vicinity") or node.get("location")
            url = _pick_url(node)
            if name and (rating or price_text):
                found.append({"name": str(name), "rating": _to_float(rating),
                              "price_text": str(price_text) if price_text is not None else None,
                              "address": address, "url": url})
            for v in node.values(): walk(v)
        elif isinstance(node, list):
            for v in node: walk(v)

    walk(data)

    out, seen = [], set()
    for h in found:
        if h["name"] in seen: continue
        seen.add(h["name"])
        out.append({
            "name": h["name"],
            "rating": h["rating"],
            "area": h.get("address"),
            "price_usd": _to_price_usd(h.get("price_text")),
            "url": h.get("url"),
        })
        if len(out) >= limit: break
    return out

def search_hotels_google(
    city_or_iata: str,
    checkin: str,
    checkout: str,
    adults: int = 2,
    currency: str = "USD",
    country: str = "us",
    lang: str = "en",
    limit: int = 12,
) -> List[Dict[str, Any]]:
    """
    Returns a list of hotels with fields:
      { name, area, stars, price_per_night_usd, total_usd, url }
    """
    city = CITY_MAP.get(city_or_iata.upper(), city_or_iata)
    q = {
        "q": f"hotels in {city}",
        "gl": country, "hl": lang,
        "brd_dates": f"{checkin},{checkout}",
        "brd_occupancy": str(adults),
        "brd_currency": currency,
        "brd_json": "1",  # ask Google Hotels page (via BD) to respond with structured JSON
    }
    url = f"https://www.google.com/travel/hotels?{urlencode(q, quote_via=quote_plus)}"

    try:
        res = serp_direct(url)
        data = res.json()
    except Exception as e:
        logging.exception("Bright Data request failed: %s", e)
        return []

    rows = _extract_hotels_from_serp_json(data, limit=limit)
    nights = _nights(checkin, checkout)

    out = []
    for r in rows:
        name = r.get("name") or "Hotel"
        area = r.get("area") or "Central"
        stars = float(r.get("rating") or 3.5)
        p_night = r.get("price_usd")
        total = (p_night * nights) if isinstance(p_night, (int, float)) else None

        # URL fallback to Google Maps search if SERP didn’t provide a deep link
        bd_url = r.get("url")
        fallback_url = f"https://www.google.com/maps/search/?api=1&query={quote_plus(f'{name} {city}')}"
        url_final = bd_url or fallback_url

        out.append({
            "name": name,
            "area": area,
            "stars": stars,
            "price_per_night_usd": p_night,
            "total_usd": round(total, 2) if total else None,
            "url": url_final,
        })
    return out

# --- CLI usage: python hotel_backend.py --city MIA --checkin 2025-12-05 --checkout 2025-12-08 --adults 2 --limit 8
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Fetch hotels via Bright Data (Google Hotels SERP)")
    parser.add_argument("--city", required=True, help="City name or IATA (e.g., MIA, NYC)")
    parser.add_argument("--checkin", required=True, help="YYYY-MM-DD")
    parser.add_argument("--checkout", required=True, help="YYYY-MM-DD")
    parser.add_argument("--adults", type=int, default=2)
    parser.add_argument("--limit", type=int, default=8)
    args = parser.parse_args()

    try:
        hotels = search_hotels_google(args.city, args.checkin, args.checkout, adults=args.adults, limit=args.limit)
        print(json.dumps({"city": args.city, "checkin": args.checkin, "checkout": args.checkout,
                          "adults": args.adults, "results": hotels}, indent=2))
    except BrightDataError as e:
        print(json.dumps({"error": str(e)}))
