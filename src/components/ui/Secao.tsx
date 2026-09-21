import type { ReactNode } from "react";
import { NumeralGigante } from "@/components/esquema/NumeralGigante";

/**
 * Ritmo vertical. A home antiga tinha um valor só (144/144) em sete de dez blocos, e era
 * parte do que fazia a página parecer a mesma seção repetida. Aqui são sete medidas, e cada
 * seção escolhe a sua. Origem: docs/exploracao-visual/b-editorial.html.
 */
const RITMOS = {
  hero: "pt-16 pb-0 md:pt-20 lg:pt-[5.5rem]",
  amplo: "py-20 lg:pt-40 lg:pb-28",
  medio: "py-20 lg:py-36",
  compacto: "py-20 lg:py-32",
  alto: "py-20 lg:py-40",
  semTopo: "pt-0 pb-20 lg:pb-32",
} as const;

export type Ritmo = keyof typeof RITMOS;

type Props = {
  id: string;
  campo: "tinta" | "papel" | "azul";
  ritmo: Ritmo;
  /** Numeral em serifa cortado pela borda de cima. Decorativo. */
  numeral?: number;
  numeralCentro?: boolean;
  separador?: boolean;
  /** Deixa o conteúdo transbordar: só o hero precisa, para o cartão descer na seção seguinte. */
  transbordar?: boolean;
  fundo?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Casca de seção: campo, ritmo vertical, numeral e fundo. Nada mais.
 *
 * Deliberadamente NÃO monta cabeçalho nem moldura. A versão anterior montava rótulo, título e
 * abertura sempre no mesmo lugar, e o resultado foi oito de nove seções com o mesmo esqueleto —
 * o "quadradão" que ele reprovou. Quem quer o cabeçalho padrão usa `CabecaSecao`; quem precisa
 * de outro arranjo (hero, virada, perguntas, CTA) escreve o seu.
 *
 * O container é do filho, não daqui: seções com sangria, folha ou laje precisam decidir o que
 * fica dentro da medida e o que atravessa.
 */
export function Secao({
  id,
  campo,
  ritmo,
  numeral,
  numeralCentro = false,
  separador = false,
  transbordar = false,
  fundo,
  className = "",
  children,
}: Props) {
  const escuro = campo !== "papel";
  return (
    <section
      id={id}
      className={`campo-${campo} relative ${transbordar ? "overflow-visible" : "overflow-clip"} ${
        RITMOS[ritmo]
      } ${separador ? (escuro ? "border-t border-fio-escuro" : "border-t border-fio-claro") : ""} ${className}`}
    >
      {fundo}
      {numeral ? <NumeralGigante numero={numeral} centro={numeralCentro} /> : null}
      {children}
    </section>
  );
}
