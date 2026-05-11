import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-2afaa.firebaseapp.com",
  projectId: "authexamnotes-2afaa",
  storageBucket: "authexamnotes-2afaa.firebasestorage.app",
  messagingSenderId: "1009553046390",
  appId: "1:1009553046390:web:2da40db728f1501d73d857",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export { auth, provider };
