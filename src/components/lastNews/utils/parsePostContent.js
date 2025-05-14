export const parsePostContent = (post) => {
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
    title: post.title || 'No title',
    description: description || 'No description',
    fullHtml: post.content,
  };
};
