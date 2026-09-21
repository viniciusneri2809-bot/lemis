import { Feixe } from "@/components/efeitos/Feixe";
import { Revelar } from "@/components/efeitos/Revelar";
import { Numeral } from "@/components/esquema/Numeral";
import { Botao } from "@/components/ui/Botao";
import { CabecaSecao } from "@/components/ui/CabecaSecao";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { comoComeca, cta } from "@/lib/conteudo";

/**
 * Tinta, não papel: o papel fica reservado à virada e ao acompanhamento. Duas folhas seguidas
 * (6 e 7) anulariam o contraste que a folha existe para criar.
 *
 * A lista ocupa só a metade direita. A metade esquerda fica vazia de propósito — é o respiro
 * que a assimetria compra, e é o que substitui os três cards iguais.
 */
export function ComoComeca() {
  return (
    <Secao id="como-comeca" campo="tinta" ritmo="medio" numeral={7}>
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 lg:gap-x-6">
          <CabecaSecao
            rotulo={comoComeca.rotulo}
            titulo={comoComeca.titulo}
            abertura={comoComeca.abertura}
            colunas="6-6"
            className="lg:col-span-12"
          />

          {/* O feixe fica fora da <ol> — dentro dela um <span> não é filho válido. A âncora do
              posicionamento é este wrapper, que tem a mesma caixa da lista. */}
          <Revelar className="relative mt-16 lg:col-span-7 lg:col-start-6 lg:mt-22">
            <Feixe eixo="v" className="absolute inset-y-0 left-0" />
            <ol className="lista-editorial">
              {comoComeca.passos.map((passo, i) => (
                <li key={passo.titulo}>
                  <Numeral numero={i + 1} tamanho="lg" />
                  <div>
                    <h3 className="t-sub">{passo.titulo}</h3>
                    <p className="t-corpo mt-3 max-w-[44ch] text-secundario-escuro">{passo.corpo}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Revelar>

          <Revelar atraso={0.15} className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-16">
            <div className="flex flex-wrap items-center gap-5">
              <Botao href={LINK_WHATSAPP} externo>
                {cta.rotulo}
              </Botao>
              <p className="t-legenda text-secundario-escuro">{cta.nota}</p>
            </div>
          </Revelar>
        </div>
      </Container>
    </Secao>
  );
}
