// Direção C · Palco. O funil desenhado é o protagonista: um painel fixo (à direita no desktop,
// preso na base da tela no celular) troca de cena enquanto o texto das seis primeiras seções rola.
// Uma caixa só na primeira metade da página. O único JS da entrega troca o `data-estado`.
import {
  esc, use, titulo, pilula, chip, botao, header, rodape, perguntasLista,
  cenaChega, cenaVolta, esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou,
  painelAcompanhamento, conversaAcompanhamento, cartaoCliente, no, cssCenas,
} from "../partes.mjs";

const numeral = (n, cls = "") => `<span class="numeral t-destaque ${cls}" aria-hidden="true">${String(n).padStart(2, "0")}</span>`;

export default function (c, whatsapp) {
  const { hero, duasPortas, virada, aquisicao, retencao, acompanhamento, comoComeca, perguntas, ctaFinal, cta } = c;
  const aq = hero.painel.aquisicao;
  const re = hero.painel.retencao;

  const cenaFunil = `
  <div class="cena cena-funil" data-cena="funil" aria-hidden="true">
    <div class="funil">
      <span class="trilho feixe v" aria-hidden="true"></span>
      <p class="rot rot-aq t-rotulo texto-2">${esc(aq.rotulo)}</p>
      <ol class="aq">${aq.nos.map((n, i) => `<li class="n${i + 1} ${i === aq.nos.length - 1 ? "vira" : ""}">${numeral(i + 1, "n-no")}${no(n.icone, n.nome, { attrs: `data-no="${i + 1}"` })}</li>`).join("")}</ol>
      <p class="rot rot-re t-rotulo texto-2">${esc(re.rotulo)}</p>
      <ol class="re">${re.nos.map((n, i) => `<li class="n${i + 1} ${i === 0 ? "recebe" : ""}">${no(n.icone, n.nome, { destino: i === re.nos.length - 1, attrs: `data-no="r${i + 1}"` })}</li>`).join("")}</ol>
      ${cartaoCliente({ chip: hero.painel.cliente.chip, cls: "cliente" })}
    </div>
  </div>`;

  const cenaPortas = `
  <div class="cena cena-portas" data-cena="portas" aria-hidden="true">
    <div class="duas">
      <div><p class="t-rotulo texto-2">${esc(duasPortas.cenas[0].rotulo)}</p><div class="mt16">${cenaChega(c)}</div></div>
      <div><p class="t-rotulo texto-2">${esc(duasPortas.cenas[1].rotulo)}</p><div class="mt16">${cenaVolta(c)}</div></div>
    </div>
  </div>`;

  const cenaAquisicao = `
  <div class="cena cena-aquisicao" data-cena="aquisicao" aria-hidden="true">
    <ol class="marcos">
      ${aquisicao.marcos.map((m, i) => `<li><span class="marco"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="traco"></span></span><p class="t-rotulo texto-2 mt12">${esc(m.rotulo)}</p><div class="mt12">${[esquemaAnuncio, esquemaConversa, esquemaCrm, esquemaFechou][i](c)}</div></li>`).join("")}
    </ol>
  </div>`;

  const cenaRetencao = `
  <div class="cena cena-retencao" data-cena="retencao" aria-hidden="true">
    <div class="pilha">
      <span class="fantasma f2"></span><span class="fantasma f1"></span>
      ${cartaoCliente({ estados: retencao.estados, grande: true, cls: "principal" })}
    </div>
  </div>`;

  const cenaPainel = `
  <div class="cena cena-painel" data-cena="painel" aria-hidden="true">
    ${painelAcompanhamento(c)}
  </div>`;

  const corpo = `
${header(c, whatsapp)}
<main id="conteudo">

<section class="palco campo-tinta" data-estado="inicio">
  <div class="laminas">

    <article class="lamina" id="inicio" data-estado="inicio">
      ${pilula(hero.rotulo, "texto-2 entra-hero")}
      ${titulo(hero.titulo, "h1", "t-display t-display-denso mt24 entra-hero", ' style="--i:2"')}
      <p class="t-lead texto-2 mt24 entra-hero" style="--i:6">${esc(hero.paragrafo)}</p>
      <div class="acoes entra-hero" style="--i:8">
        ${botao(whatsapp, cta.rotulo)}
        <a class="link-seta" href="${hero.secundario.href}">${esc(hero.secundario.rotulo)}${use("seta-baixo")}</a>
      </div>
    </article>

    <article class="lamina" id="duas-portas" data-estado="portas">
      ${pilula(duasPortas.rotulo, "texto-2")}
      ${titulo(duasPortas.titulo, "h2", "t-titulo mt24")}
      <p class="t-lead texto-2 mt20">${esc(duasPortas.abertura)}</p>
      <div class="cenas-texto mt32">
        ${duasPortas.cenas.map((cena) => `<div><p class="t-rotulo texto-2">${esc(cena.rotulo)}</p><p class="t-corpo texto-2 mt8">${esc(cena.texto)}</p></div>`).join("")}
      </div>
      <p class="t-sub mt32">${esc(duasPortas.fecho)}</p>
    </article>

    <article class="lamina" id="como-funciona" data-estado="caminho">
      ${pilula(virada.rotulo, "texto-2")}
      ${titulo(virada.titulo, "h2", "t-titulo mt24")}
      <p class="t-lead texto-2 mt20">${esc(virada.abertura)}</p>
      <div class="contraste mt32">
        <p class="t-sub texto-2">${esc(virada.contraste.outros)}</p>
        <p class="t-sub">${esc(virada.contraste.lemis)}</p>
      </div>
      <ul class="fund mt32">
        ${virada.fundamentos.map((f, i) => `<li>${numeral(i + 1, "n40")}<div><h3 class="t-controle">${esc(f.nome)}</h3><p class="t-legenda texto-2 mt4">${esc(f.texto)}</p></div></li>`).join("")}
      </ul>
    </article>

    <article class="lamina" id="aquisicao" data-estado="aquisicao">
      ${pilula(aquisicao.rotulo, "texto-2")}
      ${titulo(aquisicao.titulo, "h2", "t-titulo mt24")}
      <p class="t-lead texto-2 mt20">${esc(aquisicao.abertura)}</p>
      <ul class="chips mt24">${aquisicao.dentro.map((d) => `<li>${chip(d)}</li>`).join("")}</ul>
      <p class="t-legenda texto-2 mt12">${esc(aquisicao.nota)}</p>
      <ol class="marcos-texto mt32">${aquisicao.marcos.map((m, i) => `<li>${numeral(i + 1, "n40")}<span class="t-controle">${esc(m.rotulo)}</span></li>`).join("")}</ol>
    </article>

    <article class="lamina" id="retencao" data-estado="retencao">
      ${pilula(retencao.rotulo, "texto-2")}
      ${titulo(retencao.titulo, "h2", "t-titulo mt24")}
      <p class="t-lead texto-2 mt20">${esc(retencao.abertura)}</p>
      <p class="t-corpo texto-2 mt24">${esc(retencao.apoio)}</p>
      <p class="t-sub mt24">${esc(retencao.fecho)}</p>
    </article>

    <article class="lamina" id="acompanhamento" data-estado="painel">
      ${pilula(acompanhamento.rotulo, "texto-2")}
      ${titulo(acompanhamento.titulo, "h2", "t-titulo mt24")}
      <p class="t-lead texto-2 mt20">${esc(acompanhamento.abertura)}</p>
      <p class="t-rotulo texto-2 mt32">${esc(acompanhamento.exemplo.rotulo)}</p>
      <div class="mt12 conversa-compacta">${conversaAcompanhamento(c)}</div>
      <p class="t-legenda texto-2 mt12">${esc(acompanhamento.exemplo.nota)}</p>
    </article>

  </div>

  <div class="painel-fixo">
    <div class="painel pontos">
      <span class="glow" style="width:24rem;height:24rem;right:-8rem;bottom:-8rem;opacity:.7" aria-hidden="true"></span>
      ${cenaFunil}${cenaPortas}${cenaAquisicao}${cenaRetencao}${cenaPainel}
      <ol class="indicador" aria-hidden="true"><li data-e="inicio"></li><li data-e="portas"></li><li data-e="caminho"></li><li data-e="aquisicao"></li><li data-e="retencao"></li><li data-e="painel"></li></ol>
    </div>
  </div>
</section>

<!-- 7 · Como começa -->
<section id="como-comeca" class="campo-papel">
  <div class="container">
    <div class="g12">
      <div class="col-1-6 entra">${pilula(comoComeca.rotulo, "texto-2")}${titulo(comoComeca.titulo, "h2", "t-titulo mt24")}</div>
      <p class="col-7-12 t-lead texto-2 entra fim">${esc(comoComeca.abertura)}</p>
    </div>
    <ol class="passos entra">
      ${comoComeca.passos.map((p, i) => `<li>${numeral(i + 1, "n96")}<h3 class="t-sub mt16">${esc(p.titulo)}</h3><p class="t-corpo texto-2 mt12">${esc(p.corpo)}</p></li>`).join("")}
    </ol>
    <div class="acoes entra">${botao(whatsapp, cta.rotulo)}<p class="t-legenda texto-2">${esc(cta.nota)}</p></div>
  </div>
</section>

<!-- 8 · Perguntas -->
<section id="perguntas" class="campo-tinta">
  <div class="container g12">
    <h2 class="t-titulo col-1-5 fixo entra">${esc(perguntas.titulo)}</h2>
    <div class="col-7-12 entra">${perguntasLista(c)}</div>
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

  const script = `<script>
  // Troca a cena do painel conforme a lâmina mais visível. Sem JS, o painel fica em "inicio".
  (function () {
    var palco = document.querySelector(".palco");
    var laminas = Array.prototype.slice.call(document.querySelectorAll(".lamina"));
    var visivel = new Map();
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visivel.set(e.target, e.intersectionRatio); });
      var melhor = null, r = 0;
      visivel.forEach(function (v, k) { if (v > r) { r = v; melhor = k; } });
      if (melhor) palco.dataset.estado = melhor.dataset.estado;
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], rootMargin: "-20% 0px -20% 0px" });
    laminas.forEach(function (l) { io.observe(l); });
  })();
</script>`;

  const css = `
${cssCenas}
.mt4{margin-top:4px}.mt8{margin-top:8px}.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}.mt24{margin-top:24px}.mt32{margin-top:32px}
.max39{max-width:39ch}
.acoes{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;margin-top:40px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.numeral{display:block;line-height:.9}
.n40{font-size:40px}.n96{font-size:96px}
.g12{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px}
.col-1-5{grid-column:1/6}.col-1-6{grid-column:1/7}.col-7-12{grid-column:7/-1}
.fim{align-self:end}
section{position:relative;overflow:clip}

/* ---------- o palco ---------- */
.palco{display:grid;grid-template-columns:5fr 7fr;column-gap:48px;padding-inline:clamp(20px,4vw,64px);max-width:1408px;margin-inline:auto;overflow:visible}
.laminas{grid-column:1}
.lamina{min-height:calc(100svh - 96px);display:flex;flex-direction:column;justify-content:center;padding-block:48px;scroll-margin-top:96px}
.lamina h1{max-width:12ch}
.lamina h2{max-width:16ch}
.lamina p.t-lead{max-width:44ch}
.cenas-texto{display:grid;gap:16px}
.cenas-texto p.t-corpo{max-width:44ch}
.contraste{display:grid;gap:12px;padding-top:24px;border-top:1px solid var(--fio-escuro)}
.contraste p{max-width:30ch}
.fund{display:grid;gap:16px}
.fund li{display:grid;grid-template-columns:56px 1fr;column-gap:12px;align-items:start}
.marcos-texto{display:grid;gap:10px}
.marcos-texto li{display:flex;align-items:center;gap:14px}
.conversa-compacta .t-sub{font-size:1.125rem}

.painel-fixo{grid-column:2;position:sticky;top:96px;align-self:start;height:calc(100svh - 120px);padding-bottom:0}
.painel{position:relative;height:100%;border-radius:24px;overflow:hidden;background:var(--superficie-escura);border:1px solid color-mix(in srgb,var(--branco) 12%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--branco) 6%,transparent),0 40px 80px -30px #000}
.painel.pontos{color:var(--branco)}
.cena{position:absolute;inset:0;display:grid;place-items:center;padding:40px;opacity:0;transform:translateY(12px);transition:opacity .55s var(--ease),transform .55s var(--ease);pointer-events:none}
.palco[data-estado="inicio"] .cena-funil,.palco[data-estado="caminho"] .cena-funil,
.palco[data-estado="portas"] .cena-portas,.palco[data-estado="aquisicao"] .cena-aquisicao,
.palco[data-estado="retencao"] .cena-retencao,.palco[data-estado="painel"] .cena-painel{opacity:1;transform:none}
.indicador{position:absolute;right:20px;top:20px;display:flex;gap:6px}
.indicador li{width:6px;height:6px;border-radius:50%;background:color-mix(in srgb,var(--branco) 20%,transparent);transition:background .3s}
.palco[data-estado="inicio"] .indicador [data-e="inicio"],.palco[data-estado="portas"] .indicador [data-e="portas"],.palco[data-estado="caminho"] .indicador [data-e="caminho"],.palco[data-estado="aquisicao"] .indicador [data-e="aquisicao"],.palco[data-estado="retencao"] .indicador [data-e="retencao"],.palco[data-estado="painel"] .indicador [data-e="painel"]{background:var(--azul)}

/* cena: funil (o gesto do "l") */
.funil{position:relative;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:76px;align-items:center;width:100%;max-width:640px}
.funil .trilho{position:absolute;left:50%;top:60px;bottom:40px;margin-left:-1px}
.funil ol{display:contents}
.funil li{position:relative;display:flex;align-items:center;gap:12px}
.funil .aq li{grid-column:1;justify-content:flex-end;padding-right:40px}
.funil .re li{grid-column:2;padding-left:40px}
.funil .rot{grid-row:1;align-self:end;padding-bottom:8px}
.funil .rot-aq{grid-column:1;justify-self:end;padding-right:40px}
.funil .rot-re{grid-column:2;grid-row:4;padding-left:40px}
.funil .aq .n1{grid-row:2}.funil .aq .n2{grid-row:3}.funil .aq .n3{grid-row:4}.funil .aq .n4{grid-row:5}
.funil .re .n1{grid-row:5}.funil .re .n2{grid-row:6}.funil .re .n3{grid-row:7}
.funil li::after{content:"";position:absolute;top:50%;height:1px;width:40px;background:var(--fio-escuro)}
.funil .aq li::after{right:0}.funil .re li::after{left:0}
.funil .vira::after,.funil .recebe::after{height:2px;margin-top:-1px;background:var(--azul)}
.funil .cliente{grid-column:1;grid-row:6/8;justify-self:end;margin-right:-24px;max-width:220px;z-index:2;transition:opacity .4s}
.funil .n-no{font-size:28px;opacity:0;transition:opacity .4s;width:0;overflow:visible;margin-right:-4px}
.funil .no{transition:opacity .45s var(--ease),border-color .45s var(--ease),box-shadow .45s var(--ease)}
.palco[data-estado="caminho"] .funil .no{border-color:color-mix(in srgb,var(--azul) 55%,transparent);box-shadow:0 0 0 1px color-mix(in srgb,var(--azul) 25%,transparent),0 24px 60px -30px #000}
.palco[data-estado="caminho"] .funil .cliente{opacity:0}
.palco[data-estado="caminho"] .funil .trilho{background:var(--azul)}

/* cena: portas */
.duas{display:grid;grid-template-columns:1fr 1fr;gap:32px;width:100%;max-width:640px;align-items:start}
.duas > div{min-width:0}
.duas .cena-chega{padding:20px;border-radius:16px;background:color-mix(in srgb,var(--branco) 3%,transparent);border:1px solid var(--fio-escuro)}

/* cena: aquisição (quatro marcos, 2×2) */
.marcos{display:grid;grid-template-columns:1fr 1fr;gap:20px 28px;width:100%;max-width:640px}
.marcos .esquema,.marcos .cartao-cliente{padding:16px;border-radius:14px}
.marcos .esquema{background:color-mix(in srgb,var(--branco) 3%,transparent);border:1px solid var(--fio-escuro)}
.marcos .esquema .quadro{height:56px}
.marcos .marco .n{font-size:32px}

/* cena: retenção */
.pilha{position:relative;width:min(100%,400px)}
.pilha .principal{position:relative;z-index:2}
.fantasma{position:absolute;inset:0;background:color-mix(in srgb,var(--branco) 6%,var(--tinta));border:1px solid var(--fio-escuro);border-radius:16px}
.fantasma.f1{transform:translate(-14px,-14px) scale(.97)}
.fantasma.f2{transform:translate(-28px,-28px) scale(.94);opacity:.7}

/* cena: painel de acompanhamento */
.cena-painel .painel-acomp{width:min(100%,560px);color:var(--tinta)}

/* ---------- seções 7 a 9 ---------- */
#como-comeca,#perguntas,#contato{padding-block:128px}
#como-comeca{border-top:1px solid var(--fio-claro)}
.passos{display:grid;grid-template-columns:repeat(3,1fr);margin-top:72px;border-top:1px solid var(--fio-claro)}
.passos li{padding:32px 32px 0 0}
.passos li + li{border-left:1px solid var(--fio-claro);padding-left:32px}
.passos p{max-width:38ch}
#como-comeca .acoes{margin-top:64px}
.fixo{position:sticky;top:112px;align-self:start;max-width:16ch}
.cta .motivo{position:absolute;right:0;bottom:0;width:min(56vw,820px);color:var(--papel);pointer-events:none}
.cta .motivo svg{width:100%;height:auto}
.cta .container{position:relative;z-index:1;min-height:520px}

/* ---------- celular: o painel prende na base da tela ---------- */
@media (max-width:1023px){
  .palco{display:block;padding-inline:20px}
  .lamina{min-height:auto;padding-block:56px 32px;justify-content:flex-start}
  .lamina:first-child{padding-top:32px}
  .laminas{padding-bottom:0}
  .painel-fixo{position:sticky;bottom:0;top:auto;height:44svh;z-index:5;margin-inline:-20px;padding:0}
  .painel{border-radius:20px 20px 0 0;border-bottom:0}
  .cena{padding:20px 16px 16px}
  .funil{grid-auto-rows:44px;max-width:none;font-size:13px}
  .funil .no{padding:6px 10px;gap:8px;border-radius:10px}
  .funil .no .t-controle{font-size:.8125rem}
  .funil .no .ladrilho{width:26px;height:26px;border-radius:7px}
  .funil .no .ladrilho svg{width:16px;height:16px}
  .funil .aq li{padding-right:20px}.funil .re li{padding-left:20px}
  .funil li::after{width:20px}
  .funil .rot-aq{padding-right:20px}.funil .rot-re{padding-left:20px}
  .funil .cliente{max-width:150px;margin-right:-8px;padding:10px}
  .funil .cliente .chip{margin-top:8px;font-size:11px;padding:2px 8px}
  .funil .trilho{top:36px;bottom:20px}
  .duas{gap:12px}
  .duas .cena-chega{padding:12px}
  .duas .bolha{font-size:12px;padding:8px 10px}
  .duas .t-rotulo{font-size:.625rem}
  .cena-volta.cartao-cliente{padding:12px;font-size:12px}
  .cena-volta .campos{margin-top:10px;padding-top:8px;gap:8px;grid-template-columns:1fr}
  .cena-volta .chip{font-size:11px;padding:2px 8px}
  .cena-volta .topo{gap:8px}
  .cena-volta .avatar{width:24px;height:24px}
  .marcos{gap:10px 12px}
  .marcos .marco .n{font-size:22px}
  .marcos .esquema,.marcos .cartao-cliente{padding:10px;font-size:12px}
  .marcos .esquema{gap:8px}
  .marcos .esquema .quadro{height:28px}
  .marcos .t-rotulo{font-size:.625rem;margin-top:6px}
  .marcos .chip{font-size:11px;padding:2px 8px}
  .marcos .bolha{font-size:11px;padding:6px 8px}
  .marcos .esquema .fecho-cena{margin-top:8px;padding-top:8px}
  .pilha{width:min(100%,300px)}
  .cartao-cliente.grande{padding:16px 18px}
  .cena-painel .painel-acomp{padding:14px;font-size:12px}
  .cena-painel .painel-acomp .indicadores,.cena-painel .painel-acomp .origens{margin-top:12px;padding-top:12px}
  .g12{display:block}
  .g12 > * + *{margin-top:24px}
  #como-comeca,#perguntas,#contato{padding-block:80px}
  .passos{grid-template-columns:1fr;margin-top:40px}
  .passos li{padding:24px 0}
  .passos li + li{border-left:0;padding-left:0;border-top:1px solid var(--fio-claro)}
  .n96{font-size:64px}
  .fixo{position:static;max-width:none}
  .cta .container{min-height:0;padding-bottom:240px}
  .cta .motivo{width:100vw}
}
@media (prefers-reduced-motion:reduce){.cena,.funil .no,.funil .cliente,.indicador li{transition:none!important}}
`;

  return { css, corpo, script };
}
