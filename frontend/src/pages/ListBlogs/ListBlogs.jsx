import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx'
import axios from 'axios';
import './ListBlogs.css'
import BlogCard from '../../components/BlogCard/BlogCard.jsx';

const ListBlogs = () => {

  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    await axios.get('http://localhost:8080/api/posts/get/allPosts')
    .then((response) => {
      setBlogs(response.data);
      console.log(response.data);
    })
    .catch((exception)=>{
      alert("Error in getting blogs");
      window.location.href='http://localhost:5173';
    })
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
     <div className='mainContainer'>
        <NavBar />
        <div className='blogsContainer grid grid-cols-1 md:grid-cols-2 mt-5'>
        {
          blogs.map((blog, index) => (<BlogCard key={index} blog={blog}/>))
        }
        </div>
     </div>
  )
}

export default ListBlogs