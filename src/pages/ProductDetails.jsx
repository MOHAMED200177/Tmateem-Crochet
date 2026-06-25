import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import { getDiscount, formatPrice, buildWhatsAppURL } from '../utils/helpers';
import { CARE_INSTRUCTIONS, SHIPPING_INFO, PRODUCT_TABS } from '../data/productInfo';
import { PRODUCT_DETAILS_LABELS } from '../data/productDetailsLabels';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import ProductGrid from '../components/product/ProductGrid';
import NotFound from './NotFound';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [tab, setTab] = useState(PRODUCT_TABS[0].key);

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImg(0);
      setSize(product.sizes[0]);
      setColor(product.colors[0]);
      setQty(1);
    }
  }, [id]);

  if (!product) return <NotFound />;

  const discount = getDiscount(product.price, product.oldPrice);
  const favorited = isFavorite(product.id);
  const outOfStock = product.availability === 'out_of_stock';
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addToCart(product, size, color, qty);
    addToast(PRODUCT_DETAILS_LABELS.addedToCart.replace('{name}', product.name), 'success', '✦');
  };

  const handleWhatsApp = () => {
    window.open(buildWhatsAppURL({ product, size, color, quantity: qty }), '_blank');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name}`;
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      addToast(PRODUCT_DETAILS_LABELS.linkCopiedToast, 'info', '🔗');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <div className="pd-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb" aria-label={PRODUCT_DETAILS_LABELS.breadcrumbAria}>
          <Link to="/">{PRODUCT_DETAILS_LABELS.breadcrumbHome}</Link> <span>/</span>
          <Link to="/shop">{PRODUCT_DETAILS_LABELS.breadcrumbShop}</Link> <span>/</span>
          <Link to={`/categories?cat=${product.category}`} style={{ textTransform: 'capitalize' }}>{product.category}</Link> <span>/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        <div className="pd-grid">
          {/* Gallery */}
          <div className="pd-gallery">
            <div className={`pd-gallery__main ${zoomed ? 'pd-gallery__main--zoomed' : ''}`} onClick={() => setZoomed(!zoomed)}>
              <img src={product.images[activeImg]} alt={product.name} />
              <span className="pd-gallery__zoom-hint">{zoomed ? PRODUCT_DETAILS_LABELS.zoomOut : PRODUCT_DETAILS_LABELS.zoomIn}</span>
            </div>
            {product.images.length > 1 && (
              <div className="pd-gallery__thumbs">
                {product.images.map((img, i) => (
                  <button key={i} className={`pd-gallery__thumb ${i === activeImg ? 'pd-gallery__thumb--active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="t-label pd-info__category">{product.category}</span>
            <h1 className="pd-info__title t-display">{product.name}</h1>

            <div className="pd-info__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? 'star star--filled' : 'star'}>★</span>
              ))}
              <span>{product.rating} ({product.reviewCount} {PRODUCT_DETAILS_LABELS.reviewsSuffix})</span>
            </div>

            <div className="pd-info__price">
              <span className="pd-info__price-current">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="pd-info__price-old">{formatPrice(product.oldPrice)}</span>}
              {discount > 0 && <span className="pd-info__discount">{PRODUCT_DETAILS_LABELS.saveLabel(discount)}</span>}
            </div>

            <div className="pd-info__availability">
              {outOfStock ? (
                <span className="pd-availability pd-availability--out">{PRODUCT_DETAILS_LABELS.outOfStock}</span>
              ) : product.availability === 'low_stock' ? (
                <span className="pd-availability pd-availability--low">{PRODUCT_DETAILS_LABELS.lowStock(product.stock)}</span>
              ) : (
                <span className="pd-availability pd-availability--in">{PRODUCT_DETAILS_LABELS.inStock(product.stock)}</span>
              )}
            </div>

            <p className="pd-info__short-desc">{product.shortDesc}</p>

            {/* Color */}
            <div className="pd-option">
              <span className="t-label">{PRODUCT_DETAILS_LABELS.colorPrefix} {color.name}</span>
              <div className="pd-swatches">
                {product.colors.map((c) => (
                  <button key={c.name} className={`pd-swatch ${color.name === c.name ? 'pd-swatch--active' : ''}`} style={{ background: c.hex }} onClick={() => setColor(c)} title={c.name} aria-label={c.name} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="pd-option">
              <div className="pd-option__head">
                <span className="t-label">{PRODUCT_DETAILS_LABELS.sizePrefix} {size}</span>
                <button className="pd-size-guide">{PRODUCT_DETAILS_LABELS.sizeGuide}</button>
              </div>
              <div className="pd-sizes">
                {product.sizes.map((s) => (
                  <button key={s} className={`pd-size ${size === s ? 'pd-size--active' : ''}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pd-option">
              <span className="t-label">{PRODUCT_DETAILS_LABELS.quantity}</span>
              <div className="pd-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label={PRODUCT_DETAILS_LABELS.decreaseQuantity}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label={PRODUCT_DETAILS_LABELS.increaseQuantity}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button className="pd-btn pd-btn--primary" onClick={handleAddToCart} disabled={outOfStock}>
                {outOfStock ? PRODUCT_DETAILS_LABELS.outOfStockButton : PRODUCT_DETAILS_LABELS.addToCart}
              </button>
              <button className="pd-btn pd-btn--fav" onClick={() => { toggleFavorite(product.id); addToast(favorited ? PRODUCT_DETAILS_LABELS.removedFromFavorites : PRODUCT_DETAILS_LABELS.addedToFavorites, 'info', favorited ? '♡' : '♥'); }} aria-pressed={favorited} aria-label={favorited ? PRODUCT_DETAILS_LABELS.removeFromFavoritesAction : PRODUCT_DETAILS_LABELS.addToFavoritesAction}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <button className="pd-btn pd-btn--whatsapp" onClick={handleWhatsApp}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {PRODUCT_DETAILS_LABELS.orderViaWhatsApp}
            </button>

            {/* Share */}
            <div className="pd-share">
              <span className="t-label">{PRODUCT_DETAILS_LABELS.shareLabel}</span>
              <div className="pd-share__btns">
                <button onClick={() => handleShare('whatsapp')} aria-label={PRODUCT_DETAILS_LABELS.shareWhatsAppAria}>WA</button>
                <button onClick={() => handleShare('facebook')} aria-label={PRODUCT_DETAILS_LABELS.shareFacebookAria}>FB</button>
                <button onClick={() => handleShare('twitter')} aria-label={PRODUCT_DETAILS_LABELS.shareTwitterAria}>X</button>
                <button onClick={() => handleShare('copy')} aria-label={PRODUCT_DETAILS_LABELS.copyLinkAria}>🔗</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="pd-tabs__nav">
            {PRODUCT_TABS.map((t) => (
              <button key={t.key} className={tab === t.key ? 'pd-tab--active' : ''} onClick={() => setTab(t.key)}>{t.label}</button>
            ))}
          </div>
          <div className="pd-tabs__content">
            {tab === 'description' && product.description.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
            {tab === 'care' && (
              <ul>
                {CARE_INSTRUCTIONS.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            )}
            {tab === 'shipping' && (
              <ul>
                {SHIPPING_INFO.map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="pd-related">
            <h2 className="t-display pd-related__title">{PRODUCT_DETAILS_LABELS.relatedTitle}</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
