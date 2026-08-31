import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as STORAGE_KEY, H as loadCandidatures, M as SEED, W as saveCandidatures } from "./router-Dma1Qf70.mjs";
import { t as useSession } from "./useSession-87MHA6rb.mjs";
import { i as upsertCandidature, n as fetchCandidatures, r as insertManyCandidatures, t as deleteCandidature } from "./candidatures-cloud-Bm7lG3w0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCandidatures-CSkPDSDT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Source unique des candidatures : cloud si connecté, navigateur sinon.
* Partagé par toutes les pages (dashboard, candidatures, calendrier…).
*/
function useCandidatures() {
	const { session, user, loading: authLoading } = useSession();
	const isCloudUser = Boolean(session?.user?.id);
	const userId = session?.user?.id || user?.id;
	const [items, setItems] = (0, import_react.useState)(SEED);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const migre = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser) {
			setItems(loadCandidatures());
			setReady(true);
			return;
		}
		setReady(false);
		setSyncing(true);
		(async () => {
			try {
				const cloud = await fetchCandidatures();
				const local = loadCandidatures();
				if (cloud.length === 0 && local.length > 0 && !migre.current && userId) {
					migre.current = true;
					const migrated = await insertManyCandidatures(local, userId);
					if (!cancelled) {
						setItems(migrated);
						window.localStorage.removeItem(STORAGE_KEY);
						toast.success("Vos candidatures ont été transférées sur votre compte.");
					}
				} else if (!cancelled) setItems(cloud);
			} catch {
				if (!cancelled) setItems(loadCandidatures());
			} finally {
				if (!cancelled) {
					setSyncing(false);
					setReady(true);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		isCloudUser,
		userId,
		authLoading
	]);
	(0, import_react.useEffect)(() => {
		if (!isCloudUser) return;
		const refresh = () => {
			if (document.visibilityState !== "visible") return;
			fetchCandidatures().then(setItems).catch(() => void 0);
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [isCloudUser]);
	(0, import_react.useEffect)(() => {
		if (ready && !isCloudUser) saveCandidatures(items);
	}, [
		items,
		ready,
		isCloudUser
	]);
	const pushCloud = (0, import_react.useCallback)((c) => {
		if (!isCloudUser || !session?.user?.id) return;
		upsertCandidature(c, session.user.id).catch(() => toast.error("Enregistrement en ligne impossible."));
	}, [isCloudUser, session?.user?.id]);
	return {
		user,
		authLoading,
		items,
		setItems,
		ready,
		syncing,
		patch: (0, import_react.useCallback)((id, p) => {
			setItems((prev) => {
				const current = prev.find((c) => c.id === id);
				if (!current) return prev;
				const next = {
					...current,
					...p
				};
				pushCloud(next);
				return prev.map((c) => c.id === id ? next : c);
			});
		}, [pushCloud]),
		remove: (0, import_react.useCallback)((id) => {
			setItems((prev) => prev.filter((p) => p.id !== id));
			if (isCloudUser) deleteCandidature(id).catch(() => toast.error("Suppression en ligne impossible."));
		}, [isCloudUser]),
		save: (0, import_react.useCallback)(async (c) => {
			let saved = c;
			if (isCloudUser && session?.user?.id) try {
				saved = await upsertCandidature(c, session.user.id);
			} catch {}
			setItems((prev) => prev.some((p) => p.id === c.id) ? prev.map((p) => p.id === c.id ? saved : p) : [saved, ...prev]);
			return saved;
		}, [isCloudUser, session?.user?.id]),
		pushCloud
	};
}
//#endregion
export { useCandidatures as t };
