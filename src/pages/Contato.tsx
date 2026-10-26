import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEO, generateBreadcrumbSchema, generateLocalBusinessSchema, generateFAQSchema } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Check,
  Loader2,
} from "lucide-react";

const interestOptions = [
  "E-commerce e Lojas Virtuais",
  "Marketing de Performance",
  "Redes Sociais e Conteúdo",
  "Marketplaces & ERP",
  "Sites e Landing Pages",
  "Automação & IA",
  "Micro SaaS",
  "CRM HubRS",
  "Outros",
];

const revenueOptions = [
  "Ainda não faturamos",
  "Até R$ 10.000/mês",
  "R$ 10.000 a R$ 50.000/mês",
  "R$ 50.000 a R$ 100.000/mês",
  "R$ 100.000 a R$ 500.000/mês",
  "Acima de R$ 500.000/mês",
];

const contatoFaqs = [
  {
    question: "Como funciona o diagnóstico gratuito?",
    answer: "Você preenche o formulário ou chama no WhatsApp. A gente analisa sua situação e diz o que faria, sem custo e sem compromisso.",
  },
  {
    question: "Qual o tempo de resposta da MAVI?",
    answer: "Respondemos em até 2 horas em horário comercial (seg-sex, 8h-18h). Para urgências, o WhatsApp é o canal mais rápido.",
  },
  {
    question: "Como a MAVI cobra pelos serviços?",
    answer: "Contratos mensais ou por projeto, dependendo do serviço. Os valores só aparecem depois do diagnóstico. Assim a gente já sabe o que faz sentido pro seu caso.",
  },
  {
    question: "A MAVI assina contrato de confidencialidade?",
    answer: "Sim. Tratamos os dados dos clientes com total sigilo e podemos assinar NDA conforme necessário.",
  },
  {
    question: "Posso contratar um serviço específico ou precisa ser o pacote completo?",
    answer: "Você pode contratar serviços avulsos (tráfego pago, e-commerce, Micro SaaS) ou o pacote completo de growth marketing. Montamos a proposta de acordo com sua necessidade.",
  },
];

// Campos: 48px de altura, foco magenta; o vermelho só aparece depois que a pessoa mexeu no campo (:user-invalid)
const field =
  "h-12 rounded-xl border-input bg-background px-4 text-base transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 [&:user-invalid]:border-destructive [&:user-invalid]:ring-2 [&:user-invalid]:ring-destructive/20";

export default function Contato() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    faturamento: "",
    interesse: [] as string[],
    mensagem: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interesse: prev.interesse.includes(interest)
        ? prev.interesse.filter((i) => i !== interest)
        : [...prev.interesse, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "94cfc9f9-612f-44f3-91a6-801326c23c96", // Substitua pela sua chave do Web3Forms
          to: "robson@agenciamavi.com.br",
          from_name: "MAVI Website",
          subject: `Novo Lead: ${formData.nome} - ${formData.empresa || "Sem empresa"}`,
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          empresa: formData.empresa,
          faturamento: formData.faturamento,
          interesses: formData.interesse.join(", "),
          mensagem: formData.mensagem,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Disparar conversão Google Ads
        if (typeof window.gtag_report_conversion === 'function') {
          window.gtag_report_conversion();
        }

        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Nossa equipe entrará em contato em breve.",
        });

        setFormData({
          nome: "",
          email: "",
          whatsapp: "",
          empresa: "",
          faturamento: "",
          interesse: [],
          mensagem: "",
        });
      } else {
        throw new Error("Erro ao enviar formulário");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", url: "/" },
    { name: "Contato", url: "/contato" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(contatoFaqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema, faqSchema],
  };

  const channels = [
    { icon: Phone, label: "Telefone", value: <a href="tel:+5547996810630" className="hover:text-primary transition-colors">(47) 99681-0630</a> },
    {
      icon: Mail,
      label: "E-mail",
      value: <a href="mailto:agenciamavi@agenciamavi.com.br" className="break-all hover:text-primary transition-colors">agenciamavi@agenciamavi.com.br</a>,
    },
    { icon: MapPin, label: "Localização", value: "Jaraguá do Sul – SC" },
    { icon: Clock, label: "Horário", value: "Seg a Sex, 8h às 18h" },
  ];

  return (
    <Layout>
      <SEO
        title="Contato - Fale com a MAVI Marketing Digital"
        description="Solicite um diagnóstico gratuito. Especialistas em e-commerce, imobiliárias, clínicas e indústrias prontos para ajudar seu negócio crescer."
        canonical="/contato"
        schemaMarkup={combinedSchema}
      />

      {/* Hero curto: a página existe pro formulário */}
      <section className="relative overflow-hidden bg-background pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <AnimatedSection animation="fadeInUp" className="container-mavi relative max-w-3xl lg:max-w-7xl">
          <h1 className="text-[2.75rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-6xl lg:text-7xl">
            Fale com a <span className="text-primary">MAVI</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            Conta seu momento e a verba que você opera hoje. A gente responde em horário comercial com um diagnóstico, não com pitch.
          </p>
        </AnimatedSection>
      </section>

      {/* Formulário + canais */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="container-mavi grid items-start gap-8 lg:grid-cols-[1.6fr,1fr] lg:gap-12 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)] md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-semibold">Nome *</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Seu nome completo" required className={field} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">E-mail *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" required className={field} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="font-semibold">WhatsApp *</Label>
                  <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="(47) 99999-9999" required className={field} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="font-semibold">Empresa</Label>
                  <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} placeholder="Nome da sua empresa" className={field} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faturamento" className="font-semibold">Faturamento atual</Label>
                <select
                  id="faturamento"
                  name="faturamento"
                  value={formData.faturamento}
                  onChange={handleInputChange}
                  className={cn("w-full border text-foreground outline-none", field)}
                >
                  <option value="">Selecione uma opção</option>
                  {revenueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="space-y-3">
                <legend className="mb-3 text-sm font-semibold leading-none">O que você quer melhorar? (selecione um ou mais)</legend>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => {
                    const checked = formData.interesse.includes(option);
                    return (
                      <label
                        key={option}
                        className={cn(
                          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[border-color,background-color,color] duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40",
                          checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:border-primary/60",
                        )}
                      >
                        <input type="checkbox" checked={checked} onChange={() => handleInterestChange(option)} className="sr-only" />
                        <span className={cn("grid h-4 w-4 place-items-center rounded-[5px] border-[1.5px]", checked ? "border-white" : "border-current/40")}>
                          <Check className={cn("h-3 w-3 transition-all duration-300", checked ? "scale-100 opacity-100" : "scale-50 opacity-0")} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {option}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="font-semibold">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre seu negócio e seus objetivos..."
                  rows={4}
                  className={cn(field, "h-auto py-3")}
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar mensagem"
                )}
              </Button>
            </form>
          </AnimatedSection>

          {/* Canais diretos */}
          <AnimatedSection animation="fadeInUp" delay={200} className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-primary p-7 text-primary-foreground">
              <div className="mb-3 flex items-center gap-3">
                <MessageSquare className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="text-xl font-extrabold tracking-tight">Prefere WhatsApp?</h3>
              </div>
              <p className="mb-6 leading-relaxed text-white/90">
                Fale diretamente com nossa equipe pelo WhatsApp para um atendimento mais rápido.
              </p>
              <WhatsAppLink className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full bg-white text-primary hover:bg-foreground hover:text-white")}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chamar no WhatsApp
              </WhatsAppLink>
            </div>

            <div className="rounded-2xl border border-border bg-card px-7 py-2">
              <h3 className="border-b border-border py-5 text-lg font-bold text-foreground">Informações de contato</h3>
              {channels.map((c) => (
                <div key={c.label} className="flex items-start gap-4 border-b border-dashed border-input py-4 last:border-0">
                  <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                    <div className="font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
