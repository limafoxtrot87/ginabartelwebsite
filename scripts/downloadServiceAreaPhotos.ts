import sharp from "sharp";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const AREAS: { slug: string; wikiSearch: string; unsplashQuery: string }[] = [
  { slug: "tampa",            wikiSearch: "Tampa,_Florida",                              unsplashQuery: "Tampa+Florida+city" },
  { slug: "fish-hawk",        wikiSearch: "Fishhawk_Ranch,_Florida",                     unsplashQuery: "Fishhawk Ranch Lithia Florida neighborhood" },
  { slug: "lithia",           wikiSearch: "Lithia,_Florida",                             unsplashQuery: "Lithia+Florida+suburb" },
  { slug: "riverview",        wikiSearch: "Riverview,_Florida",                          unsplashQuery: "Riverview+Florida+suburb" },
  { slug: "south-tampa",      wikiSearch: "South_Tampa",                                 unsplashQuery: "South+Tampa+Florida+neighborhood" },
  { slug: "apollo-beach",     wikiSearch: "Apollo_Beach,_Florida",                       unsplashQuery: "Apollo+Beach+Florida+waterfront" },
  { slug: "ruskin",           wikiSearch: "Ruskin,_Florida",                             unsplashQuery: "Ruskin+Florida+suburb" },
  { slug: "brandon",          wikiSearch: "Brandon,_Florida",                            unsplashQuery: "Brandon+Florida+suburb" },
  { slug: "seffner",          wikiSearch: "Seffner,_Florida",                            unsplashQuery: "Seffner+Florida+suburb" },
  { slug: "gibsonton",        wikiSearch: "Gibsonton,_Florida",                          unsplashQuery: "Gibsonton+Florida+suburb" },
  { slug: "dover",            wikiSearch: "Dover,_Florida",                              unsplashQuery: "Dover+Florida+suburb" },
  { slug: "temple-terrace",   wikiSearch: "Temple_Terrace,_Florida",                     unsplashQuery: "Temple+Terrace+Florida+suburb" },
  { slug: "carrollwood",      wikiSearch: "Carrollwood,_Florida",                        unsplashQuery: "Carrollwood Village Tampa Florida suburb" },
  { slug: "town-and-country", wikiSearch: "Town_%27N%27_Country,_Florida",               unsplashQuery: "Town+and+Country+Tampa+Florida" },
  { slug: "bloomingdale",     wikiSearch: "Bloomingdale,_Hillsborough_County,_Florida",  unsplashQuery: "Bloomingdale+Florida+suburb" },
  { slug: "clair-mel-city",   wikiSearch: "Clair-Mel_City,_Florida",                     unsplashQuery: "Clair+Mel+City+Tampa+Florida" },
  { slug: "plant-city",       wikiSearch: "Plant_City,_Florida",                         unsplashQuery: "Plant+City+Florida" },
];

const OUTPUT_BASE = path.join(process.cwd(), "public", "photos", "service_areas");
const MIN_WIDTH = 700;

function downloadBuffer(url: string, redirectCount = 0): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error(`Too many redirects for ${url}`));
      return;
    }
    const get = url.startsWith("https") ? https.get : http.get;
    get(url, { headers: { "User-Agent": "GinaBartelWebsite/1.0 (contact@ginabartel.com)" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(downloadBuffer(res.headers.location, redirectCount + 1));
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
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "GinaBartelWebsite/1.0 (contact@ginabartel.com)" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      originalimage?: { source: string; width: number };
    };
    if (data.originalimage && data.originalimage.width >= MIN_WIDTH) {
      return data.originalimage.source;
    }
  } catch {
    // fall through to unsplash
  }
  return null;
}

async function tryWikimediaCommons(query: string): Promise<string | null> {
  // Search Wikimedia Commons for an image matching the query
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5&origin=*`;
  try {
    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": "GinaBartelWebsite/1.0 (contact@ginabartel.com)" },
    });
    if (!searchRes.ok) return null;
    const searchData = (await searchRes.json()) as {
      query?: { search?: { title: string }[] };
    };
    const results = searchData.query?.search ?? [];
    for (const result of results) {
      const title = result.title; // e.g. "File:Apollo Beach Florida.jpg"
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size&iiurlwidth=1600&format=json&origin=*`;
      const infoRes = await fetch(infoUrl, {
        headers: { "User-Agent": "GinaBartelWebsite/1.0 (contact@ginabartel.com)" },
      });
      if (!infoRes.ok) continue;
      const infoData = (await infoRes.json()) as {
        query?: { pages?: Record<string, { imageinfo?: { thumburl?: string; width?: number }[] }> };
      };
      const pages = infoData.query?.pages ?? {};
      for (const page of Object.values(pages)) {
        const info = page.imageinfo?.[0];
        if (info?.thumburl && (info.width ?? 0) >= MIN_WIDTH) {
          return info.thumburl;
        }
      }
    }
  } catch {
    // fall through
  }
  return null;
}

async function downloadArea(slug: string, wikiSearch: string, unsplashQuery: string) {
  const outDir = path.join(OUTPUT_BASE, slug);
  const outFile = path.join(outDir, "hero.webp");

  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 5000) {
    console.log(`  [skip] ${slug} — hero.webp already exists`);
    return;
  }

  console.log(`  [fetch] ${slug}`);

  let imageUrl = await tryWikipedia(wikiSearch);
  let source = "wikipedia";

  if (!imageUrl) {
    console.log(`    wikipedia: no suitable image — trying Wikimedia Commons`);
    imageUrl = await tryWikimediaCommons(unsplashQuery.replace(/\+/g, " "));
    source = "wikimedia-commons";
  }

  if (!imageUrl) {
    console.log(`    wikimedia commons: no result — skipping ${slug} (add hero.webp manually)`);
    return;
  }

  console.log(`    ${source}: found image`);

  const buffer = await downloadBuffer(imageUrl);
  await sharp(buffer)
    .resize(1600, 900, { fit: "cover", position: "centre" })
    .webp({ quality: 85 })
    .toFile(outFile);

  const stats = fs.statSync(outFile);
  console.log(`    [done] ${slug} (${source}) — ${Math.round(stats.size / 1024)}KB`);
}

async function main() {
  console.log("Downloading service area hero images...\n");
  for (const area of AREAS) {
    await downloadArea(area.slug, area.wikiSearch, area.unsplashQuery);
  }
  console.log("\nDone. Run: npm run validate:photos");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
