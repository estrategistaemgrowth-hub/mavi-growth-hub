import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

/* Blocos compartilhados das páginas de serviço e segmento (redesign claro).
   Recebem o mesmo conteúdo que as páginas já tinham: títulos, textos e headings não mudam. */

type CTA = { label: string; href: string };
type Stat = { value: ReactNode; label: string };

const sectionTitle = "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.06] text-balance";
const sectionSub = "mt-4 max-w-[58ch] text-lg leading-relaxed text-muted-foreground";

export function BlockHead({ title, subtitle, center = false, as: Tag = "h2" }: { title: ReactNode; subtitle?: ReactNode; center?: boolean; as?: "h2" | "h3" }) {
  return (
    <AnimatedSection className={cn("mb-12", center && "text-center")}>
      <Tag className={sectionTitle}>{title}</Tag>
      {subtitle && <p className={cn(sectionSub, center && "mx-auto")}>{subtitle}</p>}
    </AnimatedSection>
  );
}

/** Hero: promessa à esquerda, números do serviço num painel à direita. */
export function ServiceHero({
  icon: Icon,
  badge,
  title,
  lead,
  primary,
  secondary,
  stats,
}: {
  icon: LucideIcon;
  badge: string;
  title: ReactNode;
  lead: ReactNode;
  primary: CTA;
  secondary?: CTA;
  stats?: Stat[];
}) {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-32 md:pb-24 md:pt-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{ background: "linear-gradient(180deg, hsl(336 100% 45% / 0.035), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-mavi relative grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:gap-20">
        <AnimatedSection animation="fadeInUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2.5 pr-3.5 text-[13px] font-semibold text-muted-foreground">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {badge}
          </span>
          <h1 className="mb-5 mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground text-balance sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          <p className="max-w-[54ch] text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="group">
              <Link to={primary.href}>
                {primary.label}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            {secondary && (
              <Button asChild variant="outline" size="xl" className="rounded-full">
                <Link to={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </AnimatedSection>

        {stats && stats.length > 0 && (
          <AnimatedSection animation="fadeInUp" delay={200}>
            <dl className="rounded-2xl border border-border bg-card px-7 py-2 shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)]">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center justify-between gap-4 border-b border-dashed border-input py-5 last:border-0">
                  <dt className="font-medium text-muted-foreground">{s.label}</dt>
                  <dd className={cn("text-3xl font-extrabold tabular-nums tracking-tight md:text-4xl", i === 0 ? "text-primary" : "text-foreground")}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

/** "Reconhece algum desses problemas?": o visitante marca o que vive e a frase responde. */
export function ProblemPicker({
  title,
  subtitle,
  problems,
}: {
  title: string;
  subtitle?: string;
  problems: { icon: LucideIcon; title: string; description: string }[];
}) {
  const [on, setOn] = useState<number[]>([]);
  const toggle = (i: number) => setOn((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  const n = on.length;

  return (
    <section className="border-y border-border bg-card py-20 md:py-28">
      <div className="container-mavi">
        <BlockHead title={title} subtitle={subtitle} />
        <div className="grid gap-3 sm:grid-cols-2">
          {problems.map((p, i) => {
            const pressed = on.includes(i);
            return (
              // div com role=button: <h3> dentro de <button> é HTML inválido
              <div
                key={p.title}
                role="button"
                tabIndex={0}
                aria-pressed={pressed}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                className={cn(
                  "cursor-pointer",
                  "group flex items-start gap-4 rounded-2xl border p-5 text-left transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 md:p-6",
                  pressed ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                    pressed ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                  )}
                >
                  {pressed ? <Check className="h-5 w-5" strokeWidth={2.6} aria-hidden="true" /> : <p.icon className="h-5 w-5" aria-hidden="true" />}
                </span>
                <span>
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex min-h-12 flex-wrap items-center gap-x-5 gap-y-3" aria-live="polite">
          <p className="font-semibold text-foreground">
            {n === 0
              ? "Toque nos que acontecem com você."
              : `${n} de ${problems.length}. Isso tem conserto, e a primeira conversa é gratuita.`}
          </p>
          {n > 0 && (
            <Link to="/contato" className="inline-flex items-center gap-1.5 font-semibold text-primary animate-chat-pop hover:underline">
              Falar com a MAVI
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** O que entregamos (checklist) + benefícios (linhas com ícone). */
export function DeliverablesBenefits({
  title,
  subtitle,
  features,
  cta,
  benefitsTitle,
  benefits,
}: {
  title: string;
  subtitle?: string;
  features: string[];
  cta?: CTA;
  benefitsTitle: string;
  benefits: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-mavi grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <BlockHead title={title} subtitle={subtitle} />
          <ul className="mb-8 grid gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 font-medium text-foreground">
                <span className="mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          {cta && (
            <Button asChild variant="hero" size="lg" className="group">
              <Link to={cta.href}>
                {cta.label}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
        <AnimatedSection animation="fadeInUp" delay={100}>
          <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">{benefitsTitle}</h3>
          <div className="border-t-2 border-foreground">
            {benefits.map((b) => (
              <div key={b.title} className="group flex gap-4 border-b border-border py-5">
                <b.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-foreground">{b.title}</h4>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** FAQ em <details>: as respostas ficam no HTML mesmo fechadas (SEO). */
export function FaqBlock({ title, subtitle, faqs }: { title: string; subtitle?: string; faqs: { question: string; answer: string }[] }) {
  return (
    <section className="border-y border-border bg-card py-20 md:py-28">
      <div className="container-mavi">
        <BlockHead title={title} subtitle={subtitle} center />
        <div className="mx-auto max-w-[860px] border-t border-input">
          {faqs.map((faq, i) => (
            <details key={faq.question} open={i === 0} className="group border-b border-input">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{faq.question}</h3>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-input transition-all duration-300 ease-out group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-white">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-6 pr-12 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Chamada para o Assessment, com prévia do chat e do resultado. */
export function AssessmentPromo({ title, text, bullets, note }: { title: string; text: string; bullets: string[]; note?: string }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-mavi grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection animation="fadeInUp">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
            Diagnóstico gratuito
          </span>
          <h2 className={sectionTitle}>{title}</h2>
          <p className={sectionSub}>{text}</p>
          <ul className="mb-8 mt-7 grid gap-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium text-foreground">
                <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" size="xl" className="group">
            <Link to="/assessment">
              Fazer diagnóstico gratuito
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          {note && <p className="mt-3 text-[13px] text-muted-foreground">{note}</p>}
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={100} className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_8px_-6px_hsl(325_25%_9%/0.08)]">
            <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5 text-[13px] font-semibold text-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">M</span>
              Diagnóstico MAVI
              <span className="ml-auto text-xs font-medium text-muted-foreground">Assessment E-commerce</span>
              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white">Grátis</span>
            </div>
            <div className="grid gap-2.5 bg-background p-4">
              <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">Olá! Vou analisar seu e-commerce em 7 áreas estratégicas. Pronto?</div>
              <div className="max-w-[75%] justify-self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-white">Vamos lá!</div>
              <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">Como estão as fotos dos seus produtos nas páginas da loja?</div>
            </div>
            <div className="grid gap-3 p-4">
              <p className="text-xs font-medium text-muted-foreground">Preview do resultado</p>
              {[
                { label: "Produto & Catálogo", pct: 78, color: "#15803d" },
                { label: "SEO Orgânico", pct: 35, color: "#dc2626" },
                { label: "Tráfego Pago", pct: 55, color: "#b45309" },
              ].map((bar) => (
                <div key={bar.label} className="grid grid-cols-[128px,1fr,28px] items-center gap-3 text-[13px] text-muted-foreground">
                  {bar.label}
                  <span className="h-2 overflow-hidden rounded-full bg-border">
                    <span className="block h-full rounded-full" style={{ width: `${bar.pct}%`, background: bar.color }} />
                  </span>
                  <b className="text-right tabular-nums" style={{ color: bar.color }}>{bar.pct}</b>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** CTA final em faixa magenta clara. */
export function FinalCta({ title, text, primary, secondary }: { title: ReactNode; text: string; primary: CTA; secondary?: CTA }) {
  return (
    <section className="border-t border-primary/15 bg-primary/5 py-20 text-center md:py-28">
      <AnimatedSection className="container-mavi">
        <h2 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground text-balance md:text-5xl">{title}</h2>
        <p className="mx-auto mb-9 mt-5 max-w-[56ch] text-lg text-muted-foreground">{text}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl" className="group">
            <Link to={primary.href}>
              {primary.label}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          {secondary && (
            <Button asChild variant="outline" size="xl" className="rounded-full">
              <Link to={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
