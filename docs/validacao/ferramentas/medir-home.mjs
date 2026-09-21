#!/usr/bin/env node
// Mede a home construída com o mesmo critério da exploração visual, para a tabela antes/depois
// poder ser comparada linha a linha. Uso: node medir-home.mjs http://localhost:3000
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const require = createRequire(join(raiz, "package.json"));
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2] || "http://localhost:3000";

// Mesmo corpo de `docs/exploracao-visual/ferramentas/medir.mjs`, com os seletores da home real
// somados aos do protótipo, para os dois lados da comparação usarem a mesma régua.
function medirNaPagina() {
  const blocos = [...document.querySelectorAll("main > section, footer")];
  const cabecas = blocos.filter((s) => {
    const pil = s.querySelector(".t-rotulo.inline-flex, .pilula");
    const h = s.querySelector("h1, h2");
    const lead = s.querySelector("p.t-lead");
    if (!pil || !h || !lead) return false;
    const hr = h.getBoundingClientRect();
    const lr = lead.getBoundingClientRect();
    return lr.left > hr.left + 100 && Math.abs(lr.top - hr.top) < 400;
  }).length;
  const ehCard = (e) => {
    const st = getComputedStyle(e);
    const b = e.getBoundingClientRect();
    const borda = ["Top", "Right", "Bottom", "Left"].every(
      (l) => parseFloat(st[`border${l}Width`]) > 0 && st[`border${l}Style`] !== "none",
    );
    return borda && parseFloat(st.borderRadius) >= 8 && b.width > 120 && b.height > 60;
  };
  const todos = [...document.querySelectorAll("main *")].filter((e) => !e.closest("svg") && ehCard(e));
  const topo = todos.filter((e) => !todos.some((o) => o !== e && o.contains(e)));
  const larguras = new Set();
  document
    .querySelectorAll(".mx-auto.w-full, .medida, .folha, .laje, .sangria, .jornal > li, .lista-editorial")
    .forEach((c) => {
      const cs = getComputedStyle(c);
      const r = c.getBoundingClientRect();
      const w = Math.round(r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
      if (w > 200) larguras.add(w);
    });
  let sangria = 0;
  blocos.forEach((s) => {
    const c = s.querySelector(".mx-auto.w-full") || s;
    const cr = c.getBoundingClientRect();
    const cs = getComputedStyle(c);
    const l = cr.left + parseFloat(cs.paddingLeft);
    const r = cr.right - parseFloat(cs.paddingRight);
    sangria += [...s.querySelectorAll("*")].filter((e) => {
      if (e.closest("svg") || e === c) return false;
      const st = getComputedStyle(e);
      if (st.position === "absolute" || st.position === "fixed") return false;
      const b = e.getBoundingClientRect();
      return b.width > 40 && b.height > 8 && (b.left < l - 2 || b.right > r + 2);
    }).length;
  });
  const pads = new Set(
    blocos.map((s) => {
      const c = s.querySelector(".mx-auto.w-full") || s;
      const cs = getComputedStyle(c);
      const ss = getComputedStyle(s);
      return `${Math.round(parseFloat(cs.paddingTop) + parseFloat(ss.paddingTop))}/${Math.round(
        parseFloat(cs.paddingBottom) + parseFloat(ss.paddingBottom),
      )}`;
    }),
  );
  const campos = new Set(blocos.map((s) => getComputedStyle(s).backgroundColor));
  return {
    blocos: blocos.length,
    cabecasIguais: cabecas,
    cards: topo.length,
    larguras: [...larguras].sort((a, b) => a - b).join(" "),
    nLarguras: larguras.size,
    sangria,
    ritmos: pads.size,
    ritmosLista: [...pads].join(" · "),
    campos: campos.size,
    altura: document.documentElement.scrollHeight,
    rolagemH: document.documentElement.scrollWidth > innerWidth ? "sim" : "não",
    nos: document.querySelectorAll("main *").length,
  };
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--hide-scrollbars"],
});
const linhas = [];
try {
  for (const [disp, vp] of [
    ["desktop 1440", { width: 1440, height: 900 }],
    ["celular 390", { width: 390, height: 844, isMobile: true, hasTouch: true }],
    ["celular 320", { width: 320, height: 720, isMobile: true, hasTouch: true }],
  ]) {
    const page = await browser.newPage();
    await page.setViewport({ ...vp, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const passo = 600;
      for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 800));
    linhas.push([disp, await page.evaluate(medirNaPagina)]);
    await page.close();
  }
} finally {
  await browser.close();
}

const md = [
  "# Medição da home v2 na direção B",
  "",
  "| Medida | " + linhas.map(([d]) => d).join(" | ") + " |",
  "|---|" + linhas.map(() => "---|").join(""),
  ...[
    ["Blocos (seções + rodapé)", "blocos"],
    ["Cabeçalhos iguais (pílula + título + lead ao lado)", "cabecasIguais"],
    ["Cards retangulares de topo", "cards"],
    ["Larguras distintas", "nLarguras"],
    ["Quais larguras", "larguras"],
    ["Elementos que cruzam o container", "sangria"],
    ["Ritmos verticais distintos", "ritmos"],
    ["Quais ritmos", "ritmosLista"],
    ["Campos distintos", "campos"],
    ["Altura", "altura"],
    ["Rolagem horizontal", "rolagemH"],
    ["Nós no DOM dentro de main", "nos"],
  ].map(([rot, k]) => `| ${rot} | ` + linhas.map(([, v]) => v[k]).join(" | ") + " |"),
  "",
].join("\n");
writeFileSync(join(aqui, "../b/medicao.md"), md);
console.log(md);
