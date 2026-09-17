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
