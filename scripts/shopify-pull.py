#!/usr/bin/env python3
"""
shopify-pull.py — Smart Shopify theme pull.
Only fetches files whose updated_at on Shopify is newer than the local file.
One API call to get the asset list, then targeted fetches only for changed files.

Credentials loaded from environment variables or .env file:
  SHOPIFY_CLIENT_ID
  SHOPIFY_CLIENT_SECRET
  SHOPIFY_STORE      (default: aa3954.myshopify.com)
  SHOPIFY_THEME_ID   (default: 184215470114)

Usage:
  python3 scripts/shopify-pull.py
"""

import requests, base64, os, sys
from datetime import datetime, timezone

# ── Config ────────────────────────────────────────────────────────────
STORE    = os.environ.get("SHOPIFY_STORE",     "aa3954.myshopify.com")
THEME    = os.environ.get("SHOPIFY_THEME_ID",  "184215470114")
CLIENT_ID     = os.environ.get("SHOPIFY_CLIENT_ID")
CLIENT_SECRET = os.environ.get("SHOPIFY_CLIENT_SECRET")

if not CLIENT_ID or not CLIENT_SECRET:
    # Fallback: load from .env in repo root
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        for line in open(env_path):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip()
        CLIENT_ID     = os.environ.get("SHOPIFY_CLIENT_ID")
        CLIENT_SECRET = os.environ.get("SHOPIFY_CLIENT_SECRET")

if not CLIENT_ID or not CLIENT_SECRET:
    print("ERROR: Set SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET env vars or add a .env file.")
    sys.exit(1)

# ── Auth ──────────────────────────────────────────────────────────────
TOKEN_RESP = requests.post(
    f"https://{STORE}/admin/oauth/access_token",
    headers={"Content-Type": "application/x-www-form-urlencoded"},
    data=f"grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}"
)
TOKEN   = TOKEN_RESP.json()["access_token"]
HEADERS = {"X-Shopify-Access-Token": TOKEN}

SKIP_EXTS = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.ico'}

def parse_shopify_ts(ts_str):
    return datetime.fromisoformat(ts_str).astimezone(timezone.utc)

def local_mtime(path):
    if os.path.exists(path):
        return datetime.fromtimestamp(os.path.getmtime(path), tz=timezone.utc)
    return datetime.fromtimestamp(0, tz=timezone.utc)

# ── Step 1: Get full asset list (1 API call) ──────────────────────────
print("Fetching asset list from Shopify...")
r = requests.get(
    f"https://{STORE}/admin/api/2024-04/themes/{THEME}/assets.json",
    headers=HEADERS
)
assets = r.json().get("assets", [])
print(f"  Total assets: {len(assets)}")

text_assets = [a for a in assets if not any(a["key"].endswith(ext) for ext in SKIP_EXTS)]
print(f"  Text assets: {len(text_assets)}")

# ── Step 2: Timestamp diff ────────────────────────────────────────────
to_fetch = [
    a for a in text_assets
    if parse_shopify_ts(a["updated_at"]) > local_mtime(a["key"])
]
print(f"  Needs fetch (Shopify newer): {len(to_fetch)}")

if not to_fetch:
    print("Already up to date. No files fetched.")
    sys.exit(0)

# ── Step 3: Fetch only changed files ─────────────────────────────────
fetched, errors = [], []
for asset in to_fetch:
    key = asset["key"]
    r2  = requests.get(
        f"https://{STORE}/admin/api/2024-04/themes/{THEME}/assets.json",
        headers=HEADERS, params={"asset[key]": key}
    )
    data = r2.json().get("asset", {})
    if "value" in data:
        content = data["value"].encode("utf-8")
    elif "attachment" in data:
        content = base64.b64decode(data["attachment"])
    else:
        errors.append(key); continue

    os.makedirs(os.path.dirname(key) if os.path.dirname(key) else ".", exist_ok=True)
    with open(key, "wb") as f:
        f.write(content)
    fetched.append(key)

print(f"\nFetched {len(fetched)} files:")
for f in sorted(fetched):
    print(f"  {f}")

if errors:
    print(f"\nErrors ({len(errors)}):")
    for e in errors: print(f"  {e}")
