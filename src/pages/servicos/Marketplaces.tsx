import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Store, CheckCircle2 } from "lucide-react";

const features = [
  "Cadastro e categorização de produtos",
  "Integrações com ERP e hubs (Tiny, Bling, etc.)",
  "Configuração de regras de frete e precificação",
  "Gestão de campanhas patrocinadas internas",
  "Metas de faturamento por canal",
  "Relatórios de performance por marketplace",
];

const marketplaces = ["Mercado Livre", "Magazine Luiza", "Amazon", "Shopee", "Americanas", "Via Varejo"];

export default function ServicoMarketplaces() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Store className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Marketplaces & ERP
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Gestão profissional de marketplaces com integração completa. Maximize suas vendas 
              em múltiplos canais com operação organizada e rentável.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Venda em todos os canais"
              subtitle="Operação integrada para maximizar resultados em marketplaces."
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
            <Button asChild>
              <Link to="/contato">Solicitar Proposta</Link>
            </Button>
          </div>
          <div className="bg-mavi-gray rounded-2xl p-8 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Marketplaces atendidos</h3>
            <div className="grid grid-cols-2 gap-3">
              {marketplaces.map((mp) => (
                <div key={mp} className="bg-background rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-foreground">{mp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Quer expandir para marketplaces?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Converse com nosso time e descubra as melhores oportunidades para o seu negócio.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Falar com especialista</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
