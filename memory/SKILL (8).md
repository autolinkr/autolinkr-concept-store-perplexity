---
name: shopify-store-bootstrap
description: "Bootstrap a Shopify store from scratch or connect to an existing one. Use when setting up a new Shopify development environment, connecting Shopify API credentials, linking a GitHub repository for version-controlled theme development, pulling a theme into a repo, and establishing the safe dev-theme workflow (never touching the live published theme). Covers Shopify custom app creation, rotating token auth, theme ID discovery, GitHub repo setup, bulk pull/push scripts, and the correct file skip list (settings_data.json). Load this skill before any Shopify development session begins."
license: MIT
metadata:
  author: perplexity-computer
  version: '1.1'
---

# Shopify Store Bootstrap

## When to Use This Skill

Load this skill at the start of any Shopify development session, or when:
- Setting up a brand new Shopify store for development
- Connecting an existing store to a GitHub repository
- Refreshing API tokens (rotate every 24 hours)
- Identifying theme IDs and establishing the dev vs. live theme boundary
- Pulling the current theme state from Shopify into a local workspace
- Setting up the first-time push/pull Python scripts

---

## Phase 0 — Connections Checklist

Before writing a single line of code, establish these connections:

```
Required:
  ✓ GitHub — for version-controlled theme code
  ✓ Shopify connector — for API-level product/page/asset management

Optional but recommended:
  ✓ Google Drive — brand assets, product photos, copy docs
  ✓ Gmail / email — order notifications, customer comms setup
  ✓ Google Analytics — post-launch traffic monitoring
```

To connect: call `list_external_tools` and use the `connect` tool for any DISCONNECTED service. Present the OAuth URL to the user. Connections persist across sessions — only needed once.

---

## Phase 1 — Shopify Custom App & API Credentials

Shopify API access requires a **Custom App** (not a public app). The user must create this once:

### Steps (user does this in Shopify Admin):
1. Admin → Settings → Apps and sales channels → Develop apps
2. Create app → name it (e.g., "ComputerDev")
3. Configure Admin API scopes — select ALL of the following:
   - `write_themes`, `read_themes` — theme file read/write
   - `write_products`, `read_products` — product management
   - `write_content`, `read_content` — pages, blogs
   - `write_online_store_navigation` — menus
   - `read_orders`, `read_customers` — analytics access
   - `write_metaobjects`, `write_metaobject_definitions`
   - `write_files` — CDN file uploads
4. Install app → copy the **client_id** and **client_secret**

### Token Refresh (runs every session — tokens expire in ~24h):
```bash
TOKEN=$(curl -s -X POST "https://YOUR-STORE.myshopify.com/admin/oauth/access_token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['access_token'])")
echo $TOKEN > /tmp/shopify_token.txt
echo "Token: $TOKEN"
```

Save credentials permanently:
```
STORE:         your-store.myshopify.com
CLIENT_ID:     (from custom app)
CLIENT_SECRET: (from custom app)
TOKEN_FILE:    /tmp/shopify_token.txt  (refresh each session)
```

### Token Validation Check:
```bash
# Quick test to confirm token is valid before doing real work
TOKEN=$(cat /tmp/shopify_token.txt)
curl -s "https://YOUR-STORE.myshopify.com/admin/api/2024-10/shop.json" \
  -H "X-Shopify-Access-Token: $TOKEN" \
  | python3 -c "import json,sys; s=json.load(sys.stdin).get('shop',{}); print(f\"Store: {s.get('name')} ({s.get('myshopify_domain')})\")"
# Expected: Store: YourStoreName (your-store.myshopify.com)
# 401 = token expired, regenerate
```

---

## Phase 2 — Theme Inventory

### List all themes and identify IDs:
```bash
TOKEN=$(cat /tmp/shopify_token.txt)
curl -s "https://YOUR-STORE.myshopify.com/admin/api/2024-10/themes.json" \
  -H "X-Shopify-Access-Token: $TOKEN" \
  | python3 -c "
import json, sys
for t in json.load(sys.stdin)['themes']:
    print(f\"{t['id']}  {t['role']:12}  {t['name']}\")"
```

Output will show:
```
177668358178  main          LiveThemeName        ← NEVER TOUCH THIS
184215470114  unpublished   DevThemeName         ← WORK HERE ONLY
```

### Safety Rule — Non-Negotiable:
```
LIVE THEME (role: main)       = READ ONLY — never push to this ID
DEV THEME (role: unpublished) = ALL writes go here only
```

If no dev theme exists, duplicate the live theme:
- Shopify Admin → Online Store → Themes → (live theme) → Actions → Duplicate
- Rename the duplicate to something clear: "DevTheme" or "StoreName-Dev"

---

## Phase 3 — GitHub Repository Setup

### Create repo and connect:
```bash
# In the workspace directory
cd /home/user/workspace
gh repo create YOUR-ORG/YOUR-REPO-NAME --private --clone
cd YOUR-REPO-NAME

# Set up .gitignore
echo "config/settings_data.json" >> .gitignore
echo ".DS_Store" >> .gitignore
git add .gitignore
git commit -m "chore: init repo with gitignore"
```

### shopify.theme.toml:
```toml
[environments.development]
theme = "YOUR_DEV_THEME_ID"
store = "your-store.myshopify.com"
ignore = [
  "config/settings_data.json"
]
```

**Why ignore settings_data.json**: This file contains live store customizer settings (colors, layout choices, text content set via the theme editor). Overwriting it from code would reset all visual settings. ALWAYS skip it in bulk pushes.

---

## Phase 4 — Pull Theme Files from Shopify → Repo

```python
#!/usr/bin/env python3
# pull_theme.py — Run once to sync Shopify theme into workspace
import urllib.request, urllib.parse, json, os, time, base64

THEME_ID = YOUR_DEV_THEME_ID       # integer
TOKEN    = "shpat_..."             # from /tmp/shopify_token.txt
STORE    = "your-store.myshopify.com"
REPO     = "/home/user/workspace/YOUR-REPO"

# Step 1: Get asset list
url = f"https://{STORE}/admin/api/2024-10/themes/{THEME_ID}/assets.json"
req = urllib.request.Request(url, headers={"X-Shopify-Access-Token": TOKEN})
with urllib.request.urlopen(req) as r:
    assets = json.load(r)["assets"]

print(f"Pulling {len(assets)} assets...")
count, errors = 0, []

for asset in assets:
    key = asset["key"]
    asset_url = (f"https://{STORE}/admin/api/2024-10/themes/{THEME_ID}/assets.json"
                 f"?asset[key]={urllib.parse.quote(key, safe='/')}")
    req2 = urllib.request.Request(asset_url, headers={"X-Shopify-Access-Token": TOKEN})
    try:
        with urllib.request.urlopen(req2) as r2:
            data = json.load(r2)["asset"]
        filepath = os.path.join(REPO, key)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        if "value" in data:
            with open(filepath, "w", encoding="utf-8") as f: f.write(data["value"])
        elif "attachment" in data:
            with open(filepath, "wb") as f: f.write(base64.b64decode(data["attachment"]))
        count += 1
        time.sleep(0.05)     # Stay under rate limit
    except Exception as e:
        errors.append(f"{key}: {e}"); time.sleep(0.1)

print(f"Done. {count} written.")
if errors: [print(f"  ERROR: {e}") for e in errors]
```

After pull, commit to GitHub:
```bash
cd /home/user/workspace/YOUR-REPO
git add -A
git commit -m "sync: initial pull from Shopify theme $(date +%Y-%m-%d)"
git push origin main
```

---

## Phase 5 — Push Files to Shopify

### Push a single file:
```python
import urllib.request, json

THEME_ID = YOUR_DEV_THEME_ID
TOKEN    = open('/tmp/shopify_token.txt').read().strip()
STORE    = "your-store.myshopify.com"
KEY      = "assets/custom.css"   # theme-relative path
REPO     = "/home/user/workspace/YOUR-REPO"

with open(f"{REPO}/{KEY}", 'r') as f:
    content = f.read()

payload = json.dumps({"asset": {"key": KEY, "value": content}}).encode()
url = f"https://{STORE}/admin/api/2024-10/themes/{THEME_ID}/assets.json"
req = urllib.request.Request(url, data=payload, method="PUT",
    headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"})
with urllib.request.urlopen(req) as r:
    resp = json.load(r)
    print(f"✓ {KEY} ({resp['asset']['size']} bytes)")
```

### Push multiple specific files:
```python
import urllib.request, json, os, time

THEME_ID = YOUR_DEV_THEME_ID
TOKEN    = open('/tmp/shopify_token.txt').read().strip()
STORE    = "your-store.myshopify.com"
REPO     = "/home/user/workspace/YOUR-REPO"

FILES = [
    "assets/custom.css",
    "sections/header-group.json",
    "templates/index.json",
    # add more as needed
]
SKIP = {"config/settings_data.json"}

count, errors = 0, []
for key in FILES:
    if key in SKIP: continue
    fp = os.path.join(REPO, key)
    if not os.path.exists(fp):
        print(f"SKIP (not found): {key}"); continue
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    payload = json.dumps({"asset": {"key": key, "value": content}}).encode()
    url = f"https://{STORE}/admin/api/2024-10/themes/{THEME_ID}/assets.json"
    req = urllib.request.Request(url, data=payload, method="PUT",
        headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as r:
            resp = json.load(r)
            print(f"✓ {key} ({resp['asset']['size']} bytes)")
        count += 1; time.sleep(0.3)
    except Exception as e:
        errors.append(f"{key}: {e}"); print(f"✗ {key}: {e}")

print(f"\nPushed {count}/{len(FILES)} files.")
if errors: [print(f"  {e}") for e in errors]
```

### Verify a file is live on Shopify:
```python
import urllib.request, urllib.parse, json, time

THEME_ID = YOUR_DEV_THEME_ID
TOKEN    = open('/tmp/shopify_token.txt').read().strip()
STORE    = "your-store.myshopify.com"

for key in ["assets/custom.css", "templates/index.json"]:
    url = (f"https://{STORE}/admin/api/2024-10/themes/{THEME_ID}/assets.json"
           f"?asset[key]={urllib.parse.quote(key, safe='/')}")
    req = urllib.request.Request(url, headers={"X-Shopify-Access-Token": TOKEN})
    with urllib.request.urlopen(req) as r:
        data = json.load(r)['asset']
        print(f"  ✓ {key} — {data['size']} bytes, updated: {data['updated_at'][:19]}")
    time.sleep(0.1)
```

---

## Phase 6 — GitHub Push

```bash
cd /home/user/workspace/YOUR-REPO
git config user.email "you@email.com"
git config user.name "Your Name"
git add CHANGED_FILE_1 CHANGED_FILE_2
git commit -m "feat(section): description of what changed"
git push origin main
```

### GitHub Auth Fallback (if `git push` fails):
```bash
# Method 1: gh CLI auth setup (requires api_credentials=["github"])
gh auth setup-git
git push origin main

# Method 2: GitHub MCP connector
# Use call_external_tool with source_id="github_mcp" and tool_name="push_files"
# This bypasses git entirely and pushes file content directly via API

# Method 3: Personal Access Token in remote URL
git remote set-url origin https://YOUR_PAT@github.com/YOUR-ORG/YOUR-REPO.git
git push origin main
```

**Note on enterprise orgs:** GH_ENTERPRISE_TOKEN may not work for personal GitHub accounts even if an org is involved. Use `gh auth setup-git` with the `github` api_credentials preset instead.

### Commit Message Conventions:
```
feat(section):   new section or template
fix(css):        bug fix in styling
chore:           config, tooling changes
docs:            documentation updates
sync:            pull from Shopify
```

---

## Directory Structure Reference

```
your-repo/
├── assets/         ← CSS, JS, fonts, images
├── blocks/         ← Global reusable blocks
├── config/
│   ├── settings_schema.json   ← Theme settings definition
│   └── settings_data.json     ← NEVER PUSH (gitignored)
├── layout/         ← theme.liquid, password.liquid
├── locales/        ← i18n JSON files
├── sections/       ← Page sections (header, footer, custom)
├── snippets/       ← Reusable Liquid snippets
├── templates/      ← JSON page templates
│   └── customers/  ← Customer account templates
├── .gitignore
├── shopify.theme.toml
└── README.md
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| 401 Unauthorized | Token expired | Re-run token refresh command |
| 422 Unprocessable | Invalid schema in JSON template | Check block types, richtext needs `<p>` wrapper, select values must be strings |
| 429 Rate Limited | Too many requests | Increase `time.sleep()` to 0.25–0.5 |
| File not updating | Wrong asset key format | Key must be `sections/foo.liquid` not `./sections/foo.liquid` |
| git push auth fail | GH token not set | Use `gh auth setup-git` with `api_credentials=["github"]` |
| Theme not previewing changes | Cached browser | Append `?v=` + timestamp or hard refresh (Ctrl+Shift+R) |
| JSON template 422 | Missing block type | Ensure every block `type` matches a `type` in the section's `{% schema %}` |

### Schema Validation Rules (prevent 422 errors):
```
richtext fields      → MUST have <p> wrapper: "<p>text</p>"
select fields        → value must be string: "2" not 2
range fields         → must be within min/max bounds
number-counter       → duration max = 5, columns_mobile = "2" (string)
product handle refs  → must be exact Shopify product handle
image references     → use "shopify://shop_images/filename.ext" format
video references     → use full CDN URL: "https://cdn.shopify.com/videos/..."
```

---

## Session Start Checklist

At the start of every development session:
```
1. ✓ Refresh token → save to /tmp/shopify_token.txt
2. ✓ Validate token with shop.json test call
3. ✓ Confirm dev theme ID (never use live theme ID)
4. ✓ Confirm GitHub repo path in workspace
5. ✓ Read the file(s) you plan to modify before changing them
6. ✓ Push → verify on Shopify → screenshot → commit to git
```

---

## Preview URL

The dev theme is always previewable without publishing:
```
https://YOUR-STORE.myshopify.com/?preview_theme_id=YOUR_DEV_THEME_ID
```

Take a screenshot after every push to verify visual output before committing.

**CRITICAL: Never publish/activate a theme automatically. Publishing must always be done manually by a human in Shopify Admin after review.**
