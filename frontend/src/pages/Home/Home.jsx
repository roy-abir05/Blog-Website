import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx'
import { Button } from '@/components/ui/button.jsx';

import './Home.css'

const Home = () => {
  return (
    <div className='mainContainerHome bg-gradient-to-r from-blue-500 to-white-500'>
        <NavBar />
        <div className='quotesContainer'>
          <div className='readQuote'>
            <h2 className='text-tertiary'>THE DIARY OF A DREAMER</h2>
            <p className='text-tertiary'>Welcome to the Carousel of My Curiosities: Embrace the Everyday Extraoridnary as I Traverse through Time, Tea and Tacos</p>
            <Link to='/blogs/listBlogs'><Button className='text-tertiary'>View Blogs</Button></Link>
          </div>
        </div>
    </div>
  );
};

export default Home;