

## Plano: Corrigir Build e Instalar Google Ads Conversion Tags

### 1. Corrigir erro de build no vite.config.ts

O plugin `vite-plugin-prerender` usa `require()` internamente, o que é incompativel com ESM. A solucao e remover o plugin e sua importacao, mantendo a configuracao simples e funcional.

**Arquivo:** `vite.config.ts`
- Remover a importacao de `vite-plugin-prerender`
- Remover a constante `routesToPrerender`
- Remover o bloco do plugin de pre-render
- Manter apenas `react()` e `componentTagger()`

---

### 2. Adicionar Google Ads gtag.js no index.html

**Arquivo:** `index.html`

Adicionar o script global do Google Ads na secao `<head>`, logo apos o bloco do Google Tag Manager:

```html
<!-- Google Ads Conversion Tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-743684226"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-743684226');
</script>
```

---

### 3. Adicionar snippet de conversao de formulario

**Arquivo:** `index.html`

Adicionar a funcao `gtag_report_conversion` no body, disponivel globalmente:

```html
<script>
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-743684226/GlzACMu-rJcbEILxzuIC',
    'value': 1.0,
    'currency': 'BRL',
    'event_callback': callback
  });
  return false;
}
</script>
```

---

### 4. Disparar conversao no envio do formulario de contato

**Arquivo:** `src/pages/Contato.tsx`

No `handleSubmit`, apos o envio bem-sucedido via Web3Forms, chamar `gtag_report_conversion()` para registrar a conversao no Google Ads:

```typescript
if (result.success) {
  // Disparar conversao Google Ads
  if (typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion();
  }
  toast({ ... });
}
```

Tambem sera necessario adicionar a declaracao de tipo para evitar erro TypeScript:

```typescript
// No topo do arquivo ou em vite-env.d.ts
declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => boolean;
  }
}
```

---

### 5. Remover dependencia do vite-plugin-prerender

**Arquivo:** `package.json`

Remover `vite-plugin-prerender` das dependencias para evitar que o modulo bugado seja carregado.

---

### Resumo dos arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `vite.config.ts` | Remover plugin de pre-render |
| `package.json` | Remover dependencia `vite-plugin-prerender` |
| `index.html` | Adicionar gtag.js + funcao de conversao |
| `src/pages/Contato.tsx` | Disparar `gtag_report_conversion()` no sucesso |
| `src/vite-env.d.ts` | Declarar tipo global `gtag_report_conversion` |

---

### Nota sobre as informacoes extras enviadas

As informacoes sobre "sala das princesas", "piscina de bolinhas", "campo de futebol", etc. parecem ser de outro projeto/cliente. Se precisar que eu use essas informacoes em algum lugar do site, me avise.

