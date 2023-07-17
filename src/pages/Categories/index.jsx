import React, { useContext } from 'react'
import CategoriesContent from '../../Components/CategoriesContent'
import Sidebar from '../../Components/Sidebar'
import NavHeader from '../../Components/NavHeader'
import Spinner from '../../Components/Spinner'
import { MyContext } from '../../Contexts/GetGameList'


const Categorie = () => {
  const { finalList } = useContext(MyContext)

  return (
    <>
      <NavHeader />
      <Sidebar />
      {finalList
        ? <CategoriesContent />
        : <Spinner />}
    </>
  )
}

export default Categorie