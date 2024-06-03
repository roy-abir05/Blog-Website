import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './CreateBlogs.css';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';

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

  const handleSubmit = async () => {

    let text='{"userId": "302","title": "Title","dateAndTime":"02/06/2024","content":"<p>This is a test Blog.<br></p>","upVote":"0","downVote":"0","category":"none"}';
    
    if(content===''){
      alert("Blog is empty")
      return
    }

    console.log(text);
    let json=JSON.parse(text);
    console.log(json);

    await axios.post('http://localhost:8080/api/post/addPost', json)
      .then((response) => {
        console.log(response);
      })
  }
    
  return (
    <div className='containerCreateBlogs'>
        <NavBar />
        <div className='mainContainerCreateBlogs'>
          <div className='editorContainer'>
            <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={newContent => setContent(newContent)}
            className='editor'
            />
          </div>
          <div className='titleContainer'>
            <input type="text" name="title" className='title' placeholder='Please enter the title of your blog' required maxLength={40}/>
          </div>
          <div className='postButtonContainer'>
            <button className='postButton' onClick={handleSubmit}>Post</button>
          </div>
        </div>
        {content}
    </div>
  )
}

export default CreateBlogs