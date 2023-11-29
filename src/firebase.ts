import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBqTMB5Gyz4I_wOYTs3szXLNIHT-s30jyg",
  authDomain: "trello-7ca04.firebaseapp.com",
  projectId: "trello-7ca04",
  storageBucket: "trello-7ca04.appspot.com",
  messagingSenderId: "934740422241",
  appId: "1:934740422241:web:41288cdb00fe739a03c420",
  measurementId: "G-QSY3VJP2ZJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db };

