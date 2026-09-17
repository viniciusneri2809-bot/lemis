import type { ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

export function Container({ className = "", children }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[1408px] px-5 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
