export const atelierChannels = {
  whatsappNumber: "21620580505",
  whatsappSecondaryNumber: "21620579336",
  instagramUrl: null as string | null,
  facebookUrl: null as string | null,
};

export type WhatsAppNumber = "primary" | "secondary";

export function getWhatsAppUrl(message: string, number: WhatsAppNumber = "primary") {
  const phone = number === "secondary" ? atelierChannels.whatsappSecondaryNumber : atelierChannels.whatsappNumber;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
