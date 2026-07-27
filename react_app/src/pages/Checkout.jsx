import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import axios from 'axios'

const FREE_DELIVERY_THRESHOLD = 7.0;
const DELIVERY_FEE = 4.0;

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function Checkout() {



  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty right now.</p>
        <Link to="/shop" className="btn btn-primary">
          Browse cakes
        </Link>
      </div>
    );
  }

  function validateShipping() {
    const next = {};
    if (!shipping.fullName.trim()) next.fullName = 'Enter the recipient name';
    if (!/^[0-9+\-\s]{7,}$/.test(shipping.phone)) next.phone = 'Enter a valid phone number';
    if (!shipping.address.trim()) next.address = 'Enter a delivery address';
    if (!shipping.city.trim()) next.city = 'Enter a city';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePayment() {
    const next = {};
    if (payment.method === 'card') {
      if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ''))) {
        next.cardNumber = 'Enter a valid card number';
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) {
        next.expiry = 'Use MM/YY format';
      }
      if (!/^\d{3,4}$/.test(payment.cvc)) {
        next.cvc = 'Enter a valid CVC';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function goNext() {
    console.log(shipping)
    try{
      const response=await axios.post("http://127.0.0.1:8000/api/v1/order/",shipping)
      console.log(response.data)
      if (step === 0 && !validateShipping()) return;
      if (step === 1 && !validatePayment()) return;
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
    catch(err){
      console.log("error",err)
    }
    

  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  function handlePlaceOrder() {
    setIsProcessing(true);
    // MOCK PAYMENT GATEWAY
    // Swap this block for a real call to your payment provider, e.g.:
    //   const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({...}) });
    //   const { orderId } = await res.json();
    setTimeout(() => {
      const orderId = `FB-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      navigate('/order-confirmation', { state: { orderId, total } });
    }, 1400);
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <ol className="checkout-steps" aria-label="Checkout progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={`checkout-step ${index === step ? 'active' : ''} ${
                index < step ? 'done' : ''
              }`}
            >
              <span className="checkout-step-number">{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        <div className="checkout-grid">
          <div className="checkout-form-panel">
            {step === 0 && (
              <ShippingForm shipping={shipping} setShipping={setShipping} errors={errors} />
            )}
            {step === 1 && (
              <PaymentForm payment={payment} setPayment={setPayment} errors={errors} />
            )}
            {step === 2 && <ReviewStep shipping={shipping} payment={payment} items={items} />}

            <div className="checkout-actions">
              {step > 0 && (
                <button type="button" className="btn btn-ghost" onClick={goBack}>
                  Back
                </button>
              )}
              {step < STEPS.length - 1 && (
                <button type="button" className="btn btn-primary" onClick={goNext}>
                  Continue
                </button>
              )}
              {step === STEPS.length - 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Placing order…' : `Place order — ${formatPrice(total)}`}
                </button>
              )}
            </div>
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <ul className="summary-items">
              {items.map((item) => (
                <li key={item.lineId}>
                  <span>
                    {item.quantity} × {item.name}
                    {item.sizeLabel ? ` (${item.sizeLabel})` : ''}
                  </span>
                  <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl>
              <div className="summary-row">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="summary-row">
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
              </div>
              <div className="summary-row summary-total">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ShippingForm({ shipping, setShipping, errors }) {
  function update(field, value) {
    setShipping((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <fieldset className="checkout-fieldset">
      <legend>Delivery details</legend>

      <Field
        label="Recipient name"
        value={shipping.fullName}
        onChange={(v) => update('fullName', v)}
        error={errors.fullName}
        autoComplete="name"
      />
      <Field
        label="Phone number"
        value={shipping.phone}
        onChange={(v) => update('phone', v)}
        error={errors.phone}
        type="tel"
        autoComplete="tel"
      />
      <Field
        label="Delivery address"
        value={shipping.address}
        onChange={(v) => update('address', v)}
        error={errors.address}
        autoComplete="street-address"
      />
      <Field
        label="City"
        value={shipping.city}
        onChange={(v) => update('city', v)}
        error={errors.city}
        autoComplete="address-level2"
      />
      <label className="field">
        <span>Order notes (optional)</span>
        <textarea
          rows={3}
          value={shipping.notes}
          onChange={(event) => update('notes', event.target.value)}
          placeholder="Cake message, allergies, delivery time preference…"
        />
      </label>
    </fieldset>
  );
}

function PaymentForm({ payment, setPayment, errors }) {
  function update(field, value) {
    setPayment((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <fieldset className="checkout-fieldset">
      <legend>Payment</legend>

      <div className="payment-method-row" role="group" aria-label="Payment method">
        {[
          { id: 'card', label: 'Card' },
          { id: 'upi', label: 'UPI' },
          { id: 'cod', label: 'Cash on delivery' },
        ].map((method) => (
          <button
            key={method.id}
            type="button"
            className={`pill ${payment.method === method.id ? 'pill-active' : ''}`}
            onClick={() => update('method', method.id)}
            aria-pressed={payment.method === method.id}
          >
            {method.label}
          </button>
        ))}
      </div>

      {payment.method === 'card' && (
        <>
          <Field
            label="Card number"
            value={payment.cardNumber}
            onChange={(v) => update('cardNumber', v)}
            error={errors.cardNumber}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            autoComplete="cc-number"
          />
          <div className="field-row">
            <Field
              label="Expiry"
              value={payment.expiry}
              onChange={(v) => update('expiry', v)}
              error={errors.expiry}
              placeholder="MM/YY"
              autoComplete="cc-exp"
            />
            <Field
              label="CVC"
              value={payment.cvc}
              onChange={(v) => update('cvc', v)}
              error={errors.cvc}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          <p className="payment-note">
            This is a demo checkout. No real payment is processed and no card data leaves
            your browser.
          </p>
        </>
      )}

      {payment.method === 'upi' && (
        <Field
          label="UPI ID"
          value={payment.upiId ?? ''}
          onChange={(v) => update('upiId', v)}
          placeholder="yourname@bank"
        />
      )}

      {payment.method === 'cod' && (
        <p className="payment-note">
          Pay with cash when your order arrives. Please have the exact amount ready.
        </p>
      )}
    </fieldset>
  );
}

function ReviewStep({ shipping, payment, items }) {
  return (
    <div className="review-step">
      <div className="review-block">
        <h3>Delivering to</h3>
        <p>{shipping.fullName}</p>
        <p>{shipping.address}</p>
        <p>{shipping.city}</p>
        <p>{shipping.phone}</p>
        {shipping.notes && <p className="review-notes">"{shipping.notes}"</p>}
      </div>
      <div className="review-block">
        <h3>Payment method</h3>
        <p>
          {payment.method === 'card' && `Card ending in ${payment.cardNumber.slice(-4) || '••••'}`}
          {payment.method === 'upi' && `UPI — ${payment.upiId || 'not provided'}`}
          {payment.method === 'cod' && 'Cash on delivery'}
        </p>
      </div>
      <div className="review-block">
        <h3>Items ({items.length})</h3>
        <ul className="review-item-list">
          {items.map((item) => (
            <li key={item.lineId}>
              {item.quantity} × {item.name} {item.sizeLabel ? `(${item.sizeLabel})` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
