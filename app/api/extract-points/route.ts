import { NextResponse } from "next/server";
import { completeJSON, LLMError } from "@/lib/anthropic";
import { EXTRACT_POINTS_SYSTEM } from "@/lib/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { input } = (await req.json()) as { input?: string };
    if (!input || !input.trim()) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }
    const data = await completeJSON<{ points: unknown[] }>({
      system: EXTRACT_POINTS_SYSTEM,
      user: input,
      maxTokens: 2048,
    });
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const status = e instanceof LLMError ? 502 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
