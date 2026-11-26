# CHECKPOINT

```yaml
project: CHEAT for Good
date: 2026-11-26
status: phase_1_vertical_slice_prototype
repo: andredeveza/vetormd (branch ccr-d409f7e6-q94bfe)
production_deploy: not_performed
implemented: [CFG-001, CFG-002 (parcial), CFG-003 (landing/demo simples), CFG-005 (schemas + provider mock), CFG-007 (SHIELD textual, mock)]
implemented_extra: [campo mode (synthetic_fixture|live_analysis), consentimento obrigatório na API, rate limit em memória, prompts anti-injeção, GeminiProvider (NÃO testado contra API real)]
not_implemented: [auth, Supabase/RLS, upload/PDF/imagem, provider LLM real, FINE PRINT, ADVANTAGE, créditos, billing, histórico, extensão]
verified:
  - pnpm test: 5 testes passando (SHIELD, validador de evidências, rejeição de trecho inventado)
  - pnpm typecheck: ok
  - pnpm build: ok (Next 15.1.6)
  - POST /api/scans via next start: 200 (shield), 422 (módulo indisponível), /demo 200
risks:
  - GeminiProvider sem chave: nunca executado; só ativa com LLM_PROVIDER=gemini + LLM_API_KEY
  - Rascunho colado pelo usuário citava Next 16.4.6/Zod 4.6.7: não verificado, mantidas versões instaladas (Next 15.1.6, Zod 3.24.1)
  - SHIELD atual é heurística por regex (mock), não IA; recall/precisão não medidos
  - Sem rate limit, sem auth: não expor publicamente
  - Marca/domínio/handles não verificados
  - Link AI Studio do pedido não acessível (privado); só o Google Doc foi lido
next_step: CFG-004 (Supabase auth + RLS) e CFG-006 (provider real) após founder aprovar provedor e orçamento
```
