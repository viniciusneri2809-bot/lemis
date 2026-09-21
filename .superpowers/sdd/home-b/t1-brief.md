# Tarefa 1 — Hero + faixa dos sete nós

Arquivos: `src/components/secoes/Hero.tsx` (reescrever), `src/components/secoes/HeroPainel.tsx`
(apagar e substituir por `src/components/secoes/FaixaFunil.tsx`).

Copy: `hero` em `src/lib/conteudo.ts` (`rotulo`, `titulo`, `paragrafo`, `secundario`,
`painel.aquisicao.{rotulo,nos}`, `painel.retencao.{rotulo,nos}`, `painel.cliente.chip`),
mais `cta.rotulo` e `textosDeInterface.{painelAquisicao,painelRetencao}`. `LINK_WHATSAPP` de
`@/lib/contato`.

## Forma (protótipo, seção 1)

```
<Secao id="inicio" campo="tinta" ritmo="hero" transbordar fundo={<Glow .../>}>
  <Container>
    Pilula (entra-hero)
    H1  — largura total, clamp(3rem, 7.2vw, 7rem), SEM max-w de 12ch
    grade 12: coluna 7–12 → <p class="t-lead medida"> + ações (Botao + link "Ver como funciona")
  </Container>
  <FaixaFunil />   ← sangria total, fora do Container
</Secao>
```

- O H1 **cresce**: hoje é `t-display` com `max-w-[12ch]` na coluna 1–6; agora ocupa a largura
  toda e quebra em duas linhas ("Cliente novo entrando," / "cliente antigo *voltando*."). Use
  uma classe própria no `className` do `TituloDestaque`, por exemplo
  `text-[clamp(3rem,7.2vw,7rem)] lg:text-[clamp(3rem,7.2vw,7rem)]` — mais simples: passe
  `classe="t-display"` e `className="mt-6 text-[clamp(3rem,7.2vw,7rem)]"`.
  No celular o protótipo usa `clamp(2.75rem,12vw,4rem)`: resolva com
  `text-[clamp(2.75rem,12vw,4rem)] lg:text-[clamp(3rem,7.2vw,7rem)]`.
- Mantenha `animar="hero"` no `TituloDestaque` (animação por CSS desde o primeiro paint) e as
  classes `entra-hero` com `style={{ "--i": N }}` na pílula, no parágrafo e nas ações, como hoje.
  **Isso é o que segura o CLS e o LCP — não troque por `Revelar`.**
- A grade da parte de baixo: `grid lg:grid-cols-12 lg:gap-x-6`, o bloco de texto em
  `lg:col-span-6 lg:col-start-7`, com a classe `medida` no parágrafo.

## `FaixaFunil.tsx` (novo, componente de servidor, sem "use client")

Substitui o painel inclinado com feixes medidos por JS. Agora é uma **faixa de sangria total**
em `bg-tinta-funda`, com os sete nós do funil numa linha só.

```
<div className="sangria mt-14 bg-tinta-funda pt-10 lg:mt-24 lg:pt-16">
  <Container className="relative">
    <div className="relative py-10 ...">       ← “linha-wrap”
      <Feixe eixo="h" className="absolute inset-x-0 top-1/2 -mt-px hidden lg:block" />
      <Feixe eixo="v" className="absolute left-5 inset-y-0 lg:hidden" />
      <ol className="relative flex flex-col items-start gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        … 7 <li>, cada um com um nó …
      </ol>
    </div>
    <CartaoCliente chip={cliente.chip} className="... -mb-18 max-w-[240px] lg:ml-[16.666%]" />
  </Container>
</div>
```

- **Os sete nós numa linha só**: os 4 de aquisição e os 3 de retenção, na ordem de
  `conteudo.ts`. O rótulo do grupo ("AQUISIÇÃO", "RETENÇÃO") aparece **acima** do primeiro nó de
  cada funil, em `t-rotulo text-secundario-escuro`. No protótipo isso é um `::before` com
  `attr(data-grupo)`; em React faça um `<span>` posicionado (`absolute bottom-full left-0 mb-3.5
  whitespace-nowrap`), **e o rótulo precisa continuar legível para leitor de tela** — a maneira
  certa é manter duas `<ol>` com `aria-label` (`textosDeInterface.painelAquisicao` e
  `painelRetencao`) lado a lado em `flex`, cada uma com os seus nós, em vez de uma lista de 7.
  Prefira essa: duas `<ol aria-label>` irmãs num `flex ... justify-between` com `gap`.
- O nó: reaproveite o desenho de hoje (`superficie-escura`, ladrilho 36×36 com `Icone`, nome em
  `t-controle`), mas com padding menor (`px-3.5 py-2.5`) e o nome em `text-[0.9375rem]`. O último
  nó de retenção ("Comprou de novo") é o destino: ladrilho em `bg-azul text-branco` e
  `feixe-borda feixe-ativo` na superfície, como hoje.
- O cartão do cliente fica pendurado na **borda de baixo** da faixa e desce para dentro da seção
  seguinte (margem negativa ~ `-mb-18` no desktop, `-mb-14` no celular), deslocado 2/12 à direita
  no desktop. Por isso a `Secao` do hero leva `transbordar`, e a seção 2 vai abrir com respiro
  grande — **não é problema seu, é combinado**.
- No celular: os nós viram coluna, o feixe vira vertical na margem esquerda, os grupos ganham
  respiro de topo.

## O que some

- `HeroPainel.tsx`, `FeixeConexao` (já apagado), `Inclinacao` e `Parallax` **no hero**
  (os componentes continuam existindo para quem quiser; só saem daqui).
- `Cantoneiras` e `LinhasDiagonais` do hero.
- A altura mínima `lg:min-h-[min(calc(100svh-4.75rem),920px)]` e o `-mt-[4.75rem] pt-[4.75rem]`:
  o hero agora termina na faixa, não numa tela cheia. Mantenha o hero começando embaixo do
  header sticky sem buraco (o header é `sticky`, não `fixed`, então nada a compensar).

## Verificação sua

`npx tsc --noEmit` (ignorando erros em arquivos que não são seus), `npm run verificar`, e uma
leitura do seu JSX contra a lista de regras da fundação.
