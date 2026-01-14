import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
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
    title: "Saúde e Clínicas",
    description:
      "Marketing médico ético, agendamento online e gestão de relacionamento com pacientes para clínicas e profissionais de saúde.",
    benefits: [
      "Sites com agendamento online",
      "Google Meu Negócio otimizado",
      "Campanhas de captação local",
      "CRM para pacientes",
    ],
    href: "/contato",
    cta: "Fale com especialista",
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
        title="Segmentos Atendidos - E-commerce, Imobiliárias, Indústria e Mais"
        description="Marketing digital especializado por segmento. Soluções personalizadas para e-commerce, imobiliárias, indústrias, saúde e serviços locais. Conheça nossos cases."
        canonical="/segmentos"
        schemaMarkup={breadcrumbSchema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(230,0,126,0.15),transparent_50%)]" />

        <div className="container-mavi relative z-10 py-20">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Segmentos que Atendemos
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 leading-tight">
              Soluções de marketing{" "}
              <span className="text-primary">personalizadas</span> para o seu
              segmento
            </h1>
            <p className="text-xl text-mavi-white/80 mb-8 max-w-2xl">
              Cada negócio tem suas particularidades. Por isso, desenvolvemos
              estratégias específicas para cada segmento, garantindo resultados
              que fazem sentido para a sua realidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contato">Fale com um especialista</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/cases">Ver cases de sucesso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container-mavi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mavi-white mb-1">
                  {stat.value}
                </div>
                <div className="text-mavi-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments Grid */}
      <Section>
        <SectionHeader
          title="Encontre a solução ideal para o seu negócio"
          description="Conheça as estratégias que desenvolvemos para cada tipo de empresa"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-primary/30 overflow-hidden ${
                segment.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {segment.featured && (
                <div className="absolute top-4 right-4 bg-primary text-mavi-white text-xs font-medium px-3 py-1 rounded-full">
                  Especialidade
                </div>
              )}

              <div className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <segment.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {segment.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {segment.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {segment.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  to={segment.href}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  {segment.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose MAVI Section */}
      <Section variant="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
              Por que a MAVI?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Expertise que transcende segmentos
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Com mais de 5 anos de experiência atendendo diversos tipos de
              negócios, entendemos que cada segmento tem suas particularidades,
              desafios e oportunidades únicas.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Estratégia Personalizada
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Nada de soluções genéricas. Desenvolvemos estratégias
                    específicas para cada cliente.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Foco em Resultados
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Métricas claras, relatórios transparentes e otimização
                    contínua para maximizar ROI.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Equipe Especializada
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Profissionais certificados em Google, Meta e RD Station
                    dedicados ao seu projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">500+</div>
                <p className="text-xl text-foreground font-medium mb-2">
                  Clientes satisfeitos
                </p>
                <p className="text-muted-foreground">
                  Em mais de 15 segmentos diferentes
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(230,0,126,0.2),transparent_50%)]" />

        <div className="container-mavi relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
            Não encontrou seu segmento?
          </h2>
          <p className="text-xl text-mavi-white/80 mb-8 max-w-2xl mx-auto">
            Atendemos diversos tipos de negócios. Entre em contato e vamos
            conversar sobre como podemos ajudar sua empresa a crescer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">Solicitar diagnóstico gratuito</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <a
                href="https://wa.me/554733072030?text=Olá! Gostaria de saber mais sobre os serviços da MAVI para meu segmento."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Segmentos;
