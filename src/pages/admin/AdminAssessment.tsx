import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  LogOut,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BarChart3,
  Users,
  TrendingUp,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiagnosticoLead {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  segmento: string | null;
  faturamento: string | null;
  verba: string | null;
  canais: string | null;
  dor: string | null;
  site: string | null;
  dinheiro_na_mesa: number;
  maturidade: number;
}

interface UrlSubmission {
  id: string;
  created_at: string;
  loja_url: string;
}

interface AssessmentLead {
  id: string;
  created_at: string;
  loja_url: string | null;
  nome: string;
  email: string;
  whatsapp: string;
  avg_score: number;
  persona: string;
  scores: Record<string, number>;
  answers: Array<{ pillar: string; question: string; answer: string; score: number }>;
}

const PILLAR_LABELS: Record<string, string> = {
  produto: "Produto",
  "redes-sociais": "Social",
  marketplaces: "Marketplaces",
  seo: "SEO",
  "trafego-pago": "Tráfego",
  "investimentos-midia": "Mídia",
  "design-layout": "Design",
};

const PILLAR_ORDER = [
  "produto",
  "redes-sociais",
  "marketplaces",
  "seo",
  "trafego-pago",
  "investimentos-midia",
  "design-layout",
];

function getScoreColor(score: number) {
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" | "outline" {
  if (score >= 70) return "default";
  if (score >= 50) return "secondary";
  return "destructive";
}

function PersonaEmoji({ label }: { label: string }) {
  const map: Record<string, string> = {
    "Loja em Construção": "🏗️",
    "Loja em Crescimento": "🌱",
    "Loja em Aceleração": "🚀",
    "Loja Consolidada": "⚡",
    "Loja de Alta Performance": "🏆",
  };
  return <span>{map[label] ?? "📊"}</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminAssessment() {
  const [activeTab, setActiveTab] = useState<"assessments" | "diagnostico" | "urls">("assessments");
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [diagnosticoLeads, setDiagnosticoLeads] = useState<DiagnosticoLead[]>([]);
  const [urlSubmissions, setUrlSubmissions] = useState<UrlSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchLeads();
      fetchDiagnosticoLeads();
      fetchUrlSubmissions();
    }
  }, [isAdmin]);

  async function fetchLeads() {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("assessment_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar leads", { description: error.message });
    } else {
      setLeads((data as AssessmentLead[]) ?? []);
    }
    setLoading(false);
  }

  async function fetchDiagnosticoLeads() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("diagnostico_leads")
      .select("*")
      .order("created_at", { ascending: false });
    setDiagnosticoLeads((data as DiagnosticoLead[]) ?? []);
  }

  async function fetchUrlSubmissions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("assessment_url_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erro ao carregar URLs digitadas", { description: error.message });
    }
    setUrlSubmissions((data as UrlSubmission[]) ?? []);
  }

  async function deleteLead(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("assessment_leads")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir", { description: error.message });
    } else {
      toast.success("Lead excluído");
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.nome.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.whatsapp.includes(q) ||
      (l.loja_url ?? "").toLowerCase().includes(q) ||
      l.persona.toLowerCase().includes(q)
    );
  });

  const avgOverall =
    leads.length > 0
      ? Math.round(leads.reduce((a, b) => a + b.avg_score, 0) / leads.length)
      : 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <BarChart3 className="w-8 h-8 text-primary animate-pulse mx-auto" />
          <p className="text-muted-foreground text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              ← Dashboard
            </Link>
            <span className="text-border">|</span>
            <Link to="/admin/blog" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Blog
            </Link>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("assessments")}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === "assessments" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                Assessments
              </button>
              <button
                onClick={() => setActiveTab("diagnostico")}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === "diagnostico" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                Diagnóstico Gratuito
              </button>
              <button
                onClick={() => setActiveTab("urls")}
                className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === "urls" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                URLs digitadas
              </button>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* KPIs */}
        {activeTab === "assessments" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total de Leads</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{leads.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Score Médio</span>
              </div>
              <p className={`text-3xl font-bold ${getScoreColor(avgOverall)}`}>{avgOverall}<span className="text-lg text-muted-foreground">/100</span></p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Score &lt; 50</span>
              </div>
              <p className="text-3xl font-bold text-red-500">
                {leads.filter((l) => l.avg_score < 50).length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Score ≥ 70</span>
              </div>
              <p className="text-3xl font-bold text-green-500">
                {leads.filter((l) => l.avg_score >= 70).length}
              </p>
            </div>
          </div>
        ) : activeTab === "urls" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total de URLs digitadas</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{urlSubmissions.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Concluíram o assessment</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{leads.length}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Total de Leads</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{diagnosticoLeads.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Maturidade Média</span>
              </div>
              <p className={`text-3xl font-bold ${getScoreColor(diagnosticoLeads.length > 0 ? Math.round(diagnosticoLeads.reduce((a,b) => a + b.maturidade, 0) / diagnosticoLeads.length) : 0)}`}>
                {diagnosticoLeads.length > 0 ? Math.round(diagnosticoLeads.reduce((a,b) => a + b.maturidade, 0) / diagnosticoLeads.length) : 0}
                <span className="text-lg text-muted-foreground">/100</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Maturidade &lt; 50</span>
              </div>
              <p className="text-3xl font-bold text-red-500">
                {diagnosticoLeads.filter((l) => l.maturidade < 50).length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Receita na Mesa</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                R$ {diagnosticoLeads.reduce((a,b) => a + (b.dinheiro_na_mesa || 0), 0).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        )}

        {/* Search + refresh */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, e-mail, URL..."
              className="w-full pl-9 pr-4 h-9 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => { fetchLeads(); fetchDiagnosticoLeads(); fetchUrlSubmissions(); }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Tab: Assessments */}
        {activeTab === "assessments" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredLeads.map((lead) => {
                const isExpanded = expandedId === lead.id;
                const radarData = PILLAR_ORDER.map((key) => ({
                  subject: PILLAR_LABELS[key] ?? key,
                  value: lead.scores[key] ?? 0,
                  fullMark: 100,
                }));

                return (
                  <div key={lead.id}>
                    {/* Row */}
                    <div className="px-4 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Score */}
                        <div className="text-center w-14 flex-shrink-0">
                          <div className={`text-2xl font-extrabold ${getScoreColor(lead.avg_score)}`}>
                            {lead.avg_score}
                          </div>
                          <div className="text-[10px] text-muted-foreground">/100</div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-foreground">{lead.nome}</span>
                            <PersonaEmoji label={lead.persona} />
                            <Badge variant={getScoreBadgeVariant(lead.avg_score)} className="text-[10px] px-1.5 py-0">
                              {lead.persona}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                            <span>{lead.email}</span>
                            <span>·</span>
                            <span>{lead.whatsapp}</span>
                            {lead.loja_url && (
                              <>
                                <span>·</span>
                                <a
                                  href={lead.loja_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-0.5 hover:text-primary transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {lead.loja_url.replace(/^https?:\/\//, "")}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </>
                            )}
                          </div>
                          {/* Mini pillar bars */}
                          <div className="flex items-center gap-1 mt-2">
                            {PILLAR_ORDER.map((key) => {
                              const s = lead.scores[key] ?? 0;
                              const bg = s >= 70 ? "#4ade80" : s >= 50 ? "#facc15" : "#f87171";
                              return (
                                <div
                                  key={key}
                                  title={`${PILLAR_LABELS[key]}: ${s}`}
                                  className="w-6 h-1.5 rounded-full bg-muted overflow-hidden"
                                >
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${s}%`, background: bg }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Date + actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground hidden md:block">
                            {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLead(lead.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="bg-muted/20 border-t border-border px-4 py-5">
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                          {/* Radar chart */}
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                              Radar por dimensão
                            </p>
                            <div className="h-52">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart
                                  data={radarData}
                                  margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
                                >
                                  <PolarGrid stroke="rgba(0,0,0,0.1)" />
                                  <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                                  />
                                  <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    fill="hsl(var(--primary))"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                  />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>

                            {/* Score bars */}
                            <div className="space-y-2 mt-2">
                              {PILLAR_ORDER.map((key) => {
                                const s = lead.scores[key] ?? 0;
                                const color =
                                  s >= 70 ? "#4ade80" : s >= 50 ? "#facc15" : "#f87171";
                                return (
                                  <div key={key} className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground w-24 flex-shrink-0">
                                      {PILLAR_LABELS[key]}
                                    </span>
                                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{ width: `${s}%`, background: color }}
                                      />
                                    </div>
                                    <span
                                      className="text-xs font-bold w-6 text-right"
                                      style={{ color }}
                                    >
                                      {s}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Answers */}
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                              Respostas ({lead.answers.length} perguntas)
                            </p>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                              {lead.answers.map((ans, i) => (
                                <div
                                  key={i}
                                  className="bg-card border border-border rounded-lg px-3 py-2.5"
                                >
                                  <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-0.5">
                                    {ans.pillar}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-1 leading-relaxed">
                                    {ans.question}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-foreground flex-1">
                                      {ans.answer}
                                    </span>
                                    <span
                                      className={`text-xs font-bold ${getScoreColor(ans.score)}`}
                                    >
                                      {ans.score}pts
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp quick action */}
                        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                          <a
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}?text=Oi+${encodeURIComponent(lead.nome)}%2C+aqui+%C3%A9+da+MAVI+Marketing+Digital%21+Vi+que+voc%C3%AA+fez+nosso+assessment+de+e-commerce+e+queria+conversar+sobre+os+pr%C3%B3ximos+passos+para+escalar+sua+loja.+Tem+um+momento%3F`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600/30 hover:bg-green-500/10">
                              WhatsApp {lead.nome.split(" ")[0]}
                            </Button>
                          </a>
                          <a href={`mailto:${lead.email}`}>
                            <Button size="sm" variant="outline">
                              Enviar e-mail
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        )} {/* end activeTab === "assessments" */}

        {/* Tab: Diagnóstico Gratuito */}
        {activeTab === "diagnostico" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">
                {diagnosticoLeads.length} lead{diagnosticoLeads.length !== 1 ? "s" : ""} — Diagnóstico Gratuito
              </h2>
            </div>
            {diagnosticoLeads.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhum lead do Diagnóstico Gratuito ainda</p>
                <p className="text-xs mt-1 opacity-60">Os leads aparecerão aqui após preencherem o formulário em /diagnostico-gratuito</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {diagnosticoLeads.map((lead) => (
                  <div key={lead.id} className="px-4 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Score */}
                      <div className="text-center w-14 flex-shrink-0">
                        <div className={`text-2xl font-extrabold ${getScoreColor(lead.maturidade)}`}>
                          {lead.maturidade}
                        </div>
                        <div className="text-[10px] text-muted-foreground">/100</div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-semibold text-sm text-foreground">{lead.nome}</span>
                          {lead.segmento && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{lead.segmento}</Badge>
                          )}
                          {lead.dinheiro_na_mesa > 0 && (
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              R$ {lead.dinheiro_na_mesa.toLocaleString("pt-BR")}/mês na mesa
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                          <span>{lead.whatsapp}</span>
                          {lead.faturamento && <><span>·</span><span>Fat: {lead.faturamento}</span></>}
                          {lead.verba && <><span>·</span><span>Verba: {lead.verba}</span></>}
                          {lead.site && <><span>·</span><a href={lead.site} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-0.5">{lead.site.replace(/^https?:\/\//, "")}<ExternalLink className="w-3 h-3" /></a></>}
                        </div>
                        {lead.canais && (
                          <p className="text-[10px] text-muted-foreground mt-1">Canais: {lead.canais}</p>
                        )}
                        {lead.dor && (
                          <p className="text-[10px] text-muted-foreground italic mt-0.5">Dor: {lead.dor}</p>
                        )}
                      </div>

                      {/* Date + WhatsApp */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground hidden md:block">
                          {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit", month: "2-digit", year: "2-digit",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                        <a
                          href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}?text=Oi+${encodeURIComponent(lead.nome)}%2C+aqui+%C3%A9+da+MAVI+Marketing+Digital%21+Vi+que+voc%C3%AA+fez+nosso+diagn%C3%B3stico+gratuito+e+queria+conversar+sobre+os+pr%C3%B3ximos+passos.+Tem+um+momento%3F`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline" className="text-green-600 border-green-600/30 hover:bg-green-500/10 text-xs">
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: URLs digitadas */}
        {activeTab === "urls" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">
                {urlSubmissions.length} URL{urlSubmissions.length !== 1 ? "s" : ""} digitada{urlSubmissions.length !== 1 ? "s" : ""}
              </h2>
            </div>
            {urlSubmissions.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma URL registrada ainda</p>
                <p className="text-xs mt-1 opacity-60">Toda URL digitada no início do Assessment aparece aqui, mesmo que a pessoa não conclua.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {urlSubmissions.map((u) => {
                  const converteu = leads.some((l) => l.loja_url === u.loja_url);
                  return (
                    <div key={u.id} className="px-4 py-3 hover:bg-muted/30 transition-colors flex items-center gap-3">
                      <a
                        href={u.loja_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors truncate"
                      >
                        {u.loja_url.replace(/^https?:\/\//, "")}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                      {converteu && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0 flex-shrink-0">
                          Concluiu
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(u.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit", month: "2-digit", year: "2-digit",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
