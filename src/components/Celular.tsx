import { celular, interfaceTextos } from "@/lib/conteudo";

// O Lemis Dashboard no celular, como no protótipo aprovado, com os rótulos da copy (seção 4) e os
// números de exemplo marcados "dados de exemplo" na própria tela. As cores de dado ficam aqui dentro:
// contatos, vendas e investimento.
export function Celular({ className = "" }: { className?: string }) {
  const n = celular.numeros;
  return (
    <figure role="img" aria-label={interfaceTextos.celular} className={`w-[300px] shrink-0 ${className}`}>
      <div aria-hidden="true" className="h-[620px] rounded-[48px] bg-forte p-2.5 shadow-flutua">
        <div className="relative h-full overflow-hidden rounded-[40px] bg-nevoa text-left text-xs">
          <span className="absolute top-3.5 left-7 text-xs font-semibold text-forte">9:41</span>
          <span className="absolute top-2.5 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-forte" />
          <div className="px-4 pt-[52px] pb-4">
            <div className="mb-3.5 flex items-center justify-between">
              <div>
                <b className="font-titulo text-lg text-forte">{celular.titulo}</b>
                <div className="mt-0.5 text-[11px] text-fraco">{celular.periodo}</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- laço da marca */}
              <img src="/marca/simbolo-cor.svg" alt="" width={30} height={30} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Cartao cor="bg-dado-1" rotulo={celular.cartoes.contatos} valor={n.contatos} />
              <Cartao cor="bg-dado-2" rotulo={celular.cartoes.vendas} valor={n.vendas} />
              <div className="col-span-2 rounded-[14px] bg-white p-3 shadow-[0_1px_2px_rgba(11,16,32,0.05)]">
                <Rotulo cor="bg-dado-3" texto={celular.cartoes.investimento} />
                <strong className="mt-1 block font-titulo text-[22px] text-forte">{n.investimento}</strong>
                <div className="mt-2.5 flex h-[72px] items-end gap-1.5">
                  {n.barras.map((altura, i) => (
                    <i key={i} className={`flex-1 rounded-t-[4px] rounded-b-[2px] ${i === n.barras.length - 1 ? "bg-azul" : "bg-azul-50"}`} style={{ height: `${altura}%` }} />
                  ))}
                </div>
              </div>
              <div className="col-span-2 rounded-[14px] bg-white px-3 py-1 shadow-[0_1px_2px_rgba(11,16,32,0.05)]">
                {celular.origens.map((origem, i) => (
                  <div key={origem} className={`flex justify-between py-2 text-xs ${i > 0 ? "border-t border-linha" : ""}`}>
                    <span>{origem}</span>
                    <b className="text-forte">{n.origens[i]}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-dado-2-50 px-2 py-[3px] text-[10.5px] font-semibold whitespace-nowrap text-sucesso">
                <span className="size-1.5 rounded-full bg-sucesso" />
                {celular.selo}
              </span>
              <span className="text-[10.5px] whitespace-nowrap text-fraco">{celular.exemplo}</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function Rotulo({ cor, texto }: { cor: string; texto: string }) {
  return (
    <small className="flex items-center gap-1.5 text-[11px] text-fraco">
      <span className={`size-2 rounded-full ${cor}`} />
      {texto}
    </small>
  );
}

function Cartao({ cor, rotulo, valor }: { cor: string; rotulo: string; valor: string }) {
  return (
    <div className="rounded-[14px] bg-white p-3 shadow-[0_1px_2px_rgba(11,16,32,0.05)]">
      <Rotulo cor={cor} texto={rotulo} />
      <strong className="mt-1 block font-titulo text-[22px] text-forte">{valor}</strong>
    </div>
  );
}
