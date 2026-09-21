#!/usr/bin/env node
// Irmão do scripts/verificar-marca.mjs, para a pasta dos protótipos (o original varre só src/).
// Lê a lista PROIBIDAS e a PALETA do original em vez de copiar, para não divergir. Reprova:
// termo proibido no texto, hex fora da paleta, alfa em texto, itálico fora de .t-destaque e
// mais de uma palavra em destaque por título. Sai com 1 se reprovar.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const pasta = join(aqui, "..");

const fonte = readFileSync(join(raiz, "scripts/verificar-marca.mjs"), "utf8");
const PALETA = new Set([...fonte.match(/const PALETA = new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/"([0-9a-f]{6})"/g)].map((m) => m[1]));
const bloco = fonte.match(/const PROIBIDAS = \[([\s\S]*?)\n\];/)[1];
const PROIBIDAS = [...bloco.matchAll(/\[\/(.*?)\/([a-z]*), "((?:[^"\\]|\\.)*)"\]/g)].map((m) => [new RegExp(m[1], m[2]), m[3]]);

const arquivos = readdirSync(pasta).filter((n) => /\.html$/.test(n) && n !== "prancha.html").concat(["base.css"]);
let falhas = 0;
const falha = (arq, msg) => { falhas++; console.log(`  ${arq}: ${msg}`); };

for (const arq of arquivos) {
  const bruto = readFileSync(join(pasta, arq), "utf8");
  const semRodape = bruto.replace(/<footer[\s\S]*?<\/footer>/, "");
  const texto = semRodape.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ");
  // Termos e métricas valem para o texto lido, não para CSS: o original também isenta "% fora de CSS".
  const linhas = arq.endsWith(".css") ? [] : texto.split("\n");
  for (const [re, motivo] of PROIBIDAS) {
    if (motivo.includes("APL")) continue; // isento: só aparece no rodapé, removido acima
    linhas.forEach((l, i) => { if (re.test(l)) falha(arq, `${motivo} (linha ${i + 1}: ${l.trim().slice(0, 70)})`); });
  }
  // hex fora da paleta (em CSS e em HTML; #000 é permitido só em sombra)
  for (const m of bruto.matchAll(/#([0-9a-fA-F]{6})\b/g)) if (!PALETA.has(m[1].toLowerCase())) falha(arq, `hex fora da paleta #${m[1]}`);
  // alfa em texto: rgba/opacity em regra cujo seletor é de texto
  for (const m of bruto.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const sel = m[1].trim(), decl = m[2];
    if (/^(p|h[1-3]|\.t-[a-z-]+)(\s|,|$)/.test(sel) && /opacity\s*:|rgba\(/.test(decl)) falha(arq, `alfa em texto: ${sel}`);
  }
  // itálico só na regra .t-destaque / fontes / numerais serifados declarados
  for (const m of bruto.matchAll(/([^{}]+)\{([^}]*font-style\s*:\s*italic[^}]*)\}/g)) {
    const sel = m[1].trim();
    if (!/t-destaque|numeral|\.marco \.n|\.step-n|@font-face|\.detalhe summary \.n/.test(sel)) falha(arq, `itálico fora de .t-destaque: ${sel}`);
  }
  // uma palavra em destaque por título
  for (const m of bruto.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/g)) {
    const n = (m[1].match(/class="t-destaque"/g) || []).length;
    if (n > 1) falha(arq, `título com ${n} palavras em destaque`);
  }
}
console.log(falhas ? `${falhas} reprovação(ões)` : `marca ok em ${arquivos.length} arquivos (${PROIBIDAS.length} travas, paleta de ${PALETA.size} cores)`);
process.exit(falhas ? 1 : 0);
