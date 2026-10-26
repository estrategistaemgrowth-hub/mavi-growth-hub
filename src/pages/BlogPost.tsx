import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getPrerenderData } from "@/lib/prerender-data";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, ORG_ID } from "@/components/SEO";
import { Calendar, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";
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
  updated_at?: string | null;
  blog_categories: { name: string; slug: string } | null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const initialPost = getPrerenderData<Post>(`post:${slug}`);
  const [post, setPost] = useState<Post | null>(initialPost ?? null);
  const [loading, setLoading] = useState(!initialPost);

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
    "publisher": { "@id": ORG_ID },
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
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

      <article className="bg-background pb-20 pt-28 md:pt-36">
        {/* Cabeçalho do artigo na mesma coluna de leitura */}
        <header className="container-mavi max-w-[46rem]">
          <nav className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="shrink-0 hover:text-primary">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog" className="shrink-0 hover:text-primary">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-foreground">{post.title}</span>
          </nav>

          {post.blog_categories && (
            <span className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Tag className="h-3 w-3" aria-hidden="true" /> {post.blog_categories.name}
            </span>
          )}
          <h1 className="mb-6 mt-4 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground text-balance md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-semibold text-foreground">{post.author_name}</span>
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {new Date(post.published_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </header>

        {post.featured_image_url && (
          <div className="container-mavi mt-10 max-w-5xl">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="h-auto w-full rounded-2xl border border-border object-contain"
            />
          </div>
        )}

        <div className="container-mavi mt-12 max-w-[46rem]">
          {/* Conteúdo: coluna de ~68ch, tipografia de artigo no tema claro */}
          <div
            className="prose prose-lg max-w-[68ch] prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mt-12 prose-p:leading-[1.75] prose-p:text-foreground/85 prose-a:font-semibold prose-a:text-primary prose-a:underline-offset-4 prose-strong:text-foreground prose-li:text-foreground/85 prose-li:marker:text-primary prose-blockquote:border-l-primary prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-foreground prose-img:rounded-xl prose-hr:border-border"
            dangerouslySetInnerHTML={{ __html: (post.content || "").replace(/<(\/?)h1\b/gi, "<$1h2") }}
          />

          {/* CTA ao final (sem heading, para não mexer na estrutura do artigo) */}
          <div className="mt-14 rounded-2xl bg-primary p-7 text-white md:p-9">
            <p className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">Quer ver o que trava suas vendas hoje?</p>
            <p className="mt-3 max-w-[52ch] text-white/90">
              Sessão de 30 minutos, gratuita. A gente olha seu funil, aponta o gargalo e mostra o que mudaria. Sem proposta enfiada no fim.
            </p>
            <Button asChild size="lg" className="group mt-6 h-auto w-full whitespace-normal bg-white py-3 text-center text-primary hover:bg-foreground hover:text-white sm:w-auto">
              <Link to="/contato">
                Quero uma consultoria gratuita
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-10">
            <Button variant="outline" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
