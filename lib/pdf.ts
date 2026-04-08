"use client";

import jsPDF from "jspdf";
import type { Session } from "./schema";

const MARGIN = 14;
const LINE = 5;

export function exportSessionToPDF(session: Session) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const heading = (text: string, size = 16) => {
    ensureSpace(size / 2 + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.text(text, MARGIN, y);
    y += size / 2 + 2;
  };

  const para = (text: string, size = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, pageWidth - MARGIN * 2);
    for (const line of lines) {
      ensureSpace(LINE);
      doc.text(line, MARGIN, y);
      y += LINE;
    }
  };

  const subhead = (text: string) => {
    ensureSpace(7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, MARGIN, y);
    y += 5;
  };

  // Title
  heading("Systems Development Workbook", 18);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Define → Structure → Insight → Action", MARGIN, y);
  y += 8;

  // Define
  heading("1. Define — Points");
  if (session.points.length === 0) para("(no points)");
  for (const p of session.points) {
    subhead(`[${p.type}] ${p.statement}`);
    if (p.themes.length) para(`Themes: ${p.themes.join(", ")}`);
    if (p.implications) para(`Implications: ${p.implications}`);
    y += 2;
  }

  // Structure
  heading("2. Structure — Options & Criteria");
  subhead("Options");
  if (session.options.length === 0) para("(no options)");
  for (const o of session.options) {
    subhead(`• ${o.title}`);
    if (o.description) para(o.description);
  }
  y += 2;
  subhead("Criteria");
  if (session.criteria.length === 0) para("(no criteria)");
  for (const c of session.criteria) {
    para(`• ${c.label}${c.description ? ` — ${c.description}` : ""}`);
  }

  // Insight
  heading("3. Insight — Patterns & Signals");
  if (session.insights.length === 0) para("(no insights)");
  for (const i of session.insights) {
    subhead(`[${i.kind}] ${i.statement}`);
  }

  // Action
  heading("4. Action — Plan");
  for (const horizon of ["immediate", "short-term", "strategic"] as const) {
    const items = session.actions.filter((a) => a.horizon === horizon);
    if (items.length === 0) continue;
    subhead(horizon.charAt(0).toUpperCase() + horizon.slice(1));
    for (const a of items) {
      para(`• ${a.description}`);
      if (a.rationale) para(`  Rationale: ${a.rationale}`);
    }
  }

  doc.save(`systems-development-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportSessionToJSON(session: Session) {
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `systems-development-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
