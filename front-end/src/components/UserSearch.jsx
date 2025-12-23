// src/components/UserSearch.jsx
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserSearch = () => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/search/users?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-modal">
      <form onSubmit={handleSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search users"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching…</p>}
      {!loading && results.length === 0 && q && <p>No users found</p>}

      <ul>
        {results.map((u) => (
          <li key={u._id}>
            <img src={u.profilePic} alt={u.name} />
            <span>{u.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
