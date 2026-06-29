import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { HeroBackground } from "@/components/HeroBackground";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SplitText } from "@/components/SplitText";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Microscope,
  Search,
  BarChart3,
  Target,
  Rocket,
  ChevronDown,
  ShieldCheck,
  Award,
  ArrowLeft,
  Check,
  MessageCircle,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const dores = [
  "Invisto em anúncios mas não sei se está funcionando de verdade",
  "Meu ROAS parece bom, mas o caixa não reflete",
  "Já troquei de agência duas vezes e o resultado é o mesmo",
  "Deixo na mão da agência e rezo",
];

const etapas = [
  { icon: Microscope, title: "Auditoria de Conta", desc: "Revisamos suas campanhas ativas no Meta Ads e Google Ads." },
  { icon: Search, title: "Análise de Funil", desc: "Mapeamos onde os leads entram e onde estão saindo." },
  { icon: BarChart3, title: "ROAS Real vs. Inflado", desc: "Calculamos o retorno real, sem maquiagem de métricas." },
  { icon: Target, title: "Oportunidades Ignoradas", desc: "Identificamos verba parada e canais subaproveitados." },
  { icon: Rocket, title: "Plano de 3 Ações", desc: "Você sai com 3 ações concretas para a semana seguinte." },
];

const cases = [
  { roas: "23,7×", segmento: "Resinas e Incensos", retorno: "R$ 184k", invest: "R$ 7,75k" },
  { roas: "21,7×", segmento: "Calçados", retorno: "R$ 104k", invest: "R$ 4,8k" },
  { roas: "19,7×", segmento: "Agro e Energia Solar", retorno: "R$ 62,5k", invest: "R$ 3,18k" },
  { roas: "15,0×", segmento: "Joias e Óculos", retorno: "—", invest: "—" },
  { roas: "12,1×", segmento: "Farmácia", retorno: "R$ 139k", invest: "R$ 11,5k" },
];

const faqs = [
  {
    question: "Por que é gratuito?",
    answer: "Porque é a forma da MAVI mostrar o trabalho antes de cobrar por ele. Se você não sair com pelo menos 3 ações concretas, a gente falhou.",
  },
  {
    question: "Quanto tempo dura?",
    answer: "Entre 30 e 45 minutos. Direto ao ponto, sem enrolação.",
  },
  {
    question: "Preciso ter quanto de verba em anúncios?",
    answer: "O Diagnóstico faz mais sentido para quem já investe a partir de R$ 3.000/mês em mídia. Abaixo disso, te indicamos outro caminho.",
  },
  {
    question: "Vou receber uma proposta no final?",
    answer: "Não. O foco é entregar leitura e ações. Se você quiser conversar sobre proposta depois, marcamos outra conversa.",
  },
  {
    question: "Funciona para qualquer segmento de e-commerce?",
    answer: "Sim. Já operamos varejo, moda, farma, agro, joias, beleza, indústria e serviços. Se vende online, conseguimos analisar.",
  },
];

// ---- Assessment types & data ----

type AStep =
  | "segmento"
  | "faturamento"
  | "verba"
  | "canais"
  | "dor"
  | "site"
  | "loading"
  | "lead"
  | "resultado";

const QUESTION_STEPS: AStep[] = ["segmento", "faturamento", "verba", "canais", "dor", "site"];

const segmentoOpts = [
  { emoji: "🛍️", label: "E-commerce / Varejo Online" },
  { emoji: "🏪", label: "Varejo Físico + Online" },
  { emoji: "💊", label: "Saúde e Beleza" },
  { emoji: "🏗️", label: "Indústria / B2B" },
  { emoji: "🏠", label: "Imobiliária" },
  { emoji: "🎓", label: "Infoprodutos / Serviços" },
  { emoji: "🔄", label: "Outro segmento" },
];

const faturamentoOpts = [
  { emoji: "🌱", label: "Menos de R$30k/mês" },
  { emoji: "📈", label: "R$30k a R$100k/mês" },
  { emoji: "💰", label: "R$100k a R$300k/mês" },
  { emoji: "🏆", label: "R$300k a R$1M/mês" },
  { emoji: "🔥", label: "Mais de R$1M/mês" },
];

const verbaOpts = [
  { emoji: "🚫", label: "Não invisto em tráfego" },
  { emoji: "💵", label: "Até R$3k/mês" },
  { emoji: "💳", label: "R$3k a R$15k/mês" },
  { emoji: "📊", label: "R$15k a R$50k/mês" },
  { emoji: "💸", label: "Mais de R$50k/mês" },
];

const canaisOpts = [
  { emoji: "📘", label: "Meta Ads" },
  { emoji: "🔍", label: "Google Ads" },
  { emoji: "🎵", label: "TikTok Ads" },
  { emoji: "📧", label: "E-mail Marketing" },
  { emoji: "📝", label: "SEO / Blog" },
  { emoji: "💬", label: "WhatsApp Marketing" },
  { emoji: "⭐", label: "Influenciadores" },
  { emoji: "🌿", label: "Só orgânico" },
];

const dorOpts = [
  { emoji: "❓", label: "Invisto em anúncios mas não sei se funciona de verdade" },
  { emoji: "💔", label: "Meu ROAS parece bom, mas o caixa não reflete" },
  { emoji: "🔄", label: "Já troquei de agência e o resultado é o mesmo" },
  { emoji: "📉", label: "Escalo o budget mas o ROAS despenca" },
  { emoji: "🎯", label: "Não consigo atribuir os resultados corretamente" },
];

const WA_NUMBER = "554733072030";

interface Respostas {
  segmento: string;
  faturamento: string;
  verba: string;
  canais: string[];
  dor: string;
  site: string;
  nome: string;
  whatsapp: string;
}

interface Pillar {
  label: string;
  short: string;
  score: number;
  descricao: string;
}

interface ResultadoType {
  dinheiroNaMesa: number;
  maturidade: number;
  pilares: Pillar[];
}

function calcularResultado(r: Respostas): ResultadoType {
  const fatBase: Record<string, number> = {
    "Menos de R$30k/mês": 25000,
    "R$30k a R$100k/mês": 65000,
    "R$100k a R$300k/mês": 200000,
    "R$300k a R$1M/mês": 650000,
    "Mais de R$1M/mês": 1200000,
  };
  const gapByVerba: Record<string, number> = {
    "Não invisto em tráfego": 0.42,
    "Até R$3k/mês": 0.36,
    "R$3k a R$15k/mês": 0.28,
    "R$15k a R$50k/mês": 0.22,
    "Mais de R$50k/mês": 0.18,
  };

  const fat = fatBase[r.faturamento] ?? 50000;
  const gap = gapByVerba[r.verba] ?? 0.30;
  const dinheiroNaMesa = Math.round(fat * gap + 243.17);

  const clamp = (v: number) => Math.min(9, Math.max(2, Math.round(v)));

  const verbaScore: Record<string, number> = {
    "Não invisto em tráfego": 2,
    "Até R$3k/mês": 4,
    "R$3k a R$15k/mês": 5,
    "R$15k a R$50k/mês": 6,
    "Mais de R$50k/mês": 7,
  };
  let p1 = verbaScore[r.verba] ?? 5;
  if (r.dor === "Já troquei de agência e o resultado é o mesmo") p1 -= 1;
  if (r.dor === "Não consigo atribuir os resultados corretamente") p1 -= 1;

  let p2 = 6;
  if (r.dor === "Meu ROAS parece bom, mas o caixa não reflete") p2 -= 3;
  if (r.dor === "Escalo o budget mas o ROAS despenca") p2 -= 2;
  if (r.verba === "Não invisto em tráfego") p2 -= 3;
  if (r.faturamento === "Mais de R$1M/mês") p2 += 1;

  let p3 = 4;
  if (r.dor === "Não consigo atribuir os resultados corretamente") p3 -= 2;
  if (r.canais.length >= 3) p3 += 1;
  if (r.canais.includes("Google Ads") && r.canais.includes("Meta Ads")) p3 += 1;
  if (r.verba === "Não invisto em tráfego") p3 -= 2;

  let p4 = 5;
  if (r.site && r.site.trim().length > 5) p4 += 1;
  if (r.segmento.includes("E-commerce") || r.segmento.includes("Varejo")) p4 += 1;
  if (r.dor === "Invisto em anúncios mas não sei se funciona de verdade") p4 -= 1;
  if (r.verba === "Não invisto em tráfego") p4 -= 2;

  let p5 = 3;
  if (r.canais.includes("Só orgânico")) {
    p5 = 3;
  } else if (r.verba === "Não invisto em tráfego") {
    p5 = 2;
  } else {
    p5 = Math.min(8, 2 + Math.round(r.canais.length * 1.4));
  }

  let p6 = 5;
  if (r.segmento.includes("Saúde") || r.segmento.includes("Infoprodutos")) p6 += 1;
  if (r.canais.includes("TikTok Ads")) p6 += 1;
  if (r.dor === "Invisto em anúncios mas não sei se funciona de verdade") p6 -= 1;
  if (r.canais.includes("Só orgânico")) p6 -= 1;

  const pilares: Pillar[] = [
    { label: "Estrutura de Campanhas", short: "Campanhas", score: clamp(p1), descricao: "Arquitetura das suas campanhas no Meta e Google." },
    { label: "ROAS Real", short: "ROAS Real", score: clamp(p2), descricao: "Retorno real sobre investimento, sem inflação de métricas." },
    { label: "Atribuição", short: "Atribuição", score: clamp(p3), descricao: "Capacidade de rastrear de onde cada venda veio." },
    { label: "Taxa de Conversão", short: "Conversão", score: clamp(p4), descricao: "Quanto da verba investida vira venda efetiva." },
    { label: "Cobertura de Canais", short: "Canais", score: clamp(p5), descricao: "Diversificação e presença nos canais certos." },
    { label: "Copy e Criativos", short: "Criativos", score: clamp(p6), descricao: "Qualidade e impacto das peças publicitárias." },
  ];

  const maturidade = Math.round((pilares.reduce((a, p) => a + p.score, 0) / pilares.length) * 10);

  return { dinheiroNaMesa, maturidade, pilares };
}

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function OptionCard({
  emoji,
  label,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer min-h-[90px]
        ${
          selected
            ? "border-primary bg-primary/15 text-mavi-white"
            : "border-mavi-white/10 bg-mavi-black hover:border-primary/50 hover:bg-primary/5 text-mavi-white/80"
        }`}
    >
      {selected && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
      <span className="text-2xl leading-none">{emoji}</span>
      <span className="text-xs sm:text-sm font-medium leading-tight">{label}</span>
    </button>
  );
}

export default function DiagnosticoGratuito() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Assessment state
  const [aStep, setAStep] = useState<AStep>("segmento");
  const [respostas, setRespostas] = useState<Respostas>({
    segmento: "",
    faturamento: "",
    verba: "",
    canais: [],
    dor: "",
    site: "",
    nome: "",
    whatsapp: "",
  });
  const [resultado, setResultado] = useState<ResultadoType | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [loadingData, setLoadingData] = useState([
    { subject: "Campanhas", A: 0, fullMark: 100 },
    { subject: "ROAS Real", A: 0, fullMark: 100 },
    { subject: "Atribuição", A: 0, fullMark: 100 },
    { subject: "Conversão", A: 0, fullMark: 100 },
    { subject: "Canais", A: 0, fullMark: 100 },
    { subject: "Criativos", A: 0, fullMark: 100 },
  ]);

  // Loading animation + result calculation
  useEffect(() => {
    if (aStep !== "loading") return;
    const r = calcularResultado(respostas);
    setResultado(r);
    const targets = [60, 45, 55, 50, 40, 65];
    let tick = 0;
    const total = 33;
    const interval = setInterval(() => {
      tick++;
      const eased = 1 - Math.pow(1 - Math.min(tick / total, 1), 3);
      setLoadingData((prev) =>
        prev.map((d, i) => ({ ...d, A: Math.round(targets[i] * eased) }))
      );
      if (tick >= total) {
        clearInterval(interval);
        setTimeout(() => setAStep("lead"), 700);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [aStep]);

  const scrollToForm = () => {
    document.getElementById("assessment-diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSingleSelect = (field: keyof Respostas, value: string, next: AStep) => {
    setRespostas((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => setAStep(next), 350);
  };

  const toggleCanal = (label: string) => {
    setRespostas((prev) => {
      const already = prev.canais.includes(label);
      return { ...prev, canais: already ? prev.canais.filter((c) => c !== label) : [...prev.canais, label] };
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!respostas.nome.trim() || !respostas.whatsapp.trim()) return;
    setIsSubmittingLead(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "94cfc9f9-612f-44f3-91a6-801326c23c96",
          to: "robson@agenciamavi.com.br",
          from_name: "MAVI - Assessment Diagnóstico",
          subject: `Lead Assessment: ${respostas.nome}`,
          origem: "LP /diagnostico-gratuito (assessment)",
          nome: respostas.nome,
          whatsapp: respostas.whatsapp,
          segmento: respostas.segmento,
          faturamento: respostas.faturamento,
          verba_mensal: respostas.verba,
          canais: respostas.canais.join(", "),
          dor_principal: respostas.dor,
          site: respostas.site,
          dinheiro_na_mesa: resultado ? formatBRL(resultado.dinheiroNaMesa) : "",
          nivel_maturidade: resultado ? `${resultado.maturidade}/100` : "",
        }),
      });
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("diagnostico_leads").insert({
        nome: respostas.nome,
        whatsapp: respostas.whatsapp,
        segmento: respostas.segmento,
        faturamento: respostas.faturamento,
        verba: respostas.verba,
        canais: respostas.canais.join(", "),
        dor: respostas.dor,
        site: respostas.site,
        dinheiro_na_mesa: resultado?.dinheiroNaMesa ?? 0,
        maturidade: resultado?.maturidade ?? 0,
      });
    } catch {
      toast.error("Não conseguimos registrar agora, mas seu resultado está pronto!");
    } finally {
      setIsSubmittingLead(false);
      setAStep("resultado");
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Diagnóstico Gratuito", url: "/diagnostico-gratuito" },
  ]);
  const faqSchema = generateFAQSchema(faqs);
  const schema = { "@context": "https://schema.org", "@graph": [breadcrumbSchema, faqSchema] };

  const stepIndex = QUESTION_STEPS.indexOf(aStep);
  const progressPct = stepIndex >= 0 ? ((stepIndex + 1) / QUESTION_STEPS.length) * 100 : 100;

  const waMsg = encodeURIComponent(
    `Olá! Sou ${respostas.nome}, atuo no segmento de ${respostas.segmento}. Acabei de fazer o diagnóstico no site da MAVI e quero agendar minha sessão gratuita. Minha pontuação de maturidade foi ${resultado?.maturidade ?? 0}/100.`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  const maturidadeLabel =
    (resultado?.maturidade ?? 0) < 50
      ? "Maturidade Inicial"
      : (resultado?.maturidade ?? 0) < 70
      ? "Maturidade Moderada"
      : "Maturidade Avançada";

  const maturidadeColor =
    (resultado?.maturidade ?? 0) < 50
      ? "text-red-400"
      : (resultado?.maturidade ?? 0) < 70
      ? "text-yellow-400"
      : "text-primary";

  const maturidadeMsg =
    (resultado?.maturidade ?? 0) < 50
      ? "Identificamos pontos críticos que consomem verba sem retorno. Há espaço expressivo para crescimento imediato."
      : (resultado?.maturidade ?? 0) < 70
      ? "Sua operação tem base sólida, mas existem gaps que limitam o potencial. Pequenos ajustes geram resultados expressivos."
      : "Você já tem uma operação bem estruturada. Otimizações finas podem ampliar ainda mais seus resultados.";

  return (
    <Layout>
      <SEO
        title="Diagnóstico de Growth Gratuito | MAVI Marketing Digital"
        description="Descubra onde sua verba de anúncios está sendo desperdiçada. Um estrategista da MAVI analisa sua conta ao vivo em 30 minutos — grátis e sem compromisso."
        canonical="/diagnostico-gratuito"
        schemaMarkup={schema}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-mavi-black overflow-hidden">
        <HeroBackground intensity="medium" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="container-mavi relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-accent-bar mx-auto mb-6" />
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/40 text-primary bg-primary/5">
              Diagnóstico Gratuito · 30 a 45 min
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white leading-[1.05] mb-6">
              <SplitText stagger={35} duration={700}>
                Descubra onde sua verba de anúncios está sendo desperdiçada — em 30 minutos, de graça.
              </SplitText>
            </h1>
            <p className="text-lg md:text-xl text-mavi-white/70 leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
              Um estrategista da MAVI analisa sua conta ao vivo. Sem custo. Sem enrolação. Sem proposta empurrada no final.
            </p>
            <Button size="xl" variant="hero" onClick={scrollToForm} className="animate-fade-in-up animation-delay-300">
              Quero meu Diagnóstico Gratuito
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mavi-white/60 animate-fade-in-up animation-delay-400">
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Google Premier Partner</span>
              <span className="text-mavi-white/30">·</span>
              <span>8,4× ROAS médio</span>
              <span className="text-mavi-white/30">·</span>
              <span>+500 clientes atendidos</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Você investe em anúncios. Mas sabe se está funcionando <span className="text-primary">de verdade?</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto grid gap-4">
            {dores.map((dor, i) => (
              <AnimatedSection key={dor} delay={i * 100}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-mavi-black border border-mavi-white/10">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-mavi-white/85">{dor}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={400}>
            <p className="max-w-3xl mx-auto mt-10 text-center text-lg md:text-xl text-mavi-white/70 leading-relaxed">
              A maioria dos e-commerces deixa <span className="text-primary font-semibold">30% a 50% do ROAS na mesa</span> sem saber.
              Não por falta de verba — por falta de leitura correta dos dados.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                30 minutos que podem mudar o resultado do <span className="text-primary">próximo mês</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              return (
                <AnimatedSection key={etapa.title} delay={i * 100}>
                  <div className="relative h-full p-6 rounded-xl bg-[hsl(0_0%_4%)] border border-mavi-white/10 border-t-2 border-t-primary hover:shadow-magenta transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-semibold text-primary mb-2">ETAPA {i + 1}</div>
                    <h3 className="text-lg font-bold text-mavi-white mb-2">{etapa.title}</h3>
                    <p className="text-sm text-mavi-white/65 leading-relaxed">{etapa.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                O que acontece <span className="text-primary">depois</span> do Diagnóstico MAVI
              </h2>
              <p className="text-mavi-white/60">Resultados reais de clientes — Jan a Mar 2025.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {cases.map((c, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="h-full p-6 rounded-xl bg-mavi-black border border-mavi-white/10 border-t-2 border-t-primary text-center hover:shadow-magenta transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">{c.roas}</div>
                  <div className="text-xs uppercase tracking-wider text-mavi-white/50 mb-3">ROAS</div>
                  <div className="text-sm font-semibold text-mavi-white mb-1">{c.segmento}</div>
                  {c.retorno !== "—" && (
                    <div className="text-xs text-mavi-white/60 mt-3 leading-relaxed">
                      Retorno: <span className="text-mavi-white">{c.retorno}</span><br />
                      Invest.: <span className="text-mavi-white">{c.invest}</span>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE GRATUITO */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="section-accent-bar mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                Se é grátis, <span className="text-primary">por que fazemos isso?</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <blockquote className="border-l-4 border-primary pl-6 py-2 text-xl md:text-2xl text-mavi-white/85 italic leading-relaxed">
                "O diagnóstico é gratuito porque é a nossa forma de mostrar o trabalho antes de cobrar por ele. Se você não sair com pelo menos 3 ações concretas para melhorar sua operação, a gente falhou."
              </blockquote>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {["Sem proposta empurrada", "Sem contrato", "Sem pegadinha"].map((g) => (
                  <div key={g} className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0_0%_5%)] border border-mavi-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{g}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* QUEM */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Você não vai falar com <span className="text-primary">estagiário</span>
              </h2>
              <p className="text-lg text-mavi-white/70 leading-relaxed">
                O Diagnóstico é conduzido por um estrategista sênior do time de growth da MAVI — gente que opera contas reais com verba real todo mês.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Google Premier Partner 2025",
                "Meta Business Partner",
                "Tray Diamante",
                "RD Station Partner",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2 px-4 py-2 rounded-full bg-mavi-black border border-primary/30">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-mavi-white/50 mt-6">
              +5 anos de mercado · Fundada em 2019 · Jaraguá do Sul/SC · Atende todo o Brasil
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Perguntas <span className="text-primary">frequentes</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="rounded-xl bg-[hsl(0_0%_5%)] border border-mavi-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-mavi-white/5 transition-colors"
                  >
                    <span className="font-semibold text-mavi-white">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-mavi-white/70 leading-relaxed animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ASSESSMENT INTERATIVO */}
      <section
        id="assessment-diagnostico"
        className="relative py-20 md:py-28 bg-mavi-black text-mavi-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,0,126,0.20),transparent_60%)]" />
        <div className="container-mavi relative z-10">
          <div className="max-w-2xl mx-auto">

            {/* Header — visible on question steps only */}
            {QUESTION_STEPS.includes(aStep) && (
              <div className="text-center mb-10">
                <div className="section-accent-bar mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                  Faça o <span className="text-primary">Diagnóstico Agora</span>
                </h2>
                <p className="text-mavi-white/60 text-sm">
                  Responda 6 perguntas rápidas e veja onde seu dinheiro está parado.
                </p>
              </div>
            )}

            <div className="rounded-2xl bg-[hsl(0_0%_4%)] border border-mavi-white/10 border-t-2 border-t-primary p-6 md:p-8 shadow-magenta min-h-[420px] flex flex-col">

              {/* QUESTION STEPS */}
              {QUESTION_STEPS.includes(aStep) && (
                <>
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-mavi-white/40 mb-2">
                      <span>Pergunta {stepIndex + 1} de {QUESTION_STEPS.length}</span>
                      <span>{Math.round(progressPct)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-mavi-white/10 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Back button */}
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setAStep(QUESTION_STEPS[stepIndex - 1])}
                      className="flex items-center gap-1.5 text-sm text-mavi-white/40 hover:text-mavi-white/70 mb-4 transition-colors w-fit"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  )}

                  {/* SEGMENTO */}
                  {aStep === "segmento" && (
                    <div className="flex-1">
                      <p className="text-lg font-semibold mb-5">Qual o segmento do seu negócio?</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {segmentoOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            emoji={o.emoji}
                            label={o.label}
                            selected={respostas.segmento === o.label}
                            onClick={() => handleSingleSelect("segmento", o.label, "faturamento")}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FATURAMENTO */}
                  {aStep === "faturamento" && (
                    <div className="flex-1">
                      <p className="text-lg font-semibold mb-5">Qual o faturamento mensal aproximado do seu negócio?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {faturamentoOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            emoji={o.emoji}
                            label={o.label}
                            selected={respostas.faturamento === o.label}
                            onClick={() => handleSingleSelect("faturamento", o.label, "verba")}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VERBA */}
                  {aStep === "verba" && (
                    <div className="flex-1">
                      <p className="text-lg font-semibold mb-5">Quanto você investe por mês em tráfego pago?</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {verbaOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            emoji={o.emoji}
                            label={o.label}
                            selected={respostas.verba === o.label}
                            onClick={() => handleSingleSelect("verba", o.label, "canais")}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CANAIS */}
                  {aStep === "canais" && (
                    <div className="flex-1 flex flex-col">
                      <p className="text-lg font-semibold mb-2">Quais canais de marketing você usa atualmente?</p>
                      <p className="text-sm text-mavi-white/50 mb-5">Selecione todos que se aplicam.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                        {canaisOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            emoji={o.emoji}
                            label={o.label}
                            selected={respostas.canais.includes(o.label)}
                            onClick={() => toggleCanal(o.label)}
                          />
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="hero"
                        size="lg"
                        disabled={respostas.canais.length === 0}
                        onClick={() => setAStep("dor")}
                        className="w-full mt-6"
                      >
                        Continuar
                      </Button>
                    </div>
                  )}

                  {/* DOR */}
                  {aStep === "dor" && (
                    <div className="flex-1">
                      <p className="text-lg font-semibold mb-5">Qual é o seu maior desafio de marketing hoje?</p>
                      <div className="grid grid-cols-1 gap-3">
                        {dorOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            emoji={o.emoji}
                            label={o.label}
                            selected={respostas.dor === o.label}
                            onClick={() => handleSingleSelect("dor", o.label, "site")}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SITE */}
                  {aStep === "site" && (
                    <div className="flex-1 flex flex-col">
                      <p className="text-lg font-semibold mb-2">Qual é o endereço do seu site ou loja virtual?</p>
                      <p className="text-sm text-mavi-white/50 mb-5">Opcional, mas nos ajuda a preparar sua análise.</p>
                      <div className="space-y-2 flex-1">
                        <Input
                          value={respostas.site}
                          onChange={(e) => setRespostas((prev) => ({ ...prev, site: e.target.value }))}
                          placeholder="https://sualoja.com.br"
                          className="bg-mavi-black border-mavi-white/15 text-mavi-white"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="hero"
                        size="lg"
                        onClick={() => setAStep("loading")}
                        className="w-full mt-6"
                      >
                        Analisar minha operação
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* LOADING */}
              {aStep === "loading" && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 py-4">
                  <div className="text-center">
                    <p className="text-xl font-bold mb-1">Analisando sua operação...</p>
                    <p className="text-sm text-mavi-white/50">Calculando seu índice de maturidade de performance</p>
                  </div>
                  <div className="w-full max-w-xs">
                    <ResponsiveContainer width="100%" height={220}>
                      <RadarChart data={loadingData}>
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                        />
                        <Radar
                          dataKey="A"
                          stroke="#E6005C"
                          fill="#E6005C"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-mavi-white/40">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Processando respostas...
                  </div>
                </div>
              )}

              {/* LEAD CAPTURE */}
              {aStep === "lead" && (
                <form onSubmit={handleLeadSubmit} className="flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-xl font-bold mb-2">Análise concluída!</p>
                    <p className="text-mavi-white/60 text-sm">Para revelar seu resultado personalizado, precisamos saber quem você é.</p>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <Label className="text-mavi-white">Seu nome *</Label>
                      <Input
                        required
                        value={respostas.nome}
                        onChange={(e) => setRespostas((prev) => ({ ...prev, nome: e.target.value }))}
                        placeholder="Como você se chama?"
                        className="bg-mavi-black border-mavi-white/15 text-mavi-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-mavi-white">WhatsApp *</Label>
                      <Input
                        required
                        value={respostas.whatsapp}
                        onChange={(e) => setRespostas((prev) => ({ ...prev, whatsapp: e.target.value }))}
                        placeholder="(47) 99999-9999"
                        className="bg-mavi-black border-mavi-white/15 text-mavi-white"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmittingLead}
                    className="w-full mt-6"
                  >
                    {isSubmittingLead ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando resultado...</>
                    ) : (
                      "Ver meu resultado →"
                    )}
                  </Button>
                  <p className="text-center text-xs text-mavi-white/40 mt-3">
                    Sem spam. Sem proposta empurrada.
                  </p>
                </form>
              )}

              {/* RESULTADO */}
              {aStep === "resultado" && resultado && (
                <div className="flex-1 flex flex-col gap-6">
                  {/* Header */}
                  <div className="text-center">
                    <p className="text-sm text-mavi-white/50 mb-1">Diagnóstico de {respostas.nome}</p>
                    <h3 className="text-2xl font-bold">Seu Resultado de Performance</h3>
                  </div>

                  {/* Score + Radar */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
                      <span className={`text-6xl font-extrabold leading-none ${maturidadeColor}`}>
                        {resultado.maturidade}
                      </span>
                      <span className="text-xs text-mavi-white/40 uppercase tracking-wider">de 100</span>
                      <span className={`text-xs font-semibold mt-1 ${maturidadeColor}`}>{maturidadeLabel}</span>
                    </div>
                    <div className="flex-1 w-full">
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart
                          data={resultado.pilares.map((p) => ({
                            subject: p.short,
                            A: p.score * 10,
                            fullMark: 100,
                          }))}
                        >
                          <PolarGrid stroke="rgba(255,255,255,0.08)" />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 10 }}
                          />
                          <Radar
                            dataKey="A"
                            stroke="#E6005C"
                            fill="#E6005C"
                            fillOpacity={0.25}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Interpretação */}
                  <p className="text-sm text-mavi-white/70 leading-relaxed text-center">{maturidadeMsg}</p>

                  {/* Dinheiro na mesa */}
                  <div className="rounded-xl border border-primary/30 bg-primary/8 p-5 text-center">
                    <p className="text-xs uppercase tracking-wider text-mavi-white/50 mb-1">Estimativa de receita não capturada</p>
                    <p className="text-4xl font-extrabold text-primary">{formatBRL(resultado.dinheiroNaMesa)}</p>
                    <p className="text-xs text-mavi-white/40 mt-1">por mês — dinheiro que está na mesa</p>
                  </div>

                  {/* Pillar breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {resultado.pilares.map((p) => {
                      const color =
                        p.score <= 3 ? "text-red-400" : p.score <= 6 ? "text-yellow-400" : "text-green-400";
                      return (
                        <div
                          key={p.label}
                          className="rounded-lg bg-mavi-white/5 border border-mavi-white/8 p-3"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-mavi-white/60 truncate">{p.short}</span>
                            <span className={`text-sm font-bold ${color}`}>{p.score}/10</span>
                          </div>
                          <div className="h-1 rounded-full bg-mavi-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${p.score * 10}%`, opacity: 0.7 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA WhatsApp */}
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="hero" size="lg" className="w-full gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Agendar minha sessão gratuita
                    </Button>
                  </a>
                  <p className="text-center text-xs text-mavi-white/40">
                    Um estrategista sênior da MAVI analisa sua conta ao vivo — sem compromisso.
                  </p>
                </div>
              )}
            </div>

            {aStep !== "resultado" && (
              <p className="text-center text-sm text-mavi-white/50 mt-8">
                Prefere conversar antes?{" "}
                <Link to="/contato" className="text-primary hover:underline">
                  Fale com a gente
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
