import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/useTilt";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  const tiltRef = useTilt<HTMLDivElement>(5);

  return (
    <div
      ref={tiltRef}
      className={cn(
        "group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-shadow duration-300 will-change-transform relative overflow-hidden tilt-card",
        "hover:shadow-[0_12px_32px_-8px_hsl(336_100%_45%/0.25)]",
        className
      )}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(336_100%_45%/0.6)]" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
