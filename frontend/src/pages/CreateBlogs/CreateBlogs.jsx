import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './CreateBlogs.css';
import NavBar from '../../components/NavBar/NavBar';

const CreateBlogs = ({user}) => {

  const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(
		() => ({
      readonly: false,
      placeholder: 'Show the world your creativity',
      defaultActionOnPaste: 'insert_as_html',
      statusbar: false,
      height: 500,
      theme: 'dark',
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

  const handleSubmit = () => {

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
          <div className='postButtonContainer'>
            <button className='postButton' onClick={() => handleSubmit}>Post</button>
          </div>
        </div>
    </div>
  )
}

export default CreateBlogs