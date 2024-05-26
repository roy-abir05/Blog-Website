import React from 'react';
import './NavBar.css';

const NavBar = () => {

  const handleSignIn = () => {
    
  }

  return (
    <nav>
        <a href='/' className='logoAnchor'>
          <img src="../../../public/blog_logo.png" alt="BlogSite" className='logoImg'/>
        </a>

        <button className='SignInButton' onClick={() => handleSignIn()}> Sign In </button>
    </nav>
  )
}

export default NavBar;