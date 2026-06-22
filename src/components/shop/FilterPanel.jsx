import { useState } from 'react';
import { CATEGORIES, getMinMaxPrice } from '../../data/products';
import './FilterPanel.css';

const ALL_COLORS = [
  { name: 'Terracotta', hex: '#C4622D' }, { name: 'Indigo', hex: '#2C3E6B' },
  { name: 'Ecru', hex: '#E8DCC8' }, { name: 'Sage', hex: '#9EB5A0' },
  { name: 'Charcoal', hex: '#3A3A3A' }, { name: 'Rust', hex: '#A0472A' },
  { name: 'Camel', hex: '#C49A6C' }, { name: 'Ivory', hex: '#F2EDD8' },
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'bestseller', label: 'Best Sellers' },
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'az', label: 'Name: A → Z' },
  { value: 'za', label: 'Name: Z → A' },
];

export default function FilterPanel({ filters, setFilters, sort, setSort, resultCount, isOpen, onClose }) {
  const { min, max } = getMinMaxPrice();
  const [localPrice, setLocalPrice] = useState([filters.minPrice ?? min, filters.maxPrice ?? max]);

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const applyPrice = () => {
    setFilters((prev) => ({ ...prev, minPrice: localPrice[0], maxPrice: localPrice[1] }));
  };

  const clearAll = () => {
    setFilters({});
    setLocalPrice([min, max]);
  };

  const activeCount =
    (filters.categories?.length || 0) +
    (filters.colors?.length || 0) +
    (filters.sizes?.length || 0) +
    (filters.onSale ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.newArrival ? 1 : 0) +
    (filters.bestSeller ? 1 : 0) +
    (filters.minPrice !== undefined || filters.maxPrice !== undefined ? 1 : 0);

  return (
    <aside className={`filter-panel ${isOpen ? 'filter-panel--open' : ''}`}>
      <div className="filter-panel__mobile-head">
        <h3 className="t-label">Filters {activeCount > 0 && `(${activeCount})`}</h3>
        <button onClick={onClose} aria-label="Close filters">×</button>
      </div>

      <div className="filter-panel__scroll">
        {/* Sort - mobile only shows here too but main sort lives in toolbar */}
        <div className="filter-section">
          <h4 className="filter-section__title t-label">Category</h4>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <label key={key} className="filter-check">
              <input
                type="checkbox"
                checked={filters.categories?.includes(key) || false}
                onChange={() => toggleArrayFilter('categories', key)}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4 className="filter-section__title t-label">Price Range</h4>
          <div className="filter-price">
            <div className="filter-price__inputs">
              <input
                type="number"
                value={localPrice[0]}
                onChange={(e) => setLocalPrice([Number(e.target.value), localPrice[1]])}
                onBlur={applyPrice}
                aria-label="Minimum price"
              />
              <span>—</span>
              <input
                type="number"
                value={localPrice[1]}
                onChange={(e) => setLocalPrice([localPrice[0], Number(e.target.value)])}
                onBlur={applyPrice}
                aria-label="Maximum price"
              />
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={localPrice[1]}
              onChange={(e) => setLocalPrice([localPrice[0], Number(e.target.value)])}
              onMouseUp={applyPrice}
              onTouchEnd={applyPrice}
              className="filter-price__slider"
            />
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-section__title t-label">Color</h4>
          <div className="filter-colors">
            {ALL_COLORS.map((c) => (
              <button
                key={c.name}
                className={`filter-swatch ${filters.colors?.includes(c.name) ? 'filter-swatch--active' : ''}`}
                style={{ background: c.hex }}
                onClick={() => toggleArrayFilter('colors', c.name)}
                title={c.name}
                aria-label={c.name}
                aria-pressed={filters.colors?.includes(c.name) || false}
              />
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-section__title t-label">Size</h4>
          <div className="filter-sizes">
            {ALL_SIZES.map((s) => (
              <button
                key={s}
                className={`filter-size-chip ${filters.sizes?.includes(s) ? 'filter-size-chip--active' : ''}`}
                onClick={() => toggleArrayFilter('sizes', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-section__title t-label">Quick Filters</h4>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.onSale} onChange={() => setFilters((p) => ({ ...p, onSale: !p.onSale }))} />
            <span>On Sale</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.inStock} onChange={() => setFilters((p) => ({ ...p, inStock: !p.inStock }))} />
            <span>In Stock Only</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.newArrival} onChange={() => setFilters((p) => ({ ...p, newArrival: !p.newArrival }))} />
            <span>New Arrivals</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.bestSeller} onChange={() => setFilters((p) => ({ ...p, bestSeller: !p.bestSeller }))} />
            <span>Best Sellers</span>
          </label>
        </div>

        {activeCount > 0 && (
          <button className="filter-clear-all" onClick={clearAll}>Clear all filters</button>
        )}
      </div>

      <div className="filter-panel__mobile-footer">
        <button className="filter-apply-btn" onClick={onClose}>Show {resultCount} results</button>
      </div>
    </aside>
  );
}
