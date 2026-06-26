import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  FileText,
  Users,
  Eye,
  LogOut,
  TrendingUp,
  ArrowRight,
  Globe,
  ClipboardList,
} from "lucide-react";
import logoMavi from "@/assets/logo-mavi-colorida.png";

interface PageViewRow {
  created_at: string;
  path: string;
}

interface AssessmentLead {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  avg_score: number;
  persona: string;
}

interface BlogPost {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [pageViews, setPageViews] = useState<PageViewRow[]>([]);
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([fetchViews(), fetchLeads(), fetchPosts()]).finally(() =>
      setLoading(false)
    );
  }, [isAdmin]);

  async function fetchViews() {
    const since = daysAgo(30);
    const { data } = await (supabase as any)
      .from("page_views")
      .select("created_at, path")
      .gte("created_at", since)
      .order("created_at", { ascending: true });
    if (data) setPageViews(data);
  }

  async function fetchLeads() {
    const { data } = await (supabase as any)
      .from("assessment_leads")
      .select("id, created_at, nome, email, avg_score, persona")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setLeads(data);
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setPosts(data as BlogPost[]);
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
    toast.success("Sessão encerrada");
  }

  // ── Derived stats ─────────────────────────────────────────────────────────────
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const viewsToday = pageViews.filter((v) => new Date(v.created_at) >= todayStart).length;
  const views7d = pageViews.filter((v) => new Date(v.created_at) >= sevenDaysAgo).length;
  const views30d = pageViews.length;

  // Top pages
  const pageCounts: Record<string, number> = {};
  pageViews.forEach((v) => {
    pageCounts[v.path] = (pageCounts[v.path] ?? 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Chart: last 14 days
  const chartData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    d.setHours(0, 0, 0, 0);
    const nextD = new Date(d);
    nextD.setDate(nextD.getDate() + 1);
    return {
      label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      visitas: pageViews.filter(
        (v) => new Date(v.created_at) >= d && new Date(v.created_at) < nextD
      ).length,
    };
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Nav */}
      <div className="bg-gray-900 border-b border-white/10 px-6 py-3 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={logoMavi} alt="MAVI" className="h-6" />
            <nav className="hidden sm:flex items-center gap-1">
              <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary">
                Dashboard
              </span>
              <Link
                to="/admin/blog"
                className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/admin/assessment"
                className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Assessment
              </Link>
            </nav>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-white/50 hover:text-white gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div>
          <h1 className="text-lg font-semibold text-white/80 mb-4">Visão Geral</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-xs text-white/50 uppercase tracking-wider">Hoje</span>
              </div>
              <p className="text-3xl font-bold">{viewsToday}</p>
              <p className="text-xs text-white/40 mt-1">visitas</p>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-white/50 uppercase tracking-wider">7 dias</span>
              </div>
              <p className="text-3xl font-bold">{views7d}</p>
              <p className="text-xs text-white/40 mt-1">visitas</p>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-white/50 uppercase tracking-wider">30 dias</span>
              </div>
              <p className="text-3xl font-bold">{views30d}</p>
              <p className="text-xs text-white/40 mt-1">visitas</p>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white/50 uppercase tracking-wider">Leads</span>
              </div>
              <p className="text-3xl font-bold">{leads.length > 0 ? leads.length + "+" : "—"}</p>
              <p className="text-xs text-white/40 mt-1">assessment</p>
            </div>
          </div>
        </div>

        {/* Chart + Top Pages */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Line chart */}
          <div className="lg:col-span-2 bg-gray-900 border border-white/10 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-white/40 mb-4">
              Visitas — últimos 14 dias
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#fff",
                      fontSize: 12,
                    }}
                    cursor={{ stroke: "rgba(255,255,255,0.1)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitas"
                    stroke="#E6007E"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#E6007E" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-wider text-white/40">Páginas mais vistas</p>
              <Globe className="w-3.5 h-3.5 text-white/20" />
            </div>
            {topPages.length === 0 ? (
              <p className="text-xs text-white/30 italic">Nenhuma visita registrada ainda</p>
            ) : (
              <div className="space-y-2.5">
                {topPages.map(([path, count], i) => {
                  const maxCount = topPages[0]?.[1] ?? 1;
                  return (
                    <div key={path} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/65 truncate max-w-[160px]">
                          {path === "/" ? "Home" : path}
                        </span>
                        <span className="text-xs font-semibold text-white/50 ml-2">{count}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / maxCount) * 100}%`,
                            background: i === 0 ? "#E6007E" : "rgba(255,255,255,0.2)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Recent Leads + Recent Posts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Leads Recentes — Assessment</p>
              </div>
              <Link
                to="/admin/assessment"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {leads.length === 0 ? (
              <p className="text-xs text-white/30 italic">Nenhum lead ainda</p>
            ) : (
              <div className="space-y-2.5">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{lead.nome}</p>
                      <p className="text-xs text-white/40 truncate">{lead.email}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            lead.avg_score >= 70
                              ? "#4ade80"
                              : lead.avg_score >= 50
                              ? "#facc15"
                              : "#f87171",
                        }}
                      >
                        {lead.avg_score}
                      </span>
                      <span className="text-xs text-white/30">
                        {formatDate(lead.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Blog Posts */}
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-medium">Posts Recentes — Blog</p>
              </div>
              <Link
                to="/admin/blog"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Gerenciar <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {posts.length === 0 ? (
              <p className="text-xs text-white/30 italic">Nenhum post ainda</p>
            ) : (
              <div className="space-y-2.5">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <p className="text-sm truncate max-w-[240px] text-white/80">{post.title}</p>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          post.status === "published"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {post.status === "published" ? "publicado" : "rascunho"}
                      </span>
                      <span className="text-xs text-white/30">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/admin/blog">
            <div className="bg-gray-900 border border-white/10 hover:border-primary/30 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm group-hover:text-white transition-colors">
                  Gerenciar Blog
                </p>
                <p className="text-xs text-white/40">
                  {posts.filter((p) => p.status === "published").length} posts publicados
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary ml-auto transition-colors" />
            </div>
          </Link>

          <Link to="/admin/assessment">
            <div className="bg-gray-900 border border-white/10 hover:border-primary/30 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm group-hover:text-white transition-colors">
                  Leads do Assessment
                </p>
                <p className="text-xs text-white/40">Ver diagnósticos e contatos</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary ml-auto transition-colors" />
            </div>
          </Link>
        </div>

        <p className="text-center text-xs text-white/20 pb-4">
          Dados de visitas registrados a partir da ativação do tracking
        </p>
      </div>
    </div>
  );
}
