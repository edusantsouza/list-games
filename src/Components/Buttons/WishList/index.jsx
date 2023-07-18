import React, { useState, useContext, useEffect } from 'react'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';
import './styles.css'

const Wishlist = ({ title, id, publisher, short_description, thumbnail, genre, platform, game_url }) => {
  const { userData, favData, currentUser } = useContext(AuthContext)
  const { ids, setIds } = useContext(MyContext)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(favData.listWishlist.some((item) => item.id === id))

  }, [])


  const userId = currentUser && userData.id

  const addElement = async () => {
    const docRef = doc(db, "userStorage", userId);

    try {
      await updateDoc(docRef, {
        listWishlist: arrayUnion({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
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
        listWishlist: arrayRemove({ title, id, publisher, short_description, thumbnail, genre, platform, game_url })
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



  const handleToggleWishList = () => {
    if (userData && currentUser) {
      if (!favData.listWishlist.some((item) => item.id === id)) {
        addItem(id)
        addElement()
        setActive(true)
        console.log(favData)
        return
      } else if (favData.listWishlist.some((item) => item.id === id)) {
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
      onClick={handleToggleWishList}>
      <span aria-label="currentPlaying" className={`game-fav ${currentUser ? 'pointer' : 'default'} `} style={{ color: active ? 'cyan' : 'grey' }}>
        <i className='bx bxs-bookmark-plus'></i>
      </span>
    </div>
  );
}


export default Wishlist