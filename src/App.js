
import './App.css';
import Header from './Components/Header/index'
import Content from './Components/Content';
import React , {useContext, useState}from 'react';
import Context from './Contexts/GeneralContext';

const App = () => {
 const [search, setSearch] = useState('')
  
  // const getSearchValue = (value) =>{
  //   setSearch(value)
  // } 
  return (
    <div className="App">
      <Context.Provider value={[search, setSearch]}>
        <Header />
        <Content/>
     </Context.Provider>
    </div>
  );
}

export default App;
