import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";

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
  Check,
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
  Download,
  FileText,
  Star,
  Zap,
} from "lucide-react";
import logoMavi from "@/assets/logo-mavi-colorida.png";
import camilaAvatar from "@/assets/camila-avatar.jpg";
import { CyclingTypewriter } from "@/components/CyclingTypewriter";
import { User, Target } from "lucide-react";

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
        text: "Bora começar pelo básico: como estão as fotos dos seus produtos hoje?",
        options: [
          { label: "Fotos do celular ou de baixa qualidade", score: 0 },
          { label: "Fotos ok, mas sem padrão ou organização", score: 33 },
          { label: "Fotos boas, mas sem muita consistência visual", score: 66 },
          { label: "Fotos profissionais, fundo limpo e vários ângulos em todos os produtos", score: 100 },
        ],
      },
      {
        text: "E as descrições — como você conta pro cliente por que vale a pena comprar?",
        options: [
          { label: "Copio o texto do fornecedor sem editar", score: 0 },
          { label: "Escrevo o básico: nome, tamanho e preço", score: 33 },
          { label: "Detalho bem o produto, mas não penso em convencer a compra", score: 66 },
          { label: "Destaco benefícios, depoimentos e explico por que vale comprar", score: 100 },
        ],
      },
      {
        text: "Uma mais estratégica agora: como você decide o que continua no catálogo e o que sai?",
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
        text: "Pra começar: com que frequência você posta nas redes da loja?",
        options: [
          { label: "Raramente ou nunca posto", score: 0 },
          { label: "Posto quando lembro, sem regularidade", score: 33 },
          { label: "Posto algumas vezes por semana", score: 66 },
          { label: "Posto todos os dias seguindo um plano de conteúdo", score: 100 },
        ],
      },
      {
        text: "E o que você costuma postar — é só produto e promoção, ou tem mais variedade?",
        options: [
          { label: "Só fotos de produto e promoções", score: 0 },
          { label: "Promoções e alguns posts variados, mas sem planejamento", score: 33 },
          { label: "Mistura de conteúdo útil e de venda, com algum planejamento", score: 66 },
          { label: "Conteúdos que ensinam, engajam e vendem — com calendário organizado", score: 100 },
        ],
      },
      {
        text: "Você olha os números pra saber o que realmente funciona nos seus posts?",
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
        text: "Pra começar: você vende ativamente nessas plataformas ou só tem conta criada?",
        options: [
          { label: "Não vendo em nenhuma dessas plataformas", score: 0 },
          { label: "Estou em 1 delas, mas de forma passiva", score: 33 },
          { label: "Estou em 2 ou mais, mas sem me dedicar muito", score: 66 },
          { label: "Gerencio ativamente Mercado Livre, Shopee e/ou TikTok Shop", score: 100 },
        ],
      },
      {
        text: "Quando alguém procura algo parecido com o que você vende lá dentro, seu produto aparece?",
        options: [
          { label: "Meus produtos praticamente não aparecem nas buscas", score: 0 },
          { label: "Aparecem pouco — uso só foto e nome básico", score: 33 },
          { label: "Apareço em algumas buscas, mas poderia aparecer muito mais", score: 66 },
          { label: "Cuido dos títulos, fotos e palavras para aparecer no topo das buscas", score: 100 },
        ],
      },
      {
        text: "E o TikTok especificamente — você já usa pra mostrar ou vender seus produtos?",
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
        text: "Quando alguém pesquisa o que você vende no Google, sua loja aparece nos resultados?",
        options: [
          { label: "Minha loja não aparece nas pesquisas do Google", score: 0 },
          { label: "Aparece só quando buscam o nome exato da minha loja", score: 33 },
          { label: "Aparece em algumas buscas, mas poderia aparecer muito mais", score: 66 },
          { label: "Apareço bem nas pesquisas e recebo visitantes sem precisar pagar por isso", score: 100 },
        ],
      },
      {
        text: "Você já parou pra preparar as páginas da loja pro Google encontrar elas com mais facilidade?",
        options: [
          { label: "Nunca pensei nisso", score: 0 },
          { label: "Fiz o mínimo, mas sem muito cuidado", score: 33 },
          { label: "Cuidei dos elementos principais, mas não reviso com frequência", score: 66 },
          { label: "Cuido regularmente de todos os detalhes para o Google achar e mostrar minha loja", score: 100 },
        ],
      },
      {
        text: "E pra quem ainda não te conhece: você cria algum conteúdo — texto, vídeo — pra atrair essas pessoas?",
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
        text: "Você investe em campanhas pagas pra divulgar a loja, ou nunca chegou a fazer isso?",
        options: [
          { label: "Nunca investi em anúncios pagos", score: 0 },
          { label: "Já impulsionei algum post, mas sem estratégia definida", score: 33 },
          { label: "Invisto regularmente, mas sem saber ao certo se está valendo", score: 66 },
          { label: "Tenho campanhas estruturadas e sei quanto retorna por cada real investido", score: 100 },
        ],
      },
      {
        text: "E você sabe se o que gasta com anúncios está voltando em vendas?",
        options: [
          { label: "Não faço ideia se os anúncios estão compensando", score: 0 },
          { label: "Vejo se o faturamento subiu, mas não separo o que veio dos anúncios", score: 33 },
          { label: "Acompanho os resultados, mas sem muita precisão nos números", score: 66 },
          { label: "Sei exatamente o retorno de cada campanha e ajusto toda semana", score: 100 },
        ],
      },
      {
        text: "Uma que eu adoro perguntar: o que você faz com quem visita a loja e não compra?",
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
        text: "Você sabe, de cabeça, quanto gasta com marketing todo mês?",
        options: [
          { label: "Não controlo o que gasto com marketing", score: 0 },
          { label: "Sei o total gasto, mas não onde vai cada real", score: 33 },
          { label: "Sei onde invisto, mas não analiso o retorno separado por canal", score: 66 },
          { label: "Tenho controle total: sei o que cada canal gasta e o que traz de volta", score: 100 },
        ],
      },
      {
        text: "Você divulga a loja em mais de um canal, ou concentra tudo num só lugar?",
        options: [
          { label: "Coloco todo meu investimento em um único lugar", score: 0 },
          { label: "Tentei outros canais, mas sem planejamento", score: 33 },
          { label: "Anuncio em 2 ou mais lugares, mas sem comparar os resultados", score: 66 },
          { label: "Divido o investimento entre canais e ajusto com base nos resultados mensais", score: 100 },
        ],
      },
      {
        text: "E no fim das contas: você sabe se esse investimento está valendo a pena?",
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
        text: "Quando alguém entra na sua loja pela primeira vez, ela passa confiança?",
        options: [
          { label: "A loja parece amadora — ainda precisa de muito trabalho", score: 0 },
          { label: "Está ok, mas parece genérica e sem identidade própria", score: 33 },
          { label: "Parece boa, mas ainda falta um toque mais profissional", score: 66 },
          { label: "A loja transmite confiança, tem identidade visual e parece profissional", score: 100 },
        ],
      },
      {
        text: "E no celular, que é onde a maioria compra — sua loja carrega rápido e é fácil de navegar?",
        options: [
          { label: "Tem problemas sérios no celular ou demora muito para carregar", score: 0 },
          { label: "Funciona no celular, mas a navegação é confusa", score: 33 },
          { label: "Funciona bem no celular, mas poderia ser mais rápida", score: 66 },
          { label: "Excelente no celular: rápida, fácil de navegar e agradável", score: 100 },
        ],
      },
      {
        text: "Pra fechar: sua loja tem algo que ajuda o cliente a decidir comprar ali, na hora?",
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

const PILLAR_SERVICE_MAP: Record<string, {
  service: string;
  tagline: string;
  description: string;
  href: string;
  waText: string;
}> = {
  produto: {
    service: "Gestão de E-commerce",
    tagline: "Catálogo, copy e gestão de mix",
    description: "Estratégia de produto, fotografia profissional, copywriting de conversão e curadoria do mix com foco em margem e giro.",
    href: "/servicos/ecommerce",
    waText: "Quero melhorar meu catálogo e conversão de produto",
  },
  "redes-sociais": {
    service: "Gestão de Redes Sociais",
    tagline: "Conteúdo estratégico com foco em venda",
    description: "Calendário editorial, produção de conteúdo, gestão de comunidade e análise de métricas para crescer de forma consistente.",
    href: "/servicos/redes-sociais",
    waText: "Quero uma estratégia de redes sociais para minha loja",
  },
  marketplaces: {
    service: "Gestão de Marketplaces",
    tagline: "Shopee, Mercado Livre e TikTok Shop",
    description: "Otimização de anúncios, estratégia de reputação, gestão de estoque e campanhas patrocinadas dentro dos marketplaces.",
    href: "/servicos/marketplaces",
    waText: "Quero vender mais no Shopee, Mercado Livre e TikTok Shop",
  },
  seo: {
    service: "SEO para E-commerce",
    tagline: "Tráfego orgânico sem pagar por clique",
    description: "Otimização on-page de produto e categoria, SEO técnico, estratégia de conteúdo e link building para crescer no Google.",
    href: "/servicos/ecommerce",
    waText: "Quero aparecer melhor no Google sem pagar por anúncios",
  },
  "trafego-pago": {
    service: "Marketing de Performance",
    tagline: "Meta Ads e Google Ads com retorno real",
    description: "Estruturação de campanhas, funil completo de prospecção e remarketing, mensuração de ROAS e otimização semanal.",
    href: "/servicos/performance",
    waText: "Fiz o assessment e preciso de ajuda pra performar meu ecommerce",
  },
  "investimentos-midia": {
    service: "Estratégia de Mídia",
    tagline: "Controle e diversificação de verba",
    description: "Diagnóstico da distribuição atual de budget, reestruturação por canal com análise de ROI e dashboard de performance.",
    href: "/servicos/performance",
    waText: "Fiz o assessment e preciso de ajuda pra performar meu ecommerce",
  },
  "design-layout": {
    service: "Design e CRO",
    tagline: "Loja que converte mais",
    description: "Redesign estratégico da loja, otimização para mobile, elementos de confiança, prova social e testes de conversão.",
    href: "/servicos/sites",
    waText: "Quero melhorar o design da minha loja e aumentar as vendas",
  },
};

const ANALYZING_STEPS = [
  "Acessando sua loja...",
  "Verificando velocidade e performance...",
  "Analisando presença nos marketplaces...",
  "Checando configurações de SEO...",
  "Avaliando estrutura de tráfego pago...",
  "Preparando seu assessment personalizado...",
];

// Anel de progresso circular com contador animado — reforça que o score
// foi calculado de verdade (não é só um número estático na tela).
function ScoreRing({ score, color, size = 148, stroke = 11 }: { score: number; color: string; size?: number; stroke?: number }) {
  const [display, setDisplay] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let raf: number;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f1f3" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tabular-nums" style={{ color }}>{display}</span>
        <span className="text-[10px] text-gray-400">/100</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "url-input" | "analyzing" | "questions" | "gate" | "result";
type AnswerRecord = { pillar: string; question: string; answer: string; score: number };
type MsgType = "question" | "answer" | "system";

const INTRO_MESSAGES = [
  "Oi! 👋 Eu sou a Camila, vou te acompanhar nesse diagnóstico do seu e-commerce.",
  "São 21 perguntas rápidas sobre 7 áreas da sua loja — leva menos de 5 minutos, prometo.",
  "Vai sendo sincero(a) nas respostas — quanto mais real, melhor o diagnóstico no final. Bora? 🚀",
];

const PILLAR_TRANSITIONS: Record<string, string> = {
  "redes-sociais": "✅ Produto avaliado! Agora vamos ver suas redes sociais.",
  marketplaces: "Ótimo! Agora vamos checar sua presença em Shopee, Mercado Livre e TikTok Shop.",
  seo: "Anotado! Vamos ver como sua loja aparece no Google.",
  "trafego-pago": "Certo! Agora vamos falar sobre seus anúncios pagos.",
  "investimentos-midia": "Quase lá! 💪 Vamos analisar como você investe em marketing.",
  "design-layout": "Última parte! 🏁 Vamos avaliar o design e a experiência da sua loja.",
};

const MILESTONE_MESSAGES: Record<number, string> = {
  7: "Você está indo muito bem! Continue assim 💪",
  14: "Mais da metade! Estamos quase no final 🚀",
  18: "Faltam só 3 perguntas — quase lá!",
};

const FATURAMENTO_MIDPOINTS: Record<string, number> = {
  "ate30k": 15000,
  "30k-100k": 65000,
  "100k-300k": 200000,
  "300k-1M": 650000,
  "acima1M": 1500000,
};

export default function Assessment() {
  const [phase, setPhase] = useState<Phase>("url-input");
  const [lojaUrl, setLojaUrl] = useState("");
  const [analyzingStep, setAnalyzingStep] = useState(0);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number[]>>({});
  const [allAnswers, setAllAnswers] = useState<AnswerRecord[]>([]);
  const [messages, setMessages] = useState<Array<{ type: MsgType; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lpFormRef = useRef<HTMLDivElement>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [chatPhase, setChatPhase] = useState<"pillars" | "faturamento">("pillars");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadErrors, setLeadErrors] = useState<{ email?: string; whatsapp?: string }>({});

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

  const faturamentoMidpoint = FATURAMENTO_MIDPOINTS[faturamento] ?? 0;
  const dinheiraNaMesa = faturamentoMidpoint > 0
    ? Math.round(faturamentoMidpoint * (100 - finalAvg) / 100 * 0.20)
    : 0;

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

  // Envia o evento também via Conversions API (server-side), com o mesmo
  // event_id do fbq client-side para o Meta deduplicar as duas chamadas.
  function sendCapiEvent(eventName: string, eventId: string, opts?: { email?: string; phone?: string; value?: number }) {
    const getCookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];
    supabase.functions.invoke("meta-capi", {
      body: {
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        email: opts?.email,
        phone: opts?.phone,
        value: opts?.value,
        currency: "BRL",
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
    }).catch((err) => console.error("meta-capi invoke error:", err));
  }

  // Chains bot messages with typing animation
  function chainMessages(
    msgs: Array<{ type: MsgType; text: string }>,
    onDone?: () => void
  ) {
    const TYPING_PRE = 320;
    const TYPING_DUR = 680;
    const GAP = 120;
    let t = 0;

    msgs.forEach((msg, i) => {
      const tTyping = t + TYPING_PRE;
      const tMsg = tTyping + TYPING_DUR;
      const isLast = i === msgs.length - 1;
      const m = msg;

      setTimeout(() => setIsTyping(true), tTyping);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, m]);
        if (isLast) {
          setIsTransitioning(false);
          onDone?.();
        }
      }, tMsg);

      t = tMsg + GAP;
    });
  }

  // Intro sequence when questions phase starts
  useEffect(() => {
    if (phase !== "questions") return;
    setIsTransitioning(true);
    const intro = INTRO_MESSAGES.map((text) => ({ type: "system" as MsgType, text }));
    const firstQ = { type: "question" as MsgType, text: PILLARS[0].questions[0].text };
    chainMessages([...intro, firstQ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // CompleteRegistration: disparado quando o resultado é exibido
  useEffect(() => {
    if (phase !== "result") return;
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" });
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "assessment_complete",
      assessment_score: finalAvg,
      assessment_persona: finalPersona.label,
    });
    const eventId = `assessment-complete-${Date.now()}`;
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "CompleteRegistration", {
        content_name: "Assessment E-commerce Completo",
        value: finalAvg,
        currency: "BRL",
      }, { eventID: eventId });
    }
    sendCapiEvent("CompleteRegistration", eventId, { email, phone: whatsapp, value: finalAvg });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function downloadPDF() {
    const colorScore = (s: number) => s >= 70 ? "#16a34a" : s >= 50 ? "#d97706" : "#dc2626";
    const labelScore = (s: number) => s >= 70 ? "Bom" : s >= 50 ? "Regular" : "Crítico";

    // SVG Radar chart
    const cx = 160, cy = 160, r = 120;
    const n = PILLARS.length;
    const radarPoints = PILLARS.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const ratio = pillarScores[i] / 100;
      return { x: cx + r * ratio * Math.cos(angle), y: cy + r * ratio * Math.sin(angle) };
    });
    const gridPoints = (pct: number) => PILLARS.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * pct * Math.cos(angle)},${cy + r * pct * Math.sin(angle)}`;
    }).join(" ");
    const radarPolygon = radarPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const labelOffset = 18;
    const radarLabels = PILLARS.map((p, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const lx = (cx + (r + labelOffset) * Math.cos(angle)).toFixed(1);
      const ly = (cy + (r + labelOffset) * Math.sin(angle)).toFixed(1);
      const anchor = parseFloat(lx) < cx - 5 ? "end" : parseFloat(lx) > cx + 5 ? "start" : "middle";
      return `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" font-size="9" fill="#6b7280">${p.shortLabel}</text>`;
    }).join("");

    const radarSVG = `
      <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        ${[0.25, 0.5, 0.75, 1].map(pct => `<polygon points="${gridPoints(pct)}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`).join("")}
        ${PILLARS.map((_, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          return `<line x1="${cx}" y1="${cy}" x2="${(cx + r * Math.cos(angle)).toFixed(1)}" y2="${(cy + r * Math.sin(angle)).toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/>`;
        }).join("")}
        <polygon points="${radarPolygon}" fill="#E6007E" fill-opacity="0.15" stroke="#E6007E" stroke-width="2"/>
        ${radarPoints.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#E6007E"/>`).join("")}
        ${radarLabels}
      </svg>`;

    const pillarsHTML = PILLARS.map((p, i) => {
      const s = pillarScores[i];
      const c = colorScore(s);
      const insight = p.insight(s);
      const barW = Math.max(s, 2);
      return `
        <div style="margin-bottom:14px;padding:12px 14px;border:1px solid #e5e7eb;border-radius:8px;border-left:4px solid ${c};page-break-inside:avoid">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <strong style="font-size:12px;color:#111827">${p.label}</strong>
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:${c}22;color:${c};font-weight:700">${labelScore(s)}</span>
              <span style="font-size:14px;font-weight:900;color:${c}">${s}/100</span>
            </div>
          </div>
          <div style="width:100%;background:#f3f4f6;border-radius:3px;height:7px;margin-bottom:8px;overflow:hidden">
            <div style="width:${barW}%;background:${c};height:7px;border-radius:3px;display:block"></div>
          </div>
          <ul style="margin:0;padding-left:14px;font-size:11px;color:#4b5563;line-height:1.8">
            ${insight.points.slice(0, 3).map(pt => `<li>${pt}</li>`).join("")}
          </ul>
        </div>`;
    }).join("");

    const html = `<!DOCTYPE html><html lang="pt-BR"><head>
      <meta charset="UTF-8"/>
      <title>Diagnostico E-commerce - ${nome}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Segoe UI',Arial,sans-serif;color:#111827;background:#fff;padding:28px 32px;font-size:13px;max-width:760px;margin:0 auto}
        @media print{@page{size:A4;margin:15mm 18mm}body{padding:0;max-width:100%}.no-break{page-break-inside:avoid}}
        h1{font-size:20px;font-weight:800;color:#E6007E;margin-bottom:2px}
        .sub{color:#6b7280;font-size:11px;margin-bottom:20px}
        .hero{display:flex;gap:16px;align-items:stretch;background:#fdf2f8;border:1px solid #fce7f3;border-radius:10px;padding:16px;margin-bottom:20px}
        .score-big{font-size:44px;font-weight:900;line-height:1;color:${colorScore(finalAvg)}}
        .label-info{font-size:10px;color:#9ca3af;margin-bottom:2px}
        .label-val{font-weight:600;color:#374151;font-size:13px;word-break:break-all}
        .section-title{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;margin:16px 0 8px}
        .two-col{display:flex;gap:20px;align-items:flex-start;margin-bottom:16px}
        .footer{margin-top:24px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:10px;color:#9ca3af;text-align:center}
        .brand{color:#E6007E;font-weight:700}
      </style>
    </head><body>
      <h1>Diagnostico de E-commerce</h1>
      <p class="sub">Gerado em ${new Date().toLocaleDateString("pt-BR")} · agenciamavi.com.br/assessment</p>

      <div class="hero">
        <div style="flex:1">
          <p class="label-info">Loja analisada</p>
          <p class="label-val">${lojaUrl || "—"}</p>
          <p class="label-info" style="margin-top:10px">Responsavel</p>
          <p class="label-val">${nome}</p>
          <p class="label-info" style="margin-top:10px">Perfil</p>
          <p style="font-weight:700;color:#E6007E;font-size:13px">${finalPersona.label}</p>
        </div>
        <div style="text-align:center;padding:0 12px">
          <div class="score-big">${finalAvg}</div>
          <div style="font-size:10px;color:#9ca3af;margin-top:2px">Score geral /100</div>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px">
            ${pillarScores.map((s, i) => `
              <div style="display:flex;align-items:center;gap:6px;font-size:9px">
                <span style="color:#6b7280;width:68px;text-align:right;white-space:nowrap">${PILLARS[i].shortLabel}</span>
                <div style="width:80px;background:#f3f4f6;border-radius:2px;height:4px;overflow:hidden">
                  <div style="width:${Math.max(s,2)}%;background:${colorScore(s)};height:4px;display:block"></div>
                </div>
                <span style="font-weight:700;color:${colorScore(s)};width:22px">${s}</span>
              </div>`).join("")}
          </div>
        </div>
      </div>

      <div class="two-col">
        <div style="flex:1">
          <p class="section-title">Mapa de maturidade (radar)</p>
          ${radarSVG}
        </div>
        <div style="flex:1">
          <p class="section-title">Resumo por dimensao</p>
          ${PILLARS.map((p, i) => {
            const s = pillarScores[i];
            const c = colorScore(s);
            return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:11px;color:#374151;flex:1">${p.shortLabel}</span>
              <div style="width:90px;background:#f3f4f6;border-radius:2px;height:6px;overflow:hidden">
                <div style="width:${Math.max(s,2)}%;background:${c};height:6px;display:block"></div>
              </div>
              <span style="font-size:11px;font-weight:800;color:${c};width:28px;text-align:right">${s}</span>
            </div>`;
          }).join("")}
        </div>
      </div>

      <p class="section-title">Diagnostico detalhado por dimensao</p>
      ${pillarsHTML}

      <div class="footer">
        Relatorio gerado por <span class="brand">MAVI Marketing Digital</span> &middot;
        Diagnostico confidencial &middot; agenciamavi.com.br &middot; ${new Date().toLocaleDateString("pt-BR")}
      </div>
    </body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    if (!w) {
      alert("Permita pop-ups para baixar o PDF.");
      URL.revokeObjectURL(url);
      return;
    }
    w.addEventListener("load", () => {
      setTimeout(() => {
        w.focus();
        w.print();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }, 300);
    });
  }

  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Registra a URL digitada mesmo que a pessoa não conclua o assessment,
    // para consulta no portal admin.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("assessment_url_submissions")
      .insert({ loja_url: lojaUrl })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error("assessment_url_submissions insert error:", error);
      });

    // Pixel: início do assessment (dispara uma única vez, aqui).
    if (typeof window !== "undefined") {
      const startEventId = `assessment-start-${Date.now()}`;
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("trackCustom", "AssessmentStart", {
          content_name: "Assessment E-commerce",
        }, { eventID: startEventId });
      }
      sendCapiEvent("AssessmentStart", startEventId);
    }

    setPhase("analyzing");
  }

  // Delay curta para o usuário ver a resposta escolhida destacada antes do
  // chat avançar — sem isso, o clique some instantaneamente e não há feedback.
  function selectAnswer(option: AnswerOption, idx: number) {
    if (isTransitioning || selectedIdx !== null) return;
    setSelectedIdx(idx);
    setTimeout(() => {
      handleAnswer(option);
      setSelectedIdx(null);
    }, 220);
  }

  function selectFaturamento(value: string, label: string, idx: number) {
    if (isTransitioning || selectedIdx !== null) return;
    setSelectedIdx(idx);
    setTimeout(() => {
      handleFaturamentoAnswer(value, label);
      setSelectedIdx(null);
    }, 220);
  }

  function handleAnswer(option: AnswerOption) {
    if (!currentQInfo || isTransitioning) return;
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
      setIsTransitioning(true);
      chainMessages(
        [
          { type: "system" as MsgType, text: "✅ Perfeito! Todas as respostas foram registradas." },
          { type: "question" as MsgType, text: "Só mais uma pergunta: qual é o faturamento mensal médio da sua loja?" },
        ],
        () => setChatPhase("faturamento")
      );
      return;
    }

    setCurrentIdx(nextIdx);
    setIsTransitioning(true);

    const next = getQuestionByIndex(nextIdx);
    if (!next) return;
    const nextPillar = PILLARS[next.pillarIndex];
    const isNewPillar = next.pillarIndex !== currentQInfo.pillarIndex;

    const queue: Array<{ type: MsgType; text: string }> = [];
    if (isNewPillar && PILLAR_TRANSITIONS[nextPillar.id]) {
      queue.push({ type: "system", text: PILLAR_TRANSITIONS[nextPillar.id] });
    }
    if (MILESTONE_MESSAGES[nextIdx]) {
      queue.push({ type: "system", text: MILESTONE_MESSAGES[nextIdx] });
    }
    queue.push({ type: "question", text: nextPillar.questions[next.questionIndex].text });

    chainMessages(queue);
  }

  function handleFaturamentoAnswer(value: string, label: string) {
    if (isTransitioning) return;
    setFaturamento(value);
    setMessages((prev) => [...prev, { type: "answer", text: label }]);
    setIsTransitioning(true);
    chainMessages(
      [{ type: "system" as MsgType, text: "Ótimo! Vou preparar seu diagnóstico completo agora. 🎯" }],
      () => setPhase("gate")
    );
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const digits = whatsapp.replace(/\D/g, "");
    const wppOk = digits.length === 10 || digits.length === 11;
    const errs: { email?: string; whatsapp?: string } = {};
    if (!emailOk) errs.email = "Digite um e-mail válido";
    if (!wppOk) errs.whatsapp = "Informe DDD + número (10 ou 11 dígitos)";
    if (Object.keys(errs).length) { setLeadErrors(errs); return; }
    setLeadErrors({});
    setIsSubmitting(true);
    try {
      const scoreMap = Object.fromEntries(PILLARS.map((p, i) => [p.id, pillarScores[i]]));
      const metaAnswer = { pillar: "meta", question: "faturamento_mensal", answer: faturamento, score: 0 };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("assessment_leads").insert({
        loja_url: lojaUrl,
        nome,
        email,
        whatsapp,
        avg_score: finalAvg,
        persona: finalPersona.label,
        scores: scoreMap,
        answers: [...allAnswers, metaAnswer],
      });
      if (error) throw error;

      // ── Pixel events ──────────────────────────────────────────────────────────
      // Lead: cadastro do formulário de desbloqueio
      if (typeof window !== "undefined") {
        // dataLayer para GTM → Facebook Pixel tag
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "assessment_lead",
          assessment_score: finalAvg,
          assessment_persona: finalPersona.label,
          email,
        });
        // fbq direto caso o pixel esteja carregado fora do GTM
        const leadEventId = `assessment-lead-${Date.now()}`;
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "Lead", {
            content_name: "Assessment E-commerce",
            value: finalAvg,
            currency: "BRL",
          }, { eventID: leadEventId });
        }
        sendCapiEvent("Lead", leadEventId, { email, phone: whatsapp, value: finalAvg });
        // Google Ads conversion
        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-743684226/GlzACMu-rJcbEILxzuIC",
            value: 1.0,
            currency: "BRL",
          });
        }
      }

      setPhase("result");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Phase: URL Input — LP 3 dobras ───────────────────────────────────────────
  if (phase === "url-input") {
    const scrollToForm = () => lpFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    const painPoints = [
      "Investe em anúncios mas não vê retorno proporcional",
      "Loja com pouco tráfego orgânico do Google",
      "Produtos sem visibilidade no Shopee ou Mercado Livre",
      "Redes sociais sem estratégia de conversão",
      "Taxa de conversão abaixo do esperado",
      "Não sabe por onde começar a melhorar",
    ];

    const pillarsLp = [
      { icon: ShoppingBag, label: "Produto & Catálogo", desc: "Fotos, copy e mix de produtos" },
      { icon: Megaphone, label: "Redes Sociais", desc: "Conteúdo e estratégia de canal" },
      { icon: Store, label: "Marketplaces", desc: "Shopee, Mercado Livre, TikTok Shop" },
      { icon: Search, label: "SEO Orgânico", desc: "Visibilidade no Google" },
      { icon: TrendingUp, label: "Tráfego Pago", desc: "Anúncios e retorno por canal" },
      { icon: DollarSign, label: "Investimento", desc: "Controle e diversificação de mídia" },
      { icon: Palette, label: "Design & CRO", desc: "Layout, mobile e conversão" },
    ];

    return (
      <div className="bg-white">
        <SEO
          title="Diagnóstico Gratuito de E-commerce — Avalie sua Loja Virtual em 5 Minutos"
          description="Descubra gratuitamente as falhas do seu e-commerce. Assessment em 7 dimensões: produtos, redes sociais, Shopee, Mercado Livre, TikTok Shop, SEO, tráfego pago e design. Score por área + pontos de melhoria. Resultado imediato."
          canonical="/assessment"
          schemaMarkup={ASSESSMENT_SCHEMA}
        />


        {/* ══════════════════════════════════════════════════════
            DOBRA 1 — HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative flex flex-col overflow-hidden bg-gray-950 lg:min-h-[640px]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0d0010] to-gray-950" />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(230,0,126,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(230,0,126,0.08) 0%, transparent 40%)" }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* Nav */}
          <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 flex-shrink-0">
            <img src={logoMavi} alt="MAVI" className="h-6 brightness-0 invert" />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs">Diagnóstico online</span>
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-10">
            <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-6 md:py-10 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-5 lg:gap-12 items-center">

                {/* Left — copy */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/40 text-primary bg-primary/10 mb-3 lg:mb-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Zap className="w-3 h-3" /> Assessment · E-commerce · Gratuito
                  </motion.span>

                  <h1 className="text-[30px] leading-[1.1] md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight mb-2.5 lg:mb-5">
                    Descubra o que está
                    <span className="block min-h-[1.1em]">
                      <CyclingTypewriter
                        phrases={[
                          "travando vendas",
                          "freando seu ROAS",
                          "custando lucro",
                          "limitando crescimento",
                        ]}
                        className="text-primary"
                        speed={36}
                        holdMs={2400}
                      />
                    </span>
                  </h1>

                  <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-4 lg:mb-10 max-w-lg">
                    Diagnóstico em <strong className="text-white">7 dimensões</strong>, resultado em <strong className="text-white">5 minutos</strong>. Saiba exatamente onde focar para crescer.
                  </p>

                  {/* Stats — só desktop; no mobile o card de captura entra logo em seguida */}
                  <div className="hidden lg:flex flex-wrap items-center gap-6">
                    {[
                      { n: "200+", label: "e-commerces analisados" },
                      { n: "7", label: "dimensões avaliadas" },
                      { n: "5min", label: "para o resultado" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl font-extrabold text-white">{s.n}</p>
                        <p className="text-xs text-white/40">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right — form card */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  ref={lpFormRef}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xl" style={{ borderTop: "4px solid #E6007E" }}>
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-5">
                        <img src={logoMavi} alt="MAVI" className="h-8 object-contain flex-shrink-0" />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">Diagnóstico de E-commerce</p>
                          <p className="text-xs text-gray-400">Resultado gratuito e imediato</p>
                        </div>
                      </div>

                      <form onSubmit={handleUrlSubmit} className="space-y-4">
                        <div>
                          <Label className="text-gray-700 text-sm flex items-center gap-2 mb-1.5">
                            <Globe className="w-3.5 h-3.5 text-primary" />
                            URL da sua loja virtual
                          </Label>
                          <Input
                            required
                            autoFocus
                            value={lojaUrl}
                            onChange={(e) => setLojaUrl(e.target.value)}
                            placeholder="https://sualoja.com.br"
                            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 focus:border-primary"
                          />
                          <p className="text-[11px] text-gray-400 mt-1">
                            Usaremos sua URL para fazer o diagnóstico
                          </p>
                        </div>

                        {/* CTA animado */}
                        <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          {/* Anel pulsante — chama atenção pro CTA sem ser infantil */}
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                            initial={{ opacity: 0.5, scale: 1 }}
                            animate={{ opacity: [0.5, 0], scale: [1, 1.06] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-xl blur-sm"
                            style={{ background: "linear-gradient(135deg, #E6007E, #ff4db8)" }}
                            animate={{ opacity: [0.4, 0.75, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <button
                            type="submit"
                            className="relative w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl py-4 transition-colors touch-manipulation overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0"
                              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
                            />
                            <Zap className="w-4 h-4" />
                            Analisar minha loja gratuitamente
                            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                              →
                            </motion.span>
                          </button>
                        </motion.div>
                      </form>

                      {/* Social proof */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium">+200 e-commerces já analisados</p>
                      </div>
                    </div>

                    {/* Garantias */}
                    <div className="bg-gray-50 border-t border-gray-100 px-7 py-3 flex flex-wrap gap-x-5 gap-y-1">
                      {["100% gratuito", "Sem cadastro", "Resultado imediato"].map((g) => (
                        <span key={g} className="flex items-center gap-1 text-[11px] text-gray-500">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Depoimento */}
                  <motion.div
                    className="mt-4 bg-white/8 border border-white/10 rounded-xl p-4 flex items-start gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <div className="flex gap-0.5 mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed">
                        "Em 5 minutos soube exatamente o que estava freando meu e-commerce. Mudei o foco e as vendas subiram 40% em 2 meses."
                      </p>
                      <p className="text-white/40 text-[10px] mt-1">Ana P. · Loja de moda feminina</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="relative z-10 flex flex-col items-center pb-6 flex-shrink-0 cursor-pointer"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            onClick={scrollToForm}
          >
            <span className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Saiba mais</span>
            <ChevronRight className="w-4 h-4 text-white/30 rotate-90" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DOBRA 2 — O QUE VOCÊ VAI DESCOBRIR
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
                Resultados reais de clientes MAVI
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Quem usou o diagnóstico<br />transformou o resultado
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">
                Veja o que acontece quando você sabe exatamente onde focar cada real investido.
              </p>
            </motion.div>

            {/* Social proof cards */}
            <div className="grid sm:grid-cols-3 gap-6 mb-14">
              {[
                {
                  segment: "E-commerce · Moda",
                  metric: "+180%",
                  metricLabel: "em vendas nos marketplaces",
                  quote: "O diagnóstico mostrou que estávamos completamente ausentes do Shopee. Em 45 dias, o canal já respondia por 30% do faturamento.",
                  role: "Gestora de e-commerce",
                  roas: "ROAS 5.2x",
                },
                {
                  segment: "E-commerce · Esportes",
                  metric: "+240%",
                  metricLabel: "de ROAS em tráfego pago",
                  quote: "Descobrimos que 70% do orçamento de anúncios estava mal alocado. Após o realinhamento, o retorno mais que dobrou.",
                  role: "Diretor Comercial",
                  roas: "ROAS 4.8x",
                },
                {
                  segment: "E-commerce · Varejo",
                  metric: "2x",
                  metricLabel: "taxa de conversão da loja",
                  quote: "Achávamos que o problema era tráfego. O assessment revelou que era o layout no mobile. Mudamos e as vendas dispararam.",
                  role: "CEO",
                  roas: "ROAS 6.1x",
                },
              ].map((c, i) => (
                <motion.div
                  key={c.segment}
                  className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    {/* Placeholder borrado — identidade preservada */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-200" style={{ filter: "blur(3px)" }} />
                      <div className="h-3 w-20 rounded bg-gray-200" style={{ filter: "blur(3px)" }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">{c.roas}</span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">{c.segment}</p>
                  <div className="mb-4">
                    <p className="text-3xl font-extrabold text-gray-900">{c.metric}</p>
                    <p className="text-xs text-gray-500">{c.metricLabel}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic flex-1">"{c.quote}"</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-[10px] text-gray-400">{c.role}</p>
                    <span className="text-[10px] text-gray-300 ml-1" style={{ filter: "blur(3px)" }}>· Cliente MAVI</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resultado preview */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-4">Preview do resultado</p>
              <div className="space-y-3">
                {[
                  { label: "Produto & Catálogo", pct: 82, color: "#16a34a" },
                  { label: "SEO Orgânico", pct: 34, color: "#dc2626" },
                  { label: "Tráfego Pago", pct: 58, color: "#d97706" },
                  { label: "Marketplaces", pct: 45, color: "#d97706" },
                  { label: "Design & CRO", pct: 71, color: "#16a34a" },
                ].map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="text-sm text-gray-600 w-36 flex-shrink-0">{bar.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: bar.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 text-right" style={{ color: bar.color }}>{bar.pct}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">Este é apenas um exemplo. Você recebe o diagnóstico real da <strong className="text-gray-700">sua loja</strong>.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DOBRA 3 — COMO FUNCIONA + CTA FINAL
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(230,0,126,0.2) 0%, transparent 60%)" }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Como funciona */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
                  Simples assim
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 leading-tight">
                  3 passos para descobrir o gargalo do seu e-commerce
                </h2>

                <div className="space-y-8">
                  {[
                    {
                      n: "01",
                      title: "Informe a URL da sua loja",
                      desc: "Digite o endereço do seu e-commerce. Usamos para personalizar as perguntas e o relatório.",
                      icon: Globe,
                    },
                    {
                      n: "02",
                      title: "Responda 21 perguntas simples",
                      desc: "Sem jargão técnico. Linguagem direta para quem está começando ou já escala — você encaixa em qualquer nível.",
                      icon: Sparkles,
                    },
                    {
                      n: "03",
                      title: "Receba o diagnóstico completo",
                      desc: "Score por área, mapa de maturidade, pontos de melhoria e próximos passos conectados aos serviços certos.",
                      icon: BarChart3,
                    },
                  ].map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={step.n}
                        className="flex gap-5"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 }}
                      >
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          {i < 2 && <div className="w-px flex-1 mt-2 bg-primary/20 min-h-[24px]" />}
                        </div>
                        <div className="pb-6">
                          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{step.n}</span>
                          <p className="text-white font-bold text-base mt-0.5 mb-1">{step.title}</p>
                          <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* CTA final */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Pronto para descobrir o que está freando suas vendas?
                    </h3>
                    <p className="text-white/50 text-sm">
                      Gratuito, imediato, sem cadastro antecipado.
                    </p>
                  </div>

                  <motion.div className="relative" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <motion.div
                      className="absolute inset-0 rounded-xl blur-md"
                      style={{ background: "linear-gradient(135deg, #E6007E, #ff4db8)" }}
                      animate={{ opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <button
                      onClick={scrollToForm}
                      className="relative w-full flex items-center justify-center gap-2 bg-primary text-white font-bold text-base rounded-xl py-4 hover:bg-primary/90 transition-colors touch-manipulation"
                    >
                      <Zap className="w-4 h-4" />
                      Começar diagnóstico gratuito
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                    </button>
                  </motion.div>

                  <div className="flex flex-col gap-2 mt-5">
                    {[
                      "Resultado em 5 minutos",
                      "Sem pedir cartão de crédito",
                      "Diagnóstico personalizado para sua loja",
                    ].map((g) => (
                      <div key={g} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                        <p className="text-white/60 text-xs">{g}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/10 flex items-start gap-3">
                    <div className="flex gap-0.5 flex-shrink-0 pt-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <div>
                      <p className="text-white/70 text-xs leading-relaxed italic">
                        "Identifiquei 3 áreas críticas que nunca teria percebido sozinha. Em 60 dias minha taxa de conversão dobrou."
                      </p>
                      <p className="text-white/35 text-[10px] mt-1">Carla M. · E-commerce de cosméticos</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SEO content — visível para crawlers, discreta para usuário */}
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 border-t border-gray-100">
          <section aria-labelledby="o-que-e">
            <h2 id="o-que-e" className="text-lg font-bold text-gray-900 mb-3">O que é um diagnóstico de e-commerce?</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Um <strong>diagnóstico de e-commerce</strong> é uma avaliação estruturada que analisa as principais dimensões de uma loja virtual para identificar falhas no desempenho, gargalos de crescimento e oportunidades inexploradas. A ferramenta da MAVI avalia <strong>7 dimensões críticas</strong> — catálogo de produtos, redes sociais, marketplaces (Shopee, Mercado Livre, TikTok Shop), SEO orgânico, tráfego pago, investimento em mídia e design — gerando um <strong>score por área e um plano de prioridades</strong>.
            </p>
          </section>
          <section aria-labelledby="faq-lp">
            <h2 id="faq-lp" className="text-lg font-bold text-gray-900 mb-4">Perguntas frequentes</h2>
            <div className="space-y-3">
              {[
                { q: "O diagnóstico é realmente gratuito?", a: "Sim, 100% gratuito. Sem cartão, sem assinatura." },
                { q: "Preciso de conhecimento técnico?", a: "Não. As perguntas usam linguagem simples. Qualquer dono de e-commerce consegue responder." },
                { q: "Quanto tempo leva?", a: "Em média 5 minutos. São 21 perguntas com opções de resposta direta." },
                { q: "O que recebo no relatório?", a: "Score por dimensão, mapa de maturidade em radar, pontos de melhoria e próximos passos." },
              ].map((item) => (
                <details key={item.q} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="px-5 py-3 cursor-pointer font-semibold text-gray-800 text-sm list-none">{item.q}</summary>
                  <p className="px-5 pb-3 text-sm text-gray-500">{item.a}</p>
                </details>
              ))}
            </div>
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

        {/* Left: Chat — conteúdo centralizado e contido */}
        <div className="flex-1 flex flex-col h-full min-w-0 bg-white overflow-hidden">
          {/* Coluna interna com max-width para não ocupar toda a tela */}
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto border-x border-gray-100">

            {/* Header */}
            <div className="flex-shrink-0 px-5 py-3.5 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-2.5">
                <img src={logoMavi} alt="MAVI" className="h-5" />
                {currentPillar && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <currentPillar.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium">{currentPillar.label}</span>
                  </div>
                )}
                <span className="text-xs text-primary font-bold tabular-nums">{progress}%</span>
              </div>
              {/* Progresso segmentado por pilar — mostra estrutura real (7 pilares), não só um número */}
              <div className="flex items-center gap-1">
                {PILLARS.map((p) => {
                  const answered = scores[p.id]?.length ?? 0;
                  const total = p.questions.length;
                  const isCurrent = currentPillar?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden"
                      title={p.label}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCurrent ? "bg-primary" : "bg-primary/70"
                        }`}
                        style={{ width: `${Math.round((answered / total) * 100)}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="min-h-full flex flex-col justify-end space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.type === "answer"
                        ? "justify-end"
                        : "justify-start items-start gap-2.5"
                    } animate-fade-in-up`}
                  >
                    {msg.type !== "answer" && (
                      <img
                        src={camilaAvatar}
                        alt="Camila"
                        className="w-7 h-7 rounded-full flex-shrink-0 object-cover mt-0.5 shadow-sm"
                      />
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.type === "answer"
                          ? "bg-primary text-white rounded-tr-sm"
                          : msg.type === "system"
                          ? "bg-primary/8 text-gray-600 rounded-tl-sm border border-primary/10"
                          : "bg-gray-100 text-gray-800 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start items-start gap-2.5 animate-fade-in-up">
                    <img
                      src={camilaAvatar}
                      alt="Camila"
                      className="w-7 h-7 rounded-full flex-shrink-0 object-cover shadow-sm"
                    />
                    <div className="px-4 py-3 rounded-2xl bg-gray-100 rounded-tl-sm">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Answer options */}
            {!isTransitioning && (
              <>
                {chatPhase === "faturamento" ? (
                  <div className="flex-shrink-0 border-t border-gray-200 px-5 pt-4 pb-5 bg-gray-50">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-full border border-primary/30 text-primary bg-primary/10 mb-3">
                      <DollarSign className="w-3 h-3" />
                      Faturamento mensal
                    </span>
                    <div className="space-y-2">
                      {[
                        { value: "ate30k", label: "Até R$ 30k/mês" },
                        { value: "30k-100k", label: "R$ 30k a R$ 100k/mês" },
                        { value: "100k-300k", label: "R$ 100k a R$ 300k/mês" },
                        { value: "300k-1M", label: "R$ 300k a R$ 1M/mês" },
                        { value: "acima1M", label: "Acima de R$ 1M/mês" },
                      ].map((opt, i) => {
                        const isSelected = selectedIdx === i;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => selectFaturamento(opt.value, opt.label, i)}
                            disabled={selectedIdx !== null}
                            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 active:scale-[0.99] touch-manipulation min-h-[44px] ${
                              isSelected
                                ? "border-primary bg-primary text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5 hover:text-gray-900"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold ${
                                isSelected
                                  ? "border-white/60 text-white"
                                  : "border-gray-300 text-gray-400"
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5" /> : String.fromCharCode(65 + i)}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : currentPillar && currentQuestion ? (
                  <div className="flex-shrink-0 border-t border-gray-200 px-5 pt-4 pb-5 bg-gray-50">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-full border border-primary/30 text-primary bg-primary/10 mb-3">
                      <currentPillar.icon className="w-3 h-3" />
                      {currentPillar.label}
                    </span>
                    <div className="space-y-2">
                      {currentQuestion.options.map((opt, i) => {
                        const isSelected = selectedIdx === i;
                        return (
                          <button
                            key={i}
                            onClick={() => selectAnswer(opt, i)}
                            disabled={selectedIdx !== null}
                            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 active:scale-[0.99] touch-manipulation min-h-[44px] ${
                              isSelected
                                ? "border-primary bg-primary text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5 hover:text-gray-900"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold ${
                                isSelected
                                  ? "border-white/60 text-white"
                                  : "border-gray-300 text-gray-400"
                              }`}
                            >
                              {isSelected ? <Check className="w-3.5 h-3.5" /> : String.fromCharCode(65 + i)}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
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
      <div className="min-h-[100dvh] bg-gray-50 text-gray-900 relative">
        <SEO
          title="Seu Diagnóstico | MAVI"
          description="Desbloqueie o diagnóstico completo do seu e-commerce."
          canonical="/assessment"
        />

        {/* ── Conteúdo do diagnóstico — borrado atrás do modal ── */}
        <div
          className="select-none pointer-events-none"
          aria-hidden="true"
          style={{ filter: "blur(6px)", opacity: 0.65 }}
        >
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <img src={logoMavi} alt="MAVI" className="h-5" />
              <span className="text-xs text-gray-400">Assessment · E-commerce</span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
            {/* Score + radar */}
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="text-4xl mb-2">{finalPersona.emoji}</div>
                <div className={`text-base font-bold mb-2 ${finalPersona.colorClass}`}>{finalPersona.label}</div>
                <div className="text-5xl font-extrabold mb-1" style={{ color: overallColor }}>
                  {finalAvg}<span className="text-2xl text-gray-300">/100</span>
                </div>
                <div className="text-xs text-gray-400">Score geral</div>
              </div>
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">Mapa de Maturidade</p>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="rgba(0,0,0,0.08)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(55,65,81,0.7)", fontSize: 11 }} />
                      <Radar name="Score" dataKey="value" stroke="#E6007E" fill="#E6007E" fillOpacity={0.15} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Pillar bars */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-4">Score por Dimensão</p>
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

            {/* Ghost insight cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PILLARS.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
                  <div className="space-y-2.5">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="h-3 bg-primary/25 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Modal fixo com formulário — compacto, sem scroll ── */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3"
          style={{ background: "rgba(249,250,251,0.75)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ borderTop: "4px solid #E6007E" }}
          >
            <div className="p-5">
              {/* Cabeçalho compacto */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-tight">Seu diagnóstico está pronto!</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Preencha para desbloquear o relatório completo</p>
                </div>
              </div>

              {/* Score teaser compacto — 1 linha */}
              <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xl">{finalPersona.emoji}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold" style={{ color: overallColor }}>{finalAvg}</span>
                  <span className="text-xs text-gray-300">/100</span>
                </div>
                <div className="w-px h-5 bg-gray-200" />
                <span className={`text-xs font-bold ${finalPersona.colorClass}`}>{finalPersona.label}</span>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                <div>
                  <Label className="text-gray-500 text-[11px] mb-1 block">Nome *</Label>
                  <Input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome"
                    className="bg-white border-gray-200 text-gray-900 h-9 text-sm touch-manipulation" />
                </div>
                <div>
                  <Label className="text-gray-500 text-[11px] mb-1 block">E-mail *</Label>
                  <Input required type="email" value={email}
                    onChange={(e) => { setEmail(e.target.value); setLeadErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="seu@email.com"
                    className={`bg-white h-9 text-sm touch-manipulation ${leadErrors.email ? "border-red-400 focus:border-red-400" : "border-gray-200"} text-gray-900`} />
                  {leadErrors.email && <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1"><span>!</span>{leadErrors.email}</p>}
                </div>
                <div>
                  <Label className="text-gray-500 text-[11px] mb-1 block">WhatsApp *</Label>
                  <Input required type="tel" value={whatsapp}
                    onChange={(e) => { setWhatsapp(e.target.value); setLeadErrors((p) => ({ ...p, whatsapp: undefined })); }}
                    placeholder="(47) 99999-9999"
                    className={`bg-white h-9 text-sm touch-manipulation ${leadErrors.whatsapp ? "border-red-400 focus:border-red-400" : "border-gray-200"} text-gray-900`} />
                  {leadErrors.whatsapp && <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1"><span>!</span>{leadErrors.whatsapp}</p>}
                </div>
                <Button type="submit" variant="hero" className="w-full min-h-[44px] touch-manipulation font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processando...</>
                  ) : (
                    <>Ver diagnóstico completo <ArrowRight className="w-4 h-4 ml-1.5" /></>
                  )}
                </Button>
                <p className="text-center text-[10px] text-gray-400">Sem spam · Seus dados são protegidos</p>
              </form>
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
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">Assessment de E-commerce</p>
              <p className="text-xs text-gray-400">
                {nome} · {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
            <motion.button
              onClick={downloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-medium hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors touch-manipulation"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              title="Baixar relatório em PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto px-4 py-8 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Autenticidade — mostra que a análise foi feita em cima dos dados reais da pessoa */}
        <motion.div
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-snug">
            Analisamos <strong className="text-gray-700">{lojaUrl.replace(/^https?:\/\//, "")}</strong>
            {" · "}{TOTAL_QUESTIONS}/{TOTAL_QUESTIONS} perguntas respondidas{" · "}
            {new Date().toLocaleDateString("pt-BR")}
          </p>
        </motion.div>

        {/* Hero: score + radar */}
        <motion.div
          className="grid lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <ScoreRing score={finalAvg} color={overallColor} />
            <div className={`text-lg font-bold mt-3 mb-2 ${finalPersona.colorClass}`}>
              {finalPersona.emoji} {finalPersona.label}
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
        </motion.div>

        {/* Dinheiro na mesa */}
        {dinheiraNaMesa > 0 && (
          <motion.div
            className="bg-gray-950 border border-gray-800 rounded-2xl px-6 py-7 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 80%, rgba(230,0,126,0.25) 0%, transparent 65%)" }} />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-semibold">
                Estimativa de Receita Não Capturada
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-primary mb-2">
                R$ {dinheiraNaMesa.toLocaleString("pt-BR")}
              </p>
              <p className="text-sm text-gray-400 mb-4">por mês — dinheiro que está na mesa</p>
              <p className="text-xs text-gray-600">
                Calculado com base no seu faturamento e score de maturidade ({finalAvg}/100). <br />
                Com as otimizações certas, esse valor pode ser capturado nos próximos 90 dias.
              </p>
            </div>
          </motion.div>
        )}

        {/* Pillar bars */}
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="text-sm font-bold w-8 text-right" style={{ color }}>{s}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-5 pt-4 border-t border-gray-100">
            A MAVI já ajudou <strong className="text-gray-600">mais de 200 lojas</strong> a evoluir exatamente nesses pontos.
          </p>
        </motion.div>

        {/* Insights por pilar */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
            Diagnóstico Detalhado — Pontos de Melhoria
          </p>

          {/* ── Destaques: Tráfego Pago + Investimento em Mídia (serviços principais MAVI) ── */}
          {(() => {
            const FEATURED_IDS = ["trafego-pago", "investimentos-midia"];
            const featured = PILLARS.map((p, i) => ({ p, i })).filter(({ p }) => FEATURED_IDS.includes(p.id));
            return (
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {featured.map(({ p, i }) => {
                  const s = pillarScores[i];
                  const insight = p.insight(s);
                  const Icon = p.icon;
                  const svc = PILLAR_SERVICE_MAP[p.id];
                  return (
                    <div key={p.id} className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary rounded-xl p-5 shadow-md relative">

                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-extrabold uppercase tracking-wide text-primary">
                          {insight.title}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {insight.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed font-medium">
                            <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      {svc && (
                        <a
                          href={`https://wa.me/5547999293541?text=${encodeURIComponent(svc.waText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-colors touch-manipulation w-full"
                        >
                          Quero resolver isso agora <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* ── Demais pilares ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.filter(p => !["trafego-pago", "investimentos-midia"].includes(p.id)).map((p) => {
              const i = PILLARS.indexOf(p);
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

        {/* ── Próximos Passos ── */}
        {(() => {
          const worst3 = [...PILLARS]
            .map((p, i) => ({ ...p, score: pillarScores[i] }))
            .sort((a, b) => a.score - b.score)
            .slice(0, 3)
            .filter((p) => PILLAR_SERVICE_MAP[p.id]);
          if (worst3.length === 0) return null;
          return (
            <div>
              <div className="text-center mb-6">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                  Próximos Passos
                </p>
                <h2 className="text-xl font-bold text-gray-900">
                  Como a MAVI pode ajudar seu e-commerce
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Com base nos seus resultados, estas são as áreas com maior potencial de crescimento:
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {worst3.map((pillar, idx) => {
                  const svc = PILLAR_SERVICE_MAP[pillar.id];
                  const Icon = pillar.icon;
                  const priorityLabel = idx === 0 ? "Prioridade Alta" : idx === 1 ? "Prioridade Média" : "Prioridade";
                  const priorityColor = idx === 0 ? "bg-red-50 text-red-700 border-red-200" : idx === 1 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-blue-50 text-blue-700 border-blue-200";
                  const borderTop = idx === 0 ? "border-t-red-500" : idx === 1 ? "border-t-yellow-500" : "border-t-blue-500";
                  return (
                    <div key={pillar.id} className={`bg-white border border-t-2 ${borderTop} border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col`}>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityColor}`}>
                          {priorityLabel}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">{svc.service}</h3>
                      <p className="text-[11px] text-primary font-semibold mb-2">{svc.tagline}</p>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{svc.description}</p>
                      <div className="flex flex-col gap-2 mt-auto">
                        <a
                          href={`https://wa.me/5547999293541?text=${encodeURIComponent(svc.waText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-colors touch-manipulation"
                        >
                          Quero saber mais <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={svc.href}
                          className="text-center text-xs text-gray-400 hover:text-primary transition-colors"
                        >
                          Ver serviço →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

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
              href={`https://wa.me/5547999293541?text=Oi%21+Fiz+o+assessment+do+meu+e-commerce+e+quero+conversar+sobre+os+pr%C3%B3ximos+passos.+Score%3A+${finalAvg}%2F100+%E2%80%94+${encodeURIComponent(finalPersona.label)}.`}
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

        {/* ── Baixar PDF ── */}
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-semibold text-gray-800">Salve seu diagnóstico em PDF</p>
            <p className="text-xs text-gray-400 mt-0.5">Baixe o relatório completo com scores e recomendações por área</p>
          </div>
          <motion.button
            onClick={downloadPDF}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors touch-manipulation whitespace-nowrap"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </motion.button>
        </motion.div>

        <p className="text-center text-xs text-gray-400 pb-8">
          <Link to="/" className="hover:text-primary transition-colors">← Voltar ao site da MAVI</Link>
          {" · "}
          <Link to="/contato" className="hover:text-primary transition-colors">Fale com a gente</Link>
        </p>
      </motion.div>
    </div>
  );
}
