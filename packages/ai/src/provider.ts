import type { ScanRequest } from "@cheat/contracts";

/** Interface de provedor. Sem implementação real ainda: chave só no backend. */
export interface LLMProvider {
  readonly name: string;
  generate(req: ScanRequest): Promise<unknown>;
}
