# Site institucional Lemis — design

Data: 2026-09-16. Worktree: `orca/workspaces/apl-digital/site-lemis-home`.

## Objetivo

Substituir a landing page da APL Digital por uma landing page única da Lemis, aplicando a identidade documentada em `Lemis/identidade-visual/` (fonte de verdade). Extrair princípios de upscaleadstudio.com (ritmo editorial, escala, respiro) e lakscompany.com.br (clareza de próximo passo, qualificação honesta), sem copiar layout nem copy. O resultado precisa parecer Lemis.

## Decisões confirmadas pelo dono (não perguntar de novo)

| Decisão | Resposta |
|---|---|
| Destino do CTA "Vamos conversar" | WhatsApp `5575988023044`, link `wa.me` com mensagem pré-preenchida. Centralizado em `src/lib/contato.ts`. |
| Dados legais no rodapé | Razão social APL Digital — Assessoria em Marketing, CNPJ 44.840.036/0001-59, Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG, CEP 30160-040 |
| Assinatura "Marketing, vendas e inteligência artificial." | **Não usar.** Nenhuma menção a IA no site. |
| Fotografia | Nenhuma. Composição tipográfica + motivo-conexão + ícones do sistema. |
| Prova | Não são números: é critério e processo. Zero métricas, cases, depoimentos, logos de clientes. |
| Trabalho de março/2026 não commitado | Descartado. Só os dados legais do rodapé vêm do código antigo. |
| Escopo | Landing única, sem páginas internas. Não commitar, não publicar. |

## Leitura das referências

**Upscalead** (dark, Geist + serif itálica + mono, grid de fios visíveis)
- O nome como âncora do hero, em escala display.
- Fios de grid estruturais com marcas de cruzamento; sistema numerado `01 / SEÇÃO`, `(001)`.
- Serviços como linhas expansíveis, não cards.
- Processo em colunas horizontais com rótulos mono.
- Uma ideia por tela; sessões longas, silenciosas; reveal on scroll.
- Fecho gigante no rodapé ("Desenhando o que vem a seguir.") + CTA.

**Laks** (dark quente, laranja/lima, fotografia, Elementor)
- Hero responde "o que vocês fazem" na primeira linha e já oferece a ação.
- "O que você recebe" em três passos; "o que acontece quando eu chamo" explicado.
- Checklist de situações para o leitor se reconhecer.
- Mesmo CTA repetido em ritmo ao longo da página.

**Princípios que a Lemis herda**: escala tipográfica corajosa e respiro (Upscalead); linhas em vez de cards; próximo passo explícito, qualificação honesta e CTA repetido (Laks).

**Descartado**: parede de métricas, gradientes, opacidade em texto, serif itálica (o sistema Lemis só tem Geist normal), mono como figurino, "diagnóstico gratuito", urgência, prova social, fotografia de fundador, rótulos numerados acima de todo título (kicker), grid de fios como decoração.

## Direção: "A conversa começa aqui"

Sorteio entre cinco estruturas derivadas do mundo Lemis (percurso-espinha, sequência de peças, conversa, dois campos, edição): saiu **conversa**.

**THESIS.** A Lemis vende proximidade e critério; o site não é um catálogo, é a primeira conversa. Cada seção é uma pergunta que quem decide sobre marketing faria, respondida com o que a Lemis faz e como. Recusa: hero + três cards + prova social.

**OWN-WORLD.** Papel `#F4F1EA` como campo dominante; tinta `#17191D` e azul `#304CFF` como campos-âncora sólidos. Geist variável local, 900 nos títulos, 400 no corpo. Wordmark em curvas. O gesto do **l** (desce e vira) é a gramática visual da página: a pergunta desce, a resposta vira para o lado. O motivo-conexão em traço grosso, sólido, sem gradiente.

**STORY.** Quem chega entende em segundos: "tráfego, criativos, páginas e CRM, conectados ao comercial, com quem cuida das campanhas". Lê o problema (volume não explica qualidade), vê o que é feito, como é feito, se reconhece, sabe o que acontece se chamar, tira dúvidas e chama no WhatsApp.

**FIRST VIEWPORT (1440×900).** Header 72px em papel com hairline: wordmark azul (128px de largura) à esquerda, nav de quatro perguntas ao centro-direita, botão azul "Vamos conversar" à direita. Hero em papel: coluna esquerda (7/12) com H1 "O próximo passo tem direção." em 900, ~88px, seguido do parágrafo de oferta (20px, máx. 52ch), botão azul e link secundário sublinhado "Ver como trabalhamos". À direita, sangrando pela borda superior e direita, um traço azul sólido (~40px) que desce e vira para a direita — o gesto do **l** em escala de página. Nada mais. Mobile (390): header com wordmark + botão-ícone de menu; traço azul menor (16px) descendo pela margem direita e saindo; H1 em ~44px; parágrafo; botão de largura total; link.

**FORM.** Conversa (3/5 da lista ordenada). Disciplina emprestada: escala e respiro do editorial; passos e qualificação do funil comercial.

**Interação de assinatura.** O conector azul de cada seção (haste vertical + retorno horizontal) se desenha conforme a seção entra na tela, por animação dirigida por scroll em CSS (`animation-timeline: view()`), dentro de `@supports` e `prefers-reduced-motion: no-preference`. Sem suporte ou com movimento reduzido: linha estática. Nenhuma animação por tempo além de transições de 160–240ms em opacidade/posição/cor.

## Arquitetura da página

Campo = fundo dominante. Ordem fixa. Sequência de campos: papel, tinta, papel, tinta, papel, azul, tinta.

| # | Seção | id | Campo | Pergunta (H2) | Conteúdo |
|---|---|---|---|---|---|
| — | Header | — | papel | — | Wordmark azul, nav (O que fazemos · Como trabalhamos · Para quem · Perguntas), botão "Vamos conversar". Sticky. Menu mobile. Skip link. |
| 0 | Hero | `inicio` | papel | — | H1 "O próximo passo tem direção.", parágrafo de oferta, botão + link. Traço azul sangrando. |
| 1 | Problema | `problema` | tinta | Por que os contatos chegam e as vendas não acompanham? | Afirmação em display + parágrafo. |
| 2 | O que fazemos | `o-que-fazemos` | papel | O que a Lemis faz? | Intro + cinco linhas (tráfego pago, criativos, páginas, CRM, acompanhamento comercial) com ícone, descrição e "inclui". Sem acordeão: tudo visível. |
| 3 | Como trabalhamos | `como-trabalhamos` | tinta | Como vocês trabalham? | Três fundamentos nas formulações públicas exatas + bloco "exemplo de conversa de acompanhamento". |
| 4 | Para quem | `para-quem` | papel | Isso é para o meu negócio? | Parágrafo de público + lista "Faz sentido conversar se:". |
| 5 | Próximo passo | `proximo-passo` | papel (hairline acima) | E se eu chamar agora, o que acontece? | Três passos numerados (a sequência carrega informação) + botão. |
| 6 | Perguntas | `perguntas` | papel (hairline acima) | Perguntas que aparecem antes da primeira conversa | Cinco `<details>` nativos. |
| 7 | CTA final | `contato` | azul | — | "Do interesse à conversa certa." em display branco, apoio, botão branco/azul, motivo-conexão em papel sangrando (como no story). |
| — | Footer | — | tinta | — | Wordmark branco, frase de apoio, nav, dados legais (sem ano: página estática). |

Padrão de seção (1–6): rótulo curto em caixa alta com o número da pergunta é **proibido**; o H2 é a pergunta. Desktop: grid 12 colunas; H2 na coluna 1–5 (sticky opcional), conector azul na coluna 6, resposta nas colunas 7–12. Mobile: empilhado, conector reduzido entre pergunta e resposta.

## Copy

Toda a copy vive em `src/lib/conteudo.ts`. Integralmente definida no plano de implementação. Regras:
- "nós" para a equipe, "você" para o interlocutor; sem "a gente".
- "contatos", "oportunidades", "vendas". "leads" não aparece.
- Verbos concretos: acompanhar, conectar, revisar, entender, ajustar.
- Nenhum número, métrica, depoimento, case, certificação, logo de cliente, prazo, preço ou "gratuito".
- Nenhuma menção a IA, agentes, automação, ferramentas próprias.
- Proibidos: "única", "a melhor", "método exclusivo", "revolucionar", "dominar", "escalar sem limites", "potencializar", "garantido", urgência/escassez.
- Mensagem principal: "O próximo passo tem direção." CTA: "Vamos conversar". Fecho: "Do interesse à conversa certa." Apoio: "Marketing próximo de quem decide. Execução conectada ao comercial."
- O exemplo de conversa ("Vamos comparar os contatos recebidos…") é apresentado como modelo de abordagem, nunca como registro de reunião.

## Sistema visual aplicado

- **Cores** (só estas): azul `#304CFF`, papel `#F4F1EA`, tinta `#17191D`, branco `#FFFFFF`, secundário claro `#666A73`, secundário escuro `#ADB2BD`, azul hover `#203AD9`, azul ativo `#182CAF`. Sem gradientes. Nenhum outro hex.
- **Contraste**: só pares aprovados. Secundário em papel/branco = `#666A73`; em tinta = `#ADB2BD`. Nunca opacidade em texto. Azul sobre tinta só em elemento gráfico ou texto ≥24px. Hairlines decorativas: `color-mix(in srgb, var(--tinta) 14%, transparent)` em papel e `color-mix(in srgb, var(--branco) 16%, transparent)` em tinta (não são texto nem controle). Bordas de controles: `#666A73` em claro, `#ADB2BD` em escuro (≥3:1).
- **Tipografia**: Geist variável local (`src/app/fonts/Geist.woff2`, `next/font/local`, `weight: "100 900"`, sem itálico). Display 900 `clamp(2.75rem, 6.5vw, 6rem)` / 1.02 / −0.04em; título 900 `clamp(2rem, 3.6vw, 3rem)` / 1.1 / −0.03em; subtítulo 600 20–24px / 1.25 / −0.015em; corpo 400 17–18px / 1.55; legenda 14px / 1.45; rótulo 600 12–13px caixa alta / +0.08em. Se Geist 900 colidir glifos no display, reduzir tracking para −0.03em e registrar no RESUMO.
- **Logo**: `Wordmark` e `Simbolo` como componentes React com os paths exatos dos SVGs mestres e `fill="currentColor"`; cor sempre azul, tinta ou branco. Proteção mínima de 18/106 da altura. Nunca símbolo ao lado do wordmark. Mínimo 100px. Favicon = símbolo azul (`src/app/icon.svg`). OG image gerada com `next/og` a partir dos paths.
- **Grid**: largura de leitura 1280px; margens 20px mobile, 32px tablet, 48–64px desktop; gutter 24px. Base 4px; módulos 8/16/24/32/48/64/96. Raio 8px em controles; blocos editoriais com cantos retos.
- **Composição**: alinhamento à esquerda; um foco por seção; contraste de escala; alternância de campos; sem sombras e cápsulas.
- **Motivo e conector**: SVG inline, `aria-hidden`, traço sólido com `stroke-linecap: butt`. Geometria derivada do `motivo-conexao.svg` (desce, curva, vira). Nunca como gráfico de resultado.
- **Ícones**: seis originais inline (`currentColor`, 24/32px, traço 1,5), `aria-hidden` quando acompanham rótulo visível.
- **Estados**: botão primário azul/branco, hover `#203AD9`, ativo `#182CAF`; botão sobre azul: branco/azul, hover papel. Foco: contorno 2px sólido, offset 3px; azul em claro, branco em tinta/azul. Links: sublinhados (`text-underline-offset: 0.18em`). Seleção de texto: azul/branco.
- **Movimento**: 160–240ms em opacidade/posição/cor; conector por scroll; sem loops. `prefers-reduced-motion` respeitado.

## Estrutura de arquivos

```
public/marca/logos/{lemis-azul,lemis-branco,lemis-grafite,simbolo-azul,simbolo-branco,simbolo-grafite}.svg
public/marca/icones/{aquisicao,atendimento,conexao,criacao,inteligencia,vendas,motivo-conexao}.svg
src/app/fonts/{Geist.woff2,OFL.txt,ORIGEM.md}
src/app/icon.svg
src/app/opengraph-image.tsx
src/app/layout.tsx
src/app/globals.css
src/app/page.tsx
src/lib/contato.ts
src/lib/conteudo.ts
src/components/marca/{Wordmark,Simbolo,Icone,Conector,Motivo}.tsx
src/components/ui/{Botao,Container,Secao}.tsx
src/components/secoes/{Header,Hero,Problema,Servicos,Fundamentos,ParaQuem,ProximoPasso,Perguntas,CtaFinal,Footer}.tsx
scripts/verificar-marca.mjs
RESUMO.md
docs/validacao/*.png
```

Removidos: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/favicon.ico`, `public/{file,globe,next,vercel,window}.svg`.

## Fora de escopo

Formulário com backend, blog, cases, fotografia, múltiplas rotas, i18n, analytics, PRODUCT.md/DESIGN.md do impeccable (o sistema já está documentado na identidade). Não commitar, não publicar.

## Validação

1. `npm run lint`, `npx tsc --noEmit`, `npm run build` sem erros.
2. `npm run verificar` (script de marca) sem violações.
3. agent-browser em 1440×900 e 390×844: screenshots do fold e da página completa; menu mobile; `<details>`; navegação por teclado com foco visível; `prefers-reduced-motion`.
4. Detector do impeccable (`detect.mjs`) sobre os arquivos alterados, uma vez.
5. Screenshots salvos em `docs/validacao/` e referenciados no RESUMO.md.

---

# Rodada 2 — profundidade, movimento e tecnologia (2026-09-16)

Feedback do dono, literal: "Eu até gostei, mas acho muito simples ainda. É melhor pegar algumas bibliotecas de UI e pegar componentes. Tá algo muito estático e infantil. Falta junção de tecnologia e efeitos mais dinâmicos, precisamos melhorar isso." Regra da casa: "Clean não é pelado: se ao tirar o texto sobra só foto e fundo liso, faltou design."

## Leitura de movimento das referências (agent-browser, 2ª visita)

**Upscalead**: Lenis (smooth scroll); reveals de opacidade 0,42–0,65s com `cubic-bezier(0.22, 1, 0.36, 1)`; hover em transform 0,28s; sombras em camadas com anel de 1px (`0 0 0 1px branco 8%` + `0 20px 50px -20px preto 50%`); `backdrop-filter: blur(8–12px)` no header e nos cards; glows radiais brancos a 6%; grain SVG (`feTurbulence`) com `noise-shift`; 4 canvases (arte do hero); marquee; anéis girando lentos; ponto "ao vivo" com ping; barra de progresso no serviço em foco; classes `motion-reduce`. Camadas: fundo com grid de fios → campo → card com anel e sombra → card em cima (mockups). **Laks**: Elementor com `fade` na entrada, `grow` no hover, logos flutuando (`float` 4–5s), swiper de logos, blur em vidro sobre foto, gradientes laranja.

**Princípios herdados**: (1) profundidade por anel de 1px + sombra suave + superfície levemente mais clara que o campo; (2) entrada por opacidade + deslocamento curto com ease-out longo; (3) hover que move e ilumina, não só recolore; (4) o fundo trabalha (padrão, grain, glow) sem competir com o texto; (5) tecnologia visível por linhas de conexão animadas e superfícies de interface.

## Direção da rodada 2

Mesmo mundo (paleta, Geist, wordmark, campos alternados, estrutura "conversa"), agora com três camadas por campo — fundo (padrão de pontos/grade + grain + glow azul), superfície (cards com anel de 1px e sombra) e conteúdo — e uma gramática de movimento única: **tudo entra de baixo com blur curto e ease-out longo; tudo que é conexão flui**.

1. **Hero**: o vazio da direita vira o **Painel de conexão**: superfície tinta com padrão de pontos e glow azul, contendo cinco nós (tráfego pago → criativos → páginas → CRM → acompanhamento comercial) ligados por **feixes animados** desenhados no gesto do "l" (desce, vira, segue). O feixe é um pulso azul percorrendo a linha; sem movimento reduzido vira linha estática. O painel tem parallax leve no scroll e inclinação sutil ao mouse (só `pointer: fine`). O traço azul gigante da rodada 1 sai: o gesto agora está nos feixes e nos conectores. H1 entra palavra por palavra.
2. **Problema (tinta)**: padrão de pontos, holofote azul que segue o cursor, afirmação entrando palavra por palavra.
3. **O que fazemos (papel)**: cinco **cards** em bento (3 + 2), superfície branca, anel de 1px, sombra suave, ícone em ladrilho azul, "inclui" com marcas de check; hover com **holofote no card** (realce radial azul seguindo o mouse), elevação e sombra mais funda; entrada escalonada.
4. **Como trabalhamos (tinta)**: três cards escuros (superfície tinta+5% branco, anel branco 12%) com **feixe de borda** azul girando no hover; padrão de grade; o exemplo de conversa vira uma **mensagem** (avatar com o símbolo, "Lemis", a fala) — superfície de interface honesta, já que a conversa acontece pelo WhatsApp.
5. **Para quem (papel)**: lista em card branco com checks azuis que entram em sequência.
6. **Próximo passo (papel)**: três cards com número em disco azul, ligados por uma linha de progresso que se desenha no scroll.
7. **Perguntas (papel)**: **Accordion shadcn/ui** (Radix) em card branco, abertura animada.
8. **CTA final (azul)**: padrão de pontos branco, glow, motivo em papel, título palavra por palavra.
9. **Header**: barra flutuante em vidro (papel 78% + blur 12px + anel), com sombra ao rolar.
10. **Global**: Lenis (inércia no scroll), grain SVG estático a 6% sobre tudo, botões com seta que desliza no hover e escala no clique, `Revelar` (opacidade + 24px + blur 6px → 0, 0,7s, ease `[0.22,1,0.36,1]`) em todos os blocos.

## Bibliotecas e justificativa

| Pacote | Por quê |
|---|---|
| `motion` (framer-motion) via `LazyMotion` + `domAnimation` | reveals em view, palavra por palavra, parallax, `MotionConfig reducedMotion="user"` respeita o sistema |
| `lenis` | inércia no scroll com `prefers-reduced-motion` desligando |
| `@radix-ui/react-accordion` + `clsx` + `tailwind-merge` (shadcn/ui accordion copiado para o projeto) | acordeão acessível com animação de altura |
| Efeitos (feixe de conexão, feixe de borda, holofote, padrões de pontos/grade, grain) | escritos no projeto a partir dos padrões Magic UI / Aceternity, na paleta Lemis; sem dependência extra |

## Regras que não mudam

Paleta; pares de contraste em texto; nenhuma opacidade em texto (alfa só em superfícies, bordas e elementos gráficos); `prefers-reduced-motion` desliga Lenis, feixes, holofotes, inclinação e reduz reveals a opacidade; copy intacta; sem IA/números/cases/fotos. Orçamento: JS ≤ 230 KB gzip; Lighthouse mobile performance ≥ 90; LCP mobile ≤ 2,5s. Se um efeito estourar o orçamento, o efeito sai.

Tensão declarada: o sistema visual diz "sem loop decorativo contínuo"; o dono pediu feixes animados. Os feixes são loops lentos e comunicam o fluxo (não decoração pura); ficam desligados com movimento reduzido. Registrado no RESUMO.
