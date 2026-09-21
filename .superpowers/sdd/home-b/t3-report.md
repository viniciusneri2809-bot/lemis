# T3 — Aquisição (colunas de jornal) + Retenção (leitura em diagonal)

Status: **DONE_WITH_CONCERNS** (a única concern é externa aos meus arquivos, ver Pendências).

Arquivos tocados (só estes dois, nenhum commit):

- `src/components/secoes/Aquisicao.tsx` — reescrito
- `src/components/secoes/Retencao.tsx` — reescrito

---

## `src/components/secoes/Aquisicao.tsx`

**Casca.** `<Secao id="aquisicao" campo="tinta" ritmo="compacto" numeral={4} fundo={<PadraoPontos …/>}>`
com o `<Container className="relative z-10">` como filho, conforme o brief. A chamada antiga passava
`rotulo`/`titulo`/`abertura` para a `Secao` — props que não existem mais — então o arquivo estava
quebrado no `tsc` antes de eu começar.

**Cabeçalho montado à mão** (sem `CabecaSecao`, como o despacho determinou), em grade de 12:

- coluna `lg:col-span-6`: `Pilula` (rótulo) + `TituloDestaque as="h2" classe="t-titulo" animar="view"`.
- coluna `lg:col-span-6 lg:col-start-7 lg:self-end`, dentro de um `Revelar atraso={0.15}`:
  `aquisicao.abertura` em `t-lead medida text-secundario-escuro`, os chips de `aquisicao.dentro`
  (`<ul className="mt-6 flex flex-wrap gap-2">` de `Chip` neutros) e `aquisicao.nota` em
  `t-legenda mt-3`.

**Colunas de jornal.** `<ol className="jornal mt-16 lg:mt-22">` (88px no desktop = o `margin-top:88px`
da referência). Cada `<li>` leva um `Revelar atraso={0.1 + i * 0.12}` com
`Numeral tamanho="md"` (96px no desktop = `.n96`), `<h3 className="t-rotulo mt-4 text-secundario-escuro">`
e o esquema em `mt-5`.

**`BlocoEsquema` saiu.** No lugar entrou `Esquema`, que é só `flex max-w-[360px] flex-col gap-4
text-branco` + `aria-hidden="true"` — sem `superficie-escura` e sem `min-h-[280px]`. As quatro caixas
iguais viraram quatro desenhos soltos no campo, separados pelo filete vertical da coluna.
O `gap-4` reproduz o `gap:16px` do `.esquema` da referência.

- marco 1: `Quadro className="h-22"` (88px, = `height:88px` da referência) + dois `Campo`
  (rótulo `t-rotulo` + `Barra largura="74%" forte`) + `Chip tom="azul" self-start`.
- marco 2: `Bolha lado="recebida"` com a mensagem, `Bolha lado="enviada"` vazia (entra em
  barras-fantasma sozinha) e o fecho `border-t border-fio-escuro pt-4` com o `Chip tom="azul"`.
- marco 3: `Chip tom="azul"` da etapa + dois `Campo` com `Barra largura="60%" forte`.
- marco 4: `CartaoCliente chip={…} className="max-w-[360px]"` — continua cartão, e em **papel**
  (o `campo` padrão), como na referência: é o objeto, e é a superfície clara que sobra na seção.

**`SetaMarco` saiu** (o SVG de seta entre marcos). Quem separa agora é o filete da coluna.
**`Marco` não é mais importado** — `Numeral` ocupou o lugar.

### Decisões de composição que tomei

1. **`TituloDestaque` fica FORA do `Revelar`, irmão da `Pilula`.** O despacho diz "`Pilula` +
   `TituloDestaque` … dentro de um `Revelar`". Segui a leitura de que o `Revelar` envolve a
   *pílula*, que é exatamente o que `CabecaSecao` faz (`Revelar` só na `Pilula`; o título tem a
   própria animação `animar="view"`, que é o `Palavras` palavra a palavra). Envolver o título
   também faria duas entradas empilhadas no mesmo elemento — fade+blur+y do `Revelar` por cima do
   fade palavra a palavra — e o resultado visual divergiria de todas as outras seções que usam
   `CabecaSecao`. O arranjo de grade pedido está mantido integralmente; só a fronteira do
   `Revelar` é a do `CabecaSecao`. **Se você quiser o título dentro do `Revelar`, é uma linha.**
2. **Extraí `Campo`** (rótulo + barra), porque os marcos 1 e 3 repetiam o mesmo par com larguras
   diferentes. Não é componente novo da casa: é local do arquivo, como `Esquema`.
3. **`h-22` / `lg:mt-22`** em vez de `h-[88px]` / `mt-[88px]`: a escala dinâmica do Tailwind v4 dá
   5.5rem, o mesmo valor, sem valor arbitrário.

## `src/components/secoes/Retencao.tsx`

**Casca.** `<Secao id="retencao" campo="tinta" ritmo="alto" numeral={5} numeralCentro fundo={<Glow …/>}>`.
O `Glow` foi recentrado (`top-1/3 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] opacity-50`) porque o
numeral 05 agora é centrado: o brilho atrás do cartão e o numeral atrás do cartão têm que ser o
mesmo eixo. Antes era `top-1/3 right-0`.

**Grade da diagonal**, escrita à mão dentro de `<Container className="relative z-10">`, sem `row-gap`
(cada peça traz o próprio `mt-8` no celular e zera no desktop onde a diagonal manda):

| peça | classes |
|---|---|
| cabeça (Pilula + H2 `t-titulo`) | `lg:col-span-6` |
| `retencao.abertura` (`t-lead medida`) | `mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end` |
| `retencao.apoio` (`t-lead text-secundario-escuro`) | `mt-8 lg:col-span-4 lg:row-start-2 lg:mt-24` + `lg:max-w-[26ch]` |
| `CartaoCliente tamanho="grande"` | `mt-8 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-2 lg:mt-24` |
| `retencao.fecho` (`t-sub text-branco`) | `mt-8 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-0 lg:self-end lg:pb-4` + `lg:max-w-[24ch]` |

**Os dois cartões-fantasma de trás saíram** — eram as duas únicas `superficie-escura` decorativas da
seção, e eram também as duas linhas de `opacity-60`/`opacity-80` que só passavam no verificador por
causa do `aria-hidden` na mesma linha. A profundidade agora é o numeral 05 centrado + o glow + a
sombra do cartão.

**Sombra do cartão:** `shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--color-tinta)_90%,transparent)]`
— valor literal do brief. Confirmei que o Tailwind v4 compila esse arbitrário (ver verificações).
Substitui o `#000` da referência, que é hex fora da paleta.

### Decisões de composição

1. Mesmo critério do item 1 da Aquisição: `Revelar` na `Pilula`, `TituloDestaque` irmão.
2. **`max-w` só a partir de `lg`** (`lg:max-w-[26ch]`, `lg:max-w-[24ch]`). O brief pede "no celular
   … sem `max-w` apertado"; prefixar com `lg:` resolve sem duplicar o parágrafo.
3. **`lg:pb-4` no fecho**, reproduzindo o `padding-bottom:16px` do `.fecho-ret` da referência — sem
   ele o `self-end` cola o texto na base exata da linha do cartão.
4. Mantive `y={32}` no `Revelar` do cartão (era o valor do arquivo antigo): o cartão é a peça que
   sobe, o resto entra com o `y` padrão.

---

## O que verifiquei

### `npm run verificar`

```
> lemis@0.1.0 verificar
> node scripts/verificar-marca.mjs

Verificação de marca falhou:
  src/components/ui/CabecaSecao.tsx:25: "leads": * Cabeçalho de seção: rótulo-pílula, título com uma palavra em serifa e o lead ao lado.
  src/components/ui/Secao.tsx:39: "leads": * lead sempre no mesmo lugar, e o resultado foi oito de nove seções com o mesmo esqueleto
```

**Zero ocorrências nos meus dois arquivos.** As duas que restam são de arquivos da fundação (T1),
não meus, e são comentários de código: a palavra `lead` em prosa bate na regra `/(?<!t-)\bleads?\b/i`
(o lookbehind só isenta `t-lead`). Eu mesmo levei essa reprovação na primeira rodada, num comentário
meu que dizia "a coluna direita leva lead" — reescrevi para "abertura" e passou.

### `npx tsc --noEmit`

Saída completa, filtrada por nada:

```
src/components/secoes/ComoComeca.tsx(14,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
src/components/secoes/DuasPortas.tsx(68,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
src/components/secoes/HeroPainel.tsx(4,30): error TS2307: Cannot find module '@/components/efeitos/FeixeConexao' …
src/components/secoes/OQueVoceVe.tsx(67,46): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
src/components/secoes/Virada.tsx(12,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
```

Nenhum erro em `Aquisicao.tsx` nem em `Retencao.tsx`. Os cinco são dos colegas ainda trabalhando
(`Secao` sem `rotulo`, `FeixeConexao` apagado). Nenhum `any` nos meus arquivos.

### `npx eslint src/components/secoes/Aquisicao.tsx src/components/secoes/Retencao.tsx`

Sem saída (limpo).

### Compilação das classes Tailwind

Rodei o `@tailwindcss/postcss` do projeto isolado sobre a lista de classes que introduzi, para não
descobrir um arbitrário inválido só na hora do build. Todas geraram utilitário:

```
.h-22 { height: calc(var(--spacing) * 22); }
.max-w-\[360px\] { max-width: 360px; }
.shadow-\[0_40px_80px_-30px_color-mix\(in_srgb\,var\(--color-tinta\)_90\%\,transparent\)\] {
  --tw-shadow: 0 40px 80px -30px var(--tw-shadow-color, var(--color-tinta));
  @supports (color: color-mix(in lab, red, red)) {
    --tw-shadow: 0 40px 80px -30px var(--tw-shadow-color, color-mix(in srgb,var(--color-tinta) 90%,transparent));
  }
  …
}
.lg\:col-start-9 { … grid-column-start: 9 }
.lg\:row-span-2 { … grid-row: span 2 / span 2 }
.lg\:row-start-3 { … grid-row-start: 3 }
.lg\:mt-22 { … margin-top: calc(var(--spacing) * 22) }
.lg\:max-w-\[26ch\] { … max-width: 26ch }
```

A sombra em `color-mix` compila e ainda cai para `var(--color-tinta)` puro onde `color-mix` não
existe. Nada de `#000`.

### Regras da fundação, item a item

- copy 100% de `conteudo.ts`, nenhum literal de texto — ok.
- `italic` / `font-serif` / `font-mono`: nenhum. A serifa entra pelo `t-destaque` do `Numeral` e do
  `TituloDestaque` — ok.
- hex: nenhum nos meus arquivos — ok.
- `opacity-N`: só a do `PadraoPontos` (linha com `Padrao`) e a do `Glow` (linha com `Glow`) — as duas
  isentas pela regra, e as duas em `fundo=` — ok.
- `text-cor/NN`: nenhum — ok.
- número + `%`: só `largura="74%"` / `largura="60%"` (prop da `Barra`, isenta) e o `90%` dentro do
  `color-mix` (isento) — ok, confirmado pelo verificador.
- biblioteca nova, `<img>`, dado inventado: nenhum. Todo desenho leva `aria-hidden="true"` (no
  wrapper `Esquema`, no `CartaoCliente`, no `Numeral`, na `Barra`, na `Bolha`, no `Quadro`) — ok.
- `prefers-reduced-motion`: nenhuma animação CSS nova; só `Revelar` (motion) — ok.
- rolagem horizontal: as duas `Secao` ficam sem `transbordar`, ou seja `overflow-clip`; nada com
  `sangria`; o `.jornal` vira uma coluna abaixo de 1024px e o cartão é `w-full` dentro do
  `Container`. **Não verifiquei em navegador** (a página não compila até todos terminarem).
- sem commit — ok, tudo na árvore de trabalho.
- comentários: só onde explicam porquê (por que o `BlocoEsquema` saiu, por que o cabeçalho é à mão,
  por que o marco 4 continua cartão, por que existe o fallback de esquema ausente).

---

## Pendências

1. `npm run verificar` ainda falha por **dois comentários com a palavra "lead"** em
   `src/components/ui/CabecaSecao.tsx:25` e `src/components/ui/Secao.tsx:39` — arquivos da fundação,
   fora do meu escopo. Correção: trocar "lead" por "abertura" nas duas linhas de comentário.
2. Nenhum rótulo faltou na copy: `aquisicao` e `retencao` cobriam tudo que a estrutura pedia. Nada
   foi inventado.
3. O `<h3>` de cada marco sai em `t-rotulo` (caixa alta, tamanho de rótulo). É o que o brief pede e
   o que a referência faz, mas vale o olho dele: são os únicos `h3` da página nesse tamanho.
4. Verificação visual (diagonal fechando certo em 1024–1280px, e a pilha em 320/390) é sua — eu não
   rodei o `dev`.
5. `Marco` (`src/components/esquema/Marco.tsx`) saiu daqui. No momento em que escrevo, só
   `src/components/secoes/Virada.tsx:3` ainda o importa — e essa seção está sendo reescrita por
   outro agente. Se ela também trocar para `Numeral`, o `Marco` vira código morto; vale um `grep`
   no fechamento.
