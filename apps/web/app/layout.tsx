import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "CHEAT for Good", description: "Unlock your advantage. Inteligência pessoal para decidir melhor." };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <nav aria-label="Principal" style={{ display: "flex", gap: 16, justifyContent: "space-between" }}>
            <a href="/"><strong>CHEAT for Good</strong></a>
            <span><a href="/demo">Demo</a> · <a href="/app/scan">Scanner</a></span>
          </nav>
          {children}
          <footer className="muted" style={{ marginTop: 48, fontSize: ".85rem" }}>
            Protótipo em desenvolvimento. Não substitui aconselhamento jurídico. Exemplos são fictícios.
          </footer>
        </main>
      </body>
    </html>
  );
}
