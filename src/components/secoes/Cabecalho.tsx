import { navegacao, interfaceTextos } from "@/lib/conteudo";
import { Assinatura } from "../marca/Assinatura";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";
import { MenuCelular } from "./MenuCelular";

// A barra sobre a foto do hero: assinatura branca, os quatro links e o botão. No celular, os links
// vão para o menu de abrir e fechar (`MenuCelular`).
export function Cabecalho() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-10 lg:px-14">
        <a href="#conteudo" className="shrink-0 rounded-md">
          <Assinatura variante="branco" largura={118} />
        </a>
        <nav aria-label={interfaceTextos.menu} className="hidden items-center gap-8 text-[15px] font-medium text-white lg:flex">
          {navegacao.links.map((l) => (
            <a key={l.alvo} href={l.alvo} className="underline-offset-[6px] decoration-white/70 hover:underline">
              {l.rotulo}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* O invólucro decide a visibilidade: no próprio botão, `hidden` perderia para o `inline-flex`. */}
          <span className="hidden sm:block">
            <BotaoWhatsApp variante="branco" tamanho="p">
              {navegacao.botao}
            </BotaoWhatsApp>
          </span>
          <MenuCelular />
        </div>
      </div>
    </header>
  );
}
