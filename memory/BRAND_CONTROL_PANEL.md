# AutoLinkr™ Brand Control Panel
> **Version:** 1.0 — March 2026  
> **File:** `BRAND_CONTROL_PANEL.md`  
> **Purpose:** Single source of truth for all brand styling, design tokens, and theming decisions.  
> Editing this file and propagating the values below is the *only* change needed to restyle the entire site.

---

## How This File Works

Every section below documents a design token as:
```
Token name → Current value → Where it lives → What it affects
```

To change the look and feel of the entire site:
1. Edit the values in this file first (use it as your design brief)
2. Apply the changed values to the three files that matter most:
   - `assets/autolinkr-tokens.css` — CSS custom properties (all visual tokens)
   - `sections/header-group.json` — announcement bar, header layout settings
   - `templates/*.json` — per-page Shopify section settings (padding, hero content, etc.)

> **CRITICAL — Concept theme quirk:** CSS variables must use RGB triplets, not hex values, when overriding Concept's own `--color-*` vars. Example: `--color-background: 8, 8, 9` not `#080809`.

---

## Brand Philosophy

**Aesthetic:** "Apple.com dark mode meets Rivian meets Nothing Phone"  
- World-class dark premium ecommerce
- Every element feels intentional, airy, and high-end
- Dark backgrounds, electric blue accent, crisp typography
- Neon glow on CTAs — subtle but powerful
- Generous whitespace — never cramped
- Always push Pro → Elite upsell messaging
- Streaming and Google Play are KEY selling points for Pro & Elite

---

## 1. Colors

### 1A. Background Scale

These form the depth hierarchy — darkest at the base, lightest on top-of-card surfaces.

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Page base | `#080809` | `--al-bg` | `body`, `.shopify-section`, `.section` backgrounds |
| Surface | `#0F0F12` | `--al-surface` | Cards, panels, feature strips |
| Surface 2 | `#161619` | `--al-surface-2` | Elevated cards, accordion panels |
| Surface 3 | `#1E1E22` | `--al-surface-3` | Hover states, nested surfaces |
| Surface 4 | `#26262B` | `--al-surface-4` | Deepest nested elements, borders |

**File:** `assets/autolinkr-tokens.css` → `:root { ... }` block  
**Concept bridge (required):** `--color-background: 8, 8, 9` (RGB triplet, no hex)

To darken the entire site → lower all background values closer to `#000000`  
To lighten → raise all background values toward `#1A1A1F`

---

### 1B. Border Scale

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Default border | `#2A2A30` | `--al-border` | Card edges, section dividers, inputs |
| Subtle border | `#1A1A1F` | `--al-border-subtle` | Section separators, strip tops/bottoms |
| Bright border | `#3A3A42` | `--al-border-bright` | Emphasized separators |

**File:** `assets/autolinkr-tokens.css`

---

### 1C. Text Scale

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Text 1 (headlines) | `#F7F7F8` | `--al-text-1` | All `h1–h6`, product titles, eyebrow labels |
| Text 2 (body) | `#C8C8D0` | `--al-text-2` | Body copy, descriptions, card text |
| Text 3 (muted) | `#8A8A94` | `--al-text-3` | Captions, labels, footer links, placeholder |
| Text 4 (disabled) | `#4A4A52` | `--al-text-4` | Disabled states, form hints |

**File:** `assets/autolinkr-tokens.css`  
**WCAG rule:** Text 2 on Surface must always be ≥ 4.5:1 contrast ratio. Never go below `#C0C0C8`.

---

### 1D. Accent Color — Electric Blue

The primary brand color. Used on CTAs, links, eyebrows, nav hovers, icons, glows.

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Accent | `#3B8EF8` | `--al-accent` | CTA buttons, links, icon fills, progress bars |
| Accent hover | `#2478E8` | `--al-accent-hover` | Button hover state |
| Accent dim | `rgba(59,142,248,0.10)` | `--al-accent-dim` | Icon container backgrounds, eyebrow bg |
| Accent glow | `0 0 40px rgba(59,142,248,0.25)` | `--al-accent-glow` | Ambient glow on cards |
| Accent border | `rgba(59,142,248,0.30)` | `--al-accent-border` | Hover border color on cards |

**File:** `assets/autolinkr-tokens.css`  
**Also update:** `sections/header-group.json` → announcement bar `color_background` → `#3B8EF8`  
**Concept bridge:** `--color-button-background: 59, 142, 248` (RGB triplet)

To change brand color → update ALL five tokens above plus header-group.json + color bridge.

---

### 1E. Elite Gold — Premium Tier Accent

Used only on Elite product pages and comparison table highlights.

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Gold | `#F0A840` | `--al-gold` | Elite badges, star ratings, premium callouts |
| Gold dim | `rgba(240,168,64,0.12)` | `--al-gold-dim` | Elite card bg tint |
| Gold border | `rgba(240,168,64,0.30)` | `--al-gold-border` | Elite card border |
| Gold shadow | `0 4px 28px rgba(240,168,64,0.20)` | `--al-shadow-gold` | Elite CTA glow |

**File:** `assets/autolinkr-tokens.css`

---

### 1F. Semantic Colors

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Green | `#34D06A` | `--al-green` | Compatibility check (✓), success states |
| Red | `#FF4D40` | `--al-red` | Error states, sale price strike |
| Amber | `#FFAA0A` | `--al-amber` | Warning badges |

**File:** `assets/autolinkr-tokens.css`

---

### 1G. Announcement Bar Color

| Property | Value | File | Key |
|---|---|---|---|
| Background | `#3B8EF8` | `assets/autolinkr-tokens.css` | `.topbar-section { background: #3B8EF8 }` |
| Background (JSON) | `#3B8EF8` | `sections/header-group.json` | `announcement-bar.settings.color_background` |
| Text color | `#FFFFFF` | `assets/autolinkr-tokens.css` | `.announcement-bar a, p, span { color: #FFFFFF }` |
| Font weight | `700` | `assets/autolinkr-tokens.css` | bold text rule |
| Rounded | `false` | `sections/header-group.json` | `announcement-bar.settings.rounded: false` |
| Layout | `marquee` | `sections/header-group.json` | `announcement-bar.settings.layout: "marquee"` |

**MUST update both files** — Concept injects inline `<style>` from JSON that can override CSS alone.

---

## 2. Typography

### 2A. Font Families

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Display font | `'General Sans'` | `--al-font-display` | All headings, nav items, CTAs, stat values |
| Body font | `'Inter'` | `--al-font-body` | Body copy, descriptions, form inputs |

**File:** `assets/autolinkr-tokens.css` → `@import` lines at top  
**Display font source:** `https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap`  
**Body font source:** `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap`

To swap fonts → change `@import` URLs + `--al-font-display` and `--al-font-body` values.

---

### 2B. Type Scale — Fluid Responsive

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Hero H1 | `clamp(2.75rem, 6.5vw, 5rem)` | `--al-text-hero` | Homepage hero headline |
| H2 | `clamp(1.875rem, 3.8vw, 3rem)` | `--al-text-h2` | Section headings |
| H3 | `clamp(1.5rem, 2.4vw, 2rem)` | `--al-text-h3` | Subsection headings |
| H4 | `clamp(1.25rem, 1.6vw, 1.5rem)` | `--al-text-h4` | Card titles |
| Body | `1rem` | `--al-text-body` | Paragraph text |
| Small | `0.9375rem` (15px) | `--al-text-sm` | Labels, secondary text |
| Extra small | `0.8125rem` (13px) | `--al-text-xs` | Captions, eyebrow labels |

**File:** `assets/autolinkr-tokens.css`

---

### 2C. Typography Rules (non-negotiable)

| Rule | Value | Where applied |
|---|---|---|
| Heading letter-spacing | `-0.02em` to `-0.03em` | All `h1–h6` in tokens.css |
| Body line-height | `1.7` | `p, li` rules |
| Eyebrow text-transform | `uppercase` | `.al-bh__eyebrow`, `.eyebrow` |
| Eyebrow letter-spacing | `0.1em` | Eyebrow class |
| CTA font-weight | `600` | `.button` base rule |
| Nav font-weight | `500` | `header .menu__item` |
| Footer heading text-transform | `uppercase` | `.footer .heading` |

---

## 3. Buttons

All buttons use **pill shape** (`border-radius: 9999px`). This is a non-negotiable brand rule.

### 3A. Primary CTA Button

| Property | Value | CSS Class / Variable |
|---|---|---|
| Background | `var(--al-accent)` = `#3B8EF8` | `.button--primary` |
| Text color | `#FFFFFF` | `.button--primary` |
| Border | `none` | `.button--primary` |
| Border radius | `9999px` (pill) | `.button` base |
| Padding | `14px 32px` | `.button--primary` |
| Font size | `0.9375rem` | `.button--primary` |
| Font weight | `600` | `.button` base |
| Box shadow (default) | `0 0 20px rgba(59,142,248,0.35), 0 4px 16px rgba(59,142,248,0.18)` | `.button--primary` |
| Box shadow (hover) | `0 0 32px rgba(59,142,248,0.55), 0 6px 24px rgba(59,142,248,0.30)` | `.button--primary:hover` |
| Hover transform | `translateY(-2px)` | `.button--primary:hover` |
| `btn-fill` | `transparent` (disabled) | `.button .btn-fill` |

**File:** `assets/autolinkr-tokens.css` → `─── BUTTONS ───` section

---

### 3B. Secondary / Ghost Button

| Property | Value | CSS Class |
|---|---|---|
| Background | `transparent` | `.button--secondary` |
| Text color | `var(--al-text-1)` | `.button--secondary` |
| Border | `1.5px solid rgba(255,255,255,0.25)` | `.button--secondary` |
| Border radius | `9999px` (pill) | `.button` base |
| Padding | `14px 28px` | `.button--secondary` |
| Hover border color | `var(--al-accent)` | `.button--secondary:hover` |
| Hover text color | `var(--al-accent)` | `.button--secondary:hover` |
| Hover bg | `rgba(59,142,248,0.08)` | `.button--secondary:hover` |

---

### 3C. Close (X) Button — Dark Mode Fix

| Property | Value | CSS Class |
|---|---|---|
| Icon color | `#F7F7F8` | `.button--close svg` |
| Border color | `rgba(255,255,255,0.25)` | `.button--close` |
| Background | `rgba(255,255,255,0.07)` | `.button--close` |

The close button inside mega menus was nearly invisible on dark backgrounds. These overrides ensure it always shows white.

---

## 4. Spacing

### 4A. Spacing Scale

| Token | Value | CSS Variable |
|---|---|---|
| sp-1 | `0.25rem` (4px) | `--al-sp-1` |
| sp-2 | `0.5rem` (8px) | `--al-sp-2` |
| sp-3 | `0.75rem` (12px) | `--al-sp-3` |
| sp-4 | `1rem` (16px) | `--al-sp-4` |
| sp-5 | `1.25rem` (20px) | `--al-sp-5` |
| sp-6 | `1.5rem` (24px) | `--al-sp-6` |
| sp-8 | `2rem` (32px) | `--al-sp-8` |
| sp-10 | `2.5rem` (40px) | `--al-sp-10` |
| sp-12 | `3rem` (48px) | `--al-sp-12` |
| sp-16 | `4rem` (64px) | `--al-sp-16` |
| sp-20 | `5rem` (80px) | `--al-sp-20` |
| sp-24 | `6rem` (96px) | `--al-sp-24` |

**File:** `assets/autolinkr-tokens.css`

---

### 4B. Section Padding Rules

| Section type | Padding rule | Source |
|---|---|---|
| AL custom sections (`al-*`) | min `20px`, default `80px` | Schema `range` setting |
| Concept built-in sections | min `40px`, default `72px` | JSON template settings |
| Hero sections | top+bottom controlled via `padding_top` / `padding_bottom` schema sliders | `al-brand-hero.liquid` schema |
| Mobile hero padding | Same value as desktop (linked via `padding_top_mobile` slider) | `al-brand-hero.liquid` schema |

**Rule:** Do not go below 20px on any AL custom section. Concept sections should never be below 40px.

---

### 4C. Layout Constants

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Max content width | `1280px` | `--al-max-w` | `.page-width` containers |
| Nav height | `64px` | `--al-nav-h` | Header height reference |
| Hero min height (desktop) | `700px` | Schema setting `min_height` | `al-brand-hero` |
| Hero min height (mobile) | `700px` | Schema setting `min_height_mobile` | `al-brand-hero` |

---

## 5. Border Radius

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Small | `6px` | `--al-r-sm` | Badges, small tags, variant buttons |
| Medium | `12px` | `--al-r-md` | Input fields, accordion panels |
| Large | `18px` | `--al-r-lg` | Product cards, feature cards |
| Extra large | `24px` | `--al-r-xl` | Collection cards, media containers, testimonial cards |
| Pill | `9999px` | (hardcoded) | All CTA/action buttons — non-negotiable |

**File:** `assets/autolinkr-tokens.css`

---

## 6. Effects — Shadows & Glows

### 6A. Shadow Scale

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Shadow SM | `0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.7)` | `--al-shadow-sm` | Subtle depth |
| Shadow MD | `0 4px 20px rgba(0,0,0,0.6)` | `--al-shadow-md` | Card hover, dropdown panels |
| Shadow LG | `0 16px 48px rgba(0,0,0,0.75)` | `--al-shadow-lg` | Modal overlays, mega menus |
| Shadow XL | `0 32px 80px rgba(0,0,0,0.85)` | `--al-shadow-xl` | Fullscreen overlays |
| Accent shadow | `0 4px 28px rgba(59,142,248,0.22)` | `--al-shadow-accent` | Card hover w/ blue ambient glow |
| Gold shadow | `0 4px 28px rgba(240,168,64,0.20)` | `--al-shadow-gold` | Elite product highlights |

**File:** `assets/autolinkr-tokens.css`

---

### 6B. Glassmorphism

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Glass background | `rgba(15,15,18,0.85)` | `--al-glass-bg` | Testimonial cards, overlay panels |
| Glass border | `rgba(255,255,255,0.06)` | `--al-glass-border` | Glass card edges |
| Glass blur | `blur(20px)` | `--al-glass-blur` | `backdrop-filter` on glass elements |

**File:** `assets/autolinkr-tokens.css`

---

## 7. Animation

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Base transition | `220ms cubic-bezier(0.2, 0, 0, 1)` | `--al-transition` | All hover/state transitions |

**File:** `assets/autolinkr-tokens.css`

Hero section entry animations:
- Eyebrow → `al-fade-up 0.5s 0.1s both`
- Headline → `al-fade-up 0.5s 0.15s both`
- Subheading → `al-fade-up 0.5s 0.2s both`
- Actions → `al-fade-up 0.5s 0.25s both`
- Stats → `al-fade-up 0.5s 0.3s both`

---

## 8. Hero Section (AL Brand Hero)

The hero is a custom section (`sections/al-brand-hero.liquid`). All settings below are controllable via Shopify theme editor OR by editing `templates/index.json` directly.

### 8A. Background Images

| Setting | Current Value | File | Key |
|---|---|---|---|
| Desktop image (CDN) | `https://cdn.shopify.com/.../2M2A9251-HDR.jpg` | `templates/index.json` | `al-brand-hero.settings.bg_image_url` |
| Desktop image (Shopify) | `shopify://shop_images/2M2A9230-HDR.jpg` | `templates/index.json` | `al-brand-hero.settings.background_image` |
| Desktop focal point | `70% center` | `templates/index.json` | `al-brand-hero.settings.focal_point` |
| Mobile image (CDN) | _(blank — falls back to desktop)_ | `templates/index.json` | `al-brand-hero.settings.bg_image_url_mobile` |
| Mobile image (Shopify) | `shopify://shop_images/2M2A9277.jpg` | `templates/index.json` | `al-brand-hero.settings.bg_image_mobile` |
| Mobile focal point | `center center` | `templates/index.json` | `al-brand-hero.settings.focal_point_mobile` |
| Image opacity | `80%` | `templates/index.json` | `al-brand-hero.settings.image_opacity` |

---

### 8B. Desktop Overlay

The overlay gradient is computed in Liquid at render time and applied via **inline style** on `.al-bh__content` — it is NOT in a `{%- style -%}` block (those are CDN-cached and static).

| Setting | Current Value | File | Key |
|---|---|---|---|
| Overlay color | `#0a0a0c` | `templates/index.json` | `al-brand-hero.settings.overlay_color` |
| Direction | `180deg` (top → bottom) | `templates/index.json` | `al-brand-hero.settings.overlay_direction` |
| Start opacity | `75%` | `templates/index.json` | `al-brand-hero.settings.overlay_opacity` |
| Mid opacity | `0%` | `templates/index.json` | `al-brand-hero.settings.overlay_opacity_mid` |
| End opacity | `50%` | `templates/index.json` | `al-brand-hero.settings.overlay_opacity_edge` |

---

### 8C. Mobile Overlay

Mobile override is in `assets/autolinkr-tokens.css` → `@media (max-width: 768px)` → `.al-bh__content` with `!important` to override the inline desktop gradient.

| Setting | Current Value | File |
|---|---|---|
| Mobile gradient | `linear-gradient(180deg, rgba(10,10,12,0.30) 0%, rgba(10,10,12,0.70) 50%, rgba(10,10,12,0.95) 100%)` | `assets/autolinkr-tokens.css` → `@media (max-width: 768px)` |
| Start opacity | `30%` | `templates/index.json` `overlay_opacity_mobile` |
| Mid opacity | `70%` | `templates/index.json` `overlay_opacity_mobile_mid` |
| End opacity | `95%` | `templates/index.json` `overlay_opacity_mobile_edge` |

---

### 8D. Hero Sizing & Padding

These are schema range sliders — controllable in Shopify theme editor or via JSON.

| Setting | Current Value | File | Key |
|---|---|---|---|
| Min height (desktop) | `700px` | `templates/index.json` | `al-brand-hero.settings.min_height` |
| Min height (mobile) | `700px` | `templates/index.json` | `al-brand-hero.settings.min_height_mobile` |
| Padding top (desktop) | `80px` | `templates/index.json` | `al-brand-hero.settings.padding_top` |
| Padding bottom (desktop) | `80px` | `templates/index.json` | `al-brand-hero.settings.padding_bottom` |
| Padding top & bottom (mobile) | `80px` | `templates/index.json` | `al-brand-hero.settings.padding_top_mobile` |
| Content max width | `620px` | `templates/index.json` | `al-brand-hero.settings.content_width` |

---

### 8E. Hero Content (Copy)

| Setting | Current Value | File | Key |
|---|---|---|---|
| Eyebrow | `50,000+ Drivers Can't Be Wrong` | `templates/index.json` | `al-brand-hero.settings.eyebrow` |
| Headline | `Stream Anything. Drive Wirelessly.` | `templates/index.json` | `al-brand-hero.settings.heading` |
| Subheading | `Turn your factory CarPlay wireless — stream Netflix, YouTube & Google Play on your existing screen.` | `templates/index.json` | `al-brand-hero.settings.subheading` |
| CTA label | `Shop AutoLinkr Pro™ — $79.99` | `templates/index.json` | `al-brand-hero.settings.cta_label` |
| CTA link | `/products/the-autolinkr-pro` | `templates/index.json` | `al-brand-hero.settings.cta_link` |
| Ghost label | `Check Compatibility` | `templates/index.json` | `al-brand-hero.settings.ghost_label` |
| Ghost link | `/pages/compatibility` | `templates/index.json` | `al-brand-hero.settings.ghost_link` |

---

## 9. Navigation

### 9A. Header Settings

| Setting | Current Value | File | Key |
|---|---|---|---|
| Layout | `left-center` | `sections/header-group.json` | `header.settings.header_layout` |
| Sticky | `always` | `sections/header-group.json` | `header.settings.sticky_header_type` |
| Nav style | `dot` | `sections/header-group.json` | `header.settings.menu_active` |
| Hover menu | `true` | `sections/header-group.json` | `header.settings.hover_menu` |
| Header bg | `#0A0A0C` | `sections/header-group.json` | `header.settings.color_background` |
| Header text | `#F5F5F7` | `sections/header-group.json` | `header.settings.color_text` |

---

### 9B. Nav Item Styling

| Property | Value | CSS Target |
|---|---|---|
| Font family | `var(--al-font-display)` | `header .menu__item` |
| Font weight | `500` | `header .menu__item` |
| Font size | `0.875rem` | `header .menu__item` |
| Letter spacing | `0.01em` | `header .menu__item` |
| Padding | `8px 10px` | `header .menu__item` |
| Border radius | `6px` | `header .menu__item` |
| Hover background | `rgba(59,142,248,0.08)` | `header .menu__item:hover` |
| Hover text color | `var(--al-accent)` | `header .menu__item:hover` |

**CRITICAL:** Always target `.menu__item` — NOT `header__menu-item` or `header__inline-menu` (those are wrong Concept classes).

---

### 9C. Mega Menu Structure

| Block ID | Menu | Type | File |
|---|---|---|---|
| `mega_menu_TKWTwX` | Adapters | `mega_menu` | `sections/header-group.json` |
| `mega_menu_dashcams` | Dash Cams | `mega_menu` | `sections/header-group.json` |
| `mega_menu_accessories` | Accessories | `mega_menu` | `sections/header-group.json` |

**Rule:** `menu_width: "small"` for proper card proportions (25% nav links / 75% product cards).  
**Rule:** `show_menu_image: true` to display product photo cards.  
**Rule:** `promo_link_X` must use `shopify://products/handle` format.

---

### 9D. Logo

| Context | Asset | Method |
|---|---|---|
| Header (dark bg) | White logo — `https://cdn.shopify.com/.../AutoLinkrOfficialLogo4K_White_Trans.png?v=1772920454` | CSS `filter: brightness(0) invert(1)` on `.header__heading-logo img` |
| Footer (dark bg) | Same white logo | CSS `filter: brightness(0) invert(1)` on `.footer__logo img` |
| **Rule** | Dark background = ALWAYS use white logo. Never dark logo on dark bg. | — |

---

## 10. Announcement Bar

| Property | Current Value | File | Location |
|---|---|---|---|
| Background | `#3B8EF8` (brand accent blue) | `assets/autolinkr-tokens.css` | `.topbar-section { background: #3B8EF8 }` |
| Background (JSON) | `#3B8EF8` | `sections/header-group.json` | `announcement-bar.settings.color_background` |
| Text color | `#FFFFFF` bold | `assets/autolinkr-tokens.css` | `.announcement-bar a, p, span { color: #fff; font-weight: 700 }` |
| Layout | `marquee` | `sections/header-group.json` | `announcement-bar.settings.layout` |
| Rounded | `false` | `sections/header-group.json` | `announcement-bar.settings.rounded: false` |
| Font size | `0.8125rem` (desktop), `0.75rem` (mobile) | `assets/autolinkr-tokens.css` | `.announcement-bar a` |
| Letter spacing | `0.04em` | `assets/autolinkr-tokens.css` | `.announcement-bar a` |

**MUST update both CSS and JSON** — Concept's inline `<style>` injection from JSON overrides CSS-only fixes.  
**Quirk:** All `.topbar-section > *` children (social icons, localization) also need explicit `background: #3B8EF8` to prevent dark bleed.

---

## 11. Footer

| Property | Current Value | File | Key |
|---|---|---|---|
| Background | `#080809` | `sections/footer-group.json` + `assets/autolinkr-tokens.css` | `footer.settings.color_background` |
| Text | `#F7F7F8` | `sections/footer-group.json` | `footer.settings.color_text` |
| Padding top | `56px` | `sections/footer-group.json` | `footer.settings.padding_top` |
| Padding bottom | `40px` | `sections/footer-group.json` | `footer.settings.padding_bottom` |
| Logo | White (CDN or Shopify) | `sections/footer-group.json` | `footer.settings.logo` → white version URL |
| Support email | `support@theautolinkr.com` | Content | Footer contact column |
| Support hours | `M–F 9–5 CT` | Content | Footer contact column |

---

## 12. Forms & Inputs

| Property | Value | CSS Target |
|---|---|---|
| Input background | `var(--al-surface-2)` | `.field__input, input[type="email"]` |
| Input border | `1px solid var(--al-border)` | `.field__input` |
| Input border radius | `var(--al-r-md)` (12px) | `.field__input` |
| Input text color | `var(--al-text-1)` | `.field__input` |
| Input padding | `14px 16px` | `.field__input` |
| Focus border | `var(--al-accent)` | `.field__input:focus` |
| Focus ring | `0 0 0 3px var(--al-accent-dim)` | `.field__input:focus` |
| Placeholder color | `var(--al-text-4)` | `::placeholder` |
| Label display | `none` (hidden — placeholder only) | `.newsletter-form label` |

**Newsletter form pattern:** `.newsletter-form` → `.field.relative` → `input` + `.self-submit-button.absolute > button`  
Submit button: `36×36px circle`, `var(--al-accent)`, `border-radius: 50%`, no `btn-fill` animation.

---

## 13. Accordions

| Property | Value | CSS Class |
|---|---|---|
| Summary background | `linear-gradient(135deg, var(--al-surface-2), var(--al-surface-3))` | `.accordion summary` |
| Summary border | `1px solid var(--al-border)` | `.accordion summary` |
| Summary border radius | `var(--al-r-md)` (12px) | `.accordion summary` |
| Summary font weight | `600` | `.accordion summary` |
| Open state border | `var(--al-accent)` + left `3px solid` | `.accordion details[open] summary` |
| Chevron color | `var(--al-text-3)` | `::after` pseudo |
| Open chevron color | `var(--al-accent)` | `details[open] summary::after` |
| Content background | `var(--al-surface-2)` | `details > div` |
| Content border | `1px solid var(--al-border)` | `details > div` |

**CRITICAL:** Never use bare `details summary` — scope all accordion rules to `.accordion`, `.collapsible`, or similar wrapper class. Bare `details summary` bleeds into nav dropdowns (which are also `<details><summary>`).

---

## 14. Component Tokens — Quick Reference

| Component | Key Token | Value |
|---|---|---|
| Feature strip | `--al-surface` + `--al-border-subtle` | Background + border |
| Multicolumn cards | `--al-surface` hover → `--al-surface-2` | `.multicolumn-list__item` |
| Testimonial cards | `--al-glass-bg` + `--al-glass-blur` | Glass morphism |
| Number counter | `--al-accent` on numbers | Blue stat values |
| Scrolling trust bar | `--al-surface` + `--al-border` | Container |
| Collection list cards | `--al-r-xl` + `--al-accent-border` on hover | 24px radius, blue border |
| Comparison table | `--al-surface` + `--al-green`/`--al-text-4` | ✓ green / ✗ dimmed |
| Product images | `--al-r-xl` | 24px radius on media |
| Cart drawer | `--al-surface` on `.drawer__inner` | Panel background |
| Variant buttons (active) | `--al-accent-dim` bg + `--al-accent` border | Selected variant |

---

## 15. CDN Assets

| Asset | URL |
|---|---|
| White Logo (4K) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/AutoLinkrOfficialLogo4K_White_Trans.png?v=1772920454` |
| F250 Netflix Hero (desktop) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9259.jpg?v=1773548940` |
| Console Product (mobile hero) | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9277.jpg?v=1773548942` |
| Short Demo Video | `https://cdn.shopify.com/videos/c/o/v/f1ede9f882b84a6e928a2dbc9dfdea72.mov` |
| Screen + Box | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9230-HDR.jpg?v=1773548942` |
| Box on Console | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9288.jpg?v=1773548942` |
| Interface + Box Mobile | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9275.jpg?v=1773548945` |
| Lifestyle A | `https://cdn.shopify.com/s/files/1/0706/8971/8306/files/2M2A9293.jpg?v=1773548940` |

**Image picker limitation:** `image_picker` schema fields only accept `shopify://shop_images/` references. CDN `https://` URLs only work in `url` type fields (`bg_image_url`, `al-lifestyle-gallery` photo fields, etc.).

---

## 16. Concept Theme Overrides (RGB Bridge)

These map AutoLinkr brand colors to Concept's own CSS variable system.  
Concept uses RGB triplets — NOT hex values.

```css
/* In assets/autolinkr-tokens.css → :root { ... } */
--color-background:         8, 8, 9;       /* #080809 */
--color-foreground:         247, 247, 248;  /* #F7F7F8 */
--color-border:             42, 42, 48;     /* #2A2A30 */
--color-button-text:        255, 255, 255;  /* #FFFFFF */
--color-button-background:  59, 142, 248;   /* #3B8EF8 */
```

**Rule:** Whenever the accent color changes, update `--color-button-background` with the new RGB triplet.

---

## 17. Critical Architecture Rules

These are hard-won fixes — violating them breaks things.

| Rule | Reason |
|---|---|
| `{%- style -%}` tags are CDN-cached | Never put dynamic Liquid values (`section.settings.*`) inside `{%- style -%}`. Use inline `style=""` attributes on HTML elements instead. |
| Target `.menu__item` NOT `header__menu-item` | Concept's actual nav class is `.menu__item` — the other class names are wrong and don't exist. |
| Drawer: style `.drawer__inner` NOT `.menu-drawer` | `.menu-drawer` is the full-screen overlay — styling it breaks the backdrop blackout on mobile. |
| Never use bare `details summary` for accordions | Nav dropdowns are also `<details><summary>`. Always scope to `.accordion`, `.collapsible`, etc. |
| Announcement bar needs BOTH JSON + CSS updates | Concept injects inline `<style>` from JSON `color_background`. CSS alone can't override it. |
| All Concept `--color-*` vars need RGB triplets | `--color-background: 8, 8, 9` NOT `#080809`. |
| `btn-fill` must always be neutralized | Every Concept button has an animated `.btn-fill` span (white/blue by default) that overrides the button background. Set `background: transparent !important` on `.button .btn-fill` globally. |
| Logo = white on dark backgrounds. Always. | Never show a dark logo on a dark background. CSS `filter: brightness(0) invert(1)` is the fix. |
| Announcement bar: `rounded: false` | Concept adds `border-radius` from the `rounded` JSON setting. Always explicitly set to `false`. |
| STEP badge permanently removed from How It Works | Do not re-add the blue "Step 1/2/3" badge. It was removed intentionally. |
| Never publish theme automatically | Always manual publish after human review. |
| Never touch theme ID `177668358178` | That is the live theme (NickUpdate9.6.25) — READ ONLY. |

---

## 18. Propagation Checklist

When changing any token in this file, use this checklist to ensure full propagation:

**Changing the accent / brand color:**
- [ ] `assets/autolinkr-tokens.css` → `--al-accent`, `--al-accent-hover`, `--al-accent-dim`, `--al-accent-glow`, `--al-accent-border`
- [ ] `assets/autolinkr-tokens.css` → `--color-button-background: R, G, B` (RGB triplet of new color)
- [ ] `assets/autolinkr-tokens.css` → `.topbar-section { background: NEW_COLOR }` + `.announcement-bar { background: NEW_COLOR }`
- [ ] `sections/header-group.json` → `announcement-bar.settings.color_background: "NEW_COLOR"`
- [ ] `assets/autolinkr-tokens.css` → all hardcoded `rgba(59,142,248,...)` instances (glow values, accent dims)

**Changing fonts:**
- [ ] `assets/autolinkr-tokens.css` → `@import` URL for new font
- [ ] `assets/autolinkr-tokens.css` → `--al-font-display` or `--al-font-body`

**Changing button shape (e.g. pill → rounded rect):**
- [ ] `assets/autolinkr-tokens.css` → `.button` base `border-radius` rule
- [ ] Verify `.button--primary`, `.button--secondary`, `.shopify-payment-button__button` all inherit correctly

**Changing hero images:**
- [ ] `templates/index.json` → `al-brand-hero.settings.bg_image_url` (desktop CDN)
- [ ] `templates/index.json` → `al-brand-hero.settings.bg_image_mobile` (mobile Shopify ref)
- [ ] Check overlay opacity settings still provide text readability over the new image

**Changing section padding defaults:**
- [ ] Edit schema `default` values in the relevant `.liquid` section file
- [ ] Update the corresponding `templates/*.json` with new seed values
- [ ] Verify range `min` values match what templates use (min:20 for AL sections, min:40 for Concept)

---

## 19. File Map

| Concern | File(s) |
|---|---|
| All brand CSS tokens | `assets/autolinkr-tokens.css` |
| Header + announcement bar | `sections/header-group.json` |
| Footer | `sections/footer-group.json` |
| Homepage layout & content | `templates/index.json` |
| Hero section logic | `sections/al-brand-hero.liquid` |
| How It Works section | `sections/al-how-it-works.liquid` |
| Feature strip | `sections/al-feature-strip.liquid` |
| Lifestyle gallery | `sections/al-lifestyle-gallery.liquid` |
| Video section | `sections/al-video-section.liquid` |
| Pro product page | `templates/product.autolinkr-pro.json` |
| Elite product page | `templates/product.autolinkr-elite.json` |
| Dashcam product page | `templates/product.autolinkr-dashcam.json` |
| Tablet product page | `templates/product.autolinkr-dash.json` |
| CSS loaded into storefront | `layout/theme.liquid` (link tag after Concept's own CSS) |
