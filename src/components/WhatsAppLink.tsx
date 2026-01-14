import { useState, ReactNode } from "react";
import { WhatsAppLeadDialog } from "./WhatsAppLeadDialog";

interface WhatsAppLinkProps {
  children: ReactNode;
  className?: string;
}

export function WhatsAppLink({ children, className }: WhatsAppLinkProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className={className}
      >
        {children}
      </button>

      <WhatsAppLeadDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
