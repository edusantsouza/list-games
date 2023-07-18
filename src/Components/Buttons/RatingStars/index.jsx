import React, { useState, useContext, useEffect } from 'react';
import './styles.css'
import { AuthContext } from '../../../Contexts/AuthContext';
import { Rating } from '@mui/material';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase'
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const RatingStars = ({ title, id }) => {
  const { userData, favData, currentUser, ids } = useContext(AuthContext)
  const [value, setValue] = useState(0)
  const navigate = useNavigate()



  useEffect(() => {
    if (currentUser && favData && favData.rate.length > 0 && favData.rate.some((item) => item.id === id)) {
      const item = favData.rate.filter(item => item.id === id)
      const getStar = item[item.length - 1]
      setValue(getStar.element)
    }

  })

  const userId = currentUser && userData.id

  const addElement = async (element) => {

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
        style={{ cursor: `${currentUser ? 'pointer' : 'initial'}` }}
        name="rate"
        size="large"
        value={value}
        max={4}
        onChange={(event) => {
          if (currentUser) {
            addElement(event.target.value)
            setValue(Number(event.target.value));
          } else {
            navigate("/auth")
          }
        }}
      />
    </div>
  );
};

export default RatingStars;