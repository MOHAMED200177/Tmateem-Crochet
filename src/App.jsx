import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import NewArrivals from './pages/NewArrivals';
import BestSellers from './pages/BestSellers';
import Offers from './pages/Offers';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import './styles/globals.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/best-sellers" element={<BestSellers />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>
          <CartProvider>
            <SearchProvider>
              <div className="grain-overlay" aria-hidden="true" />
              <ScrollToTop />
              <Layout>
                <AppRoutes />
              </Layout>
            </SearchProvider>
          </CartProvider>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
