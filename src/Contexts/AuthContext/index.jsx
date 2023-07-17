import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'


export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const userCollectionRef = collection(db, 'userStorage')
  const [userIsLogged, setUserIsLogged] = useState(false)
  const [users, setUsers] = useState()
  const [refEmail, setRefEmail] = useState('')
  const [refName, setRefName] = useState('')




  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const createUser = async (name, email, listFavorite, listCurrent, listWishlist, rate) => {
    const user = await addDoc(userCollectionRef, { name, email, listFavorite, listCurrent, listWishlist, rate })
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
    })
    return unsubscribe
  }, [])


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      const result = data.docs.map((item) => ({ ...item.data(), id: item.id }))
      setUsers(result)
    }

    /******** */
    getUsers()


  }, [])


  const getUserInfo = () => {
    let userInfo = users.filter(item => item.email === refEmail)

    return userInfo
  }

  const userOn = users ? getUserInfo() : null
  const getUser = users ? userOn[0] : null

  const value = {
    userIsLogged,
    setUserIsLogged,
    users,
    getUser,
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

