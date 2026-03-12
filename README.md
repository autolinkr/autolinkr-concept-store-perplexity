# autolinkr-concept-store-perplexity

> **Source of truth** for the `ConceptThemePerplexity` Shopify theme.

## Overview

This repository contains the full theme codebase for the AutoLinkr concept store, developed and maintained as a clean, modular Shopify Online Store 2.0 theme.

## Scope & Permissions

| Item | Value |
|---|---|
| GitHub Repo | `autolinkr/autolinkr-concept-store-perplexity` |
| Shopify Theme | `ConceptThemePerplexity` |
| Write Target | This theme only — no other themes |
| Sync Direction | GitHub ↔ `ConceptThemePerplexity` exclusively |

## Directory Structure

```
autolinkr-concept-store-perplexity/
├── assets/          # CSS, JS, images, fonts
├── config/          # settings_schema.json, settings_data.json
├── layout/          # theme.liquid (root layout)
├── locales/         # i18n translation files
├── sections/        # Shopify sections (OS 2.0)
├── snippets/        # Reusable Liquid snippets
└── templates/       # JSON and Liquid page templates
    └── customers/   # Customer account templates
```

## Development Workflow

### Prerequisites
- [Shopify CLI 3.x](https://shopify.dev/docs/themes/tools/cli)
- Node.js 18+
- Git

### Setup
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Authenticate with the store
shopify auth login --store <your-store>.myshopify.com

# Start local dev server (targets ConceptThemePerplexity only)
shopify theme dev --theme-id <CONCEPT_THEME_ID>
```

### Pull theme from Shopify → Repo
```bash
shopify theme pull --theme-id <CONCEPT_THEME_ID>
git add -A && git commit -m "sync: pull from ConceptThemePerplexity" && git push
```

### Push repo changes → Shopify
```bash
git pull
shopify theme push --theme-id <CONCEPT_THEME_ID>
```

> **Rule:** Never push to any theme other than `ConceptThemePerplexity`.

## Setup Status

- [x] GitHub repository created
- [x] Directory structure scaffolded (OS 2.0 standard)
- [ ] `ConceptThemePerplexity` theme ID confirmed (pending)
- [ ] Shopify CLI authenticated
- [ ] Initial theme pull completed
- [ ] Implementation plan reviewed (Phase 4)

## Decisions & Assumptions

| Decision | Rationale |
|---|---|
| Online Store 2.0 structure | Sections-everywhere, JSON templates — current Shopify standard |
| GitHub as source of truth | All changes committed before deploying; no direct admin edits |
| Single theme target | Prevents accidental overwrites of live/other themes |
| `.gitkeep` placeholders | Preserves empty dirs needed by Shopify CLI |

## Phase 4 — Implementation Plan

> Pending review of reference files from Google Drive. Implementation will not begin until a structured plan is approved.
