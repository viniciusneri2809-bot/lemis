// Direção A · Trilho. Uma linha azul contínua desce pela página (o gesto do "l" do símbolo) e o
// conteúdo pendura nela alternando lados. Sem moldura: as interfaces desenhadas ficam soltas no
// campo, e a profundidade vem do gradiente de tinta e dos glows.
import {
  esc, use, titulo, pilula, chip, barra, botao, header, rodape, perguntasLista,
  cenaChega, cenaVolta, esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou,
  painelAcompanhamento, conversaAcompanhamento, cartaoCliente, no, cssCenas,
} from "../partes.mjs";

const trilho = (atraso = 0) => `<span class="trilho feixe v" style="--atraso:${atraso}s" aria-hidden="true"></span>`;
const noTrilho = () => `<span class="no-trilho" aria-hidden="true"></span>`;
const numeral = (n, tam = "") => `<span class="numeral t-destaque ${tam}" aria-hidden="true">${String(n).padStart(2, "0")}</span>`;

export default function (c, whatsapp) {
  const { hero, duasPortas, virada, aquisicao, retencao, acompanhamento, comoComeca, perguntas, ctaFinal, cta } = c;
  const aq = hero.painel.aquisicao;
  const re = hero.painel.retencao;

  const corpo = `
${header(c, whatsapp)}
<main id="conteudo">

<!-- 1 · Hero -->
<section id="inicio" class="campo-tinta hero">
  <span class="glow" style="width:40rem;height:40rem;top:10%;right:-14rem;opacity:.4" aria-hidden="true"></span>
  <div class="container g12">
    <div class="col12">${pilula(hero.rotulo, "texto-2 entra-hero")}</div>
    ${titulo(hero.titulo, "h1", "t-display col12 entra-hero", ' style="--i:2"')}
    <div class="esq">
      <p class="t-lead texto-2 entra-hero" style="--i:6">${esc(hero.paragrafo)}</p>
      <div class="acoes entra-hero" style="--i:8">
        ${botao(whatsapp, cta.rotulo)}
        <a class="link-seta" href="${hero.secundario.href}">${esc(hero.secundario.rotulo)}${use("seta-baixo")}</a>
      </div>
    </div>
    <div class="funil col12 entra-hero" style="--i:10">
      ${trilho(0)}
      <p class="rot rot-aq t-rotulo texto-2">${esc(aq.rotulo)}</p>
      <ol class="aq" aria-label="${esc(c.textosDeInterface.painelAquisicao)}">
        ${aq.nos.map((n, i) => `<li class="n${i + 1} ${i === aq.nos.length - 1 ? "vira" : ""}">${no(n.icone, n.nome)}</li>`).join("")}
      </ol>
      <p class="rot rot-re t-rotulo texto-2">${esc(re.rotulo)}</p>
      <ol class="re" aria-label="${esc(c.textosDeInterface.painelRetencao)}">
        ${re.nos.map((n, i) => `<li class="n${i + 1} ${i === 0 ? "recebe" : ""}">${no(n.icone, n.nome, { destino: i === re.nos.length - 1 })}</li>`).join("")}
      </ol>
      ${cartaoCliente({ chip: hero.painel.cliente.chip, cls: "cliente" })}
    </div>
  </div>
</section>

<!-- 2 · As duas portas -->
<section id="duas-portas" class="campo-tinta pontos">
  ${trilho(0.8)}
  <span class="glow" style="width:28rem;height:28rem;top:0;right:0;opacity:.5" aria-hidden="true"></span>
  <div class="container g12">
    ${noTrilho()}
    <div class="esq entra">${pilula(duasPortas.rotulo, "texto-2")}${titulo(duasPortas.titulo, "h2", "t-titulo mt24")}</div>
    <p class="dir t-lead texto-2 entra fim">${esc(duasPortas.abertura)}</p>
    <div class="cenas col12">
      ${duasPortas.cenas.map((cena, i) => `
      <div class="cena ${i ? "dir" : "esq"} entra">
        <p class="t-rotulo texto-2">${esc(cena.rotulo)}</p>
        <div class="halo mt20">${i ? cenaVolta(c) : cenaChega(c)}</div>
        <p class="t-corpo texto-2 mt24 max46">${esc(cena.texto)}</p>
      </div>`).join("")}
    </div>
    <p class="fecho t-sub entra esq">${esc(duasPortas.fecho)}</p>
  </div>
</section>

<!-- 3 · A virada -->
<section id="como-funciona" class="campo-tinta grade virada">
  <span class="glow" style="width:30rem;height:30rem;bottom:-10rem;left:33%;opacity:.4" aria-hidden="true"></span>
  <div class="container g12">
    <div class="col12 entra">${pilula(virada.rotulo, "texto-2")}</div>
    ${titulo(virada.titulo, "h2", "t-display col12 entra mt24")}
    <p class="dir t-lead texto-2 entra">${esc(virada.abertura)}</p>
  </div>
  <div class="corpo-virada">
  ${trilho(1.6)}
  <div class="container g12">
    <div class="contraste col12 entra">
      <p class="t-sub texto-2 lado-esq">${esc(virada.contraste.outros)}</p>
      <p class="t-sub lado-dir">${esc(virada.contraste.lemis)}</p>
    </div>
    <ul class="fund col12">
      ${virada.fundamentos.map((f, i) => `
      <li class="item ${i % 2 ? "dir" : "esq"} entra">
        ${numeral(i + 1, "n64")}
        <div><h3 class="t-sub">${esc(f.nome)}</h3><p class="t-corpo texto-2 mt12 max38">${esc(f.texto)}</p></div>
      </li>`).join("")}
    </ul>
  </div>
  </div>
</section>

<!-- 4 · Aquisição -->
<section id="aquisicao" class="campo-tinta">
  ${trilho(2.4)}
  <div class="container g12">
    ${noTrilho()}
    <div class="esq entra">${pilula(aquisicao.rotulo, "texto-2")}${titulo(aquisicao.titulo, "h2", "t-titulo mt24")}</div>
    <div class="dir entra fim">
      <p class="t-lead texto-2">${esc(aquisicao.abertura)}</p>
      <ul class="chips mt24">${aquisicao.dentro.map((d) => `<li>${chip(d)}</li>`).join("")}</ul>
      <p class="t-legenda texto-2 mt12">${esc(aquisicao.nota)}</p>
    </div>
    <ol class="escada col12">
      ${aquisicao.marcos.map((m, i) => `
      <li class="item ${i % 2 ? "dir" : "esq"} entra">
        ${numeral(i + 1, "n64")}
        <div class="corpo">
          <h3 class="t-rotulo texto-2">${esc(m.rotulo)}</h3>
          <div class="halo mt16">${[esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou][i](c)}</div>
        </div>
      </li>`).join("")}
    </ol>
  </div>
</section>

<!-- 5 · Retenção -->
<section id="retencao" class="campo-tinta">
  ${trilho(3.2)}
  <span class="glow" style="width:36rem;height:36rem;top:30%;left:50%;transform:translateX(-50%);opacity:.5" aria-hidden="true"></span>
  <div class="container g12">
    ${noTrilho()}
    <div class="esq entra">${pilula(retencao.rotulo, "texto-2")}${titulo(retencao.titulo, "h2", "t-titulo mt24")}</div>
    <p class="dir t-lead texto-2 entra fim">${esc(retencao.abertura)}</p>
    <div class="centro col12">
      <p class="t-corpo texto-2 apoio entra">${esc(retencao.apoio)}</p>
      <div class="pilha entra">
        <span class="fantasma f2" aria-hidden="true"></span><span class="fantasma f1" aria-hidden="true"></span>
        ${cartaoCliente({ estados: retencao.estados, grande: true, cls: "principal" })}
      </div>
      <p class="t-corpo fecho-ret entra">${esc(retencao.fecho)}</p>
    </div>
  </div>
</section>

<!-- 6 · O que você vê -->
<section id="acompanhamento" class="campo-papel">
  ${trilho(0)}
  <div class="container g12">
    ${noTrilho()}
    <div class="esq entra">${pilula(acompanhamento.rotulo, "texto-2")}${titulo(acompanhamento.titulo, "h2", "t-titulo mt24")}</div>
    <p class="dir t-lead texto-2 entra fim">${esc(acompanhamento.abertura)}</p>
    <div class="esq entra mt64">${painelAcompanhamento(c).replace('class="painel-acomp', 'class="painel-acomp solto')}</div>
    <div class="dir entra mt64">
      <p class="t-rotulo texto-2">${esc(acompanhamento.exemplo.rotulo)}</p>
      <div class="mt16">${conversaAcompanhamento(c)}</div>
      <p class="t-legenda texto-2 mt16 max52">${esc(acompanhamento.exemplo.nota)}</p>
    </div>
  </div>
</section>

<!-- 7 · Como começa -->
<section id="como-comeca" class="campo-papel separador">
  ${trilho(0.8)}
  <div class="container g12">
    ${noTrilho()}
    <div class="esq entra">${pilula(comoComeca.rotulo, "texto-2")}${titulo(comoComeca.titulo, "h2", "t-titulo mt24")}</div>
    <p class="dir t-lead texto-2 entra fim">${esc(comoComeca.abertura)}</p>
    <ol class="passos col12">
      ${comoComeca.passos.map((p, i) => `
      <li class="item ${i % 2 ? "dir" : "esq"} entra">
        ${numeral(i + 1, "n96")}
        <div><h3 class="t-sub">${esc(p.titulo)}</h3><p class="t-corpo texto-2 mt12 max40">${esc(p.corpo)}</p></div>
      </li>`).join("")}
    </ol>
    <div class="dir acoes entra">${botao(whatsapp, cta.rotulo)}<p class="t-legenda texto-2">${esc(cta.nota)}</p></div>
  </div>
</section>

<!-- 8 · Perguntas -->
<section id="perguntas" class="campo-tinta separador">
  ${trilho(1.6)}
  <div class="container g12">
    <h2 class="t-titulo esq fixo entra">${esc(perguntas.titulo)}</h2>
    <div class="dir entra">${perguntasLista(c)}</div>
  </div>
</section>

<!-- 9 · CTA -->
<section id="contato" class="campo-azul cta">
  ${trilho(2.4)}
  <span class="motivo" aria-hidden="true">${use("motivo")}</span>
  <div class="container g12">
    <div class="esq">
      <h2 class="t-display t-display-denso entra">${esc(ctaFinal.titulo)}</h2>
      <p class="t-lead mt32 max39 entra">${esc(ctaFinal.apoio)}</p>
      <div class="acoes entra">${botao(whatsapp, cta.rotulo, { variante: "sobre-azul" })}<p class="t-legenda">${esc(ctaFinal.nota)}</p></div>
    </div>
  </div>
</section>

</main>
${rodape(c, whatsapp)}
`;

  const css = `
${cssCenas}
/* utilidades */
.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}.mt24{margin-top:24px}.mt32{margin-top:32px}.mt64{margin-top:64px}
.max38{max-width:38ch}.max39{max-width:39ch}.max40{max-width:40ch}.max46{max-width:46ch}.max52{max-width:52ch}
.acoes{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;margin-top:40px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.separador{border-top:1px solid var(--fio-escuro)}

/* o campo: dois tons de tinta para o trilho ter fundo */
main{position:relative}
section{position:relative;overflow:clip;padding-block:var(--pad,128px)}
.campo-tinta{background:linear-gradient(180deg,var(--tinta) 0%,var(--tinta-funda) 100%)}
.campo-tinta + .campo-tinta{background:linear-gradient(180deg,var(--tinta-funda) 0%,var(--tinta) 45%,var(--tinta-funda) 100%)}
#inicio{--pad:96px;padding-bottom:0}
#duas-portas{--pad:112px}
#como-funciona{--pad:144px}
#aquisicao{--pad:112px}
#retencao{--pad:128px}
#acompanhamento{--pad:112px}
#como-comeca{--pad:104px}
#perguntas{--pad:112px}
#contato{--pad:144px}

/* grade de 12 e os dois lados do trilho */
.g12{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;row-gap:0;position:relative}
.col12{grid-column:1/-1}
.esq{grid-column:1/7;padding-right:56px}
.dir{grid-column:7/-1;padding-left:56px}
.fim{align-self:end}

/* o trilho */
.trilho{position:absolute;top:0;bottom:0;left:50%;margin-left:-1px;z-index:0}
.trilho::after{filter:drop-shadow(0 0 8px var(--azul))}
.no-trilho{position:absolute;left:50%;top:6px;width:12px;height:12px;margin-left:-6px;border-radius:50%;border:2px solid var(--azul);background:var(--tinta);z-index:1}
.campo-papel .no-trilho{background:var(--papel)}
.g12 > *{position:relative;z-index:1}

/* hero */
.hero h1{max-width:14ch;margin-top:24px}
.hero .esq{margin-top:32px}
.funil{position:relative;margin-top:64px;padding-bottom:120px;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:84px;align-items:center}
.funil .trilho{top:36px}
.funil .rot{grid-row:1;align-self:end;padding-bottom:12px}
.funil .rot-aq{grid-column:1;justify-self:end;padding-right:64px}
.funil .rot-re{grid-column:2;grid-row:4;padding-left:64px}
.funil ol{display:contents}
.funil li{position:relative;display:flex;align-items:center}
.funil .aq li{grid-column:1;justify-content:flex-end;padding-right:64px}
.funil .re li{grid-column:2;padding-left:64px}
.funil .aq .n1{grid-row:2}.funil .aq .n2{grid-row:3}.funil .aq .n3{grid-row:4}.funil .aq .n4{grid-row:5}
.funil .re .n1{grid-row:5}.funil .re .n2{grid-row:6}.funil .re .n3{grid-row:7}
.funil li::after{content:"";position:absolute;top:50%;height:1px;width:64px;background:var(--fio-escuro)}
.funil .aq li::after{right:0}
.funil .re li::after{left:0}
.funil .vira::after,.funil .recebe::after{height:2px;margin-top:-1px;background:var(--cor-feixe)}
.funil .cliente{grid-column:1;grid-row:6/8;justify-self:end;margin-right:-56px;max-width:240px;z-index:2;box-shadow:0 18px 40px -18px #000}
/* o "l": a linha horizontal que sai de Fechou e chega em Cliente novo, animada */
.funil .vira::before,.funil .recebe::before{content:"";position:absolute;top:50%;height:2px;width:64px;margin-top:-1px;background:var(--azul);filter:drop-shadow(0 0 6px var(--azul));opacity:0}
.funil .vira::before{right:0}.funil .recebe::before{left:0}
@media (prefers-reduced-motion:no-preference){
  .funil .vira::before{animation:vira 3.2s linear infinite;animation-delay:2.4s}
  .funil .recebe::before{animation:vira 3.2s linear infinite;animation-delay:2.8s}
  @keyframes vira{0%,20%{opacity:0}30%,60%{opacity:1}70%,100%{opacity:0}}
}
@media (prefers-reduced-motion:reduce){.funil .vira::after,.funil .recebe::after{background:color-mix(in srgb,var(--azul) 70%,transparent)}}

/* cenas soltas: sem moldura, um halo atrás */
.halo{position:relative}
.halo::before{content:"";position:absolute;inset:-32px;border-radius:32px;background:radial-gradient(closest-side,color-mix(in srgb,var(--azul) 14%,transparent),transparent 75%);pointer-events:none}
.halo > *{position:relative}
.cena-volta.cartao-cliente.tinta{border-color:transparent;background:color-mix(in srgb,var(--branco) 4%,transparent);box-shadow:0 30px 60px -30px #000}
.cenas{display:grid;grid-template-columns:1fr 1fr;margin-top:64px}
.cenas .cena.esq{padding-right:72px}
.cenas .cena.dir{padding-left:72px;margin-top:96px}
.cena-chega{max-width:440px}
#duas-portas .fecho{margin-top:64px;max-width:40ch}

/* virada */
.virada h2{max-width:16ch}
.virada .dir{margin-top:32px}
.corpo-virada{position:relative;margin-top:80px;padding-bottom:var(--pad);margin-bottom:calc(-1 * var(--pad))}
.corpo-virada .trilho{top:0}
.corpo-virada::before{content:"";position:absolute;left:50%;top:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;border:2px solid var(--azul);background:var(--tinta);z-index:1}
.contraste{display:grid;grid-template-columns:1fr 1fr;margin-top:24px}
.contraste .lado-esq{text-align:right;padding-right:56px;max-width:none;justify-self:end;max-width:24ch}
.contraste .lado-dir{padding-left:56px;max-width:26ch}
.fund{display:grid;grid-template-columns:1fr 1fr;row-gap:40px;margin-top:88px}
.fund .item:nth-child(1){grid-row:1}.fund .item:nth-child(2){grid-row:2}.fund .item:nth-child(3){grid-row:3}
.item{display:flex;align-items:flex-start;gap:28px}
.item.esq{grid-column:1;flex-direction:row-reverse;text-align:right;padding-right:0}
.item.esq p,.item.esq h3{margin-left:auto}
.item.dir{grid-column:2;padding-left:0}
.numeral{line-height:.9;flex:none;display:block}
.n64{font-size:64px}
.n96{font-size:96px}
.item .numeral{width:72px}
.item.esq .numeral{text-align:right;margin-right:-8px}
.item.dir .numeral{text-align:left;margin-left:-8px}

/* aquisição */
.escada{display:grid;grid-template-columns:1fr 1fr;row-gap:56px;margin-top:88px}
.escada .item{align-items:flex-start}
.escada .corpo{width:min(100%,380px)}
.escada .item.esq .corpo{text-align:left}
.escada .item.esq{justify-content:flex-start}
.escada .item.dir:nth-child(4) .halo{margin-left:-136px}
.escada .item.dir:nth-child(4) .numeral{position:relative;z-index:2}
.escada .esquema{max-width:360px}
.escada .item:nth-child(2){margin-top:80px}
.escada .item:nth-child(3){margin-top:-40px}
.escada .item:nth-child(4){margin-top:96px}
.esquema-fechou-wrap{max-width:320px}

/* retenção */
.centro{display:grid;grid-template-columns:3fr 6fr 3fr;column-gap:24px;align-items:center;margin-top:96px}
.centro .apoio{max-width:30ch;text-align:right;padding-right:32px}
.centro .fecho-ret{max-width:30ch;padding-left:32px}
.pilha{position:relative;justify-self:center;width:min(100%,420px)}
.pilha .principal{position:relative;z-index:2}
.fantasma{position:absolute;inset:0;background:var(--superficie-escura);border:1px solid var(--fio-escuro);border-radius:16px}
.fantasma.f1{transform:translate(-16px,-16px) scale(.97);opacity:.8}
.fantasma.f2{transform:translate(-32px,-32px) scale(.94);opacity:.6}

/* acompanhamento */
.painel-acomp.solto{background:none;border:0;box-shadow:none;padding:0}
.painel-acomp.solto .indicadores dd .barra{height:14px}
.painel-acomp.solto .origens .barra{height:14px}

/* como começa */
.passos{display:grid;grid-template-columns:1fr 1fr;row-gap:40px;margin-top:88px}
.passos .item:nth-child(1){grid-row:1}.passos .item:nth-child(2){grid-row:2}.passos .item:nth-child(3){grid-row:3}
#como-comeca .acoes{margin-top:72px}

/* perguntas */
.fixo{position:sticky;top:112px;align-self:start;max-width:16ch}

/* cta */
.cta{--cor-feixe:color-mix(in srgb,var(--branco) 30%,transparent)}
.cta .trilho{bottom:auto;height:calc(100% - 420px)}
.cta .trilho::after{background:var(--branco);filter:drop-shadow(0 0 8px var(--branco))}
.cta .motivo{position:absolute;bottom:0;left:calc(50% - 56px);width:900px;color:var(--papel);pointer-events:none}
.cta .motivo svg{width:100%;height:auto}
.cta h2{max-width:34rem}
.cta .container{min-height:520px}

/* celular: trilho na margem, tudo à direita dele */
@media (max-width:1023px){
  section{--pad:80px!important}
  #inicio{padding-bottom:0!important}
  .g12{display:block;padding-left:44px}
  .esq,.dir,.col12{padding-left:0;padding-right:0}
  .g12 > * + .dir,.g12 > * + .esq{margin-top:24px}
  .trilho,.no-trilho{left:20px}
  .no-trilho{margin-left:-6px}
  .hero h1{max-width:none}
  .funil{display:grid;grid-template-columns:1fr;grid-auto-rows:auto;row-gap:14px;margin-top:56px;padding-bottom:88px;padding-left:0}
  .funil .trilho{left:-24px;top:8px}
  .funil ol{display:contents}
  .funil li,.funil .aq li,.funil .re li{grid-column:1;grid-row:auto;justify-content:flex-start;padding:0}
  .funil .rot,.funil .rot-aq,.funil .rot-re{grid-column:1;grid-row:auto;justify-self:start;padding:0;margin-top:20px}
  .funil li::after{left:-24px;width:24px}
  .funil .vira::before,.funil .recebe::before{display:none}
  .funil .cliente{grid-column:1;grid-row:auto;justify-self:start;margin:6px 0 10px;max-width:260px}
  .cenas{display:block;margin-top:48px}
  .cenas .cena.esq,.cenas .cena.dir{padding:0;margin-top:0}
  .cenas .cena.dir{margin-top:48px}
  #duas-portas .fecho{margin-top:48px}
  .virada h2{max-width:none}
  .contraste{display:grid;grid-template-columns:1fr;row-gap:24px;margin-top:56px}
  .contraste .lado-esq{text-align:left;padding:0;justify-self:start}
  .contraste .lado-dir{padding:0 0 0 24px;border-left:1px solid var(--fio-escuro)}
  .fund,.escada,.passos{display:grid;grid-template-columns:1fr;row-gap:40px;margin-top:56px}
  .fund .item,.passos .item{grid-row:auto!important}
  .corpo-virada{margin-top:48px}
  .corpo-virada .trilho,.corpo-virada::before{left:20px}
  .item,.item.esq,.item.dir{flex-direction:row;text-align:left;grid-column:1;margin-top:0!important}
  .item.esq p,.item.esq h3{margin-left:0}
  .item .numeral,.item.esq .numeral,.item.dir .numeral{margin:0;width:56px;text-align:left}
  .n64{font-size:48px}.n96{font-size:64px}
  .escada .item.dir:nth-child(4) .halo{margin-left:0}
  .centro{display:grid;grid-template-columns:1fr;row-gap:32px;margin-top:56px}
  .centro .apoio,.centro .fecho-ret{text-align:left;padding:0;max-width:44ch}
  .pilha{justify-self:start;width:100%}
  .fixo{position:static;max-width:none;margin-bottom:32px}
  .cta .trilho{height:calc(100% - 220px)}
  .cta .motivo{width:110vw;left:calc(20px - 6.9vw)}
  .cta .container{min-height:0;padding-bottom:200px}
}
`;

  return { css, corpo };
}
