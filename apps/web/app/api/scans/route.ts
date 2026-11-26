import { NextResponse } from "next/server";
import { ScanTextInputSchema } from "@cheat/contracts";
import { runScan, createGeminiProvider, mockProvider } from "@cheat/ai";

const err = (status: number, code: string, message: string, requestId: string, retryable = false) =>
  NextResponse.json({ code, message, requestId, retryable }, { status });

// Rate limit em memória: só protótipo. Trocar por store distribuído na Fase 2.
const buckets = new Map<string, { n: number; reset: number }>();
function allow(key: string, limit = 15, windowMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset <= now) { buckets.set(key, { n: 1, reset: now + windowMs }); return true; }
  if (b.n >= limit) return false;
  b.n += 1; return true;
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip)) return err(429, "rate_limited", "Muitas análises. Aguarde um minuto.", requestId, true);

  let body: unknown;
  try { body = await req.json(); } catch { return err(400, "invalid_json", "Corpo inválido.", requestId); }
  const parsed = ScanTextInputSchema.safeParse(body);
  if (!parsed.success) return err(422, "validation", parsed.error.issues[0]?.message ?? "Entrada inválida.", requestId);

  const useGemini = process.env.LLM_PROVIDER === "gemini" && !!process.env.LLM_API_KEY;
  const provider = useGemini
    ? createGeminiProvider({ apiKey: process.env.LLM_API_KEY!, model: process.env.LLM_MODEL_FAST || "gemini-2.5-flash", timeoutMs: Number(process.env.LLM_TIMEOUT_MS ?? 15000) })
    : mockProvider;

  const started = Date.now();
  try {
    const r = await runScan({ module: "shield", text: parsed.data.content, locale: parsed.data.locale }, provider);
    // Log sem conteúdo do usuário.
    console.info(JSON.stringify({ event: "scan", requestId, provider: provider.name, ok: r.ok, latencyMs: Date.now() - started }));
    if (!r.ok) return err(502, "invalid_output", "Resultado inconclusivo. Tente novamente.", requestId, true);
    return NextResponse.json({ requestId, provider: r.provider, report: r.report });
  } catch (e) {
    console.error(JSON.stringify({ event: "scan_failed", requestId, reason: e instanceof Error ? e.message : "unknown" }));
    return err(502, "analysis_failed", "Não foi possível concluir a análise. Tente novamente.", requestId, true);
  }
}
