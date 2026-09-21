# Home da Lemis: três direções de estrutura

**Data:** 20/09/2026 · **Pasta:** `docs/exploracao-visual/` · **Nada commitado, nada em `src/`.**
O que o Vinicius disse ao ver a home: *"eu n gostei da home do site, queria mudar a estrutura, fazer algo mais bonito e menos quadradao"*. A copy e o argumento estão aprovados e não mudaram: as três direções usam, literalmente, as 110 strings de `src/lib/conteudo.ts` (conferido por script, hash `c20792eafb13`).

## Como ver

Abrem por duplo clique, sem servidor (fontes embutidas):

- [A · Trilho](a-trilho.html)
- [B · Editorial](b-editorial.html)
- [C · Palco](c-palco.html)

Para mostrar ao Vinicius sem abrir nada: [a prancha com as três lado a lado](capturas/prancha.png) e [o teste "mesmo estúdio"](capturas/mesmo-estudio.png) (home atual, A, B, C e a página 03 do Botolifting v2).

Capturas de cada direção em `capturas/`: `{a,b,c}-desktop.png` (página inteira, 1440), `{a,b,c}-mobile.png` (página inteira, 390), `{a,b,c}-dobra-{desktop,mobile}.png`, `{a,b,c}-reduzido-desktop.png` (movimento reduzido), `{a,b,c}-secao-1.png` a `-9.png` (cada bloco, desktop) e, só na C, `c-estado-1.png` a `-6.png` (os seis estados do painel, mais `-mobile`).

## 1. Medição da home atual, antes de desenhar

Medido no preview deste worktree (porta 3000, não 3001: a 3001 não responde) e comparado com o site no ar e com o Atendly.

| O que medi | Home v2 (preview) | Atendly | Site no ar |
|---|---|---|---|
| Blocos | 10 (9 seções + rodapé) | 8 | 9 |
| Seções com o mesmo esqueleto (pílula + título + lead à direita) | 8 de 9 (7 idênticas em H2) | 0 | 6 de 8 |
| Cards retangulares de topo (borda + raio) | 16 (15 com raio 16 px, 1 com 24) | 9 | 15 |
| Retângulos com borda nos 4 lados > 120×60 px, contando os nós do painel | 27 | — | — |
| Seções que são "fileira de N caixas iguais" | 3 (2×628, 4×290, 3×411 px) | 1 | 3 |
| Seções "texto à esquerda, caixa à direita" | 3 | 0 | 2 |
| Larguras de container distintas | **1** (1280 px em todos os blocos) | **6** (360 a 1280) | 1 |
| Elementos que atravessam a margem do container | **0** | sangria em 5 de 8 seções | 0 |
| Respiro vertical | 144/144 px em 7 de 10 blocos | 5 valores | — |
| Altura | **8.808 px** | 9.061 px | 8.361 px |
| Campos | 7 tinta, 2 papel, 1 azul; os 7 em tinta no mesmo `#17191D` chapado | 1 fundo, profundidade por sangria e escala | alterna |

**O diagnóstico do despacho confirma**, com dois agravantes que não estavam nele:

1. A página ficou 47% mais longa do que o plano previa (8.808 contra ~6.000 px), quase no tamanho do Atendly que o próprio plano criticou. A receita repetida custa altura, não só monotonia.
2. Os sete blocos em tinta são a mesma cor chapada. Como o fundo não dá profundidade, as caixas viraram a única fonte de profundidade da página. É por isso que há tantas.

## 2. Medição depois: as três direções contra a home

Gerado por [`ferramentas/medir.mjs`](ferramentas/medir.mjs) no mesmo critério, em 1440 e 390 px. Tabela completa em [`capturas/medicao.md`](capturas/medicao.md).

| Página (desktop 1440) | Cabeçalhos iguais | Cards de topo | Larguras distintas | Elementos que cruzam o container | Ritmos verticais | Altura |
|---|---|---|---|---|---|---|
| Home atual | 6 | 16 | 1 | 0 | 4 | 8.756 px |
| A · Trilho | 5 | 14 ¹ | 1 | 2 | 6 | 10.420 px |
| B · Editorial | 6 | **5** | **7** | **13** | **7** | 9.981 px |
| C · Palco | **1** | **1** ² | 3 | 0 | 3 | **8.090 px** |

¹ Na A os 14 "cards" são os sete nós do funil e os cartões do cliente, que continuam sendo superfícies com borda; as molduras de seção (cenas, marcos, passos, FAQ) saíram.
² Na C só o painel conta: as cenas vivem dentro dele. No celular o painel é aberto embaixo (sem borda inferior) e o script passa a contar as cenas de dentro: 11.

O critério de "cabeçalho igual" do script é mais estrito que o da leitura no navegador (exige o lead ao lado do título na mesma altura); por isso a home dá 6 aqui e 8 na tabela anterior. Nenhuma das quatro páginas tem rolagem horizontal em 390 nem em 1440.

Altura: A e B ficaram mais altas que a home (escada ao longo da linha e numerais de 200 px custam pixel); C ficou 8% mais curta porque cinco seções dividem um painel só.

## 3. As direções

As três mantêm a marca: Geist 900, uma palavra em Instrument Serif itálica azul por título, paleta estrita (tons só por `color-mix`), tinta dominante, pílula-rótulo, interface desenhada sem foto, CTA azul, rodapé assinado Lemis. O `base.css` é o mesmo nas três: a diferença é só de estrutura. Movimento em CSS puro (entrada em view, feixes correndo, borda girando) e `prefers-reduced-motion` respeitado nas três (feixes estáticos azul 70%, nada se desloca, troca de estado sem transição).

### A · Trilho

**Tese:** o argumento é "um caminho fixo", então a página vira esse caminho. Uma linha azul contínua (o gesto do "l" do símbolo) desce pela página do hero ao CTA e o conteúdo pendura nela alternando lados. Não há caixa com moldura: as interfaces desenhadas ficam soltas no campo, a profundidade vem de um gradiente de dois tons de tinta e de glows, e a linha termina virando à direita como o motivo da marca.

| Bloco | O que muda |
|---|---|
| Hero | H1 a 12 col; abaixo, os sete nós pendurados na linha (aquisição à esquerda, retenção à direita), o "l" desenhado por um feixe horizontal de Fechou a Cliente novo, cartão do cliente sobre a linha |
| Duas portas | Cena 1 pendurada à esquerda, cena 2 à direita e 96 px mais baixa; sem moldura |
| Virada | H2 em display a 12 col; o trilho começa abaixo dele e vira o filete do contraste; fundamentos em escada 01/02/03 |
| Aquisição | Quatro marcos em escada ao longo da linha, interfaces soltas sobre halo |
| Retenção | Cartão em papel centrado sobre a linha |
| Acompanhamento e Como começa | Papel; painel solto (barras direto no papel); passos em escada |
| Perguntas | Lista com filetes, sem caixa |
| CTA | O trilho entra branco no azul e vira à direita como o motivo |

Capturas: [dobra](capturas/a-dobra-desktop.png) · [página inteira](capturas/a-desktop.png) · [celular](capturas/a-mobile.png) · [reduzido](capturas/a-reduzido-desktop.png).

**Custo em `src/`:** médio, 2 a 3 dias. `Trilho` novo (um elemento absoluto por seção, pulso em CSS), `Secao` ganha lado e perde a moldura, `HeroPainel` reescrito, `Aquisicao` e `ComoComeca` viram escada. Nenhuma biblioteca, nenhum JS. **Lighthouse:** risco baixo a médio; nada novo entra no bundle, o trilho é um `div`; CLS 0 porque nada depende de fonte para posicionar a linha. **Reduzido:** linha estática azul 70%. **Fraqueza:** a escada custa altura (a mais alta das três) e no celular a linha na margem esquerda vira só um filete decorativo.

### B · Editorial

**Tese:** o que faz uma página bonita é contraste de escala e assimetria, não superfície. As caixas somem quase todas (16 → 5): as interfaces ficam diretamente no campo, em camadas com sombra. Larguras variam por seção (1 → 7): medida de texto de 640 px, faixa de sangria total com os sete nós numa linha, laje assimétrica, folha de papel deslocada para a direita e depois para a esquerda. Numerais em serifa de 200 px, em azul misturado à tinta, marcam as seções cortados pela borda. É a que mais "atravessa a caixa": 13 elementos cruzam o container.

| Bloco | O que muda |
|---|---|
| Hero | H1 a 7,2vw em duas linhas; parágrafo à direita; faixa de sangria total com os sete nós num feixe único; cartão do cliente pendurado na borda da faixa |
| Duas portas | Numeral 02; laje escura que sangra à direita; cena 1 grande à esquerda, cena 2 sobrepondo o canto; textos ao lado |
| Virada | Numeral 03; H2 em display; folha de papel que começa na col 3 e sangra à direita, com lead, contraste e três fundamentos |
| Aquisição | Numeral 04; quatro colunas de jornal separadas por filetes, numerais 96 px, sem card |
| Retenção | Numeral 05 gigante atrás do cartão; leitura em diagonal: apoio, cartão, fecho |
| Acompanhamento | Folha de papel deslocada para a esquerda; painel em barras grandes; a fala como citação com aspas em serifa |
| Como começa | Numeral 07; lista editorial à direita com numerais 120 px e linha de progresso |
| Perguntas e CTA | H2 em display; FAQ em largura total; CTA como hoje |

Capturas: [dobra](capturas/b-dobra-desktop.png) · [página inteira](capturas/b-desktop.png) · [celular](capturas/b-mobile.png) · [reduzido](capturas/b-reduzido-desktop.png).

**Custo em `src/`:** baixo, 1 a 2 dias. Só composição e CSS: `Secao` ganha variantes de largura (medida, sangria, folha, laje), `Numeral` novo, cards saem de quatro seções. Nenhuma biblioteca, nenhum JS. **Lighthouse:** risco baixo; menos nós no DOM que hoje; o numeral gigante é texto na fonte já pré-carregada, sem CLS. **Reduzido:** idêntico ao de hoje. **Fraqueza:** os numerais gigantes são um gesto forte; se ele não gostar deles, a direção perde metade do caráter. E é a segunda mais alta.

### C · Palco

**Tese:** o produto é o funil desenhado, então ele é o protagonista e a página rola em volta dele. No desktop, um painel fixo à direita troca de cena enquanto o texto das seis primeiras seções rola à esquerda: funil completo (hero), as duas portas, o caminho aceso (virada), os quatro marcos (aquisição), o cartão de retenção, o painel de acompanhamento. Uma caixa só na primeira metade da página. No celular o painel prende na base da tela (44% da altura) e o texto rola acima dele: é a mesma ideia com outro gesto, não uma degradação.

| Estado | O que o painel mostra |
|---|---|
| inicio | Os dois funis, feixes correndo, cartão "Origem registrada" |
| portas | Conversa sem próximo passo e cartão sem data de volta |
| caminho | Todos os nós acesos em azul, linha azul cheia, sem cartão |
| aquisicao | Os quatro marcos em 2×2 com as interfaces desenhadas |
| retencao | Cartão grande com os três estados sobre dois fantasmas |
| painel | Painel de acompanhamento em papel |

Capturas: [dobra](capturas/c-dobra-desktop.png) · [página inteira](capturas/c-desktop.png) · [celular](capturas/c-mobile.png) · [reduzido](capturas/c-reduzido-desktop.png) · estados: [1](capturas/c-estado-1.png) [2](capturas/c-estado-2.png) [3](capturas/c-estado-3.png) [4](capturas/c-estado-4.png) [5](capturas/c-estado-5.png) [6](capturas/c-estado-6.png) · no celular: [2](capturas/c-estado-2-mobile.png) [4](capturas/c-estado-4-mobile.png).

**Custo em `src/`:** alto, 3 a 4 dias. `Palco` novo (client component com IntersectionObserver e `useReducedMotion`), `HeroPainel` reescrito com cinco cenas, cinco seções viram lâminas de texto, dois layouts (sticky à direita / sticky embaixo). Nenhuma biblioteca; o JS é um observer de 20 linhas (o único JS dos protótipos). **Lighthouse:** risco médio. TBT sobe pouco; o painel passa a ser o elemento de LCP no desktop e é HTML desenhado, sem imagem. No celular o painel preso ocupa 44% da tela permanentemente e o LCP continua sendo o H1. **Reduzido:** troca de cena sem transição, feixes estáticos. **Fraqueza declarada:** é o gênero que o plano vetou no Atendly ("scrollytelling"). Aqui são seis estados sem sequestro de scroll e a página ficou mais curta que a atual, mas é o mesmo gênero. No celular, 44% da tela ocupados pelo painel cansam se a pessoa quer só ler.

## 4. Mesmo estúdio?

[`capturas/mesmo-estudio.png`](capturas/mesmo-estudio.png) põe a home atual, A, B, C e a página 03 do Botolifting v2 em linha. As três compartilham com a página aprovada: tinta com padrão de pontos, H1 em Geist 900 com uma palavra em serifa azul, pílula-rótulo, interface desenhada em barras-fantasma, numerais em serifa, azul como único acento. A que mais se parece com a apresentação é a **B** (folha de papel, numerais, colunas com filete são a gramática das páginas do v2); a **C** é a que mais se parece com o Atendly (produto grande e desenhado ao lado do texto).

## 5. Recomendação

**B · Editorial.** É a que mais responde ao "menos quadradão" com número: 16 cards viram 5, uma largura vira sete, zero cruzamentos viram treze, e é a de menor custo e menor risco ao piso de Lighthouse. Parece do mesmo estúdio da apresentação aprovada.

Se ele quiser o espetáculo do painel que muda, **C** é a segunda: é a mais próxima do Atendly, a mais curta e a única que quebra a repetição de cabeçalhos (1 contra 6). Custa o dobro e traz o gênero vetado.

**A** é a mais "Lemis" no gesto (a linha é o símbolo) mas é a que menos muda a métrica: os nós continuam sendo caixas e a escada faz a página crescer.

O que eu perguntaria a ele olhando a prancha: (1) os numerais gigantes da B agradam ou incomodam? (2) na C, o painel preso no celular ajuda ou atrapalha a leitura? (3) na A, a linha contínua vale a altura extra? A resposta define qual entra em `src/`.

## 6. O que ficou de fora e por quê

- **Lighthouse nos protótipos:** não medido. São HTML estático fora do Next; o número não seria o do site. Cada direção declara o risco pela técnica usada, e nenhuma usa nada que a implementação em `src/` não sustente (sem biblioteca, sem imagem, sem sequestro de scroll).
- **Menu mobile:** os protótipos não têm o JS do menu (o header no celular mostra só logo e botão). Não muda a decisão de estrutura.
- **Medição em 320 px:** medido só em 390 e 1440; nenhuma das três tem rolagem horizontal nas duas.
- **Verificador do site (`npm run verificar`)** varre só `src/`; o irmão em [`ferramentas/verificar-marca.mjs`](ferramentas/verificar-marca.mjs) lê a mesma lista de travas e a mesma paleta do original e passa nos três HTML e no `base.css`. Trava testada: colei "Compareceu à consulta?" num HTML, o script reprovou, e o HTML foi regerado.
- **Execução:** a regra da casa é "Fable planeja, Opus ou Sonnet executam". O despacho pediu que eu construísse e o plano está em [`PLANO.md`](PLANO.md); executei inline, porque o julgamento visual a cada captura era o trabalho. A implementação em `src/` da direção escolhida deve seguir a regra.

## 7. Como foi feito

Os três HTML são **gerados**: [`ferramentas/construir.mjs`](ferramentas/construir.mjs) importa `src/lib/conteudo.ts` (só leitura) e as partes comuns ([`ferramentas/partes.mjs`](ferramentas/partes.mjs): sprite da marca, header, rodapé, primitivas), e cada direção é um módulo em [`ferramentas/direcoes/`](ferramentas/direcoes/). Se a copy mudar, `node docs/exploracao-visual/ferramentas/construir.mjs` regenera os três. Fontes embutidas em base64 por [`gerar-fontes.mjs`](ferramentas/gerar-fontes.mjs) porque Chrome bloqueia `@font-face` entre arquivos `file://`. Capturas por [`capturar.mjs`](ferramentas/capturar.mjs) (Puppeteer com o Chrome do sistema), medição por [`medir.mjs`](ferramentas/medir.mjs), copy por [`verificar-copy.mjs`](ferramentas/verificar-copy.mjs).

Duas coisas aprendidas na captura, para quem repetir: a entrada por `animation-timeline: view()` não "entra" numa captura de página inteira (o script neutraliza só a animação de entrada na hora de capturar; o estado final é o mesmo), e captura de página inteira no celular em 2× passa do limite de textura do Chrome e sai duplicada (o script captura a página inteira em 1× e a dobra em 2×).

## 8. Suposições marcadas

- `[PENDENTE DE VALIDAÇÃO]` As três direções mantêm a copy de `conteudo.ts` no estado `c20792eafb13` de 20/09/2026, que ainda traz a frase "Cliente novo entrando, cliente antigo voltando." no H1 · base: o despacho disse que a copy está aprovada, e o outro agente estava editando vocabulário em `src/` na mesma hora; o cabeçalho de `scripts/verificar-marca.mjs` fala em revogação dessa frase, mas a trava não está na lista e o `RESUMO.md` do site diz que ela foi reposta (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` Mapa de campos livre por direção: a B põe papel na virada e no acompanhamento, a A nos dois blocos de hoje, a C só em "Como começa" · base: resposta do gerente em 20/09 ("Livre por direção"); tinta dominante e CTA azul continuam (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` Direção C entra apesar do veto ao scrollytelling · base: resposta do gerente em 20/09 ("Sim, como exploração") (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` Custos em dias são estimativa para um executor Opus/Sonnet com o plano na mão · base: tamanho das mudanças por seção listadas acima, sem medição de execução (quem valida: gerente).
