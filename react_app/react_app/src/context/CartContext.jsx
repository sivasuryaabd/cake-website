import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'frosty-bites-cart-v1';

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, size } = action.payload;
      const lineId = `${product.id}::${size?.id ?? 'default'}`;
      const existing = state.items.find((item) => item.lineId === lineId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.lineId === lineId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            lineId,
            productId: product.id,
            name: product.name,
            image: product.image,
            unitPrice: size ? size.price : product.price,
            sizeLabel: size?.label ?? null,
            quantity,
          },
        ],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.lineId !== action.payload.lineId),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { lineId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.lineId !== lineId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.lineId === lineId ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (product, options = {}) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, ...options } });

  const removeItem = (lineId) => dispatch({ type: 'REMOVE_ITEM', payload: { lineId } });

  const updateQuantity = (lineId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { lineId, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
