import { NextResponse } from "next/server";
import { getNeighborhoodSummaryStatus, updateNeighborhoodSummaries } from "@/lib/summaryUpdater";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";
    const before = await getNeighborhoodSummaryStatus();
    const payload = await updateNeighborhoodSummaries({ force });
    const after = await getNeighborhoodSummaryStatus();

    return NextResponse.json({
      ok: true,
      forced: force,
      statusBefore: before,
      statusAfter: after,
      payload
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const status = await getNeighborhoodSummaryStatus();
  return NextResponse.json({
    ok: true,
    cadence: "bi-weekly",
    status,
    message: "Use POST to refresh cached neighborhood summaries. Add ?force=true to bypass cadence."
  });
}
