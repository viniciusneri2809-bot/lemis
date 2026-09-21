# Fundação já pronta — leia antes de escrever qualquer seção

Você está reconstruindo a home da Lemis (Next 16, React 19, Tailwind v4, `motion`) na direção
visual **B · Editorial**. A tese: o que faz uma página bonita é **contraste de escala e
assimetria**, não superfície. As caixas caíram de 16 para 5, as larguras de seção de 1 para 7, e
13 elementos atravessam o container. Referência de forma (NÃO copie o HTML, traduza para
componentes da casa): `docs/exploracao-visual/b-editorial.html` + `docs/exploracao-visual/base.css`.

## Regras que reprovam o trabalho

1. **A copy não muda.** Todo texto sai de `src/lib/conteudo.ts`. Nenhum literal de texto em
   componente. Se a estrutura pedir um rótulo que não existe lá, **não invente**: escreva a
   pendência no seu relatório e use o texto existente mais próximo.
2. **Verificador de marca** (`npm run verificar`) tem que passar. Ele reprova, em `src/`:
   - as palavras `italic`, `font-serif`, `font-mono` em qualquer arquivo que não seja
     `globals.css` / `layout.tsx`. **Itálico e serifa só pela classe `t-destaque`.**
   - qualquer hex fora de `304cff f4f1ea 17191d ffffff 666a73 adb2bd 203ad9 182caf`
     (use os tokens: `text-branco`, `bg-azul`, `border-fio-escuro`, `color-mix(...)`).
   - `opacity-N` fora de `src/components/efeitos/` e fora de linha com `aria-hidden|Padrao|Glow|Grao`.
   - `text-cor/NN` (texto com alfa).
   - número seguido de `%` ou `R$` como copy. **Largura de barra desenhada é isenta** se escrita
     como `largura="74%"` (prop da `Barra`) ou como classe `w-[74%]`/`h-[20px]`.
   - palavras: agentes, única, a melhor, exclusivo, garantia, grátis, urgente, leads, case,
     depoimento, APL, clínica, **agendamento/agenda/agendar/agendado, compareceu, paciente,
     consulta/consultório, avaliação, tratamento/procedimento, sessão**.
3. **Sem `any`.** `npx tsc --noEmit` e `npm run lint` limpos **nos seus arquivos**
   (os outros vão estar quebrados enquanto os colegas trabalham — ignore erros fora dos seus).
4. **Nenhuma biblioteca nova, nenhuma `<img>`, nenhum dado inventado.** Interface desenhada usa
   barra-fantasma (`<Barra>`) no lugar de número e leva `aria-hidden="true"`.
5. **`prefers-reduced-motion`**: nada de animação só-CSS nova sem o bloco `reduce`. O `Revelar`
   e o `MotionConfig reducedMotion="user"` já cuidam do que passa por `motion`.
6. **Sem rolagem horizontal em 320 e 390 px.** Quem sangra precisa estar dentro de uma `Secao`
   sem `transbordar`, que corta (`overflow-clip`).
7. **Não commitar.** Deixe na árvore de trabalho.
8. Comentário em português, só onde explica um **porquê** que o código não mostra. Nada de
   comentário que repete o nome da função.

## Primitivas novas (já existem, importe)

```tsx
import { Secao } from "@/components/ui/Secao";
// <Secao id campo={"tinta"|"papel"|"azul"} ritmo={"hero"|"amplo"|"medio"|"compacto"|"alto"|"semTopo"}
//        numeral?={2} numeralCentro?={false} separador?={false} transbordar?={false} fundo?={<>…</>}>
// Só a casca: campo, respiro vertical, numeral gigante e fundo. NÃO monta cabeçalho e NÃO tem
// moldura nem cantoneiras. O <Container> é responsabilidade do filho.

import { CabecaSecao } from "@/components/ui/CabecaSecao";
// <CabecaSecao rotulo titulo abertura? colunas={"6-6"|"8-4"} classeTitulo?="t-titulo"
//              medidaTitulo?="max-w-[13ch]" escuro?={true} className? />
// Grade de 12: "6-6" = título 1–6 / lead 7–12; "8-4" = título 1–8 / lead 9–12. O lead senta
// na base (`lg:self-end`). Já traz Pilula + TituloDestaque(animar="view") + Revelar.

import { Folha } from "@/components/ui/Folha";
// <Folha lado={"direita"|"esquerda"}> — folha de papel que entra pela grade e sangra pelo
// outro lado. Já leva `campo-papel`. Dentro dela o texto secundário é `text-secundario`.

import { Numeral } from "@/components/esquema/Numeral";
// <Numeral numero={1} tamanho={"sm"|"md"|"lg"} />  → 48 / 96 / 120 px no desktop, em serifa azul.

import { Feixe } from "@/components/efeitos/Feixe";
// <Feixe eixo={"h"|"v"} atraso?={0.8} className="absolute left-0 top-0 bottom-0" />
// Filete com pulso azul correndo, CSS puro. Com movimento reduzido vira filete azul estático.

import { Container } from "@/components/ui/Container";   // max-w-1408 + padding lateral
```

### Classes utilitárias novas em `globals.css`

- `.medida` — `max-width: 640px`. A medida de leitura, independente do container.
- `.sangria` — `margin-inline: calc(50% - 50vw)`. Tira o elemento do container e ocupa a janela.
- `.laje` — bloco em `tinta-funda` com canto arredondado à esquerda, sangrando à direita.
- `.jornal` — `<ol>`/`<ul>` que vira 4 colunas `2fr 3fr 3fr 2fr` com filete entre elas no desktop
  e pilha com filete horizontal no celular.
- `.lista-editorial` — `<ol>` de duas colunas (numeral | texto), com `position: relative` para o feixe.
- `bg-tinta-funda` — token novo, um degrau abaixo da tinta.

### Primitivas que já existiam e continuam (não reescreva)

`Container`, `Botao` + `SetaExterna`, `TituloDestaque`, `Pilula`, `Chip`, `Barra`, `Bolha`,
`Quadro`, `CartaoCliente`, `Marco`, `Icone`, `Simbolo`, `Wordmark`, `Motivo`,
`Revelar`, `Palavras`, `PalavrasHero`, `PadraoPontos`, `PadraoGrade`, `Glow`,
`Accordion*`, `LinhaProgresso`, `Holofote`, `CartaoHolofote`, `Inclinacao`, `Parallax`.

**`FeixeConexao` foi apagado.** Não importe.

## O que SAI da página (é o pedido dele: "menos quadradão")

- `Cantoneiras` e `LinhasDiagonais` dentro das seções de conteúdo.
- `superficie-escura` / `superficie-clara` como moldura de texto. Só sobram **5 superfícies na
  página inteira**, e todas são o objeto desenhado (cartão de cliente, nó de funil), nunca uma
  caixa em volta de parágrafo.
- Cabeçalho de seção idêntico em todas as seções.

## Como reportar

Escreva o relatório completo no arquivo que o despacho indicar e devolva na resposta só:
status (`DONE` / `DONE_WITH_CONCERNS` / `BLOCKED`), arquivos tocados, e as pendências em uma linha
cada. **Não despache subagentes.**
