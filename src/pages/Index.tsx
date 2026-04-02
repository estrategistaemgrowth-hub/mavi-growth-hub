import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LogoCarousel } from "@/components/LogoCarousel";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection, AnimatedChildren } from "@/components/AnimatedSection";
import { SEO, generateBreadcrumbSchema, generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema } from "@/components/SEO";
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Store,
  Globe,
  Bot,
  BarChart3,
  Target,
  Zap,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Blocks,
  Star,
  Sparkles,
  Award,
} from "lucide-react";

const services = [
  {
    title: "E-commerce e Lojas Virtuais",
    description: "Criação, implantação e otimização de lojas virtuais com foco em vendas, especialmente na plataforma Tray e integrações com outros canais.",
    icon: ShoppingCart,
    href: "/servicos/ecommerce",
  },
  {
    title: "Marketing de Performance",
    description: "Gestão de tráfego pago, funis de vendas, campanhas full funnel (Meta Ads, Google Ads) e otimização diária de resultados.",
    icon: TrendingUp,
    href: "/servicos/performance",
  },
  {
    title: "Redes Sociais e Conteúdo",
    description: "Gestão estratégica de redes sociais com criativos que vendem, planejamento de conteúdo e social media baseado em performance.",
    icon: Users,
    href: "/servicos/redes-sociais",
  },
  {
    title: "Marketplaces & ERP",
    description: "Gestão de marketplaces, cadastro de produtos, integrações com ERP e logística em canais como Mercado Livre, Magalu e Amazon.",
    icon: Store,
    href: "/servicos/marketplaces",
  },
  {
    title: "Sites e Landing Pages",
    description: "Criação de sites institucionais e páginas de captura focadas em conversão, com SEO básico e rastreamento para mídia.",
    icon: Globe,
    href: "/servicos/sites",
  },
  {
    title: "Automação & IA",
    description: "Implantação de chatbots, fluxos automatizados e integrações com CRM para escalar vendas e suporte.",
    icon: Bot,
    href: "/servicos/automacao",
  },
  {
    title: "Micro SaaS",
    description: "Sistemas sob medida para automatizar processos: gestão de leads, tarefas, clientes e dashboards integrados via API.",
    icon: Blocks,
    href: "/servicos/micro-saas",
  },
  {
    title: "CRM HUBRS",
    description: "CRM desenvolvido pela MAVI para centralizar contatos, automatizar WhatsApp, usar IA no atendimento e conectar campanhas direto no funil.",
    icon: MessageSquare,
    href: "/hubrs-crm",
    highlight: true,
  },
];

const differentials = [
  {
    title: "Especialistas em e-commerce",
    description: "Conhecimento profundo em Tray, marketplaces e operações de venda online.",
    icon: ShoppingCart,
    number: "01",
  },
  {
    title: "Metodologia de performance",
    description: "Processos validados para maximizar resultados com dados e análises constantes.",
    icon: Target,
    number: "02",
  },
  {
    title: "Integração completa",
    description: "Loja, anúncios, CRM e atendimento trabalhando juntos de forma eficiente.",
    icon: Zap,
    number: "03",
  },
  {
    title: "Linguagem de negócio",
    description: "Time que entende seus desafios e fala a língua do dono de negócio.",
    icon: MessageSquare,
    number: "04",
  },
];

const testimonials = [
  {
    quote: "A MAVI transformou nossa operação de e-commerce. Em 6 meses, triplicamos o faturamento com a combinação de tráfego pago e organização do CRM.",
    author: "Carlos S.",
    role: "CEO",
    company: "E-commerce de Tecnologia",
  },
  {
    quote: "Com a estratégia de captação da MAVI, aumentamos em 200% o volume de leads qualificados para nossos imóveis. O CRM HUBRS organizou todo nosso funil de vendas.",
    author: "Renata M.",
    role: "Diretora de Vendas",
    company: "Imobiliária Regional",
  },
  {
    quote: "A automação de agendamentos reduziu nosso no-show em 65%. Hoje temos a agenda cheia e pacientes que realmente comparecem às consultas.",
    author: "Dra. Fernanda L.",
    role: "Proprietária",
    company: "Clínica de Estética",
  },
];


export default function Index() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema, organizationSchema, webSiteSchema],
  };

  return (
    <Layout>
      <SEO
        title="Agência de Performance para E-commerce, Imobiliárias e Indústrias"
        description="Agência especializada em marketing digital para e-commerces, imobiliárias, clínicas e indústrias. Tráfego pago, CRM, automação e resultados reais. Conheça a MAVI."
        canonical="/"
        schemaMarkup={combinedSchema}
      />

      {/* ============================================================
          HERO SECTION — REDESENHADO
          ============================================================ */}
      <section className="relative min-h-screen flex items-center bg-mavi-black overflow-hidden">

        {/* Mesh dot grid */}
        <div className="absolute inset-0 bg-mesh opacity-60" />

        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-[#0a0010] to-[#150010]" />

        {/* Blob magenta — direita/topo */}
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)" }}
        />
        {/* Blob purple — esquerda/baixo */}
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(280 70% 55%) 0%, transparent 70%)" }}
        />
        {/* Linha diagonal decorativa */}
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

        <div className="container-mavi relative z-10 pt-24 pb-16">
          <div className="grid xl:grid-cols-[1fr,420px] gap-16 items-center">

            {/* LADO ESQUERDO */}
            <AnimatedSection animation="fadeInUp" className="max-w-2xl">

              {/* Badge topo */}
              <div className="badge-pill mb-6 w-fit">
                <Award className="w-4 h-4" />
                Agência premiada · Google Premier Partner 2025
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white leading-[1.1] mb-6 tracking-tight">
                Estratégias que{" "}
                <span className="gradient-text">impulsionam</span>{" "}
                negócios a novos patamares.
              </h1>

              <p className="text-lg md:text-xl text-mavi-white/65 mb-10 leading-relaxed">
                Performance para e-commerces, imobiliárias, clínicas e indústrias — com dados, tecnologia, IA e estratégias que geram resultado de verdade.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 relative z-30">
                <Button asChild variant="hero" size="xl" className="btn-glow group">
                  <Link to="/contato">
                    Quero um diagnóstico gratuito
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/hubrs-crm">Conhecer o CRM HUBRS</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-14 flex items-center gap-3 flex-wrap">
                <div className="stat-box">
                  <p className="text-2xl font-bold text-primary">
                    <AnimatedCounter end={5} prefix="+" duration={1500} />
                  </p>
                  <p className="text-xs text-mavi-white/50 mt-0.5">Anos de mercado</p>
                </div>
                <div className="w-px h-10 bg-mavi-white/10 hidden sm:block" />
                <div className="stat-box">
                  <p className="text-2xl font-bold text-primary">
                    <AnimatedCounter end={500} prefix="+" duration={2000} />
                  </p>
                  <p className="text-xs text-mavi-white/50 mt-0.5">Clientes atendidos</p>
                </div>
                <div className="w-px h-10 bg-mavi-white/10 hidden sm:block" />
                <div className="stat-box">
                  <p className="text-2xl font-bold text-primary">
                    R$<AnimatedCounter end={50} duration={2000} />M+
                  </p>
                  <p className="text-xs text-mavi-white/50 mt-0.5">Em vendas geradas</p>
                </div>
                <div className="w-px h-10 bg-mavi-white/10 hidden sm:block" />
                <div className="stat-box">
                  <p className="text-2xl font-bold text-primary">8.4x</p>
                  <p className="text-xs text-mavi-white/50 mt-0.5">ROAS médio</p>
                </div>
              </div>
            </AnimatedSection>

            {/* LADO DIREITO — Dashboard card */}
            <AnimatedSection animation="fadeInRight" delay={300} className="hidden xl:block relative z-0">
              <div className="relative animate-float">

                {/* Glow atrás do card */}
                <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                  style={{ background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)" }}
                />

                <div className="relative glass-card-dark rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors pointer-events-none">

                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="flex-1 h-5 mx-2 rounded bg-white/5 flex items-center px-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5" />
                      <span className="text-white/30 text-[10px]">dashboard.mavi.io</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Faturamento */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-xs font-medium">Faturamento Mensal</span>
                        <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">↑ +127%</span>
                      </div>
                      <p className="text-white text-xl font-bold mb-2">R$ 248.500</p>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 rounded-full animate-shimmer"
                          style={{ background: "linear-gradient(90deg, hsl(336 100% 45%), hsl(310 100% 55%))" }}
                        />
                      </div>
                    </div>

                    {/* Métricas 2 colunas */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-white/50 text-xs mb-1">ROAS</p>
                        <p className="text-2xl font-bold text-white">8.4x</p>
                        <p className="text-green-400 text-xs mt-0.5">Meta: 5x ✓</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-white/50 text-xs mb-1">Leads/dia</p>
                        <p className="text-2xl font-bold text-white">47</p>
                        <p className="text-green-400 text-xs mt-0.5">+22 vs ontem ↑</p>
                      </div>
                    </div>

                    {/* CRM HUBRS */}
                    <div className="rounded-xl p-4 border border-primary/30"
                      style={{ background: "linear-gradient(135deg, hsl(336 100% 45% / 0.12), hsl(336 100% 45% / 0.05))" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">HUBRS CRM</p>
                          <p className="text-white/50 text-xs">12 leads qualificados hoje</p>
                        </div>
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>

        {/* Linha divisória inferior decorativa */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ============================================================
          O QUE É A MAVI
          ============================================================ */}
      <Section variant="gray">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection animation="fadeInUp">
            <SectionHeader
              title="O que é a MAVI"
              subtitle="Somos uma agência de marketing digital focada em uma única coisa: fazer seu negócio vender mais."
              centered={false}
            />
            <div className="space-y-4 mb-8">
              {[
                "Estratégias criadas a partir de dados",
                "Time especialista em performance",
                "CRM e automação integrados para vender mais",
                "Parcerias com as principais plataformas do mercado",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild className="btn-glow group">
              <Link to="/sobre">
                Conheça nossa história
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedChildren className="grid grid-cols-2 gap-4">
            {[
              { icon: BarChart3, value: 5, prefix: "+", label: "Anos de experiência", suffix: "" },
              { icon: Users, value: 500, prefix: "+", label: "Clientes atendidos", suffix: "" },
              { icon: TrendingUp, value: 127, prefix: "", label: "Crescimento médio", suffix: "%" },
              { icon: Target, value: null, prefix: "", label: "ROAS médio", suffix: "", fixed: "8.4x" },
            ].map((item, index) => (
              <div key={index} className="group metric-card cursor-default">
                <div className="icon-container mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">
                  {item.fixed ? item.fixed : (
                    <AnimatedCounter
                      end={item.value!}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={1800}
                    />
                  )}
                </p>
                <p className="text-muted-foreground text-sm">{item.label}</p>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </Section>

      {/* ============================================================
          SOLUÇÕES
          ============================================================ */}
      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Soluções para o seu negócio"
            subtitle="Do planejamento à execução, oferecemos tudo que seu negócio precisa para escalar no digital."
          />
        </AnimatedSection>
        <AnimatedChildren className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </AnimatedChildren>
      </Section>

      {/* ============================================================
          POR QUE A MAVI — REDESENHADO
          ============================================================ */}
      <Section variant="dark">
        {/* Fundo com mesh no dark */}
        <div className="relative">
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

          <AnimatedSection className="relative z-10">
            <SectionHeader
              title="Por que escolher a MAVI?"
              subtitle="Não somos apenas mais uma agência. Somos parceiros estratégicos do seu crescimento."
              light
            />
          </AnimatedSection>

          <AnimatedChildren className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentials.map((item) => (
              <div
                key={item.title}
                className="group gradient-border-card p-6 rounded-2xl bg-white/4 border border-white/8 hover:bg-white/7 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Número + ícone */}
                <div className="flex items-start justify-between mb-5">
                  <div className="icon-container-lg">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-white/15 font-black text-3xl leading-none">{item.number}</span>
                </div>
                <h3 className="text-base font-semibold text-mavi-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-mavi-white/55 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </Section>

      {/* ============================================================
          CLIENTES & PARCEIROS
          ============================================================ */}
      <Section variant="gray">
        <AnimatedSection>
          <SectionHeader
            title="Clientes & Parceiros"
            subtitle="De pequenos negócios a operações com múltiplos dígitos mensais: nosso foco é sempre resultado."
          />
        </AnimatedSection>
        <LogoCarousel />
      </Section>

      {/* ============================================================
          DEPOIMENTOS — REDESENHADO
          ============================================================ */}
      <Section>
        <AnimatedSection>
          <SectionHeader
            title="O que dizem nossos clientes"
            subtitle="Resultados reais de quem confiou na MAVI para crescer."
          />
        </AnimatedSection>
        <AnimatedChildren className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </AnimatedChildren>
      </Section>

      {/* ============================================================
          CTA FINAL — REDESENHADO
          ============================================================ */}
      <Section variant="dark">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Glow decorativo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 opacity-25 blur-3xl rounded-full"
              style={{ background: "radial-gradient(circle, hsl(336 100% 45%), transparent)" }}
            />
          </div>

          <AnimatedSection className="relative z-10 text-center max-w-3xl mx-auto py-8">
            {/* Ícone decorativo */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(336 100% 45% / 0.2), hsl(336 100% 45% / 0.05))", border: "1px solid hsl(336 100% 45% / 0.3)" }}>
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-mavi-white mb-5 leading-tight">
              Pronto para destravar as{" "}
              <span className="gradient-text">vendas</span>{" "}
              do seu negócio?
            </h2>
            <p className="text-lg text-mavi-white/60 mb-10 max-w-xl mx-auto">
              Agende uma consultoria gratuita e descubra como podemos acelerar seu crescimento com estratégia, dados e tecnologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl" className="btn-glow group">
                <Link to="/contato">
                  Quero uma consultoria gratuita
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/hubrs-crm">Quero conhecer o HUBRS CRM</Link>
              </Button>
            </div>

            {/* Social proof abaixo dos botões */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-mavi-black bg-gradient-to-br from-primary/40 to-primary/10" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-mavi-white/50 text-sm">+500 negócios transformados</span>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </Layout>
  );
}
