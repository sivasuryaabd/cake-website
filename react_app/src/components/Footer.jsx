import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3>Surya's Cake</h3>
          <p>Freshly baked happiness, since 1956.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/account">Account</Link>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} Surya's Cake. All rights reserved.</p>
      </div>
    </footer>
  );
}
