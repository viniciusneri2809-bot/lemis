#!/usr/bin/env bash
# Lighthouse sobre a build de produção. Uso: ./lighthouse.sh http://localhost:3000 [rodadas-mobile]
# Feche os outros navegadores antes: uma rodada com navegador aberto em segundo plano já derrubou
# o mobile de 96 para 93 nesta mesma build (registrado no RESUMO da rodada anterior).
set -euo pipefail
URL="${1:-http://localhost:3000}"
RODADAS="${2:-3}"
AQUI="$(cd "$(dirname "$0")" && pwd)"
SAIDA="$AQUI/../b"
LH="$AQUI/../../../node_modules/.bin/lighthouse"
FLAGS='--headless=new --no-sandbox --disable-gpu --hide-scrollbars'

"$LH" "$URL" --preset=desktop --output=json --output=html \
  --output-path="$SAIDA/lighthouse-desktop" --chrome-flags="$FLAGS" --quiet

for i in $(seq 1 "$RODADAS"); do
  "$LH" "$URL" --output=json --output=html \
    --output-path="$SAIDA/lighthouse-mobile-$i" --chrome-flags="$FLAGS" --quiet
done

node -e '
const { readFileSync } = require("node:fs");
const p = process.argv[1];
const ler = (f) => {
  const j = JSON.parse(readFileSync(f, "utf8"));
  const n = (k) => Math.round(j.categories[k].score * 100);
  const a = (k) => j.audits[k]?.displayValue ?? "—";
  return { perf: n("performance"), a11y: n("accessibility"), bp: n("best-practices"), seo: n("seo"),
           lcp: a("largest-contentful-paint"), cls: a("cumulative-layout-shift"),
           tbt: a("total-blocking-time"), fcp: a("first-contentful-paint") };
};
const linhas = [["desktop", ler(p + "/lighthouse-desktop.report.json")]];
for (let i = 1; i <= Number(process.argv[2]); i++) linhas.push([`mobile ${i}`, ler(`${p}/lighthouse-mobile-${i}.report.json`)]);
console.log("| Rodada | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP |");
console.log("|---|---|---|---|---|---|---|---|---|");
for (const [k, v] of linhas) console.log(`| ${k} | ${v.perf} | ${v.a11y} | ${v.bp} | ${v.seo} | ${v.lcp} | ${v.cls} | ${v.tbt} | ${v.fcp} |`);
' "$SAIDA" "$RODADAS" | tee "$SAIDA/lighthouse.md"
