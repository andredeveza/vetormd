import { ReactNode } from "react";

interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Card({ title, action, children }: CardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-900">
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</h3>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
