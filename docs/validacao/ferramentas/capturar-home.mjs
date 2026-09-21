#!/usr/bin/env node
// Capturas da home: desktop 1440 e celular 390, página inteira, dobra e seção por seção,
// mais o quadro de movimento reduzido. Uso: node capturar-home.mjs http://localhost:3000
//
// Duas armadilhas já resolvidas aqui, aprendidas na exploração visual:
//  · a captura de página inteira no celular em 2x estoura o limite de textura do Chrome e sai
//    duplicada — a página inteira sai em 1x e só a dobra sai em 2x;
//  · a entrada em view precisa ser percorrida antes, senão metade da página sai transparente.
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const require = createRequire(join(raiz, "package.json"));
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2] || "http://localhost:3000";
const saida = join(aqui, "../b");
mkdirSync(saida, { recursive: true });

const NOMES = [
  "hero", "duas-portas", "virada", "aquisicao", "retencao",
  "acompanhamento", "como-comeca", "perguntas", "cta-final",
];

// A entrada é `whileInView` com `once: true`: se a página for percorrida rápido demais, o
// observer não dispara em todas as seções e a captura sai com metade do texto em opacidade 0
// e desfocado. Por isso a passagem é lenta e cada seção ainda espera antes do disparo.
async function preparar(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const passo = 400;
    for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2000));
}

async function fotoDoElemento(page, el, caminho) {
  await el.evaluate((n) => n.scrollIntoView({ block: "center", behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 700));
  await el.screenshot({ path: caminho });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
try {
  // desktop 1440
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await preparar(page);
    await page.screenshot({ path: join(saida, "desktop-dobra.png") });
    const secoes = await page.$$("main > section");
    await page.evaluate(() => { document.querySelector("header").style.visibility = "hidden"; });
    for (let i = 0; i < secoes.length; i++) {
      await fotoDoElemento(page, secoes[i], join(saida, `desktop-${NOMES[i] ?? i + 1}.png`));
    }
    const rodape = await page.$("footer");
    if (rodape) await fotoDoElemento(page, rodape, join(saida, "desktop-rodape.png"));
    await page.evaluate(() => { document.querySelector("header").style.visibility = ""; });
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.evaluate(() => { document.querySelector("header").style.visibility = "hidden"; });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: join(saida, "desktop-pagina-inteira.png"), fullPage: true });
    await page.close();
  }

  // desktop com movimento reduzido
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await preparar(page);
    await page.screenshot({ path: join(saida, "desktop-movimento-reduzido.png") });
    await page.close();
  }

  // celular 390
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    await preparar(page);
    await page.screenshot({ path: join(saida, "mobile-dobra.png") });
    const secoes = await page.$$("main > section");
    await page.evaluate(() => { document.querySelector("header").style.visibility = "hidden"; });
    for (let i = 0; i < secoes.length; i++) {
      await fotoDoElemento(page, secoes[i], join(saida, `mobile-${NOMES[i] ?? i + 1}.png`));
    }
    await page.evaluate(() => { document.querySelector("header").style.visibility = ""; });
    // menu aberto
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.querySelector('button[aria-controls="menu-mobile"]')?.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: join(saida, "mobile-menu.png") });
    await page.evaluate(() => document.querySelector('button[aria-controls="menu-mobile"]')?.click());
    // página inteira em 1x, para não estourar a textura
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.evaluate(() => { document.querySelector("header").style.visibility = "hidden"; });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: join(saida, "mobile-pagina-inteira.png"), fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("capturas em docs/validacao/b/");
