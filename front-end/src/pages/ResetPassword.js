import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // ✅ FIXED: Added Link import

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is valid
    fetch(`http://localhost:5000/api/auth/reset-password/${token}`, { 
      method: 'HEAD' 
    })
      .then(() => setValidToken(true))
      .catch(() => {
        setValidToken(false);
        setMessage('❌ Invalid or expired reset link');
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setMessage(`❌ ${data.error || 'Reset failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network error. Try requesting a new reset link.');
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="auth-page">
        <div className="auth-right">
          <div className="auth-card">
            <div className="logo">
              <div className="logo-circle">
                <span className="logo-text">Instagram</span>
              </div>
            </div>
            <h2 style={{ marginBottom: '16px' }}>Link expired</h2>
            <p style={{ color: '#8e8e8e', marginBottom: '24px' }}>
              Your password reset link has expired. 
              Request a new one below.
            </p>
            <Link 
              to="/forgot-password" 
              className="login-btn"
              style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
            >
              Request new link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="phone-content">
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=500&fit=crop" 
                alt="New password" 
              />
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
            <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Create new password</h2>
            <p style={{ color: '#8e8e8e', marginBottom: '32px', fontSize: '16px' }}>
              Enter your new password. Your account will be automatically logged in.
            </p>
            
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
              minLength="6"
              autoComplete="new-password"
            />
            
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              required
              minLength="6"
              autoComplete="new-password"
            />
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '🔄 Resetting...' : 'Reset password'}
            </button>
            
            {message && (
              <div className={`msg ${message.includes('❌') ? 'error-msg' : 'success-msg'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
