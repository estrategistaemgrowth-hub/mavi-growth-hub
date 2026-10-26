import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BlockHead, FaqBlock, FinalCta } from "@/components/service/ServiceBlocks";
import {
  Target,
  Users,
  BarChart3,
  Rocket,
  MessageSquare,
  Zap,
  ArrowRight,
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
    description: "Desenvolvimento de sistemas sob medida para mensurar e automatizar dados de performance: dashboards, integrações e ferramentas próprias que transformam operação em vantagem competitiva.",
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
    answer: "Sim. A partir de 2026, a MAVI expandiu para desenvolvimento de Micro SaaS sob medida, sistemas personalizados para automatizar processos, mensurar dados de performance e eliminar dependência de softwares genéricos.",
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
        "worksFor": { "@id": "https://www.agenciamavi.com.br/#organization" },
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
        title="Sobre a MAVI: Agência de Marketing em Jaraguá do Sul"
        description="Conheça a MAVI Marketing Digital. +5 anos de experiência, +500 clientes atendidos. Especialistas em performance e e-commerce em Jaraguá do Sul."
        canonical="/sobre"
        schemaMarkup={combinedSchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <AnimatedSection animation="fadeInUp" className="container-mavi relative">
          <h1 className="max-w-[16ch] text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4.2rem]">
            Quem é a <span className="text-primary">MAVI</span> Marketing?
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            Agência de performance fundada em Jaraguá do Sul em 2019. Operamos mídia, CRM e automação para quem precisa de receita previsível, não de slide bonito.
          </p>
        </AnimatedSection>
      </section>

      {/* Nossa trajetória: texto fixo à esquerda, linha do tempo por ano à direita */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-start gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-20 [&>*]:min-w-0">
          <div className="lg:sticky lg:top-28">
            <BlockHead title="Nossa trajetória" subtitle="De uma pequena agência local a referência em performance para e-commerces." />
            <div className="grid max-w-[58ch] gap-5 leading-relaxed text-muted-foreground">
              <p>
                Começamos em 2019 atendendo pequenas empresas locais. A pergunta sempre foi a mesma: quanto entrou de receita pra cada real investido em mídia?
              </p>
              <p>
                Em 2020 entramos pesado em e-commerce na Tray. Em 2024 lançamos o HubRS CRM porque planilha e WhatsApp solto não escalam. Hoje o CRM roda a operação de vendas dos clientes que atendemos.
              </p>
              <p>
                Mais de 500 negócios passaram pela MAVI. De loja com R$10k/mês a operação com 7 dígitos mensais. O método é o mesmo: tráfego, CRM e automação amarrados na mesma métrica de receita.
              </p>
            </div>
          </div>

          <ol className="relative border-l-2 border-border pl-8 md:pl-10">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative list-none pb-10 last:pb-0">
                <AnimatedSection>
                  <span
                    className={
                      "absolute -left-[calc(2rem+7px)] top-2 h-3 w-3 rounded-full ring-4 ring-card md:-left-[calc(2.5rem+7px)] " +
                      (i === timeline.length - 1 ? "bg-primary" : "bg-foreground")
                    }
                    aria-hidden="true"
                  />
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight text-primary md:text-5xl">{item.year}</span>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-1.5 max-w-[52ch] leading-relaxed text-muted-foreground">{item.description}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nosso jeito de trabalhar */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Nosso jeito de trabalhar" subtitle="Metodologia validada para entregar resultados consistentes." />
          <div className="grid border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {workStyle.map((item) => (
              <AnimatedSection
                key={item.title}
                className="border-b border-border py-7 sm:pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6"
              >
                <item.icon className="mb-4 h-[30px] w-[30px] text-primary" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso time: linhas em duas colunas */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Nosso time" subtitle="Especialistas dedicados a cada área do seu projeto." />
          <div className="grid gap-x-12 border-t border-border md:grid-cols-2">
            {team.map((member) => (
              <AnimatedSection key={member.role} className="group flex items-center gap-4 border-b border-border py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold tracking-tight text-foreground">{member.role}</h3>
                  <p className="text-[15px] text-muted-foreground">{member.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HubRS CRM: texto à esquerda, bloco magenta à direita */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              HubRS CRM: o motor por trás da operação
            </h2>
            <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              Cansamos de ver lead bom morrer no WhatsApp do vendedor. Construímos o HubRS pra puxar o lead da campanha, qualificar com IA e empurrar pro funil até virar venda.
            </p>
            <ul className="mb-8 mt-7 grid gap-3">
              {[
                "Centralização de todos os contatos e leads",
                "Automação de WhatsApp com IA",
                "Integração direta com Meta Ads",
                "Funil visual para acompanhamento de vendas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-border pb-3 font-medium text-foreground">
                  <Zap className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/hubrs-crm">
                Conhecer o HubRS CRM
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-8 text-white md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <MessageSquare className="h-12 w-12 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight">HubRS CRM</h3>
                  <p className="font-semibold text-white/85">Desenvolvido pela MAVI</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/25">
                {[
                  { v: "24/7", l: "Atendimento IA" },
                  { v: "3x", l: "Mais conversões" },
                ].map((s) => (
                  <div key={s.l} className="bg-primary px-5 py-4">
                    <p className="text-3xl font-extrabold tracking-tight">{s.v}</p>
                    <p className="text-sm text-white/85">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqBlock
        title="Perguntas frequentes sobre a MAVI"
        subtitle="Tire suas dúvidas sobre nossa história, metodologia e serviços."
        faqs={faqs}
      />

      <FinalCta
        title="Quer conhecer mais sobre a MAVI?"
        text="Entre em contato e descubra como podemos ajudar seu negócio a crescer."
        primary={{ label: "Falar com a MAVI", href: "/contato" }}
      />
    </Layout>
  );
}
