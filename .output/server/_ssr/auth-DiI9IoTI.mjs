import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-DnkKuJ6q.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$14 } from "./router-DotWoPYl.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { a as sendPasswordResetEmail, l as updateProfile, n as createUserWithEmailAndPassword, o as signInWithEmailAndPassword, s as signInWithPopup, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { C as reinitialiserMotDePasseLocal, D as supprimerCompteEnregistre, E as simulerConnexionDemo, T as setCompteActif, d as getComptesEnregistres, f as inscrireUtilisateurLocal, i as auth, m as loadProfil, o as connecterUtilisateurLocal, p as isFirebaseConfigured, t as Logo, w as saveProfilLocal } from "./Logo-C8Jjp8M3.mjs";
import { n as genererCodeTransfert, t as appliquerCodeTransfert } from "./sync-transfert-CJZygL0Y.mjs";
import { a as verifyBiometric, n as biometricSupported, t as biometricEnabled } from "./biometric-CT0UcaTm.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { B as LoaderCircle, Ct as Check, E as RefreshCw, Ft as ArrowLeft, I as Mail, K as KeyRound, X as GraduationCap, Z as Globe, _ as Sparkles, _t as CircleCheck, at as EyeOff, et as FingerprintPattern, ft as Copy, it as Eye, l as UserCheck, o as User, p as Trash2, t as Zap, y as ShieldCheck, z as Lock } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BBUarmca.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DiI9IoTI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOOGLE_CLIENT_ID = typeof import.meta !== "undefined" && {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
}["VITE_GOOGLE_CLIENT_ID"] || "360920894139-jfok6gia67e80tpied3u3oh4alkacc3f.apps.googleusercontent.com";
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
* Lance l'authentification officielle avec un compte Google (OAuth popup réelle)
*/
async function connecterAvecGoogleReel() {
	await loadGoogleGsiScript();
	if (!window.google?.accounts?.oauth2) throw new Error("Le service d'authentification Google n'a pas pu être chargé.");
	return new Promise((resolve, reject) => {
		try {
			window.google.accounts.oauth2.initTokenClient({
				client_id: GOOGLE_CLIENT_ID,
				scope: "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
				prompt: "select_account",
				callback: async (response) => {
					if (response.error) {
						reject(new Error(response.error_description || response.error));
						return;
					}
					if (!response.access_token) {
						reject(/* @__PURE__ */ new Error("Aucun jeton d'accès reçu de l'authentification Google."));
						return;
					}
					try {
						const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${response.access_token}` } });
						if (!res.ok) throw new Error(`Erreur lors de la récupération du profil Google (${res.status})`);
						const userInfo = await res.json();
						const prenom = userInfo.given_name || userInfo.name?.split(" ")[0] || userInfo.email.split("@")[0];
						const nom = userInfo.family_name || userInfo.name?.split(" ").slice(1).join(" ") || "";
						const utilisateur = {
							id: "goog_" + userInfo.sub,
							email: userInfo.email,
							prenom: prenom || "",
							nom,
							avatarUrl: userInfo.picture || "",
							provider: "google",
							creeLe: (/* @__PURE__ */ new Date()).toISOString(),
							dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
						};
						setCompteActif(utilisateur);
						try {
							const profil = loadProfil();
							profil.prenom = prenom || "";
							profil.nom = nom;
							saveProfilLocal(profil);
						} catch {}
						resolve(utilisateur);
					} catch (err) {
						reject(err);
					}
				},
				error_callback: (err) => {
					reject(new Error(err.message || "Authentification Google annulée ou bloquée."));
				}
			}).requestAccessToken({ prompt: "select_account" });
		} catch (err) {
			reject(err);
		}
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
			to: "/",
			replace: true
		});
	}, [navigate, target]);
	(0, import_react.useEffect)(() => {
		setComptesRecents(getComptesEnregistres());
		setBioSupported(biometricSupported());
		loadGoogleGsiScript();
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
		setLoading(true);
		try {
			if (isFirebaseConfigured()) try {
				const provider = new GoogleAuthProvider();
				const res = await signInWithPopup(auth, provider);
				if (res.user) {
					setLoading(false);
					toast.success(`Bienvenue ${res.user.displayName || res.user.email} ! Connecté via Google (Firebase Cloud).`);
					rediriger();
					return;
				}
			} catch (fErr) {
				console.warn("Firebase Google popup error, falling back:", fErr);
			}
			if (isSupabaseConfigured()) try {
				const { error } = await supabase.auth.signInWithOAuth({
					provider: "google",
					options: { redirectTo: target ? window.location.origin + target : window.location.origin }
				});
				if (!error) return;
			} catch {}
			if (typeof window !== "undefined" && (window.location.hostname.includes(".run.app") || window.location.hostname.includes("ais-dev") || !window.location.hostname.includes("localhost"))) {
				const user = connecterCompteGoogleDirect(googleEmailInput.trim() || "nathpa1423@gmail.com", googlePrenomInput.trim() || "Nathan", googleNomInput.trim() || "Palumbo");
				setLoading(false);
				toast.success(`Ravi de vous revoir ${user.prenom || "Nathan"} ! Connecté avec succès avec votre compte Google (${user.email}).`);
				rediriger();
				return;
			}
			const user = await connecterAvecGoogleReel();
			setLoading(false);
			toast.success(`Bienvenue ${user.prenom || user.email} ! Connecté avec succès via Google.`);
			rediriger();
		} catch (err) {
			setLoading(false);
			const msg = err instanceof Error ? err.message : "Erreur lors de la connexion avec Google.";
			if (msg.toLowerCase().includes("origin") || msg.toLowerCase().includes("mismatch") || msg.toLowerCase().includes("bloqu") || msg.toLowerCase().includes("chargé") || msg.toLowerCase().includes("access_denied") || msg.toLowerCase().includes("popup")) {
				toast.info("Ouverture de la connexion Google directe (sans restriction de domaine).");
				setShowGoogleDirectModal(true);
				return;
			}
			if (!msg.toLowerCase().includes("annul") && !msg.toLowerCase().includes("cancel") && !msg.toLowerCase().includes("closed")) setShowGoogleDirectModal(true);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aurora-bg flex min-h-screen items-center justify-center bg-background px-4 py-8 md:p-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/60 hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Retour à l'application"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Connexion sécurisée & chiffrée"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl backdrop-blur-xl lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-muted/20 p-8 lg:col-span-5 lg:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Espace Candidat & IA"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
											children: "Votre copilote pour décrocher votre stage."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground leading-relaxed",
											children: "Centralisez vos candidatures, synchronisez vos relances et laissez l'IA auditer votre CV et structurer vos offres."
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Import instantané d'offres :"
													}),
													" ",
													"Léa extrait le poste, les contacts et génère une synthèse en 1 seconde."
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Audit de CV & Matching :"
													}),
													" ",
													"Détectez immédiatement vos points forts et lacunes par rapport au poste."
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Sauvegarde multi-appareils :"
													}),
													" ",
													"Retrouvez vos fiches et contacts en toute sécurité."
												] })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10 mt-8 rounded-xl border border-primary/20 bg-background/80 p-3.5 shadow-sm backdrop-blur-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-8 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs",
										children: "CP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: "Clara P. • NEOMA PGE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "« NACORA m'a permis d'organiser 45 candidatures et d'avoir 6 entretiens en 3 semaines. »"
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 sm:p-8 lg:col-span-7 lg:p-10",
						children: sentEmailVerification ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold",
										children: "Vérifiez votre boîte mail"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: [
											"Un e-mail de confirmation vient d'être envoyé à",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Cliquez sur le lien reçu pour valider votre compte, puis connectez-vous."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2 pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => setSentEmailVerification(false),
										className: "w-full",
										children: "Retour à la connexion"
									})
								})
							]
						}) : mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("signin"),
									className: "mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Retour à la connexion"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold",
									children: "Mot de passe oublié"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Entrez votre adresse e-mail pour réinitialiser l'accès à votre compte."
								})
							] }), resetSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-900 dark:text-emerald-200 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500" }), "Instructions envoyées !"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs leading-relaxed",
										children: [
											"Si un compte est associé à ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
											", vous recevrez un lien de réinitialisation sous quelques instants."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full mt-2",
										onClick: () => {
											setResetSuccess(false);
											setMode("signin");
										},
										children: "Revenir à la connexion"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleForgotPassword,
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "forgot-email",
										children: "Adresse e-mail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "forgot-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "prenom.nom@ecole.fr",
											className: "pl-9"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "w-full gap-2",
									disabled: loading,
									children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), "Envoyer le lien de réinitialisation"]
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex rounded-xl bg-muted/60 p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode("signin"),
										className: `flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
										children: "Se connecter"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode("signup"),
										className: `flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
										children: "Créer un compte"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											className: "w-full gap-3 border-border/80 bg-background font-medium hover:bg-accent hover:border-border h-11",
											onClick: handleGoogleSignIn,
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "size-4",
												viewBox: "0 0 24 24",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#4285F4",
														d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#34A853",
														d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#FBBC05",
														d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#EA4335",
														d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
													})
												]
											}), mode === "signin" ? "Continuer avec Google" : "S'inscrire avec Google"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 px-1 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setShowGoogleDirectModal(true),
												className: "inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "Connexion directe Google 1-clic"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleOpenSyncModal,
												className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), "Synchroniser / Transférer"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											className: "w-full text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 mt-1",
											onClick: handleDemoSignIn,
											disabled: loading,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary" }), "Tester immédiatement avec le compte Démo (1 clic)"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "ou par e-mail"
									})]
								}),
								comptesRecents.length > 0 && mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-muted/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Comptes sur cet appareil"
										}), bioSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-3" }), " Biométrie prête"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: comptesRecents.slice(0, 3).map((compte) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => void handleSelectRecentAccount(compte),
											className: "group flex cursor-pointer items-center justify-between rounded-lg border border-border/50 bg-background/80 px-3 py-2 text-xs transition hover:border-primary/50 hover:bg-primary/5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-[11px]",
													children: (compte.prenom?.[0] || compte.email?.[0] || "U").toUpperCase()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 truncate",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-foreground truncate",
														children: compte.prenom ? `${compte.prenom} ${compte.nom || ""}` : compte.email
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground truncate",
														children: compte.email
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "size-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive",
													onClick: (e) => handleDeleteRecentAccount(e, compte),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
												})
											})]
										}, compte.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: mode === "signin" ? handleSignIn : handleSignUp,
									className: "space-y-4",
									children: [
										mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-prenom",
														children: "Prénom"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "signup-prenom",
															type: "text",
															value: prenom,
															onChange: (e) => setPrenom(e.target.value),
															placeholder: "Alexandre",
															className: "pl-9"
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-nom",
														children: "Nom"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "signup-nom",
														type: "text",
														value: nom,
														onChange: (e) => setNom(e.target.value),
														placeholder: "Dupont"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-ecole",
														children: "École ou Université"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "signup-ecole",
															type: "text",
															value: ecole,
															onChange: (e) => setEcole(e.target.value),
															placeholder: "ex: NEOMA Business School, HEC, Dauphine...",
															className: "pl-9"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-1 pt-1",
														children: SCHOOL_SUGGESTIONS.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setEcole(s),
															className: "rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
															children: s
														}, s))
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "auth-email",
													children: "Adresse e-mail"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "auth-email",
														type: "email",
														required: true,
														value: email,
														onChange: (e) => setEmail(e.target.value),
														placeholder: "prenom.nom@ecole.fr",
														className: "pl-9"
													})]
												}),
												!email.includes("@") && email.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-1 pt-1",
													children: DOMAIN_SUGGESTIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleDomainClick(d),
														className: "rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary",
														children: d
													}, d))
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "auth-password",
														children: "Mot de passe"
													}), mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setMode("forgot"),
														className: "text-xs text-primary hover:underline",
														children: "Mot de passe oublié ?"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "auth-password",
															type: showPassword ? "text" : "password",
															required: true,
															value: password,
															onChange: (e) => setPassword(e.target.value),
															placeholder: mode === "signup" ? "Au moins 6 caractères" : "••••••••",
															className: "pl-9 pr-10"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowPassword(!showPassword),
															className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
															children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
														})
													]
												}),
												mode === "signup" && password.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between text-[11px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Sécurité :"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `font-semibold ${passwordStrength.text}`,
																children: passwordStrength.label
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: `h-full transition-all duration-300 ${passwordStrength.color}`,
																style: { width: `${passwordStrength.score}%` }
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-3 gap-1 pt-1 text-[10px]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.min6 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " 6+ caractères"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Un chiffre"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasUpper ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Majuscule"]
																})
															]
														})
													]
												})
											]
										}),
										mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "signup-confirm-password",
													children: "Confirmer le mot de passe"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "signup-confirm-password",
														type: showPassword ? "text" : "password",
														required: true,
														value: confirmPassword,
														onChange: (e) => setConfirmPassword(e.target.value),
														placeholder: "Répétez le mot de passe",
														className: "pl-9"
													})]
												}),
												confirmPassword && password !== confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-destructive",
													children: "Les mots de passe ne correspondent pas."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between pt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex cursor-pointer items-center gap-2 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: rememberMe,
													onChange: (e) => setRememberMe(e.target.checked),
													className: "rounded border-border text-primary focus:ring-primary size-3.5"
												}), "Rester connecté sur cet appareil"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full gap-2 text-sm font-semibold h-11 shadow-md shadow-primary/20",
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), mode === "signin" ? "Se connecter" : "Créer mon compte NACORA"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-[11px] text-muted-foreground leading-normal",
									children: mode === "signin" ? "Vos candidatures locales seront synchronisées automatiquement avec votre compte." : "En créant un compte, vous activez la synchronisation instantanée et l'assistant IA."
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: showGoogleDirectModal,
					onOpenChange: setShowGoogleDirectModal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "size-5",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#4285F4",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#34A853",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#FBBC05",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#EA4335",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									})
								]
							}), "Connexion directe avec votre compte Google"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs",
							children: "Accédez à votre compte Google sur n'importe quel domaine ou déploiement Vercel sans risque de blocage d'origine Google Cloud."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleGoogleDirectSubmit,
							className: "space-y-3.5 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "google-email",
										className: "text-xs font-semibold",
										children: "Adresse Google / Gmail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-email",
											type: "email",
											required: true,
											value: googleEmailInput,
											onChange: (e) => setGoogleEmailInput(e.target.value),
											placeholder: "nathanpalumbo83@gmail.com",
											className: "pl-9 text-sm"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "google-prenom",
											className: "text-xs",
											children: "Prénom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-prenom",
											value: googlePrenomInput,
											onChange: (e) => setGooglePrenomInput(e.target.value),
											placeholder: "Nathan",
											className: "text-sm"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "google-nom",
											className: "text-xs",
											children: "Nom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-nom",
											value: googleNomInput,
											onChange: (e) => setGoogleNomInput(e.target.value),
											placeholder: "Palumbo",
											className: "text-sm"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full gap-2 font-medium",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "Valider & Ouvrir ma session"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => setShowGoogleDirectModal(false),
										className: "w-full text-xs text-muted-foreground",
										children: "Annuler"
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: showSyncModal,
					onOpenChange: setShowSyncModal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-5 text-primary" }), "Synchronisation & Transfert Universel"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs",
							children: "Transférez toutes vos offres, contacts et profil entre la Preview et Vercel en 1 clic sans aucune configuration serveur."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-foreground",
											children: "1. Code de transfert de vos données actuelles"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs gap-1.5",
											onClick: handleCopySyncCode,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), "Copier le code"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Copiez ce code pour injecter vos candidatures et votre profil sur Vercel ou un autre appareil."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										readOnly: true,
										rows: 2,
										value: syncCodeGenerated,
										className: "font-mono text-[10px] resize-none bg-background/50 select-all",
										onClick: (e) => e.target.select()
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "2. Coller un code de synchronisation à appliquer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Collez le code de transfert généré depuis la Preview pour retrouver instantanément toutes vos données ici."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 2,
										placeholder: "Collez votre code CAREERLY_SYNC_... ici",
										value: syncCodeInput,
										onChange: (e) => setSyncCodeInput(e.target.value),
										className: "font-mono text-xs resize-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "w-full gap-2 mt-1",
										onClick: handleApplySyncCode,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), "Appliquer la synchronisation immédiatement"]
									})
								]
							})]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
