import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-magenta transition-all duration-300 hover:-translate-y-2 group">
      <Quote className="w-8 h-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
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
