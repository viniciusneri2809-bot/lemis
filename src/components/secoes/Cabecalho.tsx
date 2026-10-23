import { navegacao, interfaceTextos } from "@/lib/conteudo";
import { Assinatura } from "../marca/Assinatura";
import { BotaoWhatsApp } from "../ui/BotaoWhatsApp";

// A barra sobre a foto do hero: assinatura branca, os quatro links e o botão. No celular, os links
// vão para um menu de abrir e fechar feito com <details>, sem JavaScript.
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
          <details className="group relative lg:hidden">
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
                <a key={l.alvo} href={l.alvo} className="block rounded-s px-4 py-3 text-[15px] font-medium text-forte hover:bg-nevoa">
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
        </div>
      </div>
    </header>
  );
}
