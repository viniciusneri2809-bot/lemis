import { Aquisicao } from "@/components/secoes/Aquisicao";
import { ComoComeca } from "@/components/secoes/ComoComeca";
import { CtaFinal } from "@/components/secoes/CtaFinal";
import { DuasPortas } from "@/components/secoes/DuasPortas";
import { Footer } from "@/components/secoes/Footer";
import { Header } from "@/components/secoes/Header";
import { Hero } from "@/components/secoes/Hero";
import { OQueVoceVe } from "@/components/secoes/OQueVoceVe";
import { Perguntas } from "@/components/secoes/Perguntas";
import { Retencao } from "@/components/secoes/Retencao";
import { Virada } from "@/components/secoes/Virada";

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <DuasPortas />
        <Virada />
        <Aquisicao />
        <Retencao />
        <OQueVoceVe />
        <ComoComeca />
        <Perguntas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
