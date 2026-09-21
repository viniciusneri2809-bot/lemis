/** Numeral em serifa + traço que corre até a borda. Corpo >= 40px: exigência do t-destaque. */
export function Marco({ numero, className = "" }: { numero: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-4 ${className}`}>
      <span className="t-destaque text-[2.5rem] leading-none">{String(numero).padStart(2, "0")}</span>
      <span className="h-px flex-1 bg-[color-mix(in_srgb,currentColor_18%,transparent)]" />
    </span>
  );
}
