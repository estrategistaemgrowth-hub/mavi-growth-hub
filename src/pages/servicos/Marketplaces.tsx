import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { 
  Store,
  ArrowRight,
  AlertCircle,
  Package,
  TrendingUp,
  Settings,
  Layers,
  RefreshCw,
  Target,
  Zap,
  DollarSign
} from "lucide-react";

// Marketplace logos
import mercadoLivreLogo from "@/assets/marketplaces/mercado-livre.png";
import amazonLogo from "@/assets/marketplaces/amazon.png";
import shopeeLogo from "@/assets/marketplaces/shopee.png";
import magaluLogo from "@/assets/marketplaces/magalu.png";
import americanasLogo from "@/assets/marketplaces/americanas.png";
import viaVarejoLogo from "@/assets/marketplaces/via-varejo.png";

const problems = [
  { icon: AlertCircle, title: "Vendas travadas nos marketplaces?", description: "Anúncios mal otimizados que não aparecem nas buscas." },
  { icon: Package, title: "Estoque desorganizado?", description: "Vendas simultâneas causando ruptura e cancelamentos." },
  { icon: Settings, title: "Integrações que falham?", description: "ERP e hub que não sincronizam corretamente." },
  { icon: DollarSign, title: "Margem sendo corroída?", description: "Precificação errada e custos ocultos diminuindo lucro." },
];

const features = [
  "Cadastro otimizado de produtos para SEO",
  "Integrações com ERP e hubs (Tiny, Bling, etc.)",
  "Configuração de regras de frete e precificação",
  "Gestão de campanhas patrocinadas internas",
  "Metas de faturamento por canal",
  "Relatórios de performance por marketplace",
  "Gestão de reputação e métricas da conta",
  "Estratégia de pricing por canal",
];

const benefits = [
  { icon: TrendingUp, title: "Mais vendas", description: "Anúncios otimizados que aparecem nas primeiras posições." },
  { icon: Layers, title: "Operação integrada", description: "Estoque, pedidos e financeiro sincronizados automaticamente." },
  { icon: Target, title: "Visibilidade total", description: "Dashboards com performance de cada canal em tempo real." },
  { icon: DollarSign, title: "Margem protegida", description: "Precificação inteligente considerando todos os custos." },
];

const marketplaces = [
  { name: "Mercado Livre", description: "Líder da América Latina", logo: mercadoLivreLogo },
  { name: "Amazon", description: "Maior do mundo", logo: amazonLogo },
  { name: "Shopee", description: "Crescimento explosivo", logo: shopeeLogo },
  { name: "Magazine Luiza", description: "Varejo tradicional", logo: magaluLogo },
  { name: "Americanas", description: "Multi-categoria", logo: americanasLogo },
  { name: "Via Varejo", description: "Casas Bahia e Ponto", logo: viaVarejoLogo },
];

const process = [
  { icon: Target, title: "Diagnóstico", description: "Análise das contas atuais e oportunidades" },
  { icon: Settings, title: "Setup", description: "Configuração de integrações e cadastros" },
  { icon: Zap, title: "Otimização", description: "Melhoria de anúncios e precificação" },
  { icon: RefreshCw, title: "Gestão", description: "Acompanhamento e ajustes contínuos" },
];

const stats = [
  { end: 120, prefix: "+", suffix: "", label: "Contas gerenciadas" },
  { end: 6, prefix: "", suffix: "", label: "Marketplaces atendidos" },
  { end: 40, prefix: "+", suffix: "%", label: "Crescimento médio" },
  { end: 10, prefix: "R$", suffix: "M+", label: "GMV gerenciado/mês" },
];

const faqs = [
  {
    question: "Vocês criam as contas nos marketplaces ou preciso ter?",
    answer: "Podemos tanto criar novas contas quanto assumir a gestão de contas existentes. Para novas contas, orientamos sobre toda a documentação necessária e requisitos de cada plataforma."
  },
  {
    question: "Como funciona a integração com meu ERP?",
    answer: "Configuramos a integração entre seu ERP (Bling, Tiny, Omie, etc.) e os marketplaces através de hubs homologados. Isso garante sincronização automática de estoque, pedidos e notas fiscais."
  },
  {
    question: "Vocês gerenciam as campanhas de ads dentro dos marketplaces?",
    answer: "Sim, gerenciamos os anúncios patrocinados dentro de cada marketplace (Mercado Ads, Amazon Ads, etc.) com foco em maximizar o retorno sobre investimento."
  },
  {
    question: "Como vocês definem a precificação em cada canal?",
    answer: "Fazemos um estudo completo de custos (comissão, frete, impostos, ads) de cada marketplace e definimos uma estratégia de pricing que proteja sua margem e maximize competitividade."
  },
  {
    question: "Qual o investimento mínimo para começar?",
    answer: "Trabalhamos com diferentes faixas de faturamento. Para gestão completa de marketplaces, recomendamos operações com GMV mínimo de R$30.000/mês para justificar o investimento no serviço."
  },
];

export default function ServicoMarketplaces() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Marketplaces e ERP", url: "/servicos/marketplaces" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Gestão de Marketplaces - Mercado Livre, Amazon, Shopee",
    description: "Gestão profissional de marketplaces com integração ERP. Aumente vendas em múltiplos canais com operação organizada e rentável.",
    url: "/servicos/marketplaces",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Gestão de Marketplaces: Mercado Livre, Amazon e Shopee"
        description="Gestão profissional de Mercado Livre, Amazon, Shopee, Magalu e mais. Integração com ERP, otimização de anúncios e +40% de crescimento médio."
        canonical="/servicos/marketplaces"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={Store}
        badge="Marketplaces & ERP"
        title={<>Domine os <span className="text-primary">marketplaces</span></>}
        lead="Gestão profissional de marketplaces com integração completa. Maximize suas vendas em múltiplos canais com operação organizada e rentável."
        primary={{ label: "Quero expandir meus canais", href: "/contato" }}
        secondary={{ label: "Preciso de uma loja própria", href: "/servicos/ecommerce" }}
        stats={stats.map((s) => ({
          value: <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />,
          label: s.label,
        }))}
      />

      <ProblemPicker
        title="Reconhece algum desses problemas?"
        subtitle="Se alguma dessas situações soa familiar, vale uma conversa."
        problems={problems}
      />

      {/* Marketplaces: logo + nome em linhas, sem cards */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Marketplaces que gerenciamos" subtitle="Expertise nos principais canais de venda do Brasil." />
          <div className="grid gap-x-10 border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-3">
            {marketplaces.map((mp) => (
              <AnimatedSection key={mp.name}>
                <div className="group flex items-center gap-5 border-b border-border py-6">
                  <span className="grid h-16 w-24 shrink-0 place-items-center rounded-xl bg-card px-3 ring-1 ring-border transition-[box-shadow] duration-300 group-hover:ring-primary">
                    <img src={mp.logo} alt={mp.name} className="max-h-10 w-auto object-contain" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{mp.name}</h3>
                    <p className="text-[15px] text-muted-foreground">{mp.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Processo: sequência real, então os passos são numerados */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Como trabalhamos" subtitle="Metodologia estruturada para resultados consistentes." />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, index) => (
              <AnimatedSection key={step.title}>
                <li className="relative border-t-2 border-primary pt-6">
                  <span className="text-sm font-bold tabular-nums text-primary">Passo {index + 1}</span>
                  <step.icon className="my-4 h-7 w-7 text-foreground" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="O que está incluso no serviço."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Integração com ERP: texto à esquerda, benefícios num bloco magenta */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              Integração nativa
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Seu ERP conectado a todos os canais
            </h2>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              Configuramos as integrações entre seu ERP e os marketplaces. Estoque, pedidos, preços e notas fiscais sincronizam automaticamente, sem precisar atualizar nada na mão.
            </p>
            <p className="mb-8 mt-6 flex flex-wrap gap-2">
              {["Bling", "Tiny", "Omie", "Conta Azul"].map((erp) => (
                <span key={erp} className="rounded-full border border-border bg-background px-4 py-1.5 font-medium text-foreground transition-colors hover:border-primary">
                  {erp}
                </span>
              ))}
            </p>
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/contato">
                Quero integrar meu ERP
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-8 text-white md:p-10">
              <h3 className="mb-6 text-2xl font-extrabold tracking-tight">Benefícios da integração</h3>
              <ul className="grid">
                {[
                  "Estoque sincronizado em tempo real",
                  "Pedidos importados automaticamente",
                  "Notas fiscais emitidas sem manual",
                  "Zero erros de duplicidade",
                  "Relatórios consolidados",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-white/25 py-3.5 font-medium last:border-0">
                    <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre gestão de marketplaces." faqs={faqs} />

      <FinalCta
        title="Quer entrar em mais canais?"
        text="A gente analisa quais marketplaces fazem sentido pro seu produto e mostra como entrar."
        primary={{ label: "Falar com especialista", href: "/contato" }}
        secondary={{ label: "Ver outros serviços", href: "/servicos" }}
      />
    </Layout>
  );
}
