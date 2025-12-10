import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Section, SectionHeader } from "@/components/Section";
import { Bot, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react";

const features = [
  "Implantação de chatbots inteligentes",
  "Fluxos de nutrição de leads automatizados",
  "Integrações com CRM e ferramentas externas",
  "Automação de atendimento 24/7",
  "Redução do trabalho manual do time",
  "Integração completa com HubRS CRM",
];

export default function ServicoAutomacao() {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">Serviço</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Automação & IA
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Implantamos chatbots, fluxos automatizados e integrações com CRM para escalar 
              suas vendas e suporte sem aumentar a equipe.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Escale sem aumentar custos"
              subtitle="Automação inteligente para atendimento e vendas."
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
                  Conhecer o HubRS CRM
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-foreground">HubRS CRM</h3>
                <p className="text-muted-foreground">Integração nativa</p>
              </div>
            </div>
            <p className="text-foreground mb-4">
              Todas as nossas automações se integram nativamente com o HubRS CRM, 
              garantindo rastreabilidade completa do funil de vendas.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/hubrs-crm">Saiba mais sobre o HubRS</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mavi-white mb-4">
            Quer automatizar seu atendimento?
          </h2>
          <p className="text-mavi-white/70 mb-8">
            Converse com nosso time e descubra como a automação pode transformar seu negócio.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contato">Falar com especialista</Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}
