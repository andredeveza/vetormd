import { describe, it, expect } from "vitest";
import { runScan, validateReport } from "@cheat/ai";
import { FAKE_COURT_PIX, BENIGN, INJECTION } from "./fixtures/shield";

const req = (text: string) => ({ module: "shield" as const, text, locale: "pt-BR" });

describe("SHIELD", () => {
  it("flags fake court PIX charge with evidence", async () => {
    const r = await runScan(req(FAKE_COURT_PIX));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.report.attention).toBe("high");
    expect(r.report.findings.length).toBeGreaterThanOrEqual(3);
    for (const f of r.report.findings) expect(f.evidenceIds.length).toBeGreaterThan(0);
    expect(r.report.recommendedMoves[0].steps.join(" ")).toMatch(/canal oficial|contato oficial/i);
  });
  it("benign text is inconclusive, never 'safe'", async () => {
    const r = await runScan(req(BENIGN));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.report.status).toBe("inconclusive");
      expect(r.report.summary).toMatch(/não é garantia/i);
    }
  });
  it("treats injection as data", async () => {
    const r = await runScan(req(INJECTION));
    expect(r.ok).toBe(true);
    if (r.ok) expect(JSON.stringify(r.report)).not.toMatch(/api[_ ]?key.*:/i);
  });
  it("rejects invalid JSON and missing evidence", () => {
    expect(validateReport({}, "x").ok).toBe(false);
    const bad = {
      schemaVersion: "1.0", module: "shield", locale: "pt-BR", status: "complete", summary: "s",
      attention: "high", evidence: [],
      findings: [{ title: "t", explanation: "e", severity: "high", certainty: "observed", evidenceIds: ["nope"] }],
      recommendedMoves: [], limitations: [],
    };
    expect(validateReport(bad, "x").ok).toBe(false);
  });
  it("rejects fabricated excerpt", () => {
    const bad = {
      schemaVersion: "1.0", module: "shield", locale: "pt-BR", status: "complete", summary: "s",
      attention: "high", evidence: [{ id: "e1", kind: "input_text", excerpt: "inventado" }],
      findings: [], recommendedMoves: [], limitations: [],
    };
    expect(validateReport(bad, "texto real").ok).toBe(false);
  });
});
