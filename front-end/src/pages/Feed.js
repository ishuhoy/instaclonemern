import { useState, useEffect, useCallback } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import Stories from '../components/Stories';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Feed = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/posts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Posts error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load suggested users (still static for now)
  useEffect(() => {
    setSuggestedUsers([
      {
        id: 1,
        name: 'john_doe',
        profilePic:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
      {
        id: 2,
        name: 'jane_smith',
        profilePic:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      },
      {
        id: 3,
        name: 'mike_wilson',
        profilePic:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      },
    ]);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Search users
  const handleSearch = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    setSearchLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/search/users?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="feed-loading">
        <div className="spinner"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  return (
    <div className="feed-page">
      {/* Top Navigation */}
      <nav className="feed-nav">
        <div className="nav-left">
          <div className="instagram-logo-nav">Instagram</div>
        </div>
        <div className="nav-center">
          <div className="nav-icons">
            <button className="nav-icon active">🏠</button>
            <button
              className="nav-icon"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              🔍
            </button>
            <button className="nav-icon">➕</button>
            <button className="nav-icon">❤️</button>
            <button className="nav-icon">✈️</button>
          </div>
        </div>
        <div className="nav-right">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            alt="Profile"
            className="profile-pic-nav"
          />
        </div>
      </nav>

      {/* Search panel (toggles when clicking 🔍) */}
      {showSearch && (
        <div className="search-panel">
          <form onSubmit={handleSearch} className="search-form">
            <input
              className="search-input"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          {searchLoading && <p>Searching…</p>}
          {!searchLoading && searchQuery && searchResults.length === 0 && (
            <p>No users found</p>
          )}

          <ul className="search-results">
            {searchResults.map((u) => (
              <li key={u._id} className="search-result-item">
                <img
                  src={u.profilePic}
                  alt={u.name}
                  className="search-avatar"
                />
                <span>{u.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="feed-container">
        {/* Left Sidebar - Stories + Suggested */}
        <div className="feed-sidebar-left">
          <Stories />

          <div className="suggested-accounts">
            <div className="suggested-header">
              <span>Suggested for you</span>
              <button className="see-all-btn">See all</button>
            </div>
            {suggestedUsers.map((user) => (
              <div key={user.id} className="suggested-user">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="suggested-avatar"
                />
                <div className="suggested-info">
                  <span className="suggested-name">{user.name}</span>
                  <span className="suggested-desc">
                    Followed by user123 + 2 more
                  </span>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Feed */}
        <main className="feed-main">
          <CreatePost token={token} onPost={fetchPosts} />
          <div className="posts-grid">
            {posts.length === 0 ? (
              <div className="empty-feed">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200"
                  alt="No posts"
                />
                <h3>Nothing to see here yet</h3>
                <p>Follow people to start seeing their posts</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  token={token}
                  onLike={fetchPosts}
                />
              ))
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="feed-sidebar-right">
          <div className="user-profile-card">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
              alt="Profile"
              className="user-avatar-large"
            />
            <div className="user-info">
              <span className="user-fullname">John Doe</span>
              <span className="user-username">@johndoe</span>
            </div>
          </div>

          <div className="sidebar-links">
            <a href="#" className="sidebar-link">
              <span>Profile</span>
              <span>👤</span>
            </a>
            <a href="#" className="sidebar-link">
              <span>Your activity</span>
              <span>📊</span>
            </a>
            <a href="#" className="sidebar-link">
              <span>Saved</span>
              <span>🔖</span>
            </a>
            <a href="#" className="sidebar-link">
              <span>Your lists</span>
              <span>📝</span>
            </a>
          </div>

          <div className="sidebar-footer">
            <a href="#" className="theme-toggle">
              🌙 Switch to dark mode
            </a>
            <a href="#" className="logout-link">
              Logout
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feed;
