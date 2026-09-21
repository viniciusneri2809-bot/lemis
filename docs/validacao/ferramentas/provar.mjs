#!/usr/bin/env node
// Provas que o piso exige: movimento reduzido, teclado, foco, contraste e larguras.
// Uso: node provar.mjs http://localhost:3000
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
const saida = [];
const diz = (s) => { saida.push(s); console.log(s); };

const abrir = async (browser, { reduzido = false, vp = { width: 1440, height: 900 } } = {}) => {
  const page = await browser.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 1 });
  if (reduzido) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
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
  await new Promise((r) => setTimeout(r, 900));
  return page;
};

// ---------- contraste ----------
const lum = ([r, g, b]) => {
  const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const razao = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
try {
  // 1 · larguras
  diz("## Larguras (sem rolagem horizontal)\n");
  diz("| Janela | scrollWidth | innerWidth | rolagem |");
  diz("|---|---|---|---|");
  for (const w of [320, 390, 768, 1024, 1440, 1920]) {
    const page = await abrir(browser, { vp: { width: w, height: 800 } });
    const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
    diz(`| ${w} | ${r.sw} | ${r.iw} | ${r.sw > r.iw ? "**SIM — reprova**" : "não"} |`);
    await page.close();
  }

  // 2 · movimento reduzido
  diz("\n## Movimento reduzido (`prefers-reduced-motion: reduce`)\n");
  {
    const page = await abrir(browser, { reduzido: true });
    const r = await page.evaluate(() => {
      const invisiveis = [...document.querySelectorAll("main *, footer *")]
        .filter((e) => e.textContent?.trim() && !e.querySelector("*"))
        .filter((e) => {
          const st = getComputedStyle(e);
          return parseFloat(st.opacity) < 0.05 || st.visibility === "hidden";
        })
        .map((e) => e.tagName + ":" + e.textContent.trim().slice(0, 40));
      const feixe = document.querySelector(".feixe");
      const feixeEstilo = feixe ? getComputedStyle(feixe, "::after") : null;
      const deslocados = [...document.querySelectorAll("main *")].filter((e) => {
        const t = getComputedStyle(e).transform;
        return t && t !== "none" && !e.classList.contains("numeral-gigante-centro") && !e.closest("svg");
      }).length;
      return {
        lenis: document.documentElement.classList.contains("lenis"),
        textoInvisivel: invisiveis,
        feixeFundo: feixe ? getComputedStyle(feixe).backgroundColor : "sem feixe",
        feixePulso: feixeEstilo ? feixeEstilo.display : "—",
        elementosComTransform: deslocados,
      };
    });
    diz("| Item | Medido |");
    diz("|---|---|");
    diz(`| Lenis instanciado | \`${r.lenis}\` |`);
    diz(`| Texto em opacidade 0 | ${r.textoInvisivel.length === 0 ? "nenhum" : "**" + r.textoInvisivel.join(" · ") + "**"} |`);
    diz(`| Filete do feixe | \`${r.feixeFundo}\` (estático) |`);
    diz(`| Pulso do feixe | \`display: ${r.feixePulso}\` |`);
    diz(`| Elementos com \`transform\` em main | ${r.elementosComTransform} |`);
    await page.close();
  }

  // 3 · teclado
  diz("\n## Teclado\n");
  {
    const page = await abrir(browser);
    const ordem = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const a = await page.evaluate(() => {
        const e = document.activeElement;
        if (!e || e === document.body) return null;
        const st = getComputedStyle(e);
        return {
          rotulo: (e.getAttribute("aria-label") || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 46),
          tag: e.tagName.toLowerCase(),
          foco: st.outlineStyle !== "none" || st.outlineWidth !== "0px",
        };
      });
      if (!a) break;
      ordem.push(a);
    }
    diz(`Elementos focáveis alcançados por Tab no desktop: **${ordem.length}**.`);
    const semFoco = ordem.filter((o) => !o.foco);
    diz(`Sem indicador de foco visível: **${semFoco.length === 0 ? "nenhum" : semFoco.map((o) => o.rotulo).join(" · ")}**.`);
    diz("\nOrdem: " + ordem.map((o, i) => `${i + 1}. ${o.rotulo || o.tag}`).join(" → "));

    // menu do celular: Escape fecha e devolve o foco
    const page2 = await abrir(browser, { vp: { width: 390, height: 844, isMobile: true, hasTouch: true } });
    const menu = await page2.evaluate(async () => {
      const b = document.querySelector('button[aria-controls="menu-mobile"]');
      if (!b) return { erro: "botão de menu não encontrado" };
      b.click();
      await new Promise((r) => setTimeout(r, 400));
      const aberto = b.getAttribute("aria-expanded");
      return { aberto, painelOculto: document.getElementById("menu-mobile")?.hasAttribute("hidden") };
    });
    await page2.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 300));
    const depois = await page2.evaluate(() => {
      const b = document.querySelector('button[aria-controls="menu-mobile"]');
      return {
        expandido: b?.getAttribute("aria-expanded"),
        oculto: document.getElementById("menu-mobile")?.hasAttribute("hidden"),
        focoNoBotao: document.activeElement === b,
      };
    });
    diz(`\nMenu do celular: abre com \`aria-expanded="${menu.aberto}"\`; depois do Escape, \`aria-expanded="${depois.expandido}"\`, painel \`hidden=${depois.oculto}\`, foco de volta no botão: **${depois.focoNoBotao}**.`);
    await page.close();
    await page2.close();
  }

  // 4 · contraste de todo par texto/fundo visível
  diz("\n## Contraste\n");
  {
    const page = await abrir(browser);
    const pares = await page.evaluate(() => {
      // O Chrome devolve `color(srgb r g b / a)` para tudo que sai de `color-mix`, e
      // `rgb(r g b / a)` para o resto. Um parser só de dígitos mistura as duas escalas
      // (0–1 contra 0–255) e produz razão de contraste inventada — foi o que aconteceu na
      // primeira rodada desta medição. Aqui cada formato é lido no seu próprio espaço.
      const corDe = (s) => {
        if (!s) return null;
        let m = s.match(/^color\(srgb\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\s*\)$/);
        if (m) return { rgb: [1, 2, 3].map((i) => Math.max(0, Math.min(255, Number(m[i]) * 255))), a: m[4] === undefined ? 1 : Number(m[4]) };
        m = s.match(/^rgba?\(([^)]+)\)$/);
        if (m) {
          const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
          if (p.length < 3 || p.some(Number.isNaN)) return null;
          return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
        }
        if (s === "transparent") return { rgb: [0, 0, 0], a: 0 };
        return null;
      };
      const sobre = (frente, fundo) =>
        frente.rgb.map((c, i) => c * frente.a + fundo[i] * (1 - frente.a));
      // Empilha os fundos de baixo para cima: um campo translúcido sobre a tinta não é
      // a tinta, e ignorar isso subestima ou superestima o contraste.
      const fundoReal = (e) => {
        const pilha = [];
        let n = e;
        while (n && n !== document.documentElement) {
          const c = corDe(getComputedStyle(n).backgroundColor);
          if (c && c.a > 0) {
            pilha.push(c);
            if (c.a >= 0.999) break;
          }
          n = n.parentElement;
        }
        let base = [255, 255, 255];
        for (const c of pilha.reverse()) base = sobre(c, base);
        return base;
      };
      const vistos = new Map();
      for (const e of document.querySelectorAll("main *, footer *, header *")) {
        const txt = [...e.childNodes]
          .filter((n) => n.nodeType === 3 && n.textContent.trim())
          .map((n) => n.textContent.trim())
          .join(" ");
        if (!txt) continue;
        const st = getComputedStyle(e);
        if (st.visibility === "hidden" || st.display === "none" || parseFloat(st.opacity) < 0.05) continue;
        if (e.classList.contains("sr-only") || e.closest(".sr-only")) continue;
        const cor = corDe(st.color);
        if (!cor) continue;
        const fundo = fundoReal(e);
        const px = parseFloat(st.fontSize);
        const peso = parseInt(st.fontWeight, 10) || 400;
        const grande = px >= 24 || (px >= 18.66 && peso >= 700);
        // Interface desenhada é decorativa por definição (`aria-hidden`), não carrega
        // informação e por isso a norma não a cobre. Continua medida, em tabela separada.
        const desenho = !!e.closest('[aria-hidden="true"]');
        const chave = `${st.color}|${fundo.map(Math.round).join(",")}|${grande}|${desenho}`;
        if (!vistos.has(chave))
          vistos.set(chave, { rgb: sobre(cor, fundo), fundo, px: Math.round(px), peso, grande, desenho, exemplo: txt.slice(0, 40) });
      }
      return [...vistos.values()];
    });
    const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
    let reprova = 0;
    for (const [titulo, lista] of [
      ["Texto real", pares.filter((p) => !p.desenho)],
      ["Interface desenhada (`aria-hidden`, fora do escopo da norma — medida mesmo assim)", pares.filter((p) => p.desenho)],
    ]) {
      diz(`\n### ${titulo}\n`);
      diz("| Exemplo | Corpo | Peso | Texto | Fundo | Razão | Mínimo | |");
      diz("|---|---|---|---|---|---|---|---|");
      for (const p of lista.sort((a, b) => razao(a.rgb, a.fundo) - razao(b.rgb, b.fundo))) {
        const r = razao(p.rgb, p.fundo);
        const min = p.grande ? 3 : 4.5;
        const ok = r >= min - 0.005;
        if (!ok && !p.desenho) reprova++;
        diz(`| ${p.exemplo} | ${p.px}px | ${p.peso} | ${hex(p.rgb)} | ${hex(p.fundo)} | ${r.toFixed(2)}:1 | ${min}:1 | ${ok ? "ok" : "**REPROVA**"} |`);
      }
    }
    diz(`\nPares medidos: ${pares.length}. **Reprovados em texto real: ${reprova}.**`);
    await page.close();
  }
} finally {
  await browser.close();
}
writeFileSync(join(aqui, "../b/provas.md"), "# Provas da home v2 na direção B\n\n" + saida.join("\n") + "\n");
