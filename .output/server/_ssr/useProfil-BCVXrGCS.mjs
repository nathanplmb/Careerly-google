import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as loadProfil, v as saveProfilLocal } from "./router-AVT1AZP0.mjs";
import { t as fetchProfil } from "./profil-cloud-DZIUduAY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProfil-BCVXrGCS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Profil courant : cloud si connecté (avec repli local), sinon local. */
function useProfil(user) {
	const [profil, setProfil] = (0, import_react.useState)(() => loadProfil());
	const userId = user?.id;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const local = loadProfil();
		setProfil(local);
		if (!userId) return;
		fetchProfil().then((cloud) => {
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
