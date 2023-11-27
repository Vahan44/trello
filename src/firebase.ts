import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyADyGlQxQdj04wcr1wMWjcqQiScCwShyDw",
  authDomain: "news-portal-typescript.firebaseapp.com",
  projectId: "news-portal-typescript",
  storageBucket: "news-portal-typescript.appspot.com",
  messagingSenderId: "842389783565",
  appId: "1:842389783565:web:b75794f38ad1bb593c4144",
  measurementId: "G-YVSXMX5DMT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth, app}