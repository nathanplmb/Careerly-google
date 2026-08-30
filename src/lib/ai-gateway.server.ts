export function messageErreurIA(error: unknown): string {
  const texte = error instanceof Error ? error.message : String(error);
  if (
    /API key not valid|API_KEY_INVALID|Clé AI manquante|GEMINI_API_KEY/i.test(
      texte,
    )
  ) {
    return "La clé d'API Gemini n'est pas encore configurée.";
  }
  if (/503|UNAVAILABLE|high demand|forte demande/i.test(texte)) {
    return "Le service d'IA subit temporairement une forte demande. Veuillez réessayer dans quelques secondes.";
  }
  if (/quota|rate limit|429|resource exhausted/i.test(texte)) {
    return "Limite de requêtes temporairement atteinte. Veuillez patienter un instant avant de réécrire.";
  }
  if (/illisible|JSON/i.test(texte)) {
    return "La réponse de l'IA n'a pas pu être convertie correctement. Veuillez relancer.";
  }
  return "L'analyse IA a rencontré une erreur momentanée. Réessayez dans un instant.";
}
