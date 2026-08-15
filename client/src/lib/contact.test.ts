import { describe, expect, it } from "vitest";
import { atelierChannels, getWhatsAppUrl } from "./contact";

describe("atelier contact channels", () => {
  it("builds a WhatsApp URL with the central atelier number and an encoded brief", () => {
    const url = getWhatsAppUrl("Hello Rasyne Deco — ivory bouclé sofa");

    expect(url).toContain(`wa.me/${atelierChannels.whatsappNumber}`);
    expect(url).toContain("Hello%20Rasyne%20Deco");
  });
});
