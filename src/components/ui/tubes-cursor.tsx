import { useEffect, useRef } from "react";

type TubesCursorProps = {
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  className?: string;
};

/**
 * Efeito 3D de tubos que seguem o cursor (WebGL via threejs-components).
 * Carregado dinamicamente do CDN. Respeita prefers-reduced-motion.
 */
export const TubesCursor = ({
  initialColors = ["#ec0064", "#00e5ff", "#7c3aed"],
  lightColors = ["#ec0064", "#00e5ff", "#ff3ea5", "#7c3aed"],
  lightIntensity = 220,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    (async () => {
      try {
        const url = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        const mod: any = await import(/* @vite-ignore */ url);
        const TubesCursorCtor = mod.default ?? mod;
        if (!canvasRef.current || destroyed) return;

        const app = TubesCursorCtor(canvasRef.current, {
          tubes: {
            colors: initialColors,
            lights: { intensity: lightIntensity, colors: lightColors },
          },
        });
        appRef.current = app;
      } catch (err) {
        console.warn("TubesCursor failed to load:", err);
      }
    })();

    return () => {
      destroyed = true;
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        /* ignore */
      }
    };
  }, [initialColors, lightColors, lightIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
