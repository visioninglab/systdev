import { NextResponse } from "next/server";
import { completeJSON, LLMError } from "@/lib/anthropic";
import { GENERATE_ACTIONS_SYSTEM } from "@/lib/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await completeJSON<{ actions: unknown[] }>({
      system: GENERATE_ACTIONS_SYSTEM,
      user: JSON.stringify(body, null, 2),
      maxTokens: 2048,
    });
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const status = e instanceof LLMError ? 502 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
