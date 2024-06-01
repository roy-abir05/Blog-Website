import React from 'react'
import NavBar from '../../components/NavBar/NavBar.jsx'

import './Home.css'

const Home = () => {
  return (
    <div className='mainContainerHome'>
        <NavBar />
        <div className='quotesContainer'>
          <div className='readQuote'>
            <h2>THE DIARY OF A DREAMER</h2>
            <p>Welcome to the Carousel of My Curiosities: Embrace the Everyday Extraoridnary as I Traverse through Time, Tea and Tacos</p>
          </div>
        </div>
    </div>
  );
};

export default Home;