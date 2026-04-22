import { Contract, FinanceEntry, Insight, Property, Tenant } from "@/types";

export const properties: Property[] = [
  {
    id: "P-101",
    name: "Residencial Aurora",
    address: "Rua das Palmeiras, 520 - São Paulo",
    type: "apartment",
    status: "occupied",
    rent: 4200,
    occupancyRate: 98,
    profitabilityScore: 91,
    photo: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "P-102",
    name: "Casa Horizonte",
    address: "Av. Central, 88 - Campinas",
    type: "house",
    status: "vacant",
    rent: 3500,
    occupancyRate: 76,
    profitabilityScore: 64,
    photo: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "P-103",
    name: "Centro Corporate",
    address: "Rua XV de Novembro, 1020 - Curitiba",
    type: "commercial",
    status: "maintenance",
    rent: 8300,
    occupancyRate: 88,
    profitabilityScore: 73,
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

export const tenants: Tenant[] = [
  {
    id: "T-301",
    fullName: "Mariana Costa",
    email: "mariana.costa@email.com",
    phone: "+55 11 99999-2222",
    document: "123.456.789-10",
    contractHistory: 2
  },
  {
    id: "T-302",
    fullName: "André Oliveira",
    email: "andre.o@email.com",
    phone: "+55 19 98888-3333",
    document: "987.654.321-00",
    contractHistory: 1
  }
];

export const contracts: Contract[] = [
  {
    id: "C-501",
    propertyId: "P-101",
    tenantId: "T-301",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
    status: "active",
    monthlyAmount: 4200
  },
  {
    id: "C-502",
    propertyId: "P-102",
    tenantId: "T-302",
    startDate: "2025-01-10",
    endDate: "2026-01-09",
    status: "late",
    monthlyAmount: 3500
  }
];

export const financeEntries: FinanceEntry[] = [
  { id: "F-1", type: "income", category: "Aluguel", amount: 4200, date: "2026-04-01" },
  { id: "F-2", type: "income", category: "Aluguel", amount: 3500, date: "2026-04-03" },
  { id: "F-3", type: "expense", category: "Manutenção", amount: 1200, date: "2026-04-05" },
  { id: "F-4", type: "expense", category: "Impostos", amount: 900, date: "2026-04-10" }
];

export const monthlyRevenueForecast = [
  { month: "Mai", actual: 14200, predicted: 14800 },
  { month: "Jun", actual: 15100, predicted: 15650 },
  { month: "Jul", actual: 15900, predicted: 16300 },
  { month: "Ago", actual: 16400, predicted: 16900 },
  { month: "Set", actual: 0, predicted: 17100 },
  { month: "Out", actual: 0, predicted: 17500 }
];

export const occupancyByType = [
  { name: "Apartamentos", value: 58 },
  { name: "Casas", value: 27 },
  { name: "Comercial", value: 15 }
];

export const cashflowSeries = [
  { month: "Jan", income: 12000, expense: 4300 },
  { month: "Fev", income: 12800, expense: 4700 },
  { month: "Mar", income: 13400, expense: 5100 },
  { month: "Abr", income: 15200, expense: 5600 }
];

export const insights: Insight[] = [
  {
    id: "I-1",
    title: "Risco de inadimplência moderado",
    impact: "high",
    summary: "2 contratos apresentaram atraso recorrente nos últimos 60 dias.",
    recommendation: "Automatize lembretes D-5 e D+1 e ofereça parcelamento via PIX."
  },
  {
    id: "I-2",
    title: "Oportunidade de reajuste",
    impact: "medium",
    summary: "Imóvel P-101 está 8% abaixo da média de mercado local.",
    recommendation: "Simular reajuste progressivo em 2 ciclos para reduzir churn."
  }
];
