"use client";

import { useRef } from "react";
import { FeixeConexao } from "@/components/efeitos/FeixeConexao";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Inclinacao } from "@/components/efeitos/Inclinacao";
import { Revelar } from "@/components/efeitos/Revelar";
import { Icone } from "@/components/marca/Icone";
import { ctaFinal, servicos } from "@/lib/conteudo";

const POSICOES = ["justify-self-start", "justify-self-end", "justify-self-start", "justify-self-end"] as const;

export function HeroPainel() {
  const painelRef = useRef<HTMLDivElement>(null);
  const n0 = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);
  const nos = [n0, n1, n2, n3];
  const [t0, t1, t2, t3, destino] = servicos.itens;

  return (
    <Inclinacao className="w-full">
      <div className="superficie-escura relative overflow-hidden rounded-[24px] p-5 text-branco sm:p-7 lg:p-8">
        <PadraoPontos className="text-branco opacity-[0.10] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
        <Glow className="-right-24 -bottom-24 h-80 w-80" />

        <div className="relative">
          <p className="t-rotulo text-secundario-escuro">{ctaFinal.titulo}</p>

          <div ref={painelRef} className="relative mt-6 grid grid-cols-1 gap-y-6 sm:gap-y-8">
            {[t0, t1, t2, t3].map((item, i) => (
              <div key={item.nome} ref={nos[i]} className={POSICOES[i]}>
                <Revelar atraso={0.15 + i * 0.12} y={16}>
                  <div className="superficie-escura flex items-center gap-3 rounded-[12px] px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[color-mix(in_srgb,var(--color-azul)_18%,transparent)] text-azul">
                      <Icone nome={item.icone} tamanho={24} />
                    </span>
                    <span className="t-controle text-branco">{item.nome}</span>
                  </div>
                </Revelar>
              </div>
            ))}

            <div ref={n4} className="justify-self-stretch">
              <Revelar atraso={0.7} y={16}>
                <div className="superficie-escura feixe-borda feixe-ativo flex items-center gap-3 rounded-[12px] px-4 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-azul text-branco">
                    <Icone nome={destino.icone} tamanho={24} />
                  </span>
                  <span className="t-controle text-branco">{destino.nome}</span>
                </div>
              </Revelar>
            </div>

            <FeixeConexao conteinerRef={painelRef} deRef={n0} paraRef={n1} atraso={0} />
            <FeixeConexao conteinerRef={painelRef} deRef={n1} paraRef={n2} atraso={0.8} />
            <FeixeConexao conteinerRef={painelRef} deRef={n2} paraRef={n3} atraso={1.6} />
            <FeixeConexao conteinerRef={painelRef} deRef={n3} paraRef={n4} atraso={2.4} />
          </div>
        </div>
      </div>
    </Inclinacao>
  );
}
