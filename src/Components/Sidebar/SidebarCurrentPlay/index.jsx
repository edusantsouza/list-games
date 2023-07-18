import React from 'react'
import './styles.css'
import RatingStars from '../../Buttons/RatingStars'
import { MyContext } from '../../../Contexts/GetGameList'
import { AuthContext } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom';


const SidebarCurrentPlay = () => {

  const { finalList } = React.useContext(MyContext)
  const { favData, currentUser } = React.useContext(AuthContext)


  const renderList = () => {
    return (
      <section className='current__container'>
        <h3 className="current__title">Jogando agora</h3>
        <nav className='current__games-container'>
          <ul className='current__games-list'>
            {currentUser && favData.listCurrent.map((item, index) => {
              if (index < 4) {
                return (
                  <li key={item.title} className="current__game-item">
                    <img src={item.thumbnail} alt={item.title} className='current__game-image' />
                    <div className="current__game-info">
                      <p className='current__game-title'>{item.title}</p>
                      <RatingStars />
                    </div>
                  </li>
                )
              }
              return
            })}
          </ul>
        </nav>
        {currentUser
          ? <div className="current__show-all">
            <Link className='current__show-link' to="/biblioteca">Ver todos<i className='bx bx-chevron-down' ></i></Link>
          </div>
          : null}
      </section>
    )
  }

  const renderMsg = () => {
    return (
      <section className='current__container'>
        <h3 className="current__title">Jogando agora</h3>

        {currentUser
          ? <h3 className='current_empty'>Você ainda não adicionou nenhum jogo nesta lista</h3>
          : <h3 className='current_empty'>Faça login para adicionar jogos a esta lista</h3>}
      </section>
    )
  }

  return currentUser && favData && favData.listCurrent.length > 0 ? renderList() : renderMsg()
}

export default SidebarCurrentPlay