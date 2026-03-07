import fs from "fs";
import path from "path";
import { serviceAreas } from "../data/serviceAreas";

const BASE = path.join(process.cwd(), "public", "photos", "service_areas");

// Check for duplicate image paths
const imagePaths = serviceAreas.map((a) => a.image);
const duplicates = imagePaths.filter((p, i) => imagePaths.indexOf(p) !== i);
if (duplicates.length > 0) {
  console.error("ERROR: Duplicate service area image paths detected:");
  duplicates.forEach((d) => console.error(`  - ${d}`));
  process.exit(1);
}

// Check all hero.webp files exist
const missing: string[] = [];
for (const area of serviceAreas) {
  const heroPath = path.join(BASE, area.slug, "hero.webp");
  if (!fs.existsSync(heroPath)) {
    missing.push(`  - public/photos/service_areas/${area.slug}/hero.webp`);
  }
}

if (missing.length > 0) {
  console.error(`ERROR: Missing hero images (${missing.length}/${serviceAreas.length}):`);
  missing.forEach((m) => console.error(m));
  console.error("\nTo download missing images, run:");
  console.error("  npx tsx scripts/downloadServiceAreaPhotos.ts");
  process.exit(1);
}

console.log(`All ${serviceAreas.length} service area hero images present.`);
