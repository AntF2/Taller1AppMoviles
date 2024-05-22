// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhsGa03mmNrLYcr3Dg6-hs1st_rCUJczs",
  authDomain: "app-movil-5735d.firebaseapp.com",
  databaseURL: "https://app-movil-5735d-default-rtdb.firebaseio.com",
  projectId: "app-movil-5735d",
  storageBucket: "app-movil-5735d.appspot.com",
  messagingSenderId: "501685454930",
  appId: "1:501685454930:web:10cbf0e068726820af378b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);