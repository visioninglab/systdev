# Systems Development Framework

Visioning Lab has developed a Systems Development framework to help organisations work through complex problems in a structured, transparent way.

The approach moves from defining inputs through to action, enabling clearer thinking, better decisions and ongoing system insight.

## Framework Overview
Define → Structure → Insight → Action

## Define

Capture and clarify what matters across multiple sources and perspectives.

- Documents, meetings, data, stakeholder inputs
- Structured into clear points
- Identification of assumptions and implications

## Structure

Organise relationships, options and decision logic.

- Linking points into models
- Defining options and trade-offs
- Making reasoning explicit and comparable

## Insight

Identify patterns, signals and system-level implications.

- Recurring issues across inputs
- Hidden assumptions
- Emerging risks and opportunities

## Action

Translate insight into interventions and next steps.

- Decisions and action plans
- Policy or operational changes
- Feedback into future cycles

## What this enables
- Structured understanding of complex systems
- Transparent and explainable decision-making
- Comparability across cases and organisations
- Continuous learning over time

## Interactive Tool

An interactive Next.js implementation of the framework lives in this repo.
It walks the user through Define → Structure → Insight → Action, with
LLM-assisted extraction at each step and editable outputs throughout.

### Setup

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Anthropic Claude (`claude-sonnet-4-6` by default) for extraction & generation
- `zod` schemas for the Point / Option / Insight / Action data model
- `jspdf` for the PDF export
- Session state autosaved to `localStorage` (no server storage)

### Project layout

- [app/page.tsx](app/page.tsx) — landing
- [app/tool/](app/tool/) — the four-step flow + export page
- [app/api/](app/api/) — LLM endpoints (one per step)
- [lib/schema.ts](lib/schema.ts) — data model
- [lib/prompts.ts](lib/prompts.ts) — system prompts per step
- [lib/anthropic.ts](lib/anthropic.ts) — Claude client + JSON helper
- [lib/session.tsx](lib/session.tsx) — React context + localStorage autosave
- [lib/pdf.ts](lib/pdf.ts) — PDF + JSON export

## Applications
- Infrastructure and environmental systems (e.g. water, energy)
- Policy and regulatory decision-making
- Research and interdisciplinary projects
- Complex programme design

## Relationship to Existing Work

This project builds on Visioning Lab’s previous work, including:

- Ontology Maker (structured terminology and relationships)
- Water Decisions (decision support for infrastructure systems)

It brings these together into a single, integrated framework.