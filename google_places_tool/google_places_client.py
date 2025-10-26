"""
Simple Google Places client (Text Search, Nearby Search, Place Details)

Usage:
  - Set environment variable GOOGLE_MAPS_API_KEY with your API key.
  - Run this file directly for a short demo, or import functions in your app.

This module uses the HTTP Places endpoints and returns the raw JSON from Google.
It intentionally keeps things small and synchronous for clarity.
"""
import os
import sys
import requests
from typing import List, Dict, Any, Optional

BASE = "https://maps.googleapis.com/maps/api/place"


def _get_key(api_key: Optional[str]) -> str:
    key = api_key or os.getenv('GOOGLE_MAPS_API_KEY')
    if not key:
        raise RuntimeError('Google Maps API key not found. Set GOOGLE_MAPS_API_KEY env var or pass api_key')
    return key


def text_search(query: str, api_key: Optional[str] = None) -> Dict[str, Any]:
    """Perform a Text Search request.

    Returns the parsed JSON response from Google.
    """
    key = _get_key(api_key)
    url = f"{BASE}/textsearch/json"
    params = {"query": query, "key": key}
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    return resp.json()


def nearby_search(lat: float, lng: float, radius: int = 1000, keyword: Optional[str] = None, api_key: Optional[str] = None) -> Dict[str, Any]:
    """Perform a Nearby Search request (location + radius).

    Note: for production you may want to support rankby=distance and pagination (next_page_token).
    """
    key = _get_key(api_key)
    url = f"{BASE}/nearbysearch/json"
    params = {"location": f"{lat},{lng}", "radius": radius, "key": key}
    if keyword:
        params['keyword'] = keyword
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    return resp.json()


def place_details(place_id: str, fields: Optional[List[str]] = None, api_key: Optional[str] = None) -> Dict[str, Any]:
    """Get Place Details for a place_id.

    `fields` should be a list of fields to minimize payload and billing (e.g. ['name','formatted_address','geometry']).
    """
    key = _get_key(api_key)
    url = f"{BASE}/details/json"
    params = {"place_id": place_id, "key": key}
    if fields:
        params['fields'] = ','.join(fields)
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    return resp.json()


def normalize_place_summary(place: Dict[str, Any]) -> Dict[str, Any]:
    """Return a compact dict with common fields from a Place result item."""
    return {
        'place_id': place.get('place_id'),
        'name': place.get('name'),
        'rating': place.get('rating'),
        'types': place.get('types'),
        'location': place.get('geometry', {}).get('location'),
        'address': place.get('formatted_address') or place.get('vicinity')
    }


def _demo():
    """Run a simple demo if executed as a script."""
    key = os.getenv('GOOGLE_MAPS_API_KEY')
    if not key:
        print('Please set GOOGLE_MAPS_API_KEY in your environment and re-run.', file=sys.stderr)
        sys.exit(1)

    print('Nearby search for "coffee" near Seattle (lat=47.6062, lng=-122.3321) ...')
    ts = nearby_search(47.6062, -122.3321, radius=20000, keyword='coffee', api_key=key)
    results = ts.get('results', [])[:20]
    for i, r in enumerate(results, 1):
        address = r.get('formatted_address') or r.get('vicinity')
        print(f"{i}. {r.get('name')} — {r.get('rating')} — {address}")

    if results:
        first = results[0]
        pid = first.get('place_id')
        print('\nFetching details for first result (name,formatted_address,formatted_phone_number)...')
        det = place_details(pid, fields=['name', 'formatted_address', 'formatted_phone_number', 'geometry'], api_key=key)
        print(det.get('result'))


if __name__ == '__main__':
    _demo()
