import React, { useContext } from 'react'
import { MyContext } from '../../Contexts/GetGameList';
import Favorite from '../Buttons/Favorite'
import WishList from '../Buttons/WishList'
import CurrentPlay from '../Buttons/CurrentPlay'
import RatingStars from '../Buttons/RatingStars'
import { AuthContext } from '../../Contexts/AuthContext';
import './styles.css'

const WishlistListContent = () => {
  const { finalList } = useContext(MyContext)
  const { favData } = useContext(AuthContext)

  let arr = favData ? favData.listWishlist : null
  const showContent = () => {
    return arr.length > 0 && arr.map((item) => {
      return (
        <li key={item.id} className="game-item">
          <img src={item.thumbnail} alt={item.title} className='game-item-img' />
          <div className="game-item-info">
            <div className="game-item-section">
              <span className='game-item-categorie'>{item.genre}</span>
              <div className="game-item-btns">
                <Favorite id={item.id} title={item.title}
                  publisher={item.publisher} short_description={item.short_description}
                  thumbnail={item.thumbnail} genre={item.genre} platform={item.platform}
                  game_url={item.game_url} />
                <WishList id={item.id} title={item.title}
                  publisher={item.publisher} short_description={item.short_description}
                  thumbnail={item.thumbnail} genre={item.genre} platform={item.platform}
                  game_url={item.game_url} />
                <CurrentPlay id={item.id} title={item.title}
                  publisher={item.publisher} short_description={item.short_description}
                  thumbnail={item.thumbnail} genre={item.genre} platform={item.platform}
                  game_url={item.game_url} />
              </div>
            </div>
            <div className="game-item-section">
              <p className="game-item-title">{item.title}</p>
              <RatingStars id={item.id} title={item.title}
                publisher={item.publisher} short_description={item.short_description}
                thumbnail={item.thumbnail} genre={item.genre} platform={item.platform}
                game_url={item.game_url} />
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
          <p className="show-games__title">Sua lista de desejos</p>
        </div>

      </div>
      <ul className="show-games__list">
        {favData.listWishlist.length > 0 ? showContent() : <p className="empty-msg">Você ainda não adicionou nada a sua lista de desejos.</p>}
      </ul>
    </section>
  )
}

export default WishlistListContent