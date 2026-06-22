import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';
import './Categories.css';

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'all';
  const [sort, setSort] = useState('newest');

  useEffect(() => { window.scrollTo(0, 0); }, [activeCat]);

  const filters = activeCat === 'all' ? {} : { categories: [activeCat] };
  const filtered = useFilteredProducts(PRODUCTS, filters, sort);

  return (
    <>
      <PageHeader eyebrow="Browse" title="Categories" subtitle="Find pieces by craft and silhouette" />

      <div className="container cat-page">
        <div className="cat-tabs">
          <button className={`cat-tab ${activeCat === 'all' ? 'cat-tab--active' : ''}`} onClick={() => setSearchParams({})}>
            All ({PRODUCTS.length})
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = PRODUCTS.filter((p) => p.category === key).length;
            return (
              <button key={key} className={`cat-tab ${activeCat === key ? 'cat-tab--active' : ''}`} onClick={() => setSearchParams({ cat: key })}>
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="cat-page__toolbar">
          <span className="shop-toolbar__count">{filtered.length} results</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <ProductGrid products={filtered} emptyMessage="No pieces in this category yet" />
      </div>
    </>
  );
}
