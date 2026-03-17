---
name: shopify-product-pages
description: "Build high-converting Shopify product page templates. Use when designing product page layouts (main-product block structure, collapsible tabs, trust signals, sticky buy bar), planning upsell and cross-sell strategy (featured-product sections, product comparison tables, Elite vs Pro upgrade nudges), building feature grids, How It Works sections, video sections, scrolling text banners, testimonials, and guarantee sections. Covers CRO patterns, the upsell hierarchy (Base to Pro to Elite), and the full JSON template structure for OS 2.0 product pages."
license: MIT
metadata:
  author: perplexity-computer
  version: '1.1'
---

# Shopify Product Pages & CRO

## When to Use This Skill

Load for:
- Building or improving a product page template
- Structuring the main-product section blocks (title, variants, buy button, trust)
- Adding upsell, cross-sell, or comparison sections
- Planning the product hierarchy and upgrade funnel
- Building "How It Works", feature grids, video sections
- Establishing CRO patterns: trust signals, guarantee badges, sticky buy bar

---

## Product Hierarchy Strategy

Before building templates, map the product line into a clear upgrade funnel:

```
Base / Entry Level
  ↓  (easy upgrade, small price jump, clear added value)
Mid Tier / Standard
  ↓  (strong upsell, streaming / features unlock)
Premium / Elite
  ↓  (flagship, most capable, highest margin)
Accessories / Add-ons
  (related products, not in direct upgrade path)
```

**Key principle:** Every product page must have a reason to look at the tier above it. Never show a product in isolation — always give the visitor a clear path to upgrade.

**Never cross-mention competing product lines** on a product page. Only upsell within the same product family (e.g., Pro → Elite is fine; Pro → Tablet is not).

---

## Custom Template Per Product Line

Create a separate JSON template for each distinct product type:

```
templates/product.json                  ← Default fallback
templates/product.PRODUCTLINE-a.json    ← Entry level product
templates/product.PRODUCTLINE-b.json    ← Mid tier product
templates/product.PRODUCTLINE-pro.json  ← Premium product
templates/product.PRODUCTLINE-elite.json ← Flagship product
templates/product.accessory-name.json   ← Standalone accessories
```

Each gets its own section stack and cross-sell logic.

---

## Main-Product Block Order (Best Practice)

The `main-product` section block order determines what the user sees in the product info column:

```json
"block_order": [
  "breadcrumb",        // 1. Where am I? (Home > Category > Product)
  "badges",            // 2. Sale badge, sold-out badge
  "text-badge",        // 3. One-line value prop ("⚡ Ships in 24 hours")
  "title",             // 4. Product title + price + star rating
  "text-description",  // 5. 2–3 sentence compelling description
  "variant_picker",    // 6. Variant selection (size, color, storage)
  "text-variant-note", // 7. Helpful note about variant choice
  "buy_buttons",       // 8. Add to cart + dynamic checkout
  "sticky_buy_button", // 9. Sticky buy bar (follows on scroll)
  "icon_list",         // 10. Small icon row (optional)
  "text-trust-1",      // 11. ✓ Free Shipping
  "text-trust-2",      // 12. ✓ 30-Day Guarantee
  "text-trust-3",      // 13. ✓ 1-Year Warranty
  "collapsible-specs", // 14. Specs (open by default)
  "collapsible-faq",   // 15. FAQ
  "collapsible-ship",  // 16. Shipping & Returns
  "rating"             // 17. Star rating aggregate
]
```

### Main-Product Settings (JSON):
```json
"settings": {
  "media_size": 50,
  "mobile_thumbnails": "show",
  "gallery_layout": "stacked",
  "media_fit": "contain",
  "color_text": "#F7F7F8",
  "color_background": "#080809",
  "color_background_2": "#0F0F12",
  "gradient_background": "",
  "color_highlight": "#3B8EF8",
  "color_button_text": "#ffffff",
  "color_button_background": "#3B8EF8"
}
```

---

## Collapsible Tabs Strategy

Use 3–4 collapsibles per product. Follow this pattern:
```
Tab 1 (OPEN):   Core specs / full feature list
Tab 2 (closed): Product-specific FAQ or variant guide
Tab 3 (closed): Installation / How to Use
Tab 4 (closed): Shipping & Returns
```

### Richtext Validation (Critical):
All `richtext` content fields MUST use `<p>` or `<ul>` wrappers — never plain text:
```json
"content": "<p>Your text here.</p><ul><li>Point 1</li><li>Point 2</li></ul>"
```

---

## Trust Signal Section (Below Buy Button)

Add these three text blocks immediately below buy_buttons:
```json
"text-trust-1": {
  "type": "text",
  "settings": { "text": "✓ Free & Fast Shipping", "text_size": "text-sm" }
},
"text-trust-2": {
  "type": "text",
  "settings": { "text": "✓ 30-Day Money-Back Guarantee", "text_size": "text-sm" }
},
"text-trust-3": {
  "type": "text",
  "settings": { "text": "✓ 1-Year Warranty", "text_size": "text-sm" }
}
```

**Do not include phone numbers or personal contact info** in trust signals — keep it to benefits and policy statements only.

---

## Section Stack Below Main Product

The full below-the-fold section order for a high-converting product page:

```
1.  Feature Strip      ← horizontal icon bar (4–5 key benefits)
2.  Video Section      ← product in action (use correct CDN URL per product)
3.  How It Works       ← 3-step setup/use guide with images
4.  Feature Grid       ← multicolumn-with-icons (6 features, 3x2)
5.  Image with Text    ← deep dive on hero feature (alternating)
6.  Stats / Numbers    ← number-counter (e.g. "50,000+ customers")
7.  Scrolling Text     ← animated marquee of key words
8.  Testimonials       ← social proof carousel
9.  Comparison Table   ← "Why [Product] vs. Competitor"
10. FAQ Section        ← product-specific Q&A
11. Upgrade CTA        ← featured-product (next tier up)
12. Reviews            ← aReviews / Judge.me app embed
```

**Critical:** Each product template must use the correct video for THAT product. Never reuse another product's video. Confirm CDN URLs per product before publishing.

---

## How It Works Section Pattern

```json
"how-it-works": {
  "type": "al-how-it-works",
  "blocks": {
    "step-1": {
      "type": "step",
      "settings": {
        "heading": "Step 1 — Action Name",
        "body": "Clear description of the action. What does the user do? How long does it take?",
        "badge": "30 seconds",
        "image_url": "https://cdn.shopify.com/s/files/.../image.jpg",
        "image_ratio": "4/3"
      }
    }
  },
  "settings": {
    "eyebrow": "Setup Guide",
    "heading": "Up and Running in 60 Seconds",
    "subheading": "No tools required.",
    "padding_top": 80,
    "padding_bottom": 80
  }
}
```

**Step number placement:** The step number badge belongs at the TOP of the text block — above the heading — not beside the "Step X" label. Redundant placement kills readability.

---

## Product Comparison Table

Use `product-comparison` section type when the theme supports it:
```json
"comparison": {
  "type": "product-comparison",
  "settings": {
    "heading": "Why [Product] Beats the Competition",
    "columns": 3,
    "column_1_heading": "[Your Product]",
    "column_2_heading": "Generic Brand A",
    "column_3_heading": "Generic Brand B"
  },
  "blocks": {
    "row-1": {
      "type": "row",
      "settings": {
        "label": "Feature Name",
        "value_1": "<p>✓ Yes</p>",
        "value_2": "<p>✓ Yes</p>",
        "value_3": "<p>✗ No</p>"
      }
    }
  }
}
```

**Note:** `product-comparison` `value_N` fields are **richtext** — must use `<p>` wrappers.

### Highlight your product's column:
Use a distinct background/border on column 1 (your product) to draw the eye. Lead with 2–3 features where you win vs. competitors.

---

## Upsell / Cross-Sell Strategy

### At Bottom of Entry/Mid Tier Pages:
Feature the NEXT TIER UP as a `featured-product` section:

```json
"elite-upsell": {
  "type": "featured-product",
  "blocks": {
    "badge": {
      "type": "text",
      "settings": { "text": "🔥 Most Popular Upgrade", "text_size": "text-sm" }
    },
    "title": {
      "type": "title",
      "settings": { "title_size": "product-title-md", "show_price": true, "show_rating": true }
    },
    "description": {
      "type": "text",
      "settings": {
        "text": "Upgrade to [Elite/Premium] for [key benefit]. Everything in [current tier] plus [3 specific additions].",
        "text_size": "text-sm"
      }
    },
    "buy_buttons": {
      "type": "buy_buttons",
      "settings": { "show_quantity_selector": false, "show_dynamic_checkout": true }
    }
  },
  "settings": {
    "product": "your-product-handle",
    "color_text": "#F7F7F8",
    "color_background": "#080809",
    "color_highlight": "#F0A840",
    "color_button_text": "#000000",
    "color_button_background": "#F0A840"
  }
}
```

**Use gold/different color for the upsell CTA** to distinguish it from the primary buy button. Gold = aspirational / premium.

### Upsell Placement Gap
Always add a visual "gap" section between the main product content and the upsell block. A subtle heading like "Looking for even more capability?" or a divider section prevents the upsell from feeling like a continuation of the main product.

### Cross-Sell (Different Product Line):
Place `product-recommendations` at the bottom for algorithmic cross-sells:
```json
"product-recommendations": {
  "type": "product-recommendations",
  "settings": {
    "heading": "Complete Your Setup",
    "products_to_show": 4,
    "columns_desktop": 4
  }
}
```

---

## Number Counter Section

```json
"stats": {
  "type": "number-counter",
  "blocks": {
    "stat-1": {
      "type": "item",
      "settings": {
        "number": "50,000+",
        "label": "Happy Customers",
        "description": "<p>Drivers who upgraded to wireless</p>"
      }
    }
  },
  "settings": {
    "columns": 4,
    "columns_mobile": "2",
    "duration": 2,
    "color_background": "#080809"
  }
}
```

**Validation:** `columns_mobile` must be a **string** ("2", not 2). `duration` max = 5.

---

## Scrolling Text Banner

```json
"scrolling-text": {
  "type": "scrolling-text",
  "blocks": {
    "item-1": { "type": "text", "settings": { "text": "Free Shipping" }},
    "item-2": { "type": "text", "settings": { "text": "30-Day Guarantee" }},
    "item-3": { "type": "text", "settings": { "text": "50,000+ Reviews" }},
    "item-4": { "type": "text", "settings": { "text": "Plug & Play Setup" }}
  },
  "settings": {
    "text_size": 100,
    "speed": 20,
    "pause_on_hover": true,
    "color_background": "#0F0F12",
    "color_text": "#F7F7F8",
    "color_highlight": "#3B8EF8"
  }
}
```

**Validation:** `text_size` is a range field — use 100–160, not a quoted string.

---

## Video Section Pattern

```json
"video-section": {
  "type": "al-video-section",
  "settings": {
    "eyebrow": "Product Name In Action",
    "heading": "See How It Works",
    "subheading": "Supporting description",
    "video_url": "https://cdn.shopify.com/videos/.../your-video.mp4",
    "autoplay": true,
    "background_style": "dark",
    "padding_top": 80,
    "padding_bottom": 80
  }
}
```

For YouTube embed: use `"youtube_id": "VIDEO_ID_HERE"` instead of `video_url`.

**Each product must have its own distinct video.** Never reuse a sibling product's video — it destroys trust and confuses visitors.

---

## Guarantee / Risk Reversal Section

Always include a text-based guarantee near the buy button:
```
30-Day Money-Back Guarantee
We're so confident in [Product] that if you're not completely satisfied within 30 days of receiving it, we'll refund you in full. No questions asked. No return shipping required.
```

Style as a bordered callout:
```css
.guarantee-block {
  border: 1px solid var(--brand-border);
  border-left: 3px solid var(--brand-green);
  border-radius: var(--brand-r-md);
  padding: 20px 24px;
  background: rgba(52, 208, 106, 0.05);
}
```

**Placement:** Guarantee copy should appear on the product page itself — below the buy button or in the first collapsible. Do not only reference it in the footer.

---

## Collection Page Template

```json
{
  "sections": {
    "collection-banner": {
      "type": "collection-banner",
      "settings": {
        "show_collection_description": true,
        "color_text": "#F7F7F8",
        "color_background": "#080809"
      }
    },
    "main-collection": {
      "type": "main-collection-product-grid",
      "settings": {
        "products_per_page": 12,
        "columns_desktop": 3,
        "columns_mobile": 2,
        "show_vendor": false,
        "show_rating": true,
        "quick_add": "bulk",
        "color_text": "#F7F7F8",
        "color_background": "#080809"
      }
    }
  },
  "order": ["collection-banner", "main-collection"]
}
```

---

## FAQ Page Template

Structure FAQs by category using multiple `faq` sections:
```json
{
  "sections": {
    "main-page": { "type": "main-page", "settings": {} },
    "faq-cat-1": {
      "type": "faq",
      "blocks": {
        "cat-heading": { "type": "rich-text", "settings": { "heading": "Category Name" }},
        "q1": {
          "type": "question",
          "settings": {
            "title": "Question text here?",
            "text": "<p>Answer with full context. Link to relevant pages where helpful.</p>"
          }
        }
      }
    }
  }
}
```

**FAQ Content Sources:**
- Product reviews — common complaints = FAQ candidates
- Support emails — repeated questions = FAQ priority
- Competitor FAQ pages — address those same concerns
- Product specifications — "Does it work with X?" questions
- Policy questions — returns, shipping, warranty

Aim for minimum 5 questions per category, 3+ categories.

---

## Compatibility / Quiz Page

For products with complex compatibility requirements:
```json
"jebbit-quiz": {
  "type": "custom-liquid",
  "settings": {
    "liquid": "<!-- Jebbit quiz iframe embed code here -->"
  }
}
```

With a fallback static compatibility grid for users who don't take the quiz:
```json
"compatibility-grid": {
  "type": "multicolumn-with-icons",
  "blocks": {
    "scenario-1": {
      "type": "column",
      "settings": {
        "icon": "checkmark",
        "heading": "Customer Type A",
        "text": "<p>Recommended product and why it fits their situation.</p>"
      }
    }
  }
}
```

---

## CRO Principles Summary

```
1. CLARITY FIRST       — Visitor must understand the product in 3 seconds
2. ONE PRIMARY CTA     — Every section has at most one clear CTA button
3. SOCIAL PROOF EARLY  — Rating + review count visible above the fold
4. RISK REVERSAL       — Guarantee prominently near the buy button
5. UPGRADE PATH        — Always show the next tier up; never a dead end
6. NO CROSS-POLLINATION — Don't mention other product lines on a product page
7. PRODUCT VIDEO       — Video increases conversion 15–40% for physical products
8. SPECIFICITY WINS    — "Setup in 60 seconds" beats "Easy setup"
9. URGENCY IS EARNED   — Use scarcity/urgency only when genuine
10. MOBILE FIRST       — 70%+ of Shopify traffic is mobile; design for that
11. TRUST DENSITY      — Group trust signals (shipping, guarantee, warranty) together
12. CORRECT MEDIA      — Each product must have its own images and videos
```
