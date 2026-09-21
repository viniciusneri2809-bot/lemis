#!/usr/bin/env node
// Toda string de src/lib/conteudo.ts precisa aparecer, literal, no texto de cada protótipo.
// Títulos são "antes + destaque + depois" (o <em> só muda a fonte). Sai com 1 se faltar algo.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const conteudo = await import(join(raiz, "src/lib/conteudo.ts"));

const strings = new Set();
function colher(v) {
  if (typeof v === "string") { if (v.trim().length > 1) strings.add(v); return; }
  if (v && typeof v === "object") {
    if ("antes" in v && "destaque" in v) { strings.add(`${v.antes}${v.destaque}${v.depois}`); return; }
    Object.values(v).forEach(colher);
  }
}
Object.entries(conteudo).forEach(([nome, v]) => { if (nome !== "textosDeInterface" && nome !== "metadados") colher(v); });
strings.add(conteudo.metadados.titulo);
for (const s of [...strings]) if (/^#|^https?:/.test(s) || /^(aquisicao|atendimento|conexao|criacao|inteligencia|vendas)$/.test(s)) strings.delete(s);

const norm = (t) => t.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
const hash = createHash("sha256").update(readFileSync(join(raiz, "src/lib/conteudo.ts"))).digest("hex").slice(0, 12);
let falhas = 0;
for (const arq of ["a-trilho.html", "b-editorial.html", "c-palco.html"]) {
  const html = readFileSync(join(aqui, "..", arq), "utf8");
  const texto = norm(html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "));
  const faltam = [...strings].filter((s) => !texto.includes(norm(s)));
  console.log(`${arq}: ${strings.size - faltam.length}/${strings.size} strings da copy presentes`);
  faltam.forEach((s) => console.log("   FALTA:", s.slice(0, 90)));
  falhas += faltam.length;
}
console.log(`conteudo.ts sha256 ${hash}`);
process.exit(falhas ? 1 : 0);
