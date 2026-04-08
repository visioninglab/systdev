"use client";

import { useEffect, useState } from "react";
import { getGeminiKey, setGeminiKey } from "@/lib/llm-client";

export default function SettingsDrawer() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      setKey(getGeminiKey() || "");
      setSaved(false);
    }
  }, [open]);

  function save() {
    setGeminiKey(key.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function clear() {
    setGeminiKey("");
    setKey("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-xs text-ink/60 hover:text-ink">
        Settings
      </button>
      {open && (
        <div
          className="no-print fixed inset-0 z-50 flex items-start justify-end bg-ink/30"
          onClick={() => setOpen(false)}
        >
          <aside
            className="h-full w-full max-w-md overflow-y-auto bg-paper p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Settings</h2>
              <button onClick={() => setOpen(false)} className="text-ink/50 hover:text-ink">
                ✕
              </button>
            </div>

            <section className="space-y-3">
              <h3 className="font-serif text-lg">AI provider</h3>
              <p className="text-sm text-ink/70">
                This deployment doesn&apos;t ship a server-side AI key. To run the four
                &ldquo;Generate&rdquo; steps on your own input, paste a Google Gemini API key below. It is
                stored only in your browser&apos;s localStorage and sent directly to Google.
              </p>
              <p className="text-xs text-ink/50">
                Get a free key at{" "}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline"
                >
                  aistudio.google.com/apikey
                </a>
                . Gemini has a generous free tier.
              </p>

              <label className="label" htmlFor="gemini-key">
                Gemini API key
              </label>
              <input
                id="gemini-key"
                type="password"
                className="input"
                placeholder="AIza…"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                autoComplete="off"
              />
              <div className="flex items-center gap-2">
                <button onClick={save} className="btn-primary" disabled={!key.trim()}>
                  Save
                </button>
                <button onClick={clear} className="btn">
                  Clear
                </button>
                {saved && <span className="text-xs text-accent">Saved.</span>}
              </div>
            </section>

            <section className="mt-8 space-y-2">
              <h3 className="font-serif text-lg">Alternative: load a sample</h3>
              <p className="text-sm text-ink/70">
                Don&apos;t want to use a key? Start from a worked example on the landing page —
                you can edit every field and walk through the framework end-to-end without
                any AI calls.
              </p>
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
