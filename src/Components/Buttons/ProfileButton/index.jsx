import React, { useContext, useState } from 'react'
import LogoutIcon from '../../../assets/assetsComponents/LogoutIcon'
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';

const ProfileButton = () => {
  const { setDoLogin } = useContext(MyContext)
  const { logout, getUser, userIsLogged, setUserIsLogged } = useContext(AuthContext)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      // setUserIsLogged(false)
      navigate('/')
      // window.location.reload()
    } catch {
    }
  }



  const onLogin = () => {
    return (
      <div className="navheader__profile-btn">
        <div className="profile-btn-wrapper">
          <div className="profile-btn-info">
            <p className='profile-name'>{getUser ? getUser.nome : null}</p>
            <p onClick={() => setVisible(!visible)} className='profile-options' >Ver mais</p>
          </div>
        </div>

        <div className={`profile-show-options ${visible ? `profile-btn-visible` : null}`}>
          <p onClick={handleLogout} className='profile-show-item'>Logout <LogoutIcon /></p>
        </div>
      </div>
    )
  }

  const onLoggof = () => {
    return (
      <Link onClick={() => setDoLogin(true)} to="/auth">
        <div className="navheader__profile-btn">
          <div className="profile-btn-wrapper">
            <div className="profile-btn-info">
              <p className='profile-name'>Faça login </p>

              <p className='profile-options'>ou Cadastre-se</p>
            </div>
            <LogoutIcon />
          </div>
        </div>
      </Link>
    )
  }
  return userIsLogged ? onLogin() : onLoggof()
}

export default ProfileButton