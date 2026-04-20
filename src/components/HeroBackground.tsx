import { useEffect, useRef } from "react";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

interface HeroBackgroundProps {
  /** Intensidade do efeito. "subtle" para páginas internas, "medium" para home. */
  intensity?: "subtle" | "medium";
  /** Mostrar grid tech sutil */
  grid?: boolean;
  /** Mostrar scan-line passando */
  beam?: boolean;
}

/**
 * Fundo animado para heros: combina orbs com drift orgânico, aurora gradiente,
 * grid tech sutil e scan-line magenta. Tudo CSS puro (60fps), com parallax
 * leve no cursor. Respeita prefers-reduced-motion.
 */
export function HeroBackground({
  intensity = "medium",
  grid = true,
  beam = true,
}: HeroBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const aurora = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        if (orb1.current) {
          orb1.current.style.setProperty("--mx", `${x * 30}px`);
          orb1.current.style.setProperty("--my", `${y * 30}px`);
        }
        if (orb2.current) {
          orb2.current.style.setProperty("--mx", `${x * -20}px`);
          orb2.current.style.setProperty("--my", `${y * -20}px`);
        }
        if (aurora.current) {
          aurora.current.style.setProperty("--mx", `${x * 15}px`);
          aurora.current.style.setProperty("--my", `${y * 15}px`);
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const opacityScale = intensity === "subtle" ? 0.9 : 1;
  const auroraOpacity = intensity === "subtle" ? 0.34 : 0.52;
  const gridOpacity = intensity === "subtle" ? 0.22 : 0.34;
  const orb1Opacity = intensity === "subtle" ? 0.24 : 0.38;
  const orb2Opacity = intensity === "subtle" ? 0.16 : 0.24;
  const pulseOpacity = intensity === "subtle" ? 0.12 : 0.18;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none overflow-hidden hero-bg"
      aria-hidden="true"
    >
      <div
        ref={aurora}
        className="hero-aurora absolute top-1/2 left-1/2"
        style={{ opacity: auroraOpacity * opacityScale }}
      />

      {grid && (
        <div
          className="hero-grid absolute inset-0"
          style={{ opacity: gridOpacity * opacityScale }}
        />
      )}

      <div
        ref={orb1}
        className="hero-orb-anim hero-orb-1 absolute"
        style={{
          background:
            "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)",
          opacity: orb1Opacity * opacityScale,
        }}
      />

      <div
        ref={orb2}
        className="hero-orb-anim hero-orb-2 absolute"
        style={{
          background:
            "radial-gradient(circle, hsl(280 70% 55%) 0%, transparent 70%)",
          opacity: orb2Opacity * opacityScale,
        }}
      />

      <div
        className="hero-orb-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, hsl(310 100% 55%) 0%, transparent 70%)",
          opacity: pulseOpacity * opacityScale,
        }}
      />

      {beam && <div className="hero-beam absolute" style={{ opacity: opacityScale }} />}
    </div>
  );
}
