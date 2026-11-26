export default function Landing() {
  return (
    <>
      <h1>A vida não tem modo fácil. Até agora.</h1>
      <p className="muted">Identifique riscos, decifre contratos e negocie melhor com uma camada de inteligência feita para você.</p>
      <a className="btn" href="/app/scan">Ativar meu primeiro CHEAT</a>{" "}
      <a href="/demo">Ver demo</a>
      <section aria-labelledby="mods" className="grid" style={{ marginTop: 32 }}>
        <h2 id="mods" style={{ gridColumn: "1/-1" }}>Módulos</h2>
        <div className="card"><span className="tag">DISPONÍVEL (demo)</span><h3>SHIELD</h3><p>Sinais de golpe em mensagens, com evidência e verificação segura.</p></div>
        <div className="card"><span className="tag">EM BREVE</span><h3>FINE PRINT</h3><p>Decifre contratos citando o trecho real.</p></div>
        <div className="card"><span className="tag">EM BREVE</span><h3>ADVANTAGE</h3><p>Negocie com fatos e alternativas.</p></div>
      </section>
      <section className="card">
        <h2>Privacidade</h2>
        <p>Você vê o que será analisado antes de enviar. Nada é executado por você sem sua ação. SHIELD nunca garante que algo é seguro.</p>
      </section>
    </>
  );
}
