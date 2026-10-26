import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail, Phone, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BlockHead, FaqBlock, ProblemPicker } from "@/components/service/ServiceBlocks";

/* Corpo das páginas de segmento (Imobiliárias, Indústria, Saúde e Estética), que têm a mesma estrutura.
   Cada página passa o próprio conteúdo; textos e níveis de heading são os mesmos da versão anterior. */

type Item = { icon: LucideIcon; title: string; description: string };

export interface SegmentContent {
  badge: string;
  title: ReactNode;
  lead: string;
  resultsIcon: LucideIcon;
  resultsTitle: string;
  results: { icon: LucideIcon; value: string; label: string }[];
  problemsTitle: string;
  problemsSubtitle: string;
  problems: Item[];
  solutionsTitle: string;
  solutions: Item[];
  useCases?: Item[];
  benefitsTitle: string;
  benefits: string[];
  crmTitle: string;
  crmText: string;
  processSubtitle: string;
  process: { step: string; title: string; description: string }[];
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
}

export function SegmentBody(c: SegmentContent) {
  return (
    <>
      {/* Hero: promessa à esquerda, resultados do segmento à direita */}
      <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:gap-20">
          <AnimatedSection animation="fadeInUp">
            <span className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground">
              {c.badge}
            </span>
            <h1 className="mb-5 mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4rem]">
              {c.title}
            </h1>
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">{c.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/contato">
                  Solicitar proposta
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <WhatsAppLink className="inline-flex h-14 items-center justify-center rounded-full border border-input bg-card px-8 text-base font-semibold text-foreground transition-colors hover:border-foreground">
                Falar no WhatsApp
              </WhatsAppLink>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={200} className="hidden lg:block">
            <div className="rounded-2xl border border-border bg-card px-7 py-6 shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)]">
              <span className="flex items-center gap-3 border-b border-border pb-5 text-lg font-bold text-foreground">
                <c.resultsIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                {c.resultsTitle}
              </span>
              {c.results.map((r) => (
                <div key={r.value} className="flex items-center gap-4 border-b border-dashed border-input py-5 last:border-0 last:pb-0">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <r.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-2xl font-extrabold tracking-tight text-foreground">{r.value}</span>
                    <span className="block text-sm text-muted-foreground">{r.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ProblemPicker title={c.problemsTitle} subtitle={c.problemsSubtitle} problems={c.problems} />

      {/* Soluções: título fixo à esquerda, lista à direita */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-mavi grid items-start gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <BlockHead title={c.solutionsTitle} subtitle="O que fazemos para resolver cada um desses problemas" />
          </div>
          <div className="border-t-2 border-foreground">
            {c.solutions.map((s) => (
              <AnimatedSection key={s.title}>
                <div className="group flex gap-5 border-b border-border py-6">
                  <s.icon className="mt-1 h-7 w-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é (só Indústria) */}
      {c.useCases && (
        <section className="border-y border-border bg-card py-20 md:py-28">
          <div className="container-mavi">
            <BlockHead title="Para quem é" subtitle="Tipos de indústrias e empresas B2B que atendemos" />
            <div className="grid md:grid-cols-3 md:divide-x md:divide-border">
              {c.useCases.map((u) => (
                <AnimatedSection key={u.title} className="border-t border-border py-7 md:border-t-0 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
                  <u.icon className="mb-5 h-10 w-10 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{u.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{u.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefícios + CRM HUBRS */}
      <section className={c.useCases ? "bg-background py-20 md:py-28" : "border-y border-border bg-card py-20 md:py-28"}>
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
          <AnimatedSection animation="fadeInUp">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">Benefícios</span>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">{c.benefitsTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">O que muda na prática quando trabalhamos juntos.</p>
            <ul className="mt-7 grid gap-3">
              {c.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 font-medium text-foreground">
                  <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={100}>
            <div className="rounded-2xl bg-primary p-8 text-white md:p-12">
              <h3 className="text-3xl font-extrabold tracking-tight">{c.crmTitle}</h3>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-white/90">{c.crmText}</p>
              <Button asChild size="xl" className="group mt-8 h-auto min-h-14 whitespace-normal rounded-full bg-white py-3 text-center text-primary hover:bg-foreground hover:text-white">
                <Link to="/hubrs-crm">
                  Conhecer o HUBRS CRM
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Como trabalhamos: sequência real, por isso numerada */}
      <section className={c.useCases ? "border-y border-border bg-card py-20 md:py-28" : "bg-background py-20 md:py-28"}>
        <div className="container-mavi">
          <BlockHead title="Como trabalhamos" subtitle={c.processSubtitle} />
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {c.process.map((s, i) => (
              <li key={s.step} className="relative lg:pr-8">
                <AnimatedSection>
                  <div className="mb-5 flex items-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-base font-extrabold text-white tabular-nums">{s.step}</span>
                    {i < c.process.length - 1 && <span className="ml-3 hidden h-px flex-1 bg-input lg:block" aria-hidden="true" />}
                  </div>
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{s.description}</p>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqBlock title="Perguntas Frequentes" subtitle={c.faqSubtitle} faqs={c.faqs} />

      {/* CTA + contato direto */}
      <section className="border-t border-primary/15 bg-primary/5 py-20 md:py-28">
        <div className="container-mavi grid items-center gap-12 lg:grid-cols-[1.2fr,0.8fr]">
          <AnimatedSection>
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-5xl">{c.ctaTitle}</h2>
            <p className="mb-8 mt-5 max-w-[52ch] text-lg text-muted-foreground">{c.ctaText}</p>
            <Button asChild variant="hero" size="xl" className="group">
              <Link to="/contato">
                Agendar consultoria gratuita
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="mb-5 text-xl font-bold text-foreground">Fale conosco agora</h3>
              <div className="grid gap-1">
                <WhatsAppLink className="flex items-center gap-3 rounded-lg py-2 text-left font-medium text-foreground transition-colors hover:text-primary">
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  (47) 99681-0630
                </WhatsAppLink>
                <a href="mailto:agenciamavi@agenciamavi.com.br" className="flex items-center gap-3 break-all rounded-lg py-2 font-medium text-foreground transition-colors hover:text-primary">
                  <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  agenciamavi@agenciamavi.com.br
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
