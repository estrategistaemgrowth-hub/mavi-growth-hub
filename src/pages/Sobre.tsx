import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import {
  Target,
  TrendingUp,
  Users,
  Bot,
  BarChart3,
  Calendar,
  Rocket,
  MessageSquare,
  ShoppingCart,
  Zap,
} from "lucide-react";

const timeline = [
  {
    year: "2019",
    title: "Nascimento da MAVI",
    description: "Início das operações em Jaraguá do Sul, com foco em marketing digital para pequenas empresas.",
  },
  {
    year: "2020",
    title: "Entrada forte no e-commerce",
    description: "Especialização em lojas virtuais Tray e gestão de marketplaces durante o boom do e-commerce.",
  },
  {
    year: "2022",
    title: "Estruturação de performance",
    description: "Desenvolvimento de metodologia própria de gestão de tráfego e otimização de campanhas.",
  },
  {
    year: "2024",
    title: "Criação do HubRS CRM",
    description: "Lançamento do CRM próprio como extensão natural da metodologia, integrando vendas, WhatsApp e IA.",
  },
];

const team = [
  { role: "Head de Performance", description: "Estratégia e liderança de campanhas" },
  { role: "Especialista em E-commerce", description: "Implantação e otimização de lojas" },
  { role: "Especialista em CRM & Automação", description: "Configuração do HubRS e fluxos" },
  { role: "Gestor de Tráfego", description: "Mídia paga e otimização diária" },
  { role: "Social Media", description: "Conteúdo estratégico e criativos" },
  { role: "Especialista em Marketplaces", description: "Gestão de canais e integrações" },
];

const workStyle = [
  {
    icon: BarChart3,
    title: "Dados",
    description: "Decisões baseadas em métricas reais, não em achismos.",
  },
  {
    icon: Target,
    title: "Estratégia",
    description: "Planejamento personalizado para cada negócio.",
  },
  {
    icon: Rocket,
    title: "Execução",
    description: "Implementação ágil com foco em resultados rápidos.",
  },
  {
    icon: MessageSquare,
    title: "Transparência",
    description: "Comunicação direta e relatórios claros.",
  },
];

export default function Sobre() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Quem é a <span className="text-primary">MAVI</span> Marketing?
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Somos uma agência de marketing digital nascida em Jaraguá do Sul, com um único objetivo: 
              transformar dados em crescimento real para negócios que querem vender mais.
            </p>
          </div>
        </div>
      </section>

      {/* História */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="Nossa trajetória"
              subtitle="De uma pequena agência local a referência em performance para e-commerces."
              centered={false}
            />
            <p className="text-muted-foreground leading-relaxed mb-6">
              A MAVI nasceu da visão de que marketing digital deveria ser sobre resultados mensuráveis, 
              não apenas métricas de vaidade. Ao longo de mais de 5 anos, construímos uma metodologia 
              própria que combina estratégia, tecnologia e execução precisa.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nosso foco em e-commerce e performance nos levou a desenvolver soluções cada vez mais 
              integradas, culminando na criação do HubRS CRM — nossa ferramenta própria para centralizar 
              vendas, automatizar WhatsApp e usar IA para escalar atendimentos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hoje, somos parceiros de crescimento de mais de 500 clientes, desde pequenas lojas virtuais 
              até operações que faturam múltiplos dígitos por mês.
            </p>
          </div>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-primary font-bold">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Nosso jeito de trabalhar */}
      <Section variant="gray">
        <SectionHeader
          title="Nosso jeito de trabalhar"
          subtitle="Metodologia validada para entregar resultados consistentes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workStyle.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Equipe */}
      <Section>
        <SectionHeader
          title="Nosso time"
          subtitle="Especialistas dedicados a cada área do seu projeto."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{member.role}</h3>
              <p className="text-sm text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CRM como diferencial */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
              HubRS CRM: nossa extensão natural
            </h2>
            <p className="text-mavi-white/70 leading-relaxed mb-6">
              O HubRS CRM nasceu da nossa necessidade de integrar todas as pontas do processo de vendas 
              de nossos clientes. Mais do que uma ferramenta, é a materialização da metodologia MAVI.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Centralização de todos os contatos e leads",
                "Automação de WhatsApp com IA",
                "Integração direta com Meta Ads",
                "Funil visual para acompanhamento de vendas",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-mavi-white/80">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/hubrs-crm">Conhecer o HubRS CRM</Link>
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="bg-mavi-white/5 rounded-2xl p-8 border border-mavi-white/10">
              <div className="flex items-center gap-4 mb-6">
                <MessageSquare className="w-12 h-12 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-mavi-white">HubRS CRM</h3>
                  <p className="text-mavi-white/60">Desenvolvido pela MAVI</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-mavi-white/60 text-sm">Atendimento IA</p>
                </div>
                <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">3x</p>
                  <p className="text-mavi-white/60 text-sm">Mais conversões</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quer conhecer mais sobre a MAVI?
          </h2>
          <p className="text-muted-foreground mb-8">
            Entre em contato e descubra como podemos ajudar seu negócio a crescer.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Falar com a MAVI</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
