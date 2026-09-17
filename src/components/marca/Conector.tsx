type Props = { tamanho: "grande" | "pequeno"; className?: string };

const GEOMETRIA = {
  grande: { viewBox: "0 0 80 160", d: "M12 0V112q0 36 36 36H80", largura: 12 },
  pequeno: { viewBox: "0 0 48 64", d: "M8 0V40q0 16 16 16H48", largura: 8 },
} as const;

export function Conector({ tamanho, className = "" }: Props) {
  const g = GEOMETRIA[tamanho];
  return (
    <svg
      viewBox={g.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`conector ${className}`}
    >
      <path d={g.d} pathLength={1} stroke="currentColor" strokeWidth={g.largura} />
    </svg>
  );
}
