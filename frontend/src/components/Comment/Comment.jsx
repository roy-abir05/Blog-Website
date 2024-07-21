import React from 'react'
import './Comment.css'

const Comment = (props) => {
  return (
    <div className='mainCommentContainer'>
        <div className="imageContainer">
            <img src="../../../public/blankProfilePicture.png"/>
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