import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';

const SearchContext = createContext(null);
const HISTORY_KEY = 'tmateem_search_history';
const MAX_HISTORY = 8;

function searchProducts(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
      p.sizes.some((s) => s.toLowerCase().includes(q)) ||
      String(p.price).includes(q)
    );
  });
}

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const debounceRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveHistory = useCallback((term) => {
    setHistory((prev) => {
      const next = [term, ...prev.filter((h) => h !== term)].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setResults(searchProducts(value));
      setIsSearching(false);
    }, 280);
  }, []);

  const commitSearch = useCallback((value) => {
    if (value.trim()) {
      saveHistory(value.trim());
    }
  }, [saveHistory]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    clearSearch();
  }, [clearSearch]);

  return (
    <SearchContext.Provider value={{
      query, results, isSearching, isOpen,
      history, handleSearch, commitSearch,
      clearSearch, clearHistory, openSearch, closeSearch,
      totalResults: results.length,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
