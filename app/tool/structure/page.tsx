"use client";

import { useState } from "react";
import { useSession } from "@/lib/session";
import { Option, Criterion, newId } from "@/lib/schema";
import StepNav from "@/components/StepNav";

export default function StructurePage() {
  const { session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: session.points }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Request failed");
      const { options, criteria } = (await res.json()) as {
        options: Option[];
        criteria: Criterion[];
      };
      update({
        options: options.map((o) => ({ ...o, id: newId("op") })),
        criteria: criteria.map((c) => ({ ...c, id: newId("cr") })),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 2</p>
        <h1 className="font-serif text-3xl">Structure</h1>
        <p className="mt-2 text-ink/70">
          Generate candidate options and criteria from your points. Edit anything that
          doesn&apos;t fit — you stay in control.
        </p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={generate} disabled={loading || session.points.length === 0} className="btn-primary">
          {loading ? "Generating…" : session.options.length ? "Regenerate" : "Generate options & criteria"}
        </button>
        {error && <span className="text-sm text-warn">{error}</span>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section>
          <h2 className="mb-3 font-serif text-lg">Points</h2>
          <ul className="space-y-2">
            {session.points.map((p) => (
              <li key={p.id} className="card text-xs">
                <div className="mb-1 text-[10px] uppercase tracking-wider text-ink/50">{p.type}</div>
                {p.statement}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg">Options</h2>
            <button
              className="btn text-xs"
              onClick={() =>
                update({
                  options: [
                    ...session.options,
                    { id: newId("op"), title: "", description: "", supportingPointIds: [], conflictingPointIds: [] },
                  ],
                })
              }
            >
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {session.options.map((o) => (
              <div key={o.id} className="card space-y-2">
                <input
                  className="input text-sm font-medium"
                  value={o.title}
                  placeholder="Option title"
                  onChange={(e) =>
                    update({
                      options: session.options.map((x) =>
                        x.id === o.id ? { ...x, title: e.target.value } : x
                      ),
                    })
                  }
                />
                <textarea
                  className="textarea text-xs"
                  rows={3}
                  value={o.description}
                  placeholder="Description"
                  onChange={(e) =>
                    update({
                      options: session.options.map((x) =>
                        x.id === o.id ? { ...x, description: e.target.value } : x
                      ),
                    })
                  }
                />
                <button
                  className="text-xs text-ink/40 hover:text-warn"
                  onClick={() => update({ options: session.options.filter((x) => x.id !== o.id) })}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg">Criteria</h2>
            <button
              className="btn text-xs"
              onClick={() =>
                update({
                  criteria: [
                    ...session.criteria,
                    { id: newId("cr"), label: "", description: "" },
                  ],
                })
              }
            >
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {session.criteria.map((c) => (
              <div key={c.id} className="card space-y-2">
                <input
                  className="input text-sm font-medium"
                  value={c.label}
                  placeholder="Criterion label"
                  onChange={(e) =>
                    update({
                      criteria: session.criteria.map((x) =>
                        x.id === c.id ? { ...x, label: e.target.value } : x
                      ),
                    })
                  }
                />
                <textarea
                  className="textarea text-xs"
                  rows={2}
                  value={c.description}
                  placeholder="Description"
                  onChange={(e) =>
                    update({
                      criteria: session.criteria.map((x) =>
                        x.id === c.id ? { ...x, description: e.target.value } : x
                      ),
                    })
                  }
                />
                <button
                  className="text-xs text-ink/40 hover:text-warn"
                  onClick={() => update({ criteria: session.criteria.filter((x) => x.id !== c.id) })}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <StepNav
        prev={{ href: "/tool/define", label: "Back to Define" }}
        next={{ href: "/tool/insight" }}
        nextLabel="Continue to Insight"
        nextDisabled={session.options.length === 0}
      />
    </div>
  );
}
