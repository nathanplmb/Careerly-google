import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, Loader2, Save } from "lucide-react";
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
import { useSession } from "@/hooks/useSession";
import { AppShell } from "@/components/AppShell";
import { CvAnalyseDialog } from "@/components/CvAnalyseDialog";
import { CvBuilder } from "@/components/CvBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { normaliserCvStructure } from "@/lib/cv-structure";
import type { CvEtat } from "@/lib/cv";
import { fetchProfil, saveProfilCloud } from "@/lib/profil-cloud";
import {
  CRITERES,
  IMPORTANCES,
  emptyProfil,
  loadProfil,
  saveProfilLocal,
  type Critere,
  type Importance,
  type Profil,
} from "@/lib/profil";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon profil — Suivi de stage" },
      {
        name: "description",
        content:
          "Renseignez votre profil étudiant : formation, compétences, mobilité et critères pour un matching personnalisé des offres.",
      },
      { property: "og:title", content: "Mon profil — Suivi de stage" },
      {
        property: "og:description",
        content:
          "Votre profil sert de base au score de correspondance des offres de stage.",
      },
    ],
  }),
  component: ProfilPage,
});

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      <Input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2 sm:col-span-2">
      <Label>{label}</Label>
      <Textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card lift-hover p-6">
      <h2 className="text-lg font-semibold">{titre}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function ProfilPage() {
  const { user, loading: authLoading } = useSession();
  const [profil, setProfil] = useState<Profil>(emptyProfil());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const set = (patch: Partial<Profil>) =>
    setProfil((p) => ({ ...p, ...patch }));

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;
    (async () => {
      const local = loadProfil();
      if (!user) {
        if (!cancelled) {
          setProfil(local);
          setLoading(false);
        }
        return;
      }
      try {
        const cloud = await fetchProfil();
        if (!cancelled) setProfil(cloud ?? local);
      } catch {
        if (!cancelled) setProfil(local);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const enregistrer = async () => {
    setSaving(true);
    saveProfilLocal(profil);
    if (user) {
      try {
        const saved = await saveProfilCloud(profil, user.id);
        setProfil(saved);
      } catch {
        toast.error("Enregistrement en ligne impossible.");
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    toast.success("Profil enregistré.");
  };

  return (
    <AppShell
      eyebrow="Compte"
      title="Mon profil"
      subtitle="Ces informations servent au score de correspondance et à la préparation."
      actions={
        <Button size="sm" variant="outline" onClick={() => setCvOpen(true)}>
          <FileText className="size-4" /> Analyser mon CV
        </Button>
      }
    >
      <div className="max-w-5xl">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Chargement du profil…
          </div>
        ) : (
          <Tabs defaultValue="cv" className="grid gap-6">
            <TabsList className="w-full max-w-xl">
              <TabsTrigger value="cv" className="flex-1">
                Mon CV
              </TabsTrigger>
              <TabsTrigger value="recherche" className="flex-1">
                Ma recherche
              </TabsTrigger>
              <TabsTrigger value="criteres" className="flex-1">
                Critères
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cv" className="grid gap-6">
              <Section titre="Identité et formation">
                <Field
                  label="Prénom"
                  value={profil.prenom}
                  onChange={(v) => set({ prenom: v })}
                />
                <Field
                  label="Nom"
                  value={profil.nom}
                  onChange={(v) => set({ nom: v })}
                />
                <Field
                  label="Formation"
                  value={profil.formation}
                  onChange={(v) => set({ formation: v })}
                  placeholder="Programme Grande École"
                />
                <Field
                  label="École"
                  value={profil.ecole}
                  onChange={(v) => set({ ecole: v })}
                />
                <Field
                  label="Niveau"
                  value={profil.niveau}
                  onChange={(v) => set({ niveau: v })}
                  placeholder="M1"
                />
                <Field
                  label="Type de contrat recherché"
                  value={profil.contrats}
                  onChange={(v) => set({ contrats: v })}
                  placeholder="Stage, alternance…"
                />
              </Section>

              <CvBuilder
                value={normaliserCvStructure(profil.cvStructure)}
                onChange={(cv) => set({ cvStructure: cv })}
              />
            </TabsContent>

            <TabsContent value="recherche" className="grid gap-6">
              <Section titre="Recherche">
                <Field
                  label="Localisation souhaitée"
                  value={profil.localisation}
                  onChange={(v) => set({ localisation: v })}
                  placeholder="Paris, Lyon…"
                />
                <Field
                  label="Mobilité"
                  value={profil.mobilite}
                  onChange={(v) => set({ mobilite: v })}
                  placeholder="France entière, international…"
                />
                <Field
                  label="Date de début"
                  type="date"
                  value={profil.dateDebut}
                  onChange={(v) => set({ dateDebut: v })}
                />
                <Field
                  label="Durée"
                  value={profil.duree}
                  onChange={(v) => set({ duree: v })}
                  placeholder="6 mois"
                />
                <Field
                  label="Télétravail souhaité"
                  value={profil.teletravail}
                  onChange={(v) => set({ teletravail: v })}
                  placeholder="2 jours / semaine"
                />
                <Field
                  label="Rémunération souhaitée"
                  value={profil.remuneration}
                  onChange={(v) => set({ remuneration: v })}
                  placeholder="1200 € / mois"
                />
                <Area
                  label="Domaines / secteurs visés"
                  value={profil.domaines}
                  onChange={(v) => set({ domaines: v })}
                  placeholder="Marketing, luxe, conseil…"
                />
                <Area
                  label="Métiers visés"
                  value={profil.metiers}
                  onChange={(v) => set({ metiers: v })}
                  placeholder="Chef de produit junior, consultant junior…"
                />
                <Area
                  label="Entreprises ciblées"
                  value={profil.entreprisesCiblees}
                  onChange={(v) => set({ entreprisesCiblees: v })}
                />
              </Section>

              <Section titre="Compétences et expériences">
                <Area
                  label="Compétences"
                  value={profil.competences}
                  onChange={(v) => set({ competences: v })}
                  placeholder="Analyse de données, gestion de projet…"
                />
                <Area
                  label="Logiciels"
                  value={profil.logiciels}
                  onChange={(v) => set({ logiciels: v })}
                  placeholder="Excel, Power BI, Salesforce…"
                />
                <Field
                  label="Langues"
                  value={profil.langues}
                  onChange={(v) => set({ langues: v })}
                  placeholder="Français, anglais, espagnol"
                />
                <Field
                  label="Niveau d'anglais"
                  value={profil.niveauAnglais}
                  onChange={(v) => set({ niveauAnglais: v })}
                  placeholder="C1 / TOEIC 900"
                />
                <Area
                  label="Expériences"
                  value={profil.experiences}
                  onChange={(v) => set({ experiences: v })}
                  placeholder="Stage de 2 mois chez…"
                />
              </Section>
            </TabsContent>

            <TabsContent value="criteres" className="grid gap-6">
              <Section titre="Critères prioritaires">
                {CRITERES.map((c: Critere) => (
                  <div key={c} className="grid gap-2">
                    <Label className="capitalize">{c}</Label>
                    <Select
                      value={profil.criteres[c] ?? "Moyen"}
                      onValueChange={(v) =>
                        set({
                          criteres: {
                            ...profil.criteres,
                            [c]: v as Importance,
                          },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {IMPORTANCES.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </Section>
            </TabsContent>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {user
                  ? "Profil synchronisé sur votre compte."
                  : "Profil enregistré dans ce navigateur. Créez un compte pour le retrouver partout."}
              </p>
              <Button onClick={enregistrer} disabled={saving}>
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                Enregistrer
              </Button>
            </div>
          </Tabs>
        )}
      </div>

      <CvAnalyseDialog
        open={cvOpen}
        onOpenChange={setCvOpen}
        profil={profil}
        cv={profil.cv ?? null}
        onSaveCv={(cv: CvEtat) => {
          const next = { ...profil, cv };
          setProfil(next);
          saveProfilLocal(next);
          if (user) void saveProfilCloud(next, user.id).catch(() => undefined);
        }}
        onAppliquerProfil={(patch) => {
          const next = { ...profil, ...patch };
          setProfil(next);
          saveProfilLocal(next);
          if (user) void saveProfilCloud(next, user.id).catch(() => undefined);
          toast.success("Profil pré-rempli depuis le CV.");
        }}
      />
    </AppShell>
  );
}
