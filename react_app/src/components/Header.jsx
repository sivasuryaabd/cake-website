import { useState,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../pages/AuthProvider.jsx';
import Userdetails from '../pages/Userdetails.jsx';
import { useTheme } from '../utils/useTheme';

// const LOCATIONS = ['Madurai', 'Chennai', 'Ramnad'];


export default function Header() {
  // const [location, setLocation] = useState(LOCATIONS[0]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const {isLoggedIn}=useContext(AuthContext)
  const { theme, toggleTheme } = useTheme();

  

// Inside Header component:


// Add this button in header-actions div:


  function handleSearch(event) {
    event.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
    navigate(`/shop${params}`);
  }
  // const logoutfun=(e)=>{
  //   localStorage.removeItem('accessToken')
  //   localStorage.removeItem('refreshToken')
  //   setIsLoggedIn(false)
  //   navigate('/account')

  // }
  // console.log(theme)
  // const changetheme =()=>{
  //   setTheme(true)
  //   console.log(theme)
  // }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <CakeMark />
          </span>
          <span className="brand-name">Surya's Cake</span>
        </Link>

        <form className="header-search" role="search" onSubmit={handleSearch}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M10 18a8 8 0 1 1 5.66-13.66A8 8 0 0 1 10 18Zm11 3-5.6-5.6a9.98 9.98 0 1 0-1.41 1.41L19.59 22 21 20.59Z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for cakes, cookies, and more..."
            aria-label="Search products"
          />
        </form>

        <div className="header-actions">
          <button
            className="icon-link"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? (
              // Moon icon
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            ) : (
              // Sun icon
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z"/>
              </svg>
            )}
          </button>
          {/* <label className="location-select">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
              />
            </svg>
            {/* <span className="visually-hidden">Delivery location</span> */}
            {/* <select value={location} onChange={(event) => setLocation(event.target.value)}>
              {LOCATIONS.map((city) => (
                <option key={city} value={city}>
                  Deliver to {city}
                </option>
              ))}
            </select>
          </label> */}
          {/* {console.log(isLoggedIn)} */}
          {isLoggedIn?( 
          <Link to="/profile" aria-label="Userdetails">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
              />
            </svg>
          </Link>
          ):(
          <Link to="/account" className="icon-link" aria-label="Account">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
              />
            </svg>
          </Link>
          )}
          <Link to="/cart" className="icon-link cart-link" aria-label={`Cart, ${itemCount} items`}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7 4h-2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 11 19h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.79-1.11l3.24-6.49A1 1 0 0 0 22.7 6H6.21l-.94-2ZM7 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
              />
            </svg>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          {/* <select name="" id="">
            <option value="white">white</option>
            <option value="dark" onClick={changetheme}>dark</option>
          </select> */}
        </div>
      </div>
    </header>
  );
}

function CakeMark() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36">
      <ellipse cx="24" cy="38" rx="18" ry="5" fill="#A8412C" />
      <rect x="8" y="24" width="32" height="12" rx="4" fill="#C8553D" />
      <path
        d="M8 26c4-3 8 3 12 0s8 3 12 0 8 3 8 3v-3a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4Z"
        fill="#F7F2EA"
      />
      <rect x="22" y="8" width="4" height="10" rx="2" fill="#E8A33D" />
      <circle cx="24" cy="6" r="3" fill="#E8A33D" />
    </svg>
  );
}
