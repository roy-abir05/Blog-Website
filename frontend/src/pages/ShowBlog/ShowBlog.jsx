import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useLocation } from "react-router-dom";
import { JSONToHTML } from 'html-to-json-parser';
import axios from 'axios'
import './ShowBlog.css'
import NavBar from '../../components/NavBar/NavBar';
import CommentBox from '../../components/CommentBox/CommentBox';
import Comment from '../../components/Comment/Comment';

const ShowBlog = () => {

  const location = useLocation();
  const data = location.state;
  const content = data.content;
  const blogId = data.blogId;

  const [title, setTitle] = useState('');
  const [jsxContent, setJsxContent] = useState('');

  const [upVotes, setUpVotes] = useState(data.upVotes);
  const [downVotes, setDownVotes] = useState(data.downVotes);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const [comments, setComments] = useState([]);

  useEffect(() => {

    setTitle(data.title);

    const getHTML = async () => {
      return await JSONToHTML(content);
    }
  
    const getContent = async () => {
      let html = await getHTML(content);
      setJsxContent(parse(html));
    }

    const getComments = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/get/postComments/${blogId}`)
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((e) => {
        console.log(`Error in fetching comments at this moment\n${e}`);
      })
    }

    const initializeBlog = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/get/getPost/${blogId}`)
      .then((response) => {
        if(response.data.upVotes.includes(Number(getCookie('userId')))===false)
          setUpVoted(false);
        else
          setUpVoted(true);
        if(response.data.downVotes.includes(Number(getCookie('userId')))===false)
          setDownVoted(false);
        else
          setDownVoted(true);

        setUpVotes(response.data.upVotes.length);
        setDownVotes(response.data.downVotes.length);
      })
      .catch((e) => {
        alert(`Error in fetching the blog at this moment\n${e}`);
      })
      await getContent();
    }

    initializeBlog();
    getComments();
  }, [])

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

  const upVoteHandler = async () => {

    if(checkLoggedIn()===false) return;

    if(upVoted===true){
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/removeUpVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      setUpVoted(false);
      setUpVotes(upVotes-1);
    }
    else{
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/addUpVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/removeDownVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      setUpVoted(true);
      setUpVotes(upVotes+1);
      if(downVoted) setDownVotes(downVotes-1);
      setDownVoted(false);
    }
  }

  const downVoteHandler = async () => {

    if(checkLoggedIn()===false) return;
    
    if(downVoted===true){
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/removeDownVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      setDownVoted(false);
      setDownVotes(downVotes-1);
    }
    else{
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/addDownVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/put/removeUpVote`, {postId : blogId, userId : Number(getCookie('userId'))}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
      })
      .catch((e) => {
        alert(`Error in Up Voting\n${e}\nPlease try again later`);
      })
      setDownVoted(true);
      setDownVotes(downVotes+1);
      if(upVoted) setUpVotes(upVotes-1);
      setUpVoted(false);
    }
  }

  return (
    <div className='showBlogContainer w-screen'>
      <NavBar />
      <div className='w-4/5 flex flex-col items-center mt-20'>
        <div className="titleContainer">
          <span className='text-tertiary'>{title}</span>
        </div>
        <div className="blogContentContainer">
            {jsxContent}
        </div>
        <div className='showBlogFooter'>
          <div className="votesContainer">
            <div className="upVoteContainer" onClick={upVoteHandler}>
              {upVoted===true ? <img src="../../../public/thumbsUpIconGreen.png"/> : <img src="../../../public/thumbsUpIconWhite.png"/>}
              <span style={{color: "green"}}>{upVotes}</span>
            </div>
            <div className="downVoteContainer" onClick={downVoteHandler}>
              <span style={{color: "red"}}>{downVotes}</span>
              {downVoted===true ? <img src="../../../public/thumbsDownIconRed.png"/> : <img src="../../../public/thumbsDownIconWhite.png"/>}
            </div>
          </div>
          <div className="commentsCount">
            <span>{comments.length}</span>
            <img src="../../../public/comments_icon.png"/>
          </div>
        </div>
        <div className="commentsSection">
          <CommentBox blogId={blogId} userId={0}/>
          {comments.map((comment, index) => (
            <Comment key={index} userId={comment.userId} userName={comment.userName} dateAndTime={comment.dateAndTime} content={comment.content}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowBlog