import type { CheatReport, Evidence, Finding, ScanRequest } from "@cheat/contracts";
import type { LLMProvider } from "./provider";

type Rule = {
  title: string;
  explanation: string;
  severity: Finding["severity"];
  pattern: RegExp;
};

const RULES: Rule[] = [
  { title: "Pedido de pagamento via PIX", explanation: "A mensagem solicita pagamento por PIX. Cobranças legítimas raramente exigem PIX imediato para um terceiro.", severity: "high", pattern: /\bpix\b/i },
  { title: "Urgência ou prazo curto", explanation: "Prazos de horas ou ameaças de consequência imediata são tática comum de pressão.", severity: "attention", pattern: /\b(\d+\s*horas?|urgente|imediatamente|hoje|último aviso|prazo)\b/i },
  { title: "Alegação de cobrança judicial", explanation: "Cita processo, intimação ou tribunal. Verifique pelo canal oficial do órgão, obtido por você, nunca pelo link recebido.", severity: "high", pattern: /\b(intima[cç][aã]o|processo|tribunal|justi[cç]a|penhora|bloqueio)\b/i },
  { title: "Link incluído na mensagem", explanation: "A mensagem traz link. O sistema não visita nem verifica a reputação do link.", severity: "attention", pattern: /https?:\/\/\S+|\b\w+\.(?:xyz|top|click|site|online)\b\S*/i },
  { title: "Pedido de dados sensíveis", explanation: "Pede senha, código, CPF completo ou dados do cartão. Nunca envie esses dados por mensagem.", severity: "high", pattern: /\b(senha|c[oó]digo (?:de )?(?:verifica[cç][aã]o|sms|token)|cvv|cart[aã]o)\b/i },
];

function excerptAround(text: string, m: RegExpMatchArray): string {
  const start = Math.max(0, (m.index ?? 0) - 20);
  const end = Math.min(text.length, (m.index ?? 0) + m[0].length + 40);
  return text.slice(start, end).trim();
}

export function analyzeShield(req: ScanRequest): CheatReport {
  const evidence: Evidence[] = [];
  const findings: Finding[] = [];
  for (const rule of RULES) {
    const m = req.text.match(rule.pattern);
    if (!m) continue;
    const id = `ev${evidence.length + 1}`;
    evidence.push({ id, kind: "input_text", excerpt: excerptAround(req.text, m) });
    findings.push({
      title: rule.title,
      explanation: rule.explanation,
      severity: rule.severity,
      certainty: "observed",
      evidenceIds: [id],
      limitation: "Indício textual; sem verificação de reputação externa.",
    });
  }
  const high = findings.filter((f) => f.severity === "high").length;
  const attention = findings.length === 0 ? "unknown" : high >= 2 ? "high" : "attention";
  const limitations = [
    "Análise textual determinística de demonstração (provider mock). Não consulta fontes externas.",
    "Ausência de sinais não prova que a mensagem é segura.",
  ];
  if (findings.length === 0) {
    return {
      schemaVersion: "1.0", module: "shield", locale: req.locale, mode: "synthetic_fixture", status: "inconclusive",
      summary: "Nenhum sinal claro encontrado no texto. Resultado inconclusivo, não é garantia de segurança.",
      attention, findings, evidence,
      recommendedMoves: [{ title: "Verifique pelo canal oficial", steps: ["Contate a empresa ou órgão por telefone ou site obtido de forma independente."], rationale: "Sem sinais claros, só verificação independente confirma a origem." }],
      limitations,
    };
  }
  return {
    schemaVersion: "1.0", module: "shield", locale: req.locale, mode: "synthetic_fixture", status: "complete",
    summary: `${findings.length} indício(s) de risco encontrado(s) no texto. Trate como suspeito até verificar.`,
    attention, findings, evidence,
    recommendedMoves: [{
      title: "Não pague nem clique; verifique por canal oficial",
      steps: [
        "Não responda, não clique em links e não faça pagamentos.",
        "Busque o contato oficial do órgão ou empresa por conta própria.",
        "Confirme lá se a cobrança ou o processo existe.",
        "Se confirmar golpe, registre boletim de ocorrência e avise familiares.",
      ],
      rationale: "Verificação independente quebra a pressão de urgência usada em golpes.",
    }],
    limitations,
  };
}

export const mockProvider: LLMProvider = {
  name: "mock",
  async generate(req) {
    if (req.module !== "shield") throw new Error("módulo não disponível na fase 1");
    return analyzeShield(req);
  },
};
