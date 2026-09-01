import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as saveProfilLocal, p as loadProfil } from "./auth-local-B6tKCByM.mjs";
import { n as fetchProfil } from "./profil-cloud-Dh3oB5oU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProfil-Batqat5N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Profil courant : cloud si connecté (avec repli local), sinon local. */
function useProfil(user) {
	const [profil, setProfil] = (0, import_react.useState)(null);
	const userId = user?.id;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const local = loadProfil();
		setProfil(local);
		if (!userId) return;
		fetchProfil(userId).then((cloud) => {
			if (!cancelled && cloud) {
				setProfil(cloud);
				saveProfilLocal(cloud);
			}
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [userId]);
	return profil;
}
//#endregion
export { useProfil as t };
