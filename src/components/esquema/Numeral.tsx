type Tamanho = "sm" | "md" | "lg";

/** 48 / 96 / 120 px no desktop. Todos acima dos 40px que o azul sobre tinta exige. */
const TAMANHOS: Record<Tamanho, string> = {
  sm: "text-[2.5rem] lg:text-[3rem]",
  md: "text-[3.5rem] lg:text-[6rem]",
  lg: "text-[4.5rem] lg:text-[7.5rem]",
};

/**
 * Numeral em serifa solto no campo, sem traço e sem caixa. Substitui o `Marco` nas seções
 * editoriais: lá o filete acompanhava o numeral e desenhava mais uma linha horizontal por
 * bloco; aqui quem separa é a coluna.
 */
export function Numeral({
  numero,
  tamanho = "sm",
  className = "",
}: {
  numero: number;
  tamanho?: Tamanho;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`t-destaque block leading-[0.9] ${TAMANHOS[tamanho]} ${className}`}>
      {String(numero).padStart(2, "0")}
    </span>
  );
}
