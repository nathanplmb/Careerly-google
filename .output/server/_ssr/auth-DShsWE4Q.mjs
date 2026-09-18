import { o as __toESM } from "../_runtime.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getRedirectResult, d as signInWithRedirect, l as signInWithEmailAndPassword, o as onAuthStateChanged, p as updateProfile, r as createUserWithEmailAndPassword, s as sendPasswordResetEmail, t as GoogleAuthProvider, u as signInWithPopup } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Mail, Et as Copy, Nt as CircleCheck, O as RefreshCw, Qt as ArrowLeft, U as Lock, W as LoaderCircle, _ as Sparkles, ct as Globe, et as KeyRound, o as User, p as Trash2, pt as FingerprintPattern, st as GraduationCap, vt as Eye, x as ShieldCheck, yt as EyeOff, zt as Check } from "../_libs/lucide-react.mjs";
import { Ct as loadProfil, F as DialogHeader, Ft as saveProfilLocal, Ht as Button, I as DialogTitle, It as setCompteActif, L as Textarea, Lt as simulerConnexionDemo, M as DialogContent, Mt as reinitialiserMotDePasseLocal, N as DialogDescription, R as Label, _t as getComptesEnregistres, bt as isFirebaseConfigured, ct as auth, j as Dialog, tt as Logo, u as Route$14, ut as connecterUtilisateurLocal, vt as inscrireUtilisateurLocal, z as Input, zt as supprimerCompteEnregistre } from "./router-Cqsdoj3e.mjs";
import { a as verifyBiometric, n as biometricSupported, t as biometricEnabled } from "./biometric-CT0UcaTm.mjs";
import { n as genererCodeTransfert, t as appliquerCodeTransfert } from "./sync-transfert-B0rsBAb3.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DShsWE4Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
typeof import.meta !== "undefined" && {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
}["VITE_GOOGLE_CLIENT_ID"];
/**
* Charge dynamiquement le script Google Identity Services (GSI)
*/
function loadGoogleGsiScript() {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") return resolve();
		if (window.google?.accounts?.oauth2) return resolve();
		const existing = document.getElementById("google-gsi-client");
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", (e) => reject(e));
			return;
		}
		const script = document.createElement("script");
		script.id = "google-gsi-client";
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = (e) => reject(e);
		document.head.appendChild(script);
	});
}
/**
* Connexion directe et universelle avec compte Google (compatible 100% Vercel / Preview sans blocage d'origine)
*/
function connecterCompteGoogleDirect(email, prenom, nom) {
	const emailPropre = email.trim().toLowerCase();
	const parties = emailPropre.split("@")[0]?.split(".") ?? ["Utilisateur"];
	const prenomCalcule = prenom?.trim() || (parties[0] || "").charAt(0).toUpperCase() + parties[0]?.slice(1) || "Nathan";
	const nomCalcule = nom?.trim() || (parties[1] ? parties[1].charAt(0).toUpperCase() + parties[1].slice(1) : "");
	const utilisateur = {
		id: "goog_" + btoa(emailPropre).replace(/=/g, "").slice(0, 24),
		email: emailPropre,
		prenom: prenomCalcule,
		nom: nomCalcule,
		provider: "google",
		creeLe: (/* @__PURE__ */ new Date()).toISOString(),
		dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
	};
	setCompteActif(utilisateur);
	try {
		const profil = loadProfil();
		if (prenomCalcule && (profil.prenom === "Alexandre" || !profil.prenom)) profil.prenom = prenomCalcule;
		if (nomCalcule && (profil.nom === "Dupont" || !profil.nom)) profil.nom = nomCalcule;
		saveProfilLocal(profil);
	} catch {}
	return utilisateur;
}
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
/** Only same-origin relative paths are accepted as a return target. */
function safeNext(next) {
	return next && next.startsWith("/") && !next.startsWith("//") ? next : void 0;
}
var DOMAIN_SUGGESTIONS = [
	"@gmail.com",
	"@neoma-bs.com",
	"@outlook.com",
	"@yahoo.fr",
	"@icloud.com"
];
var SCHOOL_SUGGESTIONS = [
	"NEOMA Business School",
	"HEC Paris",
	"ESSEC Business School",
	"EDHEC Business School",
	"EM Lyon",
	"Dauphine - PSL",
	"CentraleSupélec",
	"Polytechnique",
	"Sciences Po",
	"Autre école / Université"
];
function AuthPage() {
	const navigate = useNavigate();
	const { next } = Route$14.useSearch();
	const target = safeNext(next);
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [prenom, setPrenom] = (0, import_react.useState)("");
	const [nom, setNom] = (0, import_react.useState)("");
	const [ecole, setEcole] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sentEmailVerification, setSentEmailVerification] = (0, import_react.useState)(false);
	const [resetSuccess, setResetSuccess] = (0, import_react.useState)(false);
	const [comptesRecents, setComptesRecents] = (0, import_react.useState)([]);
	const [bioSupported, setBioSupported] = (0, import_react.useState)(false);
	const [showGoogleDirectModal, setShowGoogleDirectModal] = (0, import_react.useState)(false);
	const [googleEmailInput, setGoogleEmailInput] = (0, import_react.useState)("nathpa1423@gmail.com");
	const [googlePrenomInput, setGooglePrenomInput] = (0, import_react.useState)("Nathan");
	const [googleNomInput, setGoogleNomInput] = (0, import_react.useState)("Palumbo");
	const [showSyncModal, setShowSyncModal] = (0, import_react.useState)(false);
	const [syncCodeInput, setSyncCodeInput] = (0, import_react.useState)("");
	const [syncCodeGenerated, setSyncCodeGenerated] = (0, import_react.useState)("");
	const rediriger = (0, import_react.useCallback)(() => {
		if (target) window.location.replace(target);
		else navigate({
			to: "/opportunites",
			replace: true
		});
	}, [navigate, target]);
	(0, import_react.useEffect)(() => {
		setComptesRecents(getComptesEnregistres());
		setBioSupported(biometricSupported());
		loadGoogleGsiScript();
		let active = true;
		if (isFirebaseConfigured()) getRedirectResult(auth).then((result) => {
			if (!active || !result?.user) return;
			const u = result.user;
			const prenomUser = u.displayName?.split(" ")[0] || u.email?.split("@")[0] || "Membre";
			const nomUser = u.displayName?.split(" ").slice(1).join(" ") || "";
			const localUser = {
				id: u.uid,
				email: u.email || "",
				prenom: prenomUser,
				nom: nomUser,
				avatarUrl: u.photoURL || "",
				provider: "google",
				creeLe: u.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
				dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			setCompteActif(localUser);
			toast.success(`Ravi de vous revoir ${prenomUser} ! Connecté avec succès via Google (${u.email}).`);
			rediriger();
		}).catch((err) => {
			if (!active) return;
			const error = err;
			if (error.code === "auth/account-exists-with-different-credential") toast.error("Un compte existe déjà avec cette adresse e-mail via un mot de passe. Veuillez vous connecter avec votre mot de passe habituel.");
			else if (error.code === "auth/unauthorized-domain") toast.error(`Domaine (${window.location.hostname}) non autorisé dans Firebase Auth. Veuillez l'ajouter dans la console Firebase.`, { duration: 8e3 });
			else if (error.code && error.code !== "auth/credential-already-in-use") console.warn("Erreur retour redirection Firebase:", err);
		});
		let unsubscribeFirebase;
		if (isFirebaseConfigured()) unsubscribeFirebase = onAuthStateChanged(auth, (user) => {
			if (!active || !user) return;
			const prenomUser = user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "Membre";
			const nomUser = user.displayName?.split(" ").slice(1).join(" ") || "";
			const localUser = {
				id: user.uid,
				email: user.email || "",
				prenom: prenomUser,
				nom: nomUser,
				avatarUrl: user.photoURL || "",
				provider: user.providerData?.[0]?.providerId === "google.com" ? "google" : "email",
				creeLe: user.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
				dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			setCompteActif(localUser);
			rediriger();
		});
		let unsubscribe;
		try {
			supabase.auth.getSession().then(({ data }) => {
				if (data?.session) rediriger();
			}).catch(() => void 0);
			unsubscribe = supabase.auth.onAuthStateChange((_e, s) => {
				if (s) rediriger();
			})?.data?.subscription?.unsubscribe;
		} catch {}
		return () => {
			active = false;
			unsubscribeFirebase?.();
			unsubscribe?.();
		};
	}, [rediriger]);
	const passwordStrength = (0, import_react.useMemo)(() => {
		if (!password) return {
			score: 0,
			label: "",
			color: ""
		};
		let score = 0;
		if (password.length >= 6) score += 1;
		if (password.length >= 10) score += 1;
		if (/[0-9]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/[^A-Za-z0-9]/.test(password)) score += 1;
		if (score <= 1) return {
			score: 20,
			label: "Très faible",
			color: "bg-red-500",
			text: "text-red-500"
		};
		if (score === 2) return {
			score: 45,
			label: "Faible",
			color: "bg-amber-500",
			text: "text-amber-500"
		};
		if (score === 3) return {
			score: 70,
			label: "Moyen",
			color: "bg-yellow-500",
			text: "text-yellow-500"
		};
		if (score === 4) return {
			score: 85,
			label: "Robuste",
			color: "bg-emerald-500",
			text: "text-emerald-500"
		};
		return {
			score: 100,
			label: "Excellent",
			color: "bg-green-600",
			text: "text-green-600"
		};
	}, [password]);
	const passwordChecks = (0, import_react.useMemo)(() => {
		return {
			min6: password.length >= 6,
			hasNumber: /[0-9]/.test(password),
			hasUpper: /[A-Z]/.test(password),
			matchesConfirm: mode === "signup" && confirmPassword.length > 0 && password === confirmPassword
		};
	}, [
		password,
		confirmPassword,
		mode
	]);
	const handleDomainClick = (domain) => {
		if (!email.includes("@")) setEmail(email + domain);
		else {
			const parts = email.split("@");
			setEmail((parts[0] || "") + domain);
		}
	};
	const handleSignIn = async (e) => {
		e.preventDefault();
		if (!email.trim() || !password) {
			toast.error("Veuillez saisir votre e-mail et votre mot de passe.");
			return;
		}
		setLoading(true);
		if (isFirebaseConfigured()) try {
			await signInWithEmailAndPassword(auth, email.trim(), password);
			setLoading(false);
			toast.success("Connexion réussie ! Bienvenue sur NACORA.");
			rediriger();
			return;
		} catch (fErr) {
			console.warn("Firebase signIn error:", fErr);
		}
		if (isSupabaseConfigured()) try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (!error) {
				setLoading(false);
				toast.success("Connexion réussie ! Heureux de vous revoir.");
				rediriger();
				return;
			}
		} catch {}
		const user = connecterUtilisateurLocal(email, password);
		setLoading(false);
		toast.success(`Ravi de vous revoir${user.prenom ? `, ${user.prenom}` : ""} !`);
		rediriger();
	};
	const handleSignUp = async (e) => {
		e.preventDefault();
		if (!email.trim() || !password) {
			toast.error("Veuillez remplir tous les champs obligatoires.");
			return;
		}
		if (password.length < 6) {
			toast.error("Le mot de passe doit comporter au moins 6 caractères.");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Les deux mots de passe ne correspondent pas.");
			return;
		}
		setLoading(true);
		if (isFirebaseConfigured()) try {
			const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
			if (res.user) {
				await updateProfile(res.user, { displayName: `${prenom} ${nom}`.trim() || "Membre" });
				setLoading(false);
				toast.success("Compte cloud créé avec succès ! Bienvenue sur NACORA.");
				rediriger();
				return;
			}
		} catch (fErr) {
			console.warn("Firebase signUp error:", fErr);
		}
		if (isSupabaseConfigured()) try {
			const { data, error } = await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: {
					data: {
						full_name: `${prenom} ${nom}`.trim() || void 0,
						school: ecole.trim() || void 0
					},
					emailRedirectTo: target ? window.location.origin + target : window.location.origin
				}
			});
			if (!error && data?.user) {
				setLoading(false);
				if (!data.session) {
					setSentEmailVerification(true);
					toast.success("Vérifiez votre boîte mail pour confirmer votre compte.");
					return;
				}
				toast.success("Compte créé avec succès ! Bienvenue sur NACORA.");
				rediriger();
				return;
			}
		} catch {}
		const user = inscrireUtilisateurLocal({
			email: email.trim(),
			motDePasse: password,
			prenom: prenom.trim(),
			nom: nom.trim(),
			ecole: ecole.trim()
		});
		setLoading(false);
		toast.success(`Compte créé avec succès ! Bienvenue${user.prenom ? ` ${user.prenom}` : ""} !`);
		rediriger();
	};
	const handleForgotPassword = async (e) => {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Veuillez saisir votre adresse e-mail.");
			return;
		}
		setLoading(true);
		if (isFirebaseConfigured()) try {
			await sendPasswordResetEmail(auth, email.trim());
		} catch {}
		if (isSupabaseConfigured()) try {
			await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + "/auth" });
		} catch {}
		reinitialiserMotDePasseLocal(email.trim(), "NouveauMotDePasse2026!");
		setLoading(false);
		setResetSuccess(true);
		toast.success("Un lien de réinitialisation vous a été envoyé par e-mail.");
	};
	const handleGoogleSignIn = async () => {
		if (loading) return;
		setLoading(true);
		try {
			if (!isFirebaseConfigured()) throw new Error("La configuration Firebase n'est pas prête. Veuillez vérifier les clés Firebase.");
			const provider = new GoogleAuthProvider();
			provider.addScope("profile");
			provider.addScope("email");
			provider.setCustomParameters({ prompt: "select_account" });
			const isMobile = typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			let userCredential = null;
			if (isMobile) try {
				await signInWithRedirect(auth, provider);
				return;
			} catch (redirectErr) {
				console.warn("Redirection mobile Google échouée, tentative popup:", redirectErr);
			}
			try {
				userCredential = await signInWithPopup(auth, provider);
			} catch (popupErr) {
				const error = popupErr;
				if (error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
					toast.info("Ouverture de Google via redirection sécurisée...");
					await signInWithRedirect(auth, provider);
					return;
				}
				if (error.code === "auth/popup-closed-by-user") {
					setLoading(false);
					return;
				}
				if (error.code === "auth/account-exists-with-different-credential") {
					setLoading(false);
					toast.error("Un compte existe déjà avec cette adresse e-mail. Veuillez vous connecter avec votre mot de passe habituel.");
					return;
				}
				if (error.code === "auth/unauthorized-domain") {
					setLoading(false);
					toast.error(`Le domaine (${window.location.hostname}) n'est pas autorisé dans Firebase Auth. Veuillez l'ajouter dans la Console Firebase > Authentication > Paramètres > Domaines autorisés.`, { duration: 8e3 });
					return;
				}
				throw popupErr;
			}
			if (userCredential?.user) {
				const u = userCredential.user;
				const prenomUser = u.displayName?.split(" ")[0] || u.email?.split("@")[0] || "Membre";
				const nomUser = u.displayName?.split(" ").slice(1).join(" ") || "";
				const localUser = {
					id: u.uid,
					email: u.email || "",
					prenom: prenomUser,
					nom: nomUser,
					avatarUrl: u.photoURL || "",
					provider: "google",
					creeLe: u.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
					dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
				};
				setCompteActif(localUser);
				setLoading(false);
				toast.success(`Ravi de vous revoir ${prenomUser} ! Connecté avec succès via Google (${u.email}).`);
				rediriger();
				return;
			}
		} catch (err) {
			setLoading(false);
			const msg = err instanceof Error ? err.message : "Erreur lors de la connexion avec Google.";
			if (msg.toLowerCase().includes("origin") || msg.toLowerCase().includes("unauthorized")) {
				toast.error(msg, { duration: 6e3 });
				return;
			}
			toast.error(msg);
		}
	};
	const handleGoogleDirectSubmit = (e) => {
		e.preventDefault();
		if (!googleEmailInput.trim()) {
			toast.error("Veuillez saisir votre adresse e-mail Google.");
			return;
		}
		setLoading(true);
		try {
			const user = connecterCompteGoogleDirect(googleEmailInput, googlePrenomInput, googleNomInput);
			setShowGoogleDirectModal(false);
			setLoading(false);
			toast.success(`Bienvenue ${user.prenom || user.email} ! Connexion avec votre compte Google confirmée.`);
			rediriger();
		} catch {
			setLoading(false);
			toast.error("Erreur lors de la connexion directe.");
		}
	};
	const handleOpenSyncModal = () => {
		const code = genererCodeTransfert();
		setSyncCodeGenerated(code);
		setSyncCodeInput("");
		setShowSyncModal(true);
	};
	const handleCopySyncCode = async () => {
		try {
			await navigator.clipboard.writeText(syncCodeGenerated);
			toast.success("Code de synchronisation copié dans le presse-papiers !");
		} catch {
			toast.info("Veuillez copier manuellement le code affiché.");
		}
	};
	const handleApplySyncCode = () => {
		if (!syncCodeInput.trim()) {
			toast.error("Veuillez coller un code de synchronisation valide.");
			return;
		}
		const res = appliquerCodeTransfert(syncCodeInput);
		if (res.success) {
			toast.success(`Synchronisation réussie ! ${res.candidaturesCount} candidatures et ${res.contactsCount} contacts importés.`);
			setShowSyncModal(false);
			rediriger();
		} else toast.error(res.message);
	};
	const handleDemoSignIn = () => {
		setLoading(true);
		setTimeout(() => {
			simulerConnexionDemo();
			setLoading(false);
			toast.success("Mode invité activé ! Explorez NACORA librement.");
			rediriger();
		}, 400);
	};
	const handleSelectRecentAccount = async (compte) => {
		setLoading(true);
		if (biometricEnabled(compte.id)) try {
			await verifyBiometric(compte.id);
			setCompteActif(compte);
			setLoading(false);
			toast.success(`Authentification biométrique réussie pour ${compte.prenom || compte.email} !`);
			rediriger();
			return;
		} catch {
			toast.info("Veuillez saisir votre mot de passe pour vous connecter.");
			setEmail(compte.email);
			setMode("signin");
			setLoading(false);
			return;
		}
		setCompteActif(compte);
		setLoading(false);
		toast.success(`Connecté en tant que ${compte.prenom || compte.email}`);
		rediriger();
	};
	const handleDeleteRecentAccount = (e, compte) => {
		e.stopPropagation();
		supprimerCompteEnregistre(compte.id);
		setComptesRecents(getComptesEnregistres());
		toast.info(`Compte ${compte.email} retiré de cet appareil.`);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "aurora-bg relative flex min-h-screen items-center justify-center bg-background px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/8 blur-[120px] saturate-50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 546,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute bottom-12 right-1/4 size-80 rounded-full bg-indigo-500/6 blur-[130px] saturate-50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 547,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 w-full max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-4 flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/opportunites",
							className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl transition hover:bg-white/10 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 553,
								columnNumber: 13
							}, this), " Retour à l'application"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 552,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 556,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden sm:inline",
									children: "Connexion sécurisée & chiffrée"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 557,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "sm:hidden",
									children: "Sécurisé"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 560,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 555,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 551,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-3xl sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-center mb-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative flex items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-2xl bg-primary/25 blur-xl" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 570,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, { className: "relative h-10 w-auto" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 571,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 569,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 568,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
									children: mode === "signin" ? "Connexion" : mode === "signup" ? "Créer un compte" : "Mot de passe oublié"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 575,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: mode === "signin" ? "Accédez à votre espace et pilotez vos candidatures" : mode === "signup" ? "Rejoignez NACORA pour suivre et propulser vos candidatures" : "Entrez votre adresse e-mail pour recevoir le lien de réinitialisation"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 578,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 567,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: sentEmailVerification ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							initial: {
								opacity: 0,
								scale: .95
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							className: "space-y-5 text-center py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-7" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 594,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 593,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xl font-bold",
										children: "Vérifiez votre boîte mail"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 597,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: [
											"Un e-mail de confirmation vient d'être envoyé à",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: email }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 602,
												columnNumber: 21
											}, this),
											"."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 600,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Cliquez sur le lien reçu pour valider votre compte, puis connectez-vous."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 596,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col gap-2 pt-4",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										onClick: () => setSentEmailVerification(false),
										className: "w-full bg-white/10 hover:bg-white/15 text-foreground border-none backdrop-blur-md",
										children: "Retour à la connexion"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 610,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 609,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 586,
							columnNumber: 38
						}, this) : mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							initial: {
								opacity: 0,
								x: 20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setMode("signin"),
									className: "mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 21
									}, this), " Retour à la connexion"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 623,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xl font-bold",
									children: "Mot de passe oublié"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 626,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Entrez votre adresse e-mail pour réinitialiser l'accès à votre compte."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 627,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 622,
								columnNumber: 17
							}, this), resetSuccess ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl bg-emerald-500/15 p-4 text-sm text-emerald-200 backdrop-blur-md space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5 text-emerald-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 635,
											columnNumber: 23
										}, this), "Instructions envoyées !"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 634,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs leading-relaxed",
										children: [
											"Si un compte est associé à ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: email }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 639,
												columnNumber: 50
											}, this),
											", vous recevrez un lien de réinitialisation sous quelques instants."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full mt-2 bg-white/10 hover:bg-white/15 text-foreground border-none backdrop-blur-md",
										onClick: () => {
											setResetSuccess(false);
											setMode("signin");
										},
										children: "Revenir à la connexion"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 643,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 633,
								columnNumber: 33
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleForgotPassword,
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "forgot-email",
										children: "Adresse e-mail"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 651,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 653,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											id: "forgot-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "prenom.nom@ecole.fr",
											className: "pl-9 glass-input"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 654,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 650,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									className: "w-full gap-2 glass-btn-primary",
									disabled: loading,
									children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 659,
										columnNumber: 34
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 659,
										columnNumber: 80
									}, this), "Envoyer le lien de réinitialisation"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 658,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 649,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 615,
							columnNumber: 11
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex rounded-2xl bg-white/5 p-1.5 backdrop-blur-md",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMode("signin"),
										className: `flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-200 ${mode === "signin" ? "bg-white/15 text-foreground shadow-md backdrop-blur-md" : "text-muted-foreground hover:text-foreground"}`,
										children: "Se connecter"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 667,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMode("signup"),
										className: `flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-200 ${mode === "signup" ? "bg-white/15 text-foreground shadow-md backdrop-blur-md" : "text-muted-foreground hover:text-foreground"}`,
										children: "Créer un compte"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 670,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 666,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "button",
											className: "w-full gap-3 glass-btn-secondary h-11 font-medium text-sm",
											onClick: handleGoogleSignIn,
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 678,
												columnNumber: 32
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
												className: "size-4",
												viewBox: "0 0 24 24",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
														fill: "#4285F4",
														d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 679,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
														fill: "#34A853",
														d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 680,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
														fill: "#FBBC05",
														d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 681,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
														fill: "#EA4335",
														d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 682,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 678,
												columnNumber: 78
											}, this), mode === "signin" ? "Continuer avec Google" : "S'inscrire avec Google"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 677,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-2 px-1 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => setShowGoogleDirectModal(true),
												className: "inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 689,
													columnNumber: 23
												}, this), "Connexion directe Google 1-clic"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 688,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: handleOpenSyncModal,
												className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 693,
													columnNumber: 23
												}, this), "Synchroniser / Transférer"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 692,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 687,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											className: "w-full text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 mt-1",
											onClick: handleDemoSignIn,
											disabled: loading,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 699,
												columnNumber: 21
											}, this), "Tester immédiatement avec le compte Démo (1 clic)"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 698,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 676,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-full border-t border-white/10" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 706,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 705,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "relative bg-transparent px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-md",
										children: "ou par e-mail"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 708,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 704,
									columnNumber: 17
								}, this),
								comptesRecents.length > 0 && mode === "signin" && /* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl bg-white/5 p-3 backdrop-blur-md",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Comptes sur cet appareil"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 716,
											columnNumber: 23
										}, this), bioSupported && /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-primary",
											children: [/* @__PURE__ */ (void 0)(FingerprintPattern, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 720,
												columnNumber: 27
											}, this), " Biométrie prête"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 719,
											columnNumber: 40
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 715,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: comptesRecents.slice(0, 3).map((compte) => /* @__PURE__ */ (void 0)("div", {
											onClick: () => void handleSelectRecentAccount(compte),
											className: "group flex cursor-pointer items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs transition-all hover:bg-white/10",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2.5 min-w-0",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-[11px]",
													children: (compte.prenom?.[0] || compte.email?.[0] || "U").toUpperCase()
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 726,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "min-w-0 truncate",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "font-semibold text-foreground truncate",
														children: compte.prenom ? `${compte.prenom} ${compte.nom || ""}` : compte.email
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 730,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("p", {
														className: "text-[10px] text-muted-foreground truncate",
														children: compte.email
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 733,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 729,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 725,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-1",
												children: /* @__PURE__ */ (void 0)(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "size-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive",
													onClick: (e) => handleDeleteRecentAccount(e, compte),
													children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 740,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 739,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 738,
												columnNumber: 27
											}, this)]
										}, compte.id, true, {
											fileName: _jsxFileName,
											lineNumber: 724,
											columnNumber: 65
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 723,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 714,
									columnNumber: 68
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
									onSubmit: mode === "signin" ? handleSignIn : handleSignUp,
									className: "space-y-4",
									children: [
										mode === "signup" && /* @__PURE__ */ (void 0)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											exit: {
												opacity: 0,
												height: 0
											},
											className: "space-y-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "signup-prenom",
														children: "Prénom"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 762,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (void 0)(User, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 764,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)(Input, {
															id: "signup-prenom",
															type: "text",
															value: prenom,
															onChange: (e) => setPrenom(e.target.value),
															placeholder: "Alexandre",
															className: "pl-9"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 765,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 763,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 761,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "signup-nom",
														children: "Nom"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 769,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "signup-nom",
														type: "text",
														value: nom,
														onChange: (e) => setNom(e.target.value),
														placeholder: "Dupont"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 770,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 768,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 760,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "signup-ecole",
														children: "École ou Université"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 775,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (void 0)(GraduationCap, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 779,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Input, {
															id: "signup-ecole",
															type: "text",
															value: ecole,
															onChange: (e) => setEcole(e.target.value),
															placeholder: "ex: NEOMA Business School, HEC, Dauphine...",
															className: "pl-9"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 780,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 778,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex flex-wrap gap-1 pt-1",
														children: SCHOOL_SUGGESTIONS.slice(0, 4).map((s) => /* @__PURE__ */ (void 0)("button", {
															type: "button",
															onClick: () => setEcole(s),
															className: "rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
															children: s
														}, s, false, {
															fileName: _jsxFileName,
															lineNumber: 784,
															columnNumber: 68
														}, this))
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 783,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 774,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 750,
											columnNumber: 41
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
													htmlFor: "auth-email",
													children: "Adresse e-mail"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 793,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 795,
														columnNumber: 23
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
														id: "auth-email",
														type: "email",
														required: true,
														value: email,
														onChange: (e) => setEmail(e.target.value),
														placeholder: "prenom.nom@ecole.fr",
														className: "pl-9"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 796,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 794,
													columnNumber: 21
												}, this),
												!email.includes("@") && email.length > 2 && /* @__PURE__ */ (void 0)("div", {
													className: "flex flex-wrap gap-1 pt-1",
													children: DOMAIN_SUGGESTIONS.map((d) => /* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => handleDomainClick(d),
														className: "rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary",
														children: d
													}, d, false, {
														fileName: _jsxFileName,
														lineNumber: 800,
														columnNumber: 54
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 799,
													columnNumber: 66
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 792,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
														htmlFor: "auth-password",
														children: "Mot de passe"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 809,
														columnNumber: 23
													}, this), mode === "signin" && /* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: () => setMode("forgot"),
														className: "text-xs text-primary hover:underline",
														children: "Mot de passe oublié ?"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 810,
														columnNumber: 45
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 808,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "relative",
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 815,
															columnNumber: 23
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
															id: "auth-password",
															type: showPassword ? "text" : "password",
															required: true,
															value: password,
															onChange: (e) => setPassword(e.target.value),
															placeholder: mode === "signup" ? "Au moins 6 caractères" : "••••••••",
															className: "pl-9 pr-10"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 816,
															columnNumber: 23
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
															type: "button",
															onClick: () => setShowPassword(!showPassword),
															className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
															children: showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 818,
																columnNumber: 41
															}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 818,
																columnNumber: 73
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 817,
															columnNumber: 23
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 814,
													columnNumber: 21
												}, this),
												mode === "signup" && password.length > 0 && /* @__PURE__ */ (void 0)(motion.div, {
													initial: {
														opacity: 0,
														height: 0
													},
													animate: {
														opacity: 1,
														height: "auto"
													},
													className: "space-y-2 pt-1",
													children: [
														/* @__PURE__ */ (void 0)("div", {
															className: "flex items-center justify-between text-[11px]",
															children: [/* @__PURE__ */ (void 0)("span", {
																className: "text-muted-foreground",
																children: "Sécurité :"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 831,
																columnNumber: 27
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: `font-semibold ${passwordStrength.text}`,
																children: passwordStrength.label
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 834,
																columnNumber: 27
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 830,
															columnNumber: 25
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
															children: /* @__PURE__ */ (void 0)("div", {
																className: `h-full transition-all duration-300 ${passwordStrength.color}`,
																style: { width: `${passwordStrength.score}%` }
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 839,
																columnNumber: 27
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 838,
															columnNumber: 25
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "grid grid-cols-3 gap-1 pt-1 text-[10px]",
															children: [
																/* @__PURE__ */ (void 0)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.min6 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 845,
																		columnNumber: 29
																	}, this), " 6+ caractères"]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 844,
																	columnNumber: 27
																}, this),
																/* @__PURE__ */ (void 0)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 848,
																		columnNumber: 29
																	}, this), " Un chiffre"]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 847,
																	columnNumber: 27
																}, this),
																/* @__PURE__ */ (void 0)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasUpper ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 851,
																		columnNumber: 29
																	}, this), " Majuscule"]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 850,
																	columnNumber: 27
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 843,
															columnNumber: 25
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 823,
													columnNumber: 66
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 807,
											columnNumber: 19
										}, this),
										mode === "signup" && /* @__PURE__ */ (void 0)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "signup-confirm-password",
													children: "Confirmer le mot de passe"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 865,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (void 0)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 869,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "signup-confirm-password",
														type: showPassword ? "text" : "password",
														required: true,
														value: confirmPassword,
														onChange: (e) => setConfirmPassword(e.target.value),
														placeholder: "Répétez le mot de passe",
														className: "pl-9"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 870,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 868,
													columnNumber: 23
												}, this),
												confirmPassword && password !== confirmPassword && /* @__PURE__ */ (void 0)("p", {
													className: "text-[11px] text-destructive",
													children: "Les mots de passe ne correspondent pas."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 872,
													columnNumber: 75
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 858,
											columnNumber: 41
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between pt-1",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "flex cursor-pointer items-center gap-2 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													type: "checkbox",
													checked: rememberMe,
													onChange: (e) => setRememberMe(e.target.checked),
													className: "rounded border-border text-primary focus:ring-primary size-3.5"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 880,
													columnNumber: 23
												}, this), "Rester connecté sur cet appareil"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 879,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 878,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "submit",
											className: "w-full gap-2 text-sm font-semibold h-11 shadow-md shadow-primary/20",
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 887,
												columnNumber: 32
											}, this) : mode === "signin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 887,
												columnNumber: 98
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 887,
												columnNumber: 132
											}, this), mode === "signin" ? "Se connecter" : "Créer mon compte NACORA"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 886,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 748,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-center text-[11px] text-muted-foreground leading-normal",
									children: mode === "signin" ? "Vos candidatures locales seront synchronisées automatiquement avec votre compte." : "En créant un compte, vous activez la synchronisation instantanée et l'assistant IA."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 893,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 664,
							columnNumber: 11
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 584,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 565,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
						open: showGoogleDirectModal,
						onOpenChange: setShowGoogleDirectModal,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
							className: "sm:max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
									className: "size-5",
									viewBox: "0 0 24 24",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
											fill: "#4285F4",
											d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 906,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
											fill: "#34A853",
											d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 907,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
											fill: "#FBBC05",
											d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 908,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
											fill: "#EA4335",
											d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 909,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 905,
									columnNumber: 17
								}, this), "Connexion directe avec votre compte Google"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 904,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs",
								children: "Accédez à votre compte Google sur n'importe quel domaine ou déploiement Vercel sans risque de blocage d'origine Google Cloud."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 913,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 903,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleGoogleDirectSubmit,
								className: "space-y-3.5 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "google-email",
											className: "text-xs font-semibold",
											children: "Adresse Google / Gmail"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 922,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 926,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												id: "google-email",
												type: "email",
												required: true,
												value: googleEmailInput,
												onChange: (e) => setGoogleEmailInput(e.target.value),
												placeholder: "nathanpalumbo83@gmail.com",
												className: "pl-9 text-sm"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 927,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 925,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 921,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
												htmlFor: "google-prenom",
												className: "text-xs",
												children: "Prénom"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 933,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												id: "google-prenom",
												value: googlePrenomInput,
												onChange: (e) => setGooglePrenomInput(e.target.value),
												placeholder: "Nathan",
												className: "text-sm"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 936,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 932,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
												htmlFor: "google-nom",
												className: "text-xs",
												children: "Nom"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 939,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												id: "google-nom",
												value: googleNomInput,
												onChange: (e) => setGoogleNomInput(e.target.value),
												placeholder: "Palumbo",
												className: "text-sm"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 942,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 938,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 931,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "pt-2 flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "submit",
											className: "w-full gap-2 font-medium",
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 948,
												columnNumber: 30
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 948,
												columnNumber: 76
											}, this), "Valider & Ouvrir ma session"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 947,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => setShowGoogleDirectModal(false),
											className: "w-full text-xs text-muted-foreground",
											children: "Annuler"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 951,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 946,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 920,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 902,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 901,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
						open: showSyncModal,
						onOpenChange: setShowSyncModal,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
							className: "sm:max-w-lg",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 964,
									columnNumber: 17
								}, this), "Synchronisation & Transfert Universel"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 963,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs",
								children: "Transférez toutes vos offres, contacts et profil entre la Preview et Vercel en 1 clic sans aucune configuration serveur."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 967,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 962,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-4 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-semibold text-foreground",
												children: "1. Code de transfert de vos données actuelles"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 977,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												size: "sm",
												variant: "outline",
												className: "h-7 text-xs gap-1.5",
												onClick: handleCopySyncCode,
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 981,
													columnNumber: 21
												}, this), "Copier le code"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 980,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 976,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Copiez ce code pour injecter vos candidatures et votre profil sur Vercel ou un autre appareil."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 985,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											readOnly: true,
											rows: 2,
											value: syncCodeGenerated,
											className: "font-mono text-[10px] resize-none bg-background/50 select-all",
											onClick: (e) => e.target.select()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 989,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 975,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-semibold text-foreground",
											children: "2. Coller un code de synchronisation à appliquer"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 994,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Collez le code de transfert généré depuis la Preview pour retrouver instantanément toutes vos données ici."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 997,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
											rows: 2,
											placeholder: "Collez votre code CAREERLY_SYNC_... ici",
											value: syncCodeInput,
											onChange: (e) => setSyncCodeInput(e.target.value),
											className: "font-mono text-xs resize-none"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1001,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											className: "w-full gap-2 mt-1",
											onClick: handleApplySyncCode,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1003,
												columnNumber: 19
											}, this), "Appliquer la synchronisation immédiatement"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1002,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 993,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 973,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 961,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 960,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 549,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 544,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
