import React, { useRef, useState, useContext } from 'react'
import './styles.css'
import ControlList from '../../ControlList';
import Slider from '../../Slider';
import { MyContext } from '../../../Contexts/GetGameList';
import { Link } from 'react-router-dom';


const Home = () => {
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const gameList = useRef()
  const { setOnSearchByAll } = useContext(MyContext)


  const handleMouseDown = (event) => {
    setDragging(true);
    setDragStartX(event.clientX - gameList.current.offsetLeft);
    setScrollLeft(gameList.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;
    event.preventDefault();
    const newScrollLeft = dragStartX - event.clientX + gameList.current.offsetLeft;
    gameList.current.scrollLeft = scrollLeft + newScrollLeft;
  };

  const handlePrevClick = (e) => {
    e.preventDefault()
    gameList.current.scrollLeft -= gameList.current.offsetWidth
  }

  const handleNextClick = (e) => {
    e.preventDefault()
    gameList.current.scrollLeft += gameList.current.offsetWidth
  }


  return (
    <section className='home__container'>
      <Slider />
      <div className="highlight-section">
        <div className="show-games__header">
          <div className="show-games__wrapper">
            <p className="show-games__title">Em destaque</p>
          </div>

          <div className="show-games-pages home-show">
            <div className="page-btn">
              <Link onClick={() => {
                setOnSearchByAll(true)
              }} className="current-page" to="/categorias">Ver todos</Link>
              <p className="prev-btn"
                onClick={handlePrevClick}>
                <i className='bx bx-left-arrow-alt' ></i>
              </p>
              <p className="next-btn"
                onClick={handleNextClick}>
                <i className='bx bx-right-arrow-alt' ></i>
              </p>
            </div>
          </div>
        </div>
        <ul
          ref={gameList}
          className="show-games__list home-show"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}>
          <ControlList />
        </ul>
      </div >
    </section >
  )
}

export default Home