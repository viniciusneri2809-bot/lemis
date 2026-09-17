import { CartaoHolofote } from "@/components/efeitos/CartaoHolofote";
import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Icone } from "@/components/marca/Icone";
import { Secao } from "@/components/ui/Secao";
import { servicos } from "@/lib/conteudo";

const COLUNAS = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "md:col-span-2 lg:col-span-7"] as const;

function Check() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="mt-[0.2em] shrink-0 text-azul">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function ListaServicos() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {servicos.itens.map((item, i) => {
        const destaque = i === servicos.itens.length - 1;
        return (
          <li key={item.nome} className={COLUNAS[i]}>
            <Revelar atraso={i * 0.08} className="h-full">
              <CartaoHolofote className={`h-full p-6 lg:p-7 ${destaque ? "superficie-escura text-branco" : "superficie-clara"}`}>
                {destaque ? <PadraoPontos className="text-branco opacity-[0.08] [mask-image:radial-gradient(ellipse_at_bottom_right,black_20%,transparent_70%)]" /> : null}
                <div className="relative">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${destaque ? "bg-azul text-branco" : "bg-[color-mix(in_srgb,var(--color-azul)_10%,transparent)] text-azul"}`}>
                    <Icone nome={item.icone} tamanho={24} />
                  </span>
                  <h3 className="t-sub mt-6">{item.nome}</h3>
                  <p className={`t-corpo mt-3 max-w-[46ch] ${destaque ? "text-secundario-escuro" : "text-secundario"}`}>{item.descricao}</p>
                  <ul className={`mt-6 space-y-2 border-t pt-5 ${destaque ? "border-fio-escuro" : "border-fio-claro"}`}>
                    {item.inclui.map((linha) => (
                      <li key={linha} className="t-legenda flex gap-3">
                        <Check />
                        {linha}
                      </li>
                    ))}
                  </ul>
                </div>
              </CartaoHolofote>
            </Revelar>
          </li>
        );
      })}
    </ul>
  );
}

export function Servicos() {
  return (
    <Secao id="o-que-fazemos" campo="papel" pergunta={servicos.pergunta} extra={<ListaServicos />}>
      <Revelar>
        <p className="t-titulo">{servicos.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{servicos.corpo}</p>
      </Revelar>
    </Secao>
  );
}
