# Site Lemis — resumo da entrega

Data: 2026-09-16. Worktree: `orca/workspaces/apl-digital/site-lemis-home` (branch `viniciusneri2809-bot/site-lemis-home`). Tudo está no working tree: **nada foi commitado, mesclado, publicado ou implantado.** `git status` mostra o diff completo contra o último commit publicado (`9bdf158`).

Duas rodadas no mesmo dia. A rodada 1 construiu o site do zero sobre a identidade Lemis. A rodada 2 respondeu ao feedback do dono ("muito simples, estático e infantil; falta junção de tecnologia e efeitos mais dinâmicos") com bibliotecas de UI, profundidade, movimento e tecnologia visível — sem tocar na copy nem nas regras da marca.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # link de WhatsApp
npm run verificar  # verificação de marca: palavras proibidas, cores fora da paleta, alfa em texto, "APL" fora do rodapé
npm run build
```

Node 22.18+ (`.nvmrc` = 22; `engines` no package.json).

Processo: brainstorming → spec (`docs/superpowers/specs/2026-09-16-site-lemis-design.md`, com a seção "Rodada 2") → planos (`docs/superpowers/plans/2026-09-16-site-lemis.md` e `…-rodada2.md`) → subagentes em paralelo → revisões por lote → passe de design com capturas em viewport real → um lote de correções por rodada → revisão final do branch. Ledgers com todas as decisões: `.superpowers/sdd/*/progress.md` (pasta ignorada pelo git).

---

## Rodada 2 — o que mudou

### Bibliotecas instaladas e por quê

| Pacote | Versão | Por quê | Custo |
|---|---|---|---|
| `motion` (Framer Motion) | 13.4 | Reveals em view, texto palavra a palavra, parallax, inclinação com mola, `MotionConfig reducedMotion="user"` para respeitar o sistema. Carregado via `LazyMotion` + `domAnimation` + `m.*` (o pacote mínimo de recursos) | ~30 KB gz |
| `lenis` | 1.3 | Inércia no scroll (o "peso" de site de estúdio). Import dinâmico depois da hidratação, só com `pointer: fine` e sem movimento reduzido | ~9 KB gz, fora do bundle inicial |
| `@radix-ui/react-accordion` | 1.2 | Base do Accordion do shadcn/ui (copiado para `src/components/ui/accordion.tsx` e adaptado à paleta): teclado, ARIA e animação de altura | ~10 KB gz |
| `clsx` | 2.1 | `cn()` do shadcn (sem `tailwind-merge`: removido para caber no orçamento) | <1 KB |

Efeitos escritos no projeto a partir dos padrões Magic UI / Aceternity, na paleta Lemis e sem dependência extra (`src/components/efeitos/`): `FeixeConexao` (animated beam), `FeixeBorda` via CSS (border beam), `Holofote` (spotlight que segue o cursor), `CartaoHolofote` (card spotlight + elevação), `PadraoPontos`/`PadraoGrade` (dot/grid pattern), `Glow`, `Grao` (grain), `Revelar`, `Palavras`, `PalavrasHero`, `Parallax`, `Inclinacao`, `LinhaProgresso`.

### Efeitos adicionados e o que cada um comunica

| Onde | Efeito | O que comunica |
|---|---|---|
| Header | Barra flutuante em vidro (papel 90% + blur 12px + anel de 1px) que ganha sombra ao rolar | Interface, não documento |
| Hero, esquerda | H1 palavra a palavra por CSS desde o primeiro paint; parágrafo e botões entram em sequência | Direção, sem depender de JS |
| Hero, direita | **Painel de conexão**: superfície tinta com padrão de pontos e glow azul; cinco nós (tráfego pago → criativos → páginas → CRM → acompanhamento comercial) ligados por **feixes animados no gesto do "l"** (desce, vira, segue); o nó final tem feixe de borda permanente; parallax no scroll e inclinação sutil ao mouse | O posicionamento inteiro em um diagrama vivo: as quatro frentes fluem para o comercial. Resolve o vazio da direita |
| Problema (tinta) | Padrão de pontos, glow, holofote azul seguindo o cursor, afirmação palavra a palavra | Campo escuro que reage |
| O que fazemos (papel) | Bento 3 + 2 de **cards** brancos com anel de 1px, sombra suave, ícone em ladrilho azul e checks; quinto card escuro (acompanhamento comercial) com padrão de pontos; hover: elevação 4px, borda azul e realce radial no cursor; entrada escalonada | Cada frente é um objeto com peso; o acompanhamento é o destaque |
| Como trabalhamos (tinta) | Padrão de grade, três cards escuros com **feixe de borda** girando no hover; o exemplo de conversa vira uma **mensagem** com o símbolo Lemis como avatar | Critério como interface; a conversa acontece de verdade pelo WhatsApp |
| Para quem (papel) | Card branco com checks em disco azul entrando em sequência | Reconhecimento |
| Próximo passo (papel) | Linha azul que se desenha em view + três cards com número em disco | Sequência |
| Perguntas (papel) | Accordion shadcn/ui em card branco, abertura animada, ícone girando | Componente de produto |
| CTA final (azul) | Padrão de pontos branco, glow, motivo em papel, título palavra a palavra | Fecho |
| Global | Grain SVG estático (ladrilho, `soft-light`, ~7% efetivo), Lenis, botões com seta deslizando e escala no clique, `Revelar` (opacidade + 24px + blur 6→0, 0,7s, ease `[0.22,1,0.36,1]`) | Textura e ritmo únicos na página inteira |

Gramática: **tudo entra de baixo com blur curto e ease-out longo; tudo que é conexão flui.** Três camadas por campo: fundo (padrão + grain + glow), superfície (anel de 1px + sombra), conteúdo.

### Movimento reduzido (verificado com Chrome `--force-prefers-reduced-motion`)

Lenis não é instanciado; feixes ficam como linha estática azul; feixe de borda vira anel estático; conector das seções estático; inclinação e holofote desligados; reveals sem deslocamento (o `MotionConfig` torna transforms instantâneos); acordeão sem animação de altura; H1 e página inteira visíveis. Captura: `docs/validacao/desktop-movimento-reduzido.png`. Sem JavaScript, um `<noscript>` restaura a opacidade de tudo que o motion serve invisível.

### Antes / depois (build de produção, Lighthouse 13, `localhost`)

| Métrica | Rodada 1 | Rodada 2 | Meta |
|---|---|---|---|
| JS inicial (gzip) | 165 KB | 223 KB | ≤ 230 KB |
| CSS (gzip) | 5 KB | 8 KB | — |
| Lighthouse desktop (perf / a11y / bp / seo) | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | ≥ 90 |
| Lighthouse mobile | 98 / 100 / 100 / 100 | 96 / 100 / 100 / 100 | ≥ 90 |
| LCP mobile (simulado, slow 4G) | 2,2 s | 2,8 s | ≤ 2,5 s |
| TBT mobile | 80 ms | 30 ms | — |
| CLS | 0 | 0 | 0 |

O LCP mobile é o H1; o "element render delay" medido é 60 ms — a estimativa simulada cresce com o peso de JS/HTML em rede lenta, não com a animação. Cortar mais efeito não muda a estimativa sem cortar as bibliotecas pedidas. O que foi feito para conter: `LazyMotion` mínimo, Lenis dinâmico e só em ponteiro fino, `tailwind-merge` removido, hero acima da dobra animado por CSS (sem esperar hidratação). Registrado como limitação.

### Capturas

| Captura | Arquivo |
|---|---|
| Desktop 1440×900, hero com painel de conexão | `docs/validacao/desktop-hero.png` |
| Problema (pontos, glow, conector) | `docs/validacao/desktop-problema.png` |
| Serviços em bento | `docs/validacao/desktop-servicos.png` |
| Card de serviço em hover (elevação + holofote) | `docs/validacao/desktop-servicos-hover.png` |
| Como trabalhamos (grade, cards, mensagem) | `docs/validacao/desktop-fundamentos.png` |
| Card de fundamento em hover (feixe de borda) | `docs/validacao/desktop-fundamentos-hover.png` |
| Próximo passo | `docs/validacao/desktop-proximo-passo.png` |
| Perguntas com item aberto | `docs/validacao/desktop-perguntas.png` |
| CTA final | `docs/validacao/desktop-cta-final.png` |
| Desktop com movimento reduzido (hero e serviços) | `docs/validacao/desktop-movimento-reduzido.png`, `…-servicos.png` |
| Mobile 390×844: hero, painel, serviços, CTA, menu | `docs/validacao/mobile-hero.png`, `mobile-painel.png`, `mobile-servicos.png`, `mobile-cta-final.png`, `mobile-menu.png` |
| Rodada 1 (referência) | `docs/validacao/rodada1/` |

Conferido no navegador: sem overflow horizontal em 320, 390 e 1440; feixes do painel com geometria correta em 1440 e 390; espaçamento entre palavras dos títulos animados; hover medido (translateY −4px, borda azul 35%, holofote ligado; feixe de borda com animação ativa no hover); acordeão abre e fecha; menu mobile com foco de volta ao botão no Escape; skip link para `main` focável.

### O que ficou de fora e por quê

- **Marquee** de mensagens: loop puramente decorativo; o sistema visual veta e não comunica nada.
- **Cursor customizado**: custo de acessibilidade sem ganho.
- **Canvas/WebGL** no hero: o painel de conexão comunica o posicionamento com SVG e CSS, dentro do orçamento.
- **Grain animado** (`noise-shift` da referência): o ladrilho estático dá a textura sem custo por frame.
- **Copy nova**: rodada de design; o rótulo do painel do hero reaproveita "Do interesse à conversa certa." (aprovada). Se o dono quiser uma legenda própria para o painel, é uma linha em `conteudo.ts`.

### Tensões declaradas

- O sistema visual diz "sem loop decorativo contínuo"; o dono pediu feixes animados. Os feixes são loops lentos (3,2 s) que comunicam o fluxo entre as frentes, e desligam com movimento reduzido. Se quiser voltar atrás, é uma regra CSS (`feixe-correr`).
- Raio de 16px nas superfícies (o sistema define 8px para controles e cantos retos para peças editoriais). Controles seguem 8px; cards elevados usam 16px.
- `t-controle` (16px/600) para botões/nav/links, criado na rodada 1 — dentro das faixas do sistema, mas não estava na tabela.

---

## Rodada 1 — o que foi feito (resumo)

Landing única da Lemis em Next.js 16 (App Router), React 19, Tailwind 4 e TypeScript, construída do zero sobre a identidade documentada em `Lemis/identidade-visual/`. O site antigo da APL Digital foi descartado por inteiro; só os dados legais do rodapé vieram do código anterior.

### Estrutura "conversa"

Cinco estruturas foram derivadas do mundo Lemis e uma foi sorteada para evitar o layout padrão de agência: saiu "conversa". Cada seção é uma pergunta que quem decide sobre marketing faria (H2 em voz baixa, coluna esquerda), respondida pela Lemis em voz alta (afirmação grande, coluna direita), ligadas pelo **gesto do "l"** do wordmark (desce e vira), que se desenha com o scroll.

| Campo | Seção | Pergunta (H2) | Resposta |
|---|---|---|---|
| papel | Hero | — | "O próximo passo tem direção." + oferta + painel de conexão |
| tinta | Problema | Por que os contatos chegam e as vendas não acompanham? | Volume não explica a qualidade da demanda nem o avanço das conversas. |
| papel | O que fazemos | O que a Lemis faz? | Quatro frentes, um processo comercial. Cinco cards |
| tinta | Como trabalhamos | Como vocês trabalham? | Três fundamentos nas formulações públicas + exemplo de conversa |
| papel | Para quem | Isso é para o meu negócio? | Empresas de serviços de alto valor + "Faz sentido conversar se" |
| papel | Próximo passo | E se eu chamar agora, o que acontece? | Três passos + botão |
| papel | Perguntas | Perguntas que aparecem antes da primeira conversa | Cinco perguntas |
| azul | CTA final | — | "Do interesse à conversa certa." + botão + motivo em papel |
| tinta | Rodapé | — | Wordmark branco, apoio, navegação, WhatsApp, APL Digital, CNPJ, endereço |

Todos os botões "Vamos conversar" abrem `https://wa.me/5575988023044` com mensagem pré-preenchida ("Olá, Lemis. Quero conversar sobre o próximo passo do meu negócio."), centralizado em `src/lib/contato.ts`.

### Decisões que continuam valendo

1. Campos sólidos alternados (papel → tinta → papel → tinta → papel → azul → tinta); sem gradiente azul-ciano, sem triângulo.
2. Tipografia estritamente Geist variável local (`next/font/local`), escala do sistema nas classes `t-*`; display 900 com tracking −0,04em sem colisão de glifos.
3. Contraste só com os pares aprovados; secundário `#666A73` em papel, `#ADB2BD` em tinta, branco em azul; nenhuma opacidade em texto (alfa só em superfícies, bordas e gráficos).
4. Sem kicker numerado acima dos títulos; rótulos em caixa alta só onde carregam informação.
5. A prova é critério e processo: sem números, cases, depoimentos ou logos.
6. Copy integralmente em `src/lib/conteudo.ts`, a partir de `identidade.md`: "nós"/"você", verbos concretos, sem "leads", sem IA, sem urgência.
7. Marca em código: wordmark, símbolo, seis ícones e motivo como componentes React com os paths exatos dos SVGs mestres; favicon = símbolo azul; imagem OG gerada com `next/og` (wordmark branco + motivo azul sobre tinta, sem texto).
8. Rodapé com "© APL Digital" sem ano (página estática).

### Referências, traduzidas e não copiadas

De upscaleadstudio.com: escala tipográfica e respiro (rodada 1); Lenis, reveals com ease-out longo, anel de 1px + sombra em camadas, glass no header, glow, grain, padrões (rodada 2). De lakscompany.com.br: hero que diz o que faz e oferece a ação, "o que acontece quando eu chamo", lista de situações, CTA repetido (rodada 1); cards com superfície e hover que responde (rodada 2). Descartados: métricas, serif itálica, mono, gradientes laranja/ciano, fotografia de fundador, "diagnóstico gratuito", urgência, marquee.

## Limitações declaradas

- **Domínio.** Não há domínio confirmado para a Lemis; `metadataBase` só é definido se `NEXT_PUBLIC_SITE_URL` existir (o build avisa). Definir na Vercel quando o domínio for decidido. A meta `facebook-domain-verification` foi mantida do site antigo.
- **LCP mobile simulado 2,8 s** (meta 2,5 s): ver "Antes / depois".
- **Firefox** não suporta `animation-timeline: view()`: o conector das seções aparece estático (fallback previsto). Os demais efeitos usam motion/CSS padrão.
- **Imagem OG sem texto** (satori + fonte variável). Se o dono quiser a frase na imagem, é preciso um arquivo de fonte estático de peso único.
- **Id estático no `<title>` do `Wordmark`/`Simbolo`**: só importa se duas instâncias receberem `titulo` (hoje nenhuma recebe).
- **Grain e glows** são camadas com blend/blur: medidos sem impacto no Lighthouse, mas em aparelhos muito fracos podem custar quadros; todos são elementos gráficos removíveis por classe.
- Nenhum commit, merge, deploy ou publicação foi feito.

## Rulings tomados sem perguntar (para o gerente rever)

Rodada 1: implementadores não commitam; tasks disjuntas em paralelo; falsos positivos do verificador corrigidos no script; `t-controle` (16px/600) no lugar de tamanhos arbitrários; ano do rodapé removido; motivo do CTA recortado com a haste vindo do topo; id do wordmark deixado como está.

Rodada 2: feixes animados aceitos como loop que comunica fluxo (desligam com movimento reduzido); refs do painel em wrappers estáticos (no Chromium, ancestral com `transform` vira `offsetParent`); hero acima da dobra animado por CSS + `<noscript>`; rótulo do painel reaproveita a mensagem do CTA (sem copy nova); LCP mobile simulado 2,8 s aceito e documentado; Lenis só em ponteiro fino; `tailwind-merge` removido para caber no orçamento; verificador de marca passou a ignorar percentuais técnicos (CSS, SVG, `mask-image`, gradientes).
