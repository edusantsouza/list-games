import React, { useState, useContext } from 'react'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase'
import './styles.css'

const Wishlist = ({ title, id }) => {
  const [onWishList, setOnWishList] = useState(false);
  const { getUser } = useContext(AuthContext)

  const { listWishlist, setListWishlist, setErrorMessage } = useContext(MyContext)

  const updateList = async () => {
    const userId = getUser && getUser.id
    const myref = doc(db, "userStorage", userId);
    await updateDoc(myref, {
      listWishlist: [...listWishlist]
    });
  }

  const handleToggleWishList = () => {
    if (getUser) {
      setOnWishList(!onWishList);
      updateList()
    } else {
      setErrorMessage('Efetue o login para aproveitar a PlayMaster!')
    }


    if (listWishlist.some(item => item.title === title)) {
      setListWishlist([...listWishlist.filter(item => item.title !== title)])
      return
    }
    setListWishlist([...listWishlist, { title, id }])
  };

  return (
    <div
      className='game-fav-button'
      onClick={handleToggleWishList}>
      <span aria-label="currentPlaying" className={`game-fav ${getUser ? 'pointer' : 'default'} `} style={{ color: onWishList ? 'cyan' : 'grey' }}>
        <i className='bx bxs-bookmark-plus'></i>
      </span>
    </div>
  );
}


export default Wishlist