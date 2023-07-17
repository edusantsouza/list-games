import React, { useState } from 'react'
import ControlList from '../ControlList'
import './styles.css'

const ShowAllGames = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false)


  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrev = () => {
    return currentPage !== 1 ? setCurrentPage(currentPage - 1) : null
  };

  return (
    <section className="show-games__container">
      <div className="show-games__header">
        <div className="show-games__wrapper">
          <p className="show-games__title">Todos os jogos</p>
          <div className="show-games__filter" >
            <p className="show-filter-title" onClick={() => setShowFilter(!showFilter)}>Filtrar por classificação</p>
            <div className="show-filters-options " style={{ display: showFilter ? 'flex' : 'none' }}>
              <p className="filter-opt">Ordem crescente</p>
              <p className="filter-opt">Ordem decrescente</p>
            </div>
          </div>
        </div>

        <div className="show-games-pages">
          <div className="current-page">Página 1</div>
          <div className="page-btn">
            <p onClick={handleClickPrev} className="prev-btn">
              <i className='bx bx-left-arrow-alt' ></i>
            </p>
            <p onClick={handleClickNext} className="next-btn">
              <i className='bx bx-right-arrow-alt' ></i>
            </p>
          </div>
        </div>
      </div>
      <ul className="show-games__list">
        <ControlList currentPage={currentPage} />
      </ul>
    </section>
  )
}

export default ShowAllGames