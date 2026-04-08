"use client";

import Link from "next/link";

export default function StepNav({
  prev,
  next,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label?: string };
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="no-print mt-8 flex items-center justify-between border-t border-line pt-4">
      {prev ? (
        <Link href={prev.href} className="btn">
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={nextDisabled ? "#" : next.href}
          aria-disabled={nextDisabled}
          className={`btn-primary ${nextDisabled ? "pointer-events-none opacity-50" : ""}`}
        >
          {next.label ?? nextLabel} →
        </Link>
      )}
    </div>
  );
}
