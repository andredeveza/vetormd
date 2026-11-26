"use client";
import { useState } from "react";
import type { CheatReport } from "@cheat/contracts";

const SAMPLE = "URGENTE: Intimação judicial nº 0001234. Pague R$ 480,00 via PIX em 24 horas ou haverá bloqueio de contas. Detalhes: https://tribunal-justica.xyz/pagar";

export default function ScanForm({ initial = "" }: { initial?: string }) {
  const [text, setText] = useState(initial);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [report, setReport] = useState<CheatReport | null>(null);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading"); setReport(null); setError("");
    try {
      const res = await fetch("/api/scans", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ module: "shield", text }) });
      const body = await res.json();
      if (!res.ok) { setError(body.message ?? "Erro"); setState("error"); return; }
      setReport(body.report); setState("idle");
    } catch { setError("Falha de rede. Tente novamente."); setState("error"); }
  }

  return (
    <>
      <form onSubmit={submit} className="card">
        <label htmlFor="t"><strong>Cole a mensagem suspeita</strong></label>
        <textarea id="t" value={text} onChange={(e) => setText(e.target.value)} maxLength={20000} required />
        <p className="muted">Será enviado apenas este texto. Não cole senhas, códigos ou dados de cartão. Provider atual: <strong>mock (demonstração)</strong>.</p>
        <button className="btn" disabled={state === "loading" || !text.trim()}>{state === "loading" ? "Analisando…" : "Activate Cheat"}</button>{" "}
        <button type="button" onClick={() => setText(SAMPLE)}>Usar exemplo fictício</button>
      </form>
      {state === "error" && <p role="alert" className="high">{error}</p>}
      {report && <Report r={report} />}
    </>
  );
}

const SEV = { info: "Info", attention: "Atenção", high: "Alto" } as const;

function Report({ r }: { r: CheatReport }) {
  return (
    <section aria-label="Cheat Report" className="card">
      <h2>Cheat Report <span className="tag">{r.status === "complete" ? "completo" : "inconclusivo"}</span></h2>
      <p><strong>Nível de atenção:</strong> {r.attention}</p>
      <p>{r.summary}</p>
      {r.findings.map((f, i) => (
        <div key={i} className="card">
          <strong className={f.severity}>{SEV[f.severity]}: {f.title}</strong>
          <p>{f.explanation}</p>
          {f.evidenceIds.map((id) => <blockquote key={id}>{r.evidence.find((e) => e.id === id)?.excerpt}</blockquote>)}
          {f.limitation && <p className="muted">Limite: {f.limitation}</p>}
        </div>
      ))}
      {r.recommendedMoves.map((m, i) => (
        <div key={i} className="card"><h3>Recommended Move: {m.title}</h3><ol>{m.steps.map((s, j) => <li key={j}>{s}</li>)}</ol><p className="muted">{m.rationale}</p></div>
      ))}
      <h3>Limitações</h3><ul>{r.limitations.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </section>
  );
}
