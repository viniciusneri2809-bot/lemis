// Copy do site. Fonte única: nenhum componente escreve texto próprio.
//
// Posicionamento (20/09/2026): a oferta é o funil de aquisição e o de retenção implantados
// dentro da empresa do cliente. Tráfego, estratégia comercial, automação e IA são o meio,
// citados e nunca explicados.
//
// Sobre frase de marca, duas regras que convivem:
//
//  1. A frase que o Vinicius ESCOLHEU fica: "Cliente novo entrando, cliente antigo voltando.",
//     no H1 do hero e nos metadados. Ele escolheu entre três opções no terminal, em 20/09/2026.
//     Origem: decisoes/2026-09-20-frase-de-marca-cliente-novo-entrando (vigente) e
//     sessions/2026-09-20-lemis-site-v2-plano-funis.
//  2. Nenhuma frase de impacto NOVA é inventada. Fora o hero e os metadados, o ponto de maior
//     atenção de cada bloco — fechos de seção e CTA final — recebe a descrição concreta do que a
//     casa implanta. Palavras dele: "vamo ficar sem fazer essas frases de impacto e focar na
//     entrega". Origem: decisoes/2026-09-20-nada-de-frase-de-impacto-a-entrega-ocupa-o-lugar.
//
// A frase antiga da marca (a que ele disse que "nem gosta") continua vetada em peça nova, e o
// verificador reprova o build se ela voltar. Origem: identidade/o-que-nao-fazer.md, bloco
// `vetos-de-texto`.

export type NomeIcone = "aquisicao" | "atendimento" | "conexao" | "criacao" | "inteligencia" | "vendas";

/** Título com uma palavra em serifa itálica azul. `antes` e `depois` podem ser vazios. */
export type Titulo = { antes: string; destaque: string; depois: string };

export const nav = [
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Aquisição", href: "#aquisicao" },
  { rotulo: "Retenção", href: "#retencao" },
  { rotulo: "Como começa", href: "#como-comeca" },
  { rotulo: "Perguntas", href: "#perguntas" },
] as const;

/**
 * Texto de interface: o que o leitor de tela anuncia e a assinatura do rodapé.
 * Vive aqui pela mesma razão que o resto da copy: quem for trocar "(abre em nova aba)" ou a
 * assinatura procura em um arquivo só, e não em quatro componentes que podem divergir.
 */
export const textosDeInterface = {
  pularParaConteudo: "Pular para o conteúdo",
  abreEmNovaAba: "(abre em nova aba)",
  inicioDaPagina: "Lemis, início da página",
  voltarAoInicio: "Lemis, voltar ao início",
  navPrincipal: "Principal",
  navRodape: "Rodapé",
  abrirMenu: "Abrir menu",
  fecharMenu: "Fechar menu",
  assinatura: "© Lemis",
  painelAquisicao: "Etapas do funil de aquisição",
  painelRetencao: "Etapas do funil de retenção",
} as const;

export const cta = {
  rotulo: "Vamos conversar",
  nota: "Conversa pelo WhatsApp com quem cuida do funil.",
} as const;

/** Frase de marca e frase de apoio, as duas escolhidas pelo Vinicius em 20/09/2026. */
export const frase = {
  principal: "Cliente novo entrando, cliente antigo voltando.",
  apoio:
    "Tráfego, estratégia comercial, automação e IA a serviço de um funil que roda dentro da sua empresa.",
} as const;

export const hero = {
  rotulo: "Funil de aquisição e de retenção",
  titulo: {
    antes: "Cliente novo entrando, cliente antigo ",
    destaque: "voltando",
    depois: ".",
  } satisfies Titulo,
  paragrafo:
    "Implantamos na sua empresa o funil de aquisição e o de retenção: o caminho por onde o cliente novo chega e o cliente antigo compra de novo. Tráfego, estratégia comercial, automação e IA fazem isso rodar. Você conversa com quem cuida.",
  secundario: { rotulo: "Ver como funciona", href: "#como-funciona" },
  painel: {
    aquisicao: {
      rotulo: "Aquisição",
      nos: [
        { icone: "aquisicao", nome: "Anúncio" },
        { icone: "atendimento", nome: "Conversa no WhatsApp" },
        { icone: "conexao", nome: "Registrado no CRM" },
        { icone: "vendas", nome: "Fechou" },
      ],
    },
    retencao: {
      rotulo: "Retenção",
      nos: [
        { icone: "atendimento", nome: "Cliente novo" },
        { icone: "inteligencia", nome: "Hora de voltar" },
        { icone: "vendas", nome: "Comprou de novo" },
      ],
    },
    cliente: { chip: "Origem registrada" },
  },
} as const;

export const duasPortas = {
  rotulo: "As duas portas",
  titulo: {
    antes: "Seu faturamento entra por duas ",
    destaque: "portas",
    depois: ": quem chega e quem volta.",
  } satisfies Titulo,
  abertura:
    "A primeira é o cliente novo. A segunda é o cliente que já comprou. A maior parte do esforço de marketing olha só para a primeira.",
  cenas: [
    {
      rotulo: "Quem chega",
      texto:
        "A mensagem chega no horário de pico. Quem responde está no meio de outra coisa. A resposta sai quando dá, e a conversa esfria. Ninguém anotou de onde veio nem o que falta para fechar.",
      esquema: {
        mensagem: "Vi o anúncio, quanto fica?",
        horaRecebida: "09:12",
        horaEnviada: "11:48",
        chip: "Sem próximo passo",
      },
    },
    {
      rotulo: "Quem volta",
      texto:
        "O serviço é entregue e o cliente some do radar. Voltar depende da memória dele, não de um caminho seu.",
      esquema: { ultimaCompra: "Última compra", voltarEm: "Voltar em", chip: "Sem data de volta" },
    },
  ],
  fecho:
    "Nos dois casos falta a mesma coisa: um contato com origem registrada, um próximo passo marcado e uma hora de voltar. É isso que a Lemis monta.",
} as const;

export const virada = {
  rotulo: "O que a Lemis implanta",
  titulo: {
    antes: "Um caminho fixo por onde o cliente novo entra e o cliente antigo ",
    destaque: "volta",
    depois: ".",
  } satisfies Titulo,
  abertura:
    "Quem chama tem próximo passo registrado. Quem já comprou tem hora de voltar. O caminho existe dentro da sua empresa e continua rodando com o seu time, em vez de depender de quem estava livre naquele dia.",
  contraste: {
    outros: "Agência de tráfego entrega o contato.",
    lemis:
      "A Lemis implanta o caminho que o contato percorre, da primeira mensagem à compra seguinte.",
  },
  fundamentos: [
    {
      nome: "Proximidade",
      texto: "Você conversa com quem cuida do funil. Sem intermediário entre a decisão e a execução.",
    },
    {
      nome: "Visão comercial",
      texto:
        "Acompanhamos o que acontece depois do primeiro contato e depois da primeira compra.",
    },
    {
      nome: "Execução integrada",
      texto:
        "Anúncio, atendimento e CRM montados em função uns dos outros, com automação e IA onde fazem o caminho andar.",
    },
  ],
} as const;

export const aquisicao = {
  rotulo: "Funil de aquisição",
  titulo: { antes: "Do anúncio ao ", destaque: "fechamento", depois: "." } satisfies Titulo,
  abertura:
    "O anúncio traz a mensagem. O caminho faz ela virar cliente. Alinhamos com o seu time como cada contato é respondido a partir do que o anúncio prometeu, e o CRM guarda a origem e o próximo passo.",
  dentro: ["Tráfego pago", "Criativos", "Página", "CRM", "Automação", "IA"],
  nota: "O escopo de cada frente é definido em proposta.",
  marcos: [
    { rotulo: "Anúncio", esquema: { campos: ["Oferta", "Cidade"], pilula: "Fale no WhatsApp" } },
    {
      rotulo: "Conversa registrada",
      esquema: { mensagem: "Vi o anúncio, quanto fica?", chip: "Origem registrada" },
    },
    { rotulo: "Próximo passo marcado", esquema: { etapa: "Em negociação", campos: ["Origem", "Responsável"] } },
    { rotulo: "Fechou", esquema: { chip: "Virou cliente" } },
  ],
} as const;

export const retencao = {
  rotulo: "Funil de retenção",
  titulo: { antes: "Quem já comprou, compra ", destaque: "de novo", depois: "." } satisfies Titulo,
  abertura:
    "Retenção é fazer os clientes que já compraram comprar novamente. Quem já comprou não some do radar: tem hora de voltar, e o caminho de volta está pronto quando chega a hora.",
  apoio:
    "O mesmo cuidado da entrada, aplicado a quem já é seu cliente. É a parte do faturamento que a maioria deixa ao acaso.",
  estados: ["Cliente novo", "Hora de voltar", "Comprou de novo"],
  fecho:
    "O mesmo contato que entrou pelo anúncio fica no CRM com a data da última compra e a próxima hora de voltar.",
} as const;

export const acompanhamento = {
  rotulo: "Acompanhamento",
  titulo: { antes: "Você enxerga se está ", destaque: "funcionando", depois: "." } satisfies Titulo,
  abertura:
    "Painel em tempo real com o que entrou, o que avançou e o que voltou. E conversa periódica com quem cuida do funil, para decidir o próximo ajuste.",
  painel: {
    indicadores: ["Entraram", "Avançaram", "Voltaram"],
    origens: ["Meta Ads", "Google Ads"],
    chip: "Atualizado em tempo real",
  },
  exemplo: {
    rotulo: "Como soa uma conversa de acompanhamento",
    fala: "Vamos comparar os contatos recebidos com as conversas que avançaram, e os clientes novos com os que voltaram. A partir disso, revisamos a campanha e o próximo passo do funil.",
    nota: "Modelo de conversa. Nos acompanhamentos reais entram dados verificados, período e decisão proposta.",
  },
} as const;

export const comoComeca = {
  rotulo: "Como começa",
  titulo: { antes: "Você chama. Nós ouvimos antes de ", destaque: "propor", depois: "." } satisfies Titulo,
  abertura:
    "A conversa começa pelo WhatsApp, com quem cuida do funil. Sem formulário e sem intermediário.",
  passos: [
    {
      titulo: "Conversa inicial",
      corpo:
        "Você conta como o cliente chega hoje, o que acontece com a mensagem e se ele volta. Nós ouvimos e perguntamos.",
    },
    {
      titulo: "Leitura e proposta",
      corpo:
        "Voltamos com uma leitura das duas portas e uma proposta com escopo definido: o que entra no funil de aquisição, o que entra no de retenção e como o acompanhamento funciona.",
    },
    {
      titulo: "Implantação e acompanhamento",
      corpo:
        "Montamos o funil dentro da sua empresa, com o seu time. A partir daí, revisamos campanha, funil e retorno em conversas periódicas com você.",
    },
  ],
} as const;

export const perguntas = {
  titulo: "Perguntas que aparecem antes da primeira conversa",
  itens: [
    {
      pergunta: "Já tenho CRM. Vocês usam o meu?",
      resposta:
        "Avaliamos a ferramenta que você já usa antes de propor qualquer mudança. O que importa é cada contato ter origem registrada, próximo passo claro e hora de voltar.",
    },
    {
      pergunta: "Vocês assumem as vendas?",
      resposta:
        "Não. O funil roda dentro da sua empresa, com o seu time. Alinhamos como cada contato é respondido, acompanhamos o que avança e o que volta, e ajustamos a partir disso. Quem fala com o cliente continua sendo você, salvo escopo combinado em proposta.",
    },
    {
      pergunta: "Já investi em anúncio e não deu certo. Por que agora seria diferente?",
      resposta:
        "Porque o anúncio não trabalha sozinho. Quando a mensagem chega e não tem caminho, o problema parece ser o anúncio. Implantar o funil é cuidar do que acontece depois do clique e do que acontece depois da compra.",
    },
    {
      pergunta: "Preciso contratar tudo?",
      resposta:
        "Não. O escopo é definido em proposta a partir do que as suas duas portas precisam. Cada frente entra quando faz sentido.",
    },
    {
      pergunta: "Vocês garantem uma quantidade de clientes por mês?",
      resposta:
        "Não. Trabalhamos para o caminho existir e rodar, e explicamos os critérios por trás de cada ajuste. Quantidade e custo dependem da oferta, do mercado e da resposta ao cliente, e por isso não entram como promessa.",
    },
  ],
} as const;

/**
 * Fecho da página: o próximo passo concreto, não uma frase.
 * O que a casa precisa dele, o que ele recebe de volta, e por onde acontece.
 */
export const ctaFinal = {
  titulo: "Mande uma mensagem contando como o cliente chega hoje.",
  apoio:
    "Do que você contar sai a leitura das suas duas portas e uma proposta com escopo definido: o que entra no funil de aquisição, o que entra no de retenção e como o acompanhamento funciona.",
  nota: cta.nota,
} as const;

export const rodape = {
  apoio: frase.apoio,
  razaoSocial: "APL Digital — Assessoria em Marketing",
  cnpj: "CNPJ 44.840.036/0001-59",
  endereco: "Rua Rio de Janeiro, 243, Sala 802, Centro, Belo Horizonte, MG, CEP 30160-040",
  navegarRotulo: "Navegar",
  conversarRotulo: "Conversar",
  whatsappRotulo: "WhatsApp",
} as const;

export const metadados = {
  titulo: "Lemis — Cliente novo entrando, cliente antigo voltando",
  descricao:
    "Implantamos na sua empresa o funil de aquisição e o de retenção, com tráfego, estratégia comercial, automação e IA. Você conversa com quem cuida.",
  ogAlt: "Lemis — Cliente novo entrando, cliente antigo voltando.",
} as const;
