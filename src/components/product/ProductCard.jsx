import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { getDiscount, formatPrice, buildWhatsAppURL } from '../../utils/helpers';
import { BADGE_LABELS } from '../../data/products';
import { PRODUCT_CARD_LABELS } from '../../data/productCardLabels';
import QuickViewModal from './QuickViewModal';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const discount = getDiscount(product.price, product.oldPrice);
  const favorited = isFavorite(product.id);
  const outOfStock = product.availability === 'out_of_stock';

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(product.id);
    addToast(favorited ? PRODUCT_CARD_LABELS.removedFromFavorites : PRODUCT_CARD_LABELS.addedToFavorites, 'info', favorited ? '♡' : '♥');
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product, product.sizes[0], product.colors[0], 1);
    addToast(PRODUCT_CARD_LABELS.addedToCart.replace('{name}', product.name), 'success', '✦');
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const url = buildWhatsAppURL({ product, size: product.sizes[0], color: product.colors[0], quantity: 1 });
    window.open(url, '_blank');
  };

  return (
    <>
      <article className={`p-card reveal reveal-delay-${(index % 5) + 1}`}>
        <div className="p-card__media">
          <Link to={`/product/${product.id}`} className="p-card__media-link" aria-label={product.name}>
            <img src={product.images[0]} alt={product.name} className="p-card__img p-card__img--main" loading="lazy" />
            {product.images[1] && (
              <img src={product.images[1]} alt="" className="p-card__img p-card__img--hover" loading="lazy" aria-hidden="true" />
            )}
          </Link>

          {/* Badges */}
          <div className="p-card__badges">
            {discount > 0 && <span className="p-card__badge p-card__badge--sale">-{discount}%</span>}
            {product.badges.filter(b => b !== 'sale').slice(0, 2).map((b) => (
              <span key={b} className={`p-card__badge p-card__badge--${b}`}>{BADGE_LABELS[b]}</span>
            ))}
          </div>

          {/* Favorite */}
          <button
            className={`p-card__fav ${favorited ? 'p-card__fav--active' : ''}`}
            onClick={handleFavorite}
            aria-label={favorited ? PRODUCT_CARD_LABELS.removeFromFavoritesAction : PRODUCT_CARD_LABELS.addToFavoritesAction}
            aria-pressed={favorited}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Quick actions overlay */}
          <div className="p-card__overlay">
            <button className="p-card__overlay-btn" onClick={() => setQuickViewOpen(true)}>
              {PRODUCT_CARD_LABELS.quickView}
            </button>
          </div>

          {outOfStock && <div className="p-card__sold-out">{PRODUCT_CARD_LABELS.soldOut}</div>}
          {product.availability === 'low_stock' && (
            <div className="p-card__low-stock">{PRODUCT_CARD_LABELS.onlyXLeft.replace('{stock}', product.stock)}</div>
          )}
        </div>

        <div className="p-card__body">
          <Link to={`/product/${product.id}`} className="p-card__link-wrap">
            <span className="p-card__category t-label">{product.category}</span>
            <h3 className="p-card__title">{product.name}</h3>
          </Link>

          <div className="p-card__rating" aria-label={`Rated ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? 'star star--filled' : 'star'}>★</span>
            ))}
            <span className="p-card__review-count">({product.reviewCount})</span>
          </div>

          <div className="p-card__colors">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c.name} className="p-card__swatch" style={{ background: c.hex }} title={c.name} />
            ))}
          </div>

          <div className="p-card__footer">
            <div className="p-card__price">
              <span className="p-card__price-current">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="p-card__price-old">{formatPrice(product.oldPrice)}</span>}
            </div>

            <div className="p-card__actions">
              <button
                className="p-card__action-btn p-card__action-btn--cart"
                onClick={handleQuickAdd}
                disabled={outOfStock}
                aria-label={PRODUCT_CARD_LABELS.addToCart}
                title={PRODUCT_CARD_LABELS.addToCart}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>
              <button
                className="p-card__action-btn p-card__action-btn--whatsapp"
                onClick={handleWhatsApp}
                aria-label={PRODUCT_CARD_LABELS.orderViaWhatsApp}
                title={PRODUCT_CARD_LABELS.orderViaWhatsApp}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </>
  );
}
