import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // ✅ FIXED: Track success
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage('✅ Reset email sent! Check your inbox (including spam folder).');
        setIsSuccess(true);
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong'}`);
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('❌ Network error. Make sure backend is running.');
      setIsSuccess(false);
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
              <img 
                src="https://images.unsplash.com/photo-1559526325-68b6d5e16e30?w=300&h=500&fit=crop" 
                alt="Reset password" 
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
            <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Trouble logging in?</h2>
            <p style={{ color: '#8e8e8e', marginBottom: '32px', fontSize: '16px', lineHeight: '22px' }}>
              Enter your email, phone, or username and we'll send you a link to get back into your account.
            </p>
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '🔄 Sending...' : 'Send login link'}
            </button>
            
            {message && (
              <div className={`msg ${isSuccess ? 'success-msg' : 'error-msg'}`}>
                {message}
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link to="/login" className="link" style={{ fontSize: '16px' }}>
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
