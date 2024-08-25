import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Comment.css'

const Comment = (props) => {

  const [imgUrl, setImgUrl] = useState('../../../blankProfilePicture.png');


  useEffect(() => {

    const getImgUrl = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/users/get/profilePicture/${props.userId}`)
        .then((response) => {
          if(response.data.length==0) return;
          setImgUrl(response.data);
        })
      }
    

    getImgUrl();
  }, [])

  return (
    <div className='mainCommentContainer'>
        <div className="imageContainer">
            <img src={imgUrl}/>
        </div>
        <div className="contentContainer">
            <div className="infoContainer">
                <div className="nameContainer">
                    {props.userName}
                </div>
                <div className="dateAndTimeContainer">
                    <span>{props.dateAndTime.substring(0, 10)}</span>
                    <span>{props.dateAndTime.substring(11, 16)}</span>
                </div>
            </div>
            <div className="commentContainer">{props.content}</div>
        </div>
    </div>
  )
}

export default Comment