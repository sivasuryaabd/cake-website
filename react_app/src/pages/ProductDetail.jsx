import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchproductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import { mediaUrl } from '../utils/api';
import {AuthContext} from './AuthProvider.jsx'
import { useContext } from 'react';

const SIZES = [
  { id: 'half', label: 'Half kg', multiplier: 1 },
  { id: 'one', label: '1 kg', multiplier: 1.8 },
  { id: 'two', label: '2 kg', multiplier: 3.2 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [sizeId, setSizeId] = useState('half');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    fetchproductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setStatus('ready');
        }
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="container">
        <p className="state-message">Loading this cake…</p>
      </div>
    );
  }

  if (status === 'error' || !product) {
    return (
      <div className="container empty-state">
        <h3>We couldn't find that cake</h3>
        <p>It may have been removed from the menu.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const activeSize = SIZES.find((s) => s.id === sizeId);
  const sizedPrice = Math.round(product.price * activeSize.multiplier * 100) / 100;

  function handleAddToCart() {
    addItem(product, {
      quantity,
      size: { id: activeSize.id, label: activeSize.label, price: sizedPrice },
    });
    showToast(`Added ${quantity} × ${product.name} (${activeSize.label}) to cart`);
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate('/checkout');
  }

  return (
    <section className="product-detail">
      <div className="container product-detail-grid">
        <div className="product-detail-media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <Link to="/shop" className="back-link">
            ← Back to shop
          </Link>
          <h1>{product.name}</h1>
          <p className="product-tagline">{product.tagline}</p>

          <div className="product-rating">
            <span aria-hidden="true">★</span>
            <span>{product.rating}</span>
            <span className="product-review-count">({product.reviewCount} reviews)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <fieldset className="size-selector">
            <legend>Size</legend>
            <div className="pill-row">
              {SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  className={`pill ${sizeId === size.id ? 'pill-active' : ''}`}
                  onClick={() => setSizeId(size.id)}
                  aria-pressed={sizeId === size.id}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="quantity-row">
            <span className="quantity-label">Quantity</span>
            <div className="quantity-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-detail-price">
            <span className="price-current">{formatPrice(sizedPrice * quantity)}</span>
            {product.stock <= 5 && (
              <span className="stock-warning">Only {product.stock} left in stock</span>
            )}
          </div>

          <div className="product-detail-actions">
            <button type="button" className="btn btn-outline" onClick={handleAddToCart}>
              Add to cart
            </button>
            { isLoggedIn ? (
              <button type="button" className="btn btn-primary" onClick={handleBuyNow}>
              Buy now
            </button>
            ):(
              <Link to="/account"className="btn btn-primary btn-block">
              You not have an account
              </Link>
            )}

            
          </div>

          <ul className="product-meta-list">
            <li>Baked fresh to order, 24–48 hours notice recommended</li>
            <li>Free delivery on orders above ₹599</li>
            <li>Customizable message on request at checkout</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
