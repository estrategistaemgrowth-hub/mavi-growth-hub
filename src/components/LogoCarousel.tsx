import { cn } from "@/lib/utils";

// Client logos
import logoLumistore from "@/assets/clients/lumi-store.png";
import logoNuvemshop from "@/assets/clients/nuvemshop.png";
import logoTray from "@/assets/clients/tray.png";
import logoBling from "@/assets/clients/bling.png";
import logoProolhar from "@/assets/clients/pro-olhar.png";
import logoRdstation from "@/assets/clients/rd-station.png";
import logoItaivan from "@/assets/clients/itaivan.png";
import logoAstron from "@/assets/clients/astron-members.png";
import logoImunizadora from "@/assets/clients/imunizadora-jaragua.png";
import logoBolicheJaragua from "@/assets/clients/boliche-jaragua.png";
import logoSuperTreis from "@/assets/clients/super-treis.png";
import logoNordestinaMoveis from "@/assets/clients/nordestina-moveis.png";
import logoMagazineTicTac from "@/assets/clients/magazine-tic-tac.png";
import logoPullaBulla from "@/assets/clients/pulla-bulla.png";
import logoPedalaAi from "@/assets/clients/pedala-ai.png";
import logoImobiliariaPradi from "@/assets/clients/imobiliaria-pradi.png";

const clientLogos = [
  { name: "Lumi Store", logo: logoLumistore },
  { name: "Nuvemshop", logo: logoNuvemshop },
  { name: "Tray", logo: logoTray },
  { name: "Bling", logo: logoBling },
  { name: "Pro Olhar", logo: logoProolhar },
  { name: "RD Station", logo: logoRdstation },
  { name: "Itaivan", logo: logoItaivan },
  { name: "Astron Members", logo: logoAstron },
  { name: "Imunizadora Jaraguá", logo: logoImunizadora },
  { name: "Boliche Jaraguá", logo: logoBolicheJaragua },
  { name: "Super Treis", logo: logoSuperTreis },
  { name: "Nordestina Móveis", logo: logoNordestinaMoveis },
  { name: "Magazine Tic Tac", logo: logoMagazineTicTac },
  { name: "Pulla Bulla", logo: logoPullaBulla },
  { name: "Pedala Aí", logo: logoPedalaAi },
  { name: "Imobiliária Pradi", logo: logoImobiliariaPradi },
];

interface LogoCarouselProps {
  className?: string;
}

export function LogoCarousel({ className }: LogoCarouselProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-mavi-gray to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-mavi-gray to-transparent z-10" />

      {/* Scrolling container */}
      <div className="flex w-max items-center gap-10 animate-scroll will-change-transform">
        {duplicatedLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex h-16 md:h-20 min-w-[180px] md:min-w-[220px] items-center justify-center rounded-lg border border-border/60 bg-card/60 px-6 shadow-sm transition-colors duration-300 hover:bg-card hover:border-primary/30"
          >
            <img
              src={client.logo}
              alt={`Logo ${client.name}`}
              loading="lazy"
              decoding="async"
              className="h-10 md:h-14 w-auto max-w-[160px] md:max-w-[190px] object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
