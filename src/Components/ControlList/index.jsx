import React, { useState } from 'react'
import RatingStars from '../Buttons/RatingStars'
import CurrentPlay from '../Buttons/CurrentPlay'
import WishList from '../Buttons/WishList'
import Favorite from '../Buttons/Favorite'
import { MyContext } from '../../Contexts/GetGameList'

const ControlList = ({ currentPage }) => {
  const useValues = React.useContext(MyContext)
  const [categorie, setCategorie] = useState('all')
  const { list } = React.useContext(MyContext)


  const title = useValues.finalList && useValues.finalList.map((item) => {
    return item.title
  })

  const genres = useValues.finalList && useValues.finalList.map((item) => {
    return item.genre
  })

  let uniqueGenres = [...new Set(genres)]
  let uniqueTitles = [...new Set(title)]

  const searchValue = useValues.search.split(" ");
  for (let i = 0; i < searchValue.length; i++) {
    searchValue[i] = searchValue[i].charAt(0).toUpperCase() + searchValue[i].slice(1);
  }
  const finalSearchValue = searchValue.join(' ')

  const titlesValidity = () => {
    return uniqueTitles.some(item => {
      return item.includes(finalSearchValue)
    })
  }

  const getAll = () => {
    return useValues.finalList && useValues.finalList.map((item) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      return { title, id, publisher, short_description, thumbnail, genre, platform };

    })
  }

  const showLimited = (number) => {
    return useValues.finalList && useValues.finalList.map((item, index) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (index >= 0 && index <= number) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter(item => item !== undefined)
  }

  const getByTitles = () => {
    return useValues.finalList && useValues.finalList.map((item) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (useValues.finalSearchValue && item.title.includes(useValues.finalSearchValue)) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter((element) => element !== undefined)
  }

  const getByCategories = () => {
    return useValues.finalList && useValues.finalList.map((item) => {
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

  if (useValues.search.length === 0 && categorie !== 'all') {
    let arrValue = getByCategories()
    totalPages = Math.ceil(useValues.finalList && arrValue.length / objectsPerPage);
  } else if (useValues.search.length === 0) {
    let arrValue = getAll()
    totalPages = Math.ceil(useValues.finalList && arrValue.length / objectsPerPage);

  } else if (useValues.search.length > 0 && titlesValidity()) {
    let arrValue = getByTitles()
    totalPages = Math.ceil(useValues.finalList && arrValue.length / objectsPerPage);

  } else if (useValues.search.length > 0 && !titlesValidity()) {
    totalPages = 0
  }

  const showSomeItems = () => {
    let array = showLimited(10)


    return array && array.map((item) => {

      return (
        <li key={item.id} className="game-item">
          <img src={item.thumbnail} alt={item.title} className='game-item-img' />
          <div className="game-item-info">
            <div className="game-item-section">
              <span className='game-item-genre'>{item.genre}</span>
              <div className="game-item-btns">
                <Favorite id={item.id} title={item.title} />
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


  return showSomeItems()
}

export default ControlList 