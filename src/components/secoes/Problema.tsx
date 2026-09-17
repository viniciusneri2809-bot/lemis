import { Holofote } from "@/components/efeitos/Holofote";
import { Glow, PadraoPontos } from "@/components/efeitos/Padroes";
import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Secao } from "@/components/ui/Secao";
import { problema } from "@/lib/conteudo";

export function Problema() {
  return (
    <Secao
      id="problema"
      campo="tinta"
      pergunta={problema.pergunta}
      fundo={
        <>
          <PadraoPontos className="text-branco opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
          <Glow className="top-0 right-0 h-[28rem] w-[28rem] opacity-50" />
          <Holofote />
        </>
      }
    >
      <p className="t-titulo text-branco">
        <Palavras texto={problema.afirmacao} />
      </p>
      <Revelar atraso={0.3}>
        <div className="t-corpo mt-8 max-w-[58ch] space-y-5">
          {problema.corpo.map((paragrafo) => (
            <p key={paragrafo} className="text-secundario-escuro">{paragrafo}</p>
          ))}
          <p className="font-semibold text-branco">{problema.fecho}</p>
        </div>
      </Revelar>
    </Secao>
  );
}
