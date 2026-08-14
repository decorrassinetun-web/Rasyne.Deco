import { describe, expect, it } from "vitest";
import { buildDesignPrompt } from "./studio";

describe("buildDesignPrompt", () => {
  it("creates a text-only furniture concept brief when there is no reference upload", () => {
    const prompt = buildDesignPrompt({
      brief: "A calm family salon with a curved sofa in warm linen",
      service: "living_room",
      style: "Mediterranean modern",
      material: "natural linen",
    });

    expect(prompt).toContain("Create a complete original design concept");
    expect(prompt).toContain("Mediterranean modern");
    expect(prompt).toContain("natural linen");
    expect(prompt).toContain("no readable text");
  });

  it("preserves the original silhouette when a client supplies a reference image", () => {
    const prompt = buildDesignPrompt({
      brief: "Reupholster the armchair in oxblood leather",
      service: "reupholstery",
      hasReferenceImage: true,
    });

    expect(prompt).toContain("Preserve the object’s core silhouette and proportions");
    expect(prompt).toContain("reupholstery project");
  });
});
