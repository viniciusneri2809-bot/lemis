# T4 — Acompanhamento (folha à esquerda) + Como começa (lista editorial)

Status: **DONE_WITH_CONCERNS** (a única concern está fora dos meus arquivos: ver Pendências).

## Arquivos tocados

- `src/components/secoes/OQueVoceVe.tsx` — reescrito
- `src/components/secoes/ComoComeca.tsx` — reescrito

Nenhum outro arquivo foi criado ou alterado. `src/app/page.tsx`, `src/app/globals.css` e as demais
seções não foram tocados. Nada commitado.

---

## `OQueVoceVe.tsx` — seção 6, acompanhamento

Casca: `<Secao id="acompanhamento" campo="tinta" ritmo="semTopo" numeral={6}>` →
`<Container className="relative z-10">` → `<Folha lado="esquerda">`.

O `relative z-10` no container é o que mantém o conteúdo acima do `NumeralGigante`, que a
`Secao` desenha em `z-index: 0`.

Dentro da folha:

1. `<CabecaSecao rotulo titulo abertura colunas="6-6" escuro={false} />`. O `escuro={false}` é o
   que troca `text-secundario-escuro` por `text-secundario` no rótulo e na abertura — dentro da
   folha o campo é claro.
2. `<div className="mt-16 grid gap-y-14 lg:grid-cols-12 lg:gap-x-6">` com `Revelar` em
   `lg:col-span-7` (painel) e `Revelar atraso={0.15}` em `lg:col-span-5 lg:col-start-8` (citação).

### Painel — perdeu o card

Saiu `superficie-clara p-6 lg:p-7`; sobrou `<div aria-hidden="true">` puro. Mesmo conteúdo, mesma
ordem, mesmos filetes `border-fio-claro` entre os três blocos (topo / indicadores / origens).

Barras maiores, pela `className` da `Barra`, exatamente como o brief manda:

- indicadores: `<Barra largura="88%|62%|40%" forte className="h-[20px]" />`
- origens: `<Barra largura="82%|56%" forte className="h-[14px]" />`

A `Barra` traz `h-[10px]` por padrão, então o override depende da ordem de emissão do Tailwind.
Conferi em vez de supor: compilei o Tailwind 4.2.1 pela API (`compile()` de `tailwindcss`) com as
três candidatas e li o offset de cada regra no CSS gerado —

```
10px 4457
14px 4495
20px 4533
```

`h-[14px]` e `h-[20px]` saem depois de `h-[10px]`, logo ganham. Nenhum `!` foi preciso.

O `aria-hidden="true"` continua no bloco inteiro: o valor mora na barra-fantasma, e o dado real
está na abertura da seção.

### Citação — perdeu o card, ganhou a aspa

Saiu `superficie-clara` e saiu o `Simbolo` no ladrilho azul (o import do `Simbolo` foi removido).
Agora, em sequência, sem caixa nenhuma:

- `t-rotulo text-secundario` com `exemplo.rotulo`
- `<span aria-hidden="true" className="t-destaque mt-7 -mb-5 block text-[10rem] leading-[0.55]">“</span>`
  — os 160px / 0,55 / +28px / −20px da `.citacao .aspas` da referência, traduzidos para a escala
  do Tailwind (`text-[10rem]`, `mt-7`, `-mb-5`).
- `<p className="t-sub mt-4 max-w-[36ch]">{exemplo.fala}</p>` — **sem** as aspas tipográficas que o
  componente antigo enrolava em volta (`“{exemplo.fala}”`). O texto sai agora literal do
  `conteudo.ts`.
- `<p className="t-legenda mt-4 text-secundario">{exemplo.nota}</p>`

Tirei o `max-w-[52ch]` que a nota tinha: a coluna de 5/12 já é mais estreita que 52ch e a
restrição virava letra morta.

---

## `ComoComeca.tsx` — seção 7, como começa

`<Secao id="como-comeca" campo="tinta" ritmo="medio" numeral={7}>`. Papel → tinta, conforme
decidido. Sem `separador`.

Grade de 12 no `Container`, com a `CabecaSecao` ocupando as 12 colunas (`className="lg:col-span-12"`)
e montando internamente o seu próprio 6-6 — o cabeçalho continua com o título em 1–6 e a abertura
em 7–12, e a lista desce para 6–12.

- Os três `superficie-clara p-7` saíram. Viraram `<ol className="lista-editorial">` com
  `<Numeral tamanho="lg" />` na coluna esquerda e `h3.t-sub` + `p.t-corpo max-w-[44ch]
  text-secundario-escuro` na direita.
- A `LinhaProgresso` saiu, junto com o import.
- A metade esquerda abaixo do título ficou vazia. Não preenchi.
- Ações: `Botao` + `cta.nota` em `lg:col-span-7 lg:col-start-6`, `flex flex-wrap items-center gap-5`.

## Decisões de composição

1. **O feixe ficou fora da `<ol>`.** O brief (e o HTML de referência) põem
   `<span class="feixe v">` como filho direto de `<ol>`; o modelo de conteúdo de `ol` só aceita
   `li` e elementos de suporte a script, então um `span` ali é HTML inválido. Ancorei em vez disso
   no wrapper que já existia: `<Revelar className="relative …">` envolve o feixe e a `ol`, e a
   `.lista-editorial` tem `padding-left` próprio, então o filete cai exatamente na mesma margem que
   cairia dentro da lista. Resultado visual idêntico, HTML válido. Está comentado no arquivo.
2. **`Revelar` carrega as classes de coluna.** A `Revelar` renderiza uma `div`; se ela entrasse
   entre a grade e a `ol`, quebraria o `col-start`. Então as classes de grade moram na `Revelar` e
   os elementos de conteúdo vão limpos por dentro. Mesmo padrão nas duas seções.
3. **`gap-y-14` no bloco painel/citação.** No celular as duas colunas empilham; o brief só define
   o `gap-x` do desktop. 14 (3,5rem) é o respiro que separa o painel da aspa de 160px sem abrir
   um buraco.
4. **Sem padding vertical extra na folha.** A referência dá
   `#acompanhamento .folha{padding-block:clamp(56px,6vw,96px)}`; o `.folha` do `globals.css` já traz
   `clamp(2.5rem,5vw,5rem)` e o brief não pede o acréscimo. Como `globals.css` não é meu arquivo e
   sobrescrever o shorthand `padding` por utilitário exigiria cuidado com o `padding-left` da
   sangria, deixei o padrão. Se na revisão visual a seção 6 parecer apertada no topo (ela usa
   `ritmo="semTopo"`, então a folha é quem dá o respiro), o ajuste é uma linha no `globals.css`.
5. **Duas funções auxiliares** (`Painel`, `Citacao`) no arquivo da seção 6, como já era. Nenhum
   componente novo em `ui/` ou `esquema/`.

## Copy

Nenhum texto novo. Tudo sai de `acompanhamento`, `comoComeca` e `cta` em `src/lib/conteudo.ts`, e
o link de `LINK_WHATSAPP`. O único literal nos componentes é o caractere `“` da aspa desenhada,
que o brief especifica como elemento decorativo e que leva `aria-hidden="true"`.

## Verificação

`npx eslint src/components/secoes/OQueVoceVe.tsx src/components/secoes/ComoComeca.tsx`

```
lint-exit:0
```

(sem saída, sem aviso)

`npx tsc --noEmit` — nenhum erro nos meus dois arquivos. Os que aparecem são dos colegas, ainda em
trabalho:

```
src/components/secoes/DuasPortas.tsx(68,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
src/components/secoes/HeroPainel.tsx(4,30): error TS2307: Cannot find module '@/components/efeitos/FeixeConexao' …
src/components/secoes/Virada.tsx(12,7): error TS2322: … Property 'rotulo' does not exist on type 'IntrinsicAttributes & Props'.
```

`npm run verificar`

```
Verificação de marca falhou:
  src/components/ui/CabecaSecao.tsx:25: "leads": * Cabeçalho de seção: rótulo-pílula, título com uma palavra em serifa e o lead ao lado.
  src/components/ui/Secao.tsx:39: "leads": * lead sempre no mesmo lugar, e o resultado foi oito de nove seções com o mesmo esqueleto
```

Zero ocorrências nos meus dois arquivos. As duas reprovações são em arquivos da fundação — ver
Pendências.

**Classes do Tailwind conferidas uma a uma** (mesma compilação pela API, checando se cada regra sai
no CSS): `mt-22`, `gap-y-14`, `text-[10rem]`, `-mb-5`, `mt-7`, `leading-[0.55]`,
`grid-cols-[96px_1fr]`, `max-w-[44ch]`, `max-w-[36ch]`, `col-start-8`, `col-start-6`, `flex-wrap`,
`gap-5`, `inset-y-0` — todas `ok`. `lg:mt-22` existe mesmo sem estar na escala fixa, porque a v4
deriva do `--spacing`.

**Não verificado:** a aparência. O `npm run dev` não foi rodado, por instrução — a página não
compila até os cinco agentes terminarem. Rolagem horizontal em 320/390 também não foi medida em
navegador; a folha sangra dentro de uma `Secao` sem `transbordar`, que corta com `overflow-clip`,
que é a condição que a fundação exige.

## Pendências

1. `npm run verificar` reprova em `src/components/ui/CabecaSecao.tsx:25` e
   `src/components/ui/Secao.tsx:39`: a palavra "lead" em comentário em português dispara a trava
   `(?<!t-)\bleads?\b`. São arquivos da fundação, compartilhados pelos cinco agentes — não toquei
   para não conflitar com quem está editando agora. Correção: trocar "o lead" por "a abertura" nos
   dois comentários. Enquanto isso, a verificação da página inteira não passa por causa deles.
2. Respiro vertical da folha na seção 6: decisão 4 acima. Só resolve na revisão visual.
3. `Numeral tamanho="lg"` dá 64px no celular, contra os 72px da referência. É a primitiva, não
   mexi — fica o registro caso a escala do numeral seja revisada.
