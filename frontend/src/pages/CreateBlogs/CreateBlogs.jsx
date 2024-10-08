import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './CreateBlogs.css';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import { HTMLToJSON } from 'html-to-json-parser';
import Editor from '../../components/Editor/Editor';
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from "rehype-sanitize";
import markdown from '@wcj/markdown-to-html';
import utf8 from 'utf8'

const CreateBlogs = () => {

  const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(
		() => ({
      readonly: false,
      placeholder: 'Show the world your creativity',
      defaultActionOnPaste: 'insert_as_html',
      statusbar: false,
      height: 400,
      // theme: 'dark',
      hotkeys: {
        redo: 'ctrl+z',
        undo: 'ctrl+y,ctrl+shift+z',
        indent: 'ctrl+]',
        outdent: 'ctrl+[',
        bold: 'ctrl+b',
        italic: 'ctrl+i',
        removeFormat: 'ctrl+shift+m',
        insertOrderedList: 'ctrl+shift+7',
        insertUnorderedList: 'ctrl+shift+8',
        openSearchDialog: 'ctrl+f',
        openReplaceDialog: 'ctrl+r'
      }
		}),
		[],
	   );

  const [title, setTitle] = useState('');

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

  useEffect(() => {
    let loginCookie = getCookie("login");
    if(loginCookie!=="Success"){
      window.location.href=`${import.meta.env.VITE_URL}`
    }
  }, []);

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
    
    if(content==='' || title===''){
      alert("Blog is empty")
      return
    }

    console.log(content);
    console.log(markdown(content));
    let htmlToJson = await HTMLToJSON("<div>"+markdown(content)+"</div>", true);
    console.log(htmlToJson);

    let text=`{"userId": "${utf8.decode(getCookie("userId"))}", "userName": "${getCookie("name")}", "title": "${title}","createdDate":"${getISOTimestamp()}","updatedDate":"${getISOTimestamp()}","content":${htmlToJson},"upVote":"0","downVote":"0"}`;

    console.log(text);
    let json=JSON.parse(text);
    console.log(json);

    await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/post/addPost`, json, { withCredentials: true })
      .then((response) => {
        console.log(response);
        window.location.href=`${import.meta.env.VITE_URL}blogs/myBlogs`;
      })
      .catch((error) => {
        alert(`Sorry!! Couldn't post blog at this moment:\n${error}\nPlease try again later`);
      })
  }
    
  return (
    <div className='containerCreateBlogs mt-20'>
        <NavBar />
        <div className='mainContainerCreateBlogs'>
          <div className='titleContainer'>
            <input type="text" name="title" className='title' placeholder='Please enter the title of your blog' required maxLength={40} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className='editorContainer' data-color-mode='light'>
          <MDEditor
            value={content}
            onChange={setContent}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
      className='markdownEditor'

    />
            {/* <Editor/> */}
          </div>
          <div className='postButtonContainer'>
            <button className='postButton' onClick={handleSubmit}>Post</button>
          </div>
        </div>
    </div>
  )
}

export default CreateBlogs