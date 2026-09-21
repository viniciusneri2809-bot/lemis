"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

type EscuroProps = { escuro?: boolean };

/** `escuro` troca só as cores; comportamento, ARIA e teclado são os do Radix, intactos. */
function AccordionItem({
  className,
  escuro = false,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item> & EscuroProps) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0", escuro ? "border-fio-escuro" : "border-fio-claro", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  escuro = false,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger> & EscuroProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "t-sub group flex flex-1 items-start justify-between gap-6 py-5 text-left transition-colors duration-200",
          escuro ? "text-branco hover:text-secundario-escuro" : "text-tinta hover:text-azul",
          className,
        )}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="mt-1 shrink-0 text-azul">
          <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            focusable="false"
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-acordeao-fechar data-[state=open]:animate-acordeao-abrir motion-reduce:animate-none"
      {...props}
    >
      <div className={cn("pb-6", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
