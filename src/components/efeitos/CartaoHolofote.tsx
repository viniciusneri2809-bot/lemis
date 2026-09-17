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
