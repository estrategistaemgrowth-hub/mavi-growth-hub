import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { LogoCarousel } from "@/components/LogoCarousel";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection, AnimatedChildren } from "@/components/AnimatedSection";
import { CyclingTypewriter } from "@/components/CyclingTypewriter";
import { PainChat } from "@/components/home/PainChat";
import { SEO, generateBreadcrumbSchema, generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from "@/components/SEO";
import { cn } from "@/lib/utils";
import seloGoogle from "@/assets/selos/google-premier-partner.png";
import seloMeta from "@/assets/selos/meta-partner.webp";
import seloTray from "@/assets/selos/tray-diamante.png";
import seloRd from "@/assets/selos/rd-station-partner.webp";
import camilaAvatar from "@/assets/camila-avatar.jpg";
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Store,
  Globe,
  Bot,
  BarChart3,
  Target,
  Zap,
  MessageSquare,
  MessageCircle,
  Check,
  ArrowRight,
  Blocks,
  Star,
  Plus,
  type LucideIcon,
} from "lucide-react";

const services: { title: string; description: string; icon: LucideIcon; href: string; highlight?: boolean; external?: boolean }[] = [
  {
    title: "E-commerce e Lojas Virtuais",
    description: "Criação, implantação e otimização de lojas virtuais com foco em vendas, especialmente na plataforma Tray e integrações com outros canais.",
    icon: ShoppingCart,
    href: "/servicos/ecommerce",
  },
  {
    title: "Marketing de Performance",
    description: "Gestão de tráfego pago, funis de vendas, campanhas full funnel (Meta Ads, Google Ads) e otimização diária de resultados.",
    icon: TrendingUp,
    href: "/servicos/performance",
  },
  {
    title: "Redes Sociais e Conteúdo",
    description: "Gestão estratégica de redes sociais com criativos que vendem, planejamento de conteúdo e social media baseado em performance.",
    icon: Users,
    href: "/servicos/redes-sociais",
  },
  {
    title: "Marketplaces & ERP",
    description: "Gestão de marketplaces, cadastro de produtos, integrações com ERP e logística em canais como Mercado Livre, Magalu e Amazon.",
    icon: Store,
    href: "/servicos/marketplaces",
  },
  {
    title: "Sites e Landing Pages",
    description: "Criação de sites institucionais e páginas de captura focadas em conversão, com SEO básico e rastreamento para mídia.",
    icon: Globe,
    href: "/servicos/sites",
  },
  {
    title: "Automação & IA",
    description: "Implantação de chatbots, fluxos automatizados e integrações com CRM para escalar vendas e suporte.",
    icon: Bot,
    href: "/servicos/automacao",
  },
  {
    title: "Micro SaaS",
    description: "Pare de pagar forever por ferramentas genéricas. Tenha o sistema da sua empresa: painel, automações e integrações feitos sob medida pra sua operação.",
    icon: Blocks,
    href: "/servicos/micro-saas",
    highlight: true,
  },
  {
    title: "CRM HUBRS",
    description: "CRM desenvolvido pela MAVI para centralizar contatos, automatizar WhatsApp, usar IA no atendimento e conectar campanhas direto no funil.",
    icon: MessageSquare,
    href: "/hubrs-crm",
  },
  {
    // Texto da própria página do Zaptrix (zaptrix.agenciamavi.com.br)
    title: "Zaptrix",
    description: "IA que atende e vende pelo WhatsApp para lojistas. Cadastre o produto com foto, preço e link de pagamento: a IA manda a foto, confere o estoque, entende áudio e envia o link na hora da compra.",
    icon: MessageCircle,
    href: "https://zaptrix.agenciamavi.com.br",
    highlight: true,
    external: true,
  },
];

const differentials = [
  {
    title: "Especialistas em e-commerce",
    description: "Conhecimento profundo em Tray, marketplaces e operações de venda online.",
    icon: ShoppingCart,
  },
  {
    title: "Metodologia de performance",
    description: "Análise semanal de ROAS, CAC e LTV. Ajustes toda semana, não só no fim do mês.",
    icon: Target,
  },
  {
    title: "Integração completa",
    description: "Loja, anúncios, CRM e atendimento trabalhando juntos de forma eficiente.",
    icon: Zap,
  },
  {
    title: "Linguagem de negócio",
    description: "Time que entende seus desafios e fala a língua do dono de negócio.",
    icon: MessageSquare,
  },
];

const testimonials = [
  {
    quote: "A MAVI transformou nossa operação de e-commerce. Em 6 meses, triplicamos o faturamento com a combinação de tráfego pago e organização do CRM.",
    author: "Carlos S.",
    role: "CEO",
    company: "E-commerce de Tecnologia",
  },
  {
    quote: "Com a estratégia de captação da MAVI, aumentamos em 200% o volume de leads qualificados para nossos imóveis. O CRM HUBRS organizou todo nosso funil de vendas.",
    author: "Renata M.",
    role: "Diretora de Vendas",
    company: "Imobiliária Regional",
  },
  {
    quote: "A automação de agendamentos reduziu nosso no-show em 65%. Hoje temos a agenda cheia e pacientes que realmente comparecem às consultas.",
    author: "Dra. Fernanda L.",
    role: "Proprietária",
    company: "Clínica de Estética",
  },
];

const homeFaqs = [
  {
    question: "O que é a MAVI Marketing Digital?",
    answer: "A MAVI é uma agência de performance e growth marketing especializada em e-commerces, imobiliárias, clínicas e indústrias. Atuamos com tráfego pago, CRM, automação, redes sociais e desenvolvimento de Micro SaaS sob medida.",
  },
  {
    question: "Onde a MAVI está localizada?",
    answer: "Estamos em Jaraguá do Sul, SC, mas atendemos empresas em todo o Brasil de forma remota. Nosso foco é resultado, independente da localização.",
  },
  {
    question: "Quanto custa contratar a MAVI?",
    answer: "Os valores variam conforme o escopo do projeto. Oferecemos um diagnóstico gratuito onde analisamos seu negócio e apresentamos uma proposta personalizada sem compromisso.",
  },
  {
    question: "A MAVI desenvolve Micro SaaS e sistemas próprios?",
    answer: "Sim. Desenvolvemos sistemas sob medida para automatizar processos, mensurar dados de performance e substituir ferramentas genéricas por soluções 100% alinhadas ao seu negócio.",
  },
  {
    question: "Qual o prazo para ver resultados com a MAVI?",
    answer: "Resultados em tráfego pago aparecem nas primeiras semanas. Estratégias de growth marketing e SEO têm retorno mais expressivo a partir do 3º mês. Trabalhamos com metas claras desde o início.",
  },
];

const CYCLE_PHRASES = [
  "pagos pelo seu ROAS.",
  "para e-commerces.",
  "para imobiliárias.",
  "para clínicas e estéticas.",
  "que fecham vendas.",
  "orientados a dados.",
];

const microSaasPains = [
  "Planilha que não escala",
  "WhatsApp sem rastreabilidade",
  "SaaS caro e genérico",
  "Processo na cabeça das pessoas",
  "Integrações que não conversam",
];

const sectionTitle = "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.06] text-balance";
const sectionSub = "mt-4 max-w-[58ch] text-lg leading-relaxed text-muted-foreground";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return reduced;
};

/** Lista de serviços com painel ao lado. Todos os painéis ficam no HTML (SEO); só o ativo aparece. */
function ServicesExplorer() {
  const [active, setActive] = useState(1);
  const [auto, setAuto] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!auto || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % services.length), 4200);
    return () => window.clearInterval(id);
  }, [auto, reduced]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16">
      <div className="grid border-t border-border" role="tablist" aria-label="Soluções">
        {services.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            onMouseEnter={() => choose(i)}
            onFocus={() => choose(i)}
            onClick={() => choose(i)}
            className={cn(
              "group border-b border-border py-4 text-left text-lg font-semibold md:text-xl",
              active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {/* Só o conteúdo desliza; a linha divisória fica no lugar */}
            <span className={cn("flex items-center gap-3.5 px-1 transition-transform duration-300 ease-out", active === i ? "translate-x-3" : "group-hover:translate-x-3")}>
              <s.icon className={cn("h-5 w-5 shrink-0 transition-colors", active === i ? "text-primary" : "text-input group-hover:text-primary")} aria-hidden="true" />
              {s.title}
              {s.highlight && (
                <span className="ml-auto mr-3 rounded-full bg-[hsl(280_70%_96%)] px-2.5 py-0.5 text-[11px] font-bold text-[hsl(275_60%_40%)]">Novo</span>
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="relative grid overflow-hidden rounded-2xl border border-border bg-background lg:sticky lg:top-28">
        {services.map((s, i) => (
          <div
            key={s.title}
            role="tabpanel"
            aria-hidden={active !== i}
            className={cn(
              "relative col-start-1 row-start-1 grid min-h-[380px] content-between gap-8 p-7 md:p-11",
              active === i ? "visible animate-panel-in" : "invisible",
            )}
          >
            {/* Ícone decorativo no canto de baixo, atrás do conteúdo */}
            <s.icon className="pointer-events-none absolute -bottom-12 -right-10 z-0 h-56 w-56 text-primary/[0.07]" strokeWidth={0.8} aria-hidden="true" />
            <div className="relative z-10">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <s.icon className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mb-3 mt-6 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">{s.title}</h3>
              <p className="max-w-[44ch] text-base leading-relaxed text-muted-foreground md:text-lg">{s.description}</p>
            </div>
            <Button asChild variant="hero" size="lg" className="group relative z-10 w-fit rounded-full" tabIndex={active === i ? 0 : -1}>
              {s.external ? (
                <a href={s.href} target="_blank" rel="noopener">
                  Conhecer o Zaptrix
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <Link to={s.href}>
                  Saiba mais
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Dores do Micro SaaS: o visitante marca o que vive e a frase reage. */
function PainToggles() {
  const [on, setOn] = useState<string[]>([]);
  const toggle = (p: string) => setOn((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  const n = on.length;
  return (
    <>
      <div className="mt-7 flex flex-wrap gap-2.5">
        {microSaasPains.map((pain) => {
          const pressed = on.includes(pain);
          return (
            <button
              key={pain}
              type="button"
              aria-pressed={pressed}
              onClick={() => toggle(pain)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5",
                pressed ? "border-white bg-white text-primary" : "border-white/40 text-white hover:border-white",
              )}
            >
              <span className="grid h-4 w-4 place-items-center rounded-[5px] border-[1.5px] border-current">
                <Check className={cn("h-3 w-3 transition-all duration-300", pressed ? "scale-100 opacity-100" : "scale-50 opacity-0")} strokeWidth={3} aria-hidden="true" />
              </span>
              {pain}
            </button>
          );
        })}
      </div>
      <p className="mb-7 mt-3 min-h-6 text-sm font-semibold text-white" aria-live="polite">
        {n === 0
          ? "Marque o que acontece na sua empresa."
          : n === 1
            ? "1 dessas já custa caro todo mês. Um sistema próprio resolve na raiz."
            : `${n} dessas ao mesmo tempo: é exatamente o caso para um sistema próprio.`}
      </p>
    </>
  );
}

const initials = (name: string) =>
  name.replace(/^Dra?\.\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Depoimentos um por vez, com troca automática. Todos ficam no HTML. */
function TestimonialRotator() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(id);
  }, [active, cycle, reduced]);

  return (
    <div className="grid items-start gap-8 md:grid-cols-[280px,1fr] md:gap-20">
      <div className="grid grid-cols-3 gap-1.5 md:grid-cols-1" role="tablist" aria-label="Depoimentos">
        {testimonials.map((t, i) => (
          <button
            key={t.author}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => {
              setActive(i);
              setCycle((c) => c + 1);
            }}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl p-3 text-center transition-colors md:flex-row md:text-left",
              active === i ? "bg-card ring-1 ring-border" : "hover:bg-card",
            )}
          >
            <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-bold", i === 1 ? "bg-[hsl(280_70%_96%)] text-[hsl(275_60%_40%)]" : "bg-primary/10 text-primary")}>
              {initials(t.author)}
            </span>
            <span className="w-full">
              <span className="block text-sm font-semibold text-foreground">{t.author}</span>
              <span className="hidden text-xs text-muted-foreground md:block">{t.company}</span>
              <span className="mt-2 block h-0.5 overflow-hidden rounded bg-border">
                {active === i && !reduced && <span key={`${active}-${cycle}`} className="block h-full w-0 animate-[fill_7s_linear_forwards] bg-primary" />}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="grid">
        {testimonials.map((t, i) => (
          <figure key={t.author} aria-hidden={active !== i} className={cn("col-start-1 row-start-1", active === i ? "visible animate-panel-in" : "invisible")}>
            <span className="block text-6xl font-extrabold leading-[0.6] text-primary" aria-hidden="true">&ldquo;</span>
            <blockquote className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">{t.quote}</blockquote>
            <figcaption className="mt-6 text-[15px] text-muted-foreground">
              <b className="text-foreground">{t.author}</b> · {t.role}, {t.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(homeFaqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema, organizationSchema, webSiteSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Agência MAVI: tráfego pago, CRM e IA para e-commerce"
        description="MAVI faz tráfego pago, CRM, automação e Micro SaaS para e-commerce, imobiliárias, clínicas e indústrias. Sem promessa vazia. Resultado mensurável."
        canonical="/"
        schemaMarkup={combinedSchema}
      />

      {/* HERO: promessa à esquerda, Camila ligando dor a solução à direita */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container-mavi relative">
          <div className="grid items-center gap-12 xl:grid-cols-[1.08fr,0.92fr] xl:gap-16">
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 text-[13px] font-semibold text-muted-foreground">
                <img src={seloGoogle} alt="" className="h-5 w-auto" />
                Agência premiada · Google Premier Partner 2025
              </div>

              <h1 className="mb-5 mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4.2rem]">
                Tráfego, CRM e automação{" "}
                {/* A frase mais longa fica invisível e reserva a altura: a troca de frase não empurra o layout */}
                <span className="grid text-primary">
                  <span className="invisible col-start-1 row-start-1" aria-hidden="true">para clínicas e estéticas.</span>
                  <CyclingTypewriter phrases={CYCLE_PHRASES} className="col-start-1 row-start-1" speed={32} holdMs={2600} />
                </span>
              </h1>

              <p className="max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                Operamos tráfego, CRM e automação para e-commerce, imobiliárias, clínicas e indústrias. Métrica que importa: receita atribuída por real investido.
              </p>

              <div className="relative z-30 mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="xl" className="group rounded-full">
                  <Link to="/contato">
                    Quero um diagnóstico gratuito
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="rounded-full">
                  <Link to="/servicos/micro-saas">Ter meu próprio sistema</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-6">
                {[
                  { node: <AnimatedCounter end={5} prefix="+" duration={1500} />, label: "Anos de mercado" },
                  { node: <AnimatedCounter end={500} prefix="+" duration={2000} />, label: "Clientes atendidos" },
                  { node: <>R$<AnimatedCounter end={50} duration={2000} />M+</>, label: "Em vendas geradas" },
                  { node: "8.4x", label: "ROAS médio" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold tabular-nums tracking-tight text-foreground">{s.node}</span>
                    <span className="text-[13px] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <PainChat />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Selos de parceria */}
      <div className="border-y border-border bg-card">
        <div className="container-mavi flex flex-wrap items-center justify-between gap-6 py-5">
          <p className="text-[13px] font-medium text-muted-foreground">Parcerias que garantem o padrão do trabalho</p>
          <div className="flex flex-wrap items-center gap-6 md:gap-12">
            {[
              [seloGoogle, "Google Premier Partner"],
              [seloMeta, "Meta Business Partner"],
              [seloTray, "Tray Parceiro Diamante"],
              [seloRd, "RD Station Partner"],
            ].map(([src, alt]) => (
              <img key={alt} src={src} alt={alt} className="h-9 w-auto opacity-75 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
            ))}
          </div>
        </div>
      </div>

      {/* O QUE É A MAVI */}
      <section className="bg-background py-20 md:py-32">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <AnimatedSection animation="fadeInUp">
            <h2 className={sectionTitle}>O que é a MAVI</h2>
            <p className={sectionSub}>Agência de performance que opera tráfego, CRM e automação. Cobrada pela receita gerada, não pelo relatório enviado.</p>
            <ul className="mb-8 mt-7 grid gap-3">
              {[
                "Decisão por dado: ROAS, CAC e LTV semanais",
                "Time dedicado a mídia paga e funil",
                "CRM e automação ligados direto na campanha",
                "Google Premier Partner, Meta Business e Tray Diamante",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="lg" className="group rounded-full">
              <Link to="/sobre">
                Conheça nossa história
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl border border-border bg-card px-7 py-2">
              {[
                { icon: BarChart3, label: "Anos de experiência", node: <AnimatedCounter end={5} prefix="+" duration={1800} /> },
                { icon: Users, label: "Clientes atendidos", node: <AnimatedCounter end={500} prefix="+" duration={1800} /> },
                { icon: TrendingUp, label: "Crescimento médio", node: <AnimatedCounter end={127} suffix="%" duration={1800} />, accent: true },
                { icon: Target, label: "ROAS médio", node: "8.4x" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-4 border-b border-dashed border-input py-5 last:border-0">
                  <span className="flex items-center gap-2.5 font-medium text-muted-foreground">
                    <m.icon className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
                    {m.label}
                  </span>
                  <span className={cn("text-3xl font-extrabold tabular-nums tracking-tight md:text-[2.6rem]", m.accent ? "text-primary" : "text-foreground")}>{m.node}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section className="border-y border-border bg-card py-20 md:py-32">
        <div className="container-mavi">
          <AnimatedSection className="mb-12">
            <h2 className={sectionTitle}>Soluções para o seu negócio</h2>
            <p className={sectionSub}>Tráfego pago, e-commerce, CRM, automação e sistemas sob medida. Tudo no mesmo time.</p>
          </AnimatedSection>
          <ServicesExplorer />
        </div>
      </section>

      {/* MICRO SAAS: faixa magenta */}
      <section className="relative overflow-hidden bg-primary py-20 text-white md:py-32">
        <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold">
              <Blocks className="h-4 w-4" aria-hidden="true" />
              Micro SaaS sob medida
            </div>
            <h2 className="mb-4 mt-5 text-3xl font-extrabold leading-[1.06] tracking-tight text-balance md:text-4xl lg:text-5xl">
              Pare de ser{" "}
              <span className="underline decoration-white/55 decoration-4 underline-offset-8">refém</span>{" "}
              de software genérico.
            </h2>
            <p className="max-w-[54ch] text-lg leading-relaxed text-white/90">
              Cada mensalidade de ferramenta que você paga é um pedaço do seu negócio que fica nas mãos de outra empresa. A MAVI cria o <strong className="text-white">sistema da sua empresa</strong>, com o seu processo, suas regras e sua marca, e você fica com o ativo.
            </p>
            <PainToggles />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" className="group rounded-full bg-white text-primary hover:bg-foreground hover:text-white">
                <Link to="/servicos/micro-saas">
                  Quero meu próprio sistema
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="ghost" className="rounded-full text-white ring-1 ring-white/55 hover:bg-white/10 hover:text-white hover:ring-white">
                <Link to="/contato">Falar com a MAVI</Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200} className="hidden lg:block">
            <div className="rotate-[1.2deg] rounded-2xl bg-white p-6 text-foreground shadow-[0_8px_8px_-6px_hsl(336_100%_20%/0.35)] transition-transform duration-700 ease-out hover:rotate-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Blocks className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold">Meu Sistema</p>
                    <p className="text-xs text-muted-foreground">by MAVI · 100% seu</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  Ativo <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
              </div>
              {[
                { label: "Painel de leads", value: "47 ativos", color: "bg-primary" },
                { label: "Ordens de serviço", value: "12 abertas", color: "bg-[hsl(280_70%_55%)]" },
                { label: "Portal do cliente", value: "98% uptime", color: "bg-green-600" },
              ].map((item) => (
                <div key={item.label} className="mt-2 flex items-center justify-between rounded-xl bg-background px-4 py-3 text-sm">
                  <span className="flex items-center gap-2.5 text-muted-foreground">
                    <span className={cn("h-2 w-2 rounded-full", item.color)} />
                    {item.label}
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="mt-3.5 rounded-xl bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">Economia mensal vs SaaS</p>
                <p className="text-3xl font-extrabold tracking-tight text-primary">
                  R$ 2.400<span className="text-sm font-medium text-muted-foreground">/mês</span>
                </p>
                <p className="text-xs text-muted-foreground">Que fica no seu caixa, não no de terceiros</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* POR QUE A MAVI */}
      <section className="bg-background py-20 md:py-32">
        <div className="container-mavi">
          <AnimatedSection className="mb-12">
            <h2 className={sectionTitle}>Por que escolher a MAVI?</h2>
            <p className={sectionSub}>Fazemos o que prometemos e medimos o que entregamos.</p>
          </AnimatedSection>
          <AnimatedChildren className="grid border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
            {differentials.map((item) => (
              <article
                key={item.title}
                className="border-b border-border py-7 transition-transform duration-500 ease-out hover:-translate-y-1 sm:pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6"
              >
                <item.icon className="mb-4 h-[30px] w-[30px] text-primary" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </AnimatedChildren>
        </div>
      </section>

      {/* CLIENTES & PARCEIROS */}
      <section className="overflow-hidden border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <AnimatedSection className="mb-10">
            <h2 className={sectionTitle}>Clientes &amp; Parceiros</h2>
            <p className={sectionSub}>Pequenas lojas, clínicas, imobiliárias e indústrias. Todos chegam aqui pelo mesmo motivo: resultado.</p>
          </AnimatedSection>
        </div>
        <LogoCarousel />
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-background py-20 md:py-32">
        <div className="container-mavi">
          <AnimatedSection className="mb-12">
            <h2 className={sectionTitle}>O que dizem nossos clientes</h2>
            <p className={sectionSub}>Resultados reais de quem confiou na MAVI para crescer.</p>
          </AnimatedSection>
          <AnimatedSection>
            <TestimonialRotator />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ: as respostas ficam no HTML mesmo fechadas */}
      <section className="border-y border-border bg-card py-20 md:py-32">
        <div className="container-mavi">
          <AnimatedSection className="mb-10 text-center">
            <h2 className={sectionTitle}>Perguntas frequentes</h2>
            <p className={cn(sectionSub, "mx-auto")}>Respostas rápidas sobre a MAVI e nossos serviços.</p>
          </AnimatedSection>
          <div className="mx-auto max-w-[860px] border-t border-input">
            {homeFaqs.map((faq, index) => (
              <details key={faq.question} open={index === 0} className="group border-b border-input">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{faq.question}</h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-input transition-all duration-300 ease-out group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-white">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT: DIAGNÓSTICO E-COMMERCE */}
      <section className="bg-background py-20 md:py-32">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              <BarChart3 className="h-4 w-4" aria-hidden="true" /> Diagnóstico gratuito
            </span>
            <h2 className={sectionTitle}>Descubra o que está travando as vendas do seu e-commerce</h2>
            <p className={sectionSub}>
              Em menos de 5 minutos, nosso assessment avalia seu negócio em 7 dimensões (produto, tráfego, marketplaces, SEO, redes sociais, design e investimento) e entrega um diagnóstico personalizado com os pontos exatos que impedem seu crescimento.
            </p>
            <ul className="mb-8 mt-7 grid gap-3">
              {[
                "21 perguntas simples, sem jargão técnico",
                "Score individual para cada área do negócio",
                "Relatório com próximos passos e serviços indicados",
                "100% gratuito e sem compromisso",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="xl" className="group rounded-full">
              <Link to="/assessment">
                Fazer diagnóstico gratuito
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="mt-3 text-[13px] text-muted-foreground">Mais de 200 e-commerces já fizeram o diagnóstico</p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_8px_-6px_hsl(325_25%_9%/0.08)]">
              <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5 text-[13px] font-semibold text-foreground">
                <img src={camilaAvatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                Diagnóstico MAVI
                {/* Selo dentro do fluxo do cabeçalho: não cobre o texto ao lado */}
                <span className="ml-auto hidden text-xs font-medium text-muted-foreground sm:inline">Assessment E-commerce</span>
                <span className="ml-auto rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white sm:ml-0">Grátis</span>
              </div>
              <div className="grid gap-2.5 bg-background p-4">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">Olá! Vou analisar seu e-commerce em 7 áreas. Pronto para descobrir onde estão os gargalos?</div>
                <div className="max-w-[75%] justify-self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-white">Vamos lá!</div>
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">Como estão as fotos dos seus produtos? Elas mostram detalhes, vários ângulos e o produto em uso?</div>
              </div>
              <div className="grid gap-3 p-4">
                <p className="text-xs font-medium text-muted-foreground">Preview do resultado</p>
                {[
                  { label: "Produto & Catálogo", pct: 82, color: "#15803d" },
                  { label: "Tráfego Pago", pct: 54, color: "#b45309" },
                  { label: "SEO Orgânico", pct: 31, color: "#dc2626" },
                ].map((bar) => (
                  <div key={bar.label} className="grid grid-cols-[110px,1fr,28px] items-center gap-3 text-[13px] text-muted-foreground sm:grid-cols-[128px,1fr,28px]">
                    {bar.label}
                    <span className="h-2 overflow-hidden rounded-full bg-border">
                      <span className="block h-full rounded-full" style={{ width: `${bar.pct}%`, background: bar.color }} />
                    </span>
                    <b className="text-right tabular-nums" style={{ color: bar.color }}>{bar.pct}</b>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-primary/15 bg-primary/5 py-20 text-center md:py-32">
        <AnimatedSection className="container-mavi">
          <h2 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-6xl">
            Quer ver o que{" "}
            <span className="relative whitespace-nowrap text-primary">
              trava
              <svg viewBox="0 0 200 18" preserveAspectRatio="none" className="absolute -bottom-3 left-[-4%] h-[18px] w-[108%]" aria-hidden="true">
                <path d="M3 12 C 50 4, 110 4, 197 10" className="fill-none stroke-primary [stroke-dasharray:260] [stroke-linecap:round] [stroke-width:4] motion-safe:animate-[draw_1.2s_0.3s_cubic-bezier(.22,1,.36,1)_both]" />
              </svg>
            </span>{" "}
            suas vendas hoje?
          </h2>
          <p className="mx-auto mb-9 mt-6 max-w-[56ch] text-lg text-muted-foreground">
            Sessão de 30 minutos, gratuita. A gente olha seu funil, aponta o gargalo e mostra o que mudaria. Sem proposta enfiada no fim.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="group rounded-full">
              <Link to="/contato">
                Quero uma consultoria gratuita
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full">
              <Link to="/servicos/micro-saas">Quero meu próprio sistema</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              ))}
            </div>
            +500 negócios transformados
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
}
