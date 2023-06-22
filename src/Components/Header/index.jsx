import React, { useState, useRef } from 'react'
import './index.css'



const Header = ({ getSearchValue }) => {
  const [change, setChange] = useState('')
  const ref = useRef(null);

  const onClear = () => {
    ref.current.value = "";
    getSearchValue('')

  };
  return (
    <header className='container'>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        getSearchValue(change)
      }}>
        <label htmlFor="searchGame">Procure por um jogo</label>
        <div className='input-wrapper'>
          <input ref={ref} type="text" onKeyUp={(e) => {
            setChange(e.target.value)
          }} name='searchGame' placeholder='Ex.: Resident Evil 4' />
          <div className='search-btn'>
            <i onClick={onClear} className='bx bx-x close-search'></i>
            <button type="submit" onClick={() => {

            }} className='go-search'>
              <i className='bx bx-search-alt-2 '></i>
            </button>
          </div>
        </div>
      </form>
    </header>
  )
}

export default Header