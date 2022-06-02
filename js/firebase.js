// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc3t14DpqYxBBG26Q8qgjSHC7x9mSo498",
  authDomain: "pasiflora-cd77e.firebaseapp.com",
  projectId: "pasiflora-cd77e",
  storageBucket: "pasiflora-cd77e.appspot.com",
  messagingSenderId: "798075046796",
  appId: "1:798075046796:web:bcb39b6a3df980e3af24a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const dbCollection = collection(db, 'productos')

export const fetchProducts = () => {
    return getDocs(dbCollection);
}

export const fetchFilteredProducts = (nombreCategoria) => {
  const q = query(dbCollection, where('categoria', "==", nombreCategoria));
  return getDocs(q);
}

export const fetchNuevosOfertas = (categoria) => {
  const q = query(dbCollection, where(categoria, "==", true));
  return getDocs(q);
}