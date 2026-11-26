import { type CheatReport, type ScanRequest } from "@cheat/contracts";
import { validateReport } from "./validate";
import { mockProvider } from "./shield";
import type { LLMProvider } from "./provider";

export * from "./validate";
export * from "./shield";
export * from "./provider";

export type ScanResult =
  | { ok: true; report: CheatReport; provider: string }
  | { ok: false; errors: string[] };

export async function runScan(req: ScanRequest, provider: LLMProvider = mockProvider): Promise<ScanResult> {
  const raw = await provider.generate(req);
  const v = validateReport(raw, req.text);
  return v.ok ? { ok: true, report: v.report, provider: provider.name } : { ok: false, errors: v.errors };
}
export * from "./prompts";
export * from "./gemini";
