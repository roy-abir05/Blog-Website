import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({blog}) => {

  const navigate = useNavigate();

  const handleReadMore = () => {
    axios.get(`http://localhost:8080/api/posts/get/getPost/${blog.postId}`)
    .then((response) => {
      navigate('/blogs/showBlog', { state: {content : response.data} });
    })
  }
  
  return (

    <div className='blogCardContainer'>
      <div className='blogImageContainer'>
        <img src="../../../public/blogCardImage.jpg" alt="" className='blogImage'/>
      </div>
      <div className='blogContentContainer'>
        <div className='blogTitleContainer'>
          <h2>{blog.title}</h2>
        </div>
        <div className='blogDescriptionContainer'>
          <div className="blogDateContainer">
            <span>{blog.createdDate.slice(0, 10)}</span>
          </div>
          <div className="authorContainer">
            <span>{blog.userName}</span>
          </div>
        </div>
        <div className="votesContainer">
          <div className="upVoteContainer">
            <span>{blog.upVote}</span>
            <img src="../../../public/thumbsUpIconWhite.png" alt="" />
          </div>
          <div className="downVoteContainer">
            <span>{blog.downVote}</span>
            <img src="../../../public/thumbsDownIconWhite.png" alt="" />
          </div>
        </div>
      </div>
      <div className="blogReadMoreContainer">
        <button className='readMoreButton' onClick={handleReadMore}>Read More </button>
      </div>
    </div>
  )
}

export default BlogCard