import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crosshair,
  HeartCrack,
  HelpCircle,
  RefreshCw,
  RotateCcw,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import camilaAvatar from "@/assets/camila-avatar.jpg";

// Mesmas dores do diagnóstico (src/pages/DiagnosticoGratuito.tsx), cada uma ligada à solução que resolve.
const DORES: { icon: LucideIcon; label: string; reply: string; cta: string; href: string }[] = [
  {
    icon: HelpCircle,
    label: "Invisto em anúncios mas não sei se funciona de verdade",
    reply: "Quase sempre é falta de atribuição. A gente liga campanha, CRM e venda pra você enxergar a receita de cada real investido.",
    cta: "Ver Marketing de Performance",
    href: "/servicos/performance",
  },
  {
    icon: HeartCrack,
    label: "Meu ROAS parece bom, mas o caixa não reflete",
    reply: "O ROAS da plataforma conta venda que nem sempre é sua. A gente mede no caixa: CAC, margem e LTV, toda semana.",
    cta: "Ver Marketing de Performance",
    href: "/servicos/performance",
  },
  {
    icon: RefreshCw,
    label: "Já troquei de agência e o resultado é o mesmo",
    reply: "Isso costuma acontecer quando ninguém mexe no que vem depois do clique. A gente olha loja, CRM e atendimento junto com a mídia.",
    cta: "Fazer o diagnóstico gratuito",
    href: "/diagnostico-gratuito",
  },
  {
    icon: TrendingDown,
    label: "Escalo o budget mas o ROAS despenca",
    reply: "Verba sobe, criativo e público continuam os mesmos, e o leilão satura. A gente escala por etapa, testando antes de subir o investimento.",
    cta: "Ver Marketing de Performance",
    href: "/servicos/performance",
  },
  {
    icon: Crosshair,
    label: "Não consigo atribuir os resultados corretamente",
    reply: "Pixel, WhatsApp e CRM desconectados escondem a origem da venda. O HUBRS junta lead, conversa e venda no mesmo funil.",
    cta: "Conhecer o CRM HUBRS",
    href: "/hubrs-crm",
  },
];

const bubble = "max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground animate-chat-pop";

function Typing() {
  return (
    <div className={`${bubble} flex w-fit gap-1 px-4 py-3.5`} aria-label="Camila está digitando">
      {[0, 150, 300].map((d) => (
        <span key={d} className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-chat-dot" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}

/** Card do hero: a Camila pergunta a dor e responde com a solução da MAVI. */
export function PainChat() {
  const [picked, setPicked] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (i: number) => {
    setPicked(i);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setTyping(true);
    timer.current = window.setTimeout(() => setTyping(false), 1100);
  };

  const dor = picked === null ? null : DORES[picked];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_2px_2px_hsl(325_25%_9%/0.03),0_8px_8px_-4px_hsl(325_25%_9%/0.06)]">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <img src={camilaAvatar} alt="Camila, consultora da MAVI" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-foreground">Camila · MAVI</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600 ring-[3px] ring-green-600/20" />
            online agora
          </p>
        </div>
      </div>

      <div className="grid min-h-[420px] content-start gap-3 bg-gradient-to-b from-card to-background p-4 sm:p-5" aria-live="polite">
        <div className={bubble}>Oi! Eu sou a Camila, da MAVI.</div>
        <div className={bubble}>Qual é o seu maior desafio de marketing hoje?</div>

        {dor === null ? (
          <div className="grid gap-2 animate-chat-pop">
            {DORES.map(({ icon: Icon, label }, i) => (
              <button
                key={label}
                type="button"
                onClick={() => pick(i)}
                className="flex w-full items-center gap-3 rounded-xl border border-input bg-card px-3.5 py-3 text-left text-sm font-medium text-foreground transition-[border-color,background-color,transform] duration-300 ease-out hover:translate-x-1 hover:border-primary hover:bg-primary/5"
              >
                <Icon className="h-[18px] w-[18px] shrink-0 text-primary" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="max-w-[88%] justify-self-end rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground animate-chat-pop">
              {dor.label}
            </div>
            {typing ? (
              <Typing />
            ) : (
              <>
                <div className={bubble}>
                  {dor.reply}
                  <Link to={dor.href} className="mt-2 flex items-center gap-1.5 font-semibold text-primary hover:underline">
                    {dor.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => setPicked(null)}
                  className="flex items-center gap-1.5 justify-self-start py-1 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground animate-chat-pop"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Escolher outro desafio
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
