# CHEAT for Good

Protótipo do MVP (fase 0/1 do masterplan): landing, demo e scanner SHIELD com provider **mock** determinístico.
Sem auth, sem banco, sem IA real, sem pagamento. Nada em produção.

## Rodar
    pnpm install
    pnpm test
    pnpm typecheck
    pnpm build
    pnpm dev   # http://localhost:3000

Sem segredos necessários. Copie `.env.example` só quando houver provider real.

## Estrutura
- `packages/contracts` schemas Zod (CheatReport, ScanRequest)
- `packages/ai` validador de evidências, provider mock e SHIELD
- `apps/web` Next.js (landing, /demo, /app/scan, POST /api/scans)
- `tests/` fixtures sintéticas e testes
- `docs/CHECKPOINT.md` estado verificado
