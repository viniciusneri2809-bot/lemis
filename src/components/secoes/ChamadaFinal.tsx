import { chamadaFinal } from "@/lib/conteudo";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";

// O bloco azul do fim (protótipo): o próximo passo concreto e, à direita, o laço claro sobre o azul
// (`simbolo-claros-sobre-azul`, manual §1), grande e cortado pela borda. O celular saiu daqui para não
// repetir a mesma tela pela quarta vez (revisão do Patrão, 23/10).
export function ChamadaFinal() {
  return (
    <section aria-labelledby="chamada-titulo" className="px-5 sm:px-10 lg:px-14">
      <div className="gradiente-final relative mx-auto grid max-w-[1328px] overflow-hidden rounded-xl px-7 pt-14 pb-14 sm:px-12 lg:min-h-[440px] lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-20 lg:py-20">
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
          {/* eslint-disable-next-line @next/next/no-img-element -- laço da marca */}
          <img src="/marca/simbolo-claros-sobre-azul.svg" alt="" width={460} height={460} className="absolute top-1/2 -right-16 size-[460px] -translate-y-1/2" />
        </div>
      </div>
    </section>
  );
}
