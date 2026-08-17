import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { Scene } from "@babylonjs/core/scene";
import { createFurniture } from "./FurnitureFactory";
import { isSkylineSuite, type FurnitureId, type LegFinish, type SurfaceMaterial, WorldState, worldSlots, type WorldSnapshot } from "./WorldState";

export type GameHandle = {
  scene: Scene;
  selectFurniture: (id: FurnitureId) => void;
  setVisualStyle: (surface: SurfaceMaterial, finish: LegFinish) => void;
  reset: () => void;
  demo: () => void;
  dispose: () => void;
};

type SceneOptions = { onState: (snapshot: WorldSnapshot) => void; demo?: boolean };

function matte(scene: Scene, name: string, hex: string, specular = 0.08) {
  const result = new StandardMaterial(name, scene);
  const color = Color3.FromHexString(hex);
  result.diffuseColor = color;
  result.specularColor = color.scale(specular);
  return result;
}

export async function createGameScene(engine: Engine, canvas: HTMLCanvasElement, options: SceneOptions): Promise<GameHandle> {
  const scene = new Scene(engine);
  scene.clearColor = Color4.FromHexString("#261612ff");
  const camera = new ArcRotateCamera("rasyne-worlds-camera", -1.05, 1.05, 10.2, new Vector3(0, 0.92, 0), scene);
  camera.lowerRadiusLimit = 6.3;
  camera.upperRadiusLimit = 12.8;
  camera.lowerBetaLimit = 0.55;
  camera.upperBetaLimit = 1.32;
  camera.wheelDeltaPercentage = 0.012;
  camera.attachControl(canvas, true);

  const sky = new HemisphericLight("rasyne-sky", new Vector3(0.15, 1, 0.25), scene);
  sky.intensity = 0.82;
  sky.groundColor = Color3.FromHexString("#3a251c");
  const sun = new DirectionalLight("rasyne-sun", new Vector3(-0.45, -1, 0.32), scene);
  sun.position = new Vector3(4.5, 7, -5);
  sun.intensity = 0.92;

  const floor = MeshBuilder.CreateGround("atelier-floor", { width: 9.8, height: 7.8 }, scene);
  floor.material = matte(scene, "floor-mat", "#4c392e", 0.14);
  const rug = MeshBuilder.CreateGround("atelier-rug", { width: 6.8, height: 4.85 }, scene);
  rug.position.y = 0.01;
  rug.material = matte(scene, "rug-mat", "#c8b390", 0.05);
  const backWall = MeshBuilder.CreateBox("back-wall", { width: 9.8, height: 5.6, depth: 0.16 }, scene);
  backWall.position = new Vector3(0, 2.7, 3.35);
  backWall.material = matte(scene, "wall-mat", "#d8c7ae", 0.04);
  const sideWall = MeshBuilder.CreateBox("side-wall", { width: 0.16, height: 5.6, depth: 7.8 }, scene);
  sideWall.position = new Vector3(-4.82, 2.7, 0);
  sideWall.material = matte(scene, "side-wall-mat", "#cdb999", 0.04);

  const skylineRoot = new TransformNode("skyline-suite", scene);
  const starterRoot = new TransformNode("starter-home", scene);
  const windowFrame = MeshBuilder.CreateBox("window-frame", { width: 4.1, height: 3.4, depth: 0.18 }, scene);
  windowFrame.position = new Vector3(1.95, 2.55, 3.18);
  windowFrame.material = matte(scene, "window-frame-mat", "#4d2c22", 0.12);
  windowFrame.parent = skylineRoot;
  const windowGlow = MeshBuilder.CreatePlane("window-glow", { width: 3.78, height: 3.08 }, scene);
  windowGlow.position = new Vector3(1.95, 2.55, 3.07);
  windowGlow.material = matte(scene, "skyline-sky", "#a96542", 0.02);
  windowGlow.parent = skylineRoot;
  [
    { x: 0.6, h: 1.2, w: 0.34 }, { x: 1.15, h: 1.8, w: 0.48 }, { x: 1.75, h: 1.38, w: 0.36 },
    { x: 2.28, h: 2.15, w: 0.62 }, { x: 2.94, h: 1.58, w: 0.44 }, { x: 3.45, h: 2.42, w: 0.42 },
  ].forEach((tower, index) => {
    const mesh = MeshBuilder.CreateBox(`skyline-${index}`, { width: tower.w, height: tower.h, depth: 0.08 }, scene);
    mesh.position = new Vector3(tower.x, 1.1 + tower.h / 2, 2.97);
    mesh.material = matte(scene, `skyline-mat-${index}`, index % 2 ? "#5a3025" : "#743b29", 0.06);
    mesh.parent = skylineRoot;
  });
  const starterPanel = MeshBuilder.CreateBox("starter-material-board", { width: 3.8, height: 2.75, depth: 0.12 }, scene);
  starterPanel.position = new Vector3(1.95, 2.35, 3.18);
  starterPanel.material = matte(scene, "starter-board-mat", "#4d3027", 0.08);
  starterPanel.parent = starterRoot;
  ["#e0cfb2", "#a95437", "#5c3225", "#c49a62"].forEach((color, index) => {
    const swatch = MeshBuilder.CreateBox(`starter-swatch-${index}`, { width: 0.58, height: 1.58, depth: 0.08 }, scene);
    swatch.position = new Vector3(0.78 + index * 0.78, 2.38, 3.09);
    swatch.material = matte(scene, `starter-swatch-mat-${index}`, color, 0.12);
    swatch.parent = starterRoot;
  });
  const starterShelf = MeshBuilder.CreateBox("starter-shelf", { width: 3.82, height: 0.1, depth: 0.38 }, scene);
  starterShelf.position = new Vector3(1.95, 1.38, 3.02);
  starterShelf.material = matte(scene, "starter-shelf-mat", "#3e251e", 0.1);
  starterShelf.parent = starterRoot;

  scene.imageProcessingConfiguration.exposure = 0.82;
  scene.imageProcessingConfiguration.contrast = 1.12;
  const slotMaterial = matte(scene, "slot-idle", "#cfad7e", 0.12);
  slotMaterial.alpha = 0.42;
  const activeSlotMaterial = matte(scene, "slot-active", "#efc277", 0.16);
  activeSlotMaterial.alpha = 0.85;
  const slotMeshes = worldSlots.map((slot, index) => {
    const disc = MeshBuilder.CreateDisc(`placement-slot-${index}`, { radius: 0.56, tessellation: 32 }, scene);
    disc.rotation.x = Math.PI / 2;
    disc.position = new Vector3(slot.x, 0.03, slot.z);
    disc.material = slotMaterial;
    disc.metadata = { rasyneSlot: index };
    return disc;
  });

  const world = new WorldState(options.demo || new URLSearchParams(window.location.search).has("demo"));
  let placedRoots: TransformNode[] = [];

  const emit = () => options.onState(world.snapshot());
  const refreshSlots = () => {
    const state = world.snapshot();
    slotMeshes.forEach((slot, index) => {
      const occupied = Boolean(state.placements[index]);
      slot.material = state.selectedFurniture && !occupied ? activeSlotMaterial : slotMaterial;
      slot.isVisible = !occupied;
    });
  };
  const refreshFurniture = () => {
    placedRoots.forEach((root) => root.dispose());
    placedRoots = [];
    const state = world.snapshot();
    state.placements.forEach((id, slotIndex) => {
      if (!id) return;
      const slot = worldSlots[slotIndex];
      const root = createFurniture(scene, id, { surface: state.surface, finish: state.finish });
      root.position = new Vector3(slot.x, 0.04, slot.z);
      root.rotation.y = slot.rotation;
      root.getChildMeshes().forEach((mesh) => { mesh.metadata = { rasyneSlot: slotIndex }; });
      placedRoots.push(root);
    });
    const skyline = isSkylineSuite(state);
    skylineRoot.setEnabled(skyline);
    starterRoot.setEnabled(!skyline);
    backWall.material = skyline ? matte(scene, "skyline-wall-mat", "#c8b69c", 0.04) : matte(scene, "starter-wall-mat", "#d9c8af", 0.04);
    scene.clearColor = Color4.FromHexString(skyline ? "#261612ff" : "#2d201aff");
    refreshSlots();
  };
  const update = () => {
    refreshFurniture();
    emit();
  };

  const pointerObserver = scene.onPointerObservable.add((event) => {
    if (event.type !== PointerEventTypes.POINTERPICK) return;
    const slotIndex = event.pickInfo?.pickedMesh?.metadata?.rasyneSlot;
    if (typeof slotIndex === "number" && world.placeAt(slotIndex)) update();
  });

  refreshFurniture();
  emit();

  return {
    scene,
    selectFurniture: (id) => { world.selectFurniture(id); refreshSlots(); emit(); },
    setVisualStyle: (surface, finish) => { world.setVisualStyle(surface, finish); update(); },
    reset: () => { world.reset(); update(); },
    demo: () => { world.seedDemo(); update(); },
    dispose: () => { scene.onPointerObservable.remove(pointerObserver); placedRoots.forEach((root) => root.dispose()); scene.dispose(); },
  };
}
