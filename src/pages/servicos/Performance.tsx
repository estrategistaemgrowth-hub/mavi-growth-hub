import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { AnimatedCounter } from "@/components/AnimatedCounter";
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
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Marketing de Performance</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Transforme anúncios em{" "}
              <span className="text-primary">vendas reais</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Gestão de tráfego pago com foco obsessivo em resultados. Cada real investido 
              é rastreado e otimizado para maximizar seu retorno sobre investimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero um diagnóstico gratuito</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/hubrs-crm">
                  Conhecer o CRM HUBRS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-primary">
        <div className="container-mavi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter 
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl font-bold text-primary-foreground" 
                />
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <Section>
        <SectionHeader
          title="Isso soa familiar?"
          subtitle="Se você enfrenta algum desses problemas, podemos ajudar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div key={index} className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 hover:border-destructive/40 transition-colors card-glow">
              <problem.icon className="w-10 h-10 text-destructive mb-4 icon-hover" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section variant="gray">
        <SectionHeader
          title="Nossa metodologia"
          subtitle="Processo estruturado para entregar resultados consistentes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative icon-hover-glow">
                  <step.icon className="w-8 h-8 text-primary icon-hover" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features + Benefits */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Gestão completa de suas campanhas de mídia paga."
              centered={false}
            />
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg">
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-6">Benefícios para o seu negócio</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors card-glow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary icon-hover" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CRM Integration */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Integração exclusiva
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
              Conecte suas campanhas direto ao funil de vendas
            </h2>
            <p className="text-mavi-white/70 mb-6 leading-relaxed">
              Com a integração nativa do CRM HUBRS, seus leads de Meta Ads e Google Ads 
              caem automaticamente no CRM, onde você pode acompanhar cada oportunidade 
              do primeiro clique até a venda fechada.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Leads de anúncios direto no CRM",
                "Qualificação automática por IA",
                "Histórico completo de interações",
                "Automação de follow-up via WhatsApp"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-mavi-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg">
              <Link to="/hubrs-crm">
                Conhecer o CRM HUBRS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-mavi-white/5 rounded-2xl p-8 border border-mavi-white/10">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-xl bg-mavi-black/50">
                <p className="text-4xl font-bold text-primary">100%</p>
                <p className="text-mavi-white/60 text-sm">Leads rastreados</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-mavi-black/50">
                <p className="text-4xl font-bold text-primary">3x</p>
                <p className="text-mavi-white/60 text-sm">Mais conversões</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-mavi-black/50">
                <p className="text-4xl font-bold text-primary">-40%</p>
                <p className="text-mavi-white/60 text-sm">Leads perdidos</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-mavi-black/50">
                <p className="text-4xl font-bold text-primary">24/7</p>
                <p className="text-mavi-white/60 text-sm">Atendimento IA</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre o serviço de Marketing de Performance."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-4">
            Quer escalar suas vendas com tráfego pago?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Agende um diagnóstico gratuito e descubra o potencial de crescimento do seu negócio 
            com campanhas de performance bem estruturadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Agendar Diagnóstico Gratuito</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/cases">Ver cases de sucesso</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
