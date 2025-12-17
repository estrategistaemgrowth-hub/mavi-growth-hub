import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-mavi-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-mavi-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Search className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-4xl font-bold text-mavi-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-mavi-white/70 text-lg mb-8 max-w-md mx-auto">
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </Button>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/contato">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fale conosco
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-mavi-white/10">
          <p className="text-mavi-white/50 text-sm mb-4">Links úteis:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/servicos" className="text-primary hover:text-primary/80 transition-colors text-sm">
              Serviços
            </Link>
            <Link to="/hubrs-crm" className="text-primary hover:text-primary/80 transition-colors text-sm">
              CRM HUBRS
            </Link>
            <Link to="/cases" className="text-primary hover:text-primary/80 transition-colors text-sm">
              Cases
            </Link>
            <Link to="/sobre" className="text-primary hover:text-primary/80 transition-colors text-sm">
              Sobre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
