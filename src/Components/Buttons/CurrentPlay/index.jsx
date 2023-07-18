import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';

const CurrentPlay = ({ title, id, publisher, short_description, thumbnail, genre, platform, game_url }) => {
  const { userData, favData, currentUser, ids, setIds } = useContext(AuthContext)
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && favData) {
      setActive(favData.listCurrent.some((item) => item.id === id))
    }
  })

  const userId = currentUser && userData.id

  const addElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listCurrent: arrayUnion({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
      });
    } catch (error) {
      console.error(error)
    }
  };

  const removeElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listCurrent: arrayRemove({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (gameId) => {
    const newItem = { gameId, name: title };
    setIds([...ids, newItem]);
  };

  const removeItem = (gameId) => {
    const updatedItems = ids.filter((item) => item.gameId !== gameId);
    setIds(updatedItems);
  };

  const handleTogglePlaying = () => {
    if (userData && currentUser) {
      if (!favData.listCurrent.some((item) => item.id === id)) {
        addItem(id)
        addElement()
        setActive(true)
        return
      } else if (favData.listCurrent.some((item) => item.id === id)) {
        removeItem(id)
        removeElement()
        setActive(false)
        return
      }
    }

  };

  return (
    <div
      className='game-fav-button'
      onClick={() => {
        if (currentUser) {
          handleTogglePlaying()
        } else {
          navigate("/auth")
        }
      }}>
      <span aria-label="currentPlaying"
        className={`game-fav ${currentUser ? 'pointer' : 'default'} `}
        style={{ color: active ? 'green' : 'grey' }}>
        <i className='bx bxs-joystick'></i>
      </span>
    </div>
  );
}

export default CurrentPlay