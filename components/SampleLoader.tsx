"use client";

import { useRouter } from "next/navigation";
import { SAMPLES } from "@/lib/samples";

const STORAGE_KEY = "systdev:session:v1";

export default function SampleLoader() {
  const router = useRouter();

  function load(id: string) {
    const sample = SAMPLES.find((s) => s.meta.id === id);
    if (!sample) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...sample.session, updatedAt: new Date().toISOString() })
      );
    } catch {}
    router.push("/tool/define");
  }

  return (
    <div className="mt-10 w-full">
      <h2 className="mb-3 font-serif text-xl">Or start from a worked sample</h2>
      <p className="mb-4 text-sm text-ink/60">
        Each sample loads a fully populated session you can edit, walk through, and export
        — no API key needed.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SAMPLES.map((s) => (
          <button
            key={s.meta.id}
            onClick={() => load(s.meta.id)}
            className="card text-left transition hover:border-accent hover:shadow"
          >
            <h3 className="font-serif text-lg">{s.meta.title}</h3>
            <p className="mt-1 text-sm text-ink/60">{s.meta.blurb}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-accent">
              Load sample →
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
