"use client";

import { useEffect, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "motion/react";

function ScrollSuave() {
  const reduzir = useReducedMotion();
  useEffect(() => {
    if (reduzir || !window.matchMedia("(pointer: fine)").matches) return;
    let ativo = true;
    let quadro = 0;
    let instancia: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (!ativo) return;
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
      instancia = lenis;
      const loop = (tempo: number) => {
        lenis.raf(tempo);
        quadro = requestAnimationFrame(loop);
      };
      quadro = requestAnimationFrame(loop);
    });
    return () => {
      ativo = false;
      cancelAnimationFrame(quadro);
      instancia?.destroy();
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
