import { describe, expect, it } from "vitest";
import { isSkylineSuite, WorldState } from "./WorldState";

describe("WorldState", () => {
  it("unlocks the skyline after three distinct furniture placements", () => {
    const world = new WorldState();
    world.selectFurniture("sofa"); world.placeAt(0);
    world.selectFurniture("chair"); world.placeAt(1);
    world.selectFurniture("table"); world.placeAt(2);
    expect(world.snapshot()).toMatchObject({ score: 3, level: "skyline" });
    expect(isSkylineSuite(world.snapshot())).toBe(true);
  });

  it("moves an already placed object instead of double counting it", () => {
    const world = new WorldState();
    world.selectFurniture("sofa"); world.placeAt(0); world.placeAt(3);
    expect(world.snapshot().placements).toEqual([null, null, null, "sofa", null]);
    expect(world.snapshot().score).toBe(1);
    expect(isSkylineSuite(world.snapshot())).toBe(false);
  });
});
