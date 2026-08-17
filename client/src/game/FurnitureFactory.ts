import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { Scene } from "@babylonjs/core/scene";
import type { FurnitureId, LegFinish, SurfaceMaterial } from "./WorldState";

type FurnitureStyle = { surface: SurfaceMaterial; finish: LegFinish };

const surfaceColors: Record<SurfaceMaterial, Color3> = {
  boucle: Color3.FromHexString("#e7d6bc"),
  leather: Color3.FromHexString("#aa6442"),
  velvet: Color3.FromHexString("#9f4934"),
};

const finishColors: Record<LegFinish, Color3> = {
  walnut: Color3.FromHexString("#4e281c"),
  brass: Color3.FromHexString("#b8905b"),
  espresso: Color3.FromHexString("#211613"),
};

function material(scene: Scene, name: string, color: Color3, specular = 0.13) {
  const result = new StandardMaterial(name, scene);
  result.diffuseColor = color;
  result.specularColor = color.scale(specular);
  return result;
}

function box(scene: Scene, root: TransformNode, name: string, size: [number, number, number], position: Vector3, materialRef: StandardMaterial) {
  const mesh = MeshBuilder.CreateBox(name, { width: size[0], height: size[1], depth: size[2] }, scene);
  mesh.parent = root;
  mesh.position = position;
  mesh.material = materialRef;
  return mesh;
}

function cylinder(scene: Scene, root: TransformNode, name: string, diameter: number, height: number, position: Vector3, materialRef: StandardMaterial) {
  const mesh = MeshBuilder.CreateCylinder(name, { diameter, height, tessellation: 28 }, scene);
  mesh.parent = root;
  mesh.position = position;
  mesh.material = materialRef;
  return mesh;
}

export function createFurniture(scene: Scene, id: FurnitureId, style: FurnitureStyle) {
  const root = new TransformNode(`rasyne-${id}`, scene);
  const upholstery = material(scene, `${id}-upholstery`, surfaceColors[style.surface], style.surface === "leather" ? 0.25 : 0.09);
  const finish = material(scene, `${id}-finish`, finishColors[style.finish], style.finish === "brass" ? 0.45 : 0.16);
  const dark = material(scene, `${id}-shadow`, Color3.FromHexString("#281915"), 0.05);

  if (id === "sofa") {
    box(scene, root, "sofa-seat", [2.4, 0.38, 0.9], new Vector3(0, 0.62, 0), upholstery);
    box(scene, root, "sofa-back", [2.4, 1.05, 0.22], new Vector3(0, 1.1, 0.36), upholstery);
    box(scene, root, "sofa-arm-left", [0.22, 0.73, 0.95], new Vector3(-1.09, 0.85, 0), upholstery);
    box(scene, root, "sofa-arm-right", [0.22, 0.73, 0.95], new Vector3(1.09, 0.85, 0), upholstery);
    [-0.88, 0.88].forEach((x) => [-0.3, 0.3].forEach((z) => cylinder(scene, root, `sofa-leg-${x}-${z}`, 0.08, 0.46, new Vector3(x, 0.23, z), finish)));
  } else if (id === "chair") {
    box(scene, root, "chair-seat", [1.05, 0.3, 0.92], new Vector3(0, 0.64, 0), upholstery);
    box(scene, root, "chair-back", [1.05, 1.1, 0.18], new Vector3(0, 1.17, 0.3), upholstery);
    [-0.4, 0.4].forEach((x) => [-0.3, 0.3].forEach((z) => cylinder(scene, root, `chair-leg-${x}-${z}`, 0.07, 0.62, new Vector3(x, 0.31, z), finish)));
  } else if (id === "table") {
    cylinder(scene, root, "table-top", 1.44, 0.16, new Vector3(0, 0.72, 0), finish).scaling.x = 1.55;
    cylinder(scene, root, "table-base", 0.5, 0.68, new Vector3(0, 0.34, 0), dark);
  } else if (id === "lamp") {
    cylinder(scene, root, "lamp-base", 0.42, 0.08, new Vector3(0, 0.04, 0), finish);
    cylinder(scene, root, "lamp-stem", 0.07, 1.75, new Vector3(0, 0.88, 0), finish);
    const shade = MeshBuilder.CreateCylinder("lamp-shade", { diameterTop: 0.42, diameterBottom: 0.7, height: 0.4, tessellation: 24 }, scene);
    shade.parent = root;
    shade.position.y = 1.75;
    shade.material = upholstery;
  } else {
    cylinder(scene, root, "ottoman-cushion", 0.95, 0.38, new Vector3(0, 0.46, 0), upholstery);
    cylinder(scene, root, "ottoman-base", 0.74, 0.32, new Vector3(0, 0.2, 0), finish);
  }

  return root;
}
