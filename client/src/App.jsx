import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Items from './pages/Items';
import Item from './pages/Item';
import Navbar from './components/Navbar';
import SearchItem from './pages/SearchItem';

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/items' element={<Items />} />
          <Route path='/item/:id' element={<Item />} />
          <Route path='/search' element={<SearchItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
