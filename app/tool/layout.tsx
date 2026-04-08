import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Stepper from "@/components/Stepper";
import StaticBanner from "@/components/StaticBanner";
import SettingsDrawer from "@/components/SettingsDrawer";
import { SessionProvider } from "@/lib/session";
import { asset } from "@/lib/asset";

export default function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen">
        <header className="no-print flex items-center justify-between border-b border-line bg-white px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={asset("/images/vl-icon.png")}
              alt="Visioning Lab"
              width={420}
              height={240}
              className="h-7 w-auto"
            />
            <span className="font-serif text-lg">Visioning Lab</span>
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
