import React, { useState, useContext } from 'react'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase'

const CurrentPlay = ({ title, id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { getUser } = useContext(AuthContext)
  const { listCurrent, setListCurrent, setErrorMessage } = useContext(MyContext)


  const updateList = async () => {
    const userId = getUser && getUser.id
    const myref = doc(db, "userStorage", userId);
    await updateDoc(myref, {
      listCurrent: [...listCurrent]
    });
  }

  const handleTogglePlaying = () => {

    if (getUser) {
      setIsPlaying(!isPlaying);
      updateList()
    } else {
      setErrorMessage('Efetue o login para aproveitar a PlayMaster!')
    }


    if (listCurrent.some(item => item.title === title)) {
      setListCurrent([...listCurrent.filter(item => item.title !== title)])
      return
    }
    setListCurrent([...listCurrent, { title, id }])
  };

  return (
    <div
      className='game-fav-button'
      onClick={handleTogglePlaying}>
      <span aria-label="currentPlaying"
        className={`game-fav ${getUser ? 'pointer' : 'default'} `}
        style={{ color: isPlaying ? 'green' : 'grey' }}>
        <i className='bx bxs-joystick'></i>
      </span>
    </div>
  );
}

export default CurrentPlay