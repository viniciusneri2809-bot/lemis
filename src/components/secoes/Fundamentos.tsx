import { Holofote } from "@/components/efeitos/Holofote";
import { Glow, PadraoGrade } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Simbolo } from "@/components/marca/Simbolo";
import { Secao } from "@/components/ui/Secao";
import { fundamentos } from "@/lib/conteudo";

function Compromissos() {
  return (
    <>
      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {fundamentos.itens.map((item, i) => (
          <li key={item.nome}>
            <Revelar atraso={i * 0.1} className="h-full">
              <div className="superficie-escura feixe-borda h-full p-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 motion-reduce:transition-none">
                <h3 className="t-rotulo text-secundario-escuro">{item.nome}</h3>
                <p className="t-sub mt-4 max-w-[26ch] text-branco">{item.frase}</p>
                <p className="t-corpo mt-4 max-w-[40ch] text-secundario-escuro">{item.corpo}</p>
              </div>
            </Revelar>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-y-6 lg:grid-cols-12 lg:gap-x-6">
        <Revelar className="lg:col-span-5">
          <p className="t-rotulo text-secundario-escuro">{fundamentos.exemplo.rotulo}</p>
        </Revelar>
        <Revelar atraso={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="superficie-escura max-w-[44ch] p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-azul text-branco">
                <Simbolo className="h-5 w-5" />
              </span>
              <span className="t-controle text-branco">Lemis</span>
            </div>
            <p className="t-sub mt-5 text-branco">“{fundamentos.exemplo.fala}”</p>
          </div>
          <p className="t-legenda mt-4 max-w-[52ch] text-secundario-escuro">{fundamentos.exemplo.nota}</p>
        </Revelar>
      </div>
    </>
  );
}

export function Fundamentos() {
  return (
    <Secao
      id="como-trabalhamos"
      campo="tinta"
      pergunta={fundamentos.pergunta}
      extra={<Compromissos />}
      fundo={
        <>
          <PadraoGrade className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <Glow className="-bottom-40 left-1/3 h-[30rem] w-[30rem] opacity-40" />
          <Holofote />
        </>
      }
    >
      <Revelar>
        <p className="t-titulo text-branco">{fundamentos.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario-escuro">{fundamentos.corpo}</p>
      </Revelar>
    </Secao>
  );
}
