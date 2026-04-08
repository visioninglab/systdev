"use client";

import { useState } from "react";
import { useSession } from "@/lib/session";
import { Point, newId } from "@/lib/schema";
import PointCard from "@/components/PointCard";
import StepNav from "@/components/StepNav";

export default function DefinePage() {
  const { session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function extract() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/extract-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: session.input }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Request failed");
      const { points } = (await res.json()) as { points: Point[] };
      update({ points: points.map((p) => ({ ...p, id: newId("pt") })) });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function updatePoint(p: Point) {
    update({ points: session.points.map((x) => (x.id === p.id ? p : x)) });
  }

  function deletePoint(id: string) {
    update({ points: session.points.filter((x) => x.id !== id) });
  }

  function addBlank() {
    update({
      points: [
        ...session.points,
        {
          id: newId("pt"),
          statement: "",
          type: "claim",
          themes: [],
          implications: "",
        },
      ],
    });
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Step 1</p>
        <h1 className="font-serif text-3xl">Define</h1>
        <p className="mt-2 text-ink/70">
          Paste in a problem description, transcript, notes, or any source material. The
          tool will extract structured points you can edit.
        </p>
      </header>

      <section className="card mb-6">
        <label className="label" htmlFor="input">
          Your input
        </label>
        <textarea
          id="input"
          className="textarea"
          rows={8}
          placeholder="What is the situation? What are the key concerns? Who is involved?"
          value={session.input}
          onChange={(e) => update({ input: e.target.value })}
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={extract}
            disabled={loading || !session.input.trim()}
            className="btn-primary"
          >
            {loading ? "Extracting…" : "Extract points"}
          </button>
          {error && <span className="text-sm text-warn">{error}</span>}
        </div>
      </section>

      {session.points.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-xl">Points ({session.points.length})</h2>
            <button onClick={addBlank} className="btn">
              + Add point
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {session.points.map((p) => (
              <PointCard
                key={p.id}
                point={p}
                onChange={updatePoint}
                onDelete={() => deletePoint(p.id)}
              />
            ))}
          </div>
        </section>
      )}

      <StepNav
        next={{ href: "/tool/structure" }}
        nextLabel="Continue to Structure"
        nextDisabled={session.points.length === 0}
      />
    </div>
  );
}
