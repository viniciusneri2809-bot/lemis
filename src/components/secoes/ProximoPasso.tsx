import { LinhaProgresso } from "@/components/efeitos/LinhaProgresso";
import { Revelar } from "@/components/efeitos/Revelar";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, proximoPasso } from "@/lib/conteudo";

function Passos() {
  return (
    <div>
      <LinhaProgresso className="mb-8 w-full" />
      <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {proximoPasso.passos.map((passo, i) => (
          <li key={passo.titulo}>
            <Revelar atraso={0.2 + i * 0.15} className="h-full">
              <div className="superficie-clara h-full p-7">
                <span aria-hidden="true" className="t-controle flex h-10 w-10 items-center justify-center rounded-full bg-azul text-branco tabular-nums">
                  {i + 1}
                </span>
                <h3 className="t-sub mt-6">{passo.titulo}</h3>
                <p className="t-corpo mt-3 max-w-[40ch] text-secundario">{passo.corpo}</p>
              </div>
            </Revelar>
          </li>
        ))}
      </ol>
      <Revelar atraso={0.6}>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
          <p className="t-legenda text-secundario">{cta.nota}</p>
        </div>
      </Revelar>
    </div>
  );
}

export function ProximoPasso() {
  return (
    <Secao id="proximo-passo" campo="papel" separador pergunta={proximoPasso.pergunta} extra={<Passos />}>
      <Revelar>
        <p className="t-titulo">{proximoPasso.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{proximoPasso.corpo}</p>
      </Revelar>
    </Secao>
  );
}
