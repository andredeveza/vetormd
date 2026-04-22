export type PropertyStatus = "occupied" | "vacant" | "maintenance";
export type PropertyType = "house" | "apartment" | "commercial";

export interface Property {
  id: string;
  name: string;
  address: string;
  type: PropertyType;
  status: PropertyStatus;
  rent: number;
  occupancyRate: number;
  profitabilityScore: number;
  photo: string;
}

export interface Tenant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  document: string;
  contractHistory: number;
}

export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  status: "active" | "ended" | "late";
  monthlyAmount: number;
}

export interface FinanceEntry {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
}

export interface Insight {
  id: string;
  title: string;
  impact: "high" | "medium" | "low";
  summary: string;
  recommendation: string;
}
