import type { CSSProperties } from "react";

type Props = { texto: string; className?: string };

/** Só para o H1 do hero: anima por CSS desde o primeiro paint, sem esperar o JS. */
export function PalavrasHero({ texto, className }: Props) {
  const palavras = texto.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palavras.map((palavra, i) => (
          <span key={`${palavra}-${i}`}>
            <span className="entra-hero inline-block" style={{ "--i": i } as CSSProperties}>
              {palavra}
            </span>
            {i < palavras.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
