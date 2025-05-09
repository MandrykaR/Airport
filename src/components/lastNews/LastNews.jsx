import React, { useState, useEffect } from 'react';
import { useGetPosts } from '../../entities/postsGateways';

import './lastNews.scss';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const LastNews = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = useGetPosts();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const rawPosts = response.data.posts || [];
        const parsedPosts = rawPosts.map((post) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(post.content, 'text/html');

          const img = doc.querySelector('img');

          const extractText = (node) => {
            let text = '';
            const excludeTags = ['img', 'script', 'style'];
            const walk = (currentNode) => {
              for (let child of currentNode.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                  text += child.textContent.trim() + ' ';
                } else if (
                  child.nodeType === Node.ELEMENT_NODE &&
                  !excludeTags.includes(child.tagName.toLowerCase())
                ) {
                  walk(child);
                }
              }
            };
            walk(node);
            return text.trim();
          };

          const description = extractText(doc.body);

          return {
            id: post.id,
            image: img ? img.src : '/public/img/no-photo.png',
            title: post.title ? post.title : 'No title',
            description: description || 'No description',
          };
        });
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error when receiving posts without description:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box className="posts-container">
      {posts.length > 0 ? (
        <Box className="posts-block">
          {posts.map((post) => (
            <Card key={post.id} sx={{ width: 300, boxShadow: 3 }}>
              <CardMedia
                sx={{ height: 140, objectFit: 'cover' }}
                image={post.image}
                title={post.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Button size="small" variant="contained" sx={{ mt: 2 }}>
                  Show More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          There are no posts
        </Typography>
      )}
    </Box>
  );
};

export default LastNews;
