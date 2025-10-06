// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBYJATJ-a2hVYwz18p3iB4-oVqUWuwpNs",
  authDomain: "weightmate-79469.firebaseapp.com",
  projectId: "weightmate-79469",
  storageBucket: "weightmate-79469.firebasestorage.app",
  messagingSenderId: "75474028125",
  appId: "1:75474028125:web:dc3ee29aaf728eb0bb6fb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
