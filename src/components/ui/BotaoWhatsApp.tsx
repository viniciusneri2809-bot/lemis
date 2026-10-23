import { LINK_WHATSAPP } from "@/lib/contato";

// O botão de toda a página: abre a conversa no WhatsApp. `azul` é o botão principal do manual
// (degradê de `acao-topo` para `acao`); `branco` vai sobre a foto e sobre o azul.
const VARIANTES = {
  azul: "gradiente-acao text-white shadow-botao hover:brightness-105 active:bg-acao-pressionado active:bg-none",
  branco: "bg-white text-forte shadow-botao-branco hover:bg-nevoa",
} as const;

const TAMANHOS = {
  p: "h-11 px-5 text-[15px]",
  g: "h-14 px-7 text-[17px]",
} as const;

export function BotaoWhatsApp({ children, variante = "azul", tamanho = "g", className = "" }: { children: React.ReactNode; variante?: keyof typeof VARIANTES; tamanho?: keyof typeof TAMANHOS; className?: string }) {
  return (
    <a
      href={LINK_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[filter,background-color,transform] duration-200 ease-saida active:translate-y-px ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`}
    >
      {children}
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </a>
  );
}
