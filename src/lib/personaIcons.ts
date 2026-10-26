import { BarChart3, Construction, Rocket, Sprout, Trophy, Zap, type LucideIcon } from "lucide-react";

export const PERSONA_ICONS: Record<string, LucideIcon> = {
  "Loja em Construção": Construction,
  "Loja em Crescimento": Sprout,
  "Loja em Aceleração": Rocket,
  "Loja Consolidada": Zap,
  "Loja de Alta Performance": Trophy,
};

export const personaIcon = (label: string): LucideIcon => PERSONA_ICONS[label] ?? BarChart3;
