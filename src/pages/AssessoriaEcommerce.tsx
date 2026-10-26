import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { CyclingTypewriter } from "@/components/CyclingTypewriter";
import { LogoCarousel } from "@/components/LogoCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaqBlock } from "@/components/service/ServiceBlocks";
import {
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Megaphone,
  MonitorSmartphone,
  RefreshCw,
  ShoppingBag,
  Palette,
  Store,
  Award,
  Loader2,
  Lock,
} from "lucide-react";
import logoMavi from "@/assets/logo-mavi-colorida.png";

const WHATSAPP_NUMBER = "5547999293541";

// Segmentos reais de e-commerce no Brasil (Moda, Casa e Jardim, Infantil, Saúde e
// Bem-estar e Alimentos e Bebidas são os 5 maiores por faturamento; Beleza é o que
// mais cresce). Fonte: edrone.me/br/blog/nichos-ecommerce, jul/2026.
const SEGMENTO_OPTIONS = [
  "Moda e Vestuário",
  "Calçados e Acessórios",
  "Beleza e Cosméticos",
  "Casa e Decoração",
  "Eletrônicos e Tecnologia",
  "Alimentos e Bebidas",
  "Saúde e Bem-estar / Suplementos",
  "Infantil e Bebês",
  "Pet Shop",
  "Esporte e Lazer",
  "Joias e Bijuterias",
  "Móveis",
  "Outro",
];

const NOME_BLOCKLIST = ["teste", "test", "asdf", "qwerty", "lorem", "exemplo", "fulano", "admin", "xxxx", "aaaa"];
const EMAIL_DOMAIN_BLOCKLIST = [
  "teste.com", "test.com", "example.com", "exemplo.com", "mailinator.com",
  "yopmail.com", "tempmail.com", "temp-mail.org", "guerrillamail.com", "10minutemail.com",
];

function isNomeSuspeito(nome: string): boolean {
  const v = nome.trim().toLowerCase();
  if (/^(.)\1+$/.test(v.replace(/\s/g, ""))) return true; // "aaaa aaaa"
  if (NOME_BLOCKLIST.some((w) => v.includes(w))) return true;
  return false;
}

function isEmailSuspeito(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  if (EMAIL_DOMAIN_BLOCKLIST.includes(domain)) return true;
  const user = email.trim().toLowerCase().split("@")[0] ?? "";
  return NOME_BLOCKLIST.some((w) => user.includes(w));
}

function isWhatsAppSuspeito(digits: string): boolean {
  if (/^(\d)\1+$/.test(digits)) return true; // 11111111111
  if (digits === "1234567890" || digits === "12345678901") return true;
  return false;
}

const FATURAMENTO_OPTIONS = [
  { value: "ate30k", label: "Até R$ 30k/mês" },
  { value: "30k-100k", label: "R$ 30k a R$ 100k/mês" },
  { value: "100k-300k", label: "R$ 100k a R$ 300k/mês" },
  { value: "300k-1M", label: "R$ 300k a R$ 1M/mês" },
  { value: "acima1M", label: "Acima de R$ 1M/mês" },
];

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const DIFERENCIAIS = [
  {
    icon: TrendingUp,
    title: "Tráfego Pago",
    desc: "Campanhas de Meta e Google estruturadas por intenção de compra, com ROAS real acompanhado toda semana.",
  },
  {
    icon: Megaphone,
    title: "Criativos que Convertem",
    desc: "A gente testa vários ganchos até achar o que trava o dedo na tela nos primeiros 3 segundos.",
  },
  {
    icon: MonitorSmartphone,
    title: "Site & Conversão",
    desc: "CRO, mobile-first e checkout sem fricção. Cada visita passa a valer mais, sem gastar mais em tráfego.",
  },
  {
    icon: RefreshCw,
    title: "CRM & Recompra",
    desc: "O HUBRS automatiza o atendimento e traz o cliente de volta pra comprar de novo, sem depender só de anúncio.",
  },
];

const ENTREGAS = [
  { icon: TrendingUp, label: "Gestão de Tráfego", href: "/servicos/performance" },
  { icon: Megaphone, label: "Redes Sociais & Criativos", href: "/servicos/redes-sociais" },
  { icon: Store, label: "Marketplaces", href: "/servicos/marketplaces" },
  { icon: MonitorSmartphone, label: "Site & CRO", href: "/servicos/sites" },
  { icon: RefreshCw, label: "CRM HUBRS", href: "/hubrs-crm" },
];

const CASES = [
  {
    icon: ShoppingBag,
    title: "E-commerce de Eletrônicos",
    challenge: "Loja nova, sem tráfego qualificado e operação desorganizada sem CRM.",
    results: ["+320% de faturamento em 6 meses", "ROAS de 8.7x nas campanhas", "47 leads qualificados/dia"],
  },
  {
    icon: Palette,
    title: "Moda Feminina",
    challenge: "Alto volume de mensagens no WhatsApp sem controle, perdendo vendas por falta de follow-up.",
    results: ["+180% em conversões de WhatsApp", "Tempo de resposta: de 4h para 5min", "Zero leads perdidos"],
  },
  {
    icon: Store,
    title: "Suplementos e Marketplaces",
    challenge: "Operação em múltiplos marketplaces sem padronização e sem clareza sobre rentabilidade por canal.",
    results: ["+250% de vendas em marketplaces", "Margem aumentada em 15%", "4 novos canais ativados"],
  },
];

const FAQS = [
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "Os primeiros resultados aparecem em 30-60 dias, com crescimento consistente a partir do terceiro mês de trabalho contínuo. No diagnóstico de 30 minutos já mostramos o que priorizar primeiro.",
  },
  {
    question: "Vocês atendem qualquer tamanho de loja?",
    answer: "Sim! Atendemos desde pequenos e-commerces até operações com faturamento de múltiplos dígitos mensais, adaptando a estratégia conforme o porte e os objetivos.",
  },
  {
    question: "O diagnóstico de 30 minutos tem algum custo?",
    answer: "Não. É uma conversa gratuita e sem compromisso. Um especialista analisa sua loja e te mostra onde estão as maiores oportunidades, com ou sem contratar a MAVI depois.",
  },
  {
    question: "Como é calculado o ROAS mostrado nos cases?",
    answer: "O ROAS (Retorno sobre Investimento em Anúncios) é calculado dividindo o faturamento atribuído às campanhas pelo investimento em mídia, rastreado via pixels de conversão, UTMs e integração com os sistemas de vendas do cliente.",
  },
  {
    question: "Preciso já ter um CRM ou site pronto?",
    answer: "Não. A gente diagnostica o que existe hoje, mesmo que seja só uma página de rede social, e monta o plano a partir daí.",
  },
];

export default function AssessoriaEcommerce() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState("");
  const [outroSegmento, setOutroSegmento] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; email?: string; whatsapp?: string; empresa?: string; segmento?: string; outroSegmento?: string; faturamento?: string }>({});

  const showOutroInput = segmento === "Outro";
  const segmentoFinal = segmento === "Outro" ? outroSegmento.trim() : segmento;

  function scrollToForm() {
    document.getElementById("form-diagnostico")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Envia o evento também via Conversions API (server-side), com o mesmo
  // event_id do fbq client-side para o Meta deduplicar as duas chamadas.
  function sendCapiEvent(eventName: string, eventId: string, opts?: { email?: string; phone?: string }) {
    const getCookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];
    supabase.functions.invoke("meta-capi", {
      body: {
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        email: opts?.email,
        phone: opts?.phone,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
    }).catch((err) => console.error("meta-capi invoke error:", err));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: typeof errors = {};
    const nomeParts = nome.trim().split(/\s+/).filter(Boolean);
    if (nomeParts.length < 2 || nomeParts.some((p) => p.length < 2)) {
      newErrors.nome = "Digite nome e sobrenome";
    } else if (isNomeSuspeito(nome)) {
      newErrors.nome = "Digite seu nome de verdade";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Digite um e-mail válido";
    } else if (isEmailSuspeito(email)) {
      newErrors.email = "Digite um e-mail de verdade";
    }

    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) {
      newErrors.whatsapp = "Digite um WhatsApp válido";
    } else if (isWhatsAppSuspeito(digits)) {
      newErrors.whatsapp = "Digite um WhatsApp de verdade";
    }

    if (!empresa.trim() || empresa.trim().length < 2) newErrors.empresa = "Digite o nome da sua empresa";
    if (!segmento) newErrors.segmento = "Selecione seu segmento";
    if (segmento === "Outro" && (!outroSegmento.trim() || outroSegmento.trim().length < 2)) {
      newErrors.outroSegmento = "Digite seu segmento";
    }
    if (!faturamento) newErrors.faturamento = "Selecione o faturamento";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const faturamentoLabel = FATURAMENTO_OPTIONS.find((f) => f.value === faturamento)?.label ?? "";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("landing_assessoria_leads").insert({
        nome: nome.trim(),
        email: email.trim(),
        whatsapp,
        empresa: empresa.trim(),
        segmento: segmentoFinal,
        faturamento: faturamentoLabel || null,
        origem_url: window.location.href,
      });
      if (error) throw error;

      // ── Pixel events ──────────────────────────────────────────────────────────
      const leadEventId = `assessoria-lead-${Date.now()}`;
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: "Assessoria de E-commerce",
          currency: "BRL",
        }, { eventID: leadEventId });
      }
      sendCapiEvent("Lead", leadEventId, { email: email.trim(), phone: whatsapp });

      if (typeof (window as any).gtag_report_conversion === "function") {
        (window as any).gtag_report_conversion();
      }

      const message = encodeURIComponent(
        `Olá! Preenchi o formulário da MAVI e quero agendar meu diagnóstico gratuito de 30 minutos.\n\nNome: ${nome.trim()}\nEmpresa: ${empresa.trim() || "-"}\nSegmento: ${segmento}${faturamentoLabel ? `\nFaturamento: ${faturamentoLabel}` : ""}`
      );
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("Não deu pra enviar agora. Tenta de novo em instantes.");
    }
  }

  const fieldClass = (hasError?: string) =>
    `h-12 rounded-xl bg-background text-base focus-visible:border-primary focus-visible:ring-primary/30 ${hasError ? "border-red-500" : "border-input"}`;
  const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
  const errorClass = "mt-1.5 text-xs font-medium text-red-600";
  const pillLabel = "mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary";
  const sectionTitle = "text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground text-balance md:text-4xl";

  return (
    <div className="bg-background">
      <SEO
        title="Assessoria de E-commerce Gratuita em 30 Minutos"
        description="Agende um diagnóstico gratuito de 30 minutos com um especialista da MAVI. Analisamos seu e-commerce e mostramos onde estão as maiores oportunidades de crescimento."
        canonical="/assessoria-ecommerce"
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-mavi flex items-center justify-between py-5">
          <img src={logoMavi} alt="MAVI" className="h-7 w-auto" />
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-600 ring-[3px] ring-green-600/20" />
            <span className="text-xs font-medium text-muted-foreground">Diagnóstico gratuito</span>
          </div>
        </div>

        <div className="container-mavi pb-14 pt-8 text-center md:pb-20 md:pt-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 text-[13px] font-semibold text-muted-foreground"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
              <Zap className="h-3.5 w-3.5" />
            </span>
            Growth Marketing para E-commerce
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-5 max-w-4xl text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4rem]"
          >
            Sua loja pode vender muito mais
            {/* A frase mais longa invisível reserva a altura: a troca não empurra o layout */}
            <span className="grid text-primary">
              <span className="invisible col-start-1 row-start-1" aria-hidden="true">todo mês, não só na Black Friday</span>
              <span className="col-start-1 row-start-1">
                <CyclingTypewriter
                  phrases={[
                    "sem depender de promoção",
                    "com ROAS de verdade",
                    "todo mês, não só na Black Friday",
                  ]}
                  speed={36}
                  holdMs={2400}
                />
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Em <strong className="text-foreground">30 minutos</strong>, um especialista da MAVI analisa seu e-commerce
            e mostra exatamente onde estão as maiores oportunidades de crescimento. <strong className="text-foreground">De graça.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToForm}
              className="group relative inline-flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 whitespace-normal rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-magenta transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
            >
              <Zap className="h-4 w-4 shrink-0" />
              Quero meu diagnóstico gratuito de 30 minutos
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-[13px] font-medium text-muted-foreground">+200 e-commerces já analisados pela MAVI</p>
          </div>
        </div>

        <div className="border-y border-border bg-card py-8">
          <LogoCarousel />
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="form-diagnostico" className="bg-background py-16 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-[1fr,1.05fr] lg:gap-20">
          <div>
            <span className={pillLabel}>Diagnóstico gratuito</span>
            <h2 className={sectionTitle}>Agende seu diagnóstico gratuito de 30 minutos</h2>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
              Um especialista vai analisar seu e-commerce e te mostrar exatamente onde estão as maiores
              oportunidades de crescimento.
            </p>

            {/* Dois passos em sequência real, ligados por uma linha */}
            <ol className="relative mt-9 grid gap-6 pl-0">
              <span className="absolute bottom-6 left-[19px] top-6 w-px bg-border" aria-hidden="true" />
              <li className="relative flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">1</span>
                <div className="pt-1.5">
                  <p className="font-bold text-foreground">Complete o formulário</p>
                  <p className="mt-0.5 text-[15px] text-muted-foreground">Leva menos de 1 minuto. Seus dados ficam protegidos.</p>
                </div>
              </li>
              <li className="relative flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary">2</span>
                <div className="pt-1.5">
                  <p className="font-bold text-foreground">Agende seus 30 minutos de diagnóstico</p>
                  <p className="mt-0.5 text-[15px] text-muted-foreground">Um especialista da MAVI chama no WhatsApp pra marcar o melhor horário.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border border-t-4 border-t-primary bg-card shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.08)]">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8">
              <div>
                <Label className={labelClass}>Seu nome</Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className={fieldClass(errors.nome)}
                />
                {errors.nome && <p className={errorClass}>{errors.nome}</p>}
              </div>

              <div>
                <Label className={labelClass}>Seu melhor e-mail</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="voce@email.com"
                  className={fieldClass(errors.email)}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className={labelClass}>WhatsApp</Label>
                  <Input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => { setWhatsapp(formatWhatsApp(e.target.value)); setErrors((p) => ({ ...p, whatsapp: undefined })); }}
                    placeholder="(47) 99999-9999"
                    className={fieldClass(errors.whatsapp)}
                  />
                  {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
                </div>

                <div>
                  <Label className={labelClass}>Nome da sua empresa</Label>
                  <Input
                    value={empresa}
                    onChange={(e) => { setEmpresa(e.target.value); setErrors((p) => ({ ...p, empresa: undefined })); }}
                    placeholder="Nome da loja"
                    className={fieldClass(errors.empresa)}
                  />
                  {errors.empresa && <p className={errorClass}>{errors.empresa}</p>}
                </div>
              </div>

              <div>
                <Label className={labelClass}>Qual o segmento da sua loja?</Label>
                <Select value={segmento} onValueChange={(v) => { setSegmento(v); setErrors((p) => ({ ...p, segmento: undefined })); }}>
                  <SelectTrigger className={fieldClass(errors.segmento)}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.segmento && <p className={errorClass}>{errors.segmento}</p>}
              </div>

              {showOutroInput && (
                <div>
                  <Label className={labelClass}>Qual o segmento, então?</Label>
                  <Input
                    value={outroSegmento}
                    onChange={(e) => { setOutroSegmento(e.target.value); setErrors((p) => ({ ...p, outroSegmento: undefined })); }}
                    placeholder="Ex: Livros, Artigos religiosos..."
                    className={fieldClass(errors.outroSegmento)}
                  />
                  {errors.outroSegmento && <p className={errorClass}>{errors.outroSegmento}</p>}
                </div>
              )}

              <div>
                <Label className={labelClass}>Quanto você fatura no mês?</Label>
                <Select value={faturamento} onValueChange={(v) => { setFaturamento(v); setErrors((p) => ({ ...p, faturamento: undefined })); }}>
                  <SelectTrigger className={fieldClass(errors.faturamento)}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {FATURAMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.faturamento && <p className={errorClass}>{errors.faturamento}</p>}
              </div>

              <Button
                type="submit"
                variant="hero"
                disabled={isSubmitting}
                className="mt-2 h-14 w-full touch-manipulation rounded-full text-base font-bold"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enviando...</>
                ) : (
                  <>Quero meu diagnóstico gratuito <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><Lock className="w-3 h-3" aria-hidden="true" /> Seus dados estão seguros e não serão compartilhados.</p>
            </form>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS: diferenciais em linhas, sem cards */}
      <section className="border-y border-border bg-card py-16 md:py-28">
        <div className="container-mavi grid gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-20">
          <div>
            <span className={pillLabel}>O que fazemos</span>
            <h2 className={sectionTitle}>Marketing de e-commerce com foco em vendas de verdade</h2>
          </div>
          <div className="grid border-t-2 border-foreground sm:grid-cols-2 sm:gap-x-10">
            {DIFERENCIAIS.map((d) => (
              <div key={d.title} className="group flex gap-4 border-b border-border py-6">
                <d.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{d.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE ENTREGAMOS NA PRÁTICA: links em linha */}
      <section className="bg-background py-16 md:py-28">
        <div className="container-mavi grid items-start gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-20">
          <div>
            <span className={pillLabel}>O que entregamos na prática</span>
            <h2 className={sectionTitle}>Tudo que sua loja precisa pra vender todo dia</h2>
          </div>
          <div className="border-t border-border">
            {ENTREGAS.map((e) => (
              <a
                key={e.label}
                href={e.href}
                className="group flex items-center gap-4 border-b border-border py-5 text-lg font-semibold text-foreground"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <e.icon className="h-5 w-5" />
                </span>
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">{e.label}</span>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS: bloco magenta com os números */}
      <section className="bg-background pb-16 md:pb-28">
        <div className="container-mavi">
          <div className="rounded-2xl bg-primary px-6 py-12 text-white md:px-14 md:py-16">
            <span className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold">Quem somos</span>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-balance md:text-4xl">
              Especialistas em e-commerce, não uma agência genérica de anúncios
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
              Há mais de 5 anos ajudamos lojas virtuais a vender mais, do pequeno negócio que está começando
              até marcas que já faturam milhões por mês. Resultado não se promete, se constrói.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/25 lg:grid-cols-4">
              {[
                { n: "+500", label: "Clientes atendidos" },
                { n: "R$50M+", label: "Em vendas geradas" },
                { n: "8.4x", label: "ROAS médio" },
                { n: "127%", label: "Crescimento médio" },
              ].map((s) => (
                <div key={s.label} className="bg-primary px-5 py-5">
                  <p className="text-3xl font-extrabold tracking-tight md:text-4xl">{s.n}</p>
                  <p className="mt-1 text-sm text-white/85">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES: desafio à esquerda, resultados em destaque à direita */}
      <section className="border-y border-border bg-card py-16 md:py-28">
        <div className="container-mavi">
          <span className={pillLabel}>Cases</span>
          <h2 className={`${sectionTitle} mb-12 max-w-3xl`}>Resultados reais de e-commerces que passaram pelo diagnóstico</h2>
          <div className="border-t-2 border-foreground">
            {CASES.map((c) => (
              <div key={c.title} className="grid gap-6 border-b border-border py-8 md:grid-cols-[1.1fr,1fr] md:gap-14">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <Award className="h-4 w-4" /> Case de Sucesso
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.challenge}</p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-extrabold leading-tight tracking-tight text-primary md:text-3xl">{c.results[0]}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {c.results.slice(1).map((r) => (
                      <li key={r} className="flex items-start gap-2 text-[15px] font-medium text-foreground">
                        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqBlock title="Perguntas Frequentes" faqs={FAQS} />

      {/* CTA FINAL */}
      <section className="border-t border-primary/15 bg-primary/5 py-16 text-center md:py-24">
        <div className="container-mavi">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground text-balance md:text-5xl">
            Pronto pra descobrir onde sua loja está perdendo venda?
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-xl text-lg text-muted-foreground">
            30 minutos, sem custo, sem compromisso. Só clareza sobre o que fazer agora.
          </p>
          <button
            onClick={scrollToForm}
            className="group inline-flex min-h-14 w-full touch-manipulation items-center justify-center gap-2 whitespace-normal rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-magenta transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
          >
            Agendar meu diagnóstico gratuito <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <div className="mt-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Sem compromisso · Resposta em horário comercial</span>
          </div>
        </div>
      </section>
    </div>
  );
}
