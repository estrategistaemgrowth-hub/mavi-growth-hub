import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { SEO, generateBreadcrumbSchema, generateFAQSchema } from "@/components/SEO";
import { HeroBackground } from "@/components/HeroBackground";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SplitText } from "@/components/SplitText";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Microscope,
  Search,
  BarChart3,
  Target,
  Rocket,
  ChevronDown,
  ShieldCheck,
  Award,
} from "lucide-react";

const dores = [
  "Invisto em anúncios mas não sei se está funcionando de verdade",
  "Meu ROAS parece bom, mas o caixa não reflete",
  "Já troquei de agência duas vezes e o resultado é o mesmo",
  "Deixo na mão da agência e rezo",
];

const etapas = [
  { icon: Microscope, title: "Auditoria de Conta", desc: "Revisamos suas campanhas ativas no Meta Ads e Google Ads." },
  { icon: Search, title: "Análise de Funil", desc: "Mapeamos onde os leads entram e onde estão saindo." },
  { icon: BarChart3, title: "ROAS Real vs. Inflado", desc: "Calculamos o retorno real, sem maquiagem de métricas." },
  { icon: Target, title: "Oportunidades Ignoradas", desc: "Identificamos verba parada e canais subaproveitados." },
  { icon: Rocket, title: "Plano de 3 Ações", desc: "Você sai com 3 ações concretas para a semana seguinte." },
];

const cases = [
  { roas: "23,7×", segmento: "Resinas e Incensos", retorno: "R$ 184k", invest: "R$ 7,75k" },
  { roas: "21,7×", segmento: "Calçados", retorno: "R$ 104k", invest: "R$ 4,8k" },
  { roas: "19,7×", segmento: "Agro e Energia Solar", retorno: "R$ 62,5k", invest: "R$ 3,18k" },
  { roas: "15,0×", segmento: "Joias e Óculos", retorno: "—", invest: "—" },
  { roas: "12,1×", segmento: "Farmácia", retorno: "R$ 139k", invest: "R$ 11,5k" },
];

const faqs = [
  {
    question: "Por que é gratuito?",
    answer: "Porque é a forma da MAVI mostrar o trabalho antes de cobrar por ele. Se você não sair com pelo menos 3 ações concretas, a gente falhou.",
  },
  {
    question: "Quanto tempo dura?",
    answer: "Entre 30 e 45 minutos. Direto ao ponto, sem enrolação.",
  },
  {
    question: "Preciso ter quanto de verba em anúncios?",
    answer: "O Diagnóstico faz mais sentido para quem já investe a partir de R$ 3.000/mês em mídia. Abaixo disso, te indicamos outro caminho.",
  },
  {
    question: "Vou receber uma proposta no final?",
    answer: "Não. O foco é entregar leitura e ações. Se você quiser conversar sobre proposta depois, marcamos outra conversa.",
  },
  {
    question: "Funciona para qualquer segmento de e-commerce?",
    answer: "Sim. Já operamos varejo, moda, farma, agro, joias, beleza, indústria e serviços. Se vende online, conseguimos analisar.",
  },
];

const verbaOptions = [
  "R$ 3k a R$ 5k/mês",
  "R$ 5k a R$ 15k/mês",
  "R$ 15k a R$ 50k/mês",
  "Acima de R$ 50k/mês",
];

export default function DiagnosticoGratuito() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    site: "",
    verba: "",
  });

  const scrollToForm = () => {
    document.getElementById("form-diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "94cfc9f9-612f-44f3-91a6-801326c23c96",
          to: "robson@agenciamavi.com.br",
          from_name: "MAVI - LP Diagnóstico",
          subject: `Novo Lead Diagnóstico: ${formData.nome}`,
          origem: "LP /diagnostico-gratuito",
          nome: formData.nome,
          whatsapp: formData.whatsapp,
          site: formData.site,
          verba_mensal: formData.verba,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error("fail");

      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }

      setSubmitted(true);
      toast.success("Recebemos! Em até 30 minutos nosso especialista entra em contato para agendar o meet.");
      setFormData({ nome: "", whatsapp: "", site: "", verba: "" });
    } catch {
      toast.error("Não conseguimos enviar agora. Tente novamente ou nos chame no WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // noindex opcional? Mantemos indexável para a LP funcionar como destino de Ads.
  }, []);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Diagnóstico Gratuito", url: "/diagnostico-gratuito" },
  ]);
  const faqSchema = generateFAQSchema(faqs);
  const schema = { "@context": "https://schema.org", "@graph": [breadcrumbSchema, faqSchema] };

  return (
    <Layout>
      <SEO
        title="Diagnóstico de Growth Gratuito | MAVI Marketing Digital"
        description="Descubra onde sua verba de anúncios está sendo desperdiçada. Um estrategista da MAVI analisa sua conta ao vivo em 30 minutos — grátis e sem compromisso."
        canonical="/diagnostico-gratuito"
        schemaMarkup={schema}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-mavi-black overflow-hidden">
        <HeroBackground intensity="medium" />
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="container-mavi relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-accent-bar mx-auto mb-6" />
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/40 text-primary bg-primary/5">
              Diagnóstico Gratuito · 30 a 45 min
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mavi-white leading-[1.05] mb-6">
              <SplitText stagger={35} duration={700}>
                Descubra onde sua verba de anúncios está sendo desperdiçada — em 30 minutos, de graça.
              </SplitText>
            </h1>
            <p className="text-lg md:text-xl text-mavi-white/70 leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
              Um estrategista da MAVI analisa sua conta ao vivo. Sem custo. Sem enrolação. Sem proposta empurrada no final.
            </p>
            <Button size="xl" variant="hero" onClick={scrollToForm} className="animate-fade-in-up animation-delay-300">
              Quero meu Diagnóstico Gratuito
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mavi-white/60 animate-fade-in-up animation-delay-400">
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Google Premier Partner</span>
              <span className="text-mavi-white/30">·</span>
              <span>8,4× ROAS médio</span>
              <span className="text-mavi-white/30">·</span>
              <span>+500 clientes atendidos</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Você investe em anúncios. Mas sabe se está funcionando <span className="text-primary">de verdade?</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto grid gap-4">
            {dores.map((dor, i) => (
              <AnimatedSection key={dor} delay={i * 100}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-mavi-black border border-mavi-white/10">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-mavi-white/85">{dor}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={400}>
            <p className="max-w-3xl mx-auto mt-10 text-center text-lg md:text-xl text-mavi-white/70 leading-relaxed">
              A maioria dos e-commerces deixa <span className="text-primary font-semibold">30% a 50% do ROAS na mesa</span> sem saber.
              Não por falta de verba — por falta de leitura correta dos dados.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                30 minutos que podem mudar o resultado do <span className="text-primary">próximo mês</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {etapas.map((etapa, i) => {
              const Icon = etapa.icon;
              return (
                <AnimatedSection key={etapa.title} delay={i * 100}>
                  <div className="relative h-full p-6 rounded-xl bg-[hsl(0_0%_4%)] border border-mavi-white/10 border-t-2 border-t-primary hover:shadow-magenta transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-semibold text-primary mb-2">ETAPA {i + 1}</div>
                    <h3 className="text-lg font-bold text-mavi-white mb-2">{etapa.title}</h3>
                    <p className="text-sm text-mavi-white/65 leading-relaxed">{etapa.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                O que acontece <span className="text-primary">depois</span> do Diagnóstico MAVI
              </h2>
              <p className="text-mavi-white/60">Resultados reais de clientes — Jan a Mar 2025.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {cases.map((c, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="h-full p-6 rounded-xl bg-mavi-black border border-mavi-white/10 border-t-2 border-t-primary text-center hover:shadow-magenta transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">{c.roas}</div>
                  <div className="text-xs uppercase tracking-wider text-mavi-white/50 mb-3">ROAS</div>
                  <div className="text-sm font-semibold text-mavi-white mb-1">{c.segmento}</div>
                  {c.retorno !== "—" && (
                    <div className="text-xs text-mavi-white/60 mt-3 leading-relaxed">
                      Retorno: <span className="text-mavi-white">{c.retorno}</span><br />
                      Invest.: <span className="text-mavi-white">{c.invest}</span>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE GRATUITO */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="section-accent-bar mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                Se é grátis, <span className="text-primary">por que fazemos isso?</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <blockquote className="border-l-4 border-primary pl-6 py-2 text-xl md:text-2xl text-mavi-white/85 italic leading-relaxed">
                "O diagnóstico é gratuito porque é a nossa forma de mostrar o trabalho antes de cobrar por ele. Se você não sair com pelo menos 3 ações concretas para melhorar sua operação, a gente falhou."
              </blockquote>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {["Sem proposta empurrada", "Sem contrato", "Sem pegadinha"].map((g) => (
                  <div key={g} className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(0_0%_5%)] border border-mavi-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{g}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* QUEM */}
      <section className="py-20 md:py-28 bg-[hsl(0_0%_5%)] text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Você não vai falar com <span className="text-primary">estagiário</span>
              </h2>
              <p className="text-lg text-mavi-white/70 leading-relaxed">
                O Diagnóstico é conduzido por um estrategista sênior do time de growth da MAVI — gente que opera contas reais com verba real todo mês.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Google Premier Partner 2025",
                "Meta Business Partner",
                "Tray Diamante",
                "RD Station Partner",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2 px-4 py-2 rounded-full bg-mavi-black border border-primary/30">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-mavi-white/50 mt-6">
              +5 anos de mercado · Fundada em 2019 · Jaraguá do Sul/SC · Atende todo o Brasil
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-mavi-black text-mavi-white">
        <div className="container-mavi">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="section-accent-bar mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Perguntas <span className="text-primary">frequentes</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="rounded-xl bg-[hsl(0_0%_5%)] border border-mavi-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-mavi-white/5 transition-colors"
                  >
                    <span className="font-semibold text-mavi-white">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-mavi-white/70 leading-relaxed animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM CTA FINAL */}
      <section
        id="form-diagnostico"
        className="relative py-20 md:py-28 bg-mavi-black text-mavi-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,0,126,0.20),transparent_60%)]" />
        <div className="container-mavi relative z-10">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-10">
                <div className="section-accent-bar mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  O próximo passo <span className="text-primary">não custa nada.</span>
                </h2>
                <p className="text-lg text-mavi-white/70">
                  Preencha abaixo e em até 30 minutos nosso especialista entra em contato para agendar seu meet de diagnóstico.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="rounded-2xl bg-[hsl(0_0%_4%)] border border-mavi-white/10 border-t-2 border-t-primary p-6 md:p-8 shadow-magenta">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Recebemos sua solicitação!</h3>
                    <p className="text-mavi-white/70">
                      Em até 30 minutos nosso especialista entra em contato pelo WhatsApp para agendar o meet do seu Diagnóstico.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-mavi-white">Nome completo *</Label>
                      <Input id="nome" name="nome" required value={formData.nome} onChange={handleChange} placeholder="Seu nome" className="bg-mavi-black border-mavi-white/15 text-mavi-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-mavi-white">WhatsApp *</Label>
                      <Input id="whatsapp" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} placeholder="(47) 99999-9999" className="bg-mavi-black border-mavi-white/15 text-mavi-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site" className="text-mavi-white">Site / loja virtual</Label>
                      <Input id="site" name="site" value={formData.site} onChange={handleChange} placeholder="https://sualoja.com.br" className="bg-mavi-black border-mavi-white/15 text-mavi-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verba" className="text-mavi-white">Quanto investe por mês em anúncios? *</Label>
                      <select
                        id="verba"
                        name="verba"
                        required
                        value={formData.verba}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-mavi-white/15 bg-mavi-black text-mavi-white focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <option value="">Selecione uma faixa</option>
                        {verbaOptions.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
                      ) : (
                        "Quero meu Diagnóstico Gratuito"
                      )}
                    </Button>
                    <p className="text-center text-xs text-mavi-white/50">
                      Sem compromisso. Sem cartão. Sem proposta empurrada.
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <p className="text-center text-sm text-mavi-white/50 mt-8">
              Prefere conversar antes? <Link to="/contato" className="text-primary hover:underline">Fale com a gente</Link>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
