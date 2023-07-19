import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import FavoritesListContent from '../../Components/FavoriteListContent'
import PopUpMessage from '../../Components/PopUpMessage'
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
      {<PopUpMessage />}
    </>
  )
}

export default FavoriteList