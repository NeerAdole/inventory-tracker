// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT-cYyGaHMLG7gVMMubmZG1TrnJ6qDp8A",
  authDomain: "inventory-management-725fb.firebaseapp.com",
  projectId: "inventory-management-725fb",
  storageBucket: "inventory-management-725fb.appspot.com",
  messagingSenderId: "674565393899",
  appId: "1:674565393899:web:d358a635b985238e661dae",
  measurementId: "G-T5BCHVNVCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export{firestore}