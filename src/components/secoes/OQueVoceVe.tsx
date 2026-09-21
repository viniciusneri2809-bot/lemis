import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Chip } from "@/components/esquema/Chip";
import { CabecaSecao } from "@/components/ui/CabecaSecao";
import { Container } from "@/components/ui/Container";
import { Folha } from "@/components/ui/Folha";
import { Secao } from "@/components/ui/Secao";
import { acompanhamento } from "@/lib/conteudo";

/**
 * Painel desenhado: nenhum número aparece (RESTRICOES §"Regra dura"). Os indicadores têm
 * rótulo real e barra-fantasma no lugar do número; as barras por origem são proporção
 * gráfica, não métrica. Larguras escritas como `largura="NN%"` são isentas da trava de
 * métrica do verificador.
 *
 * Sem card: as barras ficam direto no papel, separadas por filete. O card virou ruído depois
 * que a folha passou a ser a superfície da seção — superfície dentro de superfície.
 */
function Painel() {
  const { indicadores, origens, chip } = acompanhamento.painel;
  // `aria-hidden`: é interface desenhada. Sem isso o <dl> entrega `dt` com `dd` vazio, porque o
  // valor mora na barra-fantasma. A informação real está na abertura da seção: "o que entrou,
  // o que avançou e o que voltou".
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-azul" />
          <Barra largura="7rem" />
        </span>
        <Chip tom="azul">{chip}</Chip>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-x-3 gap-y-6 border-t border-fio-claro pt-6">
        <div>
          <dt className="t-rotulo text-secundario">{indicadores[0]}</dt>
          <dd className="mt-3">
            <Barra largura="88%" forte className="h-[20px]" />
          </dd>
        </div>
        <div>
          <dt className="t-rotulo text-secundario">{indicadores[1]}</dt>
          <dd className="mt-3">
            <Barra largura="62%" forte className="h-[20px]" />
          </dd>
        </div>
        <div>
          <dt className="t-rotulo text-secundario">{indicadores[2]}</dt>
          <dd className="mt-3">
            <Barra largura="40%" forte className="h-[20px]" />
          </dd>
        </div>
      </dl>

      <div className="mt-6 space-y-4 border-t border-fio-claro pt-6">
        <div className="grid grid-cols-[96px_1fr] items-center gap-4">
          <span className="t-legenda text-secundario">{origens[0]}</span>
          <Barra largura="82%" forte className="h-[14px]" />
        </div>
        <div className="grid grid-cols-[96px_1fr] items-center gap-4">
          <span className="t-legenda text-secundario">{origens[1]}</span>
          <Barra largura="56%" forte className="h-[14px]" />
        </div>
      </div>
    </div>
  );
}

/**
 * A fala sai sem aspas tipográficas no texto: quem abre a citação é a aspa desenhada, grande
 * e decorativa. Duas marcas de citação no mesmo bloco seriam redundantes.
 */
function Citacao() {
  const { exemplo } = acompanhamento;
  return (
    <>
      <p className="t-rotulo text-secundario">{exemplo.rotulo}</p>
      <span aria-hidden="true" className="t-destaque mt-7 -mb-5 block text-[10rem] leading-[0.55]">
        “
      </span>
      <p className="t-sub mt-4 max-w-[36ch]">{exemplo.fala}</p>
      <p className="t-legenda mt-4 text-secundario">{exemplo.nota}</p>
    </>
  );
}

export function OQueVoceVe() {
  const { rotulo, titulo, abertura } = acompanhamento;
  return (
    <Secao id="acompanhamento" campo="tinta" ritmo="semTopo" numeral={6}>
      <Container className="relative z-10">
        {/* Sangra à esquerda: é a inversão do gesto da virada, que sangra à direita. O contraste
            entre as duas é o que impede as seções de papel de parecerem a mesma seção. */}
        <Folha lado="esquerda">
          <CabecaSecao
            rotulo={rotulo}
            titulo={titulo}
            abertura={abertura}
            colunas="6-6"
            escuro={false}
          />
          <div className="mt-16 grid gap-y-14 lg:grid-cols-12 lg:gap-x-6">
            <Revelar className="lg:col-span-7">
              <Painel />
            </Revelar>
            <Revelar atraso={0.15} className="lg:col-span-5 lg:col-start-8">
              <Citacao />
            </Revelar>
          </div>
        </Folha>
      </Container>
    </Secao>
  );
}
