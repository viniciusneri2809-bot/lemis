import type { ReactNode } from "react";

type Variante = "primario" | "sobre-azul" | "contorno-escuro";

const ESTILOS: Record<Variante, string> = {
  primario:
    "bg-azul text-branco hover:bg-azul-hover active:bg-azul-ativo hover:shadow-[0_12px_28px_-12px_color-mix(in_srgb,var(--color-azul)_60%,transparent)]",
  "sobre-azul": "bg-branco text-azul hover:bg-papel active:bg-papel",
  "contorno-escuro":
    "border border-secundario-escuro text-branco hover:border-branco hover:bg-branco hover:text-tinta",
};

type Props = {
  href: string;
  variante?: Variante;
  externo?: boolean;
  className?: string;
  children: ReactNode;
};

export function SetaExterna() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
    >
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  );
}

export function Botao({ href, variante = "primario", externo = false, className = "", children }: Props) {
  const externoProps = externo ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...externoProps}
      className={`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 t-controle transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] motion-reduce:transition-none ${ESTILOS[variante]} ${className}`}
    >
      {children}
      {externo ? (
        <>
          <SetaExterna />
          <span className="sr-only">(abre em nova aba)</span>
        </>
      ) : null}
    </a>
  );
}
