import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoMaviBranca from "@/assets/logo-mavi-branca.png";
import logoMaviColorida from "@/assets/logo-mavi-colorida.png";

const services = [
  { name: "E-commerce e Lojas Virtuais", href: "/servicos/ecommerce" },
  { name: "Marketing de Performance", href: "/servicos/performance" },
  { name: "Redes Sociais e Conteúdo", href: "/servicos/redes-sociais" },
  { name: "Marketplaces & ERP", href: "/servicos/marketplaces" },
  { name: "Sites e Landing Pages", href: "/servicos/sites" },
  { name: "Automação & IA", href: "/servicos/automacao" },
  { name: "CRM HUBRS", href: "/hubrs-crm" },
];

const navItems = [
  { name: "Início", href: "/" },
  { name: "Sobre a MAVI", href: "/sobre" },
  { name: "Serviços", href: "/servicos", hasDropdown: true },
  { name: "Cases & Clientes", href: "/cases" },
  { name: "CRM HUBRS", href: "/hubrs-crm", highlight: true },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container-mavi">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isScrolled ? logoMaviColorida : logoMaviBranca} 
              alt="MAVI Marketing Digital" 
              className="h-10 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isScrolled
                          ? "text-foreground hover:text-primary"
                          : "text-mavi-white/90 hover:text-mavi-white",
                        location.pathname.startsWith("/servicos") && "text-primary"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 pt-2">
                        <div className="bg-card rounded-lg shadow-lg border border-border py-2 min-w-[240px]">
                          <Link
                            to="/servicos"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            Ver todos os serviços
                          </Link>
                          <div className="border-t border-border my-2" />
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className={cn(
                                "block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors",
                                service.name === "CRM HUBRS" && "text-primary font-medium"
                              )}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                      item.highlight
                        ? "text-primary hover:text-primary/80"
                        : isScrolled
                          ? "text-foreground hover:text-primary"
                          : "text-mavi-white/90 hover:text-mavi-white",
                      location.pathname === item.href && !item.highlight && "text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant={isScrolled ? "default" : "hero"} size="sm">
              <Link to="/contato">Diagnóstico Gratuito</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              isScrolled ? "text-foreground" : "text-mavi-white"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-muted rounded-md"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          <Link
                            to="/servicos"
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            Ver todos
                          </Link>
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className={cn(
                                "block px-4 py-2 text-sm text-muted-foreground hover:text-primary",
                                service.name === "CRM HUBRS" && "text-primary font-medium"
                              )}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-md hover:bg-muted",
                        item.highlight ? "text-primary font-medium" : "text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Button asChild className="w-full">
                  <Link to="/contato">Diagnóstico Gratuito</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
