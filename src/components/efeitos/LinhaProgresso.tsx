"use client";

import { m } from "motion/react";
import { EASE_LEMIS } from "@/components/efeitos/Revelar";

export function LinhaProgresso({ className = "" }: { className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      className={`h-px origin-left bg-azul ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE_LEMIS }}
    />
  );
}
