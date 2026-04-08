import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;
export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export const client = apiKey ? new Anthropic({ apiKey }) : null;

export class LLMError extends Error {}

/**
 * Run a Claude completion that must return a single JSON object.
 * The system prompt should describe the schema; the user prompt provides the data.
 */
export async function completeJSON<T>(args: {
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<T> {
  if (!client) {
    throw new LLMError(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local to enable AI generation."
    );
  }

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: args.maxTokens ?? 2048,
    system:
      args.system +
      "\n\nRespond with ONLY a single valid JSON object. No prose, no markdown fences.",
    messages: [{ role: "user", content: args.user }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  // Strip accidental code fences
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch (e) {
    throw new LLMError(`Model did not return valid JSON. Raw: ${cleaned.slice(0, 400)}`);
  }
}
