/** Génération d'un fichier .ics à partir des échéances Careerly (Google/Apple/Outlook). */
import type { Candidature } from "./candidatures";

export type EvenementIcs = {
  uid: string;
  date: string; // yyyy-mm-dd
  titre: string;
  description: string;
};

function echapper(v: string): string {
  return v
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function compact(date: string): string {
  return date.replace(/-/g, "");
}

export function evenementsDepuisCandidatures(
  items: Candidature[],
): EvenementIcs[] {
  const evts: EvenementIcs[] = [];
  for (const c of items) {
    if (c.archive) continue;
    const libelle = [c.entreprise, c.poste].filter(Boolean).join(" — ");
    if (c.dateLimite)
      evts.push({
        uid: `${c.id}-limite`,
        date: c.dateLimite,
        titre: `Date limite : ${libelle}`,
        description: `Dernier jour pour postuler.${c.lien ? ` ${c.lien}` : ""}`,
      });
    if (c.dateRelance)
      evts.push({
        uid: `${c.id}-relance`,
        date: c.dateRelance,
        titre: `Relance : ${libelle}`,
        description: "Relance prévue depuis Careerly.",
      });
    if (c.statut === "J'ai un entretien" && c.dateDernierContact)
      evts.push({
        uid: `${c.id}-entretien`,
        date: c.dateDernierContact,
        titre: `Entretien : ${libelle}`,
        description: "Entretien suivi dans Careerly.",
      });
  }
  return evts;
}

export function construireIcs(evts: EvenementIcs[]): string {
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lignes = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Careerly//Suivi de candidatures//FR",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Careerly",
  ];
  for (const e of evts) {
    const debut = compact(e.date);
    const fin = compact(
      new Date(new Date(e.date).getTime() + 86400000)
        .toISOString()
        .slice(0, 10),
    );
    lignes.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}@careerly`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${debut}`,
      `DTEND;VALUE=DATE:${fin}`,
      `SUMMARY:${echapper(e.titre)}`,
      `DESCRIPTION:${echapper(e.description)}`,
      "END:VEVENT",
    );
  }
  lignes.push("END:VCALENDAR");
  return lignes.join("\r\n");
}

export function telechargerIcs(contenu: string, nom = "careerly.ics") {
  const blob = new Blob([contenu], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  a.click();
  URL.revokeObjectURL(url);
}
