import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { TrendingUp, ArrowRight, Award } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cases = [
  {
    title: "E-commerce de Eletrônicos",
    challenge: "Loja virtual nova, sem tráfego qualificado e operação desorganizada sem CRM.",
    strategy: "Implementação de loja Tray + campanhas Meta Ads full funnel + HUBRS CRM para gestão de leads.",
    results: [
      "+320% de faturamento em 6 meses",
      "ROAS de 8.7x nas campanhas",
      "47 leads qualificados/dia via CRM",
    ],
  },
  {
    title: "Moda Feminina",
    challenge: "Alto volume de mensagens no WhatsApp sem controle, perdendo vendas por falta de follow-up.",
    strategy: "HUBRS CRM com automação de WhatsApp + IA para qualificação + integração com Meta Ads.",
    results: [
      "+180% em conversões de WhatsApp",
      "Tempo de resposta: de 4h para 5min",
      "Zero leads perdidos",
    ],
  },
  {
    title: "Suplementos e Marketplaces",
    challenge: "Operação em múltiplos marketplaces sem padronização e sem clareza sobre rentabilidade por canal.",
    strategy: "Gestão integrada de marketplaces + ERP + dashboard de performance por canal.",
    results: [
      "+250% de vendas em marketplaces",
      "Margem aumentada em 15%",
      "4 novos canais ativados",
    ],
  },
  {
    title: "Imobiliária Regional",
    challenge: "Leads chegando por múltiplos canais sem controle, corretores perdendo oportunidades de follow-up.",
    strategy: "HUBRS CRM integrado com portais imobiliários + automação de WhatsApp + landing pages otimizadas.",
    results: [
      "+200% de leads qualificados",
      "Ciclo de venda reduzido em 40%",
      "Zero lead sem resposta",
    ],
  },
  {
    title: "Clínica de Estética",
    challenge: "Alta taxa de no-show em agendamentos e dificuldade em fidelizar pacientes para tratamentos contínuos.",
    strategy: "Automação de lembretes via WhatsApp + campanhas de reativação + CRM para acompanhamento de procedimentos.",
    results: [
      "-65% de no-show",
      "+85% em retorno de pacientes",
      "Agenda sempre cheia",
    ],
  },
];

const faqs = [
  {
    question: "Quanto tempo leva para ver resultados nas campanhas?",
    answer: "Os primeiros resultados aparecem em 30-60 dias, com crescimento consistente a partir do terceiro mês de trabalho contínuo. Cada negócio tem seu ritmo, mas trabalhamos com metas claras desde o início.",
  },
  {
    question: "Vocês trabalham com empresas de qualquer tamanho?",
    answer: "Sim! Atendemos desde pequenos e-commerces e negócios locais até operações com faturamento de múltiplos dígitos mensais, adaptando as estratégias conforme o porte e os objetivos.",
  },
  {
    question: "Como é calculado o ROAS apresentado nos cases?",
    answer: "O ROAS (Return on Ad Spend) é calculado dividindo o faturamento atribuído às campanhas pelo investimento em mídia, rastreado via pixels de conversão, UTMs e integração com os sistemas de vendas do cliente.",
  },
  {
    question: "Posso ver cases específicos do meu segmento?",
    answer: "Entre em contato conosco! Temos cases em diversos segmentos como e-commerce, imobiliárias, clínicas, indústrias e serviços que podemos compartilhar de forma personalizada durante nossa conversa inicial.",
  },
  {
    question: "Como funciona a consultoria gratuita?",
    answer: "Você explica sua situação. A gente analisa e diz o que faria, com ou sem você nos contratar.",
  },
];


export default function Cases() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Cases", url: "/cases" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Cases de Sucesso - Resultados Reais de Clientes MAVI"
        description="Veja resultados reais de e-commerces, imobiliárias, clínicas e indústrias que cresceram com a MAVI. +R$50M em vendas geradas. Conheça nossos cases."
        canonical="/cases"
        schemaMarkup={combinedSchema}
      />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Cases & <span className="text-primary">Clientes</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Resultados reais de negócios que confiaram na MAVI para crescer. 
              De pequenas lojas a operações com múltiplos dígitos mensais.
            </p>
          </div>
        </div>
      </section>


      {/* Cases */}
      <Section>
        <SectionHeader
          title="Cases de Sucesso"
          subtitle="Situações reais de clientes que chegaram com um problema específico. Veja o que fizemos."
        />
        <div className="space-y-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="grid md:grid-cols-3">
                <div className="p-6 md:p-8 bg-mavi-gray">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Case de Sucesso</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{caseItem.title}</h3>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Desafio:</p>
                    <p className="text-foreground text-sm leading-relaxed">{caseItem.challenge}</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 border-y md:border-y-0 md:border-x border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Estratégia MAVI:</p>
                  <p className="text-foreground leading-relaxed">{caseItem.strategy}</p>
                </div>
                <div className="p-6 md:p-8 bg-primary/5">
                  <p className="text-sm font-medium text-primary mb-4">Resultados:</p>
                  <div className="space-y-3">
                    {caseItem.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section variant="dark">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">+500</p>
            <p className="text-mavi-white/70">Clientes atendidos</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">R$50M+</p>
            <p className="text-mavi-white/70">Em vendas geradas</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">8.4x</p>
            <p className="text-mavi-white/70">ROAS médio</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">127%</p>
            <p className="text-mavi-white/70">Crescimento médio</p>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionHeader
          title="Perguntas Frequentes"
          subtitle="Tire suas dúvidas sobre nossos cases e metodologia de trabalho."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-foreground font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="gray">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quer que a gente resolva um problema de verdade?
          </h2>
          <p className="text-muted-foreground mb-8">
            30 minutos pelo WhatsApp. A gente vê sua situação e fala o que faria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contato">Quero uma consultoria</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/hubrs-crm">
                Conhecer o HUBRS CRM
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
