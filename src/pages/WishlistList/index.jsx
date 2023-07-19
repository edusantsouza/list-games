import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { AuthContext } from '../../Contexts/AuthContext'
import PopUpMessage from '../../Components/PopUpMessage'
import WishlisListContent from '../../Components/WishlistListContent'


const WishlistList = () => {
  const { favData } = useContext(AuthContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {favData
        ? <WishlisListContent />
        : <Spinner />}
      {<PopUpMessage />}
    </>
  )
}

export default WishlistList