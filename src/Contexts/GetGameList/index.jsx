import React, { createContext, useState, useEffect } from 'react'

export const MyContext = createContext()

const GetGameList = (props) => {
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(false)
  const [error, setError] = useState(null)
  const [list, setList] = useState(null);
  const [search, setSearch] = useState('')
  const [categorie, setCategorie] = useState('all')
  const [doLogin, setDoLogin] = useState(true)
  const [listFavorite, setListFavorite] = useState([])
  const [listCurrent, setListCurrent] = useState([])
  const [listWishlist, setListWishlist] = useState([])
  const [rate, setRate] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [arrayData, setArrayData] = useState([]);
  const [isFav, setIsFav] = useState(1)



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
    fetchWithTimeout('https:games-test-api-81e9fb0d564a.herokuapp.com/api/data', options)
  }, [])


  const statusCodeList = [500, 502, 503, 504, 507, 508, 509]
  const statusCodeValidation = (code) => {
    return statusCodeList.some(item => item === code)
  }

  const finalList = list && list.map((item) => {
    const { title, id, publisher, short_description, thumbnail, genre, platform, game_url } = item;
    return { title, id, publisher, short_description, thumbnail, genre, platform, game_url };
  });


  const onValues = {
    isFav,
    setIsFav,
    arrayData,
    setArrayData,
    errorMessage,
    setErrorMessage,
    isOpen,
    setIsOpen,
    list,
    loading,
    setLoading,
    time,
    setTime,
    error,
    setError,
    list,
    setList,
    statusCodeValidation,
    finalList,
    search,
    setSearch,
    categorie,
    setCategorie,
    doLogin,
    setDoLogin,
    listFavorite,
    setListFavorite,
    listCurrent,
    setListCurrent,
    listWishlist,
    setListWishlist,
    rate,
    setRate
  }

  return (
    <MyContext.Provider value={onValues}>
      {props.children}
    </MyContext.Provider>
  )
}
export default GetGameList

