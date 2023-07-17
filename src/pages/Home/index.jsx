import React, { useContext } from 'react'
import NavHeader from '../../Components/NavHeader'
import Main from '../../Components/Main'
import Sidebar from '../../Components/Sidebar'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'

const Home = () => {
  const { finalList } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <Main />
        : <Spinner />}
    </>
  )
}

export default Home