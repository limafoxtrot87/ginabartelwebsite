# Gina Bartel Real Estate Website

Premium Next.js website for Gina Bartel (Florida Executive Realty), focused on Tampa Bay luxury presentation, sold-home proof, and neighborhood intelligence.

## Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Leaflet + React Leaflet
- Local JSON/TS data
- API route for AI summary caching

## Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Folder Structure
- `app/` routes and API endpoints
- `components/` reusable UI modules
- `data/` local content and cached summaries
- `lib/` AI updater utilities
- `public/assets/agent` Gina headshots
- `public/assets/sold-homes` sold property images
- `styles/` third-party style imports
- `scripts/` manual maintenance scripts

## Asset Handling
Existing source images are copied from:
- `photos/gina/*` -> `public/assets/agent/`
- `photos/homes/exterior/*` -> `public/assets/sold-homes/`

To add or replace photos:
1. Drop headshots into `public/assets/agent`.
2. Drop sold-home images into `public/assets/sold-homes`.
3. Update entries in `data/soldHomes.ts` (address, city, optional price/beds/baths, description, image path).

## Social Links
Edit placeholders in `data/socialLinks.ts`:
- Instagram
- Facebook
- LinkedIn
- Zillow (optional)

## Neighborhood AI Summaries (Bi-Weekly Cache)
Cached summaries are stored in `data/neighborhoodSummaries.json` and rendered on the Neighborhoods page.

### Anthropic Setup
Create `.env.local`:
```bash
ANTHROPIC_API_KEY=your_key_here
```
If missing, the app automatically uses professional static fallback summaries.

### Manual Refresh
```bash
npm run update:summaries
```
Or call API route:
```bash
curl -X POST http://localhost:3000/api/update-neighborhood-summaries
```

### Bi-Weekly Scheduling
Run every 14 days with your scheduler (cron, CI, or deployment scheduler), executing:
```bash
npm run update:summaries
```

## SEO
- Metadata configured in `app/layout.tsx`
- `RealEstateAgent` schema markup included in layout
- Optimized image usage via `next/image`
