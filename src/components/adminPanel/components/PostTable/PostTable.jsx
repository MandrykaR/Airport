import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import getEditorConfig from './config/ckeditorConfig';
import { useCreatePost } from '../../../../entities/postsGateways';
import { Button } from '@mui/material';

import 'ckeditor5/ckeditor5.css';
import './postTable.scss';

const LICENSE_KEY = 'GPL';

const PostTable = () => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const [title, setTitle] = useState('');
  const { createPost } = useCreatePost();

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      editorConfig: getEditorConfig(LICENSE_KEY),
    };
  }, [isLayoutReady]);

  const handleSave = async () => {
    try {
      await createPost({
        title,
        content: editorInstance.getData() || '',
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className="main-container">
      <h2 className="title-post">Create Post</h2>
      <input
        value={title}
        className="input-post"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                onReady={(editor) => {
                  setEditorInstance(editor);
                }}
              />
            )}
          </div>
          <Button
            onClick={handleSave}
            variant="contained"
            color="success"
            className="button-post"
            sx={{ mt: 2, fontSize: 15, fontWeight: 500 }}
          >
            Send Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostTable;
