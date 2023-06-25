import React, { useEffect, useState, useContext } from 'react'
import Context from '../../Contexts/GeneralContext';
import SelectCategorie from './SelectCategorie'
import ListItems from './ListItems';
import BackwardBtn from './BackwardBtn';
import './index.css'

const Content = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categorie, setCategorie] = useState('all')
  const [time, setTime] = useState(false)
  const [list, setList] = useState(null);
  const [search, setSearch] = useContext(Context);


  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'dev-email-address': 'eduardo.santsouza@gmail.com'
    },
  }

  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort()
      setTime(true)
    }, timeout);

    await fetch(resource, {
      ...options,
      signal: controller.signal
    })
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
        setError(err)
      })
      .finally(() => {
        setLoading(true)
      })



    clearTimeout(id);
  }

  useEffect(() => {
    fetchWithTimeout('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', options)
  }, [])

  const genre = list && list.map((item) => {
    return item.genre
  })
  let uniqueGenres = [...new Set(genre)];

  const statusCodeList = [500, 502, 503, 504, 507, 508, 509]
  const statusCodeValidation = (code) => {
    return statusCodeList.some(item => item === code)
  }

  const chooseCategorie = (e) => {
    setCategorie(e.target.value)
    setSearch('')
  }

  if (!loading) {
    return (
      <section className="container error__container">
        <h2 className='loading-msg'>Carregando, aguarde um momento.</h2>
      </section>
    )
  } else if (time) {
    return (
      <section className="container error__container">
        <h2 className='error-msg'>O servidor demorou para responder, tente novamente mais tarde.</h2>
      </section>
    )
  } else if (statusCodeValidation(error?.status)) {
    return (
      <section className="container error__container">
        <h2 className='error-msg'>O servidor falhou em responder, tente recarregar a página.</h2>
        <h3 className='error-status'>{error.status}</h3>
        <p className='error-text'>{error.statusText}</p>
      </section>
    )
  } else if (error?.ok) {
    return (
      <section className="container error__container">
        <h2 className='error-msg'>O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.</h2>
        <h3 className='error-status'>{error.status}</h3>
        <p className='error-text'>{error.statusText}</p>
        {console.log(error)}
      </section>
    )
  } else if (list) {
    return (
      <main className='main__container container'>
        <section className='games-container'>
          <SelectCategorie
            chooseCategorie={chooseCategorie}
            uniqueGenres={uniqueGenres} />
          <h2 className='name-categorie'>
            {
              search.length === 0
                ? categorie === 'all' ? 'Todos os jogos' : `Resultados para ${categorie}`
                : `Resultados para "${search}"`
            }
          </h2>
          <ul className='games-list'>
            <ListItems
              list={list}
              categorie={categorie}
            />
          </ul>
        </section>
        <BackwardBtn
          setCategorie={setCategorie}
          categorie={categorie} />
      </main >
    )
  }
}

export default Content

