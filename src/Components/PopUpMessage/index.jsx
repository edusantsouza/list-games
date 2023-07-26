import React, { useEffect, useContext, useState } from 'react'
import './styles.css'
import { MyContext } from '../../Contexts/GetGameList'

const PopUpMessage = ({ }) => {
  const { message, isActive, setIsActive, ids } = useContext(MyContext)
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const handleTimeout = () => {
      if (isActive) {
        setIsActive(false)
      }
    };

    const timeoutDuration = 3900; // 2 segundos

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(handleTimeout, timeoutDuration);

    setTimeoutId(newTimeoutId);

    return () => {
      clearTimeout(newTimeoutId);
    };
  }, [isActive])

  return (
    <div style={isActive ? { display: 'flex' } : { display: 'none' }} className="popup__container">
      <p className='popup-content'>{message}</p>
    </div>
  )

}

export default PopUpMessage