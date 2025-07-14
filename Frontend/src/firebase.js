// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = { 
 apiKey: "AIzaSyC78sdjylwe3oze2uV3G3SGLnJw3QDiehY",
  authDomain: "ffmern.firebaseapp.com",
  projectId: "ffmern",
  storageBucket: "ffmern.appspot.com",
  messagingSenderId: "598919056211",
  appId: "1:598919056211:web:33712e87ee9bb26b022fa6",
  measurementId: "G-PRZ9X3WN4G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
