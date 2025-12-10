import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  highlight?: boolean;
}

export function ServiceCard({ title, description, icon: Icon, href, highlight }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group block p-6 rounded-xl border transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        highlight
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-card-foreground border-border hover:border-primary/50"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
          highlight ? "bg-primary-foreground/20" : "bg-primary/10"
        )}
      >
        <Icon className={cn("w-6 h-6", highlight ? "text-primary-foreground" : "text-primary")} />
      </div>
      <h3 className={cn("text-lg font-semibold mb-2", highlight && "text-primary-foreground")}>
        {title}
      </h3>
      <p className={cn("text-sm leading-relaxed mb-4", highlight ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {description}
      </p>
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium",
          highlight ? "text-primary-foreground" : "text-primary",
          "group-hover:gap-3 transition-all"
        )}
      >
        Ver detalhes
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
