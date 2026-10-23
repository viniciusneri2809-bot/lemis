#!/usr/bin/env node
// Verificação de marca: palavras proibidas, cores fora da paleta, opacidade em texto,
// "APL" fora do rodapé e fonte fora do sistema.
//
// Atualizado em 23/10/2026 com a identidade nova, aprovada pelo Vinicius ("Aprovo"):
//  - A paleta é a de `Lemis/identidade-visual/tokens.css` (claro): azul #1F5EF2, azul 50, ação,
//    névoa, linha, tinta, texto, cinza, as cores de dado e as funcionais. Entram também os tons das
//    etapas do protótipo aprovado (rodada 2): #E7FAF1, #FFF1EA e #B4441A. As cores do laço vivem
//    dentro dos SVGs de `public/marca` e não passam por aqui.
//  - A trava agora lê também `rgb()`/`rgba()`: sombra e véu só com os tons da paleta.
//  - Sai a identidade de 16/09: o azul #304CFF, o papel #F4F1EA, a Geist e a serifa reprovam por nome,
//    em qualquer arquivo, para não voltarem por cópia.
//  - "agentes" deixa de ser proibida: "pode citar agentes" (Vinicius, 23/10, COPY-SITE.md, decisão 7).
//
// Histórico (20/09/2026, posicionamento do funil de aquisição e de retenção): "IA", "inteligência
// artificial" e "automação" citadas como meio; trava "Lemis Company"; trava de nicho por nome e por
// vocabulário de consultório (decisoes/2026-09-20-peca-institucional-fala-de-empresa-de-servico);
// trava de frase de impacto reprovada.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const raiz = process.cwd();
const src = join(raiz, "src");

const PALETA = new Set([
  // tokens.css, tema claro
  "1f5ef2", "edf3ff", "2f6bfa", "1748c4", "ffffff", "f6f7f9", "e5e8ee", "1b2130", "0b1020", "5a6273",
  "b52b39", "147344",
  // cores de dado
  "2f6bff", "3ddc97", "ff8a5b",
  // tons das etapas no protótipo aprovado (rodada 2)
  "e7faf1", "fff1ea", "b4441a",
]);

function hexDe(r, g, b) {
  return [r, g, b].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
}

const PROIBIDAS = [
  [/304cff|f4f1ea|\bgeist\b|instrument\s*serif|\bcoral\b/i, "identidade antiga (azul #304CFF, papel, Geist, serifa ou coral)"],
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
  [/Lemis\s+Company/i, "\"Lemis Company\" (o nome escrito é só Lemis)"],
  [/cl[íi]nicas?\b|advocacia|advogad|est[ée]tica/i, "nicho de cliente em peça institucional"],
  // Vocabulário de consultório. São substantivos e formas verbais sem uso legítimo em peça
  // institucional da casa — de propósito não pegam "comparar", "avaliamos", "consultoria",
  // "consultar" nem "agência", que são legítimos e aparecem na copy aprovada.
  [/\bcompare(?:ceu|cer|cem|ceram|cimento)\b/i, "\"comparecimento\": vocabulário de consultório, não de empresa de serviço"],
  [/\bagendamentos?\b|\bagendad[oa]s?\b|\bagendar\b/i, "\"agendamento\": vocabulário de consultório, não de empresa de serviço"],
  [/\bagendas?\b/i, "\"agenda\": vocabulário de consultório, não de empresa de serviço"],
  [/\bpacientes?\b/i, "\"paciente\": vocabulário de consultório"],
  [/\bconsultas?\b|\bconsult[óo]rios?\b/i, "\"consulta\": vocabulário de consultório"],
  [/\bavalia[çc][ãa]o\b|\bavalia[çc][õo]es\b/i, "\"avaliação\" como etapa: vocabulário de consultório"],
  [/\btratamentos?\b|\bprocedimentos?\b/i, "\"tratamento/procedimento\": vocabulário de consultório"],
  [/\bsess[ãa]o\b|\bsess[õo]es\b/i, "\"sessão\": vocabulário de consultório"],
  [/pr[óo]ximo passo tem dire[çc][ãa]o/i, "frase de marca reprovada pelo Vinicius"],
];

const ISENTOS_APL = new Set(["src/lib/conteudo.ts", "src/components/secoes/Rodape.tsx"]);
// O rodapé e o conteúdo levam o CNPJ, o telefone e os números de exemplo do celular do painel.
const ISENTOS_NUMERO = new Set(["src/lib/contato.ts", "src/lib/conteudo.ts", "src/components/secoes/Rodape.tsx", "src/app/opengraph-image.tsx"]);

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
      .replace(/(?:radial|linear|conic)-gradient\((?:[^()]|\([^()]*\))*\)/g, "")
      // Largura de barra desenhada (proporção gráfica, não métrica de copy).
      .replace(/\b[wh]-\[\d+%\]/g, "")
      .replace(/\blargura\s*[=:]\s*\{?\s*["'][\d.]+%["']/g, "");
    for (const [re, motivo] of PROIBIDAS) {
      if (motivo === "\"APL\" fora do rodapé" && ISENTOS_APL.has(rel)) continue;
      if (motivo === "métrica ou valor" && (ISENTOS_NUMERO.has(rel) || rel.endsWith(".css"))) continue;
      const alvo = motivo === "métrica ou valor" ? linhaMetrica : linha;
      if (re.test(alvo)) problemas.push(`${rel}:${i + 1}: ${motivo}: ${linha.trim().slice(0, 90)}`);
    }
    for (const m of linha.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
      if (!PALETA.has(m[1].toLowerCase())) problemas.push(`${rel}:${i + 1}: cor fora da paleta #${m[1]}`);
    }
    if (/\b(?:hsla?|hwb|lab|lch|oklab|oklch|color)\(/i.test(linha.replace(/color-mix\(/g, ""))) problemas.push(`${rel}:${i + 1}: cor em formato fora da trava (use hex ou rgb da paleta)`);
    if (/\b(?:bg|text|border|ring|fill|stroke|from|via|to|outline|decoration|shadow|divide|accent|caret)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: cor padrão do Tailwind fora da paleta`);
    if ((rel.endsWith(".css") || /style=\{\{/.test(linha)) && /(?:color|background|fill|stroke|border)[\w-]*\s*:\s*["']?(?:red|blue|green|orange|purple|pink|gray|grey|navy|teal|yellow|black)\b/i.test(linha)) problemas.push(`${rel}:${i + 1}: cor por nome fora da paleta`);
    for (const m of linha.matchAll(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g)) {
      const hex = hexDe(m[1], m[2], m[3]);
      if (!PALETA.has(hex)) problemas.push(`${rel}:${i + 1}: cor fora da paleta rgb(${m[1]}, ${m[2]}, ${m[3]})`);
    }
    if (/\bopacity-(\d|\[)/.test(linha) && !rel.startsWith("src/components/efeitos/") && !/aria-hidden|Padrao|Glow|Grao/.test(linha)) problemas.push(`${rel}:${i + 1}: opacidade fora de elemento gráfico`);
    if (/\btext-[a-z-]+\/\d{1,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: texto com alfa`);
    if (/font-mono|font-serif|italic/.test(linha)) problemas.push(`${rel}:${i + 1}: fonte fora do sistema (Plus Jakarta Sans e Inter, manual §3)`);
  });
}

if (problemas.length) {
  console.error("Verificação de marca falhou:\n" + problemas.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("Verificação de marca: ok");
