import { comoComeca } from "@/lib/conteudo";
import { Container } from "../ui/Container";

// Os três passos do começo, numerados porque a ordem importa (protótipo).
export function ComoComeca() {
  return (
    <section id="como-comeca" aria-labelledby="como-comeca-titulo" className="pt-10 pb-20 lg:pb-[120px]">
      <Container className="text-center">
        <h2 id="como-comeca-titulo" className="text-[34px] leading-[1.08] tracking-[-0.035em] sm:text-[44px] lg:text-[48px]">
          {comoComeca.titulo}
        </h2>
        <p className="mx-auto mt-5 max-w-[680px] text-lg leading-[1.55] text-fraco lg:text-[19px]">{comoComeca.apoio}</p>
        <ol className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {comoComeca.passos.map((passo, i) => (
            <li key={passo.titulo} className="rounded-l bg-nevoa p-8">
              <b aria-hidden="true" className="mb-6 grid size-10 place-items-center rounded-full bg-white font-titulo text-base text-azul shadow-cartao">
                {i + 1}
              </b>
              <h3 className="mb-2.5 text-xl leading-tight tracking-[-0.025em]">{passo.titulo}</h3>
              <p className="text-[15.5px] leading-[1.55] text-fraco">{passo.frase}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
