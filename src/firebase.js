import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8leQF6QX5ILZ5rDkXpq05ZQLweeHr0wM",
    authDomain: "authenciation-21143.firebaseapp.com",
    projectId: "authenciation-21143",
    // ...rest of config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
