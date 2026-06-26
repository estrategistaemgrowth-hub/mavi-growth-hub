import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";

// ─── SEO / GEO / AIO Schemas ──────────────────────────────────────────────────
const ASSESSMENT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.agenciamavi.com.br/assessment",
      "url": "https://www.agenciamavi.com.br/assessment",
      "name": "Diagnóstico Gratuito de E-commerce — Assessment MAVI",
      "description":
        "Descubra gratuitamente as falhas do seu e-commerce. Avaliação em 7 dimensões: produtos, redes sociais, marketplaces (Shopee, Mercado Livre, TikTok Shop), SEO, tráfego pago, investimentos e design. Score por área + pontos de melhoria em 5 minutos.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://www.agenciamavi.com.br" },
          { "@type": "ListItem", "position": 2, "name": "Diagnóstico de E-commerce", "item": "https://www.agenciamavi.com.br/assessment" },
        ],
      },
      "publisher": {
        "@type": "Organization",
        "name": "MAVI Marketing Digital",
        "url": "https://www.agenciamavi.com.br",
        "logo": { "@type": "ImageObject", "url": "https://www.agenciamavi.com.br/og-image.png" },
      },
      "inLanguage": "pt-BR",
      "dateModified": "2025-06-26",
    },
    {
      "@type": "Service",
      "@id": "https://www.agenciamavi.com.br/assessment#service",
      "name": "Diagnóstico Gratuito de E-commerce",
      "alternateName": [
        "Assessment de E-commerce",
        "Auditoria de Loja Virtual",
        "Avaliação de Loja Online Gratuita",
        "Diagnóstico de Desempenho de E-commerce",
      ],
      "description":
        "Ferramenta gratuita de diagnóstico que avalia 7 dimensões críticas de qualquer e-commerce: catálogo de produtos, redes sociais, presença em marketplaces como Shopee e Mercado Livre, SEO orgânico, tráfego pago, investimento em mídia e design da loja. O assessment identifica falhas no desempenho, pontos de melhoria e oportunidades de crescimento — com score por dimensão e recomendações práticas.",
      "provider": {
        "@type": "MarketingAgency",
        "name": "MAVI Marketing Digital",
        "url": "https://www.agenciamavi.com.br",
        "telephone": "+55-47-3307-2030",
        "email": "agenciamavi@agenciamavi.com.br",
        "areaServed": { "@type": "Country", "name": "Brasil" },
      },
      "serviceType": "Auditoria Digital",
      "category": "Marketing Digital para E-commerce",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL",
        "name": "Assessment de e-commerce gratuito",
        "description": "Diagnóstico completo e gratuito do seu e-commerce em 7 dimensões",
        "availability": "https://schema.org/InStock",
      },
      "url": "https://www.agenciamavi.com.br/assessment",
      "areaServed": { "@type": "Country", "name": "Brasil" },
    },
    {
      "@type": "HowTo",
      "name": "Como fazer o diagnóstico do seu e-commerce em 5 minutos",
      "description":
        "Passo a passo para identificar falhas e oportunidades no seu e-commerce usando o assessment gratuito da MAVI Marketing Digital.",
      "totalTime": "PT5M",
      "image": "https://www.agenciamavi.com.br/og-image.png",
      "tool": [{ "@type": "HowToTool", "name": "Assessment de E-commerce MAVI (gratuito)" }],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Informe a URL do seu e-commerce",
          "text": "Digite o endereço da sua loja virtual. O sistema usa a URL para personalizar o diagnóstico com base no seu segmento.",
          "url": "https://www.agenciamavi.com.br/assessment",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Responda 21 perguntas sobre sua loja",
          "text": "Responda perguntas simples sobre 7 dimensões do seu e-commerce: produtos, redes sociais, marketplaces, SEO, tráfego pago, investimentos em mídia e design da loja. Não é necessário ter conhecimento técnico.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Desbloqueie o diagnóstico completo",
          "text": "Insira seu nome, e-mail e WhatsApp para receber o relatório completo com score por dimensão, mapa de maturidade e os principais pontos de melhoria do seu e-commerce.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O que é um diagnóstico de e-commerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Um diagnóstico de e-commerce é uma avaliação estruturada que analisa as principais dimensões de uma loja virtual — como catálogo de produtos, redes sociais, presença em marketplaces, SEO, tráfego pago, gestão de mídia e design — para identificar falhas, gargalos e oportunidades de crescimento. O resultado é um relatório com pontuação por área e recomendações práticas de melhoria.",
          },
        },
        {
          "@type": "Question",
          "name": "Para que serve um assessment de e-commerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O assessment de e-commerce serve para identificar onde sua loja está perdendo vendas e dinheiro. Ele revela falhas no desempenho de áreas como fotos de produto, presença em marketplaces como Shopee e Mercado Livre, investimento em anúncios, aparência da loja no celular e estratégia de redes sociais. Com o diagnóstico, o dono da loja sabe exatamente onde focar para crescer.",
          },
        },
        {
          "@type": "Question",
          "name": "Como saber se meu e-commerce está indo bem?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para saber se seu e-commerce está bem, avalie: (1) suas fotos e descrições de produto convertem visitantes em compradores; (2) sua loja aparece no Google para buscas relevantes; (3) você está presente e otimizado em marketplaces como Shopee e Mercado Livre; (4) seus anúncios pagos têm retorno mensurável; (5) a loja funciona bem no celular; (6) suas redes sociais têm publicação regular e estratégica. O assessment gratuito da MAVI avalia todas essas dimensões automaticamente.",
          },
        },
        {
          "@type": "Question",
          "name": "Quais são os principais erros de e-commerce que prejudicam as vendas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os principais erros de e-commerce que prejudicam as vendas são: fotos de produto de baixa qualidade; descrições copiadas do fornecedor sem estratégia; ausência nos principais marketplaces (Shopee, Mercado Livre, TikTok Shop); loja que não aparece no Google (sem SEO); anúncios pagos sem controle de retorno; loja lenta ou difícil de usar no celular; e ausência de avaliações e elementos que geram confiança.",
          },
        },
        {
          "@type": "Question",
          "name": "Como aumentar as vendas de uma loja virtual?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para aumentar as vendas de uma loja virtual: invista em fotos profissionais e descrições estratégicas de produto; otimize sua presença em marketplaces como Shopee e Mercado Livre; trabalhe o SEO para aparecer no Google gratuitamente; estruture campanhas de anúncios pagos com acompanhamento de retorno; melhore a experiência da loja no celular; e mantenha presença ativa nas redes sociais com conteúdo planejado. O diagnóstico gratuito da MAVI identifica qual dessas áreas é prioridade para o seu caso específico.",
          },
        },
        {
          "@type": "Question",
          "name": "O diagnóstico de e-commerce da MAVI é gratuito?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O assessment de e-commerce da MAVI Marketing Digital é 100% gratuito. Você responde 21 perguntas simples sobre 7 dimensões da sua loja e recebe um relatório completo com score por área, mapa de maturidade e os principais pontos de melhoria — sem custo e sem compromisso.",
          },
        },
        {
          "@type": "Question",
          "name": "Quanto tempo leva o diagnóstico de e-commerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O diagnóstico de e-commerce da MAVI leva em média 5 minutos. São 21 perguntas organizadas em 7 dimensões, com opções de resposta simples que não exigem conhecimento técnico. O resultado aparece imediatamente após o preenchimento dos dados.",
          },
        },
        {
          "@type": "Question",
          "name": "O que é avaliado no assessment de e-commerce da MAVI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O assessment de e-commerce da MAVI avalia 7 dimensões: (1) Catálogo de Produtos — qualidade de fotos, descrições e gestão do mix; (2) Redes Sociais — frequência, tipo de conteúdo e análise de métricas; (3) Marketplaces — presença e otimização no Shopee, Mercado Livre e TikTok Shop; (4) SEO Orgânico — visibilidade no Google e produção de conteúdo; (5) Tráfego Pago — investimento em anúncios e mensuração de retorno; (6) Investimento em Mídia — controle de verba e diversificação de canais; (7) Design e Layout — aparência profissional, performance no mobile e elementos de conversão.",
          },
        },
        {
          "@type": "Question",
          "name": "Serve para qualquer tipo de e-commerce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O diagnóstico de e-commerce da MAVI funciona para qualquer loja virtual, independentemente do segmento ou tamanho — desde quem está começando até lojas com alto volume de vendas. As perguntas são simples e não exigem conhecimento técnico, e o relatório é personalizado de acordo com o nível atual do negócio.",
          },
        },
      ],
    },
  ],
};
import { toast } from "sonner";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  Loader2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Search,
  Megaphone,
  DollarSign,
  Palette,
  Store,
  Lock,
  BarChart3,
  Globe,
} from "lucide-react";
import logoMavi from "@/assets/logo-mavi-colorida.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type AnswerOption = { label: string; score: number };
type Question = { text: string; options: AnswerOption[] };
type PillarInsight = { title: string; points: string[]; cta: string };
type Pillar = {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: Question[];
  insight: (score: number) => PillarInsight;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    id: "produto",
    label: "Catálogo de Produtos",
    shortLabel: "Produto",
    icon: ShoppingBag,
    questions: [
      {
        text: "Como são as fotos dos seus produtos na loja?",
        options: [
          { label: "Fotos do celular ou de baixa qualidade", score: 0 },
          { label: "Fotos ok, mas sem padrão ou organização", score: 33 },
          { label: "Fotos boas, mas sem muita consistência visual", score: 66 },
          { label: "Fotos profissionais, fundo limpo e vários ângulos em todos os produtos", score: 100 },
        ],
      },
      {
        text: "Como você descreve seus produtos para o cliente?",
        options: [
          { label: "Copio o texto do fornecedor sem editar", score: 0 },
          { label: "Escrevo o básico: nome, tamanho e preço", score: 33 },
          { label: "Detalho bem o produto, mas não penso em convencer a compra", score: 66 },
          { label: "Destaco benefícios, depoimentos e explico por que vale comprar", score: 100 },
        ],
      },
      {
        text: "Como você decide quais produtos manter ou tirar da loja?",
        options: [
          { label: "Nunca removo produtos — mantenho tudo que tenho", score: 0 },
          { label: "Só tiro o que claramente não vende nada", score: 33 },
          { label: "Analiso as vendas de vez em quando para decidir", score: 66 },
          { label: "Acompanho regularmente o que mais vende e o que dá mais lucro", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Catálogo — Atenção crítica",
          points: [
            "Fotos amadoras reduzem a taxa de conversão em até 40%",
            "Descrições sem estratégia fazem o cliente abandonar na decisão de compra",
            "Sem curadoria do mix, você financia produtos que não giram",
          ],
          cta: "Design e fotografia de produto",
        };
      if (score < 70)
        return {
          title: "Catálogo — Oportunidade de ganho",
          points: [
            "Melhorar consistência visual pode aumentar conversão em 20-30%",
            "Descrições com gatilhos de venda aceleram a decisão de compra",
            "Curadoria estratégica do mix libera caixa e aumenta o valor médio de compra",
          ],
          cta: "Otimização de catálogo e conversão",
        };
      return {
        title: "Catálogo — Base sólida",
        points: [
          "Vídeos curtos de produto aumentam engajamento e conversão",
          "Testar variações de fotos e textos revela o que converte mais",
          "Analise o lucro por produto regularmente para proteger sua rentabilidade",
        ],
        cta: "Escalar performance com dados de produto",
      };
    },
  },
  {
    id: "redes-sociais",
    label: "Redes Sociais",
    shortLabel: "Social",
    icon: Megaphone,
    questions: [
      {
        text: "Com que frequência você posta nas redes sociais da sua loja?",
        options: [
          { label: "Raramente ou nunca posto", score: 0 },
          { label: "Posto quando lembro, sem regularidade", score: 33 },
          { label: "Posto algumas vezes por semana", score: 66 },
          { label: "Posto todos os dias seguindo um plano de conteúdo", score: 100 },
        ],
      },
      {
        text: "Que tipo de conteúdo você publica nas redes?",
        options: [
          { label: "Só fotos de produto e promoções", score: 0 },
          { label: "Promoções e alguns posts variados, mas sem planejamento", score: 33 },
          { label: "Mistura de conteúdo útil e de venda, com algum planejamento", score: 66 },
          { label: "Conteúdos que ensinam, engajam e vendem — com calendário organizado", score: 100 },
        ],
      },
      {
        text: "Você sabe o que funciona e o que não funciona nos seus posts?",
        options: [
          { label: "Nunca olho os números dos posts", score: 0 },
          { label: "Vejo curtidas e seguidores de vez em quando", score: 33 },
          { label: "Analiso os resultados, mas raramente mudo o que faço com base nisso", score: 66 },
          { label: "Uso os dados para entender o que funciona e ajusto minha estratégia", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Redes Sociais — Ponto crítico",
          points: [
            "Sem presença ativa, você perde alcance gratuito todos os dias",
            "Conteúdo só de promoção cansa o público e reduz o alcance dos posts",
            "Sem acompanhar os números, você não sabe o que funciona",
          ],
          cta: "Gestão estratégica de redes sociais",
        };
      if (score < 70)
        return {
          title: "Redes Sociais — Há muito a ganhar",
          points: [
            "Postar com regularidade e planejamento dobra o alcance orgânico",
            "Conteúdo que educa e entretém aquece o público antes da venda",
            "Acompanhar os números semanalmente permite crescer sem gastar mais",
          ],
          cta: "Social media com foco em conversão",
        };
      return {
        title: "Redes Sociais — Boa base",
        points: [
          "Incentivar clientes a postar sobre sua loja gera conteúdo autêntico e gratuito",
          "Combinar redes sociais com anúncios reduz o custo por venda",
          "Parcerias com criadores de conteúdo do seu nicho abrem novos públicos",
        ],
        cta: "Amplificar alcance com conteúdo e mídia",
      };
    },
  },
  {
    id: "marketplaces",
    label: "Marketplaces",
    shortLabel: "Marketplaces",
    icon: Store,
    questions: [
      {
        text: "Você vende em plataformas como Shopee, Mercado Livre ou TikTok Shop?",
        options: [
          { label: "Não vendo em nenhuma dessas plataformas", score: 0 },
          { label: "Estou em 1 delas, mas de forma passiva", score: 33 },
          { label: "Estou em 2 ou mais, mas sem me dedicar muito", score: 66 },
          { label: "Gerencio ativamente Mercado Livre, Shopee e/ou TikTok Shop", score: 100 },
        ],
      },
      {
        text: "Quando alguém busca um produto parecido com o seu nessas plataformas, o seu aparece?",
        options: [
          { label: "Meus produtos praticamente não aparecem nas buscas", score: 0 },
          { label: "Aparecem pouco — uso só foto e nome básico", score: 33 },
          { label: "Apareço em algumas buscas, mas poderia aparecer muito mais", score: 66 },
          { label: "Cuido dos títulos, fotos e palavras para aparecer no topo das buscas", score: 100 },
        ],
      },
      {
        text: "Você usa o TikTok para mostrar ou vender seus produtos?",
        options: [
          { label: "Não uso o TikTok de jeito nenhum", score: 0 },
          { label: "Tenho perfil, mas não vendo pelo TikTok", score: 33 },
          { label: "Já testei o TikTok Shop, mas sem resultado claro", score: 66 },
          { label: "Vendo pelo TikTok Shop ou faço Lives de vendas regularmente", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Marketplaces — Canal inexplorado",
          points: [
            "Shopee, Mercado Livre e TikTok Shop concentram a maioria das compras online no Brasil",
            "Sem presença nesses canais, você perde vendas para concorrentes todos os dias",
            "TikTok Shop é o canal que mais cresce no e-commerce brasileiro em 2025",
          ],
          cta: "Estratégia e gestão de marketplaces",
        };
      if (score < 70)
        return {
          title: "Marketplaces — Oportunidade de escala",
          points: [
            "Cuidar dos títulos e palavras dos anúncios pode triplicar sua visibilidade",
            "TikTok Shop combina conteúdo viral com venda direta — alto potencial",
            "Manter boa reputação e responder rápido é decisivo para vender mais no ML",
          ],
          cta: "Otimização e escala em marketplaces",
        };
      return {
        title: "Marketplaces — Bem posicionado",
        points: [
          "Anúncios patrocinados dentro dos marketplaces aceleram as vendas",
          "Lives de venda no TikTok Shop podem multiplicar resultados em datas especiais",
          "Avaliar outros canais como Amazon Brasil pode abrir novas oportunidades",
        ],
        cta: "Expansão multicanal e marketplace avançado",
      };
    },
  },
  {
    id: "seo",
    label: "SEO Orgânico",
    shortLabel: "SEO",
    icon: Search,
    questions: [
      {
        text: "Quando alguém pesquisa no Google algo que você vende, sua loja aparece?",
        options: [
          { label: "Minha loja não aparece nas pesquisas do Google", score: 0 },
          { label: "Aparece só quando buscam o nome exato da minha loja", score: 33 },
          { label: "Aparece em algumas buscas, mas poderia aparecer muito mais", score: 66 },
          { label: "Apareço bem nas pesquisas e recebo visitantes sem precisar pagar por isso", score: 100 },
        ],
      },
      {
        text: "Você já se preocupou em preparar as páginas da sua loja para o Google encontrá-las melhor?",
        options: [
          { label: "Nunca pensei nisso", score: 0 },
          { label: "Fiz o mínimo, mas sem muito cuidado", score: 33 },
          { label: "Cuidei dos elementos principais, mas não reviso com frequência", score: 66 },
          { label: "Cuido regularmente de todos os detalhes para o Google achar e mostrar minha loja", score: 100 },
        ],
      },
      {
        text: "Você cria textos, vídeos ou conteúdos para atrair pessoas que ainda não conhecem sua loja?",
        options: [
          { label: "Não crio nenhum conteúdo além das redes sociais", score: 0 },
          { label: "Tenho um blog ou página de conteúdo, mas sem planejamento", score: 33 },
          { label: "Crio conteúdo pensando em atrair visitantes, mas de forma esporádica", score: 66 },
          { label: "Crio conteúdo planejado, pensando no que as pessoas buscam no Google", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "SEO — Tráfego gratuito desperdiçado",
          points: [
            "Sem aparecer no Google, você depende 100% de anúncios pagos para ter visitas",
            "Concorrentes que aparecem no Google tomam seu espaço sem pagar nada por isso",
            "Pequenos ajustes nas páginas da loja já podem fazer você aparecer nas buscas",
          ],
          cta: "SEO para e-commerce — tráfego orgânico",
        };
      if (score < 70)
        return {
          title: "SEO — Espaço grande para crescer",
          points: [
            "Ajustar todas as páginas da loja pode dobrar o tráfego gratuito em poucos meses",
            "Criar conteúdo útil reduz a dependência de anúncios pagos ao longo do tempo",
            "Corrigir erros técnicos faz o Google indexar e mostrar mais páginas da sua loja",
          ],
          cta: "SEO técnico e de conteúdo para e-commerce",
        };
      return {
        title: "SEO — Canal orgânico sólido",
        points: [
          "Explore buscas mais específicas (nicho) para atrair quem está pronto para comprar",
          "Conseguir que outros sites falem da sua loja aumenta sua relevância no Google",
          "Dados estruturados fazem sua loja aparecer com destaque nos resultados de busca",
        ],
        cta: "SEO avançado e autoridade de domínio",
      };
    },
  },
  {
    id: "trafego-pago",
    label: "Tráfego Pago",
    shortLabel: "Tráfego",
    icon: TrendingUp,
    questions: [
      {
        text: "Você investe em anúncios pagos para divulgar sua loja (como impulsionar posts ou criar campanhas)?",
        options: [
          { label: "Nunca investi em anúncios pagos", score: 0 },
          { label: "Já impulsionei algum post, mas sem estratégia definida", score: 33 },
          { label: "Invisto regularmente, mas sem saber ao certo se está valendo", score: 66 },
          { label: "Tenho campanhas estruturadas e sei quanto retorna por cada real investido", score: 100 },
        ],
      },
      {
        text: "Você sabe se os anúncios que paga estão gerando mais do que custam?",
        options: [
          { label: "Não faço ideia se os anúncios estão compensando", score: 0 },
          { label: "Vejo se o faturamento subiu, mas não separo o que veio dos anúncios", score: 33 },
          { label: "Acompanho os resultados, mas sem muita precisão nos números", score: 66 },
          { label: "Sei exatamente o retorno de cada campanha e ajusto toda semana", score: 100 },
        ],
      },
      {
        text: "O que você faz com as pessoas que visitaram sua loja mas não compraram?",
        options: [
          { label: "Não faço nada — perco o contato com elas", score: 0 },
          { label: "Já tentei alcançá-las de novo, mas sem sistematizar", score: 33 },
          { label: "Tenho campanhas para reconquistar visitantes, mas são simples", score: 66 },
          { label: "Tenho estratégias diferentes para quem visitou, quem foi ao carrinho e quem comprou", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Tráfego Pago — Motor desligado",
          points: [
            "Sem anúncios estruturados, o crescimento depende só do orgânico e da sorte",
            "Anúncios bem gerenciados no Facebook e Google têm retorno médio de 8x",
            "Sem medir o retorno dos anúncios, você não sabe se está lucrando ou perdendo dinheiro",
          ],
          cta: "Estratégia de performance e tráfego pago",
        };
      if (score < 70)
        return {
          title: "Tráfego Pago — Verba subaproveitada",
          points: [
            "Sem medir direito o retorno, você pode estar cortando campanhas que funcionam",
            "Reconquistar quem visitou e não comprou é uma das ações mais baratas e eficientes",
            "Otimizar as campanhas semanalmente pode aumentar o retorno em 30-50%",
          ],
          cta: "Otimização de campanhas e retorno real",
        };
      return {
        title: "Tráfego Pago — Estrutura avançada",
        points: [
          "Campanhas automáticas do Google podem maximizar cobertura em mais canais",
          "Testar criativos completamente diferentes (não só formatos) revela oportunidades",
          "TikTok Ads tem custo menor para anunciar em nichos específicos",
        ],
        cta: "Escalar campanhas com inteligência",
      };
    },
  },
  {
    id: "investimentos-midia",
    label: "Investimento em Mídia",
    shortLabel: "Mídia",
    icon: DollarSign,
    questions: [
      {
        text: "Você sabe exatamente quanto gasta com divulgação e marketing por mês?",
        options: [
          { label: "Não controlo o que gasto com marketing", score: 0 },
          { label: "Sei o total gasto, mas não onde vai cada real", score: 33 },
          { label: "Sei onde invisto, mas não analiso o retorno separado por canal", score: 66 },
          { label: "Tenho controle total: sei o que cada canal gasta e o que traz de volta", score: 100 },
        ],
      },
      {
        text: "Você divulga sua loja em mais de um lugar (não só no Instagram ou Facebook)?",
        options: [
          { label: "Coloco todo meu investimento em um único lugar", score: 0 },
          { label: "Tentei outros canais, mas sem planejamento", score: 33 },
          { label: "Anuncio em 2 ou mais lugares, mas sem comparar os resultados", score: 66 },
          { label: "Divido o investimento entre canais e ajusto com base nos resultados mensais", score: 100 },
        ],
      },
      {
        text: "Você sabe se o dinheiro que gasta com divulgação está valendo a pena?",
        options: [
          { label: "Nunca calculei se o marketing está trazendo retorno", score: 0 },
          { label: "Acho que está funcionando, mas não tenho como comprovar", score: 33 },
          { label: "Tenho uma ideia do retorno, mas os dados não são precisos", score: 66 },
          { label: "Sei com clareza o retorno de cada real investido em divulgação", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Investimento em Mídia — Sem visibilidade",
          points: [
            "Sem controle por canal, você não sabe o que funciona e arrisca jogar dinheiro fora",
            "Depender de um único canal é perigoso — qualquer mudança pode cortar suas vendas",
            "Sem calcular o retorno, crescer vira sorte e não estratégia",
          ],
          cta: "Gestão de mídia e alocação estratégica de verba",
        };
      if (score < 70)
        return {
          title: "Investimento em Mídia — Controle parcial",
          points: [
            "Analisar canal por canal permite mover verba do que não funciona para o que converte",
            "Diversificar onde você anuncia reduz risco e alcança novos públicos",
            "Saber o retorno em tempo real acelera suas decisões de marketing",
          ],
          cta: "Inteligência de mídia e performance",
        };
      return {
        title: "Investimento em Mídia — Gestão madura",
        points: [
          "Avaliar se os canais estão 'roubando' resultado um do outro revela oportunidades ocultas",
          "Modelos de atribuição mais precisos mostram o real impacto de cada canal",
          "Análise profunda do mix de mídia pode revelar combinações que multiplicam o resultado",
        ],
        cta: "Media intelligence e otimização avançada",
      };
    },
  },
  {
    id: "design-layout",
    label: "Design e Layout",
    shortLabel: "Design",
    icon: Palette,
    questions: [
      {
        text: "Quando alguém entra na sua loja, ela passa uma imagem profissional e confiável?",
        options: [
          { label: "A loja parece amadora — ainda precisa de muito trabalho", score: 0 },
          { label: "Está ok, mas parece genérica e sem identidade própria", score: 33 },
          { label: "Parece boa, mas ainda falta um toque mais profissional", score: 66 },
          { label: "A loja transmite confiança, tem identidade visual e parece profissional", score: 100 },
        ],
      },
      {
        text: "Sua loja funciona bem no celular e abre rapidamente?",
        options: [
          { label: "Tem problemas sérios no celular ou demora muito para carregar", score: 0 },
          { label: "Funciona no celular, mas a navegação é confusa", score: 33 },
          { label: "Funciona bem no celular, mas poderia ser mais rápida", score: 66 },
          { label: "Excelente no celular: rápida, fácil de navegar e agradável", score: 100 },
        ],
      },
      {
        text: "Sua loja tem elementos que incentivam o cliente a fechar a compra?",
        options: [
          { label: "Não — a loja só mostra produto e preço, sem nada que incentive a compra", score: 0 },
          { label: "Tenho botões de compra, mas nada que crie urgência ou mostre avaliações", score: 33 },
          { label: "Tenho avaliações de clientes e botões claros, mas não testo o que funciona melhor", score: 66 },
          { label: "Uso avaliações, ofertas com prazo, botões estratégicos — e testo o que converte mais", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Design e Layout — Conversão comprometida",
          points: [
            "Uma loja com aparência amadora é a principal razão para o cliente desconfiar e não comprar",
            "Loja lenta ou ruim no celular perde até 70% dos visitantes antes da compra",
            "Sem avaliações e urgência, o cliente adia a compra e nunca volta",
          ],
          cta: "Design e layout de loja focado em conversão",
        };
      if (score < 70)
        return {
          title: "Design e Layout — Espaço para converter mais",
          points: [
            "Melhorar a velocidade da loja pode aumentar as vendas em até 25%",
            "Avaliações de clientes bem posicionadas eliminam a dúvida na hora de comprar",
            "Testar variações de botões e layout é um dos investimentos com maior retorno no e-commerce",
          ],
          cta: "Otimização de experiência e taxa de conversão",
        };
      return {
        title: "Design e Layout — Experiência sólida",
        points: [
          "Personalizar a vitrine para cada tipo de visitante é o próximo nível de conversão",
          "Simplificar o processo de pagamento pode reduzir o abandono de carrinho em 20%",
          "Investir continuamente na identidade visual da marca é um ativo de longo prazo",
        ],
        cta: "CRO avançado e branding estratégico",
      };
    },
  },
];

const TOTAL_QUESTIONS = PILLARS.reduce((acc, p) => acc + p.questions.length, 0);

// ─── Helpers ──────────────────────────────────────────────────────────────────

type PersonaData = {
  label: string;
  emoji: string;
  description: string;
  colorClass: string;
};

function getPersona(avgScore: number): PersonaData {
  if (avgScore < 30)
    return {
      label: "Loja em Construção",
      emoji: "🏗️",
      description:
        "Você está dando os primeiros passos. A base ainda precisa ser estruturada para crescer com consistência e sem desperdiçar investimento.",
      colorClass: "text-red-600",
    };
  if (avgScore < 50)
    return {
      label: "Loja em Crescimento",
      emoji: "🌱",
      description:
        "Sua loja tem potencial, mas pontos críticos estão travando o crescimento e custando vendas — e dinheiro — todo mês.",
      colorClass: "text-orange-600",
    };
  if (avgScore < 65)
    return {
      label: "Loja em Aceleração",
      emoji: "🚀",
      description:
        "Você já tem uma base. Os gaps identificados custam receita real. Corrigi-los é o caminho mais rápido para crescer com consistência.",
      colorClass: "text-yellow-600",
    };
  if (avgScore < 80)
    return {
      label: "Loja Consolidada",
      emoji: "⚡",
      description:
        "Sua operação é sólida. O foco agora é escalar com eficiência e fechar os gaps que ainda limitam seu teto de crescimento.",
      colorClass: "text-blue-600",
    };
  return {
    label: "Loja de Alta Performance",
    emoji: "🏆",
    description:
      "Você opera no topo. Pequenos ajustes nos pontos mais fracos podem gerar grandes saltos de resultado.",
    colorClass: "text-green-600",
  };
}

function getQuestionByIndex(idx: number): { pillarIndex: number; questionIndex: number } | null {
  let count = 0;
  for (let pi = 0; pi < PILLARS.length; pi++) {
    for (let qi = 0; qi < PILLARS[pi].questions.length; qi++) {
      if (count === idx) return { pillarIndex: pi, questionIndex: qi };
      count++;
    }
  }
  return null;
}

const ANALYZING_STEPS = [
  "Acessando sua loja...",
  "Verificando velocidade e performance...",
  "Analisando presença nos marketplaces...",
  "Checando configurações de SEO...",
  "Avaliando estrutura de tráfego pago...",
  "Preparando seu assessment personalizado...",
];

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "url-input" | "analyzing" | "questions" | "gate" | "result";
type AnswerRecord = { pillar: string; question: string; answer: string; score: number };

export default function Assessment() {
  const [phase, setPhase] = useState<Phase>("url-input");
  const [lojaUrl, setLojaUrl] = useState("");
  const [analyzingStep, setAnalyzingStep] = useState(0);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number[]>>({});
  const [allAnswers, setAllAnswers] = useState<AnswerRecord[]>([]);
  const [messages, setMessages] = useState<Array<{ type: "question" | "answer"; text: string }>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed
  const pillarScores = PILLARS.map((p) => {
    const ans = scores[p.id] ?? [];
    if (ans.length === 0) return 0;
    return Math.round(ans.reduce((a, b) => a + b, 0) / ans.length);
  });

  const answeredCount = Object.values(scores).reduce((a, b) => a + b.length, 0);
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const answeredScores = pillarScores.filter((_, i) => (scores[PILLARS[i].id]?.length ?? 0) > 0);
  const liveAvg =
    answeredScores.length > 0
      ? Math.round(answeredScores.reduce((a, b) => a + b, 0) / answeredScores.length)
      : 0;

  const finalAvg = Math.round(pillarScores.reduce((a, b) => a + b, 0) / PILLARS.length);
  const finalPersona = getPersona(finalAvg);
  const overallColor =
    finalAvg >= 70 ? "#16a34a" : finalAvg >= 50 ? "#d97706" : "#dc2626";

  const radarData = PILLARS.map((p, i) => ({
    subject: p.shortLabel,
    value: pillarScores[i],
    fullMark: 100,
  }));

  const livePersona = liveAvg > 0 ? getPersona(liveAvg) : null;
  const currentQInfo = getQuestionByIndex(currentIdx);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (phase === "questions" && messages.length === 0 && currentQInfo) {
      setMessages([
        {
          type: "question",
          text: PILLARS[currentQInfo.pillarIndex].questions[currentQInfo.questionIndex].text,
        },
      ]);
    }
  }, [phase]);

  // Analyzing animation
  useEffect(() => {
    if (phase !== "analyzing") return;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalyzingStep(step);
      if (step >= ANALYZING_STEPS.length - 1) {
        clearInterval(interval);
        setTimeout(() => setPhase("questions"), 600);
      }
    }, 480);
    return () => clearInterval(interval);
  }, [phase]);

  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("analyzing");
  }

  function handleAnswer(option: AnswerOption) {
    if (!currentQInfo) return;
    const pillar = PILLARS[currentQInfo.pillarIndex];
    const questionText = pillar.questions[currentQInfo.questionIndex].text;

    setScores((prev) => ({ ...prev, [pillar.id]: [...(prev[pillar.id] ?? []), option.score] }));
    setAllAnswers((prev) => [
      ...prev,
      { pillar: pillar.label, question: questionText, answer: option.label, score: option.score },
    ]);
    setMessages((prev) => [...prev, { type: "answer", text: option.label }]);

    const nextIdx = currentIdx + 1;
    if (nextIdx >= TOTAL_QUESTIONS) {
      setTimeout(() => setPhase("gate"), 500);
      return;
    }

    setCurrentIdx(nextIdx);
    const next = getQuestionByIndex(nextIdx);
    if (next) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "question",
            text: PILLARS[next.pillarIndex].questions[next.questionIndex].text,
          },
        ]);
      }, 400);
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const scoreMap = Object.fromEntries(PILLARS.map((p, i) => [p.id, pillarScores[i]]));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("assessment_leads").insert({
        loja_url: lojaUrl,
        nome,
        email,
        whatsapp,
        avg_score: finalAvg,
        persona: finalPersona.label,
        scores: scoreMap,
        answers: allAnswers,
      });
      if (error) throw error;
      setPhase("result");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Phase: URL Input ─────────────────────────────────────────────────────────
  if (phase === "url-input") {
    return (
      <div className="bg-gray-50 min-h-[100dvh]">
        <SEO
          title="Diagnóstico Gratuito de E-commerce — Avalie sua Loja Virtual em 5 Minutos"
          description="Descubra gratuitamente as falhas do seu e-commerce. Assessment em 7 dimensões: produtos, redes sociais, Shopee, Mercado Livre, TikTok Shop, SEO, tráfego pago e design. Score por área + pontos de melhoria. Resultado imediato."
          canonical="/assessment"
          schemaMarkup={ASSESSMENT_SCHEMA}
        />

        {/* Above-fold CTA — visível para usuário e crawlers */}
        <div className="flex flex-col items-center justify-center px-5 pt-12 pb-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <img src={logoMavi} alt="MAVI Marketing Digital" className="h-8 mx-auto mb-6" />
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/30 text-primary bg-primary/5 mb-4">
                Diagnóstico Gratuito · E-commerce
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Descubra as falhas do<br />seu e-commerce agora
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Assessment gratuito em 7 dimensões · 21 perguntas · resultado em 5 minutos
              </p>
            </div>

            <form
              onSubmit={handleUrlSubmit}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm"
            >
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  URL da sua loja virtual
                </Label>
                <Input
                  required
                  autoFocus
                  value={lojaUrl}
                  onChange={(e) => setLojaUrl(e.target.value)}
                  placeholder="https://sualoja.com.br"
                  className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                />
                <p className="text-xs text-gray-400">
                  Usaremos sua URL para personalizar o diagnóstico
                </p>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full touch-manipulation">
                Analisar minha loja <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <p className="text-center text-xs text-gray-400">
                100% gratuito · Sem compromisso · Resultado imediato
              </p>
            </form>

            <div className="mt-6 grid grid-cols-7 gap-1.5">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-[9px] text-gray-400 text-center leading-tight">
                      {p.shortLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Conteúdo semântico para SEO / GEO / AIO ─────────────────────────
            Visível ao usuário e integralmente indexável por crawlers e LLMs.
            Fornece contexto, autoridade e estrutura de dados textuais para
            buscadores (Google, Bing) e motores de IA (Perplexity, ChatGPT,
            Claude, Gemini) extraírem e citarem a MAVI como fonte.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-5 pb-20 space-y-12">

          {/* O que é */}
          <section aria-labelledby="o-que-e">
            <div className="border-t border-gray-200 pt-10">
              <h2 id="o-que-e" className="text-xl font-bold text-gray-900 mb-3">
                O que é um diagnóstico de e-commerce?
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Um <strong>diagnóstico de e-commerce</strong> é uma avaliação estruturada que analisa as principais dimensões de uma loja virtual para identificar falhas no desempenho, gargalos de crescimento e oportunidades inexploradas. A ferramenta da MAVI avalia <strong>7 dimensões críticas</strong> — catálogo de produtos, redes sociais, marketplaces (Shopee, Mercado Livre, TikTok Shop), SEO orgânico, tráfego pago, gestão de investimentos em mídia e design da loja — gerando um <strong>score por área e um plano de prioridades</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mt-3">
                O assessment é indicado para qualquer dono de loja virtual que quer entender em quais pontos o negócio está perdendo vendas e como acelerar o crescimento de forma estratégica.
              </p>
            </div>
          </section>

          {/* Como funciona */}
          <section aria-labelledby="como-funciona">
            <h2 id="como-funciona" className="text-xl font-bold text-gray-900 mb-4">
              Como funciona o assessment de e-commerce
            </h2>
            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Informe a URL da sua loja",
                  desc: "Digite o endereço do seu e-commerce. O sistema usa a URL para personalizar o diagnóstico com base no seu segmento.",
                },
                {
                  step: "2",
                  title: "Responda 21 perguntas simples",
                  desc: "Perguntas sobre 7 dimensões da sua loja, com opções de resposta diretas. Não é necessário ter conhecimento técnico — qualquer dono de e-commerce consegue responder.",
                },
                {
                  step: "3",
                  title: "Receba o diagnóstico completo",
                  desc: "O relatório mostra o score de cada dimensão, um mapa de maturidade em radar e os principais pontos de melhoria conectados às áreas de maior impacto no crescimento.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* O que é avaliado */}
          <section aria-labelledby="dimensoes">
            <h2 id="dimensoes" className="text-xl font-bold text-gray-900 mb-4">
              O que é avaliado no diagnóstico
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { n: "Catálogo de Produtos", d: "Qualidade das fotos, estratégia de descrição e gestão do mix de produtos." },
                { n: "Redes Sociais", d: "Frequência de publicação, tipo de conteúdo e uso de dados para ajustar a estratégia." },
                { n: "Marketplaces", d: "Presença e otimização no Shopee, Mercado Livre e TikTok Shop." },
                { n: "SEO Orgânico", d: "Visibilidade no Google, configuração de páginas e produção de conteúdo." },
                { n: "Tráfego Pago", d: "Investimento em anúncios, mensuração de retorno e estratégia de reconquista de visitantes." },
                { n: "Investimento em Mídia", d: "Controle de verba por canal, diversificação e clareza do retorno sobre investimento." },
                { n: "Design e Layout", d: "Aparência profissional, performance no celular e elementos que incentivam a compra." },
              ].map((item) => (
                <div key={item.n} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{item.n}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Para quem é */}
          <section aria-labelledby="para-quem">
            <h2 id="para-quem" className="text-xl font-bold text-gray-900 mb-3">
              Para quem é este assessment?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              O diagnóstico de e-commerce da MAVI é indicado para:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Donos de lojas virtuais que querem entender por que as vendas não crescem",
                "E-commerces que investem em anúncios mas não sabem se o retorno é satisfatório",
                "Lojas que estão começando e querem estruturar bem as bases antes de escalar",
                "Gestores que precisam identificar prioridades de melhoria para o próximo trimestre",
                "Negócios que vendem em marketplaces como Shopee e Mercado Livre e querem otimizar a presença",
                "Qualquer loja virtual que quer crescer de forma estruturada e baseada em dados",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq">
            <h2 id="faq" className="text-xl font-bold text-gray-900 mb-5">
              Perguntas frequentes sobre diagnóstico de e-commerce
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "O diagnóstico de e-commerce é realmente gratuito?",
                  a: "Sim, 100% gratuito. Você não precisa cadastrar cartão, assinar nenhum plano nem pagar nada. O assessment completo com score por dimensão e pontos de melhoria é entregue sem custo e sem compromisso.",
                },
                {
                  q: "Preciso ter conhecimento técnico para responder?",
                  a: "Não. As perguntas usam linguagem simples e cotidiana. Qualquer dono de e-commerce — mesmo quem está começando agora — consegue responder sem dificuldade.",
                },
                {
                  q: "Quais são os principais erros que prejudicam as vendas de um e-commerce?",
                  a: "Os erros mais comuns são: fotos de produto de baixa qualidade, descrições copiadas do fornecedor, ausência nos principais marketplaces (Shopee, Mercado Livre, TikTok Shop), loja que não aparece no Google, anúncios pagos sem controle de retorno, loja difícil de usar no celular e ausência de avaliações de clientes.",
                },
                {
                  q: "Como saber se meu e-commerce está indo bem?",
                  a: "Um e-commerce saudável tem: taxa de conversão acima da média do setor, presença ativa nos principais canais (marketplaces, redes sociais, Google), retorno mensurável dos anúncios pagos, loja rápida e funcional no celular e clientes que voltam a comprar. O assessment da MAVI avalia todos esses pontos e entrega um score que mostra exatamente onde sua loja está e o que priorizar.",
                },
                {
                  q: "O que eu recebo no relatório?",
                  a: "Você recebe: score individual por dimensão (0 a 100), mapa de maturidade em radar com as 7 dimensões, diagnóstico detalhado de cada área com os principais pontos de melhoria, e próximos passos práticos conectados às maiores oportunidades do seu e-commerce.",
                },
                {
                  q: "Quanto tempo leva para fazer o diagnóstico?",
                  a: "Em média 5 minutos. São 21 perguntas com opções de resposta direta, sem campos de texto aberto. O resultado aparece imediatamente após o preenchimento dos dados.",
                },
              ].map((item) => (
                <details key={item.q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none select-none">
                    {item.q}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                  </summary>
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Assessment gratuito</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pronto para descobrir o diagnóstico da sua loja?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Identifique agora os pontos que estão travando o crescimento do seu e-commerce.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors touch-manipulation"
            >
              Começar o diagnóstico grátis <ChevronRight className="w-4 h-4" />
            </button>
          </section>

        </div>
      </div>
    );
  }

  // ── Phase: Analyzing ─────────────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <div className="min-h-[100dvh] bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          <img src={logoMavi} alt="MAVI" className="h-7 mx-auto mb-10" />
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <p className="text-gray-500 text-sm mb-1">Analisando</p>
          <p className="text-gray-900 font-semibold text-base truncate max-w-xs mx-auto mb-8">
            {lojaUrl}
          </p>

          <div className="space-y-2.5 text-left max-w-xs mx-auto">
            {ANALYZING_STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  i <= analyzingStep ? "opacity-100" : "opacity-25"
                }`}
              >
                {i < analyzingStep ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : i === analyzingStep ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                )}
                <span className={`text-sm ${i <= analyzingStep ? "text-gray-700" : "text-gray-300"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Questions ─────────────────────────────────────────────────────────
  if (phase === "questions") {
    const currentPillar = currentQInfo ? PILLARS[currentQInfo.pillarIndex] : null;
    const currentQuestion =
      currentQInfo && currentPillar
        ? currentPillar.questions[currentQInfo.questionIndex]
        : null;

    return (
      <div className="h-[100dvh] bg-white flex overflow-hidden">
        <SEO
          title="Assessment de E-commerce | MAVI"
          description="Avaliação gratuita do seu e-commerce em 7 dimensões."
          canonical="/assessment"
        />

        {/* Left: Chat */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Header */}
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <img src={logoMavi} alt="MAVI" className="h-5" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {answeredCount}/{TOTAL_QUESTIONS}
                </span>
                <div className="w-24 sm:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-primary font-semibold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-2xl mx-auto space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.type === "answer"
                      ? "justify-end"
                      : "justify-start items-start gap-2.5"
                  } animate-fade-in-up`}
                >
                  {msg.type === "question" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "question"
                        ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                        : "bg-primary text-white rounded-tr-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Answer options */}
          {currentPillar && currentQuestion && (
            <div className="flex-shrink-0 border-t border-gray-200 px-4 py-3 bg-gray-50">
              <div className="max-w-2xl mx-auto">
                <p className="text-[11px] text-gray-400 mb-2 flex items-center gap-1.5">
                  <currentPillar.icon className="w-3 h-3 text-primary" />
                  {currentPillar.label}
                </p>
                <div className="space-y-2">
                  {currentQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm hover:border-primary/50 hover:bg-primary/5 hover:text-gray-900 transition-all duration-150 active:scale-[0.99] touch-manipulation min-h-[44px]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Panel (desktop only) */}
        <div className="hidden lg:flex w-72 xl:w-80 flex-col bg-gray-50 border-l border-gray-200 h-full overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                Self-Assessment
              </span>
              <span className="text-[10px] text-gray-400">
                {new Date()
                  .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
                  .toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-gray-500">Diagnóstico de E-commerce</p>
          </div>

          <div className="p-4 border-b border-gray-200 space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Loja</p>
              <p className="text-xs text-gray-600 truncate">{lojaUrl}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Persona</p>
              {livePersona ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{livePersona.emoji}</span>
                  <span className={`text-xs font-semibold ${livePersona.colorClass}`}>
                    {livePersona.label}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs italic text-gray-400">Aparece ao finalizar</span>
                </div>
              )}
            </div>
          </div>

          {/* Radar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Radar</p>
              <span className="text-[10px] text-gray-300">7 pilares</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
                  <PolarGrid stroke="rgba(0,0,0,0.08)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(55,65,81,0.65)", fontSize: 9 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#E6007E"
                    fill="#E6007E"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scores */}
          <div className="p-4 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">Scores</p>
            <div className="space-y-2.5">
              {PILLARS.map((p, i) => {
                const score = pillarScores[i];
                const answered = (scores[p.id]?.length ?? 0) > 0;
                return (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-16 flex-shrink-0 truncate">
                      {p.shortLabel}
                    </span>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${score}%`,
                          background: answered ? "#E6007E" : "transparent",
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 w-4 text-right">
                      {answered ? score : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Gate (preview bloqueado) ──────────────────────────────────────────
  const scoreColor = (s: number) => s >= 70 ? "#16a34a" : s >= 50 ? "#d97706" : "#dc2626";

  if (phase === "gate") {
    return (
      <div className="min-h-[100dvh] bg-gray-50 text-gray-900">
        <SEO
          title="Seu Diagnóstico | MAVI"
          description="Desbloqueie o diagnóstico completo do seu e-commerce."
          canonical="/assessment"
        />

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <img src={logoMavi} alt="MAVI" className="h-5" />
            <span className="text-xs text-gray-400">
              Assessment · E-commerce · {new Date().toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
          {/* Score + radar */}
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="text-4xl mb-2">{finalPersona.emoji}</div>
              <div className={`text-base font-bold mb-2 ${finalPersona.colorClass}`}>
                {finalPersona.label}
              </div>
              <div className="text-5xl font-extrabold mb-1" style={{ color: overallColor }}>
                {finalAvg}
                <span className="text-2xl text-gray-300">/100</span>
              </div>
              <div className="text-xs text-gray-400">Score geral</div>
            </div>
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">
                Mapa de Maturidade — 7 Dimensões
              </p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="rgba(0,0,0,0.08)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "rgba(55,65,81,0.7)", fontSize: 11 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#E6007E"
                      fill="#E6007E"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pillar bars */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">
              Score por Dimensão
            </p>
            <div className="space-y-3">
              {PILLARS.map((p, i) => {
                const s = pillarScores[i];
                const color = scoreColor(s);
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-gray-600 w-32 sm:w-40 flex-shrink-0">{p.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s}%`, background: color }} />
                    </div>
                    <span className="text-sm font-bold w-8 text-right" style={{ color }}>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked section */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
            {/* Blurred ghost */}
            <div className="blur-lg opacity-50 pointer-events-none select-none p-1">
              <div className="grid sm:grid-cols-2 gap-4">
                {PILLARS.slice(0, 4).map((p) => (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
                    <div className="space-y-2.5">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                      <div className="h-3 bg-gray-200 rounded w-3/5" />
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="h-3 bg-primary/30 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-b from-white/80 via-white/95 to-white">
              <div className="w-full max-w-md bg-white border border-gray-200 border-t-4 border-t-primary rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Desbloqueie seu diagnóstico</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Preencha seus dados para ver o diagnóstico completo com os pontos de
                    melhoria do seu e-commerce.
                  </p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-gray-600 text-xs">Nome *</Label>
                    <Input
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="bg-white border-gray-200 text-gray-900 h-10 text-sm touch-manipulation"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-600 text-xs">E-mail *</Label>
                    <Input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="bg-white border-gray-200 text-gray-900 h-10 text-sm touch-manipulation"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-gray-600 text-xs">WhatsApp *</Label>
                    <Input
                      required
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(47) 99999-9999"
                      className="bg-white border-gray-200 text-gray-900 h-10 text-sm touch-manipulation"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full mt-1 min-h-[44px] touch-manipulation"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Carregando...</>
                    ) : (
                      <>Ver diagnóstico completo <ArrowRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-gray-400">
                    Sem spam · Seus dados são protegidos
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Result (completo) ──────────────────────────────────────────────────
  return (
    <div className="min-h-[100dvh] bg-gray-50 text-gray-900">
      <SEO
        title="Diagnóstico Completo do seu E-commerce | MAVI"
        description="Confira o diagnóstico completo do seu e-commerce em 7 dimensões."
        canonical="/assessment"
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <img src={logoMavi} alt="MAVI" className="h-5" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Assessment de E-commerce</p>
            <p className="text-xs text-gray-400">
              {nome} · {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Hero: score + radar */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-5xl mb-3">{finalPersona.emoji}</div>
            <div className={`text-lg font-bold mb-2 ${finalPersona.colorClass}`}>
              {finalPersona.label}
            </div>
            <div className="text-6xl font-extrabold mb-1" style={{ color: overallColor }}>
              {finalAvg}<span className="text-3xl text-gray-300">/100</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">Score geral do e-commerce</div>
            <p className="text-sm text-gray-500 leading-relaxed">{finalPersona.description}</p>
          </div>

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">
              Mapa de Maturidade — 7 Dimensões
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(0,0,0,0.08)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(55,65,81,0.7)", fontSize: 11 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#E6007E"
                    fill="#E6007E"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pillar bars */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-5">Score por Dimensão</p>
          <div className="space-y-4">
            {PILLARS.map((p, i) => {
              const s = pillarScores[i];
              const color = scoreColor(s);
              const Icon = p.icon;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-600 w-32 sm:w-40 flex-shrink-0">{p.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${s}%`, background: color }}
                    />
                  </div>
                  <span className="text-sm font-bold w-8 text-right" style={{ color }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights por pilar */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
            Diagnóstico Detalhado — Pontos de Melhoria
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const s = pillarScores[i];
              const insight = p.insight(s);
              const Icon = p.icon;
              const borderColor = s >= 70 ? "border-green-500/30" : s >= 50 ? "border-yellow-500/30" : "border-red-500/30";
              const labelColor = s >= 70 ? "text-green-700" : s >= 50 ? "text-yellow-700" : "text-red-700";
              return (
                <div key={p.id} className={`bg-white border border-t-2 ${borderColor} rounded-xl p-5 shadow-sm`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-xs font-bold uppercase tracking-wide ${labelColor}`}>
                      {insight.title}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {insight.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Área de foco:</span>
                    <span className="text-[10px] text-primary font-semibold">{insight.cta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="relative bg-gray-900 border border-gray-800 border-t-2 border-t-primary rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,0,126,0.15),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Quer um plano de ação para esses resultados?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Um estrategista da MAVI analisa seu diagnóstico e monta um plano personalizado
              para escalar seu e-commerce —{" "}
              <strong className="text-white">sem custo e sem compromisso.</strong>
            </p>
            <a
              href={`https://wa.me/554733072030?text=Oi%21+Fiz+o+assessment+do+meu+e-commerce+e+quero+conversar+sobre+os+pr%C3%B3ximos+passos.+Score%3A+${finalAvg}%2F100+%E2%80%94+${encodeURIComponent(finalPersona.label)}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="lg" className="touch-manipulation">
                Falar com um estrategista da MAVI <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-center text-xs text-white/30 mt-3">
              Sem compromisso · Sem proposta empurrada · Em até 30 minutos
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-8">
          <Link to="/" className="hover:text-primary transition-colors">← Voltar ao site da MAVI</Link>
          {" · "}
          <Link to="/contato" className="hover:text-primary transition-colors">Fale com a gente</Link>
        </p>
      </div>
    </div>
  );
}
