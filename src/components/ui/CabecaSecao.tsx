import { Revelar } from "@/components/efeitos/Revelar";
import { Pilula } from "@/components/esquema/Pilula";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import type { Titulo } from "@/lib/conteudo";

type Props = {
  rotulo: string;
  titulo: Titulo;
  abertura?: string;
  /** Divisão da grade de 12: "6-6" (título curto) ou "8-4" (título longo). */
  colunas?: "6-6" | "8-4";
  classeTitulo?: string;
  /** Largura máxima do título em caracteres, quando a seção quer forçar a quebra. */
  medidaTitulo?: string;
  escuro?: boolean;
  className?: string;
};

const COLUNAS = {
  "6-6": { titulo: "lg:col-span-6", abertura: "lg:col-span-6 lg:col-start-7" },
  "8-4": { titulo: "lg:col-span-8", abertura: "lg:col-span-4 lg:col-start-9" },
} as const;

/**
 * Cabeçalho de seção: rótulo-pílula, título com uma palavra em serifa e a abertura ao lado.
 * Duas divisões em vez de uma, e nem toda seção usa este componente — hero, virada, perguntas
 * e CTA montam o próprio cabeçalho. É de propósito: cabeçalho igual em toda seção foi o que ele
 * reprovou.
 */
export function CabecaSecao({
  rotulo,
  titulo,
  abertura,
  colunas = "6-6",
  classeTitulo = "t-titulo",
  medidaTitulo = "",
  escuro = true,
  className = "",
}: Props) {
  const c = COLUNAS[colunas];
  const corApoio = escuro ? "text-secundario-escuro" : "text-secundario";
  return (
    <div className={`grid gap-y-8 lg:grid-cols-12 lg:gap-x-6 ${className}`}>
      <div className={c.titulo}>
        <Revelar>
          <Pilula className={corApoio}>{rotulo}</Pilula>
        </Revelar>
        <TituloDestaque
          titulo={titulo}
          as="h2"
          classe={classeTitulo}
          animar="view"
          className={`mt-6 ${medidaTitulo}`}
        />
      </div>
      {abertura ? (
        <Revelar atraso={0.15} className={`${c.abertura} lg:self-end`}>
          <p className={`t-lead medida ${corApoio}`}>{abertura}</p>
        </Revelar>
      ) : null}
    </div>
  );
}
