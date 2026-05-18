import { Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, User, ArrowRight, ImageIcon } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  authorName: string;
  publishedAt: string | null;
  categoryName?: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImageUrl,
  authorName,
  publishedAt,
  categoryName,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = featuredImageUrl && !imageError;
  const showFallback = !featuredImageUrl || imageError;

  return (
    <Link
      to={`/blog/${slug}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden card-hover"
    >
      {showImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={featuredImageUrl!}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      {showFallback && (
        <div className="aspect-video bg-gradient-to-br from-primary via-primary/70 to-accent flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary-foreground)/0.15),transparent_60%)]" />
          <ImageIcon className="w-12 h-12 text-primary-foreground/70 relative z-10" aria-hidden="true" />
        </div>
      )}
      <div className="p-6">
        {categoryName && (
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            {categoryName}
          </span>
        )}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {authorName}
            </span>
            {publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(publishedAt).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
