# Tarefa 2 — relatório

Status: **DONE**

Arquivos tocados (só estes dois):

- `src/components/secoes/DuasPortas.tsx`
- `src/components/secoes/Virada.tsx`

Nada em `src/app/`, nada em `src/lib/`, nenhuma primitiva alterada, nenhum commit.

---

## 1. `DuasPortas.tsx` — seção 2

### O que saiu

- `CartaoHolofote` + `superficie-escura` em volta de cada porta (os dois cards iguais lado a
  lado). Era o "quadradão" que o brief manda tirar.
- `Holofote`, `PadraoPontos` e `Glow` do `fundo`: o brief da seção 2 não pede fundo, e a
  referência (`#duas-portas` no `b-editorial.html`) só tem o numeral gigante.
- A moldura `rounded-[14px] border` em volta da cena da conversa.
- O cabeçalho montado pela `Secao` (a casca nova não monta cabeçalho).

### O que entrou

- `<Secao id="duas-portas" campo="tinta" ritmo="amplo" numeral={2}>` — sem `fundo`, sem
  `transbordar` (o `overflow-clip` é o que corta a laje que sangra). O respiro de topo do
  `ritmo="amplo"` (160px no desktop) ficou intocado, pelo cartão do hero que desce nele.
- `<Container className="relative z-10">` como filho, e dentro dele `CabecaSecao` com
  `colunas="8-4"`, `classeTitulo="t-display t-display-denso"`, `medidaTitulo="max-w-[13ch]"` —
  valores literais do brief.
- A laje é o próprio `Revelar` (a `m.div` recebe as classes da laje). Evita mais um elemento
  entre o `Container` e a laje e mantém o `position: relative` do `.laje` como bloco de
  contenção do cartão absoluto:
  `laje mt-16 grid gap-y-8 lg:mt-22 lg:grid-cols-[7fr_5fr] lg:gap-x-16 lg:gap-y-0`.
- Coluna larga (`max-w-[560px]`): rótulo `Quem chega` + `CenaChega`.
- Coluna estreita (`grid content-start gap-8 lg:pt-2 lg:pr-[clamp(2.5rem,8vw,7.5rem)]`): os dois
  textos, cada um com o seu `t-rotulo`, texto em `t-corpo max-w-[40ch] text-secundario-escuro`.
- Cartão "Quem volta" sobreposto: `lg:absolute lg:-bottom-18 lg:left-[28%] lg:z-20 lg:w-[360px]`.
  No celular ele é o terceiro item do grid e entra no fluxo (o `gap-y-8` dá os 32px da
  referência).
- Fecho: `<Revelar atraso={0.15} className="mt-16 lg:mt-32"><p className="t-sub medida">`.

### Decisões de composição

1. **Rótulo repetido.** A referência escreve "Quem chega" duas vezes: em cima da cena e em cima
   do primeiro texto. Mantive, porque é o que amarra a cena ao texto quando eles estão em
   colunas diferentes, e porque a copy não muda — o rótulo sai de `cenas[0].rotulo` nos dois
   lugares, nenhum literal novo.
2. **Bolhas maiores sem tocar na `Bolha`.** Os tamanhos do brief entram por `className`
   (`rounded-[18px] px-5 py-4 text-[1.0625rem]`, e `w-[86%]` na enviada). Conferi na saída real
   do Tailwind v4 que o override é determinístico, e não dependente da ordem em que escrevo as
   classes: dentro de `@layer utilities` o Tailwind emite `px-4` antes de `px-5`, `py-3` antes
   de `py-4` e `rounded-[14px]` antes de `rounded-[18px]`, e emite o atalho `rounded-*` antes
   dos cantos `rounded-bl-*`/`rounded-br-*` (então o "rabinho" de 4px da bolha sobrevive).
   `text-[1.0625rem]` é utilitário e vence `.t-legenda`, que está em `@layer components`.
   Por isso **não** editei `src/components/esquema/Bolha.tsx`, que outro agente está usando
   nesta mesma hora.
3. **Sombra do cartão por token, não por hex.** A referência usa `0 30px 60px -20px #000`. Aqui
   ficou `shadow-[0_30px_60px_-20px_color-mix(in_srgb,var(--color-tinta)_92%,transparent)]`,
   que compila (verifiquei a saída) e passa no verificador sem hex fora da paleta.
4. **O cartão continua um `div` local, não `CartaoCliente`.** O `CartaoCliente` da casa não tem
   o `dl` "Última compra"/"Voltar em", e o brief diz `cartao-cliente`/`superficie-escura` — que
   na casa é a classe `superficie-escura`. Reaproveitar o `CartaoCliente` exigiria mudar a
   primitiva, que a fundação manda não reescrever.
5. **Nada nos primeiros 2/12 no topo.** O `Container` começa depois dos 160px de respiro e não
   há nenhum elemento posicionado no topo à esquerda; o único absoluto da seção é o cartão, e
   ele está na borda de baixo da laje.

### Geometria conferida no papel (1440px)

`Container` = 1408 com `px-16` → 1280 de conteúdo, margem esquerda 80px.
`.laje` com `margin-right: calc(50% - 50vw)` = −80px → largura 1360, encosta na borda da janela
(cortada pelo `overflow-clip`).
Cartão: `left: 28%` de 1360 = 381px do início da laje → 461px absolutos; +360px de largura →
borda direita em 821px, contra 1360px de borda do container. **Não chega perto da borda.**
Vertical: o cartão desce 72px abaixo da laje e o fecho começa 128px abaixo — não se cruzam.

---

## 2. `Virada.tsx` — seção 3

### O que saiu

- `Marco` (numeral + traço). Cada traço era mais uma linha horizontal por bloco.
- O cabeçalho pela `Secao` (rótulo/título/abertura na casca).
- O contraste e os fundamentos soltos sobre a tinta.

### O que entrou

- `<Secao id="como-funciona" campo="tinta" ritmo="medio" numeral={3} fundo={PadraoGrade + Glow}>`
  — o `fundo` é o mesmo de antes, valores preservados.
- Cabeçalho próprio: `<Revelar><Pilula/></Revelar>` + `TituloDestaque as="h2" classe="t-display"
  animar="view" className="mt-6 max-w-[16ch]"`, sem abertura ao lado. Segui o padrão do
  `CabecaSecao` de pôr o `Revelar` só na pílula: o `TituloDestaque` já anima por conta própria
  (`animar="view"`), e envolvê-lo daria animação dupla.
- `<Folha lado="direita" className="mt-12 lg:mt-16">` com três blocos dentro:
  - abertura em `t-lead medida text-secundario`;
  - contraste em `mt-14 grid gap-y-6 border-t border-fio-claro pt-10 lg:grid-cols-2 lg:gap-y-0`,
    `outros` em `t-sub max-w-[22ch] text-secundario lg:pr-10`, `lemis` em `t-sub max-w-[26ch]`
    (tinta cheia, herdada do papel) com `lg:border-l lg:border-fio-claro lg:pl-10`;
  - fundamentos em `mt-16 grid gap-y-8 border-t border-fio-claro pt-8 lg:grid-cols-3 lg:gap-x-8`,
    cada um com `<Numeral tamanho="sm" />` + `h3 t-sub mt-4` + `p t-corpo max-w-[34ch]
    text-secundario`.

### Decisões de composição

1. **Revelar por bloco, não na folha inteira.** A referência põe `.entra` na folha toda. Aqui o
   `Revelar` anima `filter: blur(6px)`, e aplicá-lo a uma superfície do tamanho da folha custa
   caro no compositor. Ficaram três alvos escalonados (abertura, contraste, e cada fundamento
   com `0.15 + i * 0.1`), o que também dá a leitura de cima para baixo.
2. **Espaçamentos vindos da referência, não inventados:** contraste `margin-top:56px`/
   `padding-top:40px` → `mt-14 pt-10`; fundamentos `64px`/`32px` → `mt-16 pt-8`; `column-gap:32px`
   → `lg:gap-x-8`; empilhamento no celular com `gap-y-6` / `gap-y-8`, que são os `row-gap` de
   24px e 32px da media query do protótipo. Onde o brief deu um valor diferente da referência
   (`mt-12 lg:mt-16` da folha, `mt-16 lg:mt-22` da laje, `mt-16 lg:mt-32` do fecho), **usei o do
   brief**, literalmente.
3. **Filete vertical do contraste só no desktop.** O protótipo mantinha o `border-left` também
   no celular; o brief pede `lg:border-l`, e segui o brief — no celular o filete vertical
   sobrando ao lado de uma coluna única não separa nada.

---

## O que verifiquei

```
$ npm run verificar
> lemis@0.1.0 verificar
> node scripts/verificar-marca.mjs

Verificação de marca: ok
```

```
$ npx tsc --noEmit
(saída vazia — 0 linhas; nenhum erro, nem nos meus arquivos nem nos dos colegas no momento da
 execução)
```

```
$ npx eslint src/components/secoes/DuasPortas.tsx src/components/secoes/Virada.tsx
(saída vazia, exit 0)
```

```
$ git status --porcelain src/components/secoes/DuasPortas.tsx src/components/secoes/Virada.tsx
?? src/components/secoes/DuasPortas.tsx
?? src/components/secoes/Virada.tsx
```
(os dois já eram arquivos não versionados antes de eu começar — nada commitado.)

Grep de proibidos nos meus dois arquivos (`italic`, `font-serif`, `font-mono`,
`superficie-clara`, `Cantoneiras`, `CartaoHolofote`, `Marco`, `FeixeConexao`): nenhuma
ocorrência.

Além disso, compilei as classes arbitrárias planejadas com o próprio `@tailwindcss/postcss` do
projeto, num diretório temporário depois apagado, para garantir que todas geram CSS:
`lg:mt-22`, `lg:-bottom-18`, `lg:grid-cols-[7fr_5fr]`, `lg:gap-x-16`, `lg:w-[360px]`,
`lg:left-[28%]`, `lg:z-20`, `max-w-[560px]`, `max-w-[40ch]`,
`lg:pr-[clamp(2.5rem,8vw,7.5rem)]`, `shadow-[0_30px_60px_-20px_color-mix(...)]`,
`text-[1.0625rem]`, `w-[86%]`, `gap-y-8`, `lg:gap-y-0`, `content-start`. Todas geram.

**Não verifiquei em navegador**: a página não compila enquanto os outros quatro agentes não
terminam, e a conferência visual é do despachante. Nenhum servidor de desenvolvimento foi
levantado.

---

## Pendências

1. `[PENDENTE DE VALIDAÇÃO]` O rótulo "Quem chega" aparece duas vezes na laje (sobre a cena e
   sobre o primeiro texto), como no protótipo · base: é o que a referência faz e a copy não tem
   um rótulo alternativo para a cena (quem valida: Vinicius, na leitura visual).
2. `[PENDENTE DE VALIDAÇÃO]` No desktop o cartão "Quem volta" pode encostar nos ~30px finais da
   cena da conversa, dependendo da altura que o texto assumir · base: `left: 28%` + `bottom:
   -72px` são os valores do protótipo e lá a sobreposição lia como camada, não como colisão
   (quem valida: conferência visual em 1440).
3. A `Bolha` continua sem um jeito de primeira classe de pedir "bolha grande": aqui o tamanho
   entra por `className`. Se mais alguma seção precisar do mesmo, vale um `tamanho` na
   primitiva — não fiz agora porque outro agente está mexendo nas seções que a usam.
4. Nenhuma pendência de copy: não faltou rótulo nem texto em `conteudo.ts`, e nenhum literal
   novo foi escrito em componente.
