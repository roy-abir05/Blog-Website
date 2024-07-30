import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios';
import BlogCard from '../../components/BlogCard/BlogCard';
import './MyBlogs.css'

const MyBlogs = () => {

  const [myBlogs, setMyBlogs] = useState([]);

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

  const getMyBlogs = async () => {
    await axios.get(`http://localhost:8080/api/posts/get/userPosts/${getCookie("userId")}`)
    .then((response) => {
      setMyBlogs(response.data);
      console.log(response.data);
    })
    .catch((exception)=>{
      alert("Error in getting blogs");
      window.location.href='http://localhost:5173';
    })
  }

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className='myBlogsContainer'>
        <NavBar />
        <div className='blogsContainer grid grid-cols-1 md:grid-cols-2 mt-5'>
        {
          myBlogs.map((blog, index) => (<BlogCard key={index} blog={blog}/>))
        }
        </div>
    </div>
  )
}

export default MyBlogs