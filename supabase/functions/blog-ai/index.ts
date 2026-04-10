import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content, title, selectedText } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "excerpt":
        systemPrompt =
          "Você é um especialista em marketing digital e SEO. Gere um resumo atraente e conciso para um post de blog. O resumo deve ter entre 120-200 caracteres, ser envolvente e convidar à leitura. Responda APENAS com o texto do resumo, sem aspas ou explicações.";
        userPrompt = `Gere um resumo para o seguinte post de blog:\n\nTítulo: ${title}\n\nConteúdo: ${content}`;
        break;

      case "meta_description":
        systemPrompt =
          "Você é um especialista em SEO. Gere uma meta description otimizada para mecanismos de busca. Deve ter no máximo 155 caracteres, incluir palavras-chave relevantes e ter um call-to-action implícito. Responda APENAS com o texto da meta description, sem aspas ou explicações.";
        userPrompt = `Gere uma meta description SEO para o seguinte post:\n\nTítulo: ${title}\n\nConteúdo: ${content}`;
        break;

      case "title_suggestions":
        systemPrompt =
          "Você é um especialista em copywriting e SEO. Sugira 3 títulos alternativos otimizados para SEO e que gerem curiosidade. Responda em formato JSON: {\"suggestions\": [\"título 1\", \"título 2\", \"título 3\"]}";
        userPrompt = `Sugira títulos alternativos para o seguinte post:\n\nTítulo atual: ${title}\n\nConteúdo: ${content}`;
        break;

      case "improve_heading":
        systemPrompt =
          "Você é um especialista em copywriting e SEO para blogs. Melhore o título/subtítulo fornecido para que seja mais atraente, impactante e otimizado para SEO. Mantenha o sentido original. Responda APENAS com o texto melhorado, sem aspas, explicações ou formatação extra.";
        userPrompt = `Melhore este título/subtítulo:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      case "improve_hook":
        systemPrompt =
          "Você é um especialista em copywriting persuasivo. Reescreva o trecho selecionado como um gancho (hook) poderoso que prenda a atenção do leitor. Use técnicas como perguntas retóricas, dados impactantes, ou storytelling. Responda APENAS com o texto melhorado em HTML simples (pode usar <strong>, <em>), sem aspas ou explicações.";
        userPrompt = `Transforme este trecho em um gancho poderoso:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      case "improve_citation":
        systemPrompt =
          "Você é um especialista em redação profissional. Transforme o trecho selecionado em uma citação de destaque (blockquote) com impacto. Reformule de forma elegante e memorável, como se fosse uma frase de efeito ou insight importante. Responda APENAS com o texto da citação, sem aspas ou explicações.";
        userPrompt = `Transforme este trecho em uma citação de destaque:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid type" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const truncatedContent = content?.substring(0, 3000) || "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt.replace(content || "", truncatedContent) },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em instantes." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro ao gerar conteúdo com IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("blog-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
