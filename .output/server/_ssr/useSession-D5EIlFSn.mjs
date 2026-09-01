import { o as __toESM } from "../_runtime.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import "../_libs/firebase.mjs";
import { i as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import { f as isFirebaseConfigured, l as getCompteActif, r as auth } from "./auth-local-B6tKCByM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSession-D5EIlFSn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useSession() {
	const [firebaseUser, setFirebaseUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [localUser, setLocalUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setLocalUser(getCompteActif());
		let unsubsFirebase;
		if (isFirebaseConfigured()) unsubsFirebase = onAuthStateChanged(auth, (fUser) => {
			setFirebaseUser(fUser);
			setLoading(false);
		});
		let unsubscribeSupabase;
		const handleLocalAuth = () => {
			setLocalUser(getCompteActif());
		};
		window.addEventListener("careerly_auth_change", handleLocalAuth);
		if (isSupabaseConfigured()) try {
			unsubscribeSupabase = supabase.auth.onAuthStateChange((_e, s) => {
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
		else if (!isFirebaseConfigured()) setLoading(false);
		return () => {
			unsubsFirebase?.();
			unsubscribeSupabase?.();
			window.removeEventListener("careerly_auth_change", handleLocalAuth);
		};
	}, []);
	return {
		session,
		user: (0, import_react.useMemo)(() => {
			if (firebaseUser) return {
				id: firebaseUser.uid,
				email: firebaseUser.email ?? "",
				user_metadata: {
					full_name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Membre",
					avatar_url: firebaseUser.photoURL ?? void 0
				},
				app_metadata: { provider: "firebase" },
				aud: "authenticated",
				created_at: firebaseUser.metadata.creationTime ?? (/* @__PURE__ */ new Date()).toISOString()
			};
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
		}, [
			firebaseUser,
			session?.user,
			localUser
		]),
		firebaseUser,
		loading
	};
}
//#endregion
export { useSession as t };
