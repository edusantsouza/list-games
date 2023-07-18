import React, { useContext } from 'react'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { AuthContext } from '../../Contexts/AuthContext'
import CurrentListContent from '../../Components/CurrentListContent'


const CurrentList = () => {
  const { favData } = useContext(AuthContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {favData
        ? <CurrentListContent />
        : <Spinner />}
    </>
  )
}

export default CurrentList