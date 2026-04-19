import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Heart,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  TrendingUp,
  Zap,
  Sparkles,
  Clock,
} from "lucide-react";

const problems = [
  {
    icon: Calendar,
    title: "Agenda com horários vazios",
    description:
      "Dificuldade em preencher a agenda e manter um fluxo constante de pacientes e clientes.",
  },
  {
    icon: Clock,
    title: "No-show frequente",
    description:
      "Pacientes que agendam e não comparecem, gerando perda de receita e desorganização.",
  },
  {
    icon: Users,
    title: "Falta de fidelização",
    description:
      "Clientes que fazem um procedimento e nunca mais voltam, sem estratégia de retenção.",
  },
  {
    icon: BarChart3,
    title: "Marketing sem retorno",
    description:
      "Investimento em anúncios e redes sociais que não se convertem em agendamentos.",
  },
];

const solutions = [
  {
    icon: Target,
    title: "Campanhas por Procedimento",
    description:
      "Anúncios segmentados para cada tratamento, atraindo pacientes com interesse real no serviço específico.",
  },
  {
    icon: Globe,
    title: "Landing Pages de Conversão",
    description:
      "Páginas otimizadas para cada procedimento com formulário de agendamento integrado.",
  },
  {
    icon: Users,
    title: "CRM HUBRS para Clínicas",
    description:
      "Gestão completa de pacientes, histórico de atendimentos, lembretes automáticos e follow-up.",
  },
  {
    icon: MessageSquare,
    title: "Automação de Confirmação",
    description:
      "Lembretes automáticos via WhatsApp para confirmar agendamentos e reduzir no-show.",
  },
  {
    icon: Sparkles,
    title: "Conteúdo Educativo",
    description:
      "Gestão de redes sociais com conteúdo que educa, engaja e converte seguidores em pacientes.",
  },
  {
    icon: BarChart3,
    title: "Remarketing e Fidelização",
    description:
      "Campanhas de reativação para pacientes inativos e promoções para tratamentos recorrentes.",
  },
];

const benefits = [
  "Agenda cheia com pacientes qualificados",
  "Redução drástica do no-show com confirmação automática",
  "Aumento do ticket médio por paciente",
  "Fidelização e retorno para novos procedimentos",
  "Presença digital profissional e consistente",
  "Controle total do funil de agendamentos",
  "Integração entre marketing e atendimento",
  "Métricas claras de retorno por campanha",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Analisamos seus serviços, público-alvo, região e concorrência para definir a estratégia.",
  },
  {
    step: "02",
    title: "Planejamento",
    description:
      "Definimos campanhas, landing pages, automações e metas de agendamentos mensais.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Configuramos campanhas, páginas de conversão, CRM e automações de confirmação.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Acompanhamento contínuo, testes A/B e otimizações para maximizar agendamentos.",
  },
];

const faqs = [
  {
    question: "Quanto custa um lead para clínica de estética?",
    answer:
      "O custo por lead varia conforme o procedimento, região e concorrência. Em média, conseguimos leads qualificados entre R$15 e R$60 para procedimentos estéticos, dependendo do ticket do serviço.",
  },
  {
    question: "Vocês trabalham com clínicas de qualquer tamanho?",
    answer:
      "Sim! Atendemos desde profissionais autônomos até clínicas com múltiplos profissionais. As soluções são adaptadas conforme o porte e necessidade de cada cliente.",
  },
  {
    question: "Como funciona a automação de confirmação?",
    answer:
      "Configuramos lembretes automáticos via WhatsApp que são enviados 24h e 2h antes do agendamento, solicitando confirmação do paciente. Isso reduz o no-show em até 70%.",
  },
  {
    question: "Vocês criam sites para clínicas?",
    answer:
      "Sim! Desenvolvemos sites institucionais e landing pages específicas para procedimentos, integrados com CRM e otimizados para conversão e SEO local.",
  },
  {
    question: "Qual o prazo para ver resultados?",
    answer:
      "Os primeiros agendamentos começam a chegar nos primeiros dias de campanha. Para otimização completa e resultados consistentes, recomendamos um período de 2 a 3 meses.",
  },
];

const SegmentoSaudeEstetica = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Saúde e Estética", url: "/segmentos/saude-estetica" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Clínicas, Salões e Spas"
        description="Estratégias de marketing digital para clínicas de estética, salões de beleza, spas e consultórios. Geração de leads, automação de agendamentos e fidelização de clientes."
        canonical="/segmentos/saude-estetica"
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
                Marketing para Saúde e Estética
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 leading-tight">
                Agenda cheia com{" "}
                <span className="text-primary">pacientes qualificados</span>
              </h1>
              <p className="text-xl text-mavi-white/80 mb-8">
                Estratégias de marketing digital que atraem pacientes reais
                interessados nos seus procedimentos. Automação de confirmação
                e CRM especializado para clínicas e salões.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contato">Solicitar proposta</Link>
                </Button>
                <WhatsAppLink className="inline-flex">
                  <Button variant="heroOutline" size="lg" className="pointer-events-none">
                    Falar no WhatsApp
                  </Button>
                </WhatsAppLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 border border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">
                      Resultados para Clínicas
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          3x mais agendamentos
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Com campanhas otimizadas
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Zap className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          -70% no-show
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Com confirmação automática
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Users className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          +45% retorno
                        </div>
                        <div className="text-sm text-muted-foreground">
                          De pacientes recorrentes
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
          title="Sua clínica enfrenta esses desafios?"
          subtitle="Problemas que aparecem com frequência em clínicas e salões que chegam até nós"
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
          title="Nossas soluções para Saúde e Estética"
          subtitle="O que fazemos para resolver cada um desses problemas"
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
              O que sua clínica ganha com a MAVI
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              O que muda na prática quando trabalhamos juntos.
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
              Desenvolvido pela MAVI, o HUBRS é o CRM ideal para clínicas e
              salões que querem organizar pacientes, automatizar confirmações e
              acompanhar o histórico de cada cliente.
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
          subtitle="Nosso processo para gerar resultados consistentes para clínicas e salões"
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
          subtitle="Tire suas dúvidas sobre marketing digital para clínicas e salões"
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
                Pronto para lotar sua agenda?
              </h2>
              <p className="text-xl text-mavi-white/80 mb-8">
                A gente vê sua agenda, seu mercado e te diz o que mudaria. Gratuito, sem compromisso.
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
                <WhatsAppLink className="flex items-center gap-3 text-mavi-white/80 hover:text-primary transition-colors cursor-pointer">
                  <Phone className="w-5 h-5" />
                  (47) 3307-2030
                </WhatsAppLink>
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

export default SegmentoSaudeEstetica;
