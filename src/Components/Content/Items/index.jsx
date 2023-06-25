import React from 'react'


const Items = ({ list, categorie, finalSearchValue, uniqueTitles, search }) => {


  const titlesValidity = () => {
    return uniqueTitles.some(item => {
      return item.includes(finalSearchValue)
    })
  }

  if (search.length === 0 && categorie !== 'all') {
    return (
      list.map((item) => {
        if (categorie === item.genre) {
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
    )
  } else if (search.length === 0) {
    return (
      list.map((item) => {
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
    )
  } else if (search.length > 0 && titlesValidity()) {
    return (
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
    )
  } else if (search.length > 0 && !titlesValidity()) {
    return (
      <p className='search-msg'>
        Não há resultados para a busca realizada.
      </p>
    )
  }
}

export default Items