import { Engine } from "@babylonjs/core/Engines/engine";
import { useEffect, useRef } from "react";
import { createGameScene, type GameHandle } from "@/game/scene";
import type { WorldSnapshot } from "@/game/WorldState";

type GameCanvasProps = {
  onReady?: (handle: GameHandle) => void;
  onState?: (snapshot: WorldSnapshot) => void;
};

export default function GameCanvas({ onReady, onState }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const callbacksRef = useRef({ onReady, onState });
  callbacksRef.current = { onReady, onState };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || startedRef.current) return;
    startedRef.current = true;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, adaptToDeviceRatio: true });
    let handle: GameHandle | null = null;
    let disposed = false;
    createGameScene(engine, canvas, { onState: (snapshot) => callbacksRef.current.onState?.(snapshot) }).then((game) => {
      if (disposed) { game.dispose(); return; }
      handle = game;
      callbacksRef.current.onReady?.(game);
      engine.runRenderLoop(() => game.scene.render());
    });
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      handle?.dispose();
      engine.dispose();
      startedRef.current = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="worlds-canvas" aria-label="Rasyne Worlds interactive furnishing scene" style={{ touchAction: "none" }} />;
}
