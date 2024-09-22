import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6k8IEesl5N3NhRfveoclg8N7Q1pQ8blc",
  authDomain: "simple-app-78dbb.firebaseapp.com",
  projectId: "simple-app-78dbb",
  storageBucket: "simple-app-78dbb.appspot.com",
  messagingSenderId: "506942132441",
  appId: "1:506942132441:web:42451ead9ec4247677aec8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)