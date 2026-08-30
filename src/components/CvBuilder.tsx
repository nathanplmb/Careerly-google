import { useState } from "react";
import {
  Award,
  Briefcase,
  ChevronDown,
  GraduationCap,
  Heart,
  Languages,
  Lightbulb,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  NIVEAUX_COMPETENCE,
  NIVEAUX_LANGUE,
  completionCv,
  nouveauBenevolat,
  nouveauProjet,
  nouvelleCertification,
  nouvelleCompetence,
  nouvelleExperience,
  nouvelleFormation,
  nouvelleLangue,
  type CvStructure,
  type NiveauCompetence,
  type NiveauLangue,
} from "@/lib/cv-structure";

type Props = {
  value: CvStructure;
  onChange: (cv: CvStructure) => void;
};

function Champ({
  label,
  value,
  onChange,
  placeholder,
  className,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
}) {
  return (
    <div className={cn("grid min-w-0 gap-1.5", className)}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Bloc({
  icone: Icone,
  titre,
  compte,
  onAjouter,
  labelAjout,
  children,
  defaultOpen,
}: {
  icone: typeof Briefcase;
  titre: string;
  compte: number;
  onAjouter: () => void;
  labelAjout: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <section className="glass-card overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icone className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              {titre}
            </span>
            <span className="block text-xs text-muted-foreground">
              {compte} élément{compte > 1 ? "s" : ""}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <Button size="sm" variant="outline" onClick={onAjouter}>
          <Plus className="size-4" /> {labelAjout}
        </Button>
      </header>
      {open && (
        <div className="grid gap-4 border-t border-border/60 p-4 sm:p-5">
          {children}
        </div>
      )}
    </section>
  );
}

function Carte({
  titre,
  sousTitre,
  onSupprimer,
  children,
}: {
  titre: string;
  sousTitre?: string;
  onSupprimer: () => void;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {titre || "Nouvel élément"}
          </p>
          {sousTitre && (
            <p className="truncate text-xs text-muted-foreground">
              {sousTitre}
            </p>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 text-muted-foreground hover:text-destructive"
          onClick={onSupprimer}
          aria-label="Supprimer"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <div className="grid gap-3">{children}</div>
    </article>
  );
}

function ListePuces({
  label,
  valeurs,
  onChange,
  placeholder,
}: {
  label: string;
  valeurs: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-xs"
          onClick={() => onChange([...valeurs, ""])}
        >
          <Plus className="size-3.5" /> Ajouter
        </Button>
      </div>
      {valeurs.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Aucune ligne pour l'instant.
        </p>
      )}
      {valeurs.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={v}
            placeholder={placeholder}
            onChange={(e) => {
              const next = [...valeurs];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => onChange(valeurs.filter((_, j) => j !== i))}
            aria-label="Retirer"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

const ONGLETS = [
  { id: "identite", label: "Identité", icone: UserRound },
  { id: "experiences", label: "Expériences", icone: Briefcase },
  { id: "formations", label: "Formations", icone: GraduationCap },
  { id: "competences", label: "Compétences & langues", icone: Wrench },
  { id: "realisations", label: "Certifs & projets", icone: Award },
  { id: "engagements", label: "Engagements", icone: Heart },
] as const;

type OngletId = (typeof ONGLETS)[number]["id"];

export function CvBuilder({ value, onChange }: Props) {
  const [onglet, setOnglet] = useState<OngletId>("identite");
  const set = (patch: Partial<CvStructure>) => onChange({ ...value, ...patch });

  const maj = <K extends keyof CvStructure>(
    cle: K,
    index: number,
    patch: Partial<CvStructure[K] extends (infer T)[] ? T : never>,
  ) => {
    const liste = value[cle] as unknown as Record<string, unknown>[];
    const next = liste.map((x, i) => (i === index ? { ...x, ...patch } : x));
    set({ [cle]: next } as unknown as Partial<CvStructure>);
  };
  const retirer = (cle: keyof CvStructure, index: number) => {
    const liste = value[cle] as unknown as unknown[];
    set({
      [cle]: liste.filter((_, i) => i !== index),
    } as unknown as Partial<CvStructure>);
  };

  const completion = completionCv(value);

  return (
    <div className="grid gap-5">
      <div className="glass-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-primary" /> Complétion de votre CV
          </div>
          <span className="text-sm font-semibold text-primary">
            {completion} %
          </span>
        </div>
        <Progress value={completion} className="mt-3 h-2" />
        <p className="mt-2 text-xs text-muted-foreground">
          Plus votre CV est détaillé, plus le Match IA et la préparation aux
          entretiens sont précis.
        </p>
      </div>
      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {ONGLETS.map((o) => {
          const Icone = o.icone;
          const actif = onglet === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setOnglet(o.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition",
                actif
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground",
              )}
            >
              <Icone className="size-3.5" /> {o.label}
            </button>
          );
        })}
      </nav>

      {onglet === "identite" && (
        <>
          {/* Identité */}
          <section className="glass-card p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="size-4" />
              </span>
              <h3 className="text-sm font-semibold">En-tête du CV</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Champ
                label="Titre du CV"
                value={value.titre}
                onChange={(v) => set({ titre: v })}
                placeholder="Étudiant M1 — Marketing digital"
              />
              <Champ
                label="Ville"
                value={value.ville}
                onChange={(v) => set({ ville: v })}
                placeholder="Paris"
              />
              <Champ
                label="Email"
                value={value.email}
                onChange={(v) => set({ email: v })}
                placeholder="prenom.nom@email.com"
              />
              <Champ
                label="Téléphone"
                value={value.telephone}
                onChange={(v) => set({ telephone: v })}
              />
              <Champ
                label="LinkedIn"
                value={value.linkedin}
                onChange={(v) => set({ linkedin: v })}
                placeholder="linkedin.com/in/…"
              />
              <Champ
                label="Portfolio / site"
                value={value.portfolio}
                onChange={(v) => set({ portfolio: v })}
              />
              <Champ
                label="Permis / mobilité"
                value={value.permis}
                onChange={(v) => set({ permis: v })}
                placeholder="Permis B, véhiculé"
              />
              <div className="grid gap-1.5 sm:col-span-2">
                <Label className="text-xs text-muted-foreground">
                  Accroche
                </Label>
                <Textarea
                  rows={3}
                  value={value.accroche}
                  onChange={(e) => set({ accroche: e.target.value })}
                  placeholder="2 à 3 phrases sur votre projet et votre valeur ajoutée."
                />
              </div>
            </div>
          </section>
        </>
      )}

      {onglet === "experiences" && (
        <>
          {/* Expériences */}

          <Bloc
            icone={Briefcase}
            titre="Expériences"
            compte={value.experiences.length}
            labelAjout="Expérience"
            onAjouter={() =>
              set({ experiences: [...value.experiences, nouvelleExperience()] })
            }
          >
            {value.experiences.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Ajoutez vos stages, alternances, jobs et missions.
              </p>
            )}
            {value.experiences.map((e, i) => (
              <Carte
                key={e.id}
                titre={e.poste}
                sousTitre={[e.entreprise, e.lieu].filter(Boolean).join(" · ")}
                onSupprimer={() => retirer("experiences", i)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Champ
                    label="Poste"
                    value={e.poste}
                    onChange={(v) => maj("experiences", i, { poste: v })}
                  />
                  <Champ
                    label="Entreprise"
                    value={e.entreprise}
                    onChange={(v) => maj("experiences", i, { entreprise: v })}
                  />
                  <Champ
                    label="Lieu"
                    value={e.lieu}
                    onChange={(v) => maj("experiences", i, { lieu: v })}
                  />
                  <Champ
                    label="Type de contrat"
                    value={e.contrat}
                    onChange={(v) => maj("experiences", i, { contrat: v })}
                    placeholder="Stage, alternance, CDD…"
                  />
                  <Champ
                    label="Début"
                    value={e.debut}
                    onChange={(v) => maj("experiences", i, { debut: v })}
                    placeholder="09/2024"
                  />
                  <Champ
                    label="Fin"
                    value={e.fin}
                    onChange={(v) => maj("experiences", i, { fin: v })}
                    placeholder="02/2025"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Switch
                    checked={e.enCours}
                    onCheckedChange={(v) =>
                      maj("experiences", i, { enCours: v })
                    }
                  />
                  Poste actuel
                </label>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Contexte / missions
                  </Label>
                  <Textarea
                    rows={3}
                    value={e.description}
                    onChange={(ev) =>
                      maj("experiences", i, { description: ev.target.value })
                    }
                  />
                </div>
                <ListePuces
                  label="Réalisations (une par ligne)"
                  valeurs={e.realisations}
                  placeholder="Augmenté le taux d'ouverture de 18 %"
                  onChange={(v) => maj("experiences", i, { realisations: v })}
                />
                <ListePuces
                  label="Compétences mobilisées"
                  valeurs={e.competences}
                  placeholder="Excel avancé"
                  onChange={(v) => maj("experiences", i, { competences: v })}
                />
              </Carte>
            ))}
          </Bloc>
        </>
      )}

      {onglet === "formations" && (
        <>
          {/* Formations */}

          <Bloc
            icone={GraduationCap}
            titre="Formations"
            compte={value.formations.length}
            labelAjout="Formation"
            onAjouter={() =>
              set({ formations: [...value.formations, nouvelleFormation()] })
            }
          >
            {value.formations.map((f, i) => (
              <Carte
                key={f.id}
                titre={f.diplome}
                sousTitre={f.etablissement}
                onSupprimer={() => retirer("formations", i)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Champ
                    label="Diplôme"
                    value={f.diplome}
                    onChange={(v) => maj("formations", i, { diplome: v })}
                  />
                  <Champ
                    label="Établissement"
                    value={f.etablissement}
                    onChange={(v) => maj("formations", i, { etablissement: v })}
                  />
                  <Champ
                    label="Lieu"
                    value={f.lieu}
                    onChange={(v) => maj("formations", i, { lieu: v })}
                  />
                  <Champ
                    label="Mention"
                    value={f.mention}
                    onChange={(v) => maj("formations", i, { mention: v })}
                  />
                  <Champ
                    label="Début"
                    value={f.debut}
                    onChange={(v) => maj("formations", i, { debut: v })}
                    placeholder="2023"
                  />
                  <Champ
                    label="Fin"
                    value={f.fin}
                    onChange={(v) => maj("formations", i, { fin: v })}
                    placeholder="2026"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Spécialisations, cours clés, projets
                  </Label>
                  <Textarea
                    rows={2}
                    value={f.details}
                    onChange={(ev) =>
                      maj("formations", i, { details: ev.target.value })
                    }
                  />
                </div>
              </Carte>
            ))}
          </Bloc>
        </>
      )}

      {onglet === "competences" && (
        <>
          {/* Compétences */}

          <Bloc
            icone={Wrench}
            titre="Compétences"
            compte={value.competences.length}
            labelAjout="Compétence"
            onAjouter={() =>
              set({ competences: [...value.competences, nouvelleCompetence()] })
            }
          >
            {value.competences.map((c, i) => (
              <div
                key={c.id}
                className="grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <Champ
                  label="Compétence"
                  value={c.nom}
                  onChange={(v) => maj("competences", i, { nom: v })}
                />
                <Champ
                  label="Catégorie"
                  value={c.categorie}
                  onChange={(v) => maj("competences", i, { categorie: v })}
                  placeholder="Technique, logiciel, soft skill…"
                />
                <div className="grid min-w-0 gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Niveau
                  </Label>
                  <Select
                    value={c.niveau}
                    onValueChange={(v) =>
                      maj("competences", i, { niveau: v as NiveauCompetence })
                    }
                  >
                    <SelectTrigger className="min-w-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NIVEAUX_COMPETENCE.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-9 text-muted-foreground hover:text-destructive"
                  onClick={() => retirer("competences", i)}
                  aria-label="Supprimer"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </Bloc>

          {/* Langues */}
          <Bloc
            icone={Languages}
            titre="Langues"
            compte={value.langues.length}
            labelAjout="Langue"
            onAjouter={() =>
              set({ langues: [...value.langues, nouvelleLangue()] })
            }
          >
            {value.langues.map((l, i) => (
              <div
                key={l.id}
                className="grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
              >
                <Champ
                  label="Langue"
                  value={l.nom}
                  onChange={(v) => maj("langues", i, { nom: v })}
                />
                <div className="grid min-w-0 gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Niveau
                  </Label>
                  <Select
                    value={l.niveau}
                    onValueChange={(v) =>
                      maj("langues", i, { niveau: v as NiveauLangue })
                    }
                  >
                    <SelectTrigger className="min-w-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NIVEAUX_LANGUE.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Champ
                  label="Certification"
                  value={l.certification}
                  onChange={(v) => maj("langues", i, { certification: v })}
                  placeholder="TOEIC 900"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-9 text-muted-foreground hover:text-destructive"
                  onClick={() => retirer("langues", i)}
                  aria-label="Supprimer"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </Bloc>
        </>
      )}

      {onglet === "realisations" && (
        <>
          {/* Certifications */}

          <Bloc
            icone={Award}
            titre="Certifications & diplômes complémentaires"
            compte={value.certifications.length}
            labelAjout="Certification"
            onAjouter={() =>
              set({
                certifications: [
                  ...value.certifications,
                  nouvelleCertification(),
                ],
              })
            }
          >
            {value.certifications.map((c, i) => (
              <Carte
                key={c.id}
                titre={c.nom}
                sousTitre={c.organisme}
                onSupprimer={() => retirer("certifications", i)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Champ
                    label="Intitulé"
                    value={c.nom}
                    onChange={(v) => maj("certifications", i, { nom: v })}
                  />
                  <Champ
                    label="Organisme"
                    value={c.organisme}
                    onChange={(v) => maj("certifications", i, { organisme: v })}
                  />
                  <Champ
                    label="Date d'obtention"
                    value={c.date}
                    onChange={(v) => maj("certifications", i, { date: v })}
                    placeholder="06/2025"
                  />
                  <Champ
                    label="Identifiant / score"
                    value={c.identifiant}
                    onChange={(v) =>
                      maj("certifications", i, { identifiant: v })
                    }
                  />
                  <Champ
                    label="Lien"
                    value={c.lien}
                    onChange={(v) => maj("certifications", i, { lien: v })}
                    className="sm:col-span-2"
                  />
                </div>
              </Carte>
            ))}
          </Bloc>

          {/* Projets */}
          <Bloc
            icone={Lightbulb}
            titre="Projets"
            compte={value.projets.length}
            labelAjout="Projet"
            onAjouter={() =>
              set({ projets: [...value.projets, nouveauProjet()] })
            }
          >
            {value.projets.map((p, i) => (
              <Carte
                key={p.id}
                titre={p.nom}
                sousTitre={p.role}
                onSupprimer={() => retirer("projets", i)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Champ
                    label="Nom du projet"
                    value={p.nom}
                    onChange={(v) => maj("projets", i, { nom: v })}
                  />
                  <Champ
                    label="Votre rôle"
                    value={p.role}
                    onChange={(v) => maj("projets", i, { role: v })}
                  />
                  <Champ
                    label="Période"
                    value={p.periode}
                    onChange={(v) => maj("projets", i, { periode: v })}
                  />
                  <Champ
                    label="Lien"
                    value={p.lien}
                    onChange={(v) => maj("projets", i, { lien: v })}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <Textarea
                    rows={3}
                    value={p.description}
                    onChange={(ev) =>
                      maj("projets", i, { description: ev.target.value })
                    }
                  />
                </div>
              </Carte>
            ))}
          </Bloc>
        </>
      )}

      {onglet === "engagements" && (
        <>
          {/* Engagements */}
          <Bloc
            icone={Heart}
            titre="Engagements & centres d'intérêt"
            compte={value.benevolats.length + value.interets.length}
            labelAjout="Engagement"
            onAjouter={() =>
              set({ benevolats: [...value.benevolats, nouveauBenevolat()] })
            }
          >
            {value.benevolats.map((b, i) => (
              <Carte
                key={b.id}
                titre={b.role}
                sousTitre={b.organisation}
                onSupprimer={() => retirer("benevolats", i)}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Champ
                    label="Rôle"
                    value={b.role}
                    onChange={(v) => maj("benevolats", i, { role: v })}
                  />
                  <Champ
                    label="Organisation"
                    value={b.organisation}
                    onChange={(v) => maj("benevolats", i, { organisation: v })}
                  />
                  <Champ
                    label="Période"
                    value={b.periode}
                    onChange={(v) => maj("benevolats", i, { periode: v })}
                    className="sm:col-span-2"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <Textarea
                    rows={2}
                    value={b.description}
                    onChange={(ev) =>
                      maj("benevolats", i, { description: ev.target.value })
                    }
                  />
                </div>
              </Carte>
            ))}
            <ListePuces
              label="Centres d'intérêt"
              valeurs={value.interets}
              placeholder="Course à pied, photographie…"
              onChange={(v) => set({ interets: v })}
            />
          </Bloc>
        </>
      )}
    </div>
  );
}
