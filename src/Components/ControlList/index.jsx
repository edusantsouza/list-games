import React from 'react'
import { MyContext } from '../../Contexts/GetGameList'
import './styles.css'

const ControlList = () => {
  const useValues = React.useContext(MyContext)

  const showLimited = (number) => {
    return useValues.finalList && useValues.finalList.map((item, index) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (index >= 0 && index <= number) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter(item => item !== undefined)
  }

  const showSomeItems = () => {
    let array = showLimited(10)

    return array && array.map((item) => {
      return (
        <li key={item.id} className="game-item">
          <img className='game-item-img control ' src={item.thumbnail} alt={item.title} />
          <div className='div-wrapper'>
            <p className="game-item-title control">{item.title}</p>
            <p className="game-item-genre control">{item.genre}</p>
          </div>

        </li>
      )
    })
  }

  return showSomeItems()
}

export default ControlList 