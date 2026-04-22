import { Card } from "@/components/ui/card";
import { FinanceEntry } from "@/types";
import { currency } from "@/lib/format";

export function FinancePanel({ entries }: { entries: FinanceEntry[] }) {
  const income = entries.filter((entry) => entry.type === "income").reduce((acc, entry) => acc + entry.amount, 0);
  const expense = entries.filter((entry) => entry.type === "expense").reduce((acc, entry) => acc + entry.amount, 0);

  return (
    <Card title="Financeiro">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
          <p className="text-xs">Receitas</p>
          <p className="text-lg font-semibold">{currency(income)}</p>
        </div>
        <div className="rounded-xl bg-rose-50 p-3 text-rose-700">
          <p className="text-xs">Despesas</p>
          <p className="text-lg font-semibold">{currency(expense)}</p>
        </div>
        <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
          <p className="text-xs">Resultado</p>
          <p className="text-lg font-semibold">{currency(income - expense)}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
            <p>
              {entry.category} <span className="text-xs text-slate-500">({entry.date})</span>
            </p>
            <span className={entry.type === "income" ? "text-emerald-600" : "text-rose-600"}>
              {entry.type === "income" ? "+" : "-"} {currency(entry.amount)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
