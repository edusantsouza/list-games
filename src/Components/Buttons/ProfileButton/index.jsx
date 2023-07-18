import React, { useContext, useEffect, useState } from 'react'
import LogoutIcon from '../../../assets/assetsComponents/LogoutIcon'
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';

const ProfileButton = () => {
  const { logout, currentUser, userData, setUserData } = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      localStorage.removeItem('user')
    } catch {
    }
  }

  const onLogin = () => {
    return (
      <div className="navheader__profile-btn">
        <div className="profile-btn-wrapper">
          <div className="profile-btn-info">
            <p className='profile-name'>{userData ? userData.name : null}</p>
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
      <Link to="/auth">
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

  useEffect(() => {
    if (currentUser) {
      setUserData(JSON.parse(localStorage.getItem('user')))
    }
  }, [currentUser])


  return currentUser ? onLogin() : onLoggof()
}

export default ProfileButton