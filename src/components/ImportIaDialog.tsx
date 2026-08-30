import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { analyserOffre } from "@/lib/offre.functions";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { emptyCandidature, type Candidature } from "@/lib/candidatures";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResult: (c: Candidature) => void;
};

export function ImportIaDialog({ open, onOpenChange, onResult }: Props) {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const run = useServerFn(analyserOffre);

  const analyser = async () => {
    setLoading(true);
    setErreur(null);
    try {
      const r = await run({ data: { texte } });
      onResult({
        ...emptyCandidature(),
        entreprise: r.entreprise,
        poste: r.poste,
        lieu: r.lieu,
        lien: r.lien,
        contact: r.contact,
        dateLimite: /^\d{4}-\d{2}-\d{2}$/.test(r.dateLimite ?? "")
          ? r.dateLimite
          : "",
        commentaire: r.commentaire,
        detail: r.resume || texte,
      });
      setTexte("");
      onOpenChange(false);
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" /> Analyser une offre avec
            l'IA
          </DialogTitle>
          <DialogDescription>
            Copiez-collez la fiche de poste : l'IA remplit l'entreprise, le
            poste, le lieu, le contact et le résumé de l'offre.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          rows={12}
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Collez ici l'annonce complète (LinkedIn, Welcome to the Jungle, JobTeaser…)"
        />

        {erreur && <p className="text-sm text-destructive">{erreur}</p>}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={analyser}
            disabled={loading || texte.trim().length < 20}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "Analyse en cours…" : "Analyser l'offre"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
