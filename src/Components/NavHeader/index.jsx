import React, { useContext } from 'react'
import WishListIcon from '../../assets/assetsComponents/WishListIcon'
import FavoriteBtnLine from '../../assets/assetsComponents/FavoriteBtnLine'
import MenuIcon from '../../assets/assetsComponents/MenuIcon'
import PlayMastersLogo from '../../assets/assetsComponents/PlayMastersLogo'
import ProfileButton from '../Buttons/ProfileButton'
import Searchbar from './Searchbar'
import { MyContext } from '../../Contexts/GetGameList'
import { Link } from 'react-router-dom';
import './styles.css'


const NavHeader = () => {
  const { setIsOpen, isOpen } = useContext(MyContext)

  const openMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav className='navheader__container'>
      <div className="navheader__form">
        <div className="navheader__mobile">
          <div onClick={openMenu}><MenuIcon /></div>
          <PlayMastersLogo />
          <div></div>
        </div>
        <Searchbar />
      </div>

      <nav className='navheader__options'>
        <div className="navheader__options-btns">
          <Link to="/favoritos" className="navheader__fav-btn">
            <FavoriteBtnLine />
          </Link>
          <Link to="/wishlist" className="navheader__wish-btn">
            <WishListIcon />
          </Link>
        </div>
        <ProfileButton />
      </nav>
    </nav>

  )
}

export default NavHeader