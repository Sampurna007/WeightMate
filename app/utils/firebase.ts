import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

//  app's Firebase configuration
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyDBYJATJ-a2hVYwz18p3iB4-oVqUWuwpNs",
  authDomain: "weightmate-79469.firebaseapp.com",
  projectId: "weightmate-79469",
  storageBucket: "weightmate-79469.firebasestorage.app",
  messagingSenderId: "75474028125",
  appId: "1:75474028125:web:dc3ee29aaf728eb0bb6fb4",
};

// Initializes Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Export typed Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
