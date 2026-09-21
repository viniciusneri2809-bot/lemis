import { Feixe } from "@/components/efeitos/Feixe";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Icone } from "@/components/marca/Icone";
import { Container } from "@/components/ui/Container";
import { hero, textosDeInterface } from "@/lib/conteudo";
import type { NomeIcone } from "@/lib/conteudo";

type No = { readonly icone: NomeIcone; readonly nome: string };

function NoFunil({ icone, nome, destino = false }: { icone: NomeIcone; nome: string; destino?: boolean }) {
  return (
    <span
      className={`superficie-escura inline-flex items-center gap-3 rounded-[12px] px-3.5 py-2.5 ${
        destino ? "feixe-borda feixe-ativo" : ""
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${
          destino ? "bg-azul text-branco" : "bg-[color-mix(in_srgb,var(--color-azul)_18%,transparent)] text-azul"
        }`}
      >
        <Icone nome={icone} tamanho={24} />
      </span>
      <span className="t-controle text-[0.9375rem] text-branco">{nome}</span>
    </span>
  );
}

/**
 * Um funil da faixa. O rótulo visível fica fora da `<ol>` (filho de lista só pode ser `<li>`)
 * e sai do fluxo para pousar acima do primeiro nó; quem lê por leitor de tela recebe o mesmo
 * recorte pelo nome da lista, por isso o rótulo desenhado é `aria-hidden`.
 */
function Funil({
  rotulo,
  nomeDaLista,
  nos,
  destinoNoFim = false,
}: {
  rotulo: string;
  nomeDaLista: string;
  nos: readonly No[];
  destinoNoFim?: boolean;
}) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="t-rotulo absolute bottom-full left-0 mb-3.5 whitespace-nowrap text-secundario-escuro"
      >
        {rotulo}
      </span>
      <ol
        aria-label={nomeDaLista}
        className="flex list-none flex-col items-start gap-3.5 xl:flex-row xl:items-center xl:gap-4"
      >
        {nos.map((no, i) => (
          <li key={no.nome}>
            <NoFunil icone={no.icone} nome={no.nome} destino={destinoNoFim && i === nos.length - 1} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * A faixa que fecha o hero: os sete nós dos dois funis numa linha só, em tinta funda e sangria
 * total. Substitui o painel inclinado que media os feixes por JS — aqui o feixe é um filete de
 * CSS atrás da linha, e não há geometria para calcular no cliente.
 *
 * A linha só vira horizontal em `xl` (1280 px): é a partir daí que os sete nós cabem lado a
 * lado. Entre 1024 e 1280 vale a coluna com o feixe vertical, o mesmo gesto do celular — em
 * `lg` a linha vazava a janela em 65 px.
 */
export function FaixaFunil() {
  const { aquisicao, retencao, cliente } = hero.painel;
  return (
    <div className="sangria mt-14 bg-tinta-funda pt-10 pb-14 lg:mt-24 lg:pt-16 lg:pb-16">
      <Container className="relative">
        <div className="sangria relative px-5 md:px-8 xl:px-6 xl:py-10">
          <Feixe eixo="h" className="absolute inset-x-0 top-1/2 -mt-px hidden xl:block" />
          <Feixe eixo="v" className="absolute inset-y-0 left-5 md:left-8 xl:hidden" />
          <div className="relative flex flex-col gap-[54px] pl-6 xl:flex-row xl:items-center xl:justify-between xl:gap-6 xl:pl-0">
            <Funil
              rotulo={aquisicao.rotulo}
              nomeDaLista={textosDeInterface.painelAquisicao}
              nos={aquisicao.nos}
            />
            <Funil
              rotulo={retencao.rotulo}
              nomeDaLista={textosDeInterface.painelRetencao}
              nos={retencao.nos}
              destinoNoFim
            />
          </div>
        </div>

        {/*
          O cartão do cliente é o fio condutor da casa: o mesmo contato atravessa a apresentação
          institucional, da capa ao fechamento. Ele pende da linha do funil por um feixe curto, do
          lado da aquisição, que é onde a origem é registrada.

          Ele fica INTEIRO e DENTRO da faixa, de propósito. A versão anterior o jogava para fora
          com `-mb-14 lg:-mb-18`, contando com o empilhamento entre seções para ele continuar
          visível; como a seção seguinte é irmã posterior e tem fundo opaco, ela o cobria — 72 dos
          116 px no desktop, medido, cortando fora justamente o chip que diz o que o cartão é. O
          gesto de atravessar borda continua na página (dezoito elementos cruzam o container), mas
          não depende mais de ordem de pintura entre duas seções.
        */}
        <div className="sangria relative px-5 md:px-8 xl:px-6">
          <Feixe eixo="v" className="absolute top-0 left-5 h-14 md:left-8 xl:hidden" />
          <div className="pl-6 xl:grid xl:grid-cols-12 xl:gap-x-6 xl:pl-0">
            <div className="relative pt-14 xl:col-span-3 xl:col-start-2 xl:pt-0">
              <Feixe eixo="v" className="absolute -top-[4.25rem] left-16 hidden h-[4.25rem] xl:block" />
              <CartaoCliente
                chip={cliente.chip}
                className="max-w-[240px] shadow-[0_24px_48px_-16px_color-mix(in_srgb,var(--color-tinta)_90%,transparent)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
