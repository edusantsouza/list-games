import React, { useEffect, useState } from 'react'
import './index.css'

const ListGames = ({ search }) => {

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categorie, setCategorie] = useState('all')


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'dev-email-address': 'eduardo.santsouza@gmail.com'
      },
    }
    fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', options)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then((data) => {
        setList(data)
      })
      .catch(err => {
        console.error('Ocorreu um erro na busca: ', err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])


  const genre = list && list.map((item) => {
    return item.genre
  })
  const title = list && list.map((item) => {
    return item.title
  })

  let uniqueGenres = [...new Set(genre)];
  let uniqueTitles = [...new Set(title)]

  const searchValue = search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  const statusCodeList = [500, 502, 503, 504, 507, 508, 509]
  const statusCodeValidation = (code) => {
    return statusCodeList.some(item => item === code)
  }
  const chooseCategorie = (e) => {
    setCategorie(e.target.value)
  }
  if (loading) {
    return (
      <section className="container error__container">
        <h2 className='loading-msg'>Carregando, aguarde um momento.</h2>
      </section>
    )
  } else if (statusCodeValidation(error?.status)) {
    return (
      <section className="container error__container">
        <h2 className='error-msg'>O servidor falhou em responder, tente recarregar a página.</h2>
      </section>
    )
  } else if (error?.ok === false) {
    return (
      <section className="container error__container">
        <h2 className='error-msg'>O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.</h2>
      </section>
    )
  } else {
    return (
      list &&
      <main className='main__container container'>
        <section className='games-container'>
          <div className="select-categorie">
            <label htmlFor="categories">Filtre por categoria: </label>
            <select onClick={chooseCategorie} name="categories" id="categories">
              <option value="all">Todos</option>
              {uniqueGenres.map((item) => {
                return (
                  <option key={item} value={item}>{item}</option>
                )
              })}
            </select>
          </div>
          <ul className='games-list'>
            {!search && list.map((item) => {
              if (categorie === 'all') {
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
              } else if (categorie === item.genre) {
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
            {(uniqueTitles.some(item => {
              return item.includes(finalSearchValue)
            })) && list.map((item) => {
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
            {!(uniqueTitles.some(item => {
              return item === finalSearchValue || search.length === 0
            }))
              ? <p>Não há resultados para a busca realizada.</p>
              : null}
          </ul>
        </section>
      </main >
    )
  }
}

export default ListGames

// .then(
//   data => {
//     if (data.status === 500 ||
//       data.status === 502 ||
//       data.status === 503 ||
//       data.status === 504 ||
//       data.status === 507 ||
//       data.status === 508 ||
//       data.status === 509) {
//       console.log('O servidor falhou em responder, tente recarregar a página.')
//     } else if (data.status !== 200) {
//       console.log('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.')
//     }

//     if (data.status === 200) {
//       return data.json()
//     }
//   })
