# Python Google Places client

This folder contains a minimal Python client wrapper for Google Places Text Search, Nearby Search and Place Details.

Quick start

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # on Windows (Git Bash) use: .venv\\Scripts\\activate
pip install -r python/requirements.txt
```

2. Set your API key (example, bash):

```bash
export GOOGLE_MAPS_API_KEY=your_real_api_key_here
```

3. Run the demo:

```bash
python python/google_places_client.py
```

Notes
- The module expects environment variable `GOOGLE_MAPS_API_KEY` to be set, or you can pass `api_key` into the functions directly.
- For production: restrict the API key, add retry/backoff, and cache results to reduce usage.
