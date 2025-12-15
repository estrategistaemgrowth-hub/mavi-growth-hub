import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
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
  MessageCircle,
  TrendingUp,
  Calendar,
  Palette,
  BarChart3,
  Zap
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { value: "+150%", label: "Engajamento médio" },
  { value: "+80", label: "Contas gerenciadas" },
  { value: "3x", label: "Mais alcance orgânico" },
  { value: "24h", label: "Tempo de resposta" },
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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Redes Sociais e Conteúdo</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Conteúdo que{" "}
              <span className="text-primary">engaja e vende</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Gestão estratégica de redes sociais com criativos que vendem. Conteúdo planejado 
              para engajar, relacionar e converter seguidores em clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero profissionalizar minhas redes</Link>
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
          title="Isso soa familiar?"
          subtitle="Se você enfrenta algum desses problemas, podemos ajudar."
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
              subtitle="Social media pensado para resultado, não apenas para vaidade."
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

      {/* Platforms */}
      <Section>
        <SectionHeader
          title="Plataformas que gerenciamos"
          subtitle="Presença profissional nas redes que importam para o seu negócio."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-center">
            <Instagram className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Instagram</h3>
            <p className="text-white/80">
              Feed, Stories, Reels, Lives - gestão completa para máximo engajamento e conversão.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
            <Facebook className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Facebook</h3>
            <p className="text-white/80">
              Página, grupos, marketplace - aproveitando todo o ecossistema para alcançar seu público.
            </p>
          </div>
        </div>
      </Section>

      {/* Deliverables */}
      <Section variant="dark">
        <SectionHeader
          title="O que você recebe todo mês"
          subtitle="Entregas consistentes para manter suas redes sempre atualizadas."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, index) => (
            <div key={index} className="bg-mavi-white/5 rounded-xl p-6 border border-mavi-white/10 text-center">
              <p className="text-3xl font-bold text-primary mb-2">{item.title}</p>
              <p className="text-mavi-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Integration with Ads */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Estratégia integrada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Orgânico + Pago = Resultados exponenciais
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Quando combinamos gestão de redes sociais com tráfego pago, os resultados se multiplicam. 
              O conteúdo orgânico fortalece a marca enquanto os anúncios aceleram as vendas.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Conteúdo orgânico aquece o público para os anúncios",
                "Criativos testados organicamente viram ads",
                "Prova social aumenta conversão de campanhas",
                "Remarketing com conteúdo de valor"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contato">Quero uma estratégia integrada</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/servicos/performance">
                  Ver serviço de Performance
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <BarChart3 className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-foreground">Resultados combinados</h3>
                <p className="text-muted-foreground">Orgânico + Performance</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">+200%</p>
                <p className="text-sm text-muted-foreground">Alcance total</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">+150%</p>
                <p className="text-sm text-muted-foreground">Engajamento</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">-30%</p>
                <p className="text-sm text-muted-foreground">Custo por lead</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">+80%</p>
                <p className="text-sm text-muted-foreground">Conversões</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre o serviço de Redes Sociais."
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
            Pronto para profissionalizar suas redes?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta de gestão de redes sociais 
            personalizada para o seu negócio.
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
