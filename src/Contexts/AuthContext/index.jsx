import React, { useEffect, useState } from 'react'
import { myAuth, db } from '../../firebase'
import { addDoc, collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import 'firebase/auth';


export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [spinner, setSpinner] = useState(false)
  const [userIsLogged, setUserIsLogged] = useState()
  const [userData, setUserData] = useState()
  const [currentUser, setCurrentUser] = useState(false)
  const [users, setUsers] = useState()
  const [snapshotData, setSnapshotData] = useState()
  const [refEmail, setRefEmail] = useState('')
  const [refName, setRefName] = useState('')
  const [favoritesList, setFavoritesList] = useState([])
  const [userID, setUserID] = useState(null)
  const [favData, setFavData] = useState(null)
  const userCollectionRef = collection(db, 'userStorage')


  const getSnapshot = async () => {
    const docRef = doc(db, "userStorage", "XCIciyOJBDmTEp5CiKoL");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFavData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  getSnapshot()


  const getUserInfo = async () => {
    const data = await getDocs(userCollectionRef)
    const result = data.docs.map((item) => ({ ...item.data(), id: item.id }))
    const userInfo = result.filter(item => item.email === refEmail)
    const resolve = userInfo[0]
    localStorage.setItem('user', JSON.stringify(resolve));
  }

  const signup = (email, password) => {
    return myAuth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    getUserInfo()
    return myAuth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return myAuth.signOut()
  }

  const createUser = async (name, email, listFavorite, listCurrent, listWishlist, rate) => {
    const user = await addDoc(userCollectionRef, { name, email, listFavorite, listCurrent, listWishlist, rate })
  }

  useEffect(() => {
    const unsubscribe = myAuth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      setUserID(user.uid)
    })

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    return unsubscribe
  }, [])


  if (true) {
    const retrieveData = onSnapshot(doc(db, "userStorage", "ZQOT8pQVRc4dv9Ejpa9d"), (doc) => {
      setSnapshotData(doc.data());
    });

    retrieveData()
  }

  const value = {
    favData,
    favoritesList,
    snapshotData,
    setUserData,
    currentUser,
    spinner,
    setSpinner,
    userIsLogged,
    setUserIsLogged,
    users,
    userData,
    setRefName,
    setRefEmail,
    userCollectionRef,
    createUser,
    signup,
    signin,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

