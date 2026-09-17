import { Revelar } from "@/components/efeitos/Revelar";
import { Wordmark } from "@/components/marca/Wordmark";
import { SetaExterna } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { LINK_WHATSAPP } from "@/lib/contato";
import { nav, rodape } from "@/lib/conteudo";

export function Footer() {
  return (
    <footer className="campo-tinta border-t border-fio-escuro">
      <Container className="py-16 lg:py-20">
        <Revelar>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-5">
              <a href="#inicio" aria-label="Lemis, voltar ao início" className="inline-block text-branco">
                <Wordmark className="h-auto w-32" />
              </a>
              <p className="t-corpo mt-6 max-w-[30ch] text-secundario-escuro">{rodape.apoio}</p>
            </div>

            <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
              <p className="t-rotulo text-secundario-escuro">{rodape.navegarRotulo}</p>
              <ul className="mt-4 space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="t-corpo text-branco underline-offset-[0.2em] hover:underline">
                      {item.rotulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <p className="t-rotulo text-secundario-escuro">{rodape.conversarRotulo}</p>
              <a
                href={LINK_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="t-corpo mt-4 inline-flex items-center gap-2 text-branco underline underline-offset-[0.2em]"
              >
                {rodape.whatsappRotulo}
                <SetaExterna />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </div>
          </div>

          <div className="t-legenda mt-14 border-t border-fio-escuro pt-6 text-secundario-escuro">
            <p>
              {rodape.razaoSocial} · {rodape.cnpj}
            </p>
            <p className="mt-1">{rodape.endereco}</p>
            <p className="mt-4">© APL Digital</p>
          </div>
        </Revelar>
      </Container>
    </footer>
  );
}
