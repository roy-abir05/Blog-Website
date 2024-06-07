import React from 'react'
import { Link } from 'react-router-dom';
import './ProfileDropdown.css'

const ProfileDropdown = () => {
  return (
    <div className='profileDropdownListContainer'>
        <ul className='profileDropdownList'>
            <li><Link to='/blogs/createBlogs'>Create Blog</Link></li>
            <li><Link to='/blogs/myBlogs'>My Blogs</Link></li>
            <li><Link to="http://localhost:8080/logout">Sign Out</Link></li>
        </ul>
    </div>
  )
}

export default ProfileDropdown