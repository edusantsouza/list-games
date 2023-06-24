import React, { useContext, useRef } from 'react'
import '../index.css'
import Context from '../../../Contexts/GeneralContext';


const ListItems = ({ list, categorie }) => {
  const [search, setSearch] = useContext(Context);
  const tagUl = useRef('')

  const title = list && list.map((item) => {
    return item.title
  })
  let uniqueTitles = [...new Set(title)]


  const searchValue = search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  const pagesLimit = () => {


  }

  const tagList = tagUl.current.childNodes


  return (
    <ul ref={tagUl} className='games-list'>


      {search.length < 1 && categorie !== 'all'
        ? list.map((item) => {
          if (categorie === item.genre) {
            console.log('oi')
            return (
              <li key={item.id} className='game-item'>
                <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
                <p className='game-title'>{item.title}</p>
                <div className='info-wrapper'>
                  <p className='game-publisher'><span>Publisher: </span> <span>{item.publisher}</span></p>
                  <p className='game-genre'><span>Gênero: </span> <span>{item.genre}</span></p>
                </div>
                <div className='game-description'>
                  <p>{item.short_description}</p>
                </div>
                <a className='game-profile'
                  target='_blank'
                  href={item.freetogame_profile_url}>
                  Saiba mais
                </a>
              </li>
            )
          }
        })
        : search.length === 0 && list.map((item) => {
          return (
            <li key={item.id} className='game-item'>
              <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
              <p className='game-title'>{item.title}</p>
              <div className='info-wrapper'>
                <p className='game-publisher'><span>Publisher: </span> <span>{item.publisher}</span></p>
                <p className='game-genre'><span>Gênero: </span> <span>{item.genre}</span></p>
              </div>
              <div className='game-description'>
                <p>{item.short_description}</p>
              </div>
              <a className='game-profile'
                target='_blank'
                href={item.freetogame_profile_url}>
                Saiba mais
              </a>
            </li>
          )
        })
      }

      {search.length > 0 && (uniqueTitles.some(item => {
        return item.includes(finalSearchValue)
      })) &&
        list.map((item) => {
          if (item.title.includes(finalSearchValue)) {
            return (
              <li key={item.id} className='game-item'>
                <img src={item.thumbnail} alt="Thumbnail" className='game-thumb' />
                <p className='game-title'>{item.title}</p>
                <div className='info-wrapper'>
                  <p className='game-publisher'><span>Publisher: </span> <span>{item.publisher}</span></p>
                  <p className='game-genre'><span>Gênero: </span> <span>{item.genre}</span></p>
                </div>
                <div className='game-description'>
                  <p>{item.short_description}</p>
                </div>
                <a className='game-profile'
                  target='_blank'
                  href={item.freetogame_profile_url}>
                  Saiba mais
                </a>
              </li>
            )
          }
        })
      }

      {search.length > 0 && !(uniqueTitles.some(item => {
        return item.includes(finalSearchValue)
      })) &&
        <p className='search-msg'>Não há resultados para a busca realizada.</p>
      }

    </ul>
  )
}

export default ListItems