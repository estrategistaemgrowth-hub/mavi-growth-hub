import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { SegmentBody } from "@/components/segment/SegmentBlocks";
import {
  Building2,
  Target,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Camera,
  TrendingUp,
  Zap,
} from "lucide-react";

const problems = [
  {
    icon: Target,
    title: "Leads desqualificados",
    description:
      "Recebe muitos contatos que não têm perfil para comprar ou alugar os imóveis disponíveis.",
  },
  {
    icon: Users,
    title: "Corretores sem organização",
    description:
      "Dificuldade em acompanhar o funil de vendas e saber em qual etapa cada lead está.",
  },
  {
    icon: MessageSquare,
    title: "Follow-up manual",
    description:
      "Perda de oportunidades por falta de acompanhamento sistemático dos interessados.",
  },
  {
    icon: BarChart3,
    title: "Sem métricas claras",
    description:
      "Não sabe qual canal gera mais resultados nem qual corretor performa melhor.",
  },
];

const solutions = [
  {
    icon: Target,
    title: "Campanhas Segmentadas",
    description:
      "Google Ads e Meta Ads com segmentação por região, renda e interesse em tipos específicos de imóveis.",
  },
  {
    icon: Globe,
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas otimizadas para cada empreendimento ou tipo de imóvel, maximizando a conversão de visitantes em leads.",
  },
  {
    icon: Users,
    title: "CRM HUBRS para Corretores",
    description:
      "Gestão completa do funil de vendas, distribuição automática de leads e acompanhamento de performance.",
  },
  {
    icon: MessageSquare,
    title: "Automação de WhatsApp",
    description:
      "Follow-up automático, respostas instantâneas e nutrição de leads via WhatsApp Business.",
  },
  {
    icon: Camera,
    title: "Conteúdo Visual Profissional",
    description:
      "Gestão de redes sociais com fotos profissionais, tours virtuais e vídeos dos imóveis.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Analytics",
    description:
      "Dashboard completo com métricas de campanhas, custo por lead e performance por corretor.",
  },
];

const benefits = [
  "Leads mais qualificados com interesse real nos imóveis",
  "Redução do custo por lead qualificado",
  "Aumento da taxa de conversão de visitas em vendas",
  "Organização completa do funil de vendas",
  "Automação do follow-up com leads",
  "Visibilidade total da performance de cada corretor",
  "Presença digital profissional e consistente",
  "Integração entre marketing e vendas",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Analisamos seu público-alvo, concorrência, região de atuação e tipos de imóveis para definir a estratégia.",
  },
  {
    step: "02",
    title: "Planejamento",
    description:
      "Definimos os canais, orçamento, segmentações e metas de leads e vendas mensais.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Configuramos campanhas, landing pages, CRM e automações de WhatsApp.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Monitoramento contínuo, testes A/B e otimizações semanais para maximizar resultados.",
  },
];

const faqs = [
  {
    question: "Quanto custa para gerar um lead qualificado para imobiliária?",
    answer:
      "O custo por lead varia conforme a região, tipo de imóvel e concorrência. Em média, conseguimos leads qualificados entre R$15 e R$50 para locação e R$30 a R$100 para venda, dependendo do ticket do imóvel.",
  },
  {
    question: "Vocês trabalham com imobiliárias de qualquer tamanho?",
    answer:
      "Sim! Atendemos desde corretores autônomos até grandes imobiliárias com dezenas de corretores. As soluções são adaptadas conforme o porte e necessidade de cada cliente.",
  },
  {
    question: "Como funciona a integração com o CRM?",
    answer:
      "O CRM HUBRS recebe automaticamente todos os leads das campanhas, distribui entre corretores, envia mensagens automáticas de boas-vindas e permite acompanhar todo o funil de vendas.",
  },
  {
    question: "Vocês criam sites para imobiliárias?",
    answer:
      "Sim! Desenvolvemos sites institucionais e landing pages específicas para empreendimentos, integrados com CRM e otimizados para conversão e SEO local.",
  },
  {
    question: "Qual o prazo para ver resultados?",
    answer:
      "Os primeiros leads começam a chegar nos primeiros dias de campanha. Para otimização completa e resultados consistentes, recomendamos um período de 2 a 3 meses.",
  },
];

const SegmentoImobiliarias = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Imobiliárias", url: "/segmentos/imobiliarias" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Imobiliárias e Corretoras"
        description="Estratégias de marketing digital para imobiliárias. Geração de leads qualificados, CRM para corretores, campanhas de imóveis e automação de WhatsApp. Agende uma consultoria."
        canonical="/segmentos/imobiliarias"
        schemaMarkup={combinedSchema}
      />

      <SegmentBody
        badge="Marketing para Imobiliárias"
        title={<>Gere mais leads <span className="text-primary">qualificados</span> para sua imobiliária</>}
        lead="Estratégias de marketing digital que atraem clientes reais interessados em comprar ou alugar. CRM especializado para corretores e automação de follow-up."
        resultsIcon={Building2}
        resultsTitle="Resultados para Imobiliárias"
        results={[
          { icon: TrendingUp, value: "3x mais leads", label: "Com a mesma verba de mídia" },
          { icon: Zap, value: "70% menos tempo", label: "Em follow-up com automação" },
          { icon: Users, value: "100% organizado", label: "Funil de vendas no CRM" },
        ]}
        problemsTitle="Sua imobiliária enfrenta esses desafios?"
        problemsSubtitle="Problemas que aparecem com frequência em imobiliárias que chegam até nós"
        problems={problems}
        solutionsTitle="Nossas soluções para Imobiliárias"
        solutions={solutions}
        benefitsTitle="O que sua imobiliária ganha com a MAVI"
        benefits={benefits}
        crmTitle="Conheça o CRM HUBRS"
        crmText="Desenvolvido pela MAVI, o HUBRS é o CRM ideal para imobiliárias que querem organizar leads, automatizar follow-up e acompanhar a performance de cada corretor."
        processSubtitle="Nosso processo para gerar resultados consistentes para imobiliárias"
        process={process}
        faqSubtitle="Tire suas dúvidas sobre marketing digital para imobiliárias"
        faqs={faqs}
        ctaTitle="Quer ver quanto custa um lead qualificado na sua região?"
        ctaText="A gente analisa seu mercado e mostra o que faria. Gratuito, sem compromisso."
      />
    </Layout>
  );
};

export default SegmentoImobiliarias;
