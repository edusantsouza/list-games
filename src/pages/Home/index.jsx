import React, { useContext } from 'react'
import NavHeader from '../../Components/NavHeader'
import Main from '../../Components/Main'
import Sidebar from '../../Components/Sidebar'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'
import PopUpMessage from '../../Components/PopUpMessage'

const Home = () => {
  const { finalList, error, statusCodeValidation } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <Main />
        : <Spinner error={error} statusCodeValidation={statusCodeValidation} />}
      {<PopUpMessage />}
    </>
  )
}

export default Home