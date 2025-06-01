export const parsePostContent = (post) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content, 'text/html');

  const imagePost = doc.querySelector('img');
  const imagePostSrc = imagePost?.src ?? '/public/imageNews/no-photo.png';
  imagePost?.remove();

  const descriptionHtml = doc.body.innerHTML;
  const descriptionPlain = doc.body.textContent.trim();

  return {
    id: post.id,
    title: post.title || 'No title',

    image: imagePostSrc,
    description: descriptionHtml,
    descriptionText: descriptionPlain,
    postDate: post.createdAt,
    fullHtml: post.content,
  };
};
