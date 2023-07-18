import React, { useContext, useRef } from 'react'
import PlayMastersLogo from '../../assets/assetsComponents/PlayMastersLogo'
import HomeIcon from '../../assets/assetsComponents/HomeIcon'
import CategorieIcon from '../../assets/assetsComponents/CategorieIcon'
import LibraryIcon from '../../assets/assetsComponents/LibraryIcon'
import SidebarCurrentPlay from './SidebarCurrentPlay'
import WishListIcon from '../../assets/assetsComponents/WishListIcon'
import FavoriteBtnLine from '../../assets/assetsComponents/FavoriteBtnLine'
import CloseIcon from '../../assets/assetsComponents/CloseIcon'
import ProfileButton from '../Buttons/ProfileButton'
import { AuthContext } from '../../Contexts/AuthContext'
import { MyContext } from '../../Contexts/GetGameList'
import { Link } from 'react-router-dom';
import './styles.css'

const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(MyContext)
  const { currentUser } = useContext(AuthContext)
  const modal = useRef()

  const clearState = () => {
  }
  const openMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside ref={modal}
      onClick={(e) => {
        if (e.target === modal.current) {
          setIsOpen(!isOpen)
        }
      }}
      className={`aside__modal ${!isOpen ? '' : `aside-visible`}`}>
      <div className={`aside__container ${!isOpen ? '' : `aside-visible`}`}>
        <div className="aside__logo">
          <PlayMastersLogo />
        </div>
        <div className="aside__mobile">
          <ProfileButton />
        </div>
        <nav className='aside__options'>
          <ul className='aside__list'>
            <Link
              onClick={() => {
                setIsOpen(!isOpen)
                clearState()
              }} className='aside__list-item aside-active' to="/"><HomeIcon />Início</Link>
            <Link onClick={() => {
              setIsOpen(!isOpen)
              clearState()
            }} className='aside__list-item aside-active' to="/categorias"><CategorieIcon /> Categorias</Link>
            <Link onClick={() => {
              setIsOpen(!isOpen)
              clearState()
            }} className={`aside__list-item ${!currentUser ? `aside-opacity` : `aside-active`}`}
              to={currentUser ? "/biblioteca" : "/auth"} ><LibraryIcon /> Biblioteca</Link>
            <Link onClick={() => {
              setIsOpen(!isOpen)
              clearState()
            }} className={`aside__list-item  ${!currentUser ? `aside-opacity` : `aside-active`}`}
              to={currentUser ? "/favoritos" : "/auth"}><FavoriteBtnLine /> Favoritos</Link>
            <Link onClick={() => {
              setIsOpen(!isOpen)
              clearState()
            }} className={`aside__list-item  ${!currentUser ? `aside-opacity` : `aside-active`}`}
              to={currentUser ? "/wishlist" : "/auth"}><WishListIcon /> Lista de desejos</Link>
          </ul>
        </nav>
        <SidebarCurrentPlay />
      </div>

    </aside>
  )
}

export default Sidebar