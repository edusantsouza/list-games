import React, { useEffect, useContext } from 'react'
import '../index.css'
import Context from '../../../Contexts/GeneralContext';


const ListItems = ({ list, categorie }) => {
  const [search, setSearch] = useContext(Context);

  const title = list && list.map((item) => {
    return item.title
  })
  let uniqueTitles = [...new Set(title)]


  const searchValue = search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  return (
    <ul className='games-list'>


      {search.length < 1 && categorie !== 'all'
        ? list.map((item) => {
          if (categorie === item.genre) {
            return (
              <li key={item.id} className='game-item'>
                <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
                <p className='game-title'>{item.title}</p>
                <div className='info-wrapper'>
                  <p className='game-publisher'><strong>Publisher: </strong> <span>{item.publisher}</span></p>
                  <p className='game-genre'><strong>Gênero: </strong> <span>{item.genre}</span></p>
                </div>
                <p className='game-description'>
                  {item.short_description}</p>
              </li>
            )
          }
        })
        : search.length < 2 && list.map((item) => {
          return (
            <li key={item.id} className='game-item'>
              <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
              <p className='game-title'>{item.title}</p>
              <div className='info-wrapper'>
                <p className='game-publisher'><strong>Publisher: </strong> <span>{item.publisher}</span></p>
                <p className='game-genre'><strong>Gênero: </strong> <span>{item.genre}</span></p>
              </div>
              <p className='game-description'>
                {item.short_description}</p>
            </li>
          )
        })
      }

      {search && (uniqueTitles.some(item => {
        return item.includes(finalSearchValue)
      })) &&
        list.map((item) => {
          if (item.title.includes(finalSearchValue)) {
            return (

              <li key={item.id} className='game-item'>
                <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
                <p className='game-title'>{item.title}</p>
                <div className='info-wrapper'>
                  <p className='game-publisher'><strong>Publisher: </strong> <span>{item.publisher}</span></p>
                  <p className='game-genre'><strong>Gênero: </strong> <span>{item.genre}</span></p>
                </div>
                <p className='game-description'>
                  {item.short_description}</p>
              </li>
            )
          }
        })
      }

      {search.length > 3 && !(uniqueTitles.some(item => {
        return item.includes(finalSearchValue)
      })) &&
        <p className='search-msg'>Não há resultados para a busca realizada.</p>
      }

    </ul>
  )
}

export default ListItems