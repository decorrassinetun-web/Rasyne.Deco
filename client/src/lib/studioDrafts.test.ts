import { describe, expect, it } from "vitest";
import { createStudioDraft, parseStudioDrafts } from "./studioDrafts";

const input = { brief: "A tailored ivory lounge chair with walnut legs", service: "reupholstery", style: "quiet luxury", material: "bouclé", modelWidth: 240, modelDepth: 92, comfort: 8, sceneMaterial: "boucle" as const, legFinish: 0, exploded: false, activeStudy: 0, reference: null, conceptUrl: null };

describe("studio drafts", () => {
  it("creates a recoverable saved dossier", () => {
    const draft = createStudioDraft(input, 1_700_000_000_000);
    expect(draft).toMatchObject({ id: "1700000000000-a-tailored-ivory-lounge", createdAt: 1_700_000_000_000, brief: input.brief });
    expect(parseStudioDrafts(JSON.stringify([draft]))).toEqual([draft]);
  });

  it("ignores invalid local storage payloads", () => {
    expect(parseStudioDrafts("not json")).toEqual([]);
    expect(parseStudioDrafts(JSON.stringify([{ id: 2 }]))).toEqual([]);
  });
});
