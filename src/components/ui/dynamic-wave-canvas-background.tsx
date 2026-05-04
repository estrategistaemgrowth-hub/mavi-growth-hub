import { useEffect, useRef } from "react";

interface HeroWaveProps {
  className?: string;
  /** Multiplicadores de canal RGB (0-1) — define o tom dominante. Padrão: magenta MAVI. */
  tint?: { r: number; g: number; b: number };
  /** Intensidade global do efeito (0.5 a 1.5) */
  intensity?: number;
}

/**
 * Onda dinâmica em canvas 2D — ruído procedural com seno/cosseno tabelados.
 * Adaptado pra magenta MAVI por padrão. Respeita prefers-reduced-motion.
 */
const HeroWave = ({
  className = "",
  tint = { r: 1.4, g: 0.15, b: 0.55 },
  intensity = 1,
}: HeroWaveProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SCALE = 3; // resolução interna reduzida pra performance

    let width = 0;
    let height = 0;
    let imageData: ImageData;
    let data: Uint8ClampedArray;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.offsetWidth || window.innerWidth;
      const h = parent?.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      width = Math.max(1, Math.floor(w / SCALE));
      height = Math.max(1, Math.floor(h / SCALE));
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };
    resize();
    window.addEventListener("resize", resize);

    const SIN = new Float32Array(1024);
    const COS = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const a = (i / 1024) * Math.PI * 2;
      SIN[i] = Math.sin(a);
      COS[i] = Math.cos(a);
    }
    const TAU = Math.PI * 2;
    const fastSin = (x: number) => SIN[Math.floor(((x % TAU) / TAU) * 1024) & 1023];
    const fastCos = (x: number) => COS[Math.floor(((x % TAU) / TAU) * 1024) & 1023];

    const startTime = Date.now();
    let raf = 0;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d");

    const render = () => {
      if (offscreen.width !== width || offscreen.height !== height) {
        offscreen.width = width;
        offscreen.height = height;
      }

      const time = (Date.now() - startTime) * 0.001;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height;
          const uy = (2 * y - height) / height;

          let a = 0;
          let d = 0;
          for (let i = 0; i < 4; i++) {
            a += fastCos(i - d + time * 0.5 - a * ux);
            d += fastSin(i * uy + a);
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const inten = (0.28 + 0.4 * wave) * intensity;
          const base = 0.08 + 0.14 * fastCos(ux + uy + time * 0.3);
          const accent1 = 0.22 * fastSin(a * 1.5 + time * 0.2);
          const accent2 = 0.15 * fastCos(d * 2 + time * 0.1);

          const r = Math.max(0, Math.min(1, (base + accent1 * 0.6) * tint.r)) * inten;
          const g = Math.max(0, Math.min(1, (base + accent2 * 0.4) * tint.g)) * inten;
          const b = Math.max(0, Math.min(1, (base + accent1 * 0.5 + accent2 * 0.3) * tint.b)) * inten;

          const idx = (y * width + x) * 4;
          data[idx] = r * 255;
          data[idx + 1] = g * 255;
          data[idx + 2] = b * 255;
          data[idx + 3] = 255;
        }
      }

      if (offCtx) {
        offCtx.putImageData(imageData, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
      }

      if (!reduced) raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [tint, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default HeroWave;
