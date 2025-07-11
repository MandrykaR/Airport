import { format } from 'date-fns';

export const parsePostContent = (post) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content, 'text/html');

  const imagePost = doc.querySelector('img');
  const imagePostSrc = imagePost?.src ?? '/public/imageNews/no-photo.png';
  imagePost?.remove();

  const descriptionPlain = doc.body.textContent.trim();

  return {
    id: post.id,
    title: post.title || 'No title',
    image: imagePostSrc,
    descriptionText: descriptionPlain,
    postDate: format(post.createdAt, 'LLLL dd yyyy HH:mm'),
    updateDatePost: format(post.updatedAt, 'LLLL dd yyyy HH:mm'),
    fullHtml: post.content,
  };
};
