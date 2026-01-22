import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

// Rotas a pré-renderizar (baseado no sitemap.xml)
const routesToPrerender = [
  "/",
  "/sobre",
  "/servicos",
  "/cases",
  "/hubrs-crm",
  "/contato",
  "/servicos/ecommerce",
  "/servicos/performance",
  "/servicos/redes-sociais",
  "/servicos/marketplaces",
  "/servicos/sites",
  "/servicos/automacao",
  "/servicos/micro-saas",
  "/segmentos",
  "/segmentos/imobiliarias",
  "/segmentos/industria",
  "/segmentos/saude-estetica",
  "/privacidade",
  "/termos",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Pre-render em produção para SEO
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: routesToPrerender,
        renderer: new vitePrerender.PuppeteerRenderer({
          // Aguarda o elemento #root estar populado
          renderAfterElementExists: "#root",
          // Aguarda um tempo adicional para garantir que React Helmet atualizou as meta tags
          renderAfterTime: 500,
          // Executa em modo headless
          headless: true,
          // Limita renderizações simultâneas para evitar sobrecarga
          maxConcurrentRoutes: 4,
        }),
        // Minifica o HTML resultante
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true,
          removeComments: true,
          removeRedundantAttributes: true,
        },
        // Processa o HTML após renderização
        postProcess(renderedRoute) {
          // Garante que a rota original é mantida (sem seguir redirects)
          renderedRoute.route = renderedRoute.originalRoute;
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(".", "./src"),
    },
  },
}));
