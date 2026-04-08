import type { ReactNode } from "react";
import Link from "next/link";
import Stepper from "@/components/Stepper";
import StaticBanner from "@/components/StaticBanner";
import SettingsDrawer from "@/components/SettingsDrawer";
import { SessionProvider } from "@/lib/session";

export default function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen">
        <header className="no-print flex items-center justify-between border-b border-line bg-white px-6 py-3">
          <Link href="/" className="font-serif text-lg">
            Visioning Lab
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-ink/50">
              Systems Development Tool
            </span>
            <SettingsDrawer />
          </div>
        </header>
        <StaticBanner />
        <Stepper />
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
