"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/marca/Wordmark";
import { Botao } from "@/components/ui/Botao";
import { LINK_WHATSAPP } from "@/lib/contato";
import { cta, nav, textosDeInterface } from "@/lib/conteudo";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 16);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  // O header vive sobre tinta agora: o vidro é tinta, não papel, e a marca sai em branco.
  const vidro = rolou || aberto
    ? "border-fio-escuro bg-[color-mix(in_srgb,var(--color-tinta)_88%,transparent)] shadow-[0_12px_40px_-20px_color-mix(in_srgb,var(--color-tinta)_80%,transparent)] backdrop-blur-md"
    : "border-transparent bg-transparent";

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-5">
      <div className={`mx-auto max-w-[1408px] rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${vidro}`}>
        <div className="flex h-16 items-center justify-between gap-6 px-4 md:px-6">
          <a href="#inicio" aria-label={textosDeInterface.inicioDaPagina} className="shrink-0 text-branco">
            <Wordmark className="h-auto w-28" />
          </a>

          <nav aria-label={textosDeInterface.navPrincipal} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="t-controle inline-block py-1.5 text-branco underline-offset-[0.2em] transition-colors duration-200 hover:text-secundario-escuro hover:underline">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Botao href={LINK_WHATSAPP} externo>{cta.rotulo}</Botao>
          </div>

          <button
            ref={botaoRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-branco lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            onClick={() => setAberto((v) => !v)}
          >
            <span className="sr-only">{aberto ? textosDeInterface.fecharMenu : textosDeInterface.abrirMenu}</span>
            <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true" focusable="false">
              {aberto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>

        <div id="menu-mobile" hidden={!aberto} className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-fio-escuro lg:hidden">
          <div className="px-4 py-6 md:px-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-fio-escuro">
                  <a href={item.href} onClick={() => setAberto(false)} className="t-sub block py-4 text-branco">
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
            <Botao href={LINK_WHATSAPP} externo className="mt-6 w-full">{cta.rotulo}</Botao>
          </div>
        </div>
      </div>
    </header>
  );
}
