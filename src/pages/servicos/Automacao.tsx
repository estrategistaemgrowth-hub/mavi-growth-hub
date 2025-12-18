import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  AlertCircle,
  Clock,
  Users,
  Zap,
  Brain,
  RefreshCw,
  Workflow,
  HeadphonesIcon,
  TrendingUp,
  Target
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const problems = [
  { icon: Clock, title: "Time sobrecarregado?", description: "Equipe perdendo tempo com tarefas repetitivas." },
  { icon: AlertCircle, title: "Leads esfriando?", description: "Demora no atendimento fazendo você perder vendas." },
  { icon: Users, title: "Atendimento inconsistente?", description: "Qualidade variando conforme quem atende." },
  { icon: MessageSquare, title: "WhatsApp caótico?", description: "Mensagens perdidas e sem rastreabilidade." },
];

const features = [
  "Implantação de chatbots inteligentes",
  "Fluxos de nutrição de leads automatizados",
  "Integrações com CRM e ferramentas externas",
  "Automação de atendimento 24/7",
  "Qualificação automática de leads por IA",
  "Integração completa com HubRS CRM",
  "Transcrição de áudios do WhatsApp",
  "Follow-up automático de vendas",
];

const benefits = [
  { icon: Zap, title: "Resposta imediata", description: "Atendimento instantâneo 24/7, mesmo fora do horário comercial." },
  { icon: Brain, title: "IA que qualifica", description: "Inteligência artificial que identifica os melhores leads." },
  { icon: TrendingUp, title: "Escala sem custo", description: "Atenda mais clientes sem aumentar a equipe." },
  { icon: Target, title: "Zero leads perdidos", description: "Cada contato é capturado e acompanhado até a venda." },
];

const automations = [
  { icon: MessageSquare, title: "Chatbot WhatsApp", description: "Atendimento automático com IA no WhatsApp Business" },
  { icon: Workflow, title: "Fluxos de nutrição", description: "Sequências automatizadas de e-mail e mensagens" },
  { icon: HeadphonesIcon, title: "Atendimento 24/7", description: "Suporte ininterrupto sem precisar de equipe" },
  { icon: RefreshCw, title: "Follow-up automático", description: "Lembretes e recontatos que não deixam lead esfriar" },
];

const stats = [
  { end: 70, prefix: "-", suffix: "%", label: "Tempo de resposta" },
  { end: 40, prefix: "+", suffix: "%", label: "Taxa de conversão" },
  { end: 24, prefix: "", suffix: "/7", label: "Atendimento ativo" },
  { end: 0, prefix: "", suffix: "", label: "Leads perdidos", isZero: true },
];

const faqs = [
  {
    question: "Preciso ter um time técnico para usar as automações?",
    answer: "Não! Configuramos tudo e entregamos funcionando. Você só precisa acompanhar os resultados. Oferecemos treinamento para que seu time saiba operar o dia a dia."
  },
  {
    question: "O chatbot consegue responder perguntas complexas?",
    answer: "Sim, nossos chatbots usam IA (GPT) e são treinados com informações do seu negócio. Para casos que exigem atendimento humano, a conversa é transferida automaticamente."
  },
  {
    question: "Funciona com qualquer CRM?",
    answer: "Temos integração nativa com o HubRS CRM, que já inclui todas as automações. Também podemos integrar com outros CRMs como RD Station, HubSpot e Pipedrive."
  },
  {
    question: "Como funciona a automação de WhatsApp?",
    answer: "Utilizamos a API oficial do WhatsApp Business para garantir estabilidade e segurança. O chatbot atende, qualifica e, quando necessário, transfere para um atendente humano."
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer: "Automações básicas ficam prontas em 7 a 14 dias. Projetos mais complexos com múltiplas integrações levam de 3 a 4 semanas para implementação completa."
  },
];

export default function ServicoAutomacao() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mavi-black via-mavi-black to-primary/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">Automação & IA</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Escale vendas com{" "}
              <span className="text-primary">inteligência artificial</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed mb-8 animate-fade-in-up animation-delay-200">
              Implantamos chatbots, fluxos automatizados e integrações com CRM para escalar 
              suas vendas e suporte sem aumentar a equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Button asChild variant="hero" size="xl">
                <Link to="/contato">Quero automatizar meu negócio</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/hubrs-crm">
                  Conhecer o CRM HUBRS
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
                {stat.isZero ? (
                  <p className="text-3xl md:text-4xl font-bold text-primary-foreground">0</p>
                ) : (
                  <AnimatedCounter 
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold text-primary-foreground" 
                  />
                )}
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
            <div key={index} className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 hover:border-destructive/40 transition-colors card-glow">
              <problem.icon className="w-10 h-10 text-destructive mb-4 icon-hover" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Automation Types */}
      <Section variant="gray">
        <SectionHeader
          title="Tipos de automação"
          subtitle="Soluções para cada necessidade do seu negócio."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {automations.map((automation, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors text-center card-glow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 icon-hover-glow">
                <automation.icon className="w-8 h-8 text-primary icon-hover" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{automation.title}</h3>
              <p className="text-sm text-muted-foreground">{automation.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features + Benefits */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Automação inteligente para atendimento e vendas."
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
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors card-glow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary icon-hover" />
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

      {/* CRM Integration */}
      <Section variant="dark">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Integração nativa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
              Potencialize com o HubRS CRM
            </h2>
            <p className="text-mavi-white/70 mb-6 leading-relaxed">
              Todas as nossas automações se integram nativamente com o HubRS CRM, 
              garantindo rastreabilidade completa do funil de vendas. Cada lead que 
              entra é acompanhado do primeiro contato até a venda fechada.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Chatbot conectado direto ao funil de vendas",
                "Leads qualificados automaticamente por IA",
                "Histórico completo de todas interações",
                "Automação de follow-up via WhatsApp",
                "Transcrição de áudios para texto"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-mavi-white/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg">
              <Link to="/hubrs-crm">
                Conhecer o HubRS CRM
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-mavi-white">HubRS CRM</h3>
                <p className="text-mavi-white/60">CRM desenvolvido pela MAVI</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">WhatsApp</p>
                <p className="text-sm text-mavi-white/60">Integrado</p>
              </div>
              <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">IA</p>
                <p className="text-sm text-mavi-white/60">Nativa</p>
              </div>
              <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">Meta Ads</p>
                <p className="text-sm text-mavi-white/60">Conectado</p>
              </div>
              <div className="bg-mavi-black/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">Kanban</p>
                <p className="text-sm text-mavi-white/60">Visual</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Use Cases */}
      <Section>
        <SectionHeader
          title="Casos de uso"
          subtitle="Veja como a automação transforma diferentes operações."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              E-commerce
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-3">Recuperação de carrinho</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Chatbot que identifica abandonos de carrinho e envia mensagens personalizadas 
              com incentivos para concluir a compra.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>+25% de recuperação</span>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Serviços
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-3">Qualificação de leads</h3>
            <p className="text-muted-foreground text-sm mb-4">
              IA que qualifica leads automaticamente, fazendo perguntas estratégicas 
              e direcionando apenas os mais quentes para o time comercial.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>-60% de leads frios</span>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Suporte
            </span>
            <h3 className="text-lg font-semibold text-foreground mb-3">Atendimento 24/7</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Chatbot que responde dúvidas frequentes, rastreia pedidos e resolve 
              problemas simples sem intervenção humana.
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>-70% de tickets</span>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre automação e IA."
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
            Quer automatizar seu atendimento?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Converse com nosso time e descubra como a automação com IA 
            pode transformar seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato">Falar com especialista</Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg">
              <Link to="/hubrs-crm">Conhecer o CRM HUBRS</Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
