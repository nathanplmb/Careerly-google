import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as LogOut, C as Search, D as RefreshCw, H as Lock, O as Power, Ot as CircleCheck, U as LoaderCircle, Ut as Briefcase, V as LogIn, a as Users, b as ShieldCheck, f as TriangleAlert, ft as Eye, g as Sparkles, jt as ChevronRight, k as PowerOff, kt as CircleAlert, l as UserPlus, m as Trash2, vt as Download, y as Shield, z as Mail } from "../_libs/lucide-react.mjs";
import "../_libs/firebase.mjs";
import { t as GoogleAuthProvider, u as signInWithPopup } from "../_libs/firebase__auth.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-GF5R-Jcs.mjs";
import { G as Button, W as Input, b as getCompteActif, m as auth } from "./router-Chlelb_S2.mjs";
import { a as revokeUserSessions, c as waitForAuthUser, i as fetchAdminUsersList, n as deleteUserByAdmin, o as setUserAdminRole, r as diagnoseUserAccount, s as toggleUserStatus } from "./admin-client-DqffCexl.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BAJ9y4nV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
var SUPER_ADMIN_EMAIL = "nathpa1423@gmail.com";
function AdminPage() {
	const navigate = useNavigate();
	const [checkingAuth, setCheckingAuth] = (0, import_react.useState)(true);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [isSuperAdmin, setIsSuperAdmin] = (0, import_react.useState)(false);
	const [hasFirebaseAuthSession, setHasFirebaseAuthSession] = (0, import_react.useState)(false);
	const [connectingFirebase, setConnectingFirebase] = (0, import_react.useState)(false);
	const [currentEmail, setCurrentEmail] = (0, import_react.useState)(null);
	const [currentUid, setCurrentUid] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [metrics, setMetrics] = (0, import_react.useState)(null);
	const [searchFilter, setSearchFilter] = (0, import_react.useState)("");
	const [providerFilter, setProviderFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("activity");
	const [diagnosticQuery, setDiagnosticQuery] = (0, import_react.useState)("");
	const [diagnosticResult, setDiagnosticResult] = (0, import_react.useState)(null);
	const [diagnosticSearched, setDiagnosticSearched] = (0, import_react.useState)(false);
	const [diagnosing, setDiagnosing] = (0, import_react.useState)(false);
	const [selectedUser, setSelectedUser] = (0, import_react.useState)(null);
	const [showAddAdminModal, setShowAddAdminModal] = (0, import_react.useState)(false);
	const [newAdminInput, setNewAdminInput] = (0, import_react.useState)("");
	const [addingAdmin, setAddingAdmin] = (0, import_react.useState)(false);
	const [userToDelete, setUserToDelete] = (0, import_react.useState)(null);
	const [deleteConfirmationText, setDeleteConfirmationText] = (0, import_react.useState)("");
	const [deletingUser, setDeletingUser] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		async function checkPermissions() {
			setCheckingAuth(true);
			const fUser = await waitForAuthUser();
			const localUser = getCompteActif();
			const email = (fUser?.email || localUser?.email || "").toLowerCase();
			const uid = fUser?.uid || localUser?.id || "";
			if (!isMounted) return;
			setCurrentEmail(email || null);
			setCurrentUid(uid || null);
			setHasFirebaseAuthSession(Boolean(fUser));
			const isOwner = email === SUPER_ADMIN_EMAIL;
			setIsSuperAdmin(isOwner);
			if (isOwner) {
				setIsAdmin(true);
				setCheckingAuth(false);
				return;
			}
			if (fUser) try {
				const tokenResult = await fUser.getIdTokenResult(true);
				const hasAdminClaim = Boolean(tokenResult.claims["admin"]);
				setIsAdmin(hasAdminClaim);
			} catch {
				setIsAdmin(false);
			}
			else setIsAdmin(false);
			setCheckingAuth(false);
		}
		checkPermissions();
		const unsub = auth.onAuthStateChanged((u) => {
			if (isMounted) {
				setHasFirebaseAuthSession(Boolean(u));
				checkPermissions();
			}
		});
		return () => {
			isMounted = false;
			unsub();
		};
	}, []);
	const loadUsersData = async () => {
		setLoading(true);
		try {
			const data = await fetchAdminUsersList();
			setUsers(data.users);
			setMetrics(data.metrics);
			setHasFirebaseAuthSession(true);
		} catch (err) {
			console.warn("Erreur chargement liste admin:", err);
			const msg = err instanceof Error ? err.message : String(err);
			if (msg.includes("Firebase Auth") || msg.includes("session")) setHasFirebaseAuthSession(false);
			toast.error(`Chargement des utilisateurs : ${msg}`);
		} finally {
			setLoading(false);
		}
	};
	const handleConnectFirebaseAuth = async () => {
		setConnectingFirebase(true);
		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: "select_account" });
			const cred = await signInWithPopup(auth, provider);
			if (cred?.user) {
				setHasFirebaseAuthSession(true);
				toast.success(`Session connectée : ${cred.user.email}`);
				await loadUsersData();
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Connexion Firebase : ${msg}`);
		} finally {
			setConnectingFirebase(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (isAdmin) loadUsersData();
	}, [isAdmin]);
	const handleRunDiagnostic = async (e) => {
		if (e) e.preventDefault();
		if (!diagnosticQuery.trim()) return;
		setDiagnosing(true);
		setDiagnosticSearched(true);
		try {
			const res = await diagnoseUserAccount(diagnosticQuery.trim());
			setDiagnosticResult(res.user);
			if (res.user) toast.success(`Compte trouvé : ${res.user.email || res.user.id}`);
			else toast.info("Aucun compte trouvé avec cet identifiant ou cette adresse.");
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Erreur diagnostic: ${msg}`);
			setDiagnosticResult(null);
		} finally {
			setDiagnosing(false);
		}
	};
	const handleToggleDisabled = async (user) => {
		const targetState = !user.disabled;
		const actionLabel = targetState ? "désactiver" : "réactiver";
		if (user.email === SUPER_ADMIN_EMAIL) {
			toast.error("Impossible de désactiver le compte super-administrateur principal.");
			return;
		}
		try {
			const res = await toggleUserStatus(user.id, targetState);
			toast.success(res.message);
			setUsers((prev) => prev.map((u) => u.id === user.id ? {
				...u,
				disabled: targetState,
				statutDiagnostic: targetState ? "desactive" : u.isAdmin ? "admin" : u.hasFirestoreProfile ? "auth_et_firestore" : "auth_sans_firestore",
				statutLabel: targetState ? "Compte désactivé" : u.isAdmin ? "Compte administrateur" : u.hasFirestoreProfile ? "Compte Auth et profil Firestore présents" : "Compte Auth créé — profil Firestore non initialisé"
			} : u));
			if (selectedUser?.id === user.id) setSelectedUser((prev) => prev ? {
				...prev,
				disabled: targetState
			} : null);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Échec ${actionLabel}: ${msg}`);
		}
	};
	const handleRevokeSessions = async (user) => {
		try {
			const res = await revokeUserSessions(user.id);
			toast.success(res.message);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Échec révocation sessions: ${msg}`);
		}
	};
	const handleToggleAdminRole = async (user) => {
		const newAdminState = !user.isAdmin;
		if (user.email === SUPER_ADMIN_EMAIL && !newAdminState) {
			toast.error("Impossible de révoquer les droits du super-administrateur principal.");
			return;
		}
		try {
			const res = await setUserAdminRole(user.id, newAdminState);
			toast.success(res.message);
			setUsers((prev) => prev.map((u) => u.id === user.id ? {
				...u,
				isAdmin: newAdminState,
				statutDiagnostic: newAdminState ? "admin" : u.disabled ? "desactive" : u.hasFirestoreProfile ? "auth_et_firestore" : "auth_sans_firestore",
				statutLabel: newAdminState ? "Compte administrateur" : u.disabled ? "Compte désactivé" : u.hasFirestoreProfile ? "Compte Auth et profil Firestore présents" : "Compte Auth créé — profil Firestore non initialisé"
			} : u));
			if (selectedUser?.id === user.id) setSelectedUser((prev) => prev ? {
				...prev,
				isAdmin: newAdminState
			} : null);
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Échec modification rôle: ${msg}`);
		}
	};
	const handleAddAdminSubmit = async (e) => {
		e.preventDefault();
		if (!newAdminInput.trim()) return;
		setAddingAdmin(true);
		try {
			const diag = await diagnoseUserAccount(newAdminInput.trim());
			if (!diag.user) {
				toast.error("Aucun compte Firebase trouvé avec cet identifiant ou cette adresse e-mail.");
				return;
			}
			await setUserAdminRole(diag.user.id, true);
			toast.success(`Le rôle administrateur a été accordé à ${diag.user.email || diag.user.id}.`);
			setShowAddAdminModal(false);
			setNewAdminInput("");
			loadUsersData();
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Erreur: ${msg}`);
		} finally {
			setAddingAdmin(false);
		}
	};
	const handleConfirmAdminDelete = async () => {
		if (!userToDelete) return;
		const expectedConfirm = userToDelete.email || userToDelete.id;
		if (deleteConfirmationText.trim().toLowerCase() !== expectedConfirm.toLowerCase()) {
			toast.error(`Veuillez saisir exactement '${expectedConfirm}' pour confirmer.`);
			return;
		}
		setDeletingUser(true);
		try {
			const res = await deleteUserByAdmin(userToDelete.id);
			toast.success(res.message);
			setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
			if (selectedUser?.id === userToDelete.id) setSelectedUser(null);
			setUserToDelete(null);
			setDeleteConfirmationText("");
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			toast.error(`Échec suppression: ${msg}`);
		} finally {
			setDeletingUser(false);
		}
	};
	const filteredUsers = (0, import_react.useMemo)(() => {
		return users.filter((u) => {
			if (searchFilter.trim()) {
				const q = searchFilter.toLowerCase();
				const matchEmail = u.email.toLowerCase().includes(q);
				const matchName = (u.displayName || `${u.prenom || ""} ${u.nom || ""}`).toLowerCase().includes(q);
				const matchUid = u.id.toLowerCase().includes(q);
				if (!matchEmail && !matchName && !matchUid) return false;
			}
			if (providerFilter !== "all" && u.provider !== providerFilter) return false;
			if (statusFilter === "disabled" && !u.disabled) return false;
			if (statusFilter === "admin" && !u.isAdmin) return false;
			if (statusFilter === "without_profile" && u.hasFirestoreProfile) return false;
			if (statusFilter === "with_profile" && !u.hasFirestoreProfile) return false;
			return true;
		}).sort((a, b) => {
			if (sortBy === "created") return new Date(b.creeLe).getTime() - new Date(a.creeLe).getTime();
			if (sortBy === "name") return (a.displayName || a.email).localeCompare(b.displayName || b.email);
			if (sortBy === "candidatures") return b.stats.candidaturesCount - a.stats.candidaturesCount;
			return new Date(b.dernierAccesLe).getTime() - new Date(a.dernierAccesLe).getTime();
		});
	}, [
		users,
		searchFilter,
		providerFilter,
		statusFilter,
		sortBy
	]);
	const exportUsersJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", dataStr);
		downloadAnchor.setAttribute("download", `nacora_utilisateurs_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
		toast.success("Rapport JSON exporté avec succès.");
	};
	const exportUsersCsv = () => {
		if (users.length === 0) return;
		const headers = [
			"UID",
			"Email",
			"Nom",
			"Provider",
			"Statut",
			"Admin",
			"Profil Firestore",
			"Candidatures",
			"Contacts",
			"Entreprises",
			"Documents",
			"Date Creation",
			"Dernier Acces"
		];
		const rows = users.map((u) => [
			u.id,
			u.email,
			`"${(u.displayName || `${u.prenom || ""} ${u.nom || ""}`).replace(/"/g, "\"\"")}"`,
			u.providerLabel,
			u.statutLabel,
			u.isAdmin ? "OUI" : "NON",
			u.hasFirestoreProfile ? "OUI" : "NON",
			u.stats.candidaturesCount,
			u.stats.contactsCount,
			u.stats.entreprisesCount,
			u.stats.documentsCount,
			u.creeLe,
			u.dernierAccesLe
		]);
		const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `nacora_utilisateurs_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
		document.body.appendChild(link);
		link.click();
		link.remove();
		toast.success("Rapport CSV exporté avec succès.");
	};
	if (checkingAuth) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 358,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Vérification des privilèges administrateur..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 359,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 357,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 356,
		columnNumber: 12
	}, this);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 10
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "glass-card max-w-md w-full p-8 text-center space-y-5 border-destructive/30",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "size-7" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 375,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 374,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-xl font-bold text-foreground",
						children: "Accès Réservé aux Administrateurs"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 379,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: "Cette console d'administration est strictement restreinte aux administrateurs habilités de NACORA."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 382,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 378,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl bg-muted/40 p-4 text-left text-xs space-y-2 border border-border/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Votre compte connecté :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 390,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono font-medium text-foreground",
								children: currentEmail || "Non connecté"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 393,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 389,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "UID Firebase :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono font-medium text-foreground",
								children: currentUid ? `${currentUid.slice(0, 10)}...` : "—"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 399,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 397,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Statut d'accès :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-destructive",
								children: "Non autorisé"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 403,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 388,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => navigate({ to: "/" }),
						children: "Retour à l'accueil"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 412,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "flex-1",
						onClick: () => navigate({ to: "/auth" }),
						children: "Se connecter"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 417,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 411,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 367,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 366,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md px-6 py-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 432,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 431,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-base font-bold tracking-tight",
								children: "Console Administrateur NACORA"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 436,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary",
								children: isSuperAdmin ? "Super Admin" : "Admin"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 439,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 435,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Gestion exhaustive des comptes Firebase Auth, profils Firestore et sessions"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 443,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 434,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 430,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setShowAddAdminModal(true),
								className: "gap-1.5 text-xs h-8",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 452,
									columnNumber: 15
								}, this), " Ajouter un admin"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 451,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: loadUsersData,
								disabled: loading,
								className: "gap-1.5 text-xs h-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 455,
										columnNumber: 15
									}, this),
									" ",
									"Actualiser"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 454,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => navigate({ to: "/" }),
								className: "gap-1.5 text-xs h-8",
								children: ["Retour à l'app ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 461,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 458,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 450,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 429,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 428,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 px-6 py-6 max-w-7xl mx-auto w-full space-y-6",
				children: [
					!hasFirebaseAuthSession && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500",
								children: /* @__PURE__ */ (void 0)(CircleAlert, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 472,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 471,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-xs font-semibold text-foreground",
									children: "Session Firebase Auth non active"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Vous êtes identifié en tant qu'administrateur, mais la session Firebase Auth doit être connectée pour signer les requêtes vers l'annuaire complet."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 478,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 474,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 470,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							onClick: handleConnectFirebaseAuth,
							disabled: connectingFirebase,
							className: "gap-1.5 text-xs shrink-0",
							children: [connectingFirebase ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 486,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (void 0)(LogIn, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 486,
								columnNumber: 85
							}, this), "Activer la session Google Admin"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 485,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 469,
						columnNumber: 37
					}, this),
					metrics && /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 495,
											columnNumber: 17
										}, this), " Total Comptes Auth"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 494,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.totalUsers
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 497,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Source Firebase Auth"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 500,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 493,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3.5 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 507,
											columnNumber: 17
										}, this), " Google"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.googleUsers
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 509,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Provider google.com"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 512,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 505,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5 text-blue-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 519,
											columnNumber: 17
										}, this), " E-mail + Mot de passe"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 518,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.passwordUsers
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 522,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Provider password"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 525,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 517,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5 text-emerald-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 532,
											columnNumber: 17
										}, this), " Profils Firestore"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 531,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.totalUsers - metrics.withoutProfileUsers
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 535,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: [metrics.withoutProfileUsers, " sans profil"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 538,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 530,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3.5 text-purple-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 545,
											columnNumber: 17
										}, this), " Candidatures"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 544,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.totalCandidatures
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 547,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: [metrics.totalContacts, " contacts"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 550,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 543,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "glass-card p-4 rounded-xl space-y-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-3.5 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 557,
												columnNumber: 17
											}, this),
											" ",
											"Administrateurs"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 556,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-2xl font-bold tracking-tight text-foreground",
										children: metrics.adminUsers
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 560,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground",
										children: [metrics.disabledUsers, " désactivés"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 563,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 555,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "glass-card rounded-2xl p-5 space-y-4 border-primary/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "rounded-lg bg-primary/10 p-2 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 574,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 573,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-sm font-bold text-foreground",
										children: "Diagnostic Unitaire de Compte (Server-Side)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 577,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Recherchez et diagnostiquez instantanément n'importe quel compte par adresse e-mail ou UID Firebase."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 580,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 576,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 572,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 571,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleRunDiagnostic,
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: diagnosticQuery,
									onChange: (e) => setDiagnosticQuery(e.target.value),
									placeholder: "Saisissez une adresse e-mail (ex: nathpa1423@gmail.com) ou un UID Firebase...",
									className: "flex-1 text-xs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									size: "sm",
									disabled: diagnosing || !diagnosticQuery.trim(),
									className: "gap-2",
									children: [diagnosing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 591,
										columnNumber: 29
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 591,
										columnNumber: 75
									}, this), "Diagnostiquer"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 590,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 588,
								columnNumber: 11
							}, this),
							diagnosticSearched && /* @__PURE__ */ (void 0)(AnimatePresence, { children: /* @__PURE__ */ (void 0)(motion.div, {
								initial: {
									opacity: 0,
									y: 5
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3 text-xs",
								children: diagnosticResult ? /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [
													/* @__PURE__ */ (void 0)("span", {
														className: "font-bold text-sm text-foreground",
														children: diagnosticResult.displayName || diagnosticResult.email || "Utilisateur sans nom"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 609,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("span", {
														className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary",
														children: diagnosticResult.providerLabel
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 612,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (void 0)("span", {
														className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground",
														children: diagnosticResult.statutLabel
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 615,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 608,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "font-mono text-[11px] text-muted-foreground",
												children: [
													"UID : ",
													diagnosticResult.id,
													" • Email :",
													" ",
													diagnosticResult.email
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 619,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 607,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (void 0)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => setSelectedUser(diagnosticResult),
												className: "h-7 text-xs gap-1",
												children: [/* @__PURE__ */ (void 0)(Eye, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 627,
													columnNumber: 27
												}, this), " Voir détails"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 626,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Button, {
												size: "sm",
												variant: diagnosticResult.disabled ? "default" : "secondary",
												onClick: () => handleToggleDisabled(diagnosticResult),
												className: "h-7 text-xs gap-1",
												children: [diagnosticResult.disabled ? /* @__PURE__ */ (void 0)(Power, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 630,
													columnNumber: 56
												}, this) : /* @__PURE__ */ (void 0)(PowerOff, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 630,
													columnNumber: 89
												}, this), diagnosticResult.disabled ? "Réactiver" : "Désactiver"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 629,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 625,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 606,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-border/60",
										children: [
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground text-[10px] block",
												children: "Créé le :"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 638,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-medium",
												children: new Date(diagnosticResult.creeLe).toLocaleDateString("fr-FR")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 641,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 637,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground text-[10px] block",
												children: "Dernier accès :"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 646,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-medium",
												children: new Date(diagnosticResult.dernierAccesLe).toLocaleString("fr-FR")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 649,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 645,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground text-[10px] block",
												children: "Candidatures & Données :"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 654,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-medium",
												children: [
													diagnosticResult.stats.candidaturesCount,
													" cands •",
													" ",
													diagnosticResult.stats.contactsCount,
													" contacts"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 657,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 653,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground text-[10px] block",
												children: "Rôle :"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 663,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-semibold text-primary",
												children: diagnosticResult.isAdmin ? "Administrateur" : "Utilisateur Standard"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 666,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 662,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 636,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 605,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-muted-foreground",
									children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 text-amber-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 672,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"Aucun compte trouvé correspondant à la requête \"",
										diagnosticQuery,
										"\"."
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 673,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 671,
									columnNumber: 28
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 598,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 597,
								columnNumber: 34
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 570,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						className: "glass-card rounded-2xl p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-sm font-bold text-foreground flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 687,
											columnNumber: 17
										}, this),
										" Annuaire des Utilisateurs (",
										filteredUsers.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 686,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Tous les comptes inscrits dans Firebase Authentication avec enrichissement dynamique Firestore."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 690,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 685,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "outline",
										onClick: exportUsersCsv,
										className: "h-8 text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 698,
											columnNumber: 17
										}, this), " CSV"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 697,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "outline",
										onClick: exportUsersJson,
										className: "h-8 text-xs gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 701,
											columnNumber: 17
										}, this), " JSON"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 700,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 696,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 684,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative sm:col-span-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 709,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: searchFilter,
											onChange: (e) => setSearchFilter(e.target.value),
											placeholder: "Filtrer par nom, email ou UID...",
											className: "pl-8 text-xs h-8"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 710,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 708,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] text-muted-foreground shrink-0",
											children: "Fournisseur :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 714,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: providerFilter,
											onChange: (e) => setProviderFilter(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "all",
													children: "Tous les fournisseurs"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 718,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "google",
													children: "Google (google.com)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 719,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "password",
													children: "E-mail + mot de passe (password)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 720,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "apple",
													children: "Apple"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 723,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "microsoft",
													children: "Microsoft"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 724,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 717,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 713,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] text-muted-foreground shrink-0",
											children: "Statut :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 729,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: statusFilter,
											onChange: (e) => setStatusFilter(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "all",
													children: "Tous les statuts"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 733,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "with_profile",
													children: "Avec profil Firestore"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 734,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "without_profile",
													children: "Sans profil Firestore"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 735,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "admin",
													children: "Administrateurs"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 736,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "disabled",
													children: "Comptes désactivés"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 737,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 732,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 728,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] text-muted-foreground shrink-0",
											children: "Tri :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 742,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: sortBy,
											onChange: (e) => setSortBy(e.target.value),
											className: "w-full rounded-md border border-input bg-background px-2 py-1 text-xs h-8",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "activity",
													children: "Dernière activité"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 746,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "created",
													children: "Date de création"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 747,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "name",
													children: "Nom / Email"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 748,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "candidatures",
													children: "Nombre de candidatures"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 749,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 745,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 741,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 707,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "overflow-x-auto rounded-xl border border-border/70",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
									className: "w-full text-left text-xs border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
										className: "border-b border-border/70 bg-muted/40 text-muted-foreground font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-4",
												children: "Utilisateur / UID"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 759,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-3",
												children: "Fournisseur Auth"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 760,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-3",
												children: "Statut & Profil"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 761,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-3",
												children: "Candidatures & Données"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 762,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-3",
												children: "Dates"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 763,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "py-3 px-3 text-right",
												children: "Actions"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 764,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 758,
										columnNumber: 17
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 757,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
										className: "divide-y divide-border/50",
										children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											colSpan: 6,
											className: "py-12 text-center text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-col items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-6 animate-spin text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 771,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Chargement des comptes Firebase Auth..." }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 772,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 770,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 769,
											columnNumber: 21
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 768,
											columnNumber: 28
										}, this) : filteredUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											colSpan: 6,
											className: "py-8 text-center text-muted-foreground",
											children: "Aucun utilisateur ne correspond aux critères de recherche."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 776,
											columnNumber: 21
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 775,
											columnNumber: 56
										}, this) : filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
											className: "hover:bg-muted/20 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-4",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center gap-2.5",
														children: [u.photoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
															src: u.photoUrl,
															alt: "",
															className: "size-7 rounded-full object-cover shrink-0"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 783,
															columnNumber: 41
														}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
															className: "flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[11px] shrink-0",
															children: (u.displayName || u.email || "U")[0]?.toUpperCase()
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 783,
															columnNumber: 129
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
															className: "min-w-0",
															children: [
																/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
																	className: "flex items-center gap-1.5",
																	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
																		className: "font-semibold text-foreground truncate max-w-[180px]",
																		children: u.displayName || `${u.prenom || ""} ${u.nom || ""}`.trim() || u.email.split("@")[0]
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 788,
																		columnNumber: 31
																	}, this), u.isAdmin && /* @__PURE__ */ (void 0)("span", {
																		className: "rounded bg-primary/15 px-1.5 py-0.2 text-[9px] font-bold text-primary",
																		children: u.isSuperAdmin ? "SUPER ADMIN" : "ADMIN"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 791,
																		columnNumber: 45
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 787,
																	columnNumber: 29
																}, this),
																/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
																	className: "text-[11px] text-muted-foreground truncate max-w-[200px]",
																	children: u.email
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 795,
																	columnNumber: 29
																}, this),
																/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
																	className: "font-mono text-[9px] text-muted-foreground/70",
																	children: u.id
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 798,
																	columnNumber: 29
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 786,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 782,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 781,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-3",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: `inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${u.provider === "google" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : u.provider === "password" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-muted text-muted-foreground"}`,
														children: u.providerLabel
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 807,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 806,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-3",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "space-y-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${u.disabled ? "bg-destructive/15 text-destructive font-semibold" : u.hasFirestoreProfile ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"}`,
															children: u.statutLabel
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 815,
															columnNumber: 27
														}, this), u.hasFirestoreProfile && /* @__PURE__ */ (void 0)("p", {
															className: "text-[10px] text-muted-foreground",
															children: [
																"Profil rempli à ",
																u.stats.tauxCompletionProfil,
																"%"
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 818,
															columnNumber: 53
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 814,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 813,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-3",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "text-[11px] space-y-0.5 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
																className: "text-foreground",
																children: u.stats.candidaturesCount
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 828,
																columnNumber: 29
															}, this),
															" ",
															"candidatures"
														] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 827,
															columnNumber: 27
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
																className: "text-foreground",
																children: u.stats.contactsCount
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 834,
																columnNumber: 29
															}, this),
															" ",
															"contacts •",
															" ",
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
																className: "text-foreground",
																children: u.stats.entreprisesCount
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 838,
																columnNumber: 29
															}, this),
															" ",
															"entreprises"
														] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 833,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 826,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 825,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-3 text-[11px] text-muted-foreground whitespace-nowrap",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
														"Inscrit :",
														" ",
														new Date(u.creeLe).toLocaleDateString("fr-FR")
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 848,
														columnNumber: 25
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
														"Vu :",
														" ",
														new Date(u.dernierAccesLe).toLocaleDateString("fr-FR")
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 852,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 847,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "py-3 px-3 text-right whitespace-nowrap",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center justify-end gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
																size: "icon",
																variant: "ghost",
																className: "size-7 text-muted-foreground hover:text-foreground",
																title: "Inspecter les détails",
																onClick: () => setSelectedUser(u),
																children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 862,
																	columnNumber: 29
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 861,
																columnNumber: 27
															}, this),
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
																size: "icon",
																variant: "ghost",
																className: `size-7 ${u.disabled ? "text-emerald-500 hover:text-emerald-600" : "text-amber-500 hover:text-amber-600"}`,
																title: u.disabled ? "Réactiver le compte" : "Désactiver le compte",
																onClick: () => handleToggleDisabled(u),
																children: u.disabled ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Power, { className: "size-3.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 866,
																	columnNumber: 43
																}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PowerOff, { className: "size-3.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 866,
																	columnNumber: 76
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 865,
																columnNumber: 27
															}, this),
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
																size: "icon",
																variant: "ghost",
																className: "size-7 text-destructive hover:bg-destructive/10",
																title: "Supprimer définitivement ce compte",
																onClick: () => {
																	setUserToDelete(u);
																	setDeleteConfirmationText("");
																},
																children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 873,
																	columnNumber: 29
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 869,
																columnNumber: 27
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 860,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 859,
													columnNumber: 23
												}, this)
											]
										}, u.id, true, {
											fileName: _jsxFileName,
											lineNumber: 779,
											columnNumber: 50
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 767,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 756,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 755,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 683,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 467,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: Boolean(selectedUser),
				onOpenChange: (open) => !open && setSelectedUser(null),
				children: selectedUser && /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (void 0)(DialogHeader, { children: /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [selectedUser.photoUrl ? /* @__PURE__ */ (void 0)("img", {
								src: selectedUser.photoUrl,
								alt: "",
								className: "size-12 rounded-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 889,
								columnNumber: 42
							}, this) : /* @__PURE__ */ (void 0)("div", {
								className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg",
								children: (selectedUser.displayName || selectedUser.email || "U")[0]?.toUpperCase()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 889,
								columnNumber: 133
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(DialogTitle, {
								className: "text-base font-bold",
								children: selectedUser.displayName || `${selectedUser.prenom || ""} ${selectedUser.nom || ""}`.trim() || selectedUser.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 893,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(DialogDescription, {
								className: "text-xs font-mono",
								children: ["UID : ", selectedUser.id]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 896,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 892,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 888,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 887,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 py-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 border border-border/70",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Email :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 906,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-foreground",
										children: selectedUser.email
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 909,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 905,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Fournisseur de connexion :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 914,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-primary",
										children: selectedUser.providerLabel
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 917,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 913,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Date de création :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 922,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: new Date(selectedUser.creeLe).toLocaleString("fr-FR") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 925,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 921,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Dernière connexion :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 930,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: new Date(selectedUser.dernierAccesLe).toLocaleString("fr-FR") }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 933,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 929,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Email vérifié :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 938,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: selectedUser.emailVerified ? "Oui" : "Non" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 941,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 937,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[10px]",
										children: "Profil Firestore :"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 944,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: selectedUser.hasFirestoreProfile ? "Initialisé" : "Non initialisé" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 947,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 943,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 904,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-foreground",
									children: "Actions Administrateur"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 954,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (void 0)(Button, {
											size: "sm",
											variant: selectedUser.disabled ? "default" : "outline",
											onClick: () => handleToggleDisabled(selectedUser),
											className: "gap-1.5 text-xs",
											children: [selectedUser.disabled ? /* @__PURE__ */ (void 0)(Power, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 959,
												columnNumber: 46
											}, this) : /* @__PURE__ */ (void 0)(PowerOff, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 959,
												columnNumber: 79
											}, this), selectedUser.disabled ? "Réactiver le compte" : "Désactiver le compte"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 958,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => handleRevokeSessions(selectedUser),
											className: "gap-1.5 text-xs",
											children: [/* @__PURE__ */ (void 0)(LogOut, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 964,
												columnNumber: 21
											}, this), " Révoquer les sessions"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 963,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											size: "sm",
											variant: selectedUser.isAdmin ? "secondary" : "outline",
											onClick: () => handleToggleAdminRole(selectedUser),
											className: "gap-1.5 text-xs",
											children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 968,
												columnNumber: 21
											}, this), selectedUser.isAdmin ? "Retirer droits admin" : "Promouvoir admin"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 967,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 957,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 953,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 903,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(DialogFooter, { children: /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setSelectedUser(null),
							children: "Fermer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 976,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 975,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 886,
					columnNumber: 26
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 885,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: showAddAdminModal,
				onOpenChange: setShowAddAdminModal,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 988,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 987,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-center text-base font-bold",
							children: "Ajouter un Administrateur"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 990,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-center text-xs text-muted-foreground",
							children: "Octroyez les privilèges d'administration à un compte inscrit dans Firebase Authentication."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 993,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 986,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleAddAdminSubmit,
						className: "space-y-3 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-medium text-foreground block",
									children: "Adresse e-mail ou UID Firebase de l'utilisateur :"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1001,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: newAdminInput,
									onChange: (e) => setNewAdminInput(e.target.value),
									placeholder: "ex: admin@nacora.fr ou 5a7bc89d...",
									className: "text-xs",
									autoFocus: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1004,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1e3,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: [
									"Le rôle sera écrit dans la collection sécurisée",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", {
										className: "font-mono text-primary",
										children: ["/admins/", `{uid}`]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1008,
										columnNumber: 15
									}, this),
									" ",
									"et les Custom Claims Firebase."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1006,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setShowAddAdminModal(false),
									disabled: addingAdmin,
									children: "Annuler"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1013,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									size: "sm",
									disabled: !newAdminInput.trim() || addingAdmin,
									className: "gap-2",
									children: [addingAdmin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1017,
										columnNumber: 32
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1017,
										columnNumber: 80
									}, this), "Promouvoir administrateur"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1016,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1012,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 999,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 985,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 984,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: Boolean(userToDelete),
				onOpenChange: (open) => !open && setUserToDelete(null),
				children: userToDelete && /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (void 0)(DialogHeader, { children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive mb-2",
								children: /* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1030,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1029,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(DialogTitle, {
								className: "text-center text-base font-bold text-destructive",
								children: "Suppression Administrative Définitive"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1032,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(DialogDescription, {
								className: "text-center text-xs text-muted-foreground",
								children: "Cette suppression efface définitivement le compte Firebase Auth et toutes les données Firestore associées."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1035,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1028,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 py-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg bg-muted/40 p-3 space-y-1 border border-border/70",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: "Compte ciblé :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1044,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-foreground",
											children: userToDelete.email || userToDelete.displayName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1045,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1043,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: "UID :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1050,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-[10px] text-foreground",
											children: userToDelete.id
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1051,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1049,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: "Fournisseur :"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1056,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", { children: userToDelete.providerLabel }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1057,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1055,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1042,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "font-medium text-foreground block",
									children: "Pour confirmer, saisissez exactement l'adresse e-mail ou l'UID du compte :"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1062,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Input, {
									value: deleteConfirmationText,
									onChange: (e) => setDeleteConfirmationText(e.target.value),
									placeholder: userToDelete.email || userToDelete.id,
									className: "font-mono text-xs",
									autoFocus: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1066,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1061,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1041,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(DialogFooter, { children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setUserToDelete(null),
							disabled: deletingUser,
							children: "Annuler"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1071,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Button, {
							variant: "destructive",
							size: "sm",
							disabled: deleteConfirmationText.trim().toLowerCase() !== (userToDelete.email || userToDelete.id).toLowerCase() || deletingUser,
							onClick: handleConfirmAdminDelete,
							className: "gap-2",
							children: deletingUser ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1076,
								columnNumber: 21
							}, this), " Suppression..."] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1075,
								columnNumber: 33
							}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1078,
								columnNumber: 21
							}, this), " Supprimer définitivement"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1077,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1074,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1070,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1027,
					columnNumber: 26
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1026,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 426,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
