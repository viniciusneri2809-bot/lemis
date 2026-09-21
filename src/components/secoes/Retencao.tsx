import { Glow } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Pilula } from "@/components/esquema/Pilula";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import { retencao } from "@/lib/conteudo";

/**
 * Quinta seção: retenção com o mesmo peso da aquisição, lida em diagonal — cabeça no alto à
 * esquerda, cartão no meio, fecho embaixo à direita. Os dois cartões-fantasma de trás saíram:
 * a profundidade vem do numeral 05 centrado atrás do cartão e do glow.
 */
export function Retencao() {
  return (
    <Secao
      id="retencao"
      campo="tinta"
      ritmo="alto"
      numeral={5}
      numeralCentro
      fundo={<Glow className="top-1/3 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 opacity-50" />}
    >
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <Revelar>
              <Pilula className="text-secundario-escuro">{retencao.rotulo}</Pilula>
            </Revelar>
            <TituloDestaque titulo={retencao.titulo} as="h2" classe="t-titulo" animar="view" className="mt-6" />
          </div>

          <Revelar atraso={0.15} className="mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">
            <p className="t-lead medida text-secundario-escuro">{retencao.abertura}</p>
          </Revelar>

          <Revelar className="mt-8 lg:col-span-4 lg:row-start-2 lg:mt-24">
            <p className="t-lead text-secundario-escuro lg:max-w-[26ch]">{retencao.apoio}</p>
          </Revelar>

          <Revelar
            atraso={0.2}
            y={32}
            className="mt-8 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-2 lg:mt-24"
          >
            <CartaoCliente
              tamanho="grande"
              estados={retencao.estados}
              className="w-full shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--color-tinta)_90%,transparent)]"
            />
          </Revelar>

          <Revelar atraso={0.3} className="mt-8 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-0 lg:self-end lg:pb-4">
            <p className="t-sub text-branco lg:max-w-[24ch]">{retencao.fecho}</p>
          </Revelar>
        </div>
      </Container>
    </Secao>
  );
}
