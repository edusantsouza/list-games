import React, { useContext } from 'react'
import '../index.css'
import Context from '../../../Contexts/GeneralContext'


const BackwardBtn = ({ setCategorie, categorie }) => {
  const [search, setSearch] = useContext(Context);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    (search.length > 2 || categorie !== 'all') &&
    <button
      onClick={() => {
        setSearch('')
        setCategorie('all')
        handleToTop()
      }}
      className='backward-btn'>
      <i className='bx bx-left-arrow-alt'></i>
      Voltar
    </button>

  )
}

export default BackwardBtn