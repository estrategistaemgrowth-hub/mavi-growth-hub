// Entrada de SSR usada só no build (scripts/prerender.mjs): renderiza cada rota em HTML
// estático para buscadores e crawlers de IA, que não executam JavaScript.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";

export function render(url: string, data: Record<string, unknown>) {
  (globalThis as { __PRERENDER_DATA__?: Record<string, unknown> }).__PRERENDER_DATA__ = data;
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppProviders>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n")
    : "";
  return { html, head };
}
