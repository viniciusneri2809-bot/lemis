import { palco } from "@/lib/conteudo";
import { Etiqueta } from "../ui/Etiqueta";

// As duas palavras dos lados, como no protótipo: "Chega." (aquisição) à esquerda, "Volta."
// (retenção) à direita, com o mesmo peso (decisão 5 da copy). No centro, o laço grande sobre o
// pontilhado: o manual o descreve como a ligação contínua, o funil que não perde o cliente. O celular
// do painel já aparece no hero e na seção Painel (revisão do Patrão, 23/10: quatro celulares iguais
// ficavam repetitivos).
export function Palco() {
  return (
    <section aria-labelledby="palco-etiqueta" className="overflow-hidden pt-20 pb-16 lg:pt-[120px] lg:pb-10">
      <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-10 lg:px-14">
        <p id="palco-etiqueta">
          <Etiqueta>{palco.etiqueta}</Etiqueta>
        </p>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <Lado palavra={palco.esquerda.palavra} linha={palco.esquerda.linha} lado="esquerda" />
          <div aria-hidden="true" className="pontos mx-auto grid size-[280px] place-items-center rounded-full bg-azul-50 sm:size-[340px] lg:size-[420px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- laço da marca */}
            <img src="/marca/simbolo-cor.svg" alt="" width={220} height={220} className="size-[150px] sm:size-[180px] lg:size-[220px]" />
          </div>
          <Lado palavra={palco.direita.palavra} linha={palco.direita.linha} lado="direita" />
        </div>
      </div>
    </section>
  );
}

function Lado({ palavra, linha, lado }: { palavra: string; linha: string; lado: "esquerda" | "direita" }) {
  const alinhamento = lado === "esquerda" ? "lg:text-left lg:pl-6" : "lg:text-right lg:pr-6";
  return (
    <div className={`mx-auto max-w-[360px] lg:mx-0 lg:max-w-none ${alinhamento} ${lado === "direita" ? "lg:justify-self-end" : ""}`}>
      <h2 className="text-[56px] leading-none tracking-[-0.04em] sm:text-[72px] xl:text-[84px]">{palavra}</h2>
      <p className={`mt-4 text-base leading-normal text-fraco lg:max-w-[300px] ${lado === "direita" ? "lg:ml-auto" : ""}`}>{linha}</p>
    </div>
  );
}
