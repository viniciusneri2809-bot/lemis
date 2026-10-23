import Image from "next/image";
import mesa from "@/assets/mesa.webp";
import { hero } from "@/lib/conteudo";
import { Celular } from "../Celular";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";
import { Cabecalho } from "./Cabecalho";

// O hero do protótipo aprovado: a foto da mesa de trabalho (manual §5, luz do dia, de cima), o véu que
// escurece a esquerda, o título e o celular do painel inclinado à direita. No celular, só o texto sobre
// a foto, com o véu mais escuro: o aparelho aparece logo abaixo, no palco.
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forte">
      <Image src={mesa} alt="" fill priority placeholder="blur" sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 veu-hero-celular lg:veu-hero" />
      <Cabecalho />
      <div className="mx-auto grid min-h-[640px] max-w-[1440px] items-center px-5 pt-28 pb-16 sm:px-10 lg:min-h-[900px] lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-6 lg:px-14 lg:pt-24">
        <div className="max-w-[560px]">
          <h1 className="text-[40px] leading-[1.06] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[60px]">{hero.titulo}</h1>
          <p className="mt-5 font-titulo text-xl leading-[1.3] font-medium tracking-[-0.01em] text-white lg:text-2xl">{hero.apoio}</p>
          <BotaoWhatsApp variante="branco" className="mt-10 lg:mt-14">
            {hero.botao}
          </BotaoWhatsApp>
          <p className="mt-5 text-sm text-white">{hero.nota}</p>
        </div>
        <div className="hidden lg:flex lg:justify-start lg:pl-6">
          <Celular className="chegar" />
        </div>
      </div>
    </section>
  );
}
