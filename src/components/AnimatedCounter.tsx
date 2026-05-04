import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Casas decimais a exibir (ex: 1 para 8.4) */
  decimals?: number;
  /** Separador de milhar (ex: "." para BR) */
  thousandSeparator?: string;
  /** Separador decimal */
  decimalSeparator?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
  thousandSeparator = '',
  decimalSeparator = ',',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = end * easeOut;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setDone(true);
        setTimeout(() => setDone(false), 700);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const format = (n: number) => {
    const fixed = n.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const intFmt = thousandSeparator
      ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
      : intPart;
    return decPart ? `${intFmt}${decimalSeparator}${decPart}` : intFmt;
  };

  return (
    <span ref={ref} className={`counter-flash ${done ? 'is-done' : ''} ${className}`}>
      {prefix}{format(count)}{suffix}
    </span>
  );
}
