import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LogoCarousel } from "@/components/LogoCarousel";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection, AnimatedChildren } from "@/components/AnimatedSection";
import { HeroOrbs } from "@/components/HeroOrbs";
import { SEO, generateBreadcrumbSchema, generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from "@/components/SEO";
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
    description: "Pare de pagar forever por ferramentas genéricas. Tenha o sistema da sua empresa: painel, automações e integrações feitos sob medida pra sua operação.",
    icon: Blocks,
    href: "/servicos/micro-saas",
    highlight: true,
  },
  {
    title: "CRM HUBRS",
    description: "CRM desenvolvido pela MAVI para centralizar contatos, automatizar WhatsApp, usar IA no atendimento e conectar campanhas direto no funil.",
    icon: MessageSquare,
    href: "/hubrs-crm",
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


const homeFaqs = [
  {
    question: "O que é a MAVI Marketing Digital?",
    answer: "A MAVI é uma agência de performance e growth marketing especializada em e-commerces, imobiliárias, clínicas e indústrias. Atuamos com tráfego pago, CRM, automação, redes sociais e desenvolvimento de Micro SaaS sob medida.",
  },
  {
    question: "Onde a MAVI está localizada?",
    answer: "Estamos em Jaraguá do Sul, SC, mas atendemos empresas em todo o Brasil de forma remota. Nosso foco é resultado, independente da localização.",
  },
  {
    question: "Quanto custa contratar a MAVI?",
    answer: "Os valores variam conforme o escopo do projeto. Oferecemos um diagnóstico gratuito onde analisamos seu negócio e apresentamos uma proposta personalizada sem compromisso.",
  },
  {
    question: "A MAVI desenvolve Micro SaaS e sistemas próprios?",
    answer: "Sim. Desenvolvemos sistemas sob medida para automatizar processos, mensurar dados de performance e substituir ferramentas genéricas por soluções 100% alinhadas ao seu negócio.",
  },
  {
    question: "Qual o prazo para ver resultados com a MAVI?",
    answer: "Resultados em tráfego pago aparecem nas primeiras semanas. Estratégias de growth marketing e SEO têm retorno mais expressivo a partir do 3º mês. Trabalhamos com metas claras desde o início.",
  },
];

export default function Index() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(homeFaqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema, organizationSchema, webSiteSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="MAVI · Performance para e-commerce, imobiliárias e indústrias"
        description="MAVI faz tráfego pago, CRM, automação e Micro SaaS para e-commerce, imobiliárias, clínicas e indústrias. Sem promessa vazia. Resultado mensurável."
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

        {/* Orbs reativos ao mouse (parallax) */}
        <HeroOrbs />

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
                Tráfego, CRM e automação{" "}
                <span className="gradient-text">pagos pelo seu ROAS</span>.
              </h1>

              <p className="text-lg md:text-xl text-mavi-white/65 mb-10 leading-relaxed">
                Operamos tráfego, CRM e automação para e-commerce, imobiliárias, clínicas e indústrias. Métrica que importa: receita atribuída por real investido.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 relative z-30">
                <Button asChild variant="hero" size="xl" className="btn-glow group">
                  <Link to="/contato">
                    Quero um diagnóstico gratuito
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/servicos/micro-saas">Ter meu próprio sistema</Link>
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

                    {/* Micro SaaS */}
                    <div className="rounded-xl p-4 border border-primary/30"
                      style={{ background: "linear-gradient(135deg, hsl(336 100% 45% / 0.12), hsl(336 100% 45% / 0.05))" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Blocks className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">Meu Sistema · MAVI</p>
                          <p className="text-white/50 text-xs">100% seu · sem mensalidade de SaaS</p>
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
          MICRO SAAS — SEÇÃO "NÃO SEJA REFÉM"
          ============================================================ */}
      <section className="relative py-20 overflow-hidden bg-mavi-black">
        {/* Gradiente e mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0020] via-mavi-black to-[#0a0010]" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        {/* Blob decorativo */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 65%)" }} />

        <div className="container-mavi relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Esquerda — copy */}
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-medium mb-6 w-fit">
                <Blocks className="w-4 h-4" />
                Micro SaaS sob medida
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mavi-white leading-[1.1] mb-6 tracking-tight">
                Pare de ser{" "}
                <span className="gradient-text">refém</span>{" "}
                de software genérico.
              </h2>
              <p className="text-lg text-mavi-white/65 mb-8 leading-relaxed">
                Cada mensalidade de ferramenta que você paga é um pedaço do seu negócio que fica nas mãos de outra empresa. A MAVI cria o <strong className="text-mavi-white/90">sistema da sua empresa</strong> — com o seu processo, suas regras, sua marca — e você fica com o ativo.
              </p>

              {/* Pills de pain points */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  "Planilha que não escala",
                  "WhatsApp sem rastreabilidade",
                  "SaaS caro e genérico",
                  "Processo na cabeça das pessoas",
                  "Integrações que não conversam",
                ].map((pain) => (
                  <span key={pain} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-mavi-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                    {pain}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl" className="btn-glow group">
                  <Link to="/servicos/micro-saas">
                    Quero meu próprio sistema
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/contato">Falar com a MAVI</Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Direita — card visual */}
            <AnimatedSection animation="fadeInRight" delay={200} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                  style={{ background: "radial-gradient(circle, hsl(336 100% 45%) 0%, transparent 70%)" }} />

                <div className="relative glass-card-dark rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-colors">
                  {/* Topo */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Blocks className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-mavi-white text-sm font-semibold">Meu Sistema</p>
                        <p className="text-mavi-white/40 text-xs">by MAVI · 100% seu</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                      Ativo ✓
                    </span>
                  </div>

                  {/* Módulos */}
                  <div className="space-y-3 mb-4">
                    {[
                      { label: "Painel de leads", value: "47 ativos", color: "bg-primary" },
                      { label: "Ordens de serviço", value: "12 abertas", color: "bg-blue-500" },
                      { label: "Portal do cliente", value: "98% uptime", color: "bg-green-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-mavi-white/70 text-sm">{item.label}</span>
                        </div>
                        <span className="text-mavi-white text-sm font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Rodapé */}
                  <div className="rounded-xl p-4 border border-primary/20"
                    style={{ background: "linear-gradient(135deg, hsl(336 100% 45% / 0.1), transparent)" }}>
                    <p className="text-mavi-white/50 text-xs mb-1">Economia mensal vs SaaS</p>
                    <p className="text-2xl font-bold text-primary">R$ 2.400<span className="text-sm font-normal text-mavi-white/40">/mês</span></p>
                    <p className="text-mavi-white/40 text-xs mt-0.5">Que fica no seu caixa, não no de terceiros</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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
          FAQ HOME
          ============================================================ */}
      <Section variant="gray">
        <AnimatedSection animation="fadeInUp">
          <SectionHeader
            title="Perguntas frequentes"
            subtitle="Respostas rápidas sobre a MAVI e nossos serviços."
          />
        </AnimatedSection>
        <AnimatedChildren className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {homeFaqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors card-shine">
              <h3 className="font-semibold text-foreground mb-2 text-sm">{faq.question}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
            </div>
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
              Quer ver o que{" "}
              <span className="gradient-text">trava</span>{" "}
              suas vendas hoje?
            </h2>
            <p className="text-lg text-mavi-white/60 mb-10 max-w-xl mx-auto">
              Sessão de 30 minutos, gratuita. A gente olha seu funil, aponta o gargalo e mostra o que mudaria. Sem proposta enfiada no fim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl" className="btn-glow group">
                <Link to="/contato">
                  Quero uma consultoria gratuita
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/servicos/micro-saas">Quero meu próprio sistema</Link>
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
