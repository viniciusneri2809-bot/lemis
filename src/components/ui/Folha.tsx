import type { ReactNode } from "react";

type Props = { lado?: "direita" | "esquerda"; className?: string; children: ReactNode };

/**
 * Folha de papel deslocada: entra pela grade de um lado e sangra pelo outro até fora da tela.
 * É o que dá duas das sete larguras da página e a única superfície clara que sobrou, depois que
 * os cards saíram. Leva `campo-papel` junto, que traz fundo, cor de texto e cor de foco.
 */
export function Folha({ lado = "direita", className = "", children }: Props) {
  return (
    <div className={`folha campo-papel ${lado === "esquerda" ? "folha-esquerda" : ""} ${className}`}>
      {children}
    </div>
  );
}
