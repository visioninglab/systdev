"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STEPS = [
  { href: "/tool/define", label: "Define" },
  { href: "/tool/structure", label: "Structure" },
  { href: "/tool/insight", label: "Insight" },
  { href: "/tool/action", label: "Action" },
  { href: "/tool/export", label: "Export" },
];

export default function Stepper() {
  const pathname = usePathname();
  const activeIdx = STEPS.findIndex((s) => pathname?.startsWith(s.href));

  return (
    <nav className="no-print flex items-center gap-2 border-b border-line bg-white px-6 py-3 text-sm">
      {STEPS.map((s, i) => {
        const isActive = i === activeIdx;
        const isDone = i < activeIdx;
        return (
          <div key={s.href} className="flex items-center gap-2">
            <Link
              href={s.href}
              className={[
                "flex items-center gap-2 rounded-md px-3 py-1.5 transition",
                isActive
                  ? "bg-accent/10 font-semibold text-accent"
                  : isDone
                  ? "text-ink/70 hover:bg-line/40"
                  : "text-ink/50 hover:bg-line/40",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full text-xs",
                  isActive || isDone ? "bg-accent text-white" : "bg-line text-ink/60",
                ].join(" ")}
              >
                {i + 1}
              </span>
              {s.label}
            </Link>
            {i < STEPS.length - 1 && <span className="text-ink/30">→</span>}
          </div>
        );
      })}
    </nav>
  );
}
