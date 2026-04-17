import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
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
  {
    year: "2025",
    title: "Foco em Growth Marketing",
    description: "Expansão para estratégias completas de Growth Marketing: funis de aquisição, retenção, LTV e metodologias proprietárias para escalar negócios com previsibilidade.",
  },
  {
    year: "2026",
    title: "Micro SaaS para Performance",
    description: "Desenvolvimento de sistemas sob medida para mensurar e automatizar dados de performance — dashboards, integrações e ferramentas próprias que transformam operação em vantagem competitiva.",
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
    description: "ROAS, CAC e receita atribuída acompanhados semana a semana.",
  },
  {
    icon: Target,
    title: "Estratégia",
    description: "Funil desenhado pro seu ticket, ciclo de venda e margem.",
  },
  {
    icon: Rocket,
    title: "Execução",
    description: "Campanha no ar em dias, não em meses. Otimização diária.",
  },
  {
    icon: MessageSquare,
    title: "Transparência",
    description: "Você vê o número que importa. Sem maquiagem em relatório.",
  },
];

const faqs = [
  {
    question: "Quanto tempo a MAVI está no mercado?",
    answer: "A MAVI foi fundada em 2019 em Jaraguá do Sul, SC. São mais de 5 anos de experiência em marketing digital, com foco em e-commerce, performance e growth marketing.",
  },
  {
    question: "Quais segmentos a MAVI atende?",
    answer: "Atendemos e-commerces, imobiliárias, indústrias, clínicas de saúde e estética, e negócios B2B. Nossa metodologia é adaptada para cada segmento com estratégias específicas de crescimento.",
  },
  {
    question: "A MAVI desenvolve sistemas e Micro SaaS?",
    answer: "Sim. A partir de 2026, a MAVI expandiu para desenvolvimento de Micro SaaS sob medida — sistemas personalizados para automatizar processos, mensurar dados de performance e eliminar dependência de softwares genéricos.",
  },
  {
    question: "Como a MAVI usa inteligência artificial?",
    answer: "Usamos IA em campanhas de performance, automação de atendimento via WhatsApp, desenvolvimento acelerado de sistemas e análise de dados. A tecnologia é aplicada para gerar mais resultado com menos tempo.",
  },
  {
    question: "A MAVI trabalha com empresas de outros estados?",
    answer: "Sim, atendemos empresas em todo o Brasil de forma remota. Nosso time está baseado em Jaraguá do Sul, SC, mas operamos com clientes em São Paulo, Rio de Janeiro, Paraná e outros estados.",
  },
];

export default function Sobre() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Sobre", url: "/sobre" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const teamPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MAVI Marketing Digital",
    "url": "https://www.agenciamavi.com.br",
    "employee": [
      {
        "@type": "Person",
        "name": "Robson Fernandes",
        "jobTitle": "Fundador e Estrategista de Growth",
        "worksFor": { "@type": "Organization", "name": "MAVI Marketing Digital" },
        "knowsAbout": ["Growth Marketing", "E-commerce", "Micro SaaS", "Tráfego Pago", "CRM"],
        "url": "https://www.agenciamavi.com.br/sobre"
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, teamPersonSchema],
  };

  return (
    <Layout>
      <SEO
        title="Sobre a MAVI - Agência de Marketing Digital em Jaraguá do Sul SC"
        description="Conheça a MAVI Marketing Digital. +5 anos de experiência, +500 clientes atendidos. Especialistas em performance e e-commerce em Jaraguá do Sul."
        canonical="/sobre"
        schemaMarkup={combinedSchema}
      />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Quem é a <span className="text-primary">MAVI</span> Marketing?
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Agência de performance fundada em Jaraguá do Sul em 2019. Operamos mídia, CRM e automação para quem precisa de receita previsível, não de slide bonito.
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
              Começamos em 2019 atendendo pequenas empresas locais. A pergunta sempre foi a mesma: quanto entrou de receita pra cada real investido em mídia?
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Em 2020 entramos pesado em e-commerce na Tray. Em 2024 lançamos o HubRS CRM porque planilha e WhatsApp solto não escalam. Hoje o CRM roda a operação de vendas dos clientes que atendemos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Mais de 500 negócios passaram pela MAVI. De loja com R$10k/mês a operação com 7 dígitos mensais. O método é o mesmo: tráfego, CRM e automação amarrados na mesma métrica de receita.
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
              HubRS CRM: o motor por trás da operação
            </h2>
            <p className="text-mavi-white/70 leading-relaxed mb-6">
              Cansamos de ver lead bom morrer no WhatsApp do vendedor. Construímos o HubRS pra puxar o lead da campanha, qualificar com IA e empurrar pro funil até virar venda.
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

      {/* FAQ Section */}
      <Section variant="gray">
        <AnimatedSection animation="fadeInUp">
          <SectionHeader
            title="Perguntas frequentes sobre a MAVI"
            subtitle="Tire suas dúvidas sobre nossa história, metodologia e serviços."
          />
        </AnimatedSection>
        <AnimatedSection delay={200} className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
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
