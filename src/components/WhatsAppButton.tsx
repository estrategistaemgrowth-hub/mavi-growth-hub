import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/554733072030";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-whatsapp-pulse"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
    </a>
  );
}
