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
    <nav className='bg-slate-200 border-gray-200 dark:bg-gray-900'>

        <div className='logoContainer'>
          <Link to='/' className='logoAnchor font-bold text-3xl'>
            {/* <img src="../../../public/blog_logo.png" alt="BlogSite" className='logoImg'/> */}
            Cognito<span className='text-primary font-bold text-3xl'>.io</span>
          </Link>
        </div>

        {/* <div className='tabs'>
          <Link to="/"><span className='tab homeTab'>Home</span></Link>
          <Link to="/blogs/listBlogs"><span className='tab blogsTab'>Blogs</span></Link>
          <Link to="/about"><span className='tab aboutTab'>About</span></Link>
        </div> */}

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to='/' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to='/blogs/listBlogs' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Blogs</Link>
            </li>
            <li>
              <Link to='/about' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>
          </ul>
        </div>

        <div className='w-36 flex items-center justify-between'>
          <div>
            <ModeToggle />
          </div>
          <div className='profileContainer'>
            {signedIn || <Button className='SignInButton SignButton' onClick={handleSignIn}> Sign In </Button>}
            {signedIn && <div className='signedIn'>
                {/* <img src={imgUrl} alt="" className='profilePicture' onClick={() => setProfileDropdown(!isProfileDropdown)}/> */}
                {/* {isProfileDropdown && <ProfileDropdown userId={getCookie('userId')}/>} */}
                <ProfileDropdown userId={getCookie('userId')} imgUrl={imgUrl}></ProfileDropdown>
              </div>}
          </div>
        </div>
    </nav>
  )
}

export default NavBar;