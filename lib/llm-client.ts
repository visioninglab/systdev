"use client";

import {
  EXTRACT_POINTS_SYSTEM,
  GENERATE_STRUCTURE_SYSTEM,
  GENERATE_INSIGHTS_SYSTEM,
  GENERATE_ACTIONS_SYSTEM,
} from "./prompts";

const GEMINI_KEY_STORAGE = "systdev:gemini-key:v1";
const GEMINI_MODEL = "gemini-2.5-flash";

export function getGeminiKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(GEMINI_KEY_STORAGE);
}

export function setGeminiKey(key: string) {
  if (typeof window === "undefined") return;
  if (key) localStorage.setItem(GEMINI_KEY_STORAGE, key);
  else localStorage.removeItem(GEMINI_KEY_STORAGE);
}

const isStaticBuild = process.env.NEXT_PUBLIC_STATIC === "1";

export class LLMUnavailableError extends Error {
  constructor() {
    super(
      "AI is not configured. Add a Google Gemini key in Settings, or load a sample to explore the framework."
    );
  }
}

async function callGemini<T>(system: string, user: string): Promise<T> {
  const key = getGeminiKey();
  if (!key) throw new LLMUnavailableError();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`;
  const body = {
    systemInstruction: {
      parts: [
        {
          text:
            system +
            "\n\nRespond with ONLY a single valid JSON object. No prose, no markdown fences.",
        },
      ],
    },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 2048,
      temperature: 0.4,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no content");

  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`Gemini did not return valid JSON. Raw: ${cleaned.slice(0, 300)}`);
  }
}

async function callServer<T>(endpoint: string, payload: unknown): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

/**
 * Routing rule:
 * - If a Gemini BYOK key is set, prefer it (works on any deployment).
 * - Else if not a static build, call the server-side Claude endpoint.
 * - Else throw LLMUnavailableError so the UI can prompt the user.
 */
async function route<T>(
  endpoint: string,
  payload: unknown,
  system: string,
  user: string
): Promise<T> {
  if (getGeminiKey()) return callGemini<T>(system, user);
  if (!isStaticBuild) return callServer<T>(endpoint, payload);
  throw new LLMUnavailableError();
}

// --- Public helpers, one per step ---

export function extractPoints(input: string) {
  return route<{ points: any[] }>(
    "/api/extract-points",
    { input },
    EXTRACT_POINTS_SYSTEM,
    input
  );
}

export function generateStructure(payload: { points: unknown[] }) {
  return route<{ options: any[]; criteria: any[] }>(
    "/api/generate-structure",
    payload,
    GENERATE_STRUCTURE_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}

export function generateInsights(payload: {
  points: unknown[];
  options: unknown[];
  criteria: unknown[];
}) {
  return route<{ insights: any[] }>(
    "/api/generate-insights",
    payload,
    GENERATE_INSIGHTS_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}

export function generateActions(payload: {
  insights: unknown[];
  options: unknown[];
  points: unknown[];
}) {
  return route<{ actions: any[] }>(
    "/api/generate-actions",
    payload,
    GENERATE_ACTIONS_SYSTEM,
    JSON.stringify(payload, null, 2)
  );
}
