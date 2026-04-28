import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "gray" | "muted";
  id?: string;
}

export function Section({ children, className, variant = "default", id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        variant === "dark" && "bg-mavi-black text-mavi-white",
        // Antes "gray"/"muted"/"default" usavam fundo claro. Agora alinhados ao tema escuro MAVI.
        variant === "gray" && "bg-[hsl(0_0%_7%)] text-mavi-white",
        variant === "muted" && "bg-[hsl(0_0%_5%)] text-mavi-white",
        variant === "default" && "bg-mavi-black text-mavi-white",
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
    <div className={cn("mb-14", centered && "text-center")}>
      {/* Accent bar */}
      <div className={cn(
        "section-accent-bar mb-4",
        centered && "mx-auto"
      )} />

      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight",
          light ? "text-mavi-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl leading-relaxed",
            centered && "mx-auto",
            light ? "text-mavi-white/60" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
