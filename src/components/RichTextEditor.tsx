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

  const importHtml = () => {
    const raw = window.prompt("Cole o código HTML completo aqui:");
    if (!raw?.trim()) return;

    // Parse the HTML and extract only the body/article content
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");

    // Remove style, script, head, meta tags
    doc.querySelectorAll("style, script, link, meta, head, noscript").forEach(el => el.remove());

    // Try to find article or main content area
    const article = doc.querySelector("article") || doc.querySelector("main") || doc.querySelector(".mavi-post-body") || doc.body;

    // Remove all class, style, and data attributes from all elements
    article.querySelectorAll("*").forEach(el => {
      // Keep only semantic tags, remove custom class/style/data attrs
      el.removeAttribute("class");
      el.removeAttribute("style");
      el.removeAttribute("id");
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) el.removeAttribute(attr.name);
      });
    });

    // Convert custom elements to semantic HTML
    let cleanHtml = article.innerHTML;

    // Remove empty divs and spans, keep content
    cleanHtml = cleanHtml
      .replace(/<div[^>]*>/gi, "")
      .replace(/<\/div>/gi, "")
      .replace(/<span[^>]*>/gi, "")
      .replace(/<\/span>/gi, "")
      .replace(/<section[^>]*>/gi, "")
      .replace(/<\/section>/gi, "")
      .replace(/<header[^>]*>/gi, "")
      .replace(/<\/header>/gi, "")
      .replace(/<footer[^>]*>/gi, "")
      .replace(/<\/footer>/gi, "")
      .replace(/<nav[^>]*>/gi, "")
      .replace(/<\/nav>/gi, "")
      // Clean up excessive whitespace
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .trim();

    // Wrap orphan text blocks in <p> tags
    const tempDoc = parser.parseFromString(`<div>${cleanHtml}</div>`, "text/html");
    const container = tempDoc.querySelector("div")!;

    // Process text nodes that are direct children
    const nodes = Array.from(container.childNodes);
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        const p = tempDoc.createElement("p");
        p.textContent = node.textContent.trim();
        container.replaceChild(p, node);
      }
    });

    const finalHtml = container.innerHTML.trim();

    if (!finalHtml) {
      toast.error("Não foi possível extrair conteúdo do HTML");
      return;
    }

    editor.commands.setContent(finalHtml);
    onChange(editor.getHTML());
    toast.success("HTML importado com sucesso!");
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
        <ToolbarButton onClick={importHtml} title="Importar HTML">
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
