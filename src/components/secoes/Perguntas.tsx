import { Palavras } from "@/components/efeitos/Palavras";
import { Revelar } from "@/components/efeitos/Revelar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { perguntas } from "@/lib/conteudo";

/**
 * Largura total, sem grade de duas colunas: quem chega pela busca, sem vendedor ao lado,
 * resolve a objeção neste acordeão — por isso o site mantém o FAQ que a apresentação irmã
 * não tem.
 */
export function Perguntas() {
  return (
    <Secao id="perguntas" campo="tinta" ritmo="compacto" separador>
      <Container className="relative z-10">
        <Revelar>
          <h2 className="t-display t-display-denso max-w-[20ch]">
            <Palavras texto={perguntas.titulo} />
          </h2>
        </Revelar>
        <Revelar atraso={0.15} className="mt-16">
          <Accordion
            type="single"
            collapsible
            defaultValue="pergunta-0"
            className="border-y border-fio-escuro"
          >
            {perguntas.itens.map((item, i) => (
              <AccordionItem key={item.pergunta} value={`pergunta-${i}`} escuro>
                <AccordionTrigger escuro className="py-7">
                  <span className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="t-destaque t-destaque-claro w-8 shrink-0 text-[1.5rem] leading-[1.1]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(1.25rem,1.8vw,1.625rem)]">{item.pergunta}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="max-w-[64ch] pl-12">
                  <p className="t-corpo text-secundario-escuro">{item.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Revelar>
      </Container>
    </Secao>
  );
}
