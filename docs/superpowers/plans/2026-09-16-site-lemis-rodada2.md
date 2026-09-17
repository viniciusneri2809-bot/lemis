# Site Lemis — rodada 2 (profundidade, movimento, tecnologia) — plano

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar o site da Lemis de documento tipográfico a interface com camadas, movimento e tecnologia visível, dentro da paleta, do contraste e de `prefers-reduced-motion`, sem tocar na copy.

**Architecture:** Primitivos de efeito em `src/components/efeitos/` (reveal, palavras, parallax, inclinação, padrões, grain, holofote, feixe de conexão, feixe de borda, linha de progresso), superfícies como classes CSS (`superficie-clara`, `superficie-escura`), `Providers` client (motion `LazyMotion` + `MotionConfig` + Lenis) envolvendo a página, Accordion shadcn/ui (Radix) copiado para `src/components/ui/accordion.tsx`. As seções continuam Server Components e compõem os primitivos.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, `motion` 13, `lenis` 1.3, `@radix-ui/react-accordion`, `clsx`, `tailwind-merge`.

**Spec:** `docs/superpowers/specs/2026-09-16-site-lemis-design.md` (seção "Rodada 2").

## Global Constraints

- **Cores**: só `#304CFF #F4F1EA #17191D #FFFFFF #666A73 #ADB2BD #203AD9 #182CAF` em `src/`. Cores derivadas SEMPRE por `color-mix(in srgb, var(--color-x) N%, transparent|var(--color-y))`. Sem gradiente azul-ciano; gradientes radiais só com azul/branco/tinta → transparente (glow, holofote).
- **Texto**: nunca `opacity-*` nem `text-*/N` em texto. Alfa (`bg-*/N`, `border-*/N`, `opacity-*`) só em superfícies, bordas, padrões e elementos gráficos. Texto secundário: `text-secundario` em papel/branco, `text-secundario-escuro` em tinta, branco em azul.
- **Tipografia**: Geist e as classes `t-*` (inclui `t-controle`). Sem mono, sem itálico.
- **Copy**: só `src/lib/conteudo.ts`. **Nenhuma string nova de marketing.** Rótulos de interface novos permitidos apenas: nenhum além dos já existentes. O painel do hero usa `servicos.itens[].nome` e `ctaFinal.titulo`.
- **Movimento**: `MotionConfig reducedMotion="user"`; toda animação CSS nova dentro de `@media (prefers-reduced-motion: no-preference)` ou com fallback estático em `reduce`; Lenis não instancia com movimento reduzido; holofote/inclinação só com `pointer: fine` e sem movimento reduzido. Ease padrão `cubic-bezier(0.22, 1, 0.36, 1)`; reveals 0,6–0,7s; hover 0,3s.
- **Orçamento**: JS ≤ 230 KB gzip (linha de base 165); Lighthouse mobile performance ≥ 90 (linha de base 98). Só `LazyMotion` + `domAnimation` + `m.*` (nunca `motion.div`).
- **Acessibilidade**: texto animado palavra a palavra sempre com `sr-only` do texto inteiro e `aria-hidden` nas palavras; SVGs decorativos `aria-hidden`; foco visível; Accordion Radix.
- **Não commitar, não publicar.** Comandos em `/Users/viniciusneri/orca/workspaces/apl-digital/site-lemis-home`.
- Nomes de arquivos/exports exatamente como neste plano.

---

## Mapa de arquivos

| Arquivo | Responsabilidade | Task |
|---|---|---|
| `package.json`, `.nvmrc` | deps novas, Node 22 | 1 |
| `src/lib/utils.ts` | `cn()` | 1 |
| `src/components/efeitos/Providers.tsx` | LazyMotion + MotionConfig + Lenis | 1 |
| `src/components/efeitos/Revelar.tsx` | reveal em view | 1 |
| `src/components/efeitos/Palavras.tsx` | texto palavra a palavra | 1 |
| `src/components/efeitos/Parallax.tsx` | deslocamento por scroll | 1 |
| `src/components/efeitos/Inclinacao.tsx` | inclinação 3D ao mouse | 1 |
| `src/components/efeitos/Padroes.tsx` | `PadraoPontos`, `PadraoGrade`, `Glow` | 1 |
| `src/components/efeitos/Grao.tsx` | grain fixo | 1 |
| `src/components/efeitos/Holofote.tsx` | luz que segue o cursor em campos escuros | 1 |
| `src/components/efeitos/CartaoHolofote.tsx` | card com realce radial e elevação | 1 |
| `src/components/efeitos/FeixeConexao.tsx` | feixe animado entre dois elementos (gesto do l) | 1 |
| `src/components/efeitos/LinhaProgresso.tsx` | linha que se desenha em view | 1 |
| `src/components/ui/accordion.tsx` | shadcn/ui Accordion (Radix) | 1 |
| `src/components/ui/Secao.tsx` | prop `fundo`, `overflow-clip` | 1 |
| `src/components/ui/Botao.tsx` | hover com seta deslizando, escala no clique | 1 |
| `src/app/globals.css` | `@source`, superfícies, feixes, holofote, acordeão, lenis, grão | 1 |
| `src/app/layout.tsx` | Providers + Grao | 1 |
| `scripts/verificar-marca.mjs` | regras de alfa/opacidade atualizadas | 1 |
| `src/components/secoes/Header.tsx`, `Hero.tsx`, `HeroPainel.tsx` | moldura + painel de conexão | 2 |
| `src/components/secoes/Problema.tsx`, `Servicos.tsx`, `Fundamentos.tsx` | seções 1–3 | 3 |
| `src/components/secoes/ParaQuem.tsx`, `ProximoPasso.tsx`, `Perguntas.tsx`, `CtaFinal.tsx`, `Footer.tsx`, `src/app/page.tsx` | seções 4–7, rodapé, `main tabIndex` | 4 |

Paralelismo: Task 1 sozinha; Tasks 2, 3 e 4 em paralelo depois.

---

### Task 1: Fundação 2 — bibliotecas, primitivos de efeito, superfícies, providers

**Files:** ver mapa (Task 1). Modificar: `package.json`, `.nvmrc`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ui/Secao.tsx`, `src/components/ui/Botao.tsx`, `scripts/verificar-marca.mjs`. Criar o restante.

**Interfaces (Produces):**
- `Providers({children})`; `Revelar({children, atraso?, className?, y?})`; `Palavras({texto, className?, atraso?})`; `Parallax({children, className?, deslocamento?})`; `Inclinacao({children, className?, graus?})`; `PadraoPontos({className?})`, `PadraoGrade({className?})`, `Glow({className?})`; `Grao()`; `Holofote()` (renderiza dentro de um pai `relative`; escuta o pai); `CartaoHolofote({children, className?})`; `FeixeConexao({conteinerRef, deRef, paraRef, atraso?, raio?})`; `LinhaProgresso({className?})`; `Accordion, AccordionItem, AccordionTrigger, AccordionContent`; `cn(...)`.
- `Secao` ganha `fundo?: ReactNode` (renderizado antes do Container, dentro da `section` que passa a ser `relative overflow-clip`).
- Classes CSS: `superficie-clara`, `superficie-escura`, `feixe-borda`, `feixe-ativo`, `feixe-linha`, `feixe-pulso`, `feixe-brilho`, `holofote`, `holofote-ativo`, `cartao-holofote`, `grao`, `glow-azul`, `animate-acordeao-abrir`, `animate-acordeao-fechar`.

- [ ] **Step 1: Instalar dependências e ajustar Node**

```bash
npm install motion@^13 lenis@^1.3 @radix-ui/react-accordion@^1.2 clsx@^2 tailwind-merge@^3
printf '22\n' > .nvmrc
node -e 'const p=require("./package.json");p.engines={node:">=22.18"};require("fs").writeFileSync("package.json",JSON.stringify(p,null,2)+"\n")'
```

- [ ] **Step 2: `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...entradas: ClassValue[]) {
  return twMerge(clsx(entradas));
}
```

- [ ] **Step 3: `src/app/globals.css` — acrescentar** (manter tudo que existe; trocar a primeira linha e adicionar os blocos abaixo)

Trocar `@import "tailwindcss";` por:
```css
@import "tailwindcss" source(none);
@source "../";
```
(assim o Tailwind só varre `src/`, e não `docs/`.)

Dentro do `@theme` existente, acrescentar:
```css
  --animate-acordeao-abrir: acordeao-abrir 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  --animate-acordeao-fechar: acordeao-fechar 0.24s cubic-bezier(0.22, 1, 0.36, 1);
  --ease-lemis: cubic-bezier(0.22, 1, 0.36, 1);
```

No final do arquivo, acrescentar:
```css
@property --fb-angulo {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes acordeao-abrir {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}
@keyframes acordeao-fechar {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
@keyframes fb-girar {
  to { --fb-angulo: 360deg; }
}
@keyframes feixe-correr {
  from { stroke-dashoffset: 100; }
  to { stroke-dashoffset: 0; }
}

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

@layer components {
  /* Superfícies: anel de 1px + sombra suave + fundo um passo acima do campo. */
  .superficie-clara {
    background-color: var(--color-branco);
    border: 1px solid color-mix(in srgb, var(--color-tinta) 10%, transparent);
    border-radius: 16px;
    box-shadow:
      0 1px 2px color-mix(in srgb, var(--color-tinta) 6%, transparent),
      0 18px 44px -24px color-mix(in srgb, var(--color-tinta) 24%, transparent);
  }
  .superficie-escura {
    background-color: color-mix(in srgb, var(--color-branco) 5%, var(--color-tinta));
    border: 1px solid color-mix(in srgb, var(--color-branco) 12%, transparent);
    border-radius: 16px;
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--color-branco) 6%, transparent),
      0 24px 60px -30px color-mix(in srgb, var(--color-tinta) 80%, transparent);
  }

  .glow-azul {
    background: radial-gradient(closest-side, color-mix(in srgb, var(--color-azul) 32%, transparent), transparent 72%);
  }

  /* Grão: ladrilho SVG estático, rasterizado uma vez. Tinta a 35% de alfa, multiplicado. */
  .grao {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09 0 0 0 0 0.1 0 0 0 0 0.11 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    background-size: 160px 160px;
    mix-blend-mode: multiply;
  }

  /* Holofote: luz azul que segue o cursor num campo escuro. */
  .holofote {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s var(--ease-lemis);
    background: radial-gradient(560px circle at var(--hx, 50%) var(--hy, 50%), color-mix(in srgb, var(--color-azul) 18%, transparent), transparent 62%);
  }
  @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
    .holofote-ativo > .holofote { opacity: 1; }
  }

  /* Card com realce radial no cursor e elevação no hover. */
  .cartao-holofote {
    position: relative;
    overflow: hidden;
    transition: transform 0.35s var(--ease-lemis), box-shadow 0.35s var(--ease-lemis), border-color 0.35s var(--ease-lemis);
  }
  .cartao-holofote::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s var(--ease-lemis);
    background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-azul) 11%, transparent), transparent 60%);
  }
  @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
    .cartao-holofote:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--color-azul) 35%, transparent);
      box-shadow:
        0 1px 2px color-mix(in srgb, var(--color-tinta) 6%, transparent),
        0 28px 56px -24px color-mix(in srgb, var(--color-tinta) 32%, transparent);
    }
    .cartao-holofote:hover::before { opacity: 1; }
  }

  /* Feixe de borda: realce azul girando na borda (padrão Magic UI, na paleta). */
  .feixe-borda { position: relative; }
  .feixe-borda::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s var(--ease-lemis);
    background: conic-gradient(from var(--fb-angulo), transparent 0deg, transparent 250deg, var(--color-azul) 320deg, transparent 360deg);
    -webkit-mask: linear-gradient(var(--color-branco) 0 0) content-box, linear-gradient(var(--color-branco) 0 0);
    mask: linear-gradient(var(--color-branco) 0 0) content-box, linear-gradient(var(--color-branco) 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  .feixe-borda:hover::after,
  .feixe-borda:focus-within::after,
  .feixe-borda.feixe-ativo::after { opacity: 1; }
  @media (prefers-reduced-motion: no-preference) {
    .feixe-borda::after { animation: fb-girar 5s linear infinite; }
  }
  @media (prefers-reduced-motion: reduce) {
    .feixe-borda::after {
      background: conic-gradient(from 0deg, color-mix(in srgb, var(--color-azul) 60%, transparent), color-mix(in srgb, var(--color-azul) 60%, transparent));
    }
  }

  /* Feixe de conexão: linha base + pulso azul percorrendo o caminho. */
  .feixe-linha { stroke: color-mix(in srgb, var(--color-branco) 16%, transparent); }
  .feixe-pulso { stroke: var(--color-azul); stroke-dasharray: 16 84; stroke-dashoffset: 100; opacity: 0; }
  .feixe-brilho { filter: blur(4px); }
  @media (prefers-reduced-motion: no-preference) {
    .feixe-pulso {
      opacity: 1;
      animation: feixe-correr 3.2s linear infinite;
      animation-delay: var(--feixe-atraso, 0s);
    }
    .feixe-brilho { opacity: 0.55; }
  }
  @media (prefers-reduced-motion: reduce) {
    .feixe-linha { stroke: color-mix(in srgb, var(--color-azul) 70%, transparent); }
    .animate-acordeao-abrir, .animate-acordeao-fechar { animation: none; }
  }
}
```

- [ ] **Step 4: Primitivos de efeito**

`src/components/efeitos/Providers.tsx`:
```tsx
"use client";

import { useEffect, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "motion/react";
import Lenis from "lenis";

function ScrollSuave() {
  const reduzir = useReducedMotion();
  useEffect(() => {
    if (reduzir) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
    let quadro = 0;
    const loop = (tempo: number) => {
      lenis.raf(tempo);
      quadro = requestAnimationFrame(loop);
    };
    quadro = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(quadro);
      lenis.destroy();
    };
  }, [reduzir]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <ScrollSuave />
      </MotionConfig>
    </LazyMotion>
  );
}
```

`src/components/efeitos/Revelar.tsx`:
```tsx
"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

export const EASE_LEMIS = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

type Props = { children: ReactNode; atraso?: number; className?: string; y?: number };

export function Revelar({ children, atraso = 0, className, y = 24 }: Props) {
  const reduzir = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduzir ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={reduzir ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: reduzir ? 0.3 : 0.7, ease: EASE_LEMIS, delay: atraso }}
    >
      {children}
    </m.div>
  );
}
```

`src/components/efeitos/Palavras.tsx`:
```tsx
"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE_LEMIS } from "@/components/efeitos/Revelar";

type Props = { texto: string; className?: string; atraso?: number };

export function Palavras({ texto, className, atraso = 0 }: Props) {
  const reduzir = useReducedMotion();
  const palavras = texto.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palavras.map((palavra, i) => (
          <span key={`${palavra}-${i}`} className="inline-block overflow-hidden align-bottom">
            <m.span
              className="inline-block"
              initial={reduzir ? { opacity: 0 } : { opacity: 0, y: "0.7em" }}
              whileInView={reduzir ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: reduzir ? 0.3 : 0.6, ease: EASE_LEMIS, delay: atraso + i * 0.05 }}
            >
              {palavra}
            </m.span>
            {i < palavras.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
```
(O espaço fica dentro do `inline-block` externo para que a quebra de linha continue nas palavras; o `overflow-hidden` faz cada palavra "subir" de trás de uma linha.)

`src/components/efeitos/Parallax.tsx`:
```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = { children: ReactNode; className?: string; deslocamento?: number };

export function Parallax({ children, className, deslocamento = 48 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [deslocamento, -deslocamento]);
  return (
    <m.div ref={ref} className={className} style={reduzir ? undefined : { y }}>
      {children}
    </m.div>
  );
}
```

`src/components/efeitos/Inclinacao.tsx`:
```tsx
"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = { children: ReactNode; className?: string; graus?: number };

export function Inclinacao({ children, className, graus = 4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (reduzir || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * graus * 2);
    rx.set(-py * graus * 2);
  }
  function sair() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} className={className} onPointerMove={mover} onPointerLeave={sair}>
      <m.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
        {children}
      </m.div>
    </div>
  );
}
```

`src/components/efeitos/Padroes.tsx` (Server Components; cor por `currentColor`, alfa via `opacity-*` — permitido: são gráficos):
```tsx
import { useId } from "react";

type Props = { className?: string };

export function PadraoPontos({ className = "" }: Props) {
  const id = useId();
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function PadraoGrade({ className = "" }: Props) {
  const id = useId();
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function Glow({ className = "" }: Props) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-full glow-azul blur-3xl ${className}`} />;
}
```

`src/components/efeitos/Grao.tsx`:
```tsx
export function Grao() {
  return <div aria-hidden="true" className="grao pointer-events-none fixed inset-0 z-[60] opacity-[0.5]" />;
}
```

`src/components/efeitos/Holofote.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";

/** Renderize como filho direto de um elemento `relative`; o pai recebe o holofote. */
export function Holofote() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const pai = el?.parentElement;
    if (!el || !pai) return;
    const mover = (e: PointerEvent) => {
      const r = pai.getBoundingClientRect();
      el.style.setProperty("--hx", `${e.clientX - r.left}px`);
      el.style.setProperty("--hy", `${e.clientY - r.top}px`);
      pai.classList.add("holofote-ativo");
    };
    const sair = () => pai.classList.remove("holofote-ativo");
    pai.addEventListener("pointermove", mover);
    pai.addEventListener("pointerleave", sair);
    return () => {
      pai.removeEventListener("pointermove", mover);
      pai.removeEventListener("pointerleave", sair);
    };
  }, []);
  return <div ref={ref} className="holofote" aria-hidden="true" />;
}
```

`src/components/efeitos/CartaoHolofote.tsx`:
```tsx
"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export function CartaoHolofote({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  function mover(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onPointerMove={mover} className={`cartao-holofote ${className}`}>
      {children}
    </div>
  );
}
```

`src/components/efeitos/FeixeConexao.tsx` — caminho no gesto do **l** entre dois nós (posições por `offset*`, imunes a transforms de reveal):
```tsx
"use client";

import { useEffect, useState, type CSSProperties, type RefObject } from "react";

type Props = {
  conteinerRef: RefObject<HTMLElement | null>;
  deRef: RefObject<HTMLElement | null>;
  paraRef: RefObject<HTMLElement | null>;
  atraso?: number;
  raio?: number;
};

function centroX(el: HTMLElement) {
  return el.offsetLeft + el.offsetWidth / 2;
}

export function FeixeConexao({ conteinerRef, deRef, paraRef, atraso = 0, raio = 24 }: Props) {
  const [d, setD] = useState("");
  const [tam, setTam] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const c = conteinerRef.current;
    const a = deRef.current;
    const b = paraRef.current;
    if (!c || !a || !b) return;
    const calcular = () => {
      const ax = centroX(a);
      const ay = a.offsetTop + a.offsetHeight;
      const bTopo = b.offsetTop;
      const bMeioY = b.offsetTop + b.offsetHeight / 2;
      const bEsq = b.offsetLeft;
      const bDir = b.offsetLeft + b.offsetWidth;
      let caminho: string;
      if (ax > bEsq && ax < bDir) {
        caminho = `M${ax} ${ay}V${bTopo}`;
      } else if (bEsq >= ax) {
        caminho = `M${ax} ${ay}V${bMeioY - raio}Q${ax} ${bMeioY} ${ax + raio} ${bMeioY}H${bEsq}`;
      } else {
        caminho = `M${ax} ${ay}V${bMeioY - raio}Q${ax} ${bMeioY} ${ax - raio} ${bMeioY}H${bDir}`;
      }
      setD(caminho);
      setTam({ w: c.offsetWidth, h: c.offsetHeight });
    };
    calcular();
    const ro = new ResizeObserver(calcular);
    ro.observe(c);
    return () => ro.disconnect();
  }, [conteinerRef, deRef, paraRef, raio]);

  if (!d) return null;
  const estilo = { "--feixe-atraso": `${atraso}s` } as CSSProperties;
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={tam.w}
      height={tam.h}
      viewBox={`0 0 ${tam.w} ${tam.h}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} className="feixe-linha" strokeWidth={1.5} />
      <path d={d} pathLength={100} className="feixe-pulso feixe-brilho" strokeWidth={6} strokeLinecap="round" style={estilo} />
      <path d={d} pathLength={100} className="feixe-pulso" strokeWidth={2} strokeLinecap="round" style={estilo} />
    </svg>
  );
}
```

`src/components/efeitos/LinhaProgresso.tsx`:
```tsx
"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE_LEMIS } from "@/components/efeitos/Revelar";

export function LinhaProgresso({ className = "" }: { className?: string }) {
  const reduzir = useReducedMotion();
  return (
    <m.div
      aria-hidden="true"
      className={`h-px origin-left bg-azul ${className}`}
      initial={reduzir ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE_LEMIS }}
    />
  );
}
```

- [ ] **Step 5: `src/components/ui/accordion.tsx`** (shadcn/ui, Radix, adaptado à paleta)

```tsx
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-fio-claro last:border-b-0", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "t-sub group flex flex-1 items-start justify-between gap-6 py-5 text-left text-tinta transition-colors duration-200 hover:text-azul",
          className,
        )}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="mt-1 shrink-0 text-azul">
          <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            focusable="false"
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-acordeao-fechar data-[state=open]:animate-acordeao-abrir"
      {...props}
    >
      <div className={cn("pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

- [ ] **Step 6: `Secao.tsx` com `fundo` e `overflow-clip`**

Substituir o arquivo inteiro:
```tsx
import type { ReactNode } from "react";
import { Conector } from "@/components/marca/Conector";
import { Container } from "@/components/ui/Container";

type Props = {
  id: string;
  campo: "papel" | "tinta";
  pergunta: string;
  separador?: boolean;
  fundo?: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
};

export function Secao({ id, campo, pergunta, separador = false, fundo, extra, children }: Props) {
  const escuro = campo === "tinta";
  const fio = escuro ? "border-fio-escuro" : "border-fio-claro";
  const corConector = escuro ? "text-branco" : "text-azul";
  return (
    <section id={id} className={`campo-${campo} relative overflow-clip ${separador ? `border-t ${fio}` : ""}`}>
      {fundo}
      <Container className="relative py-20 md:py-28 lg:py-36">
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

- [ ] **Step 7: `Botao.tsx` — hover com seta deslizando e escala no clique**

Trocar a className do `<a>` por:
```
`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 t-controle transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none ${ESTILOS[variante]} ${className}`
```
Em `ESTILOS.primario` acrescentar `hover:shadow-[0_12px_28px_-12px_color-mix(in_srgb,var(--color-azul)_60%,transparent)]`. Em `SetaExterna`, trocar a className do svg para `className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"`.

- [ ] **Step 8: `layout.tsx`** — envolver com `Providers` e adicionar `Grao`

```tsx
import { Grao } from "@/components/efeitos/Grao";
import { Providers } from "@/components/efeitos/Providers";
// ...
      <body className="campo-papel font-sans">
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <Providers>{children}</Providers>
        <Grao />
      </body>
```

- [ ] **Step 9: `scripts/verificar-marca.mjs`** — regras de alfa/opacidade

Trocar a linha `if (/\bopacity-\d/.test(linha)) problemas.push(...)` por:
```js
    if (/\bopacity-(\d|\[)/.test(linha) && !rel.startsWith("src/components/efeitos/") && !/aria-hidden|Padrao|Glow|Grao/.test(linha)) problemas.push(`${rel}:${i + 1}: opacidade fora de elemento gráfico`);
```
Trocar a linha `if (/\b(text|bg|border)-[a-z-]+\/\d{1,3}\b/.test(linha)) ...` por:
```js
    if (/\btext-[a-z-]+\/\d{1,3}\b/.test(linha)) problemas.push(`${rel}:${i + 1}: texto com alfa`);
```

- [ ] **Step 10: Verificar**

```bash
npm test && npx tsc --noEmit && npm run lint && npm run verificar && npm run build
```
Tudo verde. No build, anotar o tamanho dos chunks. Se `@source "../"` não for aceito pela versão instalada do Tailwind (checar `npm ls tailwindcss`), usar `@import "tailwindcss"; @source not "../../docs";` e registrar no relatório.

---

### Task 2: Header flutuante, Hero com painel de conexão

**Files:** Modify `src/components/secoes/Header.tsx`, `src/components/secoes/Hero.tsx`. Create `src/components/secoes/HeroPainel.tsx`.

**Interfaces:** Consome `Revelar`, `Palavras`, `Parallax`, `Inclinacao`, `PadraoPontos`, `Glow`, `FeixeConexao`, `Icone`, classes `superficie-escura`, `feixe-borda feixe-ativo`; `servicos.itens`, `ctaFinal.titulo`, `hero`, `cta`, `nav`.

- [ ] **Step 1: `Header.tsx`** — substituir inteiro

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/marca/Wordmark";
import { Botao } from "@/components/ui/Botao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, nav } from "@/lib/conteudo";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 16);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const vidro = rolou || aberto
    ? "border-fio-claro bg-[color-mix(in_srgb,var(--color-papel)_78%,transparent)] shadow-[0_12px_40px_-20px_color-mix(in_srgb,var(--color-tinta)_40%,transparent)] backdrop-blur-md"
    : "border-transparent bg-transparent";

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-5">
      <div className={`mx-auto max-w-[1408px] rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${vidro}`}>
        <div className="flex h-16 items-center justify-between gap-6 px-4 md:px-6">
          <a href="#inicio" aria-label="Lemis, início da página" className="shrink-0 text-azul">
            <Wordmark className="h-auto w-28" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="t-controle text-tinta underline-offset-[0.2em] transition-colors duration-200 hover:text-azul hover:underline">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
          </div>

          <button
            ref={botaoRef}
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
        </div>

        <div id="menu-mobile" hidden={!aberto} className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-fio-claro lg:hidden">
          <div className="px-4 py-6 md:px-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-fio-claro">
                  <a href={item.href} onClick={() => setAberto(false)} className="t-sub block py-4 text-tinta">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
            <Botao href={LINK_WHATSAPP} externo className="mt-6 w-full">{cta.rotulo}</Botao>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: `HeroPainel.tsx`** — painel de conexão (client)

```tsx
"use client";

import { useRef } from "react";
import { FeixeConexao } from "@/components/efeitos/FeixeConexao";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Inclinacao } from "@/components/efeitos/Inclinacao";
import { Revelar } from "@/components/efeitos/Revelar";
import { Icone } from "@/components/marca/Icone";
import { ctaFinal, servicos } from "@/lib/conteudo";

const POSICOES = ["justify-self-start", "justify-self-end", "justify-self-start", "justify-self-end"] as const;

export function HeroPainel() {
  const painelRef = useRef<HTMLDivElement>(null);
  const n0 = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);
  const nos = [n0, n1, n2, n3];
  const [t0, t1, t2, t3, destino] = servicos.itens;

  return (
    <Inclinacao className="w-full">
      <div className="superficie-escura relative overflow-hidden rounded-[24px] p-5 text-branco sm:p-7 lg:p-8">
        <PadraoPontos className="text-branco opacity-[0.10] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
        <Glow className="-right-24 -bottom-24 h-80 w-80" />

        <div className="relative">
          <p className="t-rotulo text-secundario-escuro">{ctaFinal.titulo}</p>

          <div ref={painelRef} className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-y-9">
            {[t0, t1, t2, t3].map((item, i) => (
              <div key={item.nome} className={`${POSICOES[i]} col-span-2 sm:col-span-1 ${i % 2 === 1 ? "sm:col-start-2" : ""}`}>
                <Revelar atraso={0.15 + i * 0.12} y={16}>
                  <div ref={nos[i]} className="superficie-escura flex items-center gap-3 rounded-[12px] px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[color-mix(in_srgb,var(--color-azul)_18%,transparent)] text-azul">
                      <Icone nome={item.icone} tamanho={24} />
                    </span>
                    <span className="t-controle text-branco">{item.nome}</span>
                  </div>
                </Revelar>
              </div>
            ))}

            <div className="col-span-2">
              <Revelar atraso={0.7} y={16}>
                <div ref={n4} className="superficie-escura feixe-borda feixe-ativo flex items-center gap-3 rounded-[12px] px-4 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-azul text-branco">
                    <Icone nome={destino.icone} tamanho={24} />
                  </span>
                  <span className="t-controle text-branco">{destino.nome}</span>
                </div>
              </Revelar>
            </div>

            <FeixeConexao conteinerRef={painelRef} deRef={n0} paraRef={n1} atraso={0} />
            <FeixeConexao conteinerRef={painelRef} deRef={n1} paraRef={n2} atraso={0.8} />
            <FeixeConexao conteinerRef={painelRef} deRef={n2} paraRef={n3} atraso={1.6} />
            <FeixeConexao conteinerRef={painelRef} deRef={n3} paraRef={n4} atraso={2.4} />
          </div>
        </div>
      </div>
    </Inclinacao>
  );
}
```
Observação: `FeixeConexao` mede `offsetLeft/offsetTop` dos nós em relação ao `offsetParent`. O `painelRef` está na grade (`relative`), que é o ancestral posicionado mais próximo dos nós (os `Revelar` só aplicam `transform`/`opacity`, o que não muda o `offsetParent`); os SVGs dos feixes ficam `absolute inset-0` dentro dessa mesma grade e, por serem absolutos, não ocupam células.

- [ ] **Step 3: `Hero.tsx`** — substituir inteiro

```tsx
import { Parallax } from "@/components/efeitos/Parallax";
import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Glow } from "@/components/efeitos/Padroes";
import { HeroPainel } from "@/components/secoes/HeroPainel";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, hero } from "@/lib/conteudo";

export function Hero() {
  return (
    <section id="inicio" className="campo-papel relative -mt-[4.75rem] overflow-clip pt-[4.75rem]">
      <Glow className="top-1/3 -right-40 h-[36rem] w-[36rem] opacity-60" />
      <Container className="relative py-16 md:py-24 lg:min-h-[min(calc(100svh-4.75rem),920px)] lg:py-28">
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h1 className="t-display max-w-[11ch]">
              <Palavras texto={hero.titulo} />
            </h1>
            <Revelar atraso={0.35}>
              <p className="t-lead mt-8 max-w-[52ch]">{hero.paragrafo}</p>
            </Revelar>
            <Revelar atraso={0.5}>
              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
                <a
                  href={hero.secundario.href}
                  className="group inline-flex items-center gap-2 t-controle text-tinta underline underline-offset-[0.2em] transition-colors duration-200 hover:text-azul"
                >
                  {hero.secundario.rotulo}
                  <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none">
                    <path d="M8 3v10M4 9l4 4 4-4" />
                  </svg>
                </a>
              </div>
            </Revelar>
          </div>

          <div className="lg:col-span-6">
            <Revelar atraso={0.2} y={32}>
              <Parallax deslocamento={28}>
                <HeroPainel />
              </Parallax>
            </Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
```
O `-mt-[4.75rem] pt-[4.75rem]` compensa o header flutuante (16px de margem + 64px de barra = 4.75rem... na verdade `pt-3` = 12px + 64px = 76px = 4.75rem) para o campo papel começar atrás da barra.

- [ ] **Step 4: Verificar**

```bash
npx tsc --noEmit && npm run lint && npm run verificar
```

---

### Task 3: Problema, Servicos (bento), Fundamentos (cards + mensagem)

**Files:** Modify `src/components/secoes/Problema.tsx`, `Servicos.tsx`, `Fundamentos.tsx`.

- [ ] **Step 1: `Problema.tsx`**

```tsx
import { Holofote } from "@/components/efeitos/Holofote";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Secao } from "@/components/ui/Secao";
import { problema } from "@/lib/conteudo";

export function Problema() {
  return (
    <Secao
      id="problema"
      campo="tinta"
      pergunta={problema.pergunta}
      fundo={
        <>
          <PadraoPontos className="text-branco opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
          <Glow className="top-0 right-0 h-[28rem] w-[28rem] opacity-50" />
          <Holofote />
        </>
      }
    >
      <p className="t-titulo text-branco">
        <Palavras texto={problema.afirmacao} />
      </p>
      <Revelar atraso={0.3}>
        <div className="t-corpo mt-8 max-w-[58ch] space-y-5">
          {problema.corpo.map((paragrafo) => (
            <p key={paragrafo} className="text-secundario-escuro">{paragrafo}</p>
          ))}
          <p className="font-semibold text-branco">{problema.fecho}</p>
        </div>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 2: `Servicos.tsx`** — bento de cinco cards

```tsx
import { CartaoHolofote } from "@/components/efeitos/CartaoHolofote";
import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Icone } from "@/components/marca/Icone";
import { Secao } from "@/components/ui/Secao";
import { servicos } from "@/lib/conteudo";

const COLUNAS = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "md:col-span-2 lg:col-span-7"] as const;

function Check() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="mt-[0.2em] shrink-0 text-azul">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function ListaServicos() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {servicos.itens.map((item, i) => {
        const destaque = i === servicos.itens.length - 1;
        return (
          <li key={item.nome} className={COLUNAS[i]}>
            <Revelar atraso={i * 0.08} className="h-full">
              <CartaoHolofote className={`h-full p-6 lg:p-7 ${destaque ? "superficie-escura text-branco" : "superficie-clara"}`}>
                {destaque ? <PadraoPontos className="text-branco opacity-[0.08] [mask-image:radial-gradient(ellipse_at_bottom_right,black_20%,transparent_70%)]" /> : null}
                <div className="relative">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${destaque ? "bg-azul text-branco" : "bg-[color-mix(in_srgb,var(--color-azul)_10%,transparent)] text-azul"}`}>
                    <Icone nome={item.icone} tamanho={24} />
                  </span>
                  <h3 className="t-sub mt-6">{item.nome}</h3>
                  <p className={`t-corpo mt-3 max-w-[46ch] ${destaque ? "text-secundario-escuro" : "text-secundario"}`}>{item.descricao}</p>
                  <ul className={`mt-6 space-y-2 border-t pt-5 ${destaque ? "border-fio-escuro" : "border-fio-claro"}`}>
                    {item.inclui.map((linha) => (
                      <li key={linha} className="t-legenda flex gap-3">
                        <Check />
                        {linha}
                      </li>
                    ))}
                  </ul>
                </div>
              </CartaoHolofote>
            </Revelar>
          </li>
        );
      })}
    </ul>
  );
}

export function Servicos() {
  return (
    <Secao id="o-que-fazemos" campo="papel" pergunta={servicos.pergunta} extra={<ListaServicos />}>
      <Revelar>
        <p className="t-titulo">{servicos.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{servicos.corpo}</p>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 3: `Fundamentos.tsx`** — cards com feixe de borda + mensagem

```tsx
import { Holofote } from "@/components/efeitos/Holofote";
import { Glow, PadraoGrade } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Simbolo } from "@/components/marca/Simbolo";
import { Secao } from "@/components/ui/Secao";
import { fundamentos } from "@/lib/conteudo";

function Compromissos() {
  return (
    <>
      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {fundamentos.itens.map((item, i) => (
          <li key={item.nome}>
            <Revelar atraso={i * 0.1} className="h-full">
              <div className="superficie-escura feixe-borda h-full p-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 motion-reduce:transition-none">
                <h3 className="t-rotulo text-secundario-escuro">{item.nome}</h3>
                <p className="t-sub mt-4 max-w-[26ch] text-branco">{item.frase}</p>
                <p className="t-corpo mt-4 max-w-[40ch] text-secundario-escuro">{item.corpo}</p>
              </div>
            </Revelar>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-y-6 lg:grid-cols-12 lg:gap-x-6">
        <Revelar className="lg:col-span-5">
          <p className="t-rotulo text-secundario-escuro">{fundamentos.exemplo.rotulo}</p>
        </Revelar>
        <Revelar atraso={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="superficie-escura max-w-[44ch] p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-azul text-branco">
                <Simbolo className="h-5 w-5" />
              </span>
              <span className="t-controle text-branco">Lemis</span>
            </div>
            <p className="t-sub mt-5 text-branco">“{fundamentos.exemplo.fala}”</p>
          </div>
          <p className="t-legenda mt-4 max-w-[52ch] text-secundario-escuro">{fundamentos.exemplo.nota}</p>
        </Revelar>
      </div>
    </>
  );
}

export function Fundamentos() {
  return (
    <Secao
      id="como-trabalhamos"
      campo="tinta"
      pergunta={fundamentos.pergunta}
      extra={<Compromissos />}
      fundo={
        <>
          <PadraoGrade className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <Glow className="-bottom-40 left-1/3 h-[30rem] w-[30rem] opacity-40" />
          <Holofote />
        </>
      }
    >
      <Revelar>
        <p className="t-titulo text-branco">{fundamentos.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario-escuro">{fundamentos.corpo}</p>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 4: Verificar** — `npx tsc --noEmit && npm run lint && npm run verificar`.

---

### Task 4: ParaQuem, ProximoPasso, Perguntas (Accordion), CtaFinal, Footer, page

**Files:** Modify `src/components/secoes/ParaQuem.tsx`, `ProximoPasso.tsx`, `Perguntas.tsx`, `CtaFinal.tsx`, `Footer.tsx`, `src/app/page.tsx`.

- [ ] **Step 1: `ParaQuem.tsx`**

```tsx
import { Revelar } from "@/components/efeitos/Revelar";
import { Secao } from "@/components/ui/Secao";
import { paraQuem } from "@/lib/conteudo";

function CheckDisco() {
  return (
    <span aria-hidden="true" className="mt-[0.15em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-azul text-branco">
      <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

export function ParaQuem() {
  return (
    <Secao id="para-quem" campo="papel" pergunta={paraQuem.pergunta}>
      <Revelar>
        <p className="t-titulo">{paraQuem.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{paraQuem.corpo}</p>
      </Revelar>
      <Revelar atraso={0.15}>
        <div className="superficie-clara mt-12 p-6 lg:p-7">
          <h3 className="t-rotulo text-secundario">{paraQuem.listaTitulo}</h3>
          <ul className="mt-4 divide-y divide-fio-claro">
            {paraQuem.lista.map((item, i) => (
              <li key={item}>
                <Revelar atraso={0.25 + i * 0.1} y={12} className="t-corpo flex gap-4 py-4">
                  <CheckDisco />
                  <span>{item}</span>
                </Revelar>
              </li>
            ))}
          </ul>
        </div>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 2: `ProximoPasso.tsx`**

```tsx
import { LinhaProgresso } from "@/components/efeitos/LinhaProgresso";
import { Revelar } from "@/components/efeitos/Revelar";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, proximoPasso } from "@/lib/conteudo";

function Passos() {
  return (
    <div>
      <LinhaProgresso className="mb-8 w-full" />
      <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {proximoPasso.passos.map((passo, i) => (
          <li key={passo.titulo}>
            <Revelar atraso={0.2 + i * 0.15} className="h-full">
              <div className="superficie-clara h-full p-7">
                <span aria-hidden="true" className="t-controle flex h-10 w-10 items-center justify-center rounded-full bg-azul text-branco tabular-nums">
                  {i + 1}
                </span>
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
    </div>
  );
}

export function ProximoPasso() {
  return (
    <Secao id="proximo-passo" campo="papel" separador pergunta={proximoPasso.pergunta} extra={<Passos />}>
      <Revelar>
        <p className="t-titulo">{proximoPasso.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{proximoPasso.corpo}</p>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 3: `Perguntas.tsx`** — Accordion shadcn

```tsx
import { Revelar } from "@/components/efeitos/Revelar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Secao } from "@/components/ui/Secao";
import { perguntas } from "@/lib/conteudo";

export function Perguntas() {
  return (
    <Secao id="perguntas" campo="papel" separador pergunta={perguntas.titulo}>
      <Revelar>
        <div className="superficie-clara px-6 lg:px-8">
          <Accordion type="single" collapsible>
            {perguntas.itens.map((item, i) => (
              <AccordionItem key={item.pergunta} value={`pergunta-${i}`}>
                <AccordionTrigger>{item.pergunta}</AccordionTrigger>
                <AccordionContent>
                  <p className="t-corpo max-w-[58ch] text-secundario">{item.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Revelar>
    </Secao>
  );
}
```

- [ ] **Step 4: `CtaFinal.tsx`**

```tsx
import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Motivo } from "@/components/marca/Motivo";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, ctaFinal } from "@/lib/conteudo";

export function CtaFinal() {
  return (
    <section id="contato" className="campo-azul relative overflow-clip">
      <PadraoPontos className="text-branco opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-branco)_14%,transparent),transparent_70%)] blur-3xl" />
      <Container className="relative z-10 pt-24 pb-12 md:pt-32 lg:min-h-[640px] lg:py-40">
        <div className="lg:w-5/12">
          <h2 className="t-display max-w-[12ch]">
            <Palavras texto={ctaFinal.titulo} />
          </h2>
          <Revelar atraso={0.3}>
            <p className="t-lead mt-8 max-w-[36ch]">{ctaFinal.apoio}</p>
          </Revelar>
          <Revelar atraso={0.45}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Botao href={LINK_WHATSAPP} externo variante="sobre-azul">{cta.rotulo}</Botao>
              <p className="t-legenda">{ctaFinal.nota}</p>
            </div>
          </Revelar>
        </div>
      </Container>
      <div className="text-papel lg:hidden">
        <Motivo className="block h-auto w-full" />
      </div>
      <svg
        viewBox="0 0 640 1000"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute right-0 bottom-0 hidden h-auto w-[min(56vw,820px)] text-papel lg:block"
      >
        <path d="M40 0V860q0 60 60 60h220q60 0 60-60V740q0-40 40-40h220" stroke="currentColor" strokeWidth={24} />
      </svg>
    </section>
  );
}
```

- [ ] **Step 5: `Footer.tsx`** — envolver o conteúdo do `Container` em `<Revelar>` (um único wrapper em volta dos dois blocos). `src/app/page.tsx`: `<main id="conteudo" tabIndex={-1} className="outline-none">`.

- [ ] **Step 6: Verificar** — `npx tsc --noEmit && npm run lint && npm run verificar`.

---

### Task 5: Build, métricas, validação no navegador (controlador)

- [ ] Build; medir JS gzip (script da linha de base) e Lighthouse desktop/mobile; comparar com `antes`.
- [ ] agent-browser 1440/390: fold, seções, hover em card, acordeão, menu; Chrome com `--force-prefers-reduced-motion` via `--cdp` para validar o modo reduzido (Lenis ausente, feixes estáticos, sem inclinação).
- [ ] Lote único de correções; recaptura; RESUMO.md atualizado (bibliotecas e porquês, efeitos e o que comunicam, antes/depois, capturas novas).
