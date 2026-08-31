import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-FsCbT2mZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as getCompteActif } from "./router-WcHZLW5p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSession-C42A4XJ5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useSession() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [localUser, setLocalUser] = (0, import_react.useState)(getCompteActif());
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let unsubscribe;
		const handleLocalAuth = () => {
			setLocalUser(getCompteActif());
		};
		window.addEventListener("careerly_auth_change", handleLocalAuth);
		try {
			unsubscribe = supabase.auth.onAuthStateChange((_e, s) => {
				setSession(s);
				setLoading(false);
			})?.data?.subscription?.unsubscribe;
			supabase.auth.getSession().then(({ data }) => {
				setSession(data?.session ?? null);
				setLoading(false);
			}).catch(() => {
				setLoading(false);
			});
		} catch {
			setLoading(false);
		}
		return () => {
			unsubscribe?.();
			window.removeEventListener("careerly_auth_change", handleLocalAuth);
		};
	}, []);
	return {
		session,
		user: (0, import_react.useMemo)(() => {
			if (session?.user) return session.user;
			if (localUser) return {
				id: localUser.id,
				email: localUser.email,
				user_metadata: { full_name: `${localUser.prenom ?? ""} ${localUser.nom ?? ""}`.trim() },
				app_metadata: {},
				aud: "authenticated",
				created_at: localUser.creeLe
			};
			return null;
		}, [session?.user, localUser]),
		loading
	};
}
//#endregion
export { useSession as t };
