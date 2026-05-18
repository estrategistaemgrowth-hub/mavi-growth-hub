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
  { name: "Micro SaaS", href: "/servicos/micro-saas" },
  { name: "CRM HUBRS", href: "/hubrs-crm" },
];

const segmentsList = [
  { name: "E-commerce e Varejo", href: "/servicos/ecommerce" },
  { name: "Imobiliárias e Corretoras", href: "/segmentos/imobiliarias" },
  { name: "Indústria e B2B", href: "/segmentos/industria" },
  { name: "Saúde e Estética", href: "/segmentos/saude-estetica" },
];

const navItems = [
  { name: "Início", href: "/" },
  { name: "Sobre a MAVI", href: "/sobre" },
  { name: "Serviços", href: "/servicos", hasDropdown: true, dropdownType: "services" as const },
  { name: "Segmentos", href: "/segmentos", hasDropdown: true, dropdownType: "segments" as const },
  
  { name: "Cases & Clientes", href: "/cases" },
  { name: "Micro SaaS", href: "/servicos/micro-saas", highlight: true },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  // Pages with light backgrounds need dark header text even when not scrolled
  const isLightPage = location.pathname.startsWith("/blog") || location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
  }, [location]);

  const getDropdownItems = (type: string) => {
    if (type === "services") return services;
    if (type === "segments") return segmentsList;
    return [];
  };

  const getDropdownLink = (type: string) => {
    if (type === "services") return { href: "/servicos", label: "Ver todos os serviços" };
    if (type === "segments") return { href: "/segmentos", label: "Ver todos os segmentos" };
    return { href: "/", label: "" };
  };

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-300",
        isScrolled
          ? "top-4 left-4 right-4 bg-background/80 backdrop-blur-xl shadow-2xl rounded-xl border border-border/50"
          : isLightPage
            ? "top-0 left-0 right-0 bg-background/95 backdrop-blur-md shadow-md"
            : "top-0 left-0 right-0 bg-transparent"
      )}
    >
      <div className="container-mavi">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={isScrolled || isLightPage ? logoMaviColorida : logoMaviBranca} 
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
                    onMouseEnter={() => setActiveDropdown(item.dropdownType || null)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.dropdownType}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                        isScrolled || isLightPage
                          ? "text-foreground hover:text-primary"
                          : "text-mavi-white/90 hover:text-mavi-white",
                        (item.dropdownType === "services" && location.pathname.startsWith("/servicos")) && "text-primary",
                        (item.dropdownType === "segments" && location.pathname.startsWith("/segmentos")) && "text-primary"
                      )}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.dropdownType && (
                      <div className="absolute top-full left-0 pt-2">
                        <div className="bg-card rounded-lg shadow-lg border border-border py-2 min-w-[240px]">
                          <Link
                            to={getDropdownLink(item.dropdownType || "").href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {getDropdownLink(item.dropdownType || "").label}
                          </Link>
                          <div className="border-t border-border my-2" />
                          {getDropdownItems(item.dropdownType || "").map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className={cn(
                                "block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors",
                                dropdownItem.name === "Micro SaaS" && "text-primary font-medium"
                              )}
                            >
                              {dropdownItem.name}
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
                        : isScrolled || isLightPage
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

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant={isScrolled || isLightPage ? "outline" : "heroOutline"} size="sm">
            <a href="https://crm.hubrs.com.br/pt/users/sign_in" target="_blank" rel="noopener noreferrer">
                Login do CRM
              </a>
            </Button>
            <Button asChild variant={isScrolled || isLightPage ? "default" : "hero"} size="sm">
              <Link to="/diagnostico-gratuito">Diagnóstico Gratuito</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isScrolled || isLightPage ? "text-foreground" : "text-mavi-white"
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
                        onClick={() => setMobileActiveDropdown(
                          mobileActiveDropdown === item.dropdownType ? null : (item.dropdownType || null)
                        )}
                        aria-expanded={mobileActiveDropdown === item.dropdownType}
                        aria-haspopup="true"
                        className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-muted rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform", 
                          mobileActiveDropdown === item.dropdownType && "rotate-180"
                        )} />
                      </button>
                      {mobileActiveDropdown === item.dropdownType && (
                        <div className="pl-4 space-y-1 mt-1">
                          <Link
                            to={getDropdownLink(item.dropdownType || "").href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                          >
                            {getDropdownLink(item.dropdownType || "").label}
                          </Link>
                          {getDropdownItems(item.dropdownType || "").map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className={cn(
                                "block px-4 py-2 text-sm text-muted-foreground hover:text-primary",
                                dropdownItem.name === "Micro SaaS" && "text-primary font-medium"
                              )}
                            >
                              {dropdownItem.name}
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
              <div className="pt-4 px-4 space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <a href="https://crm.hubrs.com.br/pt/users/sign_in" target="_blank" rel="noopener noreferrer">
                    Login do CRM
                  </a>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/diagnostico-gratuito">Diagnóstico Gratuito</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
