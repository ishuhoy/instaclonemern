import { useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CreatePost = ({ token, onPost }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ caption, image })
      });
      setCaption('');
      setImage('');
      onPost();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="caption-input"
      />
      <input
        type="url"
        placeholder="Image URL (e.g. https://example.com/image.jpg)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="image-input"
      />
      <button type="submit" className="post-btn">Post</button>
    </form>
  );
};

export default CreatePost;
