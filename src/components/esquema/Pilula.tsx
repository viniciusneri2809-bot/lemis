import type { ReactNode } from "react";

/** Rótulo-pílula do cabeçalho de seção: anel de 1px e ponto azul à esquerda. */
export function Pilula({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`t-rotulo inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,currentColor_16%,transparent)] px-3.5 py-1.5 ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-azul" />
      {children}
    </span>
  );
}
