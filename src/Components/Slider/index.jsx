import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { MyContext } from '../../Contexts/GetGameList'
import './styles.css'

const Slider = () => {
  const { finalList } = React.useContext(MyContext)

  const showAll = () => {
    return finalList && finalList.map((item, index) => {
      const { title, id, publisher, short_description, thumbnail, genre, platform, game_url } = item;
      if (index >= 0 && index <= 4) {
        return { title, id, publisher, short_description, thumbnail, genre, platform, game_url };
      }
    }).filter(item => item !== undefined)
  }

  const arrayList = showAll()

  const sliderSection = () => {
    return (
      <div className="home__slide-section">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {arrayList && arrayList.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <div className="slide-item">
                  <img className='slider-image' src={item.thumbnail} alt={item.title} />
                  <div className="slide-info">
                    <p className="slide-title">{item.title}</p>
                    <p className="slide-description">{item.short_description}</p>
                    <a href={item.game_url} target="_blank" className='slide-button'>Jogar agora</a>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    )
  }

  return sliderSection()
}

export default Slider