import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createContactMessage, createOrderRequest, listContactMessages, listOrderRequests, updateOrderRequestStatus } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { generateImage } from "./_core/imageGeneration";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { transcribeAudio } from "./_core/voiceTranscription";
import { storageGet, storagePut } from "./storage";
import { buildDesignPrompt, studioServices } from "./studio";

const serviceSchema = z.enum(studioServices);
const statusSchema = z.enum(["received", "reviewing", "quoted", "accepted", "completed"]);
const supportedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "audio/webm",
  "audio/wav",
  "audio/mpeg",
  "audio/ogg",
  "audio/mp4",
] as const;

function fileBufferFromDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid uploaded file" });
  return Buffer.from(match[2], "base64");
}

function safeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "upload";
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  studio: router({
    upload: publicProcedure
      .input(
        z.object({
          dataUrl: z.string().min(32),
          fileName: z.string().min(1).max(140),
          mimeType: z.enum(supportedMimeTypes),
        })
      )
      .mutation(async ({ input }) => {
        const buffer = fileBufferFromDataUrl(input.dataUrl);
        const maxBytes = input.mimeType.startsWith("audio/") ? 16 * 1024 * 1024 : 8 * 1024 * 1024;
        if (buffer.length > maxBytes) {
          throw new TRPCError({ code: "PAYLOAD_TOO_LARGE", message: "The selected file is too large" });
        }

        const { key, url } = await storagePut(
          `studio-uploads/${Date.now()}-${safeFileName(input.fileName)}`,
          buffer,
          input.mimeType
        );
        return { key, url, mimeType: input.mimeType };
      }),
    transcribe: publicProcedure
      .input(z.object({ audioKey: z.string().min(8), language: z.enum(["en", "fr", "ar"]).optional() }))
      .mutation(async ({ input }) => {
        const { url } = await storageGet(input.audioKey);
        const result = await transcribeAudio({
          audioUrl: url,
          language: input.language,
          prompt: "Transcribe an upholstery, furniture redesign, or customer order request accurately.",
        });
        if ("error" in result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: result.error });
        }
        return { text: result.text, language: result.language };
      }),
    generate: publicProcedure
      .input(
        z.object({
          brief: z.string().min(12).max(1500),
          service: serviceSchema,
          style: z.string().max(80).optional(),
          material: z.string().max(80).optional(),
          referenceKey: z.string().min(8).optional(),
          referenceMimeType: z.enum(["image/jpeg", "image/png", "image/webp"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const reference = input.referenceKey
          ? [
              {
                url: (await storageGet(input.referenceKey)).url,
                mimeType: input.referenceMimeType ?? "image/jpeg",
              },
            ]
          : undefined;
        const { url } = await generateImage({
          prompt: buildDesignPrompt({
            brief: input.brief,
            service: input.service,
            style: input.style,
            material: input.material,
            hasReferenceImage: Boolean(input.referenceKey),
          }),
          originalImages: reference,
          quality: "medium",
        });
        if (!url) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "No design concept was returned" });
        return { url };
      }),
  }),
  orders: router({
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2).max(120),
          phone: z.string().min(5).max(40),
          email: z.string().email().max(320).optional().or(z.literal("")),
          service: serviceSchema,
          brief: z.string().min(12).max(1800),
          style: z.string().max(80).optional(),
          material: z.string().max(80).optional(),
          referenceKey: z.string().max(512).optional(),
          referenceUrl: z.string().max(3000).optional(),
          conceptUrl: z.string().max(3000).optional(),
          preferredContact: z.enum(["phone", "whatsapp", "email"]),
          language: z.enum(["en", "fr", "ar"]),
        })
      )
      .mutation(async ({ input }) => {
        const created = await createOrderRequest({
          ...input,
          email: input.email || null,
          style: input.style || null,
          material: input.material || null,
          referenceKey: input.referenceKey || null,
          referenceUrl: input.referenceUrl || null,
          conceptUrl: input.conceptUrl || null,
        });
        return { id: created?.id };
      }),
    list: adminProcedure.query(() => listOrderRequests()),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: statusSchema }))
      .mutation(({ input }) => updateOrderRequestStatus(input.id, input.status)),
  }),
  contact: router({
    create: publicProcedure
      .input(z.object({ fullName: z.string().min(2).max(120), contact: z.string().min(5).max(320), message: z.string().min(10).max(1600), language: z.enum(["en", "fr", "ar"]) }))
      .mutation(async ({ input }) => {
        const created = await createContactMessage(input);
        return { id: created?.id };
      }),
    list: adminProcedure.query(() => listContactMessages()),
  }),
});

export type AppRouter = typeof appRouter;
