import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7NVfqgI941mzOQsUCBUGzjceHD9pVXrY",
  authDomain: "todak-todak.firebaseapp.com",
  projectId: "todak-todak",
  storageBucket: "todak-todak.appspot.com",
  messagingSenderId: "925816719269",
  appId: "1:925816719269:web:8fe0c6677e358830caca4c",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
