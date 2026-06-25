import { useState } from 'react';
import { getOnSale } from '../data/products';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { SORT_OPTIONS } from '../components/shop/FilterPanel';
import { OFFERS_PAGE, SHOP_PAGE } from '../data/pageContent';

export default function Offers() {
  const [sort, setSort] = useState('discount');
  const products = getOnSale();
  const filtered = useFilteredProducts(products, {}, sort);

  return (
    <>
      <PageHeader eyebrow={OFFERS_PAGE.eyebrow} title={OFFERS_PAGE.title} subtitle={OFFERS_PAGE.subtitle} />
      <div className="container cat-page">
        <div className="cat-page__toolbar">
          <span className="shop-toolbar__count">{SHOP_PAGE.resultsLabel(filtered.length)}</span>
          <select className="shop-toolbar__sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={SHOP_PAGE.sortAriaLabel}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <ProductGrid products={filtered} emptyMessage={OFFERS_PAGE.emptyMessage} />
      </div>
    </>
  );
}
