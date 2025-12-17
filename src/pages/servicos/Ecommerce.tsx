import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">E-commerce e Lojas Virtuais</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Lojas virtuais que{" "}
              <span className="text-primary">vendem de verdade</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Criação e implementação de e-commerces com foco em velocidade de lançamento, 
              conversão e integração completa com todo o ecossistema de vendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero criar minha loja</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/servicos/performance">
                  Preciso de tráfego pago
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

      {/* Features + Benefits */}
      <Section variant="gray">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Implementação completa com foco em conversão e operação eficiente."
              centered={false}
            />
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg">
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-6">Benefícios para o seu negócio</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tray Specialist */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-start justify-between gap-4 mb-6">
              <ShoppingCart className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Especialistas em Tray</h3>
            <p className="text-sm text-primary font-medium mb-4">Parceiro Diamante Tray</p>
            <p className="text-muted-foreground mb-6">
              Somos referência em implementação de lojas Tray, com metodologia própria 
              para lançamentos rápidos e integrações complexas. Conhecemos a plataforma 
              profundamente para extrair o máximo de performance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">+200</p>
                <p className="text-sm text-muted-foreground">Lojas criadas</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">5+ anos</p>
                <p className="text-sm text-muted-foreground">De parceria</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Por que escolher Tray?</h3>
            <div className="space-y-3">
              {trayBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-8" variant="outline">
              <Link to="/contato">
                Quero saber mais sobre Tray
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Cases */}
      <Section variant="dark">
        <SectionHeader
          title="Cases de E-commerce"
          subtitle="Resultados reais de lojas que implementamos."
          light
        />
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <div key={index} className="bg-mavi-white/5 rounded-xl p-6 border border-mavi-white/10 hover:border-primary/30 transition-colors">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                {caseItem.niche}
              </span>
              <p className="text-mavi-white/70 text-sm mb-4">
                <strong className="text-mavi-white">Desafio:</strong> {caseItem.challenge}
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <TrendingUp className="w-5 h-5" />
                <span>{caseItem.result}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="heroOutline">
            <Link to="/cases">Ver mais cases</Link>
          </Button>
        </div>
      </Section>

      {/* Integration Ecosystem */}
      <Section>
        <SectionHeader
          title="Ecossistema completo de integrações"
          subtitle="Sua loja conectada a tudo que você precisa para operar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Pagamentos</h4>
            <p className="text-sm text-muted-foreground">PagSeguro, Mercado Pago, Pix, Cartões</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Logística</h4>
            <p className="text-sm text-muted-foreground">Correios, Melhor Envio, Jadlog, Sedex</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <Package className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">ERP</h4>
            <p className="text-sm text-muted-foreground">Bling, Tiny, Omie, Conta Azul</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <Layers className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Marketplaces</h4>
            <p className="text-sm text-muted-foreground">Mercado Livre, Magalu, Amazon, Shopee</p>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre criação de e-commerce."
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
            Pronto para lançar sua loja virtual?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta personalizada para o seu projeto. 
            Vamos colocar sua loja no ar em até 30 dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Solicitar Proposta</Link>
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
