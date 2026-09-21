# Plano — Site Lemis v2: funil de aquisição e de retenção

> **Para quem executa:** use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans`, tarefa por tarefa. Os passos usam caixas (`- [ ]`) para acompanhamento. **Nenhuma tarefa termina em commit**: regra da casa, o site está no ar e o que sai daqui é preview local para o Vinicius aprovar.

**Objetivo:** refazer `lemiscompany.com.br` sobre o posicionamento novo: a Lemis implanta, dentro da empresa do cliente, o funil de aquisição e o de retenção, com tráfego, estratégia comercial, automação e IA como meio. Retenção com o mesmo peso da aquisição.

**Arquitetura:** a landing continua Next.js 16 App Router + React 19 + Tailwind 4, com `motion` (LazyMotion), `lenis` e Radix Accordion já instalados. Muda a copy inteira (`src/lib/conteudo.ts`), a estrutura de seções (nove blocos, tinta dominante), o painel do hero (dois funis ligados pelo gesto do "l") e entra um vocabulário de **interface desenhada** em HTML/CSS/SVG (`src/components/esquema/`), o mesmo da apresentação Botolifting v2 aprovada. Nenhuma biblioteca nova; uma fonte nova (Instrument Serif Italic) para uma palavra por título.

**Stack:** Next.js 16.1.6, React 19.2, Tailwind 4, TypeScript 5, `motion` 13, `lenis` 1.3, `@radix-ui/react-accordion` 1.2, `next/font/local`, Node 22.18+.

**Spec:** `docs/brief-site-v2.md` (pedido literal, posicionamento, régua de saída) + a Parte 1 deste documento (auditoria, percurso, desenho das seções, sistema visual). As decisões do Vinicius de 20/09/2026 estão na seção 10 e valem como parte da spec.

## Restrições globais

- Não commitar, não fazer merge, não publicar, não fazer deploy. Preview local (`npm run dev` / `npm run build && npm run start`).
- Lighthouse (build de produção, `localhost`): **desktop 100 / mobile ≥ 96** em performance, 100 nas demais. JS inicial **≤ 230 KB gzip** (hoje 223 KB). CLS 0.
- `prefers-reduced-motion` respeitado com os mesmos desligamentos de hoje (Lenis não instancia, feixes estáticos, reveals sem deslocamento, acordeão sem animação de altura). Teclado e foco funcionando; skip link; menu mobile devolve foco no Escape.
- Sem rolagem horizontal em 320, 390 e 1440 px.
- Paleta estrita: `#304CFF`, `#F4F1EA`, `#17191D`, `#FFFFFF`, `#666A73`, `#ADB2BD`, `#203AD9`, `#182CAF`. Nenhum hex novo; tons derivados só por `color-mix()`. Nenhuma opacidade em texto.
- Sem número, case, logo de cliente, depoimento ou resultado. Sem nicho de cliente (regra de 18/09). Sem "leads". Sem "Lemis Company" (o domínio tem "company", o nome escrito nunca).
- Atendly não é nomeado: o site diz "CRM".
- Preço não entra no site.
- Rodapé assina Lemis; a razão social "APL Digital — Assessoria em Marketing" ao lado do CNPJ fica como está.
- Copy em segunda pessoa ("você", "sua empresa"), "nós" para a casa. Cada serviço descrito exatamente como é entregue: nem a menos, nem a mais.
- `npm run verificar` (verificador de marca, atualizado na Tarefa 0) e `npm run lint` passam antes de cada tarefa ser dada como pronta.

---

# Parte 1 — O desenho

## 1. O que muda, em três frases

1. **O objeto da compra é o funil implantado**, de aquisição e de retenção. Não é tráfego, não é CRM, não é criativo: essas coisas rodam dentro.
2. **Retenção tem o mesmo peso da aquisição.** Definição do Vinicius, literal: *"Retenção é fazer os clientes que já compraram, comprar novamente."* A seção fala do resultado, não do encanamento.
3. **Automação e IA são citadas como meio, sem explicar como.** Palavras dele: *"Entregamos já. Não precisa falar de nova explícita como faremos, apenas citar que usamos."*

O site de hoje erra o objeto (vende quatro frentes), não tem retenção em nenhuma seção e proíbe, no próprio verificador, as palavras "IA" e "automação".

## 2. Auditoria do site no ar, seção por seção

| Seção hoje (`src/components/secoes/`) | Veredito | Motivo |
|---|---|---|
| `Header` (barra de vidro, nav, botão) | **fica** | Só mudam os rótulos e âncoras da navegação. |
| `Hero` + `HeroPainel` (título "O próximo passo tem direção." e painel com tráfego → criativos → páginas → CRM → acompanhamento) | **refeito** | A frase caiu por decisão do Vinicius ("nem gosto dessa frase"). O painel desenha o meio como se fosse o produto. A mecânica (nós em superfície, feixes animados no gesto do "l", parallax, inclinação) fica; o conteúdo vira os dois funis. |
| `Problema` ("Por que os contatos chegam e as vendas não acompanham?") | **refeito** | Só fala da porta de entrada. Vira "As duas portas", com a segunda cena (quem volta) no mesmo peso. |
| `Servicos` (cinco cards: tráfego, criativos, páginas, CRM, acompanhamento) | **sai** | É o erro de 19/09 em escala de site: vende o mecanismo como oferta. As frentes voltam como chips "o que roda dentro" nas seções dos funis, sem card e sem lista de "inclui". |
| `Fundamentos` (Proximidade, Visão comercial, Execução integrada + exemplo de conversa) | **absorvido** | Os três continuam verdadeiros e passam a sustentar o funil na seção "A virada". O exemplo de conversa vai para "O que você vê", porque é prova por mecanismo. O arquivo some. |
| `ParaQuem` ("Clínicas de estética e escritórios de advocacia fazem parte da base atual") | **sai** | Cita nicho, proibido em peça institucional desde 18/09. E as cenas de "As duas portas" fazem o dono se reconhecer sem uma seção de "isso é para mim?". A lista "faz sentido conversar se" não sobrevive: as quatro frases dela estão dentro das cenas. |
| `ProximoPasso` (três passos + botão) | **fica, reescrito** | Os passos viram conversa → leitura e proposta → implantação e acompanhamento. Vira `ComoComeca`. |
| `Perguntas` (acordeão, cinco itens) | **fica, reescrito, campo tinta** | A apresentação irmã mata o FAQ; no site ele tem outra função (quem chega pela busca, sem vendedor ao lado). Cinco perguntas novas, nas objeções de agência. Divergência intencional, aprovada pelo Vinicius. |
| `CtaFinal` (azul) | **fica** | O título passa a ser a frase nova. O motivo em papel continua. |
| `Footer` | **fica** | Frase de apoio nova; navegação nova; WhatsApp (75) 98802-3044 confirmado; razão social e CNPJ como estão. |
| `ui/Secao` (pergunta à esquerda, conector, resposta à direita) | **substituído** | A estrutura "conversa" (H2 em voz baixa + afirmação) foi a da rodada 1. O ritmo novo é rótulo-pílula + H2 com uma palavra em serifa + lead, como no Atendly e no Botolifting v2. |
| `marca/Conector` | **sai** | Só o `Secao` antigo usava. O gesto do "l" passa a viver no feixe que liga os dois funis no hero e no motivo do CTA final. |
| Efeitos (`Revelar`, `Palavras`, `PalavrasHero`, `FeixeConexao`, `Holofote`, `CartaoHolofote`, `Padroes`, `Grao`, `Inclinacao`, `Parallax`, `LinhaProgresso`, `Providers`) | **ficam** | São o que salvou a rodada 2. Nada é removido; `CartaoHolofote` passa a ser usado nos cards das cenas. |
| Campos alternados papel → tinta → papel → tinta → papel → azul → tinta | **muda** | Tinta dominante (seis blocos), papel em dois (respiro), azul em um (fecho). Aprovado pelo Vinicius em 20/09 para o site e para a apresentação. |
| `layout.tsx` (title, description, OG) e `opengraph-image.tsx` (alt) | **atualizados** | Seguem a frase nova. A imagem OG (wordmark + motivo, sem texto) fica. |
| `scripts/verificar-marca.mjs` | **atualizado** | Deixa de reprovar "IA", "inteligência artificial" e "automação" (posicionamento novo); passa a aceitar itálico só na classe `t-destaque`; ganha a trava "Lemis Company". Continua reprovando "leads", garantia, urgência, métrica, prova social, "agentes". |

## 3. Percurso de quem chega

Dono ou sócio de empresa que vive de cliente entrando e voltando. Não é técnico, mede a conversa em faturamento e agenda cheia. O site é a escada da apresentação irmã comprimida para tela; cada bloco tem a frase que ele deveria estar pensando ao rolar.

| Estágio | Bloco | O que ele pensa |
|---|---|---|
| Reconhecer | 1 Hero | "É disso que eu vivo: quem chega e quem volta." |
| Reconhecer | 2 As duas portas | "Aqui depende de quem está no balcão. E ninguém cuida da volta." |
| Entender o mecanismo | 3 A virada | "Não é mais anúncio. É um caminho fixo. Então é isso que eles fazem." |
| Acreditar | 4 Aquisição, implantada | "Entendi o caminho do cliente novo." |
| Acreditar | 5 Retenção, implantada | "E o que já é meu não se perde." |
| Acreditar | 6 O que você vê | "Eu enxergo se está funcionando." |
| Próximo passo | 7 Como começa | "Vou chamar." |
| Objeção | 8 Perguntas | "Já tenho CRM… ah, eles usam o meu." |
| Fecho | 9 CTA final | (o botão) |

**Fio visual:** um cliente só atravessa a página. Aparece como mensagem no hero e na cena 1, ganha origem registrada na aquisição, reaparece com hora de voltar na retenção e como "voltou" no painel de acompanhamento. É o ciclo inteiro numa pessoa, que é o argumento da retenção sem precisar dizê-lo. Sem nome, sem foto: avatar neutro e barras-fantasma, como no Botolifting v2.

## 4. Estrutura: nove blocos

| # | Seção (arquivo) | `id` | Campo | Nav |
|---|---|---|---|---|
| 0 | `Header` | — | vidro | — |
| 1 | `Hero` + `HeroPainel` | `inicio` | tinta | (logo) |
| 2 | `DuasPortas` | `duas-portas` | tinta | — |
| 3 | `Virada` | `como-funciona` | tinta (tipográfica) | Como funciona |
| 4 | `Aquisicao` | `aquisicao` | tinta | Aquisição |
| 5 | `Retencao` | `retencao` | tinta | Retenção |
| 6 | `OQueVoceVe` | `acompanhamento` | **papel** | — |
| 7 | `ComoComeca` | `como-comeca` | **papel** | Como começa |
| 8 | `Perguntas` | `perguntas` | tinta | Perguntas |
| 9 | `CtaFinal` | `contato` | **azul** | (botão) |
| — | `Footer` | — | tinta | — |

Ritmo: tinta ×5 → papel ×2 → tinta → azul → tinta. Os cinco blocos em tinta seguidos precisam variar por dentro (hero com painel; duas portas com dois cards e holofote; virada só tipografia e contraste; aquisição com quatro marcos; retenção com um card em papel no centro). O papel entra exatamente onde a página muda de "problema e mecanismo" para "o que você recebe e como começa": é o respiro antes da decisão.

## 5. Desenho de cada seção

Toda copy abaixo é final e vai literal para `src/lib/conteudo.ts` (Tarefa 1). Marcação: a palavra entre `*asteriscos*` é a que vai em serifa itálica azul (`t-destaque`); no `conteudo.ts` ela vira o campo `destaque` do tipo `Titulo`.

### 5.1 Header

- Wordmark azul (tinta dominante: **o header fica sobre tinta**, então o wordmark passa a **branco** e o botão continua azul/branco; o vidro passa a `tinta 88% + blur`).
- Nav: Como funciona · Aquisição · Retenção · Como começa · Perguntas.
- Botão: **Vamos conversar** → WhatsApp (`src/lib/contato.ts`, sem mudança).
- Mobile: menu como hoje (foco de volta no Escape, `aria-expanded`, `aria-controls`).

### 5.2 Hero (tinta) — `id="inicio"`

**Copy**

- Rótulo-pílula: `Funil de aquisição e de retenção`
- H1: **Cliente novo entrando, cliente antigo *voltando*.**
- Parágrafo: `Implantamos na sua empresa o funil de aquisição e o de retenção: o caminho por onde o cliente novo chega e o cliente antigo compra de novo. Tráfego, estratégia comercial, automação e IA fazem isso rodar. Você conversa com quem cuida.`
- Botão primário: `Vamos conversar` (WhatsApp). Secundário (link com seta para baixo): `Ver como funciona` → `#como-funciona`.

**Composição desktop (12 colunas):** texto nas colunas 1–6 (rótulo, H1 `t-display` até 11ch, parágrafo `t-lead` até 52ch, botões). Painel nas colunas 7–12, com parallax e inclinação como hoje. Um "wash" radial azul discreto atrás do painel (`Glow` existente, 40% opacidade) e cantoneiras nos quatro cantos do container (`Cantoneiras`, Tarefa 2), como nas páginas do Botolifting v2.

**Painel (`HeroPainel`), o coração da página:** superfície escura com padrão de pontos, duas colunas de nós.

```
 AQUISIÇÃO                      RETENÇÃO
 ┌ Anúncio ┐
      │ (feixe desce)
 ┌ Conversa no WhatsApp ┐
      │
 ┌ Registrado no CRM ┐
      │
 ┌ Agendado ┐ ───────────────▶ ┌ Cliente atendido ┐   ← o gesto do "l": desce, vira, segue
                                      │
                                ┌ Hora de voltar ┐
                                      │
                                ┌ Comprou de novo ┐  ← feixe de borda permanente (o destino)
```

- Rótulos de coluna em `t-rotulo` (`Aquisição`, `Retenção`).
- Nós: superfície escura, ícone da marca em ladrilho azul-translúcido, texto `t-controle`. Ícones (`marca/Icone`): Anúncio `aquisicao`, Conversa `atendimento`, Registrado `conexao`, Agendado `vendas`, Atendido `atendimento`, Hora de voltar `inteligencia`, Comprou de novo `vendas`.
- **Cartão do cliente** (`CartaoCliente`, papel) encostado no nó "Agendado", com sombra projetada que justifica a sobreposição: avatar neutro, duas barras-fantasma, chip `Origem registrada`. É a primeira aparição do cliente que atravessa a página.
- Feixes (`FeixeConexao` existente): quatro verticais e **um horizontal** de Agendado → Cliente atendido (o `FeixeConexao` já desenha "desce, vira, segue" quando o destino está à direita). O último nó tem `feixe-borda feixe-ativo`.
- Mobile (< lg): as duas colunas viram uma sequência vertical (Aquisição em cima, Retenção embaixo), feixes só verticais, o cartão do cliente abaixo de "Agendado" em largura total.
- Movimento reduzido: idêntico ao de hoje (linhas estáticas azuis, sem inclinação, sem parallax).

### 5.3 As duas portas (tinta) — `id="duas-portas"`

**Copy**

- Rótulo: `As duas portas`
- H2: **Seu faturamento entra por duas *portas*.**
- Lead: `A primeira é o cliente novo. A segunda é o cliente que já comprou. A maior parte do esforço de marketing olha só para a primeira.`
- Cena 1, rótulo `Quem chega`. Texto: `A mensagem chega no horário de pico. Quem responde está atendendo. A resposta sai quando dá, e a conversa esfria. Ninguém anotou de onde veio nem o que falta para fechar.`
- Cena 2, rótulo `Quem volta`. Texto: `O cliente sai atendido e some da agenda. Voltar depende da memória dele, não de um caminho seu.`
- Fecho (frase forte, branco, `t-sub`): `Nenhuma das duas é culpa de quem atende. É falta de caminho.`

**Composição:** cabeçalho de seção (rótulo + H2 à esquerda, lead à direita, 6/6). Abaixo, dois `CartaoHolofote` escuros, lado a lado (6/6; empilhados no mobile), cada um com o rótulo da cena, a interface desenhada em cima e o texto embaixo.

- **Interface da cena 1:** conversa de WhatsApp desenhada. Bolha recebida com texto real `Vi o anúncio, quanto fica?` e hora `09:12`; bolha enviada só com barras-fantasma, hora `11:48`; linha divisória; chip cinza `Sem próximo passo`. (As horas são elementos gráficos da cena, não métrica de copy; o verificador não as pega e não são promessa.)
- **Interface da cena 2:** cartão de cliente em superfície escura: avatar, barras-fantasma, campo `Última compra` com barra preenchida e campo `Voltar em` com traço vazio (`—`); chip cinza `Sem data de volta`.
- Fundo: padrão de pontos, glow, `Holofote` seguindo o cursor (como no `Problema` de hoje).

### 5.4 A virada (tinta, tipográfica) — `id="como-funciona"`

**Copy**

- Rótulo: `O que falta tem nome`
- H2 (grande, `t-display` reduzido a `t-titulo` no mobile): **Não é mais anúncio. É um *funil* rodando dentro da sua empresa.**
- Lead: `Um caminho fixo por onde o cliente novo entra e o cliente antigo volta. Quem chama tem próximo passo. Quem foi atendido tem hora de voltar. É isso que a Lemis implanta.`
- Bloco de contraste (duas colunas, filete no meio, inspirado no "somos únicos" do Atendly):
  - Esquerda, `t-sub` secundário: `Agência de tráfego entrega o contato.`
  - Direita, `t-sub` branco: `A Lemis implanta o caminho que o contato percorre, da primeira mensagem à compra seguinte.`
- Três fundamentos, relidos, em lista editorial com filete (não cards):
  - `Proximidade` — `Você conversa com quem cuida do funil. Sem intermediário entre a decisão e a execução.`
  - `Visão comercial` — `Acompanhamos o que acontece depois do primeiro contato e depois da primeira compra.`
  - `Execução integrada` — `Anúncio, atendimento e CRM montados em função uns dos outros, com automação e IA onde fazem o caminho andar.`

**Composição:** só tipografia. H2 ocupando 8 colunas, lead nas 4 restantes. Contraste em duas colunas com filete vertical (`border-l border-fio-escuro`). Fundamentos em três colunas com filete superior e numeral `01 02 03` em `t-destaque` (serifa itálica azul, 40px), como os numerais do Botolifting v2. `Palavras` no H2. Padrão de grade ao fundo com máscara para baixo.

### 5.5 Aquisição, implantada (tinta) — `id="aquisicao"`

**Copy**

- Rótulo: `Funil de aquisição`
- H2: **Do anúncio ao *compareceu*.**
- Lead: `O anúncio traz a mensagem. O caminho faz ela virar cliente. Alinhamos com o seu time como cada contato é atendido a partir do que o anúncio prometeu, e o CRM guarda a origem e o próximo passo.`
- Marcos (numeral + rótulo + esquema):
  1. `Anúncio` — esquema de anúncio em wireframe: quadro cruzado, campos `Oferta` e `Cidade` com barras-fantasma, pílula `Fale no WhatsApp`.
  2. `Conversa registrada` — bolha recebida `Vi o anúncio, quanto fica?`, bolha enviada em barras, chip azul `Origem registrada`.
  3. `Próximo passo marcado` — cartão de CRM: etapa `Agendado`, campo de data em barra, responsável em barra.
  4. `Compareceu` — o cartão do cliente em papel (o mesmo do hero) com chip `Compareceu`.
- Chips "o que roda dentro" (linha única, `t-legenda`, abaixo do lead): `Tráfego pago` · `Criativos` · `Página` · `CRM` · `Automação` · `IA`. Sem descrição, sem "inclui". É a única menção às frentes como lista.
- Nota (`t-legenda`, secundário): `O escopo de cada frente é definido em proposta.`

**Composição:** cabeçalho de seção. Quatro marcos em grade de 4 colunas (2×2 em tablet, 1 no mobile), cada um com `Marco` (numeral `t-destaque` + traço), rótulo `t-rotulo`, esquema em superfície escura com altura fixa (equalizada por `grid` + `h-full`). Setas finas azuis entre os marcos no desktop (SVG de 64×12, `aria-hidden`). Entrada escalonada com `Revelar`.

### 5.6 Retenção, implantada (tinta) — `id="retencao"`

**Copy**

- Rótulo: `Funil de retenção`
- H2: **Quem já comprou, compra *de novo*.**
- Lead: `Retenção é fazer os clientes que já compraram comprar novamente. O cliente atendido não some da agenda: ele tem hora de voltar, e o caminho de volta está pronto quando chega a hora.`
- Texto de apoio (coluna do card): `O mesmo cuidado da entrada, aplicado a quem já é seu cliente. É a parte do faturamento que a maioria deixa ao acaso.`
- Fecho (`t-sub`, branco): `O ciclo inteiro numa pessoa só: chegou, comprou, voltou.`

**Composição:** cabeçalho de seção. Abaixo, 5/7: à esquerda o texto de apoio e o fecho; à direita **um** cartão de cliente em papel, grande (`CartaoCliente` variante `grande`), com três linhas de estado em sequência vertical ligadas por um feixe curto: `Cliente atendido` (check) → `Hora de voltar` (data em barra) → `Comprou de novo` (chip azul). Atrás dele, dois cards-fantasma deslocados (a "base"), em superfície escura sem conteúdo, dando profundidade. Glow azul atrás. Nada de "lembrete automático", "campanha para a base" ou "reativação": o card mostra o resultado, não a engrenagem (decisão do Vinicius).

### 5.7 O que você vê (papel) — `id="acompanhamento"`

**Copy**

- Rótulo: `Acompanhamento`
- H2: **Você enxerga se está *funcionando*.**
- Lead: `Painel em tempo real com o que entrou, o que avançou e o que voltou. E conversa periódica com quem cuida do funil, para decidir o próximo ajuste.`
- Rótulo do exemplo: `Como soa uma conversa de acompanhamento`
- Fala (card branco com o símbolo Lemis como avatar): `Vamos comparar os contatos recebidos com as conversas que avançaram, e os clientes atendidos com os que voltaram. A partir disso, revisamos a campanha e o próximo passo no atendimento.`
- Nota: `Modelo de conversa. Nos acompanhamentos reais entram dados verificados, período e decisão proposta.`

**Composição:** campo papel. Cabeçalho. Abaixo, 7/5: à esquerda o **painel desenhado** em superfície clara (`superficie-clara`): três colunas de "indicador" com rótulo real (`Entraram`, `Avançaram`, `Voltaram`) e barra-fantasma no lugar do número; abaixo, barras horizontais proporcionais por origem (`Meta Ads`, `Google Ads`) e por etapa, **sem número nenhum** (proporção, não métrica); chip `Atualizado em tempo real`. À direita, o card da conversa e a nota. Cantoneiras em tinta a 14%.

### 5.8 Como começa (papel) — `id="como-comeca"`

**Copy**

- Rótulo: `Como começa`
- H2: **Você chama. Nós ouvimos antes de *propor*.**
- Lead: `A conversa começa pelo WhatsApp, com quem cuida do funil. Sem formulário e sem intermediário.`
- Passos:
  1. `Conversa inicial` — `Você conta como o cliente chega hoje, o que acontece com a mensagem e se ele volta. Nós ouvimos e perguntamos.`
  2. `Leitura e proposta` — `Voltamos com uma leitura das duas portas e uma proposta com escopo definido: o que entra no funil de aquisição, o que entra no de retenção e como o acompanhamento funciona.`
  3. `Implantação e acompanhamento` — `Montamos o funil dentro da sua empresa, com o seu time. A partir daí, revisamos campanha, atendimento e retorno em conversas periódicas com você.`
- Botão `Vamos conversar` + nota `Conversa pelo WhatsApp com quem cuida do funil.`

**Composição:** como o `ProximoPasso` de hoje (linha azul que se desenha + três cards claros com numeral em disco), com o numeral trocado para `t-destaque` em serifa itálica azul, sem disco. Separador superior fino entre esta seção e a anterior (as duas são papel).

### 5.9 Perguntas (tinta) — `id="perguntas"`

- Título (H2, sem destaque): `Perguntas que aparecem antes da primeira conversa`
- Itens (acordeão Radix, superfície escura):
  1. `Já tenho CRM. Vocês usam o meu?` — `Avaliamos a ferramenta que você já usa antes de propor qualquer mudança. O que importa é cada contato ter origem registrada, próximo passo claro e hora de voltar.`
  2. `Vocês assumem as vendas?` — `Não. O funil roda dentro da sua empresa, com o seu time. Alinhamos como cada contato é atendido, acompanhamos o que avança e o que volta, e ajustamos a partir disso. Quem atende continua sendo você, salvo escopo combinado em proposta.`
  3. `Já investi em anúncio e não deu certo. Por que agora seria diferente?` — `Porque o anúncio não trabalha sozinho. Quando a mensagem chega e não tem caminho, o problema parece ser o anúncio. Implantar o funil é cuidar do que acontece depois do clique e do que acontece depois da compra.`
  4. `Preciso contratar tudo?` — `Não. O escopo é definido em proposta a partir do que as suas duas portas precisam. Cada frente entra quando faz sentido.`
  5. `Vocês garantem uma quantidade de clientes por mês?` — `Não. Trabalhamos para o caminho existir e rodar, e explicamos os critérios por trás de cada ajuste. Quantidade, custo e prazo dependem da oferta, do mercado e do atendimento, e por isso não entram como promessa.`

**Composição:** H2 à esquerda (5 colunas, sticky no desktop), acordeão à direita (7 colunas) em `superficie-escura`; numerais `01`–`05` em `t-destaque` à esquerda de cada pergunta (padrão do FAQ do Atendly). O `accordion.tsx` ganha uma variante escura (cores por classe, sem mudar o comportamento).

### 5.10 CTA final (azul) — `id="contato"`

- H2 (`t-display`, `Palavras`): `Cliente novo entrando, cliente antigo voltando.` (sem serifa: sobre azul, o destaque azul some; o título vai inteiro em branco)
- Apoio: `Tráfego, estratégia comercial, automação e IA a serviço de um funil que roda dentro da sua empresa.`
- Botão `Vamos conversar` (variante `sobre-azul`) + nota `Conversa pelo WhatsApp com quem cuida do funil.`
- Motivo em papel à direita, como hoje.

### 5.11 Rodapé (tinta)

- Wordmark branco; apoio: `Tráfego, estratégia comercial, automação e IA a serviço de um funil que roda dentro da sua empresa.`
- Navegar: os cinco itens da nav. Conversar: `WhatsApp` (link externo, seta, `sr-only` "abre em nova aba").
- Linha legal: `APL Digital — Assessoria em Marketing · CNPJ 44.840.036/0001-59`, endereço, `© Lemis`.

### 5.12 Metadados

- `<title>`: `Lemis — Cliente novo entrando, cliente antigo voltando`
- `description`: `Implantamos na sua empresa o funil de aquisição e o de retenção, com tráfego, estratégia comercial, automação e IA. Você conversa com quem cuida.`
- OG title = title; OG description = frase de apoio. `opengraph-image.tsx`: só o `alt` muda (`Lemis — Cliente novo entrando, cliente antigo voltando.`); a imagem (wordmark + motivo, sem texto) fica.

## 6. Atendly: o que vale trazer e o que não copiar

Estudado no navegador em 20/09/2026 (hero, grade de recursos, "somos únicos", abertura do "para você que"; abaixo disso as capturas saíram pretas porque o reveal é preso ao scroll, e a leitura seguiu pelo DOM: textos, tamanhos, fontes, ordem das seções). Página de ~9.000 px, Geist 700 no H1 (54 px, tracking −1 px), Libre Baskerville itálica roxa em uma expressão por título, fundo `rgb(8,8,10)`, `motion` sem GSAP nem Lenis.

**Trazer (traduzido, não copiado):**

| Princípio do Atendly | Como entra na Lemis |
|---|---|
| Hero: pílula-rótulo, H1 com uma expressão em serifa itálica de cor, parágrafo, dois botões | 5.2, com Instrument Serif (a do Botolifting v2), azul, uma palavra só |
| O produto gigante, desenhado, atrás e ao lado do hero | O painel dos dois funis (5.2), interface desenhada, sem screenshot |
| Cada card de recurso com um pedaço de interface dentro | Cenas (5.3), marcos (5.5), card do cliente (5.6), painel (5.7) |
| Seção de contraste "CRMs tradicionais organizam dados / o Atendly organiza resultado" | "Agência de tráfego entrega o contato / a Lemis implanta o caminho" (5.4) |
| Ritmo: rótulo pequeno → H2 → lead à direita | `Secao` novo (Tarefa 2) |
| Superfície: anel de 1 px, brilho radial, linhas diagonais finas nas margens, cantoneiras | `superficie-escura` já existe; entram `Cantoneiras` e `LinhasDiagonais` (Tarefa 2) |
| FAQ numerado, título curto, resposta em corpo | 5.9 |
| Rodapé com CTA forte antes das colunas | 5.10 + 5.11 |
| Tudo em Geist | Já é |

**Não copiar, e por quê:**

| Do Atendly | Por que não |
|---|---|
| "Veja os planos", "Login", "Peça uma demo", página de preços | Lá o objeto da compra é assinatura de software; aqui é um serviço implantado. O próximo passo é conversa, não checkout. Preço não entra no site. |
| Faixa "eles confiam" com logos | Nenhum logo autorizado ("não tenho", Vinicius, 20/09). Prova aqui é mecanismo. |
| Screenshots do produto real como prova | Não temos produto para mostrar; o CRM que a casa usa não é nomeado. Desenhamos o mecanismo. |
| "O Atendly é para você que…" com Infoprodutores, Clínicas, Agências, Assinaturas | Peça institucional não cita nicho (regra de 18/09). O reconhecimento vem das duas cenas. |
| Roxo, gradientes, brilhos coloridos | Paleta Lemis: azul, tinta, papel. Um azul só. |
| "Mais do que um CRM. Uma mente estratégica" (IA como vitrine) | IA é meio e só é citada. |
| Copy de hype: "máquina", "vazando dinheiro", "100% na vida real" | Voz da Lemis: verbos concretos, sem urgência, sem promessa. |
| Scrollytelling de 3.000 px e página de 9.000 px | Custa LCP/TBT no mobile e produz o vazio que apareceu no navegador. A Lemis fica em torno de 6.000 px no desktop. |
| Geist 700 no display | A identidade define 900 para display e título; fica. |

**A objeção é outra.** No SaaS, "meu time não vai usar / migrar dá trabalho". Na agência que implanta funil, "já tentei tráfego e não deu" e "vocês vão assumir meu comercial?". As seções 5.3, 5.4 e 5.9 respondem exatamente isso.

## 7. Sistema visual

### 7.1 Campos

Tinta dominante. `campo-tinta` continua `#17191D`; o hero e a virada ganham um wash radial azul de baixa opacidade (`Glow` existente) e as seções em tinta alternam padrão de pontos e de grade. Papel em 5.7 e 5.8, separadas por filete. Azul só no CTA final. **Conflito registrado e resolvido:** a régua da casa manda fundo claro por padrão; o Vinicius aprovou fundo escuro dominante para o site e para a apresentação em 20/09/2026 ("Sim"). A atualização do `sistema-visual.md` fica como pendência (seção 10).

### 7.2 Tipografia

- Geist variável local, escala `t-*` como está (`t-display` 900, `t-titulo` 900, `t-sub` 600, `t-lead`, `t-corpo`, `t-legenda`, `t-rotulo`, `t-controle`).
- **Nova:** `Instrument Serif` itálica 400, arquivo `src/app/fonts/InstrumentSerif-Italic.woff2` copiado da apresentação Botolifting v2 (`…/botolifting-v2/assets/fonts/`), licença OFL ao lado, entrada em `ORIGEM.md`. Carregada com `next/font/local` (`style: "italic"`, `weight: "400"`, `variable: "--font-serif"`, `display: "swap"`, `adjustFontFallback: "Times New Roman"`).
- Classe `t-destaque`: `font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--color-azul); letter-spacing: -0.01em`. **Só dentro de `t-display` e `t-titulo`** (azul sobre tinta é 3,02:1, aprovado só para texto grande) **e nos numerais** de marco (≥ 40 px). Nunca em corpo, nunca sobre azul.
- Uma palavra em destaque por título, nunca duas. Nos títulos do CTA final (sobre azul) e das Perguntas, sem destaque.
- Rótulo-pílula: `t-rotulo` dentro de cápsula com anel de 1 px e ponto azul à esquerda (`Pilula`, Tarefa 2).

### 7.3 Superfícies e acabamento

- `superficie-escura` / `superficie-clara` como hoje (anel 1 px + sombra em camadas + raio 16).
- **Cantoneiras** (`Cantoneiras`): quatro "L" de 24 px nos cantos do container da seção, traço 1 px, branco a 25% em tinta e tinta a 14% em papel. Vêm das páginas do v2. Estáticas.
- **Linhas diagonais** (`LinhasDiagonais`): faixa de hachura fina nas margens externas do container em desktop, `repeating-linear-gradient` a 45°, branco a 4%. `aria-hidden`, `pointer-events: none`. Só ≥ xl.
- Grão global, padrões e glows como hoje.

### 7.4 Interface desenhada (`src/components/esquema/`)

Vocabulário único para todas as cenas, zero `<img>`, tudo `aria-hidden` com o texto real por perto:

| Primitiva | O que é |
|---|---|
| `Barra` | retângulo arredondado "fantasma" (`h-[10px]`, largura por prop, branco 20% em tinta / tinta 13% em papel) |
| `Quadro` | placeholder de imagem com as duas diagonais finas (o "X" do wireframe) |
| `Bolha` | bolha de chat; `lado="recebida"|"enviada"`; aceita texto real ou barras; hora à direita |
| `Chip` | cápsula pequena com ponto; `tom="neutro"|"azul"` |
| `Marco` | numeral em `t-destaque` + traço fino que cresce até a borda |
| `CartaoCliente` | o fio da página: avatar neutro, duas barras, lista de estados; `campo="papel"|"tinta"`, `tamanho="normal"|"grande"` |
| `Cantoneiras`, `LinhasDiagonais`, `Pilula` | acabamentos |

### 7.5 Movimento

A gramática da rodada 2 fica: **tudo entra de baixo com blur curto e ease-out longo; tudo que é conexão flui.** Feixes a 3,2 s em loop, só no painel do hero e no card grande da retenção. Holofote nas duas portas. Nada novo além disso: as cenas entram com `Revelar` escalonado. `LinhaProgresso` no "Como começa". Reduzido: idêntico ao de hoje.

### 7.6 Acessibilidade

- Contraste: só os pares aprovados. `t-destaque` só em texto grande.
- Toda interface desenhada é `aria-hidden`; a informação está no texto ao lado. Os nós do painel do hero têm o texto real (não são só gráficos).
- Acordeão Radix (teclado, ARIA). Skip link. Foco visível com a cor do campo.
- `Palavras` mantém o `sr-only` com a frase inteira.

## 8. Performance e acessibilidade: como o plano mantém o piso

| Risco | Como o plano evita |
|---|---|
| Fonte nova aumenta o peso e cria CLS | Um arquivo woff2 (Instrument Serif Italic, ~20 KB), `next/font/local` com `adjustFontFallback` (métrica de fallback ajustada → CLS 0), `display: swap`, preload automático. Sem o subconjunto latin-ext: nenhuma palavra em destaque tem caractere fora do latin básico. |
| Mais seções, mais JS | Nenhuma biblioteca nova. As primitivas de esquema são Server Components (só HTML/CSS/SVG). `"use client"` continua restrito a: `Header`, `HeroPainel`, efeitos. Meta: JS inicial ≤ 230 KB gzip; medir na Tarefa 10 e cortar `Inclinacao` do painel se estourar. |
| LCP mobile | O LCP continua sendo o H1, animado por CSS desde o primeiro paint (`PalavrasHero`). O painel entra depois com `Revelar`. Sem imagem acima da dobra. |
| Página longa demais | Nove blocos, ~6.000 px no desktop. O Atendly tem 9.000 e o scrollytelling foi descartado. |
| Feixes em loop custam quadro | Só dois lugares (hero e retenção), como hoje era um. Desligam com movimento reduzido. |
| Holofote / glows | Mesma quantidade de hoje. |
| Teclado e foco | Componentes interativos são os mesmos (nav, botões, acordeão). Nada novo recebe foco. |
| Verificação | Tarefa 10: `npm run build`, Lighthouse desktop e mobile, `--force-prefers-reduced-motion`, viewport 320/390/1440, tab por toda a página, capturas em `docs/validacao/v2/`. |

## 9. Alinhamento com a apresentação irmã

Mapa entre a escada da apresentação (rascunho de 9 páginas em `~/orca/workspaces/Lemis/interno-apresentacao-lemis-v2`) e o site:

| Apresentação | Site |
|---|---|
| 01 Capa: "seu faturamento tem duas portas" | 5.2 Hero (a frase do Vinicius) + 5.3 lead ("Seu faturamento entra por duas portas") |
| 02 A porta de entrada | 5.3 cena 1 |
| 03 A porta de volta | 5.3 cena 2 |
| 04 O que falta tem nome | 5.4 |
| 05 A Lemis + fundamentos relidos | 5.4 (contraste + fundamentos) |
| 06 Aquisição, implantada | 5.5 |
| 07 Retenção, implantada | 5.6 |
| 08 O que você vê | 5.7 |
| 09 Como começa + fecho | 5.8 + 5.10 |

**Divergências intencionais, para o agente de lá saber:** (a) o site mantém Perguntas, a apresentação não; (b) o site não tem página de preço nem linha "valor definido em proposta", porque a nota do escopo já está em 5.5; (c) a frase de fecho "O próximo passo tem direção." **não** volta no site: o Vinicius disse que não gosta dela, e o fecho é a frase nova do hero. Se a apresentação ainda usar a frase antiga na página 09, é ela que deve mudar. Vocabulário comum a manter nas duas peças: "as duas portas", "quem chega / quem volta", "hora de voltar", "comprou de novo", "origem registrada", "o caminho".

## 10. Decisões do Vinicius (20/09/2026) e pendências

**Decididas por ele, valem como spec:**

1. Retenção: "fazer os clientes que já compraram, comprar novamente". Resultado, não encanamento.
2. Automação e IA: "Entregamos já. Apenas citar que usamos."
3. Estratégia comercial (contexto, não copy): alinhar com o time como o lead será atendido a partir do que o tráfego anuncia, mais gestão do CRM e IA.
4. Visual: linguagem do Botolifting v2 (tinta dominante, uma palavra em serifa itálica azul, interface desenhada, zero foto). Site e apresentação do mesmo estúdio.
5. "O próximo passo tem direção." cai. Frase nova escolhida: **"Cliente novo entrando, cliente antigo voltando."** Frase de apoio aceita: "Tráfego, estratégia comercial, automação e IA a serviço de um funil que roda dentro da sua empresa."
6. Contato: WhatsApp (75) 98802-3044.
7. Fundo escuro dominante no site: sim.
8. CRM sem nome; Atendly não aparece.
9. Nenhuma prova (logo, número, case) autorizada.
10. FAQ fica no site.

**Pendências que dependem dele (fora do escopo desta demanda):**

- `[PENDENTE]` Atualizar `Lemis/identidade-visual/identidade.md`: mensagem principal (sai "O próximo passo tem direção."), apoio institucional (entra a frase nova), remover a nota "Oferta de IA em desenvolvimento", permitir citar automação e IA como meio, registrar o posicionamento de funil de aquisição e retenção.
- `[PENDENTE]` Atualizar `sistema-visual.md`: fundo escuro dominante em site e apresentação; Instrument Serif itálica como segunda família, só para destaque; regra "uma palavra por título".
- `[PENDENTE]` A assinatura "Marketing, vendas e inteligência artificial." não aparece no site; decidir se continua sendo a assinatura da marca ou se muda para o posicionamento novo.
- `[PENDENTE]` `facebook-domain-verification` em `layout.tsx` ainda é o token do domínio antigo (pendência anterior, inalterada).
- `[PENDENTE]` Razão social ao lado do CNPJ: fica "APL Digital — Assessoria em Marketing" até o contrato social mudar (decisão dele de hoje).

---

# Parte 2 — Tarefas de implementação

Ordem: 0 → 1 → 2 → (3, 4, 5, 6, 7, 8 em paralelo, cada uma numa seção independente) → 9 → 10. Cada tarefa termina com `npm run lint`, `npx tsc --noEmit` e `npm run verificar` passando, e a página abrindo em `npm run dev` sem erro no console. **Sem commit.**

## Mapa de arquivos

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| Modificar | `scripts/verificar-marca.mjs` | Regras novas de copy e fonte |
| Criar | `src/app/fonts/InstrumentSerif-Italic.woff2`, `src/app/fonts/InstrumentSerif-OFL.txt` | Fonte de destaque + licença |
| Modificar | `src/app/fonts/ORIGEM.md` | Origem e hash da fonte nova |
| Modificar | `src/app/layout.tsx` | Carrega a serif, metadados novos, `campo-tinta` no body |
| Modificar | `src/app/opengraph-image.tsx` | `alt` novo |
| Modificar | `src/app/globals.css` | `t-destaque`, `campo-tinta` no body, acordeão escuro, cantoneiras, hachura |
| Reescrever | `src/lib/conteudo.ts` | Toda a copy, tipos `Titulo`, `No`, nav |
| Criar | `src/components/esquema/{Barra,Quadro,Bolha,Chip,Marco,CartaoCliente,Cantoneiras,LinhasDiagonais,Pilula}.tsx` | Interface desenhada |
| Criar | `src/components/ui/TituloDestaque.tsx` | H1/H2 com a palavra em serifa |
| Reescrever | `src/components/ui/Secao.tsx` | Cabeçalho rótulo + H2 + lead |
| Reescrever | `src/components/secoes/Hero.tsx`, `HeroPainel.tsx` | 5.2 |
| Criar | `src/components/secoes/DuasPortas.tsx` | 5.3 (substitui `Problema.tsx`) |
| Criar | `src/components/secoes/Virada.tsx` | 5.4 (substitui `Fundamentos.tsx`) |
| Criar | `src/components/secoes/Aquisicao.tsx` | 5.5 (substitui `Servicos.tsx`) |
| Criar | `src/components/secoes/Retencao.tsx` | 5.6 |
| Criar | `src/components/secoes/OQueVoceVe.tsx` | 5.7 |
| Renomear/reescrever | `ProximoPasso.tsx` → `ComoComeca.tsx` | 5.8 |
| Modificar | `src/components/secoes/Perguntas.tsx`, `CtaFinal.tsx`, `Footer.tsx`, `Header.tsx` | 5.9–5.11 |
| Modificar | `src/components/ui/accordion.tsx` | variante escura |
| Modificar | `src/app/page.tsx` | ordem nova |
| Remover | `secoes/Problema.tsx`, `Servicos.tsx`, `Fundamentos.tsx`, `ParaQuem.tsx`, `ProximoPasso.tsx`, `marca/Conector.tsx` | Sem uso |
| Criar | `docs/validacao/v2/*.png`, `RESUMO.md` (reescrito) | Evidência e entrega |

---

### Tarefa 0: Base — fonte de destaque, `t-destaque`, verificador

**Arquivos:**
- Criar: `src/app/fonts/InstrumentSerif-Italic.woff2`, `src/app/fonts/InstrumentSerif-OFL.txt`
- Modificar: `src/app/fonts/ORIGEM.md`, `src/app/layout.tsx`, `src/app/globals.css`, `scripts/verificar-marca.mjs`

**Produz:** variável CSS `--font-serif`; classe `.t-destaque`; `body` em `campo-tinta`; verificador que aceita "IA"/"automação" e itálico só em `globals.css`/`layout.tsx`, e reprova "Lemis Company".

- [ ] **Passo 1: copiar a fonte e a licença**

```bash
cp ~/orca/workspaces/Lemis/interno-apresentacao-lemis-v2/demandas/interno-apresentacao-botolifting/botolifting-v2/assets/fonts/InstrumentSerif-Italic.woff2 src/app/fonts/
cp ~/orca/workspaces/Lemis/interno-apresentacao-lemis-v2/demandas/interno-apresentacao-botolifting/botolifting-v2/assets/fonts/InstrumentSerif-OFL.txt src/app/fonts/
shasum -a 256 src/app/fonts/InstrumentSerif-Italic.woff2
ls -l src/app/fonts/InstrumentSerif-Italic.woff2
```

Esperado: arquivo < 40 KB. Anotar o SHA-256 e o tamanho.

- [ ] **Passo 2: registrar a origem em `ORIGEM.md`** (acrescentar ao fim)

```markdown

# Instrument Serif Italic — origem e licença

Segunda família, usada só na classe `t-destaque` (uma palavra por título e numerais de marco). Copiada em 20/09/2026 da apresentação Botolifting v2 (`Lemis/demandas/interno-apresentacao-botolifting/botolifting-v2/assets/fonts/`), que por sua vez veio do repositório oficial [Instrument-Serif](https://github.com/Instrument/instrument-serif) (Google Fonts). Licença SIL OFL 1.1 em `InstrumentSerif-OFL.txt`.

- Arquivo: `InstrumentSerif-Italic.woff2`, estilo itálico, peso 400, subconjunto latin.
- SHA-256: `<colar o hash do passo 1>`.
```

- [ ] **Passo 3: carregar em `layout.tsx`**

```tsx
const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-serif",
  weight: "400",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
// ...
<html lang="pt-BR" className={`${geist.variable} ${instrumentSerif.variable}`}>
  <body className="campo-tinta font-sans">
```

(Os metadados mudam na Tarefa 9; aqui só a fonte e o campo do body.)

- [ ] **Passo 4: `t-destaque` e acabamentos em `globals.css`** (dentro do `@layer components` das classes `t-*`)

```css
  /* Palavra em destaque: só dentro de t-display / t-titulo e em numerais de marco (≥ 40px). Azul sobre tinta = 3,02:1, aprovado só para texto grande. */
  .t-destaque {
    font-family: var(--font-serif), Georgia, serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-azul);
    letter-spacing: -0.01em;
  }
  .campo-azul .t-destaque { color: var(--color-branco); }

  /* Cantoneiras: quatro "L" nos cantos do container da seção. */
  .cantoneira {
    position: absolute;
    width: 24px;
    height: 24px;
    border-color: color-mix(in srgb, currentColor 25%, transparent);
    border-style: solid;
    border-width: 0;
    pointer-events: none;
  }
  .cantoneira-tl { top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
  .cantoneira-tr { top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
  .cantoneira-bl { bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
  .cantoneira-br { bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }

  /* Hachura fina nas margens externas (só xl). */
  .hachura {
    background-image: repeating-linear-gradient(45deg, color-mix(in srgb, var(--color-branco) 4%, transparent) 0 1px, transparent 1px 10px);
  }
  .campo-papel .hachura {
    background-image: repeating-linear-gradient(45deg, color-mix(in srgb, var(--color-tinta) 5%, transparent) 0 1px, transparent 1px 10px);
  }
```

- [ ] **Passo 5: atualizar o verificador**

Em `scripts/verificar-marca.mjs`:

```js
// Remover estas três linhas de PROIBIDAS (posicionamento de 20/09/2026: automação e IA são meio e podem ser citadas):
//   [/\bIA\b/, "menção a IA"],
//   [/intelig[êe]ncia artificial/i, "menção a inteligência artificial"],
//   [/automa[çc]/i, "menção a automação"],
// Acrescentar:
  [/Lemis Company/i, "\"Lemis Company\" (o nome escrito é só Lemis)"],
  [/cl[íi]nica|advocacia|advogad|est[ée]tica/i, "nicho de cliente em peça institucional"],

// Fonte fora do sistema: itálico e serifa só onde a classe t-destaque é definida/carregada.
const ISENTOS_FONTE = new Set(["src/app/globals.css", "src/app/layout.tsx"]);
// ...no laço:
    if (/font-mono|font-serif|italic/.test(linha) && !ISENTOS_FONTE.has(rel)) problemas.push(`${rel}:${i + 1}: fonte fora do sistema`);

// Na limpeza da linha para a regra de métrica (linhaMetrica), acrescentar, com este comentário:
      // Largura de barra desenhada (proporção gráfica, não métrica de copy).
      .replace(/\b[wh]-\[\d+%\]/g, "")
```

- [ ] **Passo 6: verificar**

```bash
npm run verificar && npm run lint && npx tsc --noEmit && npm run dev
```

Esperado: verificador "ok" (o site atual ainda passa: nada nele usa IA/automação nem itálico). Página abre com fundo tinta e texto do site antigo ilegível em partes: esperado, a copy e as seções mudam nas tarefas seguintes. Anotar em `docs/validacao/v2/tarefa-0.txt` o tamanho da fonte e o hash.

---

### Tarefa 1: Copy inteira em `src/lib/conteudo.ts`

**Arquivos:**
- Reescrever: `src/lib/conteudo.ts`
- Manter: `src/lib/contato.ts` (WhatsApp já é `5575988023044`)

**Produz:** os exports abaixo, com estes nomes exatos. Todas as tarefas seguintes leem daqui e não escrevem texto próprio.

- [ ] **Passo 1: escrever o arquivo**

```ts
export type NomeIcone = "aquisicao" | "atendimento" | "conexao" | "criacao" | "inteligencia" | "vendas";

/** Título com uma palavra em serifa itálica azul. `antes` e `depois` podem ser vazios. */
export type Titulo = { antes: string; destaque: string; depois: string };

export const nav = [
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Aquisição", href: "#aquisicao" },
  { rotulo: "Retenção", href: "#retencao" },
  { rotulo: "Como começa", href: "#como-comeca" },
  { rotulo: "Perguntas", href: "#perguntas" },
] as const;

export const cta = {
  rotulo: "Vamos conversar",
  nota: "Conversa pelo WhatsApp com quem cuida do funil.",
} as const;

export const frase = {
  principal: "Cliente novo entrando, cliente antigo voltando.",
  apoio: "Tráfego, estratégia comercial, automação e IA a serviço de um funil que roda dentro da sua empresa.",
} as const;

export const hero = {
  rotulo: "Funil de aquisição e de retenção",
  titulo: { antes: "Cliente novo entrando, cliente antigo ", destaque: "voltando", depois: "." } satisfies Titulo,
  paragrafo:
    "Implantamos na sua empresa o funil de aquisição e o de retenção: o caminho por onde o cliente novo chega e o cliente antigo compra de novo. Tráfego, estratégia comercial, automação e IA fazem isso rodar. Você conversa com quem cuida.",
  secundario: { rotulo: "Ver como funciona", href: "#como-funciona" },
  painel: {
    aquisicao: {
      rotulo: "Aquisição",
      nos: [
        { icone: "aquisicao", nome: "Anúncio" },
        { icone: "atendimento", nome: "Conversa no WhatsApp" },
        { icone: "conexao", nome: "Registrado no CRM" },
        { icone: "vendas", nome: "Agendado" },
      ],
    },
    retencao: {
      rotulo: "Retenção",
      nos: [
        { icone: "atendimento", nome: "Cliente atendido" },
        { icone: "inteligencia", nome: "Hora de voltar" },
        { icone: "vendas", nome: "Comprou de novo" },
      ],
    },
    cliente: { chip: "Origem registrada" },
  },
} as const;

export const duasPortas = {
  rotulo: "As duas portas",
  titulo: { antes: "Seu faturamento entra por duas ", destaque: "portas", depois: "." } satisfies Titulo,
  lead: "A primeira é o cliente novo. A segunda é o cliente que já comprou. A maior parte do esforço de marketing olha só para a primeira.",
  cenas: [
    {
      rotulo: "Quem chega",
      texto:
        "A mensagem chega no horário de pico. Quem responde está atendendo. A resposta sai quando dá, e a conversa esfria. Ninguém anotou de onde veio nem o que falta para fechar.",
      esquema: { mensagem: "Vi o anúncio, quanto fica?", horaRecebida: "09:12", horaEnviada: "11:48", chip: "Sem próximo passo" },
    },
    {
      rotulo: "Quem volta",
      texto: "O cliente sai atendido e some da agenda. Voltar depende da memória dele, não de um caminho seu.",
      esquema: { ultimaCompra: "Última compra", voltarEm: "Voltar em", chip: "Sem data de volta" },
    },
  ],
  fecho: "Nenhuma das duas é culpa de quem atende. É falta de caminho.",
} as const;

export const virada = {
  rotulo: "O que falta tem nome",
  titulo: { antes: "Não é mais anúncio. É um ", destaque: "funil", depois: " rodando dentro da sua empresa." } satisfies Titulo,
  lead: "Um caminho fixo por onde o cliente novo entra e o cliente antigo volta. Quem chama tem próximo passo. Quem foi atendido tem hora de voltar. É isso que a Lemis implanta.",
  contraste: {
    outros: "Agência de tráfego entrega o contato.",
    lemis: "A Lemis implanta o caminho que o contato percorre, da primeira mensagem à compra seguinte.",
  },
  fundamentos: [
    { nome: "Proximidade", texto: "Você conversa com quem cuida do funil. Sem intermediário entre a decisão e a execução." },
    { nome: "Visão comercial", texto: "Acompanhamos o que acontece depois do primeiro contato e depois da primeira compra." },
    { nome: "Execução integrada", texto: "Anúncio, atendimento e CRM montados em função uns dos outros, com automação e IA onde fazem o caminho andar." },
  ],
} as const;

export const aquisicao = {
  rotulo: "Funil de aquisição",
  titulo: { antes: "Do anúncio ao ", destaque: "compareceu", depois: "." } satisfies Titulo,
  lead: "O anúncio traz a mensagem. O caminho faz ela virar cliente. Alinhamos com o seu time como cada contato é atendido a partir do que o anúncio prometeu, e o CRM guarda a origem e o próximo passo.",
  dentro: ["Tráfego pago", "Criativos", "Página", "CRM", "Automação", "IA"],
  nota: "O escopo de cada frente é definido em proposta.",
  marcos: [
    { rotulo: "Anúncio", esquema: { campos: ["Oferta", "Cidade"], pilula: "Fale no WhatsApp" } },
    { rotulo: "Conversa registrada", esquema: { mensagem: "Vi o anúncio, quanto fica?", chip: "Origem registrada" } },
    { rotulo: "Próximo passo marcado", esquema: { etapa: "Agendado", campos: ["Data", "Responsável"] } },
    { rotulo: "Compareceu", esquema: { chip: "Compareceu" } },
  ],
} as const;

export const retencao = {
  rotulo: "Funil de retenção",
  titulo: { antes: "Quem já comprou, compra ", destaque: "de novo", depois: "." } satisfies Titulo,
  lead: "Retenção é fazer os clientes que já compraram comprar novamente. O cliente atendido não some da agenda: ele tem hora de voltar, e o caminho de volta está pronto quando chega a hora.",
  apoio: "O mesmo cuidado da entrada, aplicado a quem já é seu cliente. É a parte do faturamento que a maioria deixa ao acaso.",
  estados: ["Cliente atendido", "Hora de voltar", "Comprou de novo"],
  fecho: "O ciclo inteiro numa pessoa só: chegou, comprou, voltou.",
} as const;

export const acompanhamento = {
  rotulo: "Acompanhamento",
  titulo: { antes: "Você enxerga se está ", destaque: "funcionando", depois: "." } satisfies Titulo,
  lead: "Painel em tempo real com o que entrou, o que avançou e o que voltou. E conversa periódica com quem cuida do funil, para decidir o próximo ajuste.",
  painel: {
    indicadores: ["Entraram", "Avançaram", "Voltaram"],
    origens: ["Meta Ads", "Google Ads"],
    chip: "Atualizado em tempo real",
  },
  exemplo: {
    rotulo: "Como soa uma conversa de acompanhamento",
    fala: "Vamos comparar os contatos recebidos com as conversas que avançaram, e os clientes atendidos com os que voltaram. A partir disso, revisamos a campanha e o próximo passo no atendimento.",
    nota: "Modelo de conversa. Nos acompanhamentos reais entram dados verificados, período e decisão proposta.",
  },
} as const;

export const comoComeca = {
  rotulo: "Como começa",
  titulo: { antes: "Você chama. Nós ouvimos antes de ", destaque: "propor", depois: "." } satisfies Titulo,
  lead: "A conversa começa pelo WhatsApp, com quem cuida do funil. Sem formulário e sem intermediário.",
  passos: [
    { titulo: "Conversa inicial", corpo: "Você conta como o cliente chega hoje, o que acontece com a mensagem e se ele volta. Nós ouvimos e perguntamos." },
    { titulo: "Leitura e proposta", corpo: "Voltamos com uma leitura das duas portas e uma proposta com escopo definido: o que entra no funil de aquisição, o que entra no de retenção e como o acompanhamento funciona." },
    { titulo: "Implantação e acompanhamento", corpo: "Montamos o funil dentro da sua empresa, com o seu time. A partir daí, revisamos campanha, atendimento e retorno em conversas periódicas com você." },
  ],
} as const;

export const perguntas = {
  titulo: "Perguntas que aparecem antes da primeira conversa",
  itens: [
    { pergunta: "Já tenho CRM. Vocês usam o meu?", resposta: "Avaliamos a ferramenta que você já usa antes de propor qualquer mudança. O que importa é cada contato ter origem registrada, próximo passo claro e hora de voltar." },
    { pergunta: "Vocês assumem as vendas?", resposta: "Não. O funil roda dentro da sua empresa, com o seu time. Alinhamos como cada contato é atendido, acompanhamos o que avança e o que volta, e ajustamos a partir disso. Quem atende continua sendo você, salvo escopo combinado em proposta." },
    { pergunta: "Já investi em anúncio e não deu certo. Por que agora seria diferente?", resposta: "Porque o anúncio não trabalha sozinho. Quando a mensagem chega e não tem caminho, o problema parece ser o anúncio. Implantar o funil é cuidar do que acontece depois do clique e do que acontece depois da compra." },
    { pergunta: "Preciso contratar tudo?", resposta: "Não. O escopo é definido em proposta a partir do que as suas duas portas precisam. Cada frente entra quando faz sentido." },
    { pergunta: "Vocês garantem uma quantidade de clientes por mês?", resposta: "Não. Trabalhamos para o caminho existir e rodar, e explicamos os critérios por trás de cada ajuste. Quantidade, custo e prazo dependem da oferta, do mercado e do atendimento, e por isso não entram como promessa." },
  ],
} as const;

export const ctaFinal = {
  titulo: frase.principal,
  apoio: frase.apoio,
  nota: cta.nota,
} as const;

export const rodape = {
  apoio: frase.apoio,
  razaoSocial: "APL Digital — Assessoria em Marketing",
  cnpj: "CNPJ 44.840.036/0001-59",
  endereco: "Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG, CEP 30160-040",
  navegarRotulo: "Navegar",
  conversarRotulo: "Conversar",
  whatsappRotulo: "WhatsApp",
} as const;

export const metadados = {
  titulo: "Lemis — Cliente novo entrando, cliente antigo voltando",
  descricao: "Implantamos na sua empresa o funil de aquisição e o de retenção, com tráfego, estratégia comercial, automação e IA. Você conversa com quem cuida.",
  ogAlt: "Lemis — Cliente novo entrando, cliente antigo voltando.",
} as const;
```

- [ ] **Passo 2: verificar**

```bash
npm run verificar && npx tsc --noEmit
```

Esperado: verificador "ok" (a regra `garanti[dm]|garantia` não casa com "garantem", que está numa pergunta: é a objeção, não a promessa). O `tsc` vai apontar os componentes antigos que importam `problema`, `servicos`, `fundamentos`, `paraQuem`, `proximoPasso`: esperado até a Tarefa 9. Para manter o build verde entre tarefas, **manter temporariamente** no fim do arquivo os exports antigos que os componentes ainda não reescritos usam, com o comentário `// TODO remover na Tarefa 9`; a Tarefa 9 remove.

---

### Tarefa 2: Primitivas de interface desenhada, `TituloDestaque` e `Secao` novo

**Arquivos:**
- Criar: `src/components/esquema/Barra.tsx`, `Quadro.tsx`, `Bolha.tsx`, `Chip.tsx`, `Marco.tsx`, `CartaoCliente.tsx`, `Cantoneiras.tsx`, `LinhasDiagonais.tsx`, `Pilula.tsx`
- Criar: `src/components/ui/TituloDestaque.tsx`
- Reescrever: `src/components/ui/Secao.tsx`

**Produz (assinaturas exatas):**

```ts
// esquema (todos Server Components, aria-hidden por padrão, className opcional)
Barra({ largura?: string /* ex. "72%" ou "120px" */, forte?: boolean, className? })
Quadro({ className? })                       // placeholder com o X
Bolha({ lado: "recebida" | "enviada", hora?: string, children?: ReactNode, className? }) // sem children → duas barras
Chip({ tom?: "neutro" | "azul", children: ReactNode, className? })
Marco({ numero: number, className? })        // "01" em t-destaque + traço
CartaoCliente({ campo?: "papel" | "tinta", tamanho?: "normal" | "grande", chip?: string, estados?: readonly string[], className? })
Cantoneiras({ className? })                  // 4 spans .cantoneira-*, pai precisa ser relative
LinhasDiagonais()                            // duas faixas absolutas fora do container, hidden xl:block
Pilula({ children: ReactNode, className? })  // rótulo-pílula com ponto azul

// ui
TituloDestaque({ titulo: Titulo, as: "h1" | "h2", classe: "t-display" | "t-titulo", animar: "hero" | "view" | "nenhum", className? })
Secao({ id, campo: "tinta" | "papel", rotulo, titulo: Titulo, lead?, separador?, fundo?, children })
```

- [ ] **Passo 1: `Barra`, `Quadro`, `Chip`, `Pilula`**

```tsx
// src/components/esquema/Barra.tsx
type Props = { largura?: string; forte?: boolean; className?: string };
export function Barra({ largura = "100%", forte = false, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{ width: largura }}
      className={`block h-[10px] rounded-full ${forte ? "bg-[color-mix(in_srgb,currentColor_38%,transparent)]" : "bg-[color-mix(in_srgb,currentColor_16%,transparent)]"} ${className}`}
    />
  );
}

// src/components/esquema/Quadro.tsx
export function Quadro({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative block overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,currentColor_14%,transparent)] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
        <path d="M0 0 100 100M100 0 0 100" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

// src/components/esquema/Chip.tsx
import type { ReactNode } from "react";
type Props = { tom?: "neutro" | "azul"; children: ReactNode; className?: string };
export function Chip({ tom = "neutro", children, className = "" }: Props) {
  const cor = tom === "azul"
    ? "border-[color-mix(in_srgb,var(--color-azul)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-azul)_14%,transparent)] text-branco"
    : "border-[color-mix(in_srgb,currentColor_18%,transparent)] text-secundario-escuro";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 t-legenda ${cor} ${className}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tom === "azul" ? "bg-azul" : "bg-[color-mix(in_srgb,currentColor_50%,transparent)]"}`} />
      {children}
    </span>
  );
}

// src/components/esquema/Pilula.tsx
import type { ReactNode } from "react";
export function Pilula({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,currentColor_16%,transparent)] px-3.5 py-1.5 t-rotulo ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-azul" />
      {children}
    </span>
  );
}
```

- [ ] **Passo 2: `Bolha`, `Marco`, `Cantoneiras`, `LinhasDiagonais`**

```tsx
// src/components/esquema/Bolha.tsx
import type { ReactNode } from "react";
import { Barra } from "./Barra";
type Props = { lado: "recebida" | "enviada"; hora?: string; children?: ReactNode; className?: string };
export function Bolha({ lado, hora, children, className = "" }: Props) {
  const enviada = lado === "enviada";
  return (
    <span
      aria-hidden="true"
      className={`block max-w-[86%] rounded-[14px] px-4 py-3 t-legenda ${enviada ? "ml-auto rounded-br-[4px] bg-azul text-branco" : "rounded-bl-[4px] bg-[color-mix(in_srgb,var(--color-branco)_8%,transparent)] text-branco"} ${className}`}
    >
      {children ?? (<><Barra largura="72%" forte /><Barra largura="48%" className="mt-2" /></>)}
      {hora ? <span className="mt-1 block text-right text-[11px] text-[color-mix(in_srgb,currentColor_65%,transparent)]">{hora}</span> : null}
    </span>
  );
}

// src/components/esquema/Marco.tsx
export function Marco({ numero, className = "" }: { numero: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-4 ${className}`}>
      <span className="t-destaque text-[2.5rem] leading-none">{String(numero).padStart(2, "0")}</span>
      <span className="h-px flex-1 bg-[color-mix(in_srgb,currentColor_18%,transparent)]" />
    </span>
  );
}

// src/components/esquema/Cantoneiras.tsx
export function Cantoneiras({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="cantoneira cantoneira-tl" /><span className="cantoneira cantoneira-tr" />
      <span className="cantoneira cantoneira-bl" /><span className="cantoneira cantoneira-br" />
    </span>
  );
}

// src/components/esquema/LinhasDiagonais.tsx
export function LinhasDiagonais() {
  return (
    <>
      <span aria-hidden="true" className="hachura pointer-events-none absolute inset-y-0 left-0 hidden w-[calc((100vw-1408px)/2)] xl:block" />
      <span aria-hidden="true" className="hachura pointer-events-none absolute inset-y-0 right-0 hidden w-[calc((100vw-1408px)/2)] xl:block" />
    </>
  );
}
```

- [ ] **Passo 3: `CartaoCliente`**

```tsx
// src/components/esquema/CartaoCliente.tsx
import { Barra } from "./Barra";
import { Chip } from "./Chip";

type Props = {
  campo?: "papel" | "tinta";
  tamanho?: "normal" | "grande";
  chip?: string;
  estados?: readonly string[];
  className?: string;
};

/** O cliente que atravessa a página. Sem nome, sem foto: avatar neutro e barras. */
export function CartaoCliente({ campo = "papel", tamanho = "normal", chip, estados = [], className = "" }: Props) {
  const superficie = campo === "papel" ? "superficie-clara text-tinta" : "superficie-escura text-branco";
  const pad = tamanho === "grande" ? "p-6 lg:p-7" : "p-4";
  return (
    <div aria-hidden="true" className={`${superficie} ${pad} ${className}`}>
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 shrink-0 rounded-full bg-[color-mix(in_srgb,currentColor_12%,transparent)]" />
        <span className="flex-1">
          <Barra largura="58%" forte />
          <Barra largura="34%" className="mt-2" />
        </span>
      </div>
      {estados.length ? (
        <ol className="mt-5 space-y-3 border-t border-[color-mix(in_srgb,currentColor_12%,transparent)] pt-4">
          {estados.map((estado, i) => (
            <li key={estado} className="flex items-center gap-3 t-legenda">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${i === estados.length - 1 ? "bg-azul text-branco" : "border border-[color-mix(in_srgb,currentColor_30%,transparent)]"}`}>
                {i === estados.length - 1 ? (
                  <svg viewBox="0 0 16 16" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
                ) : null}
              </span>
              {estado}
            </li>
          ))}
        </ol>
      ) : null}
      {chip ? <div className="mt-4"><Chip tom="azul">{chip}</Chip></div> : null}
    </div>
  );
}
```

- [ ] **Passo 4: `TituloDestaque`**

```tsx
// src/components/ui/TituloDestaque.tsx
import { Palavras } from "@/components/efeitos/Palavras";
import { PalavrasHero } from "@/components/efeitos/PalavrasHero";
import type { Titulo } from "@/lib/conteudo";

type Props = {
  titulo: Titulo;
  as: "h1" | "h2";
  classe: "t-display" | "t-titulo";
  animar: "hero" | "view" | "nenhum";
  className?: string;
};

/** Título com uma palavra em serifa itálica azul. O texto completo fica acessível via sr-only dos efeitos. */
export function TituloDestaque({ titulo, as: Tag, classe, animar, className = "" }: Props) {
  const inteiro = `${titulo.antes}${titulo.destaque}${titulo.depois}`;
  const Parte = ({ texto }: { texto: string }) =>
    animar === "hero" ? <PalavrasHero texto={texto} /> : animar === "view" ? <Palavras texto={texto} /> : <>{texto}</>;
  return (
    <Tag className={`${classe} ${className}`}>
      {animar === "nenhum" ? null : <span className="sr-only">{inteiro}</span>}
      <span aria-hidden={animar !== "nenhum"}>
        {titulo.antes ? <Parte texto={titulo.antes.trimEnd()} /> : null}
        {titulo.antes ? " " : null}
        <em className="t-destaque"><Parte texto={titulo.destaque} /></em>
        {titulo.depois.startsWith(" ") ? " " : null}
        {titulo.depois.trim() ? <Parte texto={titulo.depois.trim()} /> : null}
      </span>
    </Tag>
  );
}
```

Atenção: `Palavras` e `PalavrasHero` já emitem o próprio `sr-only`; para não ler a frase três vezes em leitor de tela, esses dois efeitos ganham uma prop `semSrOnly?: boolean` (padrão `false`), e `TituloDestaque` passa `true` nas três partes (Tarefa 3, Passo 3). O `<em>` recebe só a classe `t-destaque`: a palavra "italic" não pode aparecer em nenhum arquivo de `src/` fora de `globals.css` e `layout.tsx`, porque o verificador a reprova.

- [ ] **Passo 5: `Secao` novo**

```tsx
// src/components/ui/Secao.tsx
import type { ReactNode } from "react";
import { Cantoneiras } from "@/components/esquema/Cantoneiras";
import { LinhasDiagonais } from "@/components/esquema/LinhasDiagonais";
import { Pilula } from "@/components/esquema/Pilula";
import { Revelar } from "@/components/efeitos/Revelar";
import { Container } from "@/components/ui/Container";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import type { Titulo } from "@/lib/conteudo";

type Props = {
  id: string;
  campo: "tinta" | "papel";
  rotulo: string;
  titulo: Titulo;
  lead?: string;
  separador?: boolean;
  fundo?: ReactNode;
  children: ReactNode;
};

export function Secao({ id, campo, rotulo, titulo, lead, separador = false, fundo, children }: Props) {
  const escuro = campo === "tinta";
  return (
    <section id={id} className={`campo-${campo} relative overflow-clip ${separador ? (escuro ? "border-t border-fio-escuro" : "border-t border-fio-claro") : ""}`}>
      {fundo}
      <LinhasDiagonais />
      <Container className="relative py-20 md:py-28 lg:py-36">
        <Cantoneiras className={escuro ? "text-branco" : "text-tinta"} />
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <Revelar><Pilula className={escuro ? "text-secundario-escuro" : "text-secundario"}>{rotulo}</Pilula></Revelar>
            <TituloDestaque titulo={titulo} as="h2" classe="t-titulo" animar="view" className="mt-6 max-w-[16ch]" />
          </div>
          {lead ? (
            <Revelar atraso={0.2} className="lg:col-span-5 lg:self-end">
              <p className={`t-lead max-w-[44ch] ${escuro ? "text-secundario-escuro" : "text-secundario"}`}>{lead}</p>
            </Revelar>
          ) : null}
        </div>
        <div className="mt-14 lg:mt-20">{children}</div>
      </Container>
    </section>
  );
}
```

- [ ] **Passo 6: verificar**

```bash
npm run lint && npx tsc --noEmit && npm run verificar
```

Esperado: `tsc` reclama dos consumidores antigos de `Secao` (`Problema`, `Servicos`, `Fundamentos`, `ParaQuem`, `ProximoPasso`, `Perguntas`): esperado; para manter o build verde até a Tarefa 9, guardar o `Secao` antigo como `src/components/ui/SecaoAntiga.tsx` e apontar esses arquivos para ele (`// TODO remover na Tarefa 9`). Abrir `npm run dev` e montar em `page.tsx`, **temporariamente**, uma `Secao` de teste com `CartaoCliente`, `Bolha`, `Marco` e `Chip` para conferir a olho: cantoneiras nos cantos, numeral em serifa azul, barras na cor do campo. Remover o teste antes de fechar a tarefa. Captura em `docs/validacao/v2/tarefa-2-primitivas.png`.

---

### Tarefa 3: Hero e painel dos dois funis

**Arquivos:**
- Reescrever: `src/components/secoes/Hero.tsx`, `src/components/secoes/HeroPainel.tsx`
- Modificar: `src/components/efeitos/PalavrasHero.tsx`, `Palavras.tsx` (prop `semSrOnly`)

**Consome:** `hero`, `cta` de `conteudo.ts`; `TituloDestaque`, `Pilula`, `CartaoCliente`, `Cantoneiras`; `FeixeConexao`, `Revelar`, `Parallax`, `Inclinacao`, `Glow`, `PadraoPontos`, `Icone`.

- [ ] **Passo 1: `Hero.tsx`**

```tsx
import type { CSSProperties } from "react";
import { Parallax } from "@/components/efeitos/Parallax";
import { Revelar } from "@/components/efeitos/Revelar";
import { Glow } from "@/components/efeitos/Padroes";
import { Cantoneiras } from "@/components/esquema/Cantoneiras";
import { LinhasDiagonais } from "@/components/esquema/LinhasDiagonais";
import { Pilula } from "@/components/esquema/Pilula";
import { HeroPainel } from "@/components/secoes/HeroPainel";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, hero } from "@/lib/conteudo";

export function Hero() {
  return (
    <section id="inicio" className="campo-tinta relative -mt-[4.75rem] overflow-clip pt-[4.75rem]">
      <Glow className="top-1/4 -right-40 h-[40rem] w-[40rem] opacity-40" />
      <LinhasDiagonais />
      <Container className="relative py-16 md:py-24 lg:min-h-[min(calc(100svh-4.75rem),920px)] lg:py-28">
        <Cantoneiras className="text-branco" />
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <Pilula className="entra-hero text-secundario-escuro" >{hero.rotulo}</Pilula>
            <TituloDestaque titulo={hero.titulo} as="h1" classe="t-display" animar="hero" className="mt-6 max-w-[12ch] text-branco" />
            <p className="t-lead entra-hero mt-8 max-w-[52ch] text-secundario-escuro" style={{ "--i": 8 } as CSSProperties}>{hero.paragrafo}</p>
            <div className="entra-hero mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8" style={{ "--i": 10 } as CSSProperties}>
              <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
              <a href={hero.secundario.href} className="group inline-flex items-center gap-2 t-controle text-branco underline underline-offset-[0.2em] transition-colors duration-200 hover:text-secundario-escuro">
                {hero.secundario.rotulo}
                <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Revelar atraso={0.2} y={32}><Parallax deslocamento={28}><HeroPainel /></Parallax></Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

O `Botao` variante `primario` sobre tinta: azul/branco, contraste 5,83:1, ok. O link secundário usa `hover:text-secundario-escuro` (8,28:1) e não azul, porque azul sobre tinta é 3,02:1 e em 16 px não passa.

- [ ] **Passo 2: `HeroPainel.tsx`** (client, refs para os feixes)

```tsx
"use client";

import { useRef } from "react";
import { FeixeConexao } from "@/components/efeitos/FeixeConexao";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Inclinacao } from "@/components/efeitos/Inclinacao";
import { Revelar } from "@/components/efeitos/Revelar";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Icone } from "@/components/marca/Icone";
import { hero } from "@/lib/conteudo";

function No({ icone, nome, destino = false }: { icone: (typeof hero.painel.aquisicao.nos)[number]["icone"]; nome: string; destino?: boolean }) {
  return (
    <div className={`superficie-escura flex items-center gap-3 rounded-[12px] px-4 py-3 ${destino ? "feixe-borda feixe-ativo" : ""}`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${destino ? "bg-azul text-branco" : "bg-[color-mix(in_srgb,var(--color-azul)_18%,transparent)] text-azul"}`}>
        <Icone nome={icone} tamanho={24} />
      </span>
      <span className="t-controle text-branco">{nome}</span>
    </div>
  );
}

export function HeroPainel() {
  const painel = useRef<HTMLDivElement>(null);
  const a0 = useRef<HTMLDivElement>(null); const a1 = useRef<HTMLDivElement>(null);
  const a2 = useRef<HTMLDivElement>(null); const a3 = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLDivElement>(null); const r1 = useRef<HTMLDivElement>(null); const r2 = useRef<HTMLDivElement>(null);
  const aq = [a0, a1, a2, a3]; const re = [r0, r1, r2];
  const { aquisicao, retencao, cliente } = hero.painel;

  return (
    <Inclinacao className="w-full">
      <div className="superficie-escura relative overflow-hidden rounded-[24px] p-5 text-branco sm:p-7 lg:p-8">
        <PadraoPontos className="text-branco opacity-[0.10] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
        <Glow className="-right-24 -bottom-24 h-80 w-80" />
        <div ref={painel} className="relative grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* coluna aquisição */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <p className="t-rotulo text-secundario-escuro">{aquisicao.rotulo}</p>
            {aquisicao.nos.map((no, i) => (
              <div key={no.nome} ref={aq[i]} className={i % 2 ? "sm:self-end sm:w-[88%]" : "sm:w-[88%]"}>
                <Revelar atraso={0.15 + i * 0.12} y={16}><No icone={no.icone} nome={no.nome} /></Revelar>
              </div>
            ))}
            <Revelar atraso={0.7} y={16} className="sm:-mt-2 sm:ml-6">
              <CartaoCliente chip={cliente.chip} className="max-w-[240px] shadow-[0_18px_40px_-18px_color-mix(in_srgb,var(--color-tinta)_90%,transparent)]" />
            </Revelar>
          </div>
          {/* coluna retenção */}
          <div className="flex flex-col gap-5 sm:gap-6 sm:pt-24">
            <p className="t-rotulo text-secundario-escuro">{retencao.rotulo}</p>
            {retencao.nos.map((no, i) => (
              <div key={no.nome} ref={re[i]} className={i % 2 ? "sm:self-end sm:w-[88%]" : "sm:w-[88%]"}>
                <Revelar atraso={0.8 + i * 0.12} y={16}><No icone={no.icone} nome={no.nome} destino={i === retencao.nos.length - 1} /></Revelar>
              </div>
            ))}
          </div>
          {/* feixes: descem na aquisição, cruzam para a retenção (o gesto do l), descem na retenção */}
          <FeixeConexao conteinerRef={painel} deRef={a0} paraRef={a1} atraso={0} />
          <FeixeConexao conteinerRef={painel} deRef={a1} paraRef={a2} atraso={0.8} />
          <FeixeConexao conteinerRef={painel} deRef={a2} paraRef={a3} atraso={1.6} />
          <FeixeConexao conteinerRef={painel} deRef={a3} paraRef={r0} atraso={2.4} />
          <FeixeConexao conteinerRef={painel} deRef={r0} paraRef={r1} atraso={3.2} />
          <FeixeConexao conteinerRef={painel} deRef={r1} paraRef={r2} atraso={4.0} />
        </div>
      </div>
    </Inclinacao>
  );
}
```

Os `ref`s ficam em wrappers estáticos (sem `transform`), como a rodada 2 aprendeu: no Chromium, ancestral com `transform` vira `offsetParent` e a geometria do feixe quebra. O `FeixeConexao` já resolve "desce, vira, segue" quando o destino está à direita (`bEsq >= ax`). Conferir no navegador que o feixe a3 → r0 vira para a direita e entra pelo lado esquerdo do nó "Cliente atendido"; se o nó estiver à esquerda do ponto de partida em alguma largura, o feixe entra pelo lado direito, o que também é correto.

- [ ] **Passo 3: `semSrOnly` em `Palavras` e `PalavrasHero`**

Adicionar `semSrOnly?: boolean` às props dos dois; quando `true`, não renderizar o `<span className="sr-only">`. `TituloDestaque` passa `semSrOnly` nas três partes (e emite o `sr-only` da frase inteira uma vez).

- [ ] **Passo 4: verificar**

```bash
npm run lint && npx tsc --noEmit && npm run verificar && npm run dev
```

No navegador (1440 e 390): H1 com "voltando" em serifa azul; pílula; painel com duas colunas no desktop e uma no mobile; seis feixes com geometria correta; cartão do cliente encostado em "Agendado"; último nó com feixe de borda. Com `--force-prefers-reduced-motion`: linhas estáticas, sem inclinação. Capturas: `docs/validacao/v2/desktop-hero.png`, `mobile-hero.png`, `mobile-painel.png`.

---

### Tarefa 4: As duas portas

**Arquivos:**
- Criar: `src/components/secoes/DuasPortas.tsx`

**Consome:** `duasPortas`; `Secao`, `CartaoHolofote`, `Bolha`, `Barra`, `Chip`, `Holofote`, `Glow`, `PadraoPontos`, `Revelar`.

- [ ] **Passo 1: componente**

```tsx
import { CartaoHolofote } from "@/components/efeitos/CartaoHolofote";
import { Holofote } from "@/components/efeitos/Holofote";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Bolha } from "@/components/esquema/Bolha";
import { Chip } from "@/components/esquema/Chip";
import { Secao } from "@/components/ui/Secao";
import { duasPortas } from "@/lib/conteudo";

function CenaChega() {
  const e = duasPortas.cenas[0].esquema;
  return (
    <div aria-hidden="true" className="rounded-[14px] border border-fio-escuro p-4">
      <Bolha lado="recebida" hora={e.horaRecebida}>{e.mensagem}</Bolha>
      <Bolha lado="enviada" hora={e.horaEnviada} className="mt-3" />
      <div className="mt-5 border-t border-fio-escuro pt-4"><Chip>{e.chip}</Chip></div>
    </div>
  );
}

function CenaVolta() {
  const e = duasPortas.cenas[1].esquema;
  return (
    <div aria-hidden="true" className="rounded-[14px] border border-fio-escuro p-4 text-branco">
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 rounded-full bg-[color-mix(in_srgb,currentColor_12%,transparent)]" />
        <span className="flex-1"><Barra largura="56%" forte /><Barra largura="32%" className="mt-2" /></span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-fio-escuro pt-4 t-legenda text-secundario-escuro">
        <div><dt>{e.ultimaCompra}</dt><dd className="mt-2"><Barra largura="70%" forte /></dd></div>
        <div><dt>{e.voltarEm}</dt><dd className="mt-2 border-b border-dashed border-fio-escuro pb-1 text-branco">—</dd></div>
      </dl>
      <div className="mt-5"><Chip>{e.chip}</Chip></div>
    </div>
  );
}

export function DuasPortas() {
  return (
    <Secao
      id="duas-portas"
      campo="tinta"
      rotulo={duasPortas.rotulo}
      titulo={duasPortas.titulo}
      lead={duasPortas.lead}
      fundo={<><PadraoPontos className="text-branco opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" /><Glow className="top-0 right-0 h-[28rem] w-[28rem] opacity-50" /><Holofote /></>}
    >
      <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {duasPortas.cenas.map((cena, i) => (
          <li key={cena.rotulo}>
            <Revelar atraso={i * 0.12} className="h-full">
              <CartaoHolofote className="superficie-escura h-full p-6 text-branco lg:p-7">
                <p className="t-rotulo text-secundario-escuro">{cena.rotulo}</p>
                <div className="mt-5">{i === 0 ? <CenaChega /> : <CenaVolta />}</div>
                <p className="t-corpo mt-6 max-w-[46ch] text-secundario-escuro">{cena.texto}</p>
              </CartaoHolofote>
            </Revelar>
          </li>
        ))}
      </ul>
      <Revelar atraso={0.3}><p className="t-sub mt-12 max-w-[30ch] text-branco">{duasPortas.fecho}</p></Revelar>
    </Secao>
  );
}
```

O `Holofote` precisa do wrapper com a classe `holofote-ativo` no hover: conferir como o `Problema` antigo o monta (o `Secao` antigo passava o `fundo` dentro da `section`; o novo faz o mesmo).

- [ ] **Passo 2: verificar** — `npm run lint && npx tsc --noEmit && npm run verificar`; no navegador, as duas cenas lado a lado em 1440 e empilhadas em 390; holofote seguindo o cursor; a hora `09:12`/`11:48` aparece na bolha (o verificador não pega, não há `%` nem `R$`). Captura `docs/validacao/v2/desktop-duas-portas.png`.

---

### Tarefa 5: A virada

**Arquivos:**
- Criar: `src/components/secoes/Virada.tsx`

**Consome:** `virada`; `Secao`, `Marco`, `PadraoGrade`, `Glow`, `Revelar`.

- [ ] **Passo 1: componente**

```tsx
import { Glow, PadraoGrade } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Marco } from "@/components/esquema/Marco";
import { Secao } from "@/components/ui/Secao";
import { virada } from "@/lib/conteudo";

export function Virada() {
  return (
    <Secao
      id="como-funciona"
      campo="tinta"
      rotulo={virada.rotulo}
      titulo={virada.titulo}
      lead={virada.lead}
      fundo={<><PadraoGrade className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" /><Glow className="-bottom-40 left-1/3 h-[30rem] w-[30rem] opacity-40" /></>}
    >
      <Revelar>
        <div className="grid gap-8 border-t border-fio-escuro pt-10 lg:grid-cols-2 lg:gap-0">
          <p className="t-sub max-w-[22ch] text-secundario-escuro lg:pr-10">{virada.contraste.outros}</p>
          <p className="t-sub max-w-[26ch] text-branco lg:border-l lg:border-fio-escuro lg:pl-10">{virada.contraste.lemis}</p>
        </div>
      </Revelar>
      <ul className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-6">
        {virada.fundamentos.map((f, i) => (
          <li key={f.nome}>
            <Revelar atraso={0.15 + i * 0.1}>
              <Marco numero={i + 1} />
              <h3 className="t-sub mt-5 text-branco">{f.nome}</h3>
              <p className="t-corpo mt-3 max-w-[38ch] text-secundario-escuro">{f.texto}</p>
            </Revelar>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
```

O H2 desta seção é longo ("Não é mais anúncio. É um funil rodando dentro da sua empresa."): no `Secao`, o `max-w-[16ch]` do título quebra em quatro linhas; aqui é intencional (é a página tipográfica). Se ficar em cinco linhas no desktop, subir para `max-w-[20ch]` só nesta seção via `className` extra em `Secao` (adicionar prop `classeTitulo?: string`).

- [ ] **Passo 2: verificar** — lint, tsc, verificador; captura `docs/validacao/v2/desktop-virada.png`.

---

### Tarefa 6: Aquisição, implantada

**Arquivos:**
- Criar: `src/components/secoes/Aquisicao.tsx`

**Consome:** `aquisicao`; `Secao`, `Marco`, `Quadro`, `Barra`, `Bolha`, `Chip`, `CartaoCliente`, `Revelar`, `PadraoPontos`.

- [ ] **Passo 1: componente**

```tsx
import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Bolha } from "@/components/esquema/Bolha";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Chip } from "@/components/esquema/Chip";
import { Marco } from "@/components/esquema/Marco";
import { Quadro } from "@/components/esquema/Quadro";
import { Secao } from "@/components/ui/Secao";
import { aquisicao } from "@/lib/conteudo";

const [m1, m2, m3, m4] = aquisicao.marcos;

function EsquemaAnuncio() {
  return (
    <div aria-hidden="true">
      <Quadro className="h-24" />
      {m1.esquema.campos.map((c) => (
        <div key={c} className="mt-4"><p className="t-rotulo text-secundario-escuro">{c}</p><Barra largura="74%" className="mt-2" forte /></div>
      ))}
      <div className="mt-5 flex justify-center"><Chip tom="azul">{m1.esquema.pilula}</Chip></div>
    </div>
  );
}
function EsquemaConversa() {
  return (
    <div aria-hidden="true">
      <Bolha lado="recebida">{m2.esquema.mensagem}</Bolha>
      <Bolha lado="enviada" className="mt-3" />
      <div className="mt-5 border-t border-fio-escuro pt-4"><Chip tom="azul">{m2.esquema.chip}</Chip></div>
    </div>
  );
}
function EsquemaCrm() {
  return (
    <div aria-hidden="true">
      <Chip tom="azul">{m3.esquema.etapa}</Chip>
      {m3.esquema.campos.map((c) => (
        <div key={c} className="mt-4"><p className="t-rotulo text-secundario-escuro">{c}</p><Barra largura="60%" className="mt-2" forte /></div>
      ))}
    </div>
  );
}
function EsquemaCompareceu() {
  return <CartaoCliente chip={m4.esquema.chip} />;
}

const ESQUEMAS = [EsquemaAnuncio, EsquemaConversa, EsquemaCrm, EsquemaCompareceu];

function Seta() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 12" width={64} height={12} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="absolute top-1/2 -right-16 hidden -translate-y-1/2 text-azul lg:block">
      <path d="M0 6h60M55 1l5 5-5 5" />
    </svg>
  );
}

export function Aquisicao() {
  return (
    <Secao
      id="aquisicao"
      campo="tinta"
      rotulo={aquisicao.rotulo}
      titulo={aquisicao.titulo}
      lead={aquisicao.lead}
      fundo={<PadraoPontos className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_top,black,transparent_70%)]" />}
    >
      <Revelar>
        <ul className="flex flex-wrap gap-2">{aquisicao.dentro.map((d) => <li key={d}><Chip>{d}</Chip></li>)}</ul>
        <p className="t-legenda mt-3 text-secundario-escuro">{aquisicao.nota}</p>
      </Revelar>
      <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        {aquisicao.marcos.map((marco, i) => {
          const Esquema = ESQUEMAS[i];
          return (
            <li key={marco.rotulo} className="relative">
              <Revelar atraso={0.1 + i * 0.12} className="h-full">
                <Marco numero={i + 1} />
                <h3 className="t-rotulo mt-4 text-secundario-escuro">{marco.rotulo}</h3>
                <div className="superficie-escura mt-4 min-h-[280px] p-5 text-branco"><Esquema /></div>
                {i < aquisicao.marcos.length - 1 ? <Seta /> : null}
              </Revelar>
            </li>
          );
        })}
      </ol>
    </Secao>
  );
}
```

- [ ] **Passo 2: verificar** — lint, tsc, verificador; no navegador, quatro marcos na mesma altura, setas entre eles só no desktop, 2×2 em 768, um por linha em 390. Captura `docs/validacao/v2/desktop-aquisicao.png`.

---

### Tarefa 7: Retenção, implantada

**Arquivos:**
- Criar: `src/components/secoes/Retencao.tsx`

**Consome:** `retencao`; `Secao`, `CartaoCliente`, `Glow`, `Revelar`.

- [ ] **Passo 1: componente**

```tsx
import { Glow } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Secao } from "@/components/ui/Secao";
import { retencao } from "@/lib/conteudo";

export function Retencao() {
  return (
    <Secao
      id="retencao"
      campo="tinta"
      rotulo={retencao.rotulo}
      titulo={retencao.titulo}
      lead={retencao.lead}
      fundo={<Glow className="top-1/3 right-0 h-[36rem] w-[36rem] opacity-50" />}
    >
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <Revelar className="lg:col-span-5">
          <p className="t-corpo max-w-[44ch] text-secundario-escuro">{retencao.apoio}</p>
          <p className="t-sub mt-8 max-w-[26ch] text-branco">{retencao.fecho}</p>
        </Revelar>
        <div className="relative lg:col-span-6 lg:col-start-7">
          {/* a base: dois cards-fantasma atrás */}
          <div aria-hidden="true" className="superficie-escura absolute inset-x-8 -top-6 h-full opacity-60" />
          <div aria-hidden="true" className="superficie-escura absolute inset-x-4 -top-3 h-full opacity-80" />
          <Revelar atraso={0.2} y={32} className="relative">
            <CartaoCliente tamanho="grande" estados={retencao.estados} className="mx-auto max-w-[420px]" />
          </Revelar>
        </div>
      </div>
    </Secao>
  );
}
```

As duas `opacity-*` nos cards-fantasma são elementos gráficos com `aria-hidden`: o verificador aceita porque a linha contém `aria-hidden`. O último estado ("Comprou de novo") sai com o disco azul e o check: é o resultado, sem nenhuma palavra sobre lembrete ou campanha.

- [ ] **Passo 2: verificar** — lint, tsc, verificador; captura `docs/validacao/v2/desktop-retencao.png`, `mobile-retencao.png`.

---

### Tarefa 8: O que você vê

**Arquivos:**
- Criar: `src/components/secoes/OQueVoceVe.tsx`

**Consome:** `acompanhamento`; `Secao`, `Barra`, `Chip`, `Simbolo`, `Revelar`.

- [ ] **Passo 1: componente**

```tsx
import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Chip } from "@/components/esquema/Chip";
import { Simbolo } from "@/components/marca/Simbolo";
import { Secao } from "@/components/ui/Secao";
import { acompanhamento } from "@/lib/conteudo";

// Proporção desenhada, não métrica: classes w-[..%] são ignoradas pelo verificador (Tarefa 0).
const LARGURAS_ORIGEM = ["w-[82%]", "w-[56%]"] as const;

function Painel() {
  const p = acompanhamento.painel;
  return (
    <div className="superficie-clara p-6 lg:p-7">
      <div className="flex items-center justify-between gap-4">
        <span aria-hidden="true" className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-azul" /><Barra largura="96px" forte /></span>
        <Chip tom="azul">{p.chip}</Chip>
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-fio-claro pt-5">
        {p.indicadores.map((ind) => (
          <div key={ind}><dt className="t-rotulo text-secundario">{ind}</dt><dd className="mt-3" aria-hidden="true"><Barra largura="64%" forte /></dd></div>
        ))}
      </dl>
      <div className="mt-6 space-y-3 border-t border-fio-claro pt-5">
        {p.origens.map((o, i) => (
          <div key={o} className="grid grid-cols-[96px_1fr] items-center gap-4 t-legenda text-secundario">
            <span>{o}</span>
            <span aria-hidden="true" className="block h-[10px] rounded-full bg-[color-mix(in_srgb,var(--color-azul)_10%,transparent)]"><span className={`block h-full rounded-full bg-azul ${LARGURAS_ORIGEM[i]}`} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OQueVoceVe() {
  const ex = acompanhamento.exemplo;
  return (
    <Secao id="acompanhamento" campo="papel" rotulo={acompanhamento.rotulo} titulo={acompanhamento.titulo} lead={acompanhamento.lead}>
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <Revelar className="lg:col-span-7"><Painel /></Revelar>
        <Revelar atraso={0.15} className="lg:col-span-5">
          <p className="t-rotulo text-secundario">{ex.rotulo}</p>
          <div className="superficie-clara mt-4 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-azul text-branco"><Simbolo className="h-5 w-5" /></span>
              <span className="t-controle">Lemis</span>
            </div>
            <p className="t-sub mt-5">“{ex.fala}”</p>
          </div>
          <p className="t-legenda mt-4 max-w-[52ch] text-secundario">{ex.nota}</p>
        </Revelar>
      </div>
    </Secao>
  );
}
```

`Meta Ads` e `Google Ads` são as duas plataformas confirmadas no briefing da identidade; nada além delas.

- [ ] **Passo 2: verificar** — lint, tsc, verificador (as larguras `w-[82%]`/`w-[56%]` são ignoradas pela regra de métrica desde a Tarefa 0). Captura `docs/validacao/v2/desktop-acompanhamento.png`.

---

### Tarefa 9: Como começa, Perguntas, CTA final, rodapé, header, página, metadados, limpeza

**Arquivos:**
- Renomear/reescrever: `src/components/secoes/ProximoPasso.tsx` → `ComoComeca.tsx`
- Modificar: `Perguntas.tsx`, `CtaFinal.tsx`, `Footer.tsx`, `Header.tsx`, `src/components/ui/accordion.tsx`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/opengraph-image.tsx`
- Remover: `secoes/Problema.tsx`, `Servicos.tsx`, `Fundamentos.tsx`, `ParaQuem.tsx`, `marca/Conector.tsx`, `ui/SecaoAntiga.tsx`; os exports `// TODO remover na Tarefa 9` de `conteudo.ts`

- [ ] **Passo 1: `ComoComeca.tsx`**

```tsx
import { LinhaProgresso } from "@/components/efeitos/LinhaProgresso";
import { Revelar } from "@/components/efeitos/Revelar";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { comoComeca, cta } from "@/lib/conteudo";

export function ComoComeca() {
  return (
    <Secao id="como-comeca" campo="papel" separador rotulo={comoComeca.rotulo} titulo={comoComeca.titulo} lead={comoComeca.lead}>
      <LinhaProgresso className="mb-8 w-full" />
      <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {comoComeca.passos.map((passo, i) => (
          <li key={passo.titulo}>
            <Revelar atraso={0.2 + i * 0.15} className="h-full">
              <div className="superficie-clara h-full p-7">
                <span aria-hidden="true" className="t-destaque block text-[2.5rem] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-sub mt-6">{passo.titulo}</h3>
                <p className="t-corpo mt-3 max-w-[40ch] text-secundario">{passo.corpo}</p>
              </div>
            </Revelar>
          </li>
        ))}
      </ol>
      <Revelar atraso={0.6}>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
          <p className="t-legenda text-secundario">{cta.nota}</p>
        </div>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Passo 2: `Perguntas.tsx` em tinta, com numerais**

Estrutura: `<section id="perguntas" className="campo-tinta relative overflow-clip border-t border-fio-escuro">` (não usa `Secao`, porque o título não tem destaque). Grid 12: H2 `t-titulo text-branco` nas colunas 1–5 (`lg:sticky lg:top-28`), acordeão nas 7–12 dentro de `superficie-escura px-6 lg:px-8`. Cada `AccordionTrigger` recebe, antes do texto, `<span aria-hidden="true" className="t-destaque mr-4 text-[1.5rem] leading-none">{String(i + 1).padStart(2, "0")}</span>`. Em `accordion.tsx`, trocar as cores fixas por `currentColor`/`border-fio-escuro` quando o pai tiver `campo-tinta`: adicionar prop `escuro?: boolean` em `AccordionItem`/`AccordionTrigger`/`AccordionContent` que alterna `border-fio-claro` ↔ `border-fio-escuro`, `text-tinta` ↔ `text-branco`, `text-secundario` ↔ `text-secundario-escuro`. Foco visível: `:focus-visible` já usa `--cor-foco` do campo (branco em tinta).

- [ ] **Passo 3: `CtaFinal.tsx`, `Footer.tsx`, `Header.tsx`**

- `CtaFinal`: sem mudança estrutural; `ctaFinal.titulo` agora é a frase nova (via `Palavras`), `ctaFinal.apoio` a frase de apoio.
- `Footer`: sem mudança estrutural; `rodape.apoio` é a frase de apoio; `nav` novo.
- `Header`: wordmark `text-branco` (header sobre tinta); vidro `bg-[color-mix(in_srgb,var(--color-tinta)_88%,transparent)]` com `border-fio-escuro`; links da nav `text-branco hover:text-secundario-escuro`; botão `Botao` primário (azul/branco). Menu mobile: fundo tinta, itens brancos, divisórias `border-fio-escuro`. Ícone do hambúrguer `text-branco`.

- [ ] **Passo 4: `page.tsx`**

```tsx
import { Aquisicao } from "@/components/secoes/Aquisicao";
import { ComoComeca } from "@/components/secoes/ComoComeca";
import { CtaFinal } from "@/components/secoes/CtaFinal";
import { DuasPortas } from "@/components/secoes/DuasPortas";
import { Footer } from "@/components/secoes/Footer";
import { Header } from "@/components/secoes/Header";
import { Hero } from "@/components/secoes/Hero";
import { OQueVoceVe } from "@/components/secoes/OQueVoceVe";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Retencao } from "@/components/secoes/Retencao";
import { Virada } from "@/components/secoes/Virada";

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <DuasPortas />
        <Virada />
        <Aquisicao />
        <Retencao />
        <OQueVoceVe />
        <ComoComeca />
        <Perguntas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Passo 5: metadados**

Em `layout.tsx`, `metadata.title = metadados.titulo`, `description = metadados.descricao`, `openGraph.title = metadados.titulo`, `openGraph.description = frase.apoio` (importar de `conteudo.ts`). Em `opengraph-image.tsx`, `export const alt = metadados.ogAlt` (o arquivo é isento da regra de métrica; importar de `@/lib/conteudo` funciona no `next/og`).

- [ ] **Passo 6: remover o que ficou sem uso**

```bash
rm -f src/components/secoes/Problema.tsx src/components/secoes/Servicos.tsx src/components/secoes/Fundamentos.tsx src/components/secoes/ParaQuem.tsx src/components/marca/Conector.tsx src/components/ui/SecaoAntiga.tsx
```

(Só no working tree: o `git status` mostra os arquivos como apagados e o Vinicius vê tudo no diff. Nenhum comando `git` que mexa no índice.) Apagar também de `globals.css` o bloco `.conector` e o `@keyframes conector-desenhar`. Remover de `conteudo.ts` os exports temporários. `npx tsc --noEmit` precisa passar limpo.

- [ ] **Passo 7: verificar**

```bash
npm run lint && npx tsc --noEmit && npm run verificar && npm test && npm run build
```

Esperado: tudo verde; o build avisa sobre `metadataBase` (já era assim). Título da aba e descrição novos em `view-source`.

---

### Tarefa 10: Validação, capturas, comparação "mesmo estúdio" e RESUMO

**Arquivos:**
- Criar: `docs/validacao/v2/*.png`, `docs/validacao/v2/lighthouse-desktop.json`, `lighthouse-mobile.json`
- Reescrever: `RESUMO.md`

- [ ] **Passo 1: build de produção e Lighthouse**

```bash
npm run build && (npm run start &) && sleep 4
npx lighthouse http://localhost:3000 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/validacao/v2/lighthouse-desktop.json --chrome-flags="--headless=new"
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/validacao/v2/lighthouse-mobile.json --chrome-flags="--headless=new"
node -e "for (const f of ['desktop','mobile']) { const r=require('./docs/validacao/v2/lighthouse-'+f+'.json'); console.log(f, Object.entries(r.categories).map(([k,v])=>k+'='+Math.round(v.score*100)).join(' '), 'LCP='+r.audits['largest-contentful-paint'].displayValue, 'CLS='+r.audits['cumulative-layout-shift'].displayValue) }"
```

Esperado: desktop `performance=100 accessibility=100 best-practices=100 seo=100`; mobile `performance≥96`, demais 100; CLS 0. Se o mobile cair abaixo de 96: (1) medir o JS inicial em `.next/static/chunks` (gzip) e cortar `Inclinacao` do painel; (2) conferir que a serif está com `preload` e um arquivo só; (3) reduzir os feixes da retenção para estáticos. Registrar o que foi feito.

- [ ] **Passo 2: JS inicial**

```bash
ls -l .next/static/chunks/*.js | sort -k5 -n | tail -5
find .next/static/chunks -name "*.js" -print0 | xargs -0 cat | gzip -c | wc -c
```

Registrar o total gzip; meta ≤ 230 KB para o conjunto carregado na primeira pintura (conferir no painel Network do navegador quais chunks entram no carregamento inicial).

- [ ] **Passo 3: movimento reduzido, teclado, larguras**

No navegador (claude-in-chrome ou agent-browser): com `--force-prefers-reduced-motion`, confirmar que Lenis não instancia (`document.documentElement.classList.contains('lenis') === false`), feixes estáticos, nenhum `transform` animado, acordeão abre sem animação de altura. Tab por toda a página: skip link, cinco links da nav, botão, link secundário do hero, cinco gatilhos do acordeão, botões de CTA, links do rodapé; foco visível em todos. Larguras 320, 390 e 1440: `document.documentElement.scrollWidth === window.innerWidth`.

- [ ] **Passo 4: capturas**

Desktop 1440×900: hero, duas portas (com holofote), virada, aquisição, retenção, acompanhamento, como começa, perguntas (item aberto), CTA final, rodapé; movimento reduzido no hero. Mobile 390×844: hero, painel, duas portas, retenção, menu aberto. Todas em `docs/validacao/v2/`.

- [ ] **Passo 5: comparação "mesmo estúdio"**

Montar `docs/validacao/v2/mesmo-estudio.png` com três recortes lado a lado: hero novo do site, página 03 do Botolifting v2 (`…/botolifting-v2/saida/pagina-03.png`) e o hero do Atendly (captura de 20/09 ou nova). Responder por escrito no RESUMO: as duas peças da Lemis parecem do mesmo estúdio? O que ficou parecido demais com o Atendly? Onde a régua da casa perdeu para a skill de interface sem ninguém perceber (o sinal de alerta é card sólido onde deveria ser tipografia e filete)?

- [ ] **Passo 6: `RESUMO.md`**

Reescrever com: data, worktree, "nada commitado"; como rodar; o que mudou seção por seção (tabela da Parte 1 §2 com o que foi feito); bibliotecas (nenhuma nova; fonte nova com tamanho e hash); tabela antes/depois (JS gzip, Lighthouse desktop/mobile, LCP, CLS) contra a rodada 2; capturas; movimento reduzido; limitações; tensões declaradas (fundo escuro vs régua, resolvido por decisão do Vinicius em 20/09; serif fora do sistema visual, pendência de atualizar a identidade); e a lista de pendências da Parte 1 §10, cada uma com `[PENDENTE DE VALIDAÇÃO] … · base: … (quem valida: Vinicius)`.

---

## Auto-revisão do plano

- **Cobertura da spec:** posicionamento (§1, §5), auditoria com motivo por corte (§2), percurso (§3), estrutura (§4), desenho de cada seção (§5), Atendly com o que não copiar e a diferença de objeção (§6), sistema visual (§7), performance/acessibilidade como piso (§8, Tarefa 10), irmã (§9), decisões e pendências (§10), o que muda no código (mapa de arquivos e Tarefas 0–9). Retenção com o mesmo peso da aquisição: uma seção inteira, um nó a menos no painel do hero mas com o nó de destino (feixe de borda) do lado dela, e a segunda porta no mesmo tamanho da primeira.
- **Placeholders:** nenhum "TBD"; o único valor a preencher é o hash da fonte no Passo 2 da Tarefa 0, que sai do comando do Passo 1.
- **Consistência de nomes:** `Titulo`, `TituloDestaque`, `Secao`, `Pilula`, `Chip`, `Barra`, `Quadro`, `Bolha`, `Marco`, `CartaoCliente`, `Cantoneiras`, `LinhasDiagonais` são usados com as mesmas assinaturas nas Tarefas 2–9. Exports de `conteudo.ts` usados: `nav`, `cta`, `frase`, `hero`, `duasPortas`, `virada`, `aquisicao`, `retencao`, `acompanhamento`, `comoComeca`, `perguntas`, `ctaFinal`, `rodape`, `metadados`.
- **Ponto de atenção conhecido:** a palavra "italic" não pode aparecer em nenhum arquivo de `src/` fora de `globals.css` e `layout.tsx` (regra do verificador). Os componentes usam só a classe `t-destaque`.
