import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { 
  Store, 
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Package,
  TrendingUp,
  Settings,
  BarChart3,
  Layers,
  RefreshCw,
  Target,
  Zap,
  DollarSign
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { name: "Mercado Livre", description: "Líder da América Latina" },
  { name: "Amazon", description: "Maior do mundo" },
  { name: "Shopee", description: "Crescimento explosivo" },
  { name: "Magazine Luiza", description: "Varejo tradicional" },
  { name: "Americanas", description: "Multi-categoria" },
  { name: "Via Varejo", description: "Casas Bahia e Ponto" },
];

const process = [
  { icon: Target, title: "Diagnóstico", description: "Análise das contas atuais e oportunidades" },
  { icon: Settings, title: "Setup", description: "Configuração de integrações e cadastros" },
  { icon: Zap, title: "Otimização", description: "Melhoria de anúncios e precificação" },
  { icon: RefreshCw, title: "Gestão", description: "Acompanhamento e ajustes contínuos" },
];

const stats = [
  { value: "+120", label: "Contas gerenciadas" },
  { value: "6", label: "Marketplaces atendidos" },
  { value: "+40%", label: "Crescimento médio" },
  { value: "R$10M+", label: "GMV gerenciado/mês" },
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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Store className="w-4 h-4" />
              <span className="text-sm font-medium">Marketplaces & ERP</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Domine os{" "}
              <span className="text-primary">marketplaces</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Gestão profissional de marketplaces com integração completa. Maximize suas vendas 
              em múltiplos canais com operação organizada e rentável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero expandir meus canais</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/servicos/ecommerce">
                  Preciso de uma loja própria
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-primary">
        <div className="container-mavi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <Section>
        <SectionHeader
          title="Reconhece algum desses problemas?"
          subtitle="Se você enfrenta alguma dessas situações, podemos ajudar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div key={index} className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 hover:border-destructive/40 transition-colors">
              <problem.icon className="w-10 h-10 text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Marketplaces Grid */}
      <Section variant="gray">
        <SectionHeader
          title="Marketplaces que gerenciamos"
          subtitle="Expertise nos principais canais de venda do Brasil."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaces.map((mp, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors text-center">
              <Store className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">{mp.name}</h3>
              <p className="text-sm text-muted-foreground">{mp.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader
          title="Como trabalhamos"
          subtitle="Metodologia estruturada para resultados consistentes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features + Benefits */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Operação integrada para maximizar resultados."
              centered={false}
              light
            />
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-mavi-white/80">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-mavi-white mb-6">Benefícios para o seu negócio</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-mavi-white/5 border border-mavi-white/10 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-mavi-white mb-1">{benefit.title}</h4>
                  <p className="text-sm text-mavi-white/60">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ERP Integration */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Integração nativa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Seu ERP conectado a todos os canais
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Configuramos integrações robustas entre seu ERP e todos os marketplaces, 
              garantindo sincronização automática de estoque, pedidos, preços e notas fiscais.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Bling", "Tiny", "Omie", "Conta Azul"].map((erp) => (
                <div key={erp} className="bg-card rounded-lg p-4 border border-border text-center">
                  <span className="font-medium text-foreground">{erp}</span>
                </div>
              ))}
            </div>
            <Button asChild>
              <Link to="/contato">
                Quero integrar meu ERP
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">Benefícios da integração</h3>
            <ul className="space-y-4">
              {[
                "Estoque sincronizado em tempo real",
                "Pedidos importados automaticamente",
                "Notas fiscais emitidas sem manual",
                "Zero erros de duplicidade",
                "Relatórios consolidados"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre gestão de marketplaces."
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-4">
            Quer expandir para marketplaces?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Converse com nosso time e descubra as melhores oportunidades 
            para escalar suas vendas em múltiplos canais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Falar com especialista</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/servicos">Ver outros serviços</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
