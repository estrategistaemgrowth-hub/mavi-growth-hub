import whatsappIcon from "@/assets/whatsapp-icon.png";

const WHATSAPP_URL = "https://wa.me/554733072030";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-whatsapp-pulse"
      aria-label="Falar pelo WhatsApp"
    >
      <img 
        src={whatsappIcon} 
        alt="WhatsApp" 
        className="w-full h-full object-contain"
      />
    </a>
  );
}
