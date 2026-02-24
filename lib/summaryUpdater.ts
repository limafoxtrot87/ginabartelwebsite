import { promises as fs } from "fs";
import path from "path";
import { neighborhoods } from "@/data/neighborhoods";

type SummaryPayload = {
  generatedAt: string;
  provider: string;
  summaries: Record<string, string>;
};

const summaryPath = path.join(process.cwd(), "data", "neighborhoodSummaries.json");
const BIWEEKLY_DAYS = 14;

const promptFor = (name: string) =>
  `Provide a professional real estate lifestyle and market overview for ${name}, FL. Include:\n- Lifestyle vibe\n- Schools & family friendliness\n- Amenities & commute\n- Housing market trends (general, not real-time stats)\nKeep tone professional and client-friendly.`;

async function fetchAnthropicSummary(apiKey: string, neighborhoodName: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 320,
      system:
        "You are a Florida real estate market assistant. Write concise client-facing summaries that avoid hard real-time stats.",
      messages: [{ role: "user", content: promptFor(neighborhoodName) }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  return (
    json.content?.find((item) => item.type === "text")?.text?.trim() ||
    `Summary unavailable for ${neighborhoodName}.`
  );
}

function fallbackSummary(neighborhoodName: string): string {
  return `${neighborhoodName} offers a strong blend of neighborhood convenience, lifestyle amenities, and long-term homeowner appeal. Buyers typically value well-maintained properties, efficient access to schools and shopping, and stable community demand.`;
}

function daysBetween(fromDate: string, toDate: Date): number {
  const from = new Date(`${fromDate}T00:00:00Z`);
  if (Number.isNaN(from.getTime())) {
    return BIWEEKLY_DAYS + 1;
  }
  const diff = toDate.getTime() - from.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

async function readCurrentSummaryPayload(): Promise<SummaryPayload | null> {
  try {
    const raw = await fs.readFile(summaryPath, "utf8");
    return JSON.parse(raw) as SummaryPayload;
  } catch {
    return null;
  }
}

export async function getNeighborhoodSummaryStatus() {
  const now = new Date();
  const current = await readCurrentSummaryPayload();
  const lastGeneratedAt = current?.generatedAt ?? null;
  const ageDays = lastGeneratedAt ? daysBetween(lastGeneratedAt, now) : null;
  const due = ageDays === null ? true : ageDays >= BIWEEKLY_DAYS;
  const nextDueDate =
    lastGeneratedAt && ageDays !== null
      ? new Date(new Date(`${lastGeneratedAt}T00:00:00Z`).getTime() + BIWEEKLY_DAYS * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      : now.toISOString().slice(0, 10);

  return {
    due,
    ageDays,
    lastGeneratedAt,
    nextDueDate,
    cadenceDays: BIWEEKLY_DAYS
  };
}

export async function updateNeighborhoodSummaries(options?: { force?: boolean }): Promise<SummaryPayload> {
  const status = await getNeighborhoodSummaryStatus();
  const current = await readCurrentSummaryPayload();

  if (!options?.force && !status.due && current) {
    return current;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const summaries: Record<string, string> = {};

  for (const neighborhood of neighborhoods) {
    try {
      summaries[neighborhood.slug] = apiKey
        ? await fetchAnthropicSummary(apiKey, neighborhood.name)
        : fallbackSummary(neighborhood.name);
    } catch {
      summaries[neighborhood.slug] = fallbackSummary(neighborhood.name);
    }
  }

  const payload: SummaryPayload = {
    generatedAt: new Date().toISOString().slice(0, 10),
    provider: apiKey ? "anthropic-with-fallback" : "static-fallback",
    summaries
  };

  await fs.writeFile(summaryPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}
