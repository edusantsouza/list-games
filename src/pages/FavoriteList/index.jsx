import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'
import FavoritesListContent from '../../Components/FavoriteListContent'


const FavoriteList = () => {
  const { finalList } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <FavoritesListContent />
        : <Spinner />}
    </>
  )
}

export default FavoriteList