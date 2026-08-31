import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { et as loadProfil, lt as saveProfilLocal } from "./router-Dma1Qf70.mjs";
import { n as fetchProfil } from "./profil-cloud-S5cI0mqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProfil-CGOz7dcn.js
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
