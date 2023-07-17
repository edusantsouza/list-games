import React, { useContext, Fragment } from 'react'
import ShowAllGames from '../ShowAllGames'
import './styles.css'
import Home from './Home'
import MyComponent from '../MyComponent'


const Main = () => {
  return (
    <main className='main__container'>
      <MyComponent />
      <Home />
    </main>
  )
}

export default Main