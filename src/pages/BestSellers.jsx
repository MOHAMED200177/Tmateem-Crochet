import { useState } from 'react';
import { getBestSellers } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';

export default function BestSellers() {
  const [sort, setSort] = useState('bestseller');
  const products = getBestSellers();
  const filtered = useFilteredProducts(products, {}, sort);

  return (
    <>
      <PageHeader eyebrow="Customer Favorites" title="Best Sellers" subtitle="The pieces our community returns to again and again" />
      <div className="container cat-page">
        <div className="cat-page__toolbar">
          <span className="shop-toolbar__count">{filtered.length} results</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <ProductGrid products={filtered} emptyMessage="No best sellers yet" />
      </div>
    </>
  );
}
