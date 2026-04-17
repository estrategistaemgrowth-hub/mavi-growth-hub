import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/useTilt";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  highlight?: boolean;
}

export function ServiceCard({ title, description, icon: Icon, href, highlight }: ServiceCardProps) {
  const tiltRef = useTilt<HTMLAnchorElement>(6);

  return (
    <Link
      ref={tiltRef}
      to={href}
      className={cn(
        "group block p-6 rounded-2xl border transition-shadow duration-300 will-change-transform relative overflow-hidden card-shine tilt-card",
        highlight
          ? "text-primary-foreground border-primary/60 hover:shadow-[0_0_40px_hsl(336_100%_45%/0.5)] tilt-card-light"
          : "bg-card text-card-foreground border-border hover:border-primary/35 hover:shadow-[0_8px_32px_hsl(336_100%_45%/0.18)]"
      )}
      style={highlight ? {
        background: "linear-gradient(135deg, hsl(336 100% 45%) 0%, hsl(310 100% 50%) 100%)",
      } : undefined}
    >
      {/* Borda gradiente no hover */}
      {!highlight && (
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, hsl(336 100% 45% / 0.6), transparent)" }}
        />
      )}

      <div className="relative z-10">
        {/* Ícone */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
          highlight
            ? "bg-white/20 group-hover:bg-white/30 group-hover:scale-110"
            : "icon-container group-hover:scale-110"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-all duration-300",
            highlight
              ? "text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
              : "text-primary group-hover:drop-shadow-[0_0_10px_hsl(336_100%_45%/0.7)]"
          )} />
        </div>

        <h3 className={cn(
          "text-base font-semibold mb-2 leading-snug",
          highlight ? "text-white" : "text-foreground"
        )}>
          {title}
        </h3>

        <p className={cn(
          "text-sm leading-relaxed mb-5",
          highlight ? "text-white/75" : "text-muted-foreground"
        )}>
          {description}
        </p>

        <span className={cn(
          "inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300",
          highlight ? "text-white" : "text-primary",
          "group-hover:gap-2.5"
        )}>
          Ver detalhes
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
