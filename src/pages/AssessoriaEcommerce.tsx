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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "lucide-react";
import logoMavi from "@/assets/logo-mavi-branca.png";

const WHATSAPP_NUMBER = "5547999293541";

const SEGMENTO_OPTIONS = [
  "E-commerce / Loja Virtual",
  "Indústria",
  "Imobiliária",
  "Saúde e Estética",
  "Serviços",
  "Varejo Físico",
  "Outro",
];

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
    desc: "Testes de gancho e produção pensada pra parar o scroll — não é anúncio bonito, é anúncio que vende.",
  },
  {
    icon: MonitorSmartphone,
    title: "Site & Conversão",
    desc: "CRO, mobile-first e checkout sem fricção — cada visita vale mais sem precisar de mais tráfego.",
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
    answer: "Não. É uma conversa gratuita e sem compromisso — um especialista analisa sua loja e te mostra onde estão as maiores oportunidades, com ou sem contratar a MAVI depois.",
  },
  {
    question: "Como é calculado o ROAS mostrado nos cases?",
    answer: "O ROAS (Retorno sobre Investimento em Anúncios) é calculado dividindo o faturamento atribuído às campanhas pelo investimento em mídia, rastreado via pixels de conversão, UTMs e integração com os sistemas de vendas do cliente.",
  },
  {
    question: "Preciso já ter um CRM ou site pronto?",
    answer: "Não. A gente diagnostica o que existe hoje — mesmo que seja só uma página de rede social — e monta o plano a partir daí.",
  },
];

export default function AssessoriaEcommerce() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; email?: string; whatsapp?: string; segmento?: string }>({});

  function scrollToForm() {
    document.getElementById("form-diagnostico")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!nome.trim() || nome.trim().length < 2) newErrors.nome = "Digite seu nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "Digite um e-mail válido";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) newErrors.whatsapp = "Digite um WhatsApp válido";
    if (!segmento) newErrors.segmento = "Selecione seu segmento";

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
        empresa: empresa.trim() || null,
        segmento,
        faturamento: faturamentoLabel || null,
        origem_url: window.location.href,
      });
      if (error) throw error;

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

  return (
    <div className="bg-white">
      <SEO
        title="Assessoria de E-commerce Gratuita — Diagnóstico de 30 Minutos"
        description="Agende um diagnóstico gratuito de 30 minutos com um especialista da MAVI. Analisamos seu e-commerce e mostramos onde estão as maiores oportunidades de crescimento."
        canonical="/assessoria-ecommerce"
      />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0d0010] to-gray-950" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 20% 40%, rgba(230,0,126,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 10%, rgba(230,0,126,0.1) 0%, transparent 40%)" }}
        />

        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <img src={logoMavi} alt="MAVI" className="h-6" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/50 text-xs">Diagnóstico gratuito</span>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-6 pb-14 md:pt-10 md:pb-20 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full border border-primary/40 text-primary bg-primary/10 mb-5"
          >
            <Zap className="w-3 h-3" /> Assessoria de E-commerce · MAVI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[32px] leading-[1.1] md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight mb-4"
          >
            Sua loja virtual pode vender muito mais —
            <span className="block min-h-[1.1em] text-primary">
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Em <strong className="text-white">30 minutos</strong>, um especialista da MAVI analisa seu e-commerce
            e mostra exatamente onde estão as maiores oportunidades de crescimento. <strong className="text-white">De graça.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToForm}
              className="relative inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl py-4 px-8 transition-colors touch-manipulation"
            >
              <Zap className="w-4 h-4" />
              Quero meu diagnóstico gratuito de 30 minutos
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/50 text-xs font-medium">+200 e-commerces já analisados pela MAVI</p>
          </div>
        </div>

        <div className="relative z-10 pb-10">
          <LogoCarousel />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORMULÁRIO
      ══════════════════════════════════════════════════════ */}
      <section id="form-diagnostico" className="bg-gray-950 border-t border-white/5 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
              Aviso
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
              Agende seu diagnóstico gratuito de 30 minutos
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
              Um especialista vai analisar seu e-commerce e te mostrar exatamente onde estão as maiores
              oportunidades de crescimento.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <p className="text-white text-sm font-semibold">Complete o formulário</p>
                  <p className="text-white/50 text-xs mt-0.5">Leva menos de 1 minuto. Seus dados ficam protegidos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <p className="text-white text-sm font-semibold">Agende seus 30 minutos de diagnóstico</p>
                  <p className="text-white/50 text-xs mt-0.5">Um especialista da MAVI chama no WhatsApp pra marcar o melhor horário.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl" style={{ borderTop: "4px solid #E6007E" }}>
            <form onSubmit={handleSubmit} className="p-6 md:p-7 space-y-3.5">
              <div>
                <Label className="text-gray-600 text-xs mb-1 block">Seu nome</Label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className={`h-11 ${errors.nome ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.nome && <p className="text-[11px] text-red-500 mt-1">{errors.nome}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-xs mb-1 block">Seu melhor e-mail</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="voce@email.com"
                  className={`h-11 ${errors.email ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-xs mb-1 block">WhatsApp</Label>
                <Input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => { setWhatsapp(formatWhatsApp(e.target.value)); setErrors((p) => ({ ...p, whatsapp: undefined })); }}
                  placeholder="(47) 99999-9999"
                  className={`h-11 ${errors.whatsapp ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.whatsapp && <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-xs mb-1 block">Nome da sua empresa</Label>
                <Input
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nome da loja"
                  className="h-11 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-gray-600 text-xs mb-1 block">Qual o segmento da sua loja?</Label>
                <Select value={segmento} onValueChange={(v) => { setSegmento(v); setErrors((p) => ({ ...p, segmento: undefined })); }}>
                  <SelectTrigger className={`h-11 ${errors.segmento ? "border-red-400" : "border-gray-200"}`}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEGMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.segmento && <p className="text-[11px] text-red-500 mt-1">{errors.segmento}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-xs mb-1 block">Quanto você fatura no mês?</Label>
                <Select value={faturamento} onValueChange={setFaturamento}>
                  <SelectTrigger className="h-11 border-gray-200">
                    <SelectValue placeholder="Selecione (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {FATURAMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                variant="hero"
                disabled={isSubmitting}
                className="w-full h-12 mt-2 touch-manipulation font-semibold"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enviando...</>
                ) : (
                  <>Quero meu diagnóstico gratuito <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
              <p className="text-center text-[11px] text-gray-400">🔒 Seus dados estão seguros e não serão compartilhados.</p>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O QUE FAZEMOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
              O que fazemos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Marketing de e-commerce com foco em vendas de verdade
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {DIFERENCIAIS.map((d) => (
              <div key={d.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <d.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{d.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          O QUE ENTREGAMOS NA PRÁTICA
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
              O que entregamos na prática
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Tudo que sua loja precisa pra vender todo dia
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ENTREGAS.map((e) => (
              <a
                key={e.label}
                href={e.href}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:border-primary/40 hover:shadow-md transition-all"
              >
                <e.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">{e.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          QUEM SOMOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            Quem somos
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            Especialistas em e-commerce, não uma agência genérica de anúncios
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto">
            Há mais de 5 anos ajudamos lojas virtuais a vender mais — de pequenas operações a marcas com
            múltiplos dígitos de faturamento mensal. Resultado não se promete, se constrói.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "+500", label: "Clientes atendidos" },
              { n: "R$50M+", label: "Em vendas geradas" },
              { n: "8.4x", label: "ROAS médio" },
              { n: "127%", label: "Crescimento médio" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.n}</p>
                <p className="text-white/50 text-xs md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESULTADOS / CASES
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
              Cases
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Resultados reais de e-commerces que passaram pelo diagnóstico
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CASES.map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Case de Sucesso</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{c.challenge}</p>
                <div className="space-y-2 pt-3 border-t border-gray-100">
                  {c.results.map((r) => (
                    <div key={r} className="flex items-start gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-gray-700">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-gray-200 rounded-xl px-5 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-gray-950 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Pronto pra descobrir onde sua loja está perdendo venda?
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-8">
            30 minutos, sem custo, sem compromisso. Só clareza sobre o que fazer agora.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl py-4 px-8 transition-colors touch-manipulation"
          >
            Agendar meu diagnóstico gratuito <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span className="text-white/40 text-xs">Sem compromisso · Resposta em horário comercial</span>
          </div>
        </div>
      </section>
    </div>
  );
}
