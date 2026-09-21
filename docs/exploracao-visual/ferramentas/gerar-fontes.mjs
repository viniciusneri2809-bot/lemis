#!/usr/bin/env node
// Embute as duas fontes do site em base64: Chrome bloqueia @font-face entre arquivos file://,
// e o protótipo precisa abrir por duplo clique com a tipografia certa.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const fontes = join(aqui, "../../../src/app/fonts");
const b64 = (nome) => readFileSync(join(fontes, nome)).toString("base64");

const css = `/* Gerado por ferramentas/gerar-fontes.mjs a partir de src/app/fonts/. Não editar à mão. */
@font-face{font-family:'Geist';src:url(data:font/woff2;base64,${b64("Geist.woff2")}) format('woff2');font-weight:100 900;font-style:normal;font-display:block}
@font-face{font-family:'Instrument Serif';src:url(data:font/woff2;base64,${b64("InstrumentSerif-Italic.woff2")}) format('woff2');font-weight:400;font-style:italic;font-display:block}
`;
writeFileSync(join(aqui, "../fontes.css"), css);
console.log("fontes.css:", (css.length / 1024).toFixed(0), "KB");
