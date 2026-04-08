import { z } from "zod";

export const PointType = z.enum(["claim", "risk", "assumption"]);
export type PointType = z.infer<typeof PointType>;

export const Point = z.object({
  id: z.string(),
  statement: z.string(),
  type: PointType,
  themes: z.array(z.string()).default([]),
  implications: z.string().default(""),
});
export type Point = z.infer<typeof Point>;

export const Option = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().default(""),
  supportingPointIds: z.array(z.string()).default([]),
  conflictingPointIds: z.array(z.string()).default([]),
});
export type Option = z.infer<typeof Option>;

export const Criterion = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().default(""),
});
export type Criterion = z.infer<typeof Criterion>;

export const InsightKind = z.enum(["recurring", "assumption", "risk"]);
export type InsightKind = z.infer<typeof InsightKind>;

export const Insight = z.object({
  id: z.string(),
  kind: InsightKind,
  statement: z.string(),
  relatedPointIds: z.array(z.string()).default([]),
});
export type Insight = z.infer<typeof Insight>;

export const ActionHorizon = z.enum(["immediate", "short-term", "strategic"]);
export type ActionHorizon = z.infer<typeof ActionHorizon>;

export const Action = z.object({
  id: z.string(),
  horizon: ActionHorizon,
  description: z.string(),
  rationale: z.string().default(""),
  linkedInsightIds: z.array(z.string()).default([]),
});
export type Action = z.infer<typeof Action>;

export const Session = z.object({
  input: z.string().default(""),
  points: z.array(Point).default([]),
  options: z.array(Option).default([]),
  criteria: z.array(Criterion).default([]),
  insights: z.array(Insight).default([]),
  actions: z.array(Action).default([]),
  updatedAt: z.string().default(() => new Date().toISOString()),
});
export type Session = z.infer<typeof Session>;

export const emptySession = (): Session => ({
  input: "",
  points: [],
  options: [],
  criteria: [],
  insights: [],
  actions: [],
  updatedAt: new Date().toISOString(),
});

export const newId = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
