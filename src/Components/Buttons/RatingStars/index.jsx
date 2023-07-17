import React, { useState, useContext } from 'react';
import './styles.css'
import { MyContext } from '../../../Contexts/GetGameList';
import { AuthContext } from '../../../Contexts/AuthContext';

const RatingStars = ({ title, id }) => {
  const [rating, setRating] = useState(0)
  const { getUser } = useContext(AuthContext)
  const { rate, setRate, setErrorMessage } = useContext(MyContext)

  return (
    <div className='icon-wrapper'>
      {[1, 2, 3, 4].map((star) => (
        <span
          key={star}
          className={`game-rating star ${star <= rating ? 'gold' : 'grey'} ${getUser ? 'pointer' : 'default'} }`}
          onClick={() => {
            if (getUser) {
              setRating(star);
            } else {
              setErrorMessage('Efetue o login para aproveitar a PlayMaster!')
            }

            if (rate.some(item => item.title === title)) {
              setRate([...rate.filter(item => item.title !== title), { title, id, star }])
              return
            }
            setRate([...rate, { title, id, star }])


          }}
        >
          <i className='bx bxs-star' ></i>
        </span>
      ))}
    </div>
  );
};

export default RatingStars;