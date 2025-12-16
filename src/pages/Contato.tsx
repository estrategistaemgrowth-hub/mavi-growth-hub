import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const interestOptions = [
  "E-commerce e Lojas Virtuais",
  "Marketing de Performance",
  "Redes Sociais e Conteúdo",
  "Marketplaces & ERP",
  "Sites e Landing Pages",
  "Automação & IA",
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
          access_key: "YOUR_ACCESS_KEY_HERE", // Substitua pela sua chave do Web3Forms
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

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse animation-delay-500" />
        </div>
        <div className="container-mavi relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-mavi-white mb-6 animate-fade-in-up">
              Fale com a <span className="text-primary">MAVI</span>
            </h1>
            <p className="text-xl text-mavi-white/70 leading-relaxed animate-fade-in-up animation-delay-200">
              Nossa equipe entra em contato em horário comercial para entender seu momento 
              e indicar o melhor caminho de crescimento.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(47) 99999-9999"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nome da sua empresa"
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faturamento">Faturamento atual</Label>
                <select
                  id="faturamento"
                  name="faturamento"
                  value={formData.faturamento}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground transition-all duration-300 focus:scale-[1.02] focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecione uma opção</option>
                  {revenueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label>O que você quer melhorar? (selecione um ou mais)</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {interestOptions.map((option, index) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        formData.interesse.includes(option)
                          ? "border-primary bg-primary/5 shadow-magenta"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interesse.includes(option)}
                        onChange={() => handleInterestChange(option)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all duration-300 ${
                          formData.interesse.includes(option)
                            ? "bg-primary scale-110"
                            : "border-2 border-muted-foreground"
                        }`}
                      >
                        {formData.interesse.includes(option) && (
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm text-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre seu negócio e seus objetivos..."
                  rows={4}
                  className="transition-all duration-300 focus:scale-[1.01]"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="btn-glow transition-all duration-300 hover:scale-105"
              >
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
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-right animation-delay-400">
            <div className="bg-mavi-gray rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Informações de contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <a
                      href="tel:+554733072030"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      (47) 3307-2030
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <a
                      href="mailto:agenciamavi@agenciamavi.com.br"
                      className="text-foreground hover:text-primary transition-colors break-all"
                    >
                      agenciamavi@agenciamavi.com.br
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Localização</p>
                    <p className="text-foreground">Jaraguá do Sul – SC</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horário</p>
                    <p className="text-foreground">Seg a Sex, 8h às 18h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30 hover:shadow-magenta transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-primary animate-pulse" />
                <h3 className="text-lg font-semibold text-foreground">
                  Prefere WhatsApp?
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Fale diretamente com nossa equipe pelo WhatsApp para um atendimento mais rápido.
              </p>
              <Button asChild className="w-full btn-glow">
                <a
                  href="https://wa.me/554733072030?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20MAVI."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
