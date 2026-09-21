# Plano — home da Lemis na direção B (Editorial)

Decisão: `decisoes/2026-09-20-home-do-site-segue-a-direcao-editorial.md`. Palavras dele: "Eu gostei do b."
Referência de forma: `docs/exploracao-visual/b-editorial.html` + `base.css`. **Referência, não arquivo para copiar:**
o site é Next com componentes; o resultado tem que ser código da casa.

## Global Constraints (valem para toda tarefa)

1. **A copy não muda.** Todo texto vem de `src/lib/conteudo.ts`. Nenhum componente escreve texto próprio.
   Se a estrutura pedir um rótulo novo, o implementador NÃO inventa: devolve como pendência no relatório.
2. **Nove seções, na mesma ordem:** Hero, DuasPortas, Virada, Aquisicao, Retencao, OQueVoceVe, ComoComeca,
   Perguntas, CtaFinal. Mais Header e Footer.
3. **Não commitar, não fazer merge, não publicar, não fazer deploy.** Trabalho fica na árvore.
4. **Verificador de marca (`npm run verificar`) tem que passar**, incluindo a trava de nicho.
   Itálico e serifa só pela classe `t-destaque` — nunca `italic`/`font-serif` em componente.
   Nenhum hex fora da paleta (`304cff f4f1ea 17191d ffffff 666a73 adb2bd 203ad9 182caf`); `#000` de 3 dígitos é aceito.
   Nenhum número/percentual de copy; largura de barra desenhada usa `largura="NN%"` ou `w-[NN%]`.
5. **`prefers-reduced-motion` respeitado**, teclado e foco funcionando, sem rolagem horizontal em 320/390/1440.
6. **Piso de performance:** Lighthouse desktop 100, mobile ≥ 96, CLS 0. Nenhuma biblioteca nova. Nenhuma `<img>`.
7. **Sem `any`.** `npm run lint` e `npx tsc --noEmit` limpos.
8. **Interface desenhada não inventa dado:** barra-fantasma no lugar de número, `aria-hidden` no desenho.

## O que a B muda, medido

| Medida | Home atual | Alvo B (protótipo) |
|---|---|---|
| Cards de topo | 16 | 5 |
| Larguras de seção distintas | 1 | 7 |
| Elementos que cruzam o container | 0 | 13 |
| Ritmos verticais | 4 | 7 |

As sete larguras: container padrão (1408), medida de texto (640), faixa de sangria total (100vw),
laje que sangra à direita, folha que sangra à direita, folha que sangra à esquerda, coluna de jornal.

## Tarefa 0 — Fundação (controlador, inline)

Tokens, classes e primitivas compartilhadas. **Nenhuma seção pode ser escrita antes.**

- `src/app/globals.css`: `--color-tinta-funda`; classes `.medida`, `.sangria`, `.folha`, `.folha-esquerda`,
  `.laje`, `.numeral-gigante`, `.numeral-gigante-centro`, `.jornal`, `.lista-editorial`, `.feixe`,
  `.faq-largo`. Ritmo vertical por seção via `.ritmo-*`.
- `src/components/ui/Secao.tsx`: reescrita. Vira casca (`campo`, `numeral`, `ritmo`, `fundo`, `children`),
  sem cabeçalho fixo e sem moldura.
- `src/components/ui/CabecaSecao.tsx`: novo. Rótulo-pílula + H2 + lead, com `colunas: "6-6" | "8-4"`.
- `src/components/ui/Folha.tsx`: novo. Folha de papel deslocada (`lado: "direita" | "esquerda"`).
- `src/components/esquema/Numeral.tsx`: novo. Numeral em serifa solto (`tamanho: "sm" | "md" | "lg"` = 48/96/120px).
- `src/components/esquema/NumeralGigante.tsx`: novo. Numeral de 120–220px cortado pela borda da seção (`centro?`).
- `src/components/efeitos/Feixe.tsx`: novo. Filete com pulso azul correndo, em CSS puro (`eixo: "h" | "v"`).
- `src/components/marca/Motivo.tsx`, `Wordmark`, `Simbolo`, `Icone`, `Botao`, `Chip`, `Barra`, `Bolha`,
  `Quadro`, `CartaoCliente`, `Pilula`, `TituloDestaque`, `Revelar`, `Padroes`: **não mudam**.
- Saem: `Cantoneiras` das seções (a moldura é o que faz "quadradão"), `LinhasDiagonais` das seções internas.

## Tarefa 1 — Hero + faixa dos sete nós

`src/components/secoes/Hero.tsx`, `src/components/secoes/HeroPainel.tsx` (vira `FaixaFunil.tsx`).

- H1 a `clamp(3rem, 7.2vw, 7rem)`, em largura total, sem `max-w-[12ch]`.
- Parágrafo + ações em `medida` (640px) na coluna 7–12.
- Faixa de sangria total em `tinta-funda`, com os sete nós numa linha só (aquisição 4 + retenção 3),
  atravessada por um feixe horizontal; rótulos de grupo acima do primeiro nó de cada funil.
- Cartão do cliente pendurado na borda inferior da faixa, invadindo a seção seguinte.
- No celular a linha vira coluna com feixe vertical à esquerda.
- **Sai o `FeixeConexao` (SVG medido por JS), a `Inclinacao` e o `Parallax` do hero.** Menos JS.

## Tarefa 2 — Duas portas (laje) + Virada (folha à direita)

`src/components/secoes/DuasPortas.tsx`, `src/components/secoes/Virada.tsx`.

- DuasPortas: numeral gigante 02; cabeça 8–4; laje escura que sangra à direita, grade 7fr/5fr:
  cena "Quem chega" grande à esquerda, dois textos à direita, cartão "Quem volta" sobrepondo o canto
  inferior, deslocado para fora da laje. Fecho em `medida`. **Zero card com moldura nos textos.**
- Virada: numeral gigante 03; H2 em `t-display` largo, sem lead ao lado; folha de papel que começa na
  coluna 3 e sangra à direita, contendo lead, contraste em duas colunas com filete, e os três
  fundamentos em três colunas com numerais de 48px.

## Tarefa 3 — Aquisição (jornal) + Retenção (diagonal)

`src/components/secoes/Aquisicao.tsx`, `src/components/secoes/Retencao.tsx`.

- Aquisição: numeral gigante 04; cabeça 6–6; quatro colunas de jornal (`2fr 3fr 3fr 2fr`) separadas por
  filete vertical, numerais de 96px, esquemas **soltos no campo** — sem `BlocoEsquema`, sem superfície.
  Só o cartão "Fechou" continua sendo cartão (é o objeto, não a moldura).
- Retenção: numeral gigante 05 **centrado atrás do cartão**; leitura em diagonal — cabeça 6–6 em cima,
  apoio à esquerda embaixo, cartão grande no meio com os três estados, fecho à direita mais embaixo.
  Saem os dois cartões-fantasma de trás.

## Tarefa 4 — Acompanhamento (folha à esquerda) + Como começa (lista editorial)

`src/components/secoes/OQueVoceVe.tsx`, `src/components/secoes/ComoComeca.tsx`.

- OQueVoceVe: seção em tinta, folha de papel que sangra à **esquerda** ocupando o bloco; dentro dela
  cabeça 6–6, painel de acompanhamento **solto** (sem card: barras direto no papel, filetes separando)
  a 1–7, e a fala como citação com aspas em serifa grandes a 8–12. Sai o cartão da citação.
- ComoComeca: seção em tinta (era papel), numeral gigante 07; cabeça 6–6; lista editorial na metade
  direita (6–12) com numerais de 120px, feixe vertical à esquerda e as ações no fim. Saem os três cards.

## Tarefa 5 — Perguntas (largo) + CTA final

`src/components/secoes/Perguntas.tsx`, `src/components/secoes/CtaFinal.tsx`.

- Perguntas: H2 em `t-display t-display-denso` com `max-w-[20ch]`, e o acordeão em **largura total**,
  sem superfície escura em volta, filete entre itens, numeral em serifa clara à esquerda.
- CtaFinal: mantém a composição (texto em 1–6, motivo sangrando à direita), ajusta o ritmo ao novo
  sistema e confere que o texto não passa do traço do motivo.

## Tarefa 6 — Página, ritmo e integração (controlador)

`src/app/page.tsx`, ordem, separadores e ritmo vertical entre blocos. Build, lint, tsc, verificador.

## Tarefa 7 — Medição e prova (controlador)

1. `node docs/exploracao-visual/ferramentas/medir.mjs http://localhost:PORT` — cards, larguras, sangria, ritmos.
2. Lighthouse desktop e mobile sobre `next start`, três rodadas do mobile.
3. `prefers-reduced-motion`: nada se desloca, nenhum texto em opacidade 0, Lenis não instancia.
4. Teclado: ordem de tabulação, foco visível, Escape fecha o menu e devolve o foco.
5. Contraste: todo par texto/fundo medido por luminância.
6. `scrollWidth === innerWidth` em 320, 390 e 1440.
7. Capturas desktop 1440 e celular 390, página inteira e seção por seção.
8. Teste "mesmo estúdio" contra `docs/exploracao-visual/capturas/referencia-botolifting-03.png`.
