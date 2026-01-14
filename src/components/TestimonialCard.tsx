import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group will-change-transform">
      <Quote className="w-8 h-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors duration-300" />
      <p className="text-foreground leading-relaxed mb-6">"{quote}"</p>
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role} - {company}
        </p>
      </div>
    </div>
  );
}
