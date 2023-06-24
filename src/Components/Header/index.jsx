import React, { useState, useRef, useContext } from 'react'
import './index.css'
import Context from '../../Contexts/GeneralContext'


const Header = () => {
  const [change, setChange] = useState('')
  const ref = useRef(null);
  const [search, setSearch] = useContext(Context)

  const onClear = () => {
    if (ref.current.value.length > 0) {
      ref.current.value = "";
      setSearch('')
    }
  };
  return (
    <header className='container'>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        setSearch(change)
      }}>
        <label htmlFor="searchGame">Procure por um jogo</label>
        <div className='input-wrapper'>
          <input ref={ref} type="text" onKeyUp={(e) => {
            setChange(e.target.value)
          }} name='searchGame' placeholder='Ex.: Resident Evil 4' />
          <div className='search-btn'>
            <i onClick={onClear} className='bx bx-x close-search'></i>
            <button type="submit" className='go-search'>
              <i className='bx bx-search-alt-2 '></i>
            </button>
          </div>
        </div>
      </form>
    </header>
  )
}

export default Header