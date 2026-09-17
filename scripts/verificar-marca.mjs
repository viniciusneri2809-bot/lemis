#!/usr/bin/env node
// Verificação de marca: palavras proibidas, cores fora da paleta, opacidade em texto, "APL" fora do rodapé.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const raiz = process.cwd();
const src = join(raiz, "src");

const PALETA = new Set([
  "304cff", "f4f1ea", "17191d", "ffffff", "666a73", "adb2bd", "203ad9", "182caf",
]);

const PROIBIDAS = [
  [/\bIA\b/, "menção a IA"],
  [/intelig[êe]ncia artificial/i, "menção a inteligência artificial"],
  [/\bagentes?\b/i, "menção a agentes"],
  [/automa[çc]/i, "menção a automação"],
  [/\búnica\b/i, "\"única\""],
  [/\ba melhor\b/i, "\"a melhor\""],
  [/exclusiv/i, "\"exclusivo\""],
  [/garanti[dm]|garantia/i, "promessa de garantia"],
  [/gr[áa]tis|gratuit/i, "\"grátis/gratuito\""],
  [/\burgente\b|[úu]ltimas vagas|s[óo] hoje|vagas limitadas/i, "urgência/escassez"],
  [/(?<!t-)\bleads?\b/i, "\"leads\""],
  [/revolucion|\bdominar\b|escalar sem limites|potencializ/i, "verbo inflado"],
  [/depoimento|\bcases?\b|\bcase\b/i, "prova social"],
  [/\d+\s?%|R\$\s?\d/, "métrica ou valor"],
  [/\bAPL\b/, "\"APL\" fora do rodapé"],
];

const ISENTOS_APL = new Set(["src/lib/conteudo.ts", "src/components/secoes/Footer.tsx"]);
const ISENTOS_NUMERO = new Set(["src/lib/contato.ts", "src/lib/conteudo.ts", "src/components/secoes/Footer.tsx", "src/app/opengraph-image.tsx"]);

function arquivos(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return arquivos(caminho);
    return /\.(tsx?|css|mjs)$/.test(nome) && !/\.test\./.test(nome) ? [caminho] : [];
  });
}

const problemas = [];
for (const caminho of arquivos(src)) {
  const rel = relative(raiz, caminho);
  const texto = readFileSync(caminho, "utf8");
  const linhas = texto.split("\n");

  linhas.forEach((linha, i) => {
    // Percentuais técnicos (color-mix, comprimentos CSS, atributos SVG) não são métrica de copy.
    const linhaMetrica = linha
      .replace(/color-mix\((?:[^()]|\([^()]*\))*\)/g, "")
      .replace(/(["'])[^"']*\d(?:px|rem|em|vw|vh)\b[^"']*\1/g, "")
      .replace(/\b(?:width|height|x|y|cx|cy|r|offset)=(["'])-?[\d.]+%\1/g, "")
      // Gradientes e máscaras (Tailwind arbitrário ou CSS): stops em % não são copy.
      .replace(/\[mask-image:[^\]]*\]/g, "")
      .replace(/(?:radial|linear|conic)-gradient\((?:[^()]|\([^()]*\))*\)/g, "");
    for (const [re, motivo] of PROIBIDAS) {
      if (motivo === "\"APL\" fora do rodapé" && ISENTOS_APL.has(rel)) continue;
      if (motivo === "métrica ou valor" && (ISENTOS_NUMERO.has(rel) || rel.endsWith(".css"))) continue;
      const alvo = motivo === "métrica ou valor" ? linhaMetrica : linha;
      if (re.test(alvo)) problemas.push(`${rel}:${i + 1}: ${motivo}: ${linha.trim().slice(0, 90)}`);
    }
    for (const m of linha.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
      if (!PALETA.has(m[1].toLowerCase())) problemas.push(`${rel}:${i + 1}: cor fora da paleta #${m[1]}`);
    }
    if (/\bopacity-(\d|\[)/.test(linha) && !rel.startsWith("src/components/efeitos/") && !/aria-hidden|Padrao|Glow|Grao/.test(linha)) problemas.push(`${rel}:${i + 1}: opacidade fora de elemento gráfico`);
    if (/\btext-[a-z-]+\/\d{1,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: texto com alfa`);
    if (/font-mono|font-serif|italic/.test(linha)) problemas.push(`${rel}:${i + 1}: fonte fora do sistema`);
  });
}

if (problemas.length) {
  console.error("Verificação de marca falhou:\n" + problemas.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("Verificação de marca: ok");
