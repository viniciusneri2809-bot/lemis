import type { CSSProperties } from "react";
import { Parallax } from "@/components/efeitos/Parallax";
import { PalavrasHero } from "@/components/efeitos/PalavrasHero";
import { Revelar } from "@/components/efeitos/Revelar";
import { Glow } from "@/components/efeitos/Padroes";
import { HeroPainel } from "@/components/secoes/HeroPainel";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, hero } from "@/lib/conteudo";

export function Hero() {
  return (
    <section id="inicio" className="campo-papel relative -mt-[4.75rem] overflow-clip pt-[4.75rem]">
      <Glow className="top-1/3 -right-40 h-[36rem] w-[36rem] opacity-60" />
      <Container className="relative py-16 md:py-24 lg:min-h-[min(calc(100svh-4.75rem),920px)] lg:py-28">
        <div className="grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h1 className="t-display max-w-[11ch]">
              <PalavrasHero texto={hero.titulo} />
            </h1>
            <p className="t-lead entra-hero mt-8 max-w-[52ch]" style={{ "--i": 6 } as CSSProperties}>
              {hero.paragrafo}
            </p>
            <div className="entra-hero mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8" style={{ "--i": 8 } as CSSProperties}>
              <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
              <a
                href={hero.secundario.href}
                className="group inline-flex items-center gap-2 t-controle text-tinta underline underline-offset-[0.2em] transition-colors duration-200 hover:text-azul"
              >
                {hero.secundario.rotulo}
                <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Revelar atraso={0.2} y={32}>
              <Parallax deslocamento={28}>
                <HeroPainel />
              </Parallax>
            </Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
