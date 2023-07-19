import React, { useEffect, useContext } from 'react'
import './styles.css'
import { MyContext } from '../../Contexts/GetGameList'

const PopUpMessage = ({ }) => {
  const { message, isModal, isActive, setIsActive } = useContext(MyContext)

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 4990)
    }
  })




  return (
    <div style={isActive ? { display: 'flex' } : { display: 'none' }} className="popup__container">
      <p className='popup-content'>{message}</p>
    </div>
  )

}

export default PopUpMessage