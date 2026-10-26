import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getPrerenderData } from "@/lib/prerender-data";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema } from "@/components/SEO";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categoria") || "";
  const page = parseInt(searchParams.get("pagina") || "1");
  const initialPosts = !activeCategory && page === 1 ? getPrerenderData<BlogPost[]>("blog:posts") : undefined;
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts ?? []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!initialPosts);

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
        title="Blog: Artigos sobre Marketing Digital"
        description="Leia artigos sobre marketing digital, e-commerce, performance, automação e inteligência artificial. Conteúdo da MAVI para impulsionar seu negócio."
        canonical="/blog"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero */}
      <section className="bg-background pb-10 pt-32 md:pt-40">
        <div className="container-mavi">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-3.5 text-[13px] font-semibold text-muted-foreground">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Blog
          </span>
          <h1 className="mb-4 mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            Blog <span className="text-primary">MAVI</span>
          </h1>
          <p className="max-w-[58ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            Artigos, dicas e tendências sobre marketing digital, e-commerce, performance e inteligência artificial.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="sticky top-24 z-20 border-y border-border bg-background/90 backdrop-blur">
        <div className="container-mavi flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {[{ id: "", name: "Todos", slug: "" }, ...categories].map((cat) => {
            const on = activeCategory === cat.slug;
            return (
              <button
                key={cat.id || "todos"}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                  on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts: o primeiro em destaque, os demais em grade */}
      <section className="bg-background py-14 md:py-20">
        <div className="container-mavi">
          {loading ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-video rounded-2xl bg-muted" />
                  <div className="h-4 w-1/4 rounded bg-muted" />
                  <div className="h-6 w-3/4 rounded bg-muted" />
                  <div className="h-4 rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="border-b border-border pb-14">
                <BlogCard
                  featured
                  title={posts[0].title}
                  slug={posts[0].slug}
                  excerpt={posts[0].excerpt}
                  featuredImageUrl={posts[0].featured_image_url}
                  authorName={posts[0].author_name}
                  publishedAt={posts[0].published_at}
                  categoryName={posts[0].blog_categories?.name}
                />
              </div>
              {posts.length > 1 && (
                <div className="grid gap-x-8 gap-y-14 pt-14 md:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(1).map((post) => (
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
              )}
            </>
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
