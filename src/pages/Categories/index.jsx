import React, { useContext } from 'react'
import CategoriesContent from '../../Components/CategoriesContent'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'
import { AuthContext } from '../../Contexts/AuthContext'


const Categorie = () => {
  const { finalList } = useContext(MyContext)
  const { favData, currentUser } = useContext(AuthContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {currentUser
        ? finalList && favData
          ? <CategoriesContent />
          : <Spinner />
        : finalList ? <CategoriesContent /> : <Spinner />}
    </>
  )
}

export default Categorie