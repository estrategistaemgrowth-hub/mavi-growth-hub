import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Camera,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  TrendingUp,
  Zap,
} from "lucide-react";

const problems = [
  {
    icon: Target,
    title: "Leads desqualificados",
    description:
      "Recebe muitos contatos que não têm perfil para comprar ou alugar os imóveis disponíveis.",
  },
  {
    icon: Users,
    title: "Corretores sem organização",
    description:
      "Dificuldade em acompanhar o funil de vendas e saber em qual etapa cada lead está.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up manual",
    description:
      "Perda de oportunidades por falta de acompanhamento sistemático dos interessados.",
  },
  {
    icon: BarChart3,
    title: "Sem métricas claras",
    description:
      "Não sabe qual canal gera mais resultados nem qual corretor performa melhor.",
  },
];

const solutions = [
  {
    icon: Target,
    title: "Campanhas Segmentadas",
    description:
      "Google Ads e Meta Ads com segmentação por região, renda e interesse em tipos específicos de imóveis.",
  },
  {
    icon: Globe,
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas otimizadas para cada empreendimento ou tipo de imóvel, maximizando a conversão de visitantes em leads.",
  },
  {
    icon: Users,
    title: "CRM HUBRS para Corretores",
    description:
      "Gestão completa do funil de vendas, distribuição automática de leads e acompanhamento de performance.",
  },
  {
    icon: MessageSquare,
    title: "Automação de WhatsApp",
    description:
      "Follow-up automático, respostas instantâneas e nutrição de leads via WhatsApp Business.",
  },
  {
    icon: Camera,
    title: "Conteúdo Visual Profissional",
    description:
      "Gestão de redes sociais com fotos profissionais, tours virtuais e vídeos dos imóveis.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Analytics",
    description:
      "Dashboard completo com métricas de campanhas, custo por lead e performance por corretor.",
  },
];

const benefits = [
  "Leads mais qualificados com interesse real nos imóveis",
  "Redução do custo por lead qualificado",
  "Aumento da taxa de conversão de visitas em vendas",
  "Organização completa do funil de vendas",
  "Automação do follow-up com leads",
  "Visibilidade total da performance de cada corretor",
  "Presença digital profissional e consistente",
  "Integração entre marketing e vendas",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Analisamos seu público-alvo, concorrência, região de atuação e tipos de imóveis para definir a estratégia.",
  },
  {
    step: "02",
    title: "Planejamento",
    description:
      "Definimos os canais, orçamento, segmentações e metas de leads e vendas mensais.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Configuramos campanhas, landing pages, CRM e automações de WhatsApp.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Monitoramento contínuo, testes A/B e otimizações semanais para maximizar resultados.",
  },
];

const faqs = [
  {
    question: "Quanto custa para gerar um lead qualificado para imobiliária?",
    answer:
      "O custo por lead varia conforme a região, tipo de imóvel e concorrência. Em média, conseguimos leads qualificados entre R$15 e R$50 para locação e R$30 a R$100 para venda, dependendo do ticket do imóvel.",
  },
  {
    question: "Vocês trabalham com imobiliárias de qualquer tamanho?",
    answer:
      "Sim! Atendemos desde corretores autônomos até grandes imobiliárias com dezenas de corretores. As soluções são adaptadas conforme o porte e necessidade de cada cliente.",
  },
  {
    question: "Como funciona a integração com o CRM?",
    answer:
      "O CRM HUBRS recebe automaticamente todos os leads das campanhas, distribui entre corretores, envia mensagens automáticas de boas-vindas e permite acompanhar todo o funil de vendas.",
  },
  {
    question: "Vocês criam sites para imobiliárias?",
    answer:
      "Sim! Desenvolvemos sites institucionais e landing pages específicas para empreendimentos, integrados com CRM e otimizados para conversão e SEO local.",
  },
  {
    question: "Qual o prazo para ver resultados?",
    answer:
      "Os primeiros leads começam a chegar nos primeiros dias de campanha. Para otimização completa e resultados consistentes, recomendamos um período de 2 a 3 meses.",
  },
];

const SegmentoImobiliarias = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Imobiliárias", url: "/segmentos/imobiliarias" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Imobiliárias e Corretoras"
        description="Estratégias de marketing digital para imobiliárias. Geração de leads qualificados, CRM para corretores, campanhas de imóveis e automação de WhatsApp. Agende uma consultoria."
        canonical="/segmentos/imobiliarias"
        schemaMarkup={combinedSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,0,126,0.15),transparent_50%)]" />

        <div className="container-mavi relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Marketing para Imobiliárias
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 leading-tight">
                Gere mais leads{" "}
                <span className="text-primary">qualificados</span> para sua
                imobiliária
              </h1>
              <p className="text-xl text-mavi-white/80 mb-8">
                Estratégias de marketing digital que atraem clientes reais
                interessados em comprar ou alugar. CRM especializado para
                corretores e automação de follow-up.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contato">Solicitar proposta</Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg">
                  <a
                    href="https://wa.me/554733072030?text=Olá! Tenho uma imobiliária e gostaria de saber mais sobre os serviços da MAVI."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">
                      Resultados para Imobiliárias
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          3x mais leads
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Com a mesma verba de mídia
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Zap className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          70% menos tempo
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Em follow-up com automação
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Users className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          100% organizado
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Funil de vendas no CRM
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

      {/* Problems Section */}
      <Section>
        <SectionHeader
          title="Sua imobiliária enfrenta esses desafios?"
          description="Problemas comuns que resolvemos para nossos clientes do setor imobiliário"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solutions Section */}
      <Section variant="muted">
        <SectionHeader
          title="Nossas soluções para Imobiliárias"
          description="Estratégias completas para gerar leads, organizar vendas e aumentar conversões"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <solution.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {solution.title}
              </h3>
              <p className="text-muted-foreground">{solution.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Benefícios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              O que sua imobiliária ganha com a MAVI
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Resultados concretos que impactam diretamente nas vendas e na
              organização da sua imobiliária.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Conheça o CRM HUBRS
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Desenvolvido pela MAVI, o HUBRS é o CRM ideal para imobiliárias que
              querem organizar leads, automatizar follow-up e acompanhar a
              performance de cada corretor.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/hubrs-crm">
                  Conhecer o HUBRS CRM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section variant="muted">
        <SectionHeader
          title="Como trabalhamos"
          description="Nosso processo para gerar resultados consistentes para imobiliárias"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-primary/20 mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-8 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          title="Perguntas Frequentes"
          description="Tire suas dúvidas sobre marketing digital para imobiliárias"
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(230,0,126,0.2),transparent_50%)]" />

        <div className="container-mavi relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
                Pronto para gerar mais leads para sua imobiliária?
              </h2>
              <p className="text-xl text-mavi-white/80 mb-8">
                Agende uma consultoria gratuita e descubra como podemos ajudar
                sua imobiliária a crescer com marketing digital.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contato">Agendar consultoria gratuita</Link>
                </Button>
              </div>
            </div>

            <div className="bg-mavi-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold text-mavi-white mb-6">
                Fale conosco agora
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/554733072030?text=Olá! Tenho uma imobiliária e gostaria de saber mais sobre os serviços da MAVI."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-mavi-white/80 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (47) 3307-2030
                </a>
                <a
                  href="mailto:agenciamavi@agenciamavi.com.br"
                  className="flex items-center gap-3 text-mavi-white/80 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  agenciamavi@agenciamavi.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SegmentoImobiliarias;
