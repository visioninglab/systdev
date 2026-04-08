import type { Session } from "./schema";

export type SampleMeta = {
  id: string;
  title: string;
  blurb: string;
};

export const SAMPLES: { meta: SampleMeta; session: Session }[] = [
  {
    meta: {
      id: "water-resilience",
      title: "Regional water resilience",
      blurb:
        "A drought-prone region weighs reservoir expansion against demand-side measures and inter-basin transfer.",
    },
    session: {
      input:
        "Our region has seen three drought years in the last decade. The reservoir system is at 62% of historic average storage. The water authority is considering three responses: expanding the main reservoir (capital cost ~£180m, 6-year build), aggressive demand reduction via metering and tariffs, or a new inter-basin transfer pipeline from a neighbouring catchment. Environmental groups oppose the reservoir expansion on biodiversity grounds. The neighbouring catchment authority has signalled openness to transfer but only if their own resilience headroom is preserved. Public polling shows households are sceptical of further bill increases. A cross-party committee has asked for options by Q3.",
      points: [
        {
          id: "pt_w1",
          statement: "Reservoir storage is at 62% of the historic average after three drought years.",
          type: "claim",
          themes: ["supply", "climate"],
          implications: "Existing system has limited buffer against further dry years.",
        },
        {
          id: "pt_w2",
          statement: "Reservoir expansion would cost ~£180m and take six years to build.",
          type: "claim",
          themes: ["capital", "timeline"],
          implications: "No relief for the next several drought cycles even if approved today.",
        },
        {
          id: "pt_w3",
          statement: "Environmental groups will oppose reservoir expansion on biodiversity grounds.",
          type: "risk",
          themes: ["stakeholders", "environment"],
          implications: "Likely planning challenges and reputational cost; possible judicial review.",
        },
        {
          id: "pt_w4",
          statement: "The neighbouring catchment will only allow inter-basin transfer if its own headroom is preserved.",
          type: "claim",
          themes: ["governance", "supply"],
          implications: "Transfer volumes are conditional and may shrink in future drought years.",
        },
        {
          id: "pt_w5",
          statement: "Households are sceptical of further bill increases.",
          type: "claim",
          themes: ["public", "affordability"],
          implications: "Demand-side measures funded via tariffs face political pushback.",
        },
        {
          id: "pt_w6",
          statement: "Climate trends will continue to make droughts more frequent and severe.",
          type: "assumption",
          themes: ["climate"],
          implications: "Any plan should be stress-tested against more, not fewer, dry years.",
        },
        {
          id: "pt_w7",
          statement: "A cross-party committee has requested options by Q3.",
          type: "claim",
          themes: ["timeline", "governance"],
          implications: "Decisions framed for political rather than purely technical horizons.",
        },
      ],
      options: [
        {
          id: "op_w1",
          title: "Expand the main reservoir",
          description:
            "Largest single supply uplift, but slow, capital-intensive, and politically contested.",
          supportingPointIds: ["pt_w1", "pt_w6"],
          conflictingPointIds: ["pt_w3", "pt_w5"],
        },
        {
          id: "op_w2",
          title: "Demand reduction via metering and tariffs",
          description:
            "Fastest deployable lever; reduces system stress but requires public buy-in and equity safeguards.",
          supportingPointIds: ["pt_w1", "pt_w6"],
          conflictingPointIds: ["pt_w5"],
        },
        {
          id: "op_w3",
          title: "Inter-basin transfer pipeline",
          description:
            "Adds resilience by diversifying sources, but volumes are conditional on a neighbouring authority's own headroom.",
          supportingPointIds: ["pt_w1", "pt_w4"],
          conflictingPointIds: ["pt_w4"],
        },
      ],
      criteria: [
        { id: "cr_w1", label: "Time to deliver", description: "How quickly the option begins reducing risk." },
        { id: "cr_w2", label: "Capital cost", description: "Up-front investment required." },
        { id: "cr_w3", label: "Public acceptability", description: "Likely household and stakeholder support." },
        { id: "cr_w4", label: "Resilience under worsening drought", description: "Robustness if dry years intensify." },
        { id: "cr_w5", label: "Environmental impact", description: "Effect on biodiversity and downstream ecosystems." },
      ],
      insights: [
        {
          id: "in_w1",
          kind: "recurring",
          statement:
            "Every option faces a binding constraint outside the water authority's control — planning, political, or inter-jurisdictional.",
          relatedPointIds: ["pt_w3", "pt_w4", "pt_w5"],
        },
        {
          id: "in_w2",
          kind: "assumption",
          statement:
            "The plan implicitly assumes climate trends are roughly stable; stress-testing against severe-case projections has not been done.",
          relatedPointIds: ["pt_w6"],
        },
        {
          id: "in_w3",
          kind: "risk",
          statement:
            "The Q3 political deadline pushes toward a single headline option, but no single option covers the gap before the next drought cycle.",
          relatedPointIds: ["pt_w2", "pt_w7"],
        },
      ],
      actions: [
        {
          id: "ac_w1",
          horizon: "immediate",
          description: "Commission a stress-test of all three options against severe-case climate projections.",
          rationale: "Closes the assumption gap flagged in Insight 2 before any commitment.",
          linkedInsightIds: ["in_w2"],
        },
        {
          id: "ac_w2",
          horizon: "immediate",
          description: "Open a formal dialogue with the neighbouring catchment authority on transfer terms and trigger conditions.",
          rationale: "Surface real availability before treating transfer as a viable lever.",
          linkedInsightIds: ["in_w1"],
        },
        {
          id: "ac_w3",
          horizon: "short-term",
          description: "Roll out demand-reduction metering with progressive tariffs and an affordability safeguard.",
          rationale: "Fastest deployable resilience uplift; affordability safeguard addresses the public-acceptability constraint.",
          linkedInsightIds: ["in_w1", "in_w3"],
        },
        {
          id: "ac_w4",
          horizon: "short-term",
          description: "Frame the Q3 committee submission as a portfolio, not a single option.",
          rationale: "No single option covers the gap; the committee needs to choose a mix, not a winner.",
          linkedInsightIds: ["in_w3"],
        },
        {
          id: "ac_w5",
          horizon: "strategic",
          description: "Establish a standing biodiversity-impact review process for any future capital scheme.",
          rationale: "Reduces planning risk and rebuilds trust with environmental stakeholders.",
          linkedInsightIds: ["in_w1"],
        },
      ],
      updatedAt: new Date().toISOString(),
    },
  },
];
