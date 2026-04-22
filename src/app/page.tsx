import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Charts } from "@/components/dashboard/charts";
import { InsightsPanel } from "@/components/dashboard/insights";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { PropertyList } from "@/components/dashboard/property-list";
import { ContractsTable } from "@/components/dashboard/contracts-table";
import { FinancePanel } from "@/components/dashboard/finance-panel";
import { TenantsTable } from "@/components/dashboard/tenants-table";
import { contracts, financeEntries, insights, monthlyRevenueForecast, occupancyByType, properties, cashflowSeries, tenants } from "@/data/mock";

export default function HomePage() {
  const occupied = properties.filter((p) => p.status === "occupied").length;
  const vacant = properties.filter((p) => p.status === "vacant").length;
  const revenue = financeEntries.filter((f) => f.type === "income").reduce((acc, cur) => acc + cur.amount, 0);
  const expense = financeEntries.filter((f) => f.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
  const endingSoon = contracts.filter((contract) => new Date(contract.endDate) <= new Date("2026-06-30")).length;

  return (
    <main className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 pb-24 lg:p-6 lg:pb-6">
        <Header />
        <section className="space-y-4">
          <MetricCards totalProperties={properties.length} occupied={occupied} vacant={vacant} revenue={revenue} expense={expense} />
          <Charts occupancyByType={occupancyByType} monthlyRevenueForecast={monthlyRevenueForecast} cashflowSeries={cashflowSeries} />
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2 space-y-4">
              <PropertyList properties={properties} />
              <TenantsTable tenants={tenants} />
              <ContractsTable contracts={contracts} />
            </div>
            <div className="space-y-4">
              <InsightsPanel insights={insights} />
              <FinancePanel entries={financeEntries} />
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-semibold text-slate-500">Alertas e notificações</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>{endingSoon} contrato(s) próximo(s) do vencimento</li>
                  <li>1 pagamento atrasado aguardando confirmação</li>
                  <li>2 imóveis com manutenção preventiva no mês</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
