# Rodada de correção 1 — home B · Editorial

Cinco achados, cinco corrigidos. Medido no preview `http://localhost:3100`, Chrome headless via
`puppeteer-core`, script próprio no diretório de rascunho (não sobrescreveu `docs/validacao/b/`).

Arquivos tocados — e só estes quatro:

- `src/components/secoes/FaixaFunil.tsx` (F1, F5)
- `src/components/secoes/Aquisicao.tsx` (F2)
- `src/components/secoes/Perguntas.tsx` (F3)
- `src/components/secoes/CtaFinal.tsx` (F4)

`globals.css`, `accordion.tsx`, `esquema/Bolha.tsx` e as primitivas da fundação ficaram intactos.
Nada commitado.

---

## F1 — rolagem horizontal em 1024 px

**Correção:** a virada da linha subiu de `lg:` para `xl:` em todo o `FaixaFunil.tsx` — direção das
duas `<ol>`, do contêiner que as agrupa, padding do envelope (`xl:px-6 xl:py-10`), feixe horizontal
(`hidden xl:block`) e feixe vertical (`xl:hidden`). Entre 1024 e 1280 vale a coluna com o feixe
vertical, o mesmo gesto do celular. O comentário de cabeçalho do arquivo, que justificava a quebra
de rótulo em `lg`, foi reescrito para dizer o motivo novo.

`document.documentElement.scrollWidth` contra `innerWidth`:

| janela | antes | depois | piso |
|---|---|---|---|
| 320  | 320  | 320  | ok |
| 390  | 390  | 390  | ok |
| 768  | 768  | 768  | ok |
| 1024 | **1089** | **1024** | ok |
| 1279 | 1279 | 1279 | ok |
| 1280 | 1280 | 1280 | ok |
| 1366 | 1366 | 1366 | ok |
| 1440 | 1440 | 1440 | ok |
| 1920 | 1920 | 1920 | ok |

Nenhum nó com `right > innerWidth` em nenhuma das nove janelas (a varredura elemento a elemento
volta lista vazia; antes ela acusava a `<ol>` da retenção em `right: 1089`).

**Os sete nós numa linha só**, medidos pelos sete `<li>` das duas listas (ordenados por `left`,
sem sobreposição horizontal e com as bandas verticais se cruzando):

| janela | `flex-direction` do grupo | nós | uma linha | `right` do último nó |
|---|---|---|---|---|
| 1024 | column | 7 | — (coluna, por projeto) | 298,2 |
| 1279 | column | 7 | — (coluna, por projeto) | 298,2 |
| 1280 | row | 7 | sim | 1256 (janela 1280) |
| 1366 | row | 7 | sim | 1342 (janela 1366) |
| 1440 | row | 7 | sim | 1416 (janela 1440) |
| 1920 | row | 7 | sim | 1896 (janela 1920) |

**A coluna com o feixe vertical em 1024**, `display` computado dos dois feixes da faixa:

| janela | feixe h | feixe v |
|---|---|---|
| 1024 (antes) | `block`, 1024 × 2 | `none` |
| 1024 (depois) | `none` | `block`, 2 × 530 |
| 1279 (depois) | `none` | `block`, 2 × 530 |
| 1280 (depois) | `block`, 1280 × 2 | `none` |

## F2 — a bolha enviada do marco 02 colapsava

**Correção:** `<Bolha lado="enviada" className="w-[86%]" />` em `EsquemaConversa`, que é a tradução
de `.esquema .bolha.enviada { width: 86% }` do protótipo e é isenta da trava de métrica do
verificador. Comentário curto ao lado explicando o porquê: o `ml-auto` tira o `stretch` do flex, a
bolha vira `fit-content` e as barras-fantasma em porcentagem não têm contra o que resolver.

`getBoundingClientRect().width` da bolha, em px:

| janela | recebida antes | enviada antes | recebida depois | **enviada depois** |
|---|---|---|---|---|
| 1440 | 281,22 | **32,00** | 281,22 | **281,22** |
| 1024 | — | 32,00 | 190,41 | 190,41 |
| 390  | 301,00 | 32,00 | 301,00 | 301,00 |

A recebida não mudou em nenhuma janela (281,22 → 281,22 em 1440; 301 → 301 em 390) e no celular a
enviada passou de 32 para 301 px, que é a mesma largura da vizinha. Confirmado também na captura:
a bolha azul sai larga, com as duas barras-fantasma dentro.

## F3 — o FAQ não tinha filete em cima nem embaixo

**Correção:** `className="border-y border-fio-escuro"` na raiz do `<Accordion>`, sem tocar em
`src/components/ui/accordion.tsx`. Os `AccordionItem` continuam com `border-b last:border-b-0`,
então não há filete duplicado embaixo do 05.

Estilo computado da raiz do acordeão (`[data-orientation="vertical"]`), em 1440:

| | antes | depois |
|---|---|---|
| `borderTopWidth` | `0px` | **`1px`** |
| `borderBottomWidth` | `0px` | **`1px`** |
| cor da borda | — | `rgba(255, 255, 255, 0.16)` (`--color-fio-escuro`) |
| `borderTopWidth` do primeiro item | `0px` | `0px` (o de cima é o da raiz) |
| `borderBottomWidth` do último item | `0px` | `0px` (o de baixo é o da raiz) |

Cinco itens fechados em cima e embaixo, conferido também na captura.

## F4 — `lg:min-h-[640px]` duplicado

**Correção:** saiu do `<Container>`, ficou só na `<Secao>`.

| | antes | depois |
|---|---|---|
| `min-height` computado do `Container` do CTA em 1440 | `640px` | **`0px`** |
| `className` do `Container` | `… relative z-10 lg:min-h-[640px]` | `… relative z-10` |

A `Secao` segue com `className="lg:min-h-[640px]"`, e a altura da seção não mudou.

## F5 — respiro do segundo grupo da faixa no celular

**Correção:** o `gap` entre os dois grupos abaixo de `xl` passou de `gap-10` (40 px) para
`gap-[54px]`, que é a soma do protótipo: `.linha{gap:14px}` + `.linha li[data-grupo]{margin-top:40px}`.
Em `xl` continua `xl:gap-6`.

Medido com o rótulo "RETENÇÃO" e o nó "Fechou" acima dele:

| janela | | antes | depois |
|---|---|---|---|
| 390 | `row-gap` do contêiner | 40 px | **54 px** |
| 390 | nó "Fechou" → nó "Cliente novo" | 40 px | **54 px** |
| 390 | nó "Fechou" → topo do rótulo "RETENÇÃO" | 9,2 px | **23,2 px** |
| 1024 | nó → nó | 40 px | **54 px** |
| 1024 | nó → rótulo | 9,2 px | **23,2 px** |

(O "antes" foi medido na página viva, devolvendo `rowGap` para `40px` pelo DOM e relendo os
retângulos, não deduzido.)

---

## Portões

| portão | resultado |
|---|---|
| `npm run verificar` | `Verificação de marca: ok` |
| `npx tsc --noEmit` | limpo, saída vazia, exit 0 |
| `npx eslint src` | limpo, saída vazia, exit 0 |
| `scrollWidth === innerWidth` em 320/390/768/1024/1279/1280/1366/1440/1920 | nove de nove |

Sem biblioteca nova, sem `any`, sem `<img>`, sem hex novo, sem literal de texto novo (nenhuma copy
foi tocada), sem animação só-CSS nova — as quatro mudanças são classes utilitárias e uma remoção.

## Pendências

Nenhuma bloqueia. Duas observações fora do escopo dos cinco achados, não corrigidas de propósito:

- Entre 1024 e 1279 a faixa do funil é uma coluna de sete nós, o que alonga bastante o fim do hero
  nessa faixa de janela. É o gesto que o achado F1 pediu, mas vale um olhar do Vinicius.
- O cartão de cliente da faixa continua posicionado por `lg:grid lg:grid-cols-6` / `lg:col-start-2`,
  ou seja, vira grade em 1024 enquanto a linha já é coluna. Não vaza e não estava na lista, então
  ficou como estava.
