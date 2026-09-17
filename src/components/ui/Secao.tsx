import type { ReactNode } from "react";
import { Conector } from "@/components/marca/Conector";
import { Container } from "@/components/ui/Container";

type Props = {
  id: string;
  campo: "papel" | "tinta";
  pergunta: string;
  separador?: boolean;
  fundo?: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
};

export function Secao({ id, campo, pergunta, separador = false, fundo, extra, children }: Props) {
  const escuro = campo === "tinta";
  const fio = escuro ? "border-fio-escuro" : "border-fio-claro";
  const corConector = escuro ? "text-branco" : "text-azul";
  return (
    <section id={id} className={`campo-${campo} relative overflow-clip ${separador ? `border-t ${fio}` : ""}`}>
      {fundo}
      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
            <div className="lg:grid lg:grid-cols-6 lg:gap-x-6">
              <h2 className="t-sub max-w-[22ch] lg:col-span-5">{pergunta}</h2>
              <div className={`mt-6 lg:mt-0 ${corConector}`}>
                <Conector tamanho="pequeno" className="h-16 w-12 lg:hidden" />
                <Conector tamanho="grande" className="hidden h-auto w-full lg:block" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">{children}</div>
        </div>
        {extra ? <div className="mt-16 lg:mt-24">{extra}</div> : null}
      </Container>
    </section>
  );
}
