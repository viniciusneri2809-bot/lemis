#!/usr/bin/env node
// Verificação de marca: palavras proibidas, cores fora da paleta, opacidade em texto,
// "APL" fora do rodapé e fonte fora do sistema.
//
// Atualizado em 20/09/2026 com o posicionamento novo (funil de aquisição e de retenção):
//  - "IA", "inteligência artificial" e "automação" DEIXAM de ser proibidas. São o meio pelo
//    qual o funil roda e podem ser citadas, nunca explicadas.
//    Origem: decisoes/2026-09-20-automacao-e-ia-citadas-como-meio.
//  - "agentes" continua proibida: descrever agente ou atendimento autônomo é explicar o
//    mecanismo de IA, que é justamente o que a decisão não liberou.
//  - Itálico e serifa passam a ser aceitos, mas só onde a classe `t-destaque` é definida e a
//    fonte é carregada. Em componente, a palavra "italic" continua reprovada: o caminho é a
//    classe. Origem: plano do site v2, §7.2.
//  - Entra a trava "Lemis Company": o domínio tem "company", o nome escrito nunca.
//    Origem: decisoes/2026-09-18-rebrand-apl-para-lemis-brand-e-legado.
//  - Entra a trava de nicho de cliente em peça institucional.
//    Origem: decisoes/2026-09-18-apresentacao-institucional-nao-cita-nicho.
//  - E a trava de nicho POR VOCABULÁRIO (20/09/2026). O site passou no teste que procura o nome do
//    nicho — "clínica", "paciente", "consultório" davam zero — e mesmo assim o Vinicius leu e disse:
//    "Tanto a apresentacao quanto o site tem elementos que parecem focar somente em clínicas. Mas
//    atendemos empresas de servico no geral." O que nichava era o vocabulário do funil: as etapas
//    terminavam em "Agendado" e "Compareceu" e a retenção falava em "some da agenda". Um dono de
//    escritório, de agência, de escola ou de oficina lê "Compareceu" e entende que a peça não é
//    para ele, sem a palavra "clínica" aparecer uma vez.
//    Origem: decisoes/2026-09-20-peca-institucional-fala-de-empresa-de-servico.
//  - Entra a trava de frase de impacto: as frases de marca já reprovadas pelo Vinicius não
//    voltam ao site por descuido. Origem: decisoes/2026-09-20-nada-de-frase-de-impacto-a-entrega-ocupa-o-lugar
//    A trava cobre TRÊS textos: a frase antiga, a frase de marca "Cliente novo entrando..." e a
//    frase de apoio "... a serviço de um funil ...". As duas últimas vinham de
//    decisoes/2026-09-20-frase-de-marca-cliente-novo-entrando, REVOGADA em 20/09/2026 por
//    registrar uma escolha do Vinicius que nunca aconteceu.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const raiz = process.cwd();
const src = join(raiz, "src");

const PALETA = new Set([
  "304cff", "f4f1ea", "17191d", "ffffff", "666a73", "adb2bd", "203ad9", "182caf",
]);

const PROIBIDAS = [
  [/\bagentes?\b/i, "menção a agentes (IA e automação são citadas, nunca explicadas)"],
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

const ISENTOS_APL = new Set(["src/lib/conteudo.ts", "src/components/secoes/Footer.tsx"]);
// Itálico e serifa vivem só onde a classe `t-destaque` é definida e a fonte é carregada.
const ISENTOS_FONTE = new Set(["src/app/globals.css", "src/app/layout.tsx"]);
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
    if (/\bopacity-(\d|\[)/.test(linha) && !rel.startsWith("src/components/efeitos/") && !/aria-hidden|Padrao|Glow|Grao/.test(linha)) problemas.push(`${rel}:${i + 1}: opacidade fora de elemento gráfico`);
    if (/\btext-[a-z-]+\/\d{1,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: texto com alfa`);
    if (/font-mono|font-serif|italic/.test(linha) && !ISENTOS_FONTE.has(rel)) problemas.push(`${rel}:${i + 1}: fonte fora do sistema (use a classe t-destaque)`);
  });
}

if (problemas.length) {
  console.error("Verificação de marca falhou:\n" + problemas.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("Verificação de marca: ok");
