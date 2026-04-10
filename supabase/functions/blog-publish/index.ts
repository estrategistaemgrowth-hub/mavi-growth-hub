import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-publish-token",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate via custom token
    const token = req.headers.get("x-publish-token");
    const expectedToken = Deno.env.get("BLOG_PUBLISH_TOKEN");

    if (!expectedToken) {
      return new Response(JSON.stringify({ error: "BLOG_PUBLISH_TOKEN not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!token || token !== expectedToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (req.method === "GET") {
      // List posts
      const url = new URL(req.url);
      const limit = parseInt(url.searchParams.get("limit") || "20");
      const status = url.searchParams.get("status") || "published";

      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, status, published_at, created_at, author_name, category_id")
        .eq("status", status)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      return new Response(JSON.stringify({ posts: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST") {
      const contentType = req.headers.get("content-type") || "";

      // Image upload route
      if (contentType.startsWith("image/") || contentType === "application/octet-stream") {
        const fileName = req.headers.get("x-file-name") || `${Date.now()}.jpg`;
        const filePath = `featured/${Date.now()}-${fileName}`;
        const fileBuffer = await req.arrayBuffer();

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, fileBuffer, {
            contentType: contentType.startsWith("image/") ? contentType : "image/jpeg",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        return new Response(JSON.stringify({ success: true, url: publicUrl }), {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create post route (JSON)
      const body = await req.json();

      if (!body.title || !body.slug || !body.content) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: title, slug, content" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const postData = {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || null,
        meta_description: body.meta_description || null,
        featured_image_url: body.featured_image_url || null,
        category_id: body.category_id || null,
        author_name: body.author_name || "MAVI Marketing Digital",
        status: body.status || "published",
        published_at: body.status === "draft" ? null : new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("blog_posts")
        .insert(postData)
        .select("id, slug, status")
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, post: data }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "PUT") {
      const body = await req.json();

      if (!body.id) {
        return new Response(
          JSON.stringify({ error: "Missing required field: id" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { id, ...updateFields } = body;

      const { data, error } = await supabase
        .from("blog_posts")
        .update(updateFields)
        .eq("id", id)
        .select("id, slug, status")
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, post: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("blog-publish error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
