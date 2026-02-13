import * as React from "react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WhatsAppLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WHATSAPP_NUMBER = "554733072030";

const segmentOptions = [
  "E-commerce / Loja Virtual",
  "Indústria",
  "Imobiliária",
  "Saúde e Estética",
  "Serviços",
  "Varejo Físico",
  "Outro",
];

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function WhatsAppLeadDialog({ open, onOpenChange }: WhatsAppLeadDialogProps) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [segmento, setSegmento] = useState("");
  const [outroSegmento, setOutroSegmento] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string; segmento?: string; outroSegmento?: string }>({});

  const showOutroInput = segmento === "Outro";
  const segmentoFinal = segmento === "Outro" ? outroSegmento : segmento;

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!nome.trim() || nome.trim().length < 2) {
      newErrors.nome = "Digite seu nome completo";
    }

    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10 || whatsappDigits.length > 11) {
      newErrors.whatsapp = "Digite um WhatsApp válido";
    }

    if (!segmento) {
      newErrors.segmento = "Selecione seu segmento";
    }

    if (segmento === "Outro" && (!outroSegmento.trim() || outroSegmento.trim().length < 2)) {
      newErrors.outroSegmento = "Digite seu segmento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Dispatch lead capture event
    const leadData = {
      name: nome.trim(),
      phone: whatsapp,
      company: segmentoFinal,
      source: "WhatsApp - Botão Flutuante",
      timestamp: new Date().toISOString(),
    };

    window.dispatchEvent(new CustomEvent("mavi-lead-capture", { detail: leadData }));

    // Disparar conversão Google Ads
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }

    // Build WhatsApp message
    const message = encodeURIComponent(
      `Olá! Meu nome é ${nome.trim()} e trabalho no segmento de ${segmentoFinal}. Gostaria de saber mais sobre os serviços da MAVI.`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset form and close dialog
    setNome("");
    setWhatsapp("");
    setSegmento("");
    setOutroSegmento("");
    setErrors({});
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setNome("");
    setWhatsapp("");
    setSegmento("");
    setOutroSegmento("");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <MessageCircle className="h-6 w-6 text-green-500" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Fale com a MAVI pelo WhatsApp
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados para iniciar a conversa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-foreground">
              Seu nome completo
            </Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={errors.nome ? "border-destructive" : ""}
            />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-foreground">
              Seu WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(47) 99999-9999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
              className={errors.whatsapp ? "border-destructive" : ""}
            />
            {errors.whatsapp && (
              <p className="text-sm text-destructive">{errors.whatsapp}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="segmento" className="text-foreground">
              Segmento da empresa
            </Label>
            <Select value={segmento} onValueChange={setSegmento}>
              <SelectTrigger className={errors.segmento ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione seu segmento" />
              </SelectTrigger>
              <SelectContent>
                {segmentOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.segmento && (
              <p className="text-sm text-destructive">{errors.segmento}</p>
            )}
          </div>

          {showOutroInput && (
            <div className="space-y-2">
              <Label htmlFor="outroSegmento" className="text-foreground">
                Digite seu segmento
              </Label>
              <Input
                id="outroSegmento"
                type="text"
                placeholder="Ex: Educação, Tecnologia..."
                value={outroSegmento}
                onChange={(e) => setOutroSegmento(e.target.value)}
                className={errors.outroSegmento ? "border-destructive" : ""}
              />
              {errors.outroSegmento && (
                <p className="text-sm text-destructive">{errors.outroSegmento}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
          >
            {isSubmitting ? "Abrindo WhatsApp..." : "Falar no WhatsApp"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            🔒 Seus dados estão seguros e não serão compartilhados.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
