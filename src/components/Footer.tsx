import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logoMavi from "@/assets/logo-mavi-branca.png";

const quickLinks = [
  { name: "Início", href: "/" },
  { name: "Sobre a MAVI", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Cases & Clientes", href: "/cases" },
  { name: "CRM HUBRS", href: "/hubrs-crm" },
  { name: "Contato", href: "/contato" },
];

const services = [
  { name: "E-commerce e Lojas Virtuais", href: "/servicos/ecommerce" },
  { name: "Marketing de Performance", href: "/servicos/performance" },
  { name: "Redes Sociais e Conteúdo", href: "/servicos/redes-sociais" },
  { name: "Marketplaces & ERP", href: "/servicos/marketplaces" },
  { name: "CRM HUBRS", href: "/hubrs-crm" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-mavi-black text-mavi-white">
      <div className="container-mavi py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src={logoMavi} 
                alt="MAVI Marketing Digital" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-mavi-white/70 leading-relaxed">
              Agência especializada em marketing de performance, e-commerce e automação. 
              Transformamos dados em crescimento real para o seu negócio.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/agenciamavi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mavi-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/agenciamavi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mavi-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/agenciamavi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-mavi-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-mavi-white/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    onClick={scrollToTop}
                    className="text-mavi-white/70 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+554733072030"
                    className="text-mavi-white/70 hover:text-primary transition-colors"
                  >
                    (47) 3307-2030
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:agenciamavi@agenciamavi.com.br"
                  className="text-mavi-white/70 hover:text-primary transition-colors break-all"
                >
                  agenciamavi@agenciamavi.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-mavi-white/70">
                  Jaraguá do Sul – SC
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-mavi-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mavi-white/50 text-sm">
            © {new Date().getFullYear()} MAVI Marketing Digital. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacidade" className="text-mavi-white/50 hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-mavi-white/50 hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
