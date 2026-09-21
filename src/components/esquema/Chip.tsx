import type { ReactNode } from "react";

type Props = { tom?: "neutro" | "azul"; children: ReactNode; className?: string };

/** Cápsula pequena com ponto. Azul marca estado conquistado; neutro marca falta. */
export function Chip({ tom = "neutro", children, className = "" }: Props) {
  const cor =
    tom === "azul"
      ? "border-[color-mix(in_srgb,var(--color-azul)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-azul)_14%,transparent)]"
      : "border-[color-mix(in_srgb,currentColor_18%,transparent)]";
  return (
    <span className={`t-legenda inline-flex items-center gap-2 rounded-full border px-3 py-1 ${cor} ${className}`}>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          tom === "azul" ? "bg-azul" : "bg-[color-mix(in_srgb,currentColor_50%,transparent)]"
        }`}
      />
      {children}
    </span>
  );
}
