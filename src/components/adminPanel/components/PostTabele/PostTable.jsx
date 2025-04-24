import { Editor } from 'primereact/editor';
import React, { useState } from 'react';

import './postTable.scss';

const PostTable = () => {
  const [text, setText] = useState('');

  return (
    <div className="card">
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: '420px' }}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: test }}></div> */}
      <button>Send</button>
    </div>
  );
};

export default PostTable;
