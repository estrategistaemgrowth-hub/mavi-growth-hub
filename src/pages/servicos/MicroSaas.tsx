import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { FaqBlock, FinalCta, BlockHead } from "@/components/service/ServiceBlocks";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { 
  Cpu, CheckCircle2, ArrowRight, Zap, Brain, RefreshCw, Shield, 
  Users, Target, Workflow, MessageSquare, BarChart, FileText,
  ClipboardList, UserCheck, LayoutDashboard, Ticket, Globe, 
  Lightbulb, Settings, Puzzle, Wrench, Building2
} from "lucide-react";

const examples = [
  { icon: Users, title: "Gestão de clientes", description: "CRM personalizado com histórico, interações e automações" },
  { icon: ClipboardList, title: "Gestão de tarefas", description: "Organização de atividades com fluxos e responsáveis" },
  { icon: LayoutDashboard, title: "Dashboards personalizados", description: "Métricas e KPIs integrados via API com seus sistemas" },
  { icon: Ticket, title: "Gestão de tickets", description: "Controle de chamados, SLA e atendimento ao cliente" },
  { icon: Globe, title: "Portal do cliente", description: "Área exclusiva com histórico, documentos e status em tempo real" },
  { icon: Wrench, title: "Gestão de serviços", description: "Controle operacional de ordens de serviço e equipes" },
  { icon: UserCheck, title: "Painel de leads", description: "Captação e roteamento automático de oportunidades" },
  { icon: Lightbulb, title: "Sua ideia", description: "Criamos o sistema que você imagina pro seu negócio" },
];

const devMethodCards = [
  { icon: Zap, title: "Entregas rápidas", description: "IA acelera nosso processo de desenvolvimento, reduzindo prazos" },
  { icon: Target, title: "Personalização precisa", description: "Usamos IA para entender melhor seu negócio e criar soluções sob medida" },
  { icon: RefreshCw, title: "Iteração inteligente", description: "Análise automatizada de feedbacks para evoluir o produto mais rápido" },
  { icon: Shield, title: "Qualidade garantida", description: "Testes e validações otimizados por IA para menos bugs" },
  { icon: Brain, title: "Documentação automática", description: "IA gera documentação técnica e manuais de uso" },
];

const deliverables = [
  "Mapeamento do processo e fluxos do seu negócio",
  "Protótipo navegável para validação",
  "Login com perfis e permissões personalizadas",
  "Painel admin com relatórios sob medida",
  "Integrações com seus sistemas via API/webhook",
  "Automações configuradas conforme sua operação",
  "Deploy + documentação + treinamento da equipe",
  "Suporte e evolução contínua (opcional)",
];

const process = [
  { step: "1", title: "Diagnóstico", description: "Entendemos seu processo atual e identificamos gargalos" },
  { step: "2", title: "MVP", description: "Desenvolvemos a versão mínima funcional em semanas" },
  { step: "3", title: "Iteração", description: "Ajustes e melhorias baseados no uso real" },
  { step: "4", title: "Automação", description: "Implementamos fluxos automáticos onde faz sentido" },
  { step: "5", title: "Escala", description: "Sistema pronto para crescer com seu negócio" },
];

const targetAudience = [
  { icon: Workflow, text: "Processos manuais e muito retrabalho" },
  { icon: MessageSquare, text: "Muito WhatsApp e pouca rastreabilidade" },
  { icon: BarChart, text: "Necessidade de painel e padronização" },
  { icon: Zap, text: "Quer lançar SaaS de nicho com MVP rápido" },
  { icon: Settings, text: "Precisa de automações para escalar a operação" },
  { icon: Puzzle, text: "Quer um sistema que se encaixe no negócio, não o contrário" },
  { icon: Building2, text: "Sistemas padrões do mercado não atendem sua realidade" },
  { icon: Lightbulb, text: "Tem uma ideia de produto digital e quer validar rápido" },
];

const faqs = [
  {
    question: "Isso é um SaaS pra eu vender, ou um sistema interno?",
    answer: "Pode ser os dois. A gente desenha pra operação interna ou já com estrutura de produto (usuários, planos, permissões, etc.)."
  },
  {
    question: "Quanto tempo demora?",
    answer: "Depende do escopo, mas a lógica é: MVP em semanas, depois evolução contínua. Nada de projeto infinito."
  },
  {
    question: "Dá pra integrar com WhatsApp/CRM/Tray/RD?",
    answer: "Sim. Integração é parte do jogo. A gente define o que entra via API, webhook ou automação."
  },
  {
    question: "Como vocês usam IA no desenvolvimento?",
    answer: "Usamos IA internamente para acelerar o desenvolvimento, melhorar a personalização e garantir qualidade. Isso significa entregas mais rápidas e sistemas mais bem adaptados ao seu negócio."
  },
  {
    question: "Os entregáveis são fixos ou posso personalizar?",
    answer: "Tudo é personalizado de acordo com a sua necessidade. A lista de entregáveis é uma base, mas ajustamos conforme o projeto."
  },
  {
    question: "Fica seguro e dentro da LGPD?",
    answer: "Sim. Controle de acesso, logs, boas práticas e orientação de dados sensíveis desde o desenho do sistema."
  },
];

export default function ServicoMicroSaas() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Serviços", url: "/servicos" },
    { name: "Micro SaaS", url: "/servicos/micro-saas" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const serviceSchema = generateServiceSchema({
    name: "Desenvolvimento de Micro SaaS Sob Medida",
    description: "Criamos Micro SaaS sob medida: painel, automações, integrações e deploy rápido. Usamos IA no desenvolvimento para entregar mais rápido e com mais qualidade.",
    url: "/servicos/micro-saas",
  });

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema, serviceSchema],
  };

  return (
    <Layout>
      <SEO
        title="Desenvolvimento de Micro SaaS Sob Medida"
        description="Criamos Micro SaaS sob medida: painel, automações, integrações e deploy rápido. Usamos IA no desenvolvimento para entregar mais rápido e com mais qualidade."
        canonical="/servicos/micro-saas"
        schemaMarkup={combinedSchema}
      />

      {/* Hero: promessa à esquerda, o "sistema da empresa" montado à direita (mesma linguagem do card da home) */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-3.5 text-[13px] font-semibold text-muted-foreground">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Micro SaaS Sob Medida
            </span>
            <h1 className="mb-5 mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4rem]">
              Desenvolvimento de Micro SaaS, <span className="text-primary">do jeito do seu negócio</span>
            </h1>
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Chega de planilha eterna e processo manual. A gente transforma sua operação num sistema leve e sob medida, com integrações e painel personalizado. Usamos IA no nosso processo para entregar mais rápido e com mais qualidade.
            </p>
            <Button asChild variant="hero" size="xl" className="group mt-8">
              <Link to="/contato">
                Quero construir meu Micro SaaS
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200} className="hidden lg:block">
            <div className="rotate-[1.2deg] rounded-2xl border border-border bg-card p-6 shadow-[0_8px_8px_-6px_hsl(325_25%_9%/0.1)] transition-transform duration-700 ease-out hover:rotate-0" aria-hidden="true">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Cpu className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold text-foreground">Micro SaaS Sob Medida</p>
              </div>
              {examples.slice(0, 4).map((e) => (
                <div key={e.title} className="mt-2 flex items-center justify-between rounded-xl bg-background px-4 py-3 text-sm">
                  <span className="flex items-center gap-2.5 text-muted-foreground">
                    <e.icon className="h-4 w-4 text-primary" />
                    {e.title}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* O que é um Micro SaaS: catálogo em linhas, a última ("Sua ideia") em destaque */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="O que é um Micro SaaS (na prática)" subtitle="Veja alguns tipos de sistema que já criamos:" />
          <div className="grid gap-x-12 border-t-2 border-foreground md:grid-cols-2">
            {examples.map((ex, i) => {
              const last = i === examples.length - 1;
              return (
                <AnimatedSection key={ex.title}>
                  <div
                    className={cn(
                      "group flex items-start gap-4 border-b border-border py-5 transition-transform duration-300 ease-out hover:translate-x-1",
                      last && "-mx-4 rounded-xl border-0 bg-primary px-4 text-primary-foreground hover:translate-x-0",
                    )}
                  >
                    <ex.icon className={cn("mt-0.5 h-6 w-6 shrink-0", last ? "text-primary-foreground" : "text-primary")} strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <h3 className={cn("text-lg font-bold tracking-tight", last ? "text-primary-foreground" : "text-foreground")}>{ex.title}</h3>
                      <p className={cn("mt-0.5 text-[15px] leading-relaxed", last ? "text-white/90" : "text-muted-foreground")}>{ex.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Como usamos IA: faixa magenta, eco do "Pare de ser refém" da home */}
      <section className="bg-primary py-20 text-white md:py-28">
        <div className="container-mavi grid items-start gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15" aria-hidden="true">
              <Brain className="h-6 w-6" />
            </span>
            <h2 className="mb-4 mt-5text-3xl font-extrabold leading-[1.06] tracking-tight text-balance md:text-4xl lg:text-5xl">
              Como usamos IA no desenvolvimento
            </h2>
            <p className="max-w-[44ch] text-lg leading-relaxed text-white/90">
              IA é uma ferramenta interna: usamos pra entregar mais rápido e com menos bugs
            </p>
          </AnimatedSection>
          <div className="border-t border-white/40">
            {devMethodCards.map((card) => (
              <AnimatedSection key={card.title}>
                <div className="group flex gap-4 border-b border-white/25 py-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-primary">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">{card.title}</h3>
                    <p className="mt-0.5 leading-relaxed text-white/90">{card.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* O que você recebe */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              O que você recebe (entregáveis)
            </h2>
            <p className="mb-7 mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
              Tudo personalizado de acordo com a sua necessidade. Esta é uma base que ajustamos conforme o projeto:
            </p>
            <ul className="mb-8 grid gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 font-medium text-foreground">
                  <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/contato">
                Solicitar Proposta
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {[
                { v: "100%", l: "Sob medida" },
                { v: "LGPD", l: "Compliance" },
                { v: "API", l: "Integrações" },
                { v: "IA", l: "Quando faz sentido" },
              ].map((s, i) => (
                <div key={s.v} className={cn("px-6 py-8 md:px-8 md:py-10", i === 0 ? "bg-primary text-primary-foreground" : "bg-card")}>
                  <p className={cn("text-4xl font-extrabold tracking-tight md:text-5xl", i === 0 ? "text-primary-foreground" : "text-primary")}>{s.v}</p>
                  <p className={cn("mt-1 text-sm", i === 0 ? "text-white/90" : "text-muted-foreground")}>{s.l}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Como é o projeto: sequência real, linha do tempo numerada */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Como é o projeto (passo a passo)" subtitle="Metodologia ágil com entregas rápidas e evolução contínua" />
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            <span className="absolute left-5 top-5 hidden h-0.5 w-[calc(100%-2.5rem)] bg-border lg:block" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 top-5 w-0.5 bg-border lg:hidden" aria-hidden="true" />
            {process.map((item) => (
              <AnimatedSection key={item.step}>
                <li className="relative flex gap-5 lg:block">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground ring-8 ring-card">
                    {item.step}
                  </span>
                  <div className="lg:mt-5">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              </AnimatedSection>
            ))}
          </ol>
        </div>
      </section>

      <AudiencePicker />

      <FaqBlock title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre o desenvolvimento de Micro SaaS" faqs={faqs} />

      <FinalCta
        title="Vamos tirar seu processo da unha e colocar num sistema de verdade?"
        text="Conta pra gente seu cenário e a gente te devolve um plano de MVP com prioridades, tempo e caminho de evolução."
        primary={{ label: "Solicitar diagnóstico do Micro SaaS", href: "/contato" }}
      />
    </Layout>
  );
}

/** "Pra quem isso é perfeito": o visitante marca os cenários que vive, como no bloco de problemas. */
function AudiencePicker() {
  const [on, setOn] = useState<number[]>([]);
  const toggle = (i: number) => setOn((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  const n = on.length;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-mavi">
        <BlockHead title="Pra quem isso é perfeito" subtitle="Se você se identificar com algum desses cenários, a gente pode ajudar" />
        <div className="grid gap-3 sm:grid-cols-2">
          {targetAudience.map((item, i) => {
            const pressed = on.includes(i);
            return (
              <div
                key={item.text}
                role="button"
                tabIndex={0}
                aria-pressed={pressed}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 md:p-5",
                  pressed ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                    pressed ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                  )}
                >
                  {pressed ? <Check className="h-5 w-5" strokeWidth={2.6} aria-hidden="true" /> : <item.icon className="h-5 w-5" aria-hidden="true" />}
                </span>
                <p className="font-medium text-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex min-h-12 flex-wrap items-center gap-x-5 gap-y-3" aria-live="polite">
          <p className="font-semibold text-foreground">
            {n === 0 ? "Toque nos que acontecem com você." : `${n} de ${targetAudience.length}. Isso tem conserto, e a primeira conversa é gratuita.`}
          </p>
          {n > 0 && (
            <Link to="/contato" className="inline-flex items-center gap-1.5 font-semibold text-primary animate-chat-pop hover:underline">
              Falar com a MAVI
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
