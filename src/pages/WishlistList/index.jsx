import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { AuthContext } from '../../Contexts/AuthContext'
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
    </>
  )
}

export default WishlistList