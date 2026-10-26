import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FinalCta } from "@/components/service/ServiceBlocks";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Store,
  Globe,
  Bot,
  Cpu,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce e Lojas Virtuais",
    description: "Criação, implantação e otimização de lojas virtuais com foco em vendas, especialmente na plataforma Tray e integrações com outros canais.",
    href: "/servicos/ecommerce",
    benefits: [
      "Criação de loja do zero ou migração",
      "Implementação completa na Tray",
      "Integrações com meios de pagamento",
      "Configuração de frete e logística",
      "Treinamento básico do cliente",
    ],
  },
  {
    id: "performance",
    icon: TrendingUp,
    title: "Marketing de Performance",
    description: "Gestão de tráfego pago, funis de vendas, campanhas full funnel (Meta Ads, Google Ads) e otimização diária de resultados.",
    href: "/servicos/performance",
    benefits: [
      "Campanhas em Meta Ads e Google Ads",
      "Funis estruturados (topo, meio, fundo)",
      "Foco em métricas como ROAS, CAC, ticket médio",
      "Rotina de otimização diária",
      "Conexão com CRM HUBRS",
    ],
  },
  {
    id: "redes-sociais",
    icon: Users,
    title: "Redes Sociais e Conteúdo",
    description: "Gestão estratégica de redes sociais com criativos que vendem, planejamento de conteúdo e social media baseado em performance.",
    href: "/servicos/redes-sociais",
    benefits: [
      "Gestão de Instagram e Facebook",
      "Conteúdo estratégico focado em conversão",
      "Planejamento de calendário editorial",
      "Criação de criativos e peças",
      "Relatórios de performance",
    ],
  },
  {
    id: "marketplaces",
    icon: Store,
    title: "Marketplaces & ERP",
    description: "Gestão de marketplaces, cadastro de produtos, integrações com ERP e logística em canais como Mercado Livre, Magalu e Amazon.",
    href: "/servicos/marketplaces",
    benefits: [
      "Cadastro e categorização de produtos",
      "Integrações com ERP e hubs",
      "Regras de frete e precificação",
      "Campanhas patrocinadas internas",
      "Metas de faturamento por canal",
    ],
  },
  {
    id: "sites",
    icon: Globe,
    title: "Sites e Landing Pages",
    description: "Criação de sites institucionais e páginas de captura focadas em conversão, com SEO básico e rastreamento para mídia.",
    href: "/servicos/sites",
    benefits: [
      "Sites institucionais modernos",
      "Landing pages de alta conversão",
      "SEO básico configurado",
      "Instalação de pixels e tags",
      "Otimização para anúncios",
    ],
  },
  {
    id: "automacao",
    icon: Bot,
    title: "Automação & IA",
    description: "Implantação de chatbots, fluxos automatizados e integrações com CRM para escalar vendas e suporte.",
    href: "/servicos/automacao",
    benefits: [
      "Implantação de chatbots",
      "Fluxos de nutrição de leads",
      "Integrações com CRM",
      "Automação de atendimento",
      "Redução do trabalho manual",
    ],
  },
  {
    id: "micro-saas",
    icon: Cpu,
    title: "Micro SaaS Sob Medida",
    description: "Desenvolvemos sistemas personalizados para sua operação. Usamos IA no desenvolvimento para entregar mais rápido, com mais qualidade e totalmente adaptado ao seu negócio.",
    href: "/servicos/micro-saas",
    benefits: [
      "Sistema sob medida para seu processo",
      "Desenvolvimento acelerado com IA",
      "MVP funcional em semanas",
      "Integrações com APIs e webhooks",
      "Deploy + documentação + treinamento",
    ],
  },
  {
    id: "hubrs",
    icon: MessageSquare,
    title: "CRM HUBRS",
    description: "CRM desenvolvido pela MAVI para centralizar contatos, automatizar WhatsApp, usar IA no atendimento e conectar campanhas direto no funil.",
    href: "/hubrs-crm",
    benefits: [
      "Funil de vendas visual (Kanban)",
      "Automação de WhatsApp com IA",
      "Integração com Meta Ads",
      "Centralização de leads",
      "Transcrição de áudios",
    ],
    highlight: true,
  },
];

const servicosFaqs = [
  {
    question: "Quais serviços a MAVI oferece?",
    answer: "Oferecemos: e-commerce e lojas virtuais (Tray), marketing de performance (Meta Ads, Google Ads), redes sociais, marketplaces e ERP, sites e landing pages, automação com IA, Micro SaaS sob medida e CRM HUBRS.",
  },
  {
    question: "A MAVI trabalha com qual plataforma de e-commerce?",
    answer: "Somos especialistas na plataforma Tray, mas também trabalhamos com VTEX, Shopify, WooCommerce e integrações com marketplaces como Mercado Livre, Magazine Luiza e Amazon.",
  },
  {
    question: "O que é Micro SaaS e por que contratar?",
    answer: "Micro SaaS é um sistema personalizado para o seu negócio: CRM próprio, painel de leads, dashboard de métricas, portal do cliente. Você para de pagar mensalidades por softwares genéricos e passa a ter uma ferramenta feita para sua operação.",
  },
  {
    question: "Como funciona a gestão de tráfego pago?",
    answer: "Gerenciamos campanhas no Meta Ads (Facebook e Instagram) e Google Ads com foco em ROAS. Fazemos análise diária, otimização de criativos, segmentação de público e relatórios transparentes de resultados.",
  },
  {
    question: "A MAVI faz automação de WhatsApp?",
    answer: "Sim. Implementamos chatbots e fluxos automatizados com IA para qualificar leads, responder dúvidas e encaminhar contatos quentes para o time comercial, 24 horas por dia.",
  },
];

export default function Servicos() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
  ]);

  const faqSchema = generateFAQSchema(servicosFaqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Serviços: E-commerce, Tráfego, CRM e Automação"
        description="Soluções completas de marketing digital: lojas virtuais, tráfego pago, redes sociais, marketplaces, sites e CRM com IA. Conheça nossos serviços."
        canonical="/servicos"
        schemaMarkup={combinedSchema}
      />

      {/* Hero */}
      <section className="bg-background pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="container-mavi">
          <AnimatedSection animation="fadeInUp" className="max-w-3xl">
            <h1 className="mb-5 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
              Nossos <span className="text-primary">Serviços</span>
            </h1>
            <p className="max-w-[56ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Soluções completas para e-commerces e negócios que querem crescer com estratégia,
              tecnologia e performance de verdade.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Serviços em linhas: resumo à esquerda, o que inclui à direita */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="container-mavi border-t-2 border-foreground">
          {services.map((service) => (
            <AnimatedSection key={service.id}>
              <div
                id={service.id}
                className={cn(
                  "grid scroll-mt-28 gap-8 border-b border-border py-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16 md:py-14",
                )}
              >
                <div>
                  <span
                    className={cn(
                      "mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold",
                      service.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                    )}
                  >
                    <service.icon className="h-4 w-4" aria-hidden="true" />
                    {service.highlight ? "Solução própria MAVI" : "Serviço"}
                  </span>
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">{service.title}</h2>
                  <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{service.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="hero" size="lg" className="group">
                      <Link to="/contato">Solicitar Proposta</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="group">
                      <Link to={service.href}>
                        Ver detalhes
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <ul
                  className={cn(
                    "self-start rounded-2xl p-6 md:p-8",
                    service.highlight ? "bg-primary text-white" : "border border-border bg-card",
                  )}
                >
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className={cn(
                        "flex items-center gap-3 border-b py-3 font-medium last:border-0",
                        service.highlight ? "border-white/25" : "border-border text-foreground",
                      )}
                    >
                      <Check className={cn("h-4 w-4 shrink-0", service.highlight ? "text-white" : "text-primary")} strokeWidth={2.6} aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <FinalCta
        title="Não sabe por onde começar?"
        text="Agende um diagnóstico gratuito e nossa equipe vai identificar as melhores oportunidades para o seu negócio."
        primary={{ label: "Agendar Diagnóstico Gratuito", href: "/diagnostico-gratuito" }}
      />
    </Layout>
  );
}
