#!/usr/bin/env node
// Gera os três protótipos a partir de src/lib/conteudo.ts (fonte única da copy) e das direções
// em ../direcoes/. O que sai é HTML autônomo: abre por duplo clique, sem servidor.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { documento } from "./partes.mjs";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, "../../..");
const c = await import(join(raiz, "src/lib/conteudo.ts"));
const { LINK_WHATSAPP } = await import(join(raiz, "src/lib/contato.ts"));

const DIRECOES = [
  ["a-trilho", "./direcoes/a-trilho.mjs"],
  ["b-editorial", "./direcoes/b-editorial.mjs"],
  ["c-palco", "./direcoes/c-palco.mjs"],
];

const so = process.argv[2];
for (const [nome, mod] of DIRECOES) {
  if (so && !nome.startsWith(so)) continue;
  const { css, corpo, script } = (await import(mod)).default(c, LINK_WHATSAPP);
  const html = documento({ titulo: c.metadados.titulo, css, corpo, script });
  writeFileSync(join(aqui, "..", `${nome}.html`), html);
  console.log(`${nome}.html: ${(html.length / 1024).toFixed(0)} KB`);
}
