import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { ShoppingCart, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const features = [
  "Criação de loja virtual do zero ou migração",
  "Implementação completa na plataforma Tray",
  "Integrações com meios de pagamento (PagSeguro, Mercado Pago, etc.)",
  "Configuração de frete e logística",
  "Integração com ERP e marketplaces",
  "Treinamento básico para gestão da loja",
];

const cases = [
  {
    title: "Loja de Moda Feminina",
    challenge: "Migração de plataforma legada para Tray com zero downtime",
    result: "+45% de conversão após a migração",
  },
  {
    title: "E-commerce de Eletrônicos",
    challenge: "Loja nova precisando de integração com 3 marketplaces",
    result: "Lançamento em 30 dias com todas integrações ativas",
  },
];

export default function ServicoEcommerce() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              E-commerce e Lojas Virtuais
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Lojas virtuais feitas para vender de verdade. Foco em velocidade de lançamento 
              e integração completa com todo o ecossistema de vendas.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Criamos lojas que vendem"
              subtitle="Implementação completa com foco em conversão e operação eficiente."
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
                <Link to="/servicos">
                  Ver outros serviços
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-mavi-gray rounded-2xl p-8 border border-border">
            <ShoppingCart className="w-16 h-16 text-primary mb-6" />
            <h3 className="text-xl font-bold text-foreground mb-4">Especialistas em Tray</h3>
            <p className="text-muted-foreground mb-6">
              Somos referência em implementação de lojas Tray, com metodologia própria 
              para lançamentos rápidos e integrações complexas.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">+200</p>
                <p className="text-sm text-muted-foreground">Lojas criadas</p>
              </div>
              <div className="bg-background rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">30 dias</p>
                <p className="text-sm text-muted-foreground">Tempo médio</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="gray">
        <SectionHeader
          title="Cases de E-commerce"
          subtitle="Resultados reais de lojas que implementamos."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">{caseItem.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">Desafio: {caseItem.challenge}</p>
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">{caseItem.result}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Pronto para lançar sua loja virtual?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta personalizada para o seu projeto.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Falar com especialista</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
