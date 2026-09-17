# Site Lemis — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir do zero a landing page única da Lemis em Next.js, aplicando integralmente a identidade visual, com a estrutura "conversa" aprovada na spec.

**Architecture:** App Router com uma rota (`/`), Server Components por padrão; só `Header` é client (menu mobile). Toda a copy vive em `src/lib/conteudo.ts`; o contato em `src/lib/contato.ts`. Tokens de cor/tipo em `globals.css` via `@theme` do Tailwind v4; classes de tipografia (`t-*`) e de campo (`campo-*`) em `@layer components`. Marca (wordmark, símbolo, ícones, conector, motivo) como componentes React com os paths exatos dos SVGs mestres.

**Tech Stack:** Next.js 16.1.6, React 19.2, Tailwind CSS 4, TypeScript 5, `next/font/local` (Geist variável), `next/og` para a imagem OG. Sem dependências novas.

**Spec:** `docs/superpowers/specs/2026-09-16-site-lemis-design.md`

## Global Constraints

- **Cores permitidas (únicos hex no `src/`)**: `#304CFF` azul, `#F4F1EA` papel, `#17191D` tinta, `#FFFFFF` branco, `#666A73` secundário claro, `#ADB2BD` secundário escuro, `#203AD9` azul hover, `#182CAF` azul ativo. Sem gradientes. Sem `opacity-*` em texto. Sem modificadores de alfa em cor de texto/fundo (`text-branco/60` é proibido). Hairlines só via os tokens `fio-claro`/`fio-escuro`.
- **Pares de contraste**: texto secundário em papel/branco = `secundario` (#666A73); em tinta = `secundario-escuro` (#ADB2BD); em azul = branco. Azul sobre tinta só em elemento gráfico (conector/motivo) ou texto ≥ 24px.
- **Tipografia**: só Geist (local, variável 100–900), sem itálico. Classes `t-display`, `t-titulo`, `t-sub`, `t-lead`, `t-corpo`, `t-legenda`, `t-rotulo` definidas em `globals.css`. Nunca `font-mono`, nunca fontes do sistema como display.
- **Copy**: só o que está em `src/lib/conteudo.ts` deste plano. Sem números/métricas/cases/depoimentos/logos; sem "IA", "inteligência artificial", "agente", "automação"; sem "única", "a melhor", "exclusivo", "garantido", "grátis/gratuito", urgência; sem "leads". Nome sempre "Lemis". "APL" só em `conteudo.ts` (bloco `rodape`) e `Footer.tsx`.
- **Nome dos arquivos e exports** exatamente como neste plano (outros tasks importam pelos nomes).
- **Movimento**: transições 200ms em cor/opacidade/transform; o conector se desenha por `animation-timeline: view()` dentro de `@supports` + `prefers-reduced-motion: no-preference`. Nada mais anima.
- **Acessibilidade**: skip link; foco visível 2px sólido offset 3px; ícones decorativos `aria-hidden`; links externos com `rel="noopener noreferrer"` e texto oculto "(abre em nova aba)"; links sublinhados ou com outra marca além da cor.
- **Não commitar, não publicar, não rodar deploy.** Deixar tudo no working tree.
- Comandos rodam a partir de `/Users/viniciusneri/orca/workspaces/apl-digital/site-lemis-home`. Não usar `cd` para fora.
- Identidade (fonte dos assets): `/Users/viniciusneri/orca/workspaces/APL-Digital/interno-identidade-visual/Lemis/identidade-visual/`.

---

## Mapa de arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `src/app/fonts/Geist.woff2`, `OFL.txt`, `ORIGEM.md` | fonte local + licença | 1 |
| `public/marca/logos/*.svg`, `public/marca/icones/*.svg` | assets mestres copiados | 1 |
| `src/app/icon.svg` | favicon = símbolo azul | 1 |
| `src/app/globals.css` | tokens, tipografia, campos, base, conector | 1 |
| `src/app/layout.tsx` | fonte, metadata, skip link | 1 |
| `src/app/opengraph-image.tsx` | imagem OG (wordmark + motivo) | 1 |
| `src/app/page.tsx` | composição das seções | 1 (placeholder), 6 (final) |
| `src/lib/contato.ts` | WhatsApp | 1 |
| `scripts/contato.test.mjs`, `scripts/verificar-marca.mjs` | teste do link + verificação de marca | 1 |
| `src/lib/conteudo.ts` | toda a copy tipada | 2 |
| `src/components/marca/{Wordmark,Simbolo,Icone,Conector,Motivo}.tsx` | marca | 2 |
| `src/components/ui/{Container,Botao,Secao}.tsx` | layout e controles | 2 |
| `src/components/secoes/{Header,Hero,Footer}.tsx` | moldura | 3 |
| `src/components/secoes/{Problema,Servicos,Fundamentos}.tsx` | seções 1–3 | 4 |
| `src/components/secoes/{ParaQuem,ProximoPasso,Perguntas,CtaFinal}.tsx` | seções 4–7 | 5 |
| `docs/validacao/*.png`, `RESUMO.md` | validação e entrega | 7, 8 |

Removidos na Task 1: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/favicon.ico`, `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`.

Paralelismo: Tasks 1 e 2 em paralelo (arquivos disjuntos). Tasks 3, 4 e 5 em paralelo depois de 1 e 2. Tasks 6–8 sequenciais.

---

### Task 1: Fundação A — assets, fonte, tokens, layout, contato, verificação

**Files:**
- Create: `src/app/fonts/Geist.woff2`, `src/app/fonts/OFL.txt`, `src/app/fonts/ORIGEM.md` (cópias)
- Create: `public/marca/logos/lemis-azul.svg`, `lemis-branco.svg`, `lemis-grafite.svg`, `simbolo-azul.svg`, `simbolo-branco.svg`, `simbolo-grafite.svg` (cópias)
- Create: `public/marca/icones/aquisicao.svg`, `atendimento.svg`, `conexao.svg`, `criacao.svg`, `inteligencia.svg`, `vendas.svg`, `motivo-conexao.svg` (cópias)
- Create: `src/app/icon.svg`
- Modify: `src/app/globals.css` (substituir inteiro)
- Modify: `src/app/layout.tsx` (substituir inteiro)
- Create: `src/app/opengraph-image.tsx`
- Modify: `src/app/page.tsx` (placeholder temporário)
- Create: `src/lib/contato.ts`
- Create: `scripts/contato.test.mjs`
- Create: `scripts/verificar-marca.mjs`
- Modify: `package.json` (scripts)
- Delete: `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/app/favicon.ico`, `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

**Interfaces:**
- Produces: `src/lib/contato.ts` → `WHATSAPP_NUMERO: string`, `WHATSAPP_MENSAGEM: string`, `linkWhatsApp(mensagem?: string): string`, `LINK_WHATSAPP: string`.
- Produces: classes CSS `t-display t-titulo t-sub t-lead t-corpo t-legenda t-rotulo campo-papel campo-tinta campo-azul conector skip-link`; tokens Tailwind `azul papel tinta branco secundario secundario-escuro azul-hover azul-ativo fio-claro fio-escuro`; `--font-geist`.
- Produces: `npm run verificar`, `npm test`.

- [ ] **Step 1: Copiar assets e remover arquivos antigos**

```bash
ID=/Users/viniciusneri/orca/workspaces/APL-Digital/interno-identidade-visual/Lemis/identidade-visual
mkdir -p src/app/fonts public/marca/logos public/marca/icones scripts docs/validacao
cp "$ID/assets/fonts/Geist.woff2" "$ID/assets/fonts/OFL.txt" "$ID/assets/fonts/ORIGEM.md" src/app/fonts/
cp "$ID"/assets/logos/*.svg public/marca/logos/
cp "$ID"/assets/icones/*.svg public/marca/icones/
cp "$ID/assets/logos/simbolo-azul.svg" src/app/icon.svg
rm -f src/components/Header.tsx src/components/Footer.tsx src/app/favicon.ico public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
shasum -a 256 src/app/fonts/Geist.woff2
```
Esperado: hash `2ffebe993e969069a9789d15164b7715d42491b5835516c5e3b935d5f81b05f1` (igual ao `ORIGEM.md`).

- [ ] **Step 2: Escrever o teste do link de WhatsApp (falha primeiro)**

`scripts/contato.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { linkWhatsApp, LINK_WHATSAPP, WHATSAPP_NUMERO } from "../src/lib/contato.ts";

test("número centralizado", () => {
  assert.equal(WHATSAPP_NUMERO, "5575988023044");
});

test("link padrão usa wa.me com mensagem codificada", () => {
  assert.ok(LINK_WHATSAPP.startsWith("https://wa.me/5575988023044?text="));
  assert.ok(LINK_WHATSAPP.includes(encodeURIComponent("Lemis")));
  assert.ok(!LINK_WHATSAPP.includes(" "));
});

test("mensagem personalizada", () => {
  assert.equal(linkWhatsApp("oi"), "https://wa.me/5575988023044?text=oi");
});
```
Adicionar em `package.json` → `"scripts"`: `"test": "node --test scripts/contato.test.mjs"` e `"verificar": "node scripts/verificar-marca.mjs"`.

- [ ] **Step 3: Rodar o teste e ver falhar**

Run: `npm test`
Esperado: falha por módulo `../src/lib/contato.ts` inexistente.

- [ ] **Step 4: Implementar `src/lib/contato.ts`**

```ts
export const WHATSAPP_NUMERO = "5575988023044";

export const WHATSAPP_MENSAGEM =
  "Olá, Lemis. Quero conversar sobre o próximo passo do meu negócio.";

export function linkWhatsApp(mensagem: string = WHATSAPP_MENSAGEM): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const LINK_WHATSAPP = linkWhatsApp();
```

- [ ] **Step 5: Rodar o teste e ver passar**

Run: `npm test`
Esperado: 3 testes passando. (Node ≥ 22.18 faz type-stripping de `.ts` por padrão; se falhar por sintaxe, rodar `node --experimental-strip-types --test scripts/contato.test.mjs`.)

- [ ] **Step 6: Escrever `src/app/globals.css`** (substituir o conteúdo inteiro)

```css
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-azul: #304cff;
  --color-papel: #f4f1ea;
  --color-tinta: #17191d;
  --color-branco: #ffffff;
  --color-secundario: #666a73;
  --color-secundario-escuro: #adb2bd;
  --color-azul-hover: #203ad9;
  --color-azul-ativo: #182caf;
  --color-fio-claro: color-mix(in srgb, #17191d 14%, transparent);
  --color-fio-escuro: color-mix(in srgb, #ffffff 16%, transparent);

  --font-sans: var(--font-geist), Arial, sans-serif;

  --radius-*: initial;
  --radius-md: 8px;
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5.5rem;
    -webkit-text-size-adjust: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  ::selection {
    background: var(--color-azul);
    color: var(--color-branco);
  }
  :focus-visible {
    outline: 2px solid var(--cor-foco, var(--color-azul));
    outline-offset: 3px;
  }
  summary::-webkit-details-marker {
    display: none;
  }
}

@layer components {
  /* Campos: cada um define a cor de foco para os controles dentro dele. */
  .campo-papel {
    background-color: var(--color-papel);
    color: var(--color-tinta);
    --cor-foco: var(--color-azul);
  }
  .campo-tinta {
    background-color: var(--color-tinta);
    color: var(--color-branco);
    --cor-foco: var(--color-branco);
  }
  .campo-azul {
    background-color: var(--color-azul);
    color: var(--color-branco);
    --cor-foco: var(--color-branco);
  }

  /* Escala tipográfica (sistema-visual.md §3). */
  .t-display {
    font-weight: 900;
    font-size: clamp(2.75rem, 6.5vw, 6rem);
    line-height: 1.02;
    letter-spacing: -0.04em;
    text-wrap: balance;
  }
  .t-titulo {
    font-weight: 900;
    font-size: clamp(2rem, 3.6vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }
  .t-sub {
    font-weight: 600;
    font-size: clamp(1.25rem, 1.6vw, 1.5rem);
    line-height: 1.25;
    letter-spacing: -0.015em;
    text-wrap: pretty;
  }
  .t-lead {
    font-weight: 400;
    font-size: clamp(1.125rem, 1.5vw, 1.25rem);
    line-height: 1.5;
    text-wrap: pretty;
  }
  .t-corpo {
    font-weight: 400;
    font-size: 1.0625rem;
    line-height: 1.55;
    text-wrap: pretty;
  }
  @media (min-width: 768px) {
    .t-corpo {
      font-size: 1.125rem;
    }
  }
  .t-legenda {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.45;
  }
  .t-rotulo {
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1.4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .skip-link {
    position: absolute;
    left: 1rem;
    top: -100%;
    z-index: 100;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    background: var(--color-azul);
    color: var(--color-branco);
    font-weight: 600;
  }
  .skip-link:focus {
    top: 1rem;
  }

  /* Conector: desenha-se com o scroll; estático sem suporte ou com movimento reduzido. */
  .conector path {
    stroke-dasharray: 1 1;
    stroke-dashoffset: 0;
  }
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .conector path {
        stroke-dashoffset: 1;
        animation: conector-desenhar linear both;
        animation-timeline: view(block);
        animation-range: entry 0% cover 35%;
      }
    }
  }
  @keyframes conector-desenhar {
    to {
      stroke-dashoffset: 0;
    }
  }
}
```

- [ ] **Step 7: Escrever `src/app/layout.tsx`** (substituir inteiro)

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Lemis — O próximo passo tem direção",
  description:
    "Tráfego pago, criativos, páginas e CRM conectados ao processo comercial de empresas de serviços de alto valor, com acompanhamento de quem cuida das campanhas.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: "Lemis — O próximo passo tem direção",
    description:
      "Marketing próximo de quem decide. Execução conectada ao comercial.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  other: {
    "facebook-domain-verification": "fwwylg5o7law0r7vi5cdw00gm23aw8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="campo-papel font-sans">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Escrever `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const alt = "Lemis — O próximo passo tem direção.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#17191D",
        }}
      >
        <svg
          viewBox="0 0 368 106"
          width="416"
          height="120"
          style={{ position: "absolute", left: 96, top: 96 }}
        >
          <g fill="#FFFFFF" fillRule="evenodd">
            <path d="M4 4H22V75Q22 83 30 83H42V100H28Q4 100 4 76Z" />
            <path d="M119 70H66C68 81 75 86 86 86C94 86 101 83 107 78L117 89C109 98 98 102 85 102C61 102 47 86 47 64C47 41 62 26 83 26C106 26 119 42 119 64ZM66 57H101C99 47 93 42 83 42C74 42 68 47 66 57Z" />
            <path d="M132 28H149V37C154 30 161 26 170 26C181 26 190 31 194 39C200 30 208 26 220 26C239 26 249 39 249 59V100H231V61C231 49 227 43 218 43C208 43 201 50 201 62V100H183V61C183 49 179 43 170 43C159 43 150 51 150 64V100H132Z" />
            <path d="M266 28H284V100H266ZM266 4H284V19H266Z" />
            <path d="M362 36L353 49C345 44 338 41 330 41C322 41 317 44 317 49C317 54 322 56 334 59C353 63 364 68 364 81C364 95 351 102 331 102C317 102 305 98 295 90L305 77C313 84 322 87 331 87C341 87 346 85 346 80C346 75 340 73 329 71C311 67 299 62 299 49C299 35 311 26 330 26C342 26 353 30 362 36Z" />
          </g>
        </svg>
        <svg
          viewBox="0 0 640 320"
          width="760"
          height="380"
          fill="none"
          style={{ position: "absolute", right: -60, bottom: -40 }}
        >
          <path
            d="M40 0v180q0 60 60 60h220q60 0 60-60V60q0-40 40-40h220"
            stroke="#304CFF"
            strokeWidth="24"
          />
        </svg>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 9: Placeholder de `src/app/page.tsx`** (a Task 6 substitui)

```tsx
export default function Page() {
  return <main id="conteudo" />;
}
```

- [ ] **Step 10: Escrever `scripts/verificar-marca.mjs`**

```js
#!/usr/bin/env node
// Verificação de marca: palavras proibidas, cores fora da paleta, opacidade em texto, "APL" fora do rodapé.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const raiz = process.cwd();
const src = join(raiz, "src");

const PALETA = new Set([
  "304cff", "f4f1ea", "17191d", "ffffff", "666a73", "adb2bd", "203ad9", "182caf",
]);

const PROIBIDAS = [
  [/\bIA\b/, "menção a IA"],
  [/intelig[êe]ncia artificial/i, "menção a inteligência artificial"],
  [/\bagentes?\b/i, "menção a agentes"],
  [/automa[çc]/i, "menção a automação"],
  [/\búnica\b/i, "\"única\""],
  [/\ba melhor\b/i, "\"a melhor\""],
  [/exclusiv/i, "\"exclusivo\""],
  [/garanti[dm]|garantia/i, "promessa de garantia"],
  [/gr[áa]tis|gratuit/i, "\"grátis/gratuito\""],
  [/\burgente\b|[úu]ltimas vagas|s[óo] hoje|vagas limitadas/i, "urgência/escassez"],
  [/\bleads?\b/i, "\"leads\""],
  [/revolucion|\bdominar\b|escalar sem limites|potencializ/i, "verbo inflado"],
  [/depoimento|\bcases?\b|\bcase\b/i, "prova social"],
  [/\d+\s?%|R\$\s?\d/, "métrica ou valor"],
  [/\bAPL\b/, "\"APL\" fora do rodapé"],
];

const ISENTOS_APL = new Set(["src/lib/conteudo.ts", "src/components/secoes/Footer.tsx"]);
const ISENTOS_NUMERO = new Set(["src/lib/contato.ts", "src/lib/conteudo.ts", "src/components/secoes/Footer.tsx"]);

function arquivos(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return arquivos(caminho);
    return /\.(tsx?|css|mjs)$/.test(nome) && !/\.test\./.test(nome) ? [caminho] : [];
  });
}

const problemas = [];
for (const caminho of arquivos(src)) {
  const rel = relative(raiz, caminho);
  const texto = readFileSync(caminho, "utf8");
  const linhas = texto.split("\n");

  linhas.forEach((linha, i) => {
    for (const [re, motivo] of PROIBIDAS) {
      if (motivo === "\"APL\" fora do rodapé" && ISENTOS_APL.has(rel)) continue;
      if (motivo === "métrica ou valor" && (ISENTOS_NUMERO.has(rel) || rel.endsWith(".css"))) continue;
      if (re.test(linha)) problemas.push(`${rel}:${i + 1}: ${motivo}: ${linha.trim().slice(0, 90)}`);
    }
    for (const m of linha.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
      if (!PALETA.has(m[1].toLowerCase())) problemas.push(`${rel}:${i + 1}: cor fora da paleta #${m[1]}`);
    }
    if (/\bopacity-\d/.test(linha)) problemas.push(`${rel}:${i + 1}: opacidade em utilitário`);
    if (/\b(text|bg|border)-[a-z-]+\/\d{1,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: cor com alfa`);
    if (/font-mono|font-serif|italic/.test(linha)) problemas.push(`${rel}:${i + 1}: fonte fora do sistema`);
  });
}

if (problemas.length) {
  console.error("Verificação de marca falhou:\n" + problemas.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("Verificação de marca: ok");
```

- [ ] **Step 11: Verificar tipos, lint e marca**

Run: `npx tsc --noEmit && npm run lint && npm run verificar`
Esperado: sem erros. (O `tsc` pode reclamar de `src/app/page.tsx` antigo se não foi substituído — confirmar Step 9.)

- [ ] **Step 12: Build de fumaça**

Run: `npm run build`
Esperado: build ok, rota `/` e `/opengraph-image` listadas. Se `next/og` reclamar de `position: absolute` no SVG, trocar por `display:flex` com margens — mas manter wordmark branco sobre tinta e motivo azul.

---

### Task 2: Fundação B — copy, marca e UI

**Files:**
- Create: `src/lib/conteudo.ts`
- Create: `src/components/marca/Wordmark.tsx`, `Simbolo.tsx`, `Icone.tsx`, `Conector.tsx`, `Motivo.tsx`
- Create: `src/components/ui/Container.tsx`, `Botao.tsx`, `Secao.tsx`

**Interfaces:**
- Consumes: classes CSS da Task 1 (podem ainda não existir no momento da escrita; só strings).
- Produces:
  - `conteudo.ts` → `nav`, `cta`, `hero`, `problema`, `servicos`, `fundamentos`, `paraQuem`, `proximoPasso`, `perguntas`, `ctaFinal`, `rodape` (shapes abaixo); tipo `NomeIcone`.
  - `Wordmark({ className?, titulo? })`, `Simbolo({ className?, titulo? })`, `Icone({ nome: NomeIcone, tamanho?: 24 | 32, className? })`, `Conector({ tamanho: "grande" | "pequeno", className? })`, `Motivo({ className? })`, `SetaExterna()` (exportada de `Botao.tsx`).
  - `Container({ className?, children })`, `Botao({ href, variante?, externo?, className?, children })`, `Secao({ id, campo, pergunta, separador?, extra?, children })`.

- [ ] **Step 1: Escrever `src/lib/conteudo.ts`** (copy final; não alterar palavras)

```ts
export type NomeIcone =
  | "aquisicao"
  | "atendimento"
  | "conexao"
  | "criacao"
  | "inteligencia"
  | "vendas";

export const nav = [
  { rotulo: "O que fazemos", href: "#o-que-fazemos" },
  { rotulo: "Como trabalhamos", href: "#como-trabalhamos" },
  { rotulo: "Para quem", href: "#para-quem" },
  { rotulo: "Perguntas", href: "#perguntas" },
] as const;

export const cta = {
  rotulo: "Vamos conversar",
  nota: "Conversa pelo WhatsApp com quem cuida das campanhas.",
} as const;

export const hero = {
  titulo: "O próximo passo tem direção.",
  paragrafo:
    "Tráfego pago, criativos, páginas e CRM conectados ao processo comercial da sua empresa. Você conversa com quem cuida das campanhas e acompanha o que acontece depois do primeiro contato.",
  secundario: { rotulo: "Ver como trabalhamos", href: "#como-trabalhamos" },
} as const;

export const problema = {
  pergunta: "Por que os contatos chegam e as vendas não acompanham?",
  afirmacao:
    "Volume não explica a qualidade da demanda nem o avanço das conversas.",
  corpo: [
    "Entre atrair interesse e fechar uma venda existe o atendimento. Quando a campanha e a conversa comercial andam separadas, fica difícil saber o que ajustar: o anúncio, a página, a abordagem ou o momento do contato.",
  ],
  fecho: "É nessa distância que a Lemis trabalha.",
} as const;

export const servicos = {
  pergunta: "O que a Lemis faz?",
  afirmacao: "Quatro frentes, um processo comercial.",
  corpo:
    "Tráfego pago, criativos, páginas e CRM, planejados em função uns dos outros e do que o seu atendimento consegue continuar. O acompanhamento comercial liga tudo isso ao que acontece depois do contato. O escopo é definido em proposta.",
  itens: [
    {
      icone: "aquisicao",
      nome: "Tráfego pago",
      descricao:
        "Campanhas em Meta Ads e Google Ads planejadas a partir do serviço que você vende e de quem decide comprá-lo.",
      inclui: [
        "Planejamento e estrutura das campanhas",
        "Revisão contínua a partir dos contatos recebidos",
        "Ajustes de público, verba e mensagem",
      ],
    },
    {
      icone: "criacao",
      nome: "Criativos",
      descricao:
        "Anúncios que explicam valor antes de pedir o contato. Imagem, vídeo e texto alinhados ao que o atendimento consegue sustentar.",
      inclui: [
        "Direção da mensagem por campanha",
        "Variações para teste",
        "Leitura do que gera conversa, não só clique",
      ],
    },
    {
      icone: "conexao",
      nome: "Páginas",
      descricao:
        "Páginas que continuam a conversa do anúncio e preparam o contato para o atendimento.",
      inclui: [
        "Estrutura e texto",
        "Formulário ou WhatsApp integrados ao CRM",
        "Revisão conforme o retorno das campanhas",
      ],
    },
    {
      icone: "atendimento",
      nome: "CRM",
      descricao:
        "Organização dos contatos para que cada oportunidade tenha origem registrada e um próximo passo claro.",
      inclui: [
        "Configuração das etapas comerciais",
        "Registro da origem de cada contato",
        "Visão do que avança e do que trava",
      ],
    },
    {
      icone: "vendas",
      nome: "Acompanhamento comercial",
      descricao:
        "Comparamos os contatos recebidos com as conversas que avançaram e revisamos campanha e atendimento a partir disso.",
      inclui: [
        "Conversas periódicas com quem cuida das campanhas",
        "Critérios claros para decidir os próximos passos",
        "Escopo definido em proposta",
      ],
    },
  ],
} as const satisfies {
  pergunta: string;
  afirmacao: string;
  corpo: string;
  itens: readonly { icone: NomeIcone; nome: string; descricao: string; inclui: readonly string[] }[];
};

export const fundamentos = {
  pergunta: "Como vocês trabalham?",
  afirmacao:
    "Marketing próximo de quem decide. Execução conectada ao comercial.",
  corpo:
    "Três compromissos orientam cada frente do trabalho, do anúncio à conversa comercial.",
  itens: [
    {
      nome: "Proximidade",
      frase: "Você conversa com quem cuida das campanhas.",
      corpo:
        "Sem intermediário entre a decisão e a execução. Quem ajusta a campanha é quem entende o contexto do seu negócio.",
    },
    {
      nome: "Visão comercial",
      frase: "Acompanhamos o que acontece depois do primeiro contato.",
      corpo:
        "O trabalho não termina no formulário preenchido. Comparamos os contatos recebidos com as conversas que avançaram e usamos isso para decidir o que ajustar.",
    },
    {
      nome: "Execução integrada",
      frase:
        "Campanhas, criativos, páginas e CRM conectados ao processo comercial.",
      corpo:
        "O que aparece no anúncio é o que a página sustenta e o que o atendimento consegue continuar. Cada frente entra quando faz sentido para o seu escopo.",
    },
  ],
  exemplo: {
    rotulo: "Como soa uma conversa de acompanhamento",
    fala: "Vamos comparar os contatos recebidos com as conversas que avançaram. A partir disso, revisamos a campanha e o próximo passo no atendimento.",
    nota: "Modelo de abordagem. Em relatórios reais, entram dados verificados, período e decisão proposta.",
  },
} as const;

export const paraQuem = {
  pergunta: "Isso é para o meu negócio?",
  afirmacao: "Para empresas que vendem serviços de alto valor.",
  corpo:
    "Negócios em que vender exige explicar valor, construir confiança e acompanhar a decisão de compra. Clínicas de estética e escritórios de advocacia fazem parte da base atual; não são um limite.",
  listaTitulo: "Faz sentido conversar se",
  lista: [
    "Você já investe em anúncios, mas não sabe dizer quais contatos viraram conversa.",
    "O atendimento recebe contatos que ainda não estavam prontos para decidir.",
    "Marketing e comercial olham para números diferentes.",
    "Você quer falar com quem executa, não com um intermediário.",
  ],
} as const;

export const proximoPasso = {
  pergunta: "E se eu chamar agora, o que acontece?",
  afirmacao: "Você chama. Nós ouvimos antes de propor.",
  corpo:
    "A conversa começa pelo WhatsApp, com quem cuida das campanhas. Sem formulário e sem intermediário.",
  passos: [
    {
      titulo: "Conversa inicial",
      corpo:
        "Você conta como vende hoje, de onde vêm os contatos e o que acontece com eles depois. Nós ouvimos e perguntamos.",
    },
    {
      titulo: "Leitura e proposta",
      corpo:
        "Voltamos com uma leitura do cenário e uma proposta com escopo definido: quais frentes entram, o que cada uma inclui e como o acompanhamento funciona.",
    },
    {
      titulo: "Execução com acompanhamento",
      corpo:
        "Com o escopo acordado, começamos. A partir daí, revisamos campanha e atendimento em conversas periódicas com você.",
    },
  ],
} as const;

export const perguntas = {
  titulo: "Perguntas que aparecem antes da primeira conversa",
  itens: [
    {
      pergunta: "Vocês garantem uma quantidade de contatos por mês?",
      resposta:
        "Não. Trabalhamos para melhorar a qualidade das oportunidades e o que acontece com elas, e explicamos os critérios por trás de cada ajuste. Quantidade, custo e prazo dependem da oferta, do mercado e do atendimento, e por isso não entram como promessa.",
    },
    {
      pergunta: "Preciso contratar todas as frentes?",
      resposta:
        "Não. O escopo é definido em proposta a partir do que o seu processo comercial precisa. Cada frente entra quando faz sentido.",
    },
    {
      pergunta: "Vocês assumem as vendas?",
      resposta:
        "Acompanhamos as oportunidades até a venda e ajustamos o trabalho a partir do que vemos. A operação do seu time comercial continua com você, salvo escopo combinado em proposta.",
    },
    {
      pergunta: "Com quem eu falo no dia a dia?",
      resposta:
        "Com quem cuida das campanhas. Não há intermediário entre a decisão e a execução.",
    },
    {
      pergunta: "Já tenho CRM. Vocês usam o meu?",
      resposta:
        "Avaliamos a ferramenta que você já usa antes de propor qualquer mudança. O que importa é cada contato ter origem registrada e um próximo passo claro.",
    },
  ],
} as const;

export const ctaFinal = {
  titulo: "Do interesse à conversa certa.",
  apoio: "Marketing próximo de quem decide. Execução conectada ao comercial.",
  nota: "Conversa pelo WhatsApp com quem cuida das campanhas.",
} as const;

export const rodape = {
  apoio: "Marketing próximo de quem decide. Execução conectada ao comercial.",
  razaoSocial: "APL Digital — Assessoria em Marketing",
  cnpj: "CNPJ 44.840.036/0001-59",
  endereco:
    "Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG, CEP 30160-040",
  navegarRotulo: "Navegar",
  conversarRotulo: "Conversar",
  whatsappRotulo: "WhatsApp",
} as const;
```

- [ ] **Step 2: Escrever os componentes de marca**

`src/components/marca/Wordmark.tsx` — paths exatos de `lemis-azul.svg`, `fill="currentColor"`:
```tsx
type Props = { className?: string; titulo?: string };

export function Wordmark({ className = "", titulo }: Props) {
  const acessivel = titulo
    ? { role: "img" as const, "aria-labelledby": "wordmark-titulo" }
    : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg viewBox="0 0 368 106" className={className} {...acessivel}>
      {titulo ? <title id="wordmark-titulo">{titulo}</title> : null}
      <g fill="currentColor" fillRule="evenodd">
        <path d="M4 4H22V75Q22 83 30 83H42V100H28Q4 100 4 76Z" />
        <path d="M119 70H66C68 81 75 86 86 86C94 86 101 83 107 78L117 89C109 98 98 102 85 102C61 102 47 86 47 64C47 41 62 26 83 26C106 26 119 42 119 64ZM66 57H101C99 47 93 42 83 42C74 42 68 47 66 57Z" />
        <path d="M132 28H149V37C154 30 161 26 170 26C181 26 190 31 194 39C200 30 208 26 220 26C239 26 249 39 249 59V100H231V61C231 49 227 43 218 43C208 43 201 50 201 62V100H183V61C183 49 179 43 170 43C159 43 150 51 150 64V100H132Z" />
        <path d="M266 28H284V100H266ZM266 4H284V19H266Z" />
        <path d="M362 36L353 49C345 44 338 41 330 41C322 41 317 44 317 49C317 54 322 56 334 59C353 63 364 68 364 81C364 95 351 102 331 102C317 102 305 98 295 90L305 77C313 84 322 87 331 87C341 87 346 85 346 80C346 75 340 73 329 71C311 67 299 62 299 49C299 35 311 26 330 26C342 26 353 30 362 36Z" />
      </g>
    </svg>
  );
}
```

`src/components/marca/Simbolo.tsx`:
```tsx
type Props = { className?: string; titulo?: string };

export function Simbolo({ className = "", titulo }: Props) {
  const acessivel = titulo
    ? { role: "img" as const, "aria-labelledby": "simbolo-titulo" }
    : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg viewBox="0 0 64 64" className={className} {...acessivel}>
      {titulo ? <title id="simbolo-titulo">{titulo}</title> : null}
      <path fill="currentColor" d="M8 6H24V36Q24 42 30 42H56V58H28Q8 58 8 38Z" />
    </svg>
  );
}
```

`src/components/marca/Icone.tsx` — paths exatos dos seis ícones, sempre decorativo (o rótulo visível está ao lado):
```tsx
import type { NomeIcone } from "@/lib/conteudo";

const CAMINHOS: Record<NomeIcone, string[]> = {
  aquisicao: ["M4 5h16l-6 7v6l-4 2v-8Z", "M7 8h10"],
  atendimento: ["M5 17H3V9h2m14 8h2V9h-2M5 13V9a7 7 0 0 1 14 0v8c0 3-3 4-6 4", "M10 21h3"],
  conexao: ["M3 4v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V4", "M12 17v4"],
  criacao: ["M4 17 16 5l3 3L7 20H4Z", "m13 8 3 3M13 20h7"],
  inteligencia: ["M4 4v11a5 5 0 0 0 5 5h11M4 12h11a5 5 0 0 0 5-5V4"],
  vendas: ["M5 4h14v16l-3-2-4 2-4-2-3 2Z", "m8 11 3 3 5-6"],
};

const CIRCULOS: Partial<Record<NomeIcone, [number, number][]>> = {
  conexao: [[3, 3], [21, 3]],
  inteligencia: [[4, 3], [21, 20], [20, 3]],
};

type Props = { nome: NomeIcone; tamanho?: 24 | 32; className?: string };

export function Icone({ nome, tamanho = 24, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {CAMINHOS[nome].map((d) => (
        <path key={d} d={d} />
      ))}
      {(CIRCULOS[nome] ?? []).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.5} />
      ))}
    </svg>
  );
}
```

`src/components/marca/Conector.tsx` — o gesto do **l** (desce, curva, vira para a direita). Cor por `currentColor`:
```tsx
type Props = { tamanho: "grande" | "pequeno"; className?: string };

const GEOMETRIA = {
  grande: { viewBox: "0 0 80 160", d: "M12 0V112q0 36 36 36H80", largura: 12 },
  pequeno: { viewBox: "0 0 48 64", d: "M8 0V40q0 16 16 16H48", largura: 8 },
} as const;

export function Conector({ tamanho, className = "" }: Props) {
  const g = GEOMETRIA[tamanho];
  return (
    <svg
      viewBox={g.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`conector ${className}`}
    >
      <path d={g.d} pathLength={1} stroke="currentColor" strokeWidth={g.largura} />
    </svg>
  );
}
```

`src/components/marca/Motivo.tsx` — geometria exata de `motivo-conexao.svg`:
```tsx
type Props = { className?: string };

export function Motivo({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 640 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M40 0v180q0 60 60 60h220q60 0 60-60V60q0-40 40-40h220"
        stroke="currentColor"
        strokeWidth={24}
      />
    </svg>
  );
}
```

- [ ] **Step 3: Escrever os componentes de UI**

`src/components/ui/Container.tsx`:
```tsx
import type { ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

export function Container({ className = "", children }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[1408px] px-5 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
```

`src/components/ui/Botao.tsx`:
```tsx
import type { ReactNode } from "react";

type Variante = "primario" | "sobre-azul" | "contorno-escuro";

const ESTILOS: Record<Variante, string> = {
  primario: "bg-azul text-branco hover:bg-azul-hover active:bg-azul-ativo",
  "sobre-azul": "bg-branco text-azul hover:bg-papel active:bg-papel",
  "contorno-escuro":
    "border border-secundario-escuro text-branco hover:border-branco hover:bg-branco hover:text-tinta",
};

type Props = {
  href: string;
  variante?: Variante;
  externo?: boolean;
  className?: string;
  children: ReactNode;
};

export function SetaExterna() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

export function Botao({ href, variante = "primario", externo = false, className = "", children }: Props) {
  const externoProps = externo ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...externoProps}
      className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-[0.9375rem] font-semibold transition-colors duration-200 ${ESTILOS[variante]} ${className}`}
    >
      {children}
      {externo ? (
        <>
          <SetaExterna />
          <span className="sr-only">(abre em nova aba)</span>
        </>
      ) : null}
    </a>
  );
}
```

`src/components/ui/Secao.tsx` — o padrão pergunta | conector | resposta:
```tsx
import type { ReactNode } from "react";
import { Conector } from "@/components/marca/Conector";
import { Container } from "@/components/ui/Container";

type Props = {
  id: string;
  campo: "papel" | "tinta";
  pergunta: string;
  separador?: boolean;
  extra?: ReactNode;
  children: ReactNode;
};

export function Secao({ id, campo, pergunta, separador = false, extra, children }: Props) {
  const escuro = campo === "tinta";
  const fio = escuro ? "border-fio-escuro" : "border-fio-claro";
  const corConector = escuro ? "text-branco" : "text-azul";
  return (
    <section id={id} className={`campo-${campo} ${separador ? `border-t ${fio}` : ""}`}>
      <Container className="py-20 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
            <div className="lg:grid lg:grid-cols-6 lg:gap-x-6">
              <h2 className="t-sub max-w-[22ch] lg:col-span-5">{pergunta}</h2>
              <div className={`mt-6 lg:mt-0 ${corConector}`}>
                <Conector tamanho="pequeno" className="h-16 w-12 lg:hidden" />
                <Conector tamanho="grande" className="hidden h-auto w-full lg:block" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">{children}</div>
        </div>
        {extra ? <div className="mt-16 lg:mt-24">{extra}</div> : null}
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Esperado: sem erros (os componentes ainda não são importados por ninguém; `tsc` checa mesmo assim).

- [ ] **Step 5: Verificar marca**

Run: `node scripts/verificar-marca.mjs` (se a Task 1 ainda não criou o script, pular e registrar no relatório).
Esperado: "Verificação de marca: ok".

---

### Task 3: Moldura — Header, Hero, Footer

**Files:**
- Create: `src/components/secoes/Header.tsx`, `src/components/secoes/Hero.tsx`, `src/components/secoes/Footer.tsx`

**Interfaces:**
- Consumes: `nav`, `cta`, `hero`, `rodape` de `@/lib/conteudo`; `LINK_WHATSAPP` de `@/lib/contato`; `Wordmark`; `Container`; `Botao`, `SetaExterna`.
- Produces: `Header()`, `Hero()`, `Footer()` (default-less, named exports).

- [ ] **Step 1: `src/components/secoes/Header.tsx`** (único client component)

```tsx
"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/marca/Wordmark";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, nav } from "@/lib/conteudo";

export function Header() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  return (
    <header className="campo-papel sticky top-0 z-40 border-b border-fio-claro">
      <Container className="flex h-18 items-center justify-between gap-6">
        <a href="#inicio" aria-label="Lemis, início da página" className="shrink-0 text-azul">
          <Wordmark className="h-auto w-32" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.9375rem] font-semibold text-tinta underline-offset-[0.2em] hover:underline"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Botao href={LINK_WHATSAPP} externo>
            {cta.rotulo}
          </Botao>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-tinta lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true" focusable="false">
            {aberto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </Container>

      <div id="menu-mobile" hidden={!aberto} className="border-t border-fio-claro lg:hidden">
        <Container className="py-6">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-fio-claro">
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="t-sub block py-4 text-tinta"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <Botao href={LINK_WHATSAPP} externo className="mt-6 w-full">
            {cta.rotulo}
          </Botao>
        </Container>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: `src/components/secoes/Hero.tsx`**

```tsx
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, hero } from "@/lib/conteudo";

export function Hero() {
  return (
    <section id="inicio" className="campo-papel relative overflow-hidden">
      {/* Traço azul: o gesto do l em escala de página. Desktop. */}
      <svg
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute top-0 right-0 hidden w-[min(46vw,640px)] text-azul lg:block"
      >
        <path d="M90 0V380q0 90 90 90H640" stroke="currentColor" strokeWidth={40} />
      </svg>
      {/* Mobile e tablet. */}
      <svg
        viewBox="0 0 96 200"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute top-0 right-0 w-24 text-azul lg:hidden"
      >
        <path d="M24 0V140q0 28 28 28H96" stroke="currentColor" strokeWidth={16} />
      </svg>

      <Container className="relative flex items-center py-20 md:py-28 lg:min-h-[min(calc(100svh-4.5rem),880px)] lg:py-32">
        <div className="lg:w-7/12">
          <h1 className="t-display max-w-[11ch]">{hero.titulo}</h1>
          <p className="t-lead mt-8 max-w-[52ch]">{hero.paragrafo}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Botao href={LINK_WHATSAPP} externo>
              {cta.rotulo}
            </Botao>
            <a
              href={hero.secundario.href}
              className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-tinta underline underline-offset-[0.2em] hover:text-azul"
            >
              {hero.secundario.rotulo}
              <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: `src/components/secoes/Footer.tsx`**

```tsx
import { Wordmark } from "@/components/marca/Wordmark";
import { SetaExterna } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { nav, rodape } from "@/lib/conteudo";

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="campo-tinta border-t border-fio-escuro">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <a href="#inicio" aria-label="Lemis, voltar ao início" className="inline-block text-branco">
              <Wordmark className="h-auto w-32" />
            </a>
            <p className="t-corpo mt-6 max-w-[30ch] text-secundario-escuro">{rodape.apoio}</p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
            <p className="t-rotulo text-secundario-escuro">{rodape.navegarRotulo}</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="t-corpo text-branco underline-offset-[0.2em] hover:underline">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="t-rotulo text-secundario-escuro">{rodape.conversarRotulo}</p>
            <a
              href={LINK_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="t-corpo mt-4 inline-flex items-center gap-2 text-branco underline underline-offset-[0.2em]"
            >
              {rodape.whatsappRotulo}
              <SetaExterna />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>

        <div className="t-legenda mt-14 border-t border-fio-escuro pt-6 text-secundario-escuro">
          <p>
            {rodape.razaoSocial} · {rodape.cnpj}
          </p>
          <p className="mt-1">{rodape.endereco}</p>
          <p className="mt-4">© {ano} APL Digital</p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npx tsc --noEmit && npm run lint && npm run verificar`
Esperado: sem erros e "Verificação de marca: ok".

---

### Task 4: Seções 1–3 — Problema, Servicos, Fundamentos

**Files:**
- Create: `src/components/secoes/Problema.tsx`, `Servicos.tsx`, `Fundamentos.tsx`

**Interfaces:**
- Consumes: `problema`, `servicos`, `fundamentos` de `@/lib/conteudo`; `Secao`; `Icone`.
- Produces: `Problema()`, `Servicos()`, `Fundamentos()`.

- [ ] **Step 1: `src/components/secoes/Problema.tsx`** (campo tinta)

```tsx
import { Secao } from "@/components/ui/Secao";
import { problema } from "@/lib/conteudo";

export function Problema() {
  return (
    <Secao id="problema" campo="tinta" pergunta={problema.pergunta}>
      <p className="t-titulo text-branco">{problema.afirmacao}</p>
      <div className="t-corpo mt-8 max-w-[58ch] space-y-5">
        {problema.corpo.map((paragrafo) => (
          <p key={paragrafo} className="text-secundario-escuro">
            {paragrafo}
          </p>
        ))}
        <p className="font-semibold text-branco">{problema.fecho}</p>
      </div>
    </Secao>
  );
}
```

- [ ] **Step 2: `src/components/secoes/Servicos.tsx`** (campo papel; linhas, não cards)

```tsx
import { Icone } from "@/components/marca/Icone";
import { Secao } from "@/components/ui/Secao";
import { servicos } from "@/lib/conteudo";

function ListaServicos() {
  return (
    <ul className="border-t border-fio-claro">
      {servicos.itens.map((item) => (
        <li
          key={item.nome}
          className="grid gap-y-4 border-b border-fio-claro py-8 md:grid-cols-[2.5rem_1fr] md:gap-x-4 lg:grid-cols-12 lg:gap-x-6 lg:py-10"
        >
          <div className="text-azul lg:col-span-1">
            <Icone nome={item.icone} tamanho={32} />
          </div>
          <div className="lg:col-span-5">
            <h3 className="t-sub">{item.nome}</h3>
            <p className="t-corpo mt-3 max-w-[46ch] text-secundario">{item.descricao}</p>
          </div>
          <ul className="space-y-2 text-[0.9375rem] leading-[1.5] text-tinta md:col-start-2 lg:col-span-5 lg:col-start-8">
            {item.inclui.map((linha) => (
              <li key={linha} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-azul" />
                {linha}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function Servicos() {
  return (
    <Secao id="o-que-fazemos" campo="papel" pergunta={servicos.pergunta} extra={<ListaServicos />}>
      <p className="t-titulo">{servicos.afirmacao}</p>
      <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{servicos.corpo}</p>
    </Secao>
  );
}
```

- [ ] **Step 3: `src/components/secoes/Fundamentos.tsx`** (campo tinta)

```tsx
import { Secao } from "@/components/ui/Secao";
import { fundamentos } from "@/lib/conteudo";

function Compromissos() {
  return (
    <>
      <ul className="grid gap-y-12 border-t border-fio-escuro pt-10 lg:grid-cols-3 lg:gap-x-6">
        {fundamentos.itens.map((item) => (
          <li key={item.nome}>
            <h3 className="t-rotulo text-secundario-escuro">{item.nome}</h3>
            <p className="t-sub mt-4 max-w-[26ch] text-branco">{item.frase}</p>
            <p className="t-corpo mt-4 max-w-[40ch] text-secundario-escuro">{item.corpo}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-y-4 border-t border-fio-escuro pt-10 lg:grid-cols-12 lg:gap-x-6">
        <p className="t-rotulo text-secundario-escuro lg:col-span-5">{fundamentos.exemplo.rotulo}</p>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-sub max-w-[36ch] text-branco">“{fundamentos.exemplo.fala}”</p>
          <p className="t-legenda mt-4 max-w-[52ch] text-secundario-escuro">{fundamentos.exemplo.nota}</p>
        </div>
      </div>
    </>
  );
}

export function Fundamentos() {
  return (
    <Secao id="como-trabalhamos" campo="tinta" pergunta={fundamentos.pergunta} extra={<Compromissos />}>
      <p className="t-titulo text-branco">{fundamentos.afirmacao}</p>
      <p className="t-corpo mt-8 max-w-[58ch] text-secundario-escuro">{fundamentos.corpo}</p>
    </Secao>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npx tsc --noEmit && npm run lint && npm run verificar`
Esperado: sem erros e "Verificação de marca: ok".

---

### Task 5: Seções 4–7 — ParaQuem, ProximoPasso, Perguntas, CtaFinal

**Files:**
- Create: `src/components/secoes/ParaQuem.tsx`, `ProximoPasso.tsx`, `Perguntas.tsx`, `CtaFinal.tsx`

**Interfaces:**
- Consumes: `paraQuem`, `proximoPasso`, `perguntas`, `ctaFinal`, `cta` de `@/lib/conteudo`; `LINK_WHATSAPP`; `Secao`, `Container`, `Botao`, `Motivo`.
- Produces: `ParaQuem()`, `ProximoPasso()`, `Perguntas()`, `CtaFinal()`.

- [ ] **Step 1: `src/components/secoes/ParaQuem.tsx`** (campo papel)

```tsx
import { Secao } from "@/components/ui/Secao";
import { paraQuem } from "@/lib/conteudo";

export function ParaQuem() {
  return (
    <Secao id="para-quem" campo="papel" pergunta={paraQuem.pergunta}>
      <p className="t-titulo">{paraQuem.afirmacao}</p>
      <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{paraQuem.corpo}</p>
      <div className="mt-12">
        <h3 className="t-rotulo text-secundario">{paraQuem.listaTitulo}</h3>
        <ul className="mt-4 divide-y divide-fio-claro border-y border-fio-claro">
          {paraQuem.lista.map((item) => (
            <li key={item} className="t-corpo flex gap-4 py-4">
              <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 bg-azul" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
```

- [ ] **Step 2: `src/components/secoes/ProximoPasso.tsx`** (campo papel, com separador)

```tsx
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, proximoPasso } from "@/lib/conteudo";

function Passos() {
  return (
    <div>
      <ol className="grid gap-y-10 lg:grid-cols-3 lg:gap-x-6">
        {proximoPasso.passos.map((passo, i) => (
          <li key={passo.titulo} className="border-t border-fio-claro pt-6">
            <span aria-hidden="true" className="t-titulo tabular-nums text-azul">
              {i + 1}
            </span>
            <h3 className="t-sub mt-6">{passo.titulo}</h3>
            <p className="t-corpo mt-3 max-w-[40ch] text-secundario">{passo.corpo}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Botao href={LINK_WHATSAPP} externo>
          {cta.rotulo}
        </Botao>
        <p className="t-legenda text-secundario">{cta.nota}</p>
      </div>
    </div>
  );
}

export function ProximoPasso() {
  return (
    <Secao id="proximo-passo" campo="papel" separador pergunta={proximoPasso.pergunta} extra={<Passos />}>
      <p className="t-titulo">{proximoPasso.afirmacao}</p>
      <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{proximoPasso.corpo}</p>
    </Secao>
  );
}
```

- [ ] **Step 3: `src/components/secoes/Perguntas.tsx`** (campo papel, separador, `<details>` nativo)

```tsx
import { Secao } from "@/components/ui/Secao";
import { perguntas } from "@/lib/conteudo";

export function Perguntas() {
  return (
    <Secao id="perguntas" campo="papel" separador pergunta={perguntas.titulo}>
      <div className="border-t border-fio-claro">
        {perguntas.itens.map((item) => (
          <details key={item.pergunta} className="group border-b border-fio-claro">
            <summary className="t-sub flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-tinta">
              <span>{item.pergunta}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-azul transition-transform duration-200 group-open:rotate-45"
              >
                <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" focusable="false">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="t-corpo max-w-[58ch] pb-6 text-secundario">{item.resposta}</p>
          </details>
        ))}
      </div>
    </Secao>
  );
}
```

- [ ] **Step 4: `src/components/secoes/CtaFinal.tsx`** (campo azul; motivo em papel, como no story)

```tsx
import { Motivo } from "@/components/marca/Motivo";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, ctaFinal } from "@/lib/conteudo";

export function CtaFinal() {
  return (
    <section id="contato" className="campo-azul relative overflow-hidden">
      <Container className="relative z-10 pt-24 pb-12 md:pt-32 lg:min-h-[640px] lg:py-40">
        <div className="lg:w-5/12">
          <h2 className="t-display max-w-[12ch]">{ctaFinal.titulo}</h2>
          <p className="t-lead mt-8 max-w-[36ch]">{ctaFinal.apoio}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Botao href={LINK_WHATSAPP} externo variante="sobre-azul">
              {cta.rotulo}
            </Botao>
            <p className="t-legenda">{ctaFinal.nota}</p>
          </div>
        </div>
      </Container>
      <div className="text-papel lg:hidden">
        <Motivo className="block h-auto w-full" />
      </div>
      <Motivo className="pointer-events-none absolute right-0 bottom-0 hidden h-auto w-[min(56vw,820px)] text-papel lg:block" />
    </section>
  );
}
```

- [ ] **Step 5: Verificar**

Run: `npx tsc --noEmit && npm run lint && npm run verificar`
Esperado: sem erros e "Verificação de marca: ok".

---

### Task 6: Composição da página, build e checagens automáticas

**Files:**
- Modify: `src/app/page.tsx` (substituir o placeholder)

**Interfaces:**
- Consumes: todos os componentes de `src/components/secoes/*`.

- [ ] **Step 1: `src/app/page.tsx`**

```tsx
import { CtaFinal } from "@/components/secoes/CtaFinal";
import { Footer } from "@/components/secoes/Footer";
import { Fundamentos } from "@/components/secoes/Fundamentos";
import { Header } from "@/components/secoes/Header";
import { Hero } from "@/components/secoes/Hero";
import { ParaQuem } from "@/components/secoes/ParaQuem";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Problema } from "@/components/secoes/Problema";
import { ProximoPasso } from "@/components/secoes/ProximoPasso";
import { Servicos } from "@/components/secoes/Servicos";

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problema />
        <Servicos />
        <Fundamentos />
        <ParaQuem />
        <ProximoPasso />
        <Perguntas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Checagens**

Run: `npm test && npx tsc --noEmit && npm run lint && npm run verificar && npm run build`
Esperado: tudo verde. Guardar a saída do build para o RESUMO.

- [ ] **Step 3: Detector do impeccable (uma vez)**

Run: `node /Users/viniciusneri/.claude/skills/impeccable/scripts/detect.mjs --json src/app/globals.css src/components src/app/page.tsx src/app/layout.tsx`
Corrigir o que for mecânico e coerente com a spec; registrar o restante no RESUMO.

---

### Task 7: Validação no navegador (agent-browser) e correções em passes limitados

- [ ] **Step 1: Subir o servidor de produção**

Run: `npm run build && (npm run start -- -p 3010 > /tmp/lemis-start.log 2>&1 &) && sleep 3 && curl -sI http://localhost:3010 | head -1`
Esperado: `HTTP/1.1 200 OK`.

- [ ] **Step 2: Capturas desktop e mobile**

```bash
ab(){ agent-browser --session lemis "$@"; }
ab open http://localhost:3010 && ab set viewport 1440 900 && ab wait --load networkidle
ab screenshot docs/validacao/desktop-fold.png
ab screenshot --full docs/validacao/desktop-full.png
ab set viewport 390 844 && ab wait 800
ab screenshot docs/validacao/mobile-fold.png
ab screenshot --full docs/validacao/mobile-full.png
```

- [ ] **Step 3: Interações**

```bash
ab snapshot -i            # localizar o botão "Abrir menu" (@eN) e os <summary>
ab click @eN && ab wait 400 && ab screenshot docs/validacao/mobile-menu.png
ab press Escape
ab set viewport 1440 900 && ab find text "Preciso contratar todas as frentes?" click && ab wait 400 && ab screenshot docs/validacao/desktop-perguntas.png
ab press Tab && ab press Tab && ab press Tab && ab screenshot docs/validacao/desktop-foco.png
```
Verificar: link do WhatsApp em todos os botões (`ab eval` listando `a[href^="https://wa.me/5575988023044"]` → 4 ocorrências: header, hero, próximo passo, CTA final; mais o rodapé = 5); nenhum overflow horizontal (`document.documentElement.scrollWidth === innerWidth` em 390 e 1440); `prefers-reduced-motion` via `ab set media reduce`? (se indisponível, registrar).

- [ ] **Step 4: Crítica e correção (máx. 2 rodadas)**

Abrir cada captura e comparar com a spec (FIRST VIEWPORT, ritmo, escala, contraste, colisões do traço com texto, quebra de linha dos títulos, glifos colidindo no `t-display`). Corrigir tudo em um lote, recapturar, confirmar. Parar na segunda rodada.

- [ ] **Step 5: Encerrar**

```bash
ab close; pkill -f "next start -p 3010" || true
```

---

### Task 8: RESUMO.md e persistência

- [ ] **Step 1: Escrever `RESUMO.md`** na raiz do worktree: o que foi feito; cada decisão de design e o porquê (direção "conversa", campos, tipografia, conector, traço do hero, motivo no CTA, ausência de kicker/cards/números); o que ficou de fora; screenshots (`docs/validacao/*.png` referenciados); limitações declaradas (domínio não definido → `metadataBase` por env; `animation-timeline` sem suporte no Firefox → estático; tracking do display se ajustado; OG sem texto; sem PRODUCT.md/DESIGN.md; nada commitado).
- [ ] **Step 2: Nota de sessão no Obsidian** (`sessions/2026-09-16-site-lemis.md`) e atualização de `00-home/top-of-mind.md` — se o vault estiver inacessível, registrar no RESUMO.
- [ ] **Step 3: Memória** em `~/.claude/projects/-Users-viniciusneri-Projects-apl-digital/memory/`: projeto (site Lemis, worktree, estado), referência (pasta da identidade), feedback (regras da marca que valem para qualquer sessão futura).
- [ ] **Step 4: `git status`** para confirmar que tudo está no working tree e nada foi commitado.
