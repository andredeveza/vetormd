import { CheatReportSchema, type CheatReport } from "@cheat/contracts";

export type Validation = { ok: true; report: CheatReport } | { ok: false; errors: string[] };

/** Valida schema, referências a evidências e trechos contra a entrada. */
export function validateReport(raw: unknown, inputText: string): Validation {
  const parsed = CheatReportSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, errors: parsed.error.issues.map((i) => i.message) };
  const report = parsed.data;
  const errors: string[] = [];
  const ids = new Set(report.evidence.map((e) => e.id));
  for (const f of report.findings) {
    for (const id of f.evidenceIds) if (!ids.has(id)) errors.push(`evidência ausente: ${id}`);
    if (f.certainty !== "unknown" && f.evidenceIds.length === 0)
      errors.push(`achado sem evidência: ${f.title}`);
  }
  for (const e of report.evidence) {
    if (e.kind === "input_text" && !inputText.includes(e.excerpt))
      errors.push(`trecho não encontrado na entrada: ${e.id}`);
    if (e.kind === "verified_source") errors.push(`fonte verificada não recuperada pelo sistema: ${e.id}`);
  }
  return errors.length ? { ok: false, errors } : { ok: true, report };
}
