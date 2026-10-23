import { painel } from "@/lib/conteudo";
import { Celular } from "../Celular";
import { Container } from "../ui/Container";
import { Etiqueta } from "../ui/Etiqueta";

// O acompanhamento: texto e a lista dos três indicadores à esquerda, o celular do painel numa janela
// pontilhada à direita (protótipo). Cada indicador leva a cor de dado do seu cartão no celular.
const CORES = ["bg-dado-3", "bg-dado-1", "bg-dado-2"] as const;
const FUNDOS = ["bg-dado-3-50", "bg-azul-50", "bg-dado-2-50"] as const;

export function Painel() {
  return (
    <section id="painel" aria-labelledby="painel-titulo" className="py-20 lg:py-[120px]">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
        <div>
          <Etiqueta>{painel.etiqueta}</Etiqueta>
          <h2 id="painel-titulo" className="mt-5 text-[34px] leading-[1.08] tracking-[-0.035em] sm:text-[40px] lg:text-[44px]">
            {painel.titulo}
          </h2>
          <p className="mt-5 max-w-[620px] text-lg leading-[1.55] text-fraco">{painel.paragrafo}</p>
          <ul className="mt-9 border-t border-linha">
            {painel.indicadores.map((indicador, i) => (
              <li key={indicador} className="flex items-center gap-4 border-b border-linha py-[18px] text-[17px] font-medium text-forte">
                <span aria-hidden="true" className={`grid size-9 shrink-0 place-items-center rounded-xl ${FUNDOS[i]}`}>
                  <span className={`size-3 rounded-full ${CORES[i]}`} />
                </span>
                {indicador}
              </li>
            ))}
          </ul>
        </div>
        <div className="pontos relative flex h-[520px] justify-center overflow-hidden rounded-xl bg-nevoa pt-10 lg:h-[560px]">
          <Celular className="origin-top scale-[0.95]" />
        </div>
      </Container>
    </section>
  );
}
