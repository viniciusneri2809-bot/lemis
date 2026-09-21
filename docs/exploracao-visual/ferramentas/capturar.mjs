#!/usr/bin/env node
// Capturas dos protótipos: 1440 e 390, página inteira e dobra, movimento reduzido e, no palco,
// um quadro por estado. Uso: node capturar.mjs [a|b|c|prancha] [--so-dobra]
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const require = createRequire(join(raiz, "package.json"));
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pasta = join(aqui, "..");
const saida = join(pasta, "capturas");

const filtro = process.argv[2];
const soDobra = process.argv.includes("--so-dobra");
const ALVOS = [
  ["a", "a-trilho.html"],
  ["b", "b-editorial.html"],
  ["c", "c-palco.html"],
].filter(([k]) => !filtro || filtro === k);

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function preparar(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const passo = 600;
    for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    // A entrada por animation-timeline: view() não "entra" numa captura de página inteira:
    // o estado capturado é o final (opacity 1, sem deslocamento), que é o que a pessoa vê.
    const st = document.createElement("style");
    st.textContent = ".entra{animation:none!important;opacity:1!important}";
    document.head.appendChild(st);
  });
  await espera(1200);
}

async function porSecao(page, k, sufixo = "") {
  const n = await page.evaluate(() => { document.querySelector("header").style.visibility = "hidden"; return document.querySelectorAll("main > section").length; });
  for (let i = 0; i < n; i++) {
    const el = (await page.$$("main > section"))[i];
    await el.screenshot({ path: join(saida, `${k}-secao-${i + 1}${sufixo}.png`) });
  }
  await page.evaluate(() => { document.querySelector("header").style.visibility = ""; });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--allow-file-access-from-files", "--hide-scrollbars"] });
try {
  for (const [k, arq] of ALVOS) {
    const url = pathToFileURL(join(pasta, arq)).href;
    const page = await browser.newPage();
    page.on("pageerror", (e) => console.log(`  [${arq}] erro:`, e.message));

    // desktop
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "load" });
    await preparar(page);
    await page.screenshot({ path: join(saida, `${k}-dobra-desktop.png`) });
    if (!soDobra) { await page.screenshot({ path: join(saida, `${k}-desktop.png`), fullPage: true }); await porSecao(page, k); }
    const larg = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth, document.documentElement.scrollHeight]);
    console.log(`${arq} desktop: scrollWidth ${larg[0]} / viewport ${larg[1]} / altura ${larg[2]}`);

    if (k === "c" && !soDobra) {
      const n = await page.evaluate(() => document.querySelectorAll(".lamina").length);
      for (let i = 0; i < n; i++) {
        await page.evaluate((i) => document.querySelectorAll(".lamina")[i].scrollIntoView({ block: "start", behavior: "instant" }), i);
        await espera(900);
        await page.screenshot({ path: join(saida, `c-estado-${i + 1}.png`) });
      }
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    // movimento reduzido: só a dobra
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.reload({ waitUntil: "load" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await espera(1200);
    await page.screenshot({ path: join(saida, `${k}-reduzido-desktop.png`) });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

    // celular
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: "load" });
    await preparar(page);
    await page.screenshot({ path: join(saida, `${k}-dobra-mobile.png`) });
    if (!soDobra) {
      // Página inteira em 1x: em 2x a altura passa do limite de textura do Chrome e o conteúdo sai duplicado.
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      await espera(400);
      await page.screenshot({ path: join(saida, `${k}-mobile.png`), fullPage: true });
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    }
    const largM = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth, document.documentElement.scrollHeight]);
    console.log(`${arq} mobile: scrollWidth ${largM[0]} / viewport ${largM[1]} / altura ${largM[2]}`);
    if (k === "c" && !soDobra) {
      const n = await page.evaluate(() => document.querySelectorAll(".lamina").length);
      for (let i = 0; i < n; i++) {
        await page.evaluate((i) => document.querySelectorAll(".lamina")[i].scrollIntoView({ block: "start", behavior: "instant" }), i);
        await espera(900);
        await page.screenshot({ path: join(saida, `c-estado-${i + 1}-mobile.png`) });
      }
    }
    await page.close();
  }

  if (!filtro || filtro === "prancha") {
    const page = await browser.newPage();
    await page.setViewport({ width: 2400, height: 1200, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(join(pasta, "prancha.html")).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await espera(1500);
    const faixas = await page.$$(".faixa");
    const nomes = ["prancha", "mesmo-estudio"];
    for (let i = 0; i < faixas.length && i < nomes.length; i++) {
      await faixas[i].screenshot({ path: join(saida, `${nomes[i]}.png`) });
      console.log(`${nomes[i]}.png`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
