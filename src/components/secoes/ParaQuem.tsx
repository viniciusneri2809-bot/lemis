import { Revelar } from "@/components/efeitos/Revelar";
import { Secao } from "@/components/ui/Secao";
import { paraQuem } from "@/lib/conteudo";

function CheckDisco() {
  return (
    <span aria-hidden="true" className="mt-[0.15em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-azul text-branco">
      <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

export function ParaQuem() {
  return (
    <Secao id="para-quem" campo="papel" pergunta={paraQuem.pergunta}>
      <Revelar>
        <p className="t-titulo">{paraQuem.afirmacao}</p>
        <p className="t-corpo mt-8 max-w-[58ch] text-secundario">{paraQuem.corpo}</p>
      </Revelar>
      <Revelar atraso={0.15}>
        <div className="superficie-clara mt-12 p-6 lg:p-7">
          <h3 className="t-rotulo text-secundario">{paraQuem.listaTitulo}</h3>
          <ul className="mt-4 divide-y divide-fio-claro">
            {paraQuem.lista.map((item, i) => (
              <li key={item}>
                <Revelar atraso={0.25 + i * 0.1} y={12} className="t-corpo flex gap-4 py-4">
                  <CheckDisco />
                  <span>{item}</span>
                </Revelar>
              </li>
            ))}
          </ul>
        </div>
      </Revelar>
    </Secao>
  );
}
