import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useLocation } from "react-router-dom";
import './ShowBlog.css'

const ShowBlog = () => {

  const location = useLocation();
  const data = location.state;
  const content = data.content;
  const jsxContent = parse(content);

  useEffect(() => {
    console.log(content);
  }, [])

  return (
    <div className='showBlogContainer'>
        <div className="blogContainer">
            {jsxContent}
        </div>
    </div>
  )
}

export default ShowBlog