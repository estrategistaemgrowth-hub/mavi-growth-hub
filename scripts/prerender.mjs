// Prerender pós-build: gera um HTML completo por rota (conteúdo, <title>, meta, JSON-LD)
// para Google e crawlers de IA (GPTBot, ClaudeBot, PerplexityBot), que não executam JS.
// Também regenera dist/sitemap.xml com todas as rotas e posts do blog.
// Nunca derruba o deploy: se algo falhar, o site segue como SPA e o erro vai para o log.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const SITE = "https://www.agenciamavi.com.br"; // mesmo domínio dos canônicos em src/components/SEO.tsx
const root = process.cwd();
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "dist-ssr");

// Rotas públicas lidas do próprio App.tsx, para não manter duas listas.
function staticRoutes() {
  const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
  const skip = (p) => p.includes(":") || p === "*" || p.startsWith("/admin") || p === "/diagnostico";
  return [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]).filter((p) => !skip(p));
}

async function fetchBlog(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return { list: [], posts: [] };
  const get = async (q) => {
    const res = await fetch(`${url}/rest/v1/${q}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return res.json();
  };
  // Mesmos selects de src/pages/Blog.tsx e src/pages/BlogPost.tsx.
  const list = await get(
    "blog_posts?select=id,title,slug,excerpt,featured_image_url,author_name,published_at,blog_categories(name,slug)&status=eq.published&order=published_at.desc&limit=9",
  );
  const posts = await get("blog_posts?select=*,blog_categories(name,slug)&status=eq.published&order=published_at.desc");
  return { list, posts };
}

// Remove do template as tags que o Helmet da página já fornece, evitando título/canônico duplicado.
function stripDefaultHead(tpl) {
  return tpl
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace(/\s*<link rel="canonical"[^>]*>/, "")
    .replace(/\s*<meta property="og:[^>]*>/g, "")
    .replace(/\s*<meta name="twitter:[^>]*>/g, "");
}

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function writeRoute(route, html) {
  if (route === "/") return fs.writeFileSync(path.join(dist, "index.html"), html);
  // "/rota.html" e "/rota/index.html": cobre hosts que servem URL sem extensão ou com diretório.
  const file = path.join(dist, route.slice(1));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(`${file}.html`, html);
  fs.mkdirSync(file, { recursive: true });
  fs.writeFileSync(path.join(file, "index.html"), html);
}

async function main() {
  const env = loadEnv("production", root, "");
  await build({
    configFile: false,
    logLevel: "warn",
    plugins: [react()],
    resolve: { alias: { "@": path.join(root, "src") } },
    ssr: { noExternal: true },
    build: { ssr: "src/entry-server.tsx", outDir: ssrOut, emptyOutDir: true },
  });
  // src/integrations/supabase/client.ts (gerado pelo Lovable) lê localStorage e exige WebSocket
  // (nativo só no Node 22+) ao ser importado; nada disso é usado durante o render.
  globalThis.WebSocket ??= class {};
  const mem = new Map();
  globalThis.localStorage ??= {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
  };
  const { render } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);

  let blog = { list: [], posts: [] };
  try {
    blog = await fetchBlog(env);
  } catch (e) {
    console.warn(`[prerender] blog não carregado (${e.message}); /blog sai sem posts`);
  }

  const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const today = new Date().toISOString().slice(0, 10);
  const pages = [
    ...staticRoutes().map((route) => ({ route, lastmod: today, data: route === "/blog" ? { "blog:posts": blog.list } : {} })),
    ...blog.posts.map((p) => ({
      route: `/blog/${p.slug}`,
      lastmod: (p.updated_at || p.published_at || today).slice(0, 10),
      data: { [`post:${p.slug}`]: p },
    })),
  ];

  const done = [];
  for (const { route, lastmod, data } of pages) {
    try {
      const { html, head } = render(route, data);
      const json = JSON.stringify(data).replace(/</g, "\\u003c");
      const page = (head ? stripDefaultHead(template) : template)
        .replace("</head>", `${head}\n</head>`)
        .replace(
          '<div id="root"></div>',
          `<script>window.__PRERENDER_DATA__=${json}</script><div id="root">${html}</div>`,
        );
      writeRoute(route, page);
      done.push({ route, lastmod });
    } catch (e) {
      console.warn(`[prerender] ${route} falhou, segue como SPA: ${e.message}`);
    }
  }

  const urls = done
    .map(({ route, lastmod }) => `  <url>\n    <loc>${escapeXml(SITE + (route === "/" ? "/" : route))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join("\n");
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  fs.rmSync(ssrOut, { recursive: true, force: true });
  console.log(`[prerender] ${done.length}/${pages.length} rotas geradas; sitemap com ${done.length} URLs`);
}

main().catch((e) => {
  console.warn(`[prerender] ignorado, site segue como SPA: ${e.stack || e.message}`);
});
