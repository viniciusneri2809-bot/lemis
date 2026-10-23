// A largura da página: 1440 px com margem de 20 px no celular e de 56 a 136 px no desktop (manual, §4).
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-14 xl:px-[136px] ${className}`}>{children}</div>;
}
