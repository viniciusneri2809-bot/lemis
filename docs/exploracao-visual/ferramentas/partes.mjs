// Partes comuns às três direções: sprite da marca, header, rodapé e primitivas de interface
// desenhada. Os paths SVG são os de src/components/marca/. A copy chega pronta (conteudo.ts).

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ICONES = {
  aquisicao: ["M4 5h16l-6 7v6l-4 2v-8Z", "M7 8h10"],
  atendimento: ["M5 17H3V9h2m14 8h2V9h-2M5 13V9a7 7 0 0 1 14 0v8c0 3-3 4-6 4", "M10 21h3"],
  conexao: ["M3 4v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V4", "M12 17v4"],
  criacao: ["M4 17 16 5l3 3L7 20H4Z", "m13 8 3 3M13 20h7"],
  inteligencia: ["M4 4v11a5 5 0 0 0 5 5h11M4 12h11a5 5 0 0 0 5-5V4"],
  vendas: ["M5 4h14v16l-3-2-4 2-4-2-3 2Z", "m8 11 3 3 5-6"],
};
const CIRCULOS = { conexao: [[3, 3], [21, 3]], inteligencia: [[4, 3], [21, 20], [20, 3]] };

export function sprite() {
  const icones = Object.entries(ICONES)
    .map(([nome, paths]) => `<symbol id="i-${nome}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths
      .map((d) => `<path d="${d}"/>`)
      .join("")}${(CIRCULOS[nome] ?? []).map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="1.5"/>`).join("")}</symbol>`)
    .join("");
  return `<svg style="display:none" aria-hidden="true">
<symbol id="wordmark" viewBox="0 0 368 106"><g fill="currentColor" fill-rule="evenodd"><path d="M4 4H22V75Q22 83 30 83H42V100H28Q4 100 4 76Z"/><path d="M119 70H66C68 81 75 86 86 86C94 86 101 83 107 78L117 89C109 98 98 102 85 102C61 102 47 86 47 64C47 41 62 26 83 26C106 26 119 42 119 64ZM66 57H101C99 47 93 42 83 42C74 42 68 47 66 57Z"/><path d="M132 28H149V37C154 30 161 26 170 26C181 26 190 31 194 39C200 30 208 26 220 26C239 26 249 39 249 59V100H231V61C231 49 227 43 218 43C208 43 201 50 201 62V100H183V61C183 49 179 43 170 43C159 43 150 51 150 64V100H132Z"/><path d="M266 28H284V100H266ZM266 4H284V19H266Z"/><path d="M362 36L353 49C345 44 338 41 330 41C322 41 317 44 317 49C317 54 322 56 334 59C353 63 364 68 364 81C364 95 351 102 331 102C317 102 305 98 295 90L305 77C313 84 322 87 331 87C341 87 346 85 346 80C346 75 340 73 329 71C311 67 299 62 299 49C299 35 311 26 330 26C342 26 353 30 362 36Z"/></g></symbol>
<symbol id="simbolo" viewBox="0 0 64 64"><path fill="currentColor" d="M8 6H24V36Q24 42 30 42H56V58H28Q8 58 8 38Z"/></symbol>
<symbol id="motivo" viewBox="0 0 640 320" fill="none"><path d="M40 0v180q0 60 60 60h220q60 0 60-60V60q0-40 40-40h220" stroke="currentColor" stroke-width="24"/></symbol>
<symbol id="motivo-alto" viewBox="0 0 640 1000" fill="none"><path d="M40 0V860q0 60 60 60h220q60 0 60-60V740q0-40 40-40h220" stroke="currentColor" stroke-width="24"/></symbol>
<symbol id="seta-externa" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M6 4h6v6"/></symbol>
<symbol id="seta-baixo" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v10M4 9l4 4 4-4"/></symbol>
<symbol id="seta-direita" viewBox="0 0 64 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M0 6h56M50 1l6 5-6 5"/></symbol>
${icones}
</svg>`;
}

const VIEWBOX = { wordmark: "0 0 368 106", simbolo: "0 0 64 64", motivo: "0 0 640 320", "motivo-alto": "0 0 640 1000", "seta-externa": "0 0 16 16", "seta-baixo": "0 0 16 16", "seta-direita": "0 0 64 12" };
export const use = (id, cls = "") => `<svg class="${cls}" viewBox="${VIEWBOX[id] ?? "0 0 24 24"}" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;

/** Título com uma palavra em serifa itálica azul. A frase inteira sai uma vez em sr-only. */
export function titulo(t, tag, classe, extra = "") {
  const inteiro = `${t.antes}${t.destaque}${t.depois}`;
  const antes = t.antes.trimEnd();
  const depois = t.depois.trimStart();
  return `<${tag} class="${classe}"${extra}><span class="sr-only">${esc(inteiro)}</span><span aria-hidden="true">${antes ? esc(antes) + " " : ""}<em class="t-destaque">${esc(t.destaque)}</em>${t.depois.startsWith(" ") ? " " : ""}${esc(depois)}</span></${tag}>`;
}

export const pilula = (texto, cls = "") => `<span class="pilula t-rotulo ${cls}">${esc(texto)}</span>`;
export const chip = (texto, tom = "", cls = "") => `<span class="chip t-legenda ${tom} ${cls}">${esc(texto)}</span>`;
export const barra = (largura, forte = false, cls = "") => `<span class="barra ${forte ? "forte" : ""} ${cls}" style="width:${largura}"></span>`;
export const barraVazia = (largura) => `<span class="barra vazia" style="width:${largura}"></span>`;
export const quadro = (altura, cls = "") => `<span class="quadro ${cls}" style="height:${altura}"></span>`;
export const avatar = (cls = "") => `<span class="avatar ${cls}"></span>`;

export function bolha(lado, texto, hora, cls = "") {
  const corpo = texto ? esc(texto) : `${barra("72%", true)}${barra("48%")}`;
  return `<span class="bolha ${lado} ${cls}">${corpo}${hora ? `<span class="hora">${hora}</span>` : ""}</span>`;
}

export function no(icone, nome, { destino = false, cls = "", attrs = "" } = {}) {
  return `<span class="no ${destino ? "destino feixe-borda" : ""} ${cls}" ${attrs}><span class="ladrilho">${use(`i-${icone}`)}</span><span class="t-controle">${esc(nome)}</span></span>`;
}

export function cartaoCliente({ chip: c, estados = [], tinta = false, grande = false, cls = "", attrs = "" } = {}) {
  return `<div class="cartao-cliente ${tinta ? "tinta" : ""} ${grande ? "grande" : ""} ${cls}" aria-hidden="true" ${attrs}>
  <div class="topo">${avatar()}<span>${barra("58%", true)}${barra("34%")}</span></div>
  ${estados.length ? `<ol class="estados">${estados.map((e) => `<li>${esc(e)}</li>`).join("")}</ol>` : ""}
  ${c ? chip(c, "azul") : ""}
</div>`;
}

export function botao(href, texto, { variante = "", externo = true, cls = "" } = {}) {
  return `<a class="botao ${variante} ${cls}" href="${href}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(texto)}${externo ? use("seta-externa") + '<span class="sr-only">(abre em nova aba)</span>' : ""}</a>`;
}

export function header(c, whatsapp) {
  return `<header class="header">
  <div class="barra-nav">
    <a class="wordmark" href="#inicio" aria-label="${esc(c.textosDeInterface.inicioDaPagina)}">${use("wordmark")}</a>
    <nav aria-label="${esc(c.textosDeInterface.navPrincipal)}"><ul>${c.nav.map((i) => `<li><a href="${i.href}">${esc(i.rotulo)}</a></li>`).join("")}</ul></nav>
    ${botao(whatsapp, c.cta.rotulo)}
    <button class="menu" type="button" aria-label="${esc(c.textosDeInterface.abrirMenu)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
  </div>
</header>`;
}

export function rodape(c, whatsapp) {
  const r = c.rodape;
  return `<footer class="rodape campo-tinta">
  <div class="container">
    <div class="colunas">
      <div>
        <a class="wordmark" href="#inicio" aria-label="${esc(c.textosDeInterface.voltarAoInicio)}">${use("wordmark")}</a>
        <p class="apoio t-corpo texto-2">${esc(r.apoio)}</p>
      </div>
      <nav aria-label="${esc(c.textosDeInterface.navRodape)}">
        <p class="t-rotulo texto-2">${esc(r.navegarRotulo)}</p>
        <ul>${c.nav.map((i) => `<li><a class="t-corpo" href="${i.href}">${esc(i.rotulo)}</a></li>`).join("")}</ul>
      </nav>
      <div>
        <p class="t-rotulo texto-2">${esc(r.conversarRotulo)}</p>
        <ul><li><a class="t-corpo link-seta" href="${whatsapp}" target="_blank" rel="noopener noreferrer">${esc(r.whatsappRotulo)}${use("seta-externa")}<span class="sr-only">${esc(c.textosDeInterface.abreEmNovaAba)}</span></a></li></ul>
      </div>
    </div>
    <div class="legal t-legenda texto-2">
      <p>${esc(r.razaoSocial)} · ${esc(r.cnpj)}</p>
      <p>${esc(r.endereco)}</p>
      <p class="assinatura">${esc(c.textosDeInterface.assinatura)}</p>
    </div>
  </div>
</footer>`;
}

export function documento({ titulo: t, css, corpo, script = "" }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<link rel="stylesheet" href="base.css">
<style>
${css}
</style>
</head>
<body class="campo-tinta">
${sprite()}
${corpo}
${script}
</body>
</html>
`;
}

/** Acordeão nativo das perguntas, igual nas três direções. */
export function perguntasLista(c, cls = "") {
  return `<div class="${cls}">${c.perguntas.itens
    .map(
      (item, i) => `<details class="detalhe"${i === 0 ? " open" : ""}>
  <summary><span class="n t-destaque t-destaque-claro" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><span>${esc(item.pergunta)}</span><span class="sinal" aria-hidden="true"></span></summary>
  <p class="resposta t-corpo texto-2">${esc(item.resposta)}</p>
</details>`,
    )
    .join("")}</div>`;
}

/* ---------- cenas desenhadas (o mesmo vocabulário nas três direções) ---------- */

export function cenaChega(c) {
  const e = c.duasPortas.cenas[0].esquema;
  return `<div class="cena-chega" aria-hidden="true">${bolha("recebida", e.mensagem, e.horaRecebida)}${bolha("enviada", null, e.horaEnviada)}<div class="fecho-cena">${chip(e.chip)}</div></div>`;
}

export function cenaVolta(c, { tinta = true } = {}) {
  const e = c.duasPortas.cenas[1].esquema;
  return `<div class="cena-volta cartao-cliente ${tinta ? "tinta" : ""}" aria-hidden="true">
  <div class="topo">${avatar()}<span>${barra("56%", true)}${barra("32%")}</span></div>
  <dl class="campos t-legenda texto-2"><div><dt>${esc(e.ultimaCompra)}</dt><dd>${barra("70%", true)}</dd></div><div><dt>${esc(e.voltarEm)}</dt><dd>${barraVazia("100%")}</dd></div></dl>
  ${chip(e.chip)}
</div>`;
}

export function esquemaAnuncio(c) {
  const m = c.aquisicao.marcos[0].esquema;
  return `<div class="esquema esquema-anuncio" aria-hidden="true">${quadro("88px")}${m.campos.map((campo) => `<div class="campo"><span class="t-rotulo texto-2">${esc(campo)}</span>${barra("74%", true)}</div>`).join("")}${chip(m.pilula, "azul")}</div>`;
}
export function esquemaConversa(c) {
  const m = c.aquisicao.marcos[1].esquema;
  return `<div class="esquema esquema-conversa" aria-hidden="true">${bolha("recebida", m.mensagem)}${bolha("enviada")}<div class="fecho-cena">${chip(m.chip, "azul")}</div></div>`;
}
export function esquemaCrm(c) {
  const m = c.aquisicao.marcos[2].esquema;
  return `<div class="esquema esquema-crm" aria-hidden="true">${chip(m.etapa, "azul")}${m.campos.map((campo) => `<div class="campo"><span class="t-rotulo texto-2">${esc(campo)}</span>${barra("60%", true)}</div>`).join("")}</div>`;
}
export function esquemaFechou(c, extra = {}) {
  return cartaoCliente({ chip: c.aquisicao.marcos[3].esquema.chip, ...extra });
}

export function painelAcompanhamento(c, { claro = true } = {}) {
  const p = c.acompanhamento.painel;
  const larg = ["88%", "62%", "40%"];
  return `<div class="painel-acomp ${claro ? "superficie-clara" : "superficie-escura"}" aria-hidden="true">
  <div class="topo"><span class="ponto-azul"></span>${barra("7rem")}${chip(p.chip, "azul")}</div>
  <dl class="indicadores">${p.indicadores.map((ind, i) => `<div><dt class="t-rotulo texto-2">${esc(ind)}</dt><dd>${barra(larg[i], true)}</dd></div>`).join("")}</dl>
  <div class="origens">${p.origens.map((o, i) => `<div><span class="t-legenda texto-2">${esc(o)}</span>${barra(i ? "56%" : "82%", true)}</div>`).join("")}</div>
</div>`;
}

export function conversaAcompanhamento(c) {
  const e = c.acompanhamento.exemplo;
  return `<div class="conversa-acomp">
  <span class="ladrilho-simbolo" aria-hidden="true">${use("simbolo")}</span>
  <p class="t-sub">“${esc(e.fala)}”</p>
</div>`;
}

/* CSS das cenas: entra no <style> de cada direção via `cssCenas` */
export const cssCenas = `
.cena-chega .fecho-cena, .esquema .fecho-cena { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--fio-escuro); }
.cena-volta .campos { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, currentColor 12%, transparent); }
.cena-volta .campos dd { margin-top: 8px; }
.esquema { display: flex; flex-direction: column; gap: 16px; }
.esquema .bolha.enviada { width: 86%; }
.esquema .campo { display: grid; gap: 8px; }
.esquema .chip { align-self: flex-start; }
.painel-acomp { padding: 24px; }
.painel-acomp .topo { display: flex; align-items: center; gap: 8px; }
.painel-acomp .topo .chip { margin-left: auto; }
.painel-acomp .ponto-azul { width: 8px; height: 8px; border-radius: 50%; background: var(--azul); }
.painel-acomp .indicadores { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--fio-claro); }
.painel-acomp .indicadores dd { margin-top: 12px; }
.painel-acomp .origens { display: grid; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--fio-claro); }
.painel-acomp .origens > div { display: grid; grid-template-columns: 96px 1fr; align-items: center; gap: 16px; }
.superficie-escura.painel-acomp { color: var(--branco); }
.superficie-escura.painel-acomp .indicadores, .superficie-escura.painel-acomp .origens { border-color: var(--fio-escuro); }
.conversa-acomp .ladrilho-simbolo { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 10px; background: var(--azul); color: var(--branco); }
.conversa-acomp .ladrilho-simbolo svg { width: 20px; height: 20px; }
.conversa-acomp p { margin-top: 20px; }
`;
