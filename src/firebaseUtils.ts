import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0ybQdzfihqslkgokEYgVi6KQP_mTn28Q",
    authDomain: "pakpak-cebea.firebaseapp.com",
    projectId: "pakpak-cebea",
    storageBucket: "pakpak-cebea.appspot.com",
    messagingSenderId: "347170407823",
    appId: "1:347170407823:web:04b1d5f2ab8953925037fa"
  };
  
  // Initialize Firebase
  export const initFirebase = () => initializeApp(firebaseConfig);
  
  export const firebaseDB = getFirestore(initFirebase());
