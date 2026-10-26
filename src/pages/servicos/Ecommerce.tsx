import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, AssessmentPromo, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import seloTray from "@/assets/selos/tray-diamante.png";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { 
  ShoppingCart, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp,
  AlertCircle,
  Clock,
  Settings,
  Layers,
  Truck,
  CreditCard,
  BarChart3,
  Headphones,
  Zap,
  Package
} from "lucide-react";


const problems = [
  { icon: Clock, title: "Loja demorando para sair do papel?", description: "Projetos que se arrastam sem previsão de lançamento." },
  { icon: AlertCircle, title: "Plataforma atual limitada?", description: "Falta de recursos e integrações travando seu crescimento." },
  { icon: Settings, title: "Integrações que não funcionam?", description: "ERP, marketplaces e pagamentos que não se conectam." },
  { icon: TrendingUp, title: "Vendas abaixo do esperado?", description: "Loja no ar mas sem conversão e performance." },
];

const features = [
  "Criação de loja virtual do zero ou migração",
  "Implementação completa na plataforma Tray",
  "Integrações com meios de pagamento (PagSeguro, Mercado Pago, etc.)",
  "Configuração de frete e logística",
  "Integração com ERP (Bling, Tiny, etc.)",
  "Conexão com marketplaces",
  "Treinamento para gestão da loja",
  "SEO básico configurado",
];

const benefits = [
  { icon: Zap, title: "Lançamento rápido", description: "Metodologia para colocar sua loja no ar em até 30 dias." },
  { icon: Layers, title: "Integrações completas", description: "ERP, marketplaces, pagamentos e frete funcionando juntos." },
  { icon: BarChart3, title: "Foco em conversão", description: "Design e UX pensados para transformar visitantes em compradores." },
  { icon: Headphones, title: "Suporte contínuo", description: "Acompanhamento pós-lançamento para garantir o sucesso." },
];

const trayBenefits = [
  "Plataforma robusta e escalável",
  "Milhares de integrações disponíveis",
  "Checkout otimizado para conversão",
  "App nativo para gestão mobile",
  "Suporte técnico especializado",
  "Hospedagem inclusa e segura",
];

const cases = [
  {
    niche: "Moda Feminina",
    challenge: "Migração de plataforma legada para Tray com zero downtime",
    result: "+45% de conversão após a migração",
  },
  {
    niche: "Eletrônicos",
    challenge: "Loja nova precisando de integração com 3 marketplaces",
    result: "Lançamento em 30 dias com todas integrações ativas",
  },
  {
    niche: "Pet Shop",
    challenge: "Operação manual com erros de estoque frequentes",
    result: "Integração Tray + Bling eliminando 100% dos erros",
  },
];

const stats = [
  { value: "+200", label: "Lojas criadas" },
  { value: "30 dias", label: "Tempo médio de lançamento" },
  { value: "+45%", label: "Conversão média" },
  { value: "5+", label: "Anos de experiência Tray" },
];

const faqs = [
  {
    question: "Quanto tempo leva para criar uma loja do zero?",
    answer: "Com nossa metodologia, uma loja completa fica pronta em 20 a 30 dias úteis, incluindo design, configurações, integrações e treinamento. Projetos mais complexos podem levar até 45 dias."
  },
  {
    question: "Vocês só trabalham com Tray?",
    answer: "Somos especialistas em Tray e é nossa plataforma recomendada pela robustez e integrações. Porém, também trabalhamos com outras plataformas como Nuvemshop e WooCommerce conforme a necessidade do projeto."
  },
  {
    question: "O que está incluso no serviço de criação de loja?",
    answer: "Inclui: design personalizado, configuração completa da plataforma, integração com meios de pagamento, configuração de frete, integração com ERP (se houver), conexão com marketplaces, SEO básico, e treinamento para o time operar a loja."
  },
  {
    question: "Vocês fazem migração de outras plataformas?",
    answer: "Sim, realizamos migração completa de outras plataformas para Tray, incluindo produtos, categorias, clientes e histórico de pedidos quando possível. Garantimos zero downtime durante a transição."
  },
  {
    question: "O que acontece após o lançamento da loja?",
    answer: "Oferecemos suporte pós-lançamento de 30 dias incluso para ajustes e dúvidas. Após isso, você pode contratar nosso plano de manutenção ou nossos serviços de marketing para escalar as vendas."
  },
];

export default function ServicoEcommerce() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "E-commerce e Lojas Virtuais", url: "/servicos/ecommerce" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Criação de Lojas Virtuais e E-commerce",
    description: "Implantação de lojas virtuais na plataforma Tray com foco em conversão, integração completa com ERP e marketplaces.",
    url: "/servicos/ecommerce",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Criação de Lojas Virtuais | Especialistas Tray"
        description="Implantação de lojas virtuais na plataforma Tray. Integração com ERP, marketplaces e meios de pagamento. Lojas prontas em até 30 dias. Solicite proposta."
        canonical="/servicos/ecommerce"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={ShoppingCart}
        badge="E-commerce e Lojas Virtuais"
        title={<>Lojas virtuais que <span className="text-primary">vendem de verdade</span></>}
        lead="Criação e implementação de e-commerces com foco em velocidade de lançamento, conversão e integração completa com todo o ecossistema de vendas."
        primary={{ label: "Quero criar minha loja", href: "/contato" }}
        secondary={{ label: "Preciso de tráfego pago", href: "/servicos/performance" }}
        stats={[
          { value: <AnimatedCounter end={200} prefix="+" duration={2000} />, label: stats[0].label },
          { value: stats[1].value, label: stats[1].label },
          { value: <AnimatedCounter end={45} prefix="+" suffix="%" duration={2000} />, label: stats[2].label },
          { value: <AnimatedCounter end={5} suffix="+" duration={1500} />, label: stats[3].label },
        ]}
      />

      <ProblemPicker
        title="Reconhece algum desses problemas?"
        subtitle="Se alguma dessas situações soa familiar, vale uma conversa."
        problems={problems}
      />

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="O que está incluso no serviço."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Especialistas em Tray */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <div className="rounded-2xl bg-primary p-8 text-white md:p-10">
              <div className="mb-8 flex items-center justify-between gap-4">
                <ShoppingCart className="h-12 w-12" strokeWidth={1.6} aria-hidden="true" />
                <img src={seloTray} alt="Tray Parceiro Diamante" className="h-14 w-auto rounded-lg bg-white p-1.5" />
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight">Especialistas em Tray</h3>
              <p className="mt-1 font-semibold text-white/85">Parceiro Diamante Tray</p>
              <p className="mt-4 max-w-[48ch] leading-relaxed text-white/90">
                Somos referência em implementação de lojas Tray, com metodologia própria para lançamentos rápidos e integrações complexas. Conhecemos a plataforma profundamente para extrair o máximo de performance.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/25">
                {[
                  { v: "+200", l: "Lojas criadas" },
                  { v: "5+ anos", l: "De parceria" },
                ].map((s) => (
                  <div key={s.l} className="bg-primary px-5 py-4">
                    <p className="text-3xl font-extrabold tracking-tight">{s.v}</p>
                    <p className="text-sm text-white/85">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground">Por que escolher Tray?</h3>
            <ul className="grid gap-3">
              {trayBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 border-b border-border pb-3 font-medium text-foreground">
                  <Zap className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="lg" className="group mt-8 rounded-full">
              <Link to="/contato">
                Quero saber mais sobre Tray
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Cases: desafio no meio, resultado em destaque */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Cases de E-commerce" subtitle="Lojas que lançamos e o problema que resolvemos em cada uma." />
          <div className="border-t-2 border-foreground">
            {cases.map((c) => (
              <AnimatedSection key={c.niche}>
                <div className="grid gap-3 border-b border-border py-7 md:grid-cols-[180px,1fr,1fr] md:items-center md:gap-10">
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{c.niche}</span>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Desafio:</strong> {c.challenge}
                  </p>
                  <p className="flex items-start gap-2 text-lg font-bold leading-snug tracking-tight text-foreground">
                    <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {c.result}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="group mt-8 rounded-full">
            <Link to="/cases">
              Ver mais cases
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Ecossistema de integrações */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Ecossistema completo de integrações" subtitle="Sua loja conectada a tudo que você precisa para operar." />
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CreditCard, title: "Pagamentos", items: ["PagSeguro", "Mercado Pago", "Pix", "Cartões"] },
              { icon: Truck, title: "Logística", items: ["Correios", "Melhor Envio", "Jadlog", "Sedex"] },
              { icon: Package, title: "ERP", items: ["Bling", "Tiny", "Omie", "Conta Azul"] },
              { icon: Layers, title: "Marketplaces", items: ["Mercado Livre", "Magalu", "Amazon", "Shopee"] },
            ].map((g) => (
              <AnimatedSection key={g.title} className="border-t border-border py-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <g.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="text-lg font-bold text-foreground">{g.title}</h4>
                </div>
                <p className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                      {it}
                    </span>
                  ))}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre criação de e-commerce." faqs={faqs} />

      <AssessmentPromo
        title="Antes de qualquer investimento, descubra onde está o gargalo"
        text="Nosso assessment avalia seu e-commerce em 7 dimensões (produto, tráfego, marketplaces, SEO, redes sociais, design e investimento) e entrega um diagnóstico personalizado em menos de 5 minutos."
        bullets={["21 perguntas simples, resultado imediato", "Score por área + mapa de maturidade", "Recomendação dos próximos passos", "100% gratuito e sem compromisso"]}
        note="Mais de 200 e-commerces já fizeram o diagnóstico"
      />

      <FinalCta
        title="Quer colocar sua loja no ar?"
        text="Na primeira conversa a gente define escopo, prazo e valor. Sem surpresa depois."
        primary={{ label: "Solicitar Proposta", href: "/contato" }}
        secondary={{ label: "Ver outros serviços", href: "/servicos" }}
      />
    </Layout>
  );
}
