import { Glow, PadraoGrade } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Numeral } from "@/components/esquema/Numeral";
import { Pilula } from "@/components/esquema/Pilula";
import { Container } from "@/components/ui/Container";
import { Folha } from "@/components/ui/Folha";
import { Secao } from "@/components/ui/Secao";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import { virada } from "@/lib/conteudo";

/**
 * A virada: o que a casa implanta.
 *
 * Único ponto da página em que o campo troca de tinta para papel, e por isso o cabeçalho não
 * usa `CabecaSecao`: o título fica largo sobre a tinta e a abertura desce para dentro da
 * folha, junto do contraste e dos fundamentos. A folha entra a 2/12 e sangra à direita.
 */
export function Virada() {
  return (
    <Secao
      id="como-funciona"
      campo="tinta"
      ritmo="medio"
      numeral={3}
      fundo={
        <>
          <PadraoGrade className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <Glow className="-bottom-40 left-1/3 h-[30rem] w-[30rem] opacity-40" />
        </>
      }
    >
      <Container className="relative z-10">
        <Revelar>
          <Pilula className="text-secundario-escuro">{virada.rotulo}</Pilula>
        </Revelar>
        <TituloDestaque
          titulo={virada.titulo}
          as="h2"
          classe="t-display"
          animar="view"
          className="mt-6 max-w-[16ch]"
        />
        <Folha lado="direita" className="mt-12 lg:mt-16">
          <Revelar>
            <p className="t-lead medida text-secundario">{virada.abertura}</p>
          </Revelar>
          <Revelar
            atraso={0.1}
            className="mt-14 grid gap-y-6 border-t border-fio-claro pt-10 lg:grid-cols-2 lg:gap-y-0"
          >
            <p className="t-sub max-w-[22ch] text-secundario lg:pr-10">{virada.contraste.outros}</p>
            <p className="t-sub max-w-[26ch] lg:border-l lg:border-fio-claro lg:pl-10">
              {virada.contraste.lemis}
            </p>
          </Revelar>
          <ul className="mt-16 grid gap-y-8 border-t border-fio-claro pt-8 lg:grid-cols-3 lg:gap-x-8">
            {virada.fundamentos.map((f, i) => (
              <li key={f.nome}>
                <Revelar atraso={0.15 + i * 0.1}>
                  <Numeral numero={i + 1} tamanho="sm" />
                  <h3 className="t-sub mt-4">{f.nome}</h3>
                  <p className="t-corpo mt-3 max-w-[34ch] text-secundario">{f.texto}</p>
                </Revelar>
              </li>
            ))}
          </ul>
        </Folha>
      </Container>
    </Secao>
  );
}
