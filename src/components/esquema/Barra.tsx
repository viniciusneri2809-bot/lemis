type Props = { largura?: string; forte?: boolean; className?: string };

/** Retângulo "fantasma": ocupa o lugar de um dado sem inventar o dado. */
export function Barra({ largura = "100%", forte = false, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{ width: largura }}
      className={`block h-[10px] rounded-full ${
        forte
          ? "bg-[color-mix(in_srgb,currentColor_38%,transparent)]"
          : "bg-[color-mix(in_srgb,currentColor_16%,transparent)]"
      } ${className}`}
    />
  );
}
