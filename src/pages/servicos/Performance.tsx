import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  BarChart3, 
  Zap, 
  RefreshCw,
  AlertCircle,
  DollarSign,
  Users,
  LineChart,
  Clock,
  ShieldCheck,
} from "lucide-react";

const problems = [
  { icon: DollarSign, title: "Gasta em anúncios sem saber o retorno real?", description: "Investimento sem rastreamento é dinheiro jogado fora." },
  { icon: AlertCircle, title: "Campanhas que não convertem?", description: "Criativos e segmentações que não falam com o público certo." },
  { icon: Users, title: "Leads desqualificados?", description: "Volume alto de leads que não fecham vendas." },
  { icon: Clock, title: "Falta tempo para otimizar?", description: "Campanhas abandonadas sem ajustes diários perdem performance." },
];

const process = [
  { icon: Target, title: "Diagnóstico", description: "Análise do cenário atual, metas e oportunidades de crescimento." },
  { icon: BarChart3, title: "Planejamento", description: "Definição de funis, públicos, criativos e orçamentos." },
  { icon: Zap, title: "Execução", description: "Implementação de campanhas e configuração de rastreamentos." },
  { icon: RefreshCw, title: "Otimização", description: "Análise diária e ajustes para maximizar ROAS." },
];

const features = [
  "Campanhas em Meta Ads (Facebook e Instagram)",
  "Campanhas em Google Ads (Search, Display, Shopping)",
  "Funis estruturados: topo, meio e fundo",
  "Foco em métricas reais: ROAS, CAC, ticket médio",
  "Rotina de otimização diária",
  "Conexão com CRM HUBRS para qualificação de leads",
  "Relatórios semanais e reuniões de alinhamento",
  "Criativos otimizados para conversão",
];

const benefits = [
  { icon: TrendingUp, title: "Aumento de vendas", description: "Campanhas otimizadas para gerar receita real, não métricas de vaidade." },
  { icon: LineChart, title: "Controle total", description: "Dashboards e relatórios que mostram exatamente onde seu dinheiro está indo." },
  { icon: ShieldCheck, title: "Leads qualificados", description: "Integração com CRM para garantir que leads virem clientes." },
  { icon: DollarSign, title: "ROAS otimizado", description: "Foco obsessivo em retorno sobre investimento em publicidade." },
];

const stats = [
  { end: 8.4, prefix: "", suffix: "x", label: "ROAS médio", decimals: 1 },
  { end: 50, prefix: "R$", suffix: "M+", label: "Gerenciados em mídia" },
  { end: 127, prefix: "", suffix: "%", label: "Crescimento médio" },
  { end: 500, prefix: "+", suffix: "", label: "Campanhas ativas" },
];

const faqs = [
  {
    question: "Qual investimento mínimo em mídia vocês recomendam?",
    answer: "Recomendamos um investimento mínimo de R$3.000/mês em mídia para termos margem de teste e otimização. Porém, trabalhamos com diferentes faixas de investimento dependendo do objetivo e nicho."
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Os primeiros resultados aparecem nas primeiras 2-4 semanas, mas a otimização completa de campanhas leva de 2-3 meses para atingir maturidade e máximo desempenho."
  },
  {
    question: "Vocês trabalham com quais plataformas?",
    answer: "Trabalhamos principalmente com Meta Ads (Facebook e Instagram) e Google Ads (Search, Display, Shopping e YouTube). Também podemos implementar campanhas em TikTok Ads e Pinterest Ads conforme a estratégia."
  },
  {
    question: "Como funciona o relatório de resultados?",
    answer: "Enviamos relatórios semanais com as principais métricas e realizamos reuniões quinzenais ou mensais de alinhamento para discutir resultados e próximos passos."
  },
  {
    question: "Vocês criam os criativos das campanhas?",
    answer: "Sim, nossa equipe cria os criativos (imagens e vídeos) para as campanhas. Também fazemos testes A/B constantes para descobrir o que performa melhor."
  },
];

export default function ServicoPerformance() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Marketing de Performance", url: "/servicos/performance" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Marketing de Performance - Google Ads e Meta Ads",
    description: "Gestão de tráfego pago com foco em resultados. Campanhas otimizadas para maximizar ROAS em Meta Ads e Google Ads.",
    url: "/servicos/performance",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing de Performance - Google Ads e Meta Ads"
        description="Gestão de tráfego pago com foco em resultados. Campanhas otimizadas para maximizar ROAS. ROAS médio de 8.4x. Agende diagnóstico gratuito."
        canonical="/servicos/performance"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={TrendingUp}
        badge="Marketing de Performance"
        title={<>Mídia paga cobrada por <span className="text-primary">ROAS</span>, não por impressão.</>}
        lead="Meta Ads e Google Ads operados em rotina diária. Rastreamento de receita por campanha, criativo e público. Você vê o número de venda atribuído ao real investido."
        primary={{ label: "Quero um diagnóstico gratuito", href: "/diagnostico-gratuito" }}
        secondary={{ label: "Conhecer o CRM HUBRS", href: "/hubrs-crm" }}
        stats={stats.map((s) => ({
          value: <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} decimalSeparator="." />,
          label: s.label,
        }))}
      />

      <ProblemPicker
        title="Isso soa familiar?"
        subtitle="Se algum soa familiar, vale uma conversa."
        problems={problems}
      />

      {/* Metodologia: sequência real de 4 etapas, numerada sobre uma linha */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Nossa metodologia" subtitle="Processo estruturado para entregar resultados consistentes." />
          <ol className="grid gap-x-8 border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <li key={step.title} className="relative border-b border-border py-7 lg:border-b-0">
                {/* fora do AnimatedSection: o transform dele viraria a referência do absolute */}
                <span className="absolute -top-[9px] left-0 h-4 w-4 rounded-full border-2 border-foreground bg-background" aria-hidden="true" />
                <AnimatedSection>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm font-bold tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <step.icon className="h-6 w-6 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="O que entregamos mês a mês."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Integração CRM: texto à esquerda, números num painel magenta */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              Integração exclusiva
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Conecte suas campanhas direto ao funil de vendas
            </h2>
            <p className="mb-7 mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              Com a integração nativa do CRM HUBRS, seus leads de Meta Ads e Google Ads caem automaticamente no CRM, onde você pode acompanhar cada oportunidade do primeiro clique até a venda fechada.
            </p>
            <ul className="mb-8 grid gap-3">
              {[
                "Leads de anúncios direto no CRM",
                "Qualificação automática por IA",
                "Histórico completo de interações",
                "Automação de follow-up via WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/hubrs-crm">
                Conhecer o CRM HUBRS
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/25 text-white">
              {[
                { v: "100%", l: "Leads rastreados" },
                { v: "3x", l: "Mais conversões" },
                { v: "-40%", l: "Leads perdidos" },
                { v: "24/7", l: "Atendimento IA" },
              ].map((m) => (
                <div key={m.l} className="bg-primary px-6 py-8 md:px-8 md:py-10">
                  <p className="text-4xl font-extrabold tracking-tight md:text-5xl">{m.v}</p>
                  <p className="mt-1 text-white/85">{m.l}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre o serviço de Marketing de Performance." faqs={faqs} />

      <FinalCta
        title="Quer ver quanto sua verba de mídia poderia render?"
        text="Diagnóstico gratuito: a gente olha sua conta de Ads, seu funil e te diz onde está vazando dinheiro. Sem proposta de gaveta."
        primary={{ label: "Agendar Diagnóstico Gratuito", href: "/diagnostico-gratuito" }}
        secondary={{ label: "Ver cases de sucesso", href: "/cases" }}
      />
    </Layout>
  );
}
