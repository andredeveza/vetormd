import { Building2, ChartNoAxesCombined, Bell, FileText, Users, Wallet } from "lucide-react";

const items = [
  { icon: ChartNoAxesCombined, label: "Dashboard" },
  { icon: Building2, label: "Imóveis" },
  { icon: Users, label: "Inquilinos" },
  { icon: FileText, label: "Contratos" },
  { icon: Wallet, label: "Financeiro" },
  { icon: Bell, label: "Notificações" }
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-brand-500">VetorMD</p>
        <h1 className="text-xl font-bold">Real Estate OS</h1>
      </div>
      <nav className="space-y-1">
        {items.map(({ icon: Icon, label }, index) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              index === 0
                ? "bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
