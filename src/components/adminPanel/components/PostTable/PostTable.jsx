import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import getEditorConfig from './config/ckeditorConfig';
import {
  getPostsById,
  useCreatePost,
  useUpdatePost,
} from '../../../../entities/postsGateways';
import { Alert, Button, Snackbar, Typography } from '@mui/material';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import { useParams } from 'react-router';

import 'ckeditor5/ckeditor5.css';
import './postTable.scss';

const LICENSE_KEY = 'GPL';

const PostTable = () => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const { createPost } = useCreatePost();
  const { getPostById } = getPostsById();
  const { updatePost } = useUpdatePost();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getPostById(id).then((post) => {
        setTitle(post.data.title);
        setContent(post.data.content);
      });
    }
  }, [id]);

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
      const content = editorInstance.getData() || '';
      if (id) {
        await updatePost(id, { title, content });
      } else {
        await createPost({
          title,
          content,
        });
      }

      setSnackbar({
        open: true,
        message: 'Another good post, cool!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'You missed something',
        severity: 'error',
      });
    }

    setTitle('');
    setContent(' ');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="main-container">
      <div className="box-name">
        <ModeEditRoundedIcon fontSize="large" color="action" />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {id ? 'Edit Post' : 'Create Post'}
        </Typography>
      </div>
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
                data={content}
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
            {id ? 'Update Post' : 'Send Post'}
          </Button>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default PostTable;
