import { updateNeighborhoodSummaries } from "../lib/summaryUpdater";

async function run() {
  const payload = await updateNeighborhoodSummaries();
  console.log(`Updated neighborhood summaries on ${payload.generatedAt} via ${payload.provider}`);
}

run().catch((error) => {
  console.error("Failed to update neighborhood summaries", error);
  process.exit(1);
});
