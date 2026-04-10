import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema } from "@/components/SEO";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  author_name: string;
  published_at: string | null;
  created_at: string;
  blog_categories: { name: string; slug: string } | null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(name, slug)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    setPost(data as unknown as Post | null);
    setLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Artigo não encontrado</h1>
          <Button asChild>
            <Link to="/blog">Voltar ao Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || post.excerpt || "",
    "image": post.featured_image_url || "https://www.agenciamavi.com.br/og-image.png",
    "author": {
      "@type": "Person",
      "name": post.author_name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "MAVI Marketing Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.agenciamavi.com.br/og-image.png",
      },
    },
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.agenciamavi.com.br/blog/${post.slug}`,
    },
    "inLanguage": "pt-BR",
    "url": `https://www.agenciamavi.com.br/blog/${post.slug}`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, breadcrumbSchema],
  };

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.meta_description || post.excerpt || `Leia o artigo "${post.title}" no blog da MAVI Marketing Digital.`}
        canonical={`/blog/${post.slug}`}
        ogImage={post.featured_image_url || undefined}
        schemaMarkup={schemaMarkup}
      />

      <article className="pt-24 pb-16">
        {/* Hero */}
        {post.featured_image_url && (
          <div className="w-full max-h-[480px] overflow-hidden">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container-mavi max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground py-6">
            <Link to="/" className="hover:text-primary">Início</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            {post.blog_categories && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                <Tag className="w-3 h-3" /> {post.blog_categories.name}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author_name}
              </span>
              {post.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.published_at).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-blockquote:border-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Blog
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
