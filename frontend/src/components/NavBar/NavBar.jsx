import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
      let loginCookie = getCookie("login");
      console.log(loginCookie);
      let userCookie = getCookie("user");
      console.log(userCookie);
      if(loginCookie==="Success"){
        setSignedIn(true);
      }
    }, []);
  

  const handleSignIn = () => {
    window.location.href = "http://localhost:8080/login/";
  }

  const handleSignOut = () => {
    window.location.href = "http://localhost:8080/logout";
    setSignedIn(false);
  }

  return (
    <nav>

        <div className='logoContainer'>
          <a href='/' className='logoAnchor'>
            <img src="../../../public/blog_logo.png" alt="BlogSite" className='logoImg'/>
          </a>
        </div>

        <div className='tabs'>
          <Link to="/"><span className='tab homeTab'>Home</span></Link>
          <Link to="/blogs/listBlogs"><span className='tab blogsTab'>Blogs</span></Link>
          <Link to="/about"><span className='tab aboutTab'>About</span></Link>
          {/* {signedIn || <Link to="/blogs"></Link> } */}
        </div>

        <div>
          {signedIn || <button className='SignInButton SignButton' onClick={() => handleSignIn()}> Sign In </button>}
          {signedIn && <button className='SignOutButton SignButton' onClick={() => handleSignOut()}> Sign Out </button>}
        </div>
    </nav>
  )
}

export default NavBar;