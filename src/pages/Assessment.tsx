import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
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
import logoMavi from "@/assets/logo-mavi-branca.png";

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
        text: "As fotos dos seus produtos são profissionais e mostram múltiplos ângulos?",
        options: [
          { label: "Não temos fotos profissionais", score: 0 },
          { label: "Temos fotos, mas precisam melhorar", score: 33 },
          { label: "Boas fotos, mas sem consistência", score: 66 },
          { label: "Fotos profissionais e consistentes em toda a loja", score: 100 },
        ],
      },
      {
        text: "As descrições dos seus produtos são detalhadas e otimizadas para venda?",
        options: [
          { label: "Usamos a descrição do fornecedor sem editar", score: 0 },
          { label: "Temos descrições básicas, sem estratégia", score: 33 },
          { label: "Descrições completas, mas sem foco em conversão", score: 66 },
          { label: "Descrições estratégicas com SEO e gatilhos de venda", score: 100 },
        ],
      },
      {
        text: "Você monitora e atualiza seu mix de produtos com base em dados?",
        options: [
          { label: "Nunca analisamos o mix de produtos", score: 0 },
          { label: "Avaliamos raramente, sem critério", score: 33 },
          { label: "Avaliamos por vendas, mas sem curva ABC", score: 66 },
          { label: "Gestão ativa com curva ABC e dados de margem", score: 100 },
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
            "Curadoria estratégica do mix libera caixa e aumenta o ticket médio",
          ],
          cta: "Otimização de catálogo e conversão",
        };
      return {
        title: "Catálogo — Base sólida",
        points: [
          "Explore A/B test em fotos e descrições para continuar crescendo",
          "Vídeos curtos de produto aumentam engajamento e conversão",
          "Analise margem por SKU regularmente para proteger a rentabilidade",
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
        text: "Com que frequência você publica conteúdo nas redes sociais?",
        options: [
          { label: "Raramente ou nunca publicamos", score: 0 },
          { label: "Publicamos sem regularidade", score: 33 },
          { label: "Publicamos 2-3x por semana", score: 66 },
          { label: "Publicamos diariamente com calendário editorial", score: 100 },
        ],
      },
      {
        text: "Seu conteúdo é estratégico — educa, engaja E vende?",
        options: [
          { label: "Apenas postamos promoções e fotos de produto", score: 0 },
          { label: "Misturamos promoções com posts aleatórios", score: 33 },
          { label: "Temos estratégia, mas sem consistência de funil", score: 66 },
          { label: "Seguimos funil de conteúdo: topo, meio e fundo", score: 100 },
        ],
      },
      {
        text: "Você analisa métricas das redes e usa dados para ajustar a estratégia?",
        options: [
          { label: "Nunca analisamos métricas", score: 0 },
          { label: "Olhamos likes e seguidores ocasionalmente", score: 33 },
          { label: "Acompanhamos métricas, mas sem ação sobre elas", score: 66 },
          { label: "Usamos dados para ajustar a estratégia semanalmente", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Redes Sociais — Ponto crítico",
          points: [
            "Sem presença ativa, você perde alcance orgânico gratuito todo dia",
            "Conteúdo só de promoção cansa o público e derruba o alcance",
            "Sem métricas, você não sabe o que funciona e desperdiça energia",
          ],
          cta: "Gestão estratégica de redes sociais",
        };
      if (score < 70)
        return {
          title: "Redes Sociais — Há muito a ganhar",
          points: [
            "Regularidade e calendário editorial dobram o alcance orgânico",
            "Conteúdo de funil aquece a audiência antes do anúncio, reduzindo CAC",
            "Análise semanal de métricas permite otimizar sem gastar mais",
          ],
          cta: "Social media com foco em conversão",
        };
      return {
        title: "Redes Sociais — Boa base",
        points: [
          "Explore UGC (conteúdo gerado por clientes) para escalar autenticidade",
          "Integre social com tráfego pago para reduzir CPA",
          "Teste influenciadores de nicho para alcançar novos públicos",
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
        text: "Você está presente nos principais marketplaces? (Mercado Livre, Shopee, TikTok Shop)",
        options: [
          { label: "Não vendemos em nenhum marketplace", score: 0 },
          { label: "Estamos em 1 marketplace, sem gestão ativa", score: 33 },
          { label: "Estamos em 2+ marketplaces, mas sem otimização", score: 66 },
          { label: "Gerenciamos ativamente ML, Shopee e TikTok Shop", score: 100 },
        ],
      },
      {
        text: "Seus anúncios no Mercado Livre e Shopee são otimizados para aparecer nas buscas?",
        options: [
          { label: "Nunca otimizamos os anúncios", score: 0 },
          { label: "Usamos título e descrição básicos do produto", score: 33 },
          { label: "Otimizamos os principais anúncios, mas não todos", score: 66 },
          { label: "Fazemos SEO e A/B de anúncios sistematicamente", score: 100 },
        ],
      },
      {
        text: "Você usa o TikTok Shop ou Lives para vender diretamente?",
        options: [
          { label: "Não temos presença no TikTok", score: 0 },
          { label: "Temos perfil, mas não vendemos pelo TikTok", score: 33 },
          { label: "Testamos o TikTok Shop, mas sem estratégia definida", score: 66 },
          { label: "Vendemos ativamente via TikTok Shop e Lives", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Marketplaces — Canal inexplorado",
          points: [
            "Mercado Livre, Shopee e TikTok Shop somam 80%+ das compras online no Brasil",
            "Sem presença nesses canais, você perde vendas para concorrentes diretos",
            "TikTok Shop é o canal de maior crescimento do e-commerce em 2025",
          ],
          cta: "Estratégia e gestão de marketplaces",
        };
      if (score < 70)
        return {
          title: "Marketplaces — Oportunidade de escala",
          points: [
            "SEO de marketplace pode triplicar a visibilidade dos seus anúncios",
            "TikTok Shop combina conteúdo viral com venda direta — ROI elevado",
            "Gestão ativa de reputação é decisiva para o algoritmo do Mercado Livre",
          ],
          cta: "Otimização e escala em marketplaces",
        };
      return {
        title: "Marketplaces — Bem posicionado",
        points: [
          "Anúncios patrocinados nos marketplaces aceleram o giro de estoque",
          "TikTok Shop Live pode multiplicar vendas em datas especiais",
          "Avalie expansão para Amazon Brasil — crescimento acelerado",
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
        text: "Sua loja aparece no Google para buscas relevantes dos seus produtos?",
        options: [
          { label: "Não aparecemos nas buscas importantes", score: 0 },
          { label: "Aparecemos só para o nome da marca", score: 33 },
          { label: "Algum tráfego orgânico, mas poderia ser muito maior", score: 66 },
          { label: "Estratégia de SEO ativa com bom volume orgânico", score: 100 },
        ],
      },
      {
        text: "Suas páginas de produto e categoria têm títulos, meta descrições e URLs otimizadas?",
        options: [
          { label: "Nunca configuramos SEO on-page", score: 0 },
          { label: "Configuramos o básico, mas sem critério", score: 33 },
          { label: "Boas práticas, mas sem auditoria periódica", score: 66 },
          { label: "Auditamos e otimizamos continuamente todas as páginas", score: 100 },
        ],
      },
      {
        text: "Você produz conteúdo (blog, guias) para atrair tráfego orgânico?",
        options: [
          { label: "Nunca produzimos conteúdo para SEO", score: 0 },
          { label: "Temos blog, mas sem estratégia de palavras-chave", score: 33 },
          { label: "Produzimos conteúdo com alguma estratégia", score: 66 },
          {
            label: "Conteúdo baseado em pesquisa de palavra-chave e intenção de busca",
            score: 100,
          },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "SEO — Tráfego gratuito desperdiçado",
          points: [
            "Sem SEO, você paga 100% do tráfego via anúncios — para sempre",
            "Páginas sem otimização on-page não rankeiam, mesmo com bom produto",
            "Concorrentes com SEO ativo tomam seu espaço no Google gratuitamente",
          ],
          cta: "SEO para e-commerce — tráfego orgânico",
        };
      if (score < 70)
        return {
          title: "SEO — Espaço grande para crescer",
          points: [
            "Otimização on-page completa pode dobrar o tráfego orgânico em 6 meses",
            "Conteúdo estratégico reduz a dependência de verba em anúncios",
            "Auditoria técnica elimina erros que impedem o Google de indexar suas páginas",
          ],
          cta: "SEO técnico e de conteúdo para e-commerce",
        };
      return {
        title: "SEO — Canal orgânico sólido",
        points: [
          "Expanda para palavras de cauda longa para mais intenção de compra",
          "Link building estratégico aumenta autoridade e posicionamento",
          "Schema markup faz você aparecer em rich snippets no Google",
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
        text: "Você investe regularmente em tráfego pago (Meta Ads, Google Ads)?",
        options: [
          { label: "Não investimos em anúncios pagos", score: 0 },
          { label: "Investimos esporadicamente, sem estratégia", score: 33 },
          { label: "Investimos regularmente, mas sem otimização consistente", score: 66 },
          { label: "Campanhas otimizadas com metas de ROAS definidas", score: 100 },
        ],
      },
      {
        text: "Você conhece o ROAS real e o CAC das suas campanhas?",
        options: [
          { label: "Não acompanhamos essas métricas", score: 0 },
          { label: "Vemos o faturamento, mas sem saber o ROAS real", score: 33 },
          { label: "Acompanhamos ROAS, mas não CAC ou LTV", score: 66 },
          { label: "Monitoramos ROAS, CAC e LTV — e agimos sobre eles semanalmente", score: 100 },
        ],
      },
      {
        text: "Suas campanhas segmentam diferentes etapas do funil?",
        options: [
          { label: "Campanhas genéricas, sem segmentação de funil", score: 0 },
          { label: "Temos campanhas de remarketing básicas", score: 33 },
          { label: "Segmentamos topo e remarketing, mas sem granularidade", score: 66 },
          {
            label: "Funil completo: prospecção, consideração, remarketing e recuperação",
            score: 100,
          },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Tráfego Pago — Motor desligado",
          points: [
            "Sem tráfego pago estruturado, o crescimento depende só de orgânico e sorte",
            "Meta e Google Ads bem geridos têm ROAS médio de 8x no e-commerce",
            "Sem ROAS e CAC medidos, você não sabe se está lucrando ou queimando dinheiro",
          ],
          cta: "Estratégia de performance e tráfego pago",
        };
      if (score < 70)
        return {
          title: "Tráfego Pago — Verba subaproveitada",
          points: [
            "ROAS e CAC mal medidos fazem você cortar campanhas que estão lucrando",
            "Sem funil completo, compradores quentes saem sem converter",
            "Otimização semanal pode aumentar ROAS em 30-50% sem gastar mais",
          ],
          cta: "Otimização de campanhas e ROAS real",
        };
      return {
        title: "Tráfego Pago — Estrutura avançada",
        points: [
          "Explore Performance Max (Google) para maximizar cobertura de canais",
          "Teste conceitos de criativos diferentes — não só formatos",
          "TikTok Ads tem CPMs menores para e-commerces de nicho",
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
        text: "Você sabe exatamente quanto investe em cada canal de marketing por mês?",
        options: [
          { label: "Não tenho controle dos investimentos em marketing", score: 0 },
          { label: "Conheço o total, mas não por canal", score: 33 },
          { label: "Distribuo por canal, mas sem análise de retorno por canal", score: 66 },
          { label: "Dashboard com ROI por canal e otimização mensal de budget", score: 100 },
        ],
      },
      {
        text: "Você distribui o budget entre diferentes canais (não só Meta Ads)?",
        options: [
          { label: "Todo o investimento vai para um só canal", score: 0 },
          { label: "Tentamos 2 canais, mas sem estratégia de alocação", score: 33 },
          { label: "Diversificamos, mas sem análise comparada de performance", score: 66 },
          { label: "Diversificamos e rebalanceamos mensalmente por dados", score: 100 },
        ],
      },
      {
        text: "Você tem clareza do ROI total do marketing da sua loja?",
        options: [
          { label: "Nunca calculamos o ROI de marketing", score: 0 },
          { label: "Estimamos, mas sem dados precisos", score: 33 },
          { label: "Calculamos o ROI, mas com defasagem", score: 66 },
          { label: "ROI calculado em tempo real e usado nas decisões semanais", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Investimento em Mídia — Sem visibilidade",
          points: [
            "Sem controle por canal, você não sabe o que funciona ou queima verba",
            "Dependência de um canal é risco: mudança de algoritmo pode cortar suas vendas",
            "ROI desconhecido significa que crescimento é sorte, não estratégia",
          ],
          cta: "Gestão de mídia e alocação estratégica de budget",
        };
      if (score < 70)
        return {
          title: "Investimento em Mídia — Controle parcial",
          points: [
            "Análise por canal permite realocar verba do que não funciona para o que converte",
            "Diversificação reduz risco e abre públicos com custo menor",
            "ROI em tempo real muda a velocidade das suas decisões de marketing",
          ],
          cta: "Inteligência de mídia e performance",
        };
      return {
        title: "Investimento em Mídia — Gestão madura",
        points: [
          "Avalie incrementalidade dos canais para evitar canibalização",
          "Modelos de atribuição mais sofisticados aumentam a precisão do ROI",
          "Media mix modeling pode revelar alocações ótimas não óbvias nos dados",
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
        text: "O design da sua loja transmite confiança e profissionalismo?",
        options: [
          { label: "A loja parece amadora ou muito genérica", score: 0 },
          { label: "Aparência razoável, mas sem identidade de marca", score: 33 },
          { label: "Boa aparência, mas poderia ser mais profissional", score: 66 },
          { label: "Design profissional, consistente e que gera confiança", score: 100 },
        ],
      },
      {
        text: "Sua loja é otimizada para mobile e carrega rapidamente?",
        options: [
          { label: "Problemas sérios no mobile ou muito lenta para carregar", score: 0 },
          { label: "Funciona no mobile, mas com dificuldades de navegação", score: 33 },
          { label: "Mobile ok, mas com melhorias possíveis em velocidade", score: 66 },
          { label: "Experiência mobile excelente e score de performance acima de 80", score: 100 },
        ],
      },
      {
        text: "Você tem elementos de conversão ativos (urgência, prova social, CTAs claros)?",
        options: [
          { label: "Nenhum elemento de conversão estruturado", score: 0 },
          { label: "Temos CTAs, mas sem urgência ou prova social", score: 33 },
          { label: "Temos reviews e CTAs, mas sem testes de otimização", score: 66 },
          { label: "A/B tests, countdown, reviews em destaque e CTAs otimizados", score: 100 },
        ],
      },
    ],
    insight: (score) => {
      if (score < 40)
        return {
          title: "Design e Layout — Conversão comprometida",
          points: [
            "Design não profissional é a principal causa de desconfiança na hora da compra",
            "Loja lenta ou ruim no mobile perde até 70% dos visitantes antes da compra",
            "Sem urgência e prova social, a conversão pode cair pela metade",
          ],
          cta: "Design e layout de loja focado em conversão",
        };
      if (score < 70)
        return {
          title: "Design e Layout — Espaço para converter mais",
          points: [
            "Melhorias de velocidade podem aumentar conversão em até 25%",
            "Prova social bem posicionada reduz objeções no momento da compra",
            "A/B test em CTAs e layout tem um dos maiores ROIs no e-commerce",
          ],
          cta: "CRO e otimização de experiência de compra",
        };
      return {
        title: "Design e Layout — Experiência sólida",
        points: [
          "Personalização de vitrine por comportamento do usuário é o próximo nível",
          "Checkout simplificado pode reduzir abandono em 20%",
          "Brand design forte é ativo estratégico — vale investir continuamente",
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
      colorClass: "text-red-400",
    };
  if (avgScore < 50)
    return {
      label: "Loja em Crescimento",
      emoji: "🌱",
      description:
        "Sua loja tem potencial, mas pontos críticos estão travando o crescimento e custando vendas — e dinheiro — todo mês.",
      colorClass: "text-orange-400",
    };
  if (avgScore < 65)
    return {
      label: "Loja em Aceleração",
      emoji: "🚀",
      description:
        "Você já tem uma base. Os gaps identificados custam receita real. Corrigí-los é o caminho mais rápido para crescer com consistência.",
      colorClass: "text-yellow-400",
    };
  if (avgScore < 80)
    return {
      label: "Loja Consolidada",
      emoji: "⚡",
      description:
        "Sua operação é sólida. O foco agora é escalar com eficiência e fechar os gaps que ainda limitam seu teto de crescimento.",
      colorClass: "text-blue-400",
    };
  return {
    label: "Loja de Alta Performance",
    emoji: "🏆",
    description:
      "Você opera no topo. Pequenos ajustes nos pontos mais fracos podem gerar grandes saltos de resultado.",
    colorClass: "text-green-400",
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
    finalAvg >= 70 ? "#4ade80" : finalAvg >= 50 ? "#facc15" : "#f87171";

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
      <div className="min-h-screen bg-mavi-black flex flex-col items-center justify-center p-6">
        <SEO
          title="Assessment de E-commerce Gratuito | MAVI"
          description="Descubra o nível real do seu e-commerce em 7 dimensões. Diagnóstico gratuito e instantâneo."
          canonical="/assessment"
        />
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <img src={logoMavi} alt="MAVI" className="h-8 mx-auto mb-6 opacity-90" />
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/40 text-primary bg-primary/5 mb-4">
              Assessment · E-commerce
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-mavi-white leading-tight mb-3">
              Descubra o nível real<br />do seu e-commerce
            </h1>
            <p className="text-mavi-white/60 text-base leading-relaxed">
              Análise gratuita em 7 dimensões · 5 minutos · resultado imediato
            </p>
          </div>

          <form
            onSubmit={handleUrlSubmit}
            className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6 md:p-8 space-y-5"
          >
            <div className="space-y-2">
              <Label className="text-mavi-white/80 text-sm flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-primary" />
                URL da sua loja virtual
              </Label>
              <Input
                required
                autoFocus
                value={lojaUrl}
                onChange={(e) => setLojaUrl(e.target.value)}
                placeholder="https://sualoja.com.br"
                className="bg-mavi-black border-mavi-white/15 text-mavi-white placeholder:text-mavi-white/30 h-11"
              />
              <p className="text-xs text-mavi-white/35">
                Usaremos sua URL para personalizar o diagnóstico
              </p>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Analisar minha loja <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-center text-xs text-mavi-white/40">
              Gratuito · Sem compromisso · Resultado imediato
            </p>
          </form>

          <div className="mt-8 grid grid-cols-7 gap-1.5">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-xl bg-mavi-white/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-mavi-white/35" />
                  </div>
                  <span className="text-[9px] text-mavi-white/30 text-center leading-tight">
                    {p.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Analyzing ─────────────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <div className="min-h-screen bg-mavi-black flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          <img src={logoMavi} alt="MAVI" className="h-7 mx-auto mb-10 opacity-60" />
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <p className="text-mavi-white/50 text-sm mb-1">Analisando</p>
          <p className="text-mavi-white font-semibold text-base truncate max-w-xs mx-auto mb-8">
            {lojaUrl}
          </p>

          <div className="space-y-2.5 text-left max-w-xs mx-auto">
            {ANALYZING_STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  i <= analyzingStep ? "opacity-100" : "opacity-20"
                }`}
              >
                {i < analyzingStep ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : i === analyzingStep ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-mavi-white/20 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    i <= analyzingStep ? "text-mavi-white/80" : "text-mavi-white/30"
                  }`}
                >
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
      <div className="h-screen bg-mavi-black flex overflow-hidden">
        <SEO
          title="Assessment de E-commerce | MAVI"
          description="Avaliação gratuita do seu e-commerce em 7 dimensões."
          canonical="/assessment"
        />

        {/* Left: Chat */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Header */}
          <div className="flex-shrink-0 px-4 py-3.5 border-b border-mavi-white/10 bg-[hsl(0_0%_3%)]">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <img src={logoMavi} alt="MAVI" className="h-5 opacity-70" />
              <div className="flex items-center gap-3">
                <span className="text-xs text-mavi-white/40">
                  {answeredCount}/{TOTAL_QUESTIONS}
                </span>
                <div className="w-28 h-1.5 bg-mavi-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-primary font-medium">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
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
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "question"
                        ? "bg-[hsl(0_0%_9%)] text-mavi-white border border-mavi-white/10 rounded-tl-sm"
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
            <div className="flex-shrink-0 border-t border-mavi-white/10 px-4 py-4 bg-[hsl(0_0%_3%)]">
              <div className="max-w-2xl mx-auto">
                <p className="text-[11px] text-mavi-white/40 mb-2.5 flex items-center gap-1.5">
                  <currentPillar.icon className="w-3 h-3 text-primary" />
                  {currentPillar.label}
                </p>
                <div className="space-y-2">
                  {currentQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left px-4 py-2.5 rounded-xl border border-mavi-white/10 text-mavi-white/75 text-sm hover:border-primary/50 hover:bg-primary/5 hover:text-mavi-white transition-all duration-150 active:scale-[0.99]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Panel */}
        <div className="hidden lg:flex w-72 xl:w-80 flex-col bg-[hsl(220_15%_7%)] border-l border-mavi-white/10 h-full overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-mavi-white/10">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-primary">
                Self-Assessment
              </span>
              <span className="text-[10px] text-mavi-white/35">
                {new Date()
                  .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
                  .toUpperCase()}
              </span>
            </div>
            <p className="text-[11px] text-mavi-white/50">Diagnóstico de E-commerce</p>
          </div>

          <div className="p-4 border-b border-mavi-white/10 space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-mavi-white/35 mb-0.5">
                Loja
              </p>
              <p className="text-xs text-mavi-white/65 truncate">{lojaUrl}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-mavi-white/35 mb-1">
                Persona
              </p>
              {livePersona ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{livePersona.emoji}</span>
                  <span className={`text-xs font-semibold ${livePersona.colorClass}`}>
                    {livePersona.label}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-mavi-white/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs italic">Aparece ao finalizar</span>
                </div>
              )}
            </div>
          </div>

          {/* Radar */}
          <div className="p-4 border-b border-mavi-white/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-wider text-mavi-white/35">Radar</p>
              <span className="text-[10px] text-mavi-white/25">7 pilares</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radarData}
                  margin={{ top: 5, right: 15, bottom: 5, left: 15 }}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#E6007E"
                    fill="#E6007E"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scores */}
          <div className="p-4 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-mavi-white/35 mb-3">Scores</p>
            <div className="space-y-2.5">
              {PILLARS.map((p, i) => {
                const score = pillarScores[i];
                const answered = (scores[p.id]?.length ?? 0) > 0;
                return (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="text-[10px] text-mavi-white/45 w-16 flex-shrink-0 truncate">
                      {p.shortLabel}
                    </span>
                    <div className="flex-1 h-1 bg-mavi-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${score}%`,
                          background: answered ? "#E6007E" : "transparent",
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-mavi-white/35 w-4 text-right">
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
  if (phase === "gate") {
    return (
      <div className="min-h-screen bg-mavi-black text-mavi-white">
        <SEO
          title="Seu Diagnóstico | MAVI"
          description="Desbloqueie o diagnóstico completo do seu e-commerce."
          canonical="/assessment"
        />

        {/* Header */}
        <div className="bg-[hsl(220_15%_5%)] border-b border-mavi-white/10 px-4 py-3.5">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <img src={logoMavi} alt="MAVI" className="h-5 opacity-70" />
            <span className="text-xs text-mavi-white/40">
              Assessment · E-commerce · {new Date().toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          {/* Visible: overview cards */}
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-2">{finalPersona.emoji}</div>
              <div className={`text-base font-bold mb-2 ${finalPersona.colorClass}`}>
                {finalPersona.label}
              </div>
              <div className="text-5xl font-extrabold mb-1" style={{ color: overallColor }}>
                {finalAvg}
                <span className="text-2xl text-mavi-white/30">/100</span>
              </div>
              <div className="text-xs text-mavi-white/40">Score geral</div>
            </div>
            <div className="lg:col-span-2 bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-wider text-mavi-white/40 mb-3">
                Mapa de Maturidade — 7 Dimensões
              </p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={radarData}
                    margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
                  >
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#E6007E"
                      fill="#E6007E"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Visible: pillar bars */}
          <div className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-mavi-white/40 mb-4">
              Score por Dimensão
            </p>
            <div className="space-y-3.5">
              {PILLARS.map((p, i) => {
                const s = pillarScores[i];
                const color = s >= 70 ? "#4ade80" : s >= 50 ? "#facc15" : "#f87171";
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-mavi-white/65 w-36 flex-shrink-0">{p.label}</span>
                    <div className="flex-1 h-1.5 bg-mavi-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s}%`, background: color }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 text-right" style={{ color }}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked section with blurred content + form overlay */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 380 }}>
            {/* Blurred ghost content */}
            <div className="blur-sm opacity-30 pointer-events-none select-none p-1">
              <div className="grid sm:grid-cols-2 gap-4">
                {PILLARS.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-xl p-5"
                  >
                    <div className="h-4 bg-mavi-white/15 rounded w-3/4 mb-4" />
                    <div className="space-y-2.5">
                      <div className="h-3 bg-mavi-white/10 rounded w-full" />
                      <div className="h-3 bg-mavi-white/10 rounded w-5/6" />
                      <div className="h-3 bg-mavi-white/10 rounded w-4/5" />
                    </div>
                    <div className="mt-4 pt-3 border-t border-mavi-white/10">
                      <div className="h-3 bg-primary/20 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-b from-mavi-black/60 to-mavi-black/90">
              <div className="w-full max-w-md bg-[hsl(0_0%_6%)] border border-primary/25 border-t-2 border-t-primary rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold mb-1">Desbloqueie seu diagnóstico</h2>
                  <p className="text-mavi-white/55 text-sm leading-relaxed">
                    Preencha seus dados para ver o diagnóstico completo com os pontos de
                    melhoria do seu e-commerce.
                  </p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-mavi-white/65 text-xs">Nome *</Label>
                    <Input
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="bg-mavi-black border-mavi-white/15 text-mavi-white h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-mavi-white/65 text-xs">E-mail *</Label>
                    <Input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="bg-mavi-black border-mavi-white/15 text-mavi-white h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-mavi-white/65 text-xs">WhatsApp *</Label>
                    <Input
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(47) 99999-9999"
                      className="bg-mavi-black border-mavi-white/15 text-mavi-white h-9 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full mt-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        Ver diagnóstico completo{" "}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-mavi-white/30">
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
    <div className="min-h-screen bg-mavi-black text-mavi-white">
      <SEO
        title="Diagnóstico Completo do seu E-commerce | MAVI"
        description="Confira o diagnóstico completo do seu e-commerce em 7 dimensões."
        canonical="/assessment"
      />

      {/* Header */}
      <div className="bg-[hsl(220_15%_5%)] border-b border-mavi-white/10 px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <img src={logoMavi} alt="MAVI" className="h-5 opacity-80" />
          <div className="text-right">
            <p className="text-xs text-mavi-white/50">Assessment de E-commerce</p>
            <p className="text-xs text-mavi-white/30">
              {nome} · {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Hero: score + radar */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">{finalPersona.emoji}</div>
            <div className={`text-lg font-bold mb-2 ${finalPersona.colorClass}`}>
              {finalPersona.label}
            </div>
            <div
              className="text-6xl font-extrabold mb-1"
              style={{ color: overallColor }}
            >
              {finalAvg}
              <span className="text-3xl text-mavi-white/30">/100</span>
            </div>
            <div className="text-xs text-mavi-white/40 mb-4">Score geral do e-commerce</div>
            <p className="text-sm text-mavi-white/60 leading-relaxed">
              {finalPersona.description}
            </p>
          </div>

          <div className="lg:col-span-2 bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6">
            <p className="text-[10px] uppercase tracking-wider text-mavi-white/40 mb-4">
              Mapa de Maturidade — 7 Dimensões
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radarData}
                  margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#E6007E"
                    fill="#E6007E"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pillar bars */}
        <div className="bg-[hsl(0_0%_5%)] border border-mavi-white/10 rounded-2xl p-6">
          <p className="text-[10px] uppercase tracking-wider text-mavi-white/40 mb-5">
            Score por Dimensão
          </p>
          <div className="space-y-4">
            {PILLARS.map((p, i) => {
              const s = pillarScores[i];
              const color = s >= 70 ? "#4ade80" : s >= 50 ? "#facc15" : "#f87171";
              const Icon = p.icon;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-mavi-white/65 w-40 flex-shrink-0">{p.label}</span>
                  <div className="flex-1 h-2 bg-mavi-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${s}%`, background: color }}
                    />
                  </div>
                  <span className="text-sm font-bold w-8 text-right" style={{ color }}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights por pilar */}
        <div>
          <p className="text-xs uppercase tracking-wider text-mavi-white/40 mb-4">
            Diagnóstico Detalhado — Pontos de Melhoria
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const s = pillarScores[i];
              const insight = p.insight(s);
              const Icon = p.icon;
              const borderColor =
                s >= 70
                  ? "border-green-500/25"
                  : s >= 50
                  ? "border-yellow-500/25"
                  : "border-red-500/25";
              const labelColor =
                s >= 70 ? "text-green-400" : s >= 50 ? "text-yellow-400" : "text-red-400";
              return (
                <div
                  key={p.id}
                  className={`bg-[hsl(0_0%_5%)] border border-t-2 ${borderColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-xs font-bold uppercase tracking-wide ${labelColor}`}>
                      {insight.title}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {insight.points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs text-mavi-white/65 leading-relaxed"
                      >
                        <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-mavi-white/8 flex items-center gap-2">
                    <span className="text-[10px] text-mavi-white/30 uppercase tracking-wider">
                      Área de foco:
                    </span>
                    <span className="text-[10px] text-primary font-semibold">{insight.cta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Próximos passos CTA */}
        <div className="relative bg-[hsl(0_0%_4%)] border border-primary/20 border-t-2 border-t-primary rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,0,126,0.12),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Quer um plano de ação para esses resultados?
            </h2>
            <p className="text-mavi-white/60 text-sm leading-relaxed mb-6">
              Um estrategista da MAVI analisa seu diagnóstico e monta um plano personalizado
              para escalar seu e-commerce —{" "}
              <strong className="text-mavi-white">sem custo e sem compromisso.</strong>
            </p>
            <a
              href={`https://wa.me/554733072030?text=Oi%21+Fiz+o+assessment+do+meu+e-commerce+e+quero+conversar+sobre+os+pr%C3%B3ximos+passos.+Score%3A+${finalAvg}%2F100+%E2%80%94+${encodeURIComponent(finalPersona.label)}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="lg">
                Falar com um estrategista da MAVI{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-center text-xs text-mavi-white/30 mt-3">
              Sem compromisso · Sem proposta empurrada · Em até 30 minutos
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-mavi-white/30 pb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            ← Voltar ao site da MAVI
          </Link>
          {" · "}
          <Link to="/contato" className="hover:text-primary transition-colors">
            Fale com a gente
          </Link>
        </p>
      </div>
    </div>
  );
}
