import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      // Success - save token and redirect
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Make sure backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="phone-content">
              <div className="carousel">
                <div className="carousel-item active">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop" 
                    alt="Instagram friends" 
                  />
                  <div className="carousel-text">
                    <h3>Connect with friends</h3>
                    <p>Share photos and stories to reconnect with friends.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="logo">
            <div className="logo-circle">
              <span className="logo-text">Instagram</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-msg">
                {error}
              </div>
            )}
            
            <input
              type="text"
              className="auth-input"
              placeholder="Phone number, username, or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            
            <button 
              type="submit" 
              className="login-btn" 
              disabled={loading}
            >
              {loading ? (
                <span>🔄 Logging in...</span>
              ) : (
                'Log in'
              )}
            </button>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <button className="facebook-btn" disabled>
              <svg viewBox="0 0 24 24" className="fb-icon">
                <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
            </button>
            
            <div className="forgot-section">
              <Link to="/forgot-password" className="forgot-link">
                Trouble logging in?
              </Link>
            </div>
          </form>
        </div>

        <div className="auth-signup">
          <p>Don't have an account? 
            <Link to="/register" className="signup-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
