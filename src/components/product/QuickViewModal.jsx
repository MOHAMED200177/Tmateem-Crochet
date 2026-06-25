import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { getDiscount, formatPrice, buildWhatsAppURL } from '../../utils/helpers';
import { PRODUCT_CARD_LABELS, QUICK_VIEW_LABELS } from '../../data/productCardLabels';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const discount = getDiscount(product.price, product.oldPrice);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart(product, size, color, qty);
    addToast(PRODUCT_CARD_LABELS.addedToCart.replace('{name}', product.name), 'success', '✦');
    onClose();
  };

  const handleWhatsApp = () => {
    window.open(buildWhatsAppURL({ product, size, color, quantity: qty }), '_blank');
  };

  return (
    <div className="qv-overlay" onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${QUICK_VIEW_LABELS.quickViewPrefix}: ${product.name}`}>
        <button className="qv-close" onClick={onClose} aria-label={QUICK_VIEW_LABELS.closeQuickView}>×</button>

        <div className="qv-gallery">
          <img src={product.images[activeImg]} alt={product.name} className="qv-gallery__main" />
          {product.images.length > 1 && (
            <div className="qv-gallery__thumbs">
              {product.images.map((img, i) => (
                <button key={i} className={`qv-gallery__thumb ${i === activeImg ? 'qv-gallery__thumb--active' : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="qv-info">
          <span className="t-label" style={{ color: 'var(--clr-muted)' }}>{product.category}</span>
          <h2 className="qv-title">{product.name}</h2>

          <div className="qv-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.round(product.rating) ? 'star star--filled' : 'star'}>★</span>
            ))}
            <span className="p-card__review-count">({product.reviewCount} {QUICK_VIEW_LABELS.reviewsSuffix})</span>
          </div>

          <div className="qv-price">
            <span className="qv-price-current">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="qv-price-old">{formatPrice(product.oldPrice)}</span>}
            {discount > 0 && <span className="qv-discount">-{discount}%</span>}
          </div>

          <p className="qv-desc">{product.shortDesc}</p>

          <div className="qv-option">
            <span className="t-label">{QUICK_VIEW_LABELS.colorPrefix} {color.name}</span>
            <div className="qv-swatches">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  className={`qv-swatch ${color.name === c.name ? 'qv-swatch--active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="qv-option">
            <span className="t-label">{QUICK_VIEW_LABELS.sizePrefix} {size}</span>
            <div className="qv-sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`qv-size ${size === s ? 'qv-size--active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="qv-option">
            <span className="t-label">{QUICK_VIEW_LABELS.quantity}</span>
            <div className="qv-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label={QUICK_VIEW_LABELS.decreaseQuantity}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label={QUICK_VIEW_LABELS.increaseQuantity}>+</button>
            </div>
          </div>

          <div className="qv-actions">
            <button className="qv-btn qv-btn--primary" onClick={handleAddToCart}>{QUICK_VIEW_LABELS.addToCart}</button>
            <button className="qv-btn qv-btn--whatsapp" onClick={handleWhatsApp}>{QUICK_VIEW_LABELS.orderViaWhatsApp}</button>
          </div>

          <Link to={`/product/${product.id}`} className="qv-fulllink" onClick={onClose}>{QUICK_VIEW_LABELS.viewFullDetails}</Link>
        </div>
      </div>
    </div>
  );
}
