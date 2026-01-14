import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, User, ArrowRight } from "lucide-react";

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  trialLink: string;
}

const formatWhatsApp = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

export function LeadCaptureDialog({ open, onOpenChange, planName, trialLink }: LeadCaptureDialogProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; whatsapp?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 2) {
      newErrors.name = "Nome muito curto";
    }
    
    const whatsappNumbers = whatsapp.replace(/\D/g, "");
    if (!whatsappNumbers) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (whatsappNumbers.length < 10 || whatsappNumbers.length > 11) {
      newErrors.whatsapp = "WhatsApp inválido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Dispatch custom event for Mavi Lead Tracking
      const leadData = {
        name: name.trim(),
        phone: whatsapp.replace(/\D/g, ""),
        source: `HUBRS CRM - Plano ${planName}`,
        timestamp: new Date().toISOString(),
      };
      
      // Trigger custom event for tracking
      window.dispatchEvent(new CustomEvent("mavi-lead-capture", { detail: leadData }));
      
      // Small delay for tracking, then redirect
      setTimeout(() => {
        window.open(trialLink, "_blank");
        onOpenChange(false);
        setName("");
        setWhatsapp("");
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error("Error capturing lead:", error);
      // Still redirect even if tracking fails
      window.open(trialLink, "_blank");
      onOpenChange(false);
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) setErrors({ ...errors, name: undefined });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Quase lá! Complete seus dados
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha abaixo para testar o plano <span className="text-primary font-semibold">{planName}</span> grátis por 7 dias
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={handleNameChange}
                className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                maxLength={100}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="tel"
                placeholder="(47) 99999-9999"
                value={whatsapp}
                onChange={handleWhatsAppChange}
                className={`pl-10 ${errors.whatsapp ? "border-destructive" : ""}`}
                maxLength={15}
              />
            </div>
            {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-glow" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processando..."
            ) : (
              <>
                Continuar para o teste grátis
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Seus dados estão seguros. Não enviamos spam.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
