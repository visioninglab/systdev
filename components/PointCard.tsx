"use client";

import type { Point, PointType } from "@/lib/schema";

const TYPE_STYLES: Record<PointType, string> = {
  claim: "bg-accent/10 text-accent border-accent/30",
  risk: "bg-warn/10 text-warn border-warn/30",
  assumption: "bg-ink/5 text-ink/70 border-ink/20",
};

export default function PointCard({
  point,
  onChange,
  onDelete,
}: {
  point: Point;
  onChange: (p: Point) => void;
  onDelete: () => void;
}) {
  return (
    <div className="card space-y-2">
      <div className="flex items-start justify-between gap-2">
        <select
          value={point.type}
          onChange={(e) => onChange({ ...point, type: e.target.value as PointType })}
          className={`rounded-full border px-2 py-0.5 text-xs font-medium ${TYPE_STYLES[point.type]}`}
        >
          <option value="claim">claim</option>
          <option value="risk">risk</option>
          <option value="assumption">assumption</option>
        </select>
        <button
          onClick={onDelete}
          className="text-xs text-ink/40 hover:text-warn"
          aria-label="Delete point"
        >
          remove
        </button>
      </div>
      <textarea
        value={point.statement}
        onChange={(e) => onChange({ ...point, statement: e.target.value })}
        className="textarea text-sm"
        rows={2}
        placeholder="Statement"
      />
      <input
        value={point.themes.join(", ")}
        onChange={(e) =>
          onChange({
            ...point,
            themes: e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          })
        }
        className="input text-xs"
        placeholder="themes, comma separated"
      />
      <textarea
        value={point.implications}
        onChange={(e) => onChange({ ...point, implications: e.target.value })}
        className="textarea text-xs"
        rows={2}
        placeholder="Implications"
      />
    </div>
  );
}
