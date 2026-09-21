# Site da Lemis v2 — refazer sobre o posicionamento novo

Pedido do Vinicius, 20/09/2026, literal:

> Preciso que vc despache para os agentes da Lemis ajustes no site e apresentacao da Lemis.
> 1. A nossa entrega o foco é implantar funis de aquisicao de novos clientes e retencao nas
> empresas (usando tráfego, estratégia comercial, automacao e IA. Essa é a nossa veia.
> 2. Precisamos recriar o site com a régua de design atualizada do que ja mandei pra vc. Inclusive
> pode ter uma referencia com o site do atendly que eu gosto muito https://atendly.com.br/
> ps: use as skills que fazem sentido para essas demandas, temos skills de design, ui/ux e varias
> outras. Use oq for necessário, além do meu gosto.

## O posicionamento novo (palavras do Vinicius, 20/09/2026)

> A nossa entrega o foco é implantar funis de aquisição de novos clientes e retenção nas
> empresas (usando tráfego, estratégia comercial, automação e IA. Essa é a nossa veia.

Leia o que isso muda, porque muda tudo o que a casa vinha dizendo:

- **A oferta é o funil implantado dentro da empresa do cliente**, de aquisição e de retenção. Não
  é um pacote de serviços avulsos.
- **Tráfego, estratégia comercial, automação e IA são o meio, não o produto.** Até ontem a casa
  descrevia sete entregas (tráfego Meta e Google, landing page, CRM, dashboard, criativos,
  roteiros e edição de vídeo). Elas continuam existindo como o que é feito, mas deixam de ser o
  argumento: o argumento é o funil que passa a existir e a rodar.
- **Retenção entra no mesmo peso da aquisição.** Isso é novo e é o que diferencia: quase toda
  agência vende lead novo, e a casa vende o ciclo inteiro — o cliente que chega e o cliente que
  volta.
- Erro registrado em 19/09, que não pode se repetir: um brief pediu "estratégia comercial com CRM"
  e o agente transformou o mecanismo em oferta, vendendo o CRM. Oferta é o que o cliente compra;
  CRM é uma peça de dentro.

**Suposição a confirmar com o Vinicius:** ao falar em "régua de design atualizada que já mandei",
entendemos que é a régua da casa, a skill `direcao-de-arte-apl` (o arquivo real é
`~/orca/projects/Lemis-Clientes/agentes/direcao-de-arte.md`), que cresce a cada reprovação real
dele. Se havia outra régua enviada em outro lugar, pergunte antes de desenhar.

## O site de hoje

`lemiscompany.com.br`, no ar desde 17/09, construído pelo Fable em duas rodadas. Next.js + React,
`motion`, `lenis`, Radix Accordion, fontes locais. Seções em `src/components/secoes/` (Hero,
Servicos, ParaQuem e as demais), marca em `src/components/marca/`, efeitos em
`src/components/efeitos/`. JS 223 KB gzip, Lighthouse 100 no desktop e 96 no mobile,
`prefers-reduced-motion` respeitado.

A primeira versão dele foi **reprovada** pelo Vinicius com estas palavras: "muito simples,
estático, infantil". O que salvou a segunda foi superfície, movimento e profundidade — painel de
conexão no hero com feixes animados, cards com superfície, holofote, padrões e grão.

**Recriar não é começar do zero por esporte.** Audite o que existe antes: o que sustenta o
posicionamento novo fica, o que não sustenta sai, e o que sai tem motivo escrito. Performance e
acessibilidade de hoje são piso, não teto: entregar pior que 100/96 é regressão.

## A referência que ele gosta

`https://atendly.com.br/` — "gosto muito". Estude de verdade: hierarquia, ritmo de seção,
densidade, tipografia, como o movimento entra, como a prova aparece. Extraia os princípios que
valem para a Lemis e diga no plano **o que não copiar**, porque Atendly é produto SaaS e Lemis é
agência que implanta funil: a promessa, o objeto da compra e a objeção são outros.

## Qual régua manda aqui

Aqui é **tela**, não peça gráfica. As skills de frontend, UI e UX entram como **diretoras** — use
as que fizerem sentido, incluindo as de crítica visual para revisar antes de mostrar. A régua
`direcao-de-arte-apl` entra como **guardiã da marca**: cor, tipografia, tom e o que a casa não
faz. Se as duas brigarem, **não decida por hierarquia: leve o conflito ao Vinicius com as duas
opções renderizadas.**

Vale o inverso do que vale na arte: em peça gráfica, skill de frontend é consultora de
legibilidade e nunca diretora. Aqui, em site, ela dirige.

## O que o site precisa fazer

Quem chega é dono de empresa que vive de cliente entrando e voltando. Ele precisa, nesta ordem:
reconhecer o próprio problema, entender que existe um mecanismo (o funil de aquisição e retenção
implantado), acreditar que a Lemis faz isso de verdade, e saber qual é o próximo passo. Tráfego,
estratégia comercial, automação e IA aparecem como o **como**, nunca como a vitrine.

Retenção precisa ter peso igual ao da aquisição na página. É o que separa a Lemis de qualquer
agência de tráfego.

## Régua de saída (o que reprova a entrega)

- Sem número, case, logo de cliente ou resultado inventado. Sem origem aprovada, não entra; se for
  placeholder, fica marcado `[PENDENTE DE VALIDAÇÃO]` e visível no RESUMO.
- Lighthouse desktop 100 e mobile >= 96, `prefers-reduced-motion` respeitado, teclado e foco
  funcionando, contraste conferido.
- Funciona em largura de celular sem rolagem horizontal.
- Antes de mostrar: comparar com a referência do Atendly e com o site atual, e responder se parecem
  do mesmo estúdio da marca Lemis.
- Rodapé assina Lemis. A razão social "APL Digital — Assessoria em Marketing" ao lado do CNPJ
  continua como está, por decisão dele de hoje: o contrato social muda depois.

## Restrições

- Não commitar, não fazer merge, **não publicar e não fazer deploy**. O site está no ar; o que sai
  daqui é preview local para o Vinicius aprovar.
- Entregar em `docs/` desta demanda o plano e o `RESUMO.md`, e o código no lugar dele.
- A demanda irmã da apresentação (`~/orca/workspaces/Lemis/interno-apresentacao-lemis-v2`) parte do
  mesmo posicionamento. As duas peças têm que soar do mesmo estúdio: leia o plano de lá quando
  existir e aponte divergência em vez de seguir divergindo.
