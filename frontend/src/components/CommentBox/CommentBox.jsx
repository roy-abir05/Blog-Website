import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '../ui/button';
import './CommentBox.css'
import utf8 from 'utf8'

const CommentBox = ({blogId}) => {

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
      
      const checkLoggedIn = () => {
        let loginCookie = getCookie("login");
        if(loginCookie!=="Success"){
          alert("Make your Opinion count. Log In");
          return false;
        }
        return true;
      }

    const handleSubmit = async () => {
        if(!checkLoggedIn()){
          return;
        }
        console.log(comment);
        if(comment.length===0){
            alert('Comment is empty');
            return;
        }

        let data = `{"postId": ${blogId}, "userId": ${getCookie("userId")}, "userName": "${utf8.decode(getCookie("name"))}", "dateAndTime": "${getISOTimestamp()}", "content": "${comment}"}`;

        console.log(data);

        await axios.post('http://localhost:8080/api/comments/post/addComment', data, { headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
        })
        .then((response) => {
            console.log(response.data);
            alert("Comment posted successfully");
            // window.location.reload();
        })
        .catch((e) => {
            alert(`Error in posting comment at this moment\n${e}`);
        })
    }

  return (
    <div className='commentBoxContainer'>
        <textarea className='commentBoxEditor border-tertiary text-black' placeholder='Share Your Opinion....' onChange={(e) => setComment(e.target.value)}></textarea>
        <Button className='commentSubmit mt-4 font-bold text-tertiary' onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default CommentBox