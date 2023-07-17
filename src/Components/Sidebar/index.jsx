import React, { useContext, useState } from 'react'
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

  const { getUser, setCategorie, search } = useContext(AuthContext)

  const clearState = () => {
  }
  const openMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className={`aside__modal ${!isOpen ? '' : `aside-visible`}`}>
      <div className={`aside__container ${!isOpen ? '' : `aside-visible`}`}>
        <div className="aside__logo">
          <PlayMastersLogo />
        </div>
        <div className="aside__mobile">
          <ProfileButton />
        </div>
        <nav className='aside__options'>
          <ul className='aside__list'>
            <Link className='aside__list-item aside-active' to="/"><HomeIcon />Início</Link>
            <Link onClick={clearState} className='aside__list-item aside-active' to="/categorias"><CategorieIcon /> Categorias</Link>
            <Link onClick={clearState} className={`aside__list-item  ${!getUser ? `aside-opacity` : `aside-active`}`} to="/biblioteca"><LibraryIcon /> Biblioteca</Link>
            <Link onClick={clearState} className={`aside__list-item  ${!getUser ? `aside-opacity` : `aside-active`}`} to="/favoritos"><FavoriteBtnLine /> Favoritos</Link>
            <Link onClick={clearState} className={`aside__list-item  ${!getUser ? `aside-opacity` : `aside-active`}`} to="/wishlist"><WishListIcon /> Lista de desejos</Link>
          </ul>
        </nav>
        <SidebarCurrentPlay />
        <div onClick={openMenu} className='close-icon'>
          <CloseIcon />
        </div>
      </div>

    </aside>
  )
}

export default Sidebar