import { Card } from "@/components/ui/card";
import { Contract } from "@/types";

const statusMap = {
  active: "bg-emerald-50 text-emerald-600",
  ended: "bg-slate-100 text-slate-600",
  late: "bg-rose-50 text-rose-600"
};

export function ContractsTable({ contracts }: { contracts: Contract[] }) {
  return (
    <Card title="Contratos" action={<button className="text-sm text-brand-700">+ Novo contrato</button>}>
      <div className="space-y-2">
        {contracts.map((contract) => (
          <article key={contract.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold">{contract.id}</p>
              <p className="text-xs text-slate-500">
                {contract.startDate} → {contract.endDate}
              </p>
            </div>
            <div className="text-sm">R$ {contract.monthlyAmount.toLocaleString("pt-BR")}</div>
            <span className={`rounded-full px-2 py-1 text-xs uppercase ${statusMap[contract.status]}`}>{contract.status}</span>
          </article>
        ))}
      </div>
    </Card>
  );
}
