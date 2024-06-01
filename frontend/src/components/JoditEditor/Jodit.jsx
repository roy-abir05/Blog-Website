import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Jodit = () => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(
		() => ({
		readonly: false,
		placeholder: '',
		// placeholder: false,
		defaultActionOnPaste: 'insert_as_html',
		statusbar: false,
		}),
		[],
	   );

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onChange={newContent => setContent(newContent)}
		/>
	);
};

export default Jodit;