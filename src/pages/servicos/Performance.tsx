import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { TrendingUp, CheckCircle2, ArrowRight, Target, BarChart3, Zap, RefreshCw } from "lucide-react";

const process = [
  { icon: Target, title: "Diagnóstico", description: "Análise do cenário atual, metas e oportunidades" },
  { icon: BarChart3, title: "Planejamento", description: "Definição de funis, públicos e criativos" },
  { icon: Zap, title: "Execução", description: "Implementação de campanhas e rastreamentos" },
  { icon: RefreshCw, title: "Otimização", description: "Análise diária e ajustes para maximizar ROAS" },
];

const features = [
  "Campanhas em Meta Ads (Facebook e Instagram)",
  "Campanhas em Google Ads (Search, Display, Shopping)",
  "Funis estruturados: topo, meio e fundo",
  "Foco em métricas reais: ROAS, CAC, ticket médio",
  "Rotina de otimização diária",
  "Conexão com CRM HUBRS para qualificação de leads",
];

export default function ServicoPerformance() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Marketing de Performance
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Gestão de tráfego pago com foco obsessivo em resultados. Cada real investido 
              é rastreado e otimizado para maximizar seu retorno.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          title="Nossa metodologia"
          subtitle="Processo estruturado para entregar resultados consistentes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="gray">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="O que entregamos"
              subtitle="Gestão completa de suas campanhas de mídia paga."
              centered={false}
            />
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/contato">Solicitar Proposta</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/hubrs-crm">
                  Conhecer o CRM HUBRS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">8.4x</p>
                <p className="text-muted-foreground">ROAS médio</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">R$50M+</p>
                <p className="text-muted-foreground">Gerenciados</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">127%</p>
                <p className="text-muted-foreground">Crescimento médio</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">+500</p>
                <p className="text-muted-foreground">Campanhas ativas</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Quer escalar suas vendas com tráfego pago?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Agende um diagnóstico gratuito e descubra o potencial de crescimento do seu negócio.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Agendar Diagnóstico</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
