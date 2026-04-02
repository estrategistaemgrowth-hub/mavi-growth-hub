import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  const initials = author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="group relative bg-card rounded-2xl p-7 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_hsl(336_100%_45%/0.1)] will-change-transform overflow-hidden">

      {/* Borda superior colorida */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Quote mark decorativo */}
      <div className="absolute top-5 right-5 text-6xl font-serif text-primary/8 leading-none select-none pointer-events-none group-hover:text-primary/15 transition-colors duration-300">
        "
      </div>

      {/* Estrelas */}
      <div className="flex gap-0.5 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Citação */}
      <p className="text-foreground/85 leading-relaxed mb-7 text-sm relative z-10">
        "{quote}"
      </p>

      {/* Autor */}
      <div className="flex items-center gap-3">
        {/* Avatar com iniciais */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(336 100% 45%), hsl(310 100% 55%))" }}>
          {initials}
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{author}</p>
          <p className="text-xs text-muted-foreground">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}
