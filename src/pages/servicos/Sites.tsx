import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { 
  Globe, 
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
  Search,
  MousePointer,
  Zap,
  BarChart3,
  Smartphone,
  Target,
  TrendingUp,
  FileText,
  Code
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const problems = [
  { icon: Clock, title: "Site desatualizado?", description: "Design antigo que passa imagem de empresa amadora." },
  { icon: AlertCircle, title: "Não aparece no Google?", description: "SEO fraco que impede clientes de te encontrarem." },
  { icon: MousePointer, title: "Visitantes não convertem?", description: "Página sem estrutura de conversão perde vendas." },
  { icon: Smartphone, title: "Ruim no celular?", description: "Site que não funciona bem em mobile afasta 60% do tráfego." },
];

const features = [
  "Sites institucionais modernos e responsivos",
  "Landing pages de alta conversão",
  "SEO básico configurado",
  "Instalação de pixels e tags de rastreamento",
  "Otimização para anúncios pagos",
  "Design focado em conversão",
  "Formulários de captação integrados",
  "Velocidade de carregamento otimizada",
];

const benefits = [
  { icon: Target, title: "Foco em conversão", description: "Design e estrutura pensados para transformar visitantes em leads e clientes." },
  { icon: Search, title: "SEO configurado", description: "Estrutura otimizada para aparecer nas buscas do Google." },
  { icon: Zap, title: "Velocidade máxima", description: "Sites rápidos que não fazem o visitante desistir." },
  { icon: BarChart3, title: "Rastreamento completo", description: "Pixels e tags instalados para medir cada conversão." },
];

const pageTypes = [
  { 
    title: "Site Institucional", 
    description: "Presença digital completa para sua empresa", 
    features: ["5 a 10 páginas", "Design personalizado", "Responsivo", "SEO básico"],
    icon: Globe
  },
  { 
    title: "Landing Page", 
    description: "Página única focada em conversão", 
    features: ["Uma página", "Alta conversão", "Teste A/B", "Integração ads"],
    icon: MousePointer
  },
  { 
    title: "Site + Blog", 
    description: "Institucional com área de conteúdo", 
    features: ["Site completo", "Blog integrado", "SEO avançado", "Painel admin"],
    icon: FileText
  },
];

const process = [
  { step: "1", title: "Briefing", description: "Entendemos seu negócio e objetivos" },
  { step: "2", title: "Design", description: "Criamos o layout personalizado" },
  { step: "3", title: "Desenvolvimento", description: "Construímos o site otimizado" },
  { step: "4", title: "Entrega", description: "Publicamos e configuramos tudo" },
];

const stats = [
  { end: 150, prefix: "+", suffix: "", label: "Sites criados" },
  { end: 15, prefix: "", suffix: " dias", label: "Prazo médio" },
  { end: 85, prefix: "+", suffix: "%", label: "Taxa de conversão" },
  { end: 100, prefix: "", suffix: "%", label: "Responsivos" },
];

const faqs = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "Sites institucionais simples ficam prontos em 10 a 15 dias úteis. Landing pages em 5 a 7 dias. Projetos mais complexos com funcionalidades específicas podem levar até 30 dias."
  },
  {
    question: "O site será responsivo (funcionar em celular)?",
    answer: "Sim, todos os nossos sites são 100% responsivos e otimizados para funcionar perfeitamente em qualquer dispositivo: desktop, tablet e smartphone."
  },
  {
    question: "Vocês fazem a hospedagem do site?",
    answer: "Podemos hospedar em sua infraestrutura existente ou recomendar e configurar a hospedagem ideal para seu projeto. Também oferecemos planos de manutenção com hospedagem inclusa."
  },
  {
    question: "O que está incluso no SEO básico?",
    answer: "Inclui: estrutura de headings otimizada, meta tags, sitemap, velocidade de carregamento, imagens otimizadas, schema markup básico e configuração do Google Search Console."
  },
  {
    question: "Posso atualizar o conteúdo depois?",
    answer: "Sim, entregamos o site com painel administrativo onde você pode atualizar textos, imagens e publicar novos conteúdos sem precisar de conhecimento técnico."
  },
];

export default function ServicoSites() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Sites e Landing Pages</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Sites que{" "}
              <span className="text-primary">convertem visitantes em clientes</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Páginas pensadas para converter. Sites institucionais profissionais e landing pages 
              otimizadas para suas campanhas de mídia paga.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero criar meu site</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/servicos/performance">
                  Preciso de tráfego pago
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
          title="Reconhece algum desses problemas?"
          subtitle="Se você enfrenta alguma dessas situações, podemos ajudar."
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

      {/* Page Types */}
      <Section variant="gray">
        <SectionHeader
          title="Tipos de projeto"
          subtitle="Escolha a solução ideal para o seu negócio."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {pageTypes.map((type, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors card-glow">
              <type.icon className="w-12 h-12 text-primary mb-4 icon-hover" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
              <p className="text-muted-foreground mb-4">{type.description}</p>
              <ul className="space-y-2">
                {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader
          title="Como trabalhamos"
          subtitle="Processo simples e transparente do início ao fim."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
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
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Design e desenvolvimento focados em resultado."
              centered={false}
              light
            />
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-mavi-white/80">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-mavi-white mb-6">Benefícios para o seu negócio</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-mavi-white/5 border border-mavi-white/10 hover:border-primary/30 transition-colors card-glow">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary icon-hover" />
                </div>
                <div>
                  <h4 className="font-semibold text-mavi-white mb-1">{benefit.title}</h4>
                  <p className="text-sm text-mavi-white/60">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Integration with Ads */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Integração completa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sites prontos para suas campanhas
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Todos os nossos sites já são entregues com pixels e tags configurados, 
              prontos para receber tráfego de campanhas de Meta Ads e Google Ads 
              com rastreamento completo de conversões.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Pixel do Facebook/Meta instalado",
                "Google Analytics 4 configurado",
                "Google Tag Manager implementado",
                "Eventos de conversão configurados",
                "Integração com CRM (opcional)"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contato">Criar meu site otimizado</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/servicos/performance">
                  Ver serviço de Performance
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <Code className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-foreground mb-4">Tecnologias modernas</h3>
            <p className="text-muted-foreground mb-6">
              Usamos as tecnologias mais modernas do mercado para garantir 
              velocidade, segurança e facilidade de manutenção.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="font-semibold text-foreground">WordPress</p>
                <p className="text-sm text-muted-foreground">Sites dinâmicos</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="font-semibold text-foreground">React</p>
                <p className="text-sm text-muted-foreground">Landing pages</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="font-semibold text-foreground">Next.js</p>
                <p className="text-sm text-muted-foreground">Alta performance</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="font-semibold text-foreground">Tailwind</p>
                <p className="text-sm text-muted-foreground">Design moderno</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre criação de sites."
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
            Precisa de um site ou landing page?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta personalizada para o seu projeto. 
            Sites a partir de 15 dias úteis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/servicos">Ver outros serviços</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
