import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CenterModal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addDays,
  STATUTS,
  SOURCES,
  PRIORITES,
  emptyPreparation,
  type Candidature,
  type Statut,
  type Source,
  type Priorite,
} from "@/lib/candidatures";
import { MatchPanel } from "@/components/MatchPanel";
import { matchObsolete } from "@/lib/matching";
import { lancerAnalyse, offreAnalysable } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { analyserOffre } from "@/lib/offre.functions";
import { Sparkles, Loader2 } from "lucide-react";
import type { Profil } from "@/lib/profil";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Candidature | null;
  onSave: (c: Candidature) => void;
  profil?: Profil | null;
};

export function CandidatureSheet({
  open,
  onOpenChange,
  value,
  onSave,
  profil = null,
}: Props) {
  const [form, setForm] = useState<Candidature | null>(value);
  const [analyse, setAnalyse] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [tab, setTab] = useState("details");
  const runAnalyserOffre = useServerFn(analyserOffre);

  useEffect(() => {
    setForm(value);
    setErreur(null);
    setTab("details");
  }, [value]);

  if (!form) return null;

  const set = (patch: Partial<Candidature>) =>
    setForm((f) => (f ? { ...f, ...patch } : f));

  const enrichirViaIA = async () => {
    if (!form) return;
    const contenuAAnalyser =
      form.detail?.trim() ||
      `${form.poste} ${form.entreprise} ${form.lieu} ${form.commentaire}`;
    if (contenuAAnalyser.length < 15) {
      setErreur(
        "Veuillez coller le texte de l'offre dans 'Détail de l'offre' pour que l'IA puisse l'analyser.",
      );
      return;
    }
    setEnriching(true);
    setErreur(null);
    try {
      const r = await runAnalyserOffre({ data: { texte: contenuAAnalyser } });
      set({
        entreprise:
          !form.entreprise ||
          form.entreprise === "Entreprise" ||
          form.entreprise === "Nouvelle entreprise"
            ? r.entreprise || form.entreprise
            : form.entreprise,
        poste:
          !form.poste || form.poste === "Nouveau poste"
            ? r.poste || form.poste
            : form.poste,
        lieu:
          !form.lieu || form.lieu === "Non précisé"
            ? r.lieu || form.lieu
            : form.lieu,
        lien: form.lien || r.lien,
        source:
          form.source === "Autre" && r.source
            ? (r.source as Source)
            : form.source || (r.source as Source) || "JobTeaser",
        secteur: form.secteur || r.secteur || "",
        contact: form.contact || r.contact || "",
        dateLimite:
          form.dateLimite ||
          (/^\d{4}-\d{2}-\d{2}$/.test(r.dateLimite ?? "") ? r.dateLimite : ""),
        priorite:
          form.priorite === "auto" &&
          (r.priorite === "Haute" ||
            r.priorite === "Moyenne" ||
            r.priorite === "Faible")
            ? (r.priorite as Priorite)
            : form.priorite,
        commentaire: r.commentaire || form.commentaire || "",
        detail: r.resume?.trim() || form.detail,
      });
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setEnriching(false);
    }
  };

  const setPrep = (patch: Partial<typeof form.preparation>) =>
    setForm((f) =>
      f
        ? {
            ...f,
            preparation: { ...emptyPreparation(), ...f.preparation, ...patch },
          }
        : f,
    );

  const analyser = async () => {
    if (!form || !profil) return;
    setAnalyse(true);
    setErreur(null);
    try {
      const match = await lancerAnalyse(form, profil);
      set({ match });
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setAnalyse(false);
    }
  };

  const isNew = !value?.entreprise;

  return (
    <CenterModal
      open={open}
      onOpenChange={onOpenChange}
      title={isNew ? "Nouvelle candidature" : "Modifier la candidature"}
      description={
        isNew
          ? "Renseignez les informations de l'offre."
          : `${form.entreprise} — ${form.poste}`
      }
      bodyClassName="px-0 py-0 sm:px-0"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={!form.entreprise.trim()}
          >
            Enregistrer
          </Button>
        </div>
      }
    >
      <Tabs value={tab} onValueChange={setTab} className="flex flex-col">
        <TabsList className="mx-5 mt-4 w-auto justify-start sm:mx-6">
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="match">Match IA</TabsTrigger>
          <TabsTrigger value="preparation">Préparation</TabsTrigger>
        </TabsList>

        <div className="flex flex-col">
          <TabsContent
            value="details"
            className="mt-0 data-[state=inactive]:hidden"
          >
            <div className="px-5 py-5 sm:px-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="entreprise">Entreprise</Label>
                  <Input
                    id="entreprise"
                    value={form.entreprise}
                    onChange={(e) => set({ entreprise: e.target.value })}
                    placeholder="Nom de l'entreprise"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lieu">Lieu du poste</Label>
                  <Input
                    id="lieu"
                    value={form.lieu}
                    onChange={(e) => set({ lieu: e.target.value })}
                    placeholder="Paris 15e"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="poste">Intitulé du poste</Label>
                  <Input
                    id="poste"
                    value={form.poste}
                    onChange={(e) => set({ poste: e.target.value })}
                    placeholder="Assistant chef de produit (H/F)"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>État d'avancement</Label>
                  <Select
                    value={form.statut}
                    onValueChange={(v) => set({ statut: v as Statut })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Source</Label>
                  <Select
                    value={form.source || "__none__"}
                    onValueChange={(v) =>
                      set({ source: v === "__none__" ? "" : (v as Source) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Non renseignée</SelectItem>
                      {SOURCES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="secteur">Secteur</Label>
                  <Input
                    id="secteur"
                    value={form.secteur}
                    onChange={(e) => set({ secteur: e.target.value })}
                    placeholder="Tech, Luxe, Conseil…"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Priorité</Label>
                  <Select
                    value={form.priorite}
                    onValueChange={(v) =>
                      set({ priorite: v as Priorite | "auto" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto (par l'IA)</SelectItem>
                      {PRIORITES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="contact">
                    Contact (nom / email / téléphone)
                  </Label>
                  <Input
                    id="contact"
                    value={form.contact}
                    onChange={(e) => set({ contact: e.target.value })}
                    placeholder="M. Dupont - email@email.fr - 0600000000"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="lien">Lien internet de l'offre</Label>
                  <Input
                    id="lien"
                    value={form.lien}
                    onChange={(e) => set({ lien: e.target.value })}
                    placeholder="https://…"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="envoi">Date d'envoi</Label>
                  <Input
                    id="envoi"
                    type="date"
                    value={form.dateEnvoi}
                    onChange={(e) =>
                      set({
                        dateEnvoi: e.target.value,
                        dateRelance:
                          form.dateRelance || addDays(e.target.value, 10),
                        dateDernierContact:
                          form.dateDernierContact || e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relance">Date de relance (J+10)</Label>
                  <Input
                    id="relance"
                    type="date"
                    value={form.dateRelance}
                    onChange={(e) => set({ dateRelance: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dernier">Date du dernier contact</Label>
                  <Input
                    id="dernier"
                    type="date"
                    value={form.dateDernierContact}
                    onChange={(e) =>
                      set({ dateDernierContact: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="limite">Date limite pour postuler</Label>
                  <Input
                    id="limite"
                    type="date"
                    value={form.dateLimite}
                    onChange={(e) => set({ dateLimite: e.target.value })}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="commentaire">Commentaire</Label>
                  <Input
                    id="commentaire"
                    value={form.commentaire}
                    onChange={(e) => set({ commentaire: e.target.value })}
                    placeholder="Entretien prévu le JJ/MM/AAAA"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="detail">Détail de l'offre</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-primary gap-1.5 hover:bg-primary/10"
                      onClick={() => void enrichirViaIA()}
                      disabled={enriching}
                    >
                      {enriching ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      {enriching
                        ? "Analyse IA en cours..."
                        : "Remplir & structurer avec l'IA"}
                    </Button>
                  </div>
                  <Textarea
                    id="detail"
                    rows={6}
                    value={form.detail}
                    onChange={(e) => set({ detail: e.target.value })}
                    placeholder="Copiez/collez ici le détail ou lien de l'offre pour que l'IA remplisse automatiquement le secteur, la source, le contact et synthétise le poste."
                  />
                  {erreur && tab === "details" && (
                    <p className="text-xs text-destructive mt-1">{erreur}</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="match"
            className="mt-0 data-[state=inactive]:hidden"
          >
            <div className="px-5 py-5 sm:px-6">
              <MatchPanel
                match={form.match ?? null}
                obsolete={matchObsolete(form, profil)}
                loading={analyse}
                erreur={erreur}
                profilPret={Boolean(
                  profil &&
                  (profil.formation ||
                    profil.competences ||
                    profil.experiences),
                )}
                offrePrete={offreAnalysable(form)}
                onAnalyser={() => void analyser()}
                candidature={form}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="preparation"
            className="mt-0 data-[state=inactive]:hidden"
          >
            <div className="px-5 py-5 sm:px-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pourquoiEntreprise">
                    Pourquoi cette entreprise ?
                  </Label>
                  <Textarea
                    id="pourquoiEntreprise"
                    rows={3}
                    value={form.preparation.pourquoiEntreprise}
                    onChange={(e) =>
                      setPrep({ pourquoiEntreprise: e.target.value })
                    }
                    placeholder="Vos arguments pour l'entreprise"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pourquoiPoste">Pourquoi ce poste ?</Label>
                  <Textarea
                    id="pourquoiPoste"
                    rows={3}
                    value={form.preparation.pourquoiPoste}
                    onChange={(e) => setPrep({ pourquoiPoste: e.target.value })}
                    placeholder="Vos arguments pour le poste"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes de préparation</Label>
                  <Textarea
                    id="notes"
                    rows={5}
                    value={form.preparation.notes}
                    onChange={(e) => setPrep({ notes: e.target.value })}
                    placeholder="Questions, réponses, points à creuser…"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </CenterModal>
  );
}
