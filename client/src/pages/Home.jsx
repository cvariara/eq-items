import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id='Home'>
      <h1>Everquest Items</h1>
      <p>Search for any items this game has to offer</p>
      <Link to='/items'>
        <button className="search">Browse Items</button>
      </Link>
    </div>
  )
}

export default Home;