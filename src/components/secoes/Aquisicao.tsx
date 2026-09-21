import type { ReactNode } from "react";
import { PadraoPontos } from "@/components/efeitos/Padroes";
import { Revelar } from "@/components/efeitos/Revelar";
import { Barra } from "@/components/esquema/Barra";
import { Bolha } from "@/components/esquema/Bolha";
import { CartaoCliente } from "@/components/esquema/CartaoCliente";
import { Chip } from "@/components/esquema/Chip";
import { Numeral } from "@/components/esquema/Numeral";
import { Pilula } from "@/components/esquema/Pilula";
import { Quadro } from "@/components/esquema/Quadro";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { TituloDestaque } from "@/components/ui/TituloDestaque";
import { aquisicao } from "@/lib/conteudo";

const [m1, m2, m3, m4] = aquisicao.marcos;

/**
 * Cada esquema fica solto no campo, sem superfície: quem separa um marco do vizinho é o filete
 * da coluna de jornal. Antes eram quatro caixas `superficie-escura` de 280px de altura mínima,
 * o núcleo do "quadradão" que ele reprovou.
 */
function Esquema({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="flex max-w-[360px] flex-col gap-4 text-branco">
      {children}
    </div>
  );
}

/** Rótulo de campo de formulário desenhado: nome em cima, barra-fantasma embaixo. */
function Campo({ rotulo, largura }: { rotulo: string; largura: string }) {
  return (
    <div className="grid gap-2">
      <span className="t-rotulo text-secundario-escuro">{rotulo}</span>
      <Barra largura={largura} forte />
    </div>
  );
}

function EsquemaAnuncio() {
  return (
    <Esquema>
      <Quadro className="h-22" />
      {m1.esquema.campos.map((campo) => (
        <Campo key={campo} rotulo={campo} largura="74%" />
      ))}
      <Chip tom="azul" className="self-start">
        {m1.esquema.pilula}
      </Chip>
    </Esquema>
  );
}

function EsquemaConversa() {
  return (
    <Esquema>
      <Bolha lado="recebida">{m2.esquema.mensagem}</Bolha>
      {/* Sem largura explícita a bolha vira fit-content (o `ml-auto` tira o stretch do flex)
          e as barras-fantasma em porcentagem colapsam para uma pílula de 32 px. */}
      <Bolha lado="enviada" className="w-[86%]" />
      <div className="border-t border-fio-escuro pt-4">
        <Chip tom="azul">{m2.esquema.chip}</Chip>
      </div>
    </Esquema>
  );
}

function EsquemaCrm() {
  return (
    <Esquema>
      <Chip tom="azul" className="self-start">
        {m3.esquema.etapa}
      </Chip>
      {m3.esquema.campos.map((campo) => (
        <Campo key={campo} rotulo={campo} largura="60%" />
      ))}
    </Esquema>
  );
}

/** O único que continua sendo cartão: é o objeto (o contato que virou cliente), não moldura. */
function EsquemaFechou() {
  return <CartaoCliente chip={m4.esquema.chip} className="max-w-[360px]" />;
}

const ESQUEMAS = [EsquemaAnuncio, EsquemaConversa, EsquemaCrm, EsquemaFechou];

export function Aquisicao() {
  return (
    <Secao
      id="aquisicao"
      campo="tinta"
      ritmo="compacto"
      numeral={4}
      fundo={<PadraoPontos className="text-branco opacity-[0.06] [mask-image:linear-gradient(to_top,black,transparent_70%)]" />}
    >
      <Container className="relative z-10">
        {/* Cabeçalho à mão em vez de `CabecaSecao`: a coluna direita leva abertura, chips e
            nota, e o componente só monta a abertura. */}
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-6">
            <Revelar>
              <Pilula className="text-secundario-escuro">{aquisicao.rotulo}</Pilula>
            </Revelar>
            <TituloDestaque titulo={aquisicao.titulo} as="h2" classe="t-titulo" animar="view" className="mt-6" />
          </div>
          <Revelar atraso={0.15} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p className="t-lead medida text-secundario-escuro">{aquisicao.abertura}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {aquisicao.dentro.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
            <p className="t-legenda mt-3 text-secundario-escuro">{aquisicao.nota}</p>
          </Revelar>
        </div>

        <ol className="jornal mt-16 lg:mt-22">
          {aquisicao.marcos.map((marco, i) => {
            // Um marco novo em `conteudo.ts` sem esquema aqui vira um marco sem desenho,
            // não uma página quebrada.
            const EsquemaDoMarco = ESQUEMAS[i];
            return (
              <li key={marco.rotulo}>
                <Revelar atraso={0.1 + i * 0.12}>
                  <Numeral numero={i + 1} tamanho="md" />
                  <h3 className="t-rotulo mt-4 text-secundario-escuro">{marco.rotulo}</h3>
                  <div className="mt-5">{EsquemaDoMarco ? <EsquemaDoMarco /> : null}</div>
                </Revelar>
              </li>
            );
          })}
        </ol>
      </Container>
    </Secao>
  );
}
