import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as saveCandidatures, u as loadCandidatures } from "./candidatures-ck14d0Ow.mjs";
import { t as useSession } from "./useSession-D5EIlFSn.mjs";
import { n as fetchCandidatures, r as upsertCandidature, t as deleteCandidature } from "./candidatures-cloud-DtlZLmP5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCandidatures-Cqc_s9SU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Source unique des candidatures : cloud si connecté, navigateur sinon.
* Partagé par toutes les pages (dashboard, candidatures, calendrier…).
*/
function useCandidatures() {
	const { user, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(userId);
	const [items, setItems] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			setItems(loadCandidatures());
			setReady(true);
			return;
		}
		setReady(false);
		setSyncing(true);
		(async () => {
			try {
				const cloud = await fetchCandidatures(userId);
				if (!cancelled) setItems(cloud);
			} catch (err) {
				console.warn("Firestore/cloud fetch error:", err);
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
		if (!isCloudUser || !userId) return;
		const refresh = () => {
			if (document.visibilityState !== "visible") return;
			fetchCandidatures(userId).then(setItems).catch(() => void 0);
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [isCloudUser, userId]);
	(0, import_react.useEffect)(() => {
		if (ready && !isCloudUser) saveCandidatures(items);
	}, [
		items,
		ready,
		isCloudUser
	]);
	const pushCloud = (0, import_react.useCallback)((c) => {
		if (!isCloudUser || !userId) return;
		upsertCandidature(c, userId).catch(() => toast.error("Enregistrement en ligne impossible."));
	}, [isCloudUser, userId]);
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
				if (!isCloudUser) saveCandidatures(prev.map((c) => c.id === id ? next : c));
				return prev.map((c) => c.id === id ? next : c);
			});
		}, [pushCloud, isCloudUser]),
		remove: (0, import_react.useCallback)((id) => {
			setItems((prev) => {
				const next = prev.filter((p) => p.id !== id);
				saveCandidatures(next);
				return next;
			});
			if (isCloudUser && userId) deleteCandidature(id, userId).catch(() => toast.error("Suppression en ligne impossible."));
			toast.success("Candidature supprimée.");
		}, [isCloudUser, userId]),
		save: (0, import_react.useCallback)(async (c) => {
			let saved = c;
			if (isCloudUser && userId) try {
				saved = await upsertCandidature(c, userId);
			} catch {}
			setItems((prev) => {
				const next = prev.some((p) => p.id === c.id) ? prev.map((p) => p.id === c.id ? saved : p) : [saved, ...prev];
				if (!isCloudUser) saveCandidatures(next);
				return next;
			});
			return saved;
		}, [isCloudUser, userId]),
		pushCloud
	};
}
//#endregion
export { useCandidatures as t };
