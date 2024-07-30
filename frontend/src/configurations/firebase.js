import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMlKuMGlC65PwjbivOTASglaHEfTkLwBU",
  authDomain: "blog-website-4b593.firebaseapp.com",
  projectId: "blog-website-4b593",
  storageBucket: "blog-website-4b593.appspot.com",
  messagingSenderId: "472505037867",
  appId: "1:472505037867:web:ff6a86252d53765ffc666e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);