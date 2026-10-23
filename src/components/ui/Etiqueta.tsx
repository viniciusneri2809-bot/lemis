// A etiqueta do protótipo aprovado: pílula azul clara acima do título da seção.
export function Etiqueta({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-azul-50 px-3 py-1.5 text-[13px] font-semibold text-azul">{children}</span>;
}
