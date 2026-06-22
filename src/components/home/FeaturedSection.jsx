import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import ProductGrid from '../product/ProductGrid';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedSection.css';

export default function FeaturedSection() {
  const ref = useScrollReveal();
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section className="featured-section" ref={ref}>
      <div className="container">
        <div className="featured-section__head reveal">
          <div>
            <p className="t-label section-head__eyebrow">Curated Selection</p>
            <h2 className="section-head__title t-display">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="featured-section__viewall">View All →</Link>
        </div>

        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
