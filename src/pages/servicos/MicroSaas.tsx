import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { SEO, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Cpu, CheckCircle2, ArrowRight, Zap, Brain, RefreshCw, Shield, 
  Users, Target, Workflow, MessageSquare, BarChart, FileText
} from "lucide-react";

const examples = [
  { icon: Users, title: "Painel de leads", description: "Com roteamento automático" },
  { icon: Brain, title: "Gestão de tarefas", description: "Organização e ações automáticas" },
  { icon: BarChart, title: "Dashboard de performance", description: "Com alertas inteligentes" },
  { icon: FileText, title: "Portal do cliente", description: "Histórico e status em tempo real" },
  { icon: MessageSquare, title: "Fluxo de suporte", description: "Base de conhecimento integrada" },
];

const devMethodCards = [
  { icon: Zap, title: "Entregas rápidas", description: "IA acelera nosso processo de desenvolvimento, reduzindo prazos" },
  { icon: Target, title: "Personalização precisa", description: "Usamos IA para entender melhor seu negócio e criar soluções sob medida" },
  { icon: RefreshCw, title: "Iteração inteligente", description: "Análise automatizada de feedbacks para evoluir o produto mais rápido" },
  { icon: Shield, title: "Qualidade garantida", description: "Testes e validações otimizados por IA para menos bugs" },
  { icon: Brain, title: "Documentação automática", description: "IA gera documentação técnica e manuais de uso" },
];

const deliverables = [
  "Mapeamento do processo",
  "Protótipo navegável",
  "Login e perfis/permissões",
  "Painel admin e relatórios",
  "Integrações (API/webhook)",
  "Automações configuradas",
  "Deploy + documentação + treinamento",
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

      {/* Hero Section */}
      <section className="relative bg-mavi-black pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Micro SaaS Sob Medida
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white mb-6 leading-tight">
              Desenvolvimento de Micro SaaS — do jeito do seu negócio
            </h1>
            <p className="text-xl text-mavi-gray-light mb-8 max-w-3xl mx-auto">
              Chega de planilha eterna e processo manual. A gente transforma sua operação num sistema leve e sob medida, com integrações e painel personalizado. Usamos IA no nosso processo para entregar mais rápido e com mais qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="hero">
                <Link to="/contato">
                  Quero construir meu Micro SaaS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline">
                <Link to="/cases">Ver cases</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* O que é um Micro SaaS */}
      <Section>
        <SectionHeader
          title="O que é um Micro SaaS (na prática)"
          subtitle="Sistemas leves, focados e feitos sob medida pra resolver problemas específicos do seu negócio"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-mavi-white border border-mavi-gray-light/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <example.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-mavi-black mb-2">
                {example.title}
              </h3>
              <p className="text-mavi-gray">{example.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Como usamos IA no desenvolvimento */}
      <Section variant="gray">
        <SectionHeader
          title="Como usamos IA no desenvolvimento"
          subtitle="IA é nossa ferramenta interna para entregar sistemas melhores e mais rápido"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devMethodCards.map((card, index) => (
            <div
              key={index}
              className="bg-mavi-white border border-mavi-gray-light/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-mavi-black mb-2">
                {card.title}
              </h3>
              <p className="text-mavi-gray">{card.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* O que você recebe */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">O que você recebe (entregáveis)</h2>
            <p className="text-muted-foreground mb-6">Do mapeamento ao deploy, tudo pronto pra rodar</p>
            <ul className="space-y-4">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-mavi-gray">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/contato">
                  Solicitar Proposta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-mavi-gray">Sob medida</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">LGPD</div>
                <div className="text-sm text-mavi-gray">Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">API</div>
                <div className="text-sm text-mavi-gray">Integrações</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">IA</div>
                <div className="text-sm text-mavi-gray">Quando faz sentido</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Como é o projeto */}
      <Section variant="gray">
        <SectionHeader
          title="Como é o projeto (passo a passo)"
          subtitle="Metodologia ágil com entregas rápidas e evolução contínua"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {process.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-mavi-white rounded-xl p-6 h-full border border-mavi-gray-light/20 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary text-mavi-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-mavi-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-mavi-gray">{item.description}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Pra quem isso é perfeito */}
      <Section>
        <SectionHeader
          title="Pra quem isso é perfeito"
          subtitle="Se você se identificar com algum desses cenários, a gente pode ajudar"
        />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {targetAudience.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-mavi-white border border-mavi-gray-light/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-mavi-gray font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="gray">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Tire suas dúvidas sobre o desenvolvimento de Micro SaaS"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-mavi-white border border-mavi-gray-light/20 rounded-xl px-6 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-mavi-black hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-mavi-gray pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA Final */}
      <Section variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mavi-white mb-6">
            Vamos tirar seu processo da unha e colocar num sistema de verdade?
          </h2>
          <p className="text-xl text-mavi-gray-light mb-8">
            Conta pra gente seu cenário e a gente te devolve um plano de MVP com prioridades, tempo e caminho de evolução.
          </p>
          <Button asChild size="xl" variant="hero">
            <Link to="/contato">
              Solicitar diagnóstico do Micro SaaS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
