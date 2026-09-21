#!/usr/bin/env node
// Repete nos protótipos a medição feita na home atual: blocos, esqueleto repetido, cards
// retangulares, larguras de container, sangria, ritmo vertical, altura, rolagem horizontal.
// Escreve capturas/medicao.md. Uso: node medir.mjs [url-da-home-atual]
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const require = createRequire(join(raiz, "package.json"));
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pasta = join(aqui, "..");
const homeAtual = process.argv[2] || "http://localhost:3000";

const ALVOS = [
  ["Home atual (preview)", homeAtual],
  ["A · Trilho", pathToFileURL(join(pasta, "a-trilho.html")).href],
  ["B · Editorial", pathToFileURL(join(pasta, "b-editorial.html")).href],
  ["C · Palco", pathToFileURL(join(pasta, "c-palco.html")).href],
];

function medirNaPagina() {
  const blocos = [...document.querySelectorAll("main > section, main > .palco, footer")];
  const lamina = [...document.querySelectorAll(".lamina")];
  const unidades = blocos.length + lamina.length; // no palco, cada lâmina é um bloco de leitura
  const cabecas = [...blocos, ...lamina].filter((s) => {
    const pil = s.querySelector(".pilula, .t-rotulo.inline-flex");
    const h = s.querySelector(":scope h1, :scope h2, :scope > * h2");
    const lead = s.querySelector("p.t-lead");
    if (!pil || !h || !lead) return false;
    const hr = h.getBoundingClientRect(), lr = lead.getBoundingClientRect();
    return lr.left > hr.left + 100 && Math.abs(lr.top - hr.top) < 400; // lead à direita do título
  }).length;
  const ehCard = (e) => {
    const st = getComputedStyle(e); const b = e.getBoundingClientRect();
    const borda = ["Top", "Right", "Bottom", "Left"].every((l) => parseFloat(st[`border${l}Width`]) > 0 && st[`border${l}Style`] !== "none");
    return borda && parseFloat(st.borderRadius) >= 8 && b.width > 120 && b.height > 60;
  };
  const todos = [...document.querySelectorAll("main *")].filter((e) => !e.closest("svg") && ehCard(e));
  const topo = todos.filter((e) => !todos.some((o) => o !== e && o.contains(e)));
  const raios = new Set(topo.map((e) => getComputedStyle(e).borderRadius));
  const larguras = new Set();
  document.querySelectorAll(".container, .mx-auto.w-full, .medida, .folha, .laje, .sangria, .lamina, .painel-fixo").forEach((c) => {
    const cs = getComputedStyle(c); const r = c.getBoundingClientRect();
    const w = Math.round(r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
    if (w > 200) larguras.add(w);
  });
  let sangria = 0;
  blocos.forEach((s) => {
    const c = s.querySelector(".container, .mx-auto.w-full") || s;
    const cr = c.getBoundingClientRect(); const cs = getComputedStyle(c);
    const l = cr.left + parseFloat(cs.paddingLeft), r = cr.right - parseFloat(cs.paddingRight);
    sangria += [...s.querySelectorAll("*")].filter((e) => {
      if (e.closest("svg") || e === c) return false;
      const st = getComputedStyle(e); if (st.position === "absolute" || st.position === "fixed") return false;
      const b = e.getBoundingClientRect(); return b.width > 40 && b.height > 8 && (b.left < l - 2 || b.right > r + 2);
    }).length;
  });
  const pads = new Set(blocos.map((s) => { const c = s.querySelector(".container, .mx-auto.w-full") || s; const cs = getComputedStyle(c); const ss = getComputedStyle(s); return `${Math.round(parseFloat(cs.paddingTop) + parseFloat(ss.paddingTop))}/${Math.round(parseFloat(cs.paddingBottom) + parseFloat(ss.paddingBottom))}`; }));
  const campos = new Set(blocos.map((s) => getComputedStyle(s).backgroundColor + "|" + getComputedStyle(s).backgroundImage.slice(0, 40)));
  return {
    blocos: blocos.length, unidades, cabecasIguais: cabecas, cards: topo.length, raios: [...raios].join(" "),
    larguras: [...larguras].sort((a, b) => a - b).join(" "), nLarguras: larguras.size, sangria,
    ritmos: pads.size, campos: campos.size,
    altura: document.documentElement.scrollHeight, rolagemH: document.documentElement.scrollWidth > innerWidth ? "sim" : "não",
  };
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files", "--hide-scrollbars"] });
const linhas = [];
try {
  for (const [nome, url] of ALVOS) {
    for (const [disp, vp] of [["desktop 1440", { width: 1440, height: 900 }], ["celular 390", { width: 390, height: 844, isMobile: true, hasTouch: true }]]) {
      const page = await browser.newPage();
      await page.setViewport({ ...vp, deviceScaleFactor: 1 });
      try {
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise((r) => setTimeout(r, 800));
        const m = await page.evaluate(medirNaPagina);
        linhas.push({ nome, disp, ...m });
      } catch (e) {
        linhas.push({ nome, disp, erro: e.message.slice(0, 60) });
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const cab = "| Página | Tela | Blocos (unid. de leitura) | Cabeçalhos iguais (pílula + título + lead à direita) | Cards de topo | Raios | Larguras distintas | Elementos que cruzam o container | Ritmos verticais | Campos distintos | Altura | Rolagem horizontal |";
const sep = "|---|---|---|---|---|---|---|---|---|---|---|---|";
const md = [cab, sep, ...linhas.map((l) => l.erro ? `| ${l.nome} | ${l.disp} | erro: ${l.erro} |||||||||||` : `| ${l.nome} | ${l.disp} | ${l.blocos} (${l.unidades}) | ${l.cabecasIguais} | ${l.cards} | ${l.raios || "—"} | ${l.nLarguras} (${l.larguras}) | ${l.sangria} | ${l.ritmos} | ${l.campos} | ${l.altura} px | ${l.rolagemH} |`)].join("\n");
writeFileSync(join(pasta, "capturas", "medicao.md"), `# Medição\n\nGerado por \`ferramentas/medir.mjs\` em ${new Date().toISOString().slice(0, 16).replace("T", " ")}.\n\n${md}\n`);
console.log(md);
