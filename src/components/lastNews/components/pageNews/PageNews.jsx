import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPosts } from '../../../../entities/postsGateways';
import { parsePostContent } from '../../utils/parsePostContent';

import './pageNews.scss';

const PageNews = () => {
  const { id } = useParams();
  const { getPosts } = useGetPosts();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPosts();
        const posts = res.data.posts || [];
        const found = posts.find((p) => p.id === id);
        const parseContent = parsePostContent(found);

        setPost(parseContent);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="news-container">
      <h1 className="news-title">{post.title}</h1>

      <img className="news-image" src={post.image} alt="post" />

      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
    </div>
  );
};

export default PageNews;
