// Direção B · Editorial. Contraste de escala e assimetria no lugar de superfície: as caixas somem,
// as interfaces desenhadas ficam no campo em camadas, as larguras variam por seção (medida de
// 640 px, faixa de sangria total, folha de papel deslocada) e numerais em serifa de 200 px marcam
// as seções cortados pela borda.
import {
  esc, use, titulo, pilula, chip, barra, botao, header, rodape, perguntasLista,
  cenaChega, cenaVolta, esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou,
  painelAcompanhamento, cartaoCliente, no, cssCenas,
} from "../partes.mjs";

const numeralG = (n) => `<span class="numeral-g" aria-hidden="true">${String(n).padStart(2, "0")}</span>`;
const numeral = (n, cls = "") => `<span class="numeral t-destaque ${cls}" aria-hidden="true">${String(n).padStart(2, "0")}</span>`;

export default function (c, whatsapp) {
  const { hero, duasPortas, virada, aquisicao, retencao, acompanhamento, comoComeca, perguntas, ctaFinal, cta } = c;
  const aq = hero.painel.aquisicao;
  const re = hero.painel.retencao;
  const ex = acompanhamento.exemplo;

  const corpo = `
${header(c, whatsapp)}
<main id="conteudo">

<!-- 1 · Hero -->
<section id="inicio" class="campo-tinta hero">
  <span class="glow" style="width:36rem;height:36rem;top:-8rem;right:0;opacity:.35" aria-hidden="true"></span>
  <div class="container">
    ${pilula(hero.rotulo, "texto-2 entra-hero")}
    ${titulo(hero.titulo, "h1", "t-display gigante entra-hero", ' style="--i:2"')}
    <div class="g12">
      <div class="medida col-dir">
        <p class="t-lead texto-2 entra-hero" style="--i:6">${esc(hero.paragrafo)}</p>
        <div class="acoes entra-hero" style="--i:8">
          ${botao(whatsapp, cta.rotulo)}
          <a class="link-seta" href="${hero.secundario.href}">${esc(hero.secundario.rotulo)}${use("seta-baixo")}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="faixa sangria entra-hero" style="--i:10">
    <div class="container">
      <div class="linha-wrap">
        <span class="feixe h" aria-hidden="true"></span>
        <span class="feixe v" aria-hidden="true"></span>
        <ol class="linha">
          ${aq.nos.map((n, i) => `<li ${i === 0 ? `data-grupo="${esc(aq.rotulo)}"` : ""}>${no(n.icone, n.nome)}</li>`).join("")}
          ${re.nos.map((n, i) => `<li ${i === 0 ? `data-grupo="${esc(re.rotulo)}"` : ""}>${no(n.icone, n.nome, { destino: i === re.nos.length - 1 })}</li>`).join("")}
        </ol>
      </div>
      ${cartaoCliente({ chip: hero.painel.cliente.chip, cls: "cliente" })}
    </div>
  </div>
</section>

<!-- 2 · As duas portas -->
<section id="duas-portas" class="campo-tinta">
  ${numeralG(2)}
  <div class="container">
    <div class="g12">
      <div class="col-1-8 entra">${pilula(duasPortas.rotulo, "texto-2")}${titulo(duasPortas.titulo, "h2", "t-display t-display-denso mt24 max13")}</div>
      <p class="col-9-12 t-lead texto-2 entra fim">${esc(duasPortas.abertura)}</p>
    </div>
    <div class="laje entra">
      <div class="cena-grande">
        <p class="t-rotulo texto-2">${esc(duasPortas.cenas[0].rotulo)}</p>
        <div class="mt20">${cenaChega(c)}</div>
      </div>
      <div class="textos">
        <div><p class="t-rotulo texto-2">${esc(duasPortas.cenas[0].rotulo)}</p><p class="t-corpo texto-2 mt12">${esc(duasPortas.cenas[0].texto)}</p></div>
        <div><p class="t-rotulo texto-2">${esc(duasPortas.cenas[1].rotulo)}</p><p class="t-corpo texto-2 mt12">${esc(duasPortas.cenas[1].texto)}</p></div>
      </div>
      <div class="cena-volta-wrap">${cenaVolta(c)}</div>
    </div>
    <p class="fecho t-sub medida entra">${esc(duasPortas.fecho)}</p>
  </div>
</section>

<!-- 3 · A virada -->
<section id="como-funciona" class="campo-tinta virada">
  ${numeralG(3)}
  <div class="container">
    <div class="entra">${pilula(virada.rotulo, "texto-2")}${titulo(virada.titulo, "h2", "t-display mt24 max16")}</div>
    <div class="folha campo-papel entra">
      <p class="t-lead texto-2 medida">${esc(virada.abertura)}</p>
      <div class="contraste">
        <p class="t-sub texto-2">${esc(virada.contraste.outros)}</p>
        <p class="t-sub">${esc(virada.contraste.lemis)}</p>
      </div>
      <ul class="fund">
        ${virada.fundamentos.map((f, i) => `<li>${numeral(i + 1, "n48")}<h3 class="t-sub mt16">${esc(f.nome)}</h3><p class="t-corpo texto-2 mt12">${esc(f.texto)}</p></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<!-- 4 · Aquisição -->
<section id="aquisicao" class="campo-tinta">
  ${numeralG(4)}
  <div class="container">
    <div class="g12">
      <div class="col-1-6 entra">${pilula(aquisicao.rotulo, "texto-2")}${titulo(aquisicao.titulo, "h2", "t-titulo mt24")}</div>
      <div class="col-7-12 medida entra fim">
        <p class="t-lead texto-2">${esc(aquisicao.abertura)}</p>
        <ul class="chips mt24">${aquisicao.dentro.map((d) => `<li>${chip(d)}</li>`).join("")}</ul>
        <p class="t-legenda texto-2 mt12">${esc(aquisicao.nota)}</p>
      </div>
    </div>
    <ol class="jornal entra">
      ${aquisicao.marcos.map((m, i) => `
      <li>
        ${numeral(i + 1, "n96")}
        <h3 class="t-rotulo texto-2 mt16">${esc(m.rotulo)}</h3>
        <div class="mt20">${[esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou][i](c)}</div>
      </li>`).join("")}
    </ol>
  </div>
</section>

<!-- 5 · Retenção -->
<section id="retencao" class="campo-tinta">
  <span class="numeral-g centro" aria-hidden="true">05</span>
  <span class="glow" style="width:36rem;height:36rem;top:30%;left:50%;transform:translateX(-50%);opacity:.5" aria-hidden="true"></span>
  <div class="container">
    <div class="g12 diagonal">
      <div class="col-1-6 entra">${pilula(retencao.rotulo, "texto-2")}${titulo(retencao.titulo, "h2", "t-titulo mt24")}</div>
      <p class="col-7-12 t-lead texto-2 entra fim">${esc(retencao.abertura)}</p>
      <p class="apoio t-lead texto-2 entra">${esc(retencao.apoio)}</p>
      <div class="cartao-wrap entra">${cartaoCliente({ estados: retencao.estados, grande: true, cls: "cartao-grande" })}</div>
      <p class="fecho-ret t-sub entra">${esc(retencao.fecho)}</p>
    </div>
  </div>
</section>

<!-- 6 · O que você vê -->
<section id="acompanhamento" class="campo-tinta">
  ${numeralG(6)}
  <div class="container">
    <div class="folha esquerda campo-papel entra">
      <div class="g12">
        <div class="col-1-6">${pilula(acompanhamento.rotulo, "texto-2")}${titulo(acompanhamento.titulo, "h2", "t-titulo mt24")}</div>
        <p class="col-7-12 t-lead texto-2 fim">${esc(acompanhamento.abertura)}</p>
      </div>
      <div class="g12 mt64">
        <div class="col-1-7">${painelAcompanhamento(c).replace('class="painel-acomp', 'class="painel-acomp solto grande')}</div>
        <div class="col-8-12 citacao">
          <p class="t-rotulo texto-2">${esc(ex.rotulo)}</p>
          <span class="aspas t-destaque" aria-hidden="true">“</span>
          <p class="t-sub">${esc(ex.fala)}</p>
          <p class="t-legenda texto-2 mt16">${esc(ex.nota)}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 7 · Como começa -->
<section id="como-comeca" class="campo-tinta">
  ${numeralG(7)}
  <div class="container">
    <div class="g12">
      <div class="col-1-6 entra">${pilula(comoComeca.rotulo, "texto-2")}${titulo(comoComeca.titulo, "h2", "t-titulo mt24")}</div>
      <p class="col-7-12 t-lead texto-2 entra fim">${esc(comoComeca.abertura)}</p>
      <ol class="lista-editorial col-6-12 entra">
        <span class="feixe v" aria-hidden="true"></span>
        ${comoComeca.passos.map((p, i) => `<li>${numeral(i + 1, "n120")}<div><h3 class="t-sub">${esc(p.titulo)}</h3><p class="t-corpo texto-2 mt12">${esc(p.corpo)}</p></div></li>`).join("")}
      </ol>
      <div class="col-6-12 acoes entra">${botao(whatsapp, cta.rotulo)}<p class="t-legenda texto-2">${esc(cta.nota)}</p></div>
    </div>
  </div>
</section>

<!-- 8 · Perguntas -->
<section id="perguntas" class="campo-tinta separador">
  <div class="container">
    <h2 class="t-display t-display-denso max20 entra">${esc(perguntas.titulo)}</h2>
    <div class="mt64 entra">${perguntasLista(c, "faq-largo")}</div>
  </div>
</section>

<!-- 9 · CTA -->
<section id="contato" class="campo-azul cta pontos">
  <span class="motivo" aria-hidden="true">${use("motivo-alto")}</span>
  <div class="container">
    <div class="g12">
      <div class="col-1-6">
        <h2 class="t-display t-display-denso entra">${esc(ctaFinal.titulo)}</h2>
        <p class="t-lead mt32 max39 entra">${esc(ctaFinal.apoio)}</p>
        <div class="acoes entra">${botao(whatsapp, cta.rotulo, { variante: "sobre-azul" })}<p class="t-legenda">${esc(ctaFinal.nota)}</p></div>
      </div>
    </div>
  </div>
</section>

</main>
${rodape(c, whatsapp)}
`;

  const css = `
${cssCenas}
.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}.mt24{margin-top:24px}.mt32{margin-top:32px}.mt64{margin-top:64px}
.max13{max-width:13ch}.max16{max-width:16ch}.max20{max-width:20ch}.max39{max-width:39ch}
.acoes{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;margin-top:40px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.separador{border-top:1px solid var(--fio-escuro)}

section{position:relative;overflow:clip;padding-block:var(--pad,120px)}
section > .container{position:relative;z-index:1}
#inicio{--pad:88px;padding-bottom:0;overflow:visible;z-index:2}
#duas-portas{--pad:176px 128px}
#como-funciona{--pad:144px}
#aquisicao{--pad:128px}
#retencao{--pad:160px}
#acompanhamento{--pad:0 0 128px}
#como-comeca{--pad:144px}
#perguntas{--pad:128px}
#contato{--pad:160px}
#duas-portas{padding-top:160px;padding-bottom:112px}
#acompanhamento{padding-top:0}

/* unidades de largura */
.g12{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px}
.col-1-6{grid-column:1/7}.col-1-7{grid-column:1/8}.col-1-8{grid-column:1/9}.col-7-12{grid-column:7/-1}.col-8-12{grid-column:8/-1}.col-9-12{grid-column:9/-1}.col-6-12{grid-column:6/-1}
.col-dir{grid-column:7/-1}
.fim{align-self:end}
.medida{max-width:640px}
.sangria{width:100vw;margin-left:calc(50% - 50vw)}
.folha{background:var(--papel);color:var(--tinta);border-radius:32px 0 0 32px;margin-left:calc(2/12*100%);margin-right:calc(50% - 50vw);padding:clamp(40px,5vw,80px);padding-right:calc(50vw - 50% + clamp(40px,5vw,80px))}
.folha.esquerda{border-radius:0 32px 32px 0;margin-left:calc(50% - 50vw);margin-right:calc(1/12*100%);padding-left:calc(50vw - 50% + clamp(40px,5vw,80px));padding-right:clamp(40px,5vw,80px)}
.numeral-g{position:absolute;left:-.04em;top:-.12em;font-family:var(--font-destaque);font-style:italic;font-weight:400;line-height:1;font-size:clamp(120px,15vw,220px);color:color-mix(in srgb,var(--azul) 30%,var(--tinta));pointer-events:none;user-select:none;z-index:0}
.numeral-g.centro{left:50%;top:54%;transform:translate(-50%,-50%);font-size:clamp(200px,26vw,380px);color:color-mix(in srgb,var(--azul) 22%,var(--tinta))}
.numeral{display:block;line-height:.9}
.n48{font-size:48px}.n96{font-size:96px}.n120{font-size:120px}

/* hero */
.hero h1{margin-top:24px;font-size:clamp(3rem,7.2vw,7rem);max-width:none}
.hero .g12{margin-top:40px}
.faixa{margin-top:96px;background:var(--tinta-funda);padding:64px 0 0;position:relative}
.faixa .container{position:relative}
.linha-wrap{position:relative;padding:40px 0;margin-inline:calc(50% - 50vw);padding-inline:24px}
.linha-wrap .feixe.h{position:absolute;left:0;right:0;top:50%;margin-top:-1px}
.linha .no{padding:10px 14px}
.linha .no .t-controle{font-size:.9375rem}
.linha-wrap .feixe.v{display:none}
.linha{display:flex;justify-content:space-between;align-items:center;position:relative}
.linha li{position:relative}
.linha li[data-grupo]::before{content:attr(data-grupo);position:absolute;bottom:100%;left:0;margin-bottom:14px;font-weight:600;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--secundario-escuro);white-space:nowrap}
.faixa .cliente{position:relative;z-index:2;max-width:240px;margin-top:24px;margin-bottom:-72px;margin-left:calc(2/12*100%);box-shadow:0 24px 48px -16px #000}

/* duas portas */
.laje{position:relative;margin-top:88px;background:var(--tinta-funda);border-radius:32px 0 0 32px;margin-right:calc(50% - 50vw);padding:64px 0 96px clamp(40px,5vw,72px);display:grid;grid-template-columns:7fr 5fr;column-gap:64px}
.laje .cena-grande{max-width:560px}
.laje .cena-grande .bolha{font-size:1.0625rem;padding:16px 20px;border-radius:18px}
.laje .textos{display:grid;gap:32px;align-content:start;padding-right:clamp(40px,8vw,120px);padding-top:8px}
.laje .textos p.t-corpo{max-width:40ch}
.laje .cena-volta-wrap{position:absolute;left:28%;bottom:-72px;width:360px;z-index:2}
.laje .cena-volta{box-shadow:0 30px 60px -20px #000}
#duas-portas .fecho{margin-top:128px}

/* virada */
.virada .folha{margin-top:64px}
.contraste{display:grid;grid-template-columns:1fr 1fr;margin-top:56px;padding-top:40px;border-top:1px solid var(--fio-claro)}
.contraste p:first-child{max-width:22ch;padding-right:40px}
.contraste p:last-child{max-width:26ch;padding-left:40px;border-left:1px solid var(--fio-claro)}
.fund{display:grid;grid-template-columns:repeat(3,1fr);column-gap:32px;margin-top:64px;padding-top:32px;border-top:1px solid var(--fio-claro)}
.fund p{max-width:34ch}

/* aquisição: colunas de jornal */
.jornal{display:grid;grid-template-columns:2fr 3fr 3fr 2fr;margin-top:88px;border-top:1px solid var(--fio-escuro)}
.jornal li{padding:32px 28px 0 0}
.jornal li + li{border-left:1px solid var(--fio-escuro);padding-left:28px}
.jornal .esquema,.jornal .cartao-cliente{max-width:360px}

/* retenção: diagonal de leitura */
.diagonal{row-gap:0}
.diagonal .apoio{grid-column:1/5;grid-row:2;margin-top:96px;max-width:26ch}
.diagonal .cartao-wrap{grid-column:5/9;grid-row:2/4;margin-top:96px}
.diagonal .cartao-grande{width:100%;box-shadow:0 40px 80px -30px #000}
.diagonal .fecho-ret{grid-column:9/-1;grid-row:3;align-self:end;max-width:24ch;padding-bottom:16px}

/* acompanhamento: folha à esquerda */
#acompanhamento .folha{padding-top:clamp(56px,6vw,96px);padding-bottom:clamp(56px,6vw,96px)}
.painel-acomp.solto{background:none;border:0;box-shadow:none;padding:0}
.painel-acomp.grande .indicadores dd .barra{height:20px}
.painel-acomp.grande .origens .barra{height:14px}
.citacao{position:relative;padding-top:8px}
.citacao .aspas{display:block;font-size:160px;line-height:.55;margin-top:28px;margin-bottom:-20px}
.citacao .t-sub{margin-top:16px;max-width:36ch}

/* como começa: lista editorial */
.lista-editorial{position:relative;margin-top:88px;padding-left:40px;display:grid;row-gap:48px}
.lista-editorial .feixe.v{position:absolute;left:0;top:0;bottom:0}
.lista-editorial li{display:grid;grid-template-columns:140px 1fr;column-gap:24px;align-items:start}
.lista-editorial p{max-width:44ch}
#como-comeca .acoes{margin-top:64px}

/* perguntas */
.faq-largo .detalhe summary{font-size:clamp(1.25rem,1.8vw,1.625rem);padding:28px 0}
.faq-largo .detalhe .resposta{max-width:64ch}

/* cta */
.cta .motivo{position:absolute;right:0;bottom:0;width:min(56vw,820px);color:var(--papel);pointer-events:none}
.cta .motivo svg{width:100%;height:auto}
.cta .container{min-height:520px}

@media (max-width:1023px){
  section{--pad:80px!important;padding-block:80px!important}
  #inicio{padding-bottom:0!important}
  #acompanhamento{padding-top:0!important}
  .g12{display:block}
  .g12 > * + *{margin-top:24px}
  .hero h1{font-size:clamp(2.75rem,12vw,4rem)}
  .faixa{margin-top:56px;padding-top:40px}
  .linha-wrap{padding:0 0 0 44px;margin-inline:0}
  .linha-wrap .feixe.h{display:none}
  .linha-wrap .feixe.v{display:block;position:absolute;left:20px;top:0;bottom:0}
  .linha{flex-direction:column;align-items:flex-start;gap:14px}
  .linha li[data-grupo]{margin-top:40px}
  .linha li[data-grupo]:first-child{margin-top:0}
  .faixa .cliente{margin-left:0;margin-bottom:-56px;margin-top:32px}
  .numeral-g{font-size:120px}
  .numeral-g.centro{font-size:200px}
  .laje{display:block;margin-right:calc(50% - 50vw);border-radius:24px 0 0 24px;padding:40px 24px 48px 24px;margin-top:48px}
  .laje .textos{padding:32px 0 0;grid-template-columns:1fr}
  .laje .cena-volta-wrap{position:relative;left:auto;bottom:auto;width:100%;margin-top:32px}
  #duas-portas .fecho{margin-top:56px}
  .folha,.folha.esquerda{margin-left:16px;margin-right:calc(50% - 50vw);border-radius:24px 0 0 24px;padding:40px 24px}
  .folha.esquerda{margin-left:calc(50% - 50vw);margin-right:16px;border-radius:0 24px 24px 0}
  .contraste{grid-template-columns:1fr;row-gap:24px}
  .contraste p:last-child{padding-left:24px}
  .fund{grid-template-columns:1fr;row-gap:32px}
  .jornal{grid-template-columns:1fr;margin-top:48px}
  .jornal li{padding:32px 0 32px;border-top:1px solid var(--fio-escuro)}
  .jornal li + li{border-left:0;padding-left:0}
  .jornal li:first-child{border-top:0}
  .n96{font-size:64px}.n120{font-size:72px}
  .diagonal .apoio,.diagonal .cartao-wrap,.diagonal .fecho-ret{margin-top:32px;max-width:none}
  .lista-editorial{margin-top:48px;padding-left:28px;row-gap:32px}
  .lista-editorial li{grid-template-columns:80px 1fr}
  .cta .container{min-height:0;padding-bottom:240px}
  .cta .motivo{width:100vw}
}
`;

  return { css, corpo };
}
