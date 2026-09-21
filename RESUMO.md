# Home da Lemis, reconstruída na direção B (Editorial)

**Nada commitado. Nada publicado. Nada em produção.** O site no ar continua sendo o de 17/09.
O que sai daqui é **preview local**, rodando em `http://localhost:3100`.

---

## O que mudou, e por quê

Você viu a home v2 pronta e reprovou **a forma, não a copy**: *"eu n gostei da home do site, queria
mudar a estrutura, fazer algo mais bonito e menos quadradao"*. Vendo as três direções na prancha,
escolheu a B: *"Eu gostei do b."* Decisão: `decisoes/2026-09-20-home-do-site-segue-a-direcao-editorial`.

A tese da B é que **o que faz uma página bonita é contraste de escala e assimetria, não superfície**.
Na prática: as caixas somem, as larguras passam a variar, e alguma coisa atravessa a margem em
quase toda seção.

**A copy não mudou uma palavra.** As nove seções, o argumento e o vocabulário sem nicho que a
rodada anterior corrigiu continuam exatamente como estavam em `src/lib/conteudo.ts`.

---

## Antes e depois, medido

Mesma régua nas duas colunas: `docs/validacao/ferramentas/medir-home.mjs` e o irmão dela que mediu
a home reprovada (`docs/exploracao-visual/capturas/medicao.md`), em 1440 px.

| Medida | Home reprovada | Protótipo B | **Esta home** |
|---|---|---|---|
| Cards retangulares de topo | 16 | 5 | **5** |
| Larguras de seção distintas | 1 | 7 | **13** |
| Elementos que atravessam o container | 0 | 13 | **20** |
| Ritmos verticais distintos | 4 | 7 | **7** |
| Campos distintos | 3 | 2 | 2 |
| Altura da página | 8.756 px | 9.981 px | **10.264 px** |
| Rolagem horizontal em 320 / 390 / 1440 | não | não | **não** |

As sete larguras que o protótipo previa viraram treze porque a coluna de jornal e o cartão da
diagonal também contam como medida própria na régua. As treze, em pixel: 228, 328, 411, 503, 628,
640, 697, 923, 1029, 1280, 1288, 1392 e 1440.

**A página ficou 17% mais alta que a reprovada** — 1.508 px a mais. É o preço declarado da direção:
numeral de 220 px, folha de papel com respiro de 80 px e lista editorial custam altura. Estava
previsto na exploração (B era a segunda mais alta das três) e você escolheu vendo isso.

---

## O que cada seção virou

| # | Seção | Antes | Agora |
|---|---|---|---|
| 1 | Hero | H1 em meia página e painel inclinado ao lado, com feixes calculados por JS | H1 em largura total, texto na medida de 640 px à direita, e uma **faixa de sangria total** com os sete nós do funil numa linha só; o cartão do cliente fica pendurado na borda e desce na seção seguinte |
| 2 | As duas portas | dois cards iguais lado a lado | **laje escura que sangra à direita**: a conversa grande à esquerda, os dois textos soltos à direita, e o cartão "sem data de volta" saindo pelo canto de fora |
| 3 | A virada | rótulo, título, lead, filete, três colunas | numeral 03 cortado pela borda de cima, H2 largo sem lead ao lado, e **folha de papel que sangra à direita** com lead, contraste e fundamentos dentro |
| 4 | Aquisição | quatro cards de 280 px de altura mínima | **quatro colunas de jornal** com filete entre elas, numerais de 96 px, esquemas soltos no campo. Só "Fechou" continua cartão, porque é o objeto, não a moldura |
| 5 | Retenção | texto à esquerda, cartão à direita sobre dois cartões-fantasma | **leitura em diagonal** com o numeral 05 de 374 px atrás do cartão; os fantasmas saíram |
| 6 | Acompanhamento | seção em papel, painel num card, fala em outro card | seção em tinta com **folha de papel que sangra à esquerda**; painel solto, barras direto no papel, e a fala como citação com aspas em serifa |
| 7 | Como começa | seção em papel, três cards iguais | seção em tinta, **lista editorial** na metade direita com numerais de 120 px e o feixe correndo na margem |
| 8 | Perguntas | título grudado à esquerda, acordeão dentro de superfície | H2 grande em cima e **FAQ em largura total**, fechado por filete em cima e embaixo |
| 9 | Fecho | como estava | como estava. A composição já estava aprovada; mudou só o ritmo vertical |

---

## O piso, medido

### Lighthouse (build de produção, `next start`, Lighthouse 13, navegadores fechados)

| Rodada | Perf | A11y | Boas práticas | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| **desktop** | **100** | 100 | 100 | 100 | 0,6 s | **0** | 0 ms | 0,3 s |
| **mobile 1** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 10 ms | 0,9 s |
| **mobile 2** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 0 ms | 0,9 s |
| **mobile 3** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 0 ms | 0,9 s |

Meta: desktop 100 e mobile ≥ 96. Relatórios brutos e HTML em `docs/validacao/b/lighthouse-*`.

### Peso

| Medida | Rodada anterior | **Esta** |
|---|---|---|
| JS inicial (gzip) | 219,8 KB | **215,9 KB** |
| CSS (gzip) | 8,4 KB | 9,5 KB |

O JS caiu porque **o painel do hero deixou de existir**: o `FeixeConexao` media a geometria dos nós
no cliente para desenhar o SVG dos feixes, e a faixa nova é CSS puro. Saíram também a `Inclinacao` e
o `Parallax` do hero. O CSS subiu 1,1 KB, que é o sistema editorial novo.
**Nenhuma biblioteca nova. Nenhuma `<img>`. Nenhum dado inventado.**

### Movimento reduzido

Medido com `prefers-reduced-motion: reduce` no Chrome headless:

| Item | Medido |
|---|---|
| Lenis instanciado | `false` |
| Texto em opacidade 0 | nenhum, na página inteira |
| Pulso do feixe | `display: none` |
| Filete do feixe | estático, azul a 70% |
| Elementos com `transform` dentro de `main` | **0** |

Captura em `docs/validacao/b/desktop-movimento-reduzido.png`. Sem JavaScript, o `<noscript>` do
`layout.tsx` restaura a opacidade de tudo.

### Teclado e foco

**24 elementos focáveis no desktop, todos com indicador de foco visível.** A ordem sai: pular para o
conteúdo → logo → cinco links da nav → botão do header → botão do hero → "Ver como funciona" →
botão do "Como começa" → cinco gatilhos do acordeão → botão do fecho → logo e links do rodapé →
WhatsApp. No celular, o menu abre com `aria-expanded="true"`, e o Escape fecha, esconde o painel e
**devolve o foco ao botão** — medido, não deduzido.

### Contraste

Todo par texto/fundo visível foi medido por luminância, com os fundos translúcidos empilhados:
**zero reprovações em texto real** (21 pares em texto, 7 em interface desenhada). Tabela completa em
`docs/validacao/b/provas.md`.

Um ajuste veio dessa medição: a hora dentro da bolha de conversa estava em `currentColor` a 65% e
dava **3,33:1** sobre o azul num corpo de 11 px. Passou para 90%: **5,02:1** sobre azul e 12,27:1
sobre tinta.

Duas coisas ficam abaixo do mínimo **de propósito**, e as duas são decoração sem informação
(`aria-hidden`): os numerais gigantes 02 e 05, que são azul misturado à tinta e funcionam como
textura de fundo, não como texto — 1,29:1 e 1,19:1. Se você quiser eles mais legíveis, é uma linha
em `globals.css`.

### A trava de nicho, provada contra o defeito

Ver o verificador passar não prova que ele pega alguma coisa. Injetei, uma de cada vez, as quatro
palavras que nicharam a peça na rodada anterior, num componente real, e ele reprovou as quatro:

| Injetado | O verificador disse |
|---|---|
| "Compareceu à consulta" | `"comparecimento": vocabulário de consultório, não de empresa de serviço` |
| "some da sua agenda" | `"agenda": vocabulário de consultório, não de empresa de serviço` |
| "Avaliação agendada" | `"agendamento": vocabulário de consultório, não de empresa de serviço` |
| "o paciente volta" | `"paciente": vocabulário de consultório` |

Arquivo restaurado depois de cada injeção; `npm run verificar` verde e `npx tsc --noEmit` limpo no fim.

### Revisão final: feita por mim, não por agente

Despachei um revisor em subagente duas vezes e as duas travaram no watchdog lendo o pacote de
3.582 linhas. Em vez de tentar uma terceira, fiz a revisão aqui. O que ela olhou e achou:

- **Ordem de cabeçalhos**: um `h1`, um `h2` por seção, `h3` nos itens. Sem salto, lido na página viva.
- **Literal de texto em componente**: nenhum. Toda a copy continua vindo de `conteudo.ts`.
- **Interface desenhada**: os blocos que inventariam dado (painel, esquemas, cartões, bolhas,
  numerais gigantes) estão em `aria-hidden`, e os dois funis do hero continuam anunciados como duas
  listas nomeadas.
- **Um achado, menor:** oito componentes ficaram órfãos com a saída dos cards — `Cantoneiras`,
  `LinhasDiagonais`, `Holofote`, `CartaoHolofote`, `Inclinacao`, `Parallax`, `LinhaProgresso` e
  `Simbolo` —, junto com as classes `.cantoneira*`, `.hachura`, `.holofote` e `.cartao-holofote` no
  `globals.css`. **Não apaguei**: nenhum deles entra no bundle (ninguém importa), o custo é ~1 KB de
  CSS morto, e apagar oito arquivos é faxina que você não pediu. Fica registrado para você decidir.

### Largura

`scrollWidth === innerWidth` em **320, 390, 768, 1024, 1440 e 1920 px**. Sem rolagem horizontal em
nenhuma delas.

### Faixas sem conteúdo

O teste de vazio da régua da casa, adaptado para página longa (mede conteúdo, não ausência de
fundo). Na página inteira de 10.152 px há **cinco faixas de 150 px ou mais sem conteúdo**, e a maior
tem 294 px. **Nenhuma delas está no miolo de uma seção**: quatro são o respiro entre blocos
(aquisição→retenção, como começa→perguntas, perguntas→fecho) e uma é o vão à esquerda do hero, que é
a assimetria que a direção compra de propósito.

---

## Mesmo estúdio?

`docs/validacao/b/mesmo-estudio.png` põe lado a lado a home reprovada, esta home e a **página 03 do
Botolifting v2**, que é a peça que você aprovou sem reservas.

As três compartilham: tinta dominante, Geist 900, **uma palavra por título em Instrument Serif
itálica azul**, pílula-rótulo, interface desenhada em barras-fantasma, numerais em serifa, azul como
único acento, zero foto.

A home nova está **mais perto da apresentação do que a reprovada**, e dá para apontar onde: a
reprovada tem o painel dentro de um card com moldura, e o Botolifting não tem moldura nenhuma; a
seção 4 desta home é exatamente a gramática da p. 03 — colunas com filete, numeral em serifa no
topo de cada uma, interface desenhada embaixo.

---

## O que ficou no código

**Fundação nova** (é o que fez as nove seções pararem de se repetir):

- `src/app/globals.css` — o sistema editorial: `.medida` (640 px), `.sangria`, `.folha` e
  `.folha-esquerda`, `.laje`, `.numeral-gigante`, `.jornal`, `.lista-editorial`, `.feixe`, e o token
  `--color-tinta-funda`. Mais `overflow-x: clip` no body, porque a sangria mede 100vw e a barra de
  rolagem sobra.
- `src/components/ui/Secao.tsx` — **reescrita**. Virou casca: campo, ritmo vertical, numeral e fundo.
  Não monta mais cabeçalho e não tem moldura. Era ela que produzia o esqueleto repetido.
- `src/components/ui/CabecaSecao.tsx`, `src/components/ui/Folha.tsx`,
  `src/components/esquema/Numeral.tsx`, `src/components/esquema/NumeralGigante.tsx`,
  `src/components/efeitos/Feixe.tsx` — novos.
- `src/components/secoes/FaixaFunil.tsx` — novo, substitui o `HeroPainel.tsx`.

**Apagados:** `HeroPainel.tsx` e `FeixeConexao.tsx`. Aparecem como `D` no `git status`.

**Sete ritmos verticais** no lugar de um só: 88/0 · 160/112 · 144/144 · 128/128 · 160/160 · 0/128 ·
80/80.

---

## Capturas

Todas em `docs/validacao/b/`.

| O quê | Arquivo |
|---|---|
| Página inteira, desktop 1440 | `desktop-pagina-inteira.png` |
| Página inteira, celular 390 | `mobile-pagina-inteira.png` |
| Dobra | `desktop-dobra.png`, `mobile-dobra.png` |
| Seção por seção, desktop | `desktop-{hero,duas-portas,virada,aquisicao,retencao,acompanhamento,como-comeca,perguntas,cta-final,rodape}.png` |
| Seção por seção, celular | `mobile-{hero,duas-portas,virada,aquisicao,retencao,acompanhamento,como-comeca,perguntas,cta-final}.png` |
| Menu do celular aberto | `mobile-menu.png` |
| Movimento reduzido | `desktop-movimento-reduzido.png` |
| Teste do mesmo estúdio | `mesmo-estudio.png` |
| Medição e provas | `medicao.md`, `provas.md`, `lighthouse.md` |

---

## Como rodar

```bash
npm run dev            # preview de desenvolvimento
npm run build && npx next start -p 3100   # preview de produção, que é o que foi medido
npm run verificar      # verificador de marca, incluindo a trava de nicho
npm run lint && npx tsc --noEmit
node docs/validacao/ferramentas/medir-home.mjs   http://localhost:3100
node docs/validacao/ferramentas/provar.mjs       http://localhost:3100
node docs/validacao/ferramentas/capturar-home.mjs http://localhost:3100
./docs/validacao/ferramentas/lighthouse.sh       http://localhost:3100 3
python3 docs/validacao/ferramentas/mesmo-estudio.py
```

---

## Rodada 2 — o cartão branco cortado

Palavras dele, com print: *"no site só esse trem branco ali que ficou cortado e sem sentido."*

**O defeito, medido.** O cartão do cliente no fim da faixa do hero tinha `-mb-14 lg:-mb-18`: saía da
faixa com margem negativa e contava com o empilhamento entre seções para continuar visível. Como a
seção seguinte é irmã posterior e tem fundo opaco, ela o cobria. Dos 116 px de altura do cartão,
**72 px (62%) ficavam escondidos no desktop** e 56 px no celular — e o que sumia era justamente o
chip **"Origem registrada"**, o único texto que diz o que aquele retângulo é. Sobrava um avatar
cinza, duas barras e uma aresta reta atravessando tudo.

**O que decidi, e por quê.** O cartão **fica**: ele é o fio condutor da casa, o mesmo contato que
atravessa a apresentação institucional da capa ao fechamento. Mas ele passa a aparecer **inteiro,
dentro da faixa, pendurado na linha do funil por um feixe curto**, do lado da aquisição — que é
onde a origem é registrada, e por isso é onde o chip faz sentido.

Descartei as duas alternativas: empurrar o cartão para outra seção tirava dele a relação com a
linha, que é o que o faz significar alguma coisa; e consertar o empilhamento (levantar a seção do
hero acima da seguinte) devolvia o cartão inteiro mas mantinha a fragilidade — qualquer mudança no
respiro da seção 2 voltaria a cortá-lo. O gesto de atravessar borda não se perdeu: a página tem
**20 elementos cruzando o container**, dois a mais que antes desta rodada.

| Medida | Antes | Depois |
|---|---|---|
| Cartão coberto pela seção seguinte, desktop | 72 de 116 px (62%) | **0** |
| Cartão coberto, celular | 56 de 116 px (48%) | **0** |
| Folga entre a base do cartão e a seção 2 | −72 px | **+64 px** (desktop), **+56 px** (celular) |
| Chip "Origem registrada" visível | não | **sim** |
| Feixe ligando a linha ao cartão | não existia | **linha em y 909 → cartão em y 979, sem vão** |

Antes: `docs/validacao/b/antes/cartao-cortado-{desktop,mobile}.png`.
Depois: `docs/validacao/b/depois/cartao-inteiro-{desktop,mobile}.png`.

### A varredura pedida: mais algum elemento cortado sem intenção?

Três passadas automáticas em **1440, 1280, 1024, 768, 390 e 320 px**, cada uma procurando um
mecanismo diferente de corte: (1) elemento que passa da borda da própria seção, (2) elemento
cortado pelo `overflow` de um ancestral, (3) elemento coberto pela seção vizinha por ordem de
pintura — que é o mecanismo exato do defeito que você apontou.

| O que apareceu | Onde | Veredito |
|---|---|---|
| **Numerais gigantes 02, 03, 04, 06, 07** | cortados pelo topo da própria seção, 12% deles (14–26 px conforme a largura) | **Intencional, mantido.** É a assinatura da direção: o numeral entra cortado pela borda de cima. O campo de cima é a mesma tinta, então não há aresta de cor — o numeral simplesmente começa fora. |
| **Traço do motivo no fecho** | sobe 364 px acima da seção azul e é cortado pela borda dela | **Intencional, mantido.** É um traço aberto, não um objeto fechado: entra no campo pela borda e lê como caminho que continua, que é o gesto do "l" da marca. Igual ao protótipo que você aprovou. |
| **Halos azuis** (`glow`) | cortados em cinco lugares, até 64% deles | **Intencional, mantido.** Gradiente radial sem borda: cortar um halo não produz aresta visível. |
| **Cartão do cliente** | coberto 62% pela seção 2 | **Era defeito. Corrigido**, como acima. |

**Nenhum segundo defeito da mesma classe.** O cartão era o único elemento fechado, com borda e
sombra, sendo cortado sem intenção.

### O piso, remedido depois da correção

| Rodada | Perf | A11y | Boas práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| **desktop** | **100** | 100 | 100 | 100 | 0,6 s | **0** | 0 ms |
| **mobile 1** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 10 ms |
| **mobile 2** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 0 ms |
| **mobile 3** | **96** | 100 | 100 | 100 | 2,8 s | **0** | 0 ms |

`scrollWidth === innerWidth` em 320, 390, 768, 1024, 1440 e 1920 — **sem rolagem horizontal em
390 px**. Verificador de marca verde, com a trava de nicho provada contra o defeito real.
`npx tsc --noEmit` e `npx eslint src scripts` limpos. JS inicial **215,9 KB** gzip, igual.
Contraste: **zero reprovações em texto real**. Movimento reduzido intacto. 24 focáveis, todos com
foco visível (eram 25 na rodada anterior; o 25º era o indicador do modo de desenvolvimento do
Next, que não existe na build de produção).

---

## Suposições marcadas

- `[PENDENTE DE VALIDAÇÃO]` **"Como começa" passou de papel para tinta.** A decisão
  `2026-09-20-site-fundo-escuro-dominante` diz "dois em papel (acompanhamento e como começa)", mas o
  protótipo B que você olhou põe papel só na virada e no acompanhamento — duas folhas seguidas
  matariam o contraste que a folha existe para criar · base: entre o mapa de campos escrito antes e
  a forma que você viu e escolheu, vale a que você viu; o RESUMO da exploração já marcava "mapa de
  campos livre por direção" como pendente (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` **A linha dos sete nós do hero só fica horizontal a partir de 1280 px.**
  Entre 1024 e 1279 ela vira coluna com o feixe vertical, o mesmo gesto do celular · base: em 1024
  os sete lado a lado davam 1.089 px de conteúdo numa janela de 1.024 e criavam rolagem horizontal,
  que reprova o piso (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` **Os numerais gigantes ficam quase invisíveis de propósito** (1,19:1 e
  1,29:1 sobre a tinta) · base: são azul misturado à tinta, como no protótipo, e funcionam como
  textura, não como texto (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` **O cartão do cliente deixou de sangrar para fora da faixa.** Ele agora aparece inteiro, pendurado na linha do funil, dentro do campo da faixa · base: você disse que ele estava "cortado e sem sentido"; entre manter o gesto e manter o cartão legível, o cartão legível ganhou, e o gesto de atravessar borda continua em vinte outros elementos (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` **A página cresceu 17%** em relação à home reprovada · base: é o custo
  declarado da direção B, que você escolheu vendo a medição da exploração (quem valida: Vinicius).
- `[PENDENTE DE VALIDAÇÃO]` **O rótulo "Quem chega" aparece duas vezes na laje**, sobre a cena e
  sobre o primeiro texto, como no protótipo · base: a copy não tem um segundo rótulo para a cena, e
  a regra é não inventar palavra (quem valida: Vinicius).

## Pendências suas, que vêm da rodada anterior e continuam

- `NEXT_PUBLIC_SITE_URL` na Vercel no dia de publicar (a build avisa que `metadataBase` não está setado).
- `facebook-domain-verification` ainda é o token antigo.
- `identidade.md` e `sistema-visual.md` ainda não registram fundo escuro, Instrument Serif e a saída
  da nota de IA.
