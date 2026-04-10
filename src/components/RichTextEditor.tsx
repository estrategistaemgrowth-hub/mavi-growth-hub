import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
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
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  postTitle?: string;
}

export function RichTextEditor({ content, onChange, postTitle }: RichTextEditorProps) {
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

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

  const getSelectedText = (): string => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ");
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
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} title="Título H1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} title="Subtítulo H2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} title="Subtítulo H3">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
