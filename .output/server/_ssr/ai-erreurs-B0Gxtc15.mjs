//#region node_modules/.nitro/vite/services/ssr/assets/ai-erreurs-B0Gxtc15.js
/** Message d'erreur IA prêt à afficher (client-safe). */
function texteErreurIA(error) {
	const propre = (error instanceof Error ? error.message : String(error ?? "")).replace(/^Error:\s*/i, "").trim();
	if (!propre || propre.length > 200 || /fetch|network|failed to/i.test(propre)) return "L'analyse IA a échoué. Vérifiez votre connexion puis réessayez.";
	return propre;
}
//#endregion
export { texteErreurIA as t };
