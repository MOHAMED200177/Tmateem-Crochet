// ============================================================
//  src/data/productDetailsLabels.js
//  ── UI labels for the Product Details page ──
//  Edit this file to change breadcrumb, badges, and section
//  labels on every product page at once.
// ============================================================

export const PRODUCT_DETAILS_LABELS = {
  breadcrumbHome: 'Home',
  breadcrumbShop: 'Shop',
  breadcrumbAria: 'Breadcrumb',
  zoomIn: 'Click to zoom',
  zoomOut: 'Click to zoom out',
  reviewsSuffix: 'reviews',
  saveLabel: (pct) => `Save ${pct}%`,
  outOfStock: '● Out of Stock',
  lowStock: (stock) => `● Only ${stock} left in stock`,
  inStock: (stock) => `● In Stock (${stock} available)`,
  colorPrefix: 'Color —',
  sizePrefix: 'Size —',
  sizeGuide: 'Size Guide',
  quantity: 'Quantity',
  decreaseQuantity: 'Decrease quantity',
  increaseQuantity: 'Increase quantity',
  addToCart: 'Add to Cart',
  outOfStockButton: 'Out of Stock',
  orderViaWhatsApp: 'Order via WhatsApp',
  shareLabel: 'Share',
  shareWhatsAppAria: 'Share on WhatsApp',
  shareFacebookAria: 'Share on Facebook',
  shareTwitterAria: 'Share on Twitter',
  copyLinkAria: 'Copy link',
  linkCopiedToast: 'Link copied to clipboard',
  relatedTitle: 'You Might Also Love',
  addToFavoritesAction: 'Add to favorites',
  removeFromFavoritesAction: 'Remove from favorites',
  addedToFavorites: 'Added to favorites',
  removedFromFavorites: 'Removed from favorites',
  addedToCart: '{name} added to cart',
};
