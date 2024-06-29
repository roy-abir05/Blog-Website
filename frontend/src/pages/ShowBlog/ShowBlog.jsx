import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useLocation } from "react-router-dom";
import { JSONToHTML } from 'html-to-json-parser';
import axios from 'axios'
import './ShowBlog.css'
import NavBar from '../../components/NavBar/NavBar';

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

  useEffect(() => {

    console.log(data);

    const getHTML = async () => {
      return await JSONToHTML(content);
    }
  
    const getContent = async () => {
      let html = await getHTML(content);
      setJsxContent(parse(html));
    }

    const initializeBlog = async () => {
      await axios.get(`http://localhost:8080/api/posts/get/getPost/${blogId}`)
      .then((response) => {
        if(response.data.upVotes.includes(Number(getCookie('userId')))===false)
          setUpVoted(false);
        else
          setUpVoted(true);
        if(response.data.downVotes.includes(Number(getCookie('userId')))===false)
          setDownVoted(false);
        else
          setDownVoted(true);

        // console.log(upVoted); console.log(downVoted);  
        setTitle(response.data.title);
        setUpVotes(response.data.upVotes.length);
        setDownVotes(response.data.downVotes.length);
      })
      .catch((e) => {
        alert(`Error in fetching the blog at this moment\n${e}`);
      })
      await getContent();
    }

    initializeBlog();
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
    checkLoggedIn();

    if(upVoted===true){
      await axios.put('http://localhost:8080/api/posts/put/removeUpVote', {postId : blogId, userId : Number(getCookie('userId'))})
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
      await axios.put('http://localhost:8080/api/posts/put/addUpVote', {postId : blogId, userId : Number(getCookie('userId'))})
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
      await axios.put('http://localhost:8080/api/posts/put/removeDownVote', {postId : blogId, userId : Number(getCookie('userId'))})
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
      await axios.put('http://localhost:8080/api/posts/put/addDownVote', {postId : blogId, userId : Number(getCookie('userId'))})
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
    <div className='showBlogContainer'>
      <NavBar />
      <div className="titleContainer">
        <span>{title}</span>
      </div>
      <div className="blogContentContainer">
          {jsxContent}
      </div>
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
    </div>
  )
}

export default ShowBlog