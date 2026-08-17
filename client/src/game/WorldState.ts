export const furnitureCatalog = [
  { id: "sofa", key: "sofa", score: 1 },
  { id: "chair", key: "chair", score: 1 },
  { id: "table", key: "table", score: 1 },
  { id: "lamp", key: "lamp", score: 1 },
  { id: "ottoman", key: "ottoman", score: 1 },
] as const;

export type FurnitureId = (typeof furnitureCatalog)[number]["id"];
export type SurfaceMaterial = "boucle" | "leather" | "velvet";
export type LegFinish = "walnut" | "brass" | "espresso";

export type WorldSnapshot = {
  placements: (FurnitureId | null)[];
  selectedFurniture: FurnitureId | null;
  surface: SurfaceMaterial;
  finish: LegFinish;
  score: number;
  level: "starter" | "skyline";
};

export function isSkylineSuite(snapshot: Pick<WorldSnapshot, "level">) {
  return snapshot.level === "skyline";
}

export const worldSlots = [
  { x: -2.25, z: 0.75, rotation: 0.08 },
  { x: -0.4, z: -0.3, rotation: -0.15 },
  { x: 1.85, z: 0.75, rotation: -0.18 },
  { x: 2.55, z: -1.35, rotation: -0.34 },
  { x: -2.45, z: -1.55, rotation: 0.3 },
] as const;

export const initialWorldSnapshot = (): WorldSnapshot => ({
  placements: Array(worldSlots.length).fill(null),
  selectedFurniture: "sofa",
  surface: "boucle",
  finish: "walnut",
  score: 0,
  level: "starter",
});

export class WorldState {
  private state: WorldSnapshot;

  constructor(demo = false) {
    this.state = initialWorldSnapshot();
    if (demo) this.seedDemo();
  }

  snapshot(): WorldSnapshot {
    return { ...this.state, placements: [...this.state.placements] };
  }

  selectFurniture(id: FurnitureId | null) {
    this.state.selectedFurniture = id;
  }

  setVisualStyle(surface: SurfaceMaterial, finish: LegFinish) {
    this.state.surface = surface;
    this.state.finish = finish;
  }

  placeAt(slotIndex: number): boolean {
    if (!this.state.selectedFurniture || slotIndex < 0 || slotIndex >= this.state.placements.length) return false;
    const id = this.state.selectedFurniture;
    const previousSlot = this.state.placements.indexOf(id);
    if (previousSlot >= 0) this.state.placements[previousSlot] = null;
    this.state.placements[slotIndex] = id;
    this.recomputeProgress();
    return true;
  }

  reset() {
    this.state = initialWorldSnapshot();
  }

  seedDemo() {
    this.state.placements = ["chair", "sofa", "table", null, null];
    this.state.selectedFurniture = "lamp";
    this.recomputeProgress();
  }

  private recomputeProgress() {
    this.state.score = new Set(this.state.placements.filter(Boolean)).size;
    this.state.level = this.state.score >= 3 ? "skyline" : "starter";
  }
}
