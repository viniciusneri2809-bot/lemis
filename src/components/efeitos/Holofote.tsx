"use client";

import { useEffect, useRef } from "react";

/** Renderize como filho direto de um elemento `relative`; o pai recebe o holofote. */
export function Holofote() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const pai = el?.parentElement;
    if (!el || !pai) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let quadro = 0;
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const r = pai.getBoundingClientRect();
        el.style.setProperty("--hx", `${clientX - r.left}px`);
        el.style.setProperty("--hy", `${clientY - r.top}px`);
        pai.classList.add("holofote-ativo");
      });
    };
    const sair = () => pai.classList.remove("holofote-ativo");
    pai.addEventListener("pointermove", mover);
    pai.addEventListener("pointerleave", sair);
    return () => {
      cancelAnimationFrame(quadro);
      pai.removeEventListener("pointermove", mover);
      pai.removeEventListener("pointerleave", sair);
    };
  }, []);
  return <div ref={ref} className="holofote" aria-hidden="true" />;
}
