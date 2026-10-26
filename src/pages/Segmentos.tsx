import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, BlockHead } from "@/components/service/ServiceBlocks";
import { cn } from "@/lib/utils";
import { SEO, generateBreadcrumbSchema } from "@/components/SEO";
import {
  ShoppingCart,
  Building2,
  Factory,
  Stethoscope,
  Store,
  ArrowRight,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const segments = [
  {
    icon: ShoppingCart,
    title: "E-commerce e Varejo Online",
    description:
      "Lojas virtuais, marketplaces e estratégias de vendas online. Especialistas em Tray, Mercado Livre, Shopee e Amazon.",
    benefits: [
      "Lojas Tray com implementação completa",
      "Gestão de múltiplos marketplaces",
      "Tráfego pago focado em ROAS",
      "Automação de atendimento",
    ],
    href: "/servicos/ecommerce",
    cta: "Ver soluções para E-commerce",
    featured: true,
  },
  {
    icon: Building2,
    title: "Imobiliárias e Corretoras",
    description:
      "Geração de leads qualificados para venda e locação de imóveis. CRM especializado para corretores e gestão de carteira.",
    benefits: [
      "Campanhas de captação de leads",
      "CRM para gestão de clientes",
      "Sites e landing pages de imóveis",
      "Automação de follow-up",
    ],
    href: "/segmentos/imobiliarias",
    cta: "Ver soluções para Imobiliárias",
    featured: false,
  },
  {
    icon: Factory,
    title: "Indústria e B2B",
    description:
      "Presença digital profissional, geração de leads B2B e estratégias de relacionamento para indústrias e fabricantes.",
    benefits: [
      "Sites institucionais profissionais",
      "Geração de leads qualificados B2B",
      "LinkedIn Ads e Google Ads",
      "Catálogos digitais",
    ],
    href: "/segmentos/industria",
    cta: "Ver soluções para Indústria",
    featured: false,
  },
  {
    icon: Stethoscope,
    title: "Saúde e Estética",
    description:
      "Marketing para clínicas de estética, salões, spas e consultórios. Geração de leads, automação de agendamentos e fidelização de clientes.",
    benefits: [
      "Campanhas por procedimento",
      "Automação de confirmação de agenda",
      "CRM para pacientes e clientes",
      "Landing pages de conversão",
    ],
    href: "/segmentos/saude-estetica",
    cta: "Ver soluções para Saúde e Estética",
    featured: false,
  },
  {
    icon: Store,
    title: "Serviços Locais",
    description:
      "Estratégias de marketing local para prestadores de serviços, restaurantes, academias e negócios com atendimento presencial.",
    benefits: [
      "SEO local e Google Meu Negócio",
      "Redes sociais focadas em conversão",
      "WhatsApp Business automatizado",
      "Campanhas de alcance local",
    ],
    href: "/contato",
    cta: "Fale com especialista",
    featured: false,
  },
];

const stats = [
  { value: "500+", label: "Clientes atendidos" },
  { value: "15+", label: "Segmentos diferentes" },
  { value: "5+", label: "Anos de experiência" },
  { value: "R$50M+", label: "Em vendas geradas" },
];

const Segmentos = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
  ]);

  return (
    <Layout>
      <SEO
        title="Segmentos: E-commerce, Imobiliárias e Indústria"
        description="Marketing digital especializado por segmento. Soluções personalizadas para e-commerce, imobiliárias, indústrias, saúde e serviços locais. Conheça nossos cases."
        canonical="/segmentos"
        schemaMarkup={breadcrumbSchema}
      />

      <ServiceHero
        icon={Target}
        badge="Segmentos que Atendemos"
        title={<>Soluções de marketing <span className="text-primary">personalizadas</span> para o seu segmento</>}
        lead="Não faz sentido aplicar a mesma estratégia de e-commerce numa imobiliária. Por isso cada segmento tem abordagem diferente, com métricas, canais e objetivos específicos."
        primary={{ label: "Fale com um especialista", href: "/contato" }}
        secondary={{ label: "Ver cases de sucesso", href: "/cases" }}
        stats={stats}
      />

      {/* Segmentos em linhas */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead
            title="Encontre a solução ideal para o seu negócio"
            subtitle="Conheça as estratégias que desenvolvemos para cada tipo de empresa"
          />
          <div className="border-t-2 border-foreground">
            {segments.map((segment) => (
              <AnimatedSection key={segment.title}>
                <Link
                  to={segment.href}
                  className="group grid gap-5 border-b border-border py-8 transition-colors hover:bg-primary/[0.03] md:grid-cols-[auto,1fr,1fr] md:items-start md:gap-10 md:px-2"
                >
                  <span
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl transition-colors",
                      segment.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    <segment.icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{segment.title}</h3>
                      {segment.featured && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Especialidade</span>
                      )}
                    </div>
                    <p className="mt-2 max-w-[50ch] leading-relaxed text-muted-foreground">{segment.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
                      {segment.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                  <ul className="flex flex-wrap content-start gap-2">
                    {segment.benefits.map((benefit) => (
                      <li key={benefit} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Por que a MAVI */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-5 inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">Por que a MAVI?</span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Mais de 15 segmentos atendidos
            </h2>
            <p className="mb-8 mt-4 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              Com mais de 5 anos atendendo tipos de negócio bem diferentes, a gente aprendeu que o que funciona numa clínica raramente funciona numa loja virtual. Cada caso tem suas variáveis.
            </p>
            <div className="border-t-2 border-foreground">
              {[
                { icon: Target, title: "Estratégia Personalizada", text: "Nada de soluções genéricas. Desenvolvemos estratégias específicas para cada cliente." },
                { icon: TrendingUp, title: "Foco em Resultados", text: "Métricas claras, relatórios transparentes e otimização contínua para maximizar ROI." },
                { icon: Users, title: "Equipe Especializada", text: "Profissionais certificados em Google, Meta e RD Station dedicados ao seu projeto." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 border-b border-border py-5">
                  <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-10 text-white md:p-14">
              <div className="text-7xl font-extrabold tracking-tight md:text-8xl">500+</div>
              <p className="mt-4 text-xl font-semibold">Clientes satisfeitos</p>
              <p className="mt-1 text-white/85">Em mais de 15 segmentos diferentes</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-primary/15 bg-primary/5 py-20 text-center md:py-28">
        <AnimatedSection className="container-mavi">
          <h2 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-5xl">
            Não encontrou seu segmento?
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-[56ch] text-lg text-muted-foreground">
            Atendemos tipos de negócio que não estão listados aqui. Manda mensagem e a gente avalia se faz sentido.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="group">
              <Link to="/diagnostico-gratuito">
                Solicitar diagnóstico gratuito
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a
                href="https://wa.me/5547996810630?text=Olá! Gostaria de saber mais sobre os serviços da MAVI para meu segmento."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default Segmentos;
