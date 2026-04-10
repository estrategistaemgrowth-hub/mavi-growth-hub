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
          "Você é um especialista em copywriting e SEO para blogs. Melhore o título/subtítulo fornecido para que seja mais atraente, impactante e otimizado para SEO. Mantenha o sentido original. Responda APENAS com o texto melhorado, sem aspas, explicações, tags HTML ou formatação extra.";
        userPrompt = `Melhore este título/subtítulo:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      case "improve_hook":
        systemPrompt = `Você é um especialista em copywriting persuasivo e web design. Reescreva o trecho selecionado como um gancho (hook) poderoso que prenda a atenção do leitor. 

REGRAS DE FORMATAÇÃO HTML:
- Use tags HTML semânticas: <p>, <strong>, <em>, <h2>, <h3>, <ul>, <li>, <blockquote>
- Para destaque visual, use <strong> para palavras-chave e <em> para ênfase sutil
- Se o gancho tiver dados/números, destaque-os com <strong>
- Quebre em parágrafos curtos (máx 2-3 frases por <p>)
- Pode usar listas <ul><li> se fizer sentido
- NÃO use classes CSS, estilos inline ou divs
- NÃO use markdown, apenas HTML puro
- Responda APENAS com o HTML, sem explicações`;
        userPrompt = `Transforme este trecho em um gancho poderoso em HTML:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      case "improve_citation":
        systemPrompt =
          "Você é um especialista em redação profissional. Transforme o trecho selecionado em uma citação de destaque (blockquote) com impacto. Reformule de forma elegante e memorável, como se fosse uma frase de efeito ou insight importante. Responda APENAS com o texto da citação sem tags HTML, sem aspas ou explicações. O texto será inserido automaticamente dentro de um blockquote.";
        userPrompt = `Transforme este trecho em uma citação de destaque:\n\n"${selectedText}"\n\nContexto do artigo: ${title}`;
        break;

      case "generate_content":
        systemPrompt = `Você é um redator profissional de blogs sobre marketing digital, e-commerce e tecnologia. Gere o conteúdo completo de um artigo de blog em HTML semântico bem formatado.

REGRAS DE FORMATAÇÃO HTML OBRIGATÓRIAS:
- Estruture com <h2> para seções principais e <h3> para sub-seções
- Use <p> para parágrafos (máx 3 frases cada)
- Use <strong> para palavras-chave e termos importantes
- Use <em> para ênfase sutil e termos técnicos
- Use <ul> e <li> para listas de benefícios, passos ou exemplos
- Use <ol> e <li> para listas numeradas/sequenciais
- Use <blockquote><p>...</p></blockquote> para citações de destaque ou insights importantes (1-2 por artigo)
- Inclua dados e estatísticas quando possível (com <strong>)
- Mínimo de 800 palavras, ideal 1200+
- Tom profissional mas acessível, em português brasileiro
- NÃO use classes CSS, estilos inline, divs ou spans
- NÃO inclua tag <h1> (o título já é definido separadamente)
- NÃO use markdown, apenas HTML puro
- Comece direto com o conteúdo (sem repetir o título)
- Responda APENAS com o HTML do conteúdo, sem explicações`;
        userPrompt = `Escreva um artigo completo de blog sobre:\n\nTema/Título: ${title}\n\nInstruções adicionais: ${selectedText || "Nenhuma instrução adicional"}`;
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
