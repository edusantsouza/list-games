import React, { useContext } from 'react'
import '../index.css'
import Context from '../../../Contexts/GeneralContext'


const BackwardBtn = ({ setCategorie, categorie }) => {
  const [search, setSearch] = useContext(Context);

  return (
    (search.length > 2 || categorie !== 'all') &&
    <button
      onClick={() => {
        setSearch('')
        setCategorie('all')
      }}
      className='backward-btn'>
      <i className='bx bx-left-arrow-alt'></i>
      Voltar
    </button>

  )
}

export default BackwardBtn