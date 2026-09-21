import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Motivo } from "@/components/marca/Motivo";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, ctaFinal } from "@/lib/conteudo";

export function CtaFinal() {
  return (
    <Secao
      id="contato"
      campo="azul"
      ritmo="alto"
      className="lg:min-h-[640px]"
      fundo={
        <>
          <PadraoPontos className="text-branco opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-branco)_14%,transparent),transparent_70%)] blur-3xl"
          />
          {/*
            Traço em serifa alta, não o `Motivo` curto: calibrado para sangrar pelo canto
            inferior direito. O `overflow-clip` da `Secao` corta o que passa da borda —
            é o efeito certo, não um recorte acidental.
          */}
          <svg
            viewBox="0 0 640 1000"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="pointer-events-none absolute right-0 bottom-0 hidden h-auto w-[min(56vw,820px)] text-papel lg:block"
          >
            <path d="M40 0V860q0 60 60 60h220q60 0 60-60V740q0-40 40-40h220" stroke="currentColor" strokeWidth={24} />
          </svg>
        </>
      }
    >
      {/*
        O fecho não é frase de impacto: é o próximo passo concreto e o que a casa precisa
        dele. Por ser descritivo, é mais longo que um slogan — quem cede é a calibragem.
        Coluna 1–6 da grade de 12: o traço do motivo começa em x≈669 numa janela de 1440,
        e nenhum texto pode passar disso. Medido, não olhado.
      */}
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <h2 className="t-display t-display-denso max-w-[34rem]">
              <Palavras texto={ctaFinal.titulo} />
            </h2>
            <Revelar atraso={0.3}>
              <p className="t-lead mt-8 max-w-[39ch]">{ctaFinal.apoio}</p>
            </Revelar>
            <Revelar atraso={0.45}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Botao href={LINK_WHATSAPP} externo variante="sobre-azul">
                  {cta.rotulo}
                </Botao>
                <p className="t-legenda">{ctaFinal.nota}</p>
              </div>
            </Revelar>
          </div>
        </div>
      </Container>
      <div className="text-papel lg:hidden">
        <Motivo className="block h-auto w-full" />
      </div>
    </Secao>
  );
}
