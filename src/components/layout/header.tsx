import { Moon, Search, Sun } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
        <Search size={16} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Buscar imóveis, inquilinos, contratos..."
        />
      </div>
      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
        <Sun size={16} />
        <Moon size={16} />
        Dark mode
      </button>
    </header>
  );
}
