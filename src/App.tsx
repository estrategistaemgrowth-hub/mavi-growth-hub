import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
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
          <Route path="/cases" element={<Cases />} />
          <Route path="/hubrs-crm" element={<HubRSCRM />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos" element={<TermosUso />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
