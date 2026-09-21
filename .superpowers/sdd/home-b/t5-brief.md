# Tarefa 5 — Perguntas (largura total) + CTA final

Arquivos: `src/components/secoes/Perguntas.tsx`, `src/components/secoes/CtaFinal.tsx`.
Copy: `perguntas` e `ctaFinal` em `src/lib/conteudo.ts`, mais `cta` e `LINK_WHATSAPP`.

## Seção 8 — Perguntas

`<Secao id="perguntas" campo="tinta" ritmo="compacto" separador>`

```
<Container className="relative z-10">
  <Revelar>
    <h2 className="t-display t-display-denso max-w-[20ch]"><Palavras texto={perguntas.titulo} /></h2>
  </Revelar>
  <Revelar atraso={0.15} className="mt-16">
    <Accordion type="single" collapsible defaultValue="pergunta-0">
      … 5 AccordionItem escuro, em LARGURA TOTAL …
    </Accordion>
  </Revelar>
</Container>
```

- **Sai a grade de duas colunas com o título grudado (`lg:sticky`) e sai a `superficie-escura`
  em volta do acordeão.** O título passa a ser `t-display t-display-denso` (grande, editorial),
  em cima, e o FAQ ocupa a largura toda com filete entre itens.
- Sai `Cantoneiras` e `LinhasDiagonais`.
- No gatilho: numeral em serifa clara à esquerda
  (`<span aria-hidden="true" className="t-destaque t-destaque-claro w-8 shrink-0 text-[1.5rem] leading-[1.1]">01</span>`),
  pergunta em corpo maior (`text-[clamp(1.25rem,1.8vw,1.625rem)]`), respiro `py-7`.
  O sinal de + já vem do `AccordionTrigger`.
- A resposta alinha com a pergunta (recuo igual à largura do numeral + gap) e vai até `max-w-[64ch]`.
  Para isso, passe `className` no `AccordionContent`.
- Não mexa em `src/components/ui/accordion.tsx` — só componha. Se precisar de uma variação de
  estilo, resolva por `className` nos props que o componente já aceita.

## Seção 9 — CTA final

`src/components/secoes/CtaFinal.tsx` — **a composição está aprovada e muda pouco.**

- Troque o `<section>` escrito à mão por `<Secao id="contato" campo="azul" ritmo="alto" fundo={…}>`,
  mantendo `PadraoPontos`, o glow branco e o motivo alto sangrando no canto inferior direito.
- Mantenha o texto na coluna 1–6 (grade de 12), o `t-display t-display-denso` com `max-w-[34rem]`,
  o apoio em `max-w-[39ch]` e o botão `variante="sobre-azul"`.
- A calibragem que **não pode quebrar**: o traço do motivo começa em x≈669 numa janela de 1440;
  nenhum texto pode passar disso. Se o novo ritmo mudar a caixa, ajuste a largura do texto,
  nunca o texto.
- No celular, o motivo continua entrando embaixo em largura total.

Essas duas seções são as mais baratas do plano — faça as duas com cuidado e sem inventar escopo.
