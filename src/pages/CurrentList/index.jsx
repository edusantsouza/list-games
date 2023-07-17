import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'
import CurrentListContent from '../../Components/CurrentListContent'


const CurrentList = () => {
  const { finalList } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <CurrentListContent />
        : <Spinner />}
    </>
  )
}

export default CurrentList