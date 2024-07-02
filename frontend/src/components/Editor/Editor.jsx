import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from "rehype-sanitize";
import './Editor.css'

const Editor = () => {

    const [value, setValue] = useState("**Hello world!!!**");

  return (
    <div data-color-mode="light" className='markdownEditorContainer'>
    <MDEditor
      value={value}
      onChange={setValue}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      className='markdownEditor'

    />
    {value}
    {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} className='markdown'/> */}
  </div>
  )
}

export default Editor