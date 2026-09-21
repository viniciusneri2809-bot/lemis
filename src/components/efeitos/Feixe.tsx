import type { CSSProperties } from "react";

type Props = { eixo: "h" | "v"; atraso?: number; className?: string };

/**
 * Filete com um pulso azul correndo. CSS puro: não mede geometria, não entra no bundle e
 * respeita `prefers-reduced-motion` virando um filete azul estático (regra do `base.css` da
 * exploração, mantida). Herda a cor do campo: sobre papel o filete escurece sozinho.
 */
export function Feixe({ eixo, atraso, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      style={atraso ? ({ "--atraso": `${atraso}s` } as CSSProperties) : undefined}
      className={`feixe feixe-${eixo} ${className}`}
    />
  );
}
