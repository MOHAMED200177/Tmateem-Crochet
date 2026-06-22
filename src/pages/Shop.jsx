import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import FilterPanel, { SORT_OPTIONS } from '../components/shop/FilterPanel';
import PageHeader from '../components/common/PageHeader';
import './Shop.css';

export default function Shop() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useFilteredProducts(PRODUCTS, filters, sort);

  return (
    <>
      <PageHeader
        eyebrow="The Full Collection"
        title="Shop All Pieces"
        subtitle={`${PRODUCTS.length} handcrafted pieces, each one slightly unique`}
      />

      <div className="container shop-layout">
        <div className="shop-layout__sidebar">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
            resultCount={filtered.length}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />
        </div>

        <div className="shop-layout__main">
          <div className="shop-toolbar">
            <button className="shop-toolbar__filter-btn" onClick={() => setFilterOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filters
            </button>
            <span className="shop-toolbar__count">{filtered.length} results</span>
            <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <ProductGrid products={filtered} emptyMessage="No pieces match your filters — try adjusting them" />
        </div>
      </div>

      {filterOpen && <div className="shop-overlay" onClick={() => setFilterOpen(false)} />}
    </>
  );
}
