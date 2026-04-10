import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [authorName, setAuthorName] = useState("MAVI Marketing Digital");
  const [status, setStatus] = useState("draft");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateWithAI = async (type: "excerpt" | "meta_description" | "title_suggestions") => {
    if (!content && !title) {
      toast({ title: "Adicione conteúdo ou título primeiro", variant: "destructive" });
      return;
    }
    setAiLoading(type);
    try {
      const { data, error } = await supabase.functions.invoke("blog-ai", {
        body: { type, content, title },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const result = data.result;
      switch (type) {
        case "excerpt":
          setExcerpt(result);
          toast({ title: "Resumo gerado com IA!" });
          break;
        case "meta_description":
          setMetaDescription(result);
          toast({ title: "Meta description gerada com IA!" });
          break;
        case "title_suggestions":
          try {
            const parsed = JSON.parse(result);
            setTitleSuggestions(parsed.suggestions || []);
          } catch {
            const lines = result.split("\n").filter((l: string) => l.trim());
            setTitleSuggestions(lines.slice(0, 3));
          }
          setShowSuggestions(true);
          break;
      }
    } catch (e: any) {
      toast({ title: "Erro ao gerar com IA", description: e.message, variant: "destructive" });
    }
    setAiLoading(null);
  };

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchCategories();
    if (isEditing) fetchPost();
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("name");
    if (data) setCategories(data);
  };

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({ title: "Post não encontrado", variant: "destructive" });
      navigate("/admin/blog");
      return;
    }

    setTitle(data.title);
    setSlug(data.slug);
    setExcerpt(data.excerpt || "");
    setContent(data.content || "");
    setMetaDescription(data.meta_description || "");
    setFeaturedImageUrl(data.featured_image_url || "");
    setCategoryId(data.category_id || "");
    setAuthorName(data.author_name);
    setStatus(data.status);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  };

  const uploadFeaturedImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `featured/${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (error) {
        toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      setFeaturedImageUrl(publicUrl);
      toast({ title: "Imagem enviada com sucesso" });
    };
    input.click();
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const catSlug = generateSlug(newCategory);
    const { data, error } = await supabase
      .from("blog_categories")
      .insert({ name: newCategory.trim(), slug: catSlug })
      .select()
      .single();

    if (error) {
      toast({ title: "Erro ao criar categoria", description: error.message, variant: "destructive" });
    } else if (data) {
      setCategories([...categories, data]);
      setCategoryId(data.id);
      setNewCategory("");
      toast({ title: "Categoria criada" });
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast({ title: "Título e slug são obrigatórios", variant: "destructive" });
      return;
    }

    setSaving(true);

    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      meta_description: metaDescription.trim() || null,
      featured_image_url: featuredImageUrl || null,
      category_id: categoryId || null,
      author_name: authorName.trim(),
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("blog_posts").update(postData).eq("id", id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(postData));
    }

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEditing ? "Post atualizado!" : "Post criado!" });
      navigate("/admin/blog");
    }
    setSaving(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container-mavi flex items-center justify-between h-16">
          <Button variant="ghost" onClick={() => navigate("/admin/blog")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <div className="flex items-center gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-1" />
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container-mavi py-8 max-w-4xl">
        <div className="grid gap-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Título</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => generateWithAI("title_suggestions")}
                disabled={aiLoading === "title_suggestions"}
                className="text-xs gap-1"
              >
                {aiLoading === "title_suggestions" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Sugestões IA
              </Button>
            </div>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título do post"
              className="text-lg"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-do-post"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label>Imagem de Capa</Label>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={uploadFeaturedImage}>
                <ImageIcon className="w-4 h-4 mr-1" /> Upload Imagem
              </Button>
              {featuredImageUrl && (
                <img src={featuredImageUrl} alt="Capa" className="h-20 w-auto rounded-lg object-cover" />
              )}
            </div>
            {featuredImageUrl && (
              <Input
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="URL da imagem"
                className="text-sm"
              />
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <div className="flex gap-2">
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nova categoria"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addCategory} disabled={!newCategory.trim()}>
                Criar
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label>Resumo (excerpt)</Label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve descrição do post para listagem"
              rows={3}
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label>Meta Description (SEO)</Label>
            <Textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Descrição para mecanismos de busca (até 160 caracteres)"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">{metaDescription.length}/160 caracteres</p>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label>Autor</Label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Nome do autor"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Conteúdo</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>
      </main>
    </div>
  );
}
