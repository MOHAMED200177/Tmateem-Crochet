import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import { getDiscount, formatPrice } from '../../utils/helpers';
import './SearchModal.css';

export default function SearchModal() {
  const {
    query, results, isSearching, isOpen,
    history, handleSearch, commitSearch,
    clearSearch, clearHistory, closeSearch,
  } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeSearch]);

  const goToProduct = (id, term) => {
    commitSearch(term || query);
    closeSearch();
    navigate(`/product/${id}`);
  };

  const goToFullResults = (term) => {
    if (!term.trim()) return;
    commitSearch(term);
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={closeSearch}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search products">
        <div className="search-modal__bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToFullResults(query)}
            placeholder="Search dresses, linen, terracotta, sizes..."
            className="search-modal__input"
            aria-label="Search products"
          />
          {query && (
            <button className="search-modal__clear" onClick={clearSearch} aria-label="Clear search">×</button>
          )}
          <button className="search-modal__close" onClick={closeSearch} aria-label="Close search">Esc</button>
        </div>

        <div className="search-modal__body">
          {!query && history.length > 0 && (
            <div className="search-modal__section">
              <div className="search-modal__section-head">
                <span className="t-label">Recent Searches</span>
                <button className="search-modal__clear-history" onClick={clearHistory}>Clear</button>
              </div>
              <div className="search-modal__chips">
                {history.map((h) => (
                  <button key={h} className="search-modal__chip" onClick={() => { handleSearch(h); }}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!query && history.length === 0 && (
            <div className="search-modal__empty">
              <p className="t-serif">Search by name, color, fabric, size or category...</p>
            </div>
          )}

          {query && isSearching && (
            <div className="search-modal__loading">
              {[1,2,3].map(i => (
                <div key={i} className="search-result-skeleton">
                  <div className="skeleton" style={{ width: 56, height: 56, borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ width: '60%', height: 12, marginBottom: 8 }} />
                    <div className="skeleton" style={{ width: '40%', height: 10 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {query && !isSearching && results.length === 0 && (
            <div className="search-modal__empty">
              <span style={{ fontSize: '2rem' }}>◌</span>
              <p className="t-serif">No pieces found for "{query}"</p>
              <p className="search-modal__empty-hint">Try searching for "linen", "dress" or a color</p>
            </div>
          )}

          {query && !isSearching && results.length > 0 && (
            <div className="search-modal__section">
              <div className="search-modal__section-head">
                <span className="t-label">{results.length} Result{results.length !== 1 ? 's' : ''}</span>
                <button className="search-modal__view-all" onClick={() => goToFullResults(query)}>View all →</button>
              </div>
              <div className="search-modal__results">
                {results.slice(0, 6).map((p) => {
                  const discount = getDiscount(p.price, p.oldPrice);
                  return (
                    <button key={p.id} className="search-result" onClick={() => goToProduct(p.id)}>
                      <img src={p.images[0]} alt={p.name} className="search-result__img" loading="lazy" />
                      <div className="search-result__info">
                        <span className="search-result__name">{p.name}</span>
                        <span className="search-result__meta">{p.category} · {p.colors.length} colors</span>
                      </div>
                      <div className="search-result__price">
                        <span>{formatPrice(p.price)}</span>
                        {discount > 0 && <span className="search-result__discount">-{discount}%</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
