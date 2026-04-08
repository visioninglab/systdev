"use client";

import { useState } from "react";
import { useSession } from "@/lib/session";
import { Action, ActionHorizon, newId } from "@/lib/schema";
import StepNav from "@/components/StepNav";

const HORIZONS: { key: ActionHorizon; label: string; sub: string }[] = [
  { key: "immediate", label: "Immediate", sub: "Days" },
  { key: "short-term", label: "Short-term", sub: "Weeks to months" },
  { key: "strategic", label: "Strategic", sub: "Longer horizon" },
];

export default function ActionPage() {
  const { session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          insights: session.insights,
          options: session.options,
          points: session.points,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Request failed");
      const { actions } = (await res.json()) as { actions: Action[] };
      update({ actions: actions.map((a) => ({ ...a, id: newId("ac") })) });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function updateAction(a: Action) {
    update({ actions: session.actions.map((x) => (x.id === a.id ? a : x)) });
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 4</p>
        <h1 className="font-serif text-3xl">Action</h1>
        <p className="mt-2 text-ink/70">
          Translate insight into a concrete plan across three horizons.
        </p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={generate} disabled={loading || session.insights.length === 0} className="btn-primary">
          {loading ? "Generating…" : session.actions.length ? "Regenerate" : "Generate actions"}
        </button>
        {(["immediate", "short-term", "strategic"] as const).map((h) => (
          <button
            key={h}
            onClick={() =>
              update({
                actions: [
                  ...session.actions,
                  { id: newId("ac"), horizon: h, description: "", rationale: "", linkedInsightIds: [] },
                ],
              })
            }
            className="btn text-xs"
          >
            + {h}
          </button>
        ))}
        {error && <span className="text-sm text-warn">{error}</span>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {HORIZONS.map((h) => {
          const items = session.actions.filter((a) => a.horizon === h.key);
          return (
            <section key={h.key}>
              <header className="mb-2">
                <h2 className="font-serif text-lg">{h.label}</h2>
                <p className="text-xs text-ink/50">{h.sub}</p>
              </header>
              <div className="space-y-3">
                {items.map((a) => (
                  <div key={a.id} className="card space-y-2">
                    <textarea
                      className="textarea text-sm"
                      rows={2}
                      value={a.description}
                      onChange={(e) => updateAction({ ...a, description: e.target.value })}
                    />
                    <textarea
                      className="textarea text-xs"
                      rows={2}
                      placeholder="Rationale"
                      value={a.rationale}
                      onChange={(e) => updateAction({ ...a, rationale: e.target.value })}
                    />
                  </div>
                ))}
                {items.length === 0 && <p className="text-xs italic text-ink/40">No actions yet.</p>}
              </div>
            </section>
          );
        })}
      </div>

      <StepNav
        prev={{ href: "/tool/insight", label: "Back to Insight" }}
        next={{ href: "/tool/export" }}
        nextLabel="Export & Share"
        nextDisabled={session.actions.length === 0}
      />
    </div>
  );
}
