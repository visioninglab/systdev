import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Visioning Lab — Systems Development Tool",
  description:
    "Work through complex problems using the Visioning Lab Systems Development framework: Define → Structure → Insight → Action.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
