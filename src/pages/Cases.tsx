import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateCaseStudyListSchema } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { BlockHead, FaqBlock, FinalCta } from "@/components/service/ServiceBlocks";
import { TrendingUp, Award } from "lucide-react";

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

const stats = [
  { value: "+500", label: "Clientes atendidos" },
  { value: "R$50M+", label: "Em vendas geradas" },
  { value: "8.4x", label: "ROAS médio" },
  { value: "127%", label: "Crescimento médio" },
];

export default function Cases() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Cases", url: "/cases" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const caseStudyListSchema = generateCaseStudyListSchema(
    cases.map((c) => ({
      title: c.title,
      description: c.challenge,
      result: c.results.join(" | "),
    }))
  );

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, caseStudyListSchema],
  };

  return (
    <Layout>
      <SEO
        title="Cases de Sucesso: Resultados Reais de Clientes"
        description="Veja resultados reais de e-commerces, imobiliárias, clínicas e indústrias que cresceram com a MAVI. +R$50M em vendas geradas. Conheça nossos cases."
        canonical="/cases"
        schemaMarkup={combinedSchema}
      />

      {/* Hero: promessa à esquerda, números da MAVI à direita */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:gap-20 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp">
            <h1 className="text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4.2rem]">
              Cases &amp; <span className="text-primary">Clientes</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Resultados reais de negócios que confiaram na MAVI para crescer. De pequenas lojas a operações com múltiplos dígitos mensais.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={200}>
            <dl className="rounded-2xl border border-border bg-card px-7 py-2 shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)]">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center justify-between gap-4 border-b border-dashed border-input py-5 last:border-0">
                  <dt className="font-medium text-muted-foreground">{s.label}</dt>
                  <dd className={"text-3xl font-extrabold tabular-nums tracking-tight md:text-4xl " + (i === 0 ? "text-primary" : "text-foreground")}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </section>

      {/* Logos de clientes */}
      <div className="overflow-hidden border-y border-border bg-card py-8">
        <LogoCarousel />
      </div>

      {/* Cases: cada um em linha, com o resultado principal em destaque */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead
            title="Cases de Sucesso"
            subtitle="Situações reais de clientes que chegaram com um problema específico. Veja o que fizemos."
          />
          <div className="border-t-2 border-foreground">
            {cases.map((c) => {
              const [lead, ...rest] = c.results;
              return (
                <AnimatedSection key={c.title}>
                  <article className="grid gap-8 border-b border-border py-10 lg:grid-cols-[1fr,1fr,1.1fr] lg:gap-12 [&>*]:min-w-0">
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                        <Award className="h-4 w-4" aria-hidden="true" />
                        Case de Sucesso
                      </p>
                      <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{c.title}</h3>
                      <p className="mt-4 text-sm font-semibold text-muted-foreground">Desafio:</p>
                      <p className="mt-1 leading-relaxed text-foreground">{c.challenge}</p>
                    </div>
                    <div className="lg:border-l lg:border-border lg:pl-12">
                      <p className="text-sm font-semibold text-muted-foreground">Estratégia MAVI:</p>
                      <p className="mt-1 leading-relaxed text-foreground">{c.strategy}</p>
                    </div>
                    <div className="rounded-2xl bg-primary/5 p-6">
                      <p className="text-sm font-semibold text-primary">Resultados:</p>
                      <p className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-primary md:text-3xl">{lead}</p>
                      <ul className="mt-4 grid gap-2 border-t border-primary/15 pt-4">
                        {rest.map((r) => (
                          <li key={r} className="flex items-start gap-2.5 font-medium text-foreground">
                            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <FaqBlock
        title="Perguntas Frequentes"
        subtitle="Tire suas dúvidas sobre nossos cases e metodologia de trabalho."
        faqs={faqs}
      />

      <FinalCta
        title="Quer que a gente resolva um problema de verdade?"
        text="30 minutos pelo WhatsApp. A gente vê sua situação e fala o que faria."
        primary={{ label: "Quero uma consultoria", href: "/contato" }}
        secondary={{ label: "Conhecer o HUBRS CRM", href: "/hubrs-crm" }}
      />
    </Layout>
  );
}
