import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  ImageIcon,
  LinkIcon,
  Undo,
  Redo,
  Code,
  Sparkles,
  Loader2,
  Type,
  Zap,
  MessageSquareQuote,
  FileText,
  FileCode,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  postTitle?: string;
}

export function RichTextEditor({ content, onChange, postTitle }: RichTextEditorProps) {
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importHtmlValue, setImportHtmlValue] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const hasSetInitialContent = useRef(false);

  useEffect(() => {
    if (editor && content && !hasSetInitialContent.current) {
      // Only set content if editor was created with empty/different content
      const currentContent = editor.getHTML();
      if (currentContent === "<p></p>" || currentContent === "") {
        editor.commands.setContent(content);
        hasSetInitialContent.current = true;
      }
    }
  }, [editor, content]);

  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (error) {
        toast.error("Erro ao fazer upload", { description: error.message });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      editor.chain().focus().setImage({ src: publicUrl }).run();
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt("URL do link:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const parseAndCleanHtml = (raw: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");

    // Remove non-content elements
    doc.querySelectorAll("style, script, link, meta, head, noscript, nav, footer").forEach(el => el.remove());

    // Find the best content container
    const article = doc.querySelector("article") || doc.querySelector(".mavi-post-body") || doc.querySelector("main") || doc.body;

    // Convert custom MAVI components to semantic HTML before stripping classes
    // .mavi-callout → blockquote
    article.querySelectorAll(".mavi-callout").forEach(el => {
      const bq = doc.createElement("blockquote");
      bq.innerHTML = `<p>${el.textContent?.trim() || ""}</p>`;
      el.replaceWith(bq);
    });

    // .mavi-layer-list → ol with clean text
    article.querySelectorAll(".mavi-layer-list").forEach(el => {
      const ol = doc.createElement("ol");
      el.querySelectorAll("li").forEach(li => {
        const newLi = doc.createElement("li");
        // Get text from .mavi-layer-text or the whole li
        const textEl = li.querySelector(".mavi-layer-text");
        if (textEl) {
          newLi.innerHTML = textEl.innerHTML;
        } else {
          // Remove number spans, keep text
          const numEl = li.querySelector(".mavi-layer-num");
          if (numEl) numEl.remove();
          newLi.innerHTML = li.innerHTML;
        }
        ol.appendChild(newLi);
      });
      el.replaceWith(ol);
    });

    // .mavi-stat-block → paragraph with stats
    article.querySelectorAll(".mavi-stat-block").forEach(el => {
      const stats: string[] = [];
      el.querySelectorAll(".mavi-stat").forEach(stat => {
        const label = stat.querySelector(".mavi-stat-label")?.textContent?.trim() || "";
        const value = stat.querySelector(".mavi-stat-value")?.textContent?.trim() || "";
        const desc = stat.querySelector(".mavi-stat-desc")?.textContent?.trim() || "";
        stats.push(`<strong>${value}</strong> ${label}${desc ? ` — ${desc}` : ""}`);
      });
      const p = doc.createElement("p");
      p.innerHTML = stats.join(" | ");
      el.replaceWith(p);
    });

    // .mavi-cta-box → blockquote with link
    article.querySelectorAll(".mavi-cta-box").forEach(el => {
      const h = el.querySelector("h3")?.textContent?.trim() || "";
      const p = el.querySelector("p")?.textContent?.trim() || "";
      const link = el.querySelector("a");
      const href = link?.getAttribute("href") || "#";
      const linkText = link?.textContent?.trim() || "";
      const bq = doc.createElement("blockquote");
      bq.innerHTML = `<p><strong>${h}</strong></p><p>${p}</p>${linkText ? `<p><a href="${href}">${linkText}</a></p>` : ""}`;
      el.replaceWith(bq);
    });

    // .mavi-post-sources → h4 + ul
    article.querySelectorAll(".mavi-post-sources").forEach(el => {
      const title = el.querySelector("h4")?.textContent?.trim() || "Fontes";
      const items: string[] = [];
      el.querySelectorAll("li").forEach(li => {
        items.push(`<li>${li.textContent?.trim() || ""}</li>`);
      });
      const wrapper = doc.createElement("div");
      wrapper.innerHTML = `<h3>${title}</h3><ul>${items.join("")}</ul>`;
      el.replaceWith(wrapper);
    });

    // .mavi-post-header content → extract intro paragraph
    article.querySelectorAll(".mavi-post-header").forEach(el => {
      const intro = el.querySelector(".mavi-post-intro");
      if (intro) {
        const p = doc.createElement("p");
        p.innerHTML = `<em>${intro.textContent?.trim() || ""}</em>`;
        el.replaceWith(p);
      } else {
        el.remove();
      }
    });

    // .mavi-post-tag → remove (already in post metadata)
    article.querySelectorAll(".mavi-post-tag").forEach(el => el.remove());

    // .mavi-post-cover → img (keep)
    article.querySelectorAll(".mavi-post-cover").forEach(el => {
      el.removeAttribute("class");
      el.removeAttribute("width");
      el.removeAttribute("height");
    });

    // Now strip ALL remaining classes, styles, ids, data attrs
    article.querySelectorAll("*").forEach(el => {
      el.removeAttribute("class");
      el.removeAttribute("style");
      el.removeAttribute("id");
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) el.removeAttribute(attr.name);
      });
    });

    let cleanHtml = article.innerHTML;

    // Remove wrapper tags, keep content
    cleanHtml = cleanHtml
      .replace(/<div[^>]*>/gi, "")
      .replace(/<\/div>/gi, "")
      .replace(/<span[^>]*>/gi, "")
      .replace(/<\/span>/gi, "")
      .replace(/<section[^>]*>/gi, "")
      .replace(/<\/section>/gi, "")
      .replace(/<header[^>]*>/gi, "")
      .replace(/<\/header>/gi, "")
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Clean excessive whitespace
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim();

    return cleanHtml;
  };

  const handleImportHtml = () => {
    if (!importHtmlValue.trim()) {
      toast.error("Cole o código HTML primeiro");
      return;
    }

    const cleanHtml = parseAndCleanHtml(importHtmlValue);

    if (!cleanHtml) {
      toast.error("Não foi possível extrair conteúdo do HTML");
      return;
    }

    editor.commands.setContent(cleanHtml);
    onChange(editor.getHTML());
    setShowImportDialog(false);
    setImportHtmlValue("");
    toast.success("HTML importado com sucesso!");
  };

  const handleImportFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,.htm";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      setImportHtmlValue(text);
    };
    input.click();
  };

  const getSelectedText = (): string => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ");
  };

  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const applyHeading = (level: 1 | 2 | 3) => {
    const { from, to, empty } = editor.state.selection;

    if (empty) {
      editor.chain().focus().toggleHeading({ level }).run();
      return;
    }

    const selectedText = getSelectedText().trim();
    if (!selectedText) return;

    editor
      .chain()
      .focus()
      .insertContentAt({ from, to }, `<h${level}>${escapeHtml(selectedText)}</h${level}>`)
      .run();
  };

  const aiImprove = async (type: "improve_heading" | "improve_hook" | "improve_citation" | "generate_content") => {
    const selectedText = getSelectedText();
    if (type !== "generate_content" && !selectedText.trim()) {
      toast.error("Selecione um trecho de texto primeiro");
      return;
    }

    setAiLoading(type);
    try {
      const { data, error } = await supabase.functions.invoke("blog-ai", {
        body: {
          type,
          selectedText,
          title: postTitle || "",
          content: editor.getHTML(),
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const result = data.result?.trim();
      if (!result) throw new Error("Nenhum resultado gerado");

      if (type === "generate_content") {
        // Insert at cursor or append
        editor.chain().focus().insertContent(result).run();
      } else {
        const { from, to } = editor.state.selection;
        if (type === "improve_citation") {
          editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .insertContent(`<blockquote><p>${result}</p></blockquote>`)
            .run();
        } else {
          editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .insertContent(result)
            .run();
        }
      }

      const labels: Record<string, string> = {
        improve_heading: "Título melhorado com IA!",
        improve_hook: "Gancho criado com IA!",
        improve_citation: "Citação gerada com IA!",
        generate_content: "Conteúdo gerado com IA!",
      };
      toast.success(labels[type]);
    } catch (e: any) {
      toast.error("Erro ao gerar com IA", { description: e.message });
    }
    setAiLoading(null);
  };

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="icon"
      className="h-8 w-8"
      onClick={onClick}
      title={title}
    >
      {children}
    </Button>
  );

  const isAiWorking = !!aiLoading;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/50 sticky top-0 z-10">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} title="Negrito">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} title="Itálico">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => applyHeading(1)} isActive={editor.isActive("heading", { level: 1 })} title="Título H1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => applyHeading(2)} isActive={editor.isActive("heading", { level: 2 })} title="Subtítulo H2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => applyHeading(3)} isActive={editor.isActive("heading", { level: 3 })} title="Subtítulo H3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} title="Lista">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} title="Lista numerada">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} title="Citação">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} title="Código">
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Inserir imagem">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addLink} isActive={editor.isActive("link")} title="Inserir link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refazer">
          <Redo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => setShowImportDialog(true)} title="Importar HTML">
          <FileCode className="h-4 w-4" />
        </ToolbarButton>

        {/* AI Dropdown */}
        <div className="ml-auto border-l border-border pl-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1 text-xs"
                disabled={isAiWorking}
              >
                {isAiWorking ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                IA
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => aiImprove("improve_heading")}
                disabled={isAiWorking}
                className="gap-2"
              >
                <Type className="h-4 w-4" />
                Melhorar título/subtítulo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => aiImprove("improve_hook")}
                disabled={isAiWorking}
                className="gap-2"
              >
                <Zap className="h-4 w-4" />
                Criar gancho (hook)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => aiImprove("improve_citation")}
                disabled={isAiWorking}
                className="gap-2"
              >
                <MessageSquareQuote className="h-4 w-4" />
                Gerar citação de destaque
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => aiImprove("generate_content")}
                disabled={isAiWorking}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Gerar conteúdo completo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror]:outline-none [&_.ProseMirror_h1]:text-4xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:leading-tight [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:leading-snug [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-2xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:leading-snug [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-3 [&_.ProseMirror_p]:text-base [&_.ProseMirror_p]:leading-7 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6"
      />
    </div>
  );
}
