import { Palavras } from "@/components/efeitos/Palavras";
import { PalavrasHero } from "@/components/efeitos/PalavrasHero";
import type { Titulo } from "@/lib/conteudo";

type Animacao = "hero" | "view" | "nenhum";

type Props = {
  titulo: Titulo;
  as: "h1" | "h2";
  classe: string;
  animar: Animacao;
  className?: string;
};

/** Um trecho do título, com a animação do título inteiro. Sem `sr-only`: quem o emite é o pai. */
function Parte({ texto, animar }: { texto: string; animar: Animacao }) {
  if (animar === "hero") return <PalavrasHero texto={texto} semSrOnly />;
  if (animar === "view") return <Palavras texto={texto} semSrOnly />;
  return <>{texto}</>;
}

/**
 * Título com uma palavra em serifa itálica azul (`t-destaque`).
 * A frase inteira sai uma vez em `sr-only`; as três partes animadas ficam `aria-hidden`.
 * O itálico entra pela classe, nunca por utilitário: é o que o verificador de marca exige.
 */
export function TituloDestaque({ titulo, as: Tag, classe, animar, className = "" }: Props) {
  const inteiro = `${titulo.antes}${titulo.destaque}${titulo.depois}`;
  const antes = titulo.antes.trimEnd();
  const depois = titulo.depois.trimStart();
  return (
    <Tag className={`${classe} ${className}`}>
      <span className="sr-only">{inteiro}</span>
      <span aria-hidden="true">
        {antes ? <Parte texto={antes} animar={animar} /> : null}
        {antes ? " " : null}
        <em className="t-destaque">
          <Parte texto={titulo.destaque} animar={animar} />
        </em>
        {titulo.depois.startsWith(" ") ? " " : null}
        {depois ? <Parte texto={depois} animar={animar} /> : null}
      </span>
    </Tag>
  );
}
