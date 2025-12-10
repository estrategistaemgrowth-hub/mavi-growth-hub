import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Store,
  Globe,
  Bot,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
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
      "Conexão com CRM HubRS",
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
    id: "hubrs",
    icon: MessageSquare,
    title: "CRM HubRS",
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

export default function Servicos() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Nossos <span className="text-primary">Serviços</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Soluções completas para e-commerces e negócios que querem crescer com estratégia, 
              tecnologia e performance de verdade.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                  service.highlight 
                    ? "bg-primary/10 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <service.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {service.highlight ? "Solução própria MAVI" : "Serviço"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/contato">Solicitar Proposta</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={service.href}>
                      Ver detalhes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className={`rounded-2xl p-8 ${
                  service.highlight 
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30" 
                    : "bg-mavi-gray border border-border"
                }`}>
                  <service.icon className={`w-16 h-16 mb-6 ${
                    service.highlight ? "text-primary" : "text-primary/70"
                  }`} />
                  <div className="space-y-3">
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-background/50 rounded-lg p-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Não sabe por onde começar?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Agende um diagnóstico gratuito e nossa equipe vai identificar as melhores oportunidades 
            para o seu negócio.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Agendar Diagnóstico Gratuito</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
