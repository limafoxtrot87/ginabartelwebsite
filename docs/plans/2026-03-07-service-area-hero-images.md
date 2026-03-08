# Service Area Hero Images Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:executing-plans to implement this plan task-by-task.

**Goal:** Replace 17 low-quality service area `.jpg` images with high-quality `.webp` hero images downloaded from Wikipedia (with Unsplash fallback), served locally from `public/photos/service_areas/{slug}/hero.webp`.

**Architecture:** A one-time download script fetches the best available image per area using Wikipedia's free REST API, falls back to Unsplash Source API if Wikipedia's image is missing or too small, converts to webp via `sharp`, and drops it in the correct folder. A validation script is wired into `prebuild` to catch missing images before deployment.

**Tech Stack:** Next.js 14, TypeScript, `tsx` (script runner), `sharp` (webp conversion), Node.js built-in `fetch`, Wikipedia REST API, Unsplash Source API

---

### Task 1: Fix slug `clara-mel-city` → `clair-mel-city` in serviceAreas.ts

**Files:**
- Modify: `data/serviceAreas.ts` (line 215 — slug field, line 222 — image path)

**Step 1: Edit the slug and image fields**

In `data/serviceAreas.ts`, find the `clara-mel-city` entry (currently near line 215) and change:
```ts
// BEFORE
slug: "clara-mel-city",
...
image: "/assets/areas/clara-mel-city.jpg",

// AFTER
slug: "clair-mel-city",
...
image: "/photos/service_areas/clair-mel-city/hero.webp",
```

Also update the `name` field from `"Clara Mel City"` to `"Clair Mel City"` and the `overview`/content to match the correct spelling.

**Step 2: Verify no other references to `clara-mel-city` exist**

```bash
grep -r "clara-mel-city" /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite --include="*.ts" --include="*.tsx" --include="*.mjs"
```

Expected: no output (zero matches).

**Step 3: Commit**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
git add data/serviceAreas.ts
git commit -m "fix: correct slug clara-mel-city → clair-mel-city"
```

---

### Task 2: Update all 17 image paths in serviceAreas.ts

**Files:**
- Modify: `data/serviceAreas.ts` (all `image:` fields)

**Step 1: Update every `image` field**

Change each entry's `image` field from `/assets/areas/{slug}.jpg` to `/photos/service_areas/{slug}/hero.webp`. The clair-mel-city entry was already fixed in Task 1. Update the remaining 16:

```ts
// tampa
image: "/photos/service_areas/tampa/hero.webp",
// fish-hawk
image: "/photos/service_areas/fish-hawk/hero.webp",
// lithia
image: "/photos/service_areas/lithia/hero.webp",
// riverview
image: "/photos/service_areas/riverview/hero.webp",
// south-tampa
image: "/photos/service_areas/south-tampa/hero.webp",
// apollo-beach
image: "/photos/service_areas/apollo-beach/hero.webp",
// ruskin
image: "/photos/service_areas/ruskin/hero.webp",
// brandon
image: "/photos/service_areas/brandon/hero.webp",
// seffner
image: "/photos/service_areas/seffner/hero.webp",
// gibsonton
image: "/photos/service_areas/gibsonton/hero.webp",
// dover
image: "/photos/service_areas/dover/hero.webp",
// temple-terrace
image: "/photos/service_areas/temple-terrace/hero.webp",
// carrollwood
image: "/photos/service_areas/carrollwood/hero.webp",
// town-and-country
image: "/photos/service_areas/town-and-country/hero.webp",
// bloomingdale
image: "/photos/service_areas/bloomingdale/hero.webp",
// plant-city
image: "/photos/service_areas/plant-city/hero.webp",
```

**Step 2: Verify all old paths are gone**

```bash
grep "assets/areas" /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite/data/serviceAreas.ts
```

Expected: no output.

**Step 3: Commit**

```bash
git add data/serviceAreas.ts
git commit -m "feat: update service area image paths to hero.webp structure"
```

---

### Task 3: Create 17 folders under public/photos/service_areas/

**Files:**
- Create: `public/photos/service_areas/{slug}/` (17 directories)

**Step 1: Create all directories**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
mkdir -p public/photos/service_areas/tampa
mkdir -p public/photos/service_areas/fish-hawk
mkdir -p public/photos/service_areas/lithia
mkdir -p public/photos/service_areas/riverview
mkdir -p public/photos/service_areas/south-tampa
mkdir -p public/photos/service_areas/apollo-beach
mkdir -p public/photos/service_areas/ruskin
mkdir -p public/photos/service_areas/brandon
mkdir -p public/photos/service_areas/seffner
mkdir -p public/photos/service_areas/gibsonton
mkdir -p public/photos/service_areas/dover
mkdir -p public/photos/service_areas/temple-terrace
mkdir -p public/photos/service_areas/carrollwood
mkdir -p public/photos/service_areas/town-and-country
mkdir -p public/photos/service_areas/bloomingdale
mkdir -p public/photos/service_areas/clair-mel-city
mkdir -p public/photos/service_areas/plant-city
```

**Step 2: Verify**

```bash
ls public/photos/service_areas/
```

Expected: 17 directories listed.

**Step 3: Commit (empty dirs need a .gitkeep)**

```bash
find public/photos/service_areas -type d -exec touch {}/.gitkeep \;
git add public/photos/service_areas/
git commit -m "feat: scaffold service area hero image directories"
```

---

### Task 4: Install sharp

**Step 1: Install**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
npm install sharp
npm install --save-dev @types/sharp
```

**Step 2: Verify**

```bash
node -e "require('sharp'); console.log('sharp ok')"
```

Expected: `sharp ok`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add sharp for webp image conversion"
```

---

### Task 5: Write scripts/downloadServiceAreaPhotos.ts

**Files:**
- Create: `scripts/downloadServiceAreaPhotos.ts`

**Step 1: Create the script**

```ts
import sharp from "sharp";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const AREAS: { slug: string; wikiSearch: string; unsplashQuery: string }[] = [
  { slug: "tampa",           wikiSearch: "Tampa,_Florida",              unsplashQuery: "Tampa+Florida+city" },
  { slug: "fish-hawk",       wikiSearch: "FishHawk_Ranch,_Florida",     unsplashQuery: "FishHawk+Ranch+Florida+suburb" },
  { slug: "lithia",          wikiSearch: "Lithia,_Florida",             unsplashQuery: "Lithia+Florida+suburb" },
  { slug: "riverview",       wikiSearch: "Riverview,_Florida",          unsplashQuery: "Riverview+Florida+suburb" },
  { slug: "south-tampa",     wikiSearch: "South_Tampa",                 unsplashQuery: "South+Tampa+Florida+neighborhood" },
  { slug: "apollo-beach",    wikiSearch: "Apollo_Beach,_Florida",       unsplashQuery: "Apollo+Beach+Florida+waterfront" },
  { slug: "ruskin",          wikiSearch: "Ruskin,_Florida",             unsplashQuery: "Ruskin+Florida+suburb" },
  { slug: "brandon",         wikiSearch: "Brandon,_Florida",            unsplashQuery: "Brandon+Florida+suburb" },
  { slug: "seffner",         wikiSearch: "Seffner,_Florida",            unsplashQuery: "Seffner+Florida+suburb" },
  { slug: "gibsonton",       wikiSearch: "Gibsonton,_Florida",          unsplashQuery: "Gibsonton+Florida+suburb" },
  { slug: "dover",           wikiSearch: "Dover,_Florida",              unsplashQuery: "Dover+Florida+suburb" },
  { slug: "temple-terrace",  wikiSearch: "Temple_Terrace,_Florida",     unsplashQuery: "Temple+Terrace+Florida+suburb" },
  { slug: "carrollwood",     wikiSearch: "Carrollwood,_Florida",        unsplashQuery: "Carrollwood+Florida+suburb" },
  { slug: "town-and-country",wikiSearch: "Town_%27N%27_Country,_Florida",unsplashQuery: "Town+and+Country+Tampa+Florida" },
  { slug: "bloomingdale",    wikiSearch: "Bloomingdale,_Hillsborough_County,_Florida", unsplashQuery: "Bloomingdale+Florida+suburb" },
  { slug: "clair-mel-city",  wikiSearch: "Clair-Mel_City,_Florida",     unsplashQuery: "Clair+Mel+City+Tampa+Florida" },
  { slug: "plant-city",      wikiSearch: "Plant_City,_Florida",         unsplashQuery: "Plant+City+Florida" },
];

const OUTPUT_BASE = path.join(process.cwd(), "public", "photos", "service_areas");
const MIN_WIDTH = 800;

function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const get = url.startsWith("https") ? https.get : http.get;
    get(url, { headers: { "User-Agent": "GinaBartelWebsite/1.0" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(downloadBuffer(res.headers.location));
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function tryWikipedia(wikiSearch: string): Promise<string | null> {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearch}`;
  try {
    const res = await fetch(apiUrl, { headers: { "User-Agent": "GinaBartelWebsite/1.0" } });
    if (!res.ok) return null;
    const data = await res.json() as { originalimage?: { source: string; width: number } };
    if (data.originalimage && data.originalimage.width >= MIN_WIDTH) {
      return data.originalimage.source;
    }
  } catch {
    // fall through
  }
  return null;
}

function unsplashUrl(query: string): string {
  return `https://source.unsplash.com/1600x900/?${query}`;
}

async function downloadArea(slug: string, wikiSearch: string, unsplashQuery: string) {
  const outDir = path.join(OUTPUT_BASE, slug);
  const outFile = path.join(outDir, "hero.webp");

  if (fs.existsSync(outFile)) {
    console.log(`  [skip] ${slug} — hero.webp already exists`);
    return;
  }

  console.log(`  [fetch] ${slug}`);

  let imageUrl = await tryWikipedia(wikiSearch);
  let source = "wikipedia";

  if (!imageUrl) {
    console.log(`    wikipedia: no suitable image — falling back to unsplash`);
    imageUrl = unsplashUrl(unsplashQuery);
    source = "unsplash";
  } else {
    console.log(`    wikipedia: found image`);
  }

  const buffer = await downloadBuffer(imageUrl);
  await sharp(buffer)
    .resize(1600, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 85 })
    .toFile(outFile);

  console.log(`    [done] ${slug} (${source}) → ${outFile}`);
}

async function main() {
  console.log("Downloading service area hero images...\n");
  for (const area of AREAS) {
    await downloadArea(area.slug, area.wikiSearch, area.unsplashQuery);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

**Step 2: Verify the script compiles**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
npx tsx --noEmit scripts/downloadServiceAreaPhotos.ts 2>&1 | head -5
```

Wait — `--noEmit` is a tsc flag, not tsx. To just type-check:
```bash
npx tsc --noEmit scripts/downloadServiceAreaPhotos.ts --esModuleInterop --moduleResolution bundler --target es2022
```

Expected: no errors.

**Step 3: Commit**

```bash
git add scripts/downloadServiceAreaPhotos.ts
git commit -m "feat: add service area hero image download script"
```

---

### Task 6: Run the download script

**Step 1: Run it**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
npx tsx scripts/downloadServiceAreaPhotos.ts
```

Expected output: 17 lines like `[done] tampa (wikipedia) → ...hero.webp` or `[done] gibsonton (unsplash) → ...hero.webp`.

**Step 2: Verify all 17 files exist**

```bash
find public/photos/service_areas -name "hero.webp" | sort
```

Expected: 17 paths listed.

**Step 3: Spot-check file sizes (should be > 50KB each)**

```bash
ls -lh public/photos/service_areas/*/hero.webp
```

Expected: all files > 50KB. If any are suspiciously small (< 5KB), the download may have failed silently — delete that file and re-run the script.

**Step 4: Commit**

```bash
git add public/photos/service_areas/
git commit -m "feat: add service area hero.webp images"
```

---

### Task 7: Write scripts/validateServiceAreaPhotos.ts

**Files:**
- Create: `scripts/validateServiceAreaPhotos.ts`

**Step 1: Create the validation script**

```ts
import fs from "fs";
import path from "path";
import { serviceAreas } from "../data/serviceAreas";

const BASE = path.join(process.cwd(), "public", "photos", "service_areas");

const missing: string[] = [];

for (const area of serviceAreas) {
  const heroPath = path.join(BASE, area.slug, "hero.webp");
  if (!fs.existsSync(heroPath)) {
    missing.push(`  - public/photos/service_areas/${area.slug}/hero.webp`);
  }
}

// Check for duplicate image paths
const imagePaths = serviceAreas.map((a) => a.image);
const duplicates = imagePaths.filter((p, i) => imagePaths.indexOf(p) !== i);
if (duplicates.length > 0) {
  console.error("Duplicate image paths detected:");
  duplicates.forEach((d) => console.error(`  - ${d}`));
  process.exit(1);
}

if (missing.length > 0) {
  console.error("Missing hero images:");
  missing.forEach((m) => console.error(m));
  console.error("\nRun: npx tsx scripts/downloadServiceAreaPhotos.ts");
  process.exit(1);
}

console.log(`All ${serviceAreas.length} service area hero images present.`);
```

**Step 2: Commit**

```bash
git add scripts/validateServiceAreaPhotos.ts
git commit -m "feat: add service area hero image validation script"
```

---

### Task 8: Wire validate:photos into package.json

**Files:**
- Modify: `package.json`

**Step 1: Add the scripts**

In `package.json`, update the `"scripts"` block to:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "update:summaries": "tsx scripts/updateNeighborhoodSummaries.ts",
  "validate:photos": "tsx scripts/validateServiceAreaPhotos.ts",
  "prebuild": "npm run validate:photos"
}
```

**Step 2: Commit**

```bash
git add package.json
git commit -m "feat: add validate:photos prebuild hook"
```

---

### Task 9: Run validate:photos and confirm

**Step 1: Run validation**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
npm run validate:photos
```

Expected: `All 17 service area hero images present.`

If any are missing: re-run `npx tsx scripts/downloadServiceAreaPhotos.ts` and retry.

---

### Task 10: Run npm run build and confirm clean

**Step 1: Build**

```bash
cd /Users/paulbartel/Desktop/LifeOps/FoxTrot/04_real_estate/ginabartelwebsite
npm run build
```

Expected:
- `All 17 service area hero images present.` (from prebuild)
- Next.js build completes with no errors
- All 17 service area static pages are generated

If build fails with a TypeScript error: read the error, fix the offending file, and re-run.

**Step 2: Commit final state if any fixes were made**

```bash
git add -A
git commit -m "fix: resolve build issues after hero image integration"
```

---

## Summary

| Task | What |
|------|------|
| 1 | Fix slug `clara-mel-city` → `clair-mel-city` |
| 2 | Update all 17 image paths to new webp structure |
| 3 | Create 17 directories in `public/photos/service_areas/` |
| 4 | Install `sharp` |
| 5 | Write download script (Wikipedia + Unsplash fallback) |
| 6 | Run download script — populate all 17 `hero.webp` files |
| 7 | Write validation script |
| 8 | Wire `validate:photos` + `prebuild` into `package.json` |
| 9 | Run validation — confirm all 17 images present |
| 10 | Run `npm run build` — confirm clean build |
