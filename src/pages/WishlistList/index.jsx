import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'
import WishlisListContent from '../../Components/WishlistListContent'


const WishlistList = () => {
  const { finalList } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <WishlisListContent />
        : <Spinner />}
    </>
  )
}

export default WishlistList