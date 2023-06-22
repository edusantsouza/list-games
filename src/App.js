
import './App.css';
import Header from './Components/Header/index'
import ListGames from './Components/ListGames';
import { useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('')

  const getSearchValue = (value) =>{
    setSearch(value)
  } 
  return (
    <div className="App">
     <Header getSearchValue={getSearchValue}/>
     <ListGames search={search} />
    </div>
  );
}

export default App;
