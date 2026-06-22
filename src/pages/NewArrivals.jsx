import { useState } from 'react';
import { getNewArrivals } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';

export default function NewArrivals() {
  const [sort, setSort] = useState('newest');
  const products = getNewArrivals();
  const filtered = useFilteredProducts(products, {}, sort);

  return (
    <>
      <PageHeader eyebrow="Just Landed" title="New Arrivals" subtitle="The latest pieces from our hook, fresh off the needle" />
      <div className="container cat-page">
        <div className="cat-page__toolbar">
          <span className="shop-toolbar__count">{filtered.length} results</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <ProductGrid products={filtered} emptyMessage="No new arrivals at the moment — check back soon" />
      </div>
    </>
  );
}
