# Exploração visual da home — três direções de estrutura

> **Para quem executa:** use `superpowers:executing-plans` ou `superpowers:subagent-driven-development`, tarefa por tarefa. Caixas (`- [ ]`) para acompanhamento. **Nenhuma tarefa termina em commit** e **nenhuma tarefa toca em `src/`**: outro agente trabalha lá agora. Tudo que este plano cria vive em `docs/exploracao-visual/`.

> **Desvio registrado na execução (20/09/2026):** os três HTML não foram escritos à mão; são **gerados** por `ferramentas/construir.mjs` a partir de `src/lib/conteudo.ts` e de `ferramentas/partes.mjs` + `ferramentas/direcoes/*.mjs`. O deliverable (HTML autônomo) é o mesmo; a copy passa a vir da fonte única em vez de ser copiada três vezes. O resto do plano vale como está.

**Objetivo:** entregar três protótipos navegáveis da home da Lemis (HTML autônomo, abre por duplo clique), cada um quebrando "a caixa" por um caminho diferente, com a copy aprovada literal, capturas em desktop e celular, uma prancha comparativa e um `RESUMO.md` com medição antes/depois, tese, custo e risco de cada direção.

**Arquitetura:** um `base.css` compartilhado (tokens, tipografia, primitivas de interface desenhada, header, rodapé, movimento e `prefers-reduced-motion`) e três HTML que só diferem em estrutura e composição (`a-trilho.html`, `b-editorial.html`, `c-palco.html`). Fontes embutidas em base64 (`fontes.css`, gerado) porque Chrome bloqueia `@font-face` entre arquivos `file://`. Ferramentas em Node (`puppeteer-core` já vem com o `lighthouse` instalado, Chrome do sistema) para capturar, medir e conferir copy e marca.

**Stack:** HTML + CSS puro (uma exceção: ~25 linhas de JS no `c-palco.html` para trocar o estado do painel). Node 22 (importa `src/lib/conteudo.ts` direto, com type stripping). `puppeteer-core` 25 + `/Applications/Google Chrome.app`.

**Spec:** a mensagem de despacho (diagnóstico do gerente + reprovação do Vinicius: "queria mudar a estrutura, fazer algo mais bonito e menos quadradão"), `docs/PLANO-SITE-V2.md` §5 (copy e ordem dos nove blocos) e §7 (sistema visual), `docs/brief-site-v2.md` (régua de saída), e as quatro respostas do gerente em 20/09/2026: protótipos **com movimento em CSS**; direção C **entra como exploração** apesar do veto ao scrollytelling; **campos livres por direção** (tinta dominante e CTA azul continuam); entrega é **prancha comparativa + três links**.

## Restrições globais

- Não commitar, não fazer merge, não publicar, não fazer deploy. Não editar nada fora de `docs/exploracao-visual/`. `src/` é só leitura.
- Copy literal de `src/lib/conteudo.ts` no estado em que estiver na hora do build (a Tarefa 7 confere string por string e registra o hash do arquivo). Nove blocos na ordem do `page.tsx`: Hero, DuasPortas, Virada, Aquisicao, Retencao, OQueVoceVe, ComoComeca, Perguntas, CtaFinal, mais Header e Footer.
- Paleta estrita: `#304CFF`, `#F4F1EA`, `#17191D`, `#FFFFFF`, `#666A73`, `#ADB2BD`, `#203AD9`, `#182CAF`. Tons derivados só por `color-mix()`. Nenhuma opacidade em texto.
- Tipografia: Geist 900 em display e título, 600 em sub e controle; Instrument Serif itálica 400 azul em **uma palavra por título** e nos numerais ≥ 40 px, sempre pela classe `t-destaque`.
- Tinta dominante. CTA final azul. Papel onde a direção pedir.
- Sem foto, sem número, sem logo de cliente, sem depoimento, sem nicho, sem "leads", sem "Lemis Company", sem "agentes". Vocabulário de consultório vetado (lista do `scripts/verificar-marca.mjs`).
- `prefers-reduced-motion: reduce`: nenhuma animação de deslocamento, feixes estáticos em azul a 70%, troca de estado sem transição. Tudo legível sem JS.
- Sem rolagem horizontal em 390 e 1440 px (a Tarefa 8 mede).
- Lighthouse 100 desktop / 96 mobile e CLS 0 são piso **da implementação futura em `src/`**; cada direção declara no RESUMO o que custa a esse piso. Os protótipos não são medidos no Lighthouse (são HTML estático fora do Next), mas não podem usar técnica que a implementação não sustente: nada de biblioteca, nada de imagem, nada de scroll-jacking.

---

## Mapa de arquivos

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| Criar | `docs/exploracao-visual/PLANO.md` | Este plano |
| Criar | `docs/exploracao-visual/ferramentas/gerar-fontes.mjs` | Lê `src/app/fonts/*.woff2` e escreve `fontes.css` com `@font-face` em base64 |
| Gerado | `docs/exploracao-visual/fontes.css` | Geist variável + Instrument Serif itálica embutidas |
| Criar | `docs/exploracao-visual/base.css` | Tokens, campos, escala `t-*`, primitivas (pílula, chip, barra, bolha, nó, cartão do cliente, cantoneiras, quadro), header, rodapé, botões, acordeão nativo, movimento |
| Criar | `docs/exploracao-visual/a-trilho.html` | Direção A |
| Criar | `docs/exploracao-visual/b-editorial.html` | Direção B |
| Criar | `docs/exploracao-visual/c-palco.html` | Direção C |
| Criar | `docs/exploracao-visual/ferramentas/verificar-copy.mjs` | Cada string de `conteudo.ts` aparece no texto de cada HTML |
| Criar | `docs/exploracao-visual/ferramentas/verificar-marca.mjs` | Mesmas travas do verificador do site, aplicadas à pasta dos protótipos |
| Criar | `docs/exploracao-visual/ferramentas/medir.mjs` | Repete a medição feita na home (larguras, cards, sangria, esqueletos, altura, rolagem horizontal) nos três protótipos |
| Criar | `docs/exploracao-visual/ferramentas/capturar.mjs` | Capturas 1440 e 390, página inteira e dobra, movimento reduzido, estados do palco |
| Criar | `docs/exploracao-visual/prancha.html` | Prancha comparativa (três dobras lado a lado, três celulares, três páginas inteiras) e teste "mesmo estúdio" |
| Gerado | `docs/exploracao-visual/capturas/*.png` | Saída das Tarefas 8 e 9 |
| Criar | `docs/exploracao-visual/RESUMO.md` | Medição antes/depois, tese, custo, risco, recomendação, links |

---

## Sistema compartilhado (o que `base.css` define e as três direções consomem)

Copiado da escala do `globals.css` para os protótipos parecerem do mesmo estúdio do preview e da apresentação Botolifting v2:

```css
:root {
  --azul:#304CFF; --papel:#F4F1EA; --tinta:#17191D; --branco:#FFFFFF;
  --secundario:#666A73; --secundario-escuro:#ADB2BD; --azul-hover:#203AD9; --azul-ativo:#182CAF;
  --fio-claro: color-mix(in srgb, var(--tinta) 14%, transparent);
  --fio-escuro: color-mix(in srgb, var(--branco) 16%, transparent);
  --tinta-funda: color-mix(in srgb, var(--tinta) 88%, #000);       /* segundo tom de tinta: profundidade sem caixa */
  --superficie-escura: color-mix(in srgb, var(--branco) 5%, var(--tinta));
  --ease: cubic-bezier(.22,1,.36,1);
  --font-sans: 'Geist', Arial, sans-serif; --font-destaque: 'Instrument Serif', Georgia, serif;
}
.t-display { font-weight:900; font-size:clamp(2.75rem,6.5vw,6rem); line-height:1.02; letter-spacing:-.04em; text-wrap:balance }
.t-titulo  { font-weight:900; font-size:clamp(2rem,3.6vw,3rem); line-height:1.1; letter-spacing:-.03em; text-wrap:balance }
.t-sub     { font-weight:600; font-size:clamp(1.25rem,1.6vw,1.5rem); line-height:1.25; letter-spacing:-.015em }
.t-lead    { font-size:clamp(1.125rem,1.5vw,1.25rem); line-height:1.5 }
.t-corpo   { font-size:1.0625rem; line-height:1.55 }  /* 1.125rem ≥ 768px */
.t-legenda { font-size:.875rem; line-height:1.45 }
.t-rotulo  { font-weight:600; font-size:.75rem; letter-spacing:.08em; text-transform:uppercase }
.t-controle{ font-weight:600; font-size:1rem; letter-spacing:-.01em }
.t-destaque{ font-family:var(--font-destaque); font-style:italic; font-weight:400; color:var(--azul); letter-spacing:-.01em }
```

Primitivas (mesmos nomes de `src/components/esquema/`, em classes): `.pilula`, `.chip` / `.chip.azul`, `.barra` / `.barra.forte`, `.bolha.recebida` / `.bolha.enviada`, `.quadro`, `.cartao-cliente` (papel ou `.tinta`, com `.estados`), `.no` (nó de funil: ladrilho de ícone + `t-controle`), `.cantoneiras`, `.marco` (numeral serifa 40 px + traço). Header em vidro sobre tinta (wordmark branco, cinco itens de nav, botão azul; no celular só logo + botão, sem menu: o protótipo não precisa do JS do menu). Rodapé igual ao do preview.

Movimento (só CSS): `.entra` = `opacity` + `translateY(24px)` + `blur(6px)` → 0, por `animation-timeline: view()` com `animation-range: entry 0% entry 35%`, e `@supports not (animation-timeline: view())` deixa tudo visível. `.feixe` = linha base 16% branco + pulso azul em `background-position` (3,2 s loop). `.feixe-borda` = `conic-gradient` girando (5 s). Tudo dentro de `@media (prefers-reduced-motion: no-preference)`; no `reduce`, feixes viram azul 70% estático e nada se desloca.

Marca inline em cada HTML: `<svg style="display:none"><symbol id="wordmark">…` com os paths de `Wordmark.tsx`, `Simbolo.tsx`, `Motivo.tsx` e os seis ícones de `Icone.tsx`, usados por `<use href="#…">`.

---

## As três direções, seção por seção

Cada linha diz o que muda em relação ao preview (rótulo + título + lead à direita + caixas iguais). A copy é a mesma em todas.

### A · Trilho

**Tese:** o argumento é "um caminho fixo"; a página vira esse caminho. Uma linha azul contínua (o gesto do "l" do símbolo) desce pelo `main` inteiro, do primeiro nó do hero até virar à direita no CTA como o motivo da marca. O conteúdo pendura na linha alternando lados. Não há caixa com moldura: as interfaces desenhadas ficam soltas no campo, e a profundidade vem de um gradiente vertical de tinta (`--tinta` → `--tinta-funda`) e de glows. O cartão do cliente viaja pela linha (hero, duas portas, aquisição, retenção, acompanhamento).

| Bloco | Desktop (grid 12 col, trilho em `left:50%`) | Celular (trilho em `left:20px`, uma coluna à direita dele) |
|---|---|---|
| Hero | H1 `t-display` cruzando o trilho (12 col). Abaixo: parágrafo + botões nas col 1–5. À direita, os sete nós pendurados no trilho: aquisição à **esquerda** da linha (alinhados à direita, com traço horizontal até a linha), retenção à **direita**, escalonados para baixo; em "Fechou" o traço vira a linha horizontal que cruza para "Cliente novo" (o "l"). Cartão do cliente em papel sobrepondo a linha ao lado de "Fechou". "Comprou de novo" com feixe de borda. | H1, parágrafo, botões; nós em coluna, todos à direita do trilho, ticks horizontais; cartão abaixo de "Fechou". |
| Duas portas | Nó na linha + pílula. H2 col 1–6, lead col 8–12. Cena 1 (bolhas + chip) pendurada à esquerda; cena 2 (cartão em tinta, sem borda, só sombra) à direita, 120 px mais baixa. Textos sob cada cena. Fecho `t-sub` cruzando a linha, col 3–10. | Sequência vertical. |
| Virada | Bloco tipográfico 100%: H2 em `t-display` cruzando a linha; lead col 8–12. Contraste: "Agência…" à esquerda da linha, "A Lemis…" à direita — **o trilho é o filete**. Três fundamentos como nós na linha: 01 esquerda, 02 direita, 03 esquerda, numeral serifa 64 px encostado na linha. | Contraste empilhado; fundamentos à direita da linha. |
| Aquisição | Chips "roda dentro" + nota sob o lead. Quatro marcos em escada ao longo da linha (1 esq, 2 dir, 3 esq, 4 dir), cada um: numeral 64 px na linha, rótulo, interface desenhada solta sobre um glow (sem borda). Marco 4 = cartão do cliente em papel sobre a linha. | Escada vira coluna. |
| Retenção | Cartão grande em papel **centrado sobre a linha**, dois fantasmas atrás; apoio col 1–4, fecho col 9–12 (dos dois lados). | Cartão à direita da linha. |
| Acompanhamento (papel) | Campo papel; o trilho continua em tinta 14%. Painel desenhado solto à esquerda (barras 14 px direto no papel, chip azul), conversa à direita com o símbolo como avatar; nota. | Vertical. |
| Como começa (papel) | Três passos como nós na linha (esq/dir/esq), numeral 96 px serifa, título `t-sub`, corpo; botão + nota no fim, à direita da linha. | Coluna. |
| Perguntas (tinta) | H2 col 1–5 sticky; `<details>` col 7–12 separados por filete, numeral serifa 24 px branco, sem caixa. | Coluna. |
| CTA (azul) | A linha entra azul-sobre-azul? Não: entra **branca** no campo azul e vira à direita como o motivo (SVG do `Motivo` em papel, ancorado onde a linha termina). Título `t-display-denso` col 1–6, apoio, botão branco. | Motivo em cima, texto embaixo. |
| Rodapé | Igual ao preview. | Igual. |

**Custo de implementação em `src/`:** médio, 2 a 3 dias de execução. Novo: `Trilho` (um `div` absoluto por `main`, pulso por CSS), `Secao` ganha `lado="esquerda"|"direita"` e perde o container fixo, `HeroPainel` reescrito (nós sem moldura, alternando lados), cinco seções recompostas, `ComoComeca` e `Aquisicao` perdem cards. Nenhuma biblioteca. **Lighthouse:** risco baixo a médio; zero JS novo, um `div` absoluto a mais, glows como hoje; CLS 0 porque nada depende de fonte para posicionar a linha. **Reduzido:** linha estática azul 70%, ticks estáticos, entradas sem deslocamento.

### B · Editorial

**Tese:** o que faz uma página bonita é contraste de escala e assimetria, não superfície. As caixas somem quase todas: as interfaces desenhadas ficam diretamente no campo, sobrepostas em camadas com sombra. Larguras variam por seção (medida de texto 640 px, faixas de sangria total 100vw, folha de papel deslocada). Numerais em serifa de 200 px, em `color-mix(azul 30%, tinta)`, marcam as seções cortados pela borda esquerda. Títulos em `t-display` em mais lugares.

| Bloco | Desktop | Celular |
|---|---|---|
| Hero | Pílula. H1 em `t-display` a 7.2vw, 12 col, três linhas. Parágrafo em medida de 640 px nas col 7–12; botões abaixo. Depois, **faixa de sangria total** (fundo `--tinta-funda`, sem borda, 100vw): os sete nós numa linha horizontal ligados por um feixe único da esquerda para a direita, rótulos "Aquisição" / "Retenção" como `t-rotulo` acima dos grupos, "Comprou de novo" com feixe de borda; cartão do cliente sobrepondo a borda inferior da faixa, à esquerda. | Faixa vira coluna de nós com feixe vertical; cartão abaixo. |
| Duas portas | Numeral "02" cortado à esquerda. H2 `t-display` medida 10ch. Uma laje assimétrica (`--tinta-funda`, começa na col 1, sangra à direita, raio 32 só na esquerda): cena 1 grande (bolhas 1.25×) à esquerda, cena 2 (cartão em tinta) sobrepondo o canto inferior direito da cena 1. Textos em medida 640 nas col 8–12, um após o outro; fecho `t-sub` em 640. | Laje 100%, cenas empilhadas com sobreposição de 24 px. |
| Virada | Numeral "03". H2 `t-display` em tinta. Abaixo entra a **folha de papel**: começa na col 3, sangra à direita, raio 32 na esquerda; dentro: lead em 640, contraste em duas colunas com filete de 100% da folha, três fundamentos em três colunas com filete superior e numerais `t-destaque` 48 px. À esquerda da folha o campo de tinta fica visível com o numeral. | Folha 100% com margem esquerda de 16 px de tinta. |
| Aquisição | Numeral "04". H2 e lead. Chips. Quatro marcos em **colunas de jornal** de larguras 2fr 3fr 3fr 2fr, separadas por filetes verticais que correm a altura toda da seção; sem card; numerais 96 px no topo; interfaces desenhadas soltas. | Colunas viram lista com filete entre itens. |
| Retenção | Numeral "05" atrás do cartão. Cartão do cliente em papel a 520 px, centrado nas col 4–9, sombra longa; apoio em 640 à esquerda acima, fecho à direita abaixo (diagonal de leitura). | Cartão 100%. |
| Acompanhamento (papel) | Folha de papel deslocada para a **esquerda** (sangra à esquerda, raio 32 à direita, col 1–10). Painel desenhado direto no papel em escala grande: indicadores com barras de 20 px, origens com barras de 14 px; conversa como citação `t-sub` com aspas em serifa 120 px azul; nota. | Folha 100%. |
| Como começa (tinta) | Numeral "07". Três passos em lista editorial de medida 720 px, alinhada à direita (col 6–12): numeral 120 px serifa à esquerda do texto, título `t-sub`, corpo; linha de progresso azul vertical à esquerda dos numerais. Botão + nota. | Coluna. |
| Perguntas (tinta) | H2 `t-display` 12 col. `<details>` em largura total com filete, numeral serifa 24 px, sem caixa. | Igual. |
| CTA (azul) | Como o preview: título `t-display-denso`, apoio, botão branco, motivo à direita. | Motivo em cima. |
| Rodapé | Igual ao preview. | Igual. |

**Custo:** baixo, 1 a 2 dias. Só composição e CSS: `Secao` ganha variantes de largura (`medida`, `sangria`, `folha`), `Numeral` novo (serifa 200 px, `aria-hidden`), cards saem de `DuasPortas`, `Aquisicao`, `ComoComeca` e `Perguntas`. Nenhuma biblioteca, nenhum JS. **Lighthouse:** risco baixo; menos nós no DOM que hoje. Numeral gigante é texto na fonte já pré-carregada, sem CLS. **Reduzido:** idêntico ao de hoje.

### C · Palco

**Tese:** o produto é o funil desenhado; ele é o protagonista e a página rola em volta dele. Uma caixa só na primeira metade da página, nenhuma outra. No desktop o painel fica fixo (`position: sticky; top: 96px`) na metade direita enquanto o texto das seis primeiras seções rola à esquerda, e o painel muda de estado por seção. No celular o painel fica preso na base da tela (`position: sticky; bottom: 0`, 42svh) e o texto rola acima dele: é a mesma ideia com outro gesto, não uma degradação.

Estados do painel (`data-estado` no `.palco`, trocado por IntersectionObserver de 25 linhas; sem JS o painel fica no estado `inicio`):

| Seção à esquerda | `data-estado` | O que o painel mostra |
|---|---|---|
| Hero | `inicio` | Os dois funis completos, feixes correndo, cartão "Origem registrada". |
| Duas portas | `portas` | Nós apagados (cinza), só "Conversa no WhatsApp" e "Cliente novo" acesos; sobre o painel entram a bolha "Vi o anúncio, quanto fica?" com chip "Sem próximo passo" e o cartão "Sem data de volta". |
| Virada | `caminho` | Todos os nós acesos, feixes correndo, o "l" inteiro em azul 100%; nada mais. |
| Aquisição | `aquisicao` | Coluna da esquerda acesa com os quatro marcos numerados (numeral serifa ao lado de cada nó), coluna da direita apagada; cartão "Virou cliente". |
| Retenção | `retencao` | Coluna da direita acesa; cartão grande em papel com os três estados sobre a coluna da esquerda apagada. |
| Acompanhamento | `painel` | O painel vira o painel de acompanhamento: três indicadores (Entraram, Avançaram, Voltaram), barras por origem, chip "Atualizado em tempo real". |

Seções 7 a 9 ficam fora do palco, em largura total: Como começa (papel) com três passos em linha horizontal e numerais serifa 96 px, sem cards; Perguntas com `<details>` e filetes; CTA azul como o preview. Rodapé igual.

**Custo:** alto, 3 a 4 dias. `Palco` novo (client component com IntersectionObserver, `useReducedMotion`), `HeroPainel` reescrito com seis estados e camadas de cena, cinco seções viram "lâminas" de texto (`min-height: 100svh`), duas versões de layout (sticky à direita / sticky embaixo). Nenhuma biblioteca. **Lighthouse:** risco médio. TBT sobe pouco (um observer). O painel passa a ser o elemento de LCP no desktop e é HTML desenhado, sem imagem. No celular o painel preso ocupa 42svh permanentemente: a primeira dobra mostra menos texto e o LCP continua sendo o H1. **Reduzido:** troca de estado sem transição (`transition: none`), feixes estáticos. **Aviso registrado:** é o gênero que o plano vetou no Atendly ("scrollytelling de 3.000 px"); aqui são seis estados, sem scroll-jacking, e a página fica mais curta que a atual porque cinco seções compartilham um painel.

---

## Tarefas

Ordem: 1 → 2 → (3, 4, 5 em paralelo) → 6 → 7 → 8 → 9 → 10. Cada tarefa termina com o critério de aceite escrito. Sem commit.

### Tarefa 1: fontes embutidas

**Files:**
- Create: `docs/exploracao-visual/ferramentas/gerar-fontes.mjs`
- Gera: `docs/exploracao-visual/fontes.css`

**Interfaces:** produz `fontes.css` com `@font-face` `'Geist'` (100–900) e `'Instrument Serif'` (400 italic) em `data:font/woff2;base64,…`. `base.css` importa com `@import url("fontes.css");`.

- [ ] **Passo 1: escrever o gerador**

```js
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
```

- [ ] **Passo 2: rodar e conferir**

Run: `node docs/exploracao-visual/ferramentas/gerar-fontes.mjs`
Esperado: `fontes.css: ~115 KB`, arquivo com duas regras `@font-face`.

### Tarefa 2: `base.css`

**Files:**
- Create: `docs/exploracao-visual/base.css`

**Interfaces:** produz as classes listadas em "Sistema compartilhado" (tokens, `campo-tinta|papel|azul`, `t-*`, `.pilula`, `.chip`, `.barra`, `.bolha`, `.quadro`, `.cartao-cliente`, `.no`, `.cantoneiras`, `.marco`, `.botao`, `.header`, `.rodape`, `.entra`, `.feixe`, `.feixe-borda`, `.detalhe` para o acordeão nativo). As três direções acrescentam CSS próprio em `<style>` no HTML; nada de direção entra no `base.css`.

- [ ] **Passo 1: escrever tokens, reset, campos e escala** exatamente como no bloco de código de "Sistema compartilhado", mais `body{margin:0;background:var(--tinta);color:var(--branco);font-family:var(--font-sans);-webkit-font-smoothing:antialiased}` e `.container{max-width:1408px;margin-inline:auto;padding-inline:clamp(20px,4vw,64px)}`.
- [ ] **Passo 2: primitivas** com as mesmas medidas do site: pílula (`t-rotulo`, anel 16%, ponto azul 6 px), chip (`t-legenda`, cápsula, ponto; `.azul` = anel azul 45% + fundo azul 14%), barra (10 px, raio 999, `currentColor` 16% / `.forte` 38%), bolha (raio 14, canto 4 px, recebida = branco 8%, enviada = azul), quadro (borda 14% + duas diagonais em SVG inline via `background-image`), cartão do cliente (papel: fundo branco, borda tinta 10%, sombra em camadas; `.tinta`: superfície escura; avatar 36 px, duas barras, `ol.estados` com círculos, último em azul com check), nó (superfície escura, ladrilho 36 px azul 18%, ícone 24 px por `<use>`, `t-controle`; `.destino` = ladrilho azul cheio + feixe de borda), cantoneiras (quatro `L` de 24 px, 25% em tinta / 14% em papel), marco (numeral `t-destaque` 40 px + traço 1 px).
- [ ] **Passo 3: header e rodapé** copiados do preview: header `position:sticky; top:0`, barra de 64 px dentro de um container com raio 16 e vidro (`tinta 88% + backdrop-filter: blur(12px)`), wordmark branco 112 px, nav `t-controle` (some abaixo de 1024 px), botão azul. Rodapé: grid 5/3/3, wordmark 128 px, apoio, Navegar, Conversar, linha legal.
- [ ] **Passo 4: botões** (`.botao` 48 px, raio 8, azul/branco; `.botao.sobre-azul` branco/azul; seta externa em SVG inline) e **acordeão nativo** (`details.detalhe` com `summary` em `t-sub`, numeral `t-destaque` 24 px branco, filete entre itens, `summary::-webkit-details-marker{display:none}`, sinal `+`/`−` em pseudo-elemento).
- [ ] **Passo 5: movimento e reduzido**

```css
@media (prefers-reduced-motion: no-preference) {
  .entra { animation: entra .8s var(--ease) both; animation-timeline: view(); animation-range: entry 0% entry 35%; }
  @supports not (animation-timeline: view()) { .entra { animation: none; } }
  @keyframes entra { from { opacity: 0; transform: translateY(24px); filter: blur(6px); } }
  .entra-hero { animation: entra-hero .7s var(--ease) both; animation-delay: calc(var(--i, 0) * 60ms + 60ms); }
  @keyframes entra-hero { from { opacity: 0; transform: translateY(.5em); } }
  .feixe::after { animation: feixe-correr 3.2s linear infinite; animation-delay: var(--atraso, 0s); }
  .feixe-borda::after { animation: fb-girar 5s linear infinite; }
}
@media (prefers-reduced-motion: reduce) {
  .feixe { --cor-feixe: color-mix(in srgb, var(--azul) 70%, transparent); }
  .feixe::after { display: none; }
  .feixe-borda::after { background: conic-gradient(color-mix(in srgb, var(--azul) 60%, transparent) 0 100%); }
}
```

`.feixe` é um `div` de 2 px (vertical) ou 2 px de altura (horizontal, `.feixe.h`) com fundo `--cor-feixe` (padrão branco 16%) e `::after` = trecho azul de 16% do comprimento com `filter: drop-shadow(0 0 6px var(--azul))` que corre de 0 a 100% em `feixe-correr`.

- [ ] **Passo 6: aceite** — abrir um HTML de teste no Chrome com uma pílula, um nó, um cartão do cliente e um feixe; conferir que Geist e Instrument Serif carregam (`document.fonts.check("italic 400 40px 'Instrument Serif'")` = `true`), que o feixe corre e que com `--force-prefers-reduced-motion` ele fica estático. Apagar o HTML de teste.

### Tarefa 3: `a-trilho.html`

**Files:**
- Create: `docs/exploracao-visual/a-trilho.html`

**Interfaces:** consome `base.css`. Produz a página inteira com `id` nas seções iguais aos do site (`inicio`, `duas-portas`, `como-funciona`, `aquisicao`, `retencao`, `acompanhamento`, `como-comeca`, `perguntas`, `contato`) para a nav funcionar e para o `medir.mjs` encontrar os blocos por `main > section, footer`.

- [ ] **Passo 1: esqueleto** — `<!doctype html><html lang="pt-BR">`, `<title>Lemis — Cliente novo entrando, cliente antigo voltando</title>` (o `metadados.titulo` de `conteudo.ts`), `<link rel="stylesheet" href="base.css">`, `<style>` com o CSS da direção, sprite de marca, header, `main` com as nove seções e o `div.trilho`, rodapé.
- [ ] **Passo 2: trilho** — `main{position:relative}`; `.trilho{position:absolute; top:0; bottom:0; left:50%; width:2px; background: var(--fio-escuro)}` com `::after` = pulso azul de 240 px correndo (`feixe-correr` vertical, 6 s), e em `.campo-papel` a cor base vira `--fio-claro`. Abaixo de 1024 px `left:20px`. `.no-trilho` = círculo de 12 px, anel azul 2 px, fundo tinta, centrado na linha (`left:50%; transform:translateX(-50%)`), usado no início de cada seção ao lado da pílula.
- [ ] **Passo 3: as nove seções** conforme a tabela da direção A. Cada seção: `.container` com `display:grid; grid-template-columns: repeat(12, 1fr); column-gap: 24px`. "Lado esquerdo" = `grid-column: 1 / 6`, "lado direito" = `7 / 13`. Hero: nós em `ol` com `li` posicionados por `grid-row` alternado; ticks = `span.tick` de 1 px até a linha; o "l" = `div.feixe.h` entre "Fechou" e "Cliente novo". Cartão do cliente com `margin-left: -40px` sobre a linha.
- [ ] **Passo 4: celular** — `@media (max-width: 1023px)`: grid vira uma coluna com `padding-left: 48px`, tudo à direita do trilho.
- [ ] **Passo 5: aceite** — abre por duplo clique, sem erro no console, nav rola até cada `id`, nada corta em 390 px (`document.documentElement.scrollWidth === innerWidth`).

### Tarefa 4: `b-editorial.html`

**Files:**
- Create: `docs/exploracao-visual/b-editorial.html`

- [ ] **Passo 1: esqueleto** igual ao da Tarefa 3.
- [ ] **Passo 2: unidades de largura** — `.medida{max-width:640px}`, `.sangria{width:100vw; margin-left:calc(50% - 50vw)}` (faixa), `.folha{background:var(--papel); color:var(--tinta); border-radius:32px 0 0 32px; margin-left:calc(2/12*100%); margin-right:calc(50% - 50vw); padding: clamp(40px,5vw,80px)}` e `.folha.esquerda{border-radius:0 32px 32px 0; margin-left:calc(50% - 50vw); margin-right:calc(2/12*100%)}`. `.numeral{position:absolute; left:-.12em; top:-.1em; font-family:var(--font-destaque); font-style:italic; font-size:clamp(120px,14vw,220px); line-height:1; color:color-mix(in srgb, var(--azul) 30%, var(--tinta)); pointer-events:none}` com `aria-hidden`. `body{overflow-x:clip}` para a sangria não abrir rolagem horizontal.
- [ ] **Passo 3: as nove seções** conforme a tabela da direção B. Faixa do hero: `ol.faixa` com sete `li.no` em `display:flex; justify-content:space-between` sobre `div.feixe.h` absoluto atrás. Laje das duas portas: `div.laje{background:var(--tinta-funda); border-radius:32px 0 0 32px; margin-right:calc(50% - 50vw); position:relative}` com cena 2 em `position:absolute; right:12%; bottom:-48px`. Colunas de jornal: `ol{display:grid; grid-template-columns:2fr 3fr 3fr 2fr}` com `li + li{border-left:1px solid var(--fio-escuro)}` e padding.
- [ ] **Passo 4: celular** — numerais a 120 px, folhas e lajes a 100% com raio 24, colunas de jornal viram lista com filete.
- [ ] **Passo 5: aceite** — igual ao da Tarefa 3.

### Tarefa 5: `c-palco.html`

**Files:**
- Create: `docs/exploracao-visual/c-palco.html`

- [ ] **Passo 1: esqueleto** igual ao da Tarefa 3.
- [ ] **Passo 2: o palco** — `section.palco{display:grid; grid-template-columns: 5fr 7fr; column-gap: 48px}` no desktop; `.laminas` (coluna esquerda) com seis `article.lamina[data-estado]{min-height: calc(100svh - 96px); display:flex; flex-direction:column; justify-content:center}`; `.painel-fixo{position:sticky; top:96px; align-self:start; height:calc(100svh - 128px)}`. Celular: `grid-template-columns:1fr`; o `.painel-fixo` vem **depois** das lâminas no DOM e usa `position:sticky; bottom:0; height:42svh` (no desktop, `order:2` e `bottom:auto`). Como a ordem no DOM é a mesma nos dois, o sticky-bottom funciona sem JS.
- [ ] **Passo 3: o painel com seis cenas** — `div.painel` (superfície escura, raio 24, padrão de pontos) contendo as duas colunas de nós como no hero do site (com `data-no="anuncio"` etc.), os feixes, e camadas `.cena[data-cena="portas|aquisicao|retencao|painel"]` absolutas, `opacity:0; transition: opacity .5s var(--ease)`. CSS por estado: `[data-estado="portas"] .no{color-mix apagado} [data-estado="portas"] .no[data-no="conversa"], …{aceso}`; `[data-estado="painel"] .funis{opacity:0} [data-estado="painel"] .cena[data-cena="painel"]{opacity:1}` e assim por diante para a tabela de estados. `@media (prefers-reduced-motion: reduce){.painel *{transition:none}}`.
- [ ] **Passo 4: o JS de estado** (o único JS da entrega)

```html
<script>
  // Troca o estado do painel conforme a lâmina mais visível. Sem JS, o painel fica em "inicio".
  const palco = document.querySelector(".palco");
  const laminas = [...document.querySelectorAll(".lamina")];
  const visivel = new Map();
  const io = new IntersectionObserver((entradas) => {
    for (const e of entradas) visivel.set(e.target, e.intersectionRatio);
    const [melhor] = [...visivel.entries()].sort((a, b) => b[1] - a[1]);
    if (melhor && melhor[1] > 0) palco.dataset.estado = melhor[0].dataset.estado;
  }, { threshold: [0, .25, .5, .75, 1] });
  laminas.forEach((l) => io.observe(l));
</script>
```

- [ ] **Passo 5: seções 7 a 9 e rodapé** conforme a tabela.
- [ ] **Passo 6: aceite** — rolar e ver o painel trocar seis vezes no desktop e no celular; com `--force-prefers-reduced-motion` trocar sem fade; sem JS (`--disable-javascript`) o painel mostra `inicio` e a página inteira é legível.

### Tarefa 6: `verificar-copy.mjs` e `verificar-marca.mjs`

**Files:**
- Create: `docs/exploracao-visual/ferramentas/verificar-copy.mjs`
- Create: `docs/exploracao-visual/ferramentas/verificar-marca.mjs`

- [ ] **Passo 1: verificar-copy**

```js
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
// href e ícones não são copy
for (const s of [...strings]) if (/^#|^https?:/.test(s) || /^(aquisicao|atendimento|conexao|criacao|inteligencia|vendas)$/.test(s)) strings.delete(s);

const norm = (t) => t.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const hash = createHash("sha256").update(readFileSync(join(raiz, "src/lib/conteudo.ts"))).digest("hex").slice(0, 12);
let falhas = 0;
for (const arq of ["a-trilho.html", "b-editorial.html", "c-palco.html"]) {
  const html = readFileSync(join(aqui, "..", arq), "utf8");
  const texto = norm(html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, ""));
  const faltam = [...strings].filter((s) => !texto.includes(norm(s)));
  console.log(`${arq}: ${strings.size - faltam.length}/${strings.size} strings`);
  faltam.forEach((s) => console.log("   FALTA:", s.slice(0, 80)));
  falhas += faltam.length;
}
console.log(`conteudo.ts sha256 ${hash}`);
process.exit(falhas ? 1 : 0);
```

- [ ] **Passo 2: verificar-marca** — copiar a lista `PROIBIDAS` e a `PALETA` de `scripts/verificar-marca.mjs` (ler, não importar: o script lê `src/` fixo), varrer `docs/exploracao-visual/*.html` e `base.css`, e reprovar: termo proibido no texto (sem tags, sem `<style>`, sem `<script>`), hex fora da paleta em qualquer arquivo, `rgba(`/`opacity:` aplicados a seletor de texto (`p`, `h1`–`h3`, `.t-`), `font-style: italic` fora da regra `.t-destaque`, mais de um `<em class="t-destaque">` no mesmo `h1|h2`. Sair com 1 se reprovar. "APL" é isento no rodapé (`<footer>`).
- [ ] **Passo 3: aceite** — os dois scripts saem com 0 nos três HTML. Teste da trava: colar "Compareceu" num HTML, ver o `verificar-marca` sair com 1, remover.

### Tarefa 7: `medir.mjs`

**Files:**
- Create: `docs/exploracao-visual/ferramentas/medir.mjs`

- [ ] **Passo 1: script** — `puppeteer-core` com `executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`, `args: ["--allow-file-access-from-files"]`. Para cada HTML e para `http://localhost:3000` (a home atual, como base), em 1440×900 e 390×844, avaliar no page a mesma função usada na medição inicial (blocos = `main > section, footer`; esqueleto = pílula + `h1|h2` + `p.t-lead` à direita; cards de topo = elementos com borda nos quatro lados e raio ≥ 8 maiores que 120×60 que não estejam dentro de outro card; larguras distintas = `Set` das larguras de conteúdo dos containers (`.container`, `.medida`, `.folha`, `.laje`, `.sangria`); sangria = elementos cujo `getBoundingClientRect` ultrapassa o `.container` do bloco, excluindo `position:absolute` e SVG; altura = `scrollHeight`; rolagem horizontal = `scrollWidth > innerWidth`). Imprimir tabela markdown em `docs/exploracao-visual/capturas/medicao.md`.
- [ ] **Passo 2: aceite** — a tabela tem quatro linhas (Home atual, A, B, C) × duas larguras, e nenhuma linha tem rolagem horizontal.

### Tarefa 8: `capturar.mjs`

**Files:**
- Create: `docs/exploracao-visual/ferramentas/capturar.mjs`
- Gera: `docs/exploracao-visual/capturas/{a,b,c}-{desktop,mobile}.png`, `{a,b,c}-dobra-{desktop,mobile}.png`, `{a,b,c}-reduzido-desktop.png`, `c-estado-{1..6}.png`

- [ ] **Passo 1: script** — mesmo lançamento da Tarefa 7. Para cada HTML: (a) desktop `setViewport({width:1440,height:900})`, `document.fonts.ready`, rolar até o fim em passos de 600 px com 80 ms, voltar ao topo, esperar 1,2 s, `screenshot({fullPage:true})` e `screenshot()` da dobra; (b) mobile `setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true})`, mesmo procedimento; (c) desktop com `page.emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}])`, só a dobra; (d) só para `c-palco.html`: rolar até o topo de cada `.lamina` (`scrollIntoView({block:"start"})`), esperar 900 ms, `screenshot()` do viewport → `c-estado-N.png`.
- [ ] **Passo 2: aceite** — 21 PNG na pasta, nenhum preto (checar `sharp`? não: abrir três com o `Read` e olhar).

### Tarefa 9: `prancha.html` e capturas comparativas

**Files:**
- Create: `docs/exploracao-visual/prancha.html`
- Copia: `docs/validacao/v2/desktop-hero.png` → `capturas/atual-dobra-desktop.png`; `…/botolifting-v2/saida/pagina-03.png` → `capturas/referencia-botolifting-03.png`
- Gera: `capturas/prancha.png`, `capturas/mesmo-estudio.png`

- [ ] **Passo 1: prancha** — página de 2400 px de largura em tinta com três colunas (A · Trilho, B · Editorial, C · Palco), cada uma com título, tese em uma frase, a dobra desktop (`a-dobra-desktop.png`) em 720 px, a dobra mobile ao lado em 200 px e a página inteira em miniatura (altura fixa 900 px, `object-fit: cover; object-position: top`). Segunda faixa "Mesmo estúdio?": home atual, A, B, C e a página 03 do Botolifting v2 em linha. Capturar as duas faixas com o `capturar.mjs` (adicionar `prancha.html` à lista, `fullPage`, viewport 2400).
- [ ] **Passo 2: aceite** — `prancha.png` abre e mostra as três direções lado a lado; `mesmo-estudio.png` mostra as cinco dobras.

### Tarefa 10: `RESUMO.md`

**Files:**
- Create: `docs/exploracao-visual/RESUMO.md`

- [ ] **Passo 1: escrever** com estas seções, nesta ordem: (1) Como ver: três links relativos para os HTML, link para `capturas/prancha.png`; (2) Medição da home atual (a tabela do brainstorming) e o veredito sobre o diagnóstico com os dois agravantes (altura 8.808 px, tinta chapada); (3) Medição depois: a tabela de `capturas/medicao.md`; (4) Uma seção por direção: tese em duas frases, o que muda em cada bloco (tabela curta), custo em dias e arquivos de `src/` que mudam, risco Lighthouse e reduced-motion, fraqueza declarada, links para as capturas; (5) Recomendação e o que eu pediria ao Vinicius escolher olhando; (6) O que ficou de fora e por quê (menu mobile sem JS, sem Lighthouse nos protótipos); (7) `[PENDENTE DE VALIDAÇÃO]` para cada suposição: mapa de campos por direção, direção C apesar do veto, hash do `conteudo.ts` usado.
- [ ] **Passo 2: aceite** — `humanizer` mental: sem adjetivo sem número atrás, sem "revolucionar", sem repetição do despacho. Todo caminho de arquivo criado aparece como link.

---

## Auto-revisão do plano

- **Cobertura:** medição (feita no brainstorming, repetida na Tarefa 7 nos protótipos), três direções (Tarefas 3–5), copy real (Tarefa 6), capturas desktop e celular (Tarefa 8), imagem para o Vinicius escolher (Tarefa 9), custo e risco por direção (tabelas das direções + RESUMO), `RESUMO.md` (Tarefa 10), "mesma Lemis" (base.css comum + faixa "mesmo estúdio"). Reduced-motion coberto na Tarefa 2 e nos aceites de 3–5.
- **Placeholders:** nenhum "TBD". Os HTML não estão transcritos no plano porque a composição está nas tabelas por direção e a primitiva no `base.css`; quem executa escreve o markup a partir delas.
- **Consistência de nomes:** `.entra`, `.feixe`, `.feixe.h`, `.feixe-borda`, `.no`, `.cartao-cliente`, `.pilula`, `.chip.azul`, `.container`, `.medida`, `.folha`, `.laje`, `.sangria`, `.trilho`, `.palco`, `.lamina[data-estado]`, `.painel-fixo`, `.cena[data-cena]` são os mesmos em todas as tarefas.
