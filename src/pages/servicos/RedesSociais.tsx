import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Facebook,
  AlertCircle,
  Clock,
  Eye,
  Heart,
  TrendingUp,
  Calendar,
  Palette,
  BarChart3,
  Zap
} from "lucide-react";

const problems = [
  { icon: Clock, title: "Sem tempo para postar?", description: "Redes abandonadas passam imagem de empresa inativa." },
  { icon: AlertCircle, title: "Conteúdo sem estratégia?", description: "Postagens aleatórias que não geram resultado." },
  { icon: Eye, title: "Poucos seguidores engajados?", description: "Números que não se convertem em vendas." },
  { icon: Heart, title: "Falta de identidade visual?", description: "Feed desorganizado sem padrão profissional." },
];

const features = [
  "Gestão de Instagram e Facebook",
  "Conteúdo estratégico focado em conversão",
  "Planejamento de calendário editorial",
  "Criação de criativos e peças visuais",
  "Relatórios mensais de performance",
  "Integração com estratégia de tráfego pago",
  "Stories e Reels estratégicos",
  "Respostas a comentários e DMs",
];

const benefits = [
  { icon: Calendar, title: "Consistência garantida", description: "Calendário editorial planejado para nunca ficar sem conteúdo." },
  { icon: Palette, title: "Identidade visual forte", description: "Feed organizado e profissional que transmite credibilidade." },
  { icon: TrendingUp, title: "Conteúdo que converte", description: "Estratégia focada em gerar vendas, não apenas curtidas." },
  { icon: Zap, title: "Integração com ads", description: "Conteúdo orgânico que potencializa suas campanhas pagas." },
];

const deliverables = [
  { title: "8 a 12 posts/mês", description: "Conteúdo de feed estratégico" },
  { title: "Stories diários", description: "Presença constante nos stories" },
  { title: "2 a 4 Reels/mês", description: "Vídeos curtos de alto engajamento" },
  { title: "Relatório mensal", description: "Análise de métricas e insights" },
];

const stats = [
  { end: 150, prefix: "+", suffix: "%", label: "Engajamento médio" },
  { end: 80, prefix: "+", suffix: "", label: "Contas gerenciadas" },
  { end: 3, prefix: "", suffix: "x", label: "Mais alcance orgânico" },
  { end: 24, prefix: "", suffix: "h", label: "Tempo de resposta" },
];

const faqs = [
  {
    question: "Quantos posts por mês estão inclusos?",
    answer: "Nossos planos variam de 8 a 12 posts de feed por mês, além de stories diários e 2 a 4 Reels. Personalizamos conforme a necessidade e orçamento de cada cliente."
  },
  {
    question: "Vocês criam todo o conteúdo visual?",
    answer: "Sim, nossa equipe de design cria todas as peças visuais (posts, stories, capas de Reels). Também produzimos roteiros para vídeos e podemos gravar conteúdo se necessário."
  },
  {
    question: "Como funciona a aprovação de conteúdo?",
    answer: "Enviamos o calendário editorial com antecedência para aprovação. Você visualiza todos os posts, textos e criativos antes de irem ao ar e pode solicitar ajustes."
  },
  {
    question: "Vocês respondem comentários e mensagens?",
    answer: "Sim, monitoramos e respondemos comentários e mensagens diretas seguindo um protocolo alinhado com você. Questões complexas são encaminhadas para seu time."
  },
  {
    question: "Posso integrar com tráfego pago?",
    answer: "Com certeza! Na verdade, recomendamos. O conteúdo orgânico potencializa as campanhas pagas e vice-versa. Oferecemos pacotes integrados com desconto."
  },
];

export default function ServicoRedesSociais() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Redes Sociais e Conteúdo", url: "/servicos/redes-sociais" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Gestão de Redes Sociais - Conteúdo Estratégico",
    description: "Gestão de Instagram e Facebook com foco em conversão. Calendário editorial, criativos profissionais e integração com tráfego pago.",
    url: "/servicos/redes-sociais",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Gestão de Redes Sociais - Conteúdo Estratégico"
        description="Gestão de Instagram e Facebook com foco em conversão. Posts, stories, Reels e integração com tráfego pago. Solicite proposta."
        canonical="/servicos/redes-sociais"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={Users}
        badge="Redes Sociais e Conteúdo"
        title={<>Conteúdo que <span className="text-primary">engaja e vende</span></>}
        lead="Gestão estratégica de redes sociais com criativos que vendem. Conteúdo planejado para engajar, relacionar e converter seguidores em clientes."
        primary={{ label: "Quero profissionalizar minhas redes", href: "/contato" }}
        secondary={{ label: "Preciso de tráfego pago", href: "/servicos/performance" }}
        stats={stats.map((s) => ({
          value: <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />,
          label: s.label,
        }))}
      />

      <ProblemPicker
        title="Isso soa familiar?"
        subtitle="Se você enfrenta algum desses problemas, podemos ajudar."
        problems={problems}
      />

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="Social media pensado para resultado, não apenas para vaidade."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Plataformas: Instagram em magenta, Facebook em branco */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Plataformas que gerenciamos" subtitle="Presença profissional nas redes que importam para o seu negócio." />
          <div className="grid gap-4 md:grid-cols-[1.15fr,0.85fr]">
            <AnimatedSection animation="fadeInUp">
              <div className="flex h-full flex-col justify-between gap-10 rounded-2xl bg-primary p-8 text-white md:p-10">
                <Instagram className="h-12 w-12" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight">Instagram</h3>
                  <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-white/90">
                    Feed, Stories, Reels, Lives - gestão completa para máximo engajamento e conversão.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="flex h-full flex-col justify-between gap-10 rounded-2xl border border-border bg-background p-8 md:p-10">
                <Facebook className="h-12 w-12 text-primary" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight text-foreground">Facebook</h3>
                  <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
                    Página, grupos, marketplace - aproveitando todo o ecossistema para alcançar seu público.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Entregas do mês: números grandes sobre uma linha */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="O que você recebe todo mês" subtitle="Entregas consistentes para manter suas redes sempre atualizadas." />
          <div className="grid border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((item) => (
              <AnimatedSection
                key={item.title}
                className="border-b border-border py-7 sm:pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6"
              >
                <p className="text-3xl font-extrabold tracking-tight text-primary">{item.title}</p>
                <p className="mt-2 text-[15px] text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Orgânico + Pago: texto à esquerda, resultados num painel em linhas */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              Estratégia integrada
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Orgânico + Pago = Resultados exponenciais
            </h2>
            <p className="mb-7 mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              Quando combinamos gestão de redes sociais com tráfego pago, os resultados se multiplicam. O conteúdo orgânico fortalece a marca enquanto os anúncios aceleram as vendas.
            </p>
            <ul className="mb-8 grid gap-3">
              {[
                "Conteúdo orgânico aquece o público para os anúncios",
                "Criativos testados organicamente viram ads",
                "Prova social aumenta conversão de campanhas",
                "Remarketing com conteúdo de valor",
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
                  Quero uma estratégia integrada
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/servicos/performance">Ver serviço de Performance</Link>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl border border-border bg-background px-7 py-2">
              <div className="flex items-center gap-4 border-b border-border py-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                  <BarChart3 className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Resultados combinados</h3>
                  <p className="text-muted-foreground">Orgânico + Performance</p>
                </div>
              </div>
              {[
                { v: "+200%", l: "Alcance total" },
                { v: "+150%", l: "Engajamento" },
                { v: "-30%", l: "Custo por lead" },
                { v: "+80%", l: "Conversões" },
              ].map((m) => (
                <div key={m.l} className="flex items-center justify-between gap-4 border-b border-dashed border-input py-5 last:border-0">
                  <span className="font-medium text-muted-foreground">{m.l}</span>
                  <span className="text-3xl font-extrabold tabular-nums tracking-tight text-primary">{m.v}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre o serviço de Redes Sociais." faqs={faqs} />

      <FinalCta
        title="Pronto para profissionalizar suas redes?"
        text="Entre em contato e receba uma proposta de gestão de redes sociais personalizada para o seu negócio."
        primary={{ label: "Solicitar Proposta", href: "/contato" }}
        secondary={{ label: "Ver outros serviços", href: "/servicos" }}
      />
    </Layout>
  );
}
