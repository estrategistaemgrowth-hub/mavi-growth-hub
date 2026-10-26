import { Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  authorName: string;
  publishedAt: string | null;
  categoryName?: string;
  /** Post em destaque: imagem grande ao lado do texto. */
  featured?: boolean;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImageUrl,
  authorName,
  publishedAt,
  categoryName,
  featured = false,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = featuredImageUrl && !imageError;

  return (
    <Link
      to={`/blog/${slug}`}
      className={cn("group grid gap-5", featured && "items-center md:grid-cols-[1.15fr,1fr] md:gap-10")}
    >
      <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card">
        {showImage ? (
          <img
            src={featuredImageUrl!}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading={featured ? "eager" : "lazy"}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-primary/5">
            <Newspaper className="h-10 w-10 text-primary/40" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>
      <div>
        {categoryName && (
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {categoryName}
          </span>
        )}
        <h3
          className={cn(
            "font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary text-balance",
            featured ? "mb-3 text-2xl md:text-4xl md:leading-[1.1]" : "mb-2 line-clamp-2 text-xl",
          )}
        >
          {title}
        </h3>
        {excerpt && (
          <p className={cn("mb-4 leading-relaxed text-muted-foreground", featured ? "line-clamp-4 md:text-lg" : "line-clamp-3 text-[15px]")}>
            {excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" aria-hidden="true" /> {authorName}
          </span>
          {publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {new Date(publishedAt).toLocaleDateString("pt-BR")}
            </span>
          )}
          <ArrowRight className="ml-auto h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
