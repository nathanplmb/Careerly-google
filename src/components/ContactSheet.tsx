import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
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
  CANAUX,
  LIBELLES_RELANCE,
  TYPES_CONTACT,
  TYPES_RELANCE,
  nouvelEchange,
  type Canal,
  type Contact,
  type TypeContact,
  type TypeRelance,
} from "@/lib/contacts";
import type { Candidature } from "@/lib/candidatures";
import type { Profil } from "@/lib/profil";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  contact: Contact;
  candidatures: Candidature[];
  profil: Profil | null;
  onSave: (c: Contact) => void;
  onDelete?: (c: Contact) => void;
};

export function ContactSheet({
  open,
  onOpenChange,
  contact,
  candidatures,
  profil,
  onSave,
  onDelete,
}: Props) {
  const [draft, setDraft] = useState<Contact>(contact);
  const [typeRelance, setTypeRelance] = useState<TypeRelance>(
    "relance_candidature",
  );
  const [consigne, setConsigne] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<any /* MessageRelance */ | null>(
    null,
  );

  // Réinitialise le brouillon quand on ouvre une autre fiche.
  const [ref, setRef] = useState(contact.id);
  if (ref !== contact.id) {
    setRef(contact.id);
    setDraft(contact);
    setResultat(null);
    setErreur(null);
  }

  const set = (patch: Partial<Contact>) =>
    setDraft((c) => ({ ...c, ...patch }));

  const candidature = useMemo(
    () => candidatures.find((c) => c.id === draft.candidatureId) ?? null,
    [candidatures, draft.candidatureId],
  );

  const generer = async () => {
    setChargement(true);
    setErreur(null);
    try {
      setResultat();
    } catch (e) {
    } finally {
      setChargement(false);
    }
  };

  const copier = async (texte: string) => {
    try {
      await navigator.clipboard.writeText(texte);
      toast.success("Copié dans le presse-papier.");
    } catch {
      toast.error("Copie impossible sur cet appareil.");
    }
  };

  return (
    <CenterModal
      open={open}
      onOpenChange={onOpenChange}
      title={draft.nom || "Nouveau contact"}
      description={
        [draft.poste, draft.entreprise].filter(Boolean).join(" — ") ||
        "Ajoutez les informations du contact."
      }
      footer={
        <div className="flex items-center justify-between gap-2">
          {onDelete ? (
            <Button
              variant="ghost"
              className="text-destructive"
              onClick={() => onDelete(draft)}
            >
              <Trash2 className="size-4" /> Supprimer
            </Button>
          ) : (
            <span />
          )}
          <Button onClick={() => onSave(draft)}>Enregistrer</Button>
        </div>
      }
    >
      <Tabs defaultValue="infos">
        <TabsList className="w-full">
          <TabsTrigger value="infos" className="flex-1">
            Fiche
          </TabsTrigger>
          <TabsTrigger value="historique" className="flex-1">
            Historique
          </TabsTrigger>
          <TabsTrigger value="relance" className="flex-1">
            Relance IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="infos" className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Nom</Label>
            <Input
              value={draft.nom}
              onChange={(e) => set({ nom: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Type de contact</Label>
            <Select
              value={draft.type}
              onValueChange={(v) => set({ type: v as TypeContact })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES_CONTACT.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Entreprise</Label>
            <Input
              value={draft.entreprise}
              onChange={(e) => set({ entreprise: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Poste</Label>
            <Input
              value={draft.poste}
              onChange={(e) => set({ poste: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={draft.email}
              onChange={(e) => set({ email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Téléphone</Label>
            <Input
              value={draft.telephone}
              onChange={(e) => set({ telephone: e.target.value })}
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>LinkedIn</Label>
            <Input
              value={draft.linkedin}
              onChange={(e) => set({ linkedin: e.target.value })}
              placeholder="https://www.linkedin.com/in/…"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Candidature associée</Label>
            <Select
              value={draft.candidatureId || "aucune"}
              onValueChange={(v) =>
                set({ candidatureId: v === "aucune" ? "" : v })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Aucune" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucune">Aucune</SelectItem>
                {candidatures.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.entreprise || "Sans nom"} —{" "}
                    {c.poste || "poste non précisé"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Dernière interaction</Label>
            <Input
              type="date"
              value={draft.derniereInteraction}
              onChange={(e) => set({ derniereInteraction: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Date de la prochaine action</Label>
            <Input
              type="date"
              value={draft.dateProchaineAction}
              onChange={(e) => set({ dateProchaineAction: e.target.value })}
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Prochaine action</Label>
            <Input
              value={draft.prochaineAction}
              onChange={(e) => set({ prochaineAction: e.target.value })}
              placeholder="Relancer par email, envoyer un remerciement…"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Notes</Label>
            <Textarea
              rows={4}
              value={draft.notes}
              onChange={(e) => set({ notes: e.target.value })}
            />
          </div>
        </TabsContent>

        <TabsContent value="historique" className="mt-4 space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              set({ historique: [nouvelEchange(), ...draft.historique] })
            }
          >
            <Plus className="size-4" /> Ajouter un échange
          </Button>

          {draft.historique.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun échange enregistré pour l'instant.
            </p>
          )}

          {draft.historique.map((e, i) => (
            <div
              key={e.id}
              className="grid gap-3 rounded-xl border border-border/60 p-3"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <Input
                  type="date"
                  value={e.date}
                  onChange={(ev) => {
                    const h = [...draft.historique];
                    h[i] = { ...e, date: ev.target.value };
                    set({ historique: h });
                  }}
                />
                <Select
                  value={e.canal}
                  onValueChange={(v) => {
                    const h = [...draft.historique];
                    h[i] = { ...e, canal: v as Canal };
                    set({ historique: h });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CANAUX.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={e.sens}
                  onValueChange={(v) => {
                    const h = [...draft.historique];
                    h[i] = { ...e, sens: v as "Envoyé" | "Reçu" };
                    set({ historique: h });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Envoyé">Envoyé</SelectItem>
                    <SelectItem value="Reçu">Reçu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                rows={2}
                placeholder="Résumé de l'échange"
                value={e.resume}
                onChange={(ev) => {
                  const h = [...draft.historique];
                  h[i] = { ...e, resume: ev.target.value };
                  set({ historique: h });
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="justify-self-end text-destructive"
                onClick={() =>
                  set({
                    historique: draft.historique.filter((x) => x.id !== e.id),
                  })
                }
              >
                <Trash2 className="size-4" /> Supprimer
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="relance" className="mt-4 space-y-4">
          <div className="grid gap-2">
            <Label>Type de message</Label>
            <Select
              value={typeRelance}
              onValueChange={(v) => setTypeRelance(v as TypeRelance)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES_RELANCE.map((t) => (
                  <SelectItem key={t} value={t}>
                    {LIBELLES_RELANCE[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Consigne complémentaire (facultatif)</Label>
            <Textarea
              rows={2}
              value={consigne}
              onChange={(e) => setConsigne(e.target.value)}
              placeholder="Ex : mentionner ma disponibilité à partir de janvier."
            />
          </div>
          <p className="text-xs text-muted-foreground">
            L'IA s'appuie uniquement sur votre profil, la candidature associée
            et l'historique enregistré. Elle n'invente aucune information.
          </p>
          <Button
            onClick={() => void generer()}
            disabled={chargement || !draft.nom}
          >
            {chargement ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Rédaction…
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Relancer avec l'IA
              </>
            )}
          </Button>

          {erreur && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {erreur}
            </p>
          )}

          {resultat && (
            <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Objet
                </p>
                <p className="font-medium">{resultat.objet}</p>
              </div>
              <Textarea
                rows={12}
                value={resultat.message}
                onChange={(e) =>
                  setResultat({ ...resultat, message: e.target.value })
                }
              />
              {resultat.conseils.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {resultat.conseils.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    void copier(`${resultat.objet}\n\n${resultat.message}`)
                  }
                >
                  <Copy className="size-4" /> Copier
                </Button>
                {draft.email && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`mailto:${draft.email}?subject=${encodeURIComponent(
                        resultat.objet,
                      )}&body=${encodeURIComponent(resultat.message)}`}
                    >
                      Ouvrir dans l'email
                    </a>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    set({
                      historique: [
                        {
                          ...nouvelEchange(),
                          resume: `${LIBELLES_RELANCE[typeRelance]} — ${resultat.objet}`,
                        },
                        ...draft.historique,
                      ],
                    })
                  }
                >
                  <Plus className="size-4" /> Ajouter à l'historique
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CenterModal>
  );
}
