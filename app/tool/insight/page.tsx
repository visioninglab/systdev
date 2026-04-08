"use client";

import { useState } from "react";
import { useSession } from "@/lib/session";
import { Insight, InsightKind, newId } from "@/lib/schema";
import StepNav from "@/components/StepNav";

const KIND_META: Record<InsightKind, { label: string; icon: string; cls: string }> = {
  recurring: { label: "Recurring issue", icon: "↻", cls: "border-accent/30 bg-accent/5 text-accent" },
  assumption: { label: "Hidden assumption", icon: "?", cls: "border-ink/20 bg-ink/5 text-ink/70" },
  risk: { label: "Emerging risk", icon: "!", cls: "border-warn/30 bg-warn/5 text-warn" },
};

export default function InsightPage() {
  const { session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: session.points,
          options: session.options,
          criteria: session.criteria,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Request failed");
      const { insights } = (await res.json()) as { insights: Insight[] };
      update({ insights: insights.map((i) => ({ ...i, id: newId("in") })) });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function updateInsight(i: Insight) {
    update({ insights: session.insights.map((x) => (x.id === i.id ? i : x)) });
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 3</p>
        <h1 className="font-serif text-3xl">Insight</h1>
        <p className="mt-2 text-ink/70">
          Surface system-level patterns: recurring issues, hidden assumptions, and
          emerging risks across your structured model.
        </p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={generate} disabled={loading || session.points.length === 0} className="btn-primary">
          {loading ? "Analysing…" : session.insights.length ? "Regenerate" : "Generate insights"}
        </button>
        <button
          onClick={() =>
            update({
              insights: [
                ...session.insights,
                { id: newId("in"), kind: "recurring", statement: "", relatedPointIds: [] },
              ],
            })
          }
          className="btn"
        >
          + Add insight
        </button>
        {error && <span className="text-sm text-warn">{error}</span>}
      </div>

      <div className="space-y-3">
        {session.insights.map((i) => {
          const meta = KIND_META[i.kind];
          return (
            <div key={i.id} className={`card border-l-4 ${meta.cls}`}>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
              </div>
              <textarea
                className="textarea text-sm"
                rows={2}
                value={i.statement}
                onChange={(e) => updateInsight({ ...i, statement: e.target.value })}
              />
              {i.relatedPointIds.length > 0 && (
                <div className="mt-2 text-xs text-ink/50">
                  Related to {i.relatedPointIds.length} point(s)
                </div>
              )}
            </div>
          );
        })}
      </div>

      <StepNav
        prev={{ href: "/tool/structure", label: "Back to Structure" }}
        next={{ href: "/tool/action" }}
        nextLabel="Continue to Action"
        nextDisabled={session.insights.length === 0}
      />
    </div>
  );
}
