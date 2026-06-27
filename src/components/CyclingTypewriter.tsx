import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CyclingTypewriterProps {
  phrases: string[];
  speed?: number;
  holdMs?: number;
  className?: string;
}

export function CyclingTypewriter({ phrases, speed = 38, holdMs = 2400, className }: CyclingTypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[phraseIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === current) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    } else if (!deleting) {
      const next = speed * (0.5 + Math.random() * 0.9);
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), next);
    } else {
      const next = speed * 0.32;
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), next);
    }

    return () => clearTimeout(t);
  }, [displayed, deleting, phraseIdx, phrases, speed, holdMs]);

  return (
    <span className={cn(className)}>
      {displayed}
      <span
        className="inline-block w-[0.05em] h-[0.88em] bg-current align-[-0.08em] ml-[0.04em] animate-pulse"
        aria-hidden
      />
    </span>
  );
}
