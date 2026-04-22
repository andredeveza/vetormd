import { Building2, CircleDollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { currency } from "@/lib/format";

interface MetricCardsProps {
  totalProperties: number;
  occupied: number;
  vacant: number;
  revenue: number;
  expense: number;
}

export function MetricCards({ totalProperties, occupied, vacant, revenue, expense }: MetricCardsProps) {
  const profit = revenue - expense;

  const metrics = [
    { icon: Building2, title: "Total de imóveis", value: totalProperties.toString(), note: `${occupied} ocupados / ${vacant} vagos` },
    { icon: CircleDollarSign, title: "Receita mensal", value: currency(revenue), note: "Receita recorrente + extras" },
    { icon: TrendingDown, title: "Despesas", value: currency(expense), note: "Manutenção + impostos" },
    { icon: TrendingUp, title: "Lucro líquido", value: currency(profit), note: profit > 0 ? "Operação saudável" : "Atenção ao fluxo" }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ icon: Icon, title, value, note }) => (
        <Card key={title}>
          <div className="mb-2 inline-flex rounded-lg bg-brand-50 p-2 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100">
            <Icon size={18} />
          </div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          <p className="mt-1 text-xs text-slate-400">{note}</p>
        </Card>
      ))}
    </div>
  );
}
