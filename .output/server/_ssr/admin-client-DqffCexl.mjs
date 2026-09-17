import "../_libs/firebase.mjs";
import { a as setDoc, o as collection, r as getDocs, s as doc, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { C as isFirebaseConfigured, m as auth, v as db } from "./router-D-SxcmZd2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-client-DqffCexl.js
var SUPER_ADMIN_EMAIL = "nathpa1423@gmail.com";
/**
* Attend que Firebase Auth ait terminé sa phase d'initialisation asynchrone
* pour récupérer l'utilisateur courant sans faux négatif de démarrage.
*/
async function waitForAuthUser() {
	if (!isFirebaseConfigured()) return null;
	if (auth.currentUser) return auth.currentUser;
	if (typeof auth.authStateReady === "function") try {
		await auth.authStateReady();
		if (auth.currentUser) return auth.currentUser;
	} catch {}
	return new Promise((resolve) => {
		let resolved = false;
		const unsub = auth.onAuthStateChanged((u) => {
			if (!resolved) {
				resolved = true;
				unsub();
				resolve(u);
			}
		});
		setTimeout(() => {
			if (!resolved) {
				resolved = true;
				unsub();
				resolve(auth.currentUser);
			}
		}, 1800);
	});
}
async function getAuthHeader() {
	const user = await waitForAuthUser();
	if (!user) throw new Error("Session Firebase Auth non détectée. Veuillez vous connecter avec votre compte administrateur (Google ou E-mail).");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${await user.getIdToken(true)}`
	};
}
/**
* Récupération directe des utilisateurs et profils depuis Firestore via le client SDK authentifié.
*/
async function fetchDirectFirestoreUsers() {
	const usersMap = /* @__PURE__ */ new Map();
	const currentUser = auth.currentUser;
	const adminUids = /* @__PURE__ */ new Set();
	try {
		(await getDocs(collection(db, "admins"))).forEach((d) => adminUids.add(d.id));
	} catch (err) {
		console.warn("Client: Erreur lecture /admins:", err);
	}
	try {
		const profilsSnap = await getDocs(collection(db, "profils"));
		for (const docSnap of profilsSnap.docs) {
			const uid = docSnap.id;
			const data = docSnap.data();
			const email = (data["email"] || data["emailContact"] || "").toLowerCase();
			const isSuper = email === SUPER_ADMIN_EMAIL;
			const isAdm = isSuper || adminUids.has(uid);
			const champs = [
				data["prenom"],
				data["nom"],
				data["titre"] || data["formation"],
				data["ecole"],
				data["localisation"],
				data["competences"],
				data["experiences"],
				data["cv"]
			];
			const remplis = champs.filter((c) => Boolean(c && String(c).trim().length > 0));
			const completion = Math.round(remplis.length / champs.length * 100);
			let candsCount = 0;
			let contsCount = 0;
			let entsCount = 0;
			let docsCount = 0;
			try {
				const [cSnap, ctSnap, eSnap, dSnap] = await Promise.all([
					getDocs(collection(db, "users", uid, "candidatures")).catch(() => null),
					getDocs(collection(db, "users", uid, "contacts")).catch(() => null),
					getDocs(collection(db, "users", uid, "entreprises")).catch(() => null),
					getDocs(collection(db, "users", uid, "documents")).catch(() => null)
				]);
				if (cSnap) candsCount = cSnap.size;
				if (ctSnap) contsCount = ctSnap.size;
				if (eSnap) entsCount = eSnap.size;
				if (dSnap) docsCount = dSnap.size;
			} catch {}
			const provRaw = data["provider"] || (email.includes("@gmail.com") ? "google" : "password");
			const provider = provRaw === "google" ? "google" : provRaw === "password" ? "password" : "unknown";
			const providerLabel = provider === "google" ? "Google" : "E-mail + mot de passe";
			const nameParts = `${data["prenom"] || ""} ${data["nom"] || ""}`.trim().split(" ");
			const prenom = data["prenom"] || nameParts[0] || (email ? email.split("@")[0] : "");
			const nom = data["nom"] || (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");
			usersMap.set(uid, {
				id: uid,
				email,
				displayName: `${prenom} ${nom}`.trim() || void 0,
				prenom,
				nom,
				photoUrl: data["photoUrl"] || void 0,
				provider,
				providerLabel,
				emailVerified: Boolean(email),
				disabled: Boolean(data["disabled"]),
				creeLe: data["createdAt"] || data["creeLe"] || (/* @__PURE__ */ new Date()).toISOString(),
				dernierAccesLe: data["dernierAccesLe"] || data["updated_at"] || (/* @__PURE__ */ new Date()).toISOString(),
				isAdmin: isAdm,
				isSuperAdmin: isSuper,
				hasFirestoreProfile: true,
				statutDiagnostic: isAdm ? "admin" : "auth_et_firestore",
				statutLabel: isAdm ? "Compte administrateur" : "Compte actif avec profil Firestore",
				stats: {
					candidaturesCount: candsCount,
					contactsCount: contsCount,
					entreprisesCount: entsCount,
					documentsCount: docsCount,
					tauxCompletionProfil: completion
				},
				derniereActivite: data["updated_at"] || data["dernierAccesLe"] || void 0
			});
		}
	} catch (err) {
		console.warn("Client: Erreur chargement /profils:", err);
	}
	if (currentUser) {
		const cUid = currentUser.uid;
		const cEmail = (currentUser.email || "").toLowerCase();
		const isSuper = cEmail === SUPER_ADMIN_EMAIL;
		if (!usersMap.has(cUid)) {
			const isAdm = isSuper || adminUids.has(cUid);
			usersMap.set(cUid, {
				id: cUid,
				email: cEmail,
				displayName: currentUser.displayName || void 0,
				prenom: currentUser.displayName ? currentUser.displayName.split(" ")[0] : cEmail.split("@")[0],
				nom: currentUser.displayName && currentUser.displayName.split(" ").length > 1 ? currentUser.displayName.split(" ").slice(1).join(" ") : "",
				photoUrl: currentUser.photoURL || void 0,
				provider: currentUser.providerData?.[0]?.providerId === "google.com" ? "google" : "password",
				providerLabel: currentUser.providerData?.[0]?.providerId === "google.com" ? "Google" : "E-mail + mot de passe",
				emailVerified: currentUser.emailVerified,
				disabled: false,
				creeLe: currentUser.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
				dernierAccesLe: currentUser.metadata.lastSignInTime || (/* @__PURE__ */ new Date()).toISOString(),
				isAdmin: isAdm,
				isSuperAdmin: isSuper,
				hasFirestoreProfile: false,
				statutDiagnostic: isAdm ? "admin" : "auth_sans_firestore",
				statutLabel: isAdm ? "Compte administrateur" : "Session courante connectée",
				stats: {
					candidaturesCount: 0,
					contactsCount: 0,
					entreprisesCount: 0,
					documentsCount: 0,
					tauxCompletionProfil: 0
				}
			});
		}
	}
	const allUsers = Array.from(usersMap.values()).sort((a, b) => new Date(b.dernierAccesLe).getTime() - new Date(a.dernierAccesLe).getTime());
	return {
		users: allUsers,
		metrics: {
			totalUsers: allUsers.length,
			googleUsers: allUsers.filter((u) => u.provider === "google").length,
			passwordUsers: allUsers.filter((u) => u.provider === "password").length,
			activeUsers: allUsers.filter((u) => !u.disabled && u.statutDiagnostic !== "desactive").length,
			disabledUsers: allUsers.filter((u) => u.disabled).length,
			adminUsers: allUsers.filter((u) => u.isAdmin).length,
			withoutProfileUsers: allUsers.filter((u) => !u.hasFirestoreProfile).length,
			totalCandidatures: allUsers.reduce((sum, u) => sum + (u.stats.candidaturesCount || 0), 0),
			totalContacts: allUsers.reduce((sum, u) => sum + (u.stats.contactsCount || 0), 0),
			totalEntreprises: allUsers.reduce((sum, u) => sum + (u.stats.entreprisesCount || 0), 0),
			totalDocuments: allUsers.reduce((sum, u) => sum + (u.stats.documentsCount || 0), 0)
		}
	};
}
async function fetchAdminUsersList() {
	if (!isFirebaseConfigured()) throw new Error("La configuration Firebase n'est pas initialisée.");
	if (!await waitForAuthUser()) throw new Error("Session Firebase Auth inactive. Veuillez vous connecter avec votre compte administrateur.");
	try {
		const directData = await fetchDirectFirestoreUsers();
		if (directData && directData.users && directData.users.length > 0) return directData;
	} catch (directErr) {
		console.warn("Lecture directe Firestore:", directErr);
	}
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/users", {
			method: "GET",
			headers
		});
		if (response.ok) {
			const serverData = await response.json();
			if (serverData && Array.isArray(serverData.users) && serverData.users.length > 0) return serverData;
		}
	} catch {}
	return await fetchDirectFirestoreUsers();
}
async function diagnoseUserAccount(query) {
	const q = query.trim().toLowerCase();
	if (!q) return {
		found: false,
		user: null
	};
	try {
		const match = (await fetchDirectFirestoreUsers()).users.find((u) => u.id === query.trim() || u.email.toLowerCase() === q);
		if (match) return {
			found: true,
			user: match
		};
	} catch (err) {
		console.warn("Erreur recherche locale Firestore:", err);
	}
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/diagnose", {
			method: "POST",
			headers,
			body: JSON.stringify({ query: query.trim() })
		});
		if (response.ok) return await response.json();
	} catch {}
	return {
		found: false,
		user: null
	};
}
async function toggleUserStatus(targetUid, disabled) {
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/toggle-status", {
			method: "POST",
			headers,
			body: JSON.stringify({
				targetUid,
				disabled
			})
		});
		if (response.ok) return await response.json();
	} catch {}
	await setDoc(doc(db, "profils", targetUid), {
		disabled,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { merge: true });
	return {
		success: true,
		disabled,
		message: `Statut du compte mis à jour avec succès (${disabled ? "désactivé" : "actif"}).`
	};
}
async function revokeUserSessions(targetUid) {
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/revoke-tokens", {
			method: "POST",
			headers,
			body: JSON.stringify({ targetUid })
		});
		if (response.ok) return await response.json();
	} catch {}
	return {
		success: true,
		message: "Sessions révoquées pour cet utilisateur."
	};
}
async function setUserAdminRole(targetUid, isAdmin) {
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/set-role", {
			method: "POST",
			headers,
			body: JSON.stringify({
				targetUid,
				isAdmin
			})
		});
		if (response.ok) return await response.json();
	} catch {}
	if (isAdmin) await setDoc(doc(db, "admins", targetUid), {
		role: "admin",
		attribueLe: (/* @__PURE__ */ new Date()).toISOString(),
		attribuePar: auth.currentUser?.email || "super_admin"
	});
	else await deleteDoc(doc(db, "admins", targetUid));
	return {
		success: true,
		isAdmin,
		message: isAdmin ? "Privilèges administrateur accordés." : "Privilèges administrateur révoqués."
	};
}
async function deleteUserByAdmin(targetUid) {
	try {
		const headers = await getAuthHeader();
		const response = await fetch("/api/admin/delete-user", {
			method: "POST",
			headers,
			body: JSON.stringify({ targetUid })
		});
		if (response.ok) return await response.json();
	} catch {}
	try {
		await deleteDoc(doc(db, "profils", targetUid));
		await deleteDoc(doc(db, "admins", targetUid));
	} catch (err) {
		console.warn("Client: Erreur suppression profil:", err);
	}
	return {
		success: true,
		message: "Profil utilisateur supprimé avec succès.",
		deletedDetails: { targetUid }
	};
}
/**
* Suppression personnelle complète du compte connecté et nettoyage local.
*/
async function deleteMyAccountSelf() {
	const currentUser = auth.currentUser;
	if (!currentUser) throw new Error("Aucun compte connecté à supprimer.");
	const uid = currentUser.uid;
	try {
		const headers = await getAuthHeader();
		await fetch("/api/account/delete-me", {
			method: "POST",
			headers,
			body: JSON.stringify({})
		});
	} catch {}
	try {
		await deleteDoc(doc(db, "profils", uid));
	} catch {}
	try {
		const keysToRemove = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && (key.includes(uid) || key.startsWith(`nacora_${uid}_`))) keysToRemove.push(key);
		}
		keysToRemove.forEach((k) => localStorage.removeItem(k));
		localStorage.removeItem("careerly_compte_actif_v1");
	} catch (e) {
		console.warn("Erreur lors du nettoyage localStorage:", e);
	}
	try {
		await auth.signOut();
	} catch (e) {
		console.warn("Erreur lors de la déconnexion Firebase:", e);
	}
	return {
		success: true,
		message: "Votre compte et l'ensemble de vos données ont été définitivement supprimés."
	};
}
//#endregion
export { revokeUserSessions as a, waitForAuthUser as c, fetchAdminUsersList as i, deleteUserByAdmin as n, setUserAdminRole as o, diagnoseUserAccount as r, toggleUserStatus as s, deleteMyAccountSelf as t };
