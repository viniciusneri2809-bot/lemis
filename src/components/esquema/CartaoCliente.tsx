import { Barra } from "./Barra";
import { Chip } from "./Chip";

type Props = {
  campo?: "papel" | "tinta";
  tamanho?: "normal" | "grande";
  chip?: string;
  estados?: readonly string[];
  className?: string;
};

/** O cliente que atravessa a página. Sem nome e sem foto: avatar neutro e barras. */
export function CartaoCliente({
  campo = "papel",
  tamanho = "normal",
  chip,
  estados = [],
  className = "",
}: Props) {
  const superficie = campo === "papel" ? "superficie-clara text-tinta" : "superficie-escura text-branco";
  const pad = tamanho === "grande" ? "p-6 lg:p-7" : "p-4";
  return (
    <div aria-hidden="true" className={`${superficie} ${pad} ${className}`}>
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 shrink-0 rounded-full bg-[color-mix(in_srgb,currentColor_12%,transparent)]" />
        <span className="flex-1">
          <Barra largura="58%" forte />
          <Barra largura="34%" className="mt-2" />
        </span>
      </div>
      {estados.length ? (
        <ol className="mt-5 space-y-3 border-t border-[color-mix(in_srgb,currentColor_12%,transparent)] pt-4">
          {estados.map((estado, i) => (
            <li key={estado} className="t-legenda flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  i === estados.length - 1
                    ? "bg-azul text-branco"
                    : "border border-[color-mix(in_srgb,currentColor_30%,transparent)]"
                }`}
              >
                {i === estados.length - 1 ? (
                  <svg
                    viewBox="0 0 16 16"
                    width={12}
                    height={12}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : null}
              </span>
              {estado}
            </li>
          ))}
        </ol>
      ) : null}
      {chip ? (
        <div className="mt-4">
          <Chip tom="azul">{chip}</Chip>
        </div>
      ) : null}
    </div>
  );
}
