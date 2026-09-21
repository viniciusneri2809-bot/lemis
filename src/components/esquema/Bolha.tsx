import type { ReactNode } from "react";
import { Barra } from "./Barra";

type Props = { lado: "recebida" | "enviada"; hora?: string; children?: ReactNode; className?: string };

/**
 * Bolha de conversa. Sem filho, entra em barras-fantasma: a resposta existe, o texto não é nosso.
 *
 * A hora sai em `currentColor` a noventa por cento, não a sessenta e cinco: medido, a sessenta e
 * cinco ela ficava em 3,33 para 1 sobre o azul num corpo de 11px. A noventa fica em 5,03 sobre o
 * azul e 10,7 sobre a tinta, e continua lendo como carimbo de horário, não como texto da conversa.
 */
export function Bolha({ lado, hora, children, className = "" }: Props) {
  const enviada = lado === "enviada";
  return (
    <span
      aria-hidden="true"
      className={`t-legenda block max-w-[86%] rounded-[14px] px-4 py-3 ${
        enviada
          ? "ml-auto rounded-br-[4px] bg-azul text-branco"
          : "rounded-bl-[4px] bg-[color-mix(in_srgb,var(--color-branco)_8%,transparent)] text-branco"
      } ${className}`}
    >
      {children ?? (
        <>
          <Barra largura="72%" forte />
          <Barra largura="48%" className="mt-2" />
        </>
      )}
      {hora ? (
        <span className="mt-1 block text-right text-[11px] text-[color-mix(in_srgb,currentColor_90%,transparent)]">
          {hora}
        </span>
      ) : null}
    </span>
  );
}
