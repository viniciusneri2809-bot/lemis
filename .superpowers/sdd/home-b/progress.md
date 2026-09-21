# SDD ledger — plan: docs/PLANO-HOME-B.md

## Varredura de conflitos (antes da tarefa 1)

| Par | O que compartilham | Achado |
|---|---|---|
| T0 × T1–T5 | globals.css, Secao, CabecaSecao, Folha, Numeral, NumeralGigante, Feixe | T0 produz, T1–T5 consomem. Resolvido pela ordem: T0 roda sozinho e antes. |
| T1 × T2 | nenhum arquivo | O cartão do hero desce para dentro da seção 2. T2 precisa saber do respiro de topo. Vai no despacho. |
| T2 × T3 | nenhum arquivo | limpo |
| T3 × T4 | nenhum arquivo | limpo |
| T4 × T5 | nenhum arquivo | limpo |
| T1–T5 × T6 | page.tsx | só T6 escreve page.tsx |
| T0 × verificador | paleta em globals.css | `#000` de 3 dígitos não casa com a regex de 6; `italic` em globals.css é isento |
| T1 × T1 | Hero consome HeroPainel | mesmo agente, sem conflito |

Coerência interna de cada tarefa: T0 cria tudo que T1–T5 importam (conferido nome a nome contra o plano).
T6 só integra. T7 só mede.

Ruling: **ComoComeca passa de papel para tinta.** — A decisão `2026-09-20-site-fundo-escuro-dominante`
diz "dois em papel (acompanhamento e como começa)", mas o protótipo B que ele aprovou olhando põe papel
só na virada e no acompanhamento. Entre o mapa de campos escrito antes e a forma que ele viu e escolheu,
vale a forma que ele viu; o próprio RESUMO da exploração já marcou "mapa de campos livre por direção"
como pendente de validação. — Custo se errado: uma linha de `campo` em `ComoComeca.tsx`.

Ruling: **sem commit em nenhuma tarefa.** — Regra da casa do Vinicius ("não commitar") vence o passo de
commit da skill; o SDD roda sobre a árvore de trabalho e os pacotes de revisão saem de `git diff`.
— Custo se errado: nenhuma recuperação por `git log`; o ledger e o `git diff` são o registro.

Tarefa 0: completa (fundação: globals.css, Secao, CabecaSecao, Folha, Numeral, NumeralGigante, Feixe; FeixeConexao apagado). Sem commit, por ruling.
Tarefa 3: implementador DONE_WITH_CONCERNS (Aquisicao.tsx, Retencao.tsx). Desvio declarado: TituloDestaque fora do Revelar — aceito, é o que o CabecaSecao faz.
Tarefa 4: implementador DONE_WITH_CONCERNS (OQueVoceVe.tsx, ComoComeca.tsx).
Controlador: corrigi a trava "lead" nos comentários de CabecaSecao.tsx e Secao.tsx (virou "abertura") e subi o Numeral "lg" de 64 para 72px no celular.
Tarefa 1: implementador DONE_WITH_CONCERNS (Hero.tsx reescrito, FaixaFunil.tsx novo, HeroPainel.tsx apagado). Ponto a conferir no olho: nome do nó quebra em duas linhas entre 1024 e 1360 px.
Tarefa 2: implementador DONE (DuasPortas.tsx, Virada.tsx). Verificador ok.
Tarefa 5: implementador DONE (Perguntas.tsx, CtaFinal.tsx).
Conferência visual do controlador: 5 achados (F1 rolagem horizontal em 1024; F2 bolha enviada colapsada; F3 FAQ sem filete em cima/embaixo; F4 min-h duplicado; F5 respiro do grupo no celular).
Correção 1: DONE, os 5 fechados e remedidos. Reverificação do controlador: verificador ok, tsc e eslint limpos, scrollWidth === innerWidth em 6 janelas.
Controlador: hora da Bolha de 65% para 90% de currentColor — contraste em texto desenhado era 3,33:1 sobre azul, virou 5,02:1.
Build de produção + Lighthouse: desktop 100/100/100/100, mobile 96/100/100/100 em 3 rodadas, CLS 0, TBT 0, JS inicial 215,9 KB gzip.
Capturas, medição, provas e teste do mesmo estúdio gerados em docs/validacao/b/. RESUMO.md escrito.
Revisão final: primeira tentativa travou lendo o pacote de 3.582 linhas de uma vez; redespachada em Sonnet, lendo os arquivos aos pedaços.
