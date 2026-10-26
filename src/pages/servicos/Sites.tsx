import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { 
  Globe, 
  ArrowRight,
  AlertCircle,
  Clock,
  Search,
  MousePointer,
  Zap,
  BarChart3,
  Smartphone,
  Target,
  TrendingUp,
  FileText,
  Code
} from "lucide-react";

const problems = [
  { icon: Clock, title: "Site desatualizado?", description: "Design antigo que passa imagem de empresa amadora." },
  { icon: AlertCircle, title: "Não aparece no Google?", description: "SEO fraco que impede clientes de te encontrarem." },
  { icon: MousePointer, title: "Visitantes não convertem?", description: "Página sem estrutura de conversão perde vendas." },
  { icon: Smartphone, title: "Ruim no celular?", description: "Site que não funciona bem em mobile afasta 60% do tráfego." },
];

const features = [
  "Sites institucionais modernos e responsivos",
  "Landing pages de alta conversão",
  "SEO básico configurado",
  "Instalação de pixels e tags de rastreamento",
  "Otimização para anúncios pagos",
  "Design focado em conversão",
  "Formulários de captação integrados",
  "Velocidade de carregamento otimizada",
];

const benefits = [
  { icon: Target, title: "Foco em conversão", description: "Design e estrutura pensados para transformar visitantes em leads e clientes." },
  { icon: Search, title: "SEO configurado", description: "Estrutura otimizada para aparecer nas buscas do Google." },
  { icon: Zap, title: "Velocidade máxima", description: "Sites rápidos que não fazem o visitante desistir." },
  { icon: BarChart3, title: "Rastreamento completo", description: "Pixels e tags instalados para medir cada conversão." },
];

const pageTypes = [
  { 
    title: "Site Institucional", 
    description: "Presença digital completa para sua empresa", 
    features: ["5 a 10 páginas", "Design personalizado", "Responsivo", "SEO básico"],
    icon: Globe
  },
  { 
    title: "Landing Page", 
    description: "Página única focada em conversão", 
    features: ["Uma página", "Alta conversão", "Teste A/B", "Integração ads"],
    icon: MousePointer
  },
  { 
    title: "Site + Blog", 
    description: "Institucional com área de conteúdo", 
    features: ["Site completo", "Blog integrado", "SEO avançado", "Painel admin"],
    icon: FileText
  },
];

const process = [
  { step: "1", title: "Briefing", description: "Entendemos seu negócio e objetivos" },
  { step: "2", title: "Design", description: "Criamos o layout personalizado" },
  { step: "3", title: "Desenvolvimento", description: "Construímos o site otimizado" },
  { step: "4", title: "Entrega", description: "Publicamos e configuramos tudo" },
];

const stats = [
  { end: 150, prefix: "+", suffix: "", label: "Sites criados" },
  { end: 15, prefix: "", suffix: " dias", label: "Prazo médio" },
  { end: 85, prefix: "+", suffix: "%", label: "Taxa de conversão" },
  { end: 100, prefix: "", suffix: "%", label: "Responsivos" },
];

const faqs = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "Sites institucionais simples ficam prontos em 10 a 15 dias úteis. Landing pages em 5 a 7 dias. Projetos mais complexos com funcionalidades específicas podem levar até 30 dias."
  },
  {
    question: "O site será responsivo (funcionar em celular)?",
    answer: "Sim, todos os nossos sites são 100% responsivos e otimizados para funcionar perfeitamente em qualquer dispositivo: desktop, tablet e smartphone."
  },
  {
    question: "Vocês fazem a hospedagem do site?",
    answer: "Podemos hospedar em sua infraestrutura existente ou recomendar e configurar a hospedagem ideal para seu projeto. Também oferecemos planos de manutenção com hospedagem inclusa."
  },
  {
    question: "O que está incluso no SEO básico?",
    answer: "Inclui: estrutura de headings otimizada, meta tags, sitemap, velocidade de carregamento, imagens otimizadas, schema markup básico e configuração do Google Search Console."
  },
  {
    question: "Posso atualizar o conteúdo depois?",
    answer: "Sim, entregamos o site com painel administrativo onde você pode atualizar textos, imagens e publicar novos conteúdos sem precisar de conhecimento técnico."
  },
];

export default function ServicoSites() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Sites e Landing Pages", url: "/servicos/sites" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Criação de Sites e Landing Pages de Alta Conversão",
    description: "Sites institucionais e landing pages focados em conversão. SEO configurado, design responsivo e otimização para campanhas de mídia paga.",
    url: "/servicos/sites",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Criação de Sites e Landing Pages de Alta Conversão"
        description="Sites institucionais e landing pages focados em conversão. SEO configurado, design responsivo e prazo de 15 dias. Solicite orçamento."
        canonical="/servicos/sites"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={Globe}
        badge="Sites e Landing Pages"
        title={<>Sites que <span className="text-primary">convertem visitantes em clientes</span></>}
        lead="Páginas pensadas para converter. Sites institucionais profissionais e landing pages otimizadas para suas campanhas de mídia paga."
        primary={{ label: "Quero criar meu site", href: "/contato" }}
        secondary={{ label: "Preciso de tráfego pago", href: "/servicos/performance" }}
        stats={stats.map((s) => ({
          value: <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />,
          label: s.label,
        }))}
      />

      <ProblemPicker
        title="Reconhece algum desses problemas?"
        subtitle="Se você enfrenta alguma dessas situações, podemos ajudar."
        problems={problems}
      />

      {/* Tipos de projeto: colunas comparáveis, separadas por linhas */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Tipos de projeto" subtitle="Escolha a solução ideal para o seu negócio." />
          <div className="grid border-t-2 border-foreground md:grid-cols-3">
            {pageTypes.map((type) => (
              <AnimatedSection key={type.title} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <type.icon className="mb-5 h-8 w-8 text-primary" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{type.title}</h3>
                <p className="mb-5 mt-2 text-muted-foreground">{type.description}</p>
                <ul className="grid gap-2">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 font-medium text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.6} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
          <Button asChild variant="hero" size="lg" className="group mt-10">
            <Link to="/contato">
              Solicitar Orçamento
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Processo: sequência real, então os passos são numerados */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Como trabalhamos" subtitle="Processo simples e transparente do início ao fim." />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step) => (
              <AnimatedSection key={step.title}>
                <li className="border-t-2 border-primary pt-6">
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-primary">{step.step}</span>
                  <h3 className="mb-2 mt-4 text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="Design e desenvolvimento focados em resultado."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Integração com anúncios + tecnologias */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              Integração completa
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Sites prontos para suas campanhas
            </h2>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              Todos os nossos sites já são entregues com pixels e tags configurados, prontos para receber tráfego de campanhas de Meta Ads e Google Ads com rastreamento completo de conversões.
            </p>
            <ul className="mb-8 mt-7 grid gap-3">
              {[
                "Pixel do Facebook/Meta instalado",
                "Google Analytics 4 configurado",
                "Google Tag Manager implementado",
                "Eventos de conversão configurados",
                "Integração com CRM (opcional)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg" className="group">
                <Link to="/contato">
                  Criar meu site otimizado
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/servicos/performance">Ver serviço de Performance</Link>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-8 text-white md:p-10">
              <Code className="mb-6 h-10 w-10" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="text-2xl font-extrabold tracking-tight">Tecnologias modernas</h3>
              <p className="mb-6 mt-3 leading-relaxed text-white/90">
                Usamos as tecnologias mais modernas do mercado para garantir velocidade, segurança e facilidade de manutenção.
              </p>
              <dl className="grid">
                {[
                  { name: "WordPress", use: "Sites dinâmicos" },
                  { name: "React", use: "Landing pages" },
                  { name: "Next.js", use: "Alta performance" },
                  { name: "Tailwind", use: "Design moderno" },
                ].map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-4 border-b border-white/25 py-3 last:border-0">
                    <dt className="font-bold">{t.name}</dt>
                    <dd className="text-sm text-white/85">{t.use}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre criação de sites." faqs={faqs} />

      <FinalCta
        title="Precisa de um site ou landing page?"
        text="Entre em contato e receba uma proposta personalizada para o seu projeto. Sites a partir de 15 dias úteis."
        primary={{ label: "Solicitar Proposta", href: "/contato" }}
        secondary={{ label: "Ver outros serviços", href: "/servicos" }}
      />
    </Layout>
  );
}
