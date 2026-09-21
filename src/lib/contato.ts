export const WHATSAPP_NUMERO = "5575988023044";

// A mensagem que o dono envia já diz o que ele quer, na linguagem do posicionamento novo:
// o funil de aquisição e o de retenção. Sem eco da frase de marca reprovada.
export const WHATSAPP_MENSAGEM =
  "Olá, Lemis. Quero conversar sobre implantar o funil de aquisição e de retenção na minha empresa.";

export function linkWhatsApp(mensagem: string = WHATSAPP_MENSAGEM): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const LINK_WHATSAPP = linkWhatsApp();
