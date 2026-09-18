import {
  Building2,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
  Briefcase,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getContactFullName,
  getContactCompany,
  getContactJobTitle,
  getInitials,
  getCategoryBadgeStyle,
  SOURCE_LABELS,
  type Contact,
} from "@/lib/contacts";
import type { Candidature } from "@/lib/candidatures";

type ContactCardProps = {
  contact: Contact;
  candidatures?: Candidature[];
  hideCompanyTag?: boolean;
  onOpenDetails?: (contact: Contact) => void;
  onOpenMessageIa?: (contact: Contact) => void;
  onOpenOpportunity?: (oppId: string) => void;
};

export function ContactCard({
  contact,
  candidatures = [],
  hideCompanyTag = false,
  onOpenDetails,
  onOpenMessageIa,
  onOpenOpportunity,
}: ContactCardProps) {
  const fullName = getContactFullName(contact) || "Sans nom";
  const company = getContactCompany(contact);
  const jobTitle = getContactJobTitle(contact);
  const initials = getInitials(contact);

  const opps = candidatures.filter(
    (c) => contact.candidatureIds?.includes(c.id) || c.contactId === contact.id,
  );

  const sources =
    contact.sources && contact.sources.length > 0
      ? contact.sources
      : [contact.source || "manual"];

  // Filtrer pour supprimer le petit badge LinkedIn des sources
  const nonLinkedinSources = sources.filter((s) => s !== "linkedin");

  // Score de pertinence
  const score = contact.relevanceScore;
  let scoreClass = "bg-slate-500/15 text-slate-300 border-slate-500/30";
  if (score !== undefined) {
    if (score >= 80)
      scoreClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    else if (score >= 60)
      scoreClass = "bg-sky-500/15 text-sky-300 border-sky-500/30";
    else scoreClass = "bg-slate-500/15 text-slate-300 border-slate-500/30";
  }

  // Badge unique : catégorie IA prioritaire avec style de couleur dédié
  const displayCategory = contact.category;
  const catStyle = getCategoryBadgeStyle(displayCategory);
  const showTypeInstead =
    !displayCategory &&
    contact.type &&
    !["Contact professionnel", "Contact", "Autre"].includes(contact.type);

  return (
    <div
      onClick={() => onOpenDetails?.(contact)}
      className="glass-card-interactive group relative flex flex-col justify-between p-3.5 rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-2xl hover:bg-white/[0.08] hover:border-white/25 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_16px_44px_-4px_rgba(0,0,0,0.55),inset_0_1px_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 h-full cursor-pointer overflow-hidden"
    >
      <div className="space-y-2.5">
        {/* En-tête : Avatar + Nom & Poste + Badge IA/Source */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-indigo-600/25 border border-indigo-500/35 text-indigo-100 font-bold text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-xs text-foreground group-hover:text-indigo-300 transition-colors leading-tight line-clamp-2 break-words">
                {fullName}
              </h3>
              <p className="text-[11px] text-muted-foreground/90 font-medium line-clamp-2 break-words mt-0.5">
                {jobTitle || "Poste non précisé"}
              </p>
            </div>
          </div>

          {/* Badges IA & Sources & Score (alignement vertical propre) */}
          <div className="shrink-0 flex flex-col items-end gap-1">
            {score !== undefined && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${scoreClass}`}
                title="Score de pertinence calculé"
              >
                <span>⚡ {score}%</span>
              </span>
            )}
            {displayCategory && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${catStyle.fullClass}`}
              >
                <Sparkles className="size-2.5 shrink-0 opacity-80" />
                <span>{displayCategory}</span>
              </span>
            )}
            {showTypeInstead && (
              <span className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {contact.type}
              </span>
            )}

            {nonLinkedinSources.length > 0 && (
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-0.5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                {nonLinkedinSources.map((src) => (
                  <span
                    key={src}
                    className="inline-flex items-center text-[9px] text-muted-foreground/80"
                    title={`Source: ${
                      SOURCE_LABELS[src as keyof typeof SOURCE_LABELS] || src
                    }`}
                  >
                    {src === "phone" && (
                      <Smartphone className="size-2.5 text-emerald-400" />
                    )}
                    {src === "opportunity" && (
                      <Briefcase className="size-2.5 text-primary" />
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bloc Informations : Entreprise & Bouton LinkedIn sur la même ligne */}
        <div className="space-y-1.5 pt-0.5">
          {((company && !hideCompanyTag) || contact.linkedin) && (
            <div className="flex items-center justify-between gap-1.5 min-w-0">
              {company && !hideCompanyTag && (
                <span
                  title={company}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/12 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] min-w-0 truncate"
                >
                  <Building2 className="size-3 shrink-0 text-indigo-400" />
                  <span className="truncate">{company}</span>
                </span>
              )}

              {contact.linkedin && (
                <a
                  href={
                    contact.linkedin.startsWith("http")
                      ? contact.linkedin
                      : `https://${contact.linkedin}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 h-6 rounded-lg bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/30 px-2 text-[10px] text-[#0A66C2] font-medium backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all shrink-0 ml-auto"
                >
                  <Linkedin className="size-2.5 shrink-0" />
                  <span>LinkedIn</span>
                  <ExternalLink className="size-2 shrink-0" />
                </a>
              )}
            </div>
          )}

          {/* Rangée de coordonnées (Mail, Tel) en pills de verre */}
          {(contact.email || contact.telephone) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  onClick={(e) => e.stopPropagation()}
                  title={contact.email}
                  className="inline-flex items-center gap-1.5 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2 text-[10px] text-muted-foreground hover:text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all max-w-[140px] truncate"
                >
                  <Mail className="size-2.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}

              {contact.telephone && (
                <a
                  href={`tel:${contact.telephone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-2 text-[10px] text-muted-foreground hover:text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all"
                >
                  <Phone className="size-2.5 text-muted-foreground shrink-0" />
                  <span>{contact.telephone}</span>
                </a>
              )}
            </div>
          )}

          {/* Points de connexion détectés */}
          {contact.connectionPoints && contact.connectionPoints.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {contact.connectionPoints.slice(0, 2).map((pt, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-0.5 text-[9.5px] font-medium text-indigo-200 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                >
                  <Sparkles className="size-2 text-indigo-400 shrink-0" />
                  <span className="truncate max-w-[210px]">{pt}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Opportunités rattachées si présentes */}
        {opps.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1.5 space-y-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
            {opps.slice(0, 1).map((opp) => (
              <button
                key={opp.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOpportunity?.(opp.id);
                }}
                className="w-full flex items-center justify-between gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-2 py-1 text-left text-[10px] transition-all border border-white/5"
              >
                <span className="truncate font-medium text-foreground">
                  {opp.poste || "Offre"}
                </span>
                <span className="shrink-0 text-[9px] font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-1.5 py-0.5 rounded-md backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  {opp.currentStage || opp.statut}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bas de carte fixe avec alignement de verre liquide */}
      <div className="mt-3 pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 text-[10px]">
        <span className="text-muted-foreground/80 font-medium shrink-0">
          {contact.historique?.length || 0} échange
          {(contact.historique?.length || 0) > 1 ? "s" : ""}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenMessageIa) {
                onOpenMessageIa(contact);
              } else {
                onOpenDetails?.(contact);
              }
            }}
            className="h-6.5 px-2.5 text-[10px] text-indigo-200 hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/35 font-semibold gap-1 rounded-lg backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(99,102,241,0.2)] transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Sparkles className="size-2.5 text-indigo-400" /> Message IA
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails?.(contact);
            }}
            className="h-6.5 px-2.5 text-[10px] text-muted-foreground hover:text-foreground font-medium rounded-lg hover:bg-white/10 backdrop-blur-md transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            Détails
          </Button>
        </div>
      </div>
    </div>
  );
}
