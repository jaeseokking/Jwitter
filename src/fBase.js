import {initializeApp} from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

  //firebase 설정값
const app = initializeApp(firebaseConfig);

//권한 요청
export const auth = getAuth(); 
export const createUser = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
export const googleAuthProvider = GoogleAuthProvider;
export const githubAuthProvider = GithubAuthProvider;
export const signInPopup = signInWithPopup;
export const dbService = getFirestore();


