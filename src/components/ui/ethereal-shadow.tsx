import React, { useRef, useId, useEffect, CSSProperties } from "react";
import { animate, useMotionValue, AnimationPlaybackControls } from "framer-motion";

interface AnimationConfig {
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface EtherealShadowProps {
  /** Cor base do shadow. Use HSL semântico (ex: "hsl(var(--primary))"). */
  color?: string;
  /** Modo de preenchimento */
  sizing?: "fill" | "stretch";
  /** Animação de hue/displacement. scale 0 = parado. */
  animation?: AnimationConfig;
  /** Ruído sobreposto */
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  return `ethereal-${cleanId}`;
};

/**
 * Ethereal Shadow — fundo decorativo com gradiente radial deformado por
 * displacement filter SVG, com hue-rotate animado em loop. Performance
 * 60fps (GPU). Respeita prefers-reduced-motion.
 */
export function EtherealShadow({
  sizing = "fill",
  color = "hsl(var(--primary))",
  animation = { scale: 60, speed: 50 },
  noise = { opacity: 0.4, scale: 1.2 },
  style,
  className,
}: EtherealShadowProps) {
  const id = useInstanceId();
  const animationEnabled = !!animation && animation.scale > 0;
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

  useEffect(() => {
    if (!feColorMatrixRef.current || !animationEnabled) return;

    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
    hueRotateMotionValue.set(0);

    hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
      duration: animationDuration / 25,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
      onUpdate: (value: number) => {
        if (feColorMatrixRef.current) {
          feColorMatrixRef.current.setAttribute("values", String(value));
        }
      },
    });

    return () => {
      if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
    };
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Camada de cor com displacement */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: animationEnabled ? `url(#${id}-filter)` : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -displacementScale,
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${color}, transparent 70%)`,
            backgroundSize: sizing === "fill" ? "cover" : "100% 100%",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* SVG filter: hue-rotate + turbulence displacement */}
      {animationEnabled && (
        <svg
          style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <defs>
            <filter id={`${id}-filter}`} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed="2"
                result="noise"
              />
              <feColorMatrix
                ref={feColorMatrixRef}
                in="noise"
                type="hueRotate"
                values="180"
                result="rotated"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="rotated"
                scale={displacementScale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Noise overlay */}
      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: noise.opacity,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: `${256 * noise.scale}px`,
          }}
        />
      )}
    </div>
  );
}
