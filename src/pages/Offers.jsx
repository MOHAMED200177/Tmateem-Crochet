import { useState } from 'react';
import { getOnSale } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';

export default function Offers() {
  const [sort, setSort] = useState('discount');
  const products = getOnSale();
  const filtered = useFilteredProducts(products, {}, sort);

  return (
    <>
      <PageHeader eyebrow="Limited Time" title="Current Offers" subtitle="Thoughtfully discounted pieces, while stocks last" />
      <div className="container cat-page">
        <div className="cat-page__toolbar">
          <span className="shop-toolbar__count">{filtered.length} results</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <ProductGrid products={filtered} emptyMessage="No active offers right now — check back soon" />
      </div>
    </>
  );
}
