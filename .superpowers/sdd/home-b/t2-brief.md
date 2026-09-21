# Tarefa 2 — Duas portas (laje) + A virada (folha à direita)

Arquivos: `src/components/secoes/DuasPortas.tsx`, `src/components/secoes/Virada.tsx`.
Copy: `duasPortas` e `virada` em `src/lib/conteudo.ts`.

## Seção 2 — Duas portas

`<Secao id="duas-portas" campo="tinta" ritmo="amplo" numeral={2}>`

O cartão do hero desce sobre o topo desta seção: o ritmo `amplo` (160px de topo no desktop) já
está calibrado para isso. Não reduza o respiro de topo.

```
<Container className="relative z-10">
  <CabecaSecao rotulo titulo abertura colunas="8-4"
               classeTitulo="t-display t-display-denso" medidaTitulo="max-w-[13ch]" />
  <div className="laje mt-16 lg:mt-22 grid lg:grid-cols-[7fr_5fr] lg:gap-x-16">
     esquerda: rótulo "Quem chega" + a cena da conversa (bolhas grandes) — max-w-[560px]
     direita:  os dois textos (cenas[0].texto e cenas[1].texto), cada um com o seu t-rotulo
     sobreposto: o cartão "Quem volta" saindo do canto inferior da laje
  </div>
  <p className="fecho t-sub medida mt-16 lg:mt-32">{duasPortas.fecho}</p>
</Container>
```

- **A laje é a única superfície desta seção.** Os dois textos ficam soltos sobre ela: nada de
  `CartaoHolofote`, nada de `superficie-escura` em volta de parágrafo. Hoje são dois cards
  iguais lado a lado — é exatamente o que precisa sair.
- Cena "Quem chega": as bolhas da conversa **maiores** que as de hoje
  (`text-[1.0625rem] px-5 py-4 rounded-[18px]`), a bolha enviada com `w-[86%]`, e o filete
  + `Chip` "Sem próximo passo" embaixo. Sem moldura em volta da cena (hoje tem
  `rounded-[14px] border`): na laje a cena fica direto no campo.
- Cena "Quem volta": o cartão de hoje (avatar + duas barras + dl com "Última compra"/"Voltar em"
  + chip), em `cartao-cliente`/`superficie-escura`, posicionado **absoluto** no desktop saindo
  para fora da laje: `lg:absolute lg:left-[28%] lg:-bottom-18 lg:w-[360px] lg:z-20`, com sombra
  forte. No celular ele entra no fluxo, abaixo dos textos.
- A laje sangra à direita e é cortada pelo `overflow-clip` da `Secao`. O cartão que sai dela
  precisa ficar dentro da largura do container — confira que em 1440 ele não chega na borda.

## Seção 3 — A virada

`<Secao id="como-funciona" campo="tinta" ritmo="medio" numeral={3} fundo={<PadraoGrade .../> + <Glow .../>}>`

```
<Container className="relative z-10">
  <Revelar>
    <Pilula/> + H2 em t-display (largo, max-w-[16ch]) — SEM lead ao lado
  </Revelar>
  <Folha lado="direita" className="mt-12 lg:mt-16">
    <p className="t-lead medida text-secundario">{virada.abertura}</p>
    contraste: duas colunas, filete em cima e filete vertical entre elas
    fundamentos: três colunas, filete em cima, cada uma com <Numeral tamanho="sm"/> + h3 + p
  </Folha>
</Container>
```

- Aqui o cabeçalho **não** usa `CabecaSecao`: o título é largo e o lead foi para dentro da folha.
  Monte com `Pilula` + `TituloDestaque as="h2" classe="t-display" animar="view"`.
- Dentro da folha o campo é papel: texto principal `text-tinta` (herdado), apoio `text-secundario`,
  filetes `border-fio-claro`.
- Contraste: `virada.contraste.outros` em `t-sub text-secundario`, `virada.contraste.lemis` em
  `t-sub` (tinta cheia), separados por `lg:border-l lg:border-fio-claro lg:pl-10`.
- Fundamentos: `virada.fundamentos.map`, numeral 01/02/03 em `<Numeral tamanho="sm" />`,
  nome em `t-sub`, texto em `t-corpo text-secundario max-w-[34ch]`.
- Sai o `Marco` (numeral + traço): o traço era mais uma linha horizontal por bloco.
