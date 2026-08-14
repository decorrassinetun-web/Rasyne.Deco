import { describe, expect, it } from "vitest";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2).max(120),
  contact: z.string().min(5).max(320),
  message: z.string().min(10).max(1600),
  language: z.enum(["en", "fr", "ar"]),
});

describe("contact message validation", () => {
  it("accepts a complete multilingual contact request", () => {
    expect(contactSchema.safeParse({ fullName: "Amira Ben Salem", contact: "+216 20 580 505", message: "Je souhaite discuter de la réfection de deux fauteuils.", language: "fr" }).success).toBe(true);
  });

  it("rejects a message too short to be actionable", () => {
    expect(contactSchema.safeParse({ fullName: "Amira", contact: "+216 20 580 505", message: "Bonjour", language: "fr" }).success).toBe(false);
  });
});
