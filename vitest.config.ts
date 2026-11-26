import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
const p = (s: string) => fileURLToPath(new URL(s, import.meta.url));
export default defineConfig({
  resolve: { alias: { "@cheat/ai": p("./packages/ai/src/index.ts"), "@cheat/contracts": p("./packages/contracts/src/index.ts") } },
  test: { include: ["tests/**/*.test.ts"] },
});
