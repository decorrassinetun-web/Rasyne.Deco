import type { SurfaceMaterial } from "@/game/WorldState";

export type StudioReference = { key: string; url: string; mimeType: string };

export type StudioDraftInput = {
  brief: string;
  service: string;
  style: string;
  material: string;
  modelWidth: number;
  modelDepth: number;
  comfort: number;
  sceneMaterial: SurfaceMaterial;
  legFinish: number;
  exploded: boolean;
  activeStudy: number;
  reference: StudioReference | null;
  conceptUrl: string | null;
};

export type SavedStudioDraft = StudioDraftInput & { id: string; createdAt: number };

export const studioDraftStorageKey = "rasyne-deco-studio-drafts-v1";

export function createStudioDraft(input: StudioDraftInput, createdAt = Date.now()): SavedStudioDraft {
  const identity = input.brief.trim().slice(0, 24).replace(/\s+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "untitled";
  return { ...input, id: `${createdAt}-${identity}`, createdAt };
}

export function parseStudioDrafts(raw: string | null): SavedStudioDraft[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((draft): draft is SavedStudioDraft => Boolean(draft && typeof draft.id === "string" && typeof draft.createdAt === "number" && typeof draft.brief === "string" && typeof draft.service === "string"));
  } catch {
    return [];
  }
}

export function readStudioDrafts(): SavedStudioDraft[] {
  if (typeof window === "undefined") return [];
  return parseStudioDrafts(window.localStorage.getItem(studioDraftStorageKey));
}

export function persistStudioDrafts(drafts: SavedStudioDraft[]) {
  window.localStorage.setItem(studioDraftStorageKey, JSON.stringify(drafts.slice(0, 6)));
}
