"use client";

import { useEffect, useState, type CSSProperties, type RefObject } from "react";

type Props = {
  conteinerRef: RefObject<HTMLElement | null>;
  deRef: RefObject<HTMLElement | null>;
  paraRef: RefObject<HTMLElement | null>;
  atraso?: number;
  raio?: number;
};

function centroX(el: HTMLElement) {
  return el.offsetLeft + el.offsetWidth / 2;
}

export function FeixeConexao({ conteinerRef, deRef, paraRef, atraso = 0, raio = 24 }: Props) {
  const [d, setD] = useState("");
  const [tam, setTam] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const c = conteinerRef.current;
    const a = deRef.current;
    const b = paraRef.current;
    if (!c || !a || !b) return;
    const calcular = () => {
      const ax = centroX(a);
      const ay = a.offsetTop + a.offsetHeight;
      const bTopo = b.offsetTop;
      const bMeioY = b.offsetTop + b.offsetHeight / 2;
      const bEsq = b.offsetLeft;
      const bDir = b.offsetLeft + b.offsetWidth;
      let caminho: string;
      if (ax > bEsq && ax < bDir) {
        caminho = `M${ax} ${ay}V${bTopo}`;
      } else if (bEsq >= ax) {
        caminho = `M${ax} ${ay}V${bMeioY - raio}Q${ax} ${bMeioY} ${ax + raio} ${bMeioY}H${bEsq}`;
      } else {
        caminho = `M${ax} ${ay}V${bMeioY - raio}Q${ax} ${bMeioY} ${ax - raio} ${bMeioY}H${bDir}`;
      }
      setD(caminho);
      setTam({ w: c.offsetWidth, h: c.offsetHeight });
    };
    calcular();
    if ("fonts" in document) {
      document.fonts.ready.then(calcular).catch(() => {});
    }
    const ro = new ResizeObserver(calcular);
    ro.observe(c);
    ro.observe(a);
    ro.observe(b);
    return () => ro.disconnect();
  }, [conteinerRef, deRef, paraRef, raio]);

  if (!d) return null;
  const estilo = { "--feixe-atraso": `${atraso}s` } as CSSProperties;
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={tam.w}
      height={tam.h}
      viewBox={`0 0 ${tam.w} ${tam.h}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} className="feixe-linha" strokeWidth={1.5} />
      <path d={d} pathLength={100} className="feixe-pulso feixe-brilho" strokeWidth={6} strokeLinecap="round" style={estilo} />
      <path d={d} pathLength={100} className="feixe-pulso" strokeWidth={2} strokeLinecap="round" style={estilo} />
    </svg>
  );
}
