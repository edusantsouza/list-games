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
import { AuthContext } from '../../Contexts/AuthContext'


const NavHeader = () => {
  const { setIsOpen, isOpen } = useContext(MyContext)
  const { currentUser } = useContext(AuthContext)

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
          <Link to={currentUser ? "/favoritos" : "/auth"} className={currentUser ? "navheader__fav-btn" : "navheader__fav-btn unable"}>
            < FavoriteBtnLine />
          </Link>
          <Link to={currentUser ? "/wishlist" : "/auth"} className={currentUser ? "navheader__wish-btn" : "navheader__wish-btn unable"}>
            <WishListIcon />
          </Link>
        </div>
        <ProfileButton />
      </nav>
    </nav>

  )
}

export default NavHeader