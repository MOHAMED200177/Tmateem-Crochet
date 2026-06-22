import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'tmateem_cart';

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD': {
      return { ...state, items: action.payload };
    }
    case 'ADD': {
      const { product, size, color, quantity = 1 } = action.payload;
      const key = `${product.id}-${size}-${color.name}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { key, product, size, color, quantity }],
      };
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter((i) => i.key !== action.payload) };
    }
    case 'UPDATE_QTY': {
      const { key, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== key) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
      };
    }
    case 'CLEAR': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, size, color, quantity = 1) =>
    dispatch({ type: 'ADD', payload: { product, size, color, quantity } });

  const removeFromCart = (key) =>
    dispatch({ type: 'REMOVE', payload: key });

  const updateQuantity = (key, quantity) =>
    dispatch({ type: 'UPDATE_QTY', payload: { key, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
