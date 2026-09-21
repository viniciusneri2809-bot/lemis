import type { CSSProperties } from "react";
import { Glow } from "@/components/efeitos/Padroes";
import { Pilula } from "@/components/esquema/Pilula";
import { FaixaFunil } from "@/components/secoes/FaixaFunil";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, hero } from "@/lib/conteudo";

/**
 * O H1 ocupa a largura inteira e o texto de apoio desce para a metade direita: o contraste de
 * escala entre os dois é o que carrega a página, no lugar da caixa que existia à direita.
 * A entrada continua por CSS (`animar="hero"` + `entra-hero`), não por `Revelar`: é o que
 * mantém o LCP pintado no primeiro quadro e o CLS em zero.
 */
export function Hero() {
  return (
    <Secao
      id="inicio"
      campo="tinta"
      ritmo="hero"
      transbordar
      fundo={<Glow className="-top-32 right-0 h-[36rem] w-[36rem] opacity-35" />}
    >
      <Container className="relative">
        <Pilula className="entra-hero text-secundario-escuro">{hero.rotulo}</Pilula>
        <TituloDestaque
          titulo={hero.titulo}
          as="h1"
          classe="t-display"
          animar="hero"
          className="mt-6 text-[clamp(2.75rem,12vw,4rem)] text-branco lg:text-[clamp(3rem,7.2vw,7rem)]"
        />
        <div className="mt-10 grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="t-lead medida entra-hero text-secundario-escuro"
              style={{ "--i": 6 } as CSSProperties}
            >
              {hero.paragrafo}
            </p>
            <div
              className="entra-hero mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
              style={{ "--i": 8 } as CSSProperties}
            >
              <Botao href={LINK_WHATSAPP} externo>
                {cta.rotulo}
              </Botao>
              <a
                href={hero.secundario.href}
                className="t-controle group inline-flex items-center gap-2 text-branco underline underline-offset-[0.2em] transition-colors duration-200 hover:text-secundario-escuro"
              >
                {hero.secundario.rotulo}
                <svg
                  viewBox="0 0 16 16"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                  className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none"
                >
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="entra-hero" style={{ "--i": 10 } as CSSProperties}>
        <FaixaFunil />
      </div>
    </Secao>
  );
}
