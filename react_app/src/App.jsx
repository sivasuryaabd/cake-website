import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';
import AuthProvider from './pages/AuthProvider.jsx';
import Userdetails from './pages/Userdetails.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider>
          <CartProvider>
            <ScrollToTop />
            <div className="app-shell">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/profile" element={<Userdetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ToastProvider>
      </Router>
      </AuthProvider>
  );
}

function NotFound() {
  return (
    <div className="container empty-state">
      <h1>Page not found</h1>
      <p>That page doesn't exist — check the address or head back to the shop.</p>
    </div>
  );
}
