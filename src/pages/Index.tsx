import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FeatureCard } from "@/components/FeatureCard";
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
  },
  {
    title: "Metodologia de performance",
    description: "Processos validados para maximizar resultados com dados e análises constantes.",
    icon: Target,
  },
  {
    title: "Integração completa",
    description: "Loja, anúncios, CRM e atendimento trabalhando juntos de forma eficiente.",
    icon: Zap,
  },
  {
    title: "Linguagem de negócio",
    description: "Time que entende seus desafios e fala a língua do dono de negócio.",
    icon: MessageSquare,
  },
];

const testimonials = [
  {
    quote: "A MAVI transformou nossa operação de e-commerce. Em 6 meses, triplicamos o faturamento com a combinação de tráfego pago e organização do CRM.",
    author: "Carlos Silva",
    role: "CEO",
    company: "TechStore",
  },
  {
    quote: "O HUBRS CRM mudou completamente nosso atendimento. Antes perdíamos leads no WhatsApp, agora cada contato vira oportunidade rastreada.",
    author: "Ana Rodrigues",
    role: "Diretora Comercial",
    company: "Bella Moda",
  },
  {
    quote: "Finalmente uma agência que entende de resultado de verdade. A metodologia da MAVI nos deu clareza sobre onde investir e como crescer.",
    author: "Pedro Mendes",
    role: "Fundador",
    company: "Fit Suplementos",
  },
];

const clients = [
  "Tray", "Mercado Livre", "Meta", "Google", "Tiny ERP", "Bling", "RD Station", "Hotmart"
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-mavi-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        </div>
        
        <div className="container-mavi relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white leading-tight mb-6">
                Fazemos o que seu tempo não consegue fazer pelo seu{" "}
                <span className="text-primary">e-commerce</span>.
              </h1>
              <p className="text-lg md:text-xl text-mavi-white/70 mb-8 leading-relaxed">
                Agência especializada em performance para e-commerces, marketplaces e negócios que querem crescer com dados, tecnologia, IA e estratégias de verdade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contato">Quero um diagnóstico gratuito</Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/hubrs-crm">Conhecer o CRM HUBRS</Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary">+5</p>
                  <p className="text-sm text-mavi-white/60">Anos de mercado</p>
                </div>
                <div className="w-px h-12 bg-mavi-white/20" />
                <div>
                  <p className="text-3xl font-bold text-primary">+500</p>
                  <p className="text-sm text-mavi-white/60">Clientes atendidos</p>
                </div>
                <div className="w-px h-12 bg-mavi-white/20" />
                <div>
                  <p className="text-3xl font-bold text-primary">R$50M+</p>
                  <p className="text-sm text-mavi-white/60">Em vendas geradas</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block animate-fade-in-right animation-delay-300">
              <div className="relative animate-[float_6s_ease-in-out_infinite]">
                <div className="bg-gradient-to-br from-mavi-gray-dark to-mavi-black rounded-2xl p-6 border border-mavi-white/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-mavi-black/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-mavi-white/60 text-sm">Faturamento Mensal</span>
                        <span className="text-green-400 text-sm">+127%</span>
                      </div>
                      <div className="h-2 bg-mavi-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-mavi-black/50 rounded-lg p-4">
                        <p className="text-mavi-white/60 text-xs mb-1">ROAS</p>
                        <p className="text-2xl font-bold text-mavi-white">8.4x</p>
                      </div>
                      <div className="bg-mavi-black/50 rounded-lg p-4">
                        <p className="text-mavi-white/60 text-xs mb-1">Leads/dia</p>
                        <p className="text-2xl font-bold text-mavi-white">47</p>
                      </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        <div>
                          <p className="text-mavi-white font-medium">HUBRS CRM</p>
                          <p className="text-mavi-white/60 text-sm">12 leads qualificados hoje</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é a MAVI */}
      <Section variant="gray">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="O que é a MAVI"
              subtitle="Somos uma agência de marketing digital focada em uma única coisa: fazer seu negócio vender mais."
              centered={false}
            />
            <div className="space-y-4">
              {[
                "Estratégias criadas a partir de dados",
                "Time especialista em performance",
                "CRM e automação integrados para vender mais",
                "Parcerias com as principais plataformas do mercado",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8">
              <Link to="/sobre">
                Conheça nossa história
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-6 border border-border">
              <BarChart3 className="w-10 h-10 text-primary mb-4" />
              <p className="text-3xl font-bold text-foreground">+5</p>
              <p className="text-muted-foreground">Anos de experiência</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <Users className="w-10 h-10 text-primary mb-4" />
              <p className="text-3xl font-bold text-foreground">+500</p>
              <p className="text-muted-foreground">Clientes atendidos</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <p className="text-3xl font-bold text-foreground">127%</p>
              <p className="text-muted-foreground">Crescimento médio</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <Target className="w-10 h-10 text-primary mb-4" />
              <p className="text-3xl font-bold text-foreground">8.4x</p>
              <p className="text-muted-foreground">ROAS médio</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Soluções */}
      <Section>
        <SectionHeader
          title="Soluções para o seu negócio"
          subtitle="Do planejamento à execução, oferecemos tudo que seu e-commerce precisa para escalar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      {/* Por que a MAVI */}
      <Section variant="dark">
        <SectionHeader
          title="Por que escolher a MAVI?"
          subtitle="Não somos apenas mais uma agência. Somos parceiros estratégicos do seu crescimento."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-mavi-white/5 border border-mavi-white/10 hover:border-primary/50 transition-colors"
            >
              <item.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-mavi-white mb-2">{item.title}</h3>
              <p className="text-mavi-white/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clientes & Parceiros */}
      <Section variant="gray">
        <SectionHeader
          title="Clientes & Parceiros"
          subtitle="De pequenos negócios a operações com múltiplos dígitos mensais: nosso foco é sempre resultado."
        />
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div
              key={client}
              className="text-2xl font-bold text-muted-foreground/50 hover:text-primary transition-colors"
            >
              {client}
            </div>
          ))}
        </div>
      </Section>

      {/* Depoimentos */}
      <Section>
        <SectionHeader
          title="O que dizem nossos clientes"
          subtitle="Resultados reais de quem confiou na MAVI para crescer."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </Section>

      {/* CTA Final */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
            Pronto para destravar as vendas do seu negócio?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Agende uma consultoria gratuita e descubra como podemos acelerar seu crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Quero uma consultoria gratuita</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/hubrs-crm">Quero conhecer o HUBRS CRM</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
