# Achados da conferência visual e medida — rodada 1

Medido no preview em `http://localhost:3100`, Chrome headless, com
`docs/validacao/ferramentas/{medir-home,provar,capturar-home}.mjs`.

## F1 — REPROVA O PISO: rolagem horizontal em 1024 px

`src/components/secoes/FaixaFunil.tsx`

`document.documentElement.scrollWidth` = **1089** contra `innerWidth` = **1024**. O piso exige
`scrollWidth === innerWidth`. Medido também em 320, 390, 768, 1440 e 1920: todos limpos, só 1024 falha.

O culpado, medido elemento a elemento:

```
ol.flex.list-none.flex-col.items-start.gap-3.5.lg:flex-row…   right: 1089   width: 422
 └ li > span.superficie-escura…feixe-borda                     right: 1089   width: 142
```

A linha dos sete nós vira horizontal em `lg` (1024), mas os sete só cabem lado a lado a partir de
~1280. O relatório da tarefa 1 já tinha previsto isso (tirou o `whitespace-nowrap` para o rótulo
quebrar em vez de a linha vazar), mas a quebra de linha não basta: a linha continua vazando 65 px.

**Correção:** subir a virada de `lg:` para `xl:` em todo o `FaixaFunil.tsx` — direção do flex das
duas `<ol>` e do contêiner que as agrupa, feixe horizontal (`hidden lg:block` → `hidden xl:block`),
feixe vertical (`xl:hidden`), posição dos rótulos de grupo e qualquer padding que mude com a
orientação. Entre 1024 e 1280 vale a coluna com o feixe vertical, que é o mesmo gesto do celular.

**Conferir depois, com o servidor de pé:** `scrollWidth === innerWidth` em **1024, 1279, 1280, 1366
e 1440**, e que em 1280 os sete nós caibam numa linha sem vazar.

## F2 — a bolha enviada do marco 02 colapsa

`src/components/secoes/Aquisicao.tsx`

No desktop, a bolha "enviada" do esquema de "Conversa registrada" sai como uma pílula azul de ~40 px
de largura por 70 px de altura, em vez da bolha larga com as duas barras-fantasma dentro. A `Bolha`
sem filho renderiza duas `Barra` com largura percentual; num contexto que encolhe ao conteúdo, a
porcentagem colapsa. O protótipo resolve com `.esquema .bolha.enviada { width: 86% }`.

**Correção:** dar largura explícita à bolha enviada desse esquema (`className="w-[86%]"`, que é
isento da trava de métrica do verificador). Conferir que a recebida continua como está e que no
celular nada muda para pior.

## F3 — o FAQ não tem filete em cima nem embaixo

`src/components/secoes/Perguntas.tsx`

O `AccordionItem` usa `border-b last:border-b-0`, então a lista sai com filete só **entre** os itens:
nada acima do 01 e nada abaixo do 05. No protótipo (`.detalhe{border-top}` + `:last-child{border-bottom}`)
os cinco itens ficam fechados em cima e embaixo, e é isso que ancora o FAQ no campo agora que a
superfície em volta saiu.

**Correção:** fechar a lista com filete em cima e embaixo sem tocar em `src/components/ui/accordion.tsx`
— o caminho limpo é `border-y border-fio-escuro` no contêiner do `Accordion`.

## F4 — `lg:min-h-[640px]` duplicado

`src/components/secoes/CtaFinal.tsx`

Está na `Secao` e no `Container`. Sem efeito funcional, mas é a mesma regra escrita duas vezes.
Deixe só uma (a da `Secao`).

## F5 — respiro do segundo grupo da faixa no celular

`src/components/secoes/FaixaFunil.tsx`

No celular, o rótulo "RETENÇÃO" cai colado no nó "Fechou" (~30 px). No protótipo o segundo grupo
recebe 40 px de respiro de topo, e a separação entre os dois funis é justamente o que o rótulo
precisa comunicar. Aumente o respiro entre os dois grupos abaixo de `xl`.
