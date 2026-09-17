import { Revelar } from "@/components/efeitos/Revelar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Secao } from "@/components/ui/Secao";
import { perguntas } from "@/lib/conteudo";

export function Perguntas() {
  return (
    <Secao id="perguntas" campo="papel" separador pergunta={perguntas.titulo}>
      <Revelar>
        <div className="superficie-clara px-6 lg:px-8">
          <Accordion type="single" collapsible>
            {perguntas.itens.map((item, i) => (
              <AccordionItem key={item.pergunta} value={`pergunta-${i}`}>
                <AccordionTrigger>{item.pergunta}</AccordionTrigger>
                <AccordionContent>
                  <p className="t-corpo max-w-[58ch] text-secundario">{item.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Revelar>
    </Secao>
  );
}
