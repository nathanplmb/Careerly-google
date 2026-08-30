/** Message d'erreur IA prêt à afficher (client-safe). */
export function texteErreurIA(error: unknown): string {
  const brut = error instanceof Error ? error.message : String(error ?? "");
  const propre = brut.replace(/^Error:\s*/i, "").trim();
  if (
    !propre ||
    propre.length > 200 ||
    /fetch|network|failed to/i.test(propre)
  ) {
    return "L'analyse IA a échoué. Vérifiez votre connexion puis réessayez.";
  }
  return propre;
}
