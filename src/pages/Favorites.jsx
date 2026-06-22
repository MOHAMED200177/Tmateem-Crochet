import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/common/PageHeader';

export default function Favorites() {
  const { favorites } = useFavorites();
  const favProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <>
      <PageHeader eyebrow="Saved For Later" title="Your Favorites" subtitle={favProducts.length > 0 ? `${favProducts.length} piece${favProducts.length !== 1 ? 's' : ''} you've saved` : 'Pieces you love, all in one place'} />
      <div className="container" style={{ paddingBlock: 'clamp(2rem, 5vw, 3rem)' }}>
        {favProducts.length === 0 ? (
          <div className="p-grid-empty">
            <span className="p-grid-empty__icon">♡</span>
            <p className="t-serif">You haven't saved any pieces yet</p>
            <Link to="/shop" style={{ marginTop: '1rem', color: 'var(--clr-terracotta)', fontWeight: 500, fontSize: '0.9rem' }}>
              Browse the collection →
            </Link>
          </div>
        ) : (
          <ProductGrid products={favProducts} />
        )}
      </div>
    </>
  );
}
