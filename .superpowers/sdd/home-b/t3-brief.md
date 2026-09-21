# Tarefa 3 — Aquisição (colunas de jornal) + Retenção (leitura em diagonal)

Arquivos: `src/components/secoes/Aquisicao.tsx`, `src/components/secoes/Retencao.tsx`.
Copy: `aquisicao` e `retencao` em `src/lib/conteudo.ts`.

## Seção 4 — Aquisição

`<Secao id="aquisicao" campo="tinta" ritmo="compacto" numeral={4} fundo={<PadraoPontos .../>}>`

```
<Container className="relative z-10">
  <CabecaSecao rotulo titulo abertura colunas="6-6" classeTitulo="t-titulo" />
  … abaixo do lead, na mesma coluna 7–12: os chips de `aquisicao.dentro` + `aquisicao.nota`
  <ol className="jornal mt-16 lg:mt-22">  ← 4 colunas 2fr 3fr 3fr 2fr, filete entre elas
    cada <li>: <Numeral tamanho="md"/> + <h3 className="t-rotulo text-secundario-escuro"/> + esquema
  </ol>
</Container>
```

- **O `BlocoEsquema` sai.** Hoje cada marco é um card `superficie-escura` de altura mínima 280px
  — quatro caixas iguais, o coração do "quadradão". Agora cada esquema fica **solto no campo**,
  separado do vizinho pelo filete vertical da coluna, com `max-w-[360px]`.
  - marco 1 (Anúncio): `<Quadro className="h-22" />` + os dois campos (rótulo + `<Barra largura="74%" forte />`) + `<Chip tom="azul">`.
  - marco 2 (Conversa registrada): `<Bolha lado="recebida">` com o texto + `<Bolha lado="enviada" />` + filete + `<Chip tom="azul">`.
  - marco 3 (Próximo passo marcado): `<Chip tom="azul">` da etapa + os dois campos com `<Barra largura="60%" forte />`.
  - marco 4 (Fechou): `<CartaoCliente chip={...} />` — **este continua sendo cartão**, porque é o
    objeto (o contato que virou cliente), não uma moldura em volta de texto.
- Os chips de `aquisicao.dentro` e a `nota` ficam **na coluna do lead** (7–12), logo abaixo dele,
  não numa faixa própria. Use `className` na `CabecaSecao`? Não: monte a coluna direita à mão —
  chame `CabecaSecao` só com `rotulo`/`titulo`/`colunas="6-6"` e escreva a coluna 7–12 você,
  com o lead + chips + nota dentro de um `Revelar`. O `CabecaSecao` aceita `abertura` opcional;
  omita-a e monte a coluna direita como irmã na mesma grade de 12.
- A seta entre marcos (`SetaMarco`) **sai**: quem separa agora é o filete da coluna.

## Seção 5 — Retenção

`<Secao id="retencao" campo="tinta" ritmo="alto" numeral={5} numeralCentro fundo={<Glow .../>}>`

Leitura em diagonal, do alto à esquerda para baixo à direita:

```
<Container className="relative z-10">
  <div className="grid lg:grid-cols-12 lg:gap-x-6">
    <div className="lg:col-span-6">      Pilula + H2 (t-titulo)
    <p  className="lg:col-span-6 lg:col-start-7 lg:self-end">   {retencao.abertura}
    <p  className="lg:col-span-4 lg:row-start-2 lg:mt-24">      {retencao.apoio}  (max-w-[26ch])
    <div className="lg:col-span-4 lg:col-start-5 lg:row-start-2 lg:row-span-2 lg:mt-24">
         <CartaoCliente tamanho="grande" estados={retencao.estados} className="w-full shadow-…" />
    <p  className="lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:self-end">  {retencao.fecho}  (t-sub, max-w-[24ch])
  </div>
</Container>
```

- **Os dois cartões-fantasma de trás saem.** A profundidade agora vem do numeral gigante 05
  centrado atrás do cartão (`numeralCentro`) e do `Glow`.
- O cartão fica no meio da diagonal, com sombra forte
  (`shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--color-tinta)_90%,transparent)]`).
- No celular a diagonal vira pilha: cabeça, apoio, cartão, fecho — nessa ordem, com respiro de
  `mt-8` entre elas e sem `max-w` apertado.
- `retencao.apoio` continua em `t-lead text-secundario-escuro`; `retencao.fecho` em `t-sub text-branco`.
