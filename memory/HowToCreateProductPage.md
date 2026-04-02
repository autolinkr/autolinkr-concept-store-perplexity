# How to Create a New AutoLinkr Product Page

> **Cursor Skill version**: `.cursor/skills/create-product-page/SKILL.md`
> This file is the readable reference. The skill file is what the agent uses.

A step-by-step guide for building a standard product page from scratch.

---

## Prerequisites

Before you start, have these ready:

- [ ] Product created in Shopify Admin (title, price, variants, images uploaded)
- [ ] 4-5 product photos (hero, lifestyle, close-up, box contents, scale reference)
- [ ] Product description (2-3 paragraphs)
- [ ] 3 key benefit bullets (problem-solved framing, 15 words max each)
- [ ] Tech specs list
- [ ] Tab 2 content (compatibility, what's included, sizing — whatever fits the product)

---

## Phase 1: Create the Template in Shopify

### Step 1 — Create a new product template

1. Go to **Shopify Admin → Online Store → Themes**
2. On your theme (ConceptThemePerplexity), click **Customize**
3. In the top-center dropdown, click the page name (e.g., "Home page")
4. Select **Products → Create template**
5. Name it: `autolinkr-[product-handle]` (e.g., `autolinkr-dash`, `autolinkr-aroma`)
6. Choose **Default product** as the base — this gives you a `main-product` section to start from

### Step 2 — Assign the template to the product

1. Go to **Shopify Admin → Products → [Your Product]**
2. Scroll to **Theme template** (right sidebar)
3. Select the template you just created (e.g., `autolinkr-dash`)
4. Save

### Step 3 — Open the template in the Customizer

1. Go back to **Themes → Customize**
2. Navigate to **Products** → select your new template
3. Select the product you assigned in Step 2 as the preview product
4. You should now see the default `main-product` section with the product loaded

---

## Phase 2: Configure the Main Product Section

This is where 90% of the product page lives. Work through the blocks top to bottom.

### Step 4 — Set up the gallery

1. Click on the `main-product` section in the left sidebar
2. Under section settings:
   - **Media size**: `50` (50/50 split on desktop)
   - **Gallery layout**: `stacked` or `thumbnails` (thumbnails recommended)
3. The gallery pulls images from the product itself — make sure they're ordered correctly in **Products → [Product] → Media**

### Step 5 — Configure blocks (top to bottom)

Remove any default blocks you don't need, then add/configure these in order:

#### 5a. Badge text (optional)

- **Add block → Text**
- Icon: `none`
- Text: Your badge (e.g., `⭐ Best Seller`, `🔥 New Arrival`)
- Text size: `text-sm`

#### 5b. Title

- **Add block → Title** (should already exist)
- Title size: `product-title-lg`
- Mobile size: `product-title-md`
- Tag: `h1`
- Show price: ✅
- Show rating: ✅ (or ❌ if no reviews yet)

#### 5c. Key benefit bullets (3 text blocks)

- **Add block → Text** (repeat 3 times)
- Icon: `none` (emojis go in the text itself)
- Text: Your benefit bullet with emoji prefix
- Text size: `text-base`
- Example: `🎬 Upgrade your car screen — Netflix, Hulu, Disney+ & more`

#### 5d. Variant picker

- **Add block → Variant picker** (should already exist)
- Enable dynamic variants: ✅
- Show variant labels: ✅
- Picker type: `buttons` (not dropdown)

#### 5e. App blocks (optional)

- If using **Moon Bundles**: Add block → Apps → Moon Bundles
- If using **Areviews star display**: Add block → Apps → Areviews Title Rating

#### 5f. Buy buttons

- **Add block → Buy buttons** (should already exist)
- Show dynamic checkout: ✅
- Show gift card recipient: ❌

#### 5g. Sticky buy button

- **Add block → Sticky buy button**
- This auto-shows on mobile when the hero scrolls away

#### 5h. Icon list

- **Add block → Icon list**
- This shows the trust icons (🚚 Free Shipping, etc.)
- Show below media: ✅

#### 5i. Collapsible tabs (4 tabs)

Add 4 `Collapsible tab` blocks:

| Tab | Heading | Content |
|-----|---------|---------|
| 1 | Description | 2-3 paragraphs about the product (paste as rich text) |
| 2 | [Product-specific] | Compatibility, What's Included, Sizing, etc. |
| 3 | Tech Specs | Bullet list of specs (paste as rich text) |
| 4 | Shipping & Returns | Standard copy (see below) |

**Standard Shipping & Returns copy** (same for all products):

```
FREE standard shipping on all orders (6-10 business days).
Most orders placed before 2pm ET ship the same day.

30-day money-back guarantee — return for full in-store credit.
We cover return shipping.

1-Year Warranty — covered against manufacturing defects.

support@theautolinkr.com
```

Each tab settings:
- Opened: ❌ (all closed by default)
- Style: `with-border`
- Text size: `text-sm`

#### 5j. Safety disclaimer (only for electronics/streaming)

- **Add block → Text**
- Icon: `none`
- Text: Your safety disclaimer with ⚠️ prefix
- Text size: `text-xs`

---

## Phase 3: Add Recommendations & Reviews

### Step 6 — Product Recommendations

1. In the left sidebar, click **Add section**
2. Search for `Product recommendations`
3. Configure:
   - Heading: `You Might Also Like` (or `Complete Your Setup`)
   - Heading size: `h2`

### Step 7 — Reviews Widget

1. Click **Add section**
2. Search for `Apps`
3. Inside the Apps section, click **Add block**
4. Select **Areviews Display Reviews**
5. Settings:
   - Hide title rating: ❌
   - Theme font: `inherit`
   - Stars color: `#f3c621`
   - Write reviews button color: `#373737`

---

## Phase 4: Verify Section Order

Your template should have exactly 3 sections in this order:

```
1. main-product
2. product-recommendations
3. apps (Areviews)
```

Drag to reorder if needed. Remove any extra default sections that came with the template.

---

## Phase 5: Pull, Commit, Push

### Step 8 — Pull the template to your local repo

```bash
cd ~/Documents/autolinkr-concept-store-perplexity
shopify theme pull --theme ConceptThemePerplexity
```

This downloads the new `templates/product.autolinkr-[name].json` file.

### Step 9 — Verify the file

Open `templates/product.autolinkr-[name].json` and confirm:
- `main-product` section with all your blocks
- `product-recommendations` section
- `apps` section with Areviews block
- `order` array at the bottom lists all three

### Step 10 — Commit and push

```bash
git add templates/product.autolinkr-[name].json
git commit -m "add: product template for AutoLinkr [Product Name]"
git push origin main
```

---

## Phase 6: QA Checklist

Preview the page and verify:

- [ ] **Gallery**: All images load, correct order, swipeable on mobile
- [ ] **Title + price**: Displays correctly, price is right
- [ ] **Benefit bullets**: 3 bullets visible, emojis render, text is scannable
- [ ] **Variants**: All variants selectable, price updates dynamically
- [ ] **Buy button**: Add to Cart works, dynamic checkout buttons show
- [ ] **Sticky buy**: Appears on mobile when scrolling past hero
- [ ] **Icon list**: Free Shipping / 30-Day / Secure Checkout icons visible
- [ ] **Collapsible tabs**: All 4 expand/collapse, content is formatted
- [ ] **Recommendations**: Shows relevant products
- [ ] **Reviews**: Widget loads, displays reviews (if product has any)
- [ ] **Mobile**: Entire page looks good on phone (check in browser devtools)
- [ ] **Speed**: Page loads in under 3 seconds on mobile

---

## Upgrading to a Landing Page

When a product becomes a flagship and needs the full treatment, add sections
between `main-product` and `product-recommendations`. See
[AutoLinkrProPageDesign.txt](AutoLinkrProPageDesign.txt) for a complete
example. Common additions:

| Section | When to add |
|---------|------------|
| Feature strip | Product has setup/warranty/shipping anxiety |
| Product video | Product does something visible worth demoing |
| Press logos | You have 4+ real press/partner logos |
| Feature breakdown | Product has 4+ features worth expanding on |
| Compatibility | #1 objection is "will it work with my ___?" |
| How it works | Product requires setup or has a learning curve |
| Testimonials banner | You have 3+ strong reviews for this product |
| Product comparison | Product is part of a tiered product line |
| Cross-sell | There's a natural companion product |
| FAQ | Product has 5+ common purchase hesitations |
| Final CTA | Landing page needs a closing push |

---

## Reference Files

| File | Purpose |
|------|---------|
| `memory/AutoLinkrProductTemplateBoilerplate.txt` | Content blueprint — what to write |
| `memory/AutoLinkrProPageDesign.txt` | Full landing page example (Pro) |
| `memory/AutoLinkrHomePageDesign.txt` | Homepage blueprint |
| `memory/BRAND_CONTROL_PANEL.md` | Brand tokens, colors, voice guidelines |
