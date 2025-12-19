import { cn } from "@/lib/utils";

// Client logos - First row (8 logos)
import logoLumistore from "@/assets/clients/lumi-store.png";
import logoNuvemshop from "@/assets/clients/nuvemshop.png";
import logoTray from "@/assets/clients/tray.png";
import logoBling from "@/assets/clients/bling.png";
import logoProolhar from "@/assets/clients/pro-olhar.png";
import logoRdstation from "@/assets/clients/rd-station.png";
import logoItaivan from "@/assets/clients/itaivan.png";
import logoAstron from "@/assets/clients/astron-members.png";

// Client logos - Second row (8 logos)
import logoImunizadora from "@/assets/clients/imunizadora-jaragua.png";
import logoBolicheJaragua from "@/assets/clients/boliche-jaragua.png";
import logoSuperTreis from "@/assets/clients/super-treis.png";
import logoNordestinaMoveis from "@/assets/clients/nordestina-moveis.png";
import logoMagazineTicTac from "@/assets/clients/magazine-tic-tac.png";
import logoPullaBulla from "@/assets/clients/pulla-bulla.png";
import logoPedalaAi from "@/assets/clients/pedala-ai.png";
import logoImobiliariaPradi from "@/assets/clients/imobiliaria-pradi.png";

const firstRowLogos = [
  { name: "Lumi Store", logo: logoLumistore },
  { name: "Nuvemshop", logo: logoNuvemshop },
  { name: "Tray", logo: logoTray },
  { name: "Bling", logo: logoBling },
  { name: "Pro Olhar", logo: logoProolhar },
  { name: "RD Station", logo: logoRdstation },
  { name: "Itaivan", logo: logoItaivan },
  { name: "Astron Members", logo: logoAstron },
];

const secondRowLogos = [
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

function LogoRow({ 
  logos, 
  reverse = false 
}: { 
  logos: typeof firstRowLogos; 
  reverse?: boolean;
}) {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-mavi-gray to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-mavi-gray to-transparent z-10" />
      
      {/* Scrolling container */}
      <div className={cn(
        "flex",
        reverse ? "animate-scroll-reverse" : "animate-scroll"
      )}>
        {duplicatedLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 mx-6 md:mx-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-10 md:h-14 w-auto object-contain max-w-[140px] md:max-w-[180px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoCarousel({ className }: LogoCarouselProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <LogoRow logos={firstRowLogos} />
      <LogoRow logos={secondRowLogos} reverse />
    </div>
  );
}
