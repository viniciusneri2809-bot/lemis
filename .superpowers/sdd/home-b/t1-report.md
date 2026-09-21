# Tarefa 1 — Hero + faixa dos sete nós · relatório

Status: **DONE_WITH_CONCERNS** (o que trava o `npm run verificar` está fora dos meus arquivos).

## Arquivos

| Arquivo | O quê |
|---|---|
| `src/components/secoes/Hero.tsx` | reescrito |
| `src/components/secoes/FaixaFunil.tsx` | novo |
| `src/components/secoes/HeroPainel.tsx` | apagado |

Nada além disso foi tocado. Não houve commit.

## `Hero.tsx`

- Virou `Secao id="inicio" campo="tinta" ritmo="hero" transbordar`, com o `Glow` no `fundo`
  (`-top-32 right-0 h-[36rem] w-[36rem] opacity-35`, os valores do protótipo). Saíram
  `Cantoneiras`, `LinhasDiagonais`, `Parallax`, `Inclinacao`, `Revelar`, a altura mínima
  `lg:min-h-[…]` e o par `-mt-[4.75rem] pt-[4.75rem]`.
- O H1 ocupa a largura inteira: `classe="t-display"` +
  `className="mt-6 text-[clamp(2.75rem,12vw,4rem)] text-branco lg:text-[clamp(3rem,7.2vw,7rem)]"`.
  O `max-w-[12ch]` caiu. `animar="hero"` continua, então a animação é CSS desde o primeiro paint.
- Abaixo, `grid lg:grid-cols-12 lg:gap-x-6` com um único bloco em `lg:col-span-6 lg:col-start-7`:
  parágrafo `t-lead medida` e as ações (`Botao` + link "Ver como funciona"). `entra-hero` com
  `--i` 6 e 8 — os valores do protótipo, não os 16/18 de antes: o H1 agora anima palavra a
  palavra até `--i` ≈ 5, e 16/18 deixaria o apoio entrando um segundo depois do título.
  A pílula segue sem `--i` (0).
- A `FaixaFunil` entra depois do `Container`, dentro de um `div.entra-hero` com `--i: 10`
  (é o `entra-hero` que o protótipo põe na própria `.faixa`; aqui fica no invólucro para o
  componente continuar fechado em si).

## `FaixaFunil.tsx` (componente de servidor, sem `"use client"`)

- Casca: `div.sangria.bg-tinta-funda` com `mt-14 pt-10 lg:mt-24 lg:pt-16` e **sem** padding
  embaixo — é o cartão do cliente que fecha a faixa, pendurado na borda.
- Dentro, `Container.relative`; dentro dele o "linha-wrap" leva **`.sangria` de novo**, como no
  protótipo (`margin-inline: calc(50% - 50vw); padding-inline: 24px`): sem isso os sete nós não
  cabem na largura do container. Padding `px-5 md:px-8 lg:px-6 lg:py-10` — no celular o padding
  acompanha a goteira do `Container`, para o feixe vertical cair exatamente na linha da margem.
- Feixes: `<Feixe eixo="h" className="absolute inset-x-0 top-1/2 -mt-px hidden lg:block" />` e
  `<Feixe eixo="v" className="absolute inset-y-0 left-5 md:left-8 lg:hidden" />`. No celular a
  lista ganha `pl-6`, então o filete fica a 20 px da borda e os nós a 44 px — a mesma relação do
  protótipo (40/64), só encostada mais na margem.
- **Dois funis, duas `<ol aria-label>` irmãs** num flex (`flex flex-col gap-10 lg:flex-row
  lg:items-center lg:justify-between lg:gap-6`), conforme a decisão do despacho. Cada uma vive
  num `div.relative` que também segura o rótulo visível (`Aquisição` / `Retenção`) em
  `t-rotulo text-secundario-escuro absolute bottom-full left-0 mb-3.5 whitespace-nowrap`.
  O rótulo desenhado é `aria-hidden`: filho de `<ol>` só pode ser `<li>`, então ele fica fora da
  lista, e quem o lê por leitor de tela recebe o mesmo recorte pelo `aria-label`
  (`textosDeInterface.painelAquisicao` / `painelRetencao`) — a semântica dos dois funis não
  regrediu.
- O nó reaproveita o desenho de hoje (`superficie-escura`, ladrilho 36×36 com `Icone`, nome em
  `t-controle`) com `px-3.5 py-2.5` e `text-[0.9375rem]`. O último de retenção ("Comprou de novo")
  recebe `destino`: ladrilho `bg-azul text-branco` e `feixe-borda feixe-ativo` na superfície.
- Cartão do cliente: `CartaoCliente` (já `aria-hidden`, já com `Barra`) com `mt-8 lg:mt-6`,
  `max-w-[240px]` e a sombra do protótipo escrita com `color-mix` sobre `--color-tinta`.
  Fica num invólucro `relative z-[2] -mb-14 lg:-mb-18 lg:grid lg:grid-cols-6`, e o cartão em
  `lg:col-start-2 lg:col-span-2`.

## Decisões de composição

1. **O deslocamento de 2/12 do cartão virou grade de 6 colunas** (`lg:grid-cols-6` +
   `lg:col-start-2`) em vez do `lg:ml-[16.666%]` que o brief sugeria. Motivo objetivo: o
   verificador de marca reprova qualquer número seguido de `%` fora das isenções, e a isenção só
   cobre `w-[…%]`, `h-[…%]` e `largura="…%"`. `ml-[16.666%]` e `ml-[calc(100%/6)]` os dois seriam
   reprovados. A grade dá o mesmo 1/6 sem literal de porcentagem.
2. **A margem negativa foi para o invólucro do cartão**, não para o cartão: num grid a margem do
   item entra na altura da linha, então o `-mb` no invólucro é o que encurta a faixa e deixa o
   cartão descer para a seção 2.
3. **O nome do nó não leva `whitespace-nowrap`** (o protótipo leva). Os sete nós somam ~1 250 px
   de conteúdo; só cabem lado a lado acima de ~1 360 px de janela. Com `nowrap`, entre 1 024 e
   1 360 px a linha vazaria a janela (o `body` tem `overflow-x: clip`, então seria conteúdo
   cortado, não barra de rolagem — pior ainda, porque some sem aviso). Sem `nowrap`, o rótulo
   mais longo ("Conversa no WhatsApp") quebra em duas linhas nessa faixa e a linha continua
   inteira. **Isto precisa do seu olho**: se você preferir a linha rígida, o caminho é subir a
   virada para `xl` e manter a coluna até 1 280 px.
4. **`--i` 6/8 em vez de 16/18** — justificado acima.
5. O `entra-hero` da faixa ficou num `div` invólucro em vez de no root do `FaixaFunil` para não
   inventar uma prop `className` num componente que só tem um uso.

## Verificação

`npx tsc --noEmit` — nenhum erro nos meus dois arquivos. Os dois erros que saem são dos colegas:

```
src/components/secoes/DuasPortas.tsx(68,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
src/components/secoes/Virada.tsx(12,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
```

`npx eslint src/components/secoes/Hero.tsx src/components/secoes/FaixaFunil.tsx` — saída vazia,
código 0.

`npm run verificar` — **falha, e as duas ocorrências são de arquivos que não são meus**:

```
Verificação de marca falhou:
  src/components/ui/CabecaSecao.tsx:25: "leads": * Cabeçalho de seção: rótulo-pílula, título com uma palavra em serifa e o lead ao lado.
  src/components/ui/Secao.tsx:39: "leads": * lead sempre no mesmo lugar, e o resultado foi oito de nove seções com o mesmo esqueleto
```

As duas são **comentários** das primitivas novas da fundação: a regra `(?<!t-)\bleads?\b` pega a
palavra "lead" em prosa. Nenhum dos meus arquivos aparece na lista. Não editei os dois porque são
primitivas compartilhadas que os outros quatro agentes estão importando agora.

Leitura do JSX contra a fundação: copy só de `conteudo.ts`; nenhum `italic`/`font-serif`/
`font-mono`; nenhum hex; o único `opacity-35` está na linha do `Glow` (isenta pela regra);
nenhum `text-cor/NN`; nenhum número com `%` ou `R$`; nenhuma biblioteca nova, nenhuma `<img>`,
nenhum dado inventado; nenhuma animação CSS nova (só as classes existentes, que já têm bloco
`reduce`); `320`/`390` sem vazamento (no celular é coluna, e o rótulo do nó quebra).

## Pendências

1. `npm run verificar` está vermelho por "lead" em comentário de `src/components/ui/CabecaSecao.tsx:25`
   e `src/components/ui/Secao.tsx:39` — troca de uma palavra ("a linha de apoio"), mas em arquivo
   compartilhado; deixei para quem é dono das primitivas.
2. Entre 1 024 px e ~1 360 px de janela, "Conversa no WhatsApp" quebra em duas linhas na faixa
   (decisão 3). Precisa do seu olho para confirmar ou trocar a virada para `xl`.
3. Não rodei o servidor nem capturei tela: a página não compila enquanto os colegas trabalham.
   A conferência visual do hero, da faixa e do cartão pendurado é sua.
4. Nenhum rótulo novo foi inventado — toda a copy da seção já existia em `hero` e em
   `textosDeInterface`.
