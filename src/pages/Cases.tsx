import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { TrendingUp, ArrowRight, CheckCircle2, Award } from "lucide-react";

const cases = [
  {
    title: "TechStore - E-commerce de Eletrônicos",
    challenge: "Loja virtual nova, sem tráfego qualificado e operação desorganizada sem CRM.",
    strategy: "Implementação de loja Tray + campanhas Meta Ads full funnel + HubRS CRM para gestão de leads.",
    results: [
      "+320% de faturamento em 6 meses",
      "ROAS de 8.7x nas campanhas",
      "47 leads qualificados/dia via CRM",
    ],
  },
  {
    title: "Bella Moda - Moda Feminina",
    challenge: "Alto volume de mensagens no WhatsApp sem controle, perdendo vendas por falta de follow-up.",
    strategy: "HubRS CRM com automação de WhatsApp + IA para qualificação + integração com Meta Ads.",
    results: [
      "+180% em conversões de WhatsApp",
      "Tempo de resposta: de 4h para 5min",
      "Zero leads perdidos",
    ],
  },
  {
    title: "Fit Suplementos - Marketplaces",
    challenge: "Operação em múltiplos marketplaces sem padronização e sem clareza sobre rentabilidade por canal.",
    strategy: "Gestão integrada de marketplaces + ERP + dashboard de performance por canal.",
    results: [
      "+250% de vendas em marketplaces",
      "Margem aumentada em 15%",
      "4 novos canais ativados",
    ],
  },
];

const clients = [
  "TechStore", "Bella Moda", "Fit Suplementos", "Casa Verde", "Pet Shop Online",
  "Moda Kids", "Auto Peças SC", "Farma Bem", "Eletro Sul", "Sports BR",
  "Decor House", "Natural Food", "Tech Parts", "Fashion Plus", "Home & Co"
];

export default function Cases() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Cases & <span className="text-primary">Clientes</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Resultados reais de negócios que confiaram na MAVI para crescer. 
              De pequenas lojas a operações com múltiplos dígitos mensais.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <Section variant="gray">
        <SectionHeader
          title="Nossos Clientes"
          subtitle="Empresas de diversos segmentos que crescem com a MAVI."
        />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {clients.map((client) => (
            <div
              key={client}
              className="bg-card rounded-lg p-4 text-center border border-border hover:border-primary/30 transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{client}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Cases */}
      <Section>
        <SectionHeader
          title="Cases de Sucesso"
          subtitle="Conheça algumas histórias de crescimento que ajudamos a construir."
        />
        <div className="space-y-8">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="grid md:grid-cols-3">
                <div className="p-6 md:p-8 bg-mavi-gray">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Case de Sucesso</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{caseItem.title}</h3>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Desafio:</p>
                    <p className="text-foreground text-sm leading-relaxed">{caseItem.challenge}</p>
                  </div>
                </div>
                <div className="p-6 md:p-8 border-y md:border-y-0 md:border-x border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Estratégia MAVI:</p>
                  <p className="text-foreground leading-relaxed">{caseItem.strategy}</p>
                </div>
                <div className="p-6 md:p-8 bg-primary/5">
                  <p className="text-sm font-medium text-primary mb-4">Resultados:</p>
                  <div className="space-y-3">
                    {caseItem.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section variant="dark">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">+500</p>
            <p className="text-mavi-white/70">Clientes atendidos</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">R$50M+</p>
            <p className="text-mavi-white/70">Em vendas geradas</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">8.4x</p>
            <p className="text-mavi-white/70">ROAS médio</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">127%</p>
            <p className="text-mavi-white/70">Crescimento médio</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quer ser nosso próximo case de sucesso?
          </h2>
          <p className="text-muted-foreground mb-8">
            Agende uma consultoria gratuita e descubra como podemos ajudar seu negócio a crescer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contato">Quero uma consultoria</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/hubrs-crm">
                Conhecer o HubRS CRM
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
