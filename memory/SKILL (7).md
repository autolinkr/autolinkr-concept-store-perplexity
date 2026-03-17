---
name: shopify-apps-seo
description: "Third-party app integration, SEO setup, navigation/menus, supporting pages, pre-launch checklist, and post-launch monitoring for any Shopify store. Covers Klaviyo (email/SMS automation), Rebuy (smart cart and upsells), Recharge (subscriptions), Jebbit (interactive quizzes), and review apps (Judge.me / aReviews). Also covers creating menus via API without modifying existing ones, policy and supporting pages, meta SEO, structured data, sitemap submission, and a scored launch checklist. Load this skill for the final phases of any Shopify store build."
license: MIT
metadata:
  author: perplexity-computer
  version: '1.1'
---

# Shopify Apps, SEO & Launch

## When to Use This Skill

Load this skill when:
- Integrating third-party apps into a Shopify store (email, subscriptions, upsells, quizzes, reviews)
- Setting up store navigation menus via API
- Creating supporting pages (About, Contact, Compatibility, FAQ, Policies)
- Configuring on-page SEO (meta titles, descriptions, structured data)
- Running a pre-launch quality checklist
- Setting up post-launch monitoring

---

## Part 1 — App Stack Planning

### Recommended Core App Stack (works for any e-commerce store)

| Category | App | Purpose |
|---|---|---|
| Email & SMS | **Klaviyo** | Abandoned cart, post-purchase, welcome flows, campaigns |
| Smart cart & upsells | **Rebuy** | In-cart cross-sells, post-purchase upsells, personalization |
| Subscriptions | **Recharge** | Recurring billing, membership programs |
| Interactive quizzes | **Jebbit** | Product finder quizzes, lead capture, personalization |
| Reviews | **aReviews** or **Judge.me** | Product reviews, star ratings, UGC |
| SEO | **Smart SEO** or **TinySEO** | Automated meta tags, JSON-LD, sitemap |
| Analytics | **Google Analytics 4** | Traffic, conversions, funnel analysis |
| Heatmaps | **Microsoft Clarity** | Free session recording, click/scroll maps |

### App Install Order (matters for theme conflicts)

```
1. Reviews app first — needs to inject into product templates
2. Klaviyo — needs pixel in theme.liquid before other scripts
3. Rebuy — requires cart.liquid / cart-drawer access
4. Recharge — wraps Add to Cart button (install before Rebuy)
5. Jebbit — standalone, install last
```

---

## Part 2 — Klaviyo Integration

### What Klaviyo Does
- Captures email/SMS at checkout and from popups
- Sends automated flows: abandoned cart, welcome series, post-purchase, winback
- Broadcasts: campaigns, product launches, sales

### Setup Steps
1. Install Klaviyo from Shopify App Store
2. In Klaviyo: Account → Settings → API Keys → copy Public API Key
3. Add pixel to `layout/theme.liquid` (inside `<head>`):

```liquid
{% comment %} Klaviyo Pixel {% endcomment %}
<script async type="text/javascript"
  src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=YOUR_PUBLIC_KEY">
</script>
```

4. Enable Shopify integration in Klaviyo: Integrations → Shopify → sync products, orders, customers

### Key Flows to Activate Immediately
```
✓ Abandoned Checkout (highest ROI — enable day 1)
✓ Welcome Series (new subscriber → 3-email drip)
✓ Post-Purchase Thank You + Review Request
✓ Browse Abandonment (viewed product, didn't add)
✓ Winback (no purchase in 90 days)
```

### Popup Form Setup
- Create a signup popup in Klaviyo → Forms
- Set trigger: 5-second delay or exit-intent
- Offer: 10% off first order works well for first-time visitors
- Enable double opt-in for GDPR/CAN-SPAM compliance

---

## Part 3 — Rebuy Smart Cart & Upsells

### What Rebuy Does
- Replaces the native Shopify cart drawer with a smart cart
- Shows AI-driven product recommendations inside the cart
- Adds post-purchase upsell offers (after checkout, before order confirmation)
- In-cart free-shipping progress bar

### Setup Steps
1. Install Rebuy from Shopify App Store
2. In Rebuy: Settings → Shopify Integration → enable Cart Drawer
3. Create a Smart Cart widget: Widgets → Smart Cart → configure upsell slots
4. Set recommendation algorithm: "Frequently Bought Together" or "Complementary Products"
5. Enable Free Shipping Progress: set threshold (e.g., "$50 away from free shipping")

### Upsell Configuration Best Practices
```
Cart upsell rule:   If cart contains [Product A] → recommend [Product B]
Threshold:          Show upsell only if cart value < $X
Max items shown:    2–3 (more causes decision fatigue)
CTA text:           "Add to cart" not "Buy now" (keeps flow in cart)
```

### Post-Purchase Upsell
- Set up a one-click upsell page that appears after payment, before order confirmation
- Best for: accessories, consumables, extended warranty, memberships
- Do NOT repeat items already in the order

---

## Part 4 — Recharge Subscriptions

### What Recharge Does
- Enables recurring purchases (subscribe & save)
- Powers membership / VIP programs
- Handles billing, dunning (failed payment recovery), customer portal

### Setup Steps
1. Install Recharge from Shopify App Store
2. Configure subscription plan on each eligible product:
   - Product → Subscription → Add plan (weekly / monthly / quarterly)
   - Discount: typically 10–15% for subscribe & save
3. Enable the Recharge customer portal at `/tools/recurring/login`
4. Customize portal branding to match store theme

### Membership Program Pattern
```
Product type: "Membership" or "VIP"
Billing:      Monthly recurring
Perks stored: As metafields on customer object
Gate content: Use Liquid tags to check customer tags
  {% if customer.tags contains 'vip-member' %}
    {{ 'exclusive content here' }}
  {% endif %}
```

### Recharge + Rebuy Integration
- Rebuy can recommend subscription upgrades inside the smart cart
- Enable in Rebuy: Data Sources → Recharge → sync subscription products

---

## Part 5 — Jebbit Interactive Quizzes

### What Jebbit Does
- Creates interactive "find your product" quizzes
- Captures lead data (email, preferences) before showing results
- Integrates with Klaviyo to tag users by quiz answers
- Drives personalized product recommendations

### Setup Steps
1. Install Jebbit from Shopify App Store OR embed via JavaScript
2. Create quiz in Jebbit dashboard: Experiences → New Quiz
3. Map outcomes to Shopify product handles
4. Copy the embed code (JavaScript snippet)
5. Add to a Shopify page:

```html
<!-- In a Custom Liquid section or page content -->
<div id="jebbit-quiz" style="min-height: 500px;">
  <script src="https://widget.jebbit.com/YOUR_QUIZ_ID.js" async></script>
</div>
```

6. Create a dedicated `/pages/quiz` page in Shopify with a Custom Liquid section

### Quiz Best Practices
```
Length:       5–7 questions max (shorter = more completions)
Lead gate:    Ask for email AFTER 2–3 questions (not at start)
Outcomes:     Map to 3–5 product categories (not individual SKUs)
Follow-up:    Send Klaviyo flow triggered by quiz completion tag
```

---

## Part 6 — aReviews Integration

aReviews is the preferred review platform for Shopify stores using this skill set.

### Setup Steps
1. Install aReviews from Shopify App Store
2. In aReviews dashboard: Settings → Widget → customize star color, font
3. Import existing reviews via CSV if migrating from another platform
4. Enable automatic review request email: sent 7–14 days post-delivery
5. Enable Rich Snippets (structured data) — critical for Google star ratings in search results

### Embedding on Product Pages
The app injects automatically via app embed, but verify:
```liquid
{% comment %} In your product template — confirm this renders: {% endcomment %}
<div id="areviews-widget" data-product-id="{{ product.id }}"></div>
```

If reviews don't appear:
- Check app embed is enabled: Admin → Online Store → Themes → Customize → App embeds → aReviews toggle ON
- Ensure the product template calls `content_for_header` in `layout/theme.liquid`
- In the dev theme, you must re-enable app embeds separately from the live theme

### Review Display Best Practices
```
Show on:    Product pages (primary), Homepage (featured), Collection pages
Format:     Star rating summary at top, individual reviews below
Sort:       Most helpful first (not most recent — builds trust faster)
Moderation: Approve before publishing (filter spam/fake)
Navigation: Reviews are per-product only — no separate /reviews page needed
```

---

## Part 7 — Navigation & Menus via API

### Critical Rule
```
NEVER modify existing store menus.
ALWAYS create NEW menus via API when needed.
```

Modifying existing menus can break navigation across the live store. Create new menus instead, then assign them in theme settings or header section JSON.

### List Existing Menus
```bash
TOKEN=$(cat /tmp/shopify_token.txt)
STORE="your-store.myshopify.com"
curl -s "https://$STORE/admin/api/2024-10/custom_collections.json" \
  -H "X-Shopify-Access-Token: $TOKEN"
# Menus live in the navigation section of Admin — use GraphQL for full access
```

### Create a New Menu via GraphQL
```python
import urllib.request, json

TOKEN = open('/tmp/shopify_token.txt').read().strip()
STORE = "your-store.myshopify.com"
GRAPHQL_URL = f"https://{STORE}/admin/api/2024-10/graphql.json"

mutation = """
mutation menuCreate($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
  menuCreate(title: $title, handle: $handle, items: $items) {
    menu {
      id
      handle
      title
      items { id title url }
    }
    userErrors { field message }
  }
}
"""

variables = {
    "title": "Main Nav - Dev",
    "handle": "main-nav-dev",
    "items": [
        {"title": "Home", "type": "HTTP", "url": "/"},
        {"title": "Products", "type": "HTTP", "url": "/collections/all"},
        {"title": "About", "type": "HTTP", "url": "/pages/about"},
        {"title": "Contact", "type": "HTTP", "url": "/pages/contact"}
    ]
}

payload = json.dumps({"query": mutation, "variables": variables}).encode()
req = urllib.request.Request(GRAPHQL_URL, data=payload, method="POST",
    headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"})
with urllib.request.urlopen(req) as r:
    result = json.load(r)
    print(json.dumps(result, indent=2))
```

### Recommended Navigation Structure (E-commerce)
```
Top Nav (Primary):
  Home → /
  Products → /collections/all  (or individual collection pages)
  [Product categories as needed]
  About → /pages/about
  Contact → /pages/contact
  Blog → /blogs/news (if applicable)

Footer Nav:
  Customer Service: FAQ, Contact, Returns, Shipping Policy
  Legal: Privacy Policy, Terms of Service, Refund Policy
  Company: About, Blog, Affiliate/Press
```

---

## Part 8 — Supporting Pages

### Required Pages for Any Store
```
/pages/about          — Brand story, team, mission
/pages/contact        — Contact form + support hours
/pages/faq            — Frequently asked questions
/pages/shipping       — Shipping times, carriers, free shipping threshold
/policies/privacy     — Privacy Policy (Shopify generates template)
/policies/refund      — Refund/Return Policy
/policies/terms       — Terms of Service
/policies/shipping    — Shipping Policy
```

### Create a Page via API
```python
import urllib.request, json

TOKEN = open('/tmp/shopify_token.txt').read().strip()
STORE = "your-store.myshopify.com"

page_data = {
    "page": {
        "title": "About Us",
        "handle": "about",
        "body_html": "<h2>Our Story</h2><p>We started with a simple mission...</p>",
        "template_suffix": "about",  # Optional: uses templates/page.about.json
        "published": True
    }
}

payload = json.dumps(page_data).encode()
req = urllib.request.Request(
    f"https://{STORE}/admin/api/2024-10/pages.json",
    data=payload, method="POST",
    headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}
)
with urllib.request.urlopen(req) as r:
    result = json.load(r)
    print(f"Created page: {result['page']['handle']} (id: {result['page']['id']})")
```

### Generate Policy Pages
Shopify can auto-generate legal policy templates:
- Admin → Settings → Policies → Generate from template
- Customize the generated text for your business
- These appear at `/policies/` URLs automatically

---

## Part 9 — SEO Setup

### Meta Title & Description Rules
```
Title format:    [Product/Page Name] | [Brand Name]
Title length:    50–60 characters (truncated by Google at 60)
Description:     140–160 characters — include primary keyword + CTA
Avoid:           Duplicate titles across pages (Google penalizes)
```

### Update Product SEO via API
```python
import urllib.request, json

TOKEN = open('/tmp/shopify_token.txt').read().strip()
STORE = "your-store.myshopify.com"
PRODUCT_ID = 12345678901

seo_update = {
    "product": {
        "id": PRODUCT_ID,
        "metafields_global_title_tag": "Product Name | Brand",
        "metafields_global_description_tag": "Compelling 140-160 char description with primary keyword and call to action."
    }
}

payload = json.dumps(seo_update).encode()
req = urllib.request.Request(
    f"https://{STORE}/admin/api/2024-10/products/{PRODUCT_ID}.json",
    data=payload, method="PUT",
    headers={"X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json"}
)
with urllib.request.urlopen(req) as r:
    result = json.load(r)
    print(f"Updated SEO for: {result['product']['title']}")
```

### Structured Data (JSON-LD)

Add to `layout/theme.liquid` inside `<head>` for product pages:

```liquid
{% if template == 'product' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": {{ product.title | json }},
  "description": {{ product.description | strip_html | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ shop.name | json }}
  },
  "offers": {
    "@type": "Offer",
    "url": {{ canonical_url | json }},
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ product.price | money_without_currency | json }},
    "availability": {% if product.available %}"https://schema.org/InStock"{% else %}"https://schema.org/OutOfStock"{% endif %}
  }
  {% if product.metafields.reviews.rating %}
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ product.metafields.reviews.rating.value }}",
    "reviewCount": "{{ product.metafields.reviews.rating_count }}"
  }
  {% endif %}
}
</script>
{% endif %}
```

### Sitemap & Search Console
1. Shopify auto-generates `/sitemap.xml` — no configuration needed
2. Submit to Google Search Console:
   - search.google.com/search-console → Add Property → your domain
   - Sitemaps → Submit → `https://your-store.com/sitemap.xml`
3. Submit to Bing Webmaster Tools as well

### Image SEO
```
Every product image alt text: [Product Name] - [key feature] - [brand]
Example: "AutoLinkr Pro Wireless CarPlay Adapter - Black - AutoLinkr"

Filename before upload:   product-name-variant-brand.jpg
NOT:                      IMG_4821.jpg or product-image-1.jpg
```

---

## Part 10 — Pre-Launch Checklist

Score each category 1–10. Do not launch until all are ≥ 8.

### Store Setup
```
[ ] Store name, tagline, favicon set
[ ] Custom domain connected and SSL active (https://)
[ ] Shopify Payments or payment gateway configured and tested
[ ] Tax settings configured for applicable regions
[ ] Shipping zones and rates defined
[ ] Email notifications (order confirm, shipping) customized with brand
[ ] All policy pages live (Privacy, Refund, Terms, Shipping)
```

### Products & Collections
```
[ ] All products published with correct prices
[ ] Product descriptions — no lorem ipsum, no placeholder text
[ ] All product images optimized (< 1MB each, correct alt text)
[ ] Product SEO meta titles and descriptions set
[ ] Collections created and products assigned
[ ] Inventory tracking enabled where relevant
[ ] Variants (size, color) set up correctly
[ ] Each product has the correct template_suffix assigned
[ ] Each product template uses the CORRECT video (not a sibling's)
```

### Theme & Design
```
[ ] Homepage is complete and visually polished
[ ] Navigation menus tested on desktop and mobile
[ ] All CTA buttons link to correct pages/products
[ ] No broken images or 404 links
[ ] Mobile responsiveness verified on 3+ device sizes
[ ] Page load speed tested (Google PageSpeed Insights ≥ 70 mobile)
[ ] Fonts, colors, and brand assets consistent throughout
[ ] Dark backgrounds use white logo; light backgrounds use dark logo
[ ] Footer has correct spacing and white logo
[ ] Nav has no unwanted pill/block hover effects
[ ] Announcement bar copy is compelling
```

### Apps & Integrations
```
[ ] Klaviyo pixel installed and events firing (check browser console)
[ ] At least one Klaviyo flow active (Abandoned Cart minimum)
[ ] aReviews app embed ON in dev theme customizer
[ ] Review widget visible on product pages
[ ] Rebuy smart cart tested (add item → cart drawer shows upsells)
[ ] Recharge subscription enabled on eligible products (if applicable)
[ ] Google Analytics 4 connected and receiving events
[ ] Microsoft Clarity or Hotjar installed for session recording
```

### SEO & Analytics
```
[ ] Google Search Console — domain verified, sitemap submitted
[ ] All page titles unique (no duplicates)
[ ] All meta descriptions written (no pages using auto-generated)
[ ] Structured data (JSON-LD) validated via Google Rich Results Test
[ ] 301 redirects set up if migrating from old URLs
[ ] robots.txt checked (not blocking important pages)
```

### Checkout & Conversions
```
[ ] Test order placed end-to-end (order → confirm email → fulfillment)
[ ] Discount codes tested
[ ] Free shipping threshold shows correctly in cart
[ ] Upsell offers in cart/checkout tested
[ ] All form submissions (contact, newsletter) tested
[ ] Thank-you page shows correct content
```

---

## Part 11 — Post-Launch Monitoring

### Week 1 Monitoring Checklist
```
Daily:
  [ ] Check Google Analytics: sessions, bounce rate, conversion rate
  [ ] Check Shopify: orders, abandoned carts, revenue
  [ ] Review Klaviyo: abandoned cart flow firing? open rates normal?
  [ ] Monitor Clarity/Hotjar: any rage clicks or dead clicks?

Weekly:
  [ ] Google Search Console: impressions, clicks, crawl errors
  [ ] Page speed check (PageSpeed Insights)
  [ ] Review app: new reviews? respond to all
  [ ] Check for 404 errors in Search Console
```

### Key Metrics to Baseline (Day 1)
```
Conversion Rate:      Industry avg 1–3% (e-com). Track daily.
Average Order Value:  Establish baseline before testing upsells.
Bounce Rate:          < 60% = good. > 80% = landing page problem.
Cart Abandonment:     Industry avg 70%. Klaviyo flow should recover 5–15%.
Page Load (mobile):   < 3 seconds. > 5 seconds = significant conversion loss.
```

### When Things Go Wrong
```
Traffic drop:         Check Search Console for manual actions, crawl errors
Conversion drop:      Check Clarity for UI breakage; check Shopify for payment errors
Email not sending:    Check Klaviyo flow triggers; verify Shopify integration sync
App conflict:         Disable apps one by one to isolate; check theme.liquid for conflicts
Theme error:          NEVER rollback live theme — fix in dev theme, republish after review
Reviews not showing:  Check app embed toggle in dev theme customizer (separate from live)
```

---

## Quick Reference — API Endpoints

```
Themes:     GET/PUT /admin/api/2024-10/themes/{id}/assets.json
Products:   GET/PUT /admin/api/2024-10/products/{id}.json
Pages:      GET/POST/PUT /admin/api/2024-10/pages.json
Blogs:      GET/POST /admin/api/2024-10/blogs.json
Menus:      Use GraphQL Admin API (menuCreate mutation)
Metafields: GET/POST /admin/api/2024-10/metafields.json
Files:      POST /admin/api/2024-10/files.json (CDN uploads)
```

---

## Self-Scoring Rubric

Before declaring any store launch-ready, score each area 1–10.
Do not proceed until all scores ≥ 8.

```
Functionality:    All pages load, no broken links, checkout works       [ /10]
Design Quality:   Consistent brand, polished UI, no layout breaks       [ /10]
Mobile UX:        Works perfectly on iPhone SE and 14 Pro Max sizes     [ /10]
SEO Completeness: Meta tags, structured data, sitemap submitted         [ /10]
App Integration:  Klaviyo firing, reviews showing, cart upsells active  [ /10]
Performance:      PageSpeed mobile ≥ 70, images optimized               [ /10]
Conversion Setup: CTAs clear, trust signals present, upsells live       [ /10]
Content Quality:  No placeholder text, copy compelling, no typos        [ /10]

OVERALL SCORE:    ___/80 (must be ≥ 64/80 to launch)
```
