import { z } from "zod";

export const ModuleSchema = z.enum(["shield", "fine_print", "advantage", "xray"]);
export type Module = z.infer<typeof ModuleSchema>;

export const EvidenceSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["input_text", "document_page", "verified_source", "calculation"]),
  excerpt: z.string().min(1),
  page: z.number().int().positive().optional(),
  url: z.string().url().optional(),
  retrievedAt: z.string().optional(),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const FindingSchema = z.object({
  title: z.string().min(1),
  explanation: z.string().min(1),
  severity: z.enum(["info", "attention", "high"]),
  certainty: z.enum(["observed", "verified", "inferred", "unknown"]),
  evidenceIds: z.array(z.string()),
  limitation: z.string().optional(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const CheatReportSchema = z.object({
  schemaVersion: z.literal("1.0"),
  module: ModuleSchema,
  locale: z.string(),
  status: z.enum(["complete", "inconclusive"]),
  summary: z.string().min(1),
  attention: z.enum(["low", "attention", "high", "unknown"]),
  findings: z.array(FindingSchema),
  evidence: z.array(EvidenceSchema),
  recommendedMoves: z.array(
    z.object({ title: z.string(), steps: z.array(z.string()).min(1), rationale: z.string() }),
  ),
  draftMessage: z.string().optional(),
  limitations: z.array(z.string()),
  money: z
    .array(
      z.object({
        amountMinor: z.number().int(),
        currency: z.string().length(3),
        kind: z.enum(["estimated", "calculated"]),
        basis: z.string(),
      }),
    )
    .optional(),
});
export type CheatReport = z.infer<typeof CheatReportSchema>;

export const ScanRequestSchema = z.object({
  module: ModuleSchema,
  text: z.string().min(1).max(20000),
  locale: z.string().default("pt-BR"),
});
export type ScanRequest = z.infer<typeof ScanRequestSchema>;
