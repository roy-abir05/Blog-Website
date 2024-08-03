import React from 'react'
import { Link } from 'react-router-dom';
import './ProfileDropdown.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import {
  User,
  Plus,
  BookOpenText,
  LogOut
} from "lucide-react";

const ProfileDropdown = ({userId, imgUrl}) => {

  return (
    // <div className='profileDropdownListContainer'>
    //     <ul className='profileDropdownList'>
    //       <li><Link to={`/profile/${userId}`}>Profile</Link></li>
    //         <li><Link to='/blogs/createBlogs'>Create Blog</Link></li>
    //         <li><Link to='/blogs/myBlogs'>My Blogs</Link></li>
    //         <li><Link to="http://localhost:8080/logout">Sign Out</Link></li>
    //     </ul>
    // </div>

    <DropdownMenu className='w-8'>
      <DropdownMenuTrigger asChild>
        <div className='profilePictureContainer'>
          <img src={imgUrl} className='profilePicture'/> 
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link to={`/profile/${userId}`}>
            <User className="inline-block mr-2"/>
            <span style={{display : "inline-block"}}>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/blogs/createBlogs' className='inline-block'>
            <Plus className='inline-block mr-2'/>
            <span style={{display : "inline-block"}}>Create Blog</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/blogs/myBlogs'>
            <BookOpenText className="inline-block mr-2"/>
            <span style={{display : "inline-block"}}>My Blogs</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="http://localhost:8080/logout">
            <LogOut className="inline-block mr-2"/>
            <span style={{display : "inline-block"}}>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown