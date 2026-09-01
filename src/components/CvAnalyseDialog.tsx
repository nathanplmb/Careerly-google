import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Profil } from "@/lib/profil";
import type { CvEtat } from "@/lib/cv";
import { CvImporter } from "./cv-import/CvImporter";

export interface CvAnalyseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profil?: Profil;
  cv?: CvEtat | null;
  onSaveCv?: (cv: CvEtat) => void;
  onAppliquerProfil?: (patch: Partial<Profil>) => void;
}

export function CvAnalyseDialog({
  open,
  onOpenChange,
  profil,
  onAppliquerProfil,
  onSaveCv,
}: CvAnalyseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl border-border/80 bg-background p-6">
        <CvImporter
          existingProfil={profil}
          onImportComplete={(patch) => {
            // Apply patch
            if (onAppliquerProfil) onAppliquerProfil(patch);
            // Also notify onSaveCv if we got a new CV patch
            if (patch.cv && onSaveCv) {
              onSaveCv(patch.cv);
            }
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
