import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCandidatures from "./tools/list-candidatures";
import createCandidature from "./tools/create-candidature";
import updateCandidature from "./tools/update-candidature";
import listContacts from "./tools/list-contacts";
import getProfil from "./tools/get-profil";

const projectRef =
  import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "careerly-v2",
  title: "Careerly V2",
  version: "0.1.0",
  instructions:
    "Outils Careerly : suivi de candidatures de stage/alternance, contacts et profil de recherche de l'utilisateur connecté. Utilisez list_candidatures pour l'état des candidatures, create_candidature/update_candidature pour les faire évoluer, list_contacts pour le réseau, get_profil pour le contexte du candidat.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listCandidatures,
    createCandidature,
    updateCandidature,
    listContacts,
    getProfil,
  ] as unknown as Parameters<typeof defineMcp>[0]["tools"],
});
