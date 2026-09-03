import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Award,
  FolderDot,
  Heart,
  Users,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Cpu,
  MapPin,
  Calendar,
  Building,
  Link2,
  Check,
  Loader2,
} from "lucide-react";
import type { CvImportResult } from "@/ai/cv-import/cvImport.types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CvImportPreviewProps {
  result: CvImportResult;
  onConfirm: (finalData: CvImportResult) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function CvImportPreview({
  result: initialResult,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: CvImportPreviewProps) {
  const [data, setData] = useState<CvImportResult>(initialResult);

  // Suppression interactive d'un élément avant import
  const handleDeleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const handleDeleteTool = (id: string) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id),
    }));
  };

  const handleDeleteLanguage = (id: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const handleDeleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const handleDeleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleDeleteAssociation = (id: string) => {
    setData((prev) => ({
      ...prev,
      associations: prev.associations.filter((a) => a.id !== id),
    }));
  };

  const handleDeleteInterest = (id: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i.id !== id),
    }));
  };

  const detectedCorrelations =
    data.correlations?.languagesAndCertifications || [];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* En-tête avec actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Aperçu de l'extraction V4 (Zéro Perte)
            </h2>
            <Badge
              variant="outline"
              className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs"
            >
              Fidélité & Exhaustivité Totale
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Toutes les missions, chiffres, formations, corrélations et objets
            riches sont préservés sans troncature ni résumé.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="text-xs h-8"
          >
            Annuler
          </Button>
          <Button
            size="sm"
            disabled={isSubmitting}
            onClick={() => onConfirm(data)}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs h-8 gap-2 shadow-sm shadow-purple-600/30"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enregistrement persistant...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Importer dans mon profil
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Corrélations détectées */}
      {detectedCorrelations.length > 0 && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-emerald-400">
            <Link2 className="size-4 shrink-0" />
            <span>
              Corrélations certifiées et scores rattachés (
              {detectedCorrelations.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {detectedCorrelations.map((corr, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-card/60 border border-emerald-500/20"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {corr.language}
                  </span>
                  {corr.level && (
                    <Badge variant="outline" className="text-[10px] py-0">
                      {corr.level}
                    </Badge>
                  )}
                  <ArrowRight className="size-3 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">
                    {corr.certificationName}
                  </span>
                </div>
                {corr.score && (
                  <Badge className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                    {corr.score}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avertissements / Audit */}
      {data.audit.warnings && data.audit.warnings.length > 0 && (
        <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="size-4 shrink-0" />
            <span>Remarques sur le document</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {data.audit.warnings.map((w, idx) => (
              <li key={idx}>{w.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Zone de prévisualisation scrollable */}
      <ScrollArea className="h-[600px] rounded-xl border border-border/70 p-4 bg-background/50">
        <div className="space-y-6 pr-3">
          {/* Identité & Coordonnées */}
          <section className="p-4 rounded-xl bg-card border border-border/70 space-y-3 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Identité & Coordonnées
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px]">
                  Nom complet
                </span>
                <span className="font-semibold text-foreground">
                  {data.identity.firstName} {data.identity.lastName}
                </span>
              </div>

              {data.identity.professionalTitle && (
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    Titre professionnel
                  </span>
                  <span className="font-medium text-foreground">
                    {data.identity.professionalTitle}
                  </span>
                </div>
              )}

              {data.identity.email && (
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    Email
                  </span>
                  <span className="font-mono text-foreground">
                    {data.identity.email}
                  </span>
                </div>
              )}

              {data.identity.phone && (
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    Téléphone
                  </span>
                  <span className="font-mono text-foreground">
                    {data.identity.phone}
                  </span>
                </div>
              )}

              {data.identity.city && (
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    Localisation
                  </span>
                  <span className="font-medium text-foreground">
                    {data.identity.city}
                    {data.identity.postalCode
                      ? ` (${data.identity.postalCode})`
                      : ""}
                  </span>
                </div>
              )}

              {data.identity.drivingLicense && (
                <div>
                  <span className="text-muted-foreground block text-[11px]">
                    Permis & Mobilité
                  </span>
                  <span className="font-medium text-foreground">
                    {data.identity.drivingLicense}
                    {data.identity.mobility
                      ? ` • ${data.identity.mobility}`
                      : ""}
                  </span>
                </div>
              )}

              {data.identity.linkedin && (
                <div className="truncate">
                  <span className="text-muted-foreground block text-[11px]">
                    LinkedIn
                  </span>
                  <span className="font-mono text-purple-400 truncate block">
                    {data.identity.linkedin}
                  </span>
                </div>
              )}
            </div>

            {data.summary.shortBio && (
              <div className="mt-2 pt-2 border-t border-border/30 text-xs">
                <span className="text-muted-foreground block text-[11px] mb-1">
                  Accroche / Résumé
                </span>
                <p className="text-muted-foreground/90 italic bg-background/50 p-2 rounded-lg border border-border/30">
                  "{data.summary.shortBio}"
                </p>
              </div>
            )}
          </section>

          {/* Expériences professionnelles */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Briefcase className="size-4 text-blue-400" />
                <span>
                  Expériences professionnelles ({data.experiences.length})
                </span>
              </h3>
            </div>

            {data.experiences.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                Aucune expérience professionnelle détectée.
              </p>
            ) : (
              <div className="space-y-3">
                {data.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="group relative p-3.5 rounded-xl bg-card border border-border/70 hover:border-border transition-all space-y-2.5 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">
                            {exp.title}
                          </h4>
                          {exp.contractType && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] py-0 px-1.5 font-normal"
                            >
                              {exp.contractType}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1 font-medium text-foreground/90">
                            <Building className="size-3 text-muted-foreground" />
                            {exp.company}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1.5 font-mono">
                          <Calendar className="size-3" />
                          <span>{exp.startDate || "Date non précisée"}</span>
                          <ArrowRight className="size-3" />
                          <span>
                            {exp.endDate ||
                              (exp.isCurrent
                                ? "Aujourd'hui"
                                : "Date non précisée")}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity p-1"
                          title="Supprimer cette expérience"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-xs text-foreground/80 italic">
                        {exp.description}
                      </p>
                    )}

                    {/* Missions & Responsabilités exhaustives */}
                    {exp.missions && exp.missions.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                          Missions & Responsabilités ({exp.missions.length})
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                          {exp.missions.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Résultats quantifiés & KPIs */}
                    {((exp.results && exp.results.length > 0) ||
                      (exp.achievements && exp.achievements.length > 0)) && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                          Résultats & Réalisations chiffrées
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(exp.results?.length
                            ? exp.results
                            : exp.achievements
                          ).map((res, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-xs py-0.5"
                            >
                              <Check className="size-3 mr-1" />
                              {res}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Outils & Technologies */}
                    {exp.tools && exp.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.tools.map((tool, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-[10px] py-0 bg-background/50 text-muted-foreground"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Formations */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <GraduationCap className="size-4 text-purple-400" />
                <span>Formations & Diplômes ({data.education.length})</span>
              </h3>
            </div>

            {data.education.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                Aucune formation détectée.
              </p>
            ) : (
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="group relative p-3.5 rounded-xl bg-card border border-border/70 hover:border-border transition-all space-y-1.5 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">
                            {edu.degree}
                          </h4>
                          {edu.grade && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-purple-400 border-purple-500/20 py-0"
                            >
                              {edu.grade}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                          {edu.school}
                          {edu.location ? ` • ${edu.location}` : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                          {edu.startDate || ""}
                          {edu.startDate && edu.endDate ? " → " : ""}
                          {edu.endDate || (edu.isCurrent ? "En cours" : "")}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity p-1"
                          title="Supprimer cette formation"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {edu.track && (
                      <p className="text-xs font-medium text-purple-400/90">
                        Parcours : {edu.track}
                      </p>
                    )}

                    {edu.specialization && (
                      <p className="text-xs text-muted-foreground">
                        Spécialisation : {edu.specialization}
                      </p>
                    )}

                    {edu.keyCourses && edu.keyCourses.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {edu.keyCourses.map((c, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-[10px] py-0"
                          >
                            {c}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Grille 2 colonnes : Certifications vs Langues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Certifications & Tests */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Award className="size-4 text-emerald-400" />
                  <span>
                    Certifications & Tests ({data.certifications.length})
                  </span>
                </h3>
              </div>

              {data.certifications.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Aucune certification détectée.
                </p>
              ) : (
                <div className="space-y-2">
                  {data.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="group flex justify-between items-center p-2.5 rounded-lg bg-card border border-border/60 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-foreground">
                            {cert.name}
                          </span>
                          {cert.language && (
                            <Badge
                              variant="outline"
                              className="text-[9px] py-0 text-muted-foreground"
                            >
                              {cert.language}
                            </Badge>
                          )}
                        </div>
                        {cert.organization && (
                          <span className="text-muted-foreground block text-[11px]">
                            {cert.organization}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {cert.score && (
                          <Badge
                            variant="secondary"
                            className="font-mono text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                          >
                            {cert.score}
                          </Badge>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteCertification(cert.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity"
                          title="Supprimer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Langues */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Globe className="size-4 text-teal-400" />
                  <span>Langues parlées ({data.languages.length})</span>
                </h3>
              </div>

              {data.languages.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Aucune langue détectée.
                </p>
              ) : (
                <div className="space-y-2">
                  {data.languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="group flex justify-between items-center p-2.5 rounded-lg bg-card border border-border/60 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-foreground">
                          {lang.name}
                        </span>
                        {lang.associatedCertification && (
                          <span className="text-muted-foreground block text-[11px]">
                            Test : {lang.associatedCertification}
                            {lang.score ? ` (${lang.score})` : ""}
                          </span>
                        )}
                        {lang.attestation && (
                          <span className="text-teal-400/80 block text-[10px]">
                            ✓ {lang.attestation}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {lang.level && (
                          <Badge
                            variant="outline"
                            className="bg-teal-500/10 text-teal-300 border-teal-500/20 font-medium"
                          >
                            {lang.level}
                          </Badge>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteLanguage(lang.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity"
                          title="Supprimer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Grille : Outils logiciels vs Compétences métier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Outils & Logiciels */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Cpu className="size-4 text-cyan-400" />
                  <span>Outils & Logiciels ({data.tools.length})</span>
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {data.tools.map((tool) => (
                  <Badge
                    key={tool.id}
                    variant="secondary"
                    className="group bg-card hover:border-cyan-500/30 text-foreground text-xs py-1 px-2.5 font-normal flex items-center gap-1.5"
                  >
                    <span>{tool.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTool(tool.id)}
                      className="opacity-40 group-hover:opacity-100 hover:text-red-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </section>

            {/* Compétences techniques & métier */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Wrench className="size-4 text-amber-400" />
                  <span>Compétences métier ({data.skills.length})</span>
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="group bg-card hover:border-amber-500/30 text-foreground text-xs py-1 px-2.5 font-normal flex items-center gap-1.5"
                  >
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-muted-foreground">
                        ({skill.level})
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="opacity-40 group-hover:opacity-100 hover:text-red-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Projets & Réalisations (Objets riches) */}
          {data.projects.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <FolderDot className="size-4 text-pink-400" />
                  <span>Projets & Réalisations ({data.projects.length})</span>
                </h3>
              </div>

              <div className="space-y-2">
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group p-3.5 rounded-xl bg-card border border-border/60 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm text-foreground">
                            {proj.name}
                          </h4>
                          {proj.type && (
                            <Badge
                              variant="outline"
                              className="text-[10px] py-0"
                            >
                              {proj.type}
                            </Badge>
                          )}
                        </div>
                        {proj.context && (
                          <p className="text-[11px] text-pink-400 font-medium mt-0.5">
                            Cadre : {proj.context}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-1"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    {proj.description && (
                      <p className="text-muted-foreground">
                        {proj.description}
                      </p>
                    )}

                    {proj.tools && proj.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.tools.map((t, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-[10px] py-0"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Associations & Engagements (Objets riches) */}
          {data.associations.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Users className="size-4 text-violet-400" />
                  <span>
                    Engagements associatifs ({data.associations.length})
                  </span>
                </h3>
              </div>

              <div className="space-y-2">
                {data.associations.map((asso) => (
                  <div
                    key={asso.id}
                    className="group p-3.5 rounded-xl bg-card border border-border/60 text-xs space-y-1.5"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground">
                            {asso.organization}
                          </span>
                          {asso.teamSize && (
                            <Badge className="bg-violet-500/20 text-violet-300 text-[10px] py-0">
                              {asso.teamSize}
                            </Badge>
                          )}
                        </div>
                        {asso.role && (
                          <span className="text-muted-foreground block text-[11px] font-medium mt-0.5">
                            Rôle : {asso.role}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteAssociation(asso.id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-1"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    {asso.description && (
                      <p className="text-muted-foreground">
                        {asso.description}
                      </p>
                    )}

                    {asso.missions && asso.missions.length > 0 && (
                      <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground text-[11px]">
                        {asso.missions.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Centres d'intérêt (avec sous-thèmes) */}
          {data.interests.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Heart className="size-4 text-rose-400" />
                  <span>Centres d'intérêt ({data.interests.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {data.interests.map((int) => (
                  <div
                    key={int.id}
                    className="group p-2.5 rounded-lg bg-card border border-border/60 text-xs flex justify-between items-start gap-2"
                  >
                    <div>
                      <span className="font-semibold text-foreground">
                        {int.name}
                      </span>
                      {int.subtopics && int.subtopics.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {int.subtopics.map((st, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-[10px] py-0 text-muted-foreground"
                            >
                              {st}
                            </Badge>
                          ))}
                        </div>
                      ) : int.details ? (
                        <span className="text-muted-foreground block text-[11px] mt-0.5">
                          {int.details}
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteInterest(int.id)}
                      className="opacity-0 group-hover:opacity-100 hover:text-red-400 text-muted-foreground"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
