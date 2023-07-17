import React, { useState, useRef, useContext } from 'react'
import { MyContext } from '../../Contexts/GetGameList';
import Favorite from '../Buttons/Favorite'
import WishList from '../Buttons/WishList'
import CurrentPlay from '../Buttons/CurrentPlay'
import RatingStars from '../Buttons/RatingStars'
import { AuthContext } from '../../Contexts/AuthContext';
import './styles.css'

const CategoriesContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false)
  const { finalList, search, setSearch, categorie, setCategorie, userLogged } = useContext(MyContext)
  const { currentUser } = useContext(AuthContext)

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrev = () => {
    return currentPage !== 1 ? setCurrentPage(currentPage - 1) : null
  };

  const genres = finalList && finalList.map((item) => {
    return item.genre
  })

  let uniqueGenres = [...new Set(genres)]


  const getByCategories = () => {
    return finalList && finalList.map((item) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (categorie === genre) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter((element) => element !== undefined)
  }
  let totalPages
  const objectsPerPage = 9;
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;

  const searchValue = search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  const getByTitles = () => {
    return finalList && finalList.map((item) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (finalSearchValue && item.title.includes(finalSearchValue)) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter((element) => element !== undefined)
  }


  const showContentsByCategorie = () => {
    let array
    if (categorie !== 'all') {
      array = getByCategories()
    } else if (search) {
      array = getByTitles()
    } else {
      array = finalList
    }
    const currentObjects = finalList && array.slice(indexOfFirstObject, indexOfLastObject);
    return currentObjects && currentObjects.map((item) => {
      return (
        <li key={item.id} className="game-item">
          <img src={item.thumbnail} alt={item.title} className='game-item-img' />
          <div className="game-item-info">
            <div className="game-item-section">
              <span className='game-item-categorie'>{item.genre}</span>
              <div className="game-item-btns">
                <Favorite value={true} id={item.id} title={item.title} />
                <WishList id={item.id} title={item.title} />
                <CurrentPlay id={item.id} title={item.title} />
              </div>
            </div>
            <div className="game-item-section">
              <p className="game-item-title">{item.title}</p>
              <RatingStars id={item.id} title={item.title} />
            </div>
          </div>
        </li>
      )
    })
  }

  return (
    <section className="show-games__container">
      <div className="show-games__header">
        <div className="show-games__wrapper">
          {search && categorie === 'all'
            ? <p className="show-games__title">Resultados para "{search}"</p>
            : categorie === 'all' && <p className="show-games__title">Todos os jogos</p>}
          {!search && categorie !== 'all'
            ? <p className="show-games__title">Resultados para "{categorie}"</p>
            : null}
          <div className="show-games__filter" >
            <p className="show-filter-title" onClick={() => setShowFilter(!showFilter)}>Filtrar por categoria</p>
            <div className="show-filters-options " style={{ display: showFilter ? 'flex' : 'none' }}>
              <p onClick={() => {
                setShowFilter(!showFilter)
                setCategorie('all')
                setSearch('')
                setCurrentPage(1)
              }}
                className="filter-opt">Todos
              </p>
              {uniqueGenres && uniqueGenres.map(item => {
                return (
                  <p key={item}
                    onClick={() => {
                      setShowFilter(!showFilter)
                      setCategorie(item)
                      setSearch('')
                      setCurrentPage(1)
                    }}
                    className="filter-opt">{item}</p>
                )
              })}

            </div>
          </div>
        </div>

        <div className="show-games-pages">
          <div className="current-page">Página {currentPage}</div>
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
        {showContentsByCategorie()}
      </ul>
    </section>
  )
}

export default CategoriesContent