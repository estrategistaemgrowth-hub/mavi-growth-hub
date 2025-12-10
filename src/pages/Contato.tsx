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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Mensagem enviada!",
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
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-mavi-black">
        <div className="container-mavi">
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
          <div className="lg:col-span-2">
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
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
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
                  {interestOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.interesse.includes(option)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interesse.includes(option)}
                        onChange={() => handleInterestChange(option)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          formData.interesse.includes(option)
                            ? "bg-primary"
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
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-mavi-gray rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Informações de contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Localização</p>
                    <p className="text-foreground">Jaraguá do Sul – SC</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
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
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Prefere WhatsApp?
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Fale diretamente com nossa equipe pelo WhatsApp para um atendimento mais rápido.
              </p>
              <Button asChild className="w-full">
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
