import React, { useEffect, useState } from 'react';
import './NavBar.css';
import axios from 'axios';

const NavBar = () => {

  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; max-age=0; path=/`;
  }
  


    useEffect(() => {
      let loginCookie = getCookie("login");
      console.log(loginCookie);
      if(loginCookie==="Success"){
        setSignedIn(true);
      }
    }, []);
  

  const handleSignIn = () => {
    window.location.href = "http://localhost:8080/login/";
  }

  const handleSignOut = () => {
    deleteCookie("login");
    setSignedIn(false);
  }

  return (
    <nav>
        <a href='/' className='logoAnchor'>
          <img src="../../../public/blog_logo.png" alt="BlogSite" className='logoImg'/>
        </a>

        {signedIn || <button className='SignInButton SignButton' onClick={() => handleSignIn()}> Sign In </button>}
        {signedIn && <button className='SignOutButton SignButton' onClick={() => handleSignOut()}> Sign Out </button>}
    </nav>
  )
}

export default NavBar;