import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuGD7oocCzuiyicZxpYtnu80vvTeXDA6U",
  authDomain: "safeher-43cd3.firebaseapp.com",
  projectId: "safeher-43cd3",
  storageBucket: "safeher-43cd3.firebasestorage.app",
  messagingSenderId: "1065994317910",
  appId: "1:1065994317910:web:f53a29d4b9fe0a70914bf7"
};

/* Web Client ID do OAuth do Google (NAO e o Android Client ID).
   Pegue em: Google Cloud Console > APIs & Services > Credentials > "OAuth 2.0
   Client IDs" > o item do tipo "Web application" do projeto safeher-43cd3
   (o Firebase ja cria um automaticamente ao ativar o provedor Google em
   Authentication > Sign-in method). E ele que o plugin nativo usa no Android
   para o login funcionar tanto no app quanto na versao web. */
const GOOGLE_WEB_CLIENT_ID = "1065994317910-uaal613dqrfm7hrr485d5nc6nrc4u85h.apps.googleusercontent.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { auth, db, googleProvider, GoogleAuthProvider, signInWithCredential, GOOGLE_WEB_CLIENT_ID };
