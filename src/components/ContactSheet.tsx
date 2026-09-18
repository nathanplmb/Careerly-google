import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Briefcase,
  Building2,
  ExternalLink,
  Smartphone,
  Linkedin,
  UserCheck,
  AlertTriangle,
  Info,
} from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CANAUX,
  LIBELLES_RELANCE,
  TYPES_CONTACT,
  TYPES_RELANCE,
  nouvelEchange,
  getContactFullName,
  SOURCE_LABELS,
  type Canal,
  type Contact,
  type TypeContact,
  type TypeRelance,
} from "@/lib/contacts";
import type { Candidature } from "@/lib/candidatures";
import type { Entreprise } from "@/lib/entreprises";
import type { Profil } from "@/lib/profil";
import { Link } from "@tanstack/react-router";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  contact: Contact;
  candidatures: Candidature[];
  entreprises?: Entreprise[];
  profil: Profil | null;
  onSave: (c: Contact) => void;
  onDelete?: (c: Contact) => void;
  onOpenCandidature?: (candidatureId: string) => void;
};

export function ContactSheet({
  open,
  onOpenChange,
  contact,
  candidatures,
  entreprises = [],
  profil,
  onSave,
  onDelete,
  onOpenCandidature,
}: Props) {
  const [draft, setDraft] = useState<Contact>(contact);
  const [typeRelance, setTypeRelance] = useState<TypeRelance>(
    "relance_candidature",
  );
  const [consigne, setConsigne] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<{
    objet: string;
    message: string;
    conseils: string[];
  } | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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

  // Récupérer toutes les opportunités associées (par candidatureIds ou candidatureId)
  const linkedCandidatures = useMemo(() => {
    const ids = new Set(draft.candidatureIds || []);
    if (draft.candidatureId) ids.add(draft.candidatureId);
    return candidatures.filter(
      (c) => ids.has(c.id) || (c.contactId && c.contactId === draft.id),
    );
  }, [candidatures, draft.candidatureIds, draft.candidatureId, draft.id]);

  const generer = async () => {
    setChargement(true);
    setErreur(null);
    try {
      // Simulation intelligente de message de relance selon le profil et l'opportunité
      await new Promise((r) => setTimeout(r, 600));
      const targetOpp = linkedCandidatures[0];
      const jobTitle = targetOpp?.poste || draft.poste || "votre opportunité";
      const compName =
        targetOpp?.companyName ||
        targetOpp?.company ||
        draft.entreprise ||
        "votre entreprise";
      const subject = `Suivi de candidature — ${jobTitle} chez ${compName}`;
      const body = `Bonjour ${draft.nom || ""},\n\nJ'espère que vous allez bien.\n\nJe me permets de revenir vers vous concernant ma candidature pour le poste de ${jobTitle} au sein de ${compName}.\n\nToujours particulièrement enthousiaste à l'idée de rejoindre vos équipes et de contribuer à vos projets, je reste à votre entière disposition pour tout échange complémentaire.\n\nEn vous remerciant pour votre temps et votre attention,\n\nBien cordialement,\n${profil?.prenom || ""} ${profil?.nom || ""}`;

      setResultat({
        objet: subject,
        message: body,
        conseils: [
          "Personnalisez avec un point précis abordé lors de votre dernier échange.",
          "Restez concis et professionnel.",
          "Envoyez de préférence le matin entre 9h et 11h.",
        ],
      });
    } catch {
      setErreur("Erreur lors de la génération de la relance.");
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

  const handleSelectCompany = (val: string) => {
    if (val === "custom") {
      set({ companyId: null });
      return;
    }
    const found = entreprises.find((e) => e.id === val);
    if (found) {
      set({
        companyId: found.id,
        entreprise: found.nom,
      });
    }
  };

  const handleLinkOpportunity = (candidatureId: string) => {
    if (candidatureId === "aucune") {
      set({ candidatureId: "", candidatureIds: [] });
      return;
    }
    const currentIds = new Set(draft.candidatureIds || []);
    currentIds.add(candidatureId);
    const opp = candidatures.find((c) => c.id === candidatureId);
    set({
      candidatureId,
      candidatureIds: Array.from(currentIds),
      entreprise:
        draft.entreprise ||
        opp?.companyName ||
        opp?.company ||
        opp?.entreprise ||
        "",
      companyId: draft.companyId || opp?.companyId || null,
    });
  };

  const handleUnlinkOpportunity = (candId: string) => {
    const next = (draft.candidatureIds || []).filter((id) => id !== candId);
    set({
      candidatureIds: next,
      candidatureId:
        draft.candidatureId === candId ? next[0] || "" : draft.candidatureId,
    });
  };

  return (
    <>
      <CenterModal
        open={open}
        onOpenChange={onOpenChange}
        title={getContactFullName(draft) || "Nouveau contact"}
        description={
          [draft.poste, draft.entreprise].filter(Boolean).join(" — ") ||
          "Ajoutez les informations du contact."
        }
        footer={
          <div className="flex items-center justify-between gap-2">
            {onDelete ? (
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 text-xs"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                <Trash2 className="size-4 mr-1.5" /> Supprimer le contact
              </Button>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-xs"
              >
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onSave(draft);
                  onOpenChange(false);
                }}
                className="text-xs font-semibold"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        }
      >
        <Tabs defaultValue="infos" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="infos" className="flex-1 text-xs">
              Fiche
            </TabsTrigger>
            <TabsTrigger value="opportunites" className="flex-1 text-xs">
              Opportunités ({linkedCandidatures.length})
            </TabsTrigger>
            <TabsTrigger value="historique" className="flex-1 text-xs">
              Historique ({draft.historique.length})
            </TabsTrigger>
            <TabsTrigger value="relance" className="flex-1 text-xs">
              Relance IA
            </TabsTrigger>
          </TabsList>

          {/* Onglet Fiche Principale */}
          <TabsContent value="infos" className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* Badges sources si existants */}
            <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Source(s) :</span>
              {(draft.sources && draft.sources.length > 0
                ? draft.sources
                : [draft.source || "manual"]
              ).map((src) => (
                <span
                  key={src}
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                >
                  {src === "phone" && (
                    <Smartphone className="size-3 text-emerald-500" />
                  )}
                  {src === "linkedin" && (
                    <Linkedin className="size-3 text-[#0A66C2]" />
                  )}
                  {src === "opportunity" && (
                    <Briefcase className="size-3 text-primary" />
                  )}
                  {SOURCE_LABELS[src as keyof typeof SOURCE_LABELS] || src}
                </span>
              ))}
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Nom complet</Label>
              <Input
                value={draft.nom}
                onChange={(e) =>
                  set({ nom: e.target.value, fullName: e.target.value })
                }
                placeholder="Ex : Sophie Durand"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Type de contact</Label>
              <Select
                value={draft.type}
                onValueChange={(v) => set({ type: v as TypeContact })}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES_CONTACT.map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Entreprise</Label>
              {entreprises.length > 0 ? (
                <div className="space-y-1.5">
                  <Select
                    value={
                      draft.companyId || (draft.entreprise ? "custom" : "empty")
                    }
                    onValueChange={handleSelectCompany}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Sélectionner une entreprise..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empty" className="text-xs">
                        Aucune entreprise
                      </SelectItem>
                      {entreprises.map((e) => (
                        <SelectItem key={e.id} value={e.id} className="text-xs">
                          {e.nom}
                        </SelectItem>
                      ))}
                      <SelectItem
                        value="custom"
                        className="text-xs text-muted-foreground"
                      >
                        Saisir un autre nom...
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {(!draft.companyId || draft.companyId === "custom") && (
                    <Input
                      value={draft.entreprise}
                      onChange={(e) => set({ entreprise: e.target.value })}
                      placeholder="Nom personnalisé de l'entreprise"
                      className="text-xs"
                    />
                  )}
                </div>
              ) : (
                <Input
                  value={draft.entreprise}
                  onChange={(e) => set({ entreprise: e.target.value })}
                  placeholder="Ex : PwC France"
                  className="text-xs"
                />
              )}
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Poste / Rôle</Label>
              <Input
                value={draft.poste}
                onChange={(e) =>
                  set({ poste: e.target.value, jobTitle: e.target.value })
                }
                placeholder="Ex : Responsable Recrutement Tech"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Email</Label>
              <Input
                type="email"
                value={draft.email}
                onChange={(e) => set({ email: e.target.value })}
                placeholder="sophie.durand@entreprise.com"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Téléphone</Label>
              <Input
                value={draft.telephone}
                onChange={(e) =>
                  set({ telephone: e.target.value, phone: e.target.value })
                }
                placeholder="06 12 34 56 78"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <Label className="text-xs">Profil LinkedIn</Label>
              <Input
                value={draft.linkedin}
                onChange={(e) =>
                  set({ linkedin: e.target.value, linkedinUrl: e.target.value })
                }
                placeholder="https://www.linkedin.com/in/sophie-durand"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Dernière interaction</Label>
              <Input
                type="date"
                value={draft.derniereInteraction}
                onChange={(e) => set({ derniereInteraction: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs">Date de la prochaine action</Label>
              <Input
                type="date"
                value={draft.dateProchaineAction}
                onChange={(e) => set({ dateProchaineAction: e.target.value })}
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <Label className="text-xs">Prochaine action</Label>
              <Input
                value={draft.prochaineAction}
                onChange={(e) => set({ prochaineAction: e.target.value })}
                placeholder="Relancer par email, envoyer un remerciement…"
                className="text-xs"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <Label className="text-xs">Notes personnelles</Label>
              <Textarea
                rows={3}
                value={draft.notes}
                onChange={(e) => set({ notes: e.target.value })}
                placeholder="Informations utiles, affinités, recommandations..."
                className="text-xs"
              />
            </div>
          </TabsContent>

          {/* Onglet Opportunités associées */}
          <TabsContent value="opportunites" className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Opportunités rattachées ({linkedCandidatures.length})
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Ce contact peut être associé à une ou plusieurs offres
                  d'emploi.
                </p>
              </div>

              <div className="w-48 sm:w-60">
                <Select value="none" onValueChange={handleLinkOpportunity}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="+ Lier une opportunité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled className="text-xs">
                      Choisir une offre...
                    </SelectItem>
                    {candidatures
                      .filter(
                        (c) => !linkedCandidatures.some((lc) => lc.id === c.id),
                      )
                      .map((c) => (
                        <SelectItem key={c.id} value={c.id} className="text-xs">
                          {c.companyName ||
                            c.company ||
                            c.entreprise ||
                            "Sans nom"}{" "}
                          — {c.poste || "poste"}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {linkedCandidatures.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground">
                Aucune opportunité actuellement rattachée à ce contact.
              </div>
            ) : (
              <div className="space-y-2">
                {linkedCandidatures.map((opp) => (
                  <div
                    key={opp.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {opp.poste || "Poste non précisé"}
                      </p>
                      <p className="text-muted-foreground text-[11px] truncate">
                        {opp.companyName ||
                          opp.company ||
                          opp.entreprise ||
                          "Entreprise"}
                        {opp.lieu ? ` · ${opp.lieu}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {opp.currentStage || opp.statut || "Offre"}
                      </span>
                      {onOpenCandidature && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpenCandidature(opp.id)}
                          className="h-7 px-2 text-[11px] gap-1"
                        >
                          Voir <ExternalLink className="size-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnlinkOpportunity(opp.id)}
                        className="h-7 px-2 text-destructive hover:bg-destructive/10 text-[11px]"
                      >
                        Détacher
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Onglet Historique */}
          <TabsContent value="historique" className="mt-4 space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                set({ historique: [nouvelEchange(), ...draft.historique] })
              }
              className="text-xs gap-1.5"
            >
              <Plus className="size-3.5" /> Ajouter un échange
            </Button>

            {draft.historique.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">
                Aucun échange enregistré pour l'instant.
              </p>
            )}

            {draft.historique.map((e, i) => (
              <div
                key={e.id}
                className="grid gap-2.5 rounded-xl border border-border/60 bg-card/40 p-3 text-xs"
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  <Input
                    type="date"
                    value={e.date}
                    onChange={(ev) => {
                      const h = [...draft.historique];
                      h[i] = { ...e, date: ev.target.value };
                      set({ historique: h });
                    }}
                    className="text-xs"
                  />
                  <Select
                    value={e.canal}
                    onValueChange={(v) => {
                      const h = [...draft.historique];
                      h[i] = { ...e, canal: v as Canal };
                      set({ historique: h });
                    }}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CANAUX.map((c) => (
                        <SelectItem key={c} value={c} className="text-xs">
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
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Envoyé" className="text-xs">
                        Envoyé
                      </SelectItem>
                      <SelectItem value="Reçu" className="text-xs">
                        Reçu
                      </SelectItem>
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
                  className="text-xs"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end text-destructive hover:bg-destructive/10 text-xs h-7"
                  onClick={() =>
                    set({
                      historique: draft.historique.filter((x) => x.id !== e.id),
                    })
                  }
                >
                  <Trash2 className="size-3.5 mr-1" /> Supprimer cet échange
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* Onglet Relance IA */}
          <TabsContent value="relance" className="mt-4 space-y-4">
            <div className="grid gap-1.5">
              <Label className="text-xs">Type de message</Label>
              <Select
                value={typeRelance}
                onValueChange={(v) => setTypeRelance(v as TypeRelance)}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES_RELANCE.map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">
                      {LIBELLES_RELANCE[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">
                Consigne complémentaire (facultatif)
              </Label>
              <Textarea
                rows={2}
                value={consigne}
                onChange={(e) => setConsigne(e.target.value)}
                placeholder="Ex : mentionner ma disponibilité à partir de janvier."
                className="text-xs"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              L'IA s'appuie sur votre profil, l'entreprise et l'historique
              enregistré pour rédiger un message sur-mesure.
            </p>
            <Button
              onClick={() => void generer()}
              disabled={chargement || !draft.nom}
              className="text-xs gap-1.5"
            >
              {chargement ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" /> Rédaction…
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" /> Relancer avec l'IA
                </>
              )}
            </Button>

            {erreur && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {erreur}
              </p>
            )}

            {resultat && (
              <div className="space-y-3 rounded-xl border border-border/60 bg-card/40 p-3 text-xs">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Objet
                  </p>
                  <p className="font-semibold text-foreground text-xs">
                    {resultat.objet}
                  </p>
                </div>
                <Textarea
                  rows={8}
                  value={resultat.message}
                  onChange={(e) =>
                    setResultat({ ...resultat, message: e.target.value })
                  }
                  className="text-xs"
                />
                {resultat.conseils.length > 0 && (
                  <ul className="list-disc space-y-0.5 pl-4 text-[11px] text-muted-foreground">
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
                    className="text-xs h-8 gap-1.5"
                  >
                    <Copy className="size-3.5" /> Copier
                  </Button>
                  {draft.email && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs h-8"
                    >
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
                    className="text-xs h-8"
                  >
                    <Plus className="size-3.5 mr-1" /> Ajouter à l'historique
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CenterModal>

      {/* Modal de confirmation de suppression sécurisée */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2.5 text-destructive">
              <AlertTriangle className="size-5" />
              <AlertDialogTitle className="text-base font-semibold">
                Supprimer ce contact ?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-xs space-y-2 mt-2">
              <p>
                Êtes-vous sûr de vouloir supprimer{" "}
                <strong>{getContactFullName(draft)}</strong> ?
              </p>
              <div className="rounded-lg border border-border/80 bg-muted/50 p-2.5 flex items-start gap-2 text-foreground">
                <Info className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Protection des données :</strong> Cette suppression ne
                  supprimera <strong>ni l'entreprise</strong> (
                  {draft.entreprise || "non spécifiée"}){" "}
                  <strong>ni les opportunités associées</strong> (
                  {linkedCandidatures.length} offre(s)).
                </span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onDelete) {
                  onDelete(draft);
                }
                setConfirmDeleteOpen(false);
                onOpenChange(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold"
            >
              Confirmer la suppression
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
