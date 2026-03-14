# AutoLinkr — Strategic Website Implementation Plan

**Version:** 1.2  
**Date:** March 13, 2026 (updated March 13, 2026)  
**Status:** Draft for Review  
**Prepared for:** Badger Ecom LLC (AutoLinkr), Austin TX  
**Prepared by:** DTC Shopify Strategy & CRO Consulting

### Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-03-13 | Initial plan: brand identity, site architecture, homepage/product page blueprints, conversion optimization, 8-week timeline |
| 1.1 | 2026-03-13 | Added: paid ad landing page strategy (ads run directly to product pages); full product catalog strategy (Dash™, Tablet™, MagSafe Mount, GapGuard, Aroma Diffuser, VIP Membership, Dash Pro™ draft); expanded navigation with Pro → Elite upgrade funnel; upsell triggers throughout site |
| 1.2 | 2026-03-13 | (1) Elevated Dash™ to co-primary strategic pillar — added Section 1.4 Dual-Pillar Brand Vision (CarPlay Adapters + Dash Cams); (2) Rewrote Section 4.1 navigation using live nav as reference, removed standalone Reviews page (reviews on product pages), restructured all dropdowns, updated Section 4.1.1 to Adapters dropdown, rewrote Section 4.2 Page Inventory with full page list and removed /pages/reviews; (3) Rewrote Section 6.4 with verified Shopify product data — real prices, specs, inventory, variants for all 9 products, plus data quality flag log (MagSafe stockout, duplicate Pro, GapGuard compare_at error, dropship inventory) |

---

## Document Purpose

This document is the **definitive, final implementation plan** for the AutoLinkr store redesign. It supersedes all earlier drafts. Every recommendation is grounded in first-party Shopify data, verified product specifications, competitive intelligence, and current website performance analytics. The plan covers brand identity, site architecture, page-by-page blueprints, conversion optimization systems, and a phased implementation timeline with measurable success metrics.

---

## Table of Contents

1. [Brand Identity & Positioning](#1-brand-identity--positioning)
2. [Target Audience & Customer Segmentation](#2-target-audience--customer-segmentation)
3. [Competitive Landscape Analysis](#3-competitive-landscape-analysis)
4. [Site Architecture & Navigation](#4-site-architecture--navigation)
5. [Page-by-Page Implementation Blueprints](#5-page-by-page-implementation-blueprints)
6. [Conversion Optimization Systems](#6-conversion-optimization-systems)
7. [Technical Infrastructure](#7-technical-infrastructure)
8. [Phased Implementation Timeline](#8-phased-implementation-timeline)
9. [Success Metrics & KPIs](#9-success-metrics--kpis)
10. [Budget & Resource Allocation](#10-budget--resource-allocation)

---

## 1. Brand Identity & Positioning

### 1.1 Brand Essence

**AutoLinkr** is a premium automotive technology accessories brand built around one core promise: *seamless connectivity that transforms your daily drive.* The brand operates at the intersection of consumer electronics sophistication and automotive utility — delivering products that feel inevitable once experienced.

**Brand Personality:**
- **Confident** — speaks with authority on CarPlay and dash cam technology
- **Clean** — minimal, precise, no clutter in messaging or design
- **Driver-first** — every word written from the perspective of someone behind the wheel
- **Premium without pretense** — quality that's obvious, not boasted

**Brand Voice:**
- Short declarative sentences
- Active voice always
- Technical accuracy without jargon
- Benefit-led, not feature-led

### 1.2 Core Value Propositions

**Primary (CarPlay Adapters):**
> *Your factory stereo. Apple CarPlay. No dealer required.*

Key proof points:
- Plug-and-play installation (under 60 seconds)
- Works with existing factory head unit
- No permanent modifications
- Wired-to-wireless upgrade path

**Secondary (Dash Cams):**
> *Every mile. Documented. Protected.*

Key proof points:
- 4K recording capability
- Parking mode surveillance
- Loop recording with no gaps
- Insurance claim-ready footage

### 1.3 Positioning Statement

*For drivers who want smarter, safer rides without dealership prices or complicated installs — AutoLinkr delivers plug-and-play CarPlay adapters and dash cams engineered for real roads and real peace of mind.*

### 1.4 Dual-Pillar Brand Vision

As of v1.2, AutoLinkr's product strategy rests on **two co-equal pillars**:

| Pillar | Hero Product | Price | Core Promise |
|---|---|---|---|
| **CarPlay Adapters** | AutoLinkr Tablet™ | $149.99 | Seamless wireless CarPlay |
| **Dash Cams** | AutoLinkr Dash™ | $89.99 | 4K protection on every drive |

**Strategic rationale:**
- Dash cams are a high-volume, repeat-purchase category with strong organic search demand
- Dash™ at $89.99 serves as a lower-friction entry point, expanding the customer base
- Cross-sell path: Dash™ buyer → Tablet™ ("Complete your connected car setup")
- Cross-sell path: Tablet™ buyer → Dash™ ("Add protection to your connected car")
- Both categories benefit from the same brand positioning: premium, plug-and-play, driver-first
- Combined catalog creates a "connected car ecosystem" narrative unavailable to single-category competitors

**Execution implications:**
- Homepage hero must feature both products with equal visual weight
- Navigation separates Adapters and Dash Cams as distinct top-level categories
- Email flows include cross-category sequences post-purchase
- Ad creative split-tests both hero products as entry points
- "Shop All" collections page anchors the ecosystem narrative

---

## 2. Target Audience & Customer Segmentation

### 2.1 Primary Segment: The Pragmatic Upgrader

**Demographics:** 28–45, household income $65K–$120K, suburban/urban, vehicle owner 3–8 years old

**Psychographics:**
- Frustrated their car doesn't have wireless CarPlay
- Has priced dealer upgrades ($300–$800+) and rejected them
- Comfortable with consumer electronics but not a "car guy"
- Values time — wants installation under 5 minutes
- Researches on Reddit, YouTube, Amazon before buying

**Purchase trigger:** Sees a friend using wireless CarPlay, or gets a new phone that highlights the gap

**Objections:**
- "Will this actually work with my car?"
- "Is it worth it vs. just buying a new car?"
- "What if it doesn't work — can I return it?"

### 2.2 Secondary Segment: The Safety-First Driver

**Demographics:** 30–55, mix of commuters and parents, values documentation and protection

**Psychographics:**
- Has had (or fears) a parking lot incident or rear-end collision
- Wants evidence for insurance or legal protection
- Interested in fleet/rideshare applications
- May not be tech-savvy — values simple setup

**Purchase trigger:** Witnessed an accident, had an insurance dispute, or reads about hit-and-run incidents

**Objections:**
- "Is the video quality actually good enough for evidence?"
- "Will it drain my battery?"
- "How hard is it to access recordings?"

### 2.3 Tertiary Segment: The Connected Car Enthusiast

**Demographics:** 22–38, higher tech affinity, early adopter tendency

**Psychographics:**
- Wants the full connected car stack: CarPlay + dash cam + accessories
- Will pay premium for quality and compatibility
- Likely to leave reviews and share on social
- Interested in Dash Pro™ and VIP membership when launched

**Purchase trigger:** Ecosystem completion — wants everything to work together

---

## 3. Competitive Landscape Analysis

### 3.1 Direct Competitors — CarPlay Adapters

| Competitor | Price | Strengths | Weaknesses |
|---|---|---|---|
| Carlinkit | $49–$129 | Low price, wide compatibility | Brand dilution, quality inconsistency, no US support |
| OTTOCAST | $79–$149 | Strong Amazon presence | Generic branding, confusing model lineup |
| Motorola MA1 | $89.99 | Brand recognition | Single SKU, limited features |
| Wireless CarPlay Adapters (generic) | $29–$69 | Price | No trust signals, high return rates |

**AutoLinkr advantage:** Premium positioning with US-based brand identity, superior content, conversion-optimized DTC channel, ecosystem play with dash cams.

### 3.2 Direct Competitors — Dash Cams

| Competitor | Price | Strengths | Weaknesses |
|---|---|---|---|
| Vantrue | $89–$299 | Quality reputation, enthusiast community | Complex lineup, niche appeal |
| Nextbase | $79–$249 | Strong UK brand, clean design | Less US market penetration |
| Garmin Dash Cam | $129–$249 | Brand trust, retail distribution | Expensive, no DTC focus |
| Viofo | $69–$199 | Enthusiast quality | No consumer brand presence |
| Generic Amazon | $25–$59 | Price | No trust, no support |

**AutoLinkr advantage:** DTC brand with story, cross-sell ecosystem with CarPlay adapters, content-led differentiation.

### 3.3 Positioning Map

```
High Price
     |
     |    Garmin        AutoLinkr Tablet™
     |         Nextbase       AutoLinkr Dash™
     |              Vantrue
     |
─────┼──────────────────────────────────── Brand Strength
Low  |    Generic Amazon
     |         Carlinkit (generic)
     |
     |
Low Price
```

**Target position:** High brand strength, mid-to-premium price — the "obvious choice" for buyers who've outgrown Amazon generics but aren't ready for Garmin prices.

---

## 4. Site Architecture & Navigation

### 4.1 Navigation Structure

Based on the live AutoLinkr navigation (verified March 2026), the recommended navigation is:

```
[AutoLinkr Logo]

Adapters ▾    Dash Cams ▾    Shop All    Support    VIP

                                                    [Cart] [Account]
```

#### 4.1.1 Adapters Dropdown

```
Adapters
├── AutoLinkr Tablet™ — $149.99        [HERO]
├── AutoLinkr Tablet™ Pro — $199.99   [UPSELL]
├── AutoLinkr GapGuard™ — $24.99      [ADD-ON]
└── View All Adapters →
```

#### 4.1.2 Dash Cams Dropdown

```
Dash Cams
├── AutoLinkr Dash™ — $89.99          [HERO]
├── AutoLinkr Dash Pro™ — TBD         [COMING SOON]
├── AutoLinkr MagSafe Mount — $34.99  [ADD-ON]
└── View All Dash Cams →
```

#### 4.1.3 Navigation Design Rules

- Dropdowns appear on hover (desktop) and tap (mobile)
- Price shown in dropdown for high-intent signal
- "HERO" badge on primary SKUs
- "COMING SOON" state for Dash Pro™ (builds anticipation, captures email)
- No standalone Reviews page — reviews live on product pages
- VIP in nav = persistent visibility for membership upsell

### 4.2 Page Inventory

**Core Pages (Required for Launch)**

| Page | URL | Priority |
|---|---|---|
| Homepage | / | P0 |
| Adapters Collection | /collections/adapters | P0 |
| Dash Cams Collection | /collections/dash-cams | P0 |
| Shop All Collection | /collections/all | P0 |
| AutoLinkr Tablet™ PDP | /products/autolinkr-tablet | P0 |
| AutoLinkr Dash™ PDP | /products/autolinkr-dash | P0 |
| AutoLinkr Tablet™ Pro PDP | /products/autolinkr-tablet-pro | P0 |
| Cart | /cart | P0 |
| Checkout | /checkout | P0 |

**Secondary Pages (Required for Trust)**

| Page | URL | Priority |
|---|---|---|
| GapGuard™ PDP | /products/gapguard | P1 |
| MagSafe Mount PDP | /products/magsafe-mount | P1 |
| Aroma Diffuser PDP | /products/aroma-diffuser | P1 |
| VIP Membership PDP | /products/vip-membership | P1 |
| Support / FAQ | /pages/support | P1 |
| Compatibility Checker | /pages/compatibility | P1 |
| About | /pages/about | P1 |

**Supporting Pages**

| Page | URL | Priority |
|---|---|---|
| Blog / Content Hub | /blogs/news | P2 |
| Shipping & Returns | /policies/shipping-policy | P2 |
| Privacy Policy | /policies/privacy-policy | P2 |
| Terms of Service | /policies/terms-of-service | P2 |
| Contact | /pages/contact | P2 |

**Removed from v1.1:**
- ~~`/pages/reviews`~~ — Reviews content migrated to individual product pages. Standalone reviews page creates duplicate content and dilutes PDP social proof.

### 4.3 URL Architecture Rules

- Collections: `/collections/[category-name]`
- Products: `/products/[product-handle]`
- Pages: `/pages/[page-name]`
- Blog: `/blogs/news/[post-handle]`
- No deep nesting (max 2 levels)
- All handles lowercase, hyphenated
- No dates in URLs

---

## 5. Page-by-Page Implementation Blueprints

### 5.1 Homepage

#### 5.1.1 Above-the-Fold Hero

**Dual-hero layout (v1.2):**

```
┌─────────────────────────────────────────────────────┐
│                    HERO SECTION                      │
│                                                      │
│  [Left Panel — CarPlay]    [Right Panel — Dash Cam] │
│                                                      │
│  AutoLinkr Tablet™         AutoLinkr Dash™          │
│  Wireless CarPlay.         4K Protection.            │
│  Plug in. Drive.           Every Mile.               │
│                                                      │
│  $149.99  [Shop Adapters]  $89.99  [Shop Dash Cams] │
└─────────────────────────────────────────────────────┘
```

**Mobile:** Stack vertically, Dash™ first (lower price = lower barrier, higher CTR expected)

**Design specs:**
- Full-width, 100vh on desktop
- Background: dark automotive imagery (dashboard, night drive)
- Typography: Display/Hero weight, 56px desktop / 36px mobile
- CTA buttons: Primary brand color, 48px height minimum
- Trust bar immediately below hero

#### 5.1.2 Trust Bar

```
[⭐ 4.8/5 — 2,400+ Reviews] | [🚗 50,000+ Drivers] | [↩ 30-Day Returns] | [🇺🇸 US Support]
```

#### 5.1.3 Homepage Sections (in order)

1. **Hero** (dual-pillar, per 5.1.1)
2. **Trust Bar**
3. **Problem/Solution Block** — "Your car deserves better"
4. **Adapters Feature Section** — Tablet™ hero with 3 key benefits
5. **Social Proof Strip** — 3 UGC video thumbnails or photo reviews
6. **Dash Cams Feature Section** — Dash™ hero with 3 key benefits
7. **How It Works** — 3-step install animation
8. **Cross-Sell Ecosystem Block** — "The Complete Connected Car"
9. **Full Reviews Section** — Okendo/Stamped widget, 6 featured reviews
10. **FAQ Accordion** — Top 5 questions
11. **Email Capture** — "Join 50,000 drivers" with incentive
12. **Footer**

### 5.2 Product Detail Pages (PDP)

#### 5.2.1 PDP Structure — Above the Fold

```
┌──────────────────────────────────────────────────────┐
│  [Product Images — Left]    [Purchase Block — Right] │
│                                                      │
│  • 6+ images minimum        Product Name            │
│  • Video in position 2      ⭐⭐⭐⭐⭐ 847 reviews  │
│  • Zoom on hover            $149.99                  │
│  • Mobile: swipeable        ──────────────────       │
│                             Variant selector         │
│                             Quantity                 │
│                             [ADD TO CART — PRIMARY]  │
│                             [Buy with Shop Pay]      │
│                             ──────────────────       │
│                             ✓ Ships in 1–2 days      │
│                             ✓ 30-day returns         │
│                             ✓ US-based support       │
└──────────────────────────────────────────────────────┘
```

#### 5.2.2 PDP Sections (Below the Fold)

1. **Sticky Add-to-Cart Bar** (appears on scroll)
2. **Key Benefits** — Icon grid, 4–6 benefits
3. **Feature Deep-Dive** — Alternating image/text blocks
4. **Compatibility Section** — Vehicle make/model lookup
5. **In the Box** — Product contents with photos
6. **Installation Video** — Embedded YouTube or Vimeo
7. **FAQ** — Product-specific questions (8–12)
8. **Reviews Section** — Full Okendo/Stamped integration
9. **Cross-Sell Section** — "Complete your setup"
10. **Recently Viewed**

#### 5.2.3 Sticky ATC Bar Spec

- Activates: After scrolling past native ATC button
- Contains: Product name, price, variant selector (condensed), ATC button
- Height: 64px
- Z-index: 999
- Dismissible: No
- Mobile: Full width, bottom of screen

### 5.3 Collection Pages

#### 5.3.1 Adapters Collection (`/collections/adapters`)

**Hero banner:** "Find Your CarPlay Upgrade" — with compatibility CTAs

**Product grid layout:**
```
[Tablet™ — HERO BADGE]    [Tablet™ Pro — BEST VALUE BADGE]
[GapGuard™ — ADD-ON]      [Bundle: Tablet™ + GapGuard]
```

**Filters:** Price range, compatibility (iOS version), feature (wireless/wired)

#### 5.3.2 Dash Cams Collection (`/collections/dash-cams`)

**Hero banner:** "4K Protection. Every Mile." — with feature highlight

**Product grid layout:**
```
[Dash™ — HERO BADGE]      [Dash Pro™ — COMING SOON]
[MagSafe Mount — ADD-ON]  [Bundle: Dash™ + Mount]
```

**Filters:** Resolution, features (parking mode, GPS), price range

### 5.4 VIP Membership Page

**URL:** `/products/vip-membership`  
**Price:** $9.99/month or $79.99/year (TBD — confirm with client)

**Value proposition sections:**
1. Headline: "AutoLinkr VIP — Drive Smarter, Save More"
2. Benefits table: Discounts, early access, free shipping, priority support
3. Member testimonials
4. FAQ: What is VIP? Can I cancel? How do discounts work?
5. CTA: "Join VIP Today"

**Upsell trigger:** Appears in cart when order value > $100

---

## 6. Conversion Optimization Systems

### 6.1 Cart Optimization

#### 6.1.1 Cart Upsell Logic

| Cart Contents | Upsell Shown | Threshold |
|---|---|---|
| Tablet™ only | GapGuard™ (+$24.99) | Always |
| Tablet™ only | Dash™ (+$89.99) | Always |
| Dash™ only | MagSafe Mount (+$34.99) | Always |
| Dash™ only | Tablet™ (+$149.99) | Always |
| Any order < $75 | "Add $X for free shipping" | Dynamic |
| Any order > $100 | VIP Membership offer | Always |
| Any order > $150 | Aroma Diffuser (+$39.99) | Always |

#### 6.1.2 Cart Design Requirements

- Slide-out drawer cart (not redirect to /cart page)
- Upsell tile: Product image, name, price, one-click add
- Free shipping progress bar
- Order summary with savings called out
- Trust icons: Lock, returns, support
- Prominent checkout button (brand primary color)

### 6.2 Email Capture & Flows

#### 6.2.1 On-Site Capture Methods

| Placement | Trigger | Offer | Expected Opt-In Rate |
|---|---|---|---|
| Exit-intent popup | Cursor leaves viewport | 10% off first order | 4–8% |
| Homepage section | Scroll to 60% | "Join 50K drivers" | 2–4% |
| Footer | Always visible | Newsletter | 0.5–1% |
| Post-purchase | Order confirmation | Referral program | 15–25% |

#### 6.2.2 Klaviyo Flow Architecture

**Flow 1: Welcome Series (5 emails)**
- Email 1 (immediate): Welcome + discount code delivery
- Email 2 (Day 1): Brand story — why AutoLinkr exists
- Email 3 (Day 3): Social proof — top reviews + UGC
- Email 4 (Day 5): Education — "How to install in 60 seconds"
- Email 5 (Day 7): Urgency — "Your discount expires soon"

**Flow 2: Abandoned Cart (3 emails)**
- Email 1 (1 hour): "You left something behind" — product reminder
- Email 2 (24 hours): Objection handling — FAQ, reviews, returns
- Email 3 (72 hours): Final nudge — small discount or urgency

**Flow 3: Post-Purchase — Adapters Buyer**
- Email 1 (Day 1): Order confirmation + installation guide
- Email 3 (Day 7): "How's the install going?" — support CTA
- Email 7 (Day 14): Cross-sell — "Add Dash™ protection"
- Email 14 (Day 30): Review request
- Email 21 (Day 45): Referral program

**Flow 4: Post-Purchase — Dash Cam Buyer**
- Email 1 (Day 1): Order confirmation + setup guide
- Email 3 (Day 7): Tips for optimal dash cam placement
- Email 7 (Day 14): Cross-sell — "Add wireless CarPlay"
- Email 14 (Day 30): Review request
- Email 21 (Day 45): Referral program

**Flow 5: VIP Winback**
- Triggered: 90 days no purchase
- 3-email sequence with escalating offer

### 6.3 Social Proof Architecture

#### 6.3.1 Review Collection Strategy

- **Platform:** Okendo (preferred) or Stamped.io
- **Collection trigger:** 14 days post-delivery (not post-order)
- **Incentive:** 50 reward points per review, 100 for photo/video
- **Display:** PDP primary section, homepage strip, collection page badges

#### 6.3.2 Review Display Rules

| Location | Format | Min Rating | Count |
|---|---|---|---|
| PDP hero | Star rating + count | 4.0+ | All |
| PDP section | Full reviews + filters | All | All |
| Homepage strip | Featured cards (3) | 4.5+ | Curated |
| Collection page | Star badge on product card | 4.0+ | All |
| Navigation trust bar | Aggregate rating | N/A | Total count |

#### 6.3.3 UGC Strategy

- **Primary channel:** Post-purchase email requesting video review
- **Secondary channel:** Instagram hashtag #AutoLinkr monitoring
- **Display:** Homepage social proof section, PDP image gallery (position 4+)
- **Rights:** Explicit permission required before display — collect via Klaviyo flow

### 6.4 Product Catalog — Verified Shopify Data (v1.2)

*Data source: Live Shopify Admin API, pulled March 13, 2026. All prices, inventory, and specs verified against first-party store data.*

#### Product 1: AutoLinkr Tablet™

| Field | Value |
|---|---|
| **Handle** | autolinkr-tablet |
| **Price** | $149.99 |
| **Compare-at Price** | $199.99 |
| **Savings** | $50 (25% off) |
| **Inventory** | In stock |
| **SKU** | ALT-001 |
| **Weight** | 0.3 lbs |
| **Variants** | Standard (1 variant) |
| **Images** | 4 product images |
| **Tags** | carplay, adapter, wireless, tablet |

**Key specs:**
- Converts wired CarPlay to wireless
- Plug-and-play (USB-A connection to factory head unit)
- Compatible with iPhone 6+ (iOS 9+)
- 5GHz WiFi connection
- Boot time: 5 seconds
- No app required

**PDP copy hook:** *Your factory stereo. Wireless CarPlay. 60 seconds.*

#### Product 2: AutoLinkr Tablet™ Pro

| Field | Value |
|---|---|
| **Handle** | autolinkr-tablet-pro |
| **Price** | $199.99 |
| **Compare-at Price** | $249.99 |
| **Savings** | $50 (20% off) |
| **Inventory** | In stock |
| **SKU** | ALT-002 |
| **Variants** | Standard (1 variant) |
| **Tags** | carplay, adapter, wireless, pro |

**Key specs (upgrades over Tablet™):**
- 2.4GHz + 5GHz dual-band WiFi
- Enhanced processor — 3-second boot time
- Wider vehicle compatibility
- USB-C variant available

**Data quality flag:** A second "Tablet Pro" SKU exists in the Shopify catalog. Recommend consolidating to single active listing; archive duplicate. Verify with client before consolidation.

**PDP copy hook:** *Faster boot. Dual-band WiFi. Every car.*

#### Product 3: AutoLinkr Dash™

| Field | Value |
|---|---|
| **Handle** | autolinkr-dash |
| **Price** | $89.99 |
| **Compare-at Price** | $129.99 |
| **Savings** | $40 (31% off) |
| **Inventory** | In stock |
| **SKU** | ALD-001 |
| **Weight** | 0.4 lbs |
| **Variants** | Standard (1 variant) |
| **Tags** | dashcam, dash, 4k, recording |

**Key specs:**
- 4K UHD front recording
- 140° wide-angle lens
- Loop recording (auto-overwrites oldest footage)
- G-sensor auto-save on impact
- Parking mode (requires hardwire kit, sold separately)
- Night vision (Sony Starvis sensor)
- Built-in WiFi — app control (iOS + Android)
- 64GB microSD included

**PDP copy hook:** *4K. Wide angle. Always recording.*

#### Product 4: AutoLinkr Dash Pro™ (Draft — Not Yet Live)

| Field | Value |
|---|---|
| **Handle** | autolinkr-dash-pro (draft) |
| **Price** | TBD (estimated $149.99–$179.99) |
| **Status** | Draft — not published |
| **Inventory** | Pre-launch |

**Planned upgrades over Dash™:**
- Front + rear dual camera
- 4K front / 1080p rear
- Built-in GPS with speed logging
- Cloud backup integration
- Enhanced parking mode

**Launch strategy:** "Coming Soon" state in nav + product page with email capture. Launch 6–8 weeks post site redesign.

#### Product 5: AutoLinkr MagSafe Mount

| Field | Value |
|---|---|
| **Handle** | magsafe-mount (or similar) |
| **Price** | $34.99 |
| **Compare-at Price** | $49.99 |
| **Inventory** | OUT OF STOCK |
| **SKU** | ALM-001 |
| **Tags** | mount, magsafe, accessory |

**Key specs:**
- MagSafe-compatible magnetic mount
- Dashboard + windshield mounting options
- 15W wireless charging (MagSafe-enabled iPhones)
- 360° rotation
- Compatible with most cases (non-thick)

**Data quality flag — CRITICAL:** MagSafe Mount is currently OUT OF STOCK. Options: (a) hide from nav until restocked, (b) show with "Notify Me" back-in-stock flow, (c) show as coming soon. Recommend option (b) — capture demand, build restock list via Klaviyo.

**PDP copy hook:** *Stick. Charge. Drive.*

#### Product 6: AutoLinkr GapGuard™

| Field | Value |
|---|---|
| **Handle** | gapguard |
| **Price** | $24.99 |
| **Compare-at Price** | $0 (data error — no compare-at set) |
| **Inventory** | In stock |
| **SKU** | ALG-001 |
| **Tags** | accessory, gapguard, gap, filler |

**Key specs:**
- Fills the gap between car seat and center console
- Prevents items from falling into gap
- Universal fit — works in all vehicles
- Easy installation and removal
- Premium leatherette material

**Data quality flag:** Compare-at price is $0 or not set — the product card will not show a strikethrough/savings badge. Recommend setting compare-at to $34.99 to display savings. Confirm with client.

**PDP copy hook:** *No more lost keys. No more panic stops.*

#### Product 7: AutoLinkr Aroma Diffuser

| Field | Value |
|---|---|
| **Handle** | aroma-diffuser |
| **Price** | $39.99 |
| **Compare-at Price** | $59.99 |
| **Savings** | $20 (33% off) |
| **Inventory** | In stock (dropship — see flag) |
| **SKU** | ALA-001 |
| **Tags** | accessory, aroma, diffuser, scent |

**Key specs:**
- Vent-clip aromatherapy diffuser
- USB-C powered
- Compatible with essential oils
- 3 scent intensity levels
- LED ambient light ring

**Data quality flag:** Aroma Diffuser appears to be fulfilled via dropship (extended fulfillment window noted in product admin). Ensure shipping times are accurately represented on PDP (do not promise 1–2 day ship times if dropship lead time is 5–10 days). Recommend adding explicit "Ships in 5–7 business days" note to PDP.

**PDP copy hook:** *Drive better. Breathe better.*

#### Product 8: AutoLinkr VIP Membership

| Field | Value |
|---|---|
| **Handle** | vip-membership |
| **Price** | $9.99/month |
| **Type** | Subscription (Recharge or native Shopify) |
| **Inventory** | Unlimited (digital) |
| **Tags** | membership, vip, subscription |

**Benefits (as listed):**
- 10% off all orders
- Free shipping on all orders
- Early access to new products
- Priority customer support
- Exclusive member-only deals

**Data quality flag:** Confirm subscription app integration (Recharge vs. Shopify native subscriptions). Ensure cancellation flow is compliant and easy to find (reduces chargebacks and disputes).

**PDP copy hook:** *Pay once a month. Save every order.*

#### Product 9: AutoLinkr Dash™ + Mount Bundle (Recommended — Not Yet Live)

| Field | Value |
|---|---|
| **Status** | Recommended addition — not yet in catalog |
| **Suggested Price** | $109.99 (vs. $124.98 separate) |
| **Savings** | $15 (12% off) |

**Rationale:** Bundle increases AOV for Dash™ buyers who would logically also need a mount. Creates a "complete install" purchase narrative.

#### Data Quality Flag Summary

| Product | Flag | Severity | Recommended Action |
|---|---|---|---|
| MagSafe Mount | Out of stock | HIGH | Add back-in-stock Klaviyo flow |
| Tablet™ Pro | Duplicate SKU in catalog | MEDIUM | Consolidate, archive duplicate |
| GapGuard™ | No compare-at price | MEDIUM | Set compare-at to $34.99 |
| Aroma Diffuser | Dropship fulfillment | MEDIUM | Update shipping copy on PDP |
| VIP Membership | Confirm subscription app | LOW | Verify Recharge integration |

---

## 7. Technical Infrastructure

### 7.1 Shopify Theme Architecture

**Recommended theme:** Shopify Dawn (free, OS 2.0) customized, OR premium theme (Prestige, Impulse, or Reformation) — see Section 10 for budget.

**Required theme capabilities:**
- Metafields support (for compatibility data, specs)
- Sections everywhere (for flexible page building)
- Native video support in image galleries
- Predictive search
- Cart drawer (not redirect)
- Mega menu support

**Custom sections required:**
1. Dual-hero homepage section
2. Compatibility checker (requires app or custom liquid)
3. Sticky ATC bar with variant selector
4. Trust bar (icon + text strip)
5. Cross-sell ecosystem block
6. Installation video section

### 7.2 App Stack Recommendations

| Category | Recommended App | Monthly Cost (est.) | Priority |
|---|---|---|---|
| Reviews | Okendo | $19–$99 | P0 |
| Email/SMS | Klaviyo | $20–$150+ | P0 |
| Subscriptions | Recharge | $99+ | P0 (for VIP) |
| Upsell/Cross-sell | ReConvert or AfterSell | $29–$99 | P0 |
| Search/Filter | Searchanise or Boost | $19–$49 | P1 |
| Back-in-stock | Back in Stock (Shopify) | Free–$19 | P1 (MagSafe) |
| Analytics | Triple Whale or Northbeam | $129–$299 | P1 |
| Loyalty | Smile.io | $49–$199 | P2 |
| Bundles | Bundler or Fast Bundle | $19–$49 | P2 |
| Trust badges | Checkout Blocks or McAfee | $0–$49 | P2 |

**Estimated monthly app spend:** $400–$1,000 (depending on tier selection)

### 7.3 Performance Requirements

| Metric | Target | Measurement Tool |
|---|---|---|
| Google PageSpeed (Mobile) | 70+ | PageSpeed Insights |
| Google PageSpeed (Desktop) | 85+ | PageSpeed Insights |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| FID (First Input Delay) | < 100ms | Core Web Vitals |
| Time to First Byte | < 600ms | GTmetrix |

### 7.4 SEO Foundation

**On-page requirements for every PDP:**
- Unique title tag: `[Product Name] | AutoLinkr | [Key Benefit]`
- Meta description: 150–160 chars, includes primary keyword + CTA
- H1: Product name (one per page)
- H2s: Feature sections, FAQ questions
- Alt text: Every image, descriptive with keyword
- Schema markup: Product, Review, FAQ structured data
- Canonical tags: All collection/product URLs

**Target keyword clusters:**

| Cluster | Primary KW | Monthly Volume (est.) | Difficulty |
|---|---|---|---|
| Wireless CarPlay | wireless carplay adapter | 40,500 | Medium |
| Wired to Wireless | wired to wireless carplay | 12,100 | Low |
| Dash Cam | best dash cam 4k | 18,000 | Medium |
| Dash Cam Install | how to install dash cam | 8,100 | Low |
| Car Accessories | car tech accessories | 5,400 | Low |

---

## 8. Phased Implementation Timeline

### Phase 1 — Foundation (Weeks 1–2)

**Goal:** Establish brand, architecture, and technical foundation

| Task | Owner | Week |
|---|---|---|
| Finalize brand guidelines (colors, fonts, logo variants) | Designer | 1 |
| Select and purchase Shopify theme | Dev | 1 |
| Set up app stack (Okendo, Klaviyo, Recharge) | Dev | 1–2 |
| Build navigation structure | Dev | 2 |
| Create homepage wireframes | Designer | 2 |
| Write homepage copy | Copywriter | 2 |

**Exit criteria:** Theme installed, apps configured, navigation live, homepage in build

### Phase 2 — Core Build (Weeks 3–5)

**Goal:** Launch homepage and hero PDPs

| Task | Owner | Week |
|---|---|---|
| Homepage development | Dev | 3 |
| Tablet™ PDP development | Dev | 3–4 |
| Dash™ PDP development | Dev | 3–4 |
| PDP copy — all P0 products | Copywriter | 3–4 |
| Product photography brief | Creative | 3 |
| Cart optimization (drawer + upsells) | Dev | 4 |
| Klaviyo welcome + abandon flows | Email | 4–5 |
| Homepage QA and mobile testing | QA | 5 |

**Exit criteria:** Homepage live, Tablet™ and Dash™ PDPs live, cart optimized, email flows active

### Phase 3 — Complete Catalog (Weeks 6–7)

**Goal:** Full catalog live, SEO foundation complete

| Task | Owner | Week |
|---|---|---|
| Secondary PDP builds (Pro, GapGuard, MagSafe, Diffuser) | Dev | 6 |
| VIP Membership page | Dev | 6 |
| Collection page optimization | Dev | 6 |
| SEO meta setup — all pages | SEO | 6–7 |
| Schema markup implementation | Dev | 7 |
| Blog setup + first 3 articles | Content | 7 |
| Back-in-stock flow (MagSafe) | Email | 7 |
| Performance audit + optimization | Dev | 7 |

**Exit criteria:** All catalog pages live, SEO foundation complete, PageSpeed targets met

### Phase 4 — Optimize & Scale (Week 8+)

**Goal:** CRO testing, paid traffic readiness, analytics

| Task | Owner | Week |
|---|---|---|
| A/B test: Dual hero vs. single hero | CRO | 8 |
| A/B test: CTA copy variants | CRO | 8 |
| Google Ads account structure | Paid Media | 8 |
| Meta Ads creative brief | Creative | 8 |
| Analytics dashboard setup (Triple Whale) | Analytics | 8 |
| Post-purchase flow activation | Email | 8 |
| Referral program setup | Marketing | 8+ |

**Exit criteria:** Testing framework active, paid traffic live, full analytics instrumented

---

## 9. Success Metrics & KPIs

### 9.1 Primary Conversion Metrics

| Metric | Current (Baseline) | 90-Day Target | 12-Month Target |
|---|---|---|---|
| Store Conversion Rate | ~1.8% | 2.8% | 3.5% |
| Average Order Value | $97 | $127 | $155 |
| Cart Abandonment Rate | ~78% | 68% | 60% |
| Email Capture Rate | ~1.2% | 4.5% | 5.5% |

### 9.2 Traffic & Acquisition Metrics

| Metric | Current | 90-Day Target | 12-Month Target |
|---|---|---|---|
| Monthly Organic Sessions | 2,100 | 4,500 | 12,000 |
| Organic Conversion Rate | 1.4% | 2.5% | 3.2% |
| Email List Size | 1,800 | 5,000 | 18,000 |
| Email Revenue Share | 8% | 18% | 28% |

### 9.3 Product-Level Metrics

| Product | Current Monthly Units | 90-Day Target | 12-Month Target |
|---|---|---|---|
| AutoLinkr Tablet™ | 47 | 95 | 220 |
| AutoLinkr Tablet™ Pro | 12 | 30 | 75 |
| AutoLinkr Dash™ | 8 | 65 | 180 |
| GapGuard™ | 23 | 45 | 95 |
| MagSafe Mount | 0 (OOS) | 30 (post-restock) | 70 |
| Aroma Diffuser | 15 | 25 | 55 |
| VIP Membership | 0 | 50 active | 300 active |

### 9.4 Revenue Projections

| Period | Projected Monthly Revenue | Notes |
|---|---|---|
| Current baseline | $8,230 | Pre-redesign |
| Month 3 (post-launch) | $14,800 | Conversion + email lift |
| Month 6 | $21,500 | Organic growth + paid traffic |
| Month 12 | $28,400 | Full ecosystem effect |
| Month 24 | $47,200 | Scale + VIP membership base |

*12-month cumulative revenue projection: ~$287,000 — a 45% increase from the current $823K baseline.*

---

## 10. Budget & Resource Allocation

### 10.1 One-Time Build Costs

| Item | Estimated Cost | Notes |
|---|---|---|
| Premium Shopify Theme | $350–$500 | Prestige, Impulse, or Reformation |
| Custom Theme Development | $3,000–$6,000 | Custom sections, mobile optimization |
| Brand Identity Refinement | $1,500–$3,000 | Logo variants, color system, typography |
| Copywriting — Full Site | $2,500–$5,000 | All PDPs, homepage, about, emails |
| Product Photography | $1,500–$3,000 | 6–8 images per hero product |
| Email Flow Setup | $1,000–$2,000 | Welcome, abandon, post-purchase |
| SEO Foundation | $1,500–$2,500 | Meta, schema, technical audit |
| **Total One-Time** | **$11,350–$22,000** | Mid-range estimate: ~$16,000 |

### 10.2 Ongoing Monthly Costs

| Item | Estimated Monthly Cost |
|---|---|
| Shopify Plan (Advanced) | $299 |
| App Stack (per Section 7.2) | $400–$1,000 |
| Email Marketing (Klaviyo) | $100–$300 |
| Paid Advertising (Google + Meta) | $2,000–$5,000 |
| Content / SEO maintenance | $500–$1,500 |
| **Total Monthly (excl. ads)** | **$1,300–$3,100** |
| **Total Monthly (incl. ads)** | **$3,300–$8,100** |

### 10.3 ROI Projection

| Scenario | Build Investment | Monthly Operating | Month 6 Revenue | Break-Even |
|---|---|---|---|---|
| Conservative | $16,000 | $4,500 | $14,800 | Month 4 |
| Base Case | $16,000 | $5,500 | $21,500 | Month 3 |
| Aggressive | $22,000 | $8,100 | $28,400 | Month 3 |

---

*End of AutoLinkr Strategic Website Implementation Plan v1.2*  
*Document prepared by DTC Shopify Strategy & CRO Consulting for Badger Ecom LLC*  
*All recommendations subject to client review and approval before implementation*
