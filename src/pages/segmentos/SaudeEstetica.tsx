import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { SegmentBody } from "@/components/segment/SegmentBlocks";
import {
  Heart,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Calendar,
  TrendingUp,
  Zap,
  Sparkles,
  Clock,
} from "lucide-react";

const problems = [
  {
    icon: Calendar,
    title: "Agenda com horários vazios",
    description:
      "Dificuldade em preencher a agenda e manter um fluxo constante de pacientes e clientes.",
  },
  {
    icon: Clock,
    title: "No-show frequente",
    description:
      "Pacientes que agendam e não comparecem, gerando perda de receita e desorganização.",
  },
  {
    icon: Users,
    title: "Falta de fidelização",
    description:
      "Clientes que fazem um procedimento e nunca mais voltam, sem estratégia de retenção.",
  },
  {
    icon: BarChart3,
    title: "Marketing sem retorno",
    description:
      "Investimento em anúncios e redes sociais que não se convertem em agendamentos.",
  },
];

const solutions = [
  {
    icon: Target,
    title: "Campanhas por Procedimento",
    description:
      "Anúncios segmentados para cada tratamento, atraindo pacientes com interesse real no serviço específico.",
  },
  {
    icon: Globe,
    title: "Landing Pages de Conversão",
    description:
      "Páginas otimizadas para cada procedimento com formulário de agendamento integrado.",
  },
  {
    icon: Users,
    title: "CRM HUBRS para Clínicas",
    description:
      "Gestão completa de pacientes, histórico de atendimentos, lembretes automáticos e follow-up.",
  },
  {
    icon: MessageSquare,
    title: "Automação de Confirmação",
    description:
      "Lembretes automáticos via WhatsApp para confirmar agendamentos e reduzir no-show.",
  },
  {
    icon: Sparkles,
    title: "Conteúdo Educativo",
    description:
      "Gestão de redes sociais com conteúdo que educa, engaja e converte seguidores em pacientes.",
  },
  {
    icon: BarChart3,
    title: "Remarketing e Fidelização",
    description:
      "Campanhas de reativação para pacientes inativos e promoções para tratamentos recorrentes.",
  },
];

const benefits = [
  "Agenda cheia com pacientes qualificados",
  "Redução drástica do no-show com confirmação automática",
  "Aumento do ticket médio por paciente",
  "Fidelização e retorno para novos procedimentos",
  "Presença digital profissional e consistente",
  "Controle total do funil de agendamentos",
  "Integração entre marketing e atendimento",
  "Métricas claras de retorno por campanha",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Analisamos seus serviços, público-alvo, região e concorrência para definir a estratégia.",
  },
  {
    step: "02",
    title: "Planejamento",
    description:
      "Definimos campanhas, landing pages, automações e metas de agendamentos mensais.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Configuramos campanhas, páginas de conversão, CRM e automações de confirmação.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Acompanhamento contínuo, testes A/B e otimizações para maximizar agendamentos.",
  },
];

const faqs = [
  {
    question: "Quanto custa um lead para clínica de estética?",
    answer:
      "O custo por lead varia conforme o procedimento, região e concorrência. Em média, conseguimos leads qualificados entre R$15 e R$60 para procedimentos estéticos, dependendo do ticket do serviço.",
  },
  {
    question: "Vocês trabalham com clínicas de qualquer tamanho?",
    answer:
      "Sim! Atendemos desde profissionais autônomos até clínicas com múltiplos profissionais. As soluções são adaptadas conforme o porte e necessidade de cada cliente.",
  },
  {
    question: "Como funciona a automação de confirmação?",
    answer:
      "Configuramos lembretes automáticos via WhatsApp que são enviados 24h e 2h antes do agendamento, solicitando confirmação do paciente. Isso reduz o no-show em até 70%.",
  },
  {
    question: "Vocês criam sites para clínicas?",
    answer:
      "Sim! Desenvolvemos sites institucionais e landing pages específicas para procedimentos, integrados com CRM e otimizados para conversão e SEO local.",
  },
  {
    question: "Qual o prazo para ver resultados?",
    answer:
      "Os primeiros agendamentos começam a chegar nos primeiros dias de campanha. Para otimização completa e resultados consistentes, recomendamos um período de 2 a 3 meses.",
  },
];

const SegmentoSaudeEstetica = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Saúde e Estética", url: "/segmentos/saude-estetica" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Clínicas, Salões e Spas"
        description="Estratégias de marketing digital para clínicas de estética, salões de beleza, spas e consultórios. Geração de leads, automação de agendamentos e fidelização de clientes."
        canonical="/segmentos/saude-estetica"
        schemaMarkup={combinedSchema}
      />

      <SegmentBody
        badge="Marketing para Saúde e Estética"
        title={<>Agenda cheia com <span className="text-primary">pacientes qualificados</span></>}
        lead="Estratégias de marketing digital que atraem pacientes reais interessados nos seus procedimentos. Automação de confirmação e CRM especializado para clínicas e salões."
        resultsIcon={Heart}
        resultsTitle="Resultados para Clínicas"
        results={[
          { icon: TrendingUp, value: "3x mais agendamentos", label: "Com campanhas otimizadas" },
          { icon: Zap, value: "-70% no-show", label: "Com confirmação automática" },
          { icon: Users, value: "+45% retorno", label: "De pacientes recorrentes" },
        ]}
        problemsTitle="Sua clínica enfrenta esses desafios?"
        problemsSubtitle="Problemas que aparecem com frequência em clínicas e salões que chegam até nós"
        problems={problems}
        solutionsTitle="Nossas soluções para Saúde e Estética"
        solutions={solutions}
        benefitsTitle="O que sua clínica ganha com a MAVI"
        benefits={benefits}
        crmTitle="Conheça o CRM HUBRS"
        crmText="Desenvolvido pela MAVI, o HUBRS é o CRM ideal para clínicas e salões que querem organizar pacientes, automatizar confirmações e acompanhar o histórico de cada cliente."
        processSubtitle="Nosso processo para gerar resultados consistentes para clínicas e salões"
        process={process}
        faqSubtitle="Tire suas dúvidas sobre marketing digital para clínicas e salões"
        faqs={faqs}
        ctaTitle="Pronto para lotar sua agenda?"
        ctaText="A gente vê sua agenda, seu mercado e te diz o que mudaria. Gratuito, sem compromisso."
      />
    </Layout>
  );
};

export default SegmentoSaudeEstetica;
