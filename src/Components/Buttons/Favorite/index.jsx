import React, { useState, useContext } from 'react';
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'


const FavoriteButton = ({ id, title }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { getUser, userCollectionRef } = useContext(AuthContext)
  const { listFavorite, setListFavorite, setErrorMessage } = useContext(MyContext)


  const lorem = getUser && [...getUser.listFav]
  const userId = getUser && getUser.id

  const addElement = async (newItem) => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        lisFav: arrayUnion({ title, id })
      });
      console.log("Novo elemento adicionado ao array com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo elemento ao array:", error);
    }
  };

  const removeElement = async (newItem) => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listFav: arrayRemove({ title, id })
      });
      console.log("Novo elemento adicionado ao array com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar novo elemento ao array:", error);
    }
  };


  const handleToggleFavorite = () => {

    setIsFavorite(!isFavorite)

    isFavorite
      ? addElement()
      : removeElement()

    console.log(getUser)
  };

  return (
    <div className='game-fav-button '

      onClick={handleToggleFavorite}>
      <span aria-label="Favorito"
        className={`game-fav ${getUser ? 'pointer' : 'default'} `}
        style={{ color: isFavorite ? 'red' : 'grey' }}>
        <i className='bx bxs-heart'></i>
      </span>
    </div>
  );
};

export default FavoriteButton;