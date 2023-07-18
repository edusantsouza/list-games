import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';

const FavoriteButton = ({ title, id, publisher, short_description, thumbnail, genre, platform, game_url }) => {
  const { userData, favData, setFavData, currentUser, ids, setIds } = useContext(AuthContext)
  const [active, setActive] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    if (currentUser) {
      if (favData.listFavorite) {
        setActive(favData.listFavorite.some((item) => item.id === id))
      }
    }
  })

  const userId = currentUser && userData.id

  const addElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listFavorite: arrayUnion({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
      });
    } catch (error) {
      console.error(error)
    }
  };

  const removeElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listFavorite: arrayRemove({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
      });
      console.log("Elemento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo elemento ao array:", error);
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

  const handleToggleFavorite = () => {
    if (userData && currentUser) {
      if (favData.listFavorite && !favData.listFavorite.some((item) => item.id === id)) {
        addItem(id)
        addElement()
        setActive(true)
        return
      } else if (favData.listFavorite && favData.listFavorite.some((item) => item.id === id)) {
        removeItem(id)
        removeElement()
        setActive(false)
        return
      }
    }
  };

  return (
    <div className='game-fav-button '
      onClick={() => {
        if (currentUser) {
          handleToggleFavorite()
        } else {
          navigate("/auth")
        }
      }}>
      <span aria-label="Favorito"
        className={`game-fav ${currentUser ? 'pointer' : 'default'} `}
        style={{ color: active ? 'red' : 'grey' }}>
        <i className='bx bxs-heart'></i>
      </span>
    </div >
  );
};

export default FavoriteButton;