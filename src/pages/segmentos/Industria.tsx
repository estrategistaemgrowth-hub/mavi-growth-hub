import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { SplitText } from "@/components/SplitText";
import { HeroBackground } from "@/components/HeroBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Factory,
  Target,
  Users,
  Globe,
  BarChart3,
  Search,
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Handshake,
  Briefcase,
} from "lucide-react";

const problems = [
  {
    icon: Globe,
    title: "Site desatualizado ou inexistente",
    description:
      "Presença digital fraca que não transmite a credibilidade e capacidade da indústria.",
  },
  {
    icon: Target,
    title: "Dificuldade em gerar leads B2B",
    description:
      "Dependência de indicações e feiras, sem um fluxo constante de novos contatos comerciais.",
  },
  {
    icon: Users,
    title: "Relacionamento manual",
    description:
      "Acompanhamento de clientes e prospects feito de forma desorganizada, sem histórico centralizado.",
  },
  {
    icon: Search,
    title: "Baixa visibilidade online",
    description:
      "Empresa não aparece nas buscas do Google quando potenciais clientes procuram por soluções.",
  },
];

const solutions = [
  {
    icon: Globe,
    title: "Sites Institucionais Profissionais",
    description:
      "Desenvolvimento de sites modernos que transmitem credibilidade, apresentam produtos e geram contatos comerciais.",
  },
  {
    icon: Target,
    title: "Google Ads para B2B",
    description:
      "Campanhas segmentadas para atingir compradores, engenheiros e decisores que buscam por soluções industriais.",
  },
  {
    icon: Briefcase,
    title: "LinkedIn Ads",
    description:
      "Anúncios direcionados para cargos específicos em empresas que podem se tornar clientes.",
  },
  {
    icon: FileText,
    title: "Catálogos Digitais",
    description:
      "Apresentação profissional de produtos e soluções com fichas técnicas e especificações.",
  },
  {
    icon: Users,
    title: "CRM para Vendas B2B",
    description:
      "Gestão do funil comercial, acompanhamento de orçamentos e relacionamento de longo prazo com clientes.",
  },
  {
    icon: BarChart3,
    title: "Analytics e Relatórios",
    description:
      "Métricas claras sobre visitas, leads gerados e performance das campanhas digitais.",
  },
];

const benefits = [
  "Presença digital profissional que transmite credibilidade",
  "Geração constante de leads qualificados B2B",
  "Posicionamento no Google para termos do setor",
  "Catálogos digitais acessíveis a qualquer momento",
  "Organização do funil comercial com CRM",
  "Redução da dependência de feiras e indicações",
  "Métricas claras de retorno sobre investimento",
  "Relacionamento digital com clientes atuais",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Entendemos seu mercado, concorrentes, produtos e público-alvo B2B.",
  },
  {
    step: "02",
    title: "Estratégia",
    description:
      "Definimos canais, mensagens e táticas para atingir decisores.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Desenvolvemos site, campanhas, materiais digitais e CRM.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Acompanhamento mensal, relatórios e melhorias contínuas.",
  },
];

const useCases = [
  {
    icon: Factory,
    title: "Indústria Metalúrgica",
    description:
      "Sites técnicos, catálogos de produtos e campanhas para compradores industriais.",
  },
  {
    icon: Award,
    title: "Fabricantes",
    description:
      "Presença digital para fabricantes que vendem para revendedores ou direto ao consumidor.",
  },
  {
    icon: Handshake,
    title: "Prestadores B2B",
    description:
      "Empresas que prestam serviços para outras empresas, como manutenção, logística e consultoria.",
  },
];

const faqs = [
  {
    question: "Marketing digital funciona para indústrias B2B?",
    answer:
      "Sim! Cada vez mais compradores B2B pesquisam online antes de tomar decisões. Ter uma presença digital forte é essencial para ser encontrado e gerar credibilidade.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "O ciclo de vendas B2B é mais longo, mas os primeiros leads costumam aparecer em 30-60 dias. Resultados consistentes de vendas geralmente são observados a partir de 3-6 meses.",
  },
  {
    question: "Vocês desenvolvem sites para indústrias?",
    answer:
      "Sim! Desenvolvemos sites institucionais completos, com apresentação de produtos, catálogos técnicos, páginas de contato e integração com CRM.",
  },
  {
    question: "Como funciona a geração de leads B2B?",
    answer:
      "Utilizamos Google Ads para captar buscas de compradores, LinkedIn Ads para atingir decisores e landing pages otimizadas para converter visitantes em contatos comerciais.",
  },
  {
    question: "O CRM HUBRS é adequado para vendas industriais?",
    answer:
      "Sim! O HUBRS permite gerenciar todo o funil comercial, acompanhar orçamentos, registrar reuniões e manter o histórico de relacionamento com cada cliente.",
  },
];

const SegmentoIndustria = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Indústria", url: "/segmentos/industria" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Indústrias e B2B"
        description="Marketing digital para indústrias e empresas B2B. Sites institucionais, geração de leads qualificados, Google Ads, LinkedIn Ads e CRM para vendas industriais."
        canonical="/segmentos/industria"
        schemaMarkup={combinedSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <HeroBackground intensity="subtle" tone="dark" />

        <div className="container-mavi relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Marketing para Indústrias
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 leading-tight"><SplitText stagger={45} duration={750}>Presença digital{" "}
                <span className="text-primary">profissional</span> para sua
                indústria</SplitText></h1>
              <p className="text-xl text-mavi-white/80 mb-8">
                Sites institucionais, geração de leads B2B e estratégias
                digitais que conectam sua indústria aos decisores certos.
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
                    <Factory className="w-8 h-8 text-primary" />
                    <span className="text-xl font-bold text-foreground">
                      Resultados para Indústrias
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Globe className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          Site profissional
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Com catálogo e contato
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          Leads qualificados
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Compradores e decisores B2B
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                      <Users className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          CRM organizado
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Funil comercial completo
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
          title="Sua indústria enfrenta esses desafios?"
          subtitle="Problemas comuns que resolvemos para indústrias e empresas B2B"
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
          title="Nossas soluções para Indústrias"
          subtitle="Estratégias digitais para gerar credibilidade e novos negócios"
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

      {/* Use Cases Section */}
      <Section>
        <SectionHeader
          title="Para quem é"
          subtitle="Tipos de indústrias e empresas B2B que atendemos"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="text-center p-8 bg-card rounded-2xl border border-border"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <useCase.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section variant="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Benefícios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              O que sua indústria ganha com a MAVI
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Resultados que impactam diretamente nas vendas e no
              posicionamento da sua empresa no mercado.
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
              CRM para Vendas B2B
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              O CRM HUBRS permite gerenciar todo o funil comercial, acompanhar
              orçamentos e manter o histórico de relacionamento com clientes
              industriais.
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
      <Section>
        <SectionHeader
          title="Como trabalhamos"
          subtitle="Nosso processo para gerar resultados para indústrias"
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
      <Section variant="muted">
        <SectionHeader
          title="Perguntas Frequentes"
          subtitle="Tire suas dúvidas sobre marketing digital para indústrias"
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
                Pronto para fortalecer a presença digital da sua indústria?
              </h2>
              <p className="text-xl text-mavi-white/80 mb-8">
                Agende uma consultoria gratuita e descubra como podemos ajudar
                sua indústria a gerar mais negócios com marketing digital.
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

export default SegmentoIndustria;
