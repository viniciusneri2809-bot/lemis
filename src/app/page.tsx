import { CtaFinal } from "@/components/secoes/CtaFinal";
import { Footer } from "@/components/secoes/Footer";
import { Fundamentos } from "@/components/secoes/Fundamentos";
import { Header } from "@/components/secoes/Header";
import { Hero } from "@/components/secoes/Hero";
import { ParaQuem } from "@/components/secoes/ParaQuem";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Problema } from "@/components/secoes/Problema";
import { ProximoPasso } from "@/components/secoes/ProximoPasso";
import { Servicos } from "@/components/secoes/Servicos";

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Problema />
        <Servicos />
        <Fundamentos />
        <ParaQuem />
        <ProximoPasso />
        <Perguntas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
