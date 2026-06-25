import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { SEARCH_RESULTS_PAGE, SHOP_PAGE } from '../data/pageContent';

function searchProducts(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q)) ||
    p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
    p.sizes.some((s) => s.toLowerCase().includes(q))
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sort, setSort] = useState('newest');

  useEffect(() => { window.scrollTo(0, 0); }, [query]);

  const results = searchProducts(query);
  const filtered = useFilteredProducts(results, {}, sort);

  return (
    <>
      <PageHeader eyebrow={SEARCH_RESULTS_PAGE.eyebrow} title={`"${query}"`} subtitle={SEARCH_RESULTS_PAGE.resultsCount(filtered.length)} />
      <div className="container cat-page">
        {filtered.length > 0 && (
          <div className="cat-page__toolbar">
            <span className="shop-toolbar__count">{SHOP_PAGE.resultsLabel(filtered.length)}</span>
            <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={SHOP_PAGE.sortAriaLabel}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
        <ProductGrid products={filtered} emptyMessage={SEARCH_RESULTS_PAGE.emptyMessage(query)} />
      </div>
    </>
  );
}
