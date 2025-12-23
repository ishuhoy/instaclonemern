import { useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PostCard = ({ post, token }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${post._id}/like`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedPost = await res.json();
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src="/default-avatar.png" alt="avatar" className="avatar" />
        <span className="username">{post.user?.name || 'User'}</span>
      </div>
      <img src={post.image || 'https://via.placeholder.com/600x600'} alt="post" className="post-image" />
      <div className="post-actions">
        <button onClick={toggleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
          {liked ? '❤️' : '🤍'} {post.likes?.length || 0}
        </button>
        <button className="comment-btn">💬</button>
      </div>
      {post.caption && <p className="post-caption">{post.caption}</p>}
    </div>
  );
};

export default PostCard;
