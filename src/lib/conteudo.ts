// Todo o texto do site, literal da copy aprovada pelo Vinicius em 23/10/2026
// (`demandas/interno-estudo-identidade-tecnica/manual/COPY-SITE.md`). Nada acrescentado; os campos
// [PROVA A CONFIRMAR] ficaram fora. Trocar texto aqui é trocar a copy aprovada: só com ele.

export const navegacao = {
  links: [
    { rotulo: "O que fazemos", alvo: "#o-que-fazemos" },
    { rotulo: "Painel", alvo: "#painel" },
    { rotulo: "Como começa", alvo: "#como-comeca" },
    { rotulo: "Perguntas", alvo: "#perguntas" },
  ],
  botao: "Falar no WhatsApp",
} as const;

export const hero = {
  titulo: "Cliente novo entrando, cliente antigo voltando.",
  apoio: "Anúncio no Meta e no Google, atendimento no WhatsApp, CRM, automação e IA, montados juntos dentro da sua empresa.",
  botao: "Falar no WhatsApp",
  nota: "Quem responde é quem cuida das suas campanhas.",
} as const;

export const palco = {
  etiqueta: "O que a Lemis implanta",
  esquerda: { palavra: "Chega.", linha: "Funil de aquisição: do anúncio à primeira compra." },
  direita: { palavra: "Volta.", linha: "Funil de retenção: quem já comprou compra de novo." },
} as const;

export const comoFunciona = {
  titulo: "O que a Lemis monta dentro da sua empresa.",
  apoio: "Anúncio, atendimento e CRM são montados juntos, para o contato do anúncio chegar até a venda e quem já comprou voltar a comprar.",
  etapas: [
    { numero: "01", nome: "Aquisição", titulo: "Anúncio que traz contato.", frase: "Campanhas no Meta e no Google, com criativo e página quando fizer sentido." },
    { numero: "02", nome: "Atendimento", titulo: "Contato registrado desde a primeira mensagem.", frase: "Quem chama no WhatsApp entra no CRM com a origem registrada." },
    { numero: "03", nome: "Retenção", titulo: "Quem já comprou, compra de novo.", frase: "Sua base já comprou uma vez. O funil de retenção trabalha para ela comprar de novo." },
  ],
  faixa: "Agentes de IA trabalham com o seu time em toda a jornada: no anúncio, no atendimento e na hora de chamar de volta quem já comprou.",
} as const;

export const painel = {
  etiqueta: "Painel",
  titulo: "Você vê qual anúncio virou venda.",
  paragrafo:
    "No Lemis Dashboard, com o seu login, você acompanha quanto investiu, quantos contatos cada anúncio trouxe e quanto eles venderam, sem esperar o fim do mês. E conversa com quem cuida das campanhas para decidir o próximo ajuste.",
  indicadores: ["Investimento e custo por contato", "Contatos de cada anúncio", "Vendas e faturamento do anúncio"],
} as const;

/**
 * O celular do Lemis Dashboard em todas as telas da página: rótulos da copy (seção 4) e números de
 * exemplo, marcados "dados de exemplo" na própria tela, como no protótipo aprovado.
 */
export const celular = {
  titulo: "Resumo",
  periodo: "Este mês",
  cartoes: { contatos: "Contatos", vendas: "Vendas", investimento: "Investimento" },
  origens: ["Meta Ads", "Google Ads"],
  selo: "Atualizado todo dia",
  exemplo: "dados de exemplo",
  numeros: {
    contatos: "128",
    vendas: "41",
    investimento: "R$ 4.820",
    barras: [38, 52, 44, 61, 57, 72, 90],
    origens: ["92", "36"],
  },
} as const;

export const comoComeca = {
  titulo: "Começa por uma conversa no WhatsApp.",
  apoio: "Você fala direto com quem vai cuidar das suas campanhas, sem formulário.",
  passos: [
    { titulo: "Você conta como vende hoje", frase: "De onde vêm os clientes, quem responde as mensagens e se quem já comprou volta a comprar." },
    { titulo: "Voltamos com a proposta", frase: "Os dois funis desenhados para a sua empresa e o que entra em cada um." },
    { titulo: "Implantamos com o seu time", frase: "Montamos o funil, liberamos o seu acesso ao painel e seguimos em conversas periódicas para ajustar." },
  ],
} as const;

export const perguntas = {
  titulo: "Perguntas antes da primeira conversa",
  itens: [
    {
      pergunta: "Vocês só cuidam do anúncio?",
      resposta:
        "Não. O anúncio é o começo. Com o seu time, montamos o atendimento no WhatsApp, o CRM e o funil de retenção, para quem já comprou voltar a comprar. Usamos automação e IA nesse caminho.",
    },
    {
      pergunta: "Quem atende os contatos que chegam?",
      resposta:
        "O seu time, salvo o que for combinado na proposta. Alinhamos o atendimento com o que o anúncio oferece e acompanhamos o que acontece com cada contato depois que ele chama.",
    },
    {
      pergunta: "Já tenho um CRM. Vou precisar trocar?",
      resposta: "Depende. Olhamos a ferramenta que você usa na primeira conversa e decidimos juntos se faz sentido manter ou trocar.",
    },
    {
      pergunta: "Já anunciei e não funcionou. O que muda?",
      resposta:
        "O anúncio traz o contato; a venda acontece depois, no atendimento. Cuidamos do que vem depois do clique e do que vem depois da compra, e o painel mostra qual anúncio virou venda.",
    },
    {
      pergunta: "Vocês prometem um número de clientes por mês?",
      resposta:
        "Não. Quantos clientes entram e quanto custa cada um depende da sua oferta, do seu mercado e de como o contato é atendido. O que você tem é o painel com o que cada anúncio trouxe, para decidir o próximo ajuste olhando o número.",
    },
  ],
} as const;

export const chamadaFinal = {
  titulo: "Conte como a sua empresa vende hoje.",
  apoio:
    "Com isso voltamos com os dois funis desenhados para você. Para começar, vamos precisar do acesso às suas contas de anúncio e de saber quem atende o seu WhatsApp.",
  botao: "Falar no WhatsApp",
} as const;

export const rodape = {
  frase: "Anúncio no Meta e no Google, atendimento no WhatsApp, CRM, automação e IA, montados juntos dentro da sua empresa.",
  navegar: "Navegar",
  conversar: "Conversar",
  whatsapp: "WhatsApp (75) 98802-3044",
  legal: "APL Digital — Assessoria em Marketing · CNPJ 44.840.036/0001-59 · Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG · © Lemis",
} as const;

export const metadados = {
  titulo: "Lemis — Cliente novo entrando, cliente antigo voltando",
  descricao:
    "A Lemis implanta na sua empresa o funil de aquisição e o de retenção, com tráfego no Meta e no Google, atendimento no WhatsApp, CRM, automação e IA, e um painel que mostra qual anúncio virou venda.",
} as const;

/** Textos de interface que não são copy de venda (leitor de tela, rótulos de controle). */
export const interfaceTextos = {
  pular: "Pular para o conteúdo",
  abrirMenu: "Abrir o menu",
  fecharMenu: "Fechar o menu",
  menu: "Seções da página",
  celular: "Lemis Dashboard no celular, com dados de exemplo",
  ogAlt: "Lemis — Cliente novo entrando, cliente antigo voltando",
} as const;
