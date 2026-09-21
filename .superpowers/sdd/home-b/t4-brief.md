# Tarefa 4 — Acompanhamento (folha à esquerda) + Como começa (lista editorial)

Arquivos: `src/components/secoes/OQueVoceVe.tsx`, `src/components/secoes/ComoComeca.tsx`.
Copy: `acompanhamento` e `comoComeca` em `src/lib/conteudo.ts`, mais `cta` e `LINK_WHATSAPP`.

## Seção 6 — Acompanhamento

`<Secao id="acompanhamento" campo="tinta" ritmo="semTopo" numeral={6}>`

A seção é **tinta**, e o conteúdo inteiro mora numa folha de papel que sangra à **esquerda**.
É a inversão do gesto da seção 3 (que sangra à direita) — é isso que faz as duas não parecerem
a mesma seção.

```
<Container className="relative z-10">
  <Folha lado="esquerda">
    <CabecaSecao rotulo titulo abertura colunas="6-6" escuro={false} />
    <div className="mt-16 grid lg:grid-cols-12 lg:gap-x-6">
      <div className="lg:col-span-7">   ← painel SOLTO, sem card
      <div className="lg:col-span-5 lg:col-start-8">   ← a citação
    </div>
  </Folha>
</Container>
```

- **O painel perde o card.** Hoje é `superficie-clara p-6`; agora as barras ficam direto no papel,
  separadas por filetes `border-fio-claro`. Mesmo conteúdo: linha de topo (ponto azul + barra +
  `<Chip tom="azul">` do `chip`), os três indicadores em `<dl>` de 3 colunas com
  `<Barra largura="88%|62%|40%" forte />`, e as duas origens em grade `[96px_1fr]` com
  `<Barra largura="82%|56%" forte />`. **As barras ficam maiores**: `h-[20px]` nos indicadores e
  `h-[14px]` nas origens (passe pela `className` da `Barra`). Mantenha `aria-hidden="true"`
  no bloco inteiro — o dado real está na abertura da seção.
- **A citação perde o card e ganha aspas.** Hoje é `superficie-clara` com o `Simbolo` num
  ladrilho azul. Agora: `t-rotulo` com `exemplo.rotulo`, depois uma aspa de abertura em serifa
  grande e decorativa — `<span aria-hidden="true" className="t-destaque block text-[10rem] leading-[0.55] ...">“</span>` —
  e a fala em `t-sub` (`max-w-[36ch]`), seguida de `exemplo.nota` em `t-legenda text-secundario`.
  A fala **não leva mais aspas tipográficas no texto**: a aspa desenhada já cumpre o papel.
  Confira que o texto da fala saia exatamente como está em `conteudo.ts` (hoje o componente
  envolve em `“…”` — tire, porque a aspa virou elemento).
- Dentro da folha o campo é claro: passe `escuro={false}` na `CabecaSecao` e use
  `text-secundario` no apoio, `text-tinta` no texto forte.

## Seção 7 — Como começa

`<Secao id="como-comeca" campo="tinta" ritmo="medio" numeral={7}>`

**Muda de papel para tinta.** Motivo: na direção B o papel fica só na virada e no acompanhamento;
duas folhas seguidas (6 e 7) matariam o contraste que a folha existe para criar.

```
<Container className="relative z-10">
  <div className="grid lg:grid-cols-12 lg:gap-x-6">
    <CabecaSecao … colunas="6-6" />   (ou monte a grade à mão, como preferir)
    <ol className="lista-editorial lg:col-span-7 lg:col-start-6 mt-16 lg:mt-22">
      <Feixe eixo="v" className="absolute left-0 inset-y-0" />
      3 <li>: <Numeral tamanho="lg"/> | (<h3 className="t-sub"/> + <p className="t-corpo text-secundario-escuro max-w-[44ch]"/>)
    </ol>
    <div className="lg:col-span-7 lg:col-start-6 mt-12 lg:mt-16 flex flex-wrap items-center gap-5">
      <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
      <p className="t-legenda text-secundario-escuro">{cta.nota}</p>
    </div>
  </div>
</Container>
```

- **Os três cards saem.** Hoje são `superficie-clara p-7` em três colunas iguais. Agora é uma
  lista editorial na metade direita da página, com numerais de 120px e o feixe correndo na margem.
- A metade esquerda fica deliberadamente vazia abaixo do título: é o respiro que a assimetria
  compra. **Não preencha com nada.**
- A `LinhaProgresso` sai (o feixe faz o papel dela).
