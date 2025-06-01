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
import { useNavigate } from 'react-router-dom';
import { parsePostContent } from './utils/parsePostContent';
import { popularDestinations } from './utils/popularDestinations';

const LastNews = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = useGetPosts();
  const navigate = useNavigate();

  const onShowMore = (postId) => {
    navigate(`/news/${postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const rawPosts = response.data.posts || [];
        const parsedPosts = rawPosts.map(parsePostContent);
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error when receiving posts without description:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box className="posts-container">
      <Typography gutterBottom variant="h1">
        NEWS
      </Typography>
      <Typography gutterBottom variant="h4">
        Explore the World: 2025 Hotspots
      </Typography>

      <Box className="posts-slider" sx={{ overflow: 'hidden', width: '100%' }}>
        <Box
          className="posts-track"
          sx={{
            display: 'flex',
            animation: 'posts 60s linear infinite',
            width: `${popularDestinations.length * 2 * 320}px`,
          }}
        >
          {[...popularDestinations, ...popularDestinations].map(
            (destination, index) => (
              <Card
                key={`${destination.id}-${index}`}
                sx={{
                  width: 300,
                  margin: '0 10px',
                  flexShrink: 0,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={destination.image}
                  title={destination.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {destination.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {destination.description.slice(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            )
          )}
        </Box>
      </Box>

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
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => onShowMore(post.id)}
                >
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
