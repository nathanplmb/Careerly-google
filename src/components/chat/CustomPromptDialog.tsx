import { useState, useEffect } from "react";
import { Sliders, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CustomPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  systemInstruction: string;
  onSave: (instruction: string) => void;
}

export function CustomPromptDialog({
  open,
  onOpenChange,
  systemInstruction,
  onSave,
}: CustomPromptDialogProps) {
  const [value, setValue] = useState(systemInstruction);

  useEffect(() => {
    setValue(systemInstruction);
  }, [systemInstruction, open]);

  const handleSave = () => {
    onSave(value);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Sliders className="size-4.5" />
            <DialogTitle className="text-base font-bold">
              Consignes Système Personnalisées
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Définissez le rôle, le ton et les contraintes spécifiques que Gemini
            doit adopter pour vos échanges.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex : Tu es un recruteur senior dans le domaine de la tech spécialisé dans les postes de Lead Dev. Sois direct, exigeant et privilégie des réponses courtes."
            className="min-h-[140px] text-xs resize-none rounded-xl"
          />
          <p className="mt-1.5 text-[11px] text-muted-foreground/70">
            Ces instructions seront injectées en tant que `systemInstruction`
            pour orienter les réponses du modèle.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-xl"
          >
            Annuler
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="gap-1.5 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            <Check className="size-3.5" /> Enregistrer les consignes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
