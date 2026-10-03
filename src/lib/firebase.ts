import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Real configuration from existing Swasth Farm codebase
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwtvb0us8Jabbv2jhgwI44VtOSKaE2uSs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bio-security-94a4d.firebaseapp.com",
  databaseURL: "https://bio-security-94a4d-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bio-security-94a4d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bio-security-94a4d.firebasestorage.app",
  messagingSenderId: "38426842781",
  appId: "1:38426842781:web:dc318acde77c0af51b2674",
  measurementId: "G-7TEDETV8B8"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization warning (running in adaptive offline/mock fallback):", error);
}

export { app, auth, db, storage };
