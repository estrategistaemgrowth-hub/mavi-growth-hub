import { useEffect, useRef } from "react";

type TubesCursorProps = {
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  className?: string;
};

// A lib é um ES module (export default), então carrega via import(), não via <script>.
const MODULE_SRC =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

// Fora do componente: arrays criados no default dos props mudariam a cada render e
// recriariam o WebGL pelo array de dependências do useEffect.
const DEFAULT_COLORS = ["#ec0064", "#00e5ff", "#7c3aed"];
const DEFAULT_LIGHT_COLORS = ["#ec0064", "#00e5ff", "#ff3ea5", "#7c3aed"];

/**
 * Tubos 3D WebGL que seguem o cursor (lib threejs-components via CDN).
 * Canvas preso ao hero (primeira dobra): o wrapper do HeroBackground recorta com overflow-hidden.
 */
export const TubesCursor = ({
  initialColors = DEFAULT_COLORS,
  lightColors = DEFAULT_LIGHT_COLORS,
  lightIntensity = 220,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<{ dispose?: () => void } | null>(null);

  useEffect(() => {
    let destroyed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Mobile/touch: efeito 3D pesado de Three.js (~500KB) não agrega valor sem cursor
    // e trava o carregamento. Desligar em telas pequenas / pointer coarse.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    if (isCoarse || isSmall) return;

    import(/* @vite-ignore */ MODULE_SRC)
      .then(({ default: Ctor }) => {
        if (!Ctor || !canvasRef.current || destroyed) return;
        const app = Ctor(canvasRef.current, {
          tubes: {
            colors: initialColors,
            lights: { intensity: lightIntensity, colors: lightColors },
          },
        });
        appRef.current = app;
      })
      .catch((err) => console.warn("TubesCursor failed:", err));

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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};
