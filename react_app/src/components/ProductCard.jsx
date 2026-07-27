import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import { mediaUrl } from '../utils/api';


export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleAdd(event) {
    event.preventDefault();
    addItem(product, { quantity: 1 });
    showToast(`Added ${product.name} to cart`);
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.tags?.includes('bestseller') && (
          <span className="product-tag">Bestseller</span>
        )}
        {product.stock <= 5 && (
          <span className="product-tag product-tag-low">Only {product.stock} left</span>
        )}
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="product-tagline">{product.tagline}</p>
        <div className="product-rating">
          <StarIcon />
          <span>{product.rating}</span>
          <span className="product-review-count">({product.reviewCount})</span>
        </div>
        <div className="product-card-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button type="button" className="btn btn-add" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 17.27 5.18 3.13c.5.3 1.12-.14.99-.7l-1.37-5.93 4.59-4a.78.78 0 0 0-.45-1.37l-6.06-.52-2.36-5.6a.78.78 0 0 0-1.44 0L9.12 7.78l-6.06.52a.78.78 0 0 0-.45 1.37l4.59 4-1.37 5.93c-.13.56.49 1 .99.7Z"
      />
    </svg>
  );
}
