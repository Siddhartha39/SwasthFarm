import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration read securely from environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "livestockx-bb829.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://livestockx-bb829-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "livestockx-bb829",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "livestockx-bb829.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "363901606461",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:363901606461:web:5c454504a55f2e72072854",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HQEGTPSEFQ"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | undefined;

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    if (typeof window !== 'undefined') {
      isSupported().then(supported => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  }
} catch (error) {
  console.warn("Firebase initialization notice (running with local offline persistence):", error);
}

export { app, auth, db, storage, analytics };
