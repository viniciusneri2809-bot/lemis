"use client";

import { Fragment } from "react";
import { m } from "motion/react";
import { EASE_LEMIS } from "@/components/efeitos/Revelar";

type Props = { texto: string; className?: string; atraso?: number };

/** Palavra a palavra em view. A redução de movimento é feita pelo MotionConfig (transform instantâneo). */
export function Palavras({ texto, className, atraso = 0 }: Props) {
  const palavras = texto.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palavras.map((palavra, i) => (
          <Fragment key={`${palavra}-${i}`}>
            <m.span
              className="inline-block"
              initial={{ opacity: 0, y: "0.6em" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: EASE_LEMIS, delay: atraso + i * 0.05 }}
            >
              {palavra}
            </m.span>
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
