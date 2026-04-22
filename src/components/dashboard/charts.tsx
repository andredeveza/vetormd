"use client";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend } from "recharts";
import { Card } from "@/components/ui/card";

const PIE_COLORS = ["#2f6fed", "#22c55e", "#f59e0b"];

interface ChartsProps {
  occupancyByType: { name: string; value: number }[];
  monthlyRevenueForecast: { month: string; actual: number; predicted: number }[];
  cashflowSeries: { month: string; income: number; expense: number }[];
}

export function Charts({ occupancyByType, monthlyRevenueForecast, cashflowSeries }: ChartsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <Card title="Previsão de receita (IA assistida)">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRevenueForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#2f6fed" name="Real" strokeWidth={2} />
              <Line type="monotone" dataKey="predicted" stroke="#22c55e" name="Previsto" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Ocupação por tipo de imóvel">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={occupancyByType} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
                {occupancyByType.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Fluxo de caixa mensal">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashflowSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Receitas" fill="#2f6fed" radius={4} />
              <Bar dataKey="expense" name="Despesas" fill="#f97316" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
