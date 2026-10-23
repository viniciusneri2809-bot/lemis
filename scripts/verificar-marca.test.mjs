// A trava de marca, rodada contra pastas montadas na hora: o que a identidade de 23/10 aprova passa,
// o que ela tirou (azul #304CFF, Geist, serifa, coral) e o que a copy veta reprova.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const VERIFICADOR = new URL("./verificar-marca.mjs", import.meta.url).pathname;

function rodar(arquivos) {
  const raiz = mkdtempSync(join(tmpdir(), "verificar-marca-"));
  for (const [caminho, texto] of Object.entries(arquivos)) {
    const completo = join(raiz, caminho);
    mkdirSync(join(completo, ".."), { recursive: true });
    writeFileSync(completo, texto);
  }
  const r = spawnSync(process.execPath, [VERIFICADOR], { cwd: raiz, encoding: "utf8" });
  return { ok: r.status === 0, saida: r.stdout + r.stderr };
}

test("a paleta nova passa, inclusive em rgba", () => {
  const r = rodar({ "src/a.css": ".a{color:#1F5EF2;background:#F6F7F9;box-shadow:0 1px 2px rgba(11,16,32,.04)}" });
  assert.ok(r.ok, r.saida);
});

test("o azul antigo #304CFF e cor solta reprovam", () => {
  assert.ok(!rodar({ "src/a.css": ".a{color:#304CFF}" }).ok);
  assert.ok(!rodar({ "src/a.css": ".a{color:#123456}" }).ok);
  assert.ok(!rodar({ "src/a.css": ".a{color:rgba(48,76,255,.5)}" }).ok);
});

test("\"agentes\" está liberado (23/10); \"leads\" e garantia continuam vetados", () => {
  assert.ok(rodar({ "src/a.ts": 'export const f = "Agentes de IA trabalham com o seu time";' }).ok);
  assert.ok(!rodar({ "src/a.ts": 'export const f = "mais leads";' }).ok);
  assert.ok(!rodar({ "src/a.ts": 'export const f = "resultado garantido";' }).ok);
});

test("fonte da identidade antiga reprova: Geist, serifa e itálico", () => {
  assert.ok(!rodar({ "src/a.tsx": 'const f = localFont({ src: "./Geist.woff2" });' }).ok);
  assert.ok(!rodar({ "src/a.tsx": '<span className="font-serif italic">x</span>' }).ok);
});

test("valor em real só nos arquivos de dado de exemplo", () => {
  assert.ok(rodar({ "src/lib/conteudo.ts": 'investimento: "R$ 4.820",' }).ok);
  assert.ok(!rodar({ "src/components/X.tsx": "<b>R$ 4.820</b>" }).ok);
});
