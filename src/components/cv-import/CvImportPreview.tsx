import {
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Award,
  FolderDot,
  Heart,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { CVImportResult } from "@/lib/cv-import/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CvImportPreviewProps {
  result: CVImportResult;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CvImportPreview({
  result,
  onConfirm,
  onCancel,
}: CvImportPreviewProps) {
  const { metadata, warnings } = result;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Aperçu de l'extraction
          </h2>
          <p className="text-sm text-muted-foreground">
            Vérifiez les informations détectées dans votre document.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} className="text-xs">
            Annuler
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs gap-2"
          >
            <CheckCircle2 className="size-4" />
            Importer dans mon profil
          </Button>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="size-4" />
            <span>Remarques sur l'extraction</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            {warnings.map((w, idx) => (
              <li key={idx}>{w.message}</li>
            ))}
          </ul>
        </div>
      )}

      <ScrollArea className="h-[400px] sm:h-[500px] pr-4">
        <div className="space-y-6 pb-6">
          {/* Identité */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
              <span className="flex size-6 rounded bg-card items-center justify-center border border-border/50">
                👤
              </span>
              Identité
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs">Prénom & Nom</span>
                <span className="font-medium">
                  {result.identity.firstName} {result.identity.lastName}
                </span>
              </div>
              {result.identity.professionalTitle && (
                <div>
                  <span className="text-muted-foreground block text-xs">Titre</span>
                  <span className="font-medium">{result.identity.professionalTitle}</span>
                </div>
              )}
              {result.identity.email && (
                <div>
                  <span className="text-muted-foreground block text-xs">Email</span>
                  <span className="font-medium">{result.identity.email}</span>
                </div>
              )}
              {result.identity.city && (
                <div>
                  <span className="text-muted-foreground block text-xs">Ville</span>
                  <span className="font-medium">{result.identity.city}</span>
                </div>
              )}
            </div>
          </section>

          {/* Expériences */}
          {result.experiences.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                <Briefcase className="size-4 text-blue-400" />
                Expériences ({metadata.counts.experiences})
              </h3>
              <div className="space-y-3">
                {result.experiences.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-lg bg-card border border-border/60">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-medium text-sm">{exp.title}</div>
                        <div className="text-xs text-muted-foreground">{exp.company}</div>
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap text-right">
                        {exp.startDate || "?"} <ArrowRight className="inline size-3 mx-1" /> {exp.endDate || (exp.isCurrent ? "Aujourd'hui" : "?")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formations */}
          {result.education.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                <GraduationCap className="size-4 text-purple-400" />
                Formations ({metadata.counts.education})
              </h3>
              <div className="space-y-3">
                {result.education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-lg bg-card border border-border/60">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-medium text-sm">{edu.degree}</div>
                        <div className="text-xs text-muted-foreground">{edu.school}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compétences */}
            {result.skills.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <Wrench className="size-4 text-amber-400" />
                  Compétences ({metadata.counts.skills})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="bg-card font-normal">
                      {skill.name}
                      {skill.level && <span className="opacity-50 ml-1">({skill.level})</span>}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Langues */}
            {result.languages.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <Globe className="size-4 text-teal-400" />
                  Langues ({metadata.counts.languages})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.languages.map((lang) => (
                    <Badge key={lang.id} variant="outline" className="font-normal bg-teal-500/5 text-teal-300 border-teal-500/20">
                      {lang.name}
                      {lang.level && <span className="opacity-60 ml-1">— {lang.level}</span>}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {result.certifications.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <Award className="size-4 text-emerald-400" />
                  Certifications ({metadata.counts.certifications})
                </h3>
                <div className="flex flex-col gap-2">
                  {result.certifications.map((cert) => (
                    <div key={cert.id} className="text-sm flex justify-between bg-card p-2 rounded border border-border/50">
                      <span>{cert.name}</span>
                      {cert.score && <span className="text-emerald-400 font-mono text-xs">{cert.score}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projets */}
            {result.projects.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <FolderDot className="size-4 text-pink-400" />
                  Projets ({metadata.counts.projects})
                </h3>
                <div className="flex flex-col gap-2">
                  {result.projects.map((proj) => (
                    <div key={proj.id} className="text-sm bg-card p-2 rounded border border-border/50">
                      <div className="font-medium">{proj.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Centres d'intérêt */}
            {result.interests.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <Heart className="size-4 text-rose-400" />
                  Centres d'intérêt ({metadata.counts.interests})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.interests.map((int) => (
                    <Badge key={int.id} variant="secondary" className="bg-card font-normal">
                      {int.name}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
