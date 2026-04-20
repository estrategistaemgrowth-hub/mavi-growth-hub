import { useEffect, useRef } from "react";
import InteractiveNeuralVortex from "@/components/ui/interactive-neural-vortex-background";
import { TubesCursor } from "@/components/ui/tubes-cursor";

interface HeroBackgroundProps {
  /** Intensidade do efeito. "subtle" para páginas internas, "medium" para home. */
  intensity?: "subtle" | "medium";
  /** Mostrar grid tech sutil */
  grid?: boolean;
  /** Mostrar scan-line passando */
  beam?: boolean;
  /** Superfície do hero para ajustar blend/opacidade do fundo. */
  tone?: "dark" | "light";
}

/**
 * Fundo animado para heros: combina vortex WebGL, orbs, aurora, grid e beam.
 * Ajusta blend/opacidade conforme o hero seja escuro ou claro.
 */
export function HeroBackground({
  intensity = "medium",
  grid = true,
  beam = true,
  tone = "dark",
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

  const isLight = tone === "light";
  const opacityScale = intensity === "subtle" ? (isLight ? 0.72 : 0.9) : isLight ? 0.82 : 1;
  const auroraOpacity = isLight
    ? intensity === "subtle"
      ? 0.16
      : 0.22
    : intensity === "subtle"
      ? 0.34
      : 0.52;
  const gridOpacity = isLight
    ? intensity === "subtle"
      ? 0.08
      : 0.12
    : intensity === "subtle"
      ? 0.22
      : 0.34;
  const orb1Opacity = isLight
    ? intensity === "subtle"
      ? 0.12
      : 0.16
    : intensity === "subtle"
      ? 0.24
      : 0.38;
  const orb2Opacity = isLight
    ? intensity === "subtle"
      ? 0.08
      : 0.12
    : intensity === "subtle"
      ? 0.16
      : 0.24;
  const pulseOpacity = isLight
    ? intensity === "subtle"
      ? 0.06
      : 0.1
    : intensity === "subtle"
      ? 0.12
      : 0.18;

  const rootStyle = isLight
    ? {
        background:
          "linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background)) 16%, hsl(var(--primary) / 0.10) 55%, hsl(var(--background)) 100%)",
      }
    : { background: "hsl(240 10% 3%)" };

  const vortexClass = isLight
    ? intensity === "subtle"
      ? "opacity-35 mix-blend-multiply"
      : "opacity-45 mix-blend-multiply"
    : intensity === "subtle"
      ? "opacity-70"
      : "opacity-90";

  const tubesClass = isLight
    ? "opacity-18 mix-blend-multiply"
    : "opacity-60 mix-blend-screen";

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none overflow-hidden hero-bg"
      style={rootStyle}
      aria-hidden="true"
    >
      <InteractiveNeuralVortex
        colorA={[0.92, 0.0, 0.4]}
        colorB={[0.45, 0.05, 0.55]}
        colorC={[1.0, 0.2, 0.55]}
        className={vortexClass}
      />

      <TubesCursor
        initialColors={["#ec0064", "#00e5ff", "#7c3aed"]}
        lightColors={["#ec0064", "#00e5ff", "#ff3ea5", "#7c3aed"]}
        lightIntensity={220}
        className={tubesClass}
      />

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
          background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)",
          opacity: orb1Opacity * opacityScale,
        }}
      />

      <div
        ref={orb2}
        className="hero-orb-anim hero-orb-2 absolute"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 55%) 0%, transparent 70%)",
          opacity: orb2Opacity * opacityScale,
        }}
      />

      <div
        className="hero-orb-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, hsl(310 100% 55%) 0%, transparent 70%)",
          opacity: pulseOpacity * opacityScale,
        }}
      />

      {beam && <div className="hero-beam absolute" style={{ opacity: opacityScale }} />}
    </div>
  );
}
