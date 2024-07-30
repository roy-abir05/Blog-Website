import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import axios from 'axios';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';

const NavBar = () => {

  const [signedIn, setSignedIn] = useState(false);
  const [isProfileDropdown, setProfileDropdown] = useState(false);

  const [imgUrl, setImgUrl] = useState('../../../blankProfilePicture.png');

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

  const getImgUrl = async () => {
    await axios.get(`http://localhost:8080/api/users/get/profilePicture/${getCookie("userId")}`)
    .then((response) => {
      if(response.data.length==0) return;
      setImgUrl(response.data);
    })
  }
  
  useEffect(() => {
    let loginCookie = getCookie("login");
    let userCookie = getCookie("user");
    if(loginCookie==="Success"){
      setSignedIn(true);
      getImgUrl();
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
    <nav className='w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5'>

        <div className='logoContainer'>
          <Link to='/' className='logoAnchor font-bold text-3xl'>
            {/* <img src="../../../public/blog_logo.png" alt="BlogSite" className='logoImg'/> */}
            Cognito<span className='text-primary font-bold text-3xl'>.io</span>
          </Link>
        </div>

        {/* <div>
          <h1>Child 1</h1>
        </div> */}

        {/* <div>
          <h1>Child 2</h1>
        </div> */}
        

         <div>
           <ModeToggle />
         </div>

        {/* <div className='tabs'>
          <Link to="/"><span className='tab homeTab'>Home</span></Link>
          <Link to="/blogs/listBlogs"><span className='tab blogsTab'>Blogs</span></Link>
          <Link to="/about"><span className='tab aboutTab'>About</span></Link>
        </div> */}

        <div className='profileContainer'>
          {signedIn || <Button className='SignInButton SignButton' onClick={handleSignIn}> Sign In </Button>}
          {signedIn && <div className='signedIn'>
              <img src={imgUrl} alt="" className='profilePicture' onClick={() => setProfileDropdown(!isProfileDropdown)}/>
              {isProfileDropdown && <ProfileDropdown userId={getCookie('userId')}/>}
            </div>}
        </div>
    </nav>
  )
}

export default NavBar;