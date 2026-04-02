---
name: create-product-page
description: >-
  Create a new AutoLinkr Shopify product page from the standard boilerplate.
  Use when the user says "create product page", "new product template",
  "add a product", "build product page", or wants to set up a new product
  in the ConceptThemePerplexity Shopify theme.
---

# Create an AutoLinkr Product Page

Step-by-step guide for building a standard product page. Every product page
uses 3 sections: `main-product`, `product-recommendations`, and `apps` (reviews).

## Phase 1: Create the Template in Shopify

### Step 1 — Create a new product template

1. **Shopify Admin → Online Store → Themes → Customize**
2. Top-center dropdown → **Products → Create template**
3. Name: `autolinkr-[product-handle]`
4. Base: **Default product**

### Step 2 — Assign template to the product

1. **Admin → Products → [Product]**
2. Right sidebar → **Theme template** → select the new template
3. Save

### Step 3 — Open in Customizer

1. **Themes → Customize → Products** → select your template
2. Preview with the assigned product

## Phase 2: Configure Main Product Section

Work through blocks top to bottom inside `main-product`:

### Block order

| # | Block type | Settings |
|---|-----------|----------|
| a | `text` (badge, optional) | Icon: `none`, text: e.g. `⭐ Best Seller`, size: `text-sm` |
| b | `title` | Size: `product-title-lg`, mobile: `product-title-md`, tag: `h1`, show price: ✅ |
| c | `text` × 3 (benefit bullets) | Icon: `none`, emoji-prefixed benefit text, size: `text-base` |
| d | `variant_picker` | Dynamic variants: ✅, labels: ✅, type: `buttons` |
| e | App blocks (optional) | Moon Bundles, Areviews Title Rating — only if configured |
| f | `buy_buttons` | Dynamic checkout: ✅ |
| g | `sticky_buy_button` | Mobile sticky bar |
| h | `icon_list` | 🚚 Free Shipping · 🛡 30-Day · 🔒 Secure. Show below media: ✅ |
| i | `collapsible_tab` × 4 | See tab content below |
| j | `text` (safety, optional) | Only for electronics/streaming. Icon: `none`, size: `text-xs` |

### Collapsible tab content

| Tab | Heading | Content |
|-----|---------|---------|
| 1 | Description | 2-3 paragraphs: what it does, who it's for, why it's better |
| 2 | *Product-specific* | "Compatibility" / "What's Included" / "Sizing" — pick one |
| 3 | Tech Specs | Bullet list of specifications |
| 4 | Shipping & Returns | Standard copy (below) |

Tab settings: opened `❌`, style `with-border`, text size `text-sm`.

**Standard Shipping & Returns copy:**

```text
FREE standard shipping on all orders (6-10 business days).
Most orders placed before 2pm ET ship the same day.

30-day money-back guarantee — return for full in-store credit.
We cover return shipping.

1-Year Warranty — covered against manufacturing defects.

support@theautolinkr.com
```

### Gallery settings

- Media size: `50`
- Gallery layout: `thumbnails` (recommended) or `stacked`
- Images ordered in Products → Media: hero → lifestyle → close-up → box → scale

### Benefit bullet rules

- 3 bullets max
- Emoji prefix for scanning
- Problem-first framing ("Upgrade your car screen" not "Has HDMI output")
- 15 words max each

## Phase 3: Add Recommendations & Reviews

### Product Recommendations

1. **Add section → Product recommendations**
2. Heading: `You Might Also Like` or `Complete Your Setup`
3. Heading size: `h2`

### Reviews Widget

1. **Add section → Apps**
2. Add block → **Areviews Display Reviews**
3. Settings: hide title rating `❌`, font `inherit`, stars `#f3c621`, button `#373737`

## Phase 4: Verify & Clean Up

Final section order (drag to reorder if needed):

```
1. main-product
2. product-recommendations
3. apps (Areviews)
```

Remove any extra default sections that came with the template.

## Phase 5: Pull, Commit, Push

```bash
shopify theme pull --theme ConceptThemePerplexity
git add templates/product.autolinkr-[name].json
git commit -m "add: product template for AutoLinkr [Product Name]"
git push origin main
```

## Phase 6: QA Checklist

- [ ] Gallery: images load, correct order, swipeable on mobile
- [ ] Title + price display correctly
- [ ] 3 benefit bullets visible with emojis
- [ ] Variants selectable, price updates dynamically
- [ ] Buy button works, dynamic checkout shows
- [ ] Sticky buy appears on mobile scroll
- [ ] Icon list visible (Free Shipping / 30-Day / Secure)
- [ ] All 4 collapsible tabs expand/collapse with content
- [ ] Recommendations show relevant products
- [ ] Reviews widget loads
- [ ] Mobile looks good end-to-end
- [ ] Page loads under 3 seconds on mobile

## Upgrading to a Landing Page

When a product needs the full treatment, add sections between `main-product`
and `product-recommendations`. See `memory/AutoLinkrProPageDesign.txt`.

| Section | When to add |
|---------|------------|
| Feature strip | Setup/warranty/shipping anxiety |
| Product video | Product does something visible |
| Press logos | 4+ real press logos available |
| Feature breakdown | 4+ features worth expanding |
| Compatibility | "Will it work with my ___?" objection |
| How it works | Setup required or learning curve |
| Testimonials banner | 3+ strong product-specific reviews |
| Product comparison | Tiered product line (Pro vs Elite) |
| Cross-sell | Natural companion product exists |
| FAQ | 5+ common purchase hesitations |
| Final CTA | Landing page needs a closing push |

## Reference Files

| File | Purpose |
|------|---------|
| `memory/AutoLinkrProductTemplateBoilerplate.txt` | Content blueprint — what copy to write |
| `memory/AutoLinkrProPageDesign.txt` | Full landing page example |
| `memory/AutoLinkrHomePageDesign.txt` | Homepage blueprint |
| `memory/BRAND_CONTROL_PANEL.md` | Brand tokens, colors, voice guidelines |
