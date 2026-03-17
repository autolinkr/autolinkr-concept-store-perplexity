---
name: shopify-theme-dev
description: "Design and build a Shopify theme from scratch or on top of a purchased base theme. Use when establishing a brand design system (CSS tokens, color palette, typography), creating custom Liquid sections, authoring JSON templates, styling for dark/premium aesthetics, applying global CSS overrides to a purchased Concept/Debut/Dawn/Impulse theme, building custom hero sections, feature strips, how-it-works layouts, and video sections. Covers the full iterative loop of plan, build, push, screenshot, review, improve. Load alongside shopify-store-bootstrap."
license: MIT
metadata:
  author: perplexity-computer
  version: '1.1'
---

# Shopify Theme Development

## When to Use This Skill

Load for:
- Building a design system (tokens, colors, fonts) on top of any Shopify theme
- Applying a dark/premium brand identity to a purchased theme
- Creating custom Liquid sections with `{% schema %}` blocks
- Authoring OS 2.0 JSON templates (`templates/*.json`)
- Global CSS overrides that survive theme updates
- Iterating on look & feel with screenshot-driven self-review

---

## Core Philosophy

**Leverage the theme first, customize second.**

When working with a purchased theme (Concept, Dawn, Impulse, Debut):
1. Use the theme's built-in section types and components where possible
2. Override with CSS tokens — do NOT rewrite theme HTML
3. Only create fully custom `.liquid` sections when the theme has no equivalent
4. This approach survives theme updates and avoids breakage

---

## Design System Architecture

### File Structure for Custom Styling
```
assets/
├── YOUR-BRAND-tokens.css   ← The single source of truth for all brand styles
├── YOUR-BRAND-header.css   ← Header-specific overrides (if needed)
├── YOUR-BRAND-product.css  ← Product page specific styles (if needed)
layout/
└── theme.liquid            ← Where you link your CSS files
```

### How to Link Custom CSS in theme.liquid
Add inside `<head>`:
```liquid
{{ 'YOUR-BRAND-tokens.css' | asset_url | stylesheet_tag }}
```
Place this AFTER the theme's own stylesheet links so your styles take precedence.

---

## CSS Design Token Template

Create `assets/YOUR-BRAND-tokens.css`. This file controls everything:

```css
/*
 * [Brand Name] Design System
 * Philosophy: [describe the aesthetic — e.g. "dark premium, Apple-meets-Tesla"]
 * Version: 1.0
 */

/* ─── FONTS ──────────────────────────────────────────────── */
@import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

/* ─── DESIGN TOKENS ──────────────────────────────────────── */
:root {
  /* Background Scale — dark theme */
  --brand-bg:        #080809;
  --brand-surface:   #0F0F12;
  --brand-surface-2: #161619;
  --brand-surface-3: #1E1E22;
  --brand-surface-4: #26262B;

  /* Borders */
  --brand-border:        #2A2A30;
  --brand-border-subtle: #1A1A1F;
  --brand-border-bright: #3A3A42;

  /* Text Scale — carefully chosen for readability */
  --brand-text-1: #F7F7F8;      /* Headlines */
  --brand-text-2: #C8C8D0;      /* Body — readable on dark */
  --brand-text-3: #8A8A94;      /* Muted / captions */
  --brand-text-4: #4A4A52;      /* Disabled / placeholder */

  /* Accent Color — pick one strong brand color */
  --brand-accent:       #3B8EF8;   /* Electric blue example */
  --brand-accent-hover: #2478E8;
  --brand-accent-dim:   rgba(59, 142, 248, 0.10);
  --brand-accent-border: rgba(59, 142, 248, 0.30);
  --brand-accent-glow:  0 0 40px rgba(59, 142, 248, 0.25);

  /* Secondary accent (e.g. premium gold for top-tier product) */
  --brand-gold:        #F0A840;
  --brand-gold-dim:    rgba(240, 168, 64, 0.12);

  /* Semantic */
  --brand-green:  #34D06A;
  --brand-red:    #FF4D40;
  --brand-amber:  #FFAA0A;

  /* Typography */
  --brand-font-display: 'General Sans', -apple-system, 'Segoe UI', sans-serif;
  --brand-font-body:    'Inter', -apple-system, 'Segoe UI', sans-serif;

  /* Type Scale — fluid responsive */
  --brand-text-hero: clamp(2.75rem, 6.5vw, 5rem);
  --brand-text-h2:   clamp(1.875rem, 3.8vw, 3rem);
  --brand-text-h3:   clamp(1.5rem, 2.4vw, 2rem);
  --brand-text-body: 1rem;
  --brand-text-sm:   0.9375rem;
  --brand-text-xs:   0.8125rem;

  /* Spacing Scale */
  --brand-sp-4:  1rem;
  --brand-sp-6:  1.5rem;
  --brand-sp-8:  2rem;
  --brand-sp-12: 3rem;
  --brand-sp-16: 4rem;
  --brand-sp-20: 5rem;

  /* Layout */
  --brand-max-w:     1280px;
  --brand-r-sm:      6px;
  --brand-r-md:      12px;
  --brand-r-lg:      18px;
  --brand-r-xl:      24px;
  --brand-transition: 220ms cubic-bezier(0.2, 0, 0, 1);

  /* Shadows */
  --brand-shadow-sm: 0 1px 3px rgba(0,0,0,0.5);
  --brand-shadow-md: 0 4px 20px rgba(0,0,0,0.6);
  --brand-shadow-lg: 0 16px 48px rgba(0,0,0,0.75);
  --brand-shadow-accent: 0 4px 28px rgba(59, 142, 248, 0.22);
}

/* ─── PURCHASED THEME VARIABLE BRIDGE ───────────────────── */
/* Map Concept/Dawn/Debut CSS variables to brand tokens      */
:root {
  /* IMPORTANT: Concept theme uses RGB TRIPLETS not hex values */
  --color-background: 8, 8, 9;
  --color-foreground: 247, 247, 248;
  --color-border: 42, 42, 48;
  --color-button-background: 59, 142, 248;
  --color-button-text: 255, 255, 255;
}
```

### Global Base Reset:
```css
body, .shopify-section, .section {
  background-color: var(--brand-bg);
  color: var(--brand-text-1);
  font-family: var(--brand-font-body);
  -webkit-font-smoothing: antialiased;
}
p, li { color: var(--brand-text-2); }
h1, h2, h3, h4, h5, h6, .heading {
  color: var(--brand-text-1) !important;
  font-family: var(--brand-font-display) !important;
  letter-spacing: -0.02em;
}
a { color: var(--brand-accent); transition: color var(--brand-transition); }
a:hover { color: var(--brand-accent-hover); }
```

---

## Concept Theme — Specific Knowledge

The **Concept theme** (Shopify Theme Store ID: 2412) has unique behaviors that require special handling:

### CSS Variable Format
Concept uses **RGB triplets** — NOT hex values:
```css
/* CORRECT for Concept */
--color-background: 8, 8, 9;

/* WRONG — will not apply */
--color-background: #080809;
```

### Navigation Pill Removal
Concept's header uses a `magnet-element` web component + `btn-duplicate` span to create pill hover effects. To remove these visual boxes and get clean text nav links:

```css
/* Hide the duplicate pill element */
.btn-duplicate { display: none !important; }

/* Kill magnet web component background */
magnet-element { background: transparent !important; box-shadow: none !important; }

/* Remove block/pill states from nav items */
ul.with-block > li summary,
ul.with-dot > li summary,
ul.with-block > li a,
ul.with-dot > li a {
  background: transparent !important;
  box-shadow: none !important;
}
```

Also set in `sections/header-group.json`:
```json
"menu_active": "dot"
```
Valid values for `menu_active` are only `"dot"` or `"block"`. Use `"dot"` for the cleanest look.

### Concept Collapsible Sections
Concept renders collapsibles with `<details>/<summary>`. To prevent double-icon (theme icon + your CSS chevron):
```css
/* Hide Concept's built-in collapsible icon */
details summary .icon,
details summary svg,
.accordion__button .icon { display: none !important; }

/* Add single CSS chevron */
details summary::after {
  content: '';
  display: inline-block;
  width: 10px; height: 10px;
  border-right: 2px solid var(--brand-text-3);
  border-bottom: 2px solid var(--brand-text-3);
  transform: rotate(45deg);
  transition: transform var(--brand-transition);
  flex-shrink: 0;
}
details[open] summary::after {
  transform: rotate(-135deg);
  border-color: var(--brand-accent);
}
```

### Concept Announcement Bar
For neon gradient announcement bar in `sections/header-group.json`:
```json
"announcement-bar": {
  "settings": {
    "color_background": "#0A1A4A",
    "color_text": "#E8F4FF",
    "color_highlight": "#3B8EF8",
    "autoplay": true,
    "autoplay_speed": 4
  }
}
```

With CSS shimmer effect:
```css
.announcement-bar {
  background: linear-gradient(90deg, #0A1628 0%, #0D2150 25%, #1A3A8C 50%, #0D2150 75%, #0A1628 100%) !important;
  border-bottom: 1px solid rgba(59,142,248,0.25) !important;
  overflow: hidden !important;
  position: relative !important;
}
.announcement-bar::before {
  content: '';
  position: absolute;
  top: 0; left: -100%; bottom: 0;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(59,142,248,0.08), transparent);
  animation: al-shimmer 3s ease-in-out infinite;
}
@keyframes al-shimmer { 0% { left: -100%; } 100% { left: 100%; } }
```

---

## Neon Glow Pattern (Premium Effect)

```css
/* Primary CTA buttons with neon glow */
.button--primary, .btn-primary {
  background: var(--brand-accent) !important;
  color: #fff !important;
  box-shadow: 0 0 20px rgba(59,142,248,0.35), 0 4px 16px rgba(59,142,248,0.20) !important;
  border-radius: var(--brand-r-md) !important;
  font-family: var(--brand-font-display) !important;
  font-weight: 600 !important;
  transition: all var(--brand-transition) !important;
}
.button--primary:hover {
  box-shadow: 0 0 32px rgba(59,142,248,0.55), 0 6px 24px rgba(59,142,248,0.30) !important;
  transform: translateY(-1px) !important;
}
```

---

## Custom Liquid Section Template

Every custom section follows this pattern:

```liquid
{% comment %}
  [Brand] — Section Name
  Description of what this section does
{% endcomment %}

{%- style -%}
  /* Scoped CSS goes here — renders inline in <head> */
  .my-section { background: var(--brand-bg); padding: {{ section.settings.padding_top }}px 0; }
{%- endstyle -%}

<section class="my-section">
  <div class="page-width" style="max-width:var(--brand-max-w);margin:0 auto;padding:0 24px;">

    {%- if section.settings.heading != blank -%}
      <h2>{{ section.settings.heading }}</h2>
    {%- endif -%}

    {%- for block in section.blocks -%}
      {%- if block.type == 'card' -%}
        <div class="my-card" {{ block.shopify_attributes }}>
          {{ block.settings.text }}
        </div>
      {%- endif -%}
    {%- endfor -%}

  </div>
</section>

{% schema %}
{
  "name": "Section Display Name",
  "tag": "section",
  "settings": [
    { "type": "range", "id": "padding_top", "label": "Padding top", "min": 20, "max": 120, "step": 4, "default": 80, "unit": "px" },
    { "type": "range", "id": "padding_bottom", "label": "Padding bottom", "min": 20, "max": 120, "step": 4, "default": 80, "unit": "px" },
    { "type": "inline_richtext", "id": "heading", "label": "Heading", "default": "Section Title" }
  ],
  "blocks": [
    {
      "type": "card",
      "name": "Card",
      "settings": [
        { "type": "richtext", "id": "text", "label": "Content", "default": "<p>Card content here</p>" }
      ]
    }
  ],
  "presets": [{ "name": "Section Display Name" }]
}
{% endschema %}
```

### Schema Field Types Reference:
```
text          → Single line text input
textarea      → Multi-line text
richtext      → Rich text editor — value MUST have <p> wrapper
inline_richtext → Inline bold/italic only — no <p> needed
image_picker  → Shopify media picker
url           → URL field
select        → Dropdown — values MUST be strings
checkbox      → Boolean
range         → Slider — must be within min/max
color         → Color picker
product       → Product reference (handle)
collection    → Collection reference
```

---

## JSON Template Structure (OS 2.0)

Every page in Shopify OS 2.0 uses a JSON template that references sections:

```json
{
  "sections": {
    "section-key": {
      "type": "section-filename-without-extension",
      "blocks": {
        "block-key": {
          "type": "block-type-from-schema",
          "settings": {
            "field_id": "value"
          }
        }
      },
      "block_order": ["block-key"],
      "settings": {
        "setting_id": "value"
      }
    }
  },
  "order": ["section-key"]
}
```

### Template → File Mapping:
```
templates/index.json          → Homepage
templates/product.json        → Default product page
templates/product.SUFFIX.json → Custom product template (suffix = template_suffix in product)
templates/collection.json     → Default collection
templates/page.json           → Default page
templates/page.SUFFIX.json    → Custom page template
templates/cart.json           → Cart page
```

### Assigning Custom Templates to Products:
In Shopify Admin → Product → Theme template → select the suffix. Or via API:
```python
# Set product template_suffix via API
payload = json.dumps({"product": {"id": PRODUCT_ID, "template_suffix": "my-suffix"}}).encode()
```

---

## Common Section Patterns

### Hero Section:
```liquid
<section style="position:relative;background:var(--brand-bg);min-height:700px;">
  <!-- Gradient overlay -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(59,142,248,0.12) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="page-width" style="max-width:var(--brand-max-w);margin:0 auto;padding:120px 24px;">
    <span style="color:var(--brand-accent);font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">{{ section.settings.eyebrow }}</span>
    <h1 style="font-size:var(--brand-text-hero);font-weight:700;color:var(--brand-text-1);letter-spacing:-0.03em;line-height:1.0;max-width:820px;margin:12px 0 24px;">{{ section.settings.heading }}</h1>
    <p style="color:var(--brand-text-2);font-size:1.125rem;line-height:1.65;max-width:540px;margin:0 0 40px;">{{ section.settings.subheading }}</p>
    <a href="{{ section.settings.cta_link }}" class="button button--primary">{{ section.settings.cta_label }} →</a>
  </div>
</section>
```

### Feature Strip (horizontal icon bar):
```liquid
<div style="background:var(--brand-surface);border-top:1px solid var(--brand-border-subtle);border-bottom:1px solid var(--brand-border-subtle);padding:20px 0;">
  <div style="max-width:var(--brand-max-w);margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:24px;">
    {%- for block in section.blocks -%}
      <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:180px;">
        <div style="width:36px;height:36px;background:var(--brand-accent-dim);border:1px solid var(--brand-accent-border);border-radius:8px;display:flex;align-items:center;justify-content:center;">
          <!-- SVG icon here -->
        </div>
        <div>
          <strong style="display:block;font-size:0.875rem;font-weight:600;color:var(--brand-text-1);">{{ block.settings.title }}</strong>
          <span style="font-size:0.8125rem;color:var(--brand-text-3);">{{ block.settings.subtitle }}</span>
        </div>
      </div>
    {%- endfor -%}
  </div>
</div>
```

---

## Footer Styling (Built-In Theme Footer)

```css
.footer {
  background: #080809 !important;
  border-top: 1px solid var(--brand-border) !important;
  padding-top: 56px !important;
}
/* White logo on dark footer — use CDN white logo URL in footer settings */
.footer__logo img, .footer [class*="logo"] img {
  filter: brightness(0) invert(1) !important;
  max-height: 36px !important;
}
/* Column headings */
.footer .heading, .footer h2, .footer h3, .footer h4 {
  color: var(--brand-text-1) !important;
  font-size: 0.8125rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  margin-bottom: 16px !important;
}
/* Links */
.footer a, .footer__list a {
  color: var(--brand-text-3) !important;
  font-size: 0.875rem !important;
  line-height: 2 !important;
  transition: color var(--brand-transition) !important;
}
.footer a:hover { color: var(--brand-text-1) !important; }
```

**Logo rule:** Always use the white version of the logo in footers and dark headers. Reference via Shopify CDN URL or `shopify://shop_images/LogoWhite.png`.

---

## Collapsible / Accordion Styling

```css
/* Premium glass-card accordion */
.accordion__button, details summary {
  background: linear-gradient(135deg, var(--brand-surface-2), var(--brand-surface-3)) !important;
  border: 1px solid var(--brand-border) !important;
  border-radius: var(--brand-r-md) !important;
  color: var(--brand-text-1) !important;
  font-weight: 600 !important;
  padding: 18px 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  list-style: none !important;
}
/* CSS chevron (only ONE icon — hide any theme built-in icon) */
.accordion__button::after, details summary::after {
  content: '';
  display: inline-block;
  width: 10px; height: 10px;
  border-right: 2px solid var(--brand-text-3);
  border-bottom: 2px solid var(--brand-text-3);
  transform: rotate(45deg);
  transition: transform var(--brand-transition);
  flex-shrink: 0;
}
details[open] summary::after { transform: rotate(-135deg); border-color: var(--brand-accent); }
/* Hide any theme-provided icon to prevent double icon */
details summary .icon, details summary svg, .accordion__button .icon {
  display: none !important;
}
```

---

## Logo Rules

```css
/* Force white logo on dark header */
.header__heading-logo img, .header__logo img {
  filter: brightness(0) invert(1) !important;
}
/* White logo in footer */
.footer [class*="logo"] img {
  filter: brightness(0) invert(1) !important;
}
```

In JSON settings, reference the white logo:
```json
"logo": "shopify://shop_images/YourLogoWhite.png"
```

**Rule:** Dark background = white logo. Light background = dark logo. Never swap these.

---

## Iterative Development Loop

```
1. Plan     → Read current file(s) BEFORE editing — never edit blind
2. Build    → Edit CSS / Liquid / JSON in workspace
3. Push     → Push to Shopify dev theme only (never live theme)
4. Verify   → Pull fresh asset to confirm byte count changed
5. Screenshot → Take screenshot of preview URL
6. Review   → Inspect every element: text wrapping, colors, spacing, contrast
7. Score    → Rate each section 1–10; fix anything below 8
8. Commit   → git add, commit, push only after verified
```

### After Every Push — Self-Review Checklist:
```
□ No text wrapping mid-word or overflowing containers
□ All logos are white on dark backgrounds
□ Heading → body text has adequate breathing room (≥ 12px gap)
□ CTAs are clearly visible with glow/shadow
□ Body text is ≥ #C8C8D0 on dark backgrounds
□ No duplicate icons in collapsibles
□ Section spacing feels generous, not cramped
□ Mobile layout collapses cleanly (test at 390px width)
□ No orphaned placeholder content ("hello@domain.com", "Lorem ipsum")
□ Announcement bar copy is compelling, not generic
□ Nav links are clean text — no pill boxes around them
□ Footer has correct white logo and adequate top padding
```

---

## AI Image Generation for Missing Content

When product imagery or lifestyle photos are needed:
```
Use run_subagent with subagent_type="general_purpose"
Prompt: "Generate a photorealistic [description] product image.
Style: Dark studio background, premium ecommerce, soft edge lighting.
Subject: [exact product description]
Output: Save to /home/user/workspace/images/filename.png"
```

Then upload to Shopify CDN:
```python
import urllib.request, json, base64

with open('/home/user/workspace/images/product.png', 'rb') as f:
    img_b64 = base64.b64encode(f.read()).decode()

payload = json.dumps({"asset": {
    "key": "assets/product-image.png",
    "attachment": img_b64
}}).encode()
# PUT to Shopify assets endpoint as usual
```
