import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Bolha } from "@/components/esquema/Bolha";
import { Chip } from "@/components/esquema/Chip";
import { CabecaSecao } from "@/components/ui/CabecaSecao";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { duasPortas } from "@/lib/conteudo";

/**
 * Cena "Quem chega": a mensagem foi respondida, mas sem próximo passo marcado.
 * Sem moldura: na laje a cena fica direto no campo, e quem a separa do texto é a coluna.
 */
function CenaChega() {
  const e = duasPortas.cenas[0].esquema;
  return (
    <div aria-hidden="true">
      <Bolha lado="recebida" hora={e.horaRecebida} className="rounded-[18px] px-5 py-4 text-[1.0625rem]">
        {e.mensagem}
      </Bolha>
      <Bolha
        lado="enviada"
        hora={e.horaEnviada}
        className="mt-3 w-[86%] rounded-[18px] px-5 py-4 text-[1.0625rem]"
      />
      <div className="mt-5 border-t border-fio-escuro pt-4">
        <Chip>{e.chip}</Chip>
      </div>
    </div>
  );
}

/** Cena "Quem volta": o serviço foi entregue e não há data de retorno registrada. */
function CenaVolta() {
  const e = duasPortas.cenas[1].esquema;
  return (
    <div
      aria-hidden="true"
      className="superficie-escura p-5 text-branco shadow-[0_30px_60px_-20px_color-mix(in_srgb,var(--color-tinta)_92%,transparent)]"
    >
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 shrink-0 rounded-full bg-[color-mix(in_srgb,currentColor_12%,transparent)]" />
        <span className="flex-1">
          <Barra largura="56%" forte />
          <Barra largura="32%" className="mt-2" />
        </span>
      </div>
      <dl className="t-legenda mt-5 grid grid-cols-2 gap-4 border-t border-fio-escuro pt-4 text-secundario-escuro">
        <div>
          <dt>{e.ultimaCompra}</dt>
          <dd className="mt-2">
            <Barra largura="70%" forte />
          </dd>
        </div>
        <div>
          <dt>{e.voltarEm}</dt>
          <dd className="mt-2 h-[10px] rounded-full border border-dashed border-fio-escuro" />
        </div>
      </dl>
      <div className="mt-4">
        <Chip>{e.chip}</Chip>
      </div>
    </div>
  );
}

/**
 * As duas portas do faturamento: quem chega e quem volta.
 *
 * A laje em tinta funda é a única superfície da seção, e os dois textos ficam soltos sobre
 * ela: os dois cards iguais lado a lado eram o "quadradão" reprovado. A cena da conversa
 * ocupa a coluna larga, os textos a estreita, e o cartão de quem volta pendura na borda de
 * baixo da laje, atravessando a divisão entre as duas colunas.
 */
export function DuasPortas() {
  const chega = duasPortas.cenas[0];
  return (
    <Secao id="duas-portas" campo="tinta" ritmo="amplo" numeral={2}>
      <Container className="relative z-10">
        <CabecaSecao
          rotulo={duasPortas.rotulo}
          titulo={duasPortas.titulo}
          abertura={duasPortas.abertura}
          colunas="8-4"
          classeTitulo="t-display t-display-denso"
          medidaTitulo="max-w-[13ch]"
        />
        <Revelar className="laje mt-16 grid gap-y-8 lg:mt-22 lg:grid-cols-[7fr_5fr] lg:gap-x-16 lg:gap-y-0">
          <div className="max-w-[560px]">
            <p className="t-rotulo text-secundario-escuro">{chega.rotulo}</p>
            <div className="mt-5">
              <CenaChega />
            </div>
          </div>
          <div className="grid content-start gap-8 lg:pt-2 lg:pr-[clamp(2.5rem,8vw,7.5rem)]">
            {duasPortas.cenas.map((cena) => (
              <div key={cena.rotulo}>
                <p className="t-rotulo text-secundario-escuro">{cena.rotulo}</p>
                <p className="t-corpo mt-3 max-w-[40ch] text-secundario-escuro">{cena.texto}</p>
              </div>
            ))}
          </div>
          {/* Fora da laje pela borda de baixo no desktop; no celular volta para o fluxo, porque
              72px para fora encostariam no fecho. */}
          <div className="lg:absolute lg:-bottom-18 lg:left-[28%] lg:z-20 lg:w-[360px]">
            <CenaVolta />
          </div>
        </Revelar>
        <Revelar atraso={0.15} className="mt-16 lg:mt-32">
          <p className="t-sub medida">{duasPortas.fecho}</p>
        </Revelar>
      </Container>
    </Secao>
  );
}
