// front-end/src/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Auth
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Posts
export const fetchPosts = async (token) => {
  const res = await fetch(`${API_URL}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createPost = async (token, caption, image) => {
  const res = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ caption, image }),
  });
  return res.json();
};

export const toggleLike = async (token, postId) => {
  const res = await fetch(`${API_URL}/api/posts/${postId}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
