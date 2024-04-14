// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore ,doc,setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBylnKTmot4_l_MS84wOFCpBoTt6kuzAlE",
  authDomain: "Ycitycruise.firebaseapp.com",
  projectId: "citycruise",
  storageBucket: "citycruise.appspot.com",
  messagingSenderId: "813854511309",
  appId: "1:813854511309:android:d2d75df43608920e439984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db,storage}