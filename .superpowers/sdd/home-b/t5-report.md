# T5 — Perguntas (largura total) + CTA final

Status: **DONE**

## Arquivos tocados

- `src/components/secoes/Perguntas.tsx` — reescrito
- `src/components/secoes/CtaFinal.tsx` — reescrito

Nenhum outro arquivo foi criado ou alterado. Nada commitado. Um arquivo de sonda temporário
(`src/_probe_t5.tsx`) foi criado e removido durante a verificação — ver seção Verificação.

---

## `Perguntas.tsx` — seção 8

Trocado `<section>` escrito à mão (grade 5/7 com título `lg:sticky` e `superficie-escura` em
volta do acordeão) por `<Secao id="perguntas" campo="tinta" ritmo="compacto" separador>` →
`<Container className="relative z-10">`, exatamente como o brief pede.

- Título: `<Revelar><h2 className="t-display t-display-denso max-w-[20ch]"><Palavras
  texto={perguntas.titulo} /></h2></Revelar>` — trocou `t-titulo` (900/clamp 2–3rem) pelo par
  `t-display t-display-denso` (900/clamp 2,125–4rem), maior e editorial, no topo em vez de preso
  numa coluna esquerda `sticky`.
- Acordeão em largura total dentro do mesmo `Container`, sem `superficie-escura`:
  `<Accordion type="single" collapsible defaultValue="pergunta-0">` — o `defaultValue` é novo (o
  brief pede, o código antigo não tinha nenhum item aberto por padrão).
- Cada `AccordionTrigger escuro` leva `className="py-7"` (era `py-5` fixo no componente) e o
  gatilho é `<span className="flex items-start gap-4">` com o numeral em
  `t-destaque t-destaque-claro w-8 shrink-0 text-[1.5rem] leading-[1.1]` e a pergunta em
  `text-[clamp(1.25rem,1.8vw,1.625rem)]` — os mesmos valores literais do brief.
- `AccordionContent className="max-w-[64ch] pl-12"`: `pl-12` (3rem) é a soma exata do numeral
  (`w-8` = 2rem) com o `gap-4` (1rem) do gatilho, para a resposta alinhar com a pergunta, não com
  o numeral.
- Saíram os imports de `Cantoneiras` e `LinhasDiagonais` (não são mais usados).
- `accordion.tsx` não foi tocado — toda a variação é por `className` nos props que ele já aceita.

## `CtaFinal.tsx` — seção 9

Trocado o `<section className="campo-azul relative overflow-clip">` escrito à mão por
`<Secao id="contato" campo="azul" ritmo="alto" className="lg:min-h-[640px]" fundo={…}>`. O
`fundo` recebe exatamente os três elementos decorativos que já existiam: `PadraoPontos`, o glow
branco (`div` com `radial-gradient`) e o SVG do motivo alto (`viewBox 0 0 640 1000`), sangrando
`absolute right-0 bottom-0` — cortado pelo `overflow-clip` que a `Secao` já aplica por padrão
(`transbordar` não foi passado), como o despacho avisou.

- Texto na coluna 1–6 de uma grade de 12 de verdade agora: `<div className="grid lg:grid-cols-12
  lg:gap-x-6"><div className="lg:col-span-6">…</div></div>`, mesmo padrão que `CabecaSecao.tsx`
  já usa para "6-6" (`lg:col-span-6` a partir da coluna 1, sem `lg:col-start`).
- `t-display t-display-denso max-w-[34rem]`, apoio `t-lead mt-8 max-w-[39ch]`, botão
  `variante="sobre-azul"` — todos mantidos como estavam, valores intocados.
- `Container` manteve `relative z-10` (é o que garante que o texto pinte por cima do `fundo`
  absolutamente posicionado — ver Decisões) e `lg:min-h-[640px]` (estava no `Container` antes;
  mantive ali em vez de mover para a `Secao`, ver Decisões).
- Motivo no celular: mesmo bloco de antes, `<div className="text-papel lg:hidden"><Motivo
  className="block h-auto w-full" /></div>`, agora como filho direto da `Secao`, fora do
  `Container`, em fluxo normal abaixo do texto — largura total, como pedido.

## Decisões de composição

1. **`Container` mantém `relative z-10`, e não deleguei ao filho da `Secao` a stacking sozinha.**
   `Secao` renderiza `{fundo}{numeral}{children}` na mesma seção `position:relative`. Sem
   `z-index` explícito, elementos posicionados com `z-index:auto` pintam na ordem do DOM dentro
   da mesma "camada" (CSS2.1 §E, nível 6), e um `Container` sem posicionamento pintaria numa
   camada anterior (nível 3, não-posicionado) — ou seja, o `fundo` (posicionado) pintaria por
   cima do texto (não-posicionado), mesmo vindo antes no DOM. O `relative z-10` no `Container`
   move o texto para o nível 7 (z-index positivo), acima de tudo que está em `fundo`. Esse é o
   motivo de o código original já ter essa classe — preservei.
2. **`lg:min-h-[640px]` ficou no `Container`, não movido para a `Secao`.** A `Secao` só controla
   `campo`/`ritmo`/numeral/fundo; `min-height` é dimensionamento de conteúdo, não ritmo vertical
   (os `RITMOS` só têm `py-*`/`pt-*`/`pb-*`). Botei em ambos — `Secao` e `Container` — porque o
   `Container` é quem tinha o valor originalmente (evita min-height=0 colapsar se o conteúdo for
   raso) e a `Secao` porque é ela quem tem `overflow-clip`, e a altura mínima é o que dá espaço
   pro motivo (820px de largura, proporção alta) não ficar cortado demais na vertical. Duplicar a
   classe é redundante mas inofensivo — se a revisão achar excesso, um dos dois sai.
3. **Grade de 12 explícita em vez de `lg:w-6/12`.** O original usava `lg:w-6/12` (50% da largura
   do `Container`). O brief pede "coluna 1–6 (grade de 12)" e o padrão já estabelecido no repo
   para isso é `grid lg:grid-cols-12 lg:gap-x-6` + `lg:col-span-6` (é exatamente como
   `CabecaSecao.tsx` monta "6-6"). Troquei para esse padrão. `col-span-6` de 12 colunas com
   `gap-x-6` de 24px é *mais estreito* que 50% puro (o `fr` de cada coluna encolhe para caber os
   11 gaps), então a caixa de texto fica com folga a mais, não a menos, em relação ao traço do
   motivo em x≈669 — não deveria quebrar a calibragem, mas não tenho como confirmar o pixel exato
   sem abrir a página (ver Pendências).
4. **`py-7` no `AccordionTrigger` sobre o `py-5` embutido no componente.** Não editei
   `accordion.tsx`; conferi que a sobreposição realmente vence — ver Verificação.

## Copy

Nenhum texto novo. `perguntas.titulo` e `perguntas.itens[].{pergunta,resposta}`,
`ctaFinal.{titulo,apoio,nota}` e `cta.rotulo` — todos de `src/lib/conteudo.ts`, sem alteração no
arquivo. Nenhuma pendência de copy.

## Verificação

`npm run verificar`

```
Verificação de marca: ok
```

`npx tsc --noEmit` — nenhuma linha para `Perguntas.tsx` ou `CtaFinal.tsx` na saída (os erros que
aparecem são de arquivos de outros agentes, ainda em edição — ignorados por instrução).

`npx eslint src/components/secoes/Perguntas.tsx src/components/secoes/CtaFinal.tsx` — sem saída,
sem aviso.

**Sobreposição `py-7`/`py-5` conferida por compilação, não suposta.** Compilei
`src/app/globals.css` com `@tailwindcss/postcss` (mesma versão do projeto, 4.2.1) contra um
arquivo de sonda temporário em `src/` (`_probe_t5.tsx`, removido depois) contendo todas as
classes arbitrárias novas das duas seções. No CSS gerado, `.py-5` sai na linha 848 e `.py-7` na
854 — `py-7` vem depois, mesma especificidade, vence a cascata. Confirmadas também no CSS de
saída, sem erro de sintaxe: `pl-12`, `max-w-[64ch]`, `w-8`, `text-[clamp(1.25rem,1.8vw,1.625rem)]`,
`lg:col-span-6`, `lg:grid-cols-12`, `lg:gap-x-6`, `lg:min-h-[640px]`, `w-[min(56vw,820px)]`,
`max-w-[34rem]`, `max-w-[39ch]`, `max-w-[20ch]`.

**Não verificado:** a aparência. `npm run dev` não foi rodado, por instrução — a página não
compila até os cinco agentes terminarem. Em especial, não medi o pixel real de onde a grade
`col-span-6` termina contra o x≈669 do traço do motivo em 1440px — a Decisão 3 acima argumenta
que `col-span-6` deveria ficar mais estreito que o `lg:w-6/12` anterior (já aprovado), não mais
largo, mas é geometria, não medição.

## Pendências

1. Confirmar visualmente, em 1440px, que o `h2`/`p` da seção 9 não ultrapassam x≈669 (onde o
   traço do motivo começa) com a nova grade `lg:col-span-6` — troquei `lg:w-6/12` (aprovado) por
   `grid-cols-12`/`col-span-6`, que por conta do `gap-x-6` deveria dar uma coluna mais estreita,
   não mais larga, mas só a régua na tela confirma.
2. `lg:min-h-[640px]` ficou duplicado (`Secao` e `Container`) — decisão 2 acima; cosmético, sem
   efeito funcional, mas vale limpar na revisão se parecer redundante.
