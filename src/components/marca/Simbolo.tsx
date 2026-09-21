import { useId } from "react";

type Props = { className?: string; titulo?: string };

export function Simbolo({ className = "", titulo }: Props) {
  const id = useId();
  const acessivel = titulo
    ? { role: "img" as const, "aria-labelledby": id }
    : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg viewBox="0 0 64 64" className={className} {...acessivel}>
      {titulo ? <title id={id}>{titulo}</title> : null}
      <path fill="currentColor" d="M8 6H24V36Q24 42 30 42H56V58H28Q8 58 8 38Z" />
    </svg>
  );
}
