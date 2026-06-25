import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';
import { CATEGORIES_PAGE, SHOP_PAGE } from '../data/pageContent';
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
      <PageHeader eyebrow={CATEGORIES_PAGE.eyebrow} title={CATEGORIES_PAGE.title} subtitle={CATEGORIES_PAGE.subtitle} />

      <div className="container cat-page">
        <div className="cat-tabs">
          <button className={`cat-tab ${activeCat === 'all' ? 'cat-tab--active' : ''}`} onClick={() => setSearchParams({})}>
            {CATEGORIES_PAGE.allLabel(PRODUCTS.length)}
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
          <span className="shop-toolbar__count">{SHOP_PAGE.resultsLabel(filtered.length)}</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={SHOP_PAGE.sortAriaLabel}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <ProductGrid products={filtered} emptyMessage={CATEGORIES_PAGE.emptyMessage} />
      </div>
    </>
  );
}
