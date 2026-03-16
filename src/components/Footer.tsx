export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xl font-black tracking-tight text-white">
          APL<span className="text-[#2563eb]">Digital</span>
        </span>
        <p className="text-sm text-white/40 text-center">
          &copy; {new Date().getFullYear()} APL Digital. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#servicos" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Serviços</a>
          <a href="#resultados" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Resultados</a>
          <a href="#contato" className="text-white/40 hover:text-white transition-colors text-xs font-semibold">Contato</a>
        </div>
      </div>
    </footer>
  );
}
