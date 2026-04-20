import { useEffect, useRef, useState, ReactNode, Children } from "react";
import { cn } from "@/lib/utils";

type SplitVariant = "blur" | "slide" | "blur-slide";

interface SplitTextProps {
  /** Texto puro OU children React (será renderizado direto se não for string) */
  children: ReactNode;
  /** Granularidade da animação */
  by?: "word" | "char";
  variant?: SplitVariant;
  /** Stagger entre palavras/letras (ms) */
  stagger?: number;
  /** Duração base de cada palavra (ms) */
  duration?: number;
  /** Delay antes de iniciar */
  delay?: number;
  className?: string;
  /** Classe aplicada a cada palavra/char (ex: gradient-text) */
  itemClassName?: string;
  as?: "span" | "div";
}

/**
 * Anima palavra por palavra (ou letra) com blur-in e/ou slide-up.
 * Stagger irregular para sensação humana. Trigger no viewport.
 */
export function SplitText({
  children,
  by = "word",
  variant = "blur-slide",
  stagger = 60,
  duration = 700,
  delay = 0,
  className,
  itemClassName,
  as = "span",
}: SplitTextProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Suporte a children mistos: strings são quebradas, ReactNodes (ex: <span>)
  // são tratados como uma "unidade" única que também anima.
  const text = typeof children === "string" ? children : null;

  const Wrap = as as any;

  const baseStyle = "inline-block transition-all ease-out will-change-transform";
  const hiddenStyle = {
    blur: "opacity-0 blur-[10px]",
    slide: "opacity-0 translate-y-[0.5em]",
    "blur-slide": "opacity-0 blur-[8px] translate-y-[0.4em]",
  }[variant];
  const shownStyle = "opacity-100 blur-0 translate-y-0";

  const renderItem = (content: ReactNode, idx: number, total: number) => {
    // Stagger irregular: ±25% para parecer humano
    const jitter = ((idx * 9301 + 49297) % 233280) / 233280; // determinístico
    const itemDelay = delay + idx * stagger * (0.85 + jitter * 0.3);
    return (
      <span
        key={idx}
        className={cn(baseStyle, visible ? shownStyle : hiddenStyle, itemClassName)}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: visible ? `${itemDelay}ms` : "0ms",
        }}
      >
        {content}
        {by === "word" && idx < total - 1 ? "\u00A0" : ""}
      </span>
    );
  };

  if (text) {
    const units = by === "word" ? text.split(" ") : Array.from(text);
    return (
      <Wrap ref={ref} className={cn("inline", className)}>
        {units.map((u, i) => renderItem(u, i, units.length))}
      </Wrap>
    );
  }

  // children mistos: anima cada filho como uma unidade
  const arr = Children.toArray(children);
  return (
    <Wrap ref={ref} className={cn("inline", className)}>
      {arr.map((child, i) => {
        if (typeof child === "string") {
          const units = child.split(" ");
          return units.map((u, j) =>
            renderItem(u, i * 100 + j, arr.length * 100)
          );
        }
        return renderItem(child, i, arr.length);
      })}
    </Wrap>
  );
}
