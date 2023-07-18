import React, { useState, useContext, useEffect } from 'react';
import './styles.css'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';
import { Rating } from '@mui/material';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';


const RatingStars = ({ title, id }) => {
  const [rating, setRating] = useState(0)
  const { getUser } = useContext(AuthContext)
  const { rate, setRate, setErrorMessage, ids, setIds } = useContext(MyContext)
  const { userData, favData, currentUser } = useContext(AuthContext)
  const [value, setValue] = useState(0)


  useEffect(() => {
    if (favData.rate.length > 0 && favData.rate.some((item) => item.id === id)) {
      const item = favData.rate.filter(item => item.id === id)
      const getStar = item[item.length - 1]
      setValue(getStar.element)
    }

  }, [])
  const userId = currentUser && userData.id

  const addElement = async (element) => {

    const updateValue = value
    console.log(updateValue)
    const docRef = doc(db, "userStorage", userId);
    try {
      await updateDoc(docRef, {
        rate: arrayUnion({ id, title, element })
      });

    } catch (error) {
      console.error(error)
    }
  };


  return (
    <div className='icon-wrapper'>
      <Rating
        name="rate"
        size="large"
        value={value}
        onChange={(event, newValue) => {
          addElement(event.target.value)
          setValue(newValue);
          console.log(event.target.value)
        }}
      />
    </div>
  );
};

export default RatingStars;