

## Plano: Blog com Painel Admin (Lovable Cloud + Supabase)

### Resumo
Criar um blog completo com painel administrativo integrado ao site, usando Lovable Cloud (Supabase) como backend. O blog sera otimizado para SEO, GEO e buscas por IA.

---

### Arquitetura

```text
┌─────────────────────────────────────┐
│  Supabase (Lovable Cloud)           │
│  ┌───────────┐  ┌────────────────┐  │
│  │ blog_posts │  │ blog_categories│  │
│  │ + auth     │  │               │  │
│  └───────────┘  └────────────────┘  │
└─────────────────────────────────────┘
         │
   ┌─────┴──────────────────┐
   │                        │
┌──▼──────┐         ┌──────▼──────┐
│  /blog  │         │ /admin/blog │
│ Publico │         │ Protegido   │
│ SEO+GEO │         │ Login+CRUD  │
└─────────┘         └─────────────┘
```

---

### 1. Ativar Lovable Cloud e criar banco de dados

**Tabelas:**

- **blog_posts**: id, title, slug, excerpt, content (rich text/markdown), meta_description, featured_image_url, category_id, author_name, status (draft/published), published_at, created_at, updated_at
- **blog_categories**: id, name, slug
- **user_roles**: Para proteger o painel admin (seguindo padrao de seguranca)

**RLS**: Posts publicados sao publicos para leitura. CRUD requer role admin.

### 2. Autenticacao e painel admin

- Login por email/senha em `/admin/login`
- Painel em `/admin/blog` protegido por autenticacao + role admin
- CRUD completo: criar, editar, excluir e publicar posts
- Editor de texto rico (TipTap ou similar) para conteudo
- Upload de imagem de capa via Supabase Storage
- Gerenciamento de categorias

### 3. Paginas publicas do blog

- `/blog` - Listagem de posts com paginacao, filtro por categoria
- `/blog/:slug` - Post individual com layout otimizado para leitura
- Design consistente com o restante do site (Layout, Header, Footer)

### 4. Otimizacao SEO + GEO + IA

- **SEO**: Meta tags dinamicas (title, description, OG, Twitter) por post usando o componente SEO existente
- **Schema JSON-LD**: `Article` e `BlogPosting` schema por post, `Blog` schema na listagem
- **Breadcrumbs**: Schema de breadcrumb em cada pagina do blog
- **GEO**: Manter tags geograficas e LocalBusiness schema ja existentes
- **IA/GEO**: FAQ schema quando aplicavel, conteudo estruturado com headings semanticos (H1, H2, H3)
- **Sitemap**: Instrucoes para atualizar manualmente ou gerar dinamicamente

### 5. Integracao com navegacao

- Adicionar "Blog" ao Header (navItems)
- Adicionar link do blog no Footer
- Atualizar sitemap.xml com `/blog`

---

### Arquivos a criar/editar

| Arquivo | Acao |
|---------|------|
| Supabase tables + RLS | Criar via migrations |
| `src/pages/Blog.tsx` | Listagem publica |
| `src/pages/BlogPost.tsx` | Post individual |
| `src/pages/admin/AdminLogin.tsx` | Login admin |
| `src/pages/admin/AdminBlog.tsx` | Painel CRUD |
| `src/pages/admin/AdminBlogEditor.tsx` | Editor de post |
| `src/components/BlogCard.tsx` | Card de preview |
| `src/components/SEO.tsx` | Adicionar `generateArticleSchema` |
| `src/components/Header.tsx` | Adicionar "Blog" na nav |
| `src/components/Footer.tsx` | Adicionar link blog |
| `src/App.tsx` | Novas rotas |
| `public/sitemap.xml` | Adicionar /blog |

