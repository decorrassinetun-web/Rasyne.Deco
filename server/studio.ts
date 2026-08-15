export const studioServices = [
  "reupholstery",
  "living_room",
  "car_interior",
  "furniture_redesign",
  "carpeting",
  "other",
] as const;

export type StudioService = (typeof studioServices)[number];

const serviceLabels: Record<StudioService, string> = {
  reupholstery: "a reupholstery project for a sofa, chair, or salon set",
  living_room: "a made-to-measure living room composition",
  car_interior: "a bespoke automotive upholstery project",
  furniture_redesign: "a furniture redesign concept",
  carpeting: "a custom carpet or textile-covering concept",
  other: "a bespoke craft and interior transformation",
};

export function buildDesignPrompt(input: {
  brief: string;
  service: StudioService;
  style?: string;
  material?: string;
  hasReferenceImage?: boolean;
}) {
  const sourceInstruction = input.hasReferenceImage
    ? "Use the supplied reference image as the starting point. Preserve the object’s core silhouette and proportions while reimagining only the requested finishes, textiles, colours, and setting."
    : "Create a complete original design concept from the description without relying on a reference image.";

  return [
    "Create one sophisticated, photorealistic design concept for Rasyne Deco, a small artisan upholstery and furniture restoration atelier in Sayada, Tunisia.",
    `Project type: ${serviceLabels[input.service]}.`,
    sourceInstruction,
    `Client brief: ${input.brief.trim()}.`,
    input.style ? `Preferred visual style: ${input.style.trim()}.` : "Preferred visual style: warm contemporary craftsmanship.",
    input.material ? `Preferred material or textile: ${input.material.trim()}.` : "Suggested materials: tactile upholstery, honest wood, refined stitching, and durable natural finishes.",
    "Composition: editorial interior or close-up furniture photography, clear focal object, realistic scale and construction, warm natural light, earthy ivory, espresso, terracotta, olive, and muted brass palette.",
    "No people, no visible brands, no readable text, no watermark, no unrealistic proportions, no generic showroom styling.",
  ].join(" ");
}
