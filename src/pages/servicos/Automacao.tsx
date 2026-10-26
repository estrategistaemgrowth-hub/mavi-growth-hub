import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceHero, ProblemPicker, DeliverablesBenefits, FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Automação e IA", url: "/servicos/automacao" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Automação e IA para Vendas - Chatbots e Fluxos",
    description: "Chatbots inteligentes, automação de WhatsApp e fluxos de nutrição para escalar vendas sem aumentar equipe.",
    url: "/servicos/automacao",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Automação e IA para Vendas - Chatbots e Fluxos"
        description="Chatbots inteligentes com IA, automação de WhatsApp e fluxos de nutrição. Atendimento 24/7, qualificação automática e integração com CRM."
        canonical="/servicos/automacao"
        schemaMarkup={combinedSchema}
      />

      <ServiceHero
        icon={Bot}
        badge="Automação & IA"
        title={<>Escale vendas com <span className="text-primary">inteligência artificial</span></>}
        lead="Implantamos chatbots, fluxos automatizados e integrações com CRM para escalar suas vendas e suporte sem aumentar a equipe."
        primary={{ label: "Quero automatizar meu negócio", href: "/contato" }}
        secondary={{ label: "Conhecer o CRM HUBRS", href: "/hubrs-crm" }}
        stats={stats.map((s) => ({
          label: s.label,
          value: s.isZero ? "0" : <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />,
        }))}
      />

      <ProblemPicker
        title="Isso soa familiar?"
        subtitle="Se você enfrenta algum desses problemas, podemos ajudar."
        problems={problems}
      />

      {/* Tipos de automação */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Tipos de automação" subtitle="Soluções para cada necessidade do seu negócio." />
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {automations.map((a) => (
              <AnimatedSection key={a.title} className="group border-t-2 border-foreground py-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mb-2 mt-5 text-lg font-bold tracking-tight text-foreground">{a.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{a.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <DeliverablesBenefits
        title="O que entregamos"
        subtitle="Automação inteligente para atendimento e vendas."
        features={features}
        cta={{ label: "Solicitar Proposta", href: "/contato" }}
        benefitsTitle="Benefícios para o seu negócio"
        benefits={benefits}
      />

      {/* Integração com o HubRS CRM */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              Integração nativa
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              Potencialize com o HubRS CRM
            </h2>
            <p className="mb-7 mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              Todas as nossas automações se integram nativamente com o HubRS CRM, garantindo rastreabilidade completa do funil de vendas. Cada lead que entra é acompanhado do primeiro contato até a venda fechada.
            </p>
            <ul className="mb-8 grid gap-3">
              {[
                "Chatbot conectado direto ao funil de vendas",
                "Leads qualificados automaticamente por IA",
                "Histórico completo de todas interações",
                "Automação de follow-up via WhatsApp",
                "Transcrição de áudios para texto",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/hubrs-crm">
                Conhecer o HubRS CRM
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-8 text-white md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                  <MessageSquare className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight">HubRS CRM</h3>
                  <p className="text-white/85">CRM desenvolvido pela MAVI</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/25">
                {[
                  { v: "WhatsApp", l: "Integrado" },
                  { v: "IA", l: "Nativa" },
                  { v: "Meta Ads", l: "Conectado" },
                  { v: "Kanban", l: "Visual" },
                ].map((s) => (
                  <div key={s.v} className="bg-primary px-5 py-5">
                    <p className="text-2xl font-extrabold tracking-tight">{s.v}</p>
                    <p className="text-sm text-white/85">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Casos de uso: contexto, o que a automação faz, resultado */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Casos de uso" subtitle="Veja como a automação transforma diferentes operações." />
          <div className="border-t-2 border-foreground">
            {[
              {
                tag: "E-commerce",
                title: "Recuperação de carrinho",
                text: "Chatbot que identifica abandonos de carrinho e envia mensagens personalizadas com incentivos para concluir a compra.",
                result: "+25% de recuperação",
              },
              {
                tag: "Serviços",
                title: "Qualificação de leads",
                text: "IA que qualifica leads automaticamente, fazendo perguntas estratégicas e direcionando apenas os mais quentes para o time comercial.",
                result: "-60% de leads frios",
              },
              {
                tag: "Suporte",
                title: "Atendimento 24/7",
                text: "Chatbot que responde dúvidas frequentes, rastreia pedidos e resolve problemas simples sem intervenção humana.",
                result: "-70% de tickets",
              },
            ].map((c) => (
              <AnimatedSection key={c.title}>
                <div className="grid gap-3 border-b border-border py-7 md:grid-cols-[160px,1fr,220px] md:items-center md:gap-10">
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{c.tag}</span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{c.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                  <p className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground md:justify-end">
                    <TrendingUp className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {c.result}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre automação e IA." faqs={faqs} />

      <FinalCta
        title="Quer automatizar seu atendimento?"
        text="Converse com nosso time e descubra como a automação com IA pode transformar seu negócio."
        primary={{ label: "Falar com especialista", href: "/contato" }}
        secondary={{ label: "Conhecer o CRM HUBRS", href: "/hubrs-crm" }}
      />
    </Layout>
  );
}
