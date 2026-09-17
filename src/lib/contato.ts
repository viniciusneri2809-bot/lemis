export const WHATSAPP_NUMERO = "5575988023044";

export const WHATSAPP_MENSAGEM =
  "Olá, Lemis. Quero conversar sobre o próximo passo do meu negócio.";

export function linkWhatsApp(mensagem: string = WHATSAPP_MENSAGEM): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const LINK_WHATSAPP = linkWhatsApp();
