"use client";

import { useRef } from "react";
import { navegacao, interfaceTextos } from "@/lib/conteudo";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";

// O menu do celular: <details> nativo (abre sem JavaScript) que fecha ao escolher um link, para o
// painel não cobrir a seção de destino.
export function MenuCelular() {
  const menu = useRef<HTMLDetailsElement>(null);
  const fechar = () => {
    if (menu.current) menu.current.open = false;
  };
  return (
    <details ref={menu} className="group relative lg:hidden">
      <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full bg-white text-forte shadow-botao-branco [&::-webkit-details-marker]:hidden">
        <span className="sr-only group-open:hidden">{interfaceTextos.abrirMenu}</span>
        <span className="sr-only hidden group-open:inline">{interfaceTextos.fecharMenu}</span>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path className="group-open:hidden" d="M3 5h12M3 9h12M3 13h12" />
          <path className="hidden group-open:block" d="M4 4l10 10M14 4L4 14" />
        </svg>
      </summary>
      <nav aria-label={interfaceTextos.menu} className="absolute top-14 right-0 w-60 rounded-l bg-white p-2 shadow-flutua">
        {navegacao.links.map((l) => (
          <a key={l.alvo} href={l.alvo} onClick={fechar} className="block rounded-s px-4 py-3 text-[15px] font-medium text-forte hover:bg-nevoa">
            {l.rotulo}
          </a>
        ))}
        <span className="mt-2 block sm:hidden">
          <BotaoWhatsApp tamanho="p" className="w-full justify-center">
            {navegacao.botao}
          </BotaoWhatsApp>
        </span>
      </nav>
    </details>
  );
}
