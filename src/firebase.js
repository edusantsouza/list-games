import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/compat/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCih4p1Wb0DPtWPP-NpmNxxvL5E4dFwGvo",
  authDomain: "game-production-a138d.firebaseapp.com",
  projectId: "game-production-a138d",
  storageBucket: "game-production-a138d.appspot.com",
  messagingSenderId: "876724391839",
  appId: "1:876724391839:web:da723b29dfa325eccf37aa"
  };

const app = firebase.initializeApp(firebaseConfig)


export const db = getFirestore(app)

export const myAuth = app.auth()

export default app

