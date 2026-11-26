import ScanForm from "@/components/ScanForm";
export const metadata = { title: "Demo · CHEAT for Good" };
const SAMPLE = "URGENTE: Intimação judicial nº 0001234. Pague R$ 480,00 via PIX em 24 horas ou haverá bloqueio de contas. Detalhes: https://tribunal-justica.xyz/pagar";
export default function Demo() {
  return (<><h1>Demo</h1><p className="card"><strong>Exemplo fictício.</strong> Nenhum dado real, resultado gerado pelo provider mock.</p><ScanForm initial={SAMPLE} /></>);
}
