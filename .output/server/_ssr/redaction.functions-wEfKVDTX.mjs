import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-ChZ9lotr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DzSAAPdn.mjs";
import { t as createSsrRpc } from "./profil-cloud-Dh3oB5oU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redaction.functions-wEfKVDTX.js
var Entree = object({
	profil: string().default(""),
	offre: string().default(""),
	consigne: string().default("")
});
var genererLettre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Entree.parse(data)).handler(createSsrRpc("7997b2e3a006c44a00fe04cdb9fc9cdc02f7ab88467baa270ad9ca1720130d41"));
var genererLinkedin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Entree.parse(data)).handler(createSsrRpc("daf786ab0b66bb28893566417a3af10ab6f993db6263c9cad43981c25bf01c5a"));
var genererInterview = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Entree.parse(data)).handler(createSsrRpc("ab1d6822282227581179677a75a3716b81aff39280cab57c9361859b15522701"));
//#endregion
export { genererLettre as n, genererLinkedin as r, genererInterview as t };
