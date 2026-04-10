import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema } from "@/components/SEO";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string;
  published_at: string | null;
  blog_categories: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categoria") || "";
  const page = parseInt(searchParams.get("pagina") || "1");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, page]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("name");
    if (data) setCategories(data);
  };

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image_url, author_name, published_at, blog_categories(name, slug)")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) query = query.eq("category_id", cat.id);
    }

    const { data } = await query;
    setPosts((data as unknown as BlogPost[]) || []);
    setLoading(false);
  };

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("categoria", slug);
    } else {
      params.delete("categoria");
    }
    params.delete("pagina");
    setSearchParams(params);
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog MAVI Marketing Digital",
    "description": "Artigos sobre marketing digital, e-commerce, performance, automação e IA para impulsionar seu negócio.",
    "url": "https://www.agenciamavi.com.br/blog",
    "publisher": {
      "@type": "Organization",
      "name": "MAVI Marketing Digital",
      "logo": "https://www.agenciamavi.com.br/og-image.png",
    },
    "inLanguage": "pt-BR",
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [blogSchema, breadcrumbSchema],
  };

  return (
    <Layout>
      <SEO
        title="Blog — Artigos sobre Marketing Digital"
        description="Leia artigos sobre marketing digital, e-commerce, performance, automação e inteligência artificial. Conteúdo da MAVI para impulsionar seu negócio."
        canonical="/blog"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero */}
      <section className="section-dark pt-32 pb-16">
        <div className="container-mavi text-center">
          <span className="badge-pill mb-4">📝 Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog <span className="gradient-text">MAVI</span>
          </h1>
          <p className="text-mavi-white/70 max-w-2xl mx-auto text-lg">
            Artigos, dicas e tendências sobre marketing digital, e-commerce, performance e inteligência artificial.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border">
        <div className="container-mavi py-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("")}
            >
              Todos
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.slug)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-background py-16">
        <div className="container-mavi">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  featuredImageUrl={post.featured_image_url}
                  authorName={post.author_name}
                  publishedAt={post.published_at}
                  categoryName={post.blog_categories?.name}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum artigo encontrado. Em breve teremos novos conteúdos!
              </p>
            </div>
          )}

          {/* Pagination */}
          {posts.length === POSTS_PER_PAGE && (
            <div className="flex justify-center mt-12 gap-2">
              {page > 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("pagina", String(page - 1));
                    setSearchParams(params);
                  }}
                >
                  Anterior
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("pagina", String(page + 1));
                  setSearchParams(params);
                }}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
