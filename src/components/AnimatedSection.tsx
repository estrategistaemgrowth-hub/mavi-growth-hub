import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AnimationType = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInLeft" 
  | "fadeInRight" 
  | "scaleIn" 
  | "slideUp"
  | "bounceIn";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

const animationClasses: Record<AnimationType, string> = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInLeft: "animate-fade-in-left",
  fadeInRight: "animate-fade-in-right",
  scaleIn: "animate-scale-in",
  slideUp: "animate-slide-up",
  bounceIn: "animate-bounce-in",
};

const delayClasses: Record<number, string> = {
  0: "",
  100: "animation-delay-100",
  200: "animation-delay-200",
  300: "animation-delay-300",
  400: "animation-delay-400",
  500: "animation-delay-500",
  600: "animation-delay-600",
  700: "animation-delay-700",
  800: "animation-delay-800",
};

export function AnimatedSection({
  children,
  animation = "fadeInUp",
  delay = 0,
  className,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold, triggerOnce: true });

  const delayClass = delayClasses[delay] || "";
  const animationClass = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 will-change-transform",
        isInView && [animationClass, delayClass],
        className
      )}
    >
      {children}
    </div>
  );
}

interface AnimatedChildrenProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function AnimatedChildren({
  children,
  className,
  threshold = 0.1,
}: AnimatedChildrenProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        isInView ? "stagger-children" : "[&>*]:opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
