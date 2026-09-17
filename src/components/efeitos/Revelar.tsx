"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

export const EASE_LEMIS = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

type Props = { children: ReactNode; atraso?: number; className?: string; y?: number };

/** Entrada em view. Com movimento reduzido, o MotionConfig torna o deslocamento instantâneo; opacidade e blur ainda cruzam suavemente. */
export function Revelar({ children, atraso = 0, className, y = 24 }: Props) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_LEMIS, delay: atraso }}
    >
      {children}
    </m.div>
  );
}
