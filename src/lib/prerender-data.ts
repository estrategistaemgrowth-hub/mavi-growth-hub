// Dados buscados no build por scripts/prerender.mjs e embutidos no HTML (window.__PRERENDER_DATA__).
// Permite que páginas que carregam do Supabase saiam com conteúdo no HTML estático.
export function getPrerenderData<T>(key: string): T | undefined {
  const store = (globalThis as { __PRERENDER_DATA__?: Record<string, unknown> }).__PRERENDER_DATA__;
  return store?.[key] as T | undefined;
}
