import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuGD7oocCzuiyicZxpYtnu80vvTeXDA6U",
  authDomain: "safeher-43cd3.firebaseapp.com",
  projectId: "safeher-43cd3",
  storageBucket: "safeher-43cd3.firebasestorage.app",
  messagingSenderId: "1065994317910",
  appId: "1:1065994317910:web:f53a29d4b9fe0a70914bf7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { auth, db, googleProvider };
