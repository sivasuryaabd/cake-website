import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchproducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import FrostingDivider from '../components/FrostingDivider';
import { API_URL,mediaUrl } from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    fetchproducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setStatus('ready');
        }
      })
      .catch((err) => {active && setStatus('error')
        console.log('error',err)})
    return () => {
      active = false;
    };
  }, []);

  const featured = products.filter((p) => p.tags?.includes('bestseller')).slice(0, 4);
  // const shelf = 

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Free delivery on orders above ₹599</p>
            <h1>
              Freshly baked,
              <br />
              <span className="hero-accent">straight to your door.</span>
            </h1>
            <p className="hero-sub">
              Cakes, cookies, and breads made the slow way, by hand, every morning.
              Order today, get today.
            </p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-primary">
                Order online
              </Link>
              <Link to="/shop" className="btn btn-ghost">
                View menu
              </Link>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>100M+</dt>
                <dd>Customers</dd>
              </div>
              <div>
                <dt>200+</dt>
                <dd>Varieties</dd>
              </div>
              <div>
                <dt>70+</dt>
                <dd>Years</dd>
              </div>
            </dl>
          </div>

          <div className="bakery-case" aria-label="Featured cakes display case">
            <div className="bakery-case-shelf">
              {status === 'ready' && products.slice(0, 8).map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="case-item">
                  
                  <img src={product.image} alt={product.name} loading="lazy" />
                </Link>
              ))}
              {status === 'loading' && (
                <p style={{color:'var(--milk)',padding:'20px'}}>Loading...</p>
              )}
            </div>
            <div className="bakery-case-glass" aria-hidden="true" />
          </div>
        </div>
      </section>

      <FrostingDivider />

      <section className="trust-strip">
        <div className="container trust-grid">
          <TrustItem icon="truck" title="Free delivery" subtitle="On orders above ₹599" />
          <TrustItem icon="clock" title="Same-day delivery" subtitle="Order today, get today" />
          <TrustItem icon="check" title="100% quality" subtitle="Premium ingredients" />
          <TrustItem icon="heart" title="Made with love" subtitle="Baking since 1956" />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <header className="section-header">
            <p className="section-eyebrow">Crowd favorites</p>
            <h2>What everyone's ordering</h2>
          </header>

          {status === 'loading' && <p className="state-message">Loading the case…</p>}
          {status === 'error' && (
            <p className="state-message">
              Couldn't load cakes right now. Please refresh the page.
            </p>
          )}
          {status === 'ready' && (
            <div className="product-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/shop" className="btn btn-outline">
              See the full menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustItem({ icon, title, subtitle }) {
  return (
    <div className="trust-item">
      <span className="trust-icon" aria-hidden="true">
        <TrustIcon name={icon} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function TrustIcon({ name }) {
  const paths = {
    truck:
      'M3 6h11v8h1.5l1.34-3.34A2 2 0 0 1 18.7 9.5H20a1 1 0 0 1 1 1V14h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V6Zm4 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    clock:
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.41l4 2.33-.75 1.3L11 13V7h2Z',
    check:
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.4-4-4L8.2 11l2.6 2.6 5-5L17.2 10l-6.4 6.4Z',
    heart:
      'M12 21s-7.5-4.6-10-9.3C.6 8.4 2 4.7 5.6 4a4.7 4.7 0 0 1 4.3 1.7l2.1 2.5 2.1-2.5A4.7 4.7 0 0 1 18.4 4C22 4.7 23.4 8.4 22 11.7 19.5 16.4 12 21 12 21Z',
  };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}
