import React, { useState } from 'react'
import axios from 'axios'
import './CommentBox.css'

const CommentBox = ({blogId, userId}) => {

    const [comment, setComment] = useState('');

    function getISOTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(now.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      }

    const handleSubmit = async () => {
        console.log(comment);
        if(comment.length===0){
            alert('Comment is empty');
            return;
        }

        let data = `{"postId": ${blogId}, "userId": ${userId}, "dateAndTime": "${getISOTimestamp()}", "content": "${comment}"}`;

        console.log(data);

        await axios.post('http://localhost:8080/api/comments/post/addComment', data, {headers: {
          'Content-Type': 'application/json'
      }})
        .then(() => {
            alert("Comment posted successfully");
            window.location.reload();
        })
        .catch((e) => {
            alert(`Error in posting comment at this moment\n${e}`);
        })
    }

  return (
    <div className='commentBoxContainer'>
        <textarea className='commentBoxEditor' placeholder='Share Your Opinion....' onChange={(e) => setComment(e.target.value)}></textarea>
        <button className='commentSubmit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CommentBox