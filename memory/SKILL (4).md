---
name: autolinkr-brand-theme
description: AutoLinkr brand identity, design tokens, store identifiers, product catalog, CDN assets, navigation structure, Concept theme quirks, and dev workflow for the AutoLinkr Shopify store (ConceptThemePerplexity).
version: v1.3
---
# AutoLinkr Brand & Theme Reference

## When to Use This Skill

Load for:
- Any work on the AutoLinkr Shopify store (ConceptThemePerplexity)
- Referencing brand colors, fonts, spacing, or tokens
- Adding new sections, products, or templates
- Checking product handles, CDN URLs, or nav structure
- Debugging theme issues specific to AutoLinkr's setup
- Onboarding a new session — this is the single source of truth

---

## Store Identifiers

| Property | Value |
|---|---|
| Store URL | `aa3954.myshopify.com` / `theautolinkr.com` |
| Dev Theme Name | `ConceptThemePerplexity` |
| Dev Theme ID | `184215470114` |
| Live Theme Name | `NickUpdate9.6.25` ← **READ ONLY — never touch** |
| Live Theme ID | `177668358178` |
| GitHub Repo | `autolinkr/autolinkr-concept-store-perplexity` |
| GitHub Branch | `main` |
| Base Theme | Concept (Shopify Theme Store, ID: 2412) |

### Dev Theme Preview URL
```
https://aa3954.myshopify.com/?preview_theme_id=184215470114
```
Use `?preview_theme_id=184215470114` on any URL to preview.

### Shopify API Auth
```bash
TOKEN=$(curl -s -X POST "https://aa3954.myshopify.com/admin/oauth/access_token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['access_token'])")
echo $TOKEN > /tmp/shopify_token.txt
```

### Push a File to Shopify
```bash
TOKEN=$(cat /tmp/shopify_token.txt)
CONTENT_B64=$(base64 -w 0 "assets/autolinkr-tokens.css")
curl -s -X PUT \
  "https://aa3954.myshopify.com/admin/api/2024-01/themes/184215470114/assets.json" \
  -H "X-Shopify-Access-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"asset\":{\"key\":\"assets/autolinkr-tokens.css\",\"attachment\":\"$CONTENT_B64\"}}"
```

### Workspace Path
```
/home/user/workspace/autolinkr-concept-store-perplexity/
```

---

## Brand Identity

### Aesthetic
**"Apple.com dark mode meets Rivian meets Nothing Phone"**
- World-class dark premium ecommerce
- Every element feels intentional, airy, and high-end
- Dark backgrounds, electric blue accent, crisp typography
- Neon glow on CTAs — subtle but powerful
- Generous whitespace — never cramped

### Brand Voice
- Direct and confident ("Upgrade in 60 Seconds")
- Feature-led but human ("50,000+ Happy Drivers")
- Premium but accessible — not intimidating
- Always push Pro → Elite upsell messaging
- Streaming and Google Play are KEY selling points for Pro & Elite

### Business Priorities (in order)
1. **AutoLinkr Pro™** — hero product, entry point
2. **AutoLinkr Elite™** — upsell from Pro (more expensive, more capable)
3. **AutoLinkr Dash™** — dashcam, growing category, promote heavily
4. AutoLinkr Tablet™ — standalone CarPlay for any car (no factory CarPlay needed)
5. AutoLinkr Base / Lite — lower tier, less emphasis

**Pro/Elite/Base rule:** These products require existing **factory CarPlay** — they do NOT add CarPlay. AutoLinkr Tablet™ is standalone.

---

## Design System Tokens

All tokens live in: `assets/autolinkr-tokens.css`
Current version: **v5.1**

### Color Palette

```css
/* Backgrounds — darkest to lightest */
--al-bg:            #080809;   /* True black — page base */
--al-surface:       #0F0F12;   /* Cards, panels */
--al-surface-2:     #161619;   /* Elevated cards */
--al-surface-3:     #1E1E22;   /* Hover states, nested */
--al-surface-4:     #26262B;   /* Borders, dividers */

/* Borders */
--al-border:        #2A2A30;   /* Default border */
--al-border-subtle: #1A1A1F;   /* Light dividers */
--al-border-bright: #3A3A42;   /* Emphasized borders */

/* Text */
--al-text-1: #F7F7F8;          /* Headlines — near white */
--al-text-2: #C8C8D0;          /* Body — highly readable */
--al-text-3: #8A8A94;          /* Muted / captions */
--al-text-4: #4A4A52;          /* Placeholder / disabled */

/* Accent — Electric Blue */
--al-accent:        #3B8EF8;
--al-accent-hover:  #2478E8;
--al-accent-dim:    rgba(59, 142, 248, 0.10);
--al-accent-glow:   0 0 40px rgba(59, 142, 248, 0.25);
--al-accent-border: rgba(59, 142, 248, 0.30);

/* Elite Gold — for premium product tier */
--al-gold:         #F0A840;
--al-gold-dim:     rgba(240, 168, 64, 0.12);
--al-gold-border:  rgba(240, 168, 64, 0.30);

/* Semantic */
--al-green:  #34D06A;   /* Success / compatible */
--al-red:    #FF4D40;   /* Error / incompatible */
--al-amber:  #FFAA0A;   /* Warning */
```

### Typography

```css
--al-font-display: 'General Sans', -apple-system, 'Segoe UI', sans-serif;
--al-font-body:    'Inter', -apple-system, 'Segoe UI', sans-serif;

/* Type scale — fluid responsive */
--al-text-hero:  clamp(2.75rem, 6.5vw, 5rem);
--al-text-h2:    clamp(1.875rem, 3.8vw, 3rem);
--al-text-h3:    clamp(1.5rem, 2.4vw, 2rem);
--al-text-h4:    clamp(1.25rem, 1.6vw, 1.5rem);
--al-text-body:  1rem;
--al-text-sm:    0.9375rem;
--al-text-xs:    0.8125rem;
```
Fonts loaded via: Fontshare (General Sans) + Google Fonts (Inter).

### Spacing & Layout

```css
--al-max-w: 1280px;     /* Page max-width */
--al-nav-h: 64px;       /* Header height */
--al-r-sm:  6px;        --al-r-md: 12px;
--al-r-lg:  18px;       --al-r-xl: 24px;
--al-transition: 220ms cubic-bezier(0.2, 0, 0, 1);
```

### Shadows

```css
--al-shadow-sm:     0 1px 3px rgba(0,0,0,0.5);
--al-shadow-md:     0 4px 20px rgba(0,0,0,0.6);
--al-shadow-lg:     0 16px 48px rgba(0,0,0,0.75);
--al-shadow-accent: 0 4px 28px rgba(59, 142, 248, 0.22);
--al-shadow-gold:   0 4px 28px rgba(240, 168, 64, 0.20);
```

### Glassmorphism

```css
--al-glass-bg:     rgba(15, 15, 18, 0.85);
--al-glass-border: rgba(255, 255, 255, 0.06);
--al-glass-blur:   blur(20px);
```

---

## Concept Theme Variable Bridge

Concept theme uses **RGB triplets only** (NOT hex):
```css
:root {
  --color-background: 8, 8, 9;        /* NOT #080809 */
  --color-foreground: 247, 247, 248;
  --color-border: 42, 42, 48;
  --color-button-text: 255, 255, 255;
  --color-button-background: 59, 142, 248;
}
```

---

## Product Catalog

### Product Handles & Templates

| Product | Handle | Template Suffix | Price | Tier |
|---|---|---|---|---|
| AutoLinkr Pro™ | `the-autolinkr-pro` | `autolinkr-pro` | $79.99 | Entry flagship |
| AutoLinkr Elite™ | `the-autolinkr-elite` | `autolinkr-elite` | $199.99 | Premium upsell |
| AutoLinkr Dash™ (dashcam) | `autodash` | `autolinkr-dashcam` | — | Dashcam category |
| AutoLinkr Tablet™ | `autolinkr-dash` | `autolinkr-dash` | $74.99 | Standalone CarPlay |
| AutoLinkr Base | — | `autolinkr-base` | — | Entry tier |
| AutoLinkr VIP Membership | `autolinkr-vip-membership` | `vip-program` | — | Loyalty |
| AutoLinkr Aroma | `autolinkr-aroma` | `autolinkr-aroma` | — | Accessory |

### Key Product Differentiators

**Pro vs Elite:**
- Pro: Wireless CarPlay + Netflix/YouTube/Google Play streaming
- Elite: Everything in Pro + split-screen multitasking + faster CPU
- Always upsell Pro → Elite ("just $120 more for split-screen + faster CPU")

**Tablet vs Pro/Elite:**
- Pro/Elite: Require **existing factory CarPlay** — they make wired → wireless
- Tablet: **Standalone** — works in any car, no factory CarPlay needed

**Dash:**
- Premium dashcam — growing category, AutoLinkr wants to become major dash cam seller
- Treat it as a hero product alongside Pro

---

## CDN Assets

| Asset | URL |
|---|---|
| White Logo (4K) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/AutoLinkrOfficialLogo4K_White_Trans.png?v=1772920454` |
| 3D Spin Video | `https://cdn.shopify.com/videos/c/o/v/f710c015c61142c997c93fa5dd13c01d.mov` |
| Box→Streaming Video | `https://cdn.shopify.com/videos/c/o/v/2a9b3c1f04034a5bbbb7d5074334392c.mp4` |
| **Short Demo Video (NEW)** | `https://cdn.shopify.com/videos/c/o/v/f1ede9f882b84a6e928a2dbc9dfdea72.mov` |
| Compatibility Image | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/AUTO-9518.jpg?v=1759000811` |

### New Lifestyle Photography (2025 shoot)

| Asset | Description | URL |
|---|---|---|
| F250 Netflix Hero | **Hero shot** — F-250 center console with Netflix on screen (best seller image) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9259.jpg?v=1773548940` |
| Screen + Box | Desktop interface on screen with product box | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9230-HDR.jpg?v=1773548942` |
| Box on Console | Product box and device on center console | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9288.jpg?v=1773548942` |
| Console Product | Product in center console (no box) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9277.jpg?v=1773548942` |
| Interface + Box Mobile | Interface and box close-up | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9275.jpg?v=1773548945` |
| Lifestyle A | General lifestyle shot | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9293.jpg?v=1773548940` |
| Plugged In A | Product plugged in (close-up) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9260.jpg?v=1773548940` |

**IMPORTANT — Shopify image_picker limitation:** Sections with `"type": "image_picker"` fields ONLY accept `shopify://shop_images/` references. They CANNOT use raw CDN `https://` URLs. To use CDN photos, you must:
1. Use the `al-lifestyle-gallery` section (uses `url` type field — supports CDN)
2. Use the `al-brand-hero` `bg_image_url` setting (uses `url` type — supports CDN)
3. Use `al-how-it-works` step `image_url` settings (uses `url` type — supports CDN)
4. OR upload the photo to Shopify media first to get a `shopify://` reference

**Logo rule:** Always use the white logo on dark/colored backgrounds. Never use the dark logo on dark backgrounds.

---

## Navigation Structure

### Desktop Nav (Concept `left-center` layout)
Menu: `main-menu`
Active style: `dot` (not `block`)
Hover: enabled

**Real Concept nav classes:**
```
Direct link:  <a class="menu__item text-sm-lg flex items-center font-medium">
Dropdown:     <summary><magnet-element class="menu__item text-sm-lg flex items-center font-medium">
```
Target `.menu__item` for uniform nav styling — NOT `header__menu-item` or `header__inline-menu`.

### Mobile Menu (Drawer)
- Class: `.drawer__menu-item` on both direct links and summary triggers
- Sub-panel: `.drawer__submenu` with `position: absolute top-0 left-0`
- Panel background: `.drawer__inner` (not `.menu-drawer`)

### Nav Items (as of last build)
- Home (direct link)
- Adapters (mega menu → AutoLinkr Pro™, AutoLinkr Elite™, AutoLinkr Lite™ cards + nav links)
- Dash Cams (mega menu → AutoLinkr Dash™, AutoLinkr Dash Pro™ cards + nav link)
- Accessories (mega menu → MagSafe Mount, GapGuard™, Aroma Diffuser™ cards + nav links)
- Shop All (direct link)
- Help (simple dropdown → Contact Us)

### Mega Menu Configuration
All three dropdown nav items (Adapters, Dash Cams, Accessories) use Concept's built-in `mega_menu` block type.
Key settings:
- `menu_title` must EXACTLY match the Shopify nav link title (case-insensitive handle match)
- `menu_width: "small"` = nav links column takes 25%, product cards get 75% — use for proper card proportions
- `menu_width: "medium"` = nav column takes 50% — too wide when you have 2-3 product cards
- `promo_image_X` must use `shopify://shop_images/filename` references
- `promo_link_X` must use `shopify://products/handle` references
- `show_menu_image: true` to enable product cards

Blocks in `header-group.json` block_order:
```
['mega-menu', 'mega_menu_TKWTwX', 'mega_menu_dashcams', 'mega_menu_accessories']
```
- `mega-menu` = disabled legacy Catalog tab block
- `mega_menu_TKWTwX` = Adapters
- `mega_menu_dashcams` = Dash Cams  
- `mega_menu_accessories` = Accessories

### Simple Dropdown (Help)
Concept uses `.dropdown__container > ul.dropdown__nav > li > a.reversed-link` for simple dropdowns.
CSSfix: `.dropdown__nav a { color: #C8C8D0 !important; }` — ensures visibility on dark bg.
Help dropdown shows items from the Shopify `main-menu` → Help child links.

**Rule:** Do NOT modify existing store menus. Create new menus if needed.
**Rule:** Reviews live on individual product pages — no standalone reviews page needed.

---

## Header & Announcement Bar

### Header Settings
```json
{
  "header_layout": "left-center",
  "sticky_header_type": "always",
  "menu_active": "dot",
  "hover_menu": true,
  "color_background": "#0A0A0C",
  "color_text": "#F5F5F7",
  "padding_top": 32,
  "padding_bottom": 16,
  "full_width": true,
  "rounded": true
}
```

### Announcement Bar
Color: `#3B8EF8` (brand accent blue — matches CTAs and accent color)
Text color: `#FFFFFF` bold (font-weight: 700)
Highlight: `#FFFFFF`
Layout: **marquee** (continuous scroll, speed: 25) — DO NOT use carousel
`rounded: false` — flat/square edges — DO NOT enable rounded

Current messages:
1. `⚡ Upgrade to Wireless CarPlay in 60 Seconds — No Tools Required`
2. `🎬 Stream Netflix, YouTube & More on Your Factory Screen — Shop AutoLinkr Pro™`
3. `⭐ 4.8/5 Stars · 50,000+ Happy Drivers · Free Shipping on All Orders`

**Announcement bar quirks:**
1. Concept injects inline `<style>` from `color_background` — must update BOTH JSON AND CSS.
2. `rounded` setting adds border-radius — always set `"rounded": false` in JSON.
3. CSS must enforce `border-radius: 0` on `.announcement-bar-section` and `[class*="announcement-bar"]`.
```css
[id*="announcement-bar"] .announcement-bar { background: #3B8EF8 !important; border-radius: 0 !important; }
```

---

## Footer

```json
{
  "color_background": "#080809",
  "color_text": "#F7F7F8",
  "padding_top": 56,
  "padding_bottom": 40
}
```
Always use white logo in footer. Newsletter enabled.

---

## Homepage Template (`templates/index.json`)

Sections in order:
1. `al-brand-hero` — F250/Netflix hero (bg_image_url: 2M2A9259)
2. `feature-strip` — trust/feature icons
3. `al-hero-video` — new short demo video
4. `scrolling-text-trust` — scrolling marquee
5. `featured-pro` — Pro product feature block
6. `lifestyle-gallery-home` — **NEW** 5-photo lifestyle grid (2M2A9259, 2M2A9230-HDR, 2M2A9277, 2M2A9275, 2M2A9293)
7. `multicolumn-why` — "why AutoLinkr" benefits
8. `collection-list` — product collection grid
9. `number-counter` — social proof numbers
10. `product-comparison` — comparison table
11. `testimonials-banner` — reviews
12. `dash-intro-header` — Dash intro
13. `featured-dash` — Dash cam feature block
14. `rich-text-mission` — brand mission copy

---

## Product Page Templates

### AutoLinkr Pro (`product.autolinkr-pro.json`)
Sections: main-product → feature-strip → video-demo (new short demo) → multicolumn-features → image-feature-list → how-it-works (step1: 2M2A9259, step3: 2M2A9230-HDR) → **lifestyle-gallery** (F250 Netflix hero + 4 photos) → image-netflix → image-compatibility → number-counter → scrolling-text → testimonials-banner → youtube-review → product-comparison → elite-upsell → product-recommendations → apps-reviews

### AutoLinkr Elite (`product.autolinkr-elite.json`)
Sections: main-product → feature-strip → video-demo → multicolumn-features → image-splitscreen → **lifestyle-gallery** (5 photos) → number-counter → scrolling-text → product-comparison → testimonials-banner → how-it-works → product-recommendations → apps-reviews → youtube-review

### AutoLinkr Dashcam (`product.autolinkr-dashcam.json`)
Suffix: `autolinkr-dashcam`

### AutoLinkr Tablet (`product.autolinkr-dash.json`)
Suffix: `autolinkr-dash`

---

## Custom Sections (AutoLinkr-built)

| File | Purpose |
|---|---|
| `sections/al-brand-hero.liquid` | Homepage hero — supports `bg_image_url` (CDN) + `bg_video_url` + Shopify image_picker |
| `sections/al-feature-strip.liquid` | Horizontal icon+text trust strip |
| `sections/al-how-it-works.liquid` | Step-by-step setup walkthrough (step `image_url` supports CDN URLs) |
| `sections/al-video-section.liquid` | Full-width video embed section |
| `sections/al-lifestyle-gallery.liquid` | **NEW** Asymmetric 5-photo masonry grid — all photos use CDN URL settings |
| `sections/autolinkr-collection-hero.liquid` | Collection page banner |
| `sections/autolinkr-header.liquid` | Custom header variant (legacy) |
| `sections/autolinkr-hero.liquid` | Product hero variant |
| `sections/autolinkr-product-features.liquid` | Product feature list |
| `sections/autolinkr-product-hero.liquid` | Product page hero block |

---

## Key Files

| File | Purpose |
|---|---|
| `assets/autolinkr-tokens.css` | **Single source of truth** for all brand CSS |
| `layout/theme.liquid` | Links CSS files — tokens loaded last |
| `sections/header-group.json` | Header + announcement bar settings |
| `sections/footer-group.json` | Footer settings |
| `templates/index.json` | Homepage section order |
| `templates/product.autolinkr-pro.json` | Pro product page |
| `templates/product.autolinkr-elite.json` | Elite product page |
| `templates/product.autolinkr-dashcam.json` | Dashcam product page |

---

## Concept Theme Architecture Quirks

These are hard-won fixes — do not repeat past mistakes.

### Nav: Use `.menu__item` NOT legacy class names
```
WRONG: header__menu-item, header__inline-menu, list-menu--inline
RIGHT: header .menu__item
```
Both direct `<a>` links and dropdown `<summary>` elements use `.menu__item`.

### Accordion CSS Must Never Use Bare `details summary`
```
WRONG: details summary { padding: 18px; }   ← bleeds into nav dropdowns
RIGHT: .accordion summary { padding: 18px; }
```
Nav dropdowns also use `<details><summary>`. Always scope accordions to `.accordion`, `.collapsible`, `[class*="collapsible-tab"]`, etc.

### Drawer: Style `.drawer__inner` NOT `.menu-drawer`
```
WRONG: .menu-drawer { background: #080809; }
RIGHT: .menu-drawer .drawer__inner { background: #080809; }
```
`.menu-drawer` is the full-screen overlay wrapper. `.drawer__inner` is the visible panel.

### Announcement Bar: Two-Part Fix Required
Concept injects inline `<style>` from JSON setting — CSS alone can't win:
1. Update `color_background` in `sections/header-group.json`
2. Add CSS override: `[id*="announcement-bar"] .announcement-bar { background: #0D1F5C !important; }`

### Sticky Header: Never Target `.shopify-section` Broadly
Adding `position`, `overflow`, `transform`, or `z-index` to ALL `.shopify-section` breaks sticky header.
Always use: `.shopify-section:not(.shopify-section--header)`

### Drawer Nav `<details>` Must Have Zero Margin
`details { margin-bottom }` breaks the absolute-positioned sub-panel overlay. Always scope to `.accordion` or use `:not(.drawer__menu-group) > details`.

### Concept RGB Triplets
Concept theme CSS vars use RGB triplets, not hex:
```css
--color-background: 8, 8, 9;    /* NOT #080809 */
```

### Concept Button `btn-fill` White Rectangle
```
Symptom:  White rectangle blooms inside button on load or hover
Cause:    Concept's .btn-fill inner span (absolute, animates to fill on hover) is white by default.
          Our outer button background CSS cannot override it.
Fix:
  Primary:   .button--primary .btn-fill { background-color: rgba(36,120,232,0.4) !important; }
             .button--primary .btn-text  { color:#fff !important; z-index:1; position:relative; }
  Secondary: .button--secondary .btn-fill { display: none !important; }
  Icon-only: .self-submit-button .btn-fill { display: none !important; }
Rule: Every Concept button must explicitly handle .btn-fill.
```

### Newsletter Form (Concept `self-submit-button` Pattern)
```
HTML: .newsletter-form > .field.relative > input.input.is-floating
                                         + .self-submit-button.absolute > button
Fix:
  - Input padding: 14px 56px 14px 16px  (right side clearance for the button)
  - .self-submit-button: absolute right:6px, top:50%, translateY(-50%)
  - Button: 36x36px circle, var(--al-accent), no btn-fill, white arrow SVG
CSS class to target: .newsletter-form  (NOT .newsletter__form)
```

### `al-lifestyle-gallery` Schema Padding Min
```
Must be min:20, not min:40.
If min:40 and templates set padding:20 → Shopify 422 error blocks all template pushes.
Correct: { "min": 20, "max": 120, "step": 4, "default": 20 }
```

### Inline Styles Rejected in JSON Richtext
```
WRONG: "<p style=\"font-size:0.75rem\">text</p>"
RIGHT: "<p class=\"my-class\">text</p>" + CSS rule
```

---

## UI/UX Design Rules

1. **Dark backgrounds = white logo always**
2. **Pro → Elite upsell** must be visible on Pro product page
3. **Streaming (Netflix/YouTube/Google Play)** is a headline feature — always above the fold
4. **Reviews** live on individual product pages only — no dedicated reviews page
5. All nav changes: create new menus — never modify existing store menus
6. **Never publish/deploy automatically** — manual publish only after human review
7. Section padding: AL custom sections min 20px, Concept built-in sections min 40px
   - AL custom (`al-lifestyle-gallery`, `al-how-it-works`, `al-video-section`) → 20px
   - Concept built-in (`multicolumn-with-icons`, `image-with-text`, etc.) → 40px minimum
   - STEP badge removed from `al-how-it-works` — never re-add
7a. Announcement bar: marquee layout, flat (rounded: false)
8. CTA buttons must have neon glow: `box-shadow: 0 0 20px rgba(59,142,248,0.35)`
9. Body text minimum: `#C8C8D0` on dark backgrounds
10. Heading letter-spacing: `-0.02em` to `-0.03em`

---

## Autonomous Work Protocol

When working on this store, follow this loop:

```
Plan → Build → Push → Screenshot → Score → Fix → Commit
```

1. **Plan** — Read current file(s) before editing. Never edit blind.
2. **Build** — Edit in workspace only
3. **Push** — To dev theme only (ID: 184215470114). NEVER the live theme.
4. **Screenshot** — `https://aa3954.myshopify.com/?preview_theme_id=184215470114`
5. **Score** — All sections must score ≥ 8/10 before moving on
6. **Fix** — Address anything below 8
7. **Commit** — `git add` + `git commit` + meaningful message

### Self-Scoring Checklist (minimum before commit)
```
□ All nav items same size, same weight, same baseline (desktop)
□ Mobile sub-nav panels don't bleed parent items
□ White logo on all dark backgrounds
□ No accordion chevrons in nav summaries
□ Body text ≥ #C8C8D0 on dark bg
□ Pro page has visible Elite upsell
□ CTAs have neon glow
□ No placeholder/lorem copy
□ Section padding ≥ 60px desktop
□ Mobile layout clean at 390px
```

---

## Git Commit Log (Recent)

| Hash | Message |
|---|---|
| `e532d47` | fix(ui): announcement marquee+flat, polish buttons, newsletter layout, 422 template fixes |
| `c55d8d0` | fix(nav): refine mega menu card subtexts + image ratios |
| `c9de3a5` | feat(nav): add Dash Cams + Accessories mega menus, fix card spacing, fix Help dropdown |
| `93682e5` | feat(content): integrate new lifestyle photography + al-lifestyle-gallery section |
| `e5d1725` | fix(header): announcement bar #3B8EF8 blue + white bold text, reduce header padding |
| `ae7dd88` | fix(nav): correct desktop + mobile menu styling |
| `f6fb93f` | fix(nav): scope accordion summary rules, fix nav inline alignment |
| `efe056e` | fix(css): v5.1 — drawer inner panel fix, announcement bar solid color |
| `de6f2c0` | fix(header): remove nav pill boxes — btn-duplicate, magnet-element |

---

## How to Update This Skill

Update this skill whenever:
- A new product is added (handle, template suffix, price, positioning)
- A CDN asset changes (logo, video, image URLs)
- A design token changes (color, font, spacing)
- A new custom section is created
- A major CSS rule or architecture decision is made
- A new Concept theme quirk or defect is discovered
- The nav structure changes
- A new git commit with structural significance is made

After updating, save to the personal skill library:
```
save_custom_skill(
  file_path="/home/user/workspace/skills/autolinkr-brand-theme/SKILL.md",
  skill_id="<id from first save>"
)
```