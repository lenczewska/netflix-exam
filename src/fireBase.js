import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeq6zHsw7B5TtixYPy5GTaWoBzVPUcQ6Q",
  authDomain: "netflix-clone-2b1c4.firebaseapp.com",
  projectId: "netflix-clone-2b1c4",
  storageBucket: "netflix-clone-2b1c4.firebasestorage.app",
  messagingSenderId: "901320345512",
  appId: "1:901320345512:web:1bfe4aa3f2ef5cae3dbf9d",
  measurementId: "G-MZ3P6P57EJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ---------------- SIGN UP --------------------
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// ---------------- LOGIN ----------------------
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// ---------------- LOGOUT ---------------------
const logout = () => signOut(auth);

export { auth, db, login, signup, logout };
