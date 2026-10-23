# Site novo da Lemis (item 4 da aplicação da identidade)

Pedido (Patrão, 23/10): refazer `lemiscompany.com.br` do zero sobre o protótipo aprovado (`rodada2/pecas/site.html`), com a copy literal aprovada pelo Vinicius em 23/10 (`manual/COPY-SITE.md`, sem os campos [PROVA A CONFIRMAR]), na identidade de `Lemis/identidade-visual/`. Também: atualizar `scripts/verificar-marca.mjs` para travar a paleta nova e fazer a imagem de compartilhamento (OG) nova. Publicar só com o OK do Vinicius.

Branch `feat/site-identidade-nova`, aberta da main em `a30c287` (worktree `~/Projects/lemis-site-novo`).

## O que mudou

- **Do zero:** saíram todos os componentes, efeitos, fontes (Geist, Instrument Serif) e logos da identidade de setembro. A página são nove seções em componentes Tailwind, na ordem do protótipo: hero com a foto da mesa e o celular, palco "Chega. / Volta.", o que fazemos, painel, como começa, perguntas, chamada final e rodapé.
- **Texto:** todo em `src/lib/conteudo.ts`, literal da copy.
- **Marca:** as assinaturas `cor` e `branco` e o símbolo, todos do manual; favicon e ícone da Apple do pacote; Plus Jakarta Sans e Inter (OFL, subconjunto latino); tokens do manual no `@theme`.
- **Movimento:** um só. O celular do hero sobe e inclina uma vez, e respeita `prefers-reduced-motion`.
- **Perguntas e menu do celular:** `<details>` nativo, sem JavaScript.
- **OG:** `src/app/opengraph-image.tsx`, 1200 × 630 com a assinatura, a frase do hero e o laço (`capturas/og.png`).
- **Verificador:** paleta de `tokens.css` mais os tons das etapas do protótipo; confere `rgb()`/`rgba()`; barra a identidade antiga pelo nome (#304CFF, papel, Geist, serifa, coral); "agentes" liberado (decisão 7 da copy). Ganhou teste próprio (`scripts/verificar-marca.test.mjs`).

## Provas

- `npm test`: 8 de 8, com o teste novo do verificador. `npm run verificar`: ok. `tsc` e `eslint` ok. `next build` ok: página e OG estáticas.
- Detector da impeccable (`detect.mjs`): 0 achados.
- Lighthouse (build de produção local), em `lighthouse/notas.txt`: celular 96/100/100/100 nas duas medições, LCP 2,7 a 2,8 s, CLS 0; desktop 100/100/100/100, LCP 0,6 s, CLS 0. O piso do PRODUCT.md é desktop 100, celular 96 e CLS 0.
- Sem rolagem lateral em 320, 390, 768, 1024, 1280 e 1920 px.
- Contraste dos pares novos ≥ 4,5:1. O mais apertado é branco sobre o topo do degradê, 4,56:1, igual ao manual.
- Capturas em `capturas/`: desktop 1440 (página inteira), celular 390 (página inteira e telas), menu do celular aberto, tablet 768 e a OG.

## Suposições

- [PENDENTE DE VALIDAÇÃO] O cartão "Investimento" do celular mostra "R$ 4.820" · base: a copy troca os rótulos para Contatos, Vendas e Investimento, mas o protótipo tinha "19" (Voltaram) nesse cartão, e investimento pede valor em real; é número de exemplo, marcado "dados de exemplo" na tela (quem valida: Vinicius)
- [PENDENTE DE VALIDAÇÃO] Os tons das etapas do protótipo (#E7FAF1, #FFF1EA, #B4441A) entram na paleta do verificador · base: estão no protótipo aprovado; o manual diz que as cores de dado são só de gráfico e etapa, e estes são as etapas da trilha (quem valida: Vinicius)
- [PENDENTE DE VALIDAÇÃO] No celular, o hero mostra só o texto sobre a foto, e o aparelho aparece logo abaixo, no palco · base: o protótipo é só desktop, e dois celulares seguidos repetiriam a mesma tela (quem valida: Vinicius)
- [PENDENTE DE VALIDAÇÃO] A OG usa fundo liso no bloco do laço · base: o gerador de OG não desenha o pontilhado (`radial-gradient`) (quem valida: Vinicius)

## Skills

- **Usadas:** impeccable (persuade; craft floor e `detect.mjs`), agent-browser (capturas e larguras), verification-before-completion (testes, build, Lighthouse e contraste antes de entregar).
- **Consideradas e não usadas:**
  - design-taste-frontend: a direção já veio aprovada no protótipo; aqui é construir, não escolher.
  - direcao-de-arte-apl: régua de peça gráfica, não de tela (CLAUDE.md do projeto).
  - humanizer e identidade-vinicius: a copy já veio aprovada e revisada; não acrescentei texto.
