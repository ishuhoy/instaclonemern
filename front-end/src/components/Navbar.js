import { Link } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Instagram</Link>
      </div>
      <div className="nav-actions">
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
