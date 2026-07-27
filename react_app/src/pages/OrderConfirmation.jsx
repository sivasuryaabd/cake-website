import { Link, useLocation, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId, total } = location.state ?? {};

  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="confirmation-page">
      <div className="container confirmation-card">
        <span className="confirmation-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <circle cx="12" cy="12" r="12" fill="var(--cherry)" />
            <path
              d="M7 12.5 10.5 16 17 9"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1>Order placed</h1>
        <p>
          Thanks for your order — we've started baking. A confirmation has been sent to your
          phone with delivery updates.
        </p>
        <div className="confirmation-details">
          <div>
            <span>Order number</span>
            <strong>{orderId}</strong>
          </div>
          <div>
            <span>Total paid</span>
            <strong>{formatPrice(total ?? 0)}</strong>
          </div>
        </div>
        <Link to="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
