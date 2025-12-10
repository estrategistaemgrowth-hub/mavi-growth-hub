import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "gray";
  id?: string;
}

export function Section({ children, className, variant = "default", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        variant === "dark" && "bg-mavi-black text-mavi-white",
        variant === "gray" && "bg-mavi-gray",
        variant === "default" && "bg-background",
        className
      )}
    >
      <div className="container-mavi">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          light ? "text-mavi-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-mavi-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
