import { ChamadaFinal } from "@/components/secoes/ChamadaFinal";
import { ComoComeca } from "@/components/secoes/ComoComeca";
import { ComoFunciona } from "@/components/secoes/ComoFunciona";
import { Hero } from "@/components/secoes/Hero";
import { Painel } from "@/components/secoes/Painel";
import { Palco } from "@/components/secoes/Palco";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Rodape } from "@/components/secoes/Rodape";

// A home, na ordem do protótipo aprovado e da copy de 23/10.
export default function Pagina() {
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Palco />
        <ComoFunciona />
        <Painel />
        <ComoComeca />
        <Perguntas />
        <ChamadaFinal />
      </main>
      <Rodape />
    </>
  );
}
