import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function UserDetails() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/account');
      return;
    }
    fetchUser();
  }, [isLoggedIn]);

  async function fetchUser() {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('https://cake-website-backend.onrender.com/api/v1/user/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/account');
        showToast('Session expired. Please log in again.');
      } else {
        setError('Could not load your profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    showToast('Logged out successfully.');
    navigate('/');
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.slice(0, 2).toUpperCase();
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <section className="account-page">
        <div className="container">
          <p className="state-message">Loading your profile…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="account-page">
        <div className="container empty-state">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchUser}>
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="account-page">
      <div className="container">
        <div className="profile-card">

          <div className="profile-avatar">
            {getInitials(user?.username)}
          </div>

          <h1 className="profile-name">{user?.username}</h1>
          <p className="profile-since">Member since {formatDate(user?.date_joined)}</p>

          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">Username</span>
              <span className="profile-value">{user?.username}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">
                {user?.email || <em style={{ color: 'var(--milk)' }}>Not provided</em>}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Joined</span>
              <span className="profile-value">{formatDate(user?.date_joined)}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-outline" onClick={() => navigate('/shop')}>
              Browse cakes
            </button>
            <button className="btn btn-primary" onClick={handleLogout}>
              Log out
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}