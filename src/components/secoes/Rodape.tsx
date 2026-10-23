import { navegacao, rodape } from "@/lib/conteudo";
import { LINK_WHATSAPP } from "@/lib/contato";
import { Assinatura } from "../marca/Assinatura";

// O rodapé do protótipo: a assinatura com a frase do hero (decisão 2), as duas colunas e a linha
// legal com a razão social, que continua até o Vinicius avisar (manual §6).
export function Rodape() {
  return (
    <footer className="px-5 pt-14 sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1328px] gap-10 rounded-t-xl border border-linha bg-white px-7 py-12 text-sm text-fraco sm:px-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Assinatura largura={128} />
          <p className="mt-4 max-w-[340px] leading-[1.55]">{rodape.frase}</p>
        </div>
        <nav aria-labelledby="rodape-navegar">
          <h2 id="rodape-navegar" className="mb-3 font-sans text-[13px] font-semibold tracking-normal">
            {rodape.navegar}
          </h2>
          <ul className="space-y-2">
            {navegacao.links.map((l) => (
              <li key={l.alvo}>
                <a href={l.alvo} className="hover:text-forte hover:underline underline-offset-4">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-sans text-[13px] font-semibold tracking-normal">{rodape.conversar}</h2>
          <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-forte hover:underline underline-offset-4">
            {rodape.whatsapp}
          </a>
        </div>
      </div>
      <p className="mx-auto max-w-[1328px] border-t border-linha px-4 pt-5 pb-8 text-center text-xs leading-relaxed text-fraco">{rodape.legal}</p>
    </footer>
  );
}
