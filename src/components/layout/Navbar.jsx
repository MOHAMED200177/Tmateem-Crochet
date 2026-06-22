import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useSearch } from '../../context/SearchContext';
import SearchModal from '../common/SearchModal';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/',            label: 'Home'        },
  { to: '/shop',        label: 'Shop'        },
  { to: '/categories',  label: 'Categories'  },
  { to: '/new-arrivals',label: 'New Arrivals'},
  { to: '/best-sellers',label: 'Best Sellers'},
  { to: '/offers',      label: 'Offers'      },
  { to: '/about',       label: 'About'       },
  { to: '/contact',     label: 'Contact'     },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { totalItems } = useCart();
  const { count: favCount } = useFavorites();
  const { openSearch } = useSearch();
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement Banner */}
      {!bannerDismissed && (
        <div className="nav-banner">
          <p className="t-label">✦ Free shipping on orders over $150 · Handcrafted with intention ✦</p>
          <button className="nav-banner__close" onClick={() => setBannerDismissed(true)} aria-label="Dismiss banner">×</button>
        </div>
      )}

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner container">

          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Tmateem Crochet — Home">
            <span className="navbar__logo-mark">🧶</span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">Tmateem</span>
              <span className="navbar__logo-sub">CROCHET</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <button className="navbar__icon-btn" onClick={openSearch} aria-label="Search">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <Link to="/favorites" className="navbar__icon-btn navbar__badge-wrap" aria-label={`Favorites (${favCount})`}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favCount > 0 && <span className="navbar__badge">{favCount}</span>}
            </Link>

            <Link to="/cart" className="navbar__icon-btn navbar__badge-wrap" aria-label={`Cart (${totalItems})`}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && <span className="navbar__badge">{totalItems}</span>}
            </Link>

            {/* Mobile hamburger */}
            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`} ref={menuRef} aria-hidden={!menuOpen}>
          <nav className="navbar__mobile-nav">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <div className="navbar__mobile-actions">
              <Link to="/favorites" className="navbar__mobile-action-btn">
                ♡ Favorites {favCount > 0 && `(${favCount})`}
              </Link>
              <Link to="/cart" className="navbar__mobile-action-btn">
                ✦ Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <SearchModal />
    </>
  );
}
