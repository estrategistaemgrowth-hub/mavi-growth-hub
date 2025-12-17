import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import {
  MessageSquare,
  Kanban,
  Bot,
  Facebook,
  Mic,
  Bell,
  CheckCircle2,
  ArrowRight,
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
    price: "R$147",
    priceDetail: "/mês (47/usuário + 99,90 IA/mês)",
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

export default function HubRSCRM() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-mavi-black overflow-hidden">
        <div className="container-mavi">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Solução oficial MAVI</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white leading-tight mb-6">
                HUBRS CRM – o CRM que automatiza seu WhatsApp e vende com{" "}
                <span className="text-primary">IA</span>.
              </h1>
              <p className="text-lg md:text-xl text-mavi-white/70 mb-8 leading-relaxed">
                Centralize seus contatos, nunca mais perca um lead e conecte suas campanhas de 
                Meta Ads direto no funil de vendas. Um CRM pensado para escalar suas vendas sem perder o controle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contato?interesse=hubrs">Quero testar o HUBRS CRM</Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <a href="https://wa.me/554733072030?text=Quero%20uma%20demonstração%20do%20HUBRS%20CRM" target="_blank" rel="noopener noreferrer">
                    Solicitar demonstração
                  </a>
                </Button>
              </div>
              <p className="text-mavi-white/50 text-sm mt-4">
                Teste grátis disponível. Sem cartão de crédito.
              </p>
            </div>
            
            <div className="hidden lg:block animate-fade-in-right animation-delay-300">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-mavi-black rounded-2xl p-6 border border-primary/30">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-mavi-white">HUBRS CRM</h3>
                      <p className="text-mavi-white/60 text-sm">Painel de vendas</p>
                    </div>
                  </div>
                  
                  {/* Kanban Preview */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {["Novos Leads", "Em Negociação", "Fechados"].map((stage, i) => (
                      <div key={stage} className="bg-mavi-black/50 rounded-lg p-3">
                        <p className="text-xs text-mavi-white/60 mb-2">{stage}</p>
                        <div className="space-y-2">
                          {[1, 2].map((item) => (
                            <div
                              key={item}
                              className={`h-8 rounded ${
                                i === 2 ? "bg-primary/30" : "bg-mavi-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-mavi-black/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="text-xs text-mavi-white/60">IA Ativa</span>
                      </div>
                      <p className="text-lg font-bold text-mavi-white">24/7</p>
                    </div>
                    <div className="bg-mavi-black/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-xs text-mavi-white/60">Hoje</span>
                      </div>
                      <p className="text-lg font-bold text-mavi-white">47 leads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="O que é o HUBRS CRM"
            subtitle="Um CRM desenvolvido pela MAVI, focado em empresas que querem organizar o funil de vendas e automatizar o atendimento via WhatsApp com IA."
          />
          <p className="text-muted-foreground leading-relaxed">
            O HUBRS ajuda a qualificar leads automaticamente, agilizar respostas, agendar conversas 
            e acompanhar tudo em um funil visual (Kanban). É a ferramenta que transforma seu WhatsApp 
            em uma máquina de vendas organizada.
          </p>
        </div>
      </Section>

      {/* Funcionalidades */}
      <Section variant="gray">
        <SectionHeader
          title="Principais funcionalidades"
          subtitle="Tudo que você precisa para vender mais e atender melhor."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Para quem é */}
      <Section>
        <SectionHeader
          title="Para quem é o HUBRS CRM"
          subtitle="Ideal para negócios que usam WhatsApp como canal de vendas."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.name}
              className="text-center p-6 rounded-xl bg-mavi-gray border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <audience.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{audience.name}</h3>
              <p className="text-sm text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Como funciona */}
      <Section variant="dark">
        <SectionHeader
          title="Como funciona na prática"
          subtitle="3 passos simples para transformar seu atendimento."
          light
        />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Conecte",
              description: "Conecte seu WhatsApp e suas campanhas de anúncios em poucos cliques.",
            },
            {
              step: "2",
              title: "Configure a IA",
              description: "Treine a IA com as informações do seu negócio, produtos e serviços.",
            },
            {
              step: "3",
              title: "Venda mais",
              description: "Acompanhe o funil, responda contatos quentes e aumente as conversões.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-mavi-white mb-2">{item.title}</h3>
              <p className="text-mavi-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefícios */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Benefícios do HUBRS CRM"
              subtitle="Por que empresas estão migrando para o HUBRS."
              centered={false}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="text-center">
              <p className="text-6xl font-bold text-primary mb-2">3x</p>
              <p className="text-xl text-foreground font-medium mb-4">Mais conversões</p>
              <p className="text-muted-foreground">
                Média de aumento nas vendas dos clientes que usam o HUBRS CRM com automação de WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Planos */}
      <Section variant="gray">
        <SectionHeader
          title="Planos e condições"
          subtitle="Escolha o plano ideal para o tamanho do seu negócio."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                  : "bg-card border border-border"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-foreground text-primary rounded-full mb-4 w-fit">
                  Mais popular
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-3xl font-bold ${plan.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.priceDetail}
                </span>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={`text-sm ${plan.highlight ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.note && (
                <p className={`text-xs mb-4 p-3 rounded-lg ${plan.highlight ? "bg-primary-foreground/10 text-primary-foreground/70" : "bg-muted text-muted-foreground"}`}>
                  *{plan.note}
                </p>
              )}
              <Button
                asChild
                variant={plan.highlight ? "heroOutline" : "outline"}
                className="w-full mt-auto"
              >
                <a href={plan.trialLink} target="_blank" rel="noopener noreferrer">Testar Grátis por 7 Dias</a>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Final */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
            Quer transformar seu atendimento em uma máquina de vendas?
          </h2>
          <p className="text-lg text-mavi-white/70 mb-8">
            Comece a usar o HUBRS CRM hoje mesmo ou agende uma demonstração com nosso time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contato?interesse=hubrs">Começar teste do HUBRS CRM</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="https://wa.me/554733072030?text=Quero%20falar%20sobre%20o%20HUBRS%20CRM" target="_blank" rel="noopener noreferrer">
                Falar com o time da MAVI
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
