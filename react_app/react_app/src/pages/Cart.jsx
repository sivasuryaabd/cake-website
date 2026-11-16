import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import {AuthContext} from './AuthProvider.jsx'
import { useContext } from 'react';
import { mediaUrl } from '../utils/api.js';

const FREE_DELIVERY_THRESHOLD = 7.0; // matches ₹599 approx in display currency
const DELIVERY_FEE = 4.0;

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  {console.log(items)}
  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything to the case yet.</p>
        <Link to="/shop" className="btn btn-primary">
          Browse cakes
        </Link>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <div className="container">
        <h1>Your cart</h1>

        <div className="cart-grid">
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.lineId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  {item.sizeLabel && <p className="cart-item-size">{item.sizeLabel}</p>}
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(item.lineId)}
                  >
                    Remove
                  </button>
                </div>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-price">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <dl>
              <div className="summary-row">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="summary-row">
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
              </div>
              {deliveryFee > 0 && (
                <p className="summary-hint">
                  Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
                </p>
              )}
              <div className="summary-row summary-total">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            {isLoggedIn ? (
              <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to checkout
            </Link>
            )
            :(
              <Link to="/account"className="btn btn-primary btn-block">
              You not have an account
              </Link>
            )
          }
            <Link to="/shop" className="continue-shopping">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
