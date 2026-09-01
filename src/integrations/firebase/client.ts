import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfigJson from "../../../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:
    firebaseConfigJson.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:
    firebaseConfigJson.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    firebaseConfigJson.storageBucket ||
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    firebaseConfigJson.messagingSenderId ||
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseConfigJson.appId || import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =
  firebaseConfigJson.firestoreDatabaseId &&
  firebaseConfigJson.firestoreDatabaseId !== "(default)"
    ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
    : getFirestore(app);

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

// Validation connection
async function testFirebaseConnection() {
  if (!isFirebaseConfigured()) return;
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("Firebase Firestore is currently offline.");
    }
  }
}

if (typeof window !== "undefined") {
  testFirebaseConnection().catch(() => {});
}
