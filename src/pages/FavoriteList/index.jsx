import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { AuthContext } from '../../Contexts/GetGameList'
import FavoritesListContent from '../../Components/FavoriteListContent'
import { AuthContext } from '../../Contexts/AuthContext'


const FavoriteList = () => {
  const { favData } = useContext(AuthContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {favData
        ? <FavoritesListContent />
        : <Spinner />}
    </>
  )
}

export default FavoriteList