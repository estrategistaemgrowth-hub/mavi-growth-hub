import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { BlockHead, FaqBlock } from "@/components/service/ServiceBlocks";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { AnimatedSection, AnimatedChildren } from "@/components/AnimatedSection";
import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import {
  MessageSquare,
  Kanban,
  Bot,
  Facebook,
  Mic,
  Bell,
  Zap,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Building2,
  Store,
} from "lucide-react";

const features = [
  {
    icon: Kanban,
    title: "Funil de Vendas Kanban",
    description: "Visualize cada etapa da jornada do cliente em um quadro Kanban, arrastando as oportunidades entre fases. Nunca mais perca um negócio por falta de acompanhamento.",
  },
  {
    icon: Bot,
    title: "Automação de WhatsApp com IA",
    description: "Conecte seu WhatsApp e deixe a IA qualificar leads, responder dúvidas frequentes e encaminhar contatos quentes para o time comercial, 24 horas por dia.",
  },
  {
    icon: Facebook,
    title: "Integração com Meta Ads",
    description: "Conecte suas campanhas de Facebook e Instagram Ads direto no CRM, receba leads automaticamente e rastreie quais anúncios mais geram oportunidades e vendas.",
  },
  {
    icon: Mic,
    title: "Base de Conhecimento e Transcrição",
    description: "Alimente a IA com informações do seu negócio e deixe a plataforma transcrever áudios recebidos para não perder nenhum detalhe do cliente.",
  },
  {
    icon: Bell,
    title: "Automação de Tarefas e Lembretes",
    description: "Crie fluxos de follow-up, agendamentos e alertas para leads que estão esfriando, garantindo um processo comercial consistente.",
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description: "Reduza o tempo de resposta de horas para segundos com automações inteligentes que engajam leads no momento certo.",
  },
];

const audiences = [
  { icon: ShoppingCart, name: "E-commerces", description: "Lojas virtuais que precisam converter mais" },
  { icon: Building2, name: "Prestadores de serviço", description: "Empresas de serviços que vendem pelo WhatsApp" },
  { icon: Stethoscope, name: "Clínicas e consultórios", description: "Agendamentos e follow-up de pacientes" },
  { icon: GraduationCap, name: "Infoprodutores", description: "Vendas de cursos e mentorias" },
  { icon: Store, name: "Negócios locais", description: "Comércios que usam WhatsApp como canal principal" },
];

const benefits = [
  "Mais velocidade no atendimento",
  "Menos leads perdidos",
  "Funil organizado e visual",
  "Time focado em fechar, não em digitar",
  "Dados centralizados para decisões melhores",
  "Atendimento 24/7 com IA",
];

const plans = [
  {
    name: "Basic",
    price: "R$49",
    priceDetail: "/mês por usuário",
    description: "Ideal para iniciantes. Foque no essencial do CRM.",
    features: [
      "Contatos ilimitados",
      "Funil de Vendas Kanban",
      "Tarefas e responsáveis",
      "Cadastro de Produtos",
      "Suporte via chat",
    ],
    trialLink: "http://crm.hubrs.com.br/enrollment/new?product=Hubrs+CRM+-+Basic",
  },
  {
    name: "Plus",
    price: "R$97",
    priceDetail: "/mês por usuário",
    description: "Tudo do Basic + WhatsApp para vendas e suporte ágeis.",
    features: [
      "Tudo do plano Basic",
      "Integração WhatsApp",
      "Captura de leads Meta Ads",
      "Webhooks e API básica",
      "Relatórios",
      "Suporte via chat",
    ],
    highlight: true,
    trialLink: "http://crm.hubrs.com.br/enrollment/new?product=Hubrs+Plus",
  },
  {
    name: "Premium",
    price: "R$179",
    priceDetail: "/mês por usuário",
    description: "O pacote completo com IA para automação e crescimento acelerado.",
    features: [
      "Tudo do plano Plus",
      "Agente de Chat IA",
      "Transcrição de áudios",
      "Base de conhecimento IA",
      "Escalonamento humano automático",
    ],
    note: "Custo adicional por conversas: 0–100 incluso; 101–200: R$159,90; 201–300: R$199,90; >300: R$0,55/conversa",
    trialLink: "http://crm.hubrs.com.br/enrollment/new?product=Hubrs+Premium",
  },
];

const faqs = [
  {
    question: "O HUBRS CRM tem período de teste grátis?",
    answer: "Sim! Oferecemos 7 dias de teste gratuito em todos os planos, sem necessidade de cartão de crédito. Você pode testar todas as funcionalidades antes de decidir.",
  },
  {
    question: "Posso migrar meus contatos de outro CRM?",
    answer: "Sim, oferecemos suporte completo para importação de contatos via planilha (Excel/CSV) ou integração direta com outras plataformas. Nossa equipe auxilia em todo o processo.",
  },
  {
    question: "A IA de atendimento funciona 24 horas?",
    answer: "Sim! O agente de IA responde automaticamente 24/7, qualificando leads, respondendo dúvidas frequentes e encaminhando contatos quentes para o time comercial no momento certo.",
  },
  {
    question: "Quantos usuários posso ter no meu plano?",
    answer: "Não há limite de usuários. O custo é calculado por usuário ativo, conforme o plano escolhido (R$47-49/usuário/mês), permitindo escalar conforme sua equipe cresce.",
  },
  {
    question: "O HUBRS funciona com WhatsApp Business API?",
    answer: "Sim, integramos com a API oficial do WhatsApp Business para automações robustas e atendimento em escala. Também funciona com WhatsApp Web para operações menores.",
  },
  {
    question: "Como funciona a integração com Meta Ads?",
    answer: "Conectamos suas campanhas de Facebook e Instagram Ads diretamente ao CRM. Cada lead gerado pelos anúncios entra automaticamente no funil, com rastreamento completo de origem e conversão.",
  },
];

export default function HubRSCRM() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; trialLink: string }>({ name: "", trialLink: "" });

  const handleOpenTrialDialog = (planName: string, trialLink: string) => {
    setSelectedPlan({ name: planName, trialLink });
    setDialogOpen(true);
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "CRM HUBRS", url: "/hubrs-crm" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="HUBRS CRM: Automação de WhatsApp e IA para Vendas"
        description="CRM desenvolvido pela MAVI com automação de WhatsApp, IA para atendimento 24/7 e integração com Meta Ads. Teste grátis por 7 dias."
        canonical="/hubrs-crm"
        schemaMarkup={combinedSchema}
      />
      {/* Hero: promessa + mockup claro do painel */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-3.5 text-[13px] font-semibold text-muted-foreground">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Solução oficial MAVI
            </span>
            <h1 className="mb-5 mt-6 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[3.6rem]">
              HUBRS CRM – o CRM que automatiza seu WhatsApp e vende com <span className="text-primary">IA</span>.
            </h1>
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Centralize seus contatos, nunca mais perca um lead e conecte suas campanhas de Meta Ads direto no funil de vendas. Um CRM pensado para escalar suas vendas sem perder o controle.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="group rounded-full">
                <a href="#planos">
                  Quero testar o HUBRS CRM
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full">
                <a href="#planos">Solicitar demonstração</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Teste grátis disponível. Sem cartão de crédito.</p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200} className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.08)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground">HUBRS CRM</h3>
                  <p className="text-xs text-muted-foreground">Painel de vendas</p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-green-600 ring-[3px] ring-green-600/20" aria-hidden="true" />
              </div>
              {/* Kanban: os cartões "andam" para Fechados */}
              <div className="grid grid-cols-3 gap-3 bg-background p-4">
                {["Novos Leads", "Em Negociação", "Fechados"].map((stage, i) => (
                  <div key={stage} className="rounded-xl bg-secondary/70 p-2.5">
                    <p className="mb-2 px-1 text-[11px] font-semibold text-muted-foreground">{stage}</p>
                    <div className="space-y-2">
                      {[0, 1, 2].slice(0, 3 - (i === 1 ? 1 : 0)).map((item) => (
                        <div
                          key={item}
                          className={cn(
                            "rounded-lg border p-2 transition-transform duration-500 hover:-translate-y-0.5",
                            i === 2 ? "border-primary/30 bg-primary/10" : "border-border bg-card",
                          )}
                        >
                          <span className={cn("block h-1.5 w-3/4 rounded-full", i === 2 ? "bg-primary/60" : "bg-foreground/15")} />
                          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-foreground/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 border-t border-border">
                <div className="border-r border-border p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">IA Ativa</span>
                  </div>
                  <p className="text-2xl font-extrabold tracking-tight text-foreground">24/7</p>
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-xs text-muted-foreground">Hoje</span>
                  </div>
                  <p className="text-2xl font-extrabold tracking-tight text-foreground">47 leads</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* O que é */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-start gap-8 lg:grid-cols-2 lg:gap-20">
          <BlockHead
            title="O que é o HUBRS CRM"
            subtitle="Um CRM desenvolvido pela MAVI, focado em empresas que querem organizar o funil de vendas e automatizar o atendimento via WhatsApp com IA."
          />
          <AnimatedSection animation="fadeInUp" delay={100}>
            <p className="text-xl font-medium leading-relaxed text-foreground md:text-2xl md:leading-snug">
              O HUBRS qualifica leads automaticamente, agiliza respostas e mantém tudo num funil visual. Quem usa WhatsApp para vender sabe o quanto é difícil controlar isso sem um sistema. O HUBRS resolve essa bagunça.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Funcionalidades: lista em duas colunas, sem grade de cards */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Principais funcionalidades" subtitle="As funções que mais fazem falta em quem vende pelo WhatsApp." />
          <AnimatedChildren className="grid gap-x-16 border-t-2 border-foreground md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="group flex gap-5 border-b border-border py-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-lg font-bold tracking-tight text-foreground">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </section>

      {/* Para quem é: colunas separadas por linhas */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Para quem é o HUBRS CRM" subtitle="Ideal para negócios que usam WhatsApp como canal de vendas." />
          <AnimatedChildren className="grid sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((audience) => (
              <div
                key={audience.name}
                className="border-t border-border py-6 sm:pr-6 lg:border-r lg:border-t-0 lg:py-2 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <audience.icon className="mb-4 h-7 w-7 text-primary" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mb-1 font-bold text-foreground">{audience.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </section>

      {/* Como funciona: 3 passos em sequência real */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Como funciona na prática" subtitle="3 passos simples para transformar seu atendimento." />
          <AnimatedChildren className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              { step: "1", title: "Conecte", description: "Conecte seu WhatsApp e suas campanhas de anúncios em poucos cliques." },
              { step: "2", title: "Configure a IA", description: "Treine a IA com as informações do seu negócio, produtos e serviços." },
              { step: "3", title: "Venda mais", description: "Acompanhe o funil, responda contatos quentes e aumente as conversões." },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 2 && <span className="absolute left-14 right-0 top-6 hidden h-px bg-primary/30 md:block" aria-hidden="true" />}
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">{item.step}</span>
                <h3 className="mb-2 mt-5 text-xl font-bold tracking-tight text-foreground">{item.title}</h3>
                <p className="max-w-[34ch] leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </section>

      {/* Benefícios + número em destaque */}
      <section className="border-y border-border bg-card py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
          <div>
            <BlockHead title="Benefícios do HUBRS CRM" subtitle="O que muda na prática quando você começa a usar." />
            <ul className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 font-medium text-foreground">
                  <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <AnimatedSection animation="fadeInUp" delay={150}>
            <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
              <p className="text-7xl font-extrabold tracking-tight md:text-8xl">3x</p>
              <p className="mt-2 text-2xl font-bold">Mais conversões</p>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-white/90">
                Média de aumento nas vendas dos clientes que usam o HUBRS CRM com automação de WhatsApp.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Planos: aqui cards são o formato certo (comparação lado a lado) */}
      <section id="planos" className="scroll-mt-24 bg-background py-20 md:py-28">
        <div className="container-mavi">
          <BlockHead title="Planos e condições" subtitle="Escolha o plano ideal para o tamanho do seu negócio." center />
          <AnimatedChildren className="grid items-stretch gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-2xl p-7",
                  plan.highlight ? "bg-primary text-primary-foreground md:-my-3 md:py-10" : "border border-border bg-card",
                )}
              >
                {plan.highlight && (
                  <span className="mb-4 w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">Mais popular</span>
                )}
                <h3 className={cn("mb-2 text-2xl font-extrabold tracking-tight", plan.highlight ? "text-primary-foreground" : "text-foreground")}>{plan.name}</h3>
                <p className={cn("mb-5 text-sm", plan.highlight ? "text-white/85" : "text-muted-foreground")}>{plan.description}</p>
                <div className={cn("mb-6 border-b pb-6", plan.highlight ? "border-white/25" : "border-border")}>
                  <span className={cn("text-4xl font-extrabold tracking-tight", plan.highlight ? "text-primary-foreground" : "text-foreground")}>{plan.price}</span>
                  <span className={cn("text-sm", plan.highlight ? "text-white/80" : "text-muted-foreground")}>{plan.priceDetail}</span>
                </div>
                <ul className="mb-6 flex-grow space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlight ? "text-primary-foreground" : "text-primary")} strokeWidth={2.6} aria-hidden="true" />
                      <span className={cn("text-sm", plan.highlight ? "text-white/95" : "text-foreground")}>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.note && (
                  <p className={cn("mb-4 rounded-lg p-3 text-xs", plan.highlight ? "bg-white/10 text-white/80" : "bg-secondary text-muted-foreground")}>*{plan.note}</p>
                )}
                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  className={cn("mt-auto w-full rounded-full", plan.highlight && "bg-white text-primary hover:bg-foreground hover:text-white")}
                  onClick={() => handleOpenTrialDialog(plan.name, plan.trialLink)}
                >
                  Testar Grátis por 7 Dias
                </Button>
              </div>
            ))}
          </AnimatedChildren>
        </div>
      </section>

      <FaqBlock title="Perguntas Frequentes" subtitle="Tire suas dúvidas sobre o HUBRS CRM." faqs={faqs} />

      {/* CTA Final */}
      <section className="border-t border-primary/15 bg-primary/5 py-20 text-center md:py-28">
        <AnimatedSection className="container-mavi">
          <h2 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-5xl">
            Quer ver o HUBRS funcionando com a sua operação?
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-[56ch] text-lg text-muted-foreground">Teste por 7 dias ou chama a gente pra mostrar como funciona.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="group rounded-full">
              <a href="#planos">
                Começar teste do HUBRS CRM
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full">
              <a href="https://wa.me/5547996810630?text=Quero%20falar%20sobre%20o%20HUBRS%20CRM" target="_blank" rel="noopener noreferrer">
                Falar com o time da MAVI
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </section>

      <LeadCaptureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        planName={selectedPlan.name}
        trialLink={selectedPlan.trialLink}
      />
    </Layout>
  );
}
