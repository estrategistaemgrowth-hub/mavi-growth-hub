import { useEffect, useRef } from "react";

type TubesCursorProps = {
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  className?: string;
};

const SCRIPT_SRC =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

function loadScript(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`) as HTMLScriptElement | null;
    if (existing && (existing as any)._loaded) {
      resolve((window as any).tubesCursor1 ?? (window as any).default);
      return;
    }
    const s = existing ?? document.createElement("script");
    s.src = src;
    s.dataset.src = src;
    s.async = true;
    s.onload = () => {
      (s as any)._loaded = true;
      // a lib expõe window.tubesCursor1 (UMD)
      resolve((window as any).tubesCursor1);
    };
    s.onerror = (e) => reject(e);
    if (!existing) document.head.appendChild(s);
  });
}

/**
 * Tubos 3D WebGL que seguem o cursor (lib threejs-components via CDN).
 * Canvas fixo na viewport pra capturar o mouse em qualquer scroll.
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
    // Mobile/touch: efeito 3D pesado de Three.js (~500KB) não agrega valor sem cursor
    // e trava o carregamento. Desligar em telas pequenas / pointer coarse.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    if (isCoarse || isSmall) return;

    loadScript(SCRIPT_SRC)
      .then((Ctor) => {
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
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};
