import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/compat/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZMzXyhkYC_-ZuxKoykc-1xOmQRUTj-PQ",
    authDomain: "game-development-6063a.firebaseapp.com",
    projectId: "game-development-6063a",
    storageBucket: "game-development-6063a.appspot.com",
    messagingSenderId: "515403704453",
    appId: "1:515403704453:web:fa12946d3100e194e521ec"
  };

const app = firebase.initializeApp(firebaseConfig)

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const db = getFirestore(app)

export const auth = app.auth()

export default app

