import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Globe, CheckCircle2 } from "lucide-react";

const features = [
  "Sites institucionais modernos e responsivos",
  "Landing pages de alta conversão",
  "SEO básico configurado",
  "Instalação de pixels e tags de rastreamento",
  "Otimização para anúncios pagos",
  "Design focado em conversão",
];

export default function ServicoSites() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Sites e Landing Pages
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Páginas pensadas para converter. Sites institucionais profissionais e landing pages 
              otimizadas para suas campanhas de mídia paga.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Páginas que convertem"
              subtitle="Design e desenvolvimento focados em resultado."
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
            <Globe className="w-16 h-16 text-primary mb-6" />
            <h3 className="text-xl font-bold text-foreground mb-4">Design moderno</h3>
            <p className="text-muted-foreground">
              Criamos sites e landing pages com design contemporâneo, responsivos e 
              otimizados para performance nos buscadores e campanhas de mídia.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Precisa de um site ou landing page?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta para o seu projeto.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Falar com especialista</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
