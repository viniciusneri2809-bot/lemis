#!/usr/bin/env python3
"""Teste do mesmo estúdio: põe lado a lado a home reprovada, a home nova e a página 03 do
Botolifting v2 — a peça que o Vinicius aprovou sem reservas. É a checagem que a régua da casa
exige antes de mostrar qualquer coisa: se as três não parecem sair do mesmo estúdio, a régua
perdeu para a skill sem ninguém perceber."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

raiz = Path(__file__).resolve().parents[3]
pecas = [
    ("Home reprovada (v2, antes)", raiz / "docs/validacao/v2/desktop-hero.png"),
    ("Home nova (direção B)", raiz / "docs/validacao/b/desktop-dobra.png"),
    ("Botolifting v2, p. 03 (aprovada)", raiz / "docs/exploracao-visual/capturas/referencia-botolifting-03.png"),
]
faltando = [str(p) for _, p in pecas if not p.exists()]
if faltando:
    sys.exit("faltam: " + ", ".join(faltando))

LARG, MARGEM, ROTULO = 760, 32, 46
imgs = []
for titulo, caminho in pecas:
    im = Image.open(caminho).convert("RGB")
    alt = round(im.height * LARG / im.width)
    imgs.append((titulo, im.resize((LARG, alt), Image.LANCZOS)))

altura = max(i.height for _, i in imgs)
total_l = MARGEM + len(imgs) * (LARG + MARGEM)
tela = Image.new("RGB", (total_l, altura + ROTULO + 2 * MARGEM), (23, 25, 29))
d = ImageDraw.Draw(tela)
x = MARGEM
for titulo, im in imgs:
    d.text((x, MARGEM), titulo, fill=(173, 178, 189))
    tela.paste(im, (x, MARGEM + ROTULO))
    d.rectangle([x, MARGEM + ROTULO, x + LARG - 1, MARGEM + ROTULO + im.height - 1],
                outline=(70, 74, 82))
    x += LARG + MARGEM

destino = raiz / "docs/validacao/b/mesmo-estudio.png"
tela.save(destino)
print(destino)
