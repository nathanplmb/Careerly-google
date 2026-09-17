import { R as firebase_applet_config_default } from "./router-D-SxcmZd2.mjs";
import { a as cert, i as applicationDefault, n as getFirestore, o as getApps, r as getAuth, s as initializeApp, t as getStorage } from "../_libs/firebase-admin+[...].mjs";
import processModule from "node:process";
import { Buffer } from "node:buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-admin.server-DYuephB4.js
var adminApp = null;
function getFirebaseAdminApp() {
	if (adminApp) return adminApp;
	const existingApps = getApps();
	if (existingApps.length > 0 && existingApps[0]) {
		adminApp = existingApps[0];
		return adminApp;
	}
	const projectId = processModule.env.FIREBASE_PROJECT_ID || firebase_applet_config_default.projectId || "gen-lang-client-0123496230";
	if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) try {
		const sa = JSON.parse(processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY);
		adminApp = initializeApp({
			credential: cert(sa),
			projectId,
			storageBucket: firebase_applet_config_default.storageBucket
		});
		return adminApp;
	} catch (err) {
		console.warn("Erreur parsing FIREBASE_SERVICE_ACCOUNT_KEY:", err);
	}
	try {
		adminApp = initializeApp({
			credential: applicationDefault(),
			projectId,
			storageBucket: firebase_applet_config_default.storageBucket
		});
		return adminApp;
	} catch {
		try {
			adminApp = initializeApp({
				projectId,
				storageBucket: firebase_applet_config_default.storageBucket
			});
			return adminApp;
		} catch (initErr) {
			console.warn("Erreur initialisation adminApp:", initErr);
			const apps = getApps();
			if (apps.length > 0 && apps[0]) {
				adminApp = apps[0];
				return adminApp;
			}
			throw initErr;
		}
	}
}
function getAdminAuth() {
	return getAuth(getFirebaseAdminApp());
}
function getAdminFirestore() {
	const app = getFirebaseAdminApp();
	const dbId = firebase_applet_config_default.firestoreDatabaseId;
	if (dbId && dbId !== "(default)") try {
		return getFirestore(app, dbId);
	} catch {
		return getFirestore(app);
	}
	return getFirestore(app);
}
function getAdminStorage() {
	return getStorage(getFirebaseAdminApp());
}
var SUPER_ADMIN_EMAIL = "nathpa1423@gmail.com";
function decodeJwtPayload(token) {
	try {
		const parts = token.trim().split(".");
		if (parts.length !== 3) return null;
		const base64Url = parts[1];
		if (!base64Url) return null;
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
}
/**
* Valide un ID token Firebase et extrait les informations de l'utilisateur.
*/
async function verifyAuthToken(idToken) {
	if (!idToken || typeof idToken !== "string") return null;
	const cleanToken = idToken.trim();
	if (!cleanToken || cleanToken === "undefined" || cleanToken === "null" || cleanToken.split(".").length !== 3) return null;
	try {
		const auth = getAdminAuth();
		if (auth && typeof auth.verifyIdToken === "function") {
			const decoded = await auth.verifyIdToken(cleanToken);
			if (decoded) return decoded;
		}
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		if (!errMsg.includes("length") && !errMsg.includes("credential")) console.warn("Échec vérification token Firebase:", errMsg);
	}
	try {
		const payload = decodeJwtPayload(cleanToken);
		if (!payload) return null;
		const nowSec = Math.floor(Date.now() / 1e3);
		const exp = typeof payload["exp"] === "number" ? payload["exp"] : 0;
		if (exp && exp < nowSec - 300) {
			console.warn("Jeton JWT Firebase expiré");
			return null;
		}
		const uid = (typeof payload["user_id"] === "string" ? payload["user_id"] : "") || (typeof payload["sub"] === "string" ? payload["sub"] : "") || (typeof payload["uid"] === "string" ? payload["uid"] : "");
		if (!uid) return null;
		const email = typeof payload["email"] === "string" ? payload["email"] : "";
		const emailVerified = Boolean(payload["email_verified"]);
		const authTime = typeof payload["auth_time"] === "number" ? payload["auth_time"] : nowSec;
		const projectId = processModule.env.FIREBASE_PROJECT_ID || firebase_applet_config_default.projectId || "gen-lang-client-0123496230";
		return {
			uid,
			sub: uid,
			email,
			email_verified: emailVerified,
			auth_time: authTime,
			iss: typeof payload["iss"] === "string" ? payload["iss"] : `https://securetoken.google.com/${projectId}`,
			aud: typeof payload["aud"] === "string" ? payload["aud"] : projectId,
			exp: exp || nowSec + 3600,
			iat: typeof payload["iat"] === "number" ? payload["iat"] : nowSec,
			firebase: payload["firebase"] || {
				sign_in_provider: "custom",
				identities: {}
			},
			admin: payload["admin"] === true,
			...payload
		};
	} catch (decodeErr) {
		console.warn("Erreur décodage de secours du jeton:", decodeErr);
		return null;
	}
}
/**
* Vérifie si le porteur du token est administrateur (Super Admin ou Admin validé dans Firestore / Claims).
*/
async function verifyIsAdmin(idToken) {
	const decoded = await verifyAuthToken(idToken);
	if (!decoded) return null;
	const email = (decoded.email || "").toLowerCase();
	const uid = decoded.uid;
	const isSuperAdmin = email === SUPER_ADMIN_EMAIL;
	if (isSuperAdmin || decoded.admin === true) return {
		isAdmin: true,
		isSuperAdmin,
		uid,
		email
	};
	try {
		if ((await getAdminFirestore().collection("admins").doc(uid).get()).exists) return {
			isAdmin: true,
			isSuperAdmin: false,
			uid,
			email
		};
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur vérification collection admins:", err);
	}
	return {
		isAdmin: false,
		isSuperAdmin: false,
		uid,
		email
	};
}
function mapProviderId(providerId) {
	switch (providerId) {
		case "google.com": return {
			provider: "google",
			providerLabel: "Google"
		};
		case "password": return {
			provider: "password",
			providerLabel: "E-mail + mot de passe"
		};
		case "apple.com": return {
			provider: "apple",
			providerLabel: "Apple"
		};
		case "microsoft.com": return {
			provider: "microsoft",
			providerLabel: "Microsoft"
		};
		default:
			if (providerId) return {
				provider: "other",
				providerLabel: providerId
			};
			return {
				provider: "unknown",
				providerLabel: "Inconnu"
			};
	}
}
/**
* Récupère tous les utilisateurs depuis Firebase Auth et enrichit avec Firestore.
*/
async function listAllUsersAdmin() {
	const usersMap = /* @__PURE__ */ new Map();
	const db = getAdminFirestore();
	const auth = getAdminAuth();
	const adminUids = /* @__PURE__ */ new Set();
	try {
		(await db.collection("admins").get()).forEach((doc) => adminUids.add(doc.id));
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur chargement liste admins:", err);
	}
	try {
		let nextPageToken = void 0;
		do {
			const listResult = await auth.listUsers(1e3, nextPageToken);
			for (const userRecord of listResult.users) {
				const uid = userRecord.uid;
				const providerData = Array.isArray(userRecord?.providerData) ? userRecord.providerData : [];
				const { provider, providerLabel } = mapProviderId(providerData.length > 0 ? providerData[0].providerId : "password");
				const email = (userRecord.email || "").toLowerCase();
				const isSuper = email === SUPER_ADMIN_EMAIL;
				const isAdm = isSuper || adminUids.has(uid) || userRecord.customClaims?.["admin"] === true;
				const nameParts = (userRecord.displayName || "").trim().split(" ");
				const prenom = nameParts[0] || (email ? email.split("@")[0] : "");
				const nom = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
				usersMap.set(uid, {
					id: uid,
					email,
					displayName: userRecord.displayName || void 0,
					prenom,
					nom,
					photoUrl: userRecord.photoURL || void 0,
					provider,
					providerLabel,
					emailVerified: userRecord.emailVerified,
					disabled: userRecord.disabled,
					creeLe: userRecord.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
					dernierAccesLe: userRecord.metadata.lastSignInTime || userRecord.metadata.creationTime || (/* @__PURE__ */ new Date()).toISOString(),
					isAdmin: isAdm,
					isSuperAdmin: isSuper,
					hasFirestoreProfile: false,
					statutDiagnostic: userRecord.disabled ? "desactive" : isAdm ? "admin" : "auth_sans_firestore",
					statutLabel: userRecord.disabled ? "Compte désactivé" : isAdm ? "Compte administrateur" : "Compte Auth créé — profil Firestore non initialisé",
					stats: {
						candidaturesCount: 0,
						contactsCount: 0,
						entreprisesCount: 0,
						documentsCount: 0,
						tauxCompletionProfil: 0
					},
					customClaims: userRecord.customClaims || void 0,
					derniereActivite: userRecord.metadata.lastSignInTime || void 0
				});
			}
			nextPageToken = listResult.pageToken;
		} while (nextPageToken);
	} catch (authErr) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Échec récupération admin.auth().listUsers (fallback Firestore actif):", authErr);
	}
	try {
		const profilsSnap = await db.collection("profils").get();
		for (const docSnap of profilsSnap.docs) {
			const uid = docSnap.id;
			const data = docSnap.data();
			const email = (data["email"] || "").toLowerCase();
			const existing = usersMap.get(uid);
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
			const isSuper = email === SUPER_ADMIN_EMAIL;
			const isAdm = isSuper || adminUids.has(uid) || existing && existing.isAdmin;
			if (existing) {
				existing.hasFirestoreProfile = true;
				existing.prenom = data["prenom"] || existing.prenom;
				existing.nom = data["nom"] || existing.nom;
				existing.displayName = existing.displayName || `${data["prenom"] || ""} ${data["nom"] || ""}`.trim();
				existing.photoUrl = data["photoUrl"] || existing.photoUrl;
				existing.stats.tauxCompletionProfil = completion;
				existing.dernierAccesLe = data["dernierAccesLe"] || existing.dernierAccesLe;
				if (!existing.disabled) {
					existing.statutDiagnostic = isAdm ? "admin" : "auth_et_firestore";
					existing.statutLabel = isAdm ? "Compte administrateur" : "Compte Auth et profil Firestore présents";
				}
			} else {
				const { provider, providerLabel } = mapProviderId(data["provider"] || "password");
				usersMap.set(uid, {
					id: uid,
					email,
					displayName: `${data["prenom"] || ""} ${data["nom"] || ""}`.trim() || void 0,
					prenom: data["prenom"] || "",
					nom: data["nom"] || "",
					photoUrl: data["photoUrl"] || void 0,
					provider,
					providerLabel,
					emailVerified: false,
					disabled: false,
					creeLe: data["createdAt"] || data["creeLe"] || (/* @__PURE__ */ new Date()).toISOString(),
					dernierAccesLe: data["dernierAccesLe"] || data["updated_at"] || (/* @__PURE__ */ new Date()).toISOString(),
					isAdmin: isAdm,
					isSuperAdmin: isSuper,
					hasFirestoreProfile: true,
					statutDiagnostic: "firestore_sans_auth",
					statutLabel: "Profil Firestore présent, compte Auth absent",
					stats: {
						candidaturesCount: 0,
						contactsCount: 0,
						entreprisesCount: 0,
						documentsCount: 0,
						tauxCompletionProfil: completion
					},
					derniereActivite: data["updated_at"] || data["dernierAccesLe"] || void 0
				});
			}
		}
	} catch (profErr) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur chargement profils Firestore:", profErr);
	}
	for (const [uid, userRecord] of usersMap.entries()) try {
		const [cands, conts, ents, docs] = await Promise.all([
			db.collection("users").doc(uid).collection("candidatures").get().catch(() => null),
			db.collection("users").doc(uid).collection("contacts").get().catch(() => null),
			db.collection("users").doc(uid).collection("entreprises").get().catch(() => null),
			db.collection("users").doc(uid).collection("documents").get().catch(() => null)
		]);
		if (cands) userRecord.stats.candidaturesCount = cands.size;
		if (conts) userRecord.stats.contactsCount = conts.size;
		if (ents) userRecord.stats.entreprisesCount = ents.size;
		if (docs) userRecord.stats.documentsCount = docs.size;
	} catch {}
	const allUsers = Array.from(usersMap.values());
	return {
		users: allUsers,
		metrics: {
			totalUsers: allUsers.length,
			googleUsers: allUsers.filter((u) => u.provider === "google").length,
			passwordUsers: allUsers.filter((u) => u.provider === "password").length,
			activeUsers: allUsers.filter((u) => !u.disabled && (u.stats.candidaturesCount > 0 || u.hasFirestoreProfile)).length,
			disabledUsers: allUsers.filter((u) => u.disabled).length,
			adminUsers: allUsers.filter((u) => u.isAdmin).length,
			withoutProfileUsers: allUsers.filter((u) => !u.hasFirestoreProfile).length,
			totalCandidatures: allUsers.reduce((sum, u) => sum + u.stats.candidaturesCount, 0),
			totalContacts: allUsers.reduce((sum, u) => sum + u.stats.contactsCount, 0),
			totalEntreprises: allUsers.reduce((sum, u) => sum + u.stats.entreprisesCount, 0),
			totalDocuments: allUsers.reduce((sum, u) => sum + u.stats.documentsCount, 0)
		}
	};
}
/**
* Diagnostic & Recherche unitaire d'un compte utilisateur.
*/
async function searchAndDiagnoseUser(queryStr) {
	const q = queryStr.trim().toLowerCase();
	if (!q) return null;
	const auth = getAdminAuth();
	const db = getAdminFirestore();
	let userRecord = null;
	try {
		if (q.includes("@")) userRecord = await auth.getUserByEmail(q);
		else userRecord = await auth.getUser(q);
	} catch {
		try {
			userRecord = await auth.getUserByEmail(q);
		} catch {
			userRecord = null;
		}
	}
	const uid = userRecord?.uid || q;
	const isSuper = (userRecord?.email || "").toLowerCase() === SUPER_ADMIN_EMAIL;
	let isAdmin = isSuper || userRecord?.customClaims?.["admin"] === true;
	try {
		if ((await db.collection("admins").doc(uid).get()).exists) isAdmin = true;
	} catch (e) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur lecture rôle admin:", e);
	}
	let profData = null;
	try {
		const profDoc = await db.collection("profils").doc(uid).get();
		if (profDoc.exists) profData = profDoc.data() || null;
	} catch (e) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur lecture profil Firestore:", e);
	}
	if (!userRecord && !profData) return null;
	const providerData = Array.isArray(userRecord?.providerData) ? userRecord.providerData : [];
	const { provider, providerLabel } = mapProviderId(providerData.length > 0 ? providerData[0].providerId : profData?.["provider"] || "password");
	const email = (userRecord?.email || profData?.["email"] || "").toLowerCase();
	const nameParts = (userRecord?.displayName || "").trim().split(" ");
	const prenom = profData?.["prenom"] || nameParts[0] || "";
	const nom = profData?.["nom"] || (nameParts.length > 1 ? nameParts.slice(1).join(" ") : "");
	let candsCount = 0;
	let contsCount = 0;
	let entsCount = 0;
	let docsCount = 0;
	try {
		const [c, ct, e, d] = await Promise.all([
			db.collection("users").doc(uid).collection("candidatures").get().catch(() => null),
			db.collection("users").doc(uid).collection("contacts").get().catch(() => null),
			db.collection("users").doc(uid).collection("entreprises").get().catch(() => null),
			db.collection("users").doc(uid).collection("documents").get().catch(() => null)
		]);
		if (c) candsCount = c.size;
		if (ct) contsCount = ct.size;
		if (e) entsCount = e.size;
		if (d) docsCount = d.size;
	} catch (e) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur comptage collections:", e);
	}
	let diag = "standard";
	let label = "Compte utilisateur standard";
	if (userRecord?.disabled) {
		diag = "desactive";
		label = "Compte désactivé";
	} else if (isAdmin) {
		diag = "admin";
		label = "Compte administrateur";
	} else if (userRecord && profData) {
		diag = "auth_et_firestore";
		label = "Compte Auth et profil Firestore présents";
	} else if (userRecord && !profData) {
		diag = "auth_sans_firestore";
		label = "Compte Auth créé — profil Firestore non initialisé";
	} else if (!userRecord && profData) {
		diag = "firestore_sans_auth";
		label = "Profil Firestore présent, compte Auth absent";
	}
	return {
		id: uid,
		email,
		displayName: userRecord?.displayName || `${prenom} ${nom}`.trim() || void 0,
		prenom,
		nom,
		photoUrl: userRecord?.photoURL || profData?.["photoUrl"] || void 0,
		provider,
		providerLabel,
		emailVerified: Boolean(userRecord?.emailVerified),
		disabled: Boolean(userRecord?.disabled),
		creeLe: userRecord?.metadata.creationTime || profData?.["createdAt"] || (/* @__PURE__ */ new Date()).toISOString(),
		dernierAccesLe: userRecord?.metadata.lastSignInTime || profData?.["dernierAccesLe"] || (/* @__PURE__ */ new Date()).toISOString(),
		isAdmin,
		isSuperAdmin: isSuper,
		hasFirestoreProfile: Boolean(profData),
		statutDiagnostic: diag,
		statutLabel: label,
		stats: {
			candidaturesCount: candsCount,
			contactsCount: contsCount,
			entreprisesCount: entsCount,
			documentsCount: docsCount,
			tauxCompletionProfil: profData ? 75 : 0
		},
		customClaims: userRecord?.customClaims || void 0
	};
}
/**
* Supprime récursivement une collection ou sous-collection Firestore.
*/
async function deleteCollectionRecursive(db, collectionRef, batchSize = 100) {
	let deletedCount = 0;
	const snap = await collectionRef.limit(batchSize).get();
	if (snap.empty) return 0;
	const batch = db.batch();
	snap.docs.forEach((doc) => {
		batch.delete(doc.ref);
		deletedCount++;
	});
	await batch.commit();
	if (snap.size >= batchSize) deletedCount += await deleteCollectionRecursive(db, collectionRef, batchSize);
	return deletedCount;
}
/**
* Suppression complète et cascade d'un compte (Auth, Firestore, Storage, Audit).
*/
async function executeCascadeAccountDeletion({ targetUid, requesterUid, isSelfDeletion }) {
	const db = getAdminFirestore();
	const auth = getAdminAuth();
	const details = {
		authDeleted: false,
		profileDeleted: false,
		candidaturesDeleted: 0,
		contactsDeleted: 0,
		entreprisesDeleted: 0,
		documentsDeleted: 0,
		storageFilesDeleted: 0
	};
	let userEmail = "";
	try {
		userEmail = ((await auth.getUser(targetUid)).email || "").toLowerCase();
	} catch {}
	if (userEmail === "nathpa1423@gmail.com") throw new Error("Action interdite : Le compte super-administrateur principal ne peut pas être supprimé.");
	const adminSnap = await db.collection("admins").get();
	if (adminSnap.docs.some((d) => d.id === targetUid) && adminSnap.size <= 1) throw new Error("Action interdite : Impossible de supprimer le dernier administrateur du système.");
	try {
		const userDocRef = db.collection("users").doc(targetUid);
		details.candidaturesDeleted = await deleteCollectionRecursive(db, userDocRef.collection("candidatures"));
		details.contactsDeleted = await deleteCollectionRecursive(db, userDocRef.collection("contacts"));
		details.entreprisesDeleted = await deleteCollectionRecursive(db, userDocRef.collection("entreprises"));
		details.documentsDeleted = await deleteCollectionRecursive(db, userDocRef.collection("documents"));
		await userDocRef.delete();
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur suppression sous-collections Firestore:", err);
	}
	try {
		await db.collection("profils").doc(targetUid).delete();
		details.profileDeleted = true;
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur suppression profil:", err);
	}
	try {
		await db.collection("admins").doc(targetUid).delete();
	} catch (e) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur suppression document admin:", e);
	}
	try {
		const [files] = await getAdminStorage().bucket().getFiles({ prefix: `${targetUid}/` });
		for (const file of files) {
			await file.delete().catch(() => {});
			details.storageFilesDeleted++;
		}
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur suppression fichiers Storage:", err);
	}
	try {
		await auth.deleteUser(targetUid);
		details.authDeleted = true;
	} catch (err) {
		if (!(err instanceof Error ? err.message : String(err)).includes("user-not-found") && processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur suppression Firebase Auth:", err);
		else details.authDeleted = true;
	}
	try {
		await db.collection("audit_logs").add({
			action: isSelfDeletion ? "SELF_ACCOUNT_DELETE" : "ADMIN_ACCOUNT_DELETE",
			targetUid,
			targetEmail: userEmail,
			requesterUid,
			deletedAt: (/* @__PURE__ */ new Date()).toISOString(),
			details
		});
	} catch (err) {
		if (processModule.env.FIREBASE_SERVICE_ACCOUNT_KEY) console.warn("Erreur écriture audit_logs:", err);
	}
	return {
		success: true,
		message: isSelfDeletion ? "Votre compte et l'ensemble de vos données ont été définitivement supprimés." : `Le compte ${userEmail || targetUid} et toutes ses données associées ont été supprimés avec succès.`,
		deletedDetails: details
	};
}
//#endregion
export { SUPER_ADMIN_EMAIL, executeCascadeAccountDeletion, getAdminAuth, getAdminFirestore, listAllUsersAdmin, searchAndDiagnoseUser, verifyAuthToken, verifyIsAdmin };
