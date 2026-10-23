import { palco } from "@/lib/conteudo";
import { Celular } from "../Celular";
import { Etiqueta } from "../ui/Etiqueta";

// O celular no centro e as duas palavras dos lados, como no protótipo: "Chega." (aquisição) à
// esquerda, "Volta." (retenção) à direita, com o mesmo peso (decisão 5 da copy). No celular, as
// palavras vão para cima e para baixo do aparelho.
export function Palco() {
  return (
    <section aria-labelledby="palco-etiqueta" className="overflow-hidden pt-20 pb-16 lg:pt-[120px] lg:pb-10">
      <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-10 lg:px-14">
        <p id="palco-etiqueta">
          <Etiqueta>{palco.etiqueta}</Etiqueta>
        </p>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <Lado palavra={palco.esquerda.palavra} linha={palco.esquerda.linha} lado="esquerda" />
          <Celular className="mx-auto lg:order-none" />
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
