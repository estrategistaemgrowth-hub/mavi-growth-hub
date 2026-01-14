import { useState } from "react";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import { WhatsAppLeadDialog } from "./WhatsAppLeadDialog";

export function WhatsAppButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-whatsapp-pulse cursor-pointer"
        aria-label="Falar pelo WhatsApp"
      >
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          className="w-full h-full object-contain"
        />
      </button>

      <WhatsAppLeadDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
