import { NextResponse } from "next/server";
import { completeJSON, LLMError } from "@/lib/anthropic";
import { GENERATE_STRUCTURE_SYSTEM } from "@/lib/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { points } = (await req.json()) as { points: unknown[] };
    if (!Array.isArray(points) || points.length === 0) {
      return NextResponse.json({ error: "Points are required" }, { status: 400 });
    }
    const data = await completeJSON<{ options: unknown[]; criteria: unknown[] }>({
      system: GENERATE_STRUCTURE_SYSTEM,
      user: JSON.stringify({ points }, null, 2),
      maxTokens: 2048,
    });
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const status = e instanceof LLMError ? 502 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
