import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Insight } from "@/types";

export function InsightsPanel({ insights }: { insights: Insight[] }) {
  return (
    <Card title="Dashboard inteligente">
      <div className="space-y-3">
        {insights.map((insight) => (
          <article key={insight.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-500" />
              <h4 className="text-sm font-semibold">{insight.title}</h4>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-[10px] uppercase dark:bg-slate-800">{insight.impact}</span>
            </div>
            <p className="text-xs text-slate-500">{insight.summary}</p>
            <p className="mt-2 text-xs text-brand-700 dark:text-brand-100">{insight.recommendation}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
