import { useScrollReveal } from '../../hooks/useScrollReveal';
import { PRODUCT_GRID_LABELS } from '../../data/productCardLabels';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, emptyMessage = PRODUCT_GRID_LABELS.emptyDefault }) {
  const gridRef = useScrollReveal();

  if (products.length === 0) {
    return (
      <div className="p-grid-empty">
        <span className="p-grid-empty__icon">◌</span>
        <p className="t-serif">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-grid" ref={gridRef}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="p-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-card-skeleton">
          <div className="skeleton" style={{ aspectRatio: '3/4', borderRadius: 'var(--radius-lg)' }} />
          <div className="skeleton" style={{ height: 12, width: '40%', marginTop: 12 }} />
          <div className="skeleton" style={{ height: 16, width: '75%', marginTop: 8 }} />
          <div className="skeleton" style={{ height: 14, width: '30%', marginTop: 10 }} />
        </div>
      ))}
    </div>
  );
}
