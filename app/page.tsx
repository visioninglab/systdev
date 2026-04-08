import Link from "next/link";
import Image from "next/image";
import SampleLoader from "@/components/SampleLoader";
import { asset } from "@/lib/asset";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start px-6 py-16">
      <Link href="https://www.visioninglab.com" className="mb-8 block">
        <Image
          src={asset("/images/logo-wordmark.png")}
          alt="Visioning Lab"
          width={1100}
          height={170}
          priority
          className="h-8 w-auto"
        />
      </Link>
      <h1 className="font-serif text-5xl leading-tight text-ink">
        Systems Development Tool
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/70">
        Work through your problem using the Visioning Lab Systems Development framework.
        Turn messy inputs into structured points, decisions, insights, and actions — in a
        transparent, repeatable workflow.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link href="/tool/define" className="btn-primary">
          Start →
        </Link>
        <a href="#how" className="btn">
          How it works
        </a>
      </div>

      <SampleLoader />

      {/* How it works — overview */}
      <section id="how" className="mt-24 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          How it works
        </p>
        <h2 className="mt-2 font-serif text-3xl">
          From messy inputs to a defensible plan
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70">
          Most planning tools jump straight to actions. The Systems Development framework
          slows that down. It moves you through four stages — each one producing a tangible
          artefact you can interrogate, edit, and share — so the reasoning behind a decision
          is as visible as the decision itself.
        </p>
      </section>

      {/* Step cards */}
      <section className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            n: "1",
            title: "Define",
            body: "Paste a brief, transcript, or notes. The tool extracts each idea as a discrete point — labelled as a claim, a risk, or an assumption — with themes and implications attached.",
            artefact: "Editable point cards",
          },
          {
            n: "2",
            title: "Structure",
            body: "Generate candidate options and the criteria they should be judged against. Every option carries the points that support it and the points that contradict it, so trade-offs are explicit.",
            artefact: "Decision model",
          },
          {
            n: "3",
            title: "Insight",
            body: "Step back and look across the model. The tool surfaces recurring issues, hidden assumptions, and emerging risks that no single point makes obvious on its own.",
            artefact: "Pattern statements",
          },
          {
            n: "4",
            title: "Action",
            body: "Translate the insight into a portfolio of moves — immediate, short-term, and strategic — each linked back to the insight that justifies it.",
            artefact: "Linked action plan",
          },
        ].map((s) => (
          <div key={s.n} className="card">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-accent">STEP {s.n}</span>
              <span className="text-[10px] uppercase tracking-widest text-ink/40">
                {s.artefact}
              </span>
            </div>
            <h3 className="font-serif text-xl">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Principles */}
      <section className="mt-20 w-full">
        <h2 className="font-serif text-2xl">Principles</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              title: "Visible structure",
              body: "Nothing is hidden inside the AI. Every point, link, and insight is on the page and editable. The model proposes; you decide.",
            },
            {
              title: "Always editable",
              body: "Generated outputs are starting points, not verdicts. Rewrite a statement, change a category, delete what doesn't fit — the rest of the workflow adapts.",
            },
            {
              title: "Traceable reasoning",
              body: "Actions trace back to insights, insights trace back to points, points trace back to your original input. The export captures the whole chain.",
            },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="mb-2 font-serif text-lg text-accent">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="mt-20 w-full">
        <h2 className="font-serif text-2xl">What you take away</h2>
        <ul className="mt-4 space-y-3 text-ink/70">
          <li className="flex gap-3">
            <span className="text-accent">→</span>
            <span>
              <strong className="text-ink">A structured workbook</strong> covering your
              points, options, criteria, insights, and actions — exportable as PDF or JSON.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">→</span>
            <span>
              <strong className="text-ink">A defensible decision narrative</strong> you can
              hand to a board, a committee, or a delivery team without losing the reasoning.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">→</span>
            <span>
              <strong className="text-ink">A reusable artefact</strong> you can return to
              when conditions change, rather than starting from a blank page.
            </span>
          </li>
        </ul>
      </section>

      {/* Who it's for */}
      <section className="mt-20 w-full">
        <h2 className="font-serif text-2xl">Who it&apos;s for</h2>
        <p className="mt-4 text-ink/70">
          Built for people who work on problems where the right answer isn&apos;t obvious and
          the cost of getting it wrong is high:
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
          {[
            "Policy & infrastructure",
            "Consultants & analysts",
            "Researchers",
            "Innovation teams",
            "Programme design",
            "Cross-team strategy",
          ].map((t) => (
            <span key={t} className="rounded-full border border-line bg-white px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-20 w-full rounded-lg border border-line bg-white p-8 text-center">
        <h2 className="font-serif text-2xl">Try it on something real</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink/70">
          Start with your own input, or load a worked sample to see the framework end-to-end
          in under a minute.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link href="/tool/define" className="btn-primary">
            Start →
          </Link>
          <a href="#how" className="btn">
            Back to top
          </a>
        </div>
      </section>

      <footer className="mt-16 border-t border-line pt-6 text-xs text-ink/40">
        Sessions are stored locally in your browser. Nothing is saved on our servers.
      </footer>
    </main>
  );
}
