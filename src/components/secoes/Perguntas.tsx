import { perguntas } from "@/lib/conteudo";
import { Container } from "../ui/Container";

// As cinco perguntas, com o título à esquerda (protótipo). <details> nativo: abre pelo teclado e
// pelo leitor de tela sem JavaScript; a primeira vem aberta, como no protótipo.
export function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="pt-10 pb-20 lg:pb-[120px]">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-[72px]">
        <h2 id="perguntas-titulo" className="max-w-[420px] text-[32px] leading-[1.1] tracking-[-0.035em] lg:text-[40px]">
          {perguntas.titulo}
        </h2>
        <div>
          {perguntas.itens.map((item, i) => (
            <details key={item.pergunta} open={i === 0} className="group border-b border-linha py-5 first:pt-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-md text-[17px] font-semibold text-forte [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-[17px] font-semibold tracking-normal">{item.pergunta}</h3>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="shrink-0 text-fraco transition-transform duration-200 ease-saida group-open:rotate-45">
                  <path d="M9 3v12M3 9h12" />
                </svg>
              </summary>
              <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.6] text-fraco">{item.resposta}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
