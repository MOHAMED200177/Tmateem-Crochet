import { useState } from 'react';
import { CATEGORIES, getMinMaxPrice, getAllColors, getAllSizes } from '../../data/products';
import { FILTER_LABELS } from '../../data/filters';
import './FilterPanel.css';

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
  const allColors = getAllColors();
  const allSizes = getAllSizes();
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
        <h3 className="t-label">{FILTER_LABELS.filtersHeading} {activeCount > 0 && `(${activeCount})`}</h3>
        <button onClick={onClose} aria-label={FILTER_LABELS.closeFiltersAria}>×</button>
      </div>

      <div className="filter-panel__scroll">
        {/* Sort - mobile only shows here too but main sort lives in toolbar */}
        <div className="filter-section">
          <h4 className="filter-section__title t-label">{FILTER_LABELS.category}</h4>
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
          <h4 className="filter-section__title t-label">{FILTER_LABELS.priceRange}</h4>
          <div className="filter-price">
            <div className="filter-price__inputs">
              <input
                type="number"
                value={localPrice[0]}
                onChange={(e) => setLocalPrice([Number(e.target.value), localPrice[1]])}
                onBlur={applyPrice}
                aria-label={FILTER_LABELS.minPriceAria}
              />
              <span>—</span>
              <input
                type="number"
                value={localPrice[1]}
                onChange={(e) => setLocalPrice([localPrice[0], Number(e.target.value)])}
                onBlur={applyPrice}
                aria-label={FILTER_LABELS.maxPriceAria}
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
          <h4 className="filter-section__title t-label">{FILTER_LABELS.color}</h4>
          <div className="filter-colors">
            {allColors.map((c) => (
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
          <h4 className="filter-section__title t-label">{FILTER_LABELS.size}</h4>
          <div className="filter-sizes">
            {allSizes.map((s) => (
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
          <h4 className="filter-section__title t-label">{FILTER_LABELS.quickFilters}</h4>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.onSale} onChange={() => setFilters((p) => ({ ...p, onSale: !p.onSale }))} />
            <span>{FILTER_LABELS.onSale}</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.inStock} onChange={() => setFilters((p) => ({ ...p, inStock: !p.inStock }))} />
            <span>{FILTER_LABELS.inStockOnly}</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.newArrival} onChange={() => setFilters((p) => ({ ...p, newArrival: !p.newArrival }))} />
            <span>{FILTER_LABELS.newArrivals}</span>
          </label>
          <label className="filter-check">
            <input type="checkbox" checked={!!filters.bestSeller} onChange={() => setFilters((p) => ({ ...p, bestSeller: !p.bestSeller }))} />
            <span>{FILTER_LABELS.bestSellers}</span>
          </label>
        </div>

        {activeCount > 0 && (
          <button className="filter-clear-all" onClick={clearAll}>{FILTER_LABELS.clearAll}</button>
        )}
      </div>

      <div className="filter-panel__mobile-footer">
        <button className="filter-apply-btn" onClick={onClose}>{FILTER_LABELS.showResults.replace('{count}', resultCount)}</button>
      </div>
    </aside>
  );
}
