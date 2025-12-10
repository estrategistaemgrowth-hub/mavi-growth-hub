import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Users, CheckCircle2, ArrowRight, Instagram, Facebook } from "lucide-react";

const features = [
  "Gestão de Instagram e Facebook",
  "Conteúdo estratégico focado em conversão",
  "Planejamento de calendário editorial",
  "Criação de criativos e peças visuais",
  "Relatórios mensais de performance",
  "Integração com estratégia de tráfego pago",
];

export default function ServicoRedesSociais() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Redes Sociais e Conteúdo
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Gestão estratégica de redes sociais com criativos que vendem. Conteúdo planejado 
              para engajar, relacionar e converter seguidores em clientes.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Conteúdo que converte"
              subtitle="Social media pensado para resultado, não apenas para vaidade."
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
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-center">
              <Instagram className="w-12 h-12 text-white mx-auto mb-4" />
              <p className="text-white font-semibold">Instagram</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-center">
              <Facebook className="w-12 h-12 text-white mx-auto mb-4" />
              <p className="text-white font-semibold">Facebook</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Pronto para profissionalizar suas redes?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Entre em contato e receba uma proposta de gestão de redes sociais.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Falar com especialista</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
