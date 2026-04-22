# VetorMD — Real Estate Management SaaS Dashboard

Boilerplate funcional para um produto SaaS de gestão imobiliária com foco em UX, escalabilidade e visão financeira inteligente.

## Preview do produto

A tela principal já entrega um preview funcional com:
- KPIs de portfólio e lucro líquido
- Gráficos (previsão de receita, ocupação e fluxo de caixa)
- Gestão de imóveis, inquilinos e contratos
- Painel financeiro e insights automáticos
- Bloco de alertas operacionais

## 1) Stack recomendada

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **UI:** Tailwind CSS + componentes reutilizáveis (pronto para shadcn/ui)
- **Charts:** Recharts
- **Backend (próxima fase):** Node.js (Fastify/NestJS) ou Supabase
- **Banco:** PostgreSQL
- **Auth (próxima fase):** JWT + refresh token e OAuth para login social

## 2) Estrutura de projeto

```bash
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    dashboard/
      charts.tsx
      contracts-table.tsx
      finance-panel.tsx
      insights.tsx
      metric-cards.tsx
      property-list.tsx
      tenants-table.tsx
    layout/
      header.tsx
      sidebar.tsx
    ui/
      card.tsx
  data/
    mock.ts
  lib/
    format.ts
  types/
    index.ts
```

## 3) Wireframe textual das telas

### A. Dashboard geral
- **Sidebar fixa (desktop):** Dashboard, Imóveis, Inquilinos, Contratos, Financeiro, Notificações.
- **Header sticky:** busca global, alternância visual (dark mode).
- **Cards de KPI:** total de imóveis, ocupação, receita, despesa, lucro líquido.
- **Área analítica:**
  - gráfico de linha (receita real vs previsão)
  - pizza (ocupação por tipo)
  - barras (fluxo de caixa)
- **Painel inteligente:** insights automáticos com recomendação.
- **Bloco de alertas:** contratos vencendo, atrasos e manutenção.

### B. Gestão de imóveis
- Lista em cards com foto, endereço, status, aluguel e score de rentabilidade.
- CTA para novo imóvel.
- Preparado para alternar visão lista/cards.

### C. Inquilinos
- Cadastro com contato, documento e histórico de contratos.
- Relacionamento 1:N com contratos.

### D. Contratos
- Status (ativo/encerrado/atrasado), datas de início/fim, alertas de vencimento.
- Motor de notificações programáveis (D-30, D-7, D-1).

### E. Financeiro
- Receitas por aluguel, despesas por categoria, fluxo mensal.
- Relatórios mensais exportáveis (CSV/PDF na próxima fase).

## 4) Funcionalidades inovadoras já modeladas

- **Score de rentabilidade por imóvel** (`profitabilityScore`).
- **Previsão de receita assistida por IA** (`monthlyRevenueForecast`).
- **Insights automáticos** (`insights`) para risco e otimização.
- Base pronta para futura **previsão de inadimplência** via modelo supervisionado.

## 5) Arquitetura escalável proposta (produção)

- **Camadas:** `presentation -> application -> domain -> infra`.
- **API:** REST modular (ou GraphQL para múltiplos clientes).
- **Padrões:**
  - DTO + schema validation (Zod)
  - repository pattern
  - fila para jobs assíncronos (e-mail, cobrança, alertas)
- **Multi-tenant:** `tenant_id` por recurso + row-level security.
- **Observabilidade:** logs estruturados, tracing, métricas de SLA.

## 6) Modelo de dados inicial (resumo)

- `properties`
- `tenants`
- `contracts`
- `finance_entries`
- `notifications`
- `insights` (gerados por regras/ML)

## 7) Próximos passos sugeridos

1. Implementar backend com NestJS + Prisma + PostgreSQL.
2. Autenticação com roles (`admin`, `manager`, `owner`).
3. Upload de documentos/fotos em storage (S3/Supabase).
4. Sistema de notificações omnichannel (e-mail/WhatsApp/push).
5. Integração de IA para:
   - previsão de inadimplência
   - recomendação de reajuste
   - benchmark regional de aluguel
6. Módulo de relatórios financeiros e DRE por carteira.

## 8) Rodando localmente

```bash
npm install
npm run dev
```

Abra: `http://localhost:3000`
