import type { ScanRequest } from "@cheat/contracts";
import type { LLMProvider } from "./provider";
import { BASE_SYSTEM_PROMPT, SHIELD_MODULE_PROMPT, wrapUntrustedContent } from "./prompts";

export type GeminiConfig = { apiKey: string; model: string; timeoutMs: number };

/** Provider real. Chave só no backend. Saída é validada por runScan; backend força metadados. */
export function createGeminiProvider(cfg: GeminiConfig): LLMProvider {
  return {
    name: "gemini",
    async generate(req: ScanRequest) {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), cfg.timeoutMs);
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:generateContent`,
          {
            method: "POST",
            headers: { "content-type": "application/json", "x-goog-api-key": cfg.apiKey },
            signal: ctl.signal,
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: `${BASE_SYSTEM_PROMPT}\n\n${SHIELD_MODULE_PROMPT}` }] },
              contents: [{ role: "user", parts: [{ text: `Idioma: ${req.locale}.\n\n${wrapUntrustedContent(req.text)}` }] }],
              generationConfig: { temperature: 0.1, responseMimeType: "application/json" },
            }),
          },
        );
        if (!res.ok) throw new Error(`gemini_http_${res.status}`);
        const payload = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
        const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("gemini_empty");
        const json = JSON.parse(text) as Record<string, unknown>;
        return { ...json, schemaVersion: "1.0", module: "shield", mode: "live_analysis", locale: req.locale };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
