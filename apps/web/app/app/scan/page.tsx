import ScanForm from "@/components/ScanForm";
export const metadata = { title: "Scanner SHIELD · CHEAT for Good" };
export default function Scan() {
  return (<><h1>Scanner SHIELD</h1><p className="muted">Verifique uma mensagem suspeita. Sem login nesta fase de protótipo.</p><ScanForm /></>);
}
