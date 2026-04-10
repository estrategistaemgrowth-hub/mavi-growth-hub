import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navigate } from "react-router-dom";
import { ScrollProgress } from "@/components/ScrollProgress";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Cases from "./pages/Cases";
import HubRSCRM from "./pages/HubRSCRM";
import Contato from "./pages/Contato";
import ServicoEcommerce from "./pages/servicos/Ecommerce";
import ServicoPerformance from "./pages/servicos/Performance";
import ServicoRedesSociais from "./pages/servicos/RedesSociais";
import ServicoMarketplaces from "./pages/servicos/Marketplaces";
import ServicoSites from "./pages/servicos/Sites";
import ServicoAutomacao from "./pages/servicos/Automacao";
import ServicoMicroSaas from "./pages/servicos/MicroSaas";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import Segmentos from "./pages/Segmentos";
import SegmentoImobiliarias from "./pages/segmentos/Imobiliarias";
import SegmentoIndustria from "./pages/segmentos/Industria";
import SegmentoSaudeEstetica from "./pages/segmentos/SaudeEstetica";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/ecommerce" element={<ServicoEcommerce />} />
          <Route
            path="/servicos/performance"
            element={<ServicoPerformance />}
          />
          <Route
            path="/servicos/redes-sociais"
            element={<ServicoRedesSociais />}
          />
          <Route
            path="/servicos/marketplaces"
            element={<ServicoMarketplaces />}
          />
          <Route path="/servicos/sites" element={<ServicoSites />} />
          <Route path="/servicos/automacao" element={<ServicoAutomacao />} />
          <Route path="/servicos/micro-saas" element={<ServicoMicroSaas />} />
          <Route path="/segmentos" element={<Segmentos />} />
          <Route path="/segmentos/imobiliarias" element={<SegmentoImobiliarias />} />
          <Route path="/segmentos/industria" element={<SegmentoIndustria />} />
          <Route path="/segmentos/saude-estetica" element={<SegmentoSaudeEstetica />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/novo" element={<AdminBlogEditor />} />
          <Route path="/admin/blog/editar/:id" element={<AdminBlogEditor />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/hubrs-crm" element={<HubRSCRM />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos" element={<TermosUso />} />
          <Route path="/diagnostico" element={<Navigate to="/contato" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
