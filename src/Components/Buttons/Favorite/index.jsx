import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';

const FavoriteButton = ({ id, title, isActive }) => {
  const { getUser, userCollectionRef } = useContext(AuthContext)
  const { finalList, setIsFav, isFav } = useContext(MyContext)
  const [arrayData, setArrayData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);


  const lorem = getUser && [...getUser.listFav]
  const userId = getUser && getUser.id

  const addElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listFav: arrayUnion({ title, id })
      });
      console.log("Novo elemento adicionado ao array com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo elemento ao array:", error);
    }
  };

  const removeElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listFav: arrayRemove({ id, title })
      });
      console.log("Elemento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo elemento ao array:", error);
    }
  };

  const handleToggleFavorite = () => {
    setIsFav(isFav + 1)

    if (!isActive) {
      isActive = true
      addElement()
    } else {
      removeElement()
    }

    setIsFavorite(!isFavorite)
  };

  return (
    <div className='game-fav-button '
      onClick={handleToggleFavorite}>
      <span aria-label="Favorito"
        className={`game-fav ${getUser ? 'pointer' : 'default'} `}
        style={{ color: isActive ? 'red' : 'grey' }}>
        <i className='bx bxs-heart'></i>
      </span>
    </div>
  );
};

export default FavoriteButton;