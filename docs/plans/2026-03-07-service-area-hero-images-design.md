# Service Area Hero Images — Design Doc
Date: 2026-03-07

## Problem
The 17 service area pages use low-quality `.jpg` images sourced from `public/assets/areas/`. The goal is to replace them with high-quality `.webp` hero images, served locally from a clean per-area folder structure.

## Approved Design

### New File Structure
```
public/photos/service_areas/
  tampa/hero.webp
  fish-hawk/hero.webp
  lithia/hero.webp
  riverview/hero.webp
  south-tampa/hero.webp
  apollo-beach/hero.webp
  ruskin/hero.webp
  brandon/hero.webp
  seffner/hero.webp
  gibsonton/hero.webp
  dover/hero.webp
  temple-terrace/hero.webp
  carrollwood/hero.webp
  town-and-country/hero.webp
  bloomingdale/hero.webp
  clair-mel-city/hero.webp
  plant-city/hero.webp
```

### Files Changed
| File | Change |
|------|--------|
| `data/serviceAreas.ts` | Update all `image` fields to `/photos/service_areas/{slug}/hero.webp`; fix slug `clara-mel-city` → `clair-mel-city` |
| `package.json` | Add `validate:photos` script; add `prebuild` hook |

### Files Added
| File | Purpose |
|------|---------|
| `scripts/downloadServiceAreaPhotos.ts` | One-time download script: Wikipedia → Unsplash fallback |
| `scripts/validateServiceAreaPhotos.ts` | Build-time check; throws clear error if any hero.webp missing |

### Files Unchanged
- `app/service-areas/[slug]/page.tsx` — already uses `<Image src={area.image} />` correctly

## Photo Download Strategy (Hybrid)

For each area:
1. Query Wikipedia REST API: `https://en.wikipedia.org/api/rest_v1/page/summary/{search-term}`
2. If `originalimage` exists and width >= 800px → download, convert to webp (1600x900, q85), save
3. Otherwise → fall back to `https://source.unsplash.com/1600x900/?{search-term},florida`
4. Skip areas that already have a `hero.webp` (idempotent / safe to re-run)

### Wikipedia Search Terms
| Slug | Search Term |
|------|-------------|
| `tampa` | Tampa, Florida |
| `fish-hawk` | FishHawk Ranch, Florida |
| `lithia` | Lithia, Florida |
| `riverview` | Riverview, Florida |
| `south-tampa` | South Tampa, Florida |
| `apollo-beach` | Apollo Beach, Florida |
| `ruskin` | Ruskin, Florida |
| `brandon` | Brandon, Florida |
| `seffner` | Seffner, Florida |
| `gibsonton` | Gibsonton, Florida |
| `dover` | Dover, Florida |
| `temple-terrace` | Temple Terrace, Florida |
| `carrollwood` | Carrollwood, Florida |
| `town-and-country` | Town 'N' Country, Florida |
| `bloomingdale` | Bloomingdale, Florida |
| `clair-mel-city` | Clair-Mel City, Florida |
| `plant-city` | Plant City, Florida |

## Validation

`scripts/validateServiceAreaPhotos.ts`:
- Reads slugs from `data/serviceAreas.ts`
- Checks each `public/photos/service_areas/{slug}/hero.webp` exists
- On failure: prints all missing paths and exits non-zero with actionable error message
- On success: exits 0

`package.json`:
```json
"validate:photos": "ts-node scripts/validateServiceAreaPhotos.ts",
"prebuild": "npm run validate:photos"
```

## Slug Fix
`clara-mel-city` → `clair-mel-city` throughout:
- `data/serviceAreas.ts` (slug field + image path)
- New photo folder name
