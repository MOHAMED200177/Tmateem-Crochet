import { Link } from 'react-router-dom';
import { CATEGORIES, getProductsByCategory } from '../../data/products';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './CategoryShowcase.css';

export default function CategoryShowcase() {
  const ref = useScrollReveal();

  return (
    <section className="cat-showcase" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="t-label section-head__eyebrow">Browse by Craft</p>
          <h2 className="section-head__title t-display">Shop the Collection</h2>
          <div className="divider-organic" />
        </div>

        <div className="cat-grid">
          {Object.entries(CATEGORIES).map(([key, cat], i) => {
            const sample = getProductsByCategory(key)[0];
            const img = sample ? sample.images[0] : '/images/products/placeholder.svg';
            return (
              <Link
                to={`/categories?cat=${key}`}
                key={key}
                className={`cat-card reveal reveal-delay-${(i % 5) + 1} ${i === 0 ? 'cat-card--large' : ''}`}
              >
                <img src={img} alt={cat.label} loading="lazy" />
                <div className="cat-card__overlay" />
                <div className="cat-card__content">
                  <h3 className="cat-card__title t-display">{cat.label}</h3>
                  <span className="cat-card__cta">Explore →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
