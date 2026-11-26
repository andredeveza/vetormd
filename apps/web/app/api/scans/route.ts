import { NextResponse } from "next/server";
import { ScanRequestSchema } from "@cheat/contracts";
import { runScan } from "@cheat/ai";

const err = (status: number, code: string, message: string, retryable = false) =>
  NextResponse.json({ code, message, requestId: crypto.randomUUID(), retryable }, { status });

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return err(422, "invalid_json", "Corpo inválido."); }
  const parsed = ScanRequestSchema.safeParse(body);
  if (!parsed.success) return err(422, "validation", "Entrada inválida.");
  if (parsed.data.module !== "shield") return err(422, "module_unavailable", "Módulo ainda não disponível.");
  try {
    const result = await runScan(parsed.data);
    if (!result.ok) return err(502, "invalid_output", "Resultado inconclusivo. Tente novamente.", true);
    return NextResponse.json({ report: result.report, provider: result.provider });
  } catch { return err(500, "internal", "Erro interno.", true); }
}
