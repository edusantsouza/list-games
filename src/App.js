import React, {Fragment} from 'react';
import './App.css';
import GetGameList from './Contexts/GetGameList';
import Auth from '../src/pages/Auth'
import {Route, Routes} from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Home from './pages/Home';
import Categories from './pages/Categories';
import FavoriteList from './pages/FavoriteList';
import WishlistList from './pages/WishlistList';
import CurrentList from './pages/CurrentList';


const App = () => {

  return (
    <div className="App container">
       <AuthProvider>
          <GetGameList>   
            <Fragment>
              <Routes>
                <Route exac path="/" element={<Home/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path="/categorias" element={<Categories/>}/>
                <Route path="/favoritos" element={<FavoriteList/>}/>
                <Route path="/wishlist" element={<WishlistList/>}/>
                <Route path="/biblioteca" element={<CurrentList/>}/>
              </Routes>
            </Fragment>
          </GetGameList>
        </AuthProvider>

    </div>
  );
}

export default App;
