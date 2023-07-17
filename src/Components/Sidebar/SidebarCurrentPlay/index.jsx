import React from 'react'
import './styles.css'
import RatingStars from '../../Buttons/RatingStars'
import { MyContext } from '../../../Contexts/GetGameList'

const SidebarCurrentPlay = () => {

  const { finalList } = React.useContext(MyContext)

  const showAll = () => {
    return finalList && finalList.map((item, index) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform } = item;
      if (index >= 0 && index <= 2) {
        return { title, id, publisher, short_description, thumbnail, genre, platform };
      }
    }).filter(item => item !== undefined)
  }

  const arrayList = showAll()

  const renderList = () => {
    return (
      <section className='current__container'>
        <h3 className="current__title">Jogando agora</h3>
        <nav className='current__games-container'>
          <ul className='current__games-list'>
            {arrayList.map(item => {
              return (
                <li className="current__game-item">
                  <img src={item.thumbnail} alt={item.title} className='current__game-image' />
                  <div className="current__game-info">
                    <p className='current__game-title'>{item.title}</p>
                    <RatingStars />
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="current__show-all">
          <p className='current__show-link'>Ver todos<i className='bx bx-chevron-down' ></i></p>
        </div>
      </section>
    )
  }

  const renderMsg = () => {
    return (
      <section className='current__container'>
        <h3 className="current__title">Jogando agora</h3>

        {false
          ? <h3 className='current_empty'>Você ainda não adicionou nenhum jogo nesta lista</h3>
          : <h3 className='current_empty'>Faça login para adicionar jogos a esta lista</h3>}
      </section>
    )
  }

  return renderMsg()
}

export default SidebarCurrentPlay