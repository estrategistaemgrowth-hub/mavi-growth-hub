import { useEffect, useRef } from "react";

/**
 * Camada decorativa para o hero: dois orbs grandes que fazem parallax suave
 * em direção ao cursor (efeito "presença").
 * Respeita prefers-reduced-motion.
 */
export function HeroOrbs() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2; // -1..1
        const y = (e.clientY / innerHeight - 0.5) * 2;

        if (orb1.current) {
          orb1.current.style.setProperty("--orb-x", `${x * 40}px`);
          orb1.current.style.setProperty("--orb-y", `${y * 40}px`);
        }
        if (orb2.current) {
          orb2.current.style.setProperty("--orb-x", `${x * -25}px`);
          orb2.current.style.setProperty("--orb-y", `${y * -25}px`);
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Orb magenta — direita/topo */}
      <div
        ref={orb1}
        className="hero-orb absolute -top-20 right-0 w-[600px] h-[600px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)" }}
      />
      {/* Orb purple — esquerda/baixo */}
      <div
        ref={orb2}
        className="hero-orb absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(280 70% 55%) 0%, transparent 70%)" }}
      />
      {/* Orb pequeno extra — centro, com pulso */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-10 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(310 100% 55%) 0%, transparent 70%)" }}
      />
    </div>
  );
}
