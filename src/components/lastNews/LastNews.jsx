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

const LastNews = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = useGetPosts();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const onShowMore = (postId) => {
    navigate(`/news/${postId}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide < posts.length ? prev + itemsPerSlide : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerSlide >= 0
        ? prev - itemsPerSlide
        : posts.length - itemsPerSlide
    );
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
      <Box className="posts-slider">
        <Button className="slider-arrow left" onClick={prevSlide}>
          ‹
        </Button>

        <Box className="posts-track">
          {posts
            .slice(currentIndex, currentIndex + itemsPerSlide)
            .map((post) => (
              <Card
                key={post.id}
                sx={{ width: 300, boxShadow: 3, margin: '0 1rem' }}
              >
                <CardMedia
                  sx={{ height: 140, objectFit: 'cover' }}
                  image={post.image}
                  title={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description.slice(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>

        <Button className="slider-arrow right" onClick={nextSlide}>
          ›
        </Button>
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
