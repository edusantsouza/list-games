import React, { useContext } from 'react'
import { MyContext } from '../../Contexts/GetGameList';
import Favorite from '../Buttons/Favorite'
import WishList from '../Buttons/WishList'
import CurrentPlay from '../Buttons/CurrentPlay'
import RatingStars from '../Buttons/RatingStars'
import { AuthContext } from '../../Contexts/AuthContext';
import './styles.css'


const FavoritesListContent = () => {
  const { finalList, isFav, arrayData } = useContext(MyContext)

  function getObjects(list, list2) {
    const arr = [];

    for (const obj1 of list) {
      for (const obj2 of list2) {
        if (compareObjects(obj1, obj2)) {
          arr.push(obj1);
          break;
        }
      }
    }

    return arr;
  }

  function compareObjects(obj1, obj2) {

    return obj1.id === obj2.id;
  }


  function filtrarObjetosEmComum(lista1, lista2) {
    return lista1.map(objeto1 => {
      const objetoExistente = lista2.find(objeto2 => compararObjetos(objeto1, objeto2));
      return { ...objeto1, isActive: !!objetoExistente };
    });
  }

  function compararObjetos(objeto1, objeto2) {

    return objeto1.id === objeto2.id;
  }


  const listaFiltrada = filtrarObjetosEmComum(finalList, arrayData[1]);
  console.log(listaFiltrada.filter(item => item.isActive === true));

  const showContent = () => {
    let arr = listaFiltrada.filter(item => item.isActive === true)
    return finalList && arr.map((item) => {
      return (
        <li className="game-item">
          <img src={item.thumbnail} alt={item.title} className='game-item-img' />
          <div className="game-item-info">
            <div className="game-item-section">
              <span className='game-item-categorie'>{item.genre}</span>
              <div className="game-item-btns">
                <Favorite id={item.id} isActive={item.isActive} title={item.title} />
                <WishList id={item.id} isActive={item.isActive} title={item.title} />
                <CurrentPlay id={item.id} isActive={item.isActive} title={item.title} />
              </div>
            </div>
            <div className="game-item-section">
              <p className="game-item-title">{item.title}</p>
              <RatingStars id={item.id} isActive={item.isActive} title={item.title} />
            </div>
          </div>
        </li>
      )
    })
  }



  return (
    <section className="show-games__container">
      <div className="show-games__header">
        <div className="show-games__wrapper">
          <p className="show-games__title">Seus favoritos</p>
        </div>

      </div>
      <ul className="show-games__list">
        {isFav && arrayData[1].length !== 0 ? showContent() : <p class="empty-msg">Você ainda não adicionou nada aos seus favoritos.</p>}
      </ul>
    </section>
  )
}

export default FavoritesListContent