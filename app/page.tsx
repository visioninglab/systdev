import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-6 py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
        Visioning Lab
      </p>
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

      <section id="how" className="mt-20 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            n: "1",
            title: "Define",
            body: "Capture inputs and extract structured points — claims, risks, assumptions.",
          },
          {
            n: "2",
            title: "Structure",
            body: "Build options and criteria. Link points to the choices they support or oppose.",
          },
          {
            n: "3",
            title: "Insight",
            body: "Surface recurring patterns, hidden assumptions, and emerging risks.",
          },
          {
            n: "4",
            title: "Action",
            body: "Translate insight into immediate, short-term, and strategic actions.",
          },
        ].map((s) => (
          <div key={s.n} className="card">
            <div className="mb-2 text-xs font-semibold text-accent">STEP {s.n}</div>
            <h3 className="font-serif text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{s.body}</p>
          </div>
        ))}
      </section>

      <footer className="mt-20 text-xs text-ink/40">
        Outputs are stored locally in your browser. Nothing is saved on our servers.
      </footer>
    </main>
  );
}
