import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PIXEL_ID = "504107338642725";

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get("META_ACCESS_TOKEN");
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "META_ACCESS_TOKEN not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      event_name,
      event_id,
      event_source_url,
      email,
      phone,
      fbp,
      fbc,
      value,
      currency,
    } = await req.json();

    if (!event_name || !event_id) {
      return new Response(JSON.stringify({ error: "event_name and event_id are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userData: Record<string, unknown> = {
      client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      client_user_agent: req.headers.get("user-agent"),
    };
    if (email) userData.em = [await sha256(email)];
    if (phone) userData.ph = [await sha256(phone.replace(/\D/g, ""))];
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: "website",
          event_source_url,
          user_data: userData,
          custom_data: value ? { value, currency: currency || "BRL" } : undefined,
        },
      ],
      ...(Deno.env.get("META_TEST_EVENT_CODE")
        ? { test_event_code: Deno.env.get("META_TEST_EVENT_CODE") }
        : {}),
    };

    const metaRes = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const metaJson = await metaRes.json();

    return new Response(JSON.stringify(metaJson), {
      status: metaRes.ok ? 200 : 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("meta-capi error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
