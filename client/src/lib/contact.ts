export const atelierChannels = {
  whatsappNumber: "21620580505",
  instagramUrl: null as string | null,
  facebookUrl: null as string | null,
};

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${atelierChannels.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
