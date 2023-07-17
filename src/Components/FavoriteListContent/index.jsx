import React, { useContext } from 'react'
import { MyContext } from '../../Contexts/GetGameList';
import Favorite from '../Buttons/Favorite'
import WishList from '../Buttons/WishList'
import CurrentPlay from '../Buttons/CurrentPlay'
import RatingStars from '../Buttons/RatingStars'
import { AuthContext } from '../../Contexts/AuthContext';
import './styles.css'

const FavoritesListContent = () => {
  const { finalList, listFavorite } = useContext(MyContext)
  const { currentUser, getUser } = useContext(AuthContext)

  const userValues = getUser && [...getUser.listFavorite]
  const array = finalList.filter(item => {
    return userValues.some(obj => item.id === obj.id);
  });

  const showContent = () => {

    return finalList && array.map((item) => {
      return (
        <li className="game-item">
          <img src={item.thumbnail} alt={item.title} className='game-item-img' />
          <div className="game-item-info">
            <div className="game-item-section">
              <span className='game-item-categorie'>{item.genre}</span>
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


  return (
    <section className="show-games__container">
      <div className="show-games__header">
        <div className="show-games__wrapper">
          <p className="show-games__title">Seus favoritos</p>
        </div>

      </div>
      <ul className="show-games__list">
        {array.length !== 0 ? showContent() : <p class="empty-msg">Você ainda não adicionou nada aos seus favoritos.</p>}
      </ul>
    </section>
  )
}

export default FavoritesListContent