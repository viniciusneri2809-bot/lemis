import { chamadaFinal } from "@/lib/conteudo";
import { Celular } from "../Celular";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";

// O bloco azul do fim (protótipo): o próximo passo concreto e o celular inclinado, cortado pela base.
export function ChamadaFinal() {
  return (
    <section aria-labelledby="chamada-titulo" className="px-5 sm:px-10 lg:px-14">
      <div className="gradiente-final relative mx-auto grid max-w-[1328px] overflow-hidden rounded-xl px-7 pt-14 pb-14 sm:px-12 lg:h-[520px] lg:grid-cols-[1.1fr_1fr] lg:px-20 lg:pt-20 lg:pb-0">
        <div>
          <h2 id="chamada-titulo" className="text-[34px] leading-[1.1] tracking-[-0.035em] text-white lg:text-[44px]">
            {chamadaFinal.titulo}
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-white">{chamadaFinal.apoio}</p>
          <BotaoWhatsApp variante="branco" className="mt-9">
            {chamadaFinal.botao}
          </BotaoWhatsApp>
        </div>
        <div aria-hidden="true" className="relative hidden lg:block">
          <div className="absolute top-2.5 left-[150px] rotate-6">
            <Celular />
          </div>
        </div>
      </div>
    </section>
  );
}
