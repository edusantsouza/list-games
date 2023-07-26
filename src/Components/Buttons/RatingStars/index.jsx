import React, { useState, useContext, useEffect } from 'react';
import './styles.css'
import { db } from '../../../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AuthContext } from '../../../Contexts/AuthContext';
import 'firebase/database';
import { useNavigate } from 'react-router-dom';


const RatingStars = ({ title, id }) => {
  const { userData, favData, currentUser, ids } = useContext(AuthContext)
  const [value, setValue] = useState('')
  const [count, setCount] = useState(0)
  const navigate = useNavigate()



  // useEffect(() => {
  //   if (favData) {
  //     const item = favData.rate.filter(item => item.id === id)
  //     const getStar = item[item.length - 1]
  //     console.log(item)
  //     setValue(item[item.length - 1])
  //   }


  // }, [count])

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
    <div className="star-component">
      {[1, 2, 3, 4].map((item) => {
        return (
          <i key={item}
            style={value >= item ? { color: 'gold' } : { color: 'grey' }}
            id={item}
            className={`star bx bxs-star ${currentUser ? 'pointer' : 'default'} `}
            onClick={(event) => {
              if (currentUser) {
                setValue(event.currentTarget.id)
              } else {
                navigate("/auth")
              }
            }}
          ></i>)
      })}
    </div>
  );
};


export default RatingStars;