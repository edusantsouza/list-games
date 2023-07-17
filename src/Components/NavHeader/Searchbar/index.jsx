import React, { useContext, useState } from 'react'
import SearchIcon from '../../../assets/assetsComponents/SearchIcon'
import FilterIcon from '../../../assets/assetsComponents/FIlterIcon'
import { MyContext } from '../../../Contexts/GetGameList'
import { useNavigate } from 'react-router-dom';


const Searchbar = () => {
  const { setSearch, setCategorie } = useContext(MyContext)
  const [change, setChange] = useState('')
  const navigate = useNavigate()

  return (
    <div className="navheader__form-wrapper">
      <form
        className='navheader__search-form'
        action=""
        onSubmit={(e) => {
          navigate('/categorias')
          e.preventDefault()
          setCategorie('all')
          setSearch(change)
        }}>
        <div className="search-form-icon">
          <SearchIcon />
        </div>

        <div className="search-form-field">
          <label htmlFor="search" className='search-form-label'>Procure por jogos</label>
          <input
            type="text"
            className='search-form-input'
            placeholder='Procure por um jogo'
            onKeyDown={(e) => {
              setChange(e.target.value)
            }} />
        </div>
        <div className="filter-wrapper disable-cont">
          <p className='filter-text disable-text'>Opções de filtro</p>
          <div className="search-form-filter">
            <FilterIcon />
          </div>
        </div>
      </form>

      <div className="expanded-filter">
        <nav className="genre-select">
          <div className="genre-wrapper">
            <p className='genre-title'>Gênero <i className='bx bx-chevron-down'></i></p>
            <ul className="genre-list">
              <li className="genre-item">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.91665 2.67081L7.32915 2.08331L4.99998 4.41248L2.67081 2.08331L2.08331 2.67081L4.41248 4.99998L2.08331 7.32915L2.67081 7.91665L4.99998 5.58748L7.32915 7.91665L7.91665 7.32915L5.58748 4.99998L7.91665 2.67081Z" fill="#FFFDFE" />
                </svg>
                MMO</li>
            </ul>
          </div>

          <div className="rate-wrapper">
            <p className='rate-title'>Classificação <i className='bx bx-chevron-down'></i></p>
            <ul className="rate-list">
              <li className="rate-item">Stars</li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Searchbar