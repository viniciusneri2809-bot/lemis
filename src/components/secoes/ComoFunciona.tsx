import { comoFunciona } from "@/lib/conteudo";
import { Container } from "../ui/Container";

// As três etapas do protótipo, numa trilha só (não três cartões soltos): aquisição, atendimento e
// retenção, cada uma com o tom da sua cor de dado. Embaixo, a faixa que diz onde está a IA (decisão 7).
const TONS = [
  { fundo: "bg-azul-50", texto: "text-azul" },
  { fundo: "bg-dado-2-50", texto: "text-sucesso" },
  { fundo: "bg-dado-3-50", texto: "text-dado-3-texto" },
] as const;

export function ComoFunciona() {
  return (
    <section id="o-que-fazemos" aria-labelledby="o-que-fazemos-titulo" className="bg-nevoa py-20 lg:py-[120px]">
      <Container className="text-center">
        <h2 id="o-que-fazemos-titulo" className="mx-auto max-w-[820px] text-[34px] leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[48px]">
          {comoFunciona.titulo}
        </h2>
        <p className="mx-auto mt-5 max-w-[680px] text-lg leading-[1.55] text-fraco lg:text-[19px]">{comoFunciona.apoio}</p>
        <ol className="mt-14 grid overflow-hidden rounded-xl border border-linha bg-white text-left md:grid-cols-3">
          {comoFunciona.etapas.map((etapa, i) => (
            <li key={etapa.numero} className={`px-7 pt-8 pb-10 lg:px-8 lg:pt-9 ${i > 0 ? "border-t border-linha md:border-t-0 md:border-l" : ""}`}>
              <div className={`pontos mb-6 flex h-32 items-center justify-center rounded-l lg:h-[150px] ${TONS[i].fundo}`}>
                <span aria-hidden="true" className={`font-titulo text-[56px] font-bold tracking-[-0.04em] lg:text-[64px] ${TONS[i].texto}`}>
                  {etapa.numero}
                </span>
              </div>
              <p className={`mb-2 text-xs font-bold tracking-[0.06em] uppercase ${TONS[i].texto}`}>
                <span className="sr-only">{etapa.numero} · </span>
                {etapa.nome}
              </p>
              <h3 className="mb-2.5 text-[22px] leading-tight tracking-[-0.025em]">{etapa.titulo}</h3>
              <p className="text-[15.5px] leading-[1.55] text-fraco">{etapa.frase}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-6 flex max-w-[980px] items-start gap-3 rounded-l bg-white px-6 py-5 text-left text-[16px] leading-[1.55] font-medium text-forte shadow-cartao sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- laço da marca */}
          <img src="/marca/simbolo-cor.svg" alt="" width={28} height={28} className="mt-0.5 shrink-0 sm:mt-0" />
          {comoFunciona.faixa}
        </p>
      </Container>
    </section>
  );
}
