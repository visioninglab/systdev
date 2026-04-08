"use client";

import { useSession } from "@/lib/session";
import { exportSessionToJSON, exportSessionToPDF } from "@/lib/pdf";
import StepNav from "@/components/StepNav";

export default function ExportPage() {
  const { session, reset } = useSession();

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Final</p>
        <h1 className="font-serif text-3xl">Export</h1>
        <p className="mt-2 text-ink/70">
          Download your structured workbook, or print this page as a summary.
        </p>
      </header>

      <div className="no-print mb-8 flex flex-wrap items-center gap-3">
        <button onClick={() => exportSessionToPDF(session)} className="btn-primary">
          Download PDF
        </button>
        <button onClick={() => exportSessionToJSON(session)} className="btn">
          Download JSON
        </button>
        <button onClick={() => window.print()} className="btn">
          Print
        </button>
        <button
          onClick={() => {
            if (confirm("Start a new session? Current data will be cleared.")) reset();
          }}
          className="btn"
        >
          New session
        </button>
      </div>

      <article className="space-y-10">
        <section>
          <h2 className="mb-3 font-serif text-2xl">1. Define — Points</h2>
          <ul className="space-y-2">
            {session.points.map((p) => (
              <li key={p.id} className="border-l-2 border-line pl-3 text-sm">
                <span className="text-xs font-semibold uppercase text-ink/50">{p.type}</span>
                <p>{p.statement}</p>
                {p.implications && <p className="text-xs text-ink/60">↳ {p.implications}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl">2. Structure</h2>
          <h3 className="mb-2 text-sm font-semibold uppercase text-ink/50">Options</h3>
          <ul className="mb-4 space-y-2">
            {session.options.map((o) => (
              <li key={o.id} className="border-l-2 border-line pl-3 text-sm">
                <p className="font-medium">{o.title}</p>
                <p className="text-xs text-ink/70">{o.description}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 text-sm font-semibold uppercase text-ink/50">Criteria</h3>
          <ul className="space-y-1 text-sm">
            {session.criteria.map((c) => (
              <li key={c.id}>
                • <span className="font-medium">{c.label}</span>
                {c.description && <span className="text-ink/60"> — {c.description}</span>}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl">3. Insight</h2>
          <ul className="space-y-2">
            {session.insights.map((i) => (
              <li key={i.id} className="border-l-2 border-line pl-3 text-sm">
                <span className="text-xs font-semibold uppercase text-ink/50">{i.kind}</span>
                <p>{i.statement}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl">4. Action</h2>
          {(["immediate", "short-term", "strategic"] as const).map((h) => {
            const items = session.actions.filter((a) => a.horizon === h);
            if (items.length === 0) return null;
            return (
              <div key={h} className="mb-4">
                <h3 className="mb-2 text-sm font-semibold uppercase text-ink/50">{h}</h3>
                <ul className="space-y-1 text-sm">
                  {items.map((a) => (
                    <li key={a.id}>
                      • {a.description}
                      {a.rationale && (
                        <span className="block pl-3 text-xs text-ink/60">↳ {a.rationale}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </article>

      <StepNav prev={{ href: "/tool/action", label: "Back to Action" }} />
    </div>
  );
}
