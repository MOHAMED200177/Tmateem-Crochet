import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';
import { FAVORITES_PAGE } from '../data/pageContent';

export default function Favorites() {
  const { favorites } = useFavorites();
  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <>
      <PageHeader
        eyebrow={FAVORITES_PAGE.eyebrow}
        title={FAVORITES_PAGE.title}
        subtitle={favProducts.length > 0 ? FAVORITES_PAGE.subtitleWithCount(favProducts.length) : FAVORITES_PAGE.subtitleEmpty}
      />
      <div className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 3rem)' }}>
        {favProducts.length === 0 ? (
          <div className="p-grid-empty">
            <span className="p-grid-empty__icon">♡</span>
            <p className="t-serif">{FAVORITES_PAGE.emptyMessage}</p>
            <Link to="/shop" style={{ marginTop: '1rem', color: 'var(--clr-terracotta)', fontWeight: 500, fontSize: '0.9rem' }}>
              {FAVORITES_PAGE.browseLink}
            </Link>
          </div>
        ) : (
          <ProductGrid products={favProducts} />
        )}
      </div>
    </>
  );
}
