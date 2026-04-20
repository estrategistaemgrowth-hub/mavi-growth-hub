import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  /** Velocidade média por caractere (ms). Real varia ±40% para parecer humano. */
  speed?: number;
  /** Delay antes de começar (ms) */
  delay?: number;
  className?: string;
  /** Mostrar cursor piscando enquanto digita */
  cursor?: boolean;
  /** Conteúdo extra após o texto (ex: ponto final, span colorido) */
  children?: ReactNode;
  /** Atraso antes de mostrar children depois de terminar */
  childrenDelay?: number;
}

/**
 * Digita texto letra por letra com timing irregular (humano).
 * Inicia ao entrar no viewport. Respeita prefers-reduced-motion.
 */
export function TypewriterText({
  text,
  speed = 35,
  delay = 0,
  className,
  cursor = true,
  children,
  childrenDelay = 200,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayed(text);
      setDone(true);
      setShowChildren(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (i >= text.length) {
        setDone(true);
        setTimeout(() => setShowChildren(true), childrenDelay);
        return;
      }
      const ch = text[i];
      setDisplayed(text.slice(0, i + 1));
      i++;

      // Timing humano: pausa maior em pontuação, aleatório em letras
      let next = speed * (0.6 + Math.random() * 0.8);
      if (",;:".includes(ch)) next += 120;
      if (".!?".includes(ch)) next += 200;
      if (ch === " ") next *= 0.5;
      timeoutId = setTimeout(tick, next);
    };

    timeoutId = setTimeout(tick, delay);
    return () => clearTimeout(timeoutId);
  }, [started, text, speed, delay, childrenDelay]);

  return (
    <span ref={ref} className={cn("inline", className)}>
      {displayed}
      {cursor && !done && (
        <span
          className="inline-block w-[0.08em] h-[0.9em] bg-current align-[-0.1em] ml-[0.05em] animate-pulse"
          aria-hidden
        />
      )}
      {showChildren && children}
    </span>
  );
}
