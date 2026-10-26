import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
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
  ShieldCheck,
  Award,
  ArrowDown,
  ArrowLeft,
  Check,
  Plus,
  MessageCircle,
  Ban,
  Banknote,
  Coins,
  CreditCard,
  Crosshair,
  Factory,
  Flame,
  GraduationCap,
  HeartCrack,
  HeartPulse,
  HelpCircle,
  Home,
  Leaf,
  Mail,
  Megaphone,
  Music2,
  PenLine,
  RefreshCw,
  Shapes,
  ShoppingBag,
  Sprout,
  Star,
  Store,
  TrendingDown,
  TrendingUp,
  Trophy,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  { icon: ShoppingBag, label: "E-commerce / Varejo Online" },
  { icon: Store, label: "Varejo Físico + Online" },
  { icon: HeartPulse, label: "Saúde e Beleza" },
  { icon: Factory, label: "Indústria / B2B" },
  { icon: Home, label: "Imobiliária" },
  { icon: GraduationCap, label: "Infoprodutos / Serviços" },
  { icon: Shapes, label: "Outro segmento" },
];

const faturamentoOpts = [
  { icon: Sprout, label: "Menos de R$30k/mês" },
  { icon: TrendingUp, label: "R$30k a R$100k/mês" },
  { icon: Wallet, label: "R$100k a R$300k/mês" },
  { icon: Trophy, label: "R$300k a R$1M/mês" },
  { icon: Flame, label: "Mais de R$1M/mês" },
];

const verbaOpts = [
  { icon: Ban, label: "Não invisto em tráfego" },
  { icon: Banknote, label: "Até R$3k/mês" },
  { icon: CreditCard, label: "R$3k a R$15k/mês" },
  { icon: BarChart3, label: "R$15k a R$50k/mês" },
  { icon: Coins, label: "Mais de R$50k/mês" },
];

const canaisOpts = [
  { icon: Megaphone, label: "Meta Ads" },
  { icon: Search, label: "Google Ads" },
  { icon: Music2, label: "TikTok Ads" },
  { icon: Mail, label: "E-mail Marketing" },
  { icon: PenLine, label: "SEO / Blog" },
  { icon: MessageCircle, label: "WhatsApp Marketing" },
  { icon: Star, label: "Influenciadores" },
  { icon: Leaf, label: "Só orgânico" },
];

const dorOpts = [
  { icon: HelpCircle, label: "Invisto em anúncios mas não sei se funciona de verdade" },
  { icon: HeartCrack, label: "Meu ROAS parece bom, mas o caixa não reflete" },
  { icon: RefreshCw, label: "Já troquei de agência e o resultado é o mesmo" },
  { icon: TrendingDown, label: "Escalo o budget mas o ROAS despenca" },
  { icon: Crosshair, label: "Não consigo atribuir os resultados corretamente" },
];

const WA_NUMBER = "5547996810630";

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
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full min-h-[60px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-[border-color,background-color,transform] duration-300 ease-out hover:translate-x-1
        ${
          selected
            ? "border-primary bg-primary/5 text-foreground"
            : "border-input bg-background text-foreground hover:border-primary hover:bg-primary/5"
        }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300 ${selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
      >
        {selected ? <Check className="h-[18px] w-[18px]" strokeWidth={2.6} aria-hidden="true" /> : <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />}
      </span>
      <span className="text-sm font-medium leading-snug sm:text-[15px]">{label}</span>
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
      ? "text-red-600"
      : (resultado?.maturidade ?? 0) < 70
      ? "text-amber-600"
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
        description="Descubra onde sua verba de anúncios está sendo desperdiçada. Um estrategista da MAVI analisa sua conta ao vivo em 30 minutos, grátis e sem compromisso."
        canonical="/diagnostico-gratuito"
        schemaMarkup={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mavi relative">
          <AnimatedSection animation="fadeInUp" className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Diagnóstico Gratuito · 30 a 45 min
            </span>
            <h1 className="mb-6 mt-6 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[3.8rem]">
              Descubra onde sua verba de anúncios está sendo desperdiçada em 30 minutos, de graça.
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Um estrategista da MAVI analisa sua conta ao vivo. Sem custo. Sem enrolação. Sem proposta empurrada no final.
            </p>
            <Button size="xl" variant="hero" onClick={scrollToForm} className="group h-auto min-h-14 w-full whitespace-normal rounded-full py-3 sm:w-auto">
              Quero meu Diagnóstico Gratuito
              <ArrowDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </Button>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 font-medium text-foreground"><Award className="h-4 w-4 text-primary" aria-hidden="true" /> Google Premier Partner</span>
              <span><b className="text-lg font-extrabold tracking-tight text-foreground">8,4×</b> ROAS médio</span>
              <span><b className="text-lg font-extrabold tracking-tight text-foreground">+500</b> clientes atendidos</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-start gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-20">
          <AnimatedSection>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Você investe em anúncios. Mas sabe se está funcionando <span className="text-primary">de verdade?</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              A maioria dos e-commerces deixa <span className="font-semibold text-primary">30% a 50% do ROAS na mesa</span> sem saber.
              Não por falta de verba, e sim por falta de leitura correta dos dados.
            </p>
          </AnimatedSection>
          <div className="border-t-2 border-foreground">
            {dores.map((dor, i) => (
              <AnimatedSection key={dor} delay={i * 100}>
                <div className="flex items-start gap-4 border-b border-border py-5">
                  <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" aria-hidden="true" />
                  <p className="text-lg font-medium text-foreground">{dor}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO: 5 etapas em sequência */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <AnimatedSection className="mb-14 max-w-3xl">
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              30 minutos que podem mudar o resultado do <span className="text-primary">próximo mês</span>
            </h2>
          </AnimatedSection>

          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
            <span className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-border md:block" aria-hidden="true" />
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              return (
                <AnimatedSection key={etapa.title} delay={i * 100}>
                  <li className="relative flex gap-4 md:block">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-4 ring-background">
                      {i + 1}
                    </span>
                    <div className="md:mt-5">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        ETAPA {i + 1}
                      </div>
                      <h3 className="mb-1.5 text-lg font-bold tracking-tight text-foreground">{etapa.title}</h3>
                      <p className="text-[15px] leading-relaxed text-muted-foreground">{etapa.desc}</p>
                    </div>
                  </li>
                </AnimatedSection>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CASES: ROAS em destaque, em linhas */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <AnimatedSection className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              O que acontece <span className="text-primary">depois</span> do Diagnóstico MAVI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Resultados reais de clientes (jan. a mar. 2025).</p>
          </AnimatedSection>

          <div className="border-t-2 border-foreground">
            {cases.map((c, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="grid grid-cols-[auto,1fr] items-center gap-x-6 gap-y-1 border-b border-border py-5 sm:grid-cols-[150px,1fr,auto] md:gap-x-10">
                  <div className="row-span-2 text-4xl font-extrabold tabular-nums tracking-tight text-primary sm:row-span-1 md:text-5xl">
                    {c.roas}
                    <span className="ml-1.5 align-middle text-xs font-semibold uppercase tracking-wider text-muted-foreground">ROAS</span>
                  </div>
                  <div className="text-lg font-bold text-foreground">{c.segmento}</div>
                  {c.retorno !== "—" && (
                    <div className="text-sm leading-relaxed text-muted-foreground sm:text-right">
                      Retorno: <span className="font-semibold text-foreground">{c.retorno}</span><br />
                      Invest.: <span className="font-semibold text-foreground">{c.invest}</span>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE GRATUITO */}
      <section className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
        <div className="container-mavi grid items-center gap-10 lg:grid-cols-[1fr,1.2fr] lg:gap-20">
          <AnimatedSection>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-balance md:text-4xl lg:text-5xl">
              Se é grátis, <span className="underline decoration-white/55 decoration-4 underline-offset-8">por que fazemos isso?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <span className="block text-7xl font-extrabold leading-[0.5] text-white/40" aria-hidden="true">&ldquo;</span>
            <blockquote className="mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
              "O diagnóstico é gratuito porque é a nossa forma de mostrar o trabalho antes de cobrar por ele. Se você não sair com pelo menos 3 ações concretas para melhorar sua operação, a gente falhou."
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Sem proposta empurrada", "Sem contrato", "Sem pegadinha"].map((g) => (
                <div key={g} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* QUEM */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
                Você não vai falar com <span className="text-primary">estagiário</span>
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                O Diagnóstico é conduzido por um estrategista sênior do time de growth da MAVI: gente que opera contas reais com verba real todo mês.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {[
                "Google Premier Partner 2025",
                "Meta Business Partner",
                "Tray Diamante",
                "RD Station Partner",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">{cert}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              +5 anos de mercado · Fundada em 2019 · Jaraguá do Sul/SC · Atende todo o Brasil
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
                Perguntas <span className="text-primary">frequentes</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="mx-auto max-w-[860px] border-t border-input">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-input">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-lg font-semibold tracking-tight text-foreground">{faq.question}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out ${isOpen ? "rotate-45 border-primary bg-primary text-white" : "border-input text-foreground"}`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-12 leading-relaxed text-muted-foreground animate-chat-pop">
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
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <div className="container-mavi relative z-10">
          <div className="mx-auto max-w-2xl">

            {/* Header: só nas perguntas */}
            {QUESTION_STEPS.includes(aStep) && (
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground md:text-4xl">
                  Faça o <span className="text-primary">Diagnóstico Agora</span>
                </h2>
                <p className="text-muted-foreground">
                  Responda 6 perguntas rápidas e veja onde seu dinheiro está parado.
                </p>
              </div>
            )}

            <div className="flex min-h-[420px] flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)] md:p-8">

              {/* QUESTION STEPS */}
              {QUESTION_STEPS.includes(aStep) && (
                <>
                  {/* Progresso: um segmento por pergunta */}
                  <div className="mb-6">
                    <div className="mb-2 flex justify-between text-xs font-semibold text-muted-foreground">
                      <span>Pergunta {stepIndex + 1} de {QUESTION_STEPS.length}</span>
                      <span className="tabular-nums text-primary">{Math.round(progressPct)}%</span>
                    </div>
                    <div className="flex gap-1.5" aria-hidden="true">
                      {QUESTION_STEPS.map((s, i) => (
                        <span
                          key={s}
                          className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= stepIndex ? "bg-primary" : "bg-border"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Back button */}
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setAStep(QUESTION_STEPS[stepIndex - 1])}
                      className="mb-4 flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  )}

                  {/* SEGMENTO */}
                  {aStep === "segmento" && (
                    <div className="flex-1 animate-chat-pop">
                      <p className="mb-5 text-xl font-bold tracking-tight text-foreground">Qual o segmento do seu negócio?</p>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {segmentoOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            icon={o.icon}
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
                    <div className="flex-1 animate-chat-pop">
                      <p className="mb-5 text-xl font-bold tracking-tight text-foreground">Qual o faturamento mensal aproximado do seu negócio?</p>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {faturamentoOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            icon={o.icon}
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
                    <div className="flex-1 animate-chat-pop">
                      <p className="mb-5 text-xl font-bold tracking-tight text-foreground">Quanto você investe por mês em tráfego pago?</p>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {verbaOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            icon={o.icon}
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
                    <div className="flex flex-1 flex-col animate-chat-pop">
                      <p className="mb-1.5 text-xl font-bold tracking-tight text-foreground">Quais canais de marketing você usa atualmente?</p>
                      <p className="mb-5 text-sm text-muted-foreground">Selecione todos que se aplicam.</p>
                      <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {canaisOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            icon={o.icon}
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
                        className="mt-6 w-full rounded-full"
                      >
                        Continuar
                      </Button>
                    </div>
                  )}

                  {/* DOR */}
                  {aStep === "dor" && (
                    <div className="flex-1 animate-chat-pop">
                      <p className="mb-5 text-xl font-bold tracking-tight text-foreground">Qual é o seu maior desafio de marketing hoje?</p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {dorOpts.map((o) => (
                          <OptionCard
                            key={o.label}
                            icon={o.icon}
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
                    <div className="flex flex-1 flex-col animate-chat-pop">
                      <p className="mb-1.5 text-xl font-bold tracking-tight text-foreground">Qual é o endereço do seu site ou loja virtual?</p>
                      <p className="mb-5 text-sm text-muted-foreground">Opcional, mas nos ajuda a preparar sua análise.</p>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={respostas.site}
                          onChange={(e) => setRespostas((prev) => ({ ...prev, site: e.target.value }))}
                          placeholder="https://sualoja.com.br"
                          className="h-12 border-input bg-background text-foreground focus-visible:ring-primary"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="hero"
                        size="lg"
                        onClick={() => setAStep("loading")}
                        className="mt-6 w-full rounded-full"
                      >
                        Analisar minha operação
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* LOADING */}
              {aStep === "loading" && (
                <div className="flex flex-1 flex-col items-center justify-center gap-6 py-4">
                  <div className="text-center">
                    <p className="mb-1 text-xl font-bold text-foreground">Analisando sua operação...</p>
                    <p className="text-sm text-muted-foreground">Calculando seu índice de maturidade de performance</p>
                  </div>
                  <div className="w-full max-w-xs">
                    <ResponsiveContainer width="100%" height={220}>
                      <RadarChart data={loadingData}>
                        <PolarGrid stroke="rgba(29,17,24,0.12)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: "rgba(29,17,24,0.65)", fontSize: 10 }}
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Processando respostas...
                  </div>
                </div>
              )}

              {/* LEAD CAPTURE */}
              {aStep === "lead" && (
                <form onSubmit={handleLeadSubmit} className="flex flex-1 flex-col animate-chat-pop">
                  <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <p className="mb-2 text-xl font-bold text-foreground">Análise concluída!</p>
                    <p className="text-sm text-muted-foreground">Para revelar seu resultado personalizado, precisamos saber quem você é.</p>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label className="font-semibold text-foreground">Seu nome *</Label>
                      <Input
                        required
                        value={respostas.nome}
                        onChange={(e) => setRespostas((prev) => ({ ...prev, nome: e.target.value }))}
                        placeholder="Como você se chama?"
                        className="h-12 border-input bg-background text-foreground focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold text-foreground">WhatsApp *</Label>
                      <Input
                        required
                        value={respostas.whatsapp}
                        onChange={(e) => setRespostas((prev) => ({ ...prev, whatsapp: e.target.value }))}
                        placeholder="(47) 99999-9999"
                        className="h-12 border-input bg-background text-foreground focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmittingLead}
                    className="mt-6 w-full rounded-full"
                  >
                    {isSubmittingLead ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando resultado...</>
                    ) : (
                      "Ver meu resultado →"
                    )}
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Sem spam. Sem proposta empurrada.
                  </p>
                </form>
              )}

              {/* RESULTADO */}
              {aStep === "resultado" && resultado && (
                <div className="flex flex-1 flex-col gap-6 animate-chat-pop">
                  {/* Header */}
                  <div className="text-center">
                    <p className="mb-1 text-sm text-muted-foreground">Diagnóstico de {respostas.nome}</p>
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground">Seu Resultado de Performance</h3>
                  </div>

                  {/* Score + Radar */}
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex min-w-[120px] flex-col items-center justify-center gap-1">
                      <span className={`text-6xl font-extrabold leading-none tabular-nums ${maturidadeColor}`}>
                        {resultado.maturidade}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">de 100</span>
                      <span className={`mt-1 text-xs font-semibold ${maturidadeColor}`}>{maturidadeLabel}</span>
                    </div>
                    <div className="w-full flex-1">
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart
                          data={resultado.pilares.map((p) => ({
                            subject: p.short,
                            A: p.score * 10,
                            fullMark: 100,
                          }))}
                        >
                          <PolarGrid stroke="rgba(29,17,24,0.12)" />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: "rgba(29,17,24,0.7)", fontSize: 10 }}
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
                  <p className="text-center text-[15px] leading-relaxed text-muted-foreground">{maturidadeMsg}</p>

                  {/* Dinheiro na mesa */}
                  <div className="rounded-xl bg-primary p-5 text-center text-white">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/85">Estimativa de receita não capturada</p>
                    <p className="text-4xl font-extrabold tabular-nums tracking-tight">{formatBRL(resultado.dinheiroNaMesa)}</p>
                    <p className="mt-1 text-xs text-white/85">por mês, dinheiro que está na mesa</p>
                  </div>

                  {/* Pillar breakdown */}
                  <div className="grid grid-cols-2 gap-x-6 border-t border-border sm:grid-cols-3">
                    {resultado.pilares.map((p) => {
                      const color =
                        p.score <= 3 ? "text-red-600" : p.score <= 6 ? "text-amber-600" : "text-green-700";
                      return (
                        <div
                          key={p.label}
                          className="border-b border-border py-3"
                        >
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="truncate text-xs font-medium text-muted-foreground">{p.short}</span>
                            <span className={`text-sm font-bold tabular-nums ${color}`}>{p.score}/10</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${p.score * 10}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA WhatsApp */}
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="hero" size="lg" className="w-full gap-2 rounded-full">
                      <MessageCircle className="w-5 h-5" />
                      Agendar minha sessão gratuita
                    </Button>
                  </a>
                  <p className="text-center text-xs text-muted-foreground">
                    Um estrategista sênior da MAVI analisa sua conta ao vivo, sem compromisso.
                  </p>
                </div>
              )}
            </div>

            {aStep !== "resultado" && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                Prefere conversar antes?{" "}
                <Link to="/contato" className="font-semibold text-primary hover:underline">
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
