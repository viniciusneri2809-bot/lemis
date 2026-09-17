"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = { children: ReactNode; className?: string; deslocamento?: number };

const semInscricao = () => () => {};

export function Parallax({ children, className, deslocamento = 48 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const montado = useSyncExternalStore(
    semInscricao,
    () => true,
    () => false,
  );
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [deslocamento, -deslocamento]);
  return (
    <m.div ref={ref} className={className} style={montado && !reduzir ? { y } : undefined}>
      {children}
    </m.div>
  );
}
