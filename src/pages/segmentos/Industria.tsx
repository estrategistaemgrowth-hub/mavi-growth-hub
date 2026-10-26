import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { SegmentBody } from "@/components/segment/SegmentBlocks";
import {
  Factory,
  Target,
  Users,
  Globe,
  BarChart3,
  Search,
  FileText,
  TrendingUp,
  Award,
  Handshake,
  Briefcase,
} from "lucide-react";

const problems = [
  {
    icon: Globe,
    title: "Site desatualizado ou inexistente",
    description:
      "Presença digital fraca que não transmite a credibilidade e capacidade da indústria.",
  },
  {
    icon: Target,
    title: "Dificuldade em gerar leads B2B",
    description:
      "Dependência de indicações e feiras, sem um fluxo constante de novos contatos comerciais.",
  },
  {
    icon: Users,
    title: "Relacionamento manual",
    description:
      "Acompanhamento de clientes e prospects feito de forma desorganizada, sem histórico centralizado.",
  },
  {
    icon: Search,
    title: "Baixa visibilidade online",
    description:
      "Empresa não aparece nas buscas do Google quando potenciais clientes procuram por soluções.",
  },
];

const solutions = [
  {
    icon: Globe,
    title: "Sites Institucionais Profissionais",
    description:
      "Desenvolvimento de sites modernos que transmitem credibilidade, apresentam produtos e geram contatos comerciais.",
  },
  {
    icon: Target,
    title: "Google Ads para B2B",
    description:
      "Campanhas segmentadas para atingir compradores, engenheiros e decisores que buscam por soluções industriais.",
  },
  {
    icon: Briefcase,
    title: "LinkedIn Ads",
    description:
      "Anúncios direcionados para cargos específicos em empresas que podem se tornar clientes.",
  },
  {
    icon: FileText,
    title: "Catálogos Digitais",
    description:
      "Apresentação profissional de produtos e soluções com fichas técnicas e especificações.",
  },
  {
    icon: Users,
    title: "CRM para Vendas B2B",
    description:
      "Gestão do funil comercial, acompanhamento de orçamentos e relacionamento de longo prazo com clientes.",
  },
  {
    icon: BarChart3,
    title: "Analytics e Relatórios",
    description:
      "Métricas claras sobre visitas, leads gerados e performance das campanhas digitais.",
  },
];

const benefits = [
  "Presença digital profissional que transmite credibilidade",
  "Geração constante de leads qualificados B2B",
  "Posicionamento no Google para termos do setor",
  "Catálogos digitais acessíveis a qualquer momento",
  "Organização do funil comercial com CRM",
  "Redução da dependência de feiras e indicações",
  "Métricas claras de retorno sobre investimento",
  "Relacionamento digital com clientes atuais",
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Entendemos seu mercado, concorrentes, produtos e público-alvo B2B.",
  },
  {
    step: "02",
    title: "Estratégia",
    description:
      "Definimos canais, mensagens e táticas para atingir decisores.",
  },
  {
    step: "03",
    title: "Implementação",
    description:
      "Desenvolvemos site, campanhas, materiais digitais e CRM.",
  },
  {
    step: "04",
    title: "Otimização",
    description:
      "Acompanhamento mensal, relatórios e melhorias contínuas.",
  },
];

const useCases = [
  {
    icon: Factory,
    title: "Indústria Metalúrgica",
    description:
      "Sites técnicos, catálogos de produtos e campanhas para compradores industriais.",
  },
  {
    icon: Award,
    title: "Fabricantes",
    description:
      "Presença digital para fabricantes que vendem para revendedores ou direto ao consumidor.",
  },
  {
    icon: Handshake,
    title: "Prestadores B2B",
    description:
      "Empresas que prestam serviços para outras empresas, como manutenção, logística e consultoria.",
  },
];

const faqs = [
  {
    question: "Marketing digital funciona para indústrias B2B?",
    answer:
      "Sim! Cada vez mais compradores B2B pesquisam online antes de tomar decisões. Ter uma presença digital forte é essencial para ser encontrado e gerar credibilidade.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "O ciclo de vendas B2B é mais longo, mas os primeiros leads costumam aparecer em 30-60 dias. Resultados consistentes de vendas geralmente são observados a partir de 3-6 meses.",
  },
  {
    question: "Vocês desenvolvem sites para indústrias?",
    answer:
      "Sim! Desenvolvemos sites institucionais completos, com apresentação de produtos, catálogos técnicos, páginas de contato e integração com CRM.",
  },
  {
    question: "Como funciona a geração de leads B2B?",
    answer:
      "Utilizamos Google Ads para captar buscas de compradores, LinkedIn Ads para atingir decisores e landing pages otimizadas para converter visitantes em contatos comerciais.",
  },
  {
    question: "O CRM HUBRS é adequado para vendas industriais?",
    answer:
      "Sim! O HUBRS permite gerenciar todo o funil comercial, acompanhar orçamentos, registrar reuniões e manter o histórico de relacionamento com cada cliente.",
  },
];

const SegmentoIndustria = () => {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Segmentos", url: "/segmentos" },
    { name: "Indústria", url: "/segmentos/industria" },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema],
  };

  return (
    <Layout>
      <SEO
        title="Marketing Digital para Indústrias e B2B"
        description="Marketing digital para indústrias e empresas B2B. Sites institucionais, geração de leads qualificados, Google Ads, LinkedIn Ads e CRM para vendas industriais."
        canonical="/segmentos/industria"
        schemaMarkup={combinedSchema}
      />

      <SegmentBody
        badge="Marketing para Indústrias"
        title={<>Presença digital <span className="text-primary">profissional</span> para sua indústria</>}
        lead="Sites institucionais, geração de leads B2B e estratégias digitais que conectam sua indústria aos decisores certos."
        resultsIcon={Factory}
        resultsTitle="Resultados para Indústrias"
        results={[
          { icon: Globe, value: "Site profissional", label: "Com catálogo e contato" },
          { icon: TrendingUp, value: "Leads qualificados", label: "Compradores e decisores B2B" },
          { icon: Users, value: "CRM organizado", label: "Funil comercial completo" },
        ]}
        problemsTitle="Sua indústria enfrenta esses desafios?"
        problemsSubtitle="O que aparece com frequência em indústrias que chegam até nós"
        problems={problems}
        solutionsTitle="Nossas soluções para Indústrias"
        solutions={solutions}
        useCases={useCases}
        benefitsTitle="O que sua indústria ganha com a MAVI"
        benefits={benefits}
        crmTitle="CRM para Vendas B2B"
        crmText="O CRM HUBRS permite gerenciar todo o funil comercial, acompanhar orçamentos e manter o histórico de relacionamento com clientes industriais."
        processSubtitle="Nosso processo para gerar resultados para indústrias"
        process={process}
        faqSubtitle="Tire suas dúvidas sobre marketing digital para indústrias"
        faqs={faqs}
        ctaTitle="Quer aparecer quando um comprador pesquisa o que você faz?"
        ctaText="A gente analisa seu segmento e mostra o que faria em 30 minutos. Sem compromisso."
      />
    </Layout>
  );
};

export default SegmentoIndustria;
